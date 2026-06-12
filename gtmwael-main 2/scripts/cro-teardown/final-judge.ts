/**
 * final-judge.ts — Phase 4D article judge.
 *
 * Evaluates the assembled article-final.md against compressed evidence for:
 *   - Evidence accuracy (every claim traceable to evidence)
 *   - Risk control (no unsupported causation, no conversion-lift claims)
 *   - CRO usefulness (actionable for SaaS practitioners)
 *   - Clarity (readable, purposeful prose)
 *   - Section coherence (sections flow as a unified article)
 *
 * Reads:
 *   article-final.md, seo.json, quality-summary.json,
 *   article-blueprint.json, evidence-pack.json (compressed)
 *
 * Writes:
 *   data/cro-teardowns/[slug]/writing/final-judge.json
 *
 * SECURITY: API key read exclusively from process.env or .env file.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { callLLM } from './llm/anthropic-client.js';
import { CostTracker } from './llm/token-cost.js';
import { withRetry } from './llm/retry.js';
import {
  JUDGE_MODEL_BY_MODE,
  MODEL_PRICING,
  JUDGE_PASS_SCORE,
} from './config/writing-config.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FinalJudgeOpts {
  slug: string;
  writingDir: string;
  /** Run mode — controls judge model selection. */
  mode: string;
  tracker: CostTracker;
  onLog: (step: string, ok: boolean, detail?: string) => void;
}

export interface FinalJudgeResult {
  overallScore: number;
  pass: boolean;
  /** V5: Every claim traces to evidence: 0–25 */
  evidenceAccuracy: number;
  /** V5: Plain explainer voice, no jargon: 0–20 */
  plainLanguage: number;
  /** V5: H3 subheadings in analytical sections, ≤60-word paragraphs: 0–15 */
  scannability: number;
  /** V5: ## headings contain company name or searchable topic: 0–10 */
  searchableHeadings: number;
  /** V5: Anchored to THIS company, not generic SaaS: 0–15 */
  specificity: number;
  /** V5: Sentence length varies, opening fits evidence: 0–10 */
  rhythmAndOpening: number;
  /** V5: Practical takeaway per H3, runnable test at end: 0–5 */
  founderTakeaway: number;
  /** Legacy alias kept for consumers that read riskControl */
  riskControl: number;
  /** Legacy alias kept for consumers that read croUsefulness */
  croUsefulness: number;
  /** Legacy alias kept for consumers that read clarity */
  clarity: number;
  /** Legacy alias kept for consumers that read sectionCoherence */
  sectionCoherence: number;
  repetitionWarnings?: string[];
  sectionOverlapWarnings?: string[];
  articleWordCount?: number;
  weakSections: string[];
  unsupportedClaims: string[];
  riskFlags: string[];
  requiredFixes: string[];
  optionalImprovements: string[];
  rerunRecommendations: string[];
  genericInsightWarnings?: string[];
  missingFounderTakeawayWarnings?: string[];
  model: string;
  costUsd: number;
  generatedAt: string;
}

// ─── Compressed evidence builder ─────────────────────────────────────────────

interface EvidencePack {
  companyName: string;
  companyUrl: string;
  fromLabel: string;
  toLabel: string;
  snapshots: unknown[];
  diffSummary: {
    headlineChanges: number;
    metaDescChanges: number;
    h2Added: string[];
    h2Removed: string[];
    ctaAdded: string[];
    ctaRemoved: string[];
    navAdded: string[];
    navRemoved: string[];
    headlines: Array<{ from: string; to: string }>;
    metaDescs: Array<{ from: string; to: string }>;
  };
}

interface QualitySummary {
  averageScore: number | null;
  passCount: number;
  failCount: number;
  sections: Array<{
    sectionId: string;
    finalScore: number | null;
    passed: boolean;
    riskFlags: string[];
    remainingIssues: string[];
    loopsUsed: number;
  }>;
  allRiskFlags: string[];
  weakSections: string[];
}

interface Blueprint {
  dataQuality?: Record<string, unknown>;
  warnings?: string[];
}

interface NormalizedText {
  raw?: {
    title?: string;
    metaDescription?: string;
    h1?: string[];
    h2?: string[];
    h3?: string[];
  };
}

interface NormalizedPageText {
  from?: NormalizedText;
  to?: NormalizedText;
}

function buildCompressedEvidence(writingDir: string): Record<string, unknown> {
  const epPath   = path.join(writingDir, 'evidence-pack.json');
  const bpPath   = path.join(writingDir, 'article-blueprint.json');
  const qsPath   = path.join(writingDir, 'quality-summary.json');
  // normalized-page-text is what writers receive — judge must see a superset
  const normPath = path.join(writingDir, 'section-evidence', 'normalized-page-text.json');

  const ep = fs.existsSync(epPath)
    ? (JSON.parse(fs.readFileSync(epPath, 'utf-8')) as EvidencePack)
    : null;

  const bp = fs.existsSync(bpPath)
    ? (JSON.parse(fs.readFileSync(bpPath, 'utf-8')) as Blueprint)
    : {};

  const qs = fs.existsSync(qsPath)
    ? (JSON.parse(fs.readFileSync(qsPath, 'utf-8')) as QualitySummary)
    : null;

  const norm = fs.existsSync(normPath)
    ? (JSON.parse(fs.readFileSync(normPath, 'utf-8')) as NormalizedPageText)
    : null;

  const ds = ep?.diffSummary;

  // Page title changes — seen by writers via normalized text, previously invisible to judge
  const titleFrom = norm?.from?.raw?.title ?? null;
  const titleTo   = norm?.to?.raw?.title   ?? null;
  const pageTitles = (titleFrom || titleTo)
    ? [{ from: titleFrom ?? '', to: titleTo ?? '' }]
    : [];

  // Visual analysis — available when visual-analyzer.ts has run
  const visualPath   = path.join(writingDir, 'section-evidence', 'visual-analysis.json');
  const visualData   = fs.existsSync(visualPath)
    ? (JSON.parse(fs.readFileSync(visualPath, 'utf-8')) as Record<string, unknown>)
    : null;

  // Business context research — available when context-researcher.ts has run
  const researchPath = path.join(writingDir, 'section-evidence', 'business-context-research.json');
  const researchData = fs.existsSync(researchPath)
    ? (JSON.parse(fs.readFileSync(researchPath, 'utf-8')) as Record<string, unknown>)
    : null;

  return {
    company:       ep?.companyName ?? 'unknown',
    url:           ep?.companyUrl ?? '',
    period:        `${ep?.fromLabel ?? ''} → ${ep?.toLabel ?? ''}`,
    snapshotCount: ep?.snapshots?.length ?? 0,

    // Primary copy changes (before/after — most important evidence)
    headlines:    ds?.headlines?.slice(0, 3) ?? [],
    metaDescs:    ds?.metaDescs?.slice(0, 3) ?? [],
    // Page title changes — writers see this via normalized-page-text; judge must too
    pageTitles,

    // Structural changes (counts + top examples)
    h2Added:      ds?.h2Added?.slice(0, 10) ?? [],
    h2AddedTotal: ds?.h2Added?.length ?? 0,
    h2Removed:    ds?.h2Removed?.slice(0, 10) ?? [],
    h2RemovedTotal: ds?.h2Removed?.length ?? 0,

    ctaAdded:     ds?.ctaAdded?.slice(0, 10) ?? [],
    ctaRemoved:   ds?.ctaRemoved?.slice(0, 10) ?? [],

    navAdded:     ds?.navAdded?.slice(0, 8) ?? [],
    navRemoved:   ds?.navRemoved?.slice(0, 8) ?? [],

    // H3 snapshot (structural context writers have)
    h3From: norm?.from?.raw?.h3?.slice(0, 8) ?? [],
    h3To:   norm?.to?.raw?.h3?.slice(0, 8)   ?? [],

    // Data quality
    dataQuality: bp.dataQuality ?? null,
    blueprintWarnings: bp.warnings ?? [],

    // V6 enrichment — available for articles run through the new pipeline.
    // Include enough detail for the judge to verify specific claims writers make
    // (visual sophistication scores, specific key events with dates/types).
    visualAnalysis: visualData ? {
      design_evolution_label: visualData.design_evolution_label,
      visual_shift_summary:   visualData.visual_shift_summary,
      snapshots: visualData.snapshots,  // full per-snapshot scores so judge can verify numerical citations
    } : null,
    businessContextResearch: researchData ? {
      company_stage_start: researchData.company_stage_start,
      company_stage_end:   researchData.company_stage_end,
      category_context:    researchData.category_context,
      icp_evolution:       researchData.icp_evolution,
      key_events:          researchData.key_events,  // full list so judge can verify specific dates/figures
      confidence_level:    researchData.confidence_level,
    } : null,

    // Section-level quality from Phase 4C
    sectionScores: qs?.sections?.map(s => ({
      sectionId:     s.sectionId,
      score:         s.finalScore,
      passed:        s.passed,
      riskFlagCount: s.riskFlags.length,
      loopsUsed:     s.loopsUsed,
    })) ?? [],
    sectionRiskFlags: qs?.allRiskFlags ?? [],
    weakSections:     qs?.weakSections ?? [],
  };
}

// ─── JSON extractor (same pattern as json-guard.ts) ──────────────────────────

function extractJson(text: string): string | null {
  try { JSON.parse(text.trim()); return text.trim(); } catch {}
  const block = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (block) { try { JSON.parse(block[1].trim()); return block[1].trim(); } catch {} }
  const first = text.indexOf('{');
  const last  = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const c = text.slice(first, last + 1);
    try { JSON.parse(c); return c; } catch {}
  }
  return null;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

/**
 * Last-resort salvage when the judge emits JSON with unescaped inner quotes
 * (our articles are dense with **"bold quotes"**, which the judge sometimes
 * reproduces raw inside string-array fields). Recovers the scalar scores via
 * regex and gates conservatively: `pass` can only stay true if we can VERIFY
 * unsupportedClaims is an empty array — otherwise we assume problems exist.
 */
function salvageJudgeObject(text: string): Record<string, unknown> | null {
  const num = (k: string): number | undefined => {
    const m = text.match(new RegExp(`"${k}"\\s*:\\s*(\\d+)`));
    return m ? parseInt(m[1], 10) : undefined;
  };
  const overallScore = num('overallScore');
  if (overallScore === undefined) return null;   // nothing usable

  // unsupportedClaims emptiness gates pass. Found-and-empty → []; anything else → sentinel (forces fail).
  const uc = text.match(/"unsupportedClaims"\s*:\s*\[([\s\S]*?)\]/);
  const unsupportedEmpty = uc ? uc[1].trim() === '' : false;

  return {
    overallScore,
    evidenceAccuracy:   num('evidenceAccuracy'),
    plainLanguage:      num('plainLanguage'),
    scannability:       num('scannability'),
    searchableHeadings: num('searchableHeadings'),
    specificity:        num('specificity'),
    rhythmAndOpening:   num('rhythmAndOpening'),
    founderTakeaway:    num('founderTakeaway'),
    // legacy aliases
    riskControl:        0,
    croUsefulness:      0,
    clarity:            0,
    sectionCoherence:   0,
    articleWordCount:   num('articleWordCount'),
    unsupportedClaims:  unsupportedEmpty ? [] : ['<judge JSON salvage — claims field unparseable>'],
    weakSections: [], riskFlags: [], requiredFixes: [],
    optionalImprovements: [], rerunRecommendations: [],
  };
}

function toInt(v: unknown, max: number): number {
  return typeof v === 'number' ? Math.round(Math.max(0, Math.min(max, v))) : 0;
}

function parseJudgeResponse(
  raw: string,
  model: string,
  costUsd: number,
): FinalJudgeResult {
  const jsonStr = extractJson(raw);
  let obj: Record<string, unknown> | null = null;
  if (jsonStr) {
    try {
      obj = JSON.parse(jsonStr) as Record<string, unknown>;
    } catch { obj = null; }
  }
  if (!obj) {
    obj = salvageJudgeObject(raw);
    if (!obj) {
      throw new Error(
        `Could not extract or salvage JSON from judge response.\nFirst 500 chars:\n${raw.slice(0, 500)}`,
      );
    }
  }

  const overallScore      = toInt(obj.overallScore, 100);
  const evidenceAccuracy  = toInt(obj.evidenceAccuracy, 25);
  const unsupportedClaims = asStringArray(obj.unsupportedClaims);

  // V5 pass: score threshold + no unsupported claims
  const pass =
    overallScore >= JUDGE_PASS_SCORE &&
    unsupportedClaims.length === 0;

  const result: FinalJudgeResult = {
    overallScore,
    pass,
    evidenceAccuracy,
    plainLanguage:      toInt(obj.plainLanguage,      20),
    scannability:       toInt(obj.scannability,       15),
    searchableHeadings: toInt(obj.searchableHeadings, 10),
    specificity:        toInt(obj.specificity,        15),
    rhythmAndOpening:   toInt(obj.rhythmAndOpening,   10),
    founderTakeaway:    toInt(obj.founderTakeaway,      5),
    // legacy aliases — not scored in V5 but kept for downstream consumers
    riskControl:      0,
    croUsefulness:    0,
    clarity:          0,
    sectionCoherence: 0,
    weakSections:        asStringArray(obj.weakSections),
    unsupportedClaims,
    riskFlags:           asStringArray(obj.riskFlags),
    requiredFixes:       asStringArray(obj.requiredFixes),
    optionalImprovements: asStringArray(obj.optionalImprovements),
    rerunRecommendations: asStringArray(obj.rerunRecommendations),
    model,
    costUsd,
    generatedAt: new Date().toISOString(),
  };

  const repetitionWarn = asStringArray(obj.repetitionWarnings);
  if (repetitionWarn.length > 0) result.repetitionWarnings = repetitionWarn;

  return result;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const JUDGE_SYSTEM =
`You are a senior editorial judge for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.
JSON SAFETY: Use SINGLE quotes inside JSON string values. Never put a raw double-quote inside a JSON string.

Your role: Evaluate the FULL ARTICLE against the V5 rubric below.

SCORING RUBRIC — score each dimension, then give a holistic overallScore (0–100):

• evidenceAccuracy (0–25)
  Every factual claim traces to the compressed evidence provided. No invented stats, percentages,
  thresholds, or dates.
  PENALISE -5 per claim that introduces a specific fact (number, date, metric) not in the evidence.
  PENALISE -10 per conversion metric, A/B test result, revenue claim, or invented threshold.
  HARD CAP: Any unsupported factual claim → cap total at 70.

• plainLanguage (0–20)
  Plain explainer voice throughout. No marketing jargon ("synergies," "holistic," "leverage"),
  no consultant-speak, no passive voice hiding agency.
  Short, declarative sentences. Explain the CRO concept in plain terms before applying it.
  PENALISE -4 per paragraph dense with unexplained jargon.
  PENALISE -3 per sentence that buries the finding in abstraction.

• scannability (0–15)
  Analytical sections use H3 subheadings that label WHAT is being shown.
  Paragraphs are ≤60 words. No wall-of-text blocks.
  PENALISE -3 per analytical section with no H3 subheadings.
  PENALISE -2 per paragraph that exceeds 60 words without a structural break.

• searchableHeadings (0–10)
  Every ## section heading contains the company name OR a searchable topic phrase
  (e.g., "Shopify homepage CTA copy" not just "CTA Analysis").
  PENALISE -3 per ## heading that is generic and contains neither the company name nor a specific topic.

• specificity (0–15)
  Analysis is anchored to THIS company's specific evidence — not generic SaaS best-practice recitations.
  Every analytical paragraph should cite at least one piece of specific evidence (a headline change,
  a removed nav item, a new CTA label).
  PENALISE -4 per paragraph that reads like generic SaaS advice with no company-specific anchor.
  PENALISE -3 per section where the company name could be swapped for any competitor without changing the point.

• rhythmAndOpening (0–10)
  Sentence length varies — short punchy sentences alternate with longer explanatory ones.
  Article opening fits the evidence (does not make claims the evidence cannot support).
  PENALISE -3 if all sections open with the same rhythm (all bold statements, no variety).
  PENALISE -4 if the opening paragraph asserts a conclusion not directly supported by the evidence summary.

• founderTakeaway (0–5)
  Each H3 block ends with a practical observation the founder can apply to their own homepage.
  The final section ends with a runnable test — a specific thing to check or change.
  PENALISE -1 per H3 block with no founder-facing takeaway.
  PENALISE -2 if the final runnable test is generic ("test your CTA") with no evidence anchor.

MECHANISM NAMES ARE NOT UNSUPPORTED CLAIMS:
Named interpretive frameworks applied to the evidence are ALLOWED and REQUIRED by the writing system:
  "qualification filter," "category claim," "ICP narrowing," "aspiration positioning,"
  "procurement-stage framing," "identity recruitment," "buyer stage mismatch,"
  "incremental repositioning," "category claim shift," "workflow abstraction."
These are labeled interpretations — they are hedges, not facts. Do NOT list them as unsupportedClaims.
An unsupportedClaim is a SPECIFIC FACT (a number, a date, a metric, a named event) that is NOT in the evidence.

OWNED EVIDENCE SOURCES — ALWAYS VALID:
The following are Wael Aouididi's published works hosted at gtmwael.com. Any framework,
principle, threshold, or metric cited as coming FROM these sources is valid evidence:
  - Landing Page Playbook 2026 (file: wael-landing-page-playbook-2026.pdf)
  - Growth Playbook 2026 (file: wael-growth-playbook-2026.pdf)
Do NOT flag citations to these books as unsupportedClaims. They are first-party published
research, not invented facts. A sentence like "according to the Landing Page Playbook 2026,
X% of..." is valid. A sentence that states a number from the book WITHOUT attribution
("X% of accounts...") still needs the attribution to be valid — flag only if no attribution
to the book is present AND the number is absent from the compressed evidence.

HARD RULES:
• Any invented metric (percentage threshold, conversion rate, search volume figure) → unsupportedClaim.
• Any sentence predicting a specific conversion outcome ("trial starts will...", "this will improve...") → riskFlag.
• Any sentence asserting specific company intent ("Shopify decided to...", "their strategy was...") → riskFlag.
• Conditional observations ("this pattern only works if X") are ALLOWED — they are not predictions.
• Hedged observations using "may", "appears to", "assumes" are ALLOWED — they are not unsupported claims.
• Observations about page architecture ("the page cannot serve X visitor") are ALLOWED — they describe structure.
• Vocabulary register inferences ("the 2021 copy named workflow steps") are ALLOWED — they describe text.
• If requiredFixes is non-empty, rerunRecommendations must name which section(s) to rerun.

PASS CRITERIA:
overallScore >= 90 AND unsupportedClaims empty → pass: true.
Any other combination → pass: false.

CALIBRATION:
• 90–100: Publication-ready. Every claim sourced. Plain voice throughout. H3 structure present.
          Headings searchable. Analysis company-specific. Rhythm varied. Founder takeaways present.
• 80–89:  Strong but 1–2 fixable issues (a generic heading, a jargon-heavy paragraph).
• 70–79:  Needs fixes. Generic sections, jargon, or unsupported claims present.
• Below 70: Hard cap fired. Unsupported factual claims present.`;

// ─── Main exported function ───────────────────────────────────────────────────

export async function runFinalJudge(opts: FinalJudgeOpts): Promise<FinalJudgeResult> {
  const { slug, writingDir, mode, tracker, onLog } = opts;

  const articlePath = path.join(writingDir, 'article-final.md');
  const seoPath     = path.join(writingDir, 'seo.json');
  const outputPath  = path.join(writingDir, 'final-judge.json');

  if (!fs.existsSync(articlePath)) {
    throw new Error(`article-final.md not found at ${articlePath}`);
  }

  const articleText = fs.readFileSync(articlePath, 'utf-8');
  const seoData = fs.existsSync(seoPath)
    ? JSON.parse(fs.readFileSync(seoPath, 'utf-8')) as Record<string, unknown>
    : {};

  const evidence = buildCompressedEvidence(writingDir);
  const judgeModel = JUDGE_MODEL_BY_MODE[mode] ?? JUDGE_MODEL_BY_MODE['standard']!;

  onLog(`Final judge [${judgeModel}]`, true, 'calling API…');

  const userPrompt = `Evaluate this CRO teardown article for ${String(evidence.company)}.

COMPRESSED EVIDENCE (ground truth — every article claim must trace to this):
${JSON.stringify(evidence, null, 2)}

SEO METADATA:
${JSON.stringify(seoData, null, 2)}

FULL ARTICLE:
---
${articleText}
---

Score each V5 rubric dimension. Apply pass logic: overallScore >= 90 AND unsupportedClaims empty.

EVIDENCE CHECK — answer before scoring:
1. Is any specific metric, percentage threshold, or conversion rate cited that is NOT in the evidence above? List the exact phrase.
2. Does any sentence predict a conversion outcome ("trial-start volume will...", "this will cost you pipeline") without data? List the exact phrase.
3. Does any sentence assert company intent or internal strategy ("Shopify decided to...", "their strategy was...")? List the exact phrase.

PLAIN LANGUAGE CHECK — answer before scoring:
4. Are there paragraphs dense with unexplained jargon or consultant-speak? List the section and phrase.
5. Does the article explain CRO concepts in plain terms before applying them?

SCANNABILITY CHECK — answer before scoring:
6. Do analytical sections have H3 subheadings? Which sections are missing them?
7. Are there paragraphs exceeding 60 words? Count them.

SEARCHABLE HEADINGS CHECK — answer before scoring:
8. Do all ## headings contain the company name or a specific searchable topic phrase?
9. List any ## heading that is generic (no company name, no specific topic).

SPECIFICITY CHECK — answer before scoring:
10. Is each analytical paragraph anchored to specific evidence from this company?
11. Which paragraphs read like generic SaaS advice that could apply to any homepage?

FOUNDER TAKEAWAY CHECK — answer before scoring:
12. Does each H3 block end with a practical takeaway for a SaaS founder?
13. Does the final section end with a specific runnable test anchored to this evidence?

Required JSON shape:
{
  "overallScore": <0–100>,
  "pass": <boolean — overallScore >= 90 AND unsupportedClaims empty>,
  "evidenceAccuracy": <0–25>,
  "plainLanguage": <0–20>,
  "scannability": <0–15>,
  "searchableHeadings": <0–10>,
  "specificity": <0–15>,
  "rhythmAndOpening": <0–10>,
  "founderTakeaway": <0–5>,
  "weakSections": ["<section ID or heading>"],
  "unsupportedClaims": ["<exact phrase from article that is not in the evidence>"],
  "riskFlags": ["<interpretation presented as fact, causation claim, or conversion prediction>"],
  "requiredFixes": ["<specific, actionable fix>"],
  "optionalImprovements": ["<nice-to-have>"],
  "rerunRecommendations": ["<section ID to rerun — only if requiredFixes non-empty>"],
  "repetitionWarnings": ["<analytical conclusion that appears in 3+ sections>"]
}`;

  const costBefore = tracker.totalCostUsd;

  const resp = await withRetry(
    () => callLLM({
      model:     judgeModel,
      system:    JUDGE_SYSTEM,
      messages:  [{ role: 'user', content: userPrompt }],
      maxTokens: 4096, // Phase 4N: extra judge fields (concision, editorialSharpness, repetitionWarnings, sectionOverlapWarnings, articleWordCount)
    }),
    { onRetry: (a, e, d) => onLog(`Judge retry ${a}`, false, `${e.message} (${d}ms)`) },
  );

  const pricing = MODEL_PRICING[judgeModel] ?? MODEL_PRICING['claude-sonnet-4-5']!;
  tracker.add({
    model:         judgeModel,
    role:          'final-judge',
    inputTokens:   resp.inputTokens,
    outputTokens:  resp.outputTokens,
    inputCostUsd:  (resp.inputTokens  / 1_000_000) * pricing.inputPerMTok,
    outputCostUsd: (resp.outputTokens / 1_000_000) * pricing.outputPerMTok,
    totalCostUsd:  ((resp.inputTokens / 1_000_000) * pricing.inputPerMTok) +
                   ((resp.outputTokens / 1_000_000) * pricing.outputPerMTok),
    timestamp:     new Date().toISOString(),
  });

  const costUsd = tracker.totalCostUsd - costBefore;
  const result  = parseJudgeResponse(resp.content, judgeModel, costUsd);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

  onLog(
    `Final judge`,
    result.pass,
    `score ${result.overallScore}/100 — ${result.pass ? 'PASS ✓' : 'FAIL'} — $${costUsd.toFixed(4)}`,
  );

  return result;
}
