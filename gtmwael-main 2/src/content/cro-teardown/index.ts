import type { CroTeardownPost } from "./types";
import { hootsuite } from "./articles/hootsuite";

import { stripe } from "./articles/stripe";
import { intercom } from "./articles/intercom";
import { shopify } from "./articles/shopify";
import { vercel } from "./articles/vercel";
import { crisp } from "./articles/crisp";
import { clay } from "./articles/clay";
import { linear } from "./articles/linear";
import { lemlist } from "./articles/lemlist";
import { apollo } from "./articles/apollo";
import { expensya } from "./articles/expensya";
export type { CroTeardownPost, SnapshotEntry, MessagingChange, AnalysisBlock, LessonCard, SummaryCard } from "./types";

export const croTeardownPosts: CroTeardownPost[] = [hootsuite, stripe, intercom, shopify, vercel, crisp, clay, linear, lemlist, apollo, expensya];

export const getCroTeardownBySlug = (slug: string) =>
  croTeardownPosts.find((post) => post.slug === slug);
