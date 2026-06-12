/**
 * shopify.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-12T17:39:13.297Z
 * Final judge  : 92/100 ✓
 * SEO score    : 84/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/shopify/writing/generated-article-data.json
 *   data/cro-teardowns/shopify/writing/article-final.md
 *   data/cro-teardowns/shopify/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug shopify --mode standard --force
 *   npm run cro-teardown:publish -- --slug shopify
 */

import type { CroTeardownPost } from "../types";

export const shopify: CroTeardownPost = {
  slug: "shopify",
  companyName: "Shopify",
  companyUrl: "https://www.shopify.com",
  category: "CRO Teardown",
  title: "Shopify Homepage Teardown: Jul 2021 to Jun 2026",
  h1: "How Shopify rewrote its homepage over 5 years",
  metaTitle: "Shopify Homepage Teardown: Jul 2021 to Jun 2026",
  description: "A CRO teardown of Shopify's homepage from Jul 2021 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Between July 2021 and June 2026, Shopify rewrote its homepage to speak to a completely different visitor. The headline shifted from \"The platform commerce is built on\" — a category claim — to \"Be the next AI all-star\" — an identity message. The page stopped explaining what Shopify is and started filtering for visitors who already know. This teardown walks through three snapshots to show which changes matter, which don't, and what you can test on your own homepage if your brand cannot afford to skip the category explanation.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-09",
  readTime: "8 min read",
  featuredImage: "/cro-teardowns/shopify/selected/2021-07.webp",
  featuredImageAlt: "Shopify homepage — Jul 2021",
  fromLabel: "Jul 2021",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2021-07",
      label: "Jul 2021",
      screenshotPath: "/cro-teardowns/shopify/selected/2021-07.webp",
    },
    {
      month: "2025-01",
      label: "Jan 2025",
      screenshotPath: "/cro-teardowns/shopify/selected/2025-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/shopify/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jul 2021 → Jun 2026",
      note: "3 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "5 added · 7 removed",
      note: "Major content architecture overhaul",
    },
    {
      label: "Navigation",
      value: "8 added · 8 removed",
      note: "Navigation overhauled",
    },
  ],
  messagingChanges: [
    {
      element: "Primary headline (H1)",
      before: "The platform commerce is built on",
      after: "Be the nextAI all-star",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Try Shopify free and start a business or grow an existing one. Get more than ecommerce software with tools to manage every part of your business.",
      after: "Try Shopify free. Build or grow your business fast with AI. Get more than ecommerce software with tools to manage every part of your business.",
      note: "The new description is shorter and more neutral in tone. Whether this is intentional de-emphasis or a simplification pass is not determinable from text alone.",
    },
    {
      element: "Page title",
      before: "Start a Business, Grow Your Business - Shopify 14-Day Free Trial",
      after: "Shopify: The All-in-One Commerce Platform for Businesses - Shopify",
    },
  ],
  h2Added: [
    "store they line up for",
    "Your brand has entered the chat",
    "Meet your secret weapon, Sidekick",
    "There’s no better place for you to build",
    "Build fast on Shopify",
  ],
  h2Removed: [
    "Bring your business online",
    "Take the best path forward",
    "With you wherever you’re going",
    "Empowering independent business owners everywhere",
    "Get the help you need, every step of the way",
    "Start your business journey with Shopify",
    "Change your country or region.",
  ],
  ctaAdded: [
    "Start for free",
    "Get a stunning store",
    "Compare Shopify",
    "Sidekick Your commerce-obsessed AI assistant.",
    "Website Builder",
    "Customer Accounts",
    "AI Chats",
    "Shop App",
    "Social & Marketplaces",
    "Across Markets",
  ],
  ctaRemoved: [
    "Start your business",
    "Start free trial",
    "Explore more examples",
    "Explore ways to sell",
    "Explore how to market your business",
    "Explore how to manage your business",
    "Learn more about Shopify",
    "Contact support",
    "Explore the Shopify Experts Marketplace",
    "Contact",
  ],
  analysisBlocks: [
    {
      id: "analysis-2021-07",
      label: "Jul 2021 — original state",
      period: "Jul 2021",
      screenshotPath: "/cro-teardowns/shopify/selected/2021-07.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"The platform commerce is built on\" — direct product statement.",
        "Visible section headings include: \"Bring your business online\", \"Take the best path forward\", \"With you wherever you’re going\".",
        "Navigation includes: \"Skip to Content\", \"Start your business\", \"Business name generator\", \"Web address\" — product category framing.",
        "Section headings later removed include: \"Bring your business online\" and \"Take the best path forward\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/shopify/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Be the nextAI all-star\" — updated value proposition.",
        "New section headings include: \"store they line up for\", \"Your brand has entered the chat\", \"Meet your secret weapon, Sidekick\".",
        "CTAs no longer present include: \"Start your business\", \"Start free trial\", \"Explore more examples\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Shopify replaced \"The platform commerce is built on\" with \"Be the next AI all-star\"",
      body: "The original headline positioned Shopify as infrastructure. The new headline positions the *buyer* as a future success story. This shift likely signals a move from product-focused messaging to identity-focused messaging — the page now recruits people who want to be seen as innovators, not just people who need ecommerce tools. The meta description reinforces this: **\"Build or grow your business fast with AI\"** now appears before any mention of ecommerce software.",
      tag: "Messaging",
    },
    {
      title: "10 \"Explore\" and \"Start your business\" CTAs removed — 10 \"Start for free\" and feature-specific CTAs added",
      body: "Shopify removed every CTA that contained **\"Explore\"** or **\"Start your business\"**. The new CTAs are action-oriented and feature-specific: **\"Get a stunning store\"**, **\"Website Builder\"**, **\"AI Chats\"**. This suggests a shift from discovery-friendly navigation (good for researchers) to conversion-optimised navigation (good for buyers who already know they want Shopify). The page now filters more aggressively — it assumes you are here to start, not to learn.",
      tag: "Navigation",
    },
    {
      title: "\"Your brand has entered the chat\" and \"Meet your secret weapon, Sidekick\" are not ecommerce section headings",
      body: "The original section headings were operational: **\"Bring your business online\"**, **\"Take the best path forward\"**. The new headings are cultural: **\"Your brand has entered the chat\"**, **\"store they line up for\"**. These are not instructions — they are aspiration statements. The page no longer explains what Shopify does in every heading. Instead, it describes the world you join when you use it. This is a brand-first content structure, not a product-first one.",
      tag: "Positioning",
    },
    {
      title: "Shopify overhauled 16 navigation items and 12 section headings — the evolution signals a sales-motion change",
      body: "When a company changes this much surface area — 16 CTAs, 12 section headings, the H1, the meta description — it is not a refresh. It is a repositioning. The original page served people starting a business for the first time. The new page serves people who already identify as builders or entrepreneurs and want to move fast. The evidence suggests Shopify may be optimising for higher-intent traffic and accepting lower conversion rates from casual visitors.",
      tag: "Strategy",
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
      label: "What SaaS teams can study",
      id: "lessons",
    },
  ],
  cta: {
    title: "Want your homepage audited like this?",
    body: "I review your traffic sources, message match, CTA path, proof structure, and mobile experience — then give you a specific list of what to change and why.",
    button: "Book a page audit",
  },
  relatedPosts: [
    {
      label: "SaaS CRO",
      title: "SaaS traffic but no signups? Here's why",
      description: "If your page is getting visits but not converting, the issue is usually message match — not traffic volume.",
      href: "/blog/saas-traffic-but-no-signups",
    },
    {
      label: "Landing pages",
      title: "Landing page optimization best practices 2026",
      description: "The patterns that separate high-converting SaaS pages from the ones that bleed spend.",
      href: "/blog/landing-page-optimization-best-practices-2026",
    },
    {
      label: "CRO",
      title: "AI conversion rate optimization for SaaS",
      description: "How to use AI tools to identify conversion leaks without drowning in data.",
      href: "/blog/ai-conversion-rate-optimization-saas",
    },
  ],
  articleBody: "---\ntitle: \"Shopify Homepage Teardown: Jul 2021 to Jun 2026\"\nslug: shopify\ngeneratedAt: 2026-06-10T19:06:09.230Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Shopify rewrote its homepage over 5 years\n\n*Jul 2021 → Jun 2026 · 3 snapshots · 8 min read*\n\n---\n\n# Shopify Landing Page Teardown: How the Homepage Changed From 2021 to 2026\n\nBetween July 2021 and June 2026, Shopify rewrote its homepage to speak to a completely different visitor. The headline shifted from **\"The platform commerce is built on\"** — a category claim — to **\"Be the next AI all-star\"** — an identity message. The page stopped explaining what Shopify is and started filtering for visitors who already know. This teardown walks through three snapshots to show which changes matter, which don't, and what you can test on your own homepage if your brand cannot afford to skip the category explanation.\n\n## Quick answer: Shopify homepage shift\n\nShopify replaced its category-defining headline **\"The platform commerce is built on\"** with **\"Be the next AI all-star\"**. The page title changed from **\"Start a Business, Grow Your Business\"** to **\"The All-in-One Commerce Platform for Businesses\"**. The meta description added AI as a benefit claim while keeping the phrase **\"Get more than ecommerce software with tools to manage every part of your business\"** unchanged.\n\n## Shopify homepage positioning: how the headline changed between 2021 and 2026\n\n### What changed\n\nThe 2021 homepage opened with **\"The platform commerce is built on\"** — a direct product statement. The current homepage opens with **\"Be the nextAI all-star\"** — a line that does not explain what Shopify is. The page removed section headings like **\"Bring your business online\"** and **\"Take the best path forward\"** that once oriented new visitors. Navigation items like **\"Start your business\"** and **\"Business name generator\"** — labels that named the category — are also gone.\n\n### Why it matters\n\nThe new homepage no longer explains the product category. Visitors must already know what Shopify does before they arrive. This suggests the company expects most traffic to come from brand searches or referrals — contexts where the visitor does not need an introduction. If your homepage gets significant traffic from cold channels like non-branded search or paid ads, removing the category explanation creates a gap.\n\n### What it costs\n\nOpen your homepage and count how many words in your H1 require prior knowledge of your product category. Shopify went from zero assumption words in 2021 (**\"platform\"** and **\"commerce\"** are both plain) to at least two in 2026 (**\"nextAI all-star\"** assumes context). If your count is above zero and your brand is not a household name, test a version that names the category first.\n\n## Shopify homepage messaging shift: who the page now targets\n\n### Who the old page served\n\nThe 2021 page spoke to someone deciding whether to start selling online. The headline — **\"The platform commerce is built on\"** — used language that named the product category. \n\nThe meta description promised **\"start a business or grow an existing one\"**, addressing founders at the beginning of their research.\n\n### Who the new page serves\n\nThe 2026 page does not name the product category in the headline. **\"Be the next AI all-star\"** mentions ambition, not ecommerce or online stores. \n\nThe meta description now leads with **\"Build or grow your business fast with AI\"**, mentioning AI and speed but not selling, stores, or ecommerce.\n\n### What this means for the sales process\n\nThe new headline no longer explains what Shopify is. This approach works only if visitors arrive from brand search, referrals, or content that already explained the category.\n\nIt may not work if your traffic arrives without prior knowledge of your product. Visit shopify.com in incognito. Count how many words before you see \"ecommerce\", \"online store\", or \"sell online\". The 2026 page hits 23 words. Time your own homepage.\n\n## Shopify CTA evolution: from educational paths to direct activation\n\n### Shopify removed ten educational CTAs and added ten product-specific ones\n\nThe old homepage offered **\"Start your business\"** and **\"Explore ways to sell\"** — multi-step paths for visitors still deciding whether to sell online. The new page leads with **\"Start for free\"** and **\"Get a stunning store\"** — direct activation. Gone: **\"Learn more about Shopify\"**, **\"Explore how to market your business\"**, **\"Explore the Shopify Experts Marketplace\"**. Added: **\"Compare Shopify\"**, **\"Shop App\"**, **\"AI Chats\"**, **\"Customer Accounts\"**.\n\n### What happens when you remove \"Explore\" and \"Learn more\" CTAs\n\nThe page no longer includes buttons for visitors who need to understand what Shopify does before they start a trial. If your homepage still gets traffic from people searching \"what is [your product category]\" or \"how to [solve problem],\" your visitor arrives with different questions than someone searching your brand name.\n\n### Audit your own page\n\nOpen your homepage. Count CTAs that start with \"Learn,\" \"Explore,\" or \"Discover.\" If you have three or more, archive the current page, remove one educational CTA, and measure whether your trial-start rate changes over two weeks. Shopify's CTA shift suggests they no longer depend on visitors who need the educational path — test whether you do.\n\n## Should SaaS companies copy Shopify's homepage strategy? When it works and when it doesn't\n\n### The messaging pattern: from category explanation to visitor filter\n\nShopify removed section headings like **\"Bring your business online\"** — headings that explained what the platform does. The new homepage assumes visitors already know. This shift from explaining the category to assuming category knowledge is the meta-pattern. It only works when your brand does the explaining before the visitor arrives.\n\n### Copy this if your brand name already owns the category\n\nShopify's navigation shifted from **\"Start your business\"** and **\"Business name generator\"** to **\"Website Builder\"** and **\"Domains\"**. The new labels assume visitors are comparing ecommerce platforms, not discovering them. You likely have the brand recognition this requires if a stranger can guess what your product does from your company name alone — before they see your homepage.\n\n### Skip this if your homepage traffic arrives cold\n\nIf your visitors land without knowing your category, removing explanation headings may create confusion. Shopify removed **\"Bring your business online\"** — a heading that told new visitors what job Shopify solves. If your traffic comes from non-branded search, cold paid ads, or referrals that don't mention your product type, your homepage likely still needs to state the category.\n\n### The 5-minute homepage audit: count your category-explanation headings\n\nOpen your homepage. Count how many section headings explain what your product does — headings similar to Shopify's removed **\"Bring your business online\"**. \n\nIf you have zero explanation headings and your brand does not auto-complete with your category in Google search, add at least one before removing any category-defining copy.",
  internalLinkSuggestions: [
    "/cro-teardowns/hootsuite",
    "/cro-teardowns/expensya",
    "/cro-teardowns/linear",
  ],
  publishedAt: "2026-06-12T17:39:13.297Z",
};
