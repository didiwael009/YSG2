import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const seoSourcePath = path.join(projectRoot, "src/lib/seo.ts");
const source = await readFile(seoSourcePath, "utf8");

const getConst = (name) => {
  const match = source.match(new RegExp(`export const ${name} = "([^"]+)"`));
  if (!match) throw new Error(`Missing ${name} in src/lib/seo.ts`);
  return match[1];
};

const SITE_URL = getConst("SITE_URL");
const BRAND_NAME = getConst("BRAND_NAME");
const AUTHOR_NAME = getConst("AUTHOR_NAME");
const DEFAULT_OG_IMAGE = getConst("DEFAULT_OG_IMAGE");

const routeMatch = source.match(/export const seoRoutes: SeoRoute\[\] = (\[[\s\S]*?\]);/);
if (!routeMatch) throw new Error("Could not read seoRoutes from src/lib/seo.ts");

const seoRoutes = Function(`"use strict"; return (${routeMatch[1]});`)();
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const lastmod = new Date().toISOString().slice(0, 10);

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const getCanonicalUrl = (routePath) => `${SITE_URL}${routePath === "/" ? "" : routePath}`;

const cleanImageUrl = (image) => {
  const imagePath = image && !image.startsWith("/assets/") ? image : DEFAULT_OG_IMAGE;
  return imagePath.startsWith("http") ? imagePath : `${SITE_URL}${imagePath}`;
};

const stripHeadSeo = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name="description"[\s\S]*?>/gi, "")
    .replace(/<meta name="keywords"[\s\S]*?>/gi, "")
    .replace(/<meta name="author"[\s\S]*?>/gi, "")
    .replace(/<meta name="robots"[\s\S]*?>/gi, "")
    .replace(/<meta property="og:[\s\S]*?>/gi, "")
    .replace(/<meta name="twitter:[\s\S]*?>/gi, "")
    .replace(/<link rel="canonical"[\s\S]*?>/gi, "");

const buildJsonLd = (route) => {
  const canonical = getCanonicalUrl(route.path);
  const image = cleanImageUrl(route.image);
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ...(route.breadcrumbs ?? []).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: crumb.name,
      item: getCanonicalUrl(crumb.path),
    })),
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      founder: { "@type": "Person", name: AUTHOR_NAME },
      sameAs: [
        "https://www.linkedin.com/in/aouididi-wael-81b7037a/",
        "https://www.behance.net/waelaouididi/",
        "https://www.upwork.com/freelancers/~0141da0e8c48042461",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND_NAME,
      url: SITE_URL,
      description: "SaaS GTM strategy, conversion, cold email, SEO, Meta ads, and growth execution by Wael Aouididi.",
      publisher: { "@type": "Organization", name: BRAND_NAME },
    },
    {
      "@context": "https://schema.org",
      "@type": route.type === "case-study" ? "Article" : "WebPage",
      headline: route.title,
      name: route.title,
      description: route.description,
      url: canonical,
      image,
      author: { "@type": "Person", name: AUTHOR_NAME },
      publisher: { "@type": "Organization", name: BRAND_NAME },
      mainEntityOfPage: canonical,
      dateModified: lastmod,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
  ];
};

const buildHead = (route) => {
  const canonical = getCanonicalUrl(route.path);
  const image = cleanImageUrl(route.image);
  const type = route.type === "case-study" ? "article" : "website";
  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="${escapeHtml(BRAND_NAME)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${image}" />
    ${buildJsonLd(route)
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join("\n    ")}
  `;
};

const buildFallbackContent = (route) => {
  const importantLinks = route.links ?? [];
  const navLinks = seoRoutes.filter((item) =>
    ["/", "/case-studies", "/services/cold-email", "/services/landing-page", "/services/meta-ads", "/pricing", "/book"].includes(item.path)
  );

  return `
    <header data-prerender-seo>
      <nav aria-label="Primary navigation">
        ${navLinks.map((item) => `<a href="${item.path}">${escapeHtml(item.path === "/" ? "Home" : item.title.replace(` | ${BRAND_NAME}`, ""))}</a>`).join("\n        ")}
      </nav>
    </header>
    <main data-prerender-seo>
      <article>
        <p>${escapeHtml(BRAND_NAME)} · ${escapeHtml(route.type.replace("-", " "))}</p>
        <h1>${escapeHtml(route.title)}</h1>
        <p>${escapeHtml(route.excerpt ?? route.description)}</p>
        ${
          importantLinks.length
            ? `<section aria-labelledby="related-links"><h2 id="related-links">Related pages</h2><ul>${importantLinks
                .map((link) => `<li><a href="${link.path}">${escapeHtml(link.label)}</a></li>`)
                .join("")}</ul></section>`
            : ""
        }
      </article>
    </main>
    <footer data-prerender-seo>
      <p>© ${new Date().getFullYear()} ${escapeHtml(BRAND_NAME)}. Built by ${escapeHtml(AUTHOR_NAME)}.</p>
    </footer>
  `;
};

const buildHtml = (route) => {
  const rootContent = buildFallbackContent(route);
  return stripHeadSeo(template)
    .replace("</head>", `${buildHead(route)}\n  </head>`)
    .replace(/<div id="root">[\s\S]*<\/div>\s*<\/body>/, `<div id="root">${rootContent}</div>\n  </body>`);
};

for (const route of seoRoutes) {
  const routeDir = route.path === "/" ? distDir : path.join(distDir, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), buildHtml(route));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoRoutes
  .map(
    (route) => `  <url>
    <loc>${getCanonicalUrl(route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /preview/
Disallow: /test/
Disallow: /draft/

Sitemap: ${SITE_URL}/sitemap.xml
`;

await writeFile(path.join(distDir, "sitemap.xml"), sitemap);
await writeFile(path.join(distDir, "robots.txt"), robots);
await writeFile(path.join(projectRoot, "public/sitemap.xml"), sitemap);
await writeFile(path.join(projectRoot, "public/robots.txt"), robots);

console.log(`Generated SEO HTML, sitemap, and robots for ${seoRoutes.length} routes.`);
