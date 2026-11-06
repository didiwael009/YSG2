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

  it("guide keeps its FAQ and title", () => {
    const post = blogPosts.find((p) => p.slug === "saas-traffic-but-no-signups")!;
    const html = decode(render(<BlogPostLayout post={post} />, post.path));
    expect(html).toContain(post.h1);
    for (const f of post.faq!) expect(html).toContain(f.question);
    expect(html).not.toContain(PROFILE_COPY);
  });

  it("no dark page shell", () => {
    for (const post of [issueFixture, ...blogPosts]) {
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
    for (const post of blogPosts) {
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

  it("the study is the entry point with its own cover", () => {
    expect(html).toMatch(/>54</);
    expect(html).toContain("SaaS homepages");
    expect(html).toContain("2015\u20132026");
    expect(html).toContain("/study-crops/vercel-2021-07.webp");
    expect(html).toContain("/study-crops/vercel-current-live.webp");
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
