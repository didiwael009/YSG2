import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const SITE_URL = "https://www.yoursaasgrowth.com";
const BRAND_NAME = "Your SaaS Growth";
const PUBLISHER_LOGO_URL = `${SITE_URL}/favicon.png`;

const read = (file) => readFileSync(path.join(projectRoot, file), "utf8");
const blogIndexSource = read("src/content/blog/index.ts");
const seoSource = read("src/lib/seo.ts");

const readBlogPosts = () => {
  const importEntries = [...blogIndexSource.matchAll(/import \{ (\w+) \} from "\.\/articles\/([^"]+)";/g)].map(
    ([, exportName, filename]) => ({ exportName, filename })
  );
  const arrayMatch = blogIndexSource.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);
  if (!arrayMatch) throw new Error("Could not read blogPosts from src/content/blog/index.ts");

  const importMap = new Map(importEntries.map((entry) => [entry.exportName, entry.filename]));
  const postNames = [...arrayMatch[1].matchAll(/(\w+),/g)].map(([, name]) => name);
  return postNames.map((name) => {
    const filename = importMap.get(name);
    if (!filename) throw new Error(`Could not resolve blog article import for ${name}`);
    const articleSource = read(`src/content/blog/articles/${filename}.ts`);
    const articleMatch = articleSource.match(/export const \w+: BlogPost = ([\s\S]*?)\s*;\s*$/);
    if (!articleMatch) throw new Error(`Could not read blog article ${filename}`);
    return Function(`"use strict"; return (${articleMatch[1]});`)();
  });
};

const routeMatch = seoSource.match(/export const seoRoutes: SeoRoute\[\] = (\[[\s\S]*?\]);/);
if (!routeMatch) throw new Error("Could not read seoRoutes from src/lib/seo.ts");

const blogPosts = readBlogPosts();
const staticRoutes = Function(`"use strict"; return (${routeMatch[1]});`)();
const allRoutes = new Set([
  ...staticRoutes.map((route) => route.path),
  ...blogPosts.map((post) => post.path),
  "/wael-growth-playbook-2026.pdf",
  "/wael-landing-page-playbook-2026.pdf",
]);

const errors = [];
const warnings = [];

const addError = (post, message) => errors.push(`${post.slug}: ${message}`);
const addWarning = (post, message) => warnings.push(`${post.slug}: ${message}`);
const canonicalFor = (post) => `${SITE_URL}/blog/${post.slug}`;
const htmlPathFor = (post) => path.join(distDir, "blog", post.slug, "index.html");
const normalize = (value) => String(value ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const stripMarkdown = (value) => String(value ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
const stripTags = (value) =>
  String(value ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const words = (value) => stripTags(stripMarkdown(value)).split(/\s+/).filter(Boolean);
const firstWords = (value, count) => words(value).slice(0, count).join(" ");
const includesKeyword = (value, keyword) => normalize(stripMarkdown(value)).includes(normalize(keyword));
const countMatches = (value, regex) => (String(value).match(regex) ?? []).length;
const firstMatch = (value, regex) => String(value).match(regex)?.[1] ?? "";

const blockText = (block) => {
  if (!block || typeof block !== "object") return "";
  const parts = [];
  for (const [key, value] of Object.entries(block)) {
    if (["id", "type", "label"].includes(key)) continue;
    if (typeof value === "string") parts.push(value);
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string") parts.push(item);
        else if (item && typeof item === "object") parts.push(blockText(item));
      }
    }
  }
  return parts.join(" ");
};

const getMarkdownLinks = (value) =>
  [...String(value ?? "").matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)].map((match) => match[1]);

const collectPostLinks = (post) => {
  const values = [
    post.excerpt,
    ...(post.blocks ?? []).map(blockText),
    post.source?.body,
    post.cta?.body,
    ...(post.relatedPosts ?? []).map((item) => item.href),
    ...(post.internalLinks ?? []).map((item) => item.href),
  ];
  return values.flatMap((value) => (typeof value === "string" && value.startsWith("/") ? [value] : getMarkdownLinks(value)));
};

const parseJsonLd = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed && typeof parsed === "object" && Array.isArray(parsed["@graph"])) {
        return parsed["@graph"];
      }
      return [parsed];
    } catch {
      return [];
    }
  });

const requireField = (post, field) => {
  if (!post[field]) addError(post, `missing ${field}`);
};

const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";
if (!sitemap) errors.push("sitemap: missing public/sitemap.xml");

for (const post of blogPosts) {
  [
    "slug",
    "title",
    "h1",
    "metaTitle",
    "description",
    "primaryKeyword",
    "searchIntent",
    "datePublished",
    "dateModified",
    "author",
    "featuredImage",
    "featuredImageAlt",
  ].forEach((field) => requireField(post, field));

  if (post.path !== `/blog/${post.slug}`) addError(post, `path must be /blog/{slug}; found ${post.path}`);
  if (post.metaTitle && post.metaTitle.length > 65) addError(post, `meta title over 65 characters (${post.metaTitle.length})`);
  if (post.description && (post.description.length < 120 || post.description.length > 155)) {
    addError(post, `meta description must be 120-155 characters (${post.description.length})`);
  }
  if (post.primaryKeyword) {
    if (!includesKeyword(post.title, post.primaryKeyword) && !includesKeyword(post.metaTitle, post.primaryKeyword)) {
      addError(post, "primary keyword missing from title/metaTitle");
    }
    if (!includesKeyword(post.h1, post.primaryKeyword)) addError(post, "primary keyword missing from H1");
    const sourceFirst100 = firstWords([post.h1, post.excerpt, ...(post.blocks ?? []).map(blockText)].join(" "), 100);
    if (!includesKeyword(sourceFirst100, post.primaryKeyword)) addError(post, "primary keyword missing from first 100 words");
  }
  if (!post.featuredImageAlt?.trim()) addError(post, "missing featured image alt text");
  if (!Array.isArray(post.internalLinks) || post.internalLinks.length === 0) addError(post, "missing internalLinks");
  if (!Array.isArray(post.relatedPosts) || post.relatedPosts.length === 0) addError(post, "missing relatedPosts");

  const links = collectPostLinks(post);
  if (post.pillarPage) {
    const first150Source = firstWords([post.h1, post.excerpt, ...(post.blocks ?? []).map(blockText)].join(" "), 150);
    const first150Links = [post.h1, post.excerpt, ...(post.blocks?.slice(0, 2) ?? []).map(blockText)].flatMap(getMarkdownLinks);
    if (!first150Source || !first150Links.includes(post.pillarPage)) {
      addError(post, `missing pillar link ${post.pillarPage} in first 150 words`);
    }
  }
  for (const href of links.filter((href) => href.startsWith("/"))) {
    const cleanHref = href.split("#")[0].replace(/\/+$/, "") || "/";
    if (!allRoutes.has(cleanHref)) addError(post, `broken internal link: ${href}`);
  }

  const htmlPath = htmlPathFor(post);
  if (!existsSync(htmlPath)) {
    addError(post, `missing prerendered HTML at ${path.relative(projectRoot, htmlPath)}`);
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const articleHtml = firstMatch(html, /<article[\s\S]*?>([\s\S]*?)<\/article>/i);
  const canonicalTags = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]);
  const metaDescriptions = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)].map((match) => match[1]);
  const schemas = parseJsonLd(html);
  const articleSchemas = schemas.filter((schema) => schema["@type"] === "Article" || schema["@type"] === "BlogPosting");
  const faqSchemas = schemas.filter((schema) => schema["@type"] === "FAQPage");
  const articleSchema = articleSchemas[0];
  const faqSchema = faqSchemas[0];
  const breadcrumbSchema = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
  const visibleFaq = Array.isArray(post.faq) && post.faq.length > 0 && post.faq.every((item) => html.includes(item.question) && html.includes(item.answer));

  if (countMatches(html, /<title>/gi) !== 1) addError(post, "expected exactly one title tag");
  if (metaDescriptions.length !== 1) addError(post, `expected one meta description, found ${metaDescriptions.length}`);
  if (canonicalTags.length !== 1) addError(post, `expected one canonical tag, found ${canonicalTags.length}`);
  if (canonicalTags[0] !== canonicalFor(post)) addError(post, `canonical mismatch: ${canonicalTags[0] || "missing"}`);
  if (/noindex/i.test(firstMatch(html, /<meta name="robots" content="([^"]*)"/i))) addError(post, "blog post has noindex");
  if (countMatches(html, /<h1\b/gi) !== 1) addError(post, `expected one H1, found ${countMatches(html, /<h1\b/gi)}`);
  if (stripTags(articleHtml).split(/\s+/).filter(Boolean).length < 250) addError(post, "no substantial article body in prerendered HTML");

  ["og:title", "og:description", "og:type", "og:url", "og:image"].forEach((property) => {
    if (!html.includes(`property="${property}"`)) addError(post, `missing ${property}`);
  });
  ["twitter:card", "twitter:title", "twitter:description", "twitter:image"].forEach((name) => {
    if (!html.includes(`name="${name}"`)) addError(post, `missing ${name}`);
  });

  if (articleSchemas.length > 1) addError(post, `expected one Article schema, found ${articleSchemas.length}`);
  if (faqSchemas.length > 1) addError(post, `expected one FAQPage schema, found ${faqSchemas.length}`);
  const expectedArticleType = post.schemaType === "Article" ? "Article" : "BlogPosting";
  if (!articleSchema) addError(post, `missing ${expectedArticleType} schema`);
  if (articleSchema?.["@type"] !== expectedArticleType) addError(post, "wrong schema type");
  if (!breadcrumbSchema) addError(post, "missing BreadcrumbList schema");
  if (!articleSchema?.author?.name) addError(post, `${expectedArticleType} missing author`);
  if (!articleSchema?.publisher?.name) addError(post, `${expectedArticleType} missing publisher`);
  if (articleSchema?.publisher?.name && articleSchema.publisher.name !== BRAND_NAME) {
    addError(post, `${expectedArticleType} publisher must be ${BRAND_NAME}`);
  }
  if (articleSchema?.publisher?.logo?.url !== PUBLISHER_LOGO_URL) {
    addError(post, `${expectedArticleType} publisher logo must be ${PUBLISHER_LOGO_URL}`);
  }
  if (!articleSchema?.datePublished) addError(post, `${expectedArticleType} missing datePublished`);
  if (!articleSchema?.dateModified) addError(post, `${expectedArticleType} missing dateModified`);
  if (!articleSchema?.image) addError(post, `${expectedArticleType} missing image`);
  if (!articleSchema?.url) addError(post, `${expectedArticleType} missing url`);
  if (articleSchema?.url && articleSchema.url !== canonicalFor(post)) addError(post, `${expectedArticleType} URL must match canonical`);
  if (!articleSchema?.mainEntityOfPage) addError(post, `${expectedArticleType} missing mainEntityOfPage`);
  if (articleSchema?.mainEntityOfPage?.["@id"] && articleSchema.mainEntityOfPage["@id"] !== canonicalFor(post)) {
    addError(post, `${expectedArticleType} mainEntityOfPage must match canonical`);
  }
  if (visibleFaq && !faqSchema) addError(post, "visible FAQ but no FAQPage schema");
  if (faqSchema && !visibleFaq) addError(post, "FAQPage schema exists but visible FAQ does not match");
  if (faqSchema?.mainEntity?.length !== (post.faq?.length ?? 0)) addError(post, "FAQPage schema item count does not match visible FAQ");
  for (const [index, item] of (faqSchema?.mainEntity ?? []).entries()) {
    if (!item.name || !item.acceptedAnswer?.text) addError(post, "FAQ schema item missing Question or acceptedAnswer text");
    const visibleItem = post.faq?.[index];
    if (visibleItem && (item.name !== visibleItem.question || item.acceptedAnswer?.text !== visibleItem.answer)) {
      addError(post, "FAQ schema item does not match visible FAQ copy");
    }
  }
  if (!html.includes(`alt="${post.featuredImageAlt}"`)) addError(post, "featured image alt not rendered");
  if (/\[[^\]]+\]\(\/[^)]+\)/.test(articleHtml)) addError(post, "raw markdown internal link rendered in article HTML");

  const sitemapLoc = `<loc>${canonicalFor(post)}</loc>`;
  const sitemapMatches = countMatches(sitemap, new RegExp(sitemapLoc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"));
  if (sitemapMatches !== 1) addError(post, `article URL must appear once in sitemap, found ${sitemapMatches}`);
  if (sitemap.includes(`${SITE_URL}/blog/${post.slug}/`)) addError(post, "trailing slash duplicate in sitemap");
  if (sitemap.includes(`https://yoursaasgrowth.com/blog/${post.slug}`)) addError(post, "non-www URL in sitemap");

  if (!html.includes("fetchpriority=\"high\"")) addWarning(post, "featured image is not marked fetchpriority=high");
  if (!html.includes("decoding=\"async\"")) addWarning(post, "featured image is not marked decoding=async");
}

// CRO teardown screenshot validation
// Screenshots under 20KB are blank 503/error pages and must be explicitly marked screenshotMissing
const SCREENSHOT_MIN_BYTES = 20 * 1024;
const croIndexSource = read("src/content/cro-teardown/index.ts");
const croImportEntries = [...croIndexSource.matchAll(/import \{ (\w+) \} from "\.\/articles\/([^"]+)";/g)].map(
  ([, exportName, filename]) => ({ exportName, filename })
);
const croArrayMatch = croIndexSource.match(/export const croTeardownPosts: CroTeardownPost\[\] = \[([\s\S]*?)\];/);
if (croArrayMatch) {
  const croImportMap = new Map(croImportEntries.map((e) => [e.exportName, e.filename]));
  const croPostNames = [...croArrayMatch[1].matchAll(/(\w+),/g)].map(([, name]) => name);
  for (const name of croPostNames) {
    const filename = croImportMap.get(name);
    if (!filename) continue;
    const articleSource = read(`src/content/cro-teardown/articles/${filename}.ts`);
    const articleMatch = articleSource.match(/export const \w+(?:: CroTeardownPost)? = ([\s\S]*?)\s*;\s*$/);
    if (!articleMatch) continue;
    let post;
    try { post = Function(`"use strict"; return (${articleMatch[1]});`)(); } catch { continue; }
    const allScreenshots = [
      ...(post.snapshots ?? []),
      ...(post.analysisBlocks ?? []),
    ];
    for (const item of allScreenshots) {
      if (!item.screenshotPath) continue;
      const filePath = path.join(projectRoot, "public", item.screenshotPath);
      if (!existsSync(filePath)) {
        if (!item.screenshotMissing) {
          errors.push(`${post.slug}: screenshot file not found: ${item.screenshotPath}`);
        }
        continue;
      }
      const fileSize = statSync(filePath).size;
      if (fileSize < SCREENSHOT_MIN_BYTES && !item.screenshotMissing) {
        errors.push(
          `${post.slug}: screenshot ${item.screenshotPath} is ${fileSize} bytes (likely a blank/503 page) — add screenshotMissing: true to suppress`
        );
      }
    }
  }
}

for (const warning of warnings) console.warn(`SEO warning: ${warning}`);

if (errors.length) {
  console.error(`SEO check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO check passed for ${blogPosts.length} blog post(s).`);
