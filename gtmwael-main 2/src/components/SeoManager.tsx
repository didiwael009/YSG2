import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AUTHOR_NAME,
  BRAND_NAME,
  DEFAULT_OG_IMAGE,
  SITE_URL,
  getCanonicalUrl,
  getSeoRoute,
} from "@/lib/seo";

const setMeta = (selector: string, attr: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    const nameMatch = selector.match(/name="([^"]+)"/);
    const propertyMatch = selector.match(/property="([^"]+)"/);
    if (nameMatch) element.setAttribute("name", nameMatch[1]);
    if (propertyMatch) element.setAttribute("property", propertyMatch[1]);
    document.head.appendChild(element);
  }
  element.setAttribute(attr, value);
};

const setLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const serializeJsonLd = (data: unknown) => JSON.stringify(data).replaceAll("<", "\\u003c");

const setJsonLd = (id: string, data: unknown) => {
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.id = id;
  element.type = "application/ld+json";
  element.textContent = serializeJsonLd(data);
};

const cleanImageUrl = (image?: string) => {
  const path = image ?? DEFAULT_OG_IMAGE;
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
};

const publisherOrganization = {
  "@type": "Organization",
  name: BRAND_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.png`,
  },
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const route = getSeoRoute(location.pathname);
    const canonical = getCanonicalUrl(route.path);
    const image = cleanImageUrl(route.image);
    const socialTitle = route.socialTitle ?? route.title;
    const includeGlobal = route.schemaIncludeGlobal !== false;

    document.title = route.title;
    setMeta('meta[name="description"]', "content", route.description);
    setMeta(
      'meta[name="robots"]',
      "content",
      route.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
    );
    setMeta('meta[property="og:title"]', "content", socialTitle);
    setMeta('meta[property="og:description"]', "content", route.description);
    setMeta('meta[property="og:type"]', "content", route.type === "case-study" || route.type === "article" ? "article" : "website");
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:site_name"]', "content", BRAND_NAME);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", socialTitle);
    setMeta('meta[name="twitter:description"]', "content", route.description);
    setMeta('meta[name="twitter:image"]', "content", image);
    setLink("canonical", canonical);

    const isHome = route.path === "/";
    const graph: unknown[] = [];

    if (includeGlobal) {
      graph.push(
        {
          "@type": "Organization",
          name: BRAND_NAME,
          url: SITE_URL,
          founder: {
            "@type": "Person",
            name: AUTHOR_NAME,
          },
          sameAs: [
            "https://www.linkedin.com/in/aouididi-wael-81b7037a/",
            "https://www.behance.net/waelaouididi/",
            "https://www.upwork.com/freelancers/~0172dd07fc1cdd655c",
          ],
        },
        {
          "@type": "WebSite",
          name: BRAND_NAME,
          url: SITE_URL,
          description: "SaaS GTM strategy, conversion, cold email, SEO, Meta ads, and growth execution by Wael Aouididi.",
          publisher: publisherOrganization,
        }
      );
    }

    graph.push(
      isHome
        ? {
            "@type": "ProfessionalService",
            name: BRAND_NAME,
            description: route.description,
            url: canonical,
            image,
            areaServed: "Global",
            founder: { "@type": "Person", name: AUTHOR_NAME },
            provider: { "@type": "Person", name: AUTHOR_NAME },
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
            provider: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL, sameAs: SITE_URL },
            serviceType: route.serviceTypeName ?? "SaaS GTM Strategy and Growth Consulting",
            areaServed: "Worldwide",
            audience: { "@type": "Audience", audienceType: "B2B SaaS Founders" },
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
            publisher: publisherOrganization,
            ...(route.datePublished ? { datePublished: route.datePublished, dateModified: route.dateModified ?? route.datePublished } : {}),
          }
        : {
            "@type": route.schemaType === "Article" ? "Article" : route.type === "article" ? "BlogPosting" : route.type === "case-study" ? "Article" : "WebPage",
            headline: route.schemaHeadline ?? socialTitle,
            name: route.title,
            description: route.schemaDescription ?? route.description,
            url: canonical,
            image,
            author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
            publisher: publisherOrganization,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
            ...(route.schemaDatePublished || route.datePublished
              ? {
                  datePublished: route.schemaDatePublished ?? route.datePublished,
                  dateModified: route.schemaDateModified ?? route.dateModified ?? route.datePublished,
                }
              : {}),
          }
    );

    const breadcrumbsSource = route.schemaBreadcrumbs === false ? null : route.schemaBreadcrumbs ?? route.breadcrumbs;
    if (breadcrumbsSource?.length) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...breadcrumbsSource.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 2,
            name: crumb.name,
            item: getCanonicalUrl(crumb.path),
          })),
        ],
      });
    }

    const faqSource = route.schemaFaq === false ? null : route.schemaFaq ?? route.faq;
    if (faqSource?.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqSource.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });
    }

    document.querySelectorAll('script[type="application/ld+json"][id^="jsonld-"]').forEach((node) => {
      if ((node as HTMLScriptElement).id !== "jsonld-graph") node.remove();
    });
    setJsonLd("jsonld-graph", {
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [location.pathname]);

  return null;
};

export default SeoManager;
