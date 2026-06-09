/**
 * vercel.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-09T12:01:12.150Z
 * Final judge  : 72/100 ✓
 * SEO score    : 0/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/vercel/writing/generated-article-data.json
 *   data/cro-teardowns/vercel/writing/article-final.md
 *   data/cro-teardowns/vercel/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug vercel --mode standard --force
 *   npm run cro-teardown:publish -- --slug vercel
 */

import type { CroTeardownPost } from "../types";

export const vercel: CroTeardownPost = {
  slug: "vercel",
  companyName: "Vercel",
  companyUrl: "https://vercel.com",
  category: "CRO Teardown",
  title: "Vercel Homepage Teardown: Jul 2021 to Jun 2026",
  h1: "How Vercel rewrote its homepage over 5 years",
  metaTitle: "Vercel Homepage Teardown: Jul 2021 to Jun 2026",
  description: "A CRO teardown of Vercel's homepage from Jul 2021 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Vercel's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jul 2021 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-09",
  readTime: "9 min read",
  featuredImage: "/cro-teardowns/vercel/selected/2021-07.webp",
  featuredImageAlt: "Vercel homepage — Jul 2021",
  fromLabel: "Jul 2021",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2021-07",
      label: "Jul 2021",
      screenshotPath: "/cro-teardowns/vercel/selected/2021-07.webp",
    },
    {
      month: "2023-01",
      label: "Jan 2023",
      screenshotPath: "/cro-teardowns/vercel/selected/2023-01.webp",
    },
    {
      month: "2024-01",
      label: "Jan 2024",
      screenshotPath: "/cro-teardowns/vercel/selected/2024-01.webp",
    },
    {
      month: "2025-01",
      label: "Jan 2025",
      screenshotPath: "/cro-teardowns/vercel/selected/2025-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/vercel/selected/current-live.webp",
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
      value: "12 added · 2 removed",
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
      before: "Develop.Preview.Ship.",
      after: "Build and deploy on the AI Cloud.",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Deploy web projects with the best frontend developer experience and highest end-user performance.",
      after: "Vercel gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized web.",
      note: "Meta description updated. The change in framing may reflect a positioning adjustment or an SEO update.",
    },
    {
      element: "Page title",
      before: "Develop. Preview. Ship. For the best frontend teams – Vercel",
      after: "Vercel: Build and deploy the best web experiences with the AI Cloud",
    },
  ],
  h2Added: [
    "Scale your",
    "without compromising",
    "Get Started",
    "Build",
    "Scale",
    "Secure",
    "Resources",
    "Learn",
    "Frameworks",
    "Use Cases",
    "Company",
    "Community",
  ],
  h2Removed: [
    "Vercel combines the best developer experience with an obsessive focus on end-user performance. Our platform enables frontend teams to do their best work.",
    "Clone Template",
  ],
  ctaAdded: [
    "Explore Enterprise",
    "AI Cloud",
    "AI GatewayOne endpoint, all your models",
    "SandboxIsolated, safe code execution",
    "Vercel AgentAn agent that knows your stack",
    "AI SDKThe AI Toolkit for TypeScript",
    "v0Build applications with AI",
    "CI/CDHelping teams ship 6× faster",
    "Content DeliveryFast, scalable, and reliable",
    "Fluid ComputeServers, in serverless form",
  ],
  ctaRemoved: [
    "Contact",
    "Contact Us",
    "Login",
    "global edge network",
    "Scale dynamically",
    "Import your repo",
    "SSL encryption",
    "asset compression",
    "cache invalidation",
    "millions of pages",
  ],
  analysisBlocks: [
    {
      id: "analysis-2021-07",
      label: "Jul 2021 — original state",
      period: "Jul 2021",
      screenshotPath: "/cro-teardowns/vercel/selected/2021-07.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Develop.Preview.Ship.\" — direct product statement.",
        "Visible section headings include: \"Vercel combines the best developer experience with an obsessive focus on end-user performance. Our platform enables frontend teams to do their best work.\", \"Clone Template\".",
        "Navigation includes: \"Templates\", \"Integrations\", \"Analytics\", \"Customers\" — product category framing.",
        "Section headings later removed include: \"Vercel combines the best developer experience with an obsessive focus on end-user performance. Our platform enables frontend teams to do their best work.\" and \"Clone Template\".",
      ],
    },
    {
      id: "analysis-2023-01",
      label: "Jan 2023 — mid-transition",
      period: "Jan 2023",
      screenshotPath: "/cro-teardowns/vercel/selected/2023-01.webp",
      heading: "Mid-period: signs of a structural shift",
      annotations: [
        "Visual similarity to the previous snapshot: unknown — a moderate visual change.",
        "New section headings appearing: \"Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.\", \"Product\".",
        "Changes across this period appear incremental rather than a single redesign event.",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/vercel/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Build and deploy on the AI Cloud.\" — updated value proposition.",
        "New section headings include: \"Scale your\", \"without compromising\", \"Get Started\".",
        "CTAs no longer present include: \"Contact\", \"Contact Us\", \"Login\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Your H1 signals which buyer you are targeting",
      body: "The headline changed from \"Develop.Preview.Ship.\" to \"Build and deploy on the AI Cloud.\". The framing of your H1 is one of the clearest signals of which buyer you are targeting and what you expect them to do next.",
      tag: "Messaging",
    },
    {
      title: "Navigation is a positioning statement",
      body: "Navigation items changed from \"Integrations\", \"Analytics\", \"Contact\" to \"AI Cloud\", \"AI SDKThe AI Toolkit for TypeScript\", \"v0Build applications with AI\". The labels your navigation uses reveal what you think your visitor is trying to decide — and who that visitor is.",
      tag: "Navigation",
    },
    {
      title: "Section headings reveal what the team thinks buyers care about",
      body: "12 section headings were added and 2 removed between Jul 2021 and Jun 2026. New headings include \"Scale your\" and \"without compromising\". Headings that disappeared include \"Vercel combines the best developer experience with an obsessive focus on end-user performance. Our platform enables frontend teams to do their best work.\" and \"Clone Template\". The pattern of what gets added and removed is one of the clearest signals of how a team is re-prioritizing its value proposition.",
      tag: "CRO",
    },
    {
      title: "Incremental changes compound into a brand shift",
      body: "Across 5 snapshots spanning roughly 5 years, no single update here was a dramatic overhaul. The end state looks very different from the start because small, consistent changes in the same direction accumulate. This is worth studying if your own homepage has been drifting without a clear direction.",
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
  articleBody: "---\ntitle: \"Vercel Homepage Teardown: Jul 2021 to Jun 2026\"\nslug: vercel\ngeneratedAt: 2026-06-09T11:58:26.663Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# How Vercel rewrote its homepage over 5 years\n\n*Jul 2021 → Jun 2026 · 5 snapshots · 9 min read*\n\n---\n\nVercel rewrote its homepage between July 2021 and June 2026, moving from **\"Develop. Preview. Ship.\"** to **\"Build and deploy on the AI Cloud.\"** The original headline spoke to a workflow. The new one positions the company around infrastructure and AI. The meta description changed too — from \"best frontend developer experience\" to \"frameworks, workflows, and infrastructure to build a faster, more personalized web.\" After reading this teardown, you will know how to check whether your homepage still matches the way buyers now talk about your category.\n\n## Quick answer: Vercel homepage shift\n\nVercel replaced its developer workflow tagline (**\"Develop. Preview. Ship.\"**) with a cloud infrastructure value proposition (**\"Build and deploy on the AI Cloud.\"**). The new headline names the product category but removes the three-step workflow frame that appeared in the original version. The new headline does not contain a workflow explanation — that framing is gone from the primary headline entirely.\n\n## Vercel homepage positioning: how the headline changed between 2021 and 2026\n\nHere's what moved between the two snapshots.\n\n### What changed\n\nThe original headline named a workflow: **\"Develop.Preview.Ship.\"** The new headline names a category: **\"Build and deploy on the AI Cloud.\"**\n\nThe meta description followed the same pattern. It moved from **\"Deploy web projects with the best frontend developer experience and highest end-user performance\"** to **\"Vercel gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized web.\"** The homepage no longer explains what the product does in the headline. It assumes you already know.\n\n### Why it matters\n\nThe new headline works only if the visitor arrives already familiar with Vercel. It skips the product explanation.\n\nThe product explanation is no longer in the headline — it has moved to section headings, visuals, and body copy. Whether that matches how your visitors arrive is worth checking.\n\n### What it requires\n\nTo check if your homepage uses this same structure: open your homepage in an incognito tab and read only the headline. Can you explain what the product does in one sentence from the headline alone?\n\nIf you cannot, the product statement is not in the headline — it has moved somewhere else on the page. That is not automatically a problem, but it is a deliberate trade worth knowing about.\n\n## Vercel's messaging shift: from developer workflow to AI infrastructure\n\nThe headline isn't the only evidence of repositioning.\n\n### Who the 2021 Vercel homepage served: frontend developers choosing deployment tools\n\nThe 2021 headline read **\"Develop. Preview. Ship.\"** — three steps in a developer's daily workflow. The meta description promised **\"the best frontend developer experience\"** and named **\"end-user performance\"** as the core benefit. The vocabulary named workflow steps and developer experience — categories that appear in deployment tool comparisons rather than infrastructure procurement.\n\n### Who the 2026 Vercel homepage serves: teams evaluating AI cloud infrastructure\n\nThe 2026 headline reads **\"Build and deploy on the AI Cloud.\"** The meta description now lists **\"frameworks, workflows, and infrastructure\"** — three categories of capability, not workflow steps. The page title adds **\"the best web experiences\"** as the outcome. The vocabulary shifted from individual developer tooling to infrastructure and AI — categories that appear in content aimed at teams evaluating platform-level decisions.\n\n### What changed in how Vercel expects visitors to arrive\n\nThe original headline named the product category in three words. The new headline assumes you already know what \"AI Cloud\" means in the context of web deployment. If your traffic comes primarily through brand search or referral, the headline may not need to explain the category. If it comes through non-branded search, that explanation is no longer in the headline. Open your homepage. Does your H1 name what your product does, or does it assume the visitor already knows?\n\n## How Vercel's CTA strategy shifted from feature explanation to product naming\n\nLook at the calls-to-action and the same pattern emerges.\n\n### What changed\n\nVercel replaced 10 older CTAs with 10 new ones. The old labels explained infrastructure features: **\"SSL encryption\"**, **\"asset compression\"**, **\"cache invalidation\"**, **\"global edge network\"**. The new labels are product names: **\"AI Gateway\"**, **\"Sandbox\"**, **\"Vercel Agent\"**, **\"Fluid Compute\"**, **\"CI/CD\"**. Each new CTA includes a tagline — **\"One endpoint, all your models\"** — but the emphasis shifted from explaining infrastructure to listing what Vercel ships.\n\n### Who this filters out\n\nIf a visitor has not heard of Vercel's products, the new CTAs may function as navigation rather than conversion triggers. The old **\"SSL encryption\"** CTA told you what the platform handles. The new **\"Fluid Compute\"** CTA assumes you already know what that means and arrived looking for it. That assumes your brand name already carries the category explanation before the visitor lands.\n\n### Audit your own page\n\nOpen vercel.com. Count how many product-name CTAs appear above the fold: **\"AI Gateway\"**, **\"Sandbox\"**, **\"Fluid Compute\"**. Now open the Jul 2021 snapshot. Count feature-explainer CTAs: **\"SSL encryption\"**, **\"cache invalidation\"**. The ratio flipped. Run the same count on your own homepage. If your traffic comes from non-branded search, every CTA needs to work without prior product knowledge.\n\n## Should SaaS companies copy Vercel's homepage strategy? When incremental repositioning works and when it doesn't\n\nFive snapshots over five years show updates in one direction.\n\n### The pattern\n\nVercel made small, consistent updates in the same direction across 5 snapshots over roughly 5 years. The headline changed, navigation shifted toward AI positioning, and section headings were gradually swapped — 12 added, 2 removed. This is **incremental repositioning: small updates in the same direction that compound into a brand shift**. Each change narrowed who the page speaks to and what it assumes they already know.\n\n### Who should copy this\n\nThis pattern assumes your company name already carries the category explanation before the visitor lands. The test: if a stranger can guess what your product does from your URL alone, you have the brand recognition this requires. Vercel's Jun 2026 headline **\"Build and deploy on the AI Cloud.\"** adds a layer without explaining deployment — that only makes sense if visitors already know \"Vercel deploys things.\"\n\n### Who should NOT copy this\n\nIf your homepage still explains what your product is, you likely depend on visitors who have never heard of you. If your traffic shifts toward cold audiences who do not recognize your brand, a headline that assumes category knowledge may not explain the product to them. When Vercel used **\"Develop. Preview. Ship.\"** in Jul 2021, the three-verb structure gave context. By Jun 2026, **\"Build and deploy on the AI Cloud.\"** assumes visitors already know what Vercel deploys.\n\n### The test before you copy\n\nCount how many words in your H1 assume the visitor already knows your category. Vercel's Jun 2026 headline **\"Build and deploy on the AI Cloud.\"** uses zero category-explaining words. If your H1 needs three or more words to explain what you do, you are not ready for this pattern yet.",
  publishedAt: "2026-06-09T12:01:12.150Z",
};
