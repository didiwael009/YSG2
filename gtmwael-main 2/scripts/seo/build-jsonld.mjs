import { getCanonicalUrl } from "./utils.mjs";

// Builds all JSON-LD schema blocks for one route.
export const buildJsonLd = ({ route, siteUrl, brandName, authorName, lastmod, cleanImageUrl }) => {
  const canonical = getCanonicalUrl(siteUrl, route.path);
  const image = cleanImageUrl(route.image);
  const socialTitle = route.socialTitle ?? route.title;
  const isHome = route.path === "/";
  const publisherOrganization = {
    "@type": "Organization",
    name: brandName,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/favicon.png`,
    },
  };
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ...(route.breadcrumbs ?? []).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: crumb.name,
      item: getCanonicalUrl(siteUrl, crumb.path),
    })),
  ];

  return [
    {
      "@context": "https://schema.org",
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
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: brandName,
      url: siteUrl,
      description: "SaaS GTM strategy, conversion, cold email, SEO, Meta ads, and growth execution by Wael Aouididi.",
      publisher: publisherOrganization,
    },
    isHome
      ? {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: brandName,
          description: route.description,
          url: canonical,
          image,
          areaServed: "Global",
          founder: { "@type": "Person", name: authorName },
          provider: { "@type": "Person", name: authorName },
          mainEntityOfPage: canonical,
        }
      : route.schemaType === "Service"
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${canonical}#service`,
          name: socialTitle,
          description: route.description,
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
          "@context": "https://schema.org",
          "@type": route.type === "article" ? "BlogPosting" : route.type === "case-study" ? "Article" : "WebPage",
          headline: socialTitle,
          name: route.title,
          description: route.description,
          url: canonical,
          image,
          author: { "@type": "Person", name: authorName },
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
