/**
 * Safely extract and validate JSON from an LLM response.
 *
 * Models sometimes wrap JSON in markdown code blocks or prefix it with a
 * sentence. This module handles all the common escape hatches.
 */

import { CRITIC_PASS_SCORE } from '../config/writing-config.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DimensionScores {
  /** max 25 — every claim traces to evidence */
  evidenceAccuracy: number;
  /** max 20 — plain explainer voice; expert terms ≤1 use and translated; no repeated jargon */
  plainLanguage?: number;
  /** max 15 — H3 subheadings present in analytical sections; ≤60-word paragraphs */
  scannability?: number;
  /** max 10 — ## heading contains company name or searchable topic term */
  searchableHeadings?: number;
  /** max 15 — anchored to THIS company, not generic SaaS */
  specificity: number;
  /** max 10 — sentence length varies; opening fits the most interesting evidence angle */
  rhythmAndOpening?: number;
  /** max 5 — practical takeaway in first two sentences of each H3; runnable test at end */
  founderTakeaway?: number;
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
  } catch { /* probe — invalid JSON, try next strategy */ }

  // 2. Extract from ```json ... ``` or ``` ... ``` code block
  const blockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (blockMatch) {
    try {
      JSON.parse(blockMatch[1].trim());
      return blockMatch[1].trim();
    } catch { /* probe */ }
  }

  // 3. Find the outermost { ... } span
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const candidate = text.slice(first, last + 1);
    try {
      JSON.parse(candidate);
      return candidate;
    } catch { /* probe */ }
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
      specificity:      toInt(ds.specificity,       15),
    };
    if (typeof ds.plainLanguage !== 'undefined') {
      baseScores.plainLanguage = toInt(ds.plainLanguage, 20);
    }
    if (typeof ds.scannability !== 'undefined') {
      baseScores.scannability = toInt(ds.scannability, 15);
    }
    if (typeof ds.searchableHeadings !== 'undefined') {
      baseScores.searchableHeadings = toInt(ds.searchableHeadings, 10);
    }
    if (typeof ds.rhythmAndOpening !== 'undefined') {
      baseScores.rhythmAndOpening = toInt(ds.rhythmAndOpening, 10);
    }
    if (typeof ds.founderTakeaway !== 'undefined') {
      baseScores.founderTakeaway = toInt(ds.founderTakeaway, 5);
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
