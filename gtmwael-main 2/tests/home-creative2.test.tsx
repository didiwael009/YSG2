import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";
import { seoRoutes, indexableRoutes } from "@/lib/seo";

const at = (path: string) =>
  renderToString(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);

describe("homepage uses the creative-2 design", () => {
  it("renders the SaaS/creative slider hero on /", () => {
    const html = at("/");
    expect(html).toContain('aria-label="Compare SaaS and creative"');
    expect(html).toContain('data-layer="creative"');
  });

  it("keeps / indexable", () => {
    const r = seoRoutes.find((x) => x.path === "/");
    expect(r?.noindex).toBeFalsy();
    expect(indexableRoutes.some((x) => x.path === "/")).toBe(true);
  });
});
