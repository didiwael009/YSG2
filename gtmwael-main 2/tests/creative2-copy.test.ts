import { describe, it, expect } from "vitest";
import { CREATIVE2_COPY } from "@/content/creative2";
import { brandsSpaced, rebrandingProjects } from "@/lib/rebrand-data";

const all = JSON.stringify(CREATIVE2_COPY);
// Visible text only: link targets (ids inside URLs) are not figures.
const text = all.replace(/https?:\/\/[^"]+/g, "");

// Figures allowed in the copy. 134, 3, 5: hero figures confirmed by Wael.
// 60K views in a month, 8 channels: Produce card analytics, from Wael (25 Nov 2026).
// 2024: date in Khoubeib Bouthour's testimonial role (src/components/TestimonialSection.tsx).
const ALLOWED = ["134", "3", "5", "8", "2024"];

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
  it("Produce card shows the analytics", () => {
    expect(CREATIVE2_COPY.hero.cards[0].stats).toEqual([["60K", "views in a month"], ["8", "channels"]]);
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
  it("never puts two blue or purple brand covers side by side", () => {
    const dark = ["Pubrella", "Zembra", "Clarrio.ai"];
    const titles = brandsSpaced.map((b) => b.title);
    titles.slice(1).forEach((t, i) => expect(dark.includes(t) && dark.includes(titles[i])).toBe(false));
  });
});
