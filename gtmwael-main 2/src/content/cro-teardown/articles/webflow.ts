/**
 * webflow.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-11T17:04:47.047Z
 * Final judge  : 45/100 ✓
 * SEO score    : 76/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/webflow/writing/generated-article-data.json
 *   data/cro-teardowns/webflow/writing/article-final.md
 *   data/cro-teardowns/webflow/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug webflow --mode standard --force
 *   npm run cro-teardown:publish -- --slug webflow
 */

import type { CroTeardownPost } from "../types";

export const webflow: CroTeardownPost = {
  slug: "webflow",
  companyName: "Webflow",
  companyUrl: "https://webflow.com/",
  category: "CRO Teardown",
  title: "Webflow Homepage Teardown: Jan 2020 to Jun 2026",
  h1: "How Webflow rewrote its homepage over 6 years",
  metaTitle: "Webflow Homepage Teardown: Jan 2020 to Jun 2026",
  description: "A CRO teardown of Webflow's homepage from Jan 2020 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Webflow's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jan 2020 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-11",
  readTime: "7 min read",
  featuredImage: "/cro-teardowns/webflow/selected/2020-01.webp",
  featuredImageAlt: "Webflow Jan 2020 homepage — 'Break the code barrier'",
  fromLabel: "Jan 2020",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2020-01",
      label: "Jan 2020",
      screenshotPath: "/cro-teardowns/webflow/selected/2020-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/webflow/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2020 → Jun 2026",
      note: "2 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "5 added · 3 removed",
      note: "Significant structure changes",
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
      before: "Break the code barrier",
      after: "Make your website a growth engine",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Build responsive websites in your browser, then launch with our world-class hosting or export your code. Discover the professional website platform built for your business.",
      after: "Design, build, optimize, and rank in AI search — all in Webflow. Enterprise-grade security, CMS, hosting, and AEO built in. Trusted by over 300k teams.",
      note: "The new description is shorter and more neutral in tone. Whether this is intentional de-emphasis or a simplification pass is not determinable from text alone.",
    },
    {
      element: "Page title",
      before: "Responsive web design tool, CMS, and hosting platform | Webflow",
      after: "Webflow: The agentic web platform for modern businesses",
    },
  ],
  h2Added: [
    "Webflow is the agentic web marketing platform for high-performing brands",
    "300,000+ brands move the needle with Webflow",
    "From idea to impact, faster",
    "Everything marketing teams love about webflow",
    "Make your website your competitive edge",
  ],
  h2Removed: [
    "Who uses Webflow",
    "Get up and running fast",
    "Free until you’re ready to launch",
  ],
  ctaAdded: [
    "Get started",
    "Contact Sales",
    "Start for free",
    "Explore AEO",
    "Start building",
    "Start publishing",
    "Start optimizing",
    "Read customer story",
    "Get started — it's free",
    "Talk to sales",
  ],
  ctaRemoved: [
    "Get started — it's free",
    "Dell prototypes faster and more effectively.",
    "Heco builds world-class sites for clients.",
    "Showcase See the best sites #MadeInWebflow.",
    "Events Connect with the community.",
    "Live Stream Rebuilds, interviews, and more.",
    "Templates Browse 100+ custom templates.",
    "University Videos, guides, and mild humor.",
    "Courses Hours of full-length video tutorials.",
    "Ebooks In-depth guides and articles.",
  ],
  analysisBlocks: [
    {
      id: "analysis-2020-01",
      label: "Jan 2020 — original state",
      period: "Jan 2020",
      screenshotPath: "/cro-teardowns/webflow/selected/2020-01.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Break the code barrier\" — direct product statement.",
        "Visible section headings include: \"Design\", \"Build\", \"Launch\".",
        "Section headings later removed include: \"Who uses Webflow\" and \"Get up and running fast\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/webflow/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Make your website a growth engine\" — updated value proposition.",
        "New section headings include: \"Webflow is the agentic web marketing platform for high-performing brands\", \"300,000+ brands move the needle with Webflow\", \"From idea to impact, faster\".",
        "CTAs no longer present include: \"Get started — it's free\", \"Dell prototypes faster and more effectively.\", \"Heco builds world-class sites for clients.\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Webflow replaced \"Break the code barrier\" with \"Make your website a growth engine\"",
      body: "The original headline positioned Webflow as a no-code tool for designers. The new headline positions it as a marketing platform for revenue-focused teams. This suggests the company is moving upmarket — targeting buyers who care about business outcomes, not creative freedom. The shift from **\"Break the code barrier\"** to **\"Make your website a growth engine\"** is a filtering decision: it will read as more relevant to CMOs and less exciting to solo designers.",
      tag: "Positioning",
    },
    {
      title: "\"Agentic web marketing platform\" appears in both the page title and the first H2",
      body: "Webflow now calls itself an **\"agentic web marketing platform\"** in the page title and again in the hero section. The term \"agentic\" is uncommon in mainstream marketing copy — it may signal a strategic bet on AI-native positioning. The repetition across title and H2 suggests the company wants search engines and skimmers to associate Webflow with automation and agent-driven workflows, not just visual design.",
      tag: "Messaging",
    },
    {
      title: "The new meta description mentions \"AI search\" and \"AEO\" — neither appeared in 2020",
      body: "The updated meta description now includes **\"optimize, and rank in AI search\"** and references **\"AEO\"** (AI Engine Optimization). These terms did not exist in the 2020 version. This change likely reflects Webflow's response to the rise of AI-powered search engines like ChatGPT and Perplexed. The company is signaling to buyers that it solves a new category problem — not just SEO, but discoverability in LLM-mediated search results.",
      tag: "Strategy",
    },
    {
      title: "Webflow removed \"Get up and running fast\" and added \"From idea to impact, faster\"",
      body: "The original section heading **\"Get up and running fast\"** emphasized ease of use and speed to first publish. The new heading **\"From idea to impact, faster\"** emphasizes speed to business outcome. This is a semantic shift: the old frame appealed to creators who wanted to launch quickly; the new frame appeals to marketers who want to measure results. The evolution points to a buyer who already knows what they want to build.",
      tag: "Brand",
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
  businessContext: "## Why the homepage changed\n\nThat repositioning didn't happen in a vacuum. Between 2020 and 2026, Webflow defended its position in the increasingly crowded no-code web development space while enterprise competitors like WordPress VIP and Adobe Experience Manager consolidated marketing tool suites. The period also saw AI-native search interfaces emerge as distribution channels, forcing website platforms to differentiate on discovery and conversion optimization rather than design flexibility alone.\n\nThe homepage evolution from **\"Break the code barrier\"** to **\"Make your website a growth engine\"** suggests Webflow pivoted from capability positioning toward outcome-based enterprise messaging. Adding **\"AEO\"** (AI Engine Optimization) as a feature category and elevating **\"Contact Sales\"** to co-primary CTA is consistent with a shift from self-serve designer acquisition toward sales-assisted team and department deals. Section headings replaced user-focused language with business-impact claims like **\"move the needle\"** and **\"competitive edge\"**.\n\nThis maps to the broader SaaS category creation pattern: companies with proven product-market fit reposition into newly named categories to escape commoditization in saturated markets. For teams building website or marketing tools, this signals that distribution advantage now comes from solving for AI discoverability and proving pipeline impact — not just offering visual development. If your brand still requires feature education, this move is premature.",
  articleBody: "---\ntitle: \"Webflow Homepage Teardown: Jan 2020 to Jun 2026\"\nslug: webflow\ngeneratedAt: 2026-06-11T17:03:34.163Z\nsectionsIncluded: [\"01-intro\", \"07-business-context\"]\n---\n# How Webflow rewrote its homepage over 6 years\n\n*Jan 2020 → Jun 2026 · 2 snapshots · 7 min read*\n\n---\n\n# Webflow Homepage Teardown: How the Platform Repositioned from Visual Builder to Growth Engine\n\nBetween January 2020 and June 2026, Webflow rewrote its homepage to target a different buyer. The headline shifted from **\"Break the code barrier\"** to **\"Make your website a growth engine\"** — moving from a capability statement (what the tool does) to an outcome promise (what the business gets). The meta description dropped feature explanations and added **\"AEO\"** (AI Engine Optimization) and **\"enterprise-grade security\"**, signaling a shift toward category creation rather than category participation. This teardown shows how Webflow repositioned upmarket without abandoning its self-serve funnel — and what that means for SaaS companies deciding whether to follow a similar path.\n\n## Why the homepage changed\n\nThat repositioning didn't happen in a vacuum. Between 2020 and 2026, Webflow defended its position in the increasingly crowded no-code web development space while enterprise competitors like WordPress VIP and Adobe Experience Manager consolidated marketing tool suites. The period also saw AI-native search interfaces emerge as distribution channels, forcing website platforms to differentiate on discovery and conversion optimization rather than design flexibility alone.\n\nThe homepage evolution from **\"Break the code barrier\"** to **\"Make your website a growth engine\"** suggests Webflow pivoted from capability positioning toward outcome-based enterprise messaging. Adding **\"AEO\"** (AI Engine Optimization) as a feature category and elevating **\"Contact Sales\"** to co-primary CTA is consistent with a shift from self-serve designer acquisition toward sales-assisted team and department deals. Section headings replaced user-focused language with business-impact claims like **\"move the needle\"** and **\"competitive edge\"**.\n\nThis maps to the broader SaaS category creation pattern: companies with proven product-market fit reposition into newly named categories to escape commoditization in saturated markets. For teams building website or marketing tools, this signals that distribution advantage now comes from solving for AI discoverability and proving pipeline impact — not just offering visual development. If your brand still requires feature education, this move is premature.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-11T17:04:47.047Z",
};
