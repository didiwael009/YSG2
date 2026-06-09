/**
 * shopify.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-09T07:40:59.769Z
 * Final judge  : 91/100 ✓
 * SEO score    : 83/100 ✓
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
  title: "Shopify Landing Page Teardown: How the Homepage Changed (2021–2026)",
  h1: "How Shopify's landing page changed over 5 years: a CRO teardown",
  metaTitle: "Shopify Landing Page Teardown (2021–2026)",
  description: "A CRO teardown of Shopify's landing page from Jul 2021 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Shopify's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jul 2021 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
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
      value: "5 added · 8 removed",
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
    "More resources",
    "Change your country or region.",
  ],
  ctaAdded: [
    "Start for free",
    "Get a stunning store",
    "Compare Shopify",
    "SidekickYour commerce-obsessed AI assistant.",
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
      title: "Your H1 signals which buyer you are targeting",
      body: "The headline changed from \"The platform commerce is built on\" to \"Be the nextAI all-star\". The framing of your H1 is one of the clearest signals of which buyer you are targeting and what you expect them to do next.",
      tag: "Messaging",
    },
    {
      title: "Navigation is a positioning statement",
      body: "Navigation items changed from \"Start your business\", \"Business name generator\", \"Web address\" to \"Website Builder\", \"Domains\", \"Customer Accounts\". The labels your navigation uses reveal what you think your visitor is trying to decide — and who that visitor is.",
      tag: "Navigation",
    },
    {
      title: "Section headings reveal what the team thinks buyers care about",
      body: "5 section headings were added and 8 removed between Jul 2021 and Jun 2026. New headings include \"store they line up for\" and \"Your brand has entered the chat\". Headings that disappeared include \"Bring your business online\" and \"Take the best path forward\". The pattern of what gets added and removed is one of the clearest signals of how a team is re-prioritizing its value proposition.",
      tag: "CRO",
    },
    {
      title: "Incremental changes compound into a brand shift",
      body: "Across 3 snapshots spanning roughly 5 years, no single update here was a dramatic overhaul. The end state looks very different from the start because small, consistent changes in the same direction accumulate. This is worth studying if your own homepage has been drifting without a clear direction.",
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
  articleBody: "---\ntitle: \"Shopify Landing Page Teardown: How the Homepage Changed (2021–2026)\"\nslug: shopify\ngeneratedAt: 2026-06-09T07:39:54.275Z\nsectionsIncluded: [\"01-intro\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Shopify's landing page changed over 5 years: a CRO teardown\n\n*Jul 2021 → Jun 2026 · 3 snapshots · 8 min read*\n\n---\n\nBetween July 2021 and June 2026, Shopify rewrote its homepage headline from **\"The platform commerce is built on\"** to **\"Be the next AI all-star.\"** That is not a copy refresh. That is a shift from category ownership to identity recruitment — from naming what the product does to naming what the buyer should become. This teardown maps what changed across three snapshots: headline frames, navigation structure, section architecture, and CTA strategy. By the end, you will be able to identify whether your own homepage is selling to the buyer you have, or the buyer you want.\n\n## Shopify's homepage stopped explaining what it is and started recruiting who you want to be\n\nThe 2021 headline named what the product was: **\"The platform commerce is built on.\"** The current headline — **\"Be the nextAI all-star\"** — only works if the visitor already believes AI matters in commerce, wants to identify as an all-star, and sees those two claims as connected. This is aspiration positioning: the page recruits an identity instead of explaining a category.\n\nThe section headings follow the same pattern. **\"Bring your business online\"** and **\"Take the best path forward\"** addressed discovery-stage concerns — whether to start, which direction to choose. The new headings — **\"Your brand has entered the chat\"** and **\"Meet your secret weapon, Sidekick\"** — address tool selection for visitors who have already started. The new headlines only function for visitors who already have AI fluency and brand-led ambition — not visitors who need those outcomes promised to them.\n\nThe homepage trades accessibility — reaching visitors who don't yet know if AI matters — for alignment with visitors who already identify as ambitious and AI-forward. That trade is only viable if the brand already owns the category in the buyer's working memory before the page loads. Open your analytics. If a significant share of your homepage traffic is non-branded search or paid cold traffic, positioning that assumes pre-existing belief may be ahead of where your audience currently is.\n\n## Shopify replaced a trust signal with an aspiration signal that excludes most of their historical acquisition funnel\n\n**\"The platform commerce is built on\"** is evidence. **\"Be the next AI all-star\"** is recruitment. The first headline functions as category proof — it tells a prospect evaluating commerce platforms that this is the infrastructure layer. The second is a qualification filter via aspiration signaling: it tells a prospect chasing competitive advantage that this platform is for operators, not researchers. The meta description made the same move — **\"start a business or grow an existing one\"** became **\"Build or grow your business fast with AI\"** — dropping the invitation to start entirely.\n\nThe pattern is consistent with ICP narrowing through category language. The old page title — **\"Start a Business, Grow Your Business\"** — served pre-revenue founders and established operators equally. The new one — **\"The All-in-One Commerce Platform for Businesses\"** — signals procurement-stage infrastructure evaluation. The visible language shift — from inviting people to start a business to comparing platform features — is consistent with procurement-stage framing rather than discovery-stage framing.\n\nOpen your homepage. If your H1 could recruit both pre-revenue founders and established businesses — like Shopify's old version — paste it into Google and check whether the top results are discovery content or procurement comparison grids. Who shows up in those results tells you which buyer your page is currently optimized for.\n\n## Shopify removed every exploratory CTA\n\nTen CTAs out. Ten CTAs in. But the replaced set assumes the visitor already knows they want Shopify. **\"Explore more examples\"** served consideration-stage traffic — visitors comparing what commerce looks like across categories. **\"Explore ways to sell\"** served discovery — people uncertain which channels matter for their business. **\"Learn more about Shopify\"** served informational intent. All three gone. What replaced them: **\"Start for free,\"** **\"Get a stunning store,\"** **\"Compare Shopify.\"** Every new CTA assumes the visitor is already in procurement mode. This is a qualification filter — a friction increase that trades mid-funnel volume for late-funnel intent signal.\n\nThe cost is visible in who this path cannot serve anymore: a founder researching \"how to start selling online\" who lands on the homepage will not find an answer. They will find a signup form. That filters out early-stage traffic entirely — which only works if your paid acquisition, content, or brand already does the qualification upstream. Open your CTA list. If more than half require zero commitment to click, you are still serving discovery traffic — and a page that only serves procurement-stage intent may leave mid-funnel visitors without a path to continue.\n\n## Do not copy this unless your URL already completes the category sentence\n\nThis is brand-led repositioning — when a company stops explaining what it does and starts recruiting who the buyer should become. The pattern is most legible to visitors who already hold category knowledge before the page loads. Shopify's URL completes the sentence \"Shopify is a ___\" in the buyer's head before the page renders. **\"Be the next AI all-star\"** lands because the category question is already answered. A company without that recognition who copies this headline structure does not get category ambiguity. They get bounce.\n\nThe prerequisite here is not \"strong brand.\" It is pre-existing category ownership in the buyer's working memory. If your company name does not auto-complete a category sentence when a procurement-stage buyer types it into Google, identity-first messaging creates a proof gap you cannot close with a demo CTA. You are asking the buyer to self-identify before you have told them what they are identifying for.\n\nThe tradeoff of the entire evolution: Shopify traded discovery-stage traffic for procurement-stage intent signal, which only holds if the brand already owns category search without explaining itself. Open your Google Search Console. If a large share of your homepage traffic comes from non-branded queries, removing category explanation from your H1 may cost you qualified pipeline — not just unqualified traffic. The ratio is visible in your own data; Shopify's version of this move is not safe to copy until yours shows the same brand-first pattern.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-09T07:40:59.769Z",
};
