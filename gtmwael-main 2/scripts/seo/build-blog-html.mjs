import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { distAssetsDir, distDir, projectRoot, routeContent, sourceAssetsDir } from "./constants.mjs";
import { buildHead, stripHeadSeo } from "./build-metadata.mjs";
import { escapeHtml } from "./utils.mjs";

// Builds prerendered route HTML, fallback HTML, and route verification details.
export const createHtmlBuilder = ({
  template,
  prerenderRoutes,
  render,
  seoRoutes,
  siteUrl,
  brandName,
  authorName,
  lastmod,
  cleanImageUrl,
}) => {
  const headContext = { siteUrl, brandName, authorName, lastmod, cleanImageUrl };

  const buildFallbackContent = (route) => {
    const details = routeContent[route.path] ?? {};
    const importantLinks = [...(route.links ?? []), ...(details.links ?? [])];
    const uniqueLinks = importantLinks.filter(
      (link, index, list) => list.findIndex((item) => item.path === link.path) === index
    );
    const sections = details.sections ?? [];
    const navLinks = seoRoutes.filter((item) =>
      ["/", "/case-studies", "/blog", "/services/cold-email", "/services/landing-page", "/services/meta-ads", "/pricing", "/book"].includes(item.path)
    );

    return `
    <header data-prerender-seo>
      <nav aria-label="Primary navigation">
        ${navLinks.map((item) => `<a href="${item.path}">${escapeHtml(item.path === "/" ? "Home" : item.title.replace(` | ${brandName}`, ""))}</a>`).join("\n        ")}
      </nav>
    </header>
    <main data-prerender-seo>
      <article>
        <p>${escapeHtml(brandName)} · ${escapeHtml(route.type.replace("-", " "))}</p>
        <h1>${escapeHtml(route.title)}</h1>
        <p>${escapeHtml(details.intro ?? route.excerpt ?? route.description)}</p>
        ${
          sections.length
            ? sections
                .map(
                  (section) => `<section><h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.body)}</p></section>`
                )
                .join("\n        ")
            : ""
        }
        ${
          uniqueLinks.length
            ? `<section aria-labelledby="related-links"><h2 id="related-links">Related pages</h2><ul>${uniqueLinks
                .map((link) => `<li><a href="${link.path}">${escapeHtml(link.label)}</a></li>`)
                .join("")}</ul></section>`
            : ""
        }
      </article>
    </main>
    <footer data-prerender-seo>
      <p>© ${new Date().getFullYear()} ${escapeHtml(brandName)}. Built by ${escapeHtml(authorName)}.</p>
    </footer>
  `;
  };

  const materializeSsrAssetPaths = async (html) => {
    const assetRefs = [...html.matchAll(/\/src\/assets\/([^"')\s<>]+)/g)].map((match) => match[1]);
    const uniqueAssets = [...new Set(assetRefs)];

    await Promise.all(
      uniqueAssets.map(async (filename) => {
        const sourceFile = path.join(sourceAssetsDir, filename);
        const outputFile = path.join(distAssetsDir, filename);
        await mkdir(path.dirname(outputFile), { recursive: true });
        await copyFile(sourceFile, outputFile);
      })
    );

    return html.replaceAll("/src/assets/", "/assets/");
  };

  const buildHtml = async (route) => {
    const rootContent = prerenderRoutes.has(route.path)
      ? await materializeSsrAssetPaths(await render(route.path))
      : buildFallbackContent(route);
    return stripHeadSeo(template)
      .replace("</head>", `${buildHead({ route, ...headContext })}\n  </head>`)
      .replace(/<div id="root">[\s\S]*<\/div>\s*<\/body>/, `<div id="root">${rootContent}</div>\n  </body>`);
  };

  const buildNotFoundHtml = () => {
    const route = {
      path: "/404",
      title: "Page Not Found | Your SaaS Growth",
      description: "The requested page could not be found.",
      type: "website",
      breadcrumbs: [{ name: "404", path: "/404" }],
    };
    return stripHeadSeo(template)
      .replace(
        "</head>",
        `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${siteUrl}/404" />
  </head>`
      )
      .replace(
        /<div id="root">[\s\S]*<\/div>\s*<\/body>/,
        `<div id="root">
    <main data-prerender-seo>
      <article>
        <h1>404</h1>
        <p>The page you requested could not be found.</p>
        <a href="/">Return to the homepage</a>
      </article>
    </main>
  </div>
  </body>`
      );
  };

  const verifyRouteHtml = async (routePath) => {
    const htmlFile = routePath === "/" ? path.join(distDir, "index.html") : path.join(distDir, routePath, "index.html");
    const html = await readFile(htmlFile, "utf8");
    const sameDomainLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].filter((match) => {
      const href = match[1];
      return href.startsWith("/") || href.startsWith(siteUrl);
    });
    const route = seoRoutes.find((item) => item.path === routePath);
    const visibleFaqCount = (html.match(/<h[2-4][^>]*>[^<]*(Frequently Asked Questions|FAQ|Should SaaS|What makes|Is Meta Ads|What is the biggest|What should a Google|What should a Meta)/gi) ?? []).length;

    return {
      route: routePath,
      file: path.relative(projectRoot, htmlFile),
      h1: (html.match(/<h1\b/gi) ?? []).length,
      paragraphs: (html.match(/<p\b/gi) ?? []).length,
      internalLinks: sameDomainLinks.length,
      jsonLd: /<script\b[^>]*type="application\/ld\+json"/i.test(html),
      faqExpected: Boolean(route?.faq?.length),
      faqVisible: route?.faq?.length ? visibleFaqCount > 0 || route.faq.every((item) => html.includes(escapeHtml(item.question))) : "n/a",
      renderer: prerenderRoutes.has(routePath) ? "React SSR" : "fallback",
    };
  };

  return { buildHtml, buildNotFoundHtml, verifyRouteHtml };
};
