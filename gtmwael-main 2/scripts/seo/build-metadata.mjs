import { buildJsonLd } from "./build-jsonld.mjs";
import { escapeHtml, getCanonicalUrl } from "./utils.mjs";

// Builds route-level head metadata and removes stale client-side SEO tags.
export const stripHeadSeo = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name="description"[\s\S]*?>/gi, "")
    .replace(/<meta name="keywords"[\s\S]*?>/gi, "")
    .replace(/<meta name="author"[\s\S]*?>/gi, "")
    .replace(/<meta name="robots"[\s\S]*?>/gi, "")
    .replace(/<meta property="og:[\s\S]*?>/gi, "")
    .replace(/<meta name="twitter:[\s\S]*?>/gi, "")
    .replace(/<link rel="canonical"[\s\S]*?>/gi, "");

export const buildHead = ({ route, siteUrl, brandName, authorName, lastmod, cleanImageUrl }) => {
  const canonical = getCanonicalUrl(siteUrl, route.path);
  const image = cleanImageUrl(route.image);
  const type = route.type === "case-study" || route.type === "article" ? "article" : "website";
  const socialTitle = route.socialTitle ?? route.title;
  const schema = buildJsonLd({ route, siteUrl, brandName, authorName, lastmod, cleanImageUrl });
  const schemaJson = JSON.stringify(schema).replaceAll("<", "\\u003c");
  const robots = route.noindex ? "noindex, follow" : "index, follow, max-image-preview:large";
  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="author" content="${escapeHtml(authorName)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(socialTitle)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="${escapeHtml(brandName)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(socialTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json" id="jsonld-graph">${schemaJson}</script>
  `;
};
