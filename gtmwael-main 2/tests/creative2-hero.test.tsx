import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import SliderHero from "@/components/creative2/SliderHero";

const html = renderToString(<MemoryRouter><SliderHero /></MemoryRouter>);
describe("slider hero", () => {
  it("renders both layers with the same blocks", () => {
    for (const b of ["badge", "title", "subtitle", "ctas", "cards", "logos", "photo"]) {
      expect(html.split(`data-block="${b}"`).length - 1).toBe(2);
    }
  });
  it("hides the SaaS layer from assistive tech but keeps its buttons clickable", () => {
    expect(html).toMatch(/data-layer="saas"[^>]*aria-hidden="true"/);
    expect(html).not.toMatch(/data-layer="saas"[^>]*inert/);
  });
  it("has an accessible handle starting at 50", () => {
    expect(html).toContain('role="slider"');
    expect(html).toContain('aria-valuenow="50"');
  });
  it("lets vertical swipes scroll the page and keeps pinch-zoom", () => expect(html).toContain("touch-action:pan-y pinch-zoom"));
  it("stacks the creative layer above the SaaS layer", () => {
    expect(html).toMatch(/class="isolate"[^>]*><div data-layer="saas"/);
    expect(html).toMatch(/class="absolute inset-0 z-10[^"]*"[^>]*><div data-layer="creative"/);
  });
  it("marks both text columns for width sync", () => expect(html.split("data-col").length - 1).toBe(2));
  it("creative CTA opens the booking link", () => expect(html).toContain("cal.com/aouididi-wael-4jw03z/30min"));
});
