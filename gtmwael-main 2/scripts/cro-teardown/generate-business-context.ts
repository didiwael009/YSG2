/**
 * generate-business-context.ts
 *
 * Generates the "Why the homepage changed" prose block — 3 paragraphs explaining
 * the business context behind the homepage evolution.
 *
 * OUTPUT: writes data/cro-teardowns/[slug]/writing/sections/07-business-context.final.md
 *         The assembler picks it up via SECTION_ORDER just like a section-writer output.
 *         The publisher also reads it separately to populate the `businessContext` field.
 *
 * Three paragraphs:
 *   P1 — Market entry context (what category they were entering/defending)
 *   P2 — Product/competitive evolution (what changed to explain the shifts)
 *   P3 — Industry shift + convergence (broader trend + what it says for SaaS teams)
 *
 * Each paragraph ≤60 words. Plain language. Hedged inferences. No causation claims.
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';

import { callLLM }                        from './llm/anthropic-client.js';
import { getModel }                        from './llm/model-router.js';
import { CostTracker, computeCallCost }    from './llm/token-cost.js';
import { withRetry }                       from './llm/retry.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GenerateBusinessContextOpts {
  slug:       string;
  writingDir: string;
  sectionsDir: string;
  tracker:    CostTracker;
  force?:     boolean;
  onLog:      (step: string, ok: boolean, detail?: string) => void;
}

export interface GenerateBusinessContextResult {
  content:     string;
  costUsd:     number;
  model:       string;
  outputPath:  string;
  generatedAt: string;
  skipped:     boolean;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM =
`You write the "Why the homepage changed" prose block for a CRO teardown article.

This block explains the business context behind the homepage evolution — not the
design choices, but the market forces that made those choices plausible.

Output ONLY three paragraphs of plain prose. No headings. No bullet lists.
No markdown except **bold** for direct website quotes.

─── THREE PARAGRAPHS — fixed structure ─────────────────────────────────────

Paragraph 1 — Market entry context (≤60 words):
  What category was this company entering or defending during the period covered?
  What was the competitive landscape like at the start of the period?
  Name concrete context — category names, competitor moves, or market conditions
  visible in the evidence. Use only what is inferable from the provided data.

Paragraph 2 — Product/competitive evolution (≤60 words):
  What changed in their product or competitive environment that would explain
  the observed homepage shifts? Cite specific changes from the evidence — quoted
  headlines, CTAs added/removed, section heading changes — as supporting signals.
  Hedge every inference: "suggests", "points to", "is consistent with".

Paragraph 3 — Industry shift + convergence (≤60 words):
  What broader industry trend does this evolution map to? If this is an AI-era
  pivot, name the pattern. If it is a platform consolidation move, name that.
  End with a single observation about what this trend means for SaaS teams
  building in this space — concrete, not abstract.

─── VOICE RULES ────────────────────────────────────────────────────────────

Plain language. No expert jargon. No causation claims.
Hedge inferences: "suggests", "may indicate", "points to", "is consistent with".
Never claim a homepage change drove a business outcome.
Bold every verbatim website quote: **"like this"**.
Each paragraph MUST be ≤60 words — count before submitting.

─── SELF-CHECK ─────────────────────────────────────────────────────────────

Walk this before submitting:
  [ ] Exactly three paragraphs?
  [ ] Each paragraph ≤60 words?
  [ ] No causation claims ("this caused", "this drove", "this increased")?
  [ ] Every verbatim quote bolded?
  [ ] Uses only evidence provided — no invented market context?`;

// ─── User prompt builder ─────────────────────────────────────────────────────

interface Evidence {
  companyName: string;
  companyUrl:  string;
  fromLabel:   string;
  toLabel:     string;
  [key: string]: unknown;
}

function buildPrompt(evidence: Evidence): string {
  return `Write the "Why the homepage changed" business context block for ${evidence.companyName}.

Company: ${evidence.companyName} (${evidence.companyUrl})
Period:  ${evidence.fromLabel} → ${evidence.toLabel}

ALL EVIDENCE (use only what is here):
${JSON.stringify(evidence, null, 2)}

Write exactly three paragraphs now. No headings. Each ≤60 words.`;
}

// ─── Evidence loader ──────────────────────────────────────────────────────────

function loadEvidence(writingDir: string, slug: string): Evidence {
  const gdPath = path.join(writingDir, 'generated-article-data.json');
  if (!fs.existsSync(gdPath)) {
    throw new Error(`generated-article-data.json not found at ${gdPath}`);
  }
  const gd = JSON.parse(fs.readFileSync(gdPath, 'utf-8')) as {
    companyName?: string; companyUrl?: string;
    fromLabel?: string;   toLabel?: string;
  };

  const evidence: Evidence = {
    companyName: gd.companyName ?? slug,
    companyUrl:  gd.companyUrl  ?? '',
    fromLabel:   gd.fromLabel   ?? '',
    toLabel:     gd.toLabel     ?? '',
  };

  const evDir = path.join(writingDir, 'section-evidence');
  for (const src of ['messaging', 'summary-cards', 'strategic-shift']) {
    const p = path.join(evDir, `${src}.json`);
    if (fs.existsSync(p)) {
      try { evidence[src] = JSON.parse(fs.readFileSync(p, 'utf-8')); } catch {}
    }
  }
  return evidence;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateParagraphs(content: string): string[] {
  const warnings: string[] = [];
  const paragraphs = content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  if (paragraphs.length !== 3) {
    warnings.push(`Expected 3 paragraphs, got ${paragraphs.length}`);
  }
  for (const [i, p] of paragraphs.entries()) {
    const wc = p.split(/\s+/).filter(Boolean).length;
    if (wc > 60) {
      warnings.push(`Paragraph ${i + 1} is ${wc} words — must be ≤60`);
    }
    if (/\bthis (caused|drove|increased|improved|reduced)\b/i.test(p)) {
      warnings.push(`Paragraph ${i + 1} contains a causation claim`);
    }
  }
  return warnings;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generateBusinessContext(
  opts: GenerateBusinessContextOpts,
): Promise<GenerateBusinessContextResult> {
  const { slug, writingDir, sectionsDir, tracker, onLog } = opts;
  const model      = getModel('writer');
  const outputPath = path.join(sectionsDir, '07-business-context.final.md');
  const costBefore = tracker.totalCostUsd;

  // Skip if file already exists and not forced.
  if (!opts.force && fs.existsSync(outputPath)) {
    onLog('Business context', true, 'skipped — 07-business-context.final.md exists');
    return {
      content: fs.readFileSync(outputPath, 'utf-8'),
      costUsd: 0,
      model,
      outputPath,
      generatedAt: new Date().toISOString(),
      skipped: true,
    };
  }

  const evidence = loadEvidence(writingDir, slug);
  onLog(`Business context [${model}]`, true, 'calling API…');

  const resp = await withRetry(
    () => callLLM({
      model,
      system: SYSTEM,
      messages: [{ role: 'user', content: buildPrompt(evidence) }],
      maxTokens: 1024,
    }),
    { onRetry: (a, e, d) => onLog(`Business context retry ${a}`, false, `${e.message} (${d}ms)`) },
  );
  tracker.add(computeCallCost(model, 'business-context', resp.inputTokens, resp.outputTokens));

  const content = `## Why the homepage changed\n\n${resp.content.trim()}`;

  const warnings = validateParagraphs(resp.content.trim());
  for (const w of warnings) onLog('Business context: ⚠', false, w);

  fs.mkdirSync(sectionsDir, { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf-8');

  const costUsd = tracker.totalCostUsd - costBefore;
  onLog(
    'Business context',
    warnings.length === 0,
    `3 paragraphs — $${costUsd.toFixed(4)}`,
  );

  return {
    content,
    costUsd,
    model,
    outputPath,
    generatedAt: new Date().toISOString(),
    skipped: false,
  };
}
