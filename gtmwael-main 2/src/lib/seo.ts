import { blogPosts, getBlogPostByPath } from "./blog";

export const SITE_URL = "https://www.yoursaasgrowth.com";
export const BRAND_NAME = "Your SaaS Growth";
export const AUTHOR_NAME = "Wael Aouididi";
export const DEFAULT_OG_IMAGE = "/og-default.png";

export type SeoRoute = {
  path: string;
  title: string;
  socialTitle?: string;
  description: string;
  type: "website" | "service" | "case-study" | "portfolio" | "profile" | "booking" | "blog" | "article";
  priority: number;
  changefreq: "weekly" | "monthly";
  image?: string;
  breadcrumbs?: { name: string; path: string }[];
  excerpt?: string;
  links?: { label: string; path: string }[];
  datePublished?: string;
  dateModified?: string;
  faq?: { question: string; answer: string }[];
};

export const seoRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "SaaS GTM Strategist for B2B Growth | Your SaaS Growth",
    description: "B2B SaaS growth systems by Wael Aouididi: positioning, landing pages, cold email, SEO, Meta ads, and GTM execution.",
    type: "website",
    priority: 1,
    changefreq: "weekly",
    image: "/hero-portrait.webp",
    excerpt: "A conversion-focused SaaS growth portfolio for founders who need clearer positioning, stronger acquisition, and better conversion.",
    links: [
      { label: "SaaS growth case studies", path: "/case-studies" },
      { label: "SaaS growth blog", path: "/blog" },
      { label: "Cold email service", path: "/services/cold-email" },
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Book a GTM audit", path: "/book" },
    ],
  },
  {
    path: "/case-studies",
    title: "SaaS Growth Case Studies | Your SaaS Growth",
    description: "Explore SaaS growth case studies covering rebrands, landing page CRO, cold email systems, SEO architecture, and full GTM rebuilds.",
    type: "portfolio",
    priority: 0.9,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }],
    links: [
      { label: "Shipzzer SEO and cold email case study", path: "/case-study/shipzzer" },
      { label: "Screenplay product funnel case study", path: "/case-study/screenplay" },
      { label: "Zembra rebrand case study", path: "/case-study/zembra" },
      { label: "Pubrella CRO case study", path: "/case-study/pubrella" },
    ],
  },
  {
    path: "/blog",
    title: "SaaS Growth Blog | Your SaaS Growth",
    description: "Practical SaaS growth articles on landing pages, paid ads strategy, conversion optimization, cold email, and GTM execution.",
    type: "blog",
    priority: 0.8,
    changefreq: "weekly",
    breadcrumbs: [{ name: "Blog", path: "/blog" }],
    links: [
      { label: "SaaS landing page article", path: "/blog/saas-landing-page-google-meta-ads" },
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Meta ads service", path: "/services/meta-ads" },
    ],
  },
  {
    path: "/services/cold-email",
    title: "Cold Email Engine for B2B SaaS | Your SaaS Growth",
    description: "Build a B2B SaaS cold email system with ICP segmentation, deliverability, message testing, and qualified pipeline generation.",
    type: "service",
    priority: 0.85,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Services", path: "/" }, { name: "Cold Email", path: "/services/cold-email" }],
    links: [
      { label: "Shipzzer cold email case study", path: "/case-study/shipzzer" },
      { label: "Zembra outbound revamp case study", path: "/case-study/zembra" },
      { label: "Book a cold email audit", path: "/book" },
    ],
  },
  {
    path: "/services/meta-ads",
    title: "Meta Ads for SaaS Growth | Your SaaS Growth",
    description: "Meta ads strategy for SaaS and B2B offers: tracking, buyer signals, creative testing, retargeting, and CPA-focused optimization.",
    type: "service",
    priority: 0.8,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Services", path: "/" }, { name: "Meta Ads", path: "/services/meta-ads" }],
    links: [
      { label: "Growapp Meta ads case study", path: "/case-study/growapp" },
      { label: "Download the Meta ads playbook", path: "/wael-growth-playbook-2026.pdf" },
    ],
  },
  {
    path: "/services/landing-page",
    title: "SaaS Landing Page Conversion Service | Your SaaS Growth",
    description: "Improve SaaS landing page conversion with sharper positioning, clearer page structure, stronger proof, and CTA hierarchy.",
    type: "service",
    priority: 0.85,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Services", path: "/" }, { name: "Landing Page Conversion", path: "/services/landing-page" }],
    links: [
      { label: "Pubrella landing page CRO case study", path: "/case-study/pubrella" },
      { label: "Screenplay funnel case study", path: "/case-study/screenplay" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  {
    path: "/creative/community-management",
    title: "Community Management for SaaS Brands | Your SaaS Growth",
    description: "Community and content systems for SaaS brands that need stronger social proof, founder visibility, and audience engagement.",
    type: "service",
    priority: 0.65,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Creative", path: "/creative" }, { name: "Community Management", path: "/creative/community-management" }],
  },
  {
    path: "/pricing",
    title: "SaaS Growth Pricing and Offers | Your SaaS Growth",
    description: "Compare SaaS growth offers for GTM strategy, landing pages, cold email, Meta ads, and conversion-focused growth execution.",
    type: "service",
    priority: 0.75,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Pricing", path: "/pricing" }],
  },
  {
    path: "/creative",
    title: "Creative Folio for SaaS Growth | Your SaaS Growth",
    description: "A creative portfolio of SaaS landing pages, ad creatives, social content, video assets, and conversion-focused visual systems.",
    type: "portfolio",
    priority: 0.7,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Creative Folio", path: "/creative" }],
  },
  {
    path: "/resume",
    title: "Wael Aouididi Resume | SaaS GTM Strategist",
    description: "Resume and experience for Wael Aouididi, SaaS founder and GTM strategist focused on B2B growth, funnels, and acquisition.",
    type: "profile",
    priority: 0.55,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Resume", path: "/resume" }],
  },
  {
    path: "/book",
    title: "Book a 20-Min SaaS GTM Audit | Your SaaS Growth",
    description: "Book a free strategic SaaS GTM audit with Wael Aouididi and get actionable fixes for positioning, acquisition, and conversion.",
    type: "booking",
    priority: 0.8,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Book a GTM Audit", path: "/book" }],
  },
  {
    path: "/case-study/shipzzer",
    title: "Shipzzer SEO and Cold Email Case Study",
    description: "How Shipzzer reached Top 3 Google rankings and a 50% cold email open rate through SEO architecture and GTM messaging.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/shipzzer-new-landing.webp",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Shipzzer", path: "/case-study/shipzzer" }],
    links: [
      { label: "Cold email service", path: "/services/cold-email" },
      { label: "Landing page conversion service", path: "/services/landing-page" },
    ],
  },
  {
    path: "/case-study/screenplay",
    title: "Screenplay Product Funnel Case Study",
    description: "How Screenplay Performance Studio moved from a confusing AI tool into a guided upload-to-export product funnel.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/landing-screenplay.webp",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Screenplay", path: "/case-study/screenplay" }],
    links: [
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Book a funnel audit", path: "/book" },
    ],
  },
  {
    path: "/case-study/zembra",
    title: "Zembra SaaS Rebrand Case Study",
    description: "How Zembra grew revenue 4x in 8 months through a Reviews API rebrand, website rebuild, and outbound GTM alignment.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/landing-zembra.png",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Zembra", path: "/case-study/zembra" }],
    links: [
      { label: "Cold email service", path: "/services/cold-email" },
      { label: "Book a rebrand audit", path: "/book" },
    ],
  },
  {
    path: "/case-study/pubrella",
    title: "Pubrella Landing Page CRO Case Study",
    description: "How Pubrella increased landing page conversion 3x through positioning clarity, trust signals, friction removal, and CTA hierarchy.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/pubrella-after.jpg",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Pubrella", path: "/case-study/pubrella" }],
    links: [
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  {
    path: "/case-study/write-your-book",
    title: "Write Your Book Meta Ads Case Study",
    description: "A Meta ads and funnel case study showing lower CPC, stronger creative testing, and better conversion economics.",
    type: "case-study",
    priority: 0.6,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Write Your Book", path: "/case-study/write-your-book" }],
    links: [{ label: "Meta ads service", path: "/services/meta-ads" }],
  },
  {
    path: "/case-study/growapp",
    title: "Growapp Meta Ads Case Study",
    description: "A SaaS Meta ads case study covering trial offer positioning, tracking, campaign structure, and lower cost per lead.",
    type: "case-study",
    priority: 0.6,
    changefreq: "monthly",
    image: "/assets/growapp-meta-dashboard.png",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Growapp", path: "/case-study/growapp" }],
    links: [{ label: "Meta ads service", path: "/services/meta-ads" }],
  },
  {
    path: "/case-study/bottlenexus",
    title: "BottleNexus SaaS Content Case Study",
    description: "A SaaS content and social proof case study for BottleNexus, covering creative assets, brand trust, and buyer education.",
    type: "case-study",
    priority: 0.55,
    changefreq: "monthly",
    image: "/assets/landing-bottlenexus.jpg",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "BottleNexus", path: "/case-study/bottlenexus" }],
  },
  {
    path: "/case-study/ic-center",
    title: "IC Center Landing Page Case Study",
    description: "A landing page case study for IC Center focused on offer clarity, page structure, and conversion-ready positioning.",
    type: "case-study",
    priority: 0.55,
    changefreq: "monthly",
    image: "/assets/ic-center-hero.png",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "IC Center", path: "/case-study/ic-center" }],
  },
];

export const indexableRoutes = seoRoutes.filter((route) => !route.path.includes("*"));

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
};

const blogPostToSeoRoute = (post: (typeof blogPosts)[number]): SeoRoute => ({
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
});

export const getSeoRoute = (path: string) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const staticRoute = seoRoutes.find((route) => route.path === normalizedPath);
  if (staticRoute) return staticRoute;

  const blogPost = getBlogPostByPath(normalizedPath);
  if (blogPost) return blogPostToSeoRoute(blogPost);

  return seoRoutes[0];
};
