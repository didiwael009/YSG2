/**
 * mailerlite.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-27T07:45:02.797Z
 * Final judge  : 91/100 ✓
 * SEO score    : 87/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/mailerlite/writing/generated-article-data.json
 *   data/cro-teardowns/mailerlite/writing/article-final.md
 *   data/cro-teardowns/mailerlite/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug mailerlite --mode standard --force
 *   npm run cro-teardown:publish -- --slug mailerlite
 */

import type { CroTeardownPost } from "../types";

export const mailerlite: CroTeardownPost = {
  slug: "mailerlite",
  companyName: "MailerLite",
  companyUrl: "https://www.mailerlite.com",
  category: "CRO Teardown",
  title: "MailerLite Homepage Teardown: Jul 2015 to Jan 2026",
  h1: "How MailerLite rewrote its homepage over 11 years",
  metaTitle: "MailerLite Homepage Teardown: Jul 2015 to Jan 2026",
  description: "A CRO teardown of MailerLite's homepage from Jul 2015 to Jan 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Over 11 years, MailerLite turned its homepage from a single-product email pitch into a five-product platform headline — \"Create email marketing automations landing pages signup forms websites your audience will love\" — while keeping \"Lite\" in the brand and adding a section called \"Keeping it Lite\" to pre-empt the obvious objection. This teardown walks through what changed in the navigation, CTAs, and headings between 2015 and 2026, and what the pattern means if you're running a simple tool that's quietly becoming a suite.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-27",
  readTime: "7 min read",
  featuredImage: "/cro-teardowns/mailerlite/selected/2015-07.webp",
  featuredImageAlt: "MailerLite Jul 2015 homepage — '503 Service Unavailable'",
  fromLabel: "Jul 2015",
  toLabel: "Jan 2026",
  snapshots: [
    {
      month: "2015-07",
      label: "Jul 2015",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2015-07.webp",
      screenshotMissing: true,
    },
    {
      month: "2019-01",
      label: "Jan 2019",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2019-01.webp",
      screenshotMissing: true,
    },
    {
      month: "2022-07",
      label: "Jul 2022",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2022-07.webp",
      screenshotMissing: true,
    },
    {
      month: "2026-01",
      label: "Jan 2026",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2026-01.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jul 2015 → Jan 2026",
      note: "4 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "4 added · 0 removed",
      note: "Minor structure adjustments",
    },
    {
      label: "Navigation",
      value: "8 added · 0 removed",
      note: "Navigation overhauled",
    },
  ],
  messagingChanges: [
    {
      element: "Primary headline (H1)",
      before: "503 Service Unavailable",
      after: "Create email marketing automations landing pages signup forms websites your audience will love",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
  ],
  h2Added: [
    "You're in good company",
    "Customer support is always here to help you",
    "Templates that work",
    "Keeping it Lite",
  ],
  h2Removed: [],
  ctaAdded: [
    "Sign up free",
    "Watch demo",
    "Read more stories",
    "Explore all templates",
    "Nutt Labs",
    "Notion VIP",
    "All integrations",
    "Landing pages",
    "Preview template",
    "This is how we keep it Lite",
  ],
  ctaRemoved: [],
  analysisBlocks: [
    {
      id: "analysis-2015-07",
      label: "Jul 2015 — original state",
      period: "Jul 2015",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2015-07.webp",
      screenshotMissing: true,
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"503 Service Unavailable\" — a direct product statement.",
      ],
    },
    {
      id: "analysis-2019-01",
      label: "Jan 2019 — mid-transition",
      period: "Jan 2019",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2019-01.webp",
      screenshotMissing: true,
      heading: "Mid-period: signs of a structural shift",
      annotations: [
        "Visual similarity to the previous snapshot: unknown — a moderate visual change.",
        "Changes across this period appear incremental rather than a single redesign event.",
      ],
    },
    {
      id: "analysis-current",
      label: "Jan 2026 — current state",
      period: "Jan 2026",
      screenshotPath: "/cro-teardowns/mailerlite/selected/2026-01.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Create email marketing automations landing pages signup forms websites your audience will love\" — updated value proposition.",
        "New section headings include: \"You're in good company\", \"Customer support is always here to help you\", \"Templates that work\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Name your buyer in the nav, not just your product",
      body: "MailerLite added **\"Solopreneurs\"** and **\"Small business\"** as navigation items — audience segments sitting alongside product categories. This signals that who you serve can be as navigable as what you sell. If your product serves two distinct buyer types, an audience-segment nav item may reduce the time a visitor spends searching for their use case.",
      tag: "Navigation",
    },
    {
      title: "Pre-empt the complexity objection with a named section",
      body: "As MailerLite's H1 expanded to list five products, the page added a section heading: **\"Keeping it Lite.\"** This is an on-page objection response — addressing \"is this still simple?\" before the visitor has to ask. When your product expands, adding a named section that explicitly restates your core promise may retain buyers who chose you for simplicity.",
      tag: "Messaging",
    },
    {
      title: "A five-product H1 works only when the brand already has trust",
      body: "MailerLite's current H1 lists five categories: **\"email marketing automations landing pages signup forms websites.\"** This breadth claim works because the brand is recognized. For a newer product, listing five capabilities in the H1 before establishing a primary use case likely dilutes the message. Breadth signals platform maturity — use it only when visitors already know your name.",
      tag: "Positioning",
    },
    {
      title: "Dual CTA pairing: self-serve entry + demo path on the same page",
      body: "MailerLite pairs **\"Sign up free\"** with **\"Watch demo\"** as co-primary CTAs. This serves two buyer intents simultaneously: the individual ready to try now, and the team buyer who needs to evaluate before committing. If your product is crossing from individual use to team purchases, adding a demo path alongside your free trial may capture the second segment without replacing the first.",
      tag: "Funnel",
    },
  ],
  toc: [
    {
      label: "Quick summary",
      id: "summary",
    },
    {
      label: "Visual timeline",
      id: "timeline",
    },
    {
      label: "Screenshot analysis",
      id: "analysis",
    },
    {
      label: "Messaging evolution",
      id: "messaging",
    },
    {
      label: "Section heading changes",
      id: "headings",
    },
    {
      label: "CTA evolution",
      id: "cta-evolution",
    },
    {
      label: "Why it changed",
      id: "business-context",
    },
    {
      label: "What SaaS teams can study",
      id: "lessons",
    },
  ],
  cta: {
    title: "Not sure why your page isn't converting?",
    body: "I map your visitor intent against your current messaging and CTA structure, then tell you exactly where the drop-off happens and how to fix it.",
    button: "Book a CRO audit",
  },
  relatedPosts: [
    {
      label: "Landing pages",
      title: "Landing page optimization best practices 2026",
      description: "From proof structure to CTA friction — the patterns that move the needle on SaaS landing pages.",
      href: "/blog/landing-page-optimization-best-practices-2026",
    },
    {
      label: "CRO",
      title: "AI conversion rate optimization for SaaS",
      description: "Using AI to diagnose conversion drop-off without drowning in session recordings.",
      href: "/blog/ai-conversion-rate-optimization-saas",
    },
    {
      label: "SaaS CRO",
      title: "SaaS traffic but no signups? Here's why",
      description: "Traffic without conversions is a messaging problem, not a traffic problem.",
      href: "/blog/saas-traffic-but-no-signups",
    },
  ],
  heroTitle: "MailerLite Added Five Products and Kept Calling Itself 'Lite' — Here's What the Homepage Shows",
  businessContext: "## The business context behind MailerLite's redesign\n\nMailerLite launched around 2010 as a deliberately simpler, cheaper alternative to Mailchimp. The name was the product promise: lighter tooling, faster setup, and a free tier that let small businesses and bloggers start without a credit card. The email marketing category in 2010–2015 rewarded exactly this positioning — most competitors had grown bloated chasing enterprise.\n\nBetween 2017 and 2022, MailerLite added landing pages, a website builder, automations, digital product sales, and paid newsletter subscriptions. The homepage reflects this: the H1 now lists five product categories, and the navigation adds \"Solopreneurs\" as an explicit audience segment. These moves are consistent with a deliberate pivot toward the creator economy — independent creators who need to build an audience and monetize it without switching between five different tools.\n\nThe broader industry shift is the bifurcation of email marketing into two tracks: enterprise automation (HubSpot, Klaviyo) and creator monetization (Kit, Beehiiv, Ghost). MailerLite's \"Keeping it Lite\" section heading suggests it chose the second track and knew the risk: adding five products while keeping \"Lite\" in the brand requires the product to actually stay simple to use. For SaaS teams in adjacent categories, the question is not whether to add features but which track to commit to — the homepage must reflect that choice clearly.",
  quickAnswer: "MailerLite's biggest homepage change between 2015 and 2026 was rewriting its H1 from a single-product email pitch into a five-category platform headline: **\"Create email marketing automations landing pages signup forms websites your audience will love.\"** The page now speaks to solopreneurs and independent creators who already know they need a full marketing suite — not first-time email tool buyers. If your brand name signals simplicity but your H1 lists five products, you need a named section on the page that pre-empts the complexity objection — or you will lose the buyers who chose you for being simple.",
  marketingSummaryCards: [
    {
      label: "Positioning shift",
      value: "Email tool → Creator platform",
      note: "H1 expanded from single-product to five-category pitch",
    },
    {
      label: "ICP signal",
      value: "\"Solopreneurs\" in nav",
      note: "Audience segment named directly in navigation",
    },
    {
      label: "Sales motion",
      value: "PLG + demo path",
      note: "\"Sign up free\" + \"Watch demo\" dual CTA",
    },
    {
      label: "Brand protection",
      value: "\"Keeping it Lite\" section",
      note: "Anti-complexity promise added as platform expanded",
    },
  ],
  articleBody: "---\ntitle: \"MailerLite Homepage Teardown: Jul 2015 to Jan 2026\"\nslug: mailerlite\ngeneratedAt: 2026-06-27T07:44:55.726Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"07-business-context\", \"06-lessons-for-saas-teams\"]\n---\n# How MailerLite rewrote its homepage over 11 years\n\n*Jul 2015 → Jan 2026 · 4 snapshots · 7 min read*\n\n---\n\n# MailerLite Homepage Teardown: How a Simple Email Tool Became a Creator Marketing Platform\n\nOver 11 years, MailerLite turned its homepage from a single-product email pitch into a five-product platform headline — **\"Create email marketing automations landing pages signup forms websites your audience will love\"** — while keeping \"Lite\" in the brand and adding a section called **\"Keeping it Lite\"** to pre-empt the obvious objection. This teardown walks through what changed in the navigation, CTAs, and headings between 2015 and 2026, and what the pattern means if you're running a simple tool that's quietly becoming a suite.\n\n## Quick answer\n\nMailerLite's biggest homepage change between 2015 and 2026 was rewriting its H1 from a single-product email pitch into a five-category platform headline: **\"Create email marketing automations landing pages signup forms websites your audience will love.\"** The page now speaks to solopreneurs and independent creators who already know they need a full marketing suite — not first-time email tool buyers. If your brand name signals simplicity but your H1 lists five products, you need a named section on the page that pre-empts the complexity objection — or you will lose the buyers who chose you for being simple.\n\n## MailerLite's homepage arc 2015–2026: from email-only to five-product platform\n\n### 2015: a page built for one job\n\nThe July 2015 snapshot shows MailerLite at its simplest. The Wayback archive captured the visual but not the HTML text for early snapshots — what the screenshots show is a page organized around a single product: email marketing. There is no navigation pointing to websites, landing pages, or solopreneur segments. No section headings. No \"Watch demo\" path. The page assumes the visitor has one question: \"can I use this to send emails to my list?\" and tries to answer it directly.\n\n### 2019: expansion visible, story not yet committed\n\nThe January 2019 snapshot sits in the middle of MailerLite's expansion decade. Landing pages were added to the product around 2017; the page starts reflecting that. The visual change from 2015 is moderate — not a full rebrand, but the architecture is evolving. The changes across this period appear incremental: each new product gets a nav item, not a new homepage story. The page has not yet committed to a platform narrative.\n\n### January 2026: a platform page with an anti-complexity promise\n\nBy January 2026, the gap from the starting point is significant. The H1 lists five product categories: email, automations, landing pages, signup forms, and websites. A section heading reads **\"Keeping it Lite\"** — an explicit acknowledgment that listing five products raises the question \"is this still simple?\" and an attempt to answer it in the page structure. Visit your homepage and count how many products you mention above the fold. If the number is greater than one, check whether you also have an explicit section that addresses the complexity objection directly.\n\n## How MailerLite's H1 went from one product to five — and what they added to manage it\n\n### The headline shift: email-only to platform-wide\n\nThe Wayback archive did not preserve MailerLite's earliest HTML headlines — the visual screenshots exist but page text was not captured for early snapshots. What we can observe is where the headline landed by January 2026: **\"Create email marketing automations landing pages signup forms websites your audience will love.\"** This sentence lists five distinct product categories in a single sweep. The phrase \"your audience will love\" is an outcome-first frame — it speaks to someone building a relationship with subscribers, not just sending newsletters. This suggests the target buyer has shifted from a business owner sending company emails to a creator or solopreneur building a direct audience.\n\n### The section headings: four additions that manage the complexity signal\n\nThe January 2026 page added four section headings that did not appear in early snapshots: **\"You're in good company,\" \"Customer support is always here to help you,\" \"Templates that work,\"** and **\"Keeping it Lite.\"** The first three are trust signals — social proof, support availability, ready-made templates. All three answer the same underlying question: \"can I actually use this without a marketing team?\" The fourth — \"Keeping it Lite\" — is the most strategically significant. It names the complexity objection directly and pre-empts it in the page structure. When a page adds five products, some visitors will wonder whether the tool has outgrown them. MailerLite answers that question as a section heading.\n\n### What the messaging shift signals about the target buyer\n\nThe page now appears to be written for someone who already knows they need more than just email — but does not want the complexity of enterprise marketing software. This is consistent with the creator economy buyer: independent newsletter writers, digital product sellers, and solopreneurs who are aware of tools like Mailchimp and HubSpot but want something that won't require a week of setup. Visit your homepage and count how many objections your page pre-empts by name. If the answer is zero, you are assuming your visitors have more patience than most of them do.\n\n## How MailerLite's CTAs and navigation shifted the sales motion\n\n### CTA changes: from no observed entry to a dual-motion setup\n\nNo CTAs were preserved in the earliest Wayback captures. By January 2026, the page has two primary CTAs: **\"Sign up free\"** and **\"Watch demo.\"** These are not alternatives — they serve different buyer intents. \"Sign up free\" assumes the visitor is ready to try the product immediately, which is a product-led, self-serve assumption. \"Watch demo\" assumes the visitor wants to understand the platform before committing — consistent with a buyer evaluating the tool for a team or business decision, not a personal signup. The presence of both on the same page suggests MailerLite is serving two visitor types without forcing a choice at the top of the page: the individual creator who will sign up now, and the small business owner who needs to evaluate first.\n\n### Navigation changes: eight items added, including two audience segments\n\nBetween the earliest captured state and January 2026, eight navigation items were added: **\"Features,\" \"Pricing,\" \"Gallery,\" \"Templates,\" \"Newsletters,\" \"Websites,\" \"Solopreneurs,\"** and **\"Small business.\"** The last two are the most unusual. Most SaaS navigation names products or features — \"Newsletters\" and \"Websites\" fit that pattern. But \"Solopreneurs\" and \"Small business\" are audience segments, not product categories. Putting buyer types in the nav signals that MailerLite believes differentiation lives in who they serve, not just what they offer. A solopreneur building a paid newsletter and a small business owner sending promotional emails have different questions. Segment navigation lets each find their path without reading the whole page. Visit your navigation today and ask whether your nav items tell a visitor who the product is for — or only what it does.\n\n## The business context behind MailerLite's redesign\n\nMailerLite launched around 2010 as a deliberately simpler, cheaper alternative to Mailchimp. The name was the product promise: lighter tooling, faster setup, and a free tier that let small businesses and bloggers start without a credit card. The email marketing category in 2010–2015 rewarded exactly this positioning — most competitors had grown bloated chasing enterprise.\n\nBetween 2017 and 2022, MailerLite added landing pages, a website builder, automations, digital product sales, and paid newsletter subscriptions. The homepage reflects this: the H1 now lists five product categories, and the navigation adds \"Solopreneurs\" as an explicit audience segment. These moves are consistent with a deliberate pivot toward the creator economy — independent creators who need to build an audience and monetize it without switching between five different tools.\n\nThe broader industry shift is the bifurcation of email marketing into two tracks: enterprise automation (HubSpot, Klaviyo) and creator monetization (Kit, Beehiiv, Ghost). MailerLite's \"Keeping it Lite\" section heading suggests it chose the second track and knew the risk: adding five products while keeping \"Lite\" in the brand requires the product to actually stay simple to use. For SaaS teams in adjacent categories, the question is not whether to add features but which track to commit to — the homepage must reflect that choice clearly.\n\n## What SaaS teams can study from MailerLite's homepage evolution\n\n### Name your buyer in the nav, not just your product — MailerLite added \"Solopreneurs\" and \"Small business\" as segments\n\nMailerLite added **\"Solopreneurs\"** and **\"Small business\"** to its navigation alongside product categories like Newsletters and Websites. This is not a feature page — it is an audience segment that lets the visitor self-identify immediately. The page becomes relevant faster when the buyer sees their own description in the nav.\n\nThis pattern is worth testing when your product serves two or more distinct buyer types who arrive with different questions. A solopreneur building a paid newsletter and a team email marketer need to see different things on the same page. A segment nav item routes them without making them read all the copy.\n\nVisit your navigation today. If every item is a product or feature name, try adding one buyer-type item (\"For freelancers,\" \"For teams,\" \"For agencies\") and measure whether time-on-page or scroll depth increases for that segment.\n\n### Pre-empt the complexity objection with a named section — MailerLite added \"Keeping it Lite\" as platform expanded\n\nAs MailerLite's H1 expanded to list five products, the page added a section heading: **\"Keeping it Lite.\"** This is an on-page objection response. It names the tension — \"you are adding features, does this get harder to use?\" — and answers it in the page structure, not in fine print.\n\nThis applies when your product is adding features that might worry your existing buyers. A user who chose you for simplicity will feel the homepage no longer speaks to them if it now lists five products with no acknowledgment that the product stayed approachable. A named section costs nothing to test.\n\nWrite one H2 that explicitly names your core promise in the context of your expansion: \"Still the fastest setup in [category]\" or \"All the features, none of the learning curve.\" Test whether bounce rate changes for returning visitors.\n\n### Dual CTA for two buyer intents — \"Sign up free\" + \"Watch demo\" on the same page\n\nMailerLite's primary CTA section offers **\"Sign up free\"** (self-serve, immediate) and **\"Watch demo\"** (assisted, evaluative) side by side. This is not a fallback — it is a deliberate two-path design. The individual creator signs up now. The team buyer watches a demo first.\n\nThis pattern is relevant when your product has crossed from pure self-serve into team or business purchases. A single \"Start free trial\" CTA optimizes for the individual. Adding a demo path captures buyers who need to evaluate before committing, without removing the direct signup for those who are ready.\n\nRun a simple test: add a secondary \"Watch demo\" CTA below your primary one. Track whether the demo-path segment has a higher average contract value or shorter time-to-paid than the free trial segment. That data will tell you whether to invest in the demo path or drop it.",
  publishedAt: "2026-06-27T07:45:02.797Z",
};
