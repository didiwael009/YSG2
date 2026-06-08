import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { createServer } from "vite";
import { createHtmlBuilder } from "./build-blog-html.mjs";
import { buildRobots } from "./build-robots.mjs";
import { buildSitemap } from "./build-sitemap.mjs";
import {
  distDir,
  projectRoot,
  prerenderRoutePaths,
  seoSourcePath,
} from "./constants.mjs";
import { createOgAssetManager } from "./build-og-assets.mjs";
import {
  createBlogSeoRoutes,
  createCroTeardownSeoRoutes,
  getConst,
  mergeSeoRoutes,
  readBlogPosts,
  readCroTeardownPosts,
  readStaticSeoRoutes,
  suppressKnownSsrNoise,
} from "./utils.mjs";

// Orchestrates the SEO build pipeline; individual modules own the actual SEO outputs.
const source = await readFile(seoSourcePath, "utf8");
const SITE_URL = getConst(source, "SITE_URL");
const BRAND_NAME = getConst(source, "BRAND_NAME");
const AUTHOR_NAME = getConst(source, "AUTHOR_NAME");
const DEFAULT_OG_IMAGE = getConst(source, "DEFAULT_OG_IMAGE");
const staticSeoRoutes = readStaticSeoRoutes(source);
const blogPosts = await readBlogPosts();
const blogSeoRoutes = createBlogSeoRoutes(blogPosts);
// CRO teardown index is already in staticSeoRoutes; articles are dynamic
const croTeardownPosts = await readCroTeardownPosts();
const croTeardownSeoRoutes = createCroTeardownSeoRoutes(croTeardownPosts);
const seoRoutes = mergeSeoRoutes(staticSeoRoutes, blogSeoRoutes, croTeardownSeoRoutes);
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const lastmod = new Date().toISOString().slice(0, 10);
const prerenderRoutes = new Set([
  ...prerenderRoutePaths,
  ...blogPosts.map((post) => post.path),
  // CRO teardown hub and individual article pages — full React SSR required
  "/cro-teardowns",
  ...croTeardownPosts.map((post) => `/cro-teardowns/${post.slug}/`),
]);
const restoreConsole = suppressKnownSsrNoise();

const vite = await createServer({
  root: projectRoot,
  configFile: false,
  appType: "custom",
  logLevel: "error",
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.join(projectRoot, "src") },
      {
        find: /^react-router$/,
        replacement: path.join(projectRoot, "node_modules/react-router/dist/development/index.mjs"),
      },
      {
        find: /^react-router-dom$/,
        replacement: path.join(projectRoot, "node_modules/react-router-dom/dist/index.mjs"),
      },
    ],
  },
  server: { middlewareMode: true, hmr: false },
});

const { render } = await vite.ssrLoadModule("/src/entry-prerender.tsx");
const { prepareOgAssets, cleanImageUrl } = createOgAssetManager({
  siteUrl: SITE_URL,
  defaultOgImage: DEFAULT_OG_IMAGE,
});
await prepareOgAssets(seoRoutes);

const { buildHtml, buildNotFoundHtml, verifyRouteHtml } = createHtmlBuilder({
  template,
  prerenderRoutes,
  render,
  seoRoutes,
  siteUrl: SITE_URL,
  brandName: BRAND_NAME,
  authorName: AUTHOR_NAME,
  lastmod,
  cleanImageUrl,
});

for (const route of seoRoutes) {
  const routeDir = route.path === "/" ? distDir : path.join(distDir, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), await buildHtml(route));
}

const sitemap = buildSitemap({ seoRoutes, siteUrl: SITE_URL, lastmod });
const robots = buildRobots(SITE_URL);

await writeFile(path.join(distDir, "sitemap.xml"), sitemap);
await writeFile(path.join(distDir, "robots.txt"), robots);
await writeFile(path.join(distDir, "404.html"), buildNotFoundHtml());
await writeFile(path.join(projectRoot, "public/sitemap.xml"), sitemap);
await writeFile(path.join(projectRoot, "public/robots.txt"), robots);
await vite.close();
await new Promise((resolve) => setTimeout(resolve, 50));
restoreConsole();

const priorityVerification = await Promise.all([...prerenderRoutes].map(verifyRouteHtml));

console.log(`Generated SEO HTML, sitemap, and robots for ${seoRoutes.length} routes.`);
console.log("SEO prerender verification:");
for (const item of priorityVerification) {
  console.log(
    [
      `route=${item.route}`,
      `file=${item.file}`,
      `h1=${item.h1}`,
      `p=${item.paragraphs}`,
      `internal_links=${item.internalLinks}`,
      `json_ld=${item.jsonLd ? "yes" : "no"}`,
      `faq=${item.faqExpected ? (item.faqVisible ? "yes" : "missing") : "n/a"}`,
      `renderer=${item.renderer}`,
    ].join(" | ")
  );
}
