import { describe, it, expect } from "vitest";
import sharp from "sharp";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "@/content/blog";
import type { BlogPost } from "@/content/blog/types";
import { croTeardownPosts } from "@/content/cro-teardown";
import type { CroTeardownPost } from "@/content/cro-teardown/types";
import {
  getGuides,
  getLatestColumn,
  getLeadGuide,
  getNewsItems,
  isNewsIssue,
  parseTab,
  sortTeardowns,
  toCard,
  extraGuides,
  coverSources,
} from "@/content/blog/magazine";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const base = blogPosts[0];

const guide = (slug: string, datePublished: string, extra: Partial<BlogPost> = {}): BlogPost => ({
  ...base,
  slug,
  path: `/blog/${slug}`,
  title: slug,
  category: "SaaS CRO",
  datePublished,
  featured: undefined,
  ...extra,
});

const newsItem = (id: string) => ({
  type: "news-item" as const,
  id,
  rubrique: "MODELS",
  title: `Item ${id}`,
  text: ["Body."],
  image: "/og-default.png",
  imageAlt: "Capture",
  limit: "One thread.",
  sourceLabel: "r/test",
  sourceUrl: "https://www.reddit.com/r/test",
});

const issue = (slug: string, datePublished: string, ids: string[]): BlogPost => ({
  ...guide(slug, datePublished),
  category: "AI News",
  blocks: ids.map(newsItem),
});

const teardown = (slug: string, datePublished: string): CroTeardownPost => ({
  ...croTeardownPosts[0],
  slug,
  datePublished,
});

const newsFree = blogPosts.filter((p) => !isNewsIssue(p));

describe("getNewsItems", () => {
  it("returns newest issue first, items in issue order, anchored hrefs", () => {
    const posts = [issue("nov2", "2026-11-02", ["a", "b"]), issue("nov6", "2026-11-06", ["c"])];
    expect(getNewsItems(posts).map((i) => i.href)).toEqual([
      "/blog/nov6#c",
      "/blog/nov2#a",
      "/blog/nov2#b",
    ]);
  });

  it("returns nothing when there is no issue", () => {
    expect(getNewsItems(newsFree)).toEqual([]);
  });
});

describe("getLatestColumn", () => {
  it("falls back to real guides and teardowns when there is no news", () => {
    const col = getLatestColumn(newsFree, croTeardownPosts, 4);
    expect(col).toHaveLength(4);
    for (const c of col) expect(c.href).toMatch(/^\/(blog|cro-teardowns)\//);
  });

  it("uses news items when an issue exists", () => {
    const col = getLatestColumn([...newsFree, issue("nov6", "2026-11-06", ["c", "d"])], croTeardownPosts, 4);
    expect(col.map((c) => c.href)).toEqual(["/blog/nov6#c", "/blog/nov6#d"]);
  });
});

describe("getLeadGuide", () => {
  it("prefers a featured guide over a newer one", () => {
    const posts = [guide("old", "2026-01-01", { featured: true }), guide("new", "2026-09-01")];
    expect(getLeadGuide(posts)?.slug).toBe("old");
  });

  it("falls back to the newest guide", () => {
    const posts = [guide("old", "2026-01-01"), guide("new", "2026-09-01"), issue("n", "2026-11-06", ["x"])];
    expect(getLeadGuide(posts)?.slug).toBe("new");
  });
});

describe("sortTeardowns", () => {
  it("sorts by date desc, later array index first on ties", () => {
    const sorted = sortTeardowns([
      teardown("A", "2026-06-10"),
      teardown("B", "2026-06-10"),
      teardown("C", "2026-07-01"),
    ]);
    expect(sorted.map((t) => t.slug)).toEqual(["C", "B", "A"]);
  });
});

describe("parseTab", () => {
  it("accepts only the exact lower-case tabs", () => {
    expect(parseTab("news")).toBe("news");
    expect(parseTab("guides")).toBe("guides");
    expect(parseTab("foo")).toBe("latest");
    expect(parseTab("NEWS")).toBe("latest");
    expect(parseTab(null)).toBe("latest");
  });
});

describe("cards", () => {
  it("every cover source exists and no cover is the generic og banner", () => {
    const all = [...getGuides(blogPosts), ...croTeardownPosts].map(toCard).concat(extraGuides);
    for (const c of all) {
      for (const src of coverSources(c.cover)) {
        expect(src, c.href).not.toBe("/og-default.png");
        expect(existsSync(join(publicDir, src)), `${c.href} → ${src}`).toBe(true);
      }
    }
  });

  it("a teardown with two captures gets a before/after cover", () => {
    const preply = croTeardownPosts.find((t) => t.slug === "preply")!;
    expect(toCard(preply).cover).toMatchObject({
      kind: "pair",
      before: { src: "/cro-teardowns/preply/selected/2021-01.webp", label: "Jan 2021" },
      after: { src: "/cro-teardowns/preply/selected/current-live.webp" },
    });
  });

  it("a before/after cover skips captures the archive could not load", () => {
    const apify = croTeardownPosts.find((t) => t.slug === "apify")!;
    const missing = apify.snapshots.filter((s) => s.screenshotMissing).map((s) => s.screenshotPath);
    const cover = toCard(apify).cover;
    expect(missing.length).toBeGreaterThan(0);
    expect(coverSources(cover).some((src) => missing.includes(src))).toBe(false);
  });

  it("no teardown cover shows the Internet Archive offline page", async () => {
    const print = async (file: string) =>
      sharp(file).extract({ left: 0, top: 0, width: 800, height: 300 }).resize(80, 30).grayscale().raw().toBuffer();
    const offline = await print(join(dirname(fileURLToPath(import.meta.url)), "fixtures", "archive-offline.webp"));
    const hits: string[] = [];
    for (const t of croTeardownPosts) {
      for (const src of coverSources(toCard(t).cover)) {
        const p = await print(join(publicDir, src));
        const diff = p.reduce((sum, v, i) => sum + Math.abs(v - offline[i]), 0) / p.length;
        if (diff < 12) hits.push(src);
      }
    }
    expect(hits).toEqual([]);
  }, 30000);

  it("a teardown with one usable capture shows it alone, none falls back to type", () => {
    const one = { ...croTeardownPosts[0], snapshots: [croTeardownPosts[0].snapshots[0]] };
    expect(toCard(one).cover.kind).toBe("shot");
    const none = { ...one, snapshots: [{ ...one.snapshots[0], screenshotMissing: true }] };
    expect(toCard(none).cover.kind).toBe("type");
  });

  it("a guide whose image is the og banner gets a typographic cover", () => {
    expect(toCard(guide("g", "2026-01-01", { featuredImage: "/og-default.png", cardImage: undefined })).cover.kind).toBe("type");
  });

  it("the B2B strategy guide shows its framework schema whole", () => {
    const b2b = extraGuides.find((g) => g.href === "/b2b-saas-marketing-strategy")!;
    expect(b2b.cover).toMatchObject({ kind: "schema", src: "/b2b-saas-marketing-strategy-framework-wael-aouididi.webp" });
  });

  it("teardown cards link to /cro-teardowns", () => {
    expect(toCard(croTeardownPosts[0]).href).toBe(`/cro-teardowns/${croTeardownPosts[0].slug}`);
    expect(toCard(croTeardownPosts[0]).label).toBe("Teardown");
  });

  it("guides exclude AI News issues", () => {
    const guides = getGuides([...blogPosts, issue("n", "2026-11-06", ["x"])]);
    expect(guides.some((g) => g.category === "AI News")).toBe(false);
  });
});
