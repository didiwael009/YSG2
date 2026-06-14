import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { blogArticlesDir, blogIndexPath, croTeardownArticlesDir, croTeardownIndexPath } from "./constants.mjs";

// Small shared helpers for parsing source config and keeping generated HTML safe.
export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const getCanonicalUrl = (siteUrl, routePath) => `${siteUrl}${routePath === "/" ? "" : routePath}`;

export const fileExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const getConst = (source, name) => {
  const match = source.match(new RegExp(`export const ${name} = "([^"]+)"`));
  if (!match) throw new Error(`Missing ${name} in src/lib/seo.ts`);
  return match[1];
};

export const readStaticSeoRoutes = (source) => {
  const routeMatch = source.match(/export const seoRoutes: SeoRoute\[\] = (\[[\s\S]*?\]);/);
  if (!routeMatch) throw new Error("Could not read seoRoutes from src/lib/seo.ts");
  return Function(`"use strict"; return (${routeMatch[1]});`)();
};

export const readBlogPosts = async () => {
  const blogIndexSource = await readFile(blogIndexPath, "utf8");
  const importEntries = [...blogIndexSource.matchAll(/import \{ (\w+) \} from "\.\/articles\/([^"]+)";/g)].map(
    ([, exportName, filename]) => ({ exportName, filename })
  );
  const arrayMatch = blogIndexSource.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
  if (!arrayMatch) throw new Error("Could not read blogPosts from src/content/blog/index.ts");

  const importMap = new Map(importEntries.map((entry) => [entry.exportName, entry.filename]));
  const postNames = [...arrayMatch[1].matchAll(/(\w+),/g)].map(([, name]) => name);
  const posts = [];
  for (const name of postNames) {
    const filename = importMap.get(name);
    if (!filename) throw new Error(`Could not resolve blog article import for ${name}`);
    const articleSource = await readFile(path.join(blogArticlesDir, `${filename}.ts`), "utf8");
    const articleMatch = articleSource.match(/export const \w+: BlogPost = ([\s\S]*?)\s*;\s*$/);
    if (!articleMatch) throw new Error(`Could not read blog article ${filename}`);
    posts.push(Function(`"use strict"; return (${articleMatch[1]});`)());
  }
  return posts;
};

export const createBlogSeoRoutes = (blogPosts) =>
  blogPosts.map((post) => ({
    path: post.path,
    title: post.metaTitle,
    socialTitle: post.title,
    description: post.description,
    type: "article",
    priority: 0.75,
    changefreq: "monthly",
    image: post.ogImage,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    schemaType: post.schemaType,
    schemaHeadline: post.schemaHeadline,
    schemaDescription: post.schemaDescription,
    schemaDatePublished: post.schemaDatePublished,
    schemaDateModified: post.schemaDateModified,
    schemaIncludeGlobal: post.schemaIncludeGlobal,
    schemaBreadcrumbs: post.schemaBreadcrumbs,
    schemaFaq: post.schemaFaq,
    breadcrumbs: [
      { name: "Blog", path: "/blog" },
      { name: post.breadcrumbTitle ?? post.title, path: post.path },
    ],
    excerpt: post.excerpt,
    links: post.relatedPosts.map((related) => ({ label: related.title, path: related.href })),
    faq: post.faq,
  }));

export const mergeSeoRoutes = (staticSeoRoutes, ...additionalRouteLists) => {
  const combined = [...staticSeoRoutes];
  for (const routes of additionalRouteLists) {
    for (const route of routes) {
      if (!combined.some((r) => r.path === route.path)) combined.push(route);
    }
  }
  return combined;
};

// ─── CRO teardown post reader ─────────────────────────────────────────────────

/**
 * Reads CRO teardown article files from src/content/cro-teardown/articles/.
 * Mirrors readBlogPosts() but handles the CroTeardownPost shape.
 *
 * Uses a greedy regex to handle embedded semicolons inside articleBody strings.
 */
export const readCroTeardownPosts = async () => {
  const indexSource = await readFile(croTeardownIndexPath, "utf8");

  const importEntries = [
    ...indexSource.matchAll(/import \{ (\w+) \} from "\.\/articles\/([^"]+)";/g),
  ].map(([, exportName, filename]) => ({ exportName, filename }));

  const arrayMatch = indexSource.match(
    /export const croTeardownPosts:\s*CroTeardownPost\[\]\s*=\s*\[([\s\S]*?)\]/
  );
  if (!arrayMatch) throw new Error("Could not read croTeardownPosts from src/content/cro-teardown/index.ts");

  const importMap = new Map(importEntries.map((e) => [e.exportName, e.filename]));
  const postNames = [...arrayMatch[1].matchAll(/(\w+)/g)].map(([, name]) => name);

  const posts = [];
  for (const name of postNames) {
    const filename = importMap.get(name);
    if (!filename) throw new Error(`Could not resolve CRO teardown import for ${name}`);

    const articleSource = await readFile(
      path.join(croTeardownArticlesDir, `${filename}.ts`),
      "utf8"
    );

    // Greedy match: captures the full object literal even when articleBody
    // contains semicolons embedded inside the string value.
    const articleMatch = articleSource.match(
      /export const \w+:\s*CroTeardownPost\s*=\s*(\{[\s\S]+\});\s*$/
    );
    if (!articleMatch) throw new Error(`Could not parse CRO teardown article: ${filename}.ts`);

    posts.push(Function(`"use strict"; return (${articleMatch[1]});`)());
  }

  return posts;
};

/**
 * Parses the Quick Answer section from an article body to produce a FAQPage entry.
 * Looks for the first "## Quick answer" heading and takes its following paragraph as the answer.
 */
const parseFaqFromArticleBody = (articleBody, companyName, fromLabel, toLabel) => {
  if (!articleBody) return null;
  const qaMatch = articleBody.match(/^## .*quick answer.*$/mi);
  if (!qaMatch) return null;
  const afterQa = articleBody.slice(articleBody.indexOf(qaMatch[0]) + qaMatch[0].length);
  const paragraphs = afterQa.split(/\n\n+/).map((p) => p.trim()).filter((p) => p && !p.startsWith("#"));
  if (paragraphs.length === 0) return null;
  const answer = paragraphs[0].replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").slice(0, 500);
  const question = `What changed on ${companyName}'s homepage between ${fromLabel} and ${toLabel}?`;
  return [{ question, answer }];
};

/**
 * Converts CRO teardown posts to SeoRoute objects for the build pipeline.
 * No trailing slash — must match getCanonicalUrl in src/lib/seo.ts which strips them.
 */
export const createCroTeardownSeoRoutes = (posts) =>
  posts.map((post) => ({
    path: `/cro-teardowns/${post.slug}`,
    title: post.metaTitle,
    socialTitle: post.title,
    description: post.description,
    type: "article",
    priority: 0.6,
    changefreq: "monthly",
    image: post.featuredImage,
    datePublished: post.datePublished,
    dateModified: post.publishedAt ?? post.datePublished,
    breadcrumbs: [
      { name: "CRO Teardowns", path: "/cro-teardowns" },
      { name: post.companyName, path: `/cro-teardowns/${post.slug}` },
    ],
    excerpt: post.excerpt,
    schemaType: "Article",
    schemaHeadline: post.h1,
    schemaDescription: post.description,
    schemaDatePublished: post.datePublished,
    schemaDateModified: post.publishedAt ?? post.datePublished,
    schemaIncludeGlobal: true,
    faq: parseFaqFromArticleBody(post.articleBody, post.companyName, post.fromLabel, post.toLabel),
  }));

export const suppressKnownSsrNoise = () => {
  const originalConsoleError = console.error;
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const writeUnlessKnownNoise = (writer) => (chunk, ...args) => {
    const message = String(chunk);
    if (message.includes("The build was canceled")) {
      return true;
    }

    return writer(chunk, ...args);
  };

  process.stdout.write = writeUnlessKnownNoise(originalStdoutWrite);
  process.stderr.write = (chunk, ...args) => {
    return writeUnlessKnownNoise(originalStderrWrite)(chunk, ...args);
  };

  console.error = (...args) => {
    const message = args.map((arg) => (arg instanceof Error ? arg.stack || arg.message : String(arg))).join("\n");
    const knownSsrNoise =
      message.includes("WebSocket server error") ||
      message.includes("listen EPERM") ||
      message.includes("useLayoutEffect does nothing on the server") ||
      message.includes("React does not recognize the `fetchPriority` prop") ||
      message.includes("The build was canceled");

    if (!knownSsrNoise) {
      originalConsoleError(...args);
    }
  };

  return () => {
    console.error = originalConsoleError;
    process.stderr.write = originalStderrWrite;
    process.stdout.write = originalStdoutWrite;
  };
};
