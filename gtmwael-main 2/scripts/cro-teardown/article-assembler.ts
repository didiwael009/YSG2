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

    const heading = SECTION_HEADINGS[sectionId] ?? `## ${sectionId}`;
    const block = heading ? `${heading}\n\n${content}` : content;
    blocks.push(block);
    sectionsIncluded.push(sectionId);
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

  return { outputPath, sectionsIncluded, sectionsMissing, wordCount };
}
