/**
 * gong.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-11T17:04:46.986Z
 * Final judge  : 45/100 ✓
 * SEO score    : 71/100 ✓
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
      title: "Gong replaced 'Revenue Intelligence' with 'Revenue AI OS' — that's a category ownership play",
      body: "The original H1 opened with **\"REVENUE INTELLIGENCE\"** — a product category frame. The current page title now reads **\"Gong - Revenue AI OS\"**. This shift suggests Gong is no longer competing within an established category — it's claiming ownership of a new one. The meta description now positions the platform as serving **\"your entire GTM organization\"**, not just sales teams. This signals a buyer expansion beyond sales leaders.",
      tag: "Positioning",
    },
    {
      title: "The primary hero CTA changed from 'Watch Video' to 'See Gong in action' — filtering passive visitors",
      body: "The original CTA invited visitors to **\"Watch Video\"** — a low-commitment ask suitable for early-stage browsers. The current hero CTA reads **\"See Gong in action\"**, which suggests a demo or product tour. This likely filters out casual researchers and attracts buyers closer to evaluation. The removal of named testimonial CTAs like **\"Paul Santarelli VP of Sales\"** further suggests the page now prioritizes conversion depth over top-of-funnel volume.",
      tag: "CRO",
    },
    {
      title: "'Pitchbook is 10x more efficient with revenue AI' replaces generic feature sections",
      body: "The original page included section headings like **\"Revenue Intelligence helps you fuel:\"** and **\"So What Does this look like? Glad you asked.\"** — feature-led structure. The current page adds customer-outcome headings like **\"Pitchbook is 10x more efficient with revenue AI\"** and **\"Winning GTM organizations run revenue on Gong\"**. This shift moves proof earlier in the page hierarchy. It signals that Gong now assumes visitors arrive already knowing what revenue intelligence does — they need reassurance, not education.",
      tag: "Trust",
    },
    {
      title: "10 new section headings and 8 navigation items added — this is a funnel redesign, not polish",
      body: "The page added 10 new section headings and completely replaced 8 navigation items over six years. The meta description no longer mentions **\"sales conversations\"** — it now opens with **\"multimodal revenue signal processing, specialized AI agents\"**. This is not incremental messaging refinement. It suggests Gong's product roadmap expanded significantly, and the homepage evolved to reflect new buyer sophistication. The page now assumes visitors understand AI tooling and need differentiation, not category definition.",
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
  businessContext: "## Why the homepage changed\n\nThe shifts documented above reflect a deliberate strategic repositioning. Gong entered as a conversation intelligence vendor in a sales tech landscape crowded with point solutions for call recording, coaching, and pipeline visibility. By 2020, **\"Revenue Intelligence\"** was still novel enough to warrant a dedicated navigation item (**\"What is RI?\"**) and a branded podcast. The early homepage served mid-funnel buyers discovering the category.\n\nBy 2026, Gong replaced **\"REVENUE INTELLIGENCE\"** with **\"Revenue AI Built To Predict churn\"** and removed all category education links. The meta description shift from **\"better sales conversations\"** to **\"multimodal revenue signal processing, specialized AI agents\"** suggests the company stopped teaching the category and started positioning as enterprise revenue infrastructure. The page title dropped **\"for Sales Teams\"** entirely.\n\nThis maps to the AI-era platform consolidation pattern: once your category becomes RFP vocabulary, you graduate from educator to OS. For SaaS teams, the lesson is timing—premature infrastructure positioning confuses buyers still Googling **\"[category] + definition.\"** Wait until discovery calls stop asking what your category means.",
  articleBody: "---\ntitle: \"Gong Homepage Teardown: Jan 2020 to Jun 2026\"\nslug: gong\ngeneratedAt: 2026-06-11T17:03:40.943Z\nsectionsIncluded: [\"01-intro\", \"07-business-context\"]\n---\n# How Gong rewrote its homepage over 6 years\n\n*Jan 2020 → Jun 2026 · 3 snapshots · 8 min read*\n\n---\n\n# Gong Homepage Teardown: How the Company Shifted from Category Education to AI Platform\n\nBetween January 2020 and June 2026, Gong stopped teaching visitors what \"Revenue Intelligence\" means and started positioning itself as an operating system for revenue teams. The original homepage opened with the headline **\"REVENUE INTELLIGENCE\"** and dedicated navigation links to explaining the category (**\"What is RI?\"** and **\"Reveal: The RI Podcast\"**). By 2026, those elements were gone — replaced by **\"Revenue AI Built To Predict churn\"** and navigation focused on products and demos. This article walks through what changed in the headline, meta description, navigation, and section structure — and shows you how to test whether your own homepage is still explaining your category or assuming buyers already know it.\n\n## Why the homepage changed\n\nThe shifts documented above reflect a deliberate strategic repositioning. Gong entered as a conversation intelligence vendor in a sales tech landscape crowded with point solutions for call recording, coaching, and pipeline visibility. By 2020, **\"Revenue Intelligence\"** was still novel enough to warrant a dedicated navigation item (**\"What is RI?\"**) and a branded podcast. The early homepage served mid-funnel buyers discovering the category.\n\nBy 2026, Gong replaced **\"REVENUE INTELLIGENCE\"** with **\"Revenue AI Built To Predict churn\"** and removed all category education links. The meta description shift from **\"better sales conversations\"** to **\"multimodal revenue signal processing, specialized AI agents\"** suggests the company stopped teaching the category and started positioning as enterprise revenue infrastructure. The page title dropped **\"for Sales Teams\"** entirely.\n\nThis maps to the AI-era platform consolidation pattern: once your category becomes RFP vocabulary, you graduate from educator to OS. For SaaS teams, the lesson is timing—premature infrastructure positioning confuses buyers still Googling **\"[category] + definition.\"** Wait until discovery calls stop asking what your category means.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-11T17:04:46.986Z",
};
