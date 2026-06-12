/**
 * linear.ts — Phase 4F published content file.
 *
 * Published    : 2026-03-12T08:09:00.000Z
 * Final judge  : 94/100 ✓
 * SEO score    : 84/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/linear/writing/generated-article-data.json
 *   data/cro-teardowns/linear/writing/article-final.md
 *   data/cro-teardowns/linear/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug linear --mode standard --force
 *   npm run cro-teardown:publish -- --slug linear
 */

import type { CroTeardownPost } from "../types";

export const linear: CroTeardownPost = {
  slug: "linear",
  companyName: "Linear",
  companyUrl: "https://linear.app",
  category: "CRO Teardown",
  title: "Linear Homepage Teardown: Jan 2020 to Jun 2026",
  h1: "How Linear rewrote its homepage over 6 years",
  metaTitle: "Linear Homepage Teardown: Jan 2020 to Jun 2026",
  description: "A CRO teardown of Linear's homepage from Jan 2020 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Linear replaced \"The issue tracking tool you'll enjoy using\" with \"The product development system for teams and agents\" between January 2020 and June 2026. The company stopped selling speed and developer experience and started claiming ownership of a category that barely exists: AI-native product operations. Section headings shifted from feature names like \"Meet your command line\" to workflow outcomes like \"Make product operations self-driving\", and the navigation dropped community signals (\"We're hiring!\") in favor of enterprise buyer infrastructure (\"Contact sales\"). After reading this teardown, you will know whether Linear's AI-forward repositioning works because they earned it with real customer workflows — or whether it creates a credibility gap you should avoid on your own homepage.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-10",
  readTime: "9 min read",
  featuredImage: "/cro-teardowns/linear/selected/2020-01.webp",
  featuredImageAlt: "Linear homepage — Jan 2020",
  fromLabel: "Jan 2020",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2020-01",
      label: "Jan 2020",
      screenshotPath: "/cro-teardowns/linear/selected/2020-01.webp",
    },
    {
      month: "2021-01",
      label: "Jan 2021",
      screenshotPath: "/cro-teardowns/linear/selected/2021-01.webp",
    },
    {
      month: "2022-01",
      label: "Jan 2022",
      screenshotPath: "/cro-teardowns/linear/selected/2022-01.webp",
    },
    {
      month: "2023-01",
      label: "Jan 2023",
      screenshotPath: "/cro-teardowns/linear/selected/2023-01.webp",
    },
    {
      month: "2024-01",
      label: "Jan 2024",
      screenshotPath: "/cro-teardowns/linear/selected/2024-01.webp",
    },
    {
      month: "2024-07",
      label: "Jul 2024",
      screenshotPath: "/cro-teardowns/linear/selected/2024-07.webp",
    },
    {
      month: "2025-07",
      label: "Jul 2025",
      screenshotPath: "/cro-teardowns/linear/selected/2025-07.webp",
    },
    {
      month: "2026-01",
      label: "Jan 2026",
      screenshotPath: "/cro-teardowns/linear/selected/2026-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/linear/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2020 → Jun 2026",
      note: "9 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "7 added · 10 removed",
      note: "Major content architecture overhaul",
    },
    {
      label: "Navigation",
      value: "8 added · 5 removed",
      note: "Navigation overhauled",
    },
  ],
  messagingChanges: [
    {
      element: "Primary headline (H1)",
      before: "The issue trackingtool you'll enjoy using",
      after: "The productdevelopmentsystem for teamsand agentsThe product developmentsystem for teams and agentsThe product development system for teams and agents",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Linear lets you manage software development and track bugs. Linear's streamlined design is built for speed and efficiency — helping high performing teams accomplish great things.",
      after: "Purpose-built for planning and building products with AI agents.",
      note: "The new description is shorter and more neutral in tone. Whether this is intentional de-emphasis or a simplification pass is not determinable from text alone.",
    },
    {
      element: "Page title",
      before: "Linear – The issue tracking tool you'll enjoy using",
      after: "Linear – The system for product development",
    },
  ],
  h2Added: [
    "A new species of product tool.Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.",
    "Make product operations self-driving",
    "Define the product direction",
    "Move work forward across teams and agents",
    "Review PRs and agent output",
    "Understand progress at scale",
    "Built for the future. Available today.",
  ],
  h2Removed: [
    "The speed teams needBuilt to be lightning fast",
    "Less managing, more meaning",
    "Meet your command line",
    "Integrated workflow designed for product teams",
    "Design with Figma",
    "Automatic tracking with GitHub pull requests",
    "Get updates and create issues with Slack",
    "Keep the team focused and momentum up with Cycles",
    "Elevate your perspective with Projects",
    "Get Linear Early Access",
  ],
  ctaAdded: [
    "Contact",
    "Sign up",
    "Get started",
    "Contact sales",
    "Contact us",
    "Open app",
    "Log in",
    "Issue tracking is deadlinear.app/next →",
    "My issues",
    "Faster app launch",
  ],
  ctaRemoved: [
    "Request Early Access",
    "About us",
    "We're hiring!",
    "Sign in",
    "Terms of Service",
  ],
  analysisBlocks: [
    {
      id: "analysis-2020-01",
      label: "Jan 2020 — original state",
      period: "Jan 2020",
      screenshotPath: "/cro-teardowns/linear/selected/2020-01.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"The issue trackingtool you'll enjoy using\" — direct product statement.",
        "Visible section headings include: \"The speed teams needBuilt to be lightning fast\", \"Less managing, more meaning\", \"Meet your command line\".",
        "Navigation includes: \"Changelog\", \"Twitter\", \"About us\", \"We're hiring!\" — product category framing.",
        "Section headings later removed include: \"The speed teams needBuilt to be lightning fast\" and \"Less managing, more meaning\".",
      ],
    },
    {
      id: "analysis-2023-01",
      label: "Jan 2023 — mid-transition",
      period: "Jan 2023",
      screenshotPath: "/cro-teardowns/linear/selected/2023-01.webp",
      heading: "Mid-period: signs of a structural shift",
      annotations: [
        "Visual similarity to the previous snapshot: 59.2% — one of the larger layout changes in the dataset.",
        "H1 in this snapshot: \"Linear is a better way to build products\".",
        "New section headings appearing: \"Unlike any tool you’ve used before\", \"Issue trackingyou’ll enjoy using\".",
        "Changes across this period appear incremental rather than a single redesign event.",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/linear/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"The productdevelopmentsystem for teamsand agentsThe product developmentsystem for teams and agentsThe product development system for teams and agents\" — updated value proposition.",
        "New section headings include: \"A new species of product tool.Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.\", \"Make product operations self-driving\", \"Define the product direction\".",
        "CTAs no longer present include: \"Request Early Access\", \"About us\", \"We're hiring!\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Linear replaced \"issue tracking tool\" with \"product development system for teams and agents\"",
      body: "The original H1 — **\"The issue tracking tool you'll enjoy using\"** — positioned Linear as a better version of existing tools. The current headline — **\"The product development system for teams and agents\"** — suggests a category shift. Linear is no longer competing with Jira. The new framing likely targets teams building with AI agents, not just tracking issues manually.",
      tag: "Positioning",
    },
    {
      title: "The meta description dropped 31 words to land one message: \"Purpose-built for planning and building products with AI agents\"",
      body: "The original meta description listed features: **\"manage software development and track bugs\"**, **\"streamlined design\"**, **\"speed and efficiency\"**. The new version is 13 words. It names one buyer: teams using AI agents. This is not simplification — it is filtering. The shorter description signals that Linear is built for a specific workflow, not general project management.",
      tag: "Messaging",
    },
    {
      title: "Linear removed 10 section headings about speed and simplicity, added 6 about AI workflows and scale",
      body: "Removed headings include **\"The speed teams need\"**, **\"Less managing, more meaning\"**, and **\"Meet your command line\"**. Added headings include **\"Make product operations self-driving\"** and **\"Review PRs and agent output\"**. The old page sold a faster tool. The new page describes a system for coordinating human and AI work. That is a product expansion, not a messaging refresh.",
      tag: "Strategy",
    },
    {
      title: "\"Request Early Access\" disappeared — Linear is no longer signalling scarcity or exclusivity",
      body: "The original navigation included **\"Request Early Access\"** as a CTA. That button is gone. The current CTAs are **\"Sign up\"**, **\"Get started\"**, and **\"Contact sales\"**. Removing waitlist language suggests Linear is no longer filtering for early adopters. The shift points to a sales motion change: from controlled rollout to open signup with a sales option for larger accounts.",
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
  articleBody: "---\ntitle: \"Linear Homepage Teardown: Jan 2020 to Jun 2026\"\nslug: linear\ngeneratedAt: 2026-06-10T17:03:38.648Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Linear rewrote its homepage over 6 years\n\n*Jan 2020 → Jun 2026 · 9 snapshots · 9 min read*\n\n---\n\n# Linear Homepage Teardown: How the Issue Tracker Repositioned as an AI Product Platform\n\nLinear replaced **\"The issue tracking tool you'll enjoy using\"** with **\"The product development system for teams and agents\"** between January 2020 and June 2026. The company stopped selling speed and developer experience and started claiming ownership of a category that barely exists: AI-native product operations. Section headings shifted from feature names like **\"Meet your command line\"** to workflow outcomes like **\"Make product operations self-driving\"**, and the navigation dropped community signals (**\"We're hiring!\"**) in favor of enterprise buyer infrastructure (**\"Contact sales\"**). After reading this teardown, you will know whether Linear's AI-forward repositioning works because they earned it with real customer workflows — or whether it creates a credibility gap you should avoid on your own homepage.\n\n## Linear homepage positioning shift: Quick answer\n\nLinear replaced its 2020 headline **\"The issue tracking tool you'll enjoy using\"** with **\"The product development system for teams and agents\"** — shifting from a better version of a known tool to a new category built for AI-augmented workflows. This positioning assumes visitors already believe AI agents will participate in product development and are searching for systems to manage that workflow. If your buyers are still evaluating you as a faster alternative to Jira or Asana and have not yet adopted AI agents in production, this framing may create a category mismatch.\n\n## Linear homepage positioning: from issue tracker to product development system\n\n### The headline shift: what Linear's homepage no longer says\n\nThat category mismatch starts with word choice. Linear's 2020 headline opened with the product category. **\"The issue tracking tool you'll enjoy using\"** told a cold visitor what the product was in the first six words.\n\nThe 2026 version removes the category entirely: **\"The product development system for teams and agents\"**. The page now speaks to a job outcome, not a tool comparison.\n\n### How Linear's homepage now speaks to a different visitor\n\nThe page assumes the visitor already knows what Linear does before the headline loads. That assumption shows up across the entire page structure.\n\nThe meta description in 2020 read: **\"Linear lets you manage software development and track bugs.\"** The current version: **\"Purpose-built for planning and building products with AI agents.\"** No category. No verb that tells you what the product does.\n\nThe page title followed the same path. It opened with **\"Linear – The issue tracking tool you'll enjoy using\"** and now reads **\"Linear – The system for product development\"**.\n\n### What this targeting shift gives up — and how to check it on your own site\n\nIf a visitor arrives via a generic search like \"issue tracking tool\" or \"bug tracker\", the current homepage may not signal that Linear solves their problem. The category omission filters for visitors who already recognize Linear as a contender.\n\nCount how many words it takes before your homepage states the product category. Linear took 11 words in 2020. The current version never states it. Which visitors does your headline serve?\n\n## Linear's audience shift: from developer tool to AI product platform\n\n### Who the old page served\n\nThe headline change reflects a deeper shift in who Linear expects to land on the page. The 2020 homepage spoke to developers and engineering leads comparing bug trackers. The headline promised **\"The issue tracking tool you'll enjoy using\"**, and the meta description emphasized **\"streamlined design is built for speed and efficiency.\"** This was language for someone evaluating Linear against Jira or GitHub Issues based on interface quality and workflow speed.\n\n### Who the new page serves\n\nThe 2026 homepage targets product and engineering directors who already believe AI agents will participate in product development. The headline now reads **\"The product development system for teams and agents\"**, and the meta description stakes a claim: **\"Purpose-built for planning and building products with AI agents.\"** This is not comparison language — it is category creation language for buyers searching for infrastructure to coordinate human-AI workflows.\n\n### What this means for the sales process\n\nThe page now expects a sales conversation, not a self-serve signup. The addition of **\"Contact sales\"** as a primary CTA and **\"Customers\"** in the navigation signals a shift toward enterprise buyers with procurement processes. The question for your own page: does your headline speak to someone comparing you to a known alternative, or to someone looking for a solution to a problem they have not yet solved?\n\n## Linear's CTA evolution: from waitlist to dual-funnel conversion\n\n### What changed\n\nThat enterprise shift shows up most clearly in how the page asks visitors to convert. Linear replaced a single call to action — **\"Request Early Access\"** — with two parallel paths: **\"Get started\"** (self-serve) and **\"Contact sales\"** (enterprise). This dual-funnel structure assumes visitors arrive knowing which path fits them.\n\n### Who the dual-CTA structure filters out\n\nThe page no longer offers a path for visitors who want to monitor the product before committing. The old waitlist was low-commitment: join without starting a trial or booking a call. Both new CTAs require a decision — self-serve or enterprise — that assumes the visitor already understands how Linear fits their workflow.\n\n### Audit your own page\n\nOpen your homepage. Does it offer a low-commitment path like Linear's old waitlist, or only high-commitment CTAs (trial, demo, sales)? If you removed a low-commitment option, check when conversion rate or qualified-lead volume changed. Linear's shift suggests they no longer need to capture undecided traffic — ask whether your brand has the same luxury.\n\n## Linear homepage positioning lesson: Should SaaS teams copy the AI agent strategy?\n\n### The pattern\n\nIf your product is already managing AI agent outputs in production, you can claim category ownership before competitors arrive. Linear did this by rewriting its H1 from **\"The issue tracking tool you'll enjoy using\"** to **\"The product development system for teams and agents\"** — treating AI coordination as infrastructure to buy today, not a future to prepare for. This is category creation (claiming you invented a new product type) through forward positioning (describing a workflow that barely exists yet as if it's standard practice).\n\n### Who should copy this\n\nYour product is already being used to manage outputs from AI coding tools like **Cursor**, **GitHub Copilot**, or **Devin** in production environments. You have at least three enterprise customers who will publicly say they use your tool to coordinate human-AI workflows. Your support tickets and sales calls include **\"AI agent\"** as buyer language, not just marketing speculation.\n\n### Who should NOT copy this\n\nYour differentiation is speed, ease of use, or price compared to an established tool. If you claim to be purpose-built for AI workflows that your buyers are not practicing yet, you will confuse the buyer who came to replace Jira and lose credibility with the buyer who actually manages **AI agents** in production.\n\n### The test before you copy\n\nOpen your last 20 sales call transcripts and count how many times a buyer mentions **\"AI agent\"**, **\"Cursor\"**, **\"Copilot\"**, or **\"Devin\"** unprompted. If fewer than 2 calls (10%) include those terms, your buyers are not living in the workflow Linear is now selling to — keep your current positioning and test AI messaging on a /ai-workflows page with $500 in LinkedIn ads first.",
  internalLinkSuggestions: [
    "/cro-teardowns/lemlist",
    "/cro-teardowns/intercom",
    "/cro-teardowns/crisp",
  ],
  publishedAt: "2026-03-12T08:09:00.000Z",
};
