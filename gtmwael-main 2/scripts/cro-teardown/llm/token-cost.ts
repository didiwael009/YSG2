/**
 * Token-cost tracking.
 * Accumulates per-call costs and enforces a budget cap.
 */

import { getPricing } from './model-router.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CallCost {
  model: string;
  role: string;
  inputTokens: number;
  outputTokens: number;
  /** Prompt-cache tokens read (billed at 0.1× input rate). */
  cacheReadTokens?: number;
  /** Prompt-cache tokens written/created (billed at 1.25× input rate). */
  cacheCreationTokens?: number;
  inputCostUsd: number;
  outputCostUsd: number;
  totalCostUsd: number;
  timestamp: string;
}

export interface CostReport {
  slug: string;
  section: string;
  calls: CallCost[];
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  budgetUsd: number;
  budgetExceeded: boolean;
  generatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Rough chars-to-tokens estimate (4 chars ≈ 1 token). */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function computeCallCost(
  model: string,
  role: string,
  inputTokens: number,
  outputTokens: number,
  cacheReadTokens = 0,
  cacheCreationTokens = 0,
): CallCost {
  const pricing = getPricing(model);
  // Anthropic prompt-cache pricing: reads at 0.1× the input rate, writes at 1.25×.
  const cacheReadCost = (cacheReadTokens / 1_000_000) * pricing.inputPerMTok * 0.1;
  const cacheCreationCost = (cacheCreationTokens / 1_000_000) * pricing.inputPerMTok * 1.25;
  const inputCostUsd =
    (inputTokens / 1_000_000) * pricing.inputPerMTok + cacheReadCost + cacheCreationCost;
  const outputCostUsd = (outputTokens / 1_000_000) * pricing.outputPerMTok;
  return {
    model,
    role,
    inputTokens,
    outputTokens,
    cacheReadTokens,
    cacheCreationTokens,
    inputCostUsd,
    outputCostUsd,
    totalCostUsd: inputCostUsd + outputCostUsd,
    timestamp: new Date().toISOString(),
  };
}

// ─── Accumulator ──────────────────────────────────────────────────────────────

export class CostTracker {
  private _calls: CallCost[] = [];
  private _budgetUsd: number;

  constructor(budgetUsd: number) {
    this._budgetUsd = budgetUsd;
  }

  add(cost: CallCost): void {
    this._calls.push(cost);
  }

  /** Returns a shallow copy of all recorded calls (used to merge sub-trackers). */
  getCalls(): CallCost[] {
    return [...this._calls];
  }

  get totalCostUsd(): number {
    return this._calls.reduce((sum, c) => sum + c.totalCostUsd, 0);
  }

  /**
   * Returns true if adding the estimated cost of the next call (input prompt +
   * a conservative 2 000-token output) would breach the budget.
   */
  wouldExceedBudget(estimatedInputTokens: number, model: string): boolean {
    const pricing = getPricing(model);
    const worstCase =
      (estimatedInputTokens * pricing.inputPerMTok + 2_000 * pricing.outputPerMTok) /
      1_000_000;
    return this.totalCostUsd + worstCase > this._budgetUsd;
  }

  toReport(slug: string, section: string): CostReport {
    return {
      slug,
      section,
      calls: this._calls,
      totalInputTokens: this._calls.reduce((s, c) => s + c.inputTokens, 0),
      totalOutputTokens: this._calls.reduce((s, c) => s + c.outputTokens, 0),
      totalCostUsd: this.totalCostUsd,
      budgetUsd: this._budgetUsd,
      budgetExceeded: this.totalCostUsd > this._budgetUsd,
      generatedAt: new Date().toISOString(),
    };
  }
}
