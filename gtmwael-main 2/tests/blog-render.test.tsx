import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { PROFILE_COPY, ProfileBand } from "@/components/blog/WaelProfile";

const render = (node: React.ReactNode, path = "/blog") =>
  renderToString(<MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>);

const decode = (html: string) => html.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

describe("profile", () => {
  for (const [name, El] of [["ProfileBand", ProfileBand]] as const) {
    it(`${name} renders the profile copy and /book link`, () => {
      const html = decode(render(<El />));
      expect(html).toContain(PROFILE_COPY);
      expect(html).toContain('href="/book"');
      expect(html).toContain("hero-portrait-256.webp");
      expect(html).not.toContain("—");
    });
  }

  it("profile copy is the approved line", () => {
    expect(PROFILE_COPY).toBe(
      "Written by Wael. I rebuild sites, run content and ads for digital businesses and agencies.",
    );
  });
});

import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { blogPosts } from "@/content/blog";
import type { BlogPost } from "@/content/blog/types";

const newsBlock = (id: string) => ({
  type: "news-item" as const,
  id,
  rubrique: "MODELS",
  title: `Item ${id}`,
  text: ["Body text."],
  image: "/og-default.png",
  imageAlt: "Capture",
  limit: "One thread only.",
  sourceLabel: `r/${id}`,
  sourceUrl: `https://www.reddit.com/r/${id}`,
});

const issueFixture: BlogPost = {
  ...blogPosts[0],
  slug: "ai-news-test",
  path: "/blog/ai-news-test",
  category: "AI News",
  toc: [
    { label: "Item item-a", id: "item-a" },
    { label: "Item item-b", id: "item-b" },
  ],
  blocks: [newsBlock("item-a"), newsBlock("item-b")],
  faq: undefined,
  source: undefined,
  relatedPosts: undefined,
  internalLinks: undefined,
  primaryKeyword: undefined,
};

describe("article layout", () => {
  it("news issue renders anchored items", () => {
    const html = decode(render(<BlogPostLayout post={issueFixture} />, issueFixture.path));
    expect(html).toContain('id="item-a"');
    expect(html).toContain('id="item-b"');
    expect(html).toContain("Limit:");
    for (const id of ["item-a", "item-b"]) {
      expect(html).toMatch(new RegExp(`href="https://www.reddit.com/r/${id}"[^>]*rel="noopener noreferrer"`));
    }
    expect(html).not.toContain("Frequently Asked Questions");
  });

  it("a single news article shows its title and image once", () => {
    for (const post of blogPosts.filter((p) => p.category === "AI News")) {
      const html = decode(render(<BlogPostLayout post={post} />, post.path));
      const item = post.blocks.find((b) => b.type === "news-item")!;
      if (item.type !== "news-item") continue;
      expect(html.split(`>${item.title}<`).length - 1, post.slug).toBe(1);
      expect(html.split(`src="${item.image}"`).length - 1, post.slug).toBe(1);
      expect(html, post.slug).toContain("Limit:");
      expect(html, post.slug).toContain(`href="${item.sourceUrl}"`);
    }
  });

  it("guide keeps its FAQ and title", () => {
    const post = blogPosts.find((p) => p.slug === "saas-traffic-but-no-signups")!;
    const html = decode(render(<BlogPostLayout post={post} />, post.path));
    expect(html).toContain(post.h1);
    for (const f of post.faq!) expect(html).toContain(f.question);
    expect(html).not.toContain(PROFILE_COPY);
  });

  it("a figure block renders its chart with alt text, size and caption", () => {
    const post = blogPosts.find((p) => p.slug === "ai-video-script-skills-benchmark")!;
    const html = decode(render(<BlogPostLayout post={post} />, post.path));
    expect(html).toContain('src="/ai-video-script-skills-three-trials.webp"');
    expect(html).toContain('width="1500"');
    expect(html).toContain("Dots: the three trials. Black bar: the mean.");
    expect(html).not.toContain("—");
  });

  it("no dark page shell", () => {
    // Benchmark pages opt into the teardown layout, which is dark by design.
    for (const post of [issueFixture, ...blogPosts].filter((p) => p.layout !== "teardown")) {
      expect(render(<BlogPostLayout post={post} />, post.path)).not.toContain("bg-[#070711]");
    }
  });
});

import Blog from "@/pages/Blog";
import { croTeardownPosts } from "@/content/cro-teardown";
import { getLeadGuide, getNewsItems } from "@/content/blog/magazine";

const textOf = (html: string) => decode(html.replace(/<[^>]+>/g, " "));

describe("magazine home", () => {
  const html = decode(render(<Blog />, "/blog"));

  it("home lists real content", () => {
    expect(html).toContain(getLeadGuide(blogPosts)!.title);
    expect(html).toContain('href="/cro-teardowns"');
    expect(html).toContain(`All ${croTeardownPosts.length}`);
    expect(html).toContain('href="/b2b-saas-marketing-strategy"');
    expect(html).toContain('href="/saas-marketing-plan"');
    expect(html).toContain(PROFILE_COPY);
    expect(html.match(/<h1/g)).toHaveLength(1);
  });

  it.skipIf(getNewsItems(blogPosts).length > 0)("no news, no news section", () => {
    expect(html).not.toContain(">AI News</h2>");
    const nav = html.match(/<nav aria-label="Latest"[\s\S]*?<\/nav>/);
    expect(nav).not.toBeNull();
    expect(nav![0].match(/<a /g)).toHaveLength(4);
  });

  it("no em-dash in home copy", () => {
    expect(textOf(html)).not.toContain("—");
  });
});

import B2bSaasMarketingStrategy from "@/pages/B2bSaasMarketingStrategy";

describe("article template (redesign)", () => {
  const b2b = render(<B2bSaasMarketingStrategy />, "/b2b-saas-marketing-strategy");

  it("TOC is a collapsible block on mobile and a left aside on desktop", () => {
    expect(b2b).toMatch(/<details[^>]*>[\s\S]*?In this article[\s\S]*?<\/details>/);
    expect(b2b).toMatch(/<aside[^>]*>[\s\S]*?href="#[^"]+"[\s\S]*?<\/aside>/);
  });

  it("a schema opening image is shown whole", () => {
    expect(b2b).toMatch(/<img[^>]*object-contain[^>]*>|<img[^>]*>/);
    const img = b2b.match(/<figure[\s\S]*?<img([^>]*)>/);
    expect(img).not.toBeNull();
    expect(img![1]).toContain("object-contain");
    expect(img![1]).not.toContain("object-cover");
  });

  it("only the core principle block is tinted, no white fills", () => {
    expect(b2b.match(/bg-primary\/\[0\.06\]/g)).toHaveLength(1);
    for (const post of blogPosts.filter((p) => p.layout !== "teardown")) {
      expect(render(<BlogPostLayout post={post} />, post.path)).not.toContain("bg-white");
    }
    expect(b2b).not.toContain("bg-white");
  });

  it("an article whose image is the generic banner shows no cover", () => {
    const post = blogPosts.find((p) => p.featuredImage === "/og-default.png")!;
    const html = render(<BlogPostLayout post={post} />, post.path);
    expect(html).not.toContain("og-default.png");
  });

  it("nav marks Blog active and the footer sits on a dark band", () => {
    const blogLink = b2b.match(/<a [^>]*>Blog<\/a>/);
    expect(blogLink).not.toBeNull();
    expect(blogLink![0]).toContain('aria-current="page"');
    expect(b2b).toMatch(/<div class="bg-background text-foreground"><footer/);
  });
});

describe("magazine home (redesign)", () => {
  const html = render(<Blog />, "/blog");

  it("the lead story is the newest guide, not a pinned older one", () => {
    const newest = [...blogPosts]
      .filter((p) => p.category !== "AI News")
      .sort((a, b) => b.datePublished.localeCompare(a.datePublished))[0];
    expect(getLeadGuide(blogPosts)!.datePublished).toBe(newest.datePublished);
    expect(decode(html)).toContain(getLeadGuide(blogPosts)!.title);
  });

  it("no generic banner, compact Latest list, 3 column grids", () => {
    expect(html).not.toContain("og-default.png");
    const nav = html.match(/<nav aria-label="Latest"[\s\S]*?<\/nav>/);
    expect(nav![0]).not.toContain("<img");
    expect(html.match(/lg:grid-cols-3/g)!.length).toBeGreaterThanOrEqual(2);
  });

  it("nav marks Blog active and the footer sits on a dark band", () => {
    const blogLink = html.match(/<a [^>]*>Blog<\/a>/);
    expect(blogLink![0]).toContain('aria-current="page"');
    expect(html).toMatch(/<div class="bg-background text-foreground"><footer/);
  });
});

import { renderBlock, renderInlineText } from "@/components/blog/blocks";

describe("article formatting", () => {
  it("renders <mark> spans as highlights, keeping links inside the same text", () => {
    const html = render(<p>{renderInlineText("See <mark>the usage rank</mark> and [docs](https://claude.com/docs).")}</p>);
    expect(html).toMatch(/<mark[^>]*>the usage rank<\/mark>/);
    expect(html).toContain('href="https://claude.com/docs"');
    expect(html).not.toContain("&lt;mark");
  });

  it("renders a list block, ordered or not, with inline formatting", () => {
    const ul = render(<>{renderBlock({ type: "list", items: ["One <mark>hi</mark>", "Two"] }, 0)}</>);
    expect(ul).toMatch(/<ul[^>]*>.*<li[^>]*>One <mark[^>]*>hi<\/mark><\/li>.*<\/ul>/);
    const ol = render(<>{renderBlock({ type: "list", ordered: true, items: ["A", "B"] }, 0)}</>);
    expect(ol).toMatch(/<ol[^>]*>.*<li[^>]*>A<\/li><li[^>]*>B<\/li><\/ol>/);
  });

  it("renders a callout block with its label and bullet items", () => {
    const html = decode(render(<>{renderBlock({ type: "callout", label: "Key takeaways", items: ["First", "Second"] }, 0)}</>));
    expect(html).toContain("Key takeaways");
    expect(html).toMatch(/<li[^>]*>First<\/li><li[^>]*>Second<\/li>/);
  });

  it("renders a data table without a heading when it sits inside a section", () => {
    const html = render(<>{renderBlock({ type: "data-table", columns: ["Period", "Sign-ups"], rows: [["Since", "250 a day"]] }, 0)}</>);
    expect(html).not.toMatch(/<h2/);
    expect(html).toContain("250 a day");
  });
});

import BenchmarkLayout from "@/components/blog/BenchmarkLayout";

describe("benchmark side CTA", () => {
  it("the side CTA button wraps inside its 210px card instead of overflowing", () => {
    const post = blogPosts.find((p) => p.slug === "ai-animation-styles-benchmark")!;
    const html = render(<BenchmarkLayout post={post} />, post.path);
    const asides = html.match(/<aside class="hidden lg:block">[\s\S]*?<\/aside>/g) ?? [];
    const aside = asides.find((a) => decode(a).includes(post.cta!.title));
    expect(aside).toBeDefined();
    const link = aside!.match(/<a [^>]*class="([^"]*)"/);
    expect(link![1]).toContain("w-full");
    expect(link![1]).toContain("whitespace-normal");
  });
});

describe("benchmark reading typography (Medium-style)", () => {
  const post = blogPosts.find((p) => p.slug === "ai-blog-writing-skills-benchmark")!;
  const html = render(<BenchmarkLayout post={post} />, post.path);
  const body = html.match(/<div class="(\[&amp;_\.font-serif\][^"]*)"/)?.[1] ?? "";

  it("body paragraphs use the reading serif at 20px/32px in #242424", () => {
    expect(body).toContain("[&amp;_p.mb-5]:font-reading");
    expect(body).toContain("md:[&amp;_p.mb-5]:text-[20px]");
    expect(body).toContain("md:[&amp;_p.mb-5]:leading-[32px]");
    expect(body).toContain("[&amp;_p.mb-5]:text-[#242424]");
  });

  it("paragraphs are spaced like Medium (about 34px)", () => {
    expect(body).toContain("md:[&amp;_p.mb-5]:mb-[34px]");
  });

  it("section headings are about 24px instead of 38px", () => {
    expect(body).toContain("md:[&amp;_h2.font-serif]:text-[24px]");
    expect(body).not.toContain("text-[38px]");
  });

  it("the reading serif is loaded from Google Fonts", () => {
    const index = readFileSync(resolve(__dirname, "../index.html"), "utf8");
    expect(index).toContain("Source+Serif+4");
  });
});
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("benchmark media grid headings", () => {
  it("the animation benchmark section headings are about 24px, not 38px", () => {
    const post = blogPosts.find((p) => p.slug === "ai-animation-styles-benchmark")!;
    const html = render(<BenchmarkLayout post={post} />, post.path);
    const h2s = html.match(/<h2 class="[^"]*"/g) ?? [];
    const grid = h2s.find((h) => h.includes("mb-4 mt-0"));
    expect(grid).toBeDefined();
    expect(grid).toContain("md:text-[24px]");
    expect(grid).not.toContain("text-[38px]");
  });
});

describe("inline data chart (no section heading, long labels)", () => {
  const block = {
    type: "data-chart" as const,
    caption: "Final average out of 10",
    labelWidth: "wide" as const,
    rows: [
      { label: "Blog Prose", value: 7.74, display: "7.74" },
      { label: "Opus alone (control)", value: 7.55, display: "7.55", muted: true },
    ],
  };
  const html = decode(render(<>{renderBlock(block, 0)}</>));

  it("renders no h2 when the chart has no title", () => {
    expect(html).not.toContain("<h2");
    expect(html).toContain("Final average out of 10");
  });

  it("gives long tool names a wide label column", () => {
    expect(html).toContain("grid-cols-[minmax(0,12rem)_1fr_3rem]");
    expect(html).toContain("Opus alone (control)");
  });
});
