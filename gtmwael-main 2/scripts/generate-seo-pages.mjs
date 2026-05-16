import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const distAssetsDir = path.join(distDir, "assets");
const sourceAssetsDir = path.join(projectRoot, "src/assets");
const seoSourcePath = path.join(projectRoot, "src/lib/seo.ts");
const blogIndexPath = path.join(projectRoot, "src/content/blog/index.ts");
const blogArticlesDir = path.join(projectRoot, "src/content/blog/articles");
const source = await readFile(seoSourcePath, "utf8");
const blogIndexSource = await readFile(blogIndexPath, "utf8");

const readBlogPosts = async () => {
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

const staticSeoRoutes = Function(`"use strict"; return (${routeMatch[1]});`)();

const blogPosts = await readBlogPosts();
const blogSeoRoutes = blogPosts.map((post) => ({
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
  breadcrumbs: [
    { name: "Blog", path: "/blog" },
    { name: post.breadcrumbTitle ?? post.title, path: post.path },
  ],
  excerpt: post.excerpt,
  links: post.relatedPosts.map((related) => ({ label: related.title, path: related.href })),
  faq: post.faq,
}));

const seoRoutes = [
  ...staticSeoRoutes,
  ...blogSeoRoutes.filter((route) => !staticSeoRoutes.some((staticRoute) => staticRoute.path === route.path)),
];
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const lastmod = new Date().toISOString().slice(0, 10);
const prerenderRoutes = new Set([
  "/",
  "/blog",
  ...blogPosts.map((post) => post.path),
  "/case-studies",
  "/case-study/shipzzer",
  "/case-study/zembra",
  "/case-study/pubrella",
  "/services/landing-page",
  "/services/cold-email",
  "/services/meta-ads",
  "/book",
]);
const ogAssetRoutes = new Set();

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

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const getCanonicalUrl = (routePath) => `${SITE_URL}${routePath === "/" ? "" : routePath}`;

const fileExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const prepareOgAssets = async () => {
  const routeImages = seoRoutes
    .map((route) => route.image)
    .filter((image) => typeof image === "string" && image.startsWith("/assets/"));

  await Promise.all(
    [...new Set(routeImages)].map(async (imagePath) => {
      const filename = imagePath.replace(/^\/assets\//, "");
      const sourceFile = path.join(sourceAssetsDir, filename);
      const outputFile = path.join(distAssetsDir, filename);

      if (await fileExists(sourceFile)) {
        await mkdir(path.dirname(outputFile), { recursive: true });
        await copyFile(sourceFile, outputFile);
        ogAssetRoutes.add(imagePath);
        return;
      }

      if (await fileExists(outputFile)) {
        ogAssetRoutes.add(imagePath);
      }
    })
  );
};

const cleanImageUrl = (image) => {
  const imagePath =
    image && (!image.startsWith("/assets/") || ogAssetRoutes.has(image)) ? image : DEFAULT_OG_IMAGE;
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
  const socialTitle = route.socialTitle ?? route.title;
  const isHome = route.path === "/";
  const publisherOrganization = {
    "@type": "Organization",
    name: BRAND_NAME,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon.png`,
    },
  };
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
      publisher: publisherOrganization,
    },
    isHome
      ? {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: BRAND_NAME,
          description: route.description,
          url: canonical,
          image,
          areaServed: "Global",
          founder: { "@type": "Person", name: AUTHOR_NAME },
          provider: { "@type": "Person", name: AUTHOR_NAME },
          mainEntityOfPage: canonical,
        }
      : {
      "@context": "https://schema.org",
      "@type": route.type === "article" ? "BlogPosting" : route.type === "case-study" ? "Article" : "WebPage",
      headline: socialTitle,
      name: route.title,
      description: route.description,
      url: canonical,
      image,
      author: { "@type": "Person", name: AUTHOR_NAME },
      publisher: publisherOrganization,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      ...(route.datePublished
        ? { datePublished: route.datePublished, dateModified: route.dateModified ?? route.datePublished }
        : { dateModified: lastmod }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
    ...(route.faq?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: route.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];
};

const buildHead = (route) => {
  const canonical = getCanonicalUrl(route.path);
  const image = cleanImageUrl(route.image);
  const type = route.type === "case-study" || route.type === "article" ? "article" : "website";
  const socialTitle = route.socialTitle ?? route.title;
  return `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(socialTitle)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="${escapeHtml(BRAND_NAME)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(socialTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${image}" />
    ${buildJsonLd(route)
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join("\n    ")}
  `;
};

const routeContent = {
  "/": {
    intro: "Your SaaS Growth helps B2B founders turn unclear offers into GTM systems that can be understood, trusted, and acted on.",
    sections: [
      {
        heading: "Growth systems for SaaS founders",
        body: "The work connects positioning, landing pages, cold email, SEO, Meta ads, and creative direction so acquisition channels reinforce one message instead of operating as disconnected tactics.",
      },
      {
        heading: "Proof across real SaaS projects",
        body: "The portfolio includes freight forwarding SaaS, AI workflow products, Reviews API positioning, content platforms, ecommerce infrastructure, and conversion-focused landing pages.",
      },
    ],
    links: [
      { label: "Explore SaaS growth case studies", path: "/case-studies" },
      { label: "Review SaaS landing page conversion work", path: "/services/landing-page" },
      { label: "Book a 20-minute SaaS GTM audit", path: "/book" },
    ],
  },
  "/case-studies": {
    intro: "A portfolio of SaaS growth case studies showing how clearer positioning, funnel structure, SEO, outbound, and conversion work translate into stronger demand.",
    sections: [
      {
        heading: "Featured SaaS outcomes",
        body: "Shipzzer shows SEO and cold email execution, Screenplay shows funnel clarity, Zembra shows rebrand and outbound alignment, and Pubrella shows landing page CRO.",
      },
      {
        heading: "How the work is evaluated",
        body: "Each case study explains the starting problem, what was rebuilt, visual proof where available, and the business or funnel outcome that made the work valuable.",
      },
    ],
  },
  "/blog": {
    intro: "Practical SaaS growth articles on landing pages, paid ads strategy, conversion optimization, cold email, and GTM execution.",
    sections: [
      {
        heading: "Latest SaaS growth article",
        body: "The first article explains why Google Ads and Meta Ads traffic should not usually be sent to the same SaaS landing page, because the visitor intent and trust path are different.",
      },
      {
        heading: "Topics covered",
        body: "The blog focuses on SaaS landing pages, paid traffic, conversion optimization, demand creation, demand capture, and practical founder decisions before scaling acquisition.",
      },
    ],
    links: [
      { label: "Read the SaaS landing page article", path: "/blog/saas-landing-page-google-meta-ads" },
      { label: "Review landing page conversion service", path: "/services/landing-page" },
      { label: "Explore SaaS case studies", path: "/case-studies" },
    ],
  },
  "/blog/saas-landing-page-google-meta-ads": {
    intro: "Google Ads captures demand. Meta Ads creates demand. SaaS founders should match the landing page to the visitor's intent instead of sending both channels to one generic page.",
    sections: [
      {
        heading: "Google Ads captures demand",
        body: "Search visitors already know they have a problem and are actively comparing solutions, so the page should confirm intent quickly, show proof, and make the next step easy.",
      },
      {
        heading: "Meta Ads creates demand",
        body: "Social visitors are interrupted while scrolling, so the page needs more context, problem education, proof, objection handling, and often a softer call to action.",
      },
      {
        heading: "Founder takeaway",
        body: "A paid ads strategy does not end at the click. The landing page has to finish the job by matching the visitor's state of mind before more ad spend is added.",
      },
    ],
    links: [
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Meta ads service", path: "/services/meta-ads" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  "/services/cold-email": {
    intro: "A cold email service for B2B SaaS teams that need cleaner targeting, stronger messaging, deliverability basics, and qualified conversations without spam.",
    sections: [
      {
        heading: "What the cold email system covers",
        body: "The system includes ICP segmentation, list logic, offer framing, sequence writing, deliverability setup, testing, and weekly iteration on the data.",
      },
      {
        heading: "Relevant proof",
        body: "Shipzzer used the approach to reach a 50% open rate and 7% reply rate, while Zembra used outbound as part of a broader rebrand and GTM alignment project.",
      },
    ],
  },
  "/services/meta-ads": {
    intro: "Meta ads strategy for SaaS and B2B offers where creative testing, tracking, retargeting, and buyer signals matter more than broad campaign volume.",
    sections: [
      {
        heading: "Campaign foundations",
        body: "The service focuses on offer clarity, creative angles, tracking quality, audience structure, landing page fit, and disciplined campaign decisions.",
      },
      {
        heading: "When this service fits",
        body: "Meta ads are most useful when the offer has a clear promise, a conversion path, and enough creative variation to test what the market responds to.",
      },
    ],
  },
  "/services/landing-page": {
    intro: "A SaaS landing page conversion service for teams that have traffic or product value but need sharper messaging, proof, structure, and CTA hierarchy.",
    sections: [
      {
        heading: "Conversion work included",
        body: "The work covers hero message clarity, offer positioning, proof placement, objections, page flow, form friction, and stronger calls to action.",
      },
      {
        heading: "Relevant proof",
        body: "Pubrella focused on conversion rate improvement, Screenplay focused on guided product flow, and Shipzzer focused on buyer-intent page structure.",
      },
    ],
  },
  "/creative/community-management": {
    intro: "Community management and social content for SaaS brands that need stronger credibility, founder visibility, and useful audience engagement.",
    sections: [
      {
        heading: "What the content system supports",
        body: "The service turns product updates, customer education, founder points of view, and social proof into repeatable content that supports demand creation across LinkedIn, social channels, and community touchpoints.",
      },
      {
        heading: "Creative examples",
        body: "The portfolio includes logistics SaaS content, AI and healthtech visual storytelling, Pubrella creatives, and product education for foodtech teams that need clearer trust signals.",
      },
    ],
    links: [
      { label: "View the creative folio", path: "/creative" },
      { label: "Explore SaaS growth case studies", path: "/case-studies" },
    ],
  },
  "/pricing": {
    intro: "Pricing and offers for SaaS growth work across GTM strategy, landing pages, cold email, Meta ads, and conversion-focused execution.",
    sections: [
      {
        heading: "How the offers are structured",
        body: "The service packages are designed around practical execution: diagnosing the current funnel, fixing the highest-leverage issues, and building repeatable acquisition systems that a founder can keep using after the engagement.",
      },
      {
        heading: "Best fit",
        body: "The work fits SaaS founders who need hands-on growth help across positioning, acquisition, conversion, and go-to-market execution instead of disconnected one-off marketing tasks.",
      },
    ],
    links: [
      { label: "Compare relevant case studies", path: "/case-studies" },
      { label: "Book a GTM audit before choosing a package", path: "/book" },
    ],
  },
  "/creative": {
    intro: "A creative folio of SaaS landing pages, ad creatives, social content, videos, and visual systems built to support growth and conversion.",
    sections: [
      {
        heading: "Landing page and brand examples",
        body: "The folio includes work for Pubrella, BottleNexus, Zembra, Clarrio, Shipzzer, and other products where visual clarity supports buyer understanding.",
      },
      {
        heading: "Creative with a conversion role",
        body: "The visual work is treated as part of the funnel: it must explain the offer faster, build trust, and make the next action easier.",
      },
    ],
  },
  "/resume": {
    intro: "Wael Aouididi's resume as a SaaS founder and GTM strategist focused on positioning, funnels, acquisition, and conversion.",
    sections: [
      {
        heading: "Relevant experience",
        body: "The background combines SaaS founder experience with hands-on work across SEO, landing pages, cold email, Meta ads, creative direction, analytics, and conversion-focused GTM execution.",
      },
      {
        heading: "How this supports client work",
        body: "The portfolio reflects practical execution from someone who has built products, worked with founders, and understands the pressure behind go-to-market decisions, product clarity, and sales pipeline.",
      },
    ],
    links: [
      { label: "View SaaS growth case studies", path: "/case-studies" },
      { label: "Book a strategy call", path: "/book" },
    ],
  },
  "/book": {
    intro: "Book a 20-minute SaaS GTM audit to identify practical fixes for positioning, acquisition, landing page conversion, or outbound performance.",
    sections: [
      {
        heading: "What the audit is for",
        body: "The call is designed to find the highest-leverage problems in the current growth system and turn them into actionable next steps.",
      },
      {
        heading: "Useful topics to review",
        body: "Common audit topics include unclear positioning, weak landing page structure, cold email underperformance, paid traffic issues, and missing proof.",
      },
    ],
  },
  "/case-study/shipzzer": {
    intro: "Shipzzer is a freight forwarding SaaS case study covering SEO architecture, buyer-intent positioning, landing page structure, and cold email execution.",
    sections: [
      {
        heading: "The challenge",
        body: "The product had operational value but the website and demand system did not clearly communicate that value to container depot buyers or search engines.",
      },
      {
        heading: "The outcome",
        body: "The work produced Top 3 Google rankings for target keywords, a 50% cold email open rate, a 7% reply rate, and clearer GTM messaging.",
      },
    ],
  },
  "/case-study/screenplay": {
    intro: "Screenplay Performance Studio is a product funnel case study about turning a confusing AI audio tool into a guided upload-to-export workflow.",
    sections: [
      {
        heading: "The challenge",
        body: "Users could not immediately understand where to start, what the product would do, or why the payment step appeared before value was clear.",
      },
      {
        heading: "The outcome",
        body: "The product story shifted from generic AI audio generation to a guided screenplay performance workflow with clearer steps and better value perception.",
      },
    ],
  },
  "/case-study/zembra": {
    intro: "Zembra is a Reviews API case study covering SaaS rebrand, website rebuild, outbound email, and GTM messaging for AI and data buyers.",
    sections: [
      {
        heading: "The challenge",
        body: "The product scraped reviews from many platforms, but the messaging sounded like a technical scraping API instead of a data intelligence platform.",
      },
      {
        heading: "The outcome",
        body: "The rebrand and outbound revamp aligned positioning, messaging, website, and acquisition around clearer buyer value, contributing to 4x revenue growth.",
      },
    ],
  },
  "/case-study/pubrella": {
    intro: "Pubrella is a landing page CRO case study focused on positioning clarity, trust signals, friction removal, and a stronger conversion path.",
    sections: [
      {
        heading: "The challenge",
        body: "The product had value, but visitors were not understanding the offer quickly enough and the page lacked a focused path to signup.",
      },
      {
        heading: "The outcome",
        body: "The landing page conversion system improved clarity, reduced hesitation, strengthened proof, and helped produce a 3x conversion lift.",
      },
    ],
  },
  "/case-study/write-your-book": {
    intro: "Write Your Book is a Meta ads and funnel case study focused on offer angles, creative testing, and stronger conversion economics.",
    sections: [
      {
        heading: "The challenge",
        body: "The project needed clearer ad angles and a funnel message that could attract serious writers while controlling cost per lead and keeping the offer credible.",
      },
      {
        heading: "The outcome",
        body: "The campaign work clarified the offer, tested creative directions, and identified stronger economics for paid acquisition through more focused messages and visual angles.",
      },
    ],
  },
  "/case-study/growapp": {
    intro: "Growapp is a SaaS Meta ads case study covering trial offer positioning, tracking, campaign structure, and lower lead costs.",
    sections: [
      {
        heading: "The challenge",
        body: "The campaign needed a clearer trial offer, reliable tracking, and sharper creative tests before scaling budget across Meta ads and related acquisition experiments.",
      },
      {
        heading: "The outcome",
        body: "The work improved campaign structure, clarified the offer, and supported lower cost-per-lead ranges through testing, iteration, and cleaner campaign decisions.",
      },
    ],
  },
  "/case-study/bottlenexus": {
    intro: "BottleNexus is a SaaS content and social proof case study for an alcohol DTC technology platform.",
    sections: [
      {
        heading: "The challenge",
        body: "The product needed stronger buyer education, clearer brand trust, and content that made the marketplace technology easier for beverage brands and buyers to understand.",
      },
      {
        heading: "The outcome",
        body: "The work supported a clearer GTM narrative, visual trust, and useful content assets for buyer education, brand credibility, and go-to-market communication.",
      },
    ],
    links: [
      { label: "View the full case study portfolio", path: "/case-studies" },
      { label: "Explore creative folio examples", path: "/creative" },
    ],
  },
  "/case-study/ic-center": {
    intro: "IC Center is a landing page case study focused on offer clarity, page structure, and conversion-ready positioning.",
    sections: [
      {
        heading: "The challenge",
        body: "The page needed a clearer hierarchy so visitors could quickly understand the offer, trust the message, and move toward the next action without extra explanation.",
      },
      {
        heading: "The outcome",
        body: "The landing page work clarified the offer, strengthened page flow, and created a more conversion-ready structure with clearer sections and stronger action paths.",
      },
    ],
    links: [
      { label: "Review landing page conversion service", path: "/services/landing-page" },
      { label: "View more SaaS case studies", path: "/case-studies" },
    ],
  },
};

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
        ${navLinks.map((item) => `<a href="${item.path}">${escapeHtml(item.path === "/" ? "Home" : item.title.replace(` | ${BRAND_NAME}`, ""))}</a>`).join("\n        ")}
      </nav>
    </header>
    <main data-prerender-seo>
      <article>
        <p>${escapeHtml(BRAND_NAME)} · ${escapeHtml(route.type.replace("-", " "))}</p>
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
      <p>© ${new Date().getFullYear()} ${escapeHtml(BRAND_NAME)}. Built by ${escapeHtml(AUTHOR_NAME)}.</p>
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
    .replace("</head>", `${buildHead(route)}\n  </head>`)
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
    <link rel="canonical" href="${SITE_URL}/404" />
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

await prepareOgAssets();

for (const route of seoRoutes) {
  const routeDir = route.path === "/" ? distDir : path.join(distDir, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), await buildHtml(route));
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
await writeFile(path.join(distDir, "404.html"), buildNotFoundHtml());
await writeFile(path.join(projectRoot, "public/sitemap.xml"), sitemap);
await writeFile(path.join(projectRoot, "public/robots.txt"), robots);
await vite.close();
await new Promise((resolve) => setTimeout(resolve, 50));
console.error = originalConsoleError;
process.stderr.write = originalStderrWrite;
process.stdout.write = originalStdoutWrite;

const verifyRouteHtml = async (routePath) => {
  const htmlFile = routePath === "/" ? path.join(distDir, "index.html") : path.join(distDir, routePath, "index.html");
  const html = await readFile(htmlFile, "utf8");
  const sameDomainLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].filter((match) => {
    const href = match[1];
    return href.startsWith("/") || href.startsWith(SITE_URL);
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
