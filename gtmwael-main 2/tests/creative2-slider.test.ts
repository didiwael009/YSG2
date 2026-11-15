import { describe, it, expect } from "vitest";
import { clampPercent, percentFromPointer, nextPercentForKey, maxHeights, START_PERCENT } from "@/components/creative2/slider";

describe("creative2 slider", () => {
  it("starts at 50", () => expect(START_PERCENT).toBe(50));
  it("clamps to 0..100", () => {
    expect(clampPercent(-12)).toBe(0);
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(37.5)).toBe(37.5);
  });
  it("maps pointer x to percent of the container", () => {
    expect(percentFromPointer(300, { left: 100, width: 800 })).toBe(25);
    expect(percentFromPointer(50, { left: 100, width: 800 })).toBe(0);
    expect(percentFromPointer(1000, { left: 100, width: 800 })).toBe(100);
  });
  it("arrows move 5%, clamped; Home/End jump; other keys ignored", () => {
    expect(nextPercentForKey(50, "ArrowLeft")).toBe(45);
    expect(nextPercentForKey(50, "ArrowRight")).toBe(55);
    expect(nextPercentForKey(2, "ArrowLeft")).toBe(0);
    expect(nextPercentForKey(98, "ArrowRight")).toBe(100);
    expect(nextPercentForKey(40, "Home")).toBe(0);
    expect(nextPercentForKey(40, "End")).toBe(100);
    expect(nextPercentForKey(40, "a")).toBeNull();
  });
  it("keeps the taller height of each block", () => {
    expect(maxHeights({ title: 80, cards: 120 }, { title: 96, cards: 100, logos: 40 }))
      .toEqual({ title: 96, cards: 120, logos: 40 });
  });
});
