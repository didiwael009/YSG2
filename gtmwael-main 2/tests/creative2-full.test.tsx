import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Creative2Full from "@/pages/Creative2Full";
import { seoRoutes, indexableRoutes } from "@/lib/seo";

const PAIRS = ["hero", "band", "d1", "experience", "d2", "services", "d3", "work", "d4", "proof", "d5", "process"];

const pairsOf = (html: string, side: string) => {
  const start = html.indexOf(`data-side="${side}"`);
  const other = html.indexOf(`data-side="${side === "saas" ? "creative" : "saas"}"`);
  const end = other > start ? other : html.length;
  return [...html.slice(start, end).matchAll(/data-pair="([^"]+)"/g)].map((m) => m[1]);
};

describe("/creative-2-full page", () => {
  it("is noindex and not indexable", () => {
    const r = seoRoutes.find((x) => x.path === "/creative-2-full");
    expect(r?.noindex).toBe(true);
    expect(indexableRoutes.some((x) => x.path === "/creative-2-full")).toBe(false);
  });

  const html = renderToString(
    <MemoryRouter initialEntries={["/creative-2-full"]}>
      <Creative2Full />
    </MemoryRouter>,
  );

  it("puts the same section pairs, in the same order, on both sides", () => {
    expect(pairsOf(html, "saas")).toEqual(PAIRS);
    expect(pairsOf(html, "creative")).toEqual(PAIRS);
  });

  it("has one slider for the whole page", () => {
    expect(html.match(/role="slider"/g)?.length).toBe(1);
  });

  it("keeps the homepage section order on the creative side", () => {
    const creative = html.slice(html.indexOf('data-side="creative"'));
    const ids = ["experience", "services", "creative-workflow", "proof", "how-it-works"];
    const pos = ids.map((id) => creative.indexOf(`id="${id}"`));
    expect(pos.every((p) => p > 0)).toBe(true);
    expect([...pos].sort((a, b) => a - b)).toEqual(pos);
  });

  it("hides the SaaS side from assistive tech", () => {
    expect(html).toMatch(/data-side="saas"[^>]*aria-hidden="true"|aria-hidden="true"[^>]*data-side="saas"/);
  });
});
