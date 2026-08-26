/**
 * preply.ts — Phase 4F published content file.
 *
 * Published    : 2026-08-25T01:50:20.383Z
 * Final judge  : 91/100 ✓
 * SEO score    : 87/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/preply/writing/generated-article-data.json
 *   data/cro-teardowns/preply/writing/article-final.md
 *   data/cro-teardowns/preply/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug preply --mode standard --force
 *   npm run cro-teardown:publish -- --slug preply
 */

import type { CroTeardownPost } from "../types";

export const preply: CroTeardownPost = {
  slug: "preply",
  companyName: "Preply",
  companyUrl: "https://preply.com",
  category: "CRO Teardown",
  title: "Preply Homepage Teardown: 2021 to 2026",
  h1: "Preply added 'Book a demo' to a consumer homepage — and kept the student paths too",
  metaTitle: "Preply Homepage Teardown: Jan 2021 to Aug 2026",
  description: "How Preply shifted from 'speak confidently' to 'learn faster' — and added a B2B demo CTA alongside individual learner paths.",
  excerpt: "Between January 2021 and August 2026, Preply replaced aspirational lifestyle messaging with an efficiency promise — and added a B2B signal that suggests the audience expanded. The headline once read \"Prepare to speak confidently with the best online tutors.\" Today it reads \"Learn faster with your best language tutor.\" After this teardown, you will know how to tell whether your own homepage is still speaking to visitors who need convincing, or buyers who are already comparing.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-08-25",
  readTime: "7 min read",
  featuredImage: "/cro-teardowns/preply/selected/2021-01.webp",
  featuredImageAlt: "Preply Jan 2021 homepage — 'Prepare to speak confidently with the best online tutors'",
  fromLabel: "Jan 2021",
  toLabel: "Aug 2026",
  snapshots: [
    {
      month: "2021-01",
      label: "Jan 2021",
      screenshotPath: "/cro-teardowns/preply/selected/2021-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/preply/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2021 → Aug 2026",
      note: "2 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "4 added · 6 removed",
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
      before: "Prepare to speak confidently with the best online tutors",
      after: "Learn faster with your best language tutor.",
      note: "The addition of a superlative claim can be read as a bid for category leadership rather than feature parity. This is interpretation based on observed text changes.",
    },
    {
      element: "Page title",
      before: "Learn languages with expert online tutors. Book your lesson today!",
      after: "Preply: Learn with the best online language tutors on app & web",
    },
  ],
  h2Added: [
    "Progress starts with the right tutor",
    "How Preply works:",
    "Lessons you’ll love. Guaranteed.",
    "Become a tutor",
  ],
  h2Removed: [
    "Make the world your comfort zone",
    "Focus on the skills you need",
    "Request a private tutor",
    "How Preply works",
    "100% Satisfaction Guarantee",
    "Tutor with Preply",
  ],
  ctaAdded: [
    "Book a demo",
    "Learn Japanese online",
    "Join us",
    "Find your tutor",
    "Chinese tutors 5,253 teachers",
    "Arabic tutors 3,651 teachers",
    "Japanese tutors 2,902 teachers",
    "Show less Show more",
    "Polish tutors 362 teachers",
    "Dutch tutors 234 teachers",
  ],
  ctaRemoved: [
    "Start learning",
    "Find a tutor",
    "Russian tutors",
    "Arabic tutors",
    "Japanese tutors",
    "Chinese tutors",
    "Polish tutors",
    "Dutch tutors",
    "Urdu tutors",
    "Greek tutors",
  ],
  analysisBlocks: [
    {
      id: "analysis-2021-01",
      label: "Jan 2021 — original state",
      period: "Jan 2021",
      screenshotPath: "/cro-teardowns/preply/selected/2021-01.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Prepare to speak confidently with the best online tutors\" — a direct product statement.",
        "Visible section headings include: \"Make the world your comfort zone\", \"Focus on the skills you need\", \"Request a private tutor\".",
        "Section headings later removed include: \"Make the world your comfort zone\" and \"Focus on the skills you need\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Aug 2026 — current state",
      period: "Aug 2026",
      screenshotPath: "/cro-teardowns/preply/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Learn faster with your best language tutor.\" — updated value proposition.",
        "New section headings include: \"Progress starts with the right tutor\", \"How Preply works:\", \"Lessons you’ll love. Guaranteed.\".",
        "CTAs no longer present include: \"Start learning\", \"Find a tutor\", \"Russian tutors\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Preply swapped 'speak confidently' for 'learn faster' — the same product, a different buyer assumption",
      body: "Between 2021 and 2026, the H1 changed from **\"Prepare to speak confidently with the best online tutors\"** to **\"Learn faster with your best language tutor.\"** This suggests the page now addresses visitors who have already decided they want a tutor — not someone imagining what language learning could give them. Aspiration and efficiency speak to different stages of the buyer journey.",
      tag: "Messaging",
    },
    {
      title: "Preply added '5,253 teachers' to a link that used to say 'Chinese tutors' — same link, one number added",
      body: "The original language category buttons had no counts: **\"Chinese tutors\"**, **\"Arabic tutors\"**. The updated versions added specific numbers: **\"Chinese tutors 5,253 teachers\"**, **\"Arabic tutors 3,651 teachers\"**. The same links, with proof appended. Adding a real count to an existing feature or category link is one of the lowest-effort trust signals available — it requires no redesign, just a number that is true and specific.",
      tag: "Trust",
    },
    {
      title: "'Book a demo' appears on Preply's consumer homepage — a B2B CTA alongside individual-learner paths",
      body: "Preply added **\"Book a demo\"** — a corporate sales CTA — to a homepage that still serves individual learners. The original consumer CTAs (**\"Start learning\"**, **\"Find a tutor\"**) were removed, but the new set includes both self-serve (**\"Find your tutor\"**) and enterprise (**\"Book a demo\"**). This is consistent with a dual-audience move. What is observable is the decision to address both audiences from one page.",
      tag: "Funnel",
    },
    {
      title: "Preply removed 6 section headings including 'Make the world your comfort zone' and added 4 outcome-focused replacements",
      body: "Headings removed included **\"Make the world your comfort zone\"** and **\"100% Satisfaction Guarantee\"**. Headings added included **\"Progress starts with the right tutor\"** and **\"Lessons you'll love. Guaranteed.\"** The net change is fewer lifestyle frames, more process and outcome signals. This suggests Preply decided its audience no longer needed the homepage to make the emotional case for language learning — only to explain how Preply delivers it.",
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
  businessContext: "## The business context behind Preply's redesign\n\nIn January 2021, Preply's homepage addressed visitors who were still imagining the outcome of language learning. The headline **\"Prepare to speak confidently with the best online tutors\"** and section headings like **\"Make the world your comfort zone\"** are consistent with awareness-stage messaging — speaking to someone who needs to be sold on the category, not just the provider.\n\nBy August 2026, the observed changes suggest the page shifted its assumption about who is arriving. The headline became **\"Learn faster with your best language tutor.\"**\n\nThe addition of tutor counts (**\"Chinese tutors 5,253 teachers\"**) and a **\"Book a demo\"** CTA points to a broader audience: solution-aware individual learners and a corporate buyer segment that likely emerged as remote work normalized team language training.\n\nA pattern common across learning marketplaces as they mature: aspirational messaging gives way to efficiency and proof as buyers arrive more informed. For SaaS teams — when your traffic skews toward visitors already comparing options, a proof-first homepage may serve them better than an aspiration-first one.",
  quickAnswer: "Preply's biggest homepage change between January 2021 and August 2026 was its headline rewrite: from **\"Prepare to speak confidently with the best online tutors\"** to **\"Learn faster with your best language tutor.\"** The new version assumes the visitor already wants a tutor and is choosing between providers, not still deciding whether online learning is for them. If your audience is still learning they have a problem, efficiency messaging will not land.",
  marketingSummaryCards: [
    {
      label: "Positioning shift",
      value: "Aspiration → Efficiency",
      note: "H1 changed from 'speak confidently' to 'learn faster'",
    },
    {
      label: "Audience signal",
      value: "Consumer + B2B demo",
      note: "'Book a demo' CTA added alongside individual learner paths",
    },
    {
      label: "Proof signals added",
      value: "5 tutor count CTAs",
      note: "Category links gained specific teacher counts (5,253; 3,651; 2,902)",
    },
    {
      label: "Structure change",
      value: "6 H2s removed · 4 added",
      note: "Lifestyle headings out; outcome and process headings in",
    },
  ],
  articleBody: "---\ntitle: \"Preply Homepage Teardown: Jan 2021 to Aug 2026\"\nslug: preply\ngeneratedAt: 2026-08-25T01:50:03.235Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"07-business-context\", \"06-lessons-for-saas-teams\"]\n---\n# Preply added 'Book a demo' to a consumer homepage — and kept the student paths too\n\n*Jan 2021 → Aug 2026 · 2 snapshots · 7 min read*\n\n---\n\n# How Preply rewrote its homepage over 6 years\n\nBetween January 2021 and August 2026, Preply replaced aspirational lifestyle messaging with an efficiency promise — and added a B2B signal that suggests the audience expanded. The headline once read **\"Prepare to speak confidently with the best online tutors.\"** Today it reads **\"Learn faster with your best language tutor.\"** After this teardown, you will know how to tell whether your own homepage is still speaking to visitors who need convincing, or buyers who are already comparing.\n\n## Quick answer\n\nPreply's biggest homepage change between January 2021 and August 2026 was its headline rewrite: from **\"Prepare to speak confidently with the best online tutors\"** to **\"Learn faster with your best language tutor.\"** The new version assumes the visitor already wants a tutor and is choosing between providers, not still deciding whether online learning is for them. If your audience is still learning they have a problem, efficiency messaging will not land.\n\n## Preply homepage visual timeline: Jan 2021 to Aug 2026\n\n### The starting point: aspirational lifestyle messaging (Jan 2021)\n\nIn January 2021, Preply's homepage opened with **\"Prepare to speak confidently with the best online tutors\"** — a confidence outcome promise, not a speed or efficiency claim. Section headings reinforced the same frame: **\"Make the world your comfort zone\"** and **\"Focus on the skills you need\"** addressed visitors still imagining what learning could do for their lives.\n\nThe page was written for someone at the beginning of a decision, not the end of one.\n\n### The shift: aspiration out, efficiency and proof in\n\nThe most visible change is the headline. **\"Prepare to speak confidently\"** became **\"Learn faster with your best language tutor.\"** Six section headings were removed — including **\"Make the world your comfort zone\"** and **\"100% Satisfaction Guarantee\"** — while four new ones appeared: **\"Progress starts with the right tutor\"**, **\"How Preply works:\"**, **\"Lessons you'll love. Guaranteed.\"**, and **\"Become a tutor\"**.\n\nThe addition of **\"Book a demo\"** as a visible CTA suggests a second audience emerged: corporate or team buyers alongside individual learners.\n\n### Where it landed: proof-first with a dual audience (Aug 2026)\n\nThe current page is more precise about what it offers and who it serves. **\"Progress starts with the right tutor\"** replaced the lifestyle headlines. Tutor counts became visible: **\"Chinese tutors 5,253 teachers\"**, **\"Arabic tutors 3,651 teachers\"** — scale proof where none existed in 2021. Navigation expanded by 8 items with nothing removed.\n\nVisit your homepage and count how many section headings describe a feeling versus a measurable outcome — that ratio is the same trade-off Preply appears to have resolved.\n\n## How Preply's homepage messaging shifted from confidence to speed\n\n### Headline shift: from aspiration to efficiency\n\nIn January 2021, the headline read **\"Prepare to speak confidently with the best online tutors.\"** By August 2026, it became **\"Learn faster with your best language tutor.\"**\n\nThe swap is directional: \"speak confidently\" names how the visitor will eventually feel. \"Learn faster\" names what happens during the process. This suggests the page now addresses buyers already evaluating tutors — not someone still building the case for learning.\n\n### Page title: from urgency to platform breadth\n\nThe page title changed from **\"Learn languages with expert online tutors. Book your lesson today!\"** to **\"Preply: Learn with the best online language tutors on app & web.\"**\n\nThe original title used urgency (\"Book your lesson today!\"). The new title removes urgency and adds platform scope (\"on app & web\") — consistent with messaging that assumes visitors already know the brand rather than needing to be pushed to act.\n\n### What the messaging shift signals\n\nTogether, the headline and title changes point to a shift in who the page is written for. The 2021 page addressed someone who needed convincing — aspiration (\"make the world your comfort zone\") and urgency (\"book today\"). The 2026 page addresses someone closer to a decision — efficiency (\"learn faster\") and proof (tutor counts, platform reach).\n\nVisit your homepage and read your H1 out loud: does it address someone imagining the outcome, or someone actively shopping? That distinction is the same one Preply appears to have resolved between these two snapshots.\n\n## Preply CTA and navigation changes: from discovery to decision\n\n### CTA changes: two different kinds of buyers on the same page\n\nIn January 2021, the primary action buttons were **\"Start learning\"** and **\"Find a tutor\"** — both addressed someone at the beginning of their journey. By August 2026, both were removed.\n\nIn their place: **\"Book a demo\"**, **\"Find your tutor\"**, and **\"Learn Japanese online\"** — alongside language-specific buttons with tutor counts: **\"Chinese tutors 5,253 teachers\"**, **\"Arabic tutors 3,651 teachers\"**, **\"Japanese tutors 2,902 teachers\"**. The counts add scale proof where generic links existed before — relevant to a visitor comparing providers.\n\n**\"Book a demo\"** is a separate signal. It is a B2B CTA, indicating that corporate buyers or HR teams are now part of the page's intended audience alongside individual students. The evidence does not tell us whether this dual-audience approach works — only that the decision was made.\n\n### Navigation changes: 8 additions, zero removals\n\nNavigation expanded by 8 items with no items removed — the page added paths without closing any old ones. This is consistent with a marketplace broadening its audience rather than narrowing it.\n\nVisit your own homepage navigation and count how many items help a visitor who already knows what they want versus someone still exploring. If the split is roughly even, your navigation may be serving two audience stages without committing clearly to either.\n\n## The business context behind Preply's redesign\n\nIn January 2021, Preply's homepage addressed visitors who were still imagining the outcome of language learning. The headline **\"Prepare to speak confidently with the best online tutors\"** and section headings like **\"Make the world your comfort zone\"** are consistent with awareness-stage messaging — speaking to someone who needs to be sold on the category, not just the provider.\n\nBy August 2026, the observed changes suggest the page shifted its assumption about who is arriving. The headline became **\"Learn faster with your best language tutor.\"**\n\nThe addition of tutor counts (**\"Chinese tutors 5,253 teachers\"**) and a **\"Book a demo\"** CTA points to a broader audience: solution-aware individual learners and a corporate buyer segment that likely emerged as remote work normalized team language training.\n\nA pattern common across learning marketplaces as they mature: aspirational messaging gives way to efficiency and proof as buyers arrive more informed. For SaaS teams — when your traffic skews toward visitors already comparing options, a proof-first homepage may serve them better than an aspiration-first one.\n\n## Lessons from Preply's homepage evolution for SaaS teams\n\n### Headline reframe — Preply replaced \"speak confidently\" with \"Learn faster\" when buyers stopped needing convincing\n\nBetween 2021 and 2026, Preply swapped **\"Prepare to speak confidently with the best online tutors\"** for **\"Learn faster with your best language tutor.\"** The old headline named a feeling. The new one names a pace — relevant to someone already committed to learning, not someone still imagining it.\n\nThis pattern is worth testing when your audience already knows they need your product category. An efficiency headline filters for buyers comparing options. An aspiration headline brings in visitors still building the case for action.\n\nVisit your homepage and ask: is your H1 written for someone who needs convincing, or someone ready to choose? If it is the first, consider testing an efficiency claim in a sub-headline while keeping the aspiration in the H1.\n\n### Tutor counts — Preply added \"5,253 teachers\" to a link that used to say \"Chinese tutors\"\n\nThe original language category buttons showed no numbers: **\"Chinese tutors\"**, **\"Arabic tutors\"**. The updated versions append specific counts: **\"Chinese tutors 5,253 teachers\"**, **\"Arabic tutors 3,651 teachers\"**. Same link, one number added.\n\nAdding a count to an existing category or feature link is one of the lowest-effort proof signals available. It requires no redesign — only a real number that tells the visitor they are not the first buyer.\n\nVisit three feature or category links on your homepage. Could any of them carry a count, rating, or named volume? Adding specifics to existing links is a low-risk test of whether proof moves engagement.\n\n### B2B signal — Preply added \"Book a demo\" to a consumer homepage without removing the consumer CTAs\n\nThe most unexpected addition in this teardown is **\"Book a demo\"** — a corporate sales CTA — appearing on a homepage that still serves individual learners. The original consumer CTAs (**\"Start learning\"**, **\"Find a tutor\"**) were removed, but the arrival of a demo CTA signals a second intended audience.\n\nThis suggests Preply decided corporate buyers — HR teams, language program managers — land on the same page as individual students. Whether this dual-audience page converts either group effectively requires data that is not publicly available.\n\nVisit your homepage and count how many CTAs address only your primary buyer. If a second segment (enterprise, partner, reseller) arrives and finds nothing for them, adding one secondary CTA is a low-cost experiment.",
  publishedAt: "2026-08-25T01:50:20.383Z",
};
