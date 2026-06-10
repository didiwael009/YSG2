/**
 * crisp.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-10T19:31:34.211Z
 * Final judge  : 92/100 ✓
 * SEO score    : 82/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/crisp/writing/generated-article-data.json
 *   data/cro-teardowns/crisp/writing/article-final.md
 *   data/cro-teardowns/crisp/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug crisp --mode standard --force
 *   npm run cro-teardown:publish -- --slug crisp
 */

import type { CroTeardownPost } from "../types";

export const crisp: CroTeardownPost = {
  slug: "crisp",
  companyName: "Crisp",
  companyUrl: "https://crisp.chat/en/",
  category: "CRO Teardown",
  title: "Crisp Homepage Teardown: Jul 2022 to Jun 2026",
  h1: "How Crisp rewrote its homepage over 4 years",
  metaTitle: "Crisp Homepage Teardown: Jul 2022 to Jun 2026",
  description: "A CRO teardown of Crisp's homepage from Jul 2022 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Crisp's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jul 2022 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-09",
  readTime: "7 min read",
  featuredImage: "/cro-teardowns/crisp/selected/2022-07.webp",
  featuredImageAlt: "Crisp homepage — Jul 2022",
  fromLabel: "Jul 2022",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2022-07",
      label: "Jul 2022",
      screenshotPath: "/cro-teardowns/crisp/selected/2022-07.webp",
    },
    {
      month: "2023-07",
      label: "Jul 2023",
      screenshotPath: "/cro-teardowns/crisp/selected/2023-07.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/crisp/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jul 2022 → Jun 2026",
      note: "3 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "6 added · 3 removed",
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
      before: "Give your customer experience a human touch",
      after: "Augment your customer experience. AI made to support your team & customers.",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Discover our Business Messaging Platform for Startups & SMB's. The one stop for sales, marketing & support in one platform : Crisp. 14 Days free trial. No credit-card required. Try now ! We provide Knowledge base, Team Inbox, Chatbot, CRM and multiple other features to let you build your own way to customer success.",
      after: "Crisp is the ultimate all-in-one AI-powered multichannel messaging platform that helps businesses connect instantly with their customers or leads who are waiting for support. With its quickly evolving set of tools, Crisp is leading businesses through the AI-driven revolution by using conversations to unlock hypergrowth.",
      note: "Free-trial urgency and exclamatory language removed. The new description reads as a neutral product category statement — more consistent with a platform positioning than a trial-conversion tool.",
    },
    {
      element: "Page title",
      before: "#1 Business Messaging Platform For Startups & SMB's - Crisp",
      after: "The AI Customer Support Platform for Every Business - Crisp",
    },
  ],
  h2Added: [
    "Build your perfect AI Agent in 4 steps",
    "Centralize all your inbound messages",
    "Let your users search for answers themselves",
    "Craft tailor-made automated internal workflows",
    "Built for customer support, marketing, and sales teams. All together.",
    "10,000 companies have already made the move",
  ],
  h2Removed: [
    "Meet the business messaging platform that gathers customer support, sales, and marketing",
    "Built for customer support, marketing, and sales. All together.",
    "Ready to improve your customer engagement?",
  ],
  ctaAdded: [
    "Start Free Trial",
    "Get your AI Agent",
    "See all messaging channels",
    "Learn more on Crisp Knowledge Base",
    "Learn more on the Crisp AI Chatbot",
    "Learn more",
    "Book a demo",
    "Download Crisp for macOS",
    "Get started for free",
    "Hugo Your best AI support agent teammate.",
  ],
  ctaRemoved: [
    "Get Started",
    "Learn More",
    "Try Crisp for free",
    "Request a demo",
    "Shared Inbox Get more work done, together",
    "New Connect Stripe and Crisp in a breeze",
    "Use Crisp for free",
    "See their testimonials",
    "Français (France)",
    "Deutsch (Deutschland)",
  ],
  analysisBlocks: [
    {
      id: "analysis-2022-07",
      label: "Jul 2022 — original state",
      period: "Jul 2022",
      screenshotPath: "/cro-teardowns/crisp/selected/2022-07.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Give your customer experience a human touch\" — direct product statement.",
        "Visible section headings include: \"Meet the business messaging platform that gathers customer support, sales, and marketing\", \"Built for customer support, marketing, and sales. All together.\", \"Ready to improve your customer engagement?\".",
        "Section headings later removed include: \"Meet the business messaging platform that gathers customer support, sales, and marketing\" and \"Built for customer support, marketing, and sales. All together.\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/crisp/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Augment your customer experience. AI made to support your team & customers.\" — updated value proposition.",
        "New section headings include: \"Build your perfect AI Agent in 4 steps\", \"Centralize all your inbound messages\", \"Let your users search for answers themselves\".",
        "CTAs no longer present include: \"Get Started\", \"Learn More\", \"Try Crisp for free\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Crisp replaced \"Give your customer experience a human touch\" with an AI positioning statement",
      body: "The original headline **\"Give your customer experience a human touch\"** framed Crisp as a product for personal connection. The new headline **\"Augment your customer experience. AI made to support your team & customers\"** signals a different buyer: teams looking to scale support with automation, not startups prioritising warmth. This shift suggests the company is targeting a higher-volume, efficiency-focused segment — likely buyers who already expect AI in their stack.",
      tag: "Positioning",
    },
    {
      title: "The meta description dropped \"14 Days free trial. No credit-card required. Try now!\" — that is a sales-motion change",
      body: "The original meta description used urgency tactics (**\"14 Days free trial. No credit-card required. Try now!\"**) and exclamatory language. The new version removes all trial urgency and reads as a neutral category definition. This points to a shift away from instant trial sign-ups toward longer evaluation cycles — buyers who need to understand the platform before committing, not self-serve experimenters clicking through from search.",
      tag: "Funnel",
    },
    {
      title: "6 new section headings focus on AI workflow steps, not the all-in-one pitch",
      body: "The original page used headings like **\"Meet the business messaging platform that gathers customer support, sales, and marketing\"** — broad, category-defining language. The new structure includes **\"Build your perfect AI Agent in 4 steps\"**, **\"Centralize all your inbound messages\"**, and **\"Craft tailor-made automated internal workflows\"**. This suggests the team now assumes buyers care more about implementation specifics than category education — likely a sign they are competing in a crowded space where the concept no longer needs explaining.",
      tag: "Messaging",
    },
    {
      title: "8 navigation items added and \"Get Started\" removed from CTAs — Crisp is filtering casual visitors",
      body: "The navigation expanded significantly (8 new items) while the primary CTA shifted from **\"Get Started\"** to **\"Start Free Trial\"** and **\"Book a demo\"**. Removing generic CTAs like **\"Get Started\"** and **\"Learn More\"** in favour of explicit next steps suggests Crisp expects visitors to arrive with intent. The expanded navigation likely serves buyers who need to explore specific features before converting — not first-time visitors still deciding if they need a messaging platform.",
      tag: "Navigation",
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
  articleBody: "---\ntitle: \"Crisp Homepage Teardown: Jul 2022 to Jun 2026\"\nslug: crisp\ngeneratedAt: 2026-06-10T19:25:50.217Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Crisp rewrote its homepage over 4 years\n\n*Jul 2022 → Jun 2026 · 3 snapshots · 7 min read*\n\n---\n\n# Crisp Chat Homepage Breakdown: Four Years of Positioning Shifts\n\nBetween July 2022 and June 2026, Crisp chat replaced its headline, rewrote its product description, and reorganized the entire navigation structure. The original homepage spoke to **\"Startups & SMB's\"** and emphasized a **\"14 Days free trial\"** in the meta description. The current version opens with **\"Augment your customer experience. AI made to support your team & customers\"** — a shift from trial urgency to category explanation. This teardown walks through what changed, why it matters, and how to apply the same diagnostic framework to your own landing page.\n\n## Quick answer\n\nCrisp replaced its homepage headline from **\"Give your customer experience a human touch\"** to **\"Augment your customer experience. AI made to support your team & customers.\"** The meta description also dropped free-trial urgency and now positions Crisp as **\"the ultimate all-in-one AI-powered multichannel messaging platform.\"** The page title shifted from **\"#1 Business Messaging Platform For Startups & SMB's\"** to **\"The AI Customer Support Platform for Every Business.\"**\n\n## Crisp homepage positioning: how the headline changed between 2022 and 2026\n\n### What changed\n\nThe 2022 headline read: **\"Give your customer experience a human touch\"**. The 2026 headline reads: **\"Augment your customer experience. AI made to support your team & customers.\"**\n\nThe headline changed from a promise about preserving human connection to a claim about AI capability. The category explanation — that Crisp is a messaging platform — remained in both versions, but the frame inverted.\n\n### Why it matters\n\nThe new headline leads with AI as the benefit. The old headline positioned AI's opposite — the \"human touch\" — as what customers wanted.\n\nThe meta description mirrors this shift. The 2022 version listed features and ended with **\"Try now!\"** The 2026 version opens with **\"Crisp is the ultimate all-in-one AI-powered multichannel messaging platform\"** and closes with **\"leading businesses through the AI-driven revolution.\"** The page now assumes visitors already want AI in their support workflow.\n\n### What it costs\n\nIf your target customers do not yet trust AI support, this headline skips their concern entirely. Test it by asking five customers to read the headline aloud, then finish this sentence: **\"This product will help me…\"** If they cannot finish it accurately, the headline may be asking them to believe something they do not yet. The page no longer reassures skeptics — it speaks to buyers already comparing AI platforms.\n\n## Crisp's messaging shift: from startup trial urgency to AI platform vocabulary\n\n### Who the old page served\n\nThe original page addressed founders choosing their first support tool. The page title called Crisp the **\"#1 Business Messaging Platform For Startups & SMB's\"**, and the meta description ended with **\"14 Days free trial. No credit-card required. Try now !\"** — written for someone comparing options today.\n\n### Who the new page serves\n\nThe current page uses broader category language. The new title positions Crisp as **\"The AI Customer Support Platform for Every Business\"**, and the meta description describes a platform **\"leading businesses through the AI-driven revolution\"** — vocabulary that assumes the visitor already knows what customer support platforms are.\n\n### What this means for the sales process\n\nOpen your homepage in a private tab. Count how many words in the headline assume the visitor already knows your product category. If it's more than half, you may have moved past the buyer who needs the category explained.\n\nThe urgency cues are gone — no trial countdown, no exclamation marks. The page now speaks to visitors who are already familiar with the category and evaluating specific capabilities like AI integration.\n\n## Crisp's CTA shift: from four generic buttons to ten feature-specific CTAs\n\n### What changed\n\nThe homepage went from four CTAs to ten. Crisp removed **\"Get Started\"**, **\"Try Crisp for free\"**, and **\"Request a demo\"** — all category-level labels that worked without product knowledge. The new CTAs name specific layers: **\"Get your AI Agent\"**, **\"See all messaging channels\"**, **\"Download Crisp for macOS\"**.\n\n### Who this filters out\n\nThe new structure assumes familiarity. A visitor comparing messaging platforms — not yet decided on AI agents versus live chat — now encounters **\"Get your AI Agent\"** and **\"Learn more on Crisp Knowledge Base\"** with no orientation layer. If your traffic arrives from generic searches like \"customer support software,\" ten feature-specific CTAs with no hierarchy may force a product-layer choice before the visitor understands the category.\n\n### Audit your own page\n\nOpen Crisp's 2026 homepage. List every CTA above the fold: **\"Get your AI Agent\"**, **\"Start Free Trial\"**, **\"Book a demo\"**. Count how many require prior knowledge of what \"AI Agent\" unlocks versus \"messaging channels.\" Time: 90 seconds.\n\n## Crisp homepage positioning: When narrowing your headline works and when it backfires\n\n### The pattern\n\nThis evolution signals a trade-off: narrower hero, deeper navigation. Crisp narrowed the headline from broad category explanation to identity-focused positioning — while adding **8 navigation items** and **6 new section headings** without removing any nav links. The pattern suggests the company moved educational content out of the hero section and into the structure below, allowing the top of the page to filter instead of explain.\n\n### Who should copy this\n\nIf your domain already signals your category — like crisp.chat suggests messaging software — and most homepage visitors arrive from branded search, this approach may work. The narrower headline assumes the visitor already knows what type of product you sell. That assumption holds only when brand recognition or the URL itself does the category work before the page loads.\n\n### Who should NOT copy this\n\nIf your homepage receives non-branded search traffic, cold paid ads, or referrals from content sites, copying this pattern could reduce visitor clarity. Visitors who land without knowing your product category may leave if the headline does not orient them within three seconds. Crisp added **8 navigation options** to carry the educational load — narrowing the hero without expanding the nav removes context without replacing it.\n\n### The test before you copy\n\nOpen your analytics. Filter homepage visits by traffic source. If more than half come from non-branded channels, your hero likely still needs category language. Then check your navigation count: if you have fewer than five options and most traffic is cold, test category clarity before narrowing the headline.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-10T19:31:34.211Z",
};
