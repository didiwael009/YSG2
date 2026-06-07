/**
 * Model routing — maps roles to model IDs.
 * Pricing kept in sync with Anthropic pricing page (USD per million tokens).
 */

import { MODELS, MODEL_PRICING, type ModelRole } from '../config/writing-config.js';

export type { ModelRole };

export function getModel(
  role: ModelRole,
  overrides?: Partial<Record<ModelRole, string>>,
): string {
  return overrides?.[role] ?? MODELS[role];
}

export function getPricing(model: string): { inputPerMTok: number; outputPerMTok: number } {
  return MODEL_PRICING[model] ?? { inputPerMTok: 3.0, outputPerMTok: 15.0 };
}
