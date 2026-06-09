/**
 * shopify.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-09T05:51:53.753Z
 * Final judge  : 78/100 ✓
 * SEO score    : 82/100 ✓
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
  articleBody: "---\ntitle: \"Shopify Homepage Teardown: Jul 2021 to Jun 2026\"\nslug: shopify\ngeneratedAt: 2026-06-09T05:49:01.773Z\nsectionsIncluded: [\"01-intro\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Shopify rewrote its homepage over 5 years\n\n*Jul 2021 → Jun 2026 · 3 snapshots · 8 min read*\n\n---\n\nBetween July 2021 and June 2026, Shopify rewrote its homepage headline from **\"The platform commerce is built on\"** to **\"Be the next AI all-star\"** — a shift that moved the frame from infrastructure authority to founder aspiration. The page title, meta description, navigation structure, and section headings all changed in the same window. This teardown walks through what moved, what it signals about Shopify's target buyer, and where the tradeoffs landed.\n\n## From platform claim to AI-powered outcome promise\n\nWhere the July 2021 homepage opened with **\"The platform commerce is built on\"** — a category ownership statement anchored in scale and foundation — the June 2026 version pivoted to **\"Be the nextAI all-star\"**, a promise that positions the product as the mechanism for breakout success. The meta description now leads with **\"Build or grow your business fast with AI\"** instead of the former **\"Try Shopify free and start a business or grow an existing one.\"**\n\nThis can be read as a move from credibility-based positioning (we are the infrastructure layer) to an outcome-forward claim that embeds AI as the differentiator. The new headline assumes the visitor wants to become exceptional, not simply operational, and that AI is now table stakes for that ambition. It trades category authority for aspiration.\n\n**The tradeoff:** credibility vs overclaiming. A platform claim is defensible but low-ceiling. An outcome promise paired with AI raises the bar — and the skepticism.\n\n**So what?** If you're rewriting your headline, ask: does your visitor believe AI is the unlock, or do they need to believe in *you* first? Outcome promises work when the visitor already knows what success looks like. If they don't, the claim floats.\n\n## The page stopped talking to the store starter\n\nThat outcome-shift played out across every text field. The headline changed from **\"The platform commerce is built on\"** to **\"Be the nextAI all-star.\"** The meta description moved from **\"Try Shopify free and start a business or grow an existing one\"** to **\"Try Shopify free. Build or grow your business fast with AI.\"** The page title evolved from **\"Start a Business, Grow Your Business\"** to **\"The All-in-One Commerce Platform for Businesses.\"** Every change replaces beginner language with capability language. \"Start a business\" exits. \"AI all-star\" and \"all-in-one platform\" enter.\n\nThis appears consistent with targeting a buyer who already runs something and wants to scale it with new tools, rather than someone choosing their first platform. The vocabulary suggests confidence over education. The tradeoff: **breadth vs focus** — a tighter lens on growth-stage merchants who care about AI tooling, at the cost of the founding narrative that built trust with first-timers.\n\nIf your homepage still says \"start,\" ask whether your best customers are actually starters — or whether they're switching from something that stopped working.\n\n## Ten CTAs became ten — but every label shifted from education to action\n\nTen CTAs became ten different CTAs. The labels shifted from educational entry points — **\"Start your business\"**, **\"Explore more examples\"**, **\"Explore ways to sell\"** — to product-specific action — **\"Start for free\"**, **\"Get a stunning store\"**, **\"Website Builder\"**, **\"Shop App\"**. The page removed every \"learn more\" and \"explore\" variant, replacing them with feature-specific trial entry points and tool names that assume you already know what Shopify does.\n\nThe new CTA set shifts from nurturing consideration to capturing intent. If mid-funnel CTAs like **\"Explore ways to sell\"** were converting cold traffic into trials, removing them may have increased trial quality at the cost of trial volume. If they were bloating the funnel with unqualified signups, product-specific CTAs like **\"Website Builder\"** let qualified visitors self-select faster. The tradeoff: speed vs qualification — faster for the ready, invisible for the curious. Count your mid-funnel asks. If your **\"Learn how it works\"** drives 20% of trial starts from cold traffic, you cannot afford to remove it. If it drives 5% from warm traffic that would convert anyway, cut it and watch trial quality climb.\n\n## Do not copy Shopify's homepage unless your brand can already finish the sentence\n\nEvery change above depends on a single precondition: earned category recognition. Do not copy this evolution. Not unless your company name already completes a buyer's sentence when they describe what they need. Shopify can open with **\"Be the next AI all-star\"** and drop **\"The platform commerce is built on\"** because the brand itself carries the category signal — the URL alone tells a first-time visitor what Shopify does. The headline is free to do something else: recruit, inspire, or reframe the buyer's ambition. That freedom is earned, not copied.\n\nThis is a pattern of brand-led positioning replacing category-led positioning. Across 3 snapshots, navigation shifted from **\"Start your business\"** and **\"Business name generator\"** to **\"Website Builder\"**, **\"Domains\"**, and **\"Customer Accounts\"** — from beginner education to product infrastructure. Section headings moved from **\"Bring your business online\"** to **\"Your brand has entered the chat\"** and **\"store they line up for.\"** The company stopped explaining what it is and started recruiting a specific identity: the founder who thinks of themselves as a brand, not a beginner.\n\nThe tradeoff: category clarity in exchange for aspiration and buyer self-selection.\n\n**So what?** Before you remove your \"what we do\" headline, open an incognito window and type your company name into Google. If the search result doesn't immediately tell a stranger your category, you still need the headline to do that job.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-09T05:51:53.753Z",
};
