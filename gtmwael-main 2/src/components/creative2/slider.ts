export const START_PERCENT = 50;
export const KEY_STEP = 5;

export function clampPercent(n: number): number {
  return Math.min(100, Math.max(0, n));
}

export function percentFromPointer(clientX: number, rect: { left: number; width: number }): number {
  if (rect.width <= 0) return START_PERCENT;
  return clampPercent(((clientX - rect.left) / rect.width) * 100);
}

export function nextPercentForKey(p: number, key: string): number | null {
  switch (key) {
    case "ArrowLeft":
      return clampPercent(p - KEY_STEP);
    case "ArrowRight":
      return clampPercent(p + KEY_STEP);
    case "Home":
      return 0;
    case "End":
      return 100;
    default:
      return null;
  }
}

export function maxHeights(a: Record<string, number>, b: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = Math.max(out[k] ?? 0, v);
  return out;
}

/** Gap kept between a revealed control and the handle, in px. */
export const REVEAL_MARGIN = 16;

/**
 * When keyboard focus lands on a creative control hidden under the SaaS side
 * (left of the handle), the handle percent that shows it; null if already visible.
 */
export function revealPercent(p: number, el: { left: number }, rect: { left: number; width: number }): number | null {
  if (rect.width <= 0) return null;
  const handleX = rect.left + (rect.width * p) / 100;
  if (el.left >= handleX) return null;
  return clampPercent(((el.left - REVEAL_MARGIN - rect.left) / rect.width) * 100);
}
