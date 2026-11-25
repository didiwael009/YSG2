import { describe, it, expect } from "vitest";
import { CREATIVE2_COPY } from "@/content/creative2";
import { rebrandingProjects } from "@/lib/rebrand-data";

const all = JSON.stringify(CREATIVE2_COPY);
// Visible text only: link targets (ids inside URLs) are not figures.
const text = all.replace(/https?:\/\/[^"]+/g, "");

// Figures allowed in the copy. 134, 3, 5: hero figures confirmed by Wael.
// 2024: date in Khoubeib Bouthour's testimonial role (src/components/TestimonialSection.tsx).
const ALLOWED = ["134", "3", "5", "2024"];

describe("creative-2 copy", () => {
  it("has no em-dash and no markdown bold", () => {
    expect(all).not.toContain("—");
    expect(all).not.toContain("**");
  });
  it("hero matches the spec", () => {
    expect(CREATIVE2_COPY.hero.titleLine1).toBe("A content machine");
    expect(CREATIVE2_COPY.hero.titleLine2).toBe("that grows your reach.");
    expect(CREATIVE2_COPY.hero.subtitle).toBe("I build it for your brand with Claude Code. Short videos, carousels and ads, cut for each channel. I check every piece, and nothing goes out without your yes.");
    expect(CREATIVE2_COPY.hero.badge).toBe("Top Rated on Upwork");
    expect(CREATIVE2_COPY.hero.primaryCta).toBe("Book a call");
    expect(CREATIVE2_COPY.hero.secondaryCta).toBe("See the work");
  });
  it("only uses approved figures", () => {
    const nums = (text.match(/\b\d+\b/g) ?? []).filter((n) => !ALLOWED.includes(n));
    expect(nums).toEqual([]);
  });
  it("lists the 4 services, each with samples", () => {
    expect(CREATIVE2_COPY.services).toHaveLength(4);
    expect(CREATIVE2_COPY.services.filter((s) => !s.hasSamples)).toHaveLength(0);
  });
  it("brand project count matches the data", () => expect(rebrandingProjects).toHaveLength(5));
});
