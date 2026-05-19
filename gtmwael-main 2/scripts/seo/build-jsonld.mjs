import { getCanonicalUrl } from "./utils.mjs";

const buildBreadcrumbList = ({ route, siteUrl }) => {
  const source = route.schemaBreadcrumbs === false ? null : route.schemaBreadcrumbs ?? route.breadcrumbs;
  if (!source?.length) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...source.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: getCanonicalUrl(siteUrl, crumb.path),
      })),
    ],
  };
};

const buildFaqPage = (route) => {
  const source = route.schemaFaq === false ? null : route.schemaFaq ?? route.faq;
  if (!source?.length) return null;

  return {
    "@type": "FAQPage",
    mainEntity: source.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

// Builds one JSON-LD graph for a route and keeps schema-only overrides isolated from visible content.
export const buildJsonLd = ({ route, siteUrl, brandName, authorName, lastmod, cleanImageUrl }) => {
  const canonical = getCanonicalUrl(siteUrl, route.path);
  const image = cleanImageUrl(route.image);
  const socialTitle = route.socialTitle ?? route.title;
  const isHome = route.path === "/";
  const includeGlobal = route.schemaIncludeGlobal !== false;
  const publisherOrganization = {
    "@type": "Organization",
    name: brandName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/favicon.png`,
    },
  };
  const graph = [];

  if (includeGlobal) {
    graph.push(
      {
        "@type": "Organization",
        name: brandName,
        url: siteUrl,
        founder: { "@type": "Person", name: authorName },
        sameAs: [
          "https://www.linkedin.com/in/aouididi-wael-81b7037a/",
          "https://www.behance.net/waelaouididi/",
          "https://www.upwork.com/freelancers/~0141da0e8c48042461",
        ],
      },
      {
        "@type": "WebSite",
        name: brandName,
        url: siteUrl,
        description: "SaaS GTM strategy, conversion, cold email, SEO, Meta ads, and growth execution by Wael Aouididi.",
        publisher: publisherOrganization,
      }
    );
  }

  graph.push(
    isHome
      ? {
          "@type": "ProfessionalService",
          name: brandName,
          description: route.description,
          url: canonical,
          image,
          areaServed: "Global",
          founder: { "@type": "Person", name: authorName },
          provider: { "@type": "Person", name: authorName },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        }
      : route.schemaType === "Service"
      ? {
          "@type": "Service",
          "@id": `${canonical}#service`,
          name: socialTitle,
          description: route.schemaDescription ?? route.description,
          url: canonical,
          image,
          provider: {
            "@type": "Person",
            name: authorName,
            url: siteUrl,
            sameAs: siteUrl,
          },
          serviceType: "SaaS GTM Strategy and Growth Consulting",
          areaServed: "Worldwide",
          audience: {
            "@type": "Audience",
            audienceType: "B2B SaaS Founders",
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          publisher: publisherOrganization,
          ...(route.datePublished
            ? { datePublished: route.datePublished, dateModified: route.dateModified ?? route.datePublished }
            : { dateModified: lastmod }),
        }
      : {
          "@type": route.schemaType === "Article" ? "Article" : route.type === "article" ? "BlogPosting" : route.type === "case-study" ? "Article" : "WebPage",
          headline: route.schemaHeadline ?? socialTitle,
          name: route.title,
          description: route.schemaDescription ?? route.description,
          url: canonical,
          image,
          author: { "@type": "Person", name: authorName, url: siteUrl },
          publisher: publisherOrganization,
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          ...(route.schemaDatePublished || route.datePublished
            ? {
                datePublished: route.schemaDatePublished ?? route.datePublished,
                dateModified: route.schemaDateModified ?? route.dateModified ?? route.datePublished ?? lastmod,
              }
            : { dateModified: route.schemaDateModified ?? route.dateModified ?? lastmod }),
        }
  );

  const breadcrumbs = buildBreadcrumbList({ route, siteUrl });
  if (breadcrumbs) graph.push(breadcrumbs);

  const faq = buildFaqPage(route);
  if (faq) graph.push(faq);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
