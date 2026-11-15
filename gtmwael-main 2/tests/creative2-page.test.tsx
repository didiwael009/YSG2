import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Creative2 from "@/pages/Creative2";
import { seoRoutes, indexableRoutes } from "@/lib/seo";

describe("/creative-2 page", () => {
  it("is noindex and not indexable", () => {
    const r = seoRoutes.find((x) => x.path === "/creative-2");
    expect(r?.noindex).toBe(true);
    expect(indexableRoutes.some((x) => x.path === "/creative-2")).toBe(false);
  });
  it("keeps the homepage section order", () => {
    const html = renderToString(<MemoryRouter initialEntries={["/creative-2"]}><Creative2 /></MemoryRouter>);
    const ids = ["experience", "services", "creative-workflow", "proof", "how-it-works"];
    const pos = ids.map((id) => html.indexOf(`id="${id}"`));
    expect(pos.every((p) => p > 0)).toBe(true);
    expect([...pos].sort((a, b) => a - b)).toEqual(pos);
  });
});
