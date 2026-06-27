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
import { gong } from "./articles/gong";
import { webflow } from "./articles/webflow";
import { apify } from "./articles/apify";
import { agorapulse } from "./articles/agorapulse";
import { buffer } from "./articles/buffer";
import { unbounce } from "./articles/unbounce";
import { foreplay } from "./articles/foreplay";
// Lucidya V2 — reference example of the skill-grounded (V2) teardown style.
// Not yet in the production sitemap; slug "lucidya-v2" kept as the canonical
// quality reference for the skills-driven pipeline output.
import { lucidyaV2 } from "./articles/lucidya-v2";
import { crowdanalyzer } from "./articles/crowdanalyzer";
import { mailerlite } from "./articles/mailerlite";
import { brevo } from "./articles/brevo";
import { sendx } from "./articles/sendx";
export type { CroTeardownPost, SnapshotEntry, MessagingChange, AnalysisBlock, LessonCard, SummaryCard } from "./types";

export const croTeardownPosts: CroTeardownPost[] = [hootsuite, stripe, intercom, shopify, vercel, crisp, clay, linear, lemlist, apollo, expensya, gong, webflow, apify, agorapulse, buffer, unbounce, foreplay, lucidyaV2, crowdanalyzer, mailerlite, brevo, sendx];

export const getCroTeardownBySlug = (slug: string) =>
  croTeardownPosts.find((post) => post.slug === slug);
