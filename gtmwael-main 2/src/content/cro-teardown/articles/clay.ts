/**
 * clay.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-09T22:47:03.024Z
 * Final judge  : 82/100 ✓
 * SEO score    : 87/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/clay/writing/generated-article-data.json
 *   data/cro-teardowns/clay/writing/article-final.md
 *   data/cro-teardowns/clay/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug clay --mode standard --force
 *   npm run cro-teardown:publish -- --slug clay
 */

import type { CroTeardownPost } from "../types";

export const clay: CroTeardownPost = {
  slug: "clay",
  companyName: "Clay",
  companyUrl: "https://www.clay.com",
  category: "CRO Teardown",
  title: "Clay Homepage Teardown: Jul 2021 to Jun 2026",
  h1: "How Clay rewrote its homepage over 5 years",
  metaTitle: "Clay Homepage Teardown: Jul 2021 to Jun 2026",
  description: "A CRO teardown of Clay's homepage from Jul 2021 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Clay's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jul 2021 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-09",
  readTime: "9 min read",
  featuredImage: "/cro-teardowns/clay/selected/2021-07.webp",
  featuredImageAlt: "Clay homepage — Jul 2021",
  fromLabel: "Jul 2021",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2021-07",
      label: "Jul 2021",
      screenshotPath: "/cro-teardowns/clay/selected/2021-07.webp",
    },
    {
      month: "2024-07",
      label: "Jul 2024",
      screenshotPath: "/cro-teardowns/clay/selected/2024-07.webp",
    },
    {
      month: "2025-01",
      label: "Jan 2025",
      screenshotPath: "/cro-teardowns/clay/selected/2025-01.webp",
    },
    {
      month: "2026-01",
      label: "Jan 2026",
      screenshotPath: "/cro-teardowns/clay/selected/2026-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/clay/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jul 2021 → Jun 2026",
      note: "5 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "8 added · 6 removed",
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
      before: "Clay",
      after: "Go to market with unique data — and the ability to act on it",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "No more million tab opening and manual copy pasting. Automate your prospecting, enrich your customers, and unify your customer data. Fast.",
      after: "Access 150+ premium data sources and AI research agents in one platform, then automate growth workflows to turn insights into revenue.",
      note: "The new description is shorter and more neutral in tone. Whether this is intentional de-emphasis or a simplification pass is not determinable from text alone.",
    },
    {
      element: "Page title",
      before: "Clay | This spreadsheet fills itself",
      after: "Clay | Go to market with unique data—and the ability to act on it",
    },
  ],
  h2Added: [
    "Every GTM data point imaginable, in one place",
    "AI that’s contextual, consistent, and scalable",
    "Orchestrate and act on your data, at scale",
    "Turn data into action with flexible, iterable workflows",
    "Backed by enterprise-grade security and scale",
    "What our customers say about us...",
    "Turn your growth ideas into reality today",
    "Go to market with unique data—and the ability to act on it",
  ],
  h2Removed: [
    "This spreadsheet fills itself.",
    "Hear from our users — Finding customers",
    "Pulling structured data from any website as easily as copy paste.",
    "Flexible beyond your wildest dreams.",
    "Some things we're thinking about",
    "Get started today",
  ],
  ctaAdded: [
    "Get a demo",
    "Start free trial",
    "Sign up",
    "Start building for free",
    "Read case study",
    "Read more about Clay Enterprise",
    "Contact us",
    "Get started lesson",
    "Product Product",
    "Use Cases Use Cases",
  ],
  ctaRemoved: [
    "Request access",
    "Watch video3 min",
    "Get template->",
    "Explore documentation->",
    "All templates",
    "Find new customers",
    "Prioritize inbound leads",
    "Understand your communities",
    "About the technology ->",
    "Chat with us",
  ],
  analysisBlocks: [
    {
      id: "analysis-2021-07",
      label: "Jul 2021 — original state",
      period: "Jul 2021",
      screenshotPath: "/cro-teardowns/clay/selected/2021-07.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Clay\" — direct product statement.",
        "Visible section headings include: \"This spreadsheet fills itself.\", \"Why Clay?\", \"Hear from our users — Finding customers\".",
        "Navigation includes: \"All templates\", \"Find new customers\", \"Prioritize inbound leads\", \"Understand your communities\" — product category framing.",
        "Section headings later removed include: \"This spreadsheet fills itself.\" and \"Hear from our users — Finding customers\".",
      ],
    },
    {
      id: "analysis-2025-01",
      label: "Jan 2025 — mid-transition",
      period: "Jan 2025",
      screenshotPath: "/cro-teardowns/clay/selected/2025-01.webp",
      heading: "Mid-period: signs of a structural shift",
      annotations: [
        "Visual similarity to the previous snapshot: 85.8% — one of the larger layout changes in the dataset.",
        "H1 in this snapshot: \"Go to market with unique data—and the ability to act on it\".",
        "New section headings appearing: \"Boost your enrichment coverage—including unique data your competitors miss\", \"Turn data into action with flexible, iterable workflows\".",
        "Changes across this period appear incremental rather than a single redesign event.",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/clay/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Go to market with unique data — and the ability to act on it\" — updated value proposition.",
        "New section headings include: \"Every GTM data point imaginable, in one place\", \"AI that’s contextual, consistent, and scalable\", \"Orchestrate and act on your data, at scale\".",
        "CTAs no longer present include: \"Request access\", \"Watch video3 min\", \"Get template->\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Clay replaced \"This spreadsheet fills itself\" with a GTM workflow promise",
      body: "The original H1 **\"This spreadsheet fills itself\"** positioned Clay as a productivity tool. The new headline **\"Go to market with unique data — and the ability to act on it\"** shifts the frame to go-to-market strategy execution. This suggests Clay is moving upmarket — targeting teams who buy workflow platforms, not individuals looking for a clever spreadsheet hack.",
      tag: "Positioning",
    },
    {
      title: "Clay removed 8 navigation items including \"Find new customers\" and \"Prioritize inbound leads\"",
      body: "The old navigation included use-case labels like **\"Find new customers\"**, **\"Prioritize inbound leads\"**, and **\"Understand your communities\"**. All eight were removed. The new structure likely consolidates these into product-led sections. This pattern suggests Clay is betting that visitors already understand their problem — the navigation no longer needs to recruit them into a category.",
      tag: "Navigation",
    },
    {
      title: "\"Every GTM data point imaginable\" is a competitive differentiation claim, not a feature list",
      body: "New section headings include **\"Every GTM data point imaginable, in one place\"** and **\"AI that's contextual, consistent, and scalable\"**. These are not capability descriptions — they are positioning statements. The language signals that Clay is no longer competing on \"easier data enrichment\" but on breadth and AI quality. This is a move toward platform-level differentiation.",
      tag: "Messaging",
    },
    {
      title: "Clay's meta description went from 23 words to 20 — and dropped all emotional language",
      body: "The old description opened with **\"No more million tab opening and manual copy pasting\"** — a pain-first hook. The new version is **\"Access 150+ premium data sources and AI research agents in one platform\"** — clinical and feature-forward. This likely indicates a shift in traffic strategy: less SEO chasing \"how do I automate prospecting\" queries, more direct navigation from buyers who already know Clay exists.",
      tag: "Messaging",
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
  articleBody: "---\ntitle: \"Clay Homepage Teardown: Jul 2021 to Jun 2026\"\nslug: clay\ngeneratedAt: 2026-06-09T22:46:04.254Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Clay rewrote its homepage over 5 years\n\n*Jul 2021 → Jun 2026 · 5 snapshots · 9 min read*\n\n---\n\n# Clay Homepage Teardown: How a Viral Spreadsheet Tool Repositioned as an Enterprise GTM Platform\n\nBetween July 2021 and June 2026, Clay replaced its product mechanism headline — **\"This spreadsheet fills itself\"** — with an outcome-focused platform message: **\"Go to market with unique data — and the ability to act on it.\"** The company removed template exploration CTAs and added **\"Get a demo\"** and **\"Clay Enterprise\"** calls-to-action, signaling a shift from viral self-serve distribution to sales-assisted enterprise conversion. This teardown walks through the messaging, navigation, and funnel changes that accompany a move from individual practitioner tool to department-level data infrastructure — and when that shift makes sense for your own product.\n\n## Quick answer: Clay homepage\n\nClay replaced its viral product headline **\"This spreadsheet fills itself\"** with an outcome-focused platform message: **\"Go to market with unique data — and the ability to act on it.\"** The meta description shifted from pain-point language (\"No more million tab opening\") to data infrastructure positioning (\"Access 150+ premium data sources and AI research agents\"). If your homepage still converts practitioners through templates or self-serve exploration, test this shift on a /enterprise subdomain before replacing your main funnel.\n\n## Clay homepage positioning: how the headline changed from 2021 to 2026\n\nThat headline shift didn't happen overnight — it unfolded across five years.\n\n### What changed\n\nClay's 2021 headline was a single word: **\"Clay\"**. A section heading below explained the function: **\"This spreadsheet fills itself.\"**\n\nThe current headline reads: **\"Go to market with unique data — and the ability to act on it\"**. The self-filling spreadsheet line is gone. So are the section headings **\"Why Clay?\"**, **\"Hear from our users — Finding customers\"**, and **\"Finding customers\"**.\n\n### Why it matters\n\nThe new headline assumes the visitor already knows what Clay does. This is category positioning — when a company stops explaining the category and starts staking a claim within it — and it only works when visitors arrive with that knowledge already in place.\n\nThe page now treats \"go to market with unique data\" as a goal the visitor already has. It no longer explains what data enrichment is or why a spreadsheet would fill itself.\n\n### What it costs\n\nClay removed four section headings that explained the category. If visitors arrive without knowing what data enrichment tools do — for example, from a search for \"spreadsheet automation\" or a referral from a productivity blog — this shift trades education for aspiration.\n\nTest: open your homepage in an incognito tab. Count how many section headings explain what your product does, not what outcome it delivers. If you remove three or more of those headings, you are now targeting visitors who already know the category.\n\n## Clay's audience shift: from individual practitioners to GTM leadership\n\n### Who the old page served\n\nThe original homepage spoke to someone doing manual prospecting work themselves. The meta description promised **\"No more million tab opening and manual copy pasting\"** — language for a person who feels the pain directly, not someone evaluating platforms on behalf of a team. The navigation included **\"Find new customers\"** and **\"Get template\"**, suggesting a user ready to start work immediately.\n\n### Who the new page serves\n\nThe current page targets the person responsible for go-to-market infrastructure across a team. The headline now reads **\"Go to market with unique data — and the ability to act on it\"**, and the meta description leads with **\"Access 150+ premium data sources and AI research agents in one platform\"**. This is language for someone comparing data vendors and workflow platforms, not someone looking to speed up their own prospecting.\n\n### What this means for the sales process\n\nThe page now expects a longer evaluation process involving multiple stakeholders. The shift from **\"Request access\"** and templates to **\"Get a demo\"** and **\"Read more about Clay Enterprise\"** signals that Clay is optimizing for deals that require business case validation, not immediate self-serve signups. Does your homepage still speak to the end user when your revenue model now depends on department-level buyers?\n\n## Clay's conversion path: from gated access to dual-track funnel\n\n### What changed\n\nClay went from one CTA — **\"Request access\"** — to multiple paths split by buyer type. The new homepage offers **\"Start free trial\"** and **\"Get a demo\"** side by side. The old friction points (**\"Watch video\"**, **\"Get template\"**, **\"Explore documentation\"**) disappeared. The page now pushes visitors toward two commitments: start using the product immediately, or talk to sales.\n\n### Who this filters out\n\nThis change may lose visitors who want to browse templates or watch an explainer video before deciding anything. The old CTAs let people stay anonymous while learning how Clay works. The new path asks for a decision early: either sign up and build something, or identify yourself to sales. If your visitor is still researching tools in the category, neither option feels safe.\n\n### Audit your own page\n\nCount how many CTAs on your homepage let someone learn *without* starting a trial or booking a call. If that number is zero, you are betting your brand and product demo do all the teaching before the visitor arrives. Clay can make that bet. Most early-stage companies cannot — they still depend on the homepage to explain what the product does and why it matters.\n\n## Should you copy Clay's homepage shift to enterprise positioning?\n\n### The pattern\n\nClay replaced product mechanism messaging with infrastructure positioning. The old headline **\"This spreadsheet fills itself.\"** became **\"Every GTM data point imaginable, in one place\"**. The meta description dropped **\"No more million tab opening and manual copy pasting\"** for **\"Access 150+ premium data sources and AI research agents in one platform.\"** The pattern: stop explaining how the product works, start positioning against the category you want buyers to evaluate you within.\n\n### Who should copy this\n\nCopy this if you already removed your waitlist. Clay moved from **\"Request access\"** to **\"Get a demo\"** — that shift only works when inbound volume can support a sales team. The evidence: if your demo requests already mention competitor names unprompted, buyers are comparing platforms before they arrive. You have the brand recognition this requires when strangers land on your page already knowing what problem you solve.\n\n### Who should NOT copy this\n\nDo not copy this if your navigation still lists use-case templates. Clay removed **\"All templates\"**, **\"Find new customers\"**, and **\"Prioritize inbound leads\"** — the viral distribution paths that built their initial user base. Cutting self-serve exploration before you have enterprise sales infrastructure operational will reduce pipeline from both ends: practitioners stop activating, but enterprise buyers are not yet requesting demos at volume.\n\n### The test before you copy\n\nOpen your last 30 demo requests. If fewer than half mention a competitor, integration requirement, or multi-seat deployment, enterprise positioning is premature. Clay could swap **\"Get template->\"** for **\"Read more about Clay Enterprise\"** because their inbound requests had already shifted to enterprise evaluation language. Check your own CRM before rewriting for buyers you do not yet attract.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-09T22:47:03.024Z",
};
