/**
 * seo-intent-planner.ts — Layer 4: SEO Intent Planner
 *
 * PURPOSE
 * -------
 * The manual generate-seo-target.ts requires the user to provide a keyword.
 * That works well when the keyword is known. This module fills the gap when
 * it is not known — and adds structured intent analysis that the manual tool
 * cannot produce.
 *
 * This step:
 *   1. Analyzes the company, period, and strategic shift to identify the best
 *      SEO angle for this specific teardown.
 *   2. Suggests a primary keyword, H1 format, and intent framing.
 *   3. Saves to section-evidence/seo-intent.json.
 *
 * RELATIONSHIP TO generate-seo-target.ts
 * ----------------------------------------
 * • generate-seo-target.ts  → MANUAL override (user sets --keyword explicitly)
 *   Writes: data/cro-teardowns/[slug]/writing/seo-target.json
 *   Used by: section-writer.ts → injects primaryKeyword into intro evidence
 *
 * • seo-intent-planner.ts   → AUTOMATED suggestion (LLM-derived)
 *   Writes: data/cro-teardowns/[slug]/writing/section-evidence/seo-intent.json
 *   Used by: intro/quick-answer section writers (via SECTION_EVIDENCE_SOURCES)
 *
 * The two files are complementary, not competing:
 *   - If seo-target.json exists (manual), its primaryKeyword takes precedence
 *     in the intro writer. The seo-intent.json provides richer context (intent
 *     framing, audience description) that the manual tool does not produce.
 *   - If seo-target.json does NOT exist, the keyword from seo-intent.json is
 *     written to seo-target.json automatically so the intro writer picks it up.
 *
 * OUTPUT SHAPE (seo-intent.json)
 * --------------------------------
 * {
 *   primary_keyword:      string,   // e.g. "Vercel homepage teardown"
 *   primary_intent:       string,   // "informational | commercial | navigational"
 *   audience_description: string,   // who is searching this and why
 *   recommended_h1_format: string,  // template with [Company] placeholder
 *   secondary_keywords:   string[], // supporting long-tail terms
 *   content_angle:        string,   // the specific framing that serves this intent
 *   what_the_searcher_wants: string, // the job-to-be-done behind the query
 *   what_to_avoid:        string,   // pitfalls that would make the article miss the intent
 *   confidence_level:     string,   // "high | medium | low"
 * }
 *
 * CLI (standalone):
 *   npm run cro-teardown:seo-intent -- --slug hootsuite
 *   npm run cro-teardown:seo-intent -- --slug hootsuite --force
 */

import * as fs      from 'node:fs';
import * as path    from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';

import { callLLM }            from './llm/anthropic-client.js';
import { getModel }            from './llm/model-router.js';
import { CostTracker, computeCallCost } from './llm/token-cost.js';
import { withRetry }           from './llm/retry.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SeoIntent {
  primary_keyword:         string;
  primary_intent:          'informational' | 'commercial' | 'navigational';
  audience_description:    string;
  recommended_h1_format:   string;
  secondary_keywords:      string[];
  content_angle:           string;
  what_the_searcher_wants: string;
  what_to_avoid:           string;
  confidence_level:        'high' | 'medium' | 'low';
  generatedAt:             string;
  model:                   string;
  costUsd:                 number;
}

export interface RunSeoIntentOpts {
  slug:       string;
  writingDir: string;
  tracker:    CostTracker;
  force?:     boolean;
  onLog:      (step: string, ok: boolean, detail?: string) => void;
}

export interface RunSeoIntentResult {
  intent:    SeoIntent;
  skipped:   boolean;
  costUsd:   number;
  outputPath: string;
  /** True if the planner also wrote seo-target.json (because none existed). */
  wroteTarget: boolean;
}

// ─── JSON extraction ──────────────────────────────────────────────────────────

function extractJson(text: string): string | null {
  try { JSON.parse(text.trim()); return text.trim(); } catch { /* not valid JSON as-is */ }
  const block = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (block) { try { JSON.parse(block[1].trim()); return block[1].trim(); } catch { /* not valid JSON in block */ } }
  const first = text.indexOf('{');
  const last  = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const c = text.slice(first, last + 1);
    try { JSON.parse(c); return c; } catch { /* not valid JSON as extracted */ }
  }
  return null;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
`You are an SEO strategist specialising in SaaS content marketing.

Your job is to identify the BEST SEO angle for a CRO teardown article about a
specific company's homepage evolution. You reason from the search intent of the
likely audience, not just from keyword volume.

─── OUTPUT RULES ────────────────────────────────────────────────────────────────

1. Return ONLY valid JSON. No text before or after.

2. PRIMARY KEYWORD FORMAT
   • Must follow one of these patterns:
       "[Company name] homepage teardown"         (most common for this content type)
       "[Company name] CRO teardown"
       "[Company name] homepage analysis"
       "[Company name] landing page breakdown"
   • Choose the pattern that best matches how a SaaS marketer or founder would
     search for this content.
   • Use the real company name, not a generic placeholder.

3. PRIMARY INTENT
   • "informational"  — searcher wants to learn / understand
   • "commercial"     — searcher is evaluating a tool or decision
   • "navigational"   — searcher is looking for a specific page
   • For teardown content, "informational" is correct in >90% of cases.

4. AUDIENCE DESCRIPTION
   • Name the specific type of person searching this query.
   • What is their job? What decision are they trying to make?
   • Example: "A SaaS founder or growth marketer who has heard about [Company]'s
     positioning and wants to understand what changed before replicating it."

5. RECOMMENDED H1 FORMAT
   • A template string with [Company] as a placeholder.
   • Must contain the primary keyword naturally.
   • Must be specific to the TYPE of content (evolution/teardown/analysis).
   • Example: "How [Company] Rewrote Its Homepage Over 5 Years"

6. SECONDARY KEYWORDS
   • 3–5 long-tail variants a searcher might also use.
   • Must be plausible search queries, not content headings.

7. CONTENT ANGLE
   • The specific framing that best serves the searcher's job-to-be-done.
   • Example: "Focus on the WHY behind each change, not just the WHAT — the searcher
     wants to know whether to copy the strategy, not just what changed."

8. WHAT TO AVOID
   • Specific pitfalls that would make the article fail its intent.
   • Not generic ("don't be boring") — specific to this company and content type.

9. CONFIDENCE LEVEL
   • high   — company is well-known, query pattern is established
   • medium — company is niche or content type is less common for this brand
   • low    — company is obscure or intent is ambiguous`;

// ─── User prompt builder ──────────────────────────────────────────────────────

function buildUserPrompt(evidence: {
  companyName:   string;
  companyUrl:    string;
  fromLabel:     string;
  toLabel:       string;
  centralThesis: string;
  oldH1:         string;
  newH1:         string;
  h2Added:       string[];
  h2Removed:     string[];
  ctaAdded:      string[];
  navAdded:      string[];
  navRemoved:    string[];
}): string {
  return `Identify the best SEO intent angle for a CRO teardown article about ${evidence.companyName}.

COMPANY: ${evidence.companyName} (${evidence.companyUrl})
PERIOD:  ${evidence.fromLabel} → ${evidence.toLabel}

STRATEGIC THESIS (from Layer 3 detector, if available):
  ${evidence.centralThesis || '(not yet generated — derive from evidence below)'}

KEY CHANGES OBSERVED:
  H1 before: ${evidence.oldH1 || '(not captured)'}
  H1 after:  ${evidence.newH1 || '(not captured)'}
  Headings added:   ${evidence.h2Added.slice(0, 5).join(' | ') || '(none)'}
  Headings removed: ${evidence.h2Removed.slice(0, 5).join(' | ') || '(none)'}
  CTAs added:       ${evidence.ctaAdded.slice(0, 4).join(' | ') || '(none)'}
  Nav added:        ${evidence.navAdded.slice(0, 4).join(' | ') || '(none)'}
  Nav removed:      ${evidence.navRemoved.slice(0, 4).join(' | ') || '(none)'}

Return the JSON now with this exact shape:
{
  "primary_keyword": "<[Company name] homepage teardown OR [Company name] CRO teardown>",
  "primary_intent": "informational | commercial | navigational",
  "audience_description": "<specific person type, job role, decision they are making>",
  "recommended_h1_format": "<template with [Company] placeholder — must contain primary keyword naturally>",
  "secondary_keywords": ["<long-tail variant 1>", "<variant 2>", "<variant 3>"],
  "content_angle": "<specific framing that serves this searcher's job-to-be-done>",
  "what_the_searcher_wants": "<the actual job they are trying to get done>",
  "what_to_avoid": "<specific pitfall that would make this article miss the intent>",
  "confidence_level": "high | medium | low"
}`;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function runSeoIntentPlanner(
  opts: RunSeoIntentOpts,
): Promise<RunSeoIntentResult> {
  const { slug, writingDir, tracker, force = false, onLog } = opts;
  const sectionEvidenceDir = path.join(writingDir, 'section-evidence');
  const outputPath  = path.join(sectionEvidenceDir, 'seo-intent.json');
  const targetPath  = path.join(writingDir, 'seo-target.json');

  // Skip if already exists and not --force
  if (!force && fs.existsSync(outputPath)) {
    const existing = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as SeoIntent;
    onLog('seo-intent.json', true, 'exists — skipped (pass --force to regenerate)');
    return { intent: existing, skipped: true, costUsd: 0, outputPath, wroteTarget: false };
  }

  // ── Load evidence ─────────────────────────────────────────────────────────
  const packPath = path.join(writingDir, 'evidence-pack.json');
  if (!fs.existsSync(packPath)) {
    throw new Error(
      `evidence-pack.json not found at ${packPath}\n` +
      `Run Phase 4A first: npm run cro-teardown:generate-data -- --name <Company> --slug ${slug}`,
    );
  }

  const pack = JSON.parse(fs.readFileSync(packPath, 'utf-8')) as {
    companyName: string;
    companyUrl:  string;
    fromLabel:   string;
    toLabel:     string;
    diffSummary: {
      headlines:  Array<{ from: string; to: string }>;
      h2Added:    string[];
      h2Removed:  string[];
      ctaAdded:   string[];
      navAdded:   string[];
      navRemoved: string[];
    };
  };

  // Load strategic shift thesis if available (Layer 3 output)
  const shiftPath = path.join(sectionEvidenceDir, 'strategic-shift.json');
  let centralThesis = '';
  if (fs.existsSync(shiftPath)) {
    try {
      const shift = JSON.parse(fs.readFileSync(shiftPath, 'utf-8')) as { central_thesis?: string };
      centralThesis = shift.central_thesis ?? '';
    } catch { /* optional */ }
  }

  const ds = pack.diffSummary;
  const evidenceInput = {
    companyName:   pack.companyName,
    companyUrl:    pack.companyUrl,
    fromLabel:     pack.fromLabel,
    toLabel:       pack.toLabel,
    centralThesis,
    oldH1:         ds.headlines?.[0]?.from ?? '',
    newH1:         ds.headlines?.[0]?.to   ?? '',
    h2Added:       ds.h2Added    ?? [],
    h2Removed:     ds.h2Removed  ?? [],
    ctaAdded:      ds.ctaAdded   ?? [],
    navAdded:      ds.navAdded   ?? [],
    navRemoved:    ds.navRemoved ?? [],
  };

  // ── LLM call ──────────────────────────────────────────────────────────────
  const model = getModel('seoAuditor');  // Haiku — structured output, low complexity
  const userPrompt = buildUserPrompt(evidenceInput);

  onLog('Running SEO intent planner', true, `model: ${model}`);

  const response = await withRetry(() =>
    callLLM({
      model,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
      maxTokens: 1024,
    }),
  );

  const callCost = computeCallCost(model, 'seo-intent', response.inputTokens, response.outputTokens);
  tracker.add(callCost);
  const costUsd = callCost.totalCostUsd;

  // ── Parse ─────────────────────────────────────────────────────────────────
  const rawJson = extractJson(response.content);
  if (!rawJson) {
    throw new Error(`SEO intent planner returned non-JSON output:\n${response.content.slice(0, 300)}`);
  }

  let parsed: Partial<SeoIntent>;
  try {
    parsed = JSON.parse(rawJson) as Partial<SeoIntent>;
  } catch (err) {
    throw new Error(`SEO intent JSON parse error: ${(err as Error).message}`);
  }

  const intent: SeoIntent = {
    primary_keyword:         parsed.primary_keyword         ?? `${pack.companyName} homepage teardown`,
    primary_intent:          parsed.primary_intent          ?? 'informational',
    audience_description:    parsed.audience_description    ?? '',
    recommended_h1_format:   parsed.recommended_h1_format   ?? '',
    secondary_keywords:      parsed.secondary_keywords      ?? [],
    content_angle:           parsed.content_angle           ?? '',
    what_the_searcher_wants: parsed.what_the_searcher_wants ?? '',
    what_to_avoid:           parsed.what_to_avoid           ?? '',
    confidence_level:        parsed.confidence_level        ?? 'medium',
    generatedAt: new Date().toISOString(),
    model,
    costUsd,
  };

  // ── Save seo-intent.json ──────────────────────────────────────────────────
  fs.mkdirSync(sectionEvidenceDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(intent, null, 2), 'utf-8');
  onLog('seo-intent.json saved', true, `keyword: "${intent.primary_keyword}"  $${costUsd.toFixed(4)}`);

  // ── Auto-write seo-target.json if none exists ─────────────────────────────
  // Only when no manual seo-target.json is present — never override a manual keyword.
  let wroteTarget = false;
  if (!fs.existsSync(targetPath)) {
    const seoTarget = {
      slug,
      primaryKeyword: intent.primary_keyword,
      volume:         null,
      difficulty:     null,
      setAt:          new Date().toISOString(),
      setBy:          'seo-intent-planner (automated)',
    };
    fs.writeFileSync(targetPath, JSON.stringify(seoTarget, null, 2), 'utf-8');
    onLog('seo-target.json written', true, `"${intent.primary_keyword}" (auto — override with --keyword)`);
    wroteTarget = true;
  } else {
    onLog('seo-target.json', true, 'already exists — manual keyword preserved');
  }

  return { intent, skipped: false, costUsd, outputPath, wroteTarget };
}

// ─── Standalone CLI ───────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename || process.argv[1]?.endsWith('seo-intent-planner.js');

if (isMain) {
  const args  = process.argv.slice(2);
  const slug  = args[args.indexOf('--slug')  + 1] ?? '';
  const force = args.includes('--force');

  if (!slug) {
    console.error('Usage: npm run cro-teardown:seo-intent -- --slug <slug> [--force]');
    process.exit(1);
  }

  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');

  if (!fs.existsSync(writingDir)) {
    console.error(`Writing dir not found: ${writingDir}`);
    console.error('Run Phase 4A first: npm run cro-teardown:generate-data -- --name <Company> --slug ' + slug);
    process.exit(1);
  }

  const tracker = new CostTracker(1.0);

  runSeoIntentPlanner({
    slug,
    writingDir,
    tracker,
    force,
    onLog: (step, ok, detail) => console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`),
  })
    .then(result => {
      if (!result.skipped) {
        console.log(`\n✅  SEO intent saved: ${result.outputPath}`);
        console.log(`    primary_keyword: "${result.intent.primary_keyword}"`);
        console.log(`    intent:          ${result.intent.primary_intent}`);
        console.log(`    confidence:      ${result.intent.confidence_level}`);
        console.log(`    cost:            $${result.costUsd.toFixed(4)}`);
        if (result.wroteTarget) {
          console.log(`\n    ✓ seo-target.json auto-written with keyword "${result.intent.primary_keyword}"`);
          console.log('      Override with: npm run cro-teardown:seo-target -- --slug ' + slug + ' --keyword "<your keyword>"');
        }
      }
    })
    .catch(err => {
      console.error('\nFatal:', err instanceof Error ? err.message : err);
      process.exit(1);
    });
}
