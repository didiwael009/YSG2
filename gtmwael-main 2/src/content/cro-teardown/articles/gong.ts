/**
 * gong.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-12T08:29:39.867Z
 * Final judge  : 62/100 ✓
 * SEO score    : 74/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/gong/writing/generated-article-data.json
 *   data/cro-teardowns/gong/writing/article-final.md
 *   data/cro-teardowns/gong/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug gong --mode standard --force
 *   npm run cro-teardown:publish -- --slug gong
 */

import type { CroTeardownPost } from "../types";

export const gong: CroTeardownPost = {
  slug: "gong",
  companyName: "Gong",
  companyUrl: "https://www.gong.io/",
  category: "CRO Teardown",
  title: "Gong Homepage Teardown: Jan 2020 to Jun 2026",
  h1: "How Gong rewrote its homepage over 6 years",
  metaTitle: "Gong Homepage Teardown: Jan 2020 to Jun 2026",
  description: "A CRO teardown of Gong's homepage from Jan 2020 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Gong's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jan 2020 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-11",
  readTime: "8 min read",
  featuredImage: "/cro-teardowns/gong/selected/2020-01.webp",
  featuredImageAlt: "Gong Jan 2020 homepage — 'REVENUE INTELLIGENCE'",
  fromLabel: "Jan 2020",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2020-01",
      label: "Jan 2020",
      screenshotPath: "/cro-teardowns/gong/selected/2020-01.webp",
    },
    {
      month: "2021-10",
      label: "Oct 2021",
      screenshotPath: "/cro-teardowns/gong/selected/2021-10.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/gong/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2020 → Jun 2026",
      note: "3 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "10 added · 4 removed",
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
      before: "REVENUE INTELLIGENCE",
      after: "Revenue AI Built To Predict churnPredict churn",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Generate more revenue by having better sales conversations with the #1 revenue intelligence platform for sales optimization.",
      after: "Gong Revenue AI OS helps your entire GTM organization win. Drive growth with multimodal revenue signal processing, specialized AI agents, and purpose-built applications.",
      note: "Meta description updated. The change in framing may reflect a positioning adjustment or an SEO update.",
    },
    {
      element: "Page title",
      before: "Revenue Intelligence Technology for Sales Teams | Gong.io",
      after: "Gong - Revenue AI OS",
    },
  ],
  h2Added: [
    "Trusted by 5,000+ customers",
    "Winning GTM organizations run revenue on Gong",
    "Pitchbook is 10x more efficient with revenue AI",
    "Power your revenue engine with AI — from prospecting to expansion",
    "Gong Revenue AI OS",
    "Trusted by high-performing revenue teams in every industry",
    "What our raving fans say",
    "Everyone wins with Gong",
    "Win more with revenue AI",
    "Privacy Preference Center",
  ],
  h2Removed: [
    "Get powerful visibility into your customer interactions with",
    "Revenue Intelligence helps you fuel:",
    "So What Does this look like? Glad you asked.",
    "Skyrocket your success today",
  ],
  ctaAdded: [
    "Read the case study",
    "Learn about our product",
    "See Gong in action",
    "Visit the solutions hub",
    "View more customer stories",
  ],
  ctaRemoved: [
    "Watch Video",
    "Paul Santarelli VP of Sales",
    "Bevin Lyon VP, Customer Strategy",
    "Tonni Bennett VP of Sales",
  ],
  analysisBlocks: [
    {
      id: "analysis-2020-01",
      label: "Jan 2020 — original state",
      period: "Jan 2020",
      screenshotPath: "/cro-teardowns/gong/selected/2020-01.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"REVENUE INTELLIGENCE\" — direct product statement.",
        "Visible section headings include: \"Get powerful visibility into your customer interactions with\", \"Revenue Intelligence helps you fuel:\", \"So What Does this look like? Glad you asked.\".",
        "Navigation includes: \"Log In\", \"What is RI?\", \"Overview\", \"Reveal: The RI Podcast\" — product category framing.",
        "Section headings later removed include: \"Get powerful visibility into your customer interactions with\" and \"Revenue Intelligence helps you fuel:\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/gong/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Revenue AI Built To Predict churnPredict churn\" — updated value proposition.",
        "New section headings include: \"Trusted by 5,000+ customers\", \"Winning GTM organizations run revenue on Gong\", \"Pitchbook is 10x more efficient with revenue AI\".",
        "CTAs no longer present include: \"Watch Video\", \"Paul Santarelli VP of Sales\", \"Bevin Lyon VP, Customer Strategy\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Gong replaced 'REVENUE INTELLIGENCE' with 'Revenue AI Built To Predict churn' — a use-case-first headline",
      body: "The original H1 named the product category (**\"REVENUE INTELLIGENCE\"**). The current version leads with a specific outcome: **\"Revenue AI Built To Predict churn\"**. This suggests Gong is targeting buyers who already understand their problem and are evaluating solutions, rather than prospects still learning what revenue intelligence means. The headline now filters for pipeline-stage fit.",
      tag: "Messaging",
    },
    {
      title: "The hero CTA changed from 'Watch Video' to 'See Gong in action' — a demo-intent signal",
      body: "Gong removed **\"Watch Video\"** and added **\"See Gong in action\"** as the primary above-the-fold CTA. The new phrasing signals a demo or product walkthrough, not passive content consumption. This likely reflects a shift toward buyers who are further along in evaluation — people ready to see the platform, not researchers watching explainer videos.",
      tag: "CRO",
    },
    {
      title: "'Trusted by 5,000+ customers' replaced 'So What Does this look like? Glad you asked.'",
      body: "The original homepage included a casual, explanatory section heading: **\"So What Does this look like? Glad you asked.\"** The current version leads with **\"Trusted by 5,000+ customers\"** — a proof-of-scale statement. This suggests Gong is leaning into category leadership and social proof, rather than educating first-time visitors about what the product does.",
      tag: "Trust",
    },
    {
      title: "Gong's meta description now addresses 'your entire GTM organization' instead of 'sales teams'",
      body: "The original meta description targeted **\"sales optimization\"** and **\"sales conversations\"**. The current version says Gong **\"helps your entire GTM organization win\"** and references **\"multimodal revenue signal processing, specialized AI agents, and purpose-built applications\"**. This indicates an upmarket expansion — Gong may now be selling into revenue operations or cross-functional buying committees, not just sales leadership.",
      tag: "Positioning",
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
  businessContext: "## Why Gong's homepage changed\n\nThe messaging shifts visible on the homepage didn't happen in a vacuum — they tracked Gong's growth milestones.\n\n### Market entry context: Gong crossed 2,000 customers in 9 months\n\nGong raised $200 million at a $2.2 billion valuation in September 2020, then $250 million at $7.25 billion just nine months later. By Q2 2021, the company had crossed 2,000 customers including three Fortune 20 accounts. The removal of **\"What is RI?\"** and **\"Reveal: The RI Podcast\"** from navigation between 2020 and 2026 coincided with this period of rapid customer expansion.\n\n### Product evolution: From conversation intelligence to Revenue AI OS\n\nBetween 2021 and 2024, Gong publicly announced the RightBound acquisition and launched generative AI features including Call Spotlight and Deal Spotlight, according to press releases. The homepage shift from **\"REVENUE INTELLIGENCE\"** to **\"Revenue AI Built To Predict churn\"** and the meta description change from **\"better sales conversations\"** to **\"multimodal revenue signal processing, specialized AI agents\"** is consistent with a company that added platform capabilities beyond single-department tools.\n\n### Industry shift: Category consolidation and AI repositioning\n\nGartner published its first Magic Quadrant for Revenue Action Orchestration in December 2025, the same period when Clari and Salesloft merged. Gong's homepage removed **\"Coaching Recommendations\"** and **\"Deal Visibility\"** from navigation while adding **\"Gong AI\"** and **\"Innovation\"**. Open your homepage navigation in an incognito window. Count how many nav items explain what your category is versus how many assume the visitor already knows. If you have 2+ educational nav items and your category has 50+ funded competitors, test removing one and measuring bounce rate on the pricing page.",
  marketingSummaryCards: [
    {
      label: "Category strategy",
      value: "Evangelist → Infrastructure owner",
      note: "Removed 'What is RI?' and all educational nav",
    },
    {
      label: "Target buyer",
      value: "VP Sales → CRO + GTM Org",
      note: "Meta description shifted from 'sales optimization' to 'entire GTM organization'",
    },
    {
      label: "Proof mechanism",
      value: "Practitioner names → Case study CTAs",
      note: "Removed individual VP testimonials; added quantified efficiency claims",
    },
    {
      label: "Technical framing",
      value: "Category term → Architecture stack",
      note: "From 'Revenue Intelligence' to 'Revenue AI OS' with agent/signal terminology",
    },
  ],
  articleBody: "---\ntitle: \"Gong Homepage Teardown: Jan 2020 to Jun 2026\"\nslug: gong\ngeneratedAt: 2026-06-12T08:27:08.368Z\nsectionsIncluded: [\"01-intro\", \"07-business-context\"]\n---\n# How Gong rewrote its homepage over 6 years\n\n*Jan 2020 → Jun 2026 · 3 snapshots · 8 min read*\n\n---\n\n# Gong Homepage Teardown: How the Revenue Intelligence Leader Abandoned Its Own Category\n\nGong's homepage between January 2020 and June 2026 tells the story of a company that stopped explaining what it does and started assuming you already know. The original H1 — **\"REVENUE INTELLIGENCE\"** — named the category Gong invented. The current H1 — **\"Revenue AI Built To Predict churn\"** — assumes the category is settled and leads with a specific capability instead. The navigation shift is even sharper: Gong removed **\"What is RI?\"** and **\"Reveal: The RI Podcast\"**, the two primary tools it used to teach the market what Revenue Intelligence meant. What replaced them? Infrastructure language: **\"Revenue AI OS\"**, **\"multimodal revenue signal processing\"**, and **\"specialized AI agents\"**. After reading this teardown, you will know how to test whether your own homepage is still teaching a category your buyers already understand — and what to replace the explanation with if they do.\n\n## Why Gong's homepage changed\n\nThe messaging shifts visible on the homepage didn't happen in a vacuum — they tracked Gong's growth milestones.\n\n### Market entry context: Gong crossed 2,000 customers in 9 months\n\nGong raised $200 million at a $2.2 billion valuation in September 2020, then $250 million at $7.25 billion just nine months later. By Q2 2021, the company had crossed 2,000 customers including three Fortune 20 accounts. The removal of **\"What is RI?\"** and **\"Reveal: The RI Podcast\"** from navigation between 2020 and 2026 coincided with this period of rapid customer expansion.\n\n### Product evolution: From conversation intelligence to Revenue AI OS\n\nBetween 2021 and 2024, Gong publicly announced the RightBound acquisition and launched generative AI features including Call Spotlight and Deal Spotlight, according to press releases. The homepage shift from **\"REVENUE INTELLIGENCE\"** to **\"Revenue AI Built To Predict churn\"** and the meta description change from **\"better sales conversations\"** to **\"multimodal revenue signal processing, specialized AI agents\"** is consistent with a company that added platform capabilities beyond single-department tools.\n\n### Industry shift: Category consolidation and AI repositioning\n\nGartner published its first Magic Quadrant for Revenue Action Orchestration in December 2025, the same period when Clari and Salesloft merged. Gong's homepage removed **\"Coaching Recommendations\"** and **\"Deal Visibility\"** from navigation while adding **\"Gong AI\"** and **\"Innovation\"**. Open your homepage navigation in an incognito window. Count how many nav items explain what your category is versus how many assume the visitor already knows. If you have 2+ educational nav items and your category has 50+ funded competitors, test removing one and measuring bounce rate on the pricing page.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-12T08:29:39.867Z",
};
