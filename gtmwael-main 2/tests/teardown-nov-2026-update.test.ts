import { describe, it, expect } from "vitest";
import { getCroTeardownBySlug } from "@/content/cro-teardown";
import { getSeoRoute } from "@/lib/seo";

const SLUGS = ["hootsuite", "gong", "lemlist"] as const;

describe("Nov 2026 teardown updates (hootsuite, gong, lemlist)", () => {
  for (const slug of SLUGS) {
    it(`${slug}: has a Nov 2026 block placed last, with annotations`, () => {
      const post = getCroTeardownBySlug(slug)!;
      const block = post.analysisBlocks[post.analysisBlocks.length - 1];
      expect(block.id).toBe("analysis-nov-2026");
      expect(block.period).toBe("Nov 2026");
      expect(block.annotations.length).toBeGreaterThanOrEqual(3);
    });

    it(`${slug}: Nov 2026 text follows the site rules (no em dash, no bold)`, () => {
      const block = getCroTeardownBySlug(slug)!.analysisBlocks.at(-1)!;
      const text = [block.label, block.heading, ...block.annotations].join(" ");
      expect(text).not.toMatch(/—/);
      expect(text).not.toMatch(/\*\*/);
    });

    it(`${slug}: dateModified reaches the SEO route, publish date unchanged`, () => {
      const post = getCroTeardownBySlug(slug)!;
      const route = getSeoRoute(`/cro-teardowns/${slug}`)!;
      expect(post.dateModified).toBe("2026-11-25");
      expect(route.dateModified).toBe("2026-11-25");
      expect(route.datePublished).toBe(post.datePublished);
    });
  }
});

describe("build-time SEO routes (scripts/seo) carry dateModified", () => {
  it("sitemap and schema dates for hootsuite, gong, lemlist are 2026-11-25", async () => {
    // @ts-expect-error plain .mjs build script, no types
    const { readCroTeardownPosts, createCroTeardownSeoRoutes } = await import("../scripts/seo/utils.mjs");
    const routes = createCroTeardownSeoRoutes(await readCroTeardownPosts());
    for (const slug of SLUGS) {
      const r = routes.find((x: { path: string }) => x.path === `/cro-teardowns/${slug}`);
      expect(r.dateModified).toBe("2026-11-25");
      expect(r.schemaDateModified).toBe("2026-11-25");
    }
    const preply = routes.find((x: { path: string }) => x.path === "/cro-teardowns/preply");
    expect(preply.dateModified).toBe("2026-08-25T01:50:20.383Z");
  });
});
