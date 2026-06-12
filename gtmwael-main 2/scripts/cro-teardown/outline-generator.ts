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

/**
 * Loads the central_thesis from all published articles' strategic-shift.json files.
 * Used to instruct the outline generator to find a distinct angle.
 */
function loadPublishedTheses(dataRoot: string, excludeSlug: string): string[] {
  const theses: string[] = [];
  try {
    const slugDirs = fs.readdirSync(dataRoot).filter(d => d !== excludeSlug);
    for (const dir of slugDirs) {
      const shiftPath = path.join(dataRoot, dir, 'writing', 'section-evidence', 'strategic-shift.json');
      if (!fs.existsSync(shiftPath)) continue;
      try {
        const shift = JSON.parse(fs.readFileSync(shiftPath, 'utf-8')) as { central_thesis?: string };
        if (shift.central_thesis) theses.push(shift.central_thesis);
      } catch {
        // skip malformed files
      }
    }
  } catch {
    // dataRoot may not exist yet
  }
  return theses;
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
  theses:      string[];
}): string {
  const { company, fromLabel, toLabel, shift, visual, research, theses } = opts;

  const antiRepetitionBlock = theses.length > 0
    ? `\nPREVIOUSLY PUBLISHED THESES (do NOT repeat these angles):\n${theses.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}`
    : '';

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

AVAILABLE SECTION IDs (reuse these IDs — they map to existing components):
  "01-intro"              — opening paragraph with keyword and hook
  "07-business-context"   — why the homepage changed (business context prose)

Return this exact JSON shape:
{
  "angle": "1-2 sentences describing the specific story angle for this brand only",
  "distinct_from": ["in 5-8 words, what makes this different from prior teardowns"],
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
      "id": "07-business-context",
      "custom_h2": "## [Brand-specific heading — not 'Why the homepage changed']",
      "goal": "What this business context section must explain for this brand specifically",
      "word_target": 180,
      "evidence_sources": ["messaging", "summary-cards", "strategic-shift", "business-context-research"],
      "marketing_lens": "positioning|design|sales-motion|icp|category|product|brand"
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

Rules for sections:
- Always include "01-intro" and "07-business-context" at minimum
- The custom_h2 for 07-business-context must be brand-specific (mention the company name OR the specific mechanism of change)
- example good H2: "## Why Clay stopped being a spreadsheet and became a data platform"
- example bad H2: "## Why the homepage changed" (too generic)`;
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

  const theses = loadPublishedTheses(dataRoot, slug);

  const company   = ep.companyName ?? slug;
  const fromLabel = ep.fromMonth   ?? 'start';
  const toLabel   = ep.toMonth     ?? 'present';

  onLog(`  Outline generator: building custom outline for ${company}`);
  if (theses.length > 0) onLog(`  Anti-repetition: loaded ${theses.length} prior theses`);

  const model = getModel('writer');

  const response = await callLLM({
    model,
    system:    SYSTEM_PROMPT,
    messages:  [{ role: 'user', content: buildUserPrompt({ company, fromLabel, toLabel, shift, visual, research, theses }) }],
    maxTokens: 2048,
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
