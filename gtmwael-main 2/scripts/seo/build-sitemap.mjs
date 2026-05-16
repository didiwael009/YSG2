import { getCanonicalUrl } from "./utils.mjs";

// Generates the sitemap XML from the resolved SEO route list.
export const buildSitemap = ({ seoRoutes, siteUrl, lastmod }) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoRoutes
  .map(
    (route) => `  <url>
    <loc>${getCanonicalUrl(siteUrl, route.path)}</loc>
    <lastmod>${route.dateModified ?? route.datePublished ?? lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
