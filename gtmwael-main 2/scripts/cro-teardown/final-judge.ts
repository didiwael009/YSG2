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
  /** Evidence accuracy: 0–15 */
  evidenceAccuracy: number;
  /** Risk control: 0–10 */
  riskControl: number;
  /** CRO usefulness: 0–15 */
  croUsefulness: number;
  /** Clarity: 0–20 */
  clarity: number;
  /** Section coherence: 0–10 */
  sectionCoherence: number;
  /** Phase 4M: CRO/GTM depth — buyer psychology, conversion implication, proof burden: 0–15 */
  analysisDepth?: number;
  /** Phase 4M: SaaS founder usefulness — practical takeaways, stage-specific fixes: 0–10 */
  founderUsefulness?: number;
  /** Phase 4N: Concision — no repeated conclusions, one idea per paragraph, no padding: 0–10 */
  concision?: number;
  /** Phase 4N: Editorial sharpness — section boundaries respected, no cross-section repetition: 0–10 */
  editorialSharpness?: number;
  /** Phase 4N: Sections or paragraphs that repeat the same conclusion. */
  repetitionWarnings?: string[];
  /** Phase 4N: Sections whose analysis bleeds into another section's territory. */
  sectionOverlapWarnings?: string[];
  /** Phase 4N: Full article word count (body only, excluding frontmatter). */
  articleWordCount?: number;
  weakSections: string[];
  unsupportedClaims: string[];
  riskFlags: string[];
  requiredFixes: string[];
  optionalImprovements: string[];
  rerunRecommendations: string[];
  /** Phase 4M: Sections flagged as generic — could apply to any SaaS homepage. */
  genericInsightWarnings?: string[];
  /** Phase 4M: Sections missing a practical SaaS founder takeaway. */
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

function buildCompressedEvidence(writingDir: string): Record<string, unknown> {
  const epPath = path.join(writingDir, 'evidence-pack.json');
  const bpPath = path.join(writingDir, 'article-blueprint.json');
  const qsPath = path.join(writingDir, 'quality-summary.json');

  const ep = fs.existsSync(epPath)
    ? (JSON.parse(fs.readFileSync(epPath, 'utf-8')) as EvidencePack)
    : null;

  const bp = fs.existsSync(bpPath)
    ? (JSON.parse(fs.readFileSync(bpPath, 'utf-8')) as Blueprint)
    : {};

  const qs = fs.existsSync(qsPath)
    ? (JSON.parse(fs.readFileSync(qsPath, 'utf-8')) as QualitySummary)
    : null;

  const ds = ep?.diffSummary;

  return {
    company:       ep?.companyName ?? 'unknown',
    url:           ep?.companyUrl ?? '',
    period:        `${ep?.fromLabel ?? ''} → ${ep?.toLabel ?? ''}`,
    snapshotCount: ep?.snapshots?.length ?? 0,

    // Primary copy changes (before/after — most important evidence)
    headlines:    ds?.headlines?.slice(0, 3) ?? [],
    metaDescs:    ds?.metaDescs?.slice(0, 3) ?? [],

    // Structural changes (counts + top examples)
    h2Added:      ds?.h2Added?.slice(0, 10) ?? [],
    h2AddedTotal: ds?.h2Added?.length ?? 0,
    h2Removed:    ds?.h2Removed?.slice(0, 10) ?? [],
    h2RemovedTotal: ds?.h2Removed?.length ?? 0,

    ctaAdded:     ds?.ctaAdded?.slice(0, 10) ?? [],
    ctaRemoved:   ds?.ctaRemoved?.slice(0, 10) ?? [],

    navAdded:     ds?.navAdded?.slice(0, 8) ?? [],
    navRemoved:   ds?.navRemoved?.slice(0, 8) ?? [],

    // Data quality
    dataQuality: bp.dataQuality ?? null,
    blueprintWarnings: bp.warnings ?? [],

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
    riskControl:        num('riskControl'),
    croUsefulness:      num('croUsefulness'),
    clarity:            num('clarity'),
    sectionCoherence:   num('sectionCoherence'),
    analysisDepth:      num('analysisDepth'),
    founderUsefulness:  num('founderUsefulness'),
    concision:          num('concision'),
    editorialSharpness: num('editorialSharpness'),
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
  const evidenceAccuracy  = toInt(obj.evidenceAccuracy, 20);
  const riskControl       = toInt(obj.riskControl, 15);
  const unsupportedClaims = asStringArray(obj.unsupportedClaims);

  // v3 pass: score threshold + evidence accuracy + risk control + no unsupported claims
  const pass =
    overallScore >= JUDGE_PASS_SCORE &&
    evidenceAccuracy >= 15 &&
    riskControl >= 11 &&
    unsupportedClaims.length === 0;

  const result: FinalJudgeResult = {
    overallScore,
    pass,
    evidenceAccuracy,
    riskControl,
    croUsefulness:    toInt(obj.mechanismQuality ?? obj.croUsefulness,  15),
    clarity:          toInt(obj.clarity,          15),
    sectionCoherence: toInt(obj.sectionCoherence, 15),
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

  // v3 optional fields
  const founderSharpness = typeof obj.founderSharpness !== 'undefined' ? toInt(obj.founderSharpness, 20) : undefined;
  if (founderSharpness !== undefined) result.founderUsefulness = founderSharpness; // map to existing field
  const repetitionWarn = asStringArray(obj.repetitionWarnings);
  if (repetitionWarn.length > 0) result.repetitionWarnings = repetitionWarn;

  return result;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const JUDGE_SYSTEM =
`You are a senior editorial judge for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.
JSON SAFETY: Use SINGLE quotes inside JSON string values. Never put a raw double-quote inside a JSON string.

Your role: Evaluate the FULL ARTICLE for evidence accuracy, risk control, mechanism quality, founder sharpness, clarity, and section coherence.

SCORING RUBRIC — score each dimension, then give a holistic overallScore (0–100):

• evidenceAccuracy (0–20)
  Every factual claim traces to the provided evidence. No invented stats, percentages, thresholds, or dates.
  PENALISE -4 per claim that introduces a fact not in the evidence.
  PENALISE -8 per conversion metric, A/B test result, revenue claim, or invented threshold.
  HARD CAP: Any unsupported factual claim → cap total at 70.

• riskControl (0–15)
  Interpretations are hedged precisely — once per inference, not once per sentence.
  No causation claims. No conversion-outcome predictions. No intent attribution.
  PENALISE -3 per unlabelled interpretation presented as confirmed fact.
  PENALISE -5 per claim that a change "improved," "drove," or "caused" any outcome.
  PENALISE -3 per prediction about conversion volume, trial starts, or revenue.
  PENALISE -3 per sentence that asserts company strategy or intent without evidence.
  HARD CAP: Any conversion outcome claim → cap total at 65.

• mechanismQuality (0–15)
  Each analytical section (03, 04, 05, 06) names a GTM, buyer-psychology, or conversion principle.
  Real terminology: "qualification filter," "category claim," "intent signal," "buyer stage mismatch,"
  "identity recruitment," "aspiration signaling," "procurement-stage targeting."
  PENALISE -5 per analytical section with no named mechanism — only observations.
  PENALISE -3 per vague mechanism ("a shift in targeting" instead of a named principle).

• founderSharpness (0–20)
  Each analytical section (03, 04, 05, 06) must contain ALL THREE as CONTENT (not as labeled tags):
  (a) A TRADEOFF — two things in tension, one sentence. Not labeled "The tradeoff:". Just stated.
  (b) A FOUNDER TEST — the last sentence. A specific condition or audit they can run RIGHT NOW on
      their own homepage. Not generic. Anchored to what this evidence showed.
  (c) No prediction of conversion outcomes — the test is an observation prompt, not a forecast.
  PENALISE -5 per analytical section missing a tradeoff.
  PENALISE -5 per analytical section with no founder test as last sentence.
  PENALISE -4 per founder test that is generic ("test your CTAs") with no evidence anchor.

• clarity (0–15)
  Writing is punchy, varied rhythm, no padding. Short sentence. Then a longer explanatory one.
  PENALISE -2 per filler sentence with no evidence anchor.
  PENALISE -3 if multiple sections open with identical rhythm (all bold declarative, no variety).

• sectionCoherence (0–15)
  Sections form a building argument — not 5 isolated islands.
  Each section owns one job and does not repeat another section's core conclusion.
  PENALISE -4 per conclusion that appears in 3+ sections with the same thrust
    (e.g., "brand-led repositioning" framing repeated in 03, 04, AND 06).
  PENALISE -3 if the Lessons section restates analysis without converting it to action.
  PENALISE -2 per paragraph that a reader could skip without losing information.
  HARD CAP: Same analytical conclusion in 3+ sections → cap overallScore at 82.

MECHANISM NAMES ARE NOT UNSUPPORTED CLAIMS:
Named interpretive frameworks applied to the evidence are ALLOWED and REQUIRED by the writing system:
  "qualification filter," "category claim," "ICP narrowing," "aspiration positioning,"
  "procurement-stage framing," "identity recruitment," "buyer stage mismatch,"
  "incremental repositioning," "category claim shift," "workflow abstraction."
These are labeled interpretations — they are hedges, not facts. Do NOT list them as unsupportedClaims.
An unsupportedClaim is a SPECIFIC FACT (a number, a date, a metric, a named event) that is NOT in the evidence.

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
overallScore >= 90 AND evidenceAccuracy >= 15 AND riskControl >= 11 AND unsupportedClaims empty → pass: true.
Any other combination → pass: false.

CALIBRATION:
• 90–100: Publication-ready. Every claim sourced. Named mechanism in every section. Tradeoff and
          founder test woven into every analytical section. No repeated conclusions. Varied rhythm.
• 80–89:  Passes with notes. 1–2 fixable issues.
• 70–79:  Needs fixes. Missing mechanisms, repeated conclusions, or unsupported claims.
• Below 70: Hard cap fired. Unsupported claims or conversion-outcome predictions present.`;

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

Score each rubric dimension. Apply pass logic: overallScore >= 85 AND evidenceAccuracy >= 15 AND riskControl >= 11 AND unsupportedClaims empty.

EVIDENCE CHECK — answer before scoring:
1. Is any specific metric, percentage threshold, or conversion rate cited that is NOT in the evidence above? List the exact phrase.
2. Does any sentence predict a conversion outcome ("trial-start volume will...", "this will cost you pipeline") without data? List the exact phrase.
3. Does any sentence assert company intent or internal strategy ("Shopify decided to...", "their strategy was...")? List the exact phrase.

MECHANISM CHECK — answer before scoring:
4. Does each analytical section (03, 04, 05, 06) name a GTM, buyer-psychology, or conversion principle with real terminology?
5. Which sections have only observations with no named mechanism?

FOUNDER-SHARPNESS CHECK — answer before scoring:
6. Does each analytical section (03, 04, 05, 06) contain a tradeoff woven into the prose (two things in tension, one sentence — NOT labeled)?
7. Is the last sentence of each analytical section a specific, actionable founder test anchored to this evidence?
8. Which sections fail either check?

COHERENCE CHECK — answer before scoring:
9. Count how many sections contain the "brand-led repositioning / category ownership" conclusion. (Target: 1, in 03 or 06)
10. Count how many sections mention CTA friction direction. (Target: 1, in 05)
11. Are there any paragraphs that exceed 90 words without introducing a new idea?

Required JSON shape:
{
  "overallScore": <0–100>,
  "pass": <boolean — overallScore >= 85 AND evidenceAccuracy >= 15 AND riskControl >= 11 AND unsupportedClaims empty>,
  "evidenceAccuracy": <0–20>,
  "riskControl": <0–15>,
  "mechanismQuality": <0–15>,
  "founderSharpness": <0–20>,
  "clarity": <0–15>,
  "sectionCoherence": <0–15>,
  "weakSections": ["<section ID>"],
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
