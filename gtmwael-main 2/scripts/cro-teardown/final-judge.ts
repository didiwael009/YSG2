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
  weakSections: string[];
  unsupportedClaims: string[];
  riskFlags: string[];
  requiredFixes: string[];
  optionalImprovements: string[];
  rerunRecommendations: string[];
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

function toInt(v: unknown, max: number): number {
  return typeof v === 'number' ? Math.round(Math.max(0, Math.min(max, v))) : 0;
}

function parseJudgeResponse(
  raw: string,
  model: string,
  costUsd: number,
): FinalJudgeResult {
  const jsonStr = extractJson(raw);
  if (!jsonStr) {
    throw new Error(
      `Could not extract JSON from judge response.\nFirst 500 chars:\n${raw.slice(0, 500)}`,
    );
  }
  let obj: Record<string, unknown>;
  try {
    obj = JSON.parse(jsonStr) as Record<string, unknown>;
  } catch (err) {
    throw new Error(`Judge JSON parse error: ${String(err)}\nInput:\n${jsonStr.slice(0, 500)}`);
  }

  const overallScore     = toInt(obj.overallScore, 100);
  const evidenceAccuracy = toInt(obj.evidenceAccuracy, 15);
  const riskControl      = toInt(obj.riskControl, 10);
  const unsupportedClaims = asStringArray(obj.unsupportedClaims);

  const pass =
    overallScore >= JUDGE_PASS_SCORE &&
    evidenceAccuracy >= 12 &&
    riskControl >= 8 &&
    unsupportedClaims.length === 0;

  return {
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
}

// ─── System prompt ────────────────────────────────────────────────────────────

const JUDGE_SYSTEM =
`You are a senior editorial judge for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.

Your role: Evaluate the FULL ARTICLE for evidence accuracy, risk control, CRO usefulness, clarity, and section coherence.

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

HARD RULES:
• Do NOT claim access to internal strategy, A/B test data, or conversion rates.
• Do NOT invent keyword difficulty or search volume figures.
• If a claim is in the article but NOT in the EVIDENCE, it is an unsupportedClaim.
• If requiredFixes is non-empty, rerunRecommendations must name which section(s) to rerun.
• overallScore >= 90 AND evidenceAccuracy >= 12 AND riskControl >= 8 AND unsupportedClaims empty → pass: true.
• Any other combination → pass: false.

CALIBRATION:
• 90–100: Publication-ready. Every claim sourced. Interpretations labelled. Cohesive read.
• 80–89:  Passes with notes. One or two claims need tightening.
• 70–79:  Needs specific fixes. At least one section should be rerun.
• Below 70: Significant problems. Multiple sections need rewrites.`;

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
Apply pass logic: overallScore >= 90 AND evidenceAccuracy >= 12 AND riskControl >= 8 AND unsupportedClaims empty.

Required JSON shape:
{
  "overallScore": <0–100>,
  "pass": <boolean>,
  "evidenceAccuracy": <0–15>,
  "riskControl": <0–10>,
  "croUsefulness": <0–15>,
  "clarity": <0–20>,
  "sectionCoherence": <0–10>,
  "weakSections": ["<section ID or title>"],
  "unsupportedClaims": ["<quote the exact phrase from the article that is not in the evidence>"],
  "riskFlags": ["<interpretation presented as fact, or causation claim>"],
  "requiredFixes": ["<specific, actionable fix>"],
  "optionalImprovements": ["<nice-to-have improvement>"],
  "rerunRecommendations": ["<section ID to rerun — only if requiredFixes is non-empty>"]
}`;

  const costBefore = tracker.totalCostUsd;

  const resp = await withRetry(
    () => callLLM({
      model:     judgeModel,
      system:    JUDGE_SYSTEM,
      messages:  [{ role: 'user', content: userPrompt }],
      maxTokens: 2048,
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
