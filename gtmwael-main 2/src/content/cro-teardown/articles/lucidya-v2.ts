/**
 * lucidya-v2.ts — Skill-grounded teardown (the V2 / "system with CRO skills" style).
 * Evidence: real Wayback captures (2019-07, 2020-07) + verified live screenshot
 * (current-live.webp, captured 2026-06-26). All numbers taken verbatim from the
 * live page — 30 Arabic dialects, 90% sentiment accuracy, 238/207/900% proof.
 * Analysis grounded in CXL 7 Levels, Awareness ladder, category design, VoC.
 */

import type { CroTeardownPost } from "../types";

export const lucidyaV2: CroTeardownPost = {
  slug: "lucidya-v2",
  companyName: "Lucidya",
  companyUrl: "https://www.lucidya.com/",
  category: "CRO Teardown",
  title: "Lucidya climbed the category ladder — and buried its moat",
  h1: "Lucidya climbed the category ladder — and buried its moat",
  metaTitle: "Lucidya Homepage Teardown: how climbing the category ladder buried its moat",
  description: "A framework-driven CRO teardown of Lucidya (2019→2026): how a feature-led 'Arabic social listening tool' became a 'CX intelligence platform' — and the conversion cost of hiding its defensible wedge.",
  excerpt: "Between 2019 and 2026 Lucidya climbed the category ladder — from a feature-named \"Arabic social listening tool\" to a \"unified, AI-native CX intelligence platform.\" It's a textbook benefit-led repositioning, but it came at a cost: the one thing competitors can't copy — understanding 30 Arabic dialects at 90% sentiment accuracy — fell from the entire headline to a section near the bottom of the page. They traded their moat for category breadth.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-26",
  readTime: "7 min read",
  featuredImage: "/cro-teardowns/lucidya/selected/2019-07.webp",
  featuredImageAlt: "Lucidya 2019 homepage — Arabic-focused social listening, the wedge front and center",
  fromLabel: "Jul 2019",
  toLabel: "Jun 2026",
  snapshots: [
    { month: "2019-07", label: "Jul 2019", screenshotPath: "/cro-teardowns/lucidya/selected/2019-07.webp" },
    { month: "2020-07", label: "Jul 2020", screenshotPath: "/cro-teardowns/lucidya/selected/2020-07.webp" },
    { month: "current", label: "Jun 2026", screenshotPath: "/cro-teardowns/lucidya/selected/current-live.webp" },
  ],
  summaryCards: [
    { label: "Period covered", value: "Jul 2019 → Jun 2026", note: "3 snapshots compared" },
    { label: "Headline awareness level", value: "Solution-aware → Unaware", note: "Schwartz ladder: lost specificity" },
    { label: "Moat visibility", value: "Headline → near footer", note: "'Decode dialect nuances' is now ~7th section" },
    { label: "Lowest 7-Level score", value: "Orientation 2/5", note: "12 H2s, no narrative spine" },
  ],
  messagingChanges: [
    {
      element: "Primary headline (H1)",
      before: "Reveal Consumer Insights — Arabic Focused Social Media Listening Tool Powered By Artificial Intelligence",
      after: "Turn complex data into clear actions with real-time AI insights",
      note: "On the CXL Awareness ladder, the 2019 line spoke to a Solution-Aware buyer who already wanted Arabic social listening. The 2026 line is a claim any analytics tool could make — Relevance drops.",
    },
    {
      element: "Sub-headline",
      before: "(none — feature bullets only)",
      after: "Monitor conversations, analyze sentiment, engage customers, and unlock insights using the unified, AI-native CX intelligence platform.",
      note: "Category-design move: bigger TAM (enterprise CX) and an enterprise buyer (Banking, Insurance, Government) — but 'unified AI-native CX platform' is a parity claim, not a wedge.",
    },
    {
      element: "Page title",
      before: "Lucidya - is an arabic focused social media analytics and crisis management tool",
      after: "Lucidya — AI-native CX intelligence platform",
      note: "The title tag dropped 'arabic focused social media' — the exact phrase a MENA buyer searches for.",
    },
    {
      element: "Primary CTA",
      before: "Request Demo",
      after: "Request a demo · Explore plans",
      note: "Two CTAs with no visual primary split intent — breaks the one-primary-action rule. For an enterprise ICP, demo should dominate.",
    },
  ],
  h2Added: [
    "Built for brands that demand excellence",
    "Our products & services",
    "Engineered for your industry",
    "Make every consumer experience count",
    "Insights you can act on",
    "Decode dialect nuances",
    "Regulated. Tested. Proven.",
  ],
  h2Removed: [
    "Start making smarter decisions with Lucidya",
    "Why Lucidya",
  ],
  ctaAdded: ["Request a demo", "Explore plans", "Explore OmniServe", "Try a demo"],
  ctaRemoved: ["Request Demo"],
  analysisBlocks: [
    {
      id: "analysis-2019",
      label: "Jul 2019 — maximum differentiation",
      period: "Jul 2019",
      screenshotPath: "/cro-teardowns/lucidya/selected/2019-07.webp",
      heading: "Act 1: the wedge IS the headline",
      annotations: [
        "H1: \"Arabic Focused Social Media Listening Tool Powered by AI\" — speaks to a Solution-Aware buyer (Schwartz). Narrow, but maximally specific.",
        "Proof of the moat: \"Advanced Arabic Text Analysis\", \"historical tweets since 2006\", \"+150M websites, blogs and forums\".",
        "7 Levels — Relevance: high. The defensible differentiator is the first thing a MENA buyer reads.",
      ],
    },
    {
      id: "analysis-2020",
      label: "Jul 2020 — the first step away",
      period: "Jul 2020",
      screenshotPath: "/cro-teardowns/lucidya/selected/2020-07.webp",
      heading: "Act 2: feature → benefit",
      annotations: [
        "H1: \"Grow Your Brand & — with Social Insights\" — a move up Maslow's ladder from feature to outcome.",
        "Widens top of funnel, but 'Social Insights' is a claim a dozen tools make. First rung where specificity is traded for reach.",
        "Sub-copy still anchors the moat: 'Lucidya's AI-powered social listening tool... geared towards Arabic brands.'",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — category claim, buried moat",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/lucidya/selected/current-live.webp",
      heading: "Act 3: a platform headline, the wedge demoted",
      annotations: [
        "H1: \"Turn complex data into clear actions with real-time AI insights\" — a parity claim. The sub-head names the category ('unified, AI-native CX intelligence platform'), not the wedge.",
        "Strong proof is present: 238% positive sentiment, 207% social reach, 900% response data, and a 'Fastest growing AI Agent provider MENA 2026' award.",
        "The moat — 'Decode dialect nuances': 30 Arabic dialects (Khaliji to Maghrebi) at 90% sentiment accuracy — sits ~7 sections down, below products, industries, and the award.",
        "7 Levels — Relevance 3/5 (generic headline), Orientation 2/5 (12 H2s, no spine), Trust 4/5 (specific proof + compliance badges).",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Climbing the category ladder can bury your moat — check VoC before you broaden",
      body: "Lucidya's defensible edge is **30 Arabic dialects at 90% sentiment accuracy** — exactly what a MENA enterprise buyer searches for. By 2026 it sits ~7 sections down (\"Decode dialect nuances\"), below products and industries. **The fix: lead with the wedge, expand in the sub-head** — \"The only AI CX platform that understands 30 Arabic dialects, from Khaliji to Maghrebi.\" Confirm with Voice-of-Customer data that buyers aren't choosing you *for* the narrow thing before you hide it.",
      tag: "Positioning",
    },
    {
      title: "Feature → benefit → category is natural maturation — but every rung trades specificity for reach",
      body: "2019 named the **feature** (Arabic listening). 2020 named the **benefit** (Grow Your Brand). 2026 names the **category** (unified CX intelligence platform). Each step widens the audience and weakens the differentiation. That's not wrong — but it's not free. Track conversion at each rung; broader is not automatically better.",
      tag: "Messaging",
    },
    {
      title: "The 2026 headline scores 3/5 on Relevance — generic AI copy hides the answer buyers need in 5 seconds",
      body: "\"Turn complex data into clear actions with real-time AI insights\" is a claim **any** analytics tool makes. Run through CXL's 7 Levels of Conversion, the live page's lowest scores are **Relevance (3/5)** and **Orientation (2/5)** — 12 H2s with no narrative spine. A Saudi bank can't tell in five seconds why Lucidya beats Qualtrics or Medallia. The defensible answer is on the page — just near the bottom.",
      tag: "Trust",
    },
    {
      title: "Two CTAs with no primary split enterprise intent",
      body: "\"Request a demo\" (sales-led) sits beside \"Explore plans\" (self-serve) with no visual hierarchy — breaking the one-primary-action rule (Apple HIG, CXL). For an enterprise ICP in Banking, Insurance, and Government, the demo path should visually dominate; self-serve is the secondary option, not an equal.",
      tag: "Funnel",
    },
  ],
  toc: [
    { label: "Quick summary", id: "summary" },
    { label: "Visual timeline", id: "timeline" },
    { label: "Screenshot analysis", id: "analysis" },
    { label: "Messaging evolution", id: "messaging" },
    { label: "Section heading changes", id: "headings" },
    { label: "CTA evolution", id: "cta-evolution" },
    { label: "Why it changed", id: "business-context" },
    { label: "What SaaS teams can study", id: "lessons" },
  ],
  cta: {
    title: "Want your homepage scored like this?",
    body: "I run your page through the CXL 7 Levels of Conversion and the awareness ladder, then give you a scored, prioritized list of what to change and why.",
    button: "Book a page audit",
  },
  relatedPosts: [
    { label: "SaaS CRO", title: "SaaS traffic but no signups? Here's why", description: "If your page is getting visits but not converting, the issue is usually message match — not traffic volume.", href: "/blog/saas-traffic-but-no-signups" },
    { label: "Landing pages", title: "Landing page optimization best practices 2026", description: "The patterns that separate high-converting SaaS pages from the ones that bleed spend.", href: "/blog/landing-page-optimization-best-practices-2026" },
  ],
  businessContext: "## Why Lucidya climbed from a niche tool to a platform — and what it cost\n\n### The moat that built the company\n\nLucidya's defensible edge was always Arabic. In 2019 the entire homepage — H1, title tag, feature list — was built around understanding Arabic dialects, something global tools like Brandwatch and Sprinklr did poorly. That specificity is why a Solution-Aware MENA buyer chose them.\n\n### The pull toward a bigger category\n\nEnterprise CX (Customer Experience Management) is a far larger market than Arabic social listening, and it carries enterprise buyers — banks, insurers, governments — with bigger budgets. Repositioning as a \"unified, AI-native CX intelligence platform\" is a rational category-design move to reach them. The proof points added (238% sentiment, 207% reach, 900% response) and the \"Fastest growing AI Agent provider MENA 2026\" award are aimed squarely at that buyer.\n\n### The conversion cost\n\nThe trade-off is visible on the page. The wedge that makes the 5-second case — 30 Arabic dialects at 90% sentiment accuracy — now sits about seven sections down, below products, industries, and the award. The headline competes on a claim (\"real-time AI insights\") that every competitor also makes. The fix isn't to retreat to the niche; it's to lead the headline with the wedge and let the category breadth follow in the sub-head and body.",
  quickAnswer: "Between 2019 and 2026 Lucidya climbed the category ladder — from a feature-named \"Arabic social listening tool\" to a \"unified, AI-native CX intelligence platform.\" The repositioning reaches a bigger enterprise buyer, but it buried the one differentiator competitors can't copy: understanding 30 Arabic dialects at 90% sentiment accuracy, now near the bottom of the page instead of in the headline. Lead with the wedge, expand in the sub-head.",
  marketingSummaryCards: [
    { label: "Positioning shift", value: "Arabic listening tool → AI CX platform", note: "H1 moved from naming the product to claiming a category; the title tag dropped 'arabic focused social media' entirely" },
    { label: "Target buyer", value: "Social media managers → Enterprise CX (Banking, Insurance, Gov)", note: "'Engineered for your industry' now lists Travel & Tourism, Insurance, Banking & Finance, Hospitality & F&B, Logistics — a budget-holding committee, not a single user" },
    { label: "Moat visibility", value: "Headline → ~7th section", note: "30-dialect Arabic accuracy — the defensible wedge — fell from the entire 2019 H1 to 'Decode dialect nuances' near the page bottom" },
    { label: "Category play", value: "Niche owner → category challenger", note: "Traded a category it owned (Arabic listening) for one it must now compete in against Qualtrics and Medallia" },
  ],
  publishedAt: "2026-06-26T00:00:00.000Z",
};
