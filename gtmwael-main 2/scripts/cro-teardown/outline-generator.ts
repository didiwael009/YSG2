/**
 * outline-generator.ts — Layer 3.5: Custom article outline generator.
 *
 * Takes the strategic shift, visual analysis, and business context research
 * for a specific slug, plus the theses of all previously published articles
 * (anti-repetition corpus), and generates a custom article outline.
 *
 * The outline is different for every article:
 *   - Unique angle derived from the strongest insight for THIS brand
 *   - Custom H2 headings (not the fixed "Why the homepage changed" defaults)
 *   - Marketing-signal "At a glance" cards
 *   - Section goals tailored to the brand's specific story
 *
 * Output: data/cro-teardowns/[slug]/writing/article-outline.json
 *
 * CLI:
 *   npm run cro-teardown:outline -- --slug clay [--force]
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { callLLM } from './llm/anthropic-client.js';
import { getModel } from './llm/model-router.js';
import { CostTracker, computeCallCost } from './llm/token-cost.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OutlineSection {
  id:               string;
  custom_h2:        string;
  goal:             string;
  word_target:      number;
  evidence_sources: string[];
  marketing_lens:   'positioning' | 'design' | 'sales-motion' | 'icp' | 'category' | 'product' | 'brand';
}

export interface ArticleOutline {
  angle:            string;
  distinct_from:    string[];
  h1?:              string;   // unique H1 for this article (replaces template default)
  seo_title?:       string;   // unique <title> tag / metaTitle (≤60 chars)
  description?:     string;   // meta description ≤155 chars — specific to this shift
  sections:         OutlineSection[];
  at_a_glance_cards: {
    label: string;
    value: string;
    note:  string;
  }[];
  confidence_level: 'high' | 'medium' | 'low';
  generatedAt:      string;
  model:            string;
  costUsd:          number;
}

export interface RunOutlineGeneratorResult {
  outline:    ArticleOutline;
  skipped:    boolean;
  costUsd:    number;
  outputPath: string;
}

// ─── Anti-repetition corpus ───────────────────────────────────────────────────

interface PublishedArticleSignals {
  slug:             string;
  central_thesis?:  string;
  angle?:           string;
  h1?:              string;
  seo_title?:       string;
  h2_headings:      string[];
  positioning_card?: string;
}

/**
 * Loads the central_thesis, outline angle, and custom H2s from all published
 * articles. The richer corpus lets the generator avoid repeating not just the
 * thesis but also the framing angle and section headings across articles.
 */
function loadPublishedSignals(dataRoot: string, excludeSlug: string): PublishedArticleSignals[] {
  const signals: PublishedArticleSignals[] = [];
  try {
    const slugDirs = fs.readdirSync(dataRoot).filter(d => d !== excludeSlug);
    for (const dir of slugDirs) {
      const entry: PublishedArticleSignals = { slug: dir, h2_headings: [] };

      // Strategic shift thesis
      const shiftPath = path.join(dataRoot, dir, 'writing', 'section-evidence', 'strategic-shift.json');
      if (fs.existsSync(shiftPath)) {
        try {
          const shift = JSON.parse(fs.readFileSync(shiftPath, 'utf-8')) as { central_thesis?: string };
          if (shift.central_thesis) entry.central_thesis = shift.central_thesis;
        } catch { /* skip */ }
      }

      // Outline angle, H1, seo_title, and H2 headings (only available for V6 articles)
      const outlinePath = path.join(dataRoot, dir, 'writing', 'article-outline.json');
      if (fs.existsSync(outlinePath)) {
        try {
          const outline = JSON.parse(fs.readFileSync(outlinePath, 'utf-8')) as {
            angle?: string;
            h1?: string;
            seo_title?: string;
            sections?: Array<{ custom_h2?: string | null }>;
            at_a_glance_cards?: Array<{ label: string; value: string }>;
          };
          if (outline.angle)     entry.angle     = outline.angle;
          if (outline.h1)        entry.h1        = outline.h1;
          if (outline.seo_title) entry.seo_title = outline.seo_title;
          entry.h2_headings = (outline.sections ?? [])
            .map(s => s.custom_h2)
            .filter((h): h is string => typeof h === 'string' && h.length > 0);
          const posCard = (outline.at_a_glance_cards ?? []).find(c =>
            c.label.toLowerCase().includes('positioning') || c.label.toLowerCase().includes('shift'),
          );
          if (posCard) entry.positioning_card = posCard.value;
        } catch { /* skip */ }
      }
      // Fallback: read H1 from published article .ts if no outline
      if (!entry.h1) {
        const articlePath = path.join(
          dataRoot, '..', '..', 'src', 'content', 'cro-teardown', 'articles', `${dir}.ts`,
        );
        if (fs.existsSync(articlePath)) {
          try {
            const src = fs.readFileSync(articlePath, 'utf-8');
            const h1Match = src.match(/heroTitle:\s*"([^"]+)"/);
            if (h1Match) entry.h1 = h1Match[1];
          } catch { /* skip */ }
        }
      }

      if (entry.central_thesis || entry.angle || entry.h2_headings.length > 0) {
        signals.push(entry);
      }
    }
  } catch {
    // dataRoot may not exist yet
  }
  return signals;
}

// ─── Prompt ───────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
`You are a senior content strategist and editorial director for a B2B SaaS marketing blog.
Your job is to create a unique, brand-specific article outline for a CRO teardown.

RULES:
- Every article must have a DIFFERENT angle. No two articles should tell the same story.
- The angle must come from the SPECIFIC evidence for this brand — not from a generic framework.
- H2 headings must be brand-specific and searchable (include company name or specific topic).
- "At a glance" cards must be MARKETING SIGNALS — not technical counts.
- Output ONLY valid JSON. No markdown, no text before or after.
- JSON SAFETY: use single quotes inside string values if quoting text.`;

function buildUserPrompt(opts: {
  company:     string;
  fromLabel:   string;
  toLabel:     string;
  shift:       Record<string, unknown>;
  visual:      Record<string, unknown> | null;
  research:    Record<string, unknown> | null;
  signals:     PublishedArticleSignals[];
}): string {
  const { company, fromLabel, toLabel, shift, visual, research, signals } = opts;

  let antiRepetitionBlock = '';
  if (signals.length > 0) {
    const lines: string[] = [];
    for (const s of signals) {
      const parts: string[] = [`[${s.slug}]`];
      if (s.central_thesis) parts.push(`Thesis: ${s.central_thesis}`);
      if (s.angle)          parts.push(`Angle: ${s.angle}`);
      if (s.h1)             parts.push(`H1: ${s.h1}`);
      if (s.seo_title)      parts.push(`Title: ${s.seo_title}`);
      if (s.positioning_card) parts.push(`Positioning: ${s.positioning_card}`);
      if (s.h2_headings.length > 0) parts.push(`H2s used: ${s.h2_headings.join(' | ')}`);
      lines.push(parts.join(' — '));
    }
    antiRepetitionBlock = `\nPREVIOUSLY PUBLISHED ARTICLES (do NOT repeat these theses, angles, H1s, titles, or H2 patterns):\n${lines.map((l, i) => `  ${i + 1}. ${l}`).join('\n')}`;
  }

  return `Create a custom article outline for the ${company} CRO teardown (${fromLabel} → ${toLabel}).

STRATEGIC SHIFT ANALYSIS:
${JSON.stringify(shift, null, 2)}

VISUAL ANALYSIS:
${visual ? JSON.stringify(visual, null, 2) : 'Not available'}

BUSINESS CONTEXT RESEARCH:
${research ? JSON.stringify(research, null, 2) : 'Not available'}
${antiRepetitionBlock}

Based on all of the above, identify:
1. The STRONGEST, MOST SPECIFIC insight about this brand's evolution
2. What makes this brand's story DIFFERENT from the other teardowns
3. A custom article structure that best tells THIS brand's specific story

AVAILABLE SECTION IDs (reuse these IDs exactly — they map to existing pipeline components):
  "01-intro"                    — opening paragraph with keyword and hook (no H2)
  "03-visual-timeline"          — visual arc through the snapshot timeline
  "04-messaging-evolution"      — headline, meta, and copy shifts
  "05-cta-navigation-evolution" — CTA and navigation changes
  "07-business-context"         — why the homepage changed (business context prose)
  "06-lessons-for-saas-teams"   — practical patterns SaaS teams can apply

Return this exact JSON shape (include ALL 6 sections in this order):
{
  "angle": "1-2 sentences describing the specific story angle for this brand only",
  "distinct_from": ["in 5-8 words, what makes this different from prior teardowns"],
  "h1": "Unique H1 headline for this article — must NOT follow 'How X rewrote its homepage over N years' — make it specific to this brand's defining story shift",
  "seo_title": "Unique <title> tag ≤60 chars — must contain company name and a year range, but vary the phrasing from all prior titles",
  "description": "Meta description ≤155 chars — must describe THIS brand's specific positioning shift using concrete terms, not the generic 'A CRO teardown of X from DATE to DATE — what changed' template",
  "sections": [
    {
      "id": "01-intro",
      "custom_h2": null,
      "goal": "What this specific intro must accomplish for this brand's story",
      "word_target": 80,
      "evidence_sources": ["summary-cards", "messaging", "strategic-shift", "seo-intent"],
      "marketing_lens": "positioning|design|sales-motion|icp|category|product|brand"
    },
    {
      "id": "03-visual-timeline",
      "custom_h2": "## [Company] homepage [time span]: from [start state] to [end state]",
      "goal": "What the visual timeline must show about when and how the design arc shifted",
      "word_target": 250,
      "evidence_sources": ["analysis-blocks", "messaging", "visual-analysis"],
      "marketing_lens": "design|brand|positioning"
    },
    {
      "id": "04-messaging-evolution",
      "custom_h2": "## How [Company]'s [messaging element] shifted from [start] to [end]",
      "goal": "What the headline and copy evolution reveals about the target buyer change",
      "word_target": 280,
      "evidence_sources": ["messaging", "summary-cards", "strategic-shift", "seo-intent", "visual-analysis"],
      "marketing_lens": "positioning|icp|category"
    },
    {
      "id": "05-cta-navigation-evolution",
      "custom_h2": "## How [Company]'s CTA and navigation changed the sales motion",
      "goal": "What CTA and nav removals/additions signal about the buyer journey shift",
      "word_target": 240,
      "evidence_sources": ["cta-changes", "h2-changes"],
      "marketing_lens": "sales-motion|icp"
    },
    {
      "id": "07-business-context",
      "custom_h2": "## [Brand-specific heading — not 'Why the homepage changed']",
      "goal": "What this business context section must explain for this brand specifically",
      "word_target": 180,
      "evidence_sources": ["messaging", "summary-cards", "strategic-shift", "business-context-research"],
      "marketing_lens": "positioning|category|product"
    },
    {
      "id": "06-lessons-for-saas-teams",
      "custom_h2": "## What SaaS teams can study from [Company]'s homepage evolution",
      "goal": "3 specific, runnable patterns this brand's evolution teaches — not generic advice",
      "word_target": 280,
      "evidence_sources": ["lesson-cards", "summary-cards", "strategic-shift"],
      "marketing_lens": "positioning|sales-motion|icp"
    }
  ],
  "at_a_glance_cards": [
    {
      "label": "Positioning shift",
      "value": "Feature-led → Outcome-led",
      "note": "Specific observation from the evidence"
    },
    {
      "label": "Target buyer",
      "value": "Ops teams → Finance leaders",
      "note": "Inferred from messaging + CTA changes"
    },
    {
      "label": "Sales motion",
      "value": "PLG → Sales-led",
      "note": "Free trial removed; demo CTA added"
    },
    {
      "label": "Design shift",
      "value": "Startup → Enterprise",
      "note": "From visual analysis or coverage period"
    }
  ],
  "confidence_level": "high|medium|low"
}

Rules for at_a_glance_cards:
- Always provide exactly 4 cards
- Labels should be marketing concepts (Positioning shift, Target buyer, Sales motion, Design shift, Category play, etc.)
- Values should be SHORT (3-6 words max) and specific to this brand
- Notes should be 1 specific observation from the evidence

Rules for H2 headings:
- Every custom_h2 (except 01-intro which is null) must mention the company name OR a specific mechanism
- example good: "## Why Expensya abandoned English after the Medius acquisition"
- example bad: "## Why the homepage changed" (too generic)
- Do NOT reuse H2 patterns from the previously published articles listed above

Rules for h1:
- Must be specific to THIS brand's defining story (not a template)
- Must NOT follow the pattern "How {Company} rewrote its homepage over N years"
- Example good: "Buffer's homepage stopped selling and started assuming — a 7-year arc"
- Example good: "Agorapulse traded 'Simplified' for 'ROI' — and here's what the homepage shows"
- Must be ≤80 characters

Rules for seo_title:
- Must contain the company name and a year range (e.g. "2019–2026")
- Must be ≤60 characters
- Must vary the phrasing from all previously listed titles
- Example: "Buffer Homepage Evolution: 2019 to 2026 | CRO Teardown"`;
}

// ─── Runner ───────────────────────────────────────────────────────────────────

export async function runOutlineGenerator(opts: {
  slug:       string;
  writingDir: string;
  dataRoot:   string;
  tracker?:   CostTracker;
  force?:     boolean;
  onLog?:     (msg: string) => void;
}): Promise<RunOutlineGeneratorResult> {
  const { slug, writingDir, dataRoot, tracker, force, onLog = console.log } = opts;

  const outputPath = path.join(writingDir, 'article-outline.json');

  if (!force && fs.existsSync(outputPath)) {
    const cached = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as ArticleOutline;
    return { outline: cached, skipped: true, costUsd: 0, outputPath };
  }

  // ── Load inputs ───────────────────────────────────────────────────────────
  const epPath = path.join(writingDir, 'evidence-pack.json');
  if (!fs.existsSync(epPath)) {
    throw new Error(
      `evidence-pack.json not found for slug "${slug}". Run Phase 4A first.`,
    );
  }
  const ep = JSON.parse(fs.readFileSync(epPath, 'utf-8')) as {
    companyName?: string;
    fromMonth?: string;
    toMonth?: string;
  };

  const shiftPath = path.join(writingDir, 'section-evidence', 'strategic-shift.json');
  if (!fs.existsSync(shiftPath)) {
    throw new Error(
      `strategic-shift.json not found for slug "${slug}". Run Layer 3 first:\n` +
      `  npm run cro-teardown:strategic-shift -- --slug ${slug}`,
    );
  }
  const shift = JSON.parse(fs.readFileSync(shiftPath, 'utf-8')) as Record<string, unknown>;

  const visualPath = path.join(writingDir, 'section-evidence', 'visual-analysis.json');
  const visual = fs.existsSync(visualPath)
    ? JSON.parse(fs.readFileSync(visualPath, 'utf-8')) as Record<string, unknown>
    : null;

  const researchPath = path.join(writingDir, 'section-evidence', 'business-context-research.json');
  const research = fs.existsSync(researchPath)
    ? JSON.parse(fs.readFileSync(researchPath, 'utf-8')) as Record<string, unknown>
    : null;

  const signals = loadPublishedSignals(dataRoot, slug);

  const company   = ep.companyName ?? slug;
  const fromLabel = ep.fromMonth   ?? 'start';
  const toLabel   = ep.toMonth     ?? 'present';

  onLog(`  Outline generator: building custom outline for ${company}`);
  if (signals.length > 0) onLog(`  Anti-repetition: loaded signals from ${signals.length} prior articles`);

  const model = getModel('writer');

  const response = await callLLM({
    model,
    system:    SYSTEM_PROMPT,
    messages:  [{ role: 'user', content: buildUserPrompt({ company, fromLabel, toLabel, shift, visual, research, signals }) }],
    maxTokens: 3000,
  });

  const callCost = computeCallCost(model, 'outline-generator', response.inputTokens, response.outputTokens);
  if (tracker) tracker.add(callCost);
  const costUsd = callCost.totalCostUsd;

  let parsed: Partial<ArticleOutline>;
  try {
    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] ?? response.content) as Partial<ArticleOutline>;
  } catch {
    throw new Error(
      `Outline generator: failed to parse JSON response.\nRaw:\n${response.content.slice(0, 400)}`,
    );
  }

  const outline: ArticleOutline = {
    angle:              parsed.angle              ?? '',
    distinct_from:      parsed.distinct_from      ?? [],
    ...(parsed.h1          ? { h1:          parsed.h1          } : {}),
    ...(parsed.seo_title   ? { seo_title:   parsed.seo_title   } : {}),
    ...(parsed.description ? { description: parsed.description } : {}),
    sections:           parsed.sections           ?? [],
    at_a_glance_cards:  parsed.at_a_glance_cards  ?? [],
    confidence_level:   parsed.confidence_level   ?? 'medium',
    generatedAt:        new Date().toISOString(),
    model,
    costUsd,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(outline, null, 2), 'utf-8');

  onLog(`  ✓ article-outline.json — angle: "${outline.angle.slice(0, 70)}…" · $${costUsd.toFixed(4)}`);

  return { outline, skipped: false, costUsd, outputPath };
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

const isMain = process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const args  = process.argv.slice(2);
  let slug    = '';
  let force   = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slug' && args[i + 1]) { slug = args[++i]; }
    else if (args[i] === '--force') { force = true; }
  }

  if (!slug) {
    console.error('Usage: outline-generator.ts --slug <slug> [--force]');
    process.exit(1);
  }

  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');
  const dataRoot    = path.join(projectRoot, 'data', 'cro-teardowns');

  runOutlineGenerator({ slug, writingDir, dataRoot, force })
    .then(r => {
      if (r.skipped) {
        console.log(`⏭  Skipped (cached). Use --force to regenerate.`);
      } else {
        console.log(`✅  Outline generated`);
        console.log(`   Angle: ${r.outline.angle}`);
        console.log(`   Sections: ${r.outline.sections.length}`);
        console.log(`   Distinct from: ${r.outline.distinct_from.join(', ')}`);
        console.log(`   Cost: $${r.costUsd.toFixed(4)}`);
      }
    })
    .catch(err => { console.error('❌', err); process.exit(1); });
}
