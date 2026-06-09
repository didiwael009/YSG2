/**
 * Safely extract and validate JSON from an LLM response.
 *
 * Models sometimes wrap JSON in markdown code blocks or prefix it with a
 * sentence. This module handles all the common escape hatches.
 */

import { CRITIC_PASS_SCORE } from '../config/writing-config.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DimensionScores {
  evidenceAccuracy: number;
  clarity: number;
  specificity: number;
  seoUsefulness: number;
  croUsefulness: number;
  riskControl: number;
  /** Phase 4M: CRO/GTM depth — buyer psychology, conversion implication, founder takeaway. */
  analysisDepth?: number;
  /** Phase 4N: Editorial quality — compression, non-repetition, one-idea-per-paragraph. */
  editorialQuality?: number;
  /** Phase 4O: Founder sharpness — direct claim + named tradeoff + actionable takeaway. */
  founderSharpness?: number;
  /** Phase 4P: Distinctiveness — opening executes its assigned opening move (variety). */
  distinctiveness?: number;
}

export interface CriticResult {
  score: number;
  pass: boolean;
  issues: string[];
  requiredFixes: string[];
  riskFlags: string[];
  seoNotes: string[];
  rewriteInstruction: string;
  /** Optional per-rubric-dimension breakdown. Present only when the strict critic returns it. */
  dimensionScores?: DimensionScores;
}

// ─── JSON extraction ──────────────────────────────────────────────────────────

function extractJsonString(text: string): string | null {
  // 1. Direct parse — model returned clean JSON
  try {
    JSON.parse(text.trim());
    return text.trim();
  } catch {}

  // 2. Extract from ```json ... ``` or ``` ... ``` code block
  const blockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (blockMatch) {
    try {
      JSON.parse(blockMatch[1].trim());
      return blockMatch[1].trim();
    } catch {}
  }

  // 3. Find the outermost { ... } span
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const candidate = text.slice(first, last + 1);
    try {
      JSON.parse(candidate);
      return candidate;
    } catch {}
  }

  return null;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

export function parseCriticResponse(raw: string): CriticResult {
  const jsonStr = extractJsonString(raw);
  if (!jsonStr) {
    const last500 = raw.length > 500 ? raw.slice(-500) : '';
    throw new Error(
      `Could not extract JSON from critic response.\n` +
      `Total length: ${raw.length} chars\n` +
      `First 500:\n${raw.slice(0, 500)}\n` +
      `Last 500:\n${last500}`,
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (err) {
    throw new Error(`Critic JSON parse error: ${String(err)}\nInput:\n${jsonStr.slice(0, 500)}`);
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Critic response parsed to non-object value.');
  }

  const obj = parsed as Record<string, unknown>;

  const score = typeof obj.score === 'number' ? Math.round(Math.max(0, Math.min(100, obj.score))) : 0;

  // ── Optional dimension scores (strict critic adds these) ───────────────────
  let dimensionScores: DimensionScores | undefined;
  if (typeof obj.dimensionScores === 'object' && obj.dimensionScores !== null) {
    const ds = obj.dimensionScores as Record<string, unknown>;
    const toInt = (v: unknown, max: number): number =>
      typeof v === 'number' ? Math.round(Math.max(0, Math.min(max, v))) : 0;
    const baseScores: DimensionScores = {
      evidenceAccuracy: toInt(ds.evidenceAccuracy, 25),
      clarity:          toInt(ds.clarity,          15),
      specificity:      toInt(ds.specificity,       15),
      seoUsefulness:    toInt(ds.seoUsefulness,     10),
      croUsefulness:    toInt(ds.croUsefulness,     10),
      riskControl:      toInt(ds.riskControl,       10),
    };
    if (typeof ds.analysisDepth !== 'undefined') {
      baseScores.analysisDepth = toInt(ds.analysisDepth, 15);
    }
    if (typeof ds.editorialQuality !== 'undefined') {
      baseScores.editorialQuality = toInt(ds.editorialQuality, 10);
    }
    if (typeof ds.founderSharpness !== 'undefined') {
      baseScores.founderSharpness = toInt(ds.founderSharpness, 20);
    }
    if (typeof ds.distinctiveness !== 'undefined') {
      baseScores.distinctiveness = toInt(ds.distinctiveness, 5);
    }
    dimensionScores = baseScores;
  }

  const result: CriticResult = {
    score,
    pass: score >= CRITIC_PASS_SCORE,   // authoritative: always derived from score
    issues: asStringArray(obj.issues),
    requiredFixes: asStringArray(obj.requiredFixes),
    riskFlags: asStringArray(obj.riskFlags),
    seoNotes: asStringArray(obj.seoNotes),
    rewriteInstruction:
      typeof obj.rewriteInstruction === 'string' ? obj.rewriteInstruction : '',
    ...(dimensionScores !== undefined ? { dimensionScores } : {}),
  };

  return result;
}
