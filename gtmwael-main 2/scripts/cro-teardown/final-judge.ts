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

  const overallScore     = toInt(obj.overallScore, 100);
  const evidenceAccuracy = toInt(obj.evidenceAccuracy, 15);
  const riskControl      = toInt(obj.riskControl, 10);
  const unsupportedClaims = asStringArray(obj.unsupportedClaims);
  const analysisDepth    = typeof obj.analysisDepth !== 'undefined' ? toInt(obj.analysisDepth, 15) : undefined;
  const founderUsefulness = typeof obj.founderUsefulness !== 'undefined' ? toInt(obj.founderUsefulness, 10) : undefined;
  const concision        = typeof obj.concision !== 'undefined' ? toInt(obj.concision, 10) : undefined;
  const editorialSharpness = typeof obj.editorialSharpness !== 'undefined' ? toInt(obj.editorialSharpness, 10) : undefined;
  const articleWordCount = typeof obj.articleWordCount === 'number' ? Math.round(obj.articleWordCount) : undefined;

  const pass =
    overallScore >= JUDGE_PASS_SCORE &&
    evidenceAccuracy >= 12 &&
    riskControl >= 8 &&
    unsupportedClaims.length === 0 &&
    (analysisDepth === undefined || analysisDepth >= 10) &&
    (founderUsefulness === undefined || founderUsefulness >= 7) &&
    (concision === undefined || concision >= 7);

  const result: FinalJudgeResult = {
    overallScore,
    pass,
    evidenceAccuracy,
    riskControl,
    croUsefulness:    toInt(obj.croUsefulness,    15),
    clarity:          toInt(obj.clarity,          20),
    sectionCoherence: toInt(obj.sectionCoherence, 10),
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

  if (analysisDepth !== undefined)     result.analysisDepth     = analysisDepth;
  if (founderUsefulness !== undefined) result.founderUsefulness  = founderUsefulness;
  if (concision !== undefined)         result.concision          = concision;
  if (editorialSharpness !== undefined) result.editorialSharpness = editorialSharpness;
  if (articleWordCount !== undefined)  result.articleWordCount   = articleWordCount;

  const genericWarnings = asStringArray(obj.genericInsightWarnings);
  const takeawayWarnings = asStringArray(obj.missingFounderTakeawayWarnings);
  const repetitionWarn  = asStringArray(obj.repetitionWarnings);
  const overlapWarn     = asStringArray(obj.sectionOverlapWarnings);
  if (genericWarnings.length > 0)   result.genericInsightWarnings          = genericWarnings;
  if (takeawayWarnings.length > 0)  result.missingFounderTakeawayWarnings  = takeawayWarnings;
  if (repetitionWarn.length > 0)    result.repetitionWarnings              = repetitionWarn;
  if (overlapWarn.length > 0)       result.sectionOverlapWarnings          = overlapWarn;

  return result;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const JUDGE_SYSTEM =
`You are a senior editorial judge for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.

Your role: Evaluate the FULL ARTICLE for evidence accuracy, risk control, CRO depth, GTM depth, SaaS founder usefulness, clarity, and section coherence.

SCORING RUBRIC — score each dimension, then give a holistic overallScore (0–100):
• evidenceAccuracy  (0–15): Does every factual claim in the article trace to the provided evidence?
  PENALISE -3 per claim that introduces a fact not in the evidence.
  PENALISE -5 per conversion metric, A/B test result, or revenue claim without data.
• riskControl       (0–10): Are interpretations consistently labelled? No causation claims? No conversion-lift claims?
  PENALISE -3 per unlabelled interpretation presented as fact.
  PENALISE -5 per claim that a change "improved", "increased", "drove" any outcome.
• croUsefulness     (0–15): Does the article give SaaS practitioners something they can study?
  PENALISE -4 per section that is generic and not anchored to this company's specific evidence.
• clarity           (0–20): Is the writing clear, purposeful, and free of padding?
  PENALISE -2 per paragraph that a reader could skip without losing information.
  PENALISE -3 per filler phrase not tied to evidence.
• sectionCoherence  (0–10): Do the sections form a coherent, readable article (not just 6 isolated blocks)?
  PENALISE -3 if sections repeat the same observations without building on them.
  PENALISE -2 if the opening does not set up what follows.
• analysisDepth     (0–15): Does the article go beyond surface description? Does it explain conversion
  implications, buyer psychology, proof burdens, and CTA/funnel signals — not just what changed?
  PENALISE -4 per analytical section that only describes visible changes without explaining their
  conversion or buyer-psychology implications.
  PENALISE -3 per section that could apply to any generic SaaS homepage without company-specific anchoring.
  HARD CAP: If the majority of analytical sections are descriptive-only, cap overallScore at 85.
• founderUsefulness (0–10): Does a SaaS founder reading this article walk away with at least 3 specific,
  practical observations they can apply to their own page?
  PENALISE -3 if lessons are generic ("test your CTAs", "know your audience") without company-specific anchoring.
  PENALISE -3 if no section explains when NOT to copy the analysed company's approach.
• concision         (0–10): Is the article free of repeated conclusions, padding, and over-long paragraphs?
  Count the number of times the same analytical conclusion appears (self-serve→enterprise shift,
  proof burden, CTA friction direction, casual→formal framing). Each should appear at most once.
  PENALISE -3 per conclusion that appears in 2 or more sections with the same thrust.
  PENALISE -2 per paragraph that exceeds 90 words without introducing a new idea.
  PENALISE -2 per closing paragraph that summarises what its section just said.
  HARD CAP: If the same conclusion appears in 3 or more sections, concision is capped at 4 and overallScore is capped at 85.
• editorialSharpness (0–10): Do sections respect their stated roles and not bleed into each other?
  PENALISE -3 if the Lessons section restates analysis from Messaging or Visual Timeline without converting it to action.
  PENALISE -2 if two analytical sections describe the same observable change (e.g., both messaging and visual timeline discuss the headline shift without differentiation).
  PENALISE -3 if the article word count exceeds 1,900 words.

DEPTH HARD RULE:
If analysisDepth < 10 OR founderUsefulness < 7, overallScore is capped at 88 and pass is false.
A descriptive article cannot pass the judge even if it is accurate and well-written.

CONCISION HARD RULE:
If the article body exceeds 1,900 words, overallScore is capped at 87 and pass is false.
If the same analytical conclusion (self-serve→enterprise, proof burden, CTA friction) appears in 3 or more sections, overallScore is capped at 85 and pass is false.

FOUNDER-SHARPNESS HARD RULES (new — check these before scoring):
Each analytical section (03, 04, 05, 06) must contain ALL THREE:
  (a) A direct opening claim — not a hedge, not "it appears that" as sentence 1.
  (b) A named marketing tradeoff — explicitly "[X] in exchange for [Y]" or "The tradeoff: [X] vs [Y]."
  (c) A "So what?" — founder-facing takeaway, either labelled "**So what?**" or clearly the last sentence.
  HARD CAP: If ANY analytical section is missing a named tradeoff → cap overallScore at 82 and pass: false.
  HARD CAP: If ANY analytical section is missing a "So what?" → cap overallScore at 82 and pass: false.
  HARD CAP: If ANY analytical section reads like a lecture (analytical explanation throughout, no claims, no tension) → cap overallScore at 80 and pass: false.

HARD RULES:
• Do NOT claim access to internal strategy, A/B test data, or conversion rates.
• Do NOT invent keyword difficulty or search volume figures.
• If a claim is in the article but NOT in the EVIDENCE, it is an unsupportedClaim.
• If requiredFixes is non-empty, rerunRecommendations must name which section(s) to rerun.
• overallScore >= 90 AND evidenceAccuracy >= 12 AND riskControl >= 8 AND unsupportedClaims empty
  AND analysisDepth >= 10 AND founderUsefulness >= 7 AND concision >= 7 → pass: true.
• Any other combination → pass: false.

CALIBRATION:
• 90–100: Publication-ready. Every claim sourced. Interpretations labelled. Real CRO depth.
  Buyer psychology present. Named tradeoffs in every section. "So what?" present in every section. Cohesive read.
• 80–89:  Passes with notes. Minor tradeoff or So what gaps.
• 70–79:  Needs fixes. Analysis shallow, generic, or missing tradeoffs/So what in multiple sections.
• Below 70: Significant problems. Multiple sections read like lectures or are purely descriptive.`;

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

Score each rubric dimension. Then give a holistic overallScore (0–100).
Apply pass logic: overallScore >= 90 AND evidenceAccuracy >= 12 AND riskControl >= 8 AND unsupportedClaims empty AND analysisDepth >= 10 AND founderUsefulness >= 7 AND concision >= 7.

FOUNDER-SHARPNESS CHECK — answer first (these are the new hard gates):
1. Does each analytical section (03, 04, 05, 06) open with a direct claim — not a hedge?
2. Does each analytical section contain a named marketing tradeoff ("[X] vs [Y]" or "in exchange for")?
3. Does each analytical section end with a clear "So what?" for the founder?
4. Does any section read like a lecture — explaining without claiming, no tension, no tradeoff?
Name which sections fail each check.

DEPTH CHECK — answer before scoring:
5. Do the analytical sections go beyond describing visible changes to explain conversion implications and buyer psychology?
6. Is a buyer audience identified for each major messaging change?
7. Are there at least 3 practical founder takeaways specific enough to act on?
8. Does any section address when NOT to copy the analysed company's approach?

CONCISION CHECK — answer before scoring:
9. Count how many sections mention the self-serve→enterprise shift. (Target: 1)
10. Count how many sections mention proof burden. (Target: 1)
11. Count how many sections mention CTA friction direction. (Target: 1)
12. Are there any paragraphs that exceed 90 words without introducing a new idea?
13. What is the approximate word count of the article body (excluding frontmatter)? (Target: 900–1,200)

Required JSON shape:
{
  "overallScore": <0–100>,
  "pass": <boolean>,
  "evidenceAccuracy": <0–15>,
  "riskControl": <0–10>,
  "croUsefulness": <0–15>,
  "clarity": <0–20>,
  "sectionCoherence": <0–10>,
  "analysisDepth": <0–15>,
  "founderUsefulness": <0–10>,
  "concision": <0–10>,
  "editorialSharpness": <0–10>,
  "articleWordCount": <integer word count of article body, excluding frontmatter>,
  "weakSections": ["<section ID or title>"],
  "unsupportedClaims": ["<quote the exact phrase from the article that is not in the evidence>"],
  "riskFlags": ["<interpretation presented as fact, or causation claim>"],
  "requiredFixes": ["<specific, actionable fix>"],
  "optionalImprovements": ["<nice-to-have improvement>"],
  "rerunRecommendations": ["<section ID to rerun — only if requiredFixes is non-empty>"],
  "genericInsightWarnings": ["<section that feels generic — could apply to any SaaS homepage>"],
  "missingFounderTakeawayWarnings": ["<section that lacks a practical SaaS founder takeaway>"],
  "repetitionWarnings": ["<analytical conclusion that appears in multiple sections (self-serve→enterprise, proof burden, CTA friction)>"],
  "sectionOverlapWarnings": ["<section that restates another section's analysis without converting it to action>"]
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
