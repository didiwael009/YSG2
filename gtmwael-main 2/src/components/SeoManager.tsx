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

const getSchemaTypes = (data: unknown) => {
  if (!data || typeof data !== "object") return [];
  const type = (data as { "@type"?: unknown })["@type"];
  return Array.isArray(type) ? type.filter((item): item is string => typeof item === "string") : typeof type === "string" ? [type] : [];
};

const findJsonLdByType = (data: unknown) => {
  const targetTypes = getSchemaTypes(data);
  if (!targetTypes.length) return null;

  const scripts = document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const existing = JSON.parse(script.textContent ?? "");
      const existingTypes = getSchemaTypes(existing);
      if (targetTypes.some((type) => existingTypes.includes(type))) return script;
    } catch {
      continue;
    }
  }

  return null;
};

const setJsonLd = (id: string, data: unknown) => {
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) element = findJsonLdByType(data);
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.id = id;
  element.type = "application/ld+json";
  element.textContent = JSON.stringify(data);
};

const removeJsonLd = (id: string) => {
  document.getElementById(id)?.remove();
};

const cleanImageUrl = (image?: string) => {
  const path = image && !image.startsWith("/assets/") ? image : DEFAULT_OG_IMAGE;
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
};

const publisherOrganization = {
  "@type": "Organization",
  name: BRAND_NAME,
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

    document.title = route.title;
    setMeta('meta[name="description"]', "content", route.description);
    setMeta('meta[name="robots"]', "content", "index, follow, max-image-preview:large");
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

    const organization = {
      "@context": "https://schema.org",
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
        "https://www.upwork.com/freelancers/~0141da0e8c48042461",
      ],
    };

    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND_NAME,
      url: SITE_URL,
      description: "SaaS GTM strategy, conversion, cold email, SEO, Meta ads, and growth execution by Wael Aouididi.",
      publisher: publisherOrganization,
    };

    const isArticle = route.type === "case-study" || route.type === "article";
    const isHome = route.path === "/";
    const webPage = {
      "@context": "https://schema.org",
      "@type": isHome ? "ProfessionalService" : route.schemaType === "Service" ? "Service" : route.type === "article" ? "BlogPosting" : isArticle ? "Article" : "WebPage",
      ...(route.schemaType === "Service" ? { "@id": `${canonical}#service` } : {}),
      headline: socialTitle,
      name: route.title,
      description: route.description,
      url: canonical,
      image,
      ...(isHome ? { areaServed: "Global", founder: { "@type": "Person", name: AUTHOR_NAME }, provider: { "@type": "Person", name: AUTHOR_NAME } } : {}),
      ...(route.schemaType === "Service"
        ? {
            provider: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL, sameAs: SITE_URL },
            serviceType: "SaaS GTM Strategy and Growth Consulting",
            areaServed: "Worldwide",
            audience: { "@type": "Audience", audienceType: "B2B SaaS Founders" },
          }
        : {}),
      author: { "@type": "Person", name: AUTHOR_NAME },
      publisher: publisherOrganization,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      ...(route.datePublished ? { datePublished: route.datePublished, dateModified: route.dateModified ?? route.datePublished } : {}),
    };

    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...(route.breadcrumbs ?? []).map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: crumb.name,
          item: getCanonicalUrl(crumb.path),
        })),
      ],
    };

    setJsonLd("jsonld-organization", organization);
    setJsonLd("jsonld-website", website);
    setJsonLd("jsonld-page", webPage);
    setJsonLd("jsonld-breadcrumbs", breadcrumbs);
    if (route.faq?.length) {
      setJsonLd("jsonld-faq", {
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
      });
    } else {
      removeJsonLd("jsonld-faq");
    }
  }, [location.pathname]);

  return null;
};

export default SeoManager;
