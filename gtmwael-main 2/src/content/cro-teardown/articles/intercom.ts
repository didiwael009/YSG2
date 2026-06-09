/**
 * intercom.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-08T23:00:31.559Z
 * Final judge  : 82/100 ✓
 * SEO score    : 83/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/intercom/writing/generated-article-data.json
 *   data/cro-teardowns/intercom/writing/article-final.md
 *   data/cro-teardowns/intercom/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug intercom --mode standard --force
 *   npm run cro-teardown:publish -- --slug intercom
 */

import type { CroTeardownPost } from "../types";

export const intercom: CroTeardownPost = {
  slug: "intercom",
  companyName: "Intercom",
  companyUrl: "https://www.intercom.com",
  category: "CRO Teardown",
  title: "Intercom Homepage & Landing Page Teardown: 2023–2026",
  h1: "How Intercom's homepage changed: a landing page teardown",
  metaTitle: "Intercom Homepage Teardown (2023–2026)",
  description: "A CRO teardown of Intercom's landing page and homepage from Jan 2023 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Intercom's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jan 2023 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-08",
  readTime: "9 min read",
  featuredImage: "/cro-teardowns/intercom/selected/2023-01.webp",
  featuredImageAlt: "Intercom homepage — Jan 2023",
  fromLabel: "Jan 2023",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2023-01",
      label: "Jan 2023",
      screenshotPath: "/cro-teardowns/intercom/selected/2023-01.webp",
    },
    {
      month: "2025-10",
      label: "Oct 2025",
      screenshotPath: "/cro-teardowns/intercom/selected/2025-10.webp",
    },
    {
      month: "2026-01",
      label: "Jan 2026",
      screenshotPath: "/cro-teardowns/intercom/selected/2026-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/intercom/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2023 → Jun 2026",
      note: "4 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "5 added · 1 removed",
      note: "Significant structure changes",
    },
    {
      label: "Navigation",
      value: "5 added · 8 removed",
      note: "Navigation overhauled",
    },
  ],
  messagingChanges: [
    {
      element: "Primary headline (H1)",
      before: "Support customers at exactly the right moment",
      after: "The only helpdesk designed for the AI Agent era",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Intercom helps over 25,000 global organizations deliver better customer support via personalized conversations and automated support.",
      after: "The only helpdesk with a natively integrated AI Agent. Deliver perfect customer experiences with the highest-performing platform. Start your free trial today.",
      note: "Meta description updated. The change in framing may reflect a positioning adjustment or an SEO update.",
    },
    {
      element: "Page title",
      before: "Making Internet Business Personal | Intercom",
      after: "Intercom | The only helpdesk designed for the AI Agent era",
    },
  ],
  h2Added: [
    "A complete solution for AI and human agents",
    "A fully-featured AI-powered helpdesk",
    "A true partner with deep domain expertise",
    "Perfect customer experiences, powered by Intercom",
  ],
  h2Removed: [
    "A better customer experience across support, marketing, and sales",
  ],
  ctaAdded: [
    "Contact sales",
    "Start free trial",
    "Learn more",
    "Contact Press",
    "Log in",
    "Fin AI Agent",
    "Fully-featured helpdesk",
    "Natively integrated AI Agent",
    "AI-powered Insights",
    "Self-improving system",
  ],
  ctaRemoved: [
    "Download the report",
    "Contact Sales",
    "Watch now",
    "Get started",
    "Start growing business non-stop",
    "Start using next-generation support today",
    "Start converting customers faster",
    "Read story",
    "See all stories",
    "Watch a Demo",
  ],
  analysisBlocks: [
    {
      id: "analysis-2023-01",
      label: "Jan 2023 — original state",
      period: "Jan 2023",
      screenshotPath: "/cro-teardowns/intercom/selected/2023-01.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Support customers at exactly the right moment\" — direct product statement.",
        "Visible section headings include: \"A better customer experience across support, marketing, and sales\".",
        "Navigation includes: \"Contact Sales\", \"Sign in\", \"Custom Bots\" — product category framing.",
        "Section headings later removed include: \"A better customer experience across support, marketing, and sales\".",
      ],
    },
    {
      id: "analysis-2025-10",
      label: "Oct 2025 — mid-transition",
      period: "Oct 2025",
      screenshotPath: "/cro-teardowns/intercom/selected/2025-10.webp",
      heading: "Mid-period: signs of a structural shift",
      annotations: [
        "Visual similarity to the previous snapshot: 71.0% — one of the larger layout changes in the dataset.",
        "H1 in this snapshot: \"Intercom is the AI customer service company\".",
        "New section headings appearing: \"Fin\", \"Intercom Suite\".",
        "Changes across this period appear incremental rather than a single redesign event.",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/intercom/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"The only helpdesk designed for the AI Agent era\" — updated value proposition.",
        "New section headings include: \"A complete solution for AI and human agents\", \"A fully-featured AI-powered helpdesk\", \"A true partner with deep domain expertise\".",
        "CTAs no longer present include: \"Download the report\", \"Contact Sales\", \"Watch now\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "\"Support customers\" speaks to a practitioner; \"the only helpdesk\" speaks to a buyer",
      body: "\"Support customers at exactly the right moment\" addressed the person running support conversations. \"The only helpdesk designed for the AI Agent era\" addresses the person choosing which vendor to buy. The language shift from outcome to category ownership targets a different decision-maker — and a different point in the buying process.",
      tag: "Messaging",
    },
    {
      title: "\"The only\" is procurement language — it answers a shortlist question, not a capability question",
      body: "Claiming to be \"the only\" helpdesk for the AI Agent era works when a buyer is already comparing vendors and needs a differentiator. It doesn't work as discovery language — a visitor who hasn't decided they need an AI helpdesk won't find the claim meaningful. Check whether your homepage is written for comparison-stage buyers or still needs to convert visitors who haven't yet decided to buy.",
      tag: "CRO",
    },
    {
      title: "Removing download and demo CTAs assumes buyers arrive decision-ready",
      body: "\"Download the report\", \"Watch a Demo\", and \"Watch now\" were removed. What replaced them: \"Start free trial\" and \"Contact sales\" — two paths that assume the visitor is already in evaluation mode. Cutting mid-funnel nurture CTAs reduces drop-off from choice paralysis, but only works if your traffic arrives pre-qualified. If it doesn't, you've removed the on-ramp.",
      tag: "CRO",
    },
    {
      title: "Page title went from brand philosophy to category ownership — a 3-year ICP shift",
      body: "\"Making Internet Business Personal\" was an identity statement about Intercom's mission. \"The only helpdesk designed for the AI Agent era\" is a vendor differentiation claim. The three-year trajectory from practitioner outcome → AI company → category owner maps a deliberate move upmarket. Each step narrowed the buyer the page was optimized to convert.",
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
  articleBody: "---\ntitle: \"Intercom Homepage & Landing Page Teardown: 2023–2026\"\nslug: intercom\ngeneratedAt: 2026-06-08T22:56:56.760Z\nsectionsIncluded: [\"01-intro\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Intercom's homepage changed: a landing page teardown\n\n*Jan 2023 → Jun 2026 · 4 snapshots · 9 min read*\n\n---\n\nBetween January 2023 and June 2026, Intercom moved from selling support software to claiming a category of one. The homepage headline shifted from **\"Support customers at exactly the right moment\"** to **\"The only helpdesk designed for the AI Agent era\"** — a repositioning that trades buyer breadth for category ownership. This teardown unpacks four snapshots across three years to show what changed in messaging, buyer framing, navigation architecture, and funnel design — and what each shift may signal for founders building in competitive markets.\n\n## From \"support customers\" to \"the only helpdesk for AI\" — a category ownership bet\n\nIntercom's homepage now asks you to believe a new era has arrived, and they own it.\n\nIn January 2023, the H1 read **\"Support customers at exactly the right moment\"** — a product benefit anyone could claim. By October 2025, it shifted to **\"Intercom is the AI customer service company\"** — identity-first positioning. The current H1 goes further: **\"The only helpdesk designed for the AI Agent era.\"** That's not a feature. It's a market definition with Intercom at the center.\n\nThis framing embeds a bold assumption: that \"the AI Agent era\" is real, recognized, and imminent enough that buyers are already shopping for it. If true, Intercom owns the search. If premature, the claim lands as noise. The supporting sections reinforce the bet — **\"A complete solution for AI and human agents\"** and **\"A fully-featured AI-powered helpdesk\"** build a coherent category story rather than listing capabilities.\n\nThe tradeoff: outcome promise vs category claim. The old headline promised a result. The new one demands belief in a paradigm.\n\n**So what?** Before claiming a category, ask: is your buyer already searching for this frame, or are you teaching them a vocabulary they didn't ask for?\n\n## The page stopped talking to support teams and started addressing platform buyers\n\nThat category claim reshaped who the page speaks to. The old page spoke to the person managing customer conversations. The new one speaks to the person evaluating helpdesk infrastructure.\n\nThe meta description shift makes this visible. **\"Intercom helps over 25,000 global organizations deliver better customer support via personalized conversations\"** addressed practitioners who cared about relationship quality. **\"The only helpdesk with a natively integrated AI Agent. Deliver perfect customer experiences with the highest-performing platform\"** addresses buyers comparing vendor capabilities. The vocabulary moved from outcomes (better support, right moment) to architecture (natively integrated, highest-performing platform).\n\nThe headline change reinforces this. **\"Support customers at exactly the right moment\"** described daily work. **\"The only helpdesk designed for the AI Agent era\"** positions against a competitive set. \"Only\" is procurement language—it answers the question \"why this vendor over alternatives?\" rather than \"how will this help my team today?\" This appears to target buyers conducting platform evaluations, not individual contributors trialing a tool.\n\nThe tradeoff: self-serve vs sales-led. Speaking to platform buyers may filter out the support rep who would have signed up solo. If your homepage still addresses the practitioner when your best customers are now buying through procurement, the page may be converting the wrong people.\n\n## Ten CTAs swapped, two decision doors remain\n\nTen CTAs removed. Ten added. But the primary conversion paths collapsed from many to two. The earlier Intercom homepage scattered intent across **\"Get started,\"** **\"Watch a Demo,\"** **\"Download the report,\"** and outcome-specific hooks like **\"Start converting customers faster\"**; the current version consolidates to **\"Start free trial\"** and **\"Contact sales.\"** Supporting links now route to feature pages—**\"Fin AI Agent,\"** **\"AI-powered Insights\"**—rather than offering mid-funnel content. This reduces drop-off from choice paralysis but filters out visitors who needed nurture before committing.\n\nThe homepage now assumes buyers arrive decision-ready. This can be read as a shift away from SMB self-serve users who needed education toward mid-market or enterprise buyers with shorter evaluation cycles and an expectation of a sales conversation. The tradeoff: two-click conversion paths in exchange for losing visitors who would have downloaded a report or watched a demo before booking a call. Intercom's shift from nurture CTAs to feature CTAs suggests mid-funnel education moved off-page—possibly into product-led onboarding or outbound sequences. Does your homepage consolidate CTAs because your traffic arrives pre-qualified, or because you've relocated education elsewhere in the funnel?\n\n## Why Most Founders Should Not Copy This Homepage Yet\n\nThe repositioning worked for Intercom. That doesn't mean it will work for you—not until your product can survive the proof burden that category-defining claims create.\n\nIntercom's evolution represents a pattern of earned audacity — small, directional changes over three years that compound into a complete repositioning. The shift from **\"Support customers at exactly the right moment\"** to **\"The only helpdesk designed for the AI Agent era\"** was not a single bold stroke. It was the visible endpoint of incremental moves in a consistent direction.\n\nWhat made this viable for Intercom appears to be the depth of their proof stack. A claim like **\"The only helpdesk designed for the AI Agent era\"** demands that every downstream touchpoint — onboarding, product experience, support — reinforces category leadership. If the homepage signals AI-native architecture and the trial signals a traditional ticketing tool, the mismatch creates friction precisely where conversion matters most. Intercom can make this bet because they have the product evidence to back it.\n\nThe tradeoff: a category claim in exchange for a higher proof burden and narrower buyer tolerance for inconsistency.\n\n**So what?** Before adopting superlative positioning, audit your funnel for coherence. The test: can your trial experience survive the expectations your headline creates? If not, the ambitious homepage becomes a conversion liability.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-08T23:00:31.559Z",
};
