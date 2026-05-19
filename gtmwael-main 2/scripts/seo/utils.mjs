import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { blogArticlesDir, blogIndexPath } from "./constants.mjs";

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

export const mergeSeoRoutes = (staticSeoRoutes, blogSeoRoutes) => [
  ...staticSeoRoutes,
  ...blogSeoRoutes.filter((route) => !staticSeoRoutes.some((staticRoute) => staticRoute.path === route.path)),
];

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
