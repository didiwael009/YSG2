import type { BlogPost } from "./types";
import { saasMarketingPlan } from "./articles/saas-marketing-plan";
import { saasLandingPageGoogleMetaAds } from "./articles/saas-landing-page-google-meta-ads";
import { saasTrafficButNoSignups } from "./articles/saas-traffic-but-no-signups";
import { aiConversionRateOptimizationSaas } from "./articles/ai-conversion-rate-optimization-saas";
import { landingPageOptimizationBestPractices2026 } from "./articles/landing-page-optimization-best-practices-2026";

export type { BlogBlock, BlogFaq, BlogPost, InternalLink, RelatedPost } from "./types";

export const blogPosts: BlogPost[] = [
  saasMarketingPlan,
  saasLandingPageGoogleMetaAds,
  saasTrafficButNoSignups,
  aiConversionRateOptimizationSaas,
  landingPageOptimizationBestPractices2026,
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogPostByPath = (path: string) =>
  blogPosts.find((post) => post.path === path);

export const getRelatedPosts = (post: BlogPost) => post.relatedPosts;
