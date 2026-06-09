import type { CroTeardownPost } from "./types";
import { hootsuite } from "./articles/hootsuite";

import { stripe } from "./articles/stripe";
import { intercom } from "./articles/intercom";
import { shopify } from "./articles/shopify";
export type { CroTeardownPost, SnapshotEntry, MessagingChange, AnalysisBlock, LessonCard, SummaryCard } from "./types";

export const croTeardownPosts: CroTeardownPost[] = [hootsuite, stripe, intercom, shopify];

export const getCroTeardownBySlug = (slug: string) =>
  croTeardownPosts.find((post) => post.slug === slug);
