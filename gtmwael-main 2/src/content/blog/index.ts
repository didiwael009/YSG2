import type { BlogPost } from "./types";
import { saasLandingPageGoogleMetaAds } from "./articles/saas-landing-page-google-meta-ads";
import { saasTrafficButNoSignups } from "./articles/saas-traffic-but-no-signups";
import { aiConversionRateOptimizationSaas } from "./articles/ai-conversion-rate-optimization-saas";
import { landingPageOptimizationBestPractices2026 } from "./articles/landing-page-optimization-best-practices-2026";
import { saasProductVideo } from "./articles/saas-product-video";
import { saasHomepageStudy } from "./articles/saas-homepage-study";
import { claudeConnectorCustomerAcquisition } from "./articles/claude-connector-customer-acquisition";
import { aiNewsOpus55WorseAndCostlier } from "./articles/opus-5-5-worse-and-costlier";
import { aiNewsClaudeCodeEmailUserAgent } from "./articles/claude-code-email-user-agent";
import { aiNewsFreeOpenSourceSaasClone } from "./articles/free-open-source-saas-clone-no-users";
import { aiNewsAiWrittenReadmes } from "./articles/ai-written-readmes";
import { aiNewsGpt6CyberLinuxKernelFlaws } from "./articles/gpt-6-cyber-linux-kernel-flaws";
import { aiVideoScriptSkillsBenchmark } from "./articles/ai-video-script-skills-benchmark";
import { aiAnimationStylesBenchmark } from "./articles/ai-animation-styles-benchmark";
import { aiBlogWritingSkillsBenchmark } from "./articles/ai-blog-writing-skills-benchmark";

export type { BlogBlock, BlogFaq, BlogPost, InternalLink, RelatedPost } from "./types";

export const blogPosts: BlogPost[] = [
  saasLandingPageGoogleMetaAds,
  saasTrafficButNoSignups,
  aiConversionRateOptimizationSaas,
  landingPageOptimizationBestPractices2026,
  saasProductVideo,
  saasHomepageStudy,
  claudeConnectorCustomerAcquisition,
  aiNewsOpus55WorseAndCostlier,
  aiNewsClaudeCodeEmailUserAgent,
  aiNewsFreeOpenSourceSaasClone,
  aiNewsAiWrittenReadmes,
  aiNewsGpt6CyberLinuxKernelFlaws,
  aiVideoScriptSkillsBenchmark,
  aiAnimationStylesBenchmark,
  aiBlogWritingSkillsBenchmark,
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogPostByPath = (path: string) =>
  blogPosts.find((post) => post.path === path);

export const getRelatedPosts = (post: BlogPost) => post.relatedPosts;
