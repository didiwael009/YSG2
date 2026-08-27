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
import { lucidyaV2 } from "./articles/lucidya";
import { crowdanalyzer } from "./articles/crowdanalyzer";
import { mailerlite } from "./articles/mailerlite";
import { brevo } from "./articles/brevo";
import { sendx } from "./articles/sendx";
import { preply } from "./articles/preply";
export type { CroTeardownPost, SnapshotEntry, MessagingChange, AnalysisBlock, LessonCard, SummaryCard } from "./types";

export const croTeardownPosts: CroTeardownPost[] = [preply, sendx, brevo, mailerlite, crowdanalyzer, lucidyaV2, foreplay, unbounce, buffer, apify, agorapulse, webflow, gong, expensya, linear, lemlist, apollo, vercel, shopify, crisp, clay, intercom, stripe, hootsuite];

export const getCroTeardownBySlug = (slug: string) =>
  croTeardownPosts.find((post) => post.slug === slug);
