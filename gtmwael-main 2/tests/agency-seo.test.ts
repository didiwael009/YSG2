import { describe, it, expect } from "vitest";
import { getSeoRoute, indexableRoutes } from "@/lib/seo";

describe("/agency SEO", () => {
  it("is a noindex route without global schema", () => {
    const r = getSeoRoute("/agency");
    expect(r.path).toBe("/agency");
    expect(r.noindex).toBe(true);
    expect(r.schemaIncludeGlobal).toBe(false);
  });
  it("is not indexable", () => {
    expect(indexableRoutes.some((r) => r.path === "/agency")).toBe(false);
  });
});
