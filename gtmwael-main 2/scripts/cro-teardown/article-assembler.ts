/**
 * article-assembler.ts
 *
 * Concatenates individual section finals into a single article-final.md.
 * Reads generated-article-data.json for the article header (H1, period, read-time).
 * Prepends section H2 headings from SECTION_HEADINGS.
 *
 * No LLM calls — pure file I/O.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { SECTION_HEADINGS } from './section-writer.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AssemblerOpts {
  slug: string;
  writingDir: string;
  sectionsDir: string;
  /** Section IDs in the order they should appear in the article. */
  sectionOrder: readonly string[];
}

export interface AssemblerResult {
  outputPath: string;
  sectionsIncluded: string[];
  sectionsMissing: string[];
  wordCount: number;
  /** Phase 4N: Repeated key phrases detected across sections. */
  repetitionWarnings: string[];
  /** Phase 4N: General editorial warnings (over-long paragraphs, section bleeding). */
  editorialWarnings: string[];
  /** Phase 4N: Set when wordCount exceeds 1,900. null if within limit. */
  overLengthWarning: string | null;
}

// ─── Repetition detector ─────────────────────────────────────────────────────

interface RepetitionRule {
  /** Human-readable label for the warning message. */
  label: string;
  /** Patterns to search for (any match counts as one occurrence). */
  patterns: RegExp[];
  /** Maximum number of section-level occurrences before a warning fires. */
  maxSections: number;
}

const REPETITION_RULES: RepetitionRule[] = [
  {
    label: 'casual→formal / outcome→capability framing shift',
    patterns: [
      /casual.*formal/i,
      /formal.*casual/i,
      /outcome.{0,30}language.*capability/i,
      /capability.{0,30}framing/i,
      /outcome.{0,30}simple.*capability.{0,30}depth/i,
    ],
    maxSections: 1,
  },
  {
    label: 'self-serve vs enterprise shift',
    patterns: [
      /self.?serve.*enterprise/i,
      /enterprise.*self.?serve/i,
    ],
    maxSections: 2,
  },
  {
    label: 'proof burden',
    patterns: [/proof burden/i],
    maxSections: 1,
  },
  {
    label: 'CTA friction',
    patterns: [/cta friction/i, /friction.{0,20}cta/i],
    maxSections: 1,
  },
  {
    label: 'upmarket repositioning',
    patterns: [/upmarket/i],
    maxSections: 1,
  },
];

/**
 * Checks section bodies for repeated analytical conclusions.
 * Returns one warning string per violated rule.
 */
function detectRepetition(
  sectionBodies: Record<string, string>,
): string[] {
  const warnings: string[] = [];
  for (const rule of REPETITION_RULES) {
    const matchingSections: string[] = [];
    for (const [sectionId, body] of Object.entries(sectionBodies)) {
      const matched = rule.patterns.some(p => p.test(body));
      if (matched) matchingSections.push(sectionId);
    }
    if (matchingSections.length > rule.maxSections) {
      warnings.push(
        `"${rule.label}" appears in ${matchingSections.length} sections ` +
        `(max ${rule.maxSections}): ${matchingSections.join(', ')}`,
      );
    }
  }
  return warnings;
}

// ─── Assembler ────────────────────────────────────────────────────────────────

interface ArticleMetadata {
  h1: string;
  title: string;
  fromLabel: string;
  toLabel: string;
  readTime: string;
  snapshots: unknown[];
  companyName: string;
  slug: string;
}

export function assembleArticle(opts: AssemblerOpts): AssemblerResult {
  const { slug, writingDir, sectionsDir, sectionOrder } = opts;

  // ── Article header from Phase 4A metadata ──────────────────────────────────
  const gdPath = path.join(writingDir, 'generated-article-data.json');
  let meta: Partial<ArticleMetadata> = {};
  if (fs.existsSync(gdPath)) {
    meta = JSON.parse(fs.readFileSync(gdPath, 'utf-8')) as Partial<ArticleMetadata>;
  }

  // ── Load outline custom_h2 overrides (article-outline.json) ────────────────
  // Outline custom_h2 always wins over what the section writer generated.
  const outlinePath = path.join(writingDir, 'article-outline.json');
  const outlineCustomH2s: Record<string, string> = {};
  if (fs.existsSync(outlinePath)) {
    try {
      const outline = JSON.parse(fs.readFileSync(outlinePath, 'utf-8')) as {
        sections?: Array<{ id: string; custom_h2?: string | null }>;
      };
      for (const sec of outline.sections ?? []) {
        if (sec.id && sec.custom_h2) {
          outlineCustomH2s[sec.id] = sec.custom_h2;
        }
      }
    } catch { /* ignore malformed outline */ }
  }

  const h1           = meta.h1 ?? meta.title ?? `${meta.companyName ?? slug} Homepage Teardown`;
  const fromLabel    = meta.fromLabel ?? '';
  const toLabel      = meta.toLabel ?? '';
  const readTime     = meta.readTime ?? '';
  const snapshotCount = Array.isArray(meta.snapshots) ? meta.snapshots.length : 0;
  const generatedAt  = new Date().toISOString();

  const subtitleParts: string[] = [];
  if (fromLabel && toLabel) subtitleParts.push(`${fromLabel} → ${toLabel}`);
  if (snapshotCount > 0)    subtitleParts.push(`${snapshotCount} snapshots`);
  if (readTime)             subtitleParts.push(readTime);
  const subtitle = subtitleParts.join(' · ');

  // ── Collect section bodies ─────────────────────────────────────────────────
  const sectionsIncluded: string[] = [];
  const sectionsMissing: string[]  = [];
  const blocks: string[] = [];
  const sectionBodies: Record<string, string> = {};

  for (const sectionId of sectionOrder) {
    const finalPath = path.join(sectionsDir, `${sectionId}.final.md`);
    if (!fs.existsSync(finalPath)) {
      sectionsMissing.push(sectionId);
      continue;
    }
    const content = fs.readFileSync(finalPath, 'utf-8').trim();
    if (!content) {
      sectionsMissing.push(sectionId);
      continue;
    }

    // Writer may generate its own heading as the first line (## ).
    // If so, extract it and use it directly — static SECTION_HEADINGS becomes the fallback only.
    let heading: string | null;
    let body = content;
    if (content.startsWith('## ')) {
      const nlIdx = content.indexOf('\n');
      heading = nlIdx >= 0 ? content.slice(0, nlIdx).trim() : content.trim();
      body    = nlIdx >= 0 ? content.slice(nlIdx + 1).trimStart() : '';
    } else {
      // null = intentionally no heading (e.g. 01-intro); undefined = unknown section → use ID as fallback
      const rawHeading = SECTION_HEADINGS[sectionId];
      heading = rawHeading === undefined ? `## ${sectionId}` : rawHeading;
    }

    // Strip accidental H1 from section body — writers prompted to include the # H1 in
    // their intro output, but the assembler owns the article H1 in the header block.
    // Any `# heading` line at the start of body is a duplicate and must be removed.
    if (body.startsWith('# ')) {
      const nlIdx = body.indexOf('\n');
      body = nlIdx >= 0 ? body.slice(nlIdx + 1).trimStart() : '';
    }

    // Outline custom_h2 overrides whatever heading the writer generated.
    if (outlineCustomH2s[sectionId]) {
      heading = outlineCustomH2s[sectionId];
    }

    const block = heading ? `${heading}\n\n${body}` : body;
    blocks.push(block);
    sectionsIncluded.push(sectionId);
    sectionBodies[sectionId] = content;
  }

  // ── Detect duplicate H2 headings ──────────────────────────────────────────
  // A duplicate H2 means two sections produced the same heading text, which
  // causes confusing repeated section titles in the published article.
  const headingTexts = blocks
    .map(b => b.split('\n')[0])
    .filter(line => line.startsWith('## '));
  const seenHeadings = new Set<string>();
  const duplicateHeadings: string[] = [];
  for (const h of headingTexts) {
    const normalised = h.trim().toLowerCase();
    if (seenHeadings.has(normalised)) {
      duplicateHeadings.push(h.trim());
    } else {
      seenHeadings.add(normalised);
    }
  }
  if (duplicateHeadings.length > 0) {
    console.warn(`⚠️   Duplicate H2 headings detected — review sections before publishing:`);
    for (const d of duplicateHeadings) console.warn(`    • ${d}`);
    console.warn('    Duplicate headings are a sign that two writers generated the same section or the cross-section pass merged sections incorrectly.');
  }

  // ── Build the full document ────────────────────────────────────────────────
  const headerLines: string[] = [];
  headerLines.push(`# ${h1}`);
  if (subtitle) headerLines.push(`\n*${subtitle}*`);
  headerLines.push('\n---');

  const body = [
    headerLines.join('\n'),
    ...blocks,
  ].join('\n\n');

  // ── Frontmatter block at the very top ─────────────────────────────────────
  const frontmatter = [
    '---',
    `title: "${(meta.title ?? h1).replace(/"/g, '\\"')}"`,
    `slug: ${slug}`,
    `generatedAt: ${generatedAt}`,
    `sectionsIncluded: [${sectionsIncluded.map(s => `"${s}"`).join(', ')}]`,
    '---',
    '',
  ].join('\n');

  const fullDocument = frontmatter + body;

  // ── Write output ──────────────────────────────────────────────────────────
  const outputPath = path.join(writingDir, 'article-final.md');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, fullDocument, 'utf-8');

  const wordCount = fullDocument.split(/\s+/).filter(Boolean).length;

  // ── Phase 4N: Repetition and editorial checks ─────────────────────────────
  const repetitionWarnings = detectRepetition(sectionBodies);

  const editorialWarnings: string[] = [];
  // V5 rule: no paragraph may exceed 60 words. Sections 01-intro and 02-quick-answer
  // are exempt (they are designed as single short blocks).
  const PARA_EXEMPT = new Set(['01-intro', '02-quick-answer']);
  const PARA_HARD_LIMIT = 60;
  for (const [sectionId, sectionBody] of Object.entries(sectionBodies)) {
    if (PARA_EXEMPT.has(sectionId)) continue;
    const paragraphs = sectionBody.split(/\n\n+/);
    for (const para of paragraphs) {
      // Skip heading lines — they are not paragraphs
      if (para.startsWith('#')) continue;
      const paraWords = para.split(/\s+/).filter(Boolean).length;
      if (paraWords > PARA_HARD_LIMIT) {
        const preview = para.split(/\s+/).slice(0, 8).join(' ');
        editorialWarnings.push(
          `[${sectionId}] Paragraph exceeds ${PARA_HARD_LIMIT} words (~${paraWords}w): "${preview}…"`,
        );
      }
    }
  }

  const OVER_LENGTH_THRESHOLD = 1900;
  const overLengthWarning =
    wordCount > OVER_LENGTH_THRESHOLD
      ? `Article is ${wordCount} words — exceeds ${OVER_LENGTH_THRESHOLD}-word hard warning`
      : null;

  return {
    outputPath,
    sectionsIncluded,
    sectionsMissing,
    wordCount,
    repetitionWarnings,
    editorialWarnings,
    overLengthWarning,
  };
}
