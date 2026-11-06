import type { BlogPost } from "./types";
import { saasLandingPageGoogleMetaAds } from "./articles/saas-landing-page-google-meta-ads";
import { saasTrafficButNoSignups } from "./articles/saas-traffic-but-no-signups";
import { aiConversionRateOptimizationSaas } from "./articles/ai-conversion-rate-optimization-saas";
import { landingPageOptimizationBestPractices2026 } from "./articles/landing-page-optimization-best-practices-2026";
import { saasProductVideo } from "./articles/saas-product-video";
import { saasHomepageStudy } from "./articles/saas-homepage-study";
import { claudeConnectorCustomerAcquisition } from "./articles/claude-connector-customer-acquisition";
import { aiNews20261106 } from "./articles/ai-news-2026-11-06";

export type { BlogBlock, BlogFaq, BlogPost, InternalLink, RelatedPost } from "./types";

export const blogPosts: BlogPost[] = [
  saasLandingPageGoogleMetaAds,
  saasTrafficButNoSignups,
  aiConversionRateOptimizationSaas,
  landingPageOptimizationBestPractices2026,
  saasProductVideo,
  saasHomepageStudy,
  claudeConnectorCustomerAcquisition,
  aiNews20261106,
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogPostByPath = (path: string) =>
  blogPosts.find((post) => post.path === path);

export const getRelatedPosts = (post: BlogPost) => post.relatedPosts;
