/**
 * expensya.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-11T16:48:09.914Z
 * Final judge  : 52/100 ✓
 * SEO score    : 68/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/expensya/writing/generated-article-data.json
 *   data/cro-teardowns/expensya/writing/article-final.md
 *   data/cro-teardowns/expensya/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug expensya --mode standard --force
 *   npm run cro-teardown:publish -- --slug expensya
 */

import type { CroTeardownPost } from "../types";

export const expensya: CroTeardownPost = {
  slug: "expensya",
  companyName: "Expensya",
  companyUrl: "https://www.expensya.com/",
  category: "CRO Teardown",
  title: "Expensya Homepage Teardown: Oct 2020 to Jun 2026",
  h1: "How Expensya rewrote its homepage over 6 years",
  metaTitle: "Expensya Homepage Teardown: Oct 2020 to Jun 2026",
  description: "A CRO teardown of Expensya's homepage from Oct 2020 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Expensya's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Oct 2020 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-11",
  readTime: "8 min read",
  featuredImage: "/cro-teardowns/expensya/selected/2020-10.webp",
  featuredImageAlt: "Expensya Oct 2020 homepage — 'Automated spend management for all companies'",
  fromLabel: "Oct 2020",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2020-10",
      label: "Oct 2020",
      screenshotPath: "/cro-teardowns/expensya/selected/2020-10.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/expensya/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Oct 2020 → Jun 2026",
      note: "2 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "14 added · 7 removed",
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
      before: "Automated spend management for all companies",
      after: "Voici à quoi devrait ressembler la gestion des dépenses.",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "From paperless invoices to reimbursement, Expensya software and mobile app automate every step of the spend management and expense reporting process.",
      after: "Remplacez le stress et les frictions liés à la gestion des dépenses et des notes de frais des employés par la clarté et la simplicité : voici Expensya, le logiciel intelligent de gestion des dépenses pour les équipes financières modernes.",
      note: "Meta description updated. The change in framing may reflect a positioning adjustment or an SEO update.",
    },
    {
      element: "Page title",
      before: "Automated spend management for all companies",
      after: "Gestion des dépenses des employés et cartes de paiement | Expensya",
    },
  ],
  h2Added: [
    "Améliorez la conformité. Réduisez les risques. Obtenez une visibilité complète sur les dépenses.",
    "Cartes de paiement & budgets",
    "Politiques de dépenses",
    "Multi-devises et multi-pays",
    "Quel est le lien entre technologie, UX et frais professionnels ?",
    "Comment gérez-vous vos notes de frais ?",
    "Fini le casse-tête administratif, place à la conformité.",
    "Découvrez les cartes de paiement d'Expensya.",
    "Détendez-vous, car tout fonctionne.",
    "Découvrez comment l'IA optimise les processus de dépenses et voyages professionnels.",
    "Laissez-nous vous aider.",
    "Découvrez comment ces entreprises s'appuient sur Expensya pour simplifier la gestion de leurs dépenses.",
    "Des ressources sur la gestion des dépenses pour vous aider à vous lancer.",
    "Prêt à découvrir une meilleure façon de gérer les dépenses professionnelles ?",
  ],
  h2Removed: [
    "Equip yourself with the most comprehensive business spend and expense management solution, tailored to your needs and to those of your teams",
    "Expensya fully automates your business expenditure",
    "A solution designed for every company",
    "Features designed to transform your expense management",
    "Integration with your infrastructure and ecosystem",
    "Our customers recommend our solution",
    "Ready to simplify your receipt and expenses management process?",
  ],
  ctaAdded: [
    "Learn more about this provider",
    "Réservez une démo",
    "Show details",
    "Necessary 21",
    "880-tzc-395.mktoweb.com 1",
    "Azure 2",
    "Cloudflare 12",
    "Google 2",
    "www.expensya.com 3",
    "Preferences 2",
  ],
  ctaRemoved: [
    "Free trial",
    "Discover our solutions",
    "Find out more",
    "Discover all integrations",
  ],
  analysisBlocks: [
    {
      id: "analysis-2020-10",
      label: "Oct 2020 — original state",
      period: "Oct 2020",
      screenshotPath: "/cro-teardowns/expensya/selected/2020-10.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"Automated spend management for all companies\" — direct product statement.",
        "Visible section headings include: \"Equip yourself with the most comprehensive business spend and expense management solution, tailored to your needs and to those of your teams\", \"Expensya fully automates your business expenditure\", \"A solution designed for every company\".",
        "Navigation includes: \"Solutions\", \"Small\", \"Mid\", \"Large\" — product category framing.",
        "Section headings later removed include: \"Equip yourself with the most comprehensive business spend and expense management solution, tailored to your needs and to those of your teams\" and \"Expensya fully automates your business expenditure\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/expensya/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Voici à quoi devrait ressembler la gestion des dépenses.\" — updated value proposition.",
        "New section headings include: \"Améliorez la conformité. Réduisez les risques. Obtenez une visibilité complète sur les dépenses.\", \"Cartes de paiement & budgets\", \"Politiques de dépenses\".",
        "CTAs no longer present include: \"Free trial\", \"Discover our solutions\", \"Find out more\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Expensya replaced \"Automated spend management for all companies\" with a French aspirational statement",
      body: "The H1 shifted from **\"Automated spend management for all companies\"** to **\"Voici à quoi devrait ressembler la gestion des dépenses\"** (This is what expense management should look like). This is not a translation — it is a reframe. The original named the product category. The new version positions Expensya as the category ideal. The language switch suggests a market-specific roll-out, likely testing French messaging ahead of broader localisation.",
      tag: "Positioning",
    },
    {
      title: "Expensya removed \"Free trial\" and added \"Réservez une démo\" as the primary CTA",
      body: "The original homepage offered **\"Free trial\"** as a conversion path. The current version replaces it with **\"Réservez une démo\"** (Book a demo). This signals a sales-motion change — from self-serve product-led growth to rep-led qualification. Companies make this shift when average deal size increases or when they need higher-touch onboarding. The CTA now filters for buyers willing to talk before they try.",
      tag: "Funnel",
    },
    {
      title: "New section headings prioritise compliance and risk reduction over automation features",
      body: "Early section headings emphasised product completeness: **\"Equip yourself with the most comprehensive business spend and expense management solution\"** and **\"Expensya fully automates your business expenditure\"**. The current homepage leads with **\"Améliorez la conformité. Réduisez les risques. Obtenez une visibilité complète sur les dépenses.\"** This suggests the team is now targeting finance leaders who care about control and audit trails, not operations teams shopping for automation tools.",
      tag: "Messaging",
    },
    {
      title: "14 new section headings added in 66 months points to a content architecture rebuild, not iteration",
      body: "The diff shows 14 new H2s added and 7 removed. That volume of structural change is not incremental optimisation — it indicates a full homepage redesign. The new headings include feature categories like **\"Cartes de paiement & budgets\"** and outcome promises like **\"Fini le casse-tête administratif, place à la conformité.\"** This likely reflects a product expansion (payment cards launched) combined with a messaging reset to match evolved buyer expectations.",
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
  businessContext: "## Why the homepage changed\n\nThat repositioning didn't happen in a vacuum. Expensya entered a consolidated spend management category where English-language players (Concur, Expensify, Divvy) competed on multi-geography automation. By Oct 2020, the homepage positioned as a universal tool — **\"Automated spend management for all companies\"** — segmented by company size (Small/Mid/Large), targeting any business seeking paperless process efficiency.\n\nBetween 2020 and 2026, the homepage eliminated size-based navigation and replaced **\"Free trial\"** with **\"Réservez une démo\"**. New section headings — **\"Cartes de paiement & budgets\"**, **\"Multi-devises et multi-pays\"**, **\"Fini le casse-tête administratif, place à la conformité\"** — suggest a shift toward finance teams managing international operations. The meta description's **\"équipes financières modernes\"** framing points to upmarket positioning away from self-serve trial buyers.\n\nThis evolution maps to the European fintech localization pattern — SaaS companies moving from English-first, feature-driven messaging to native-language, compliance-anchored positioning as they compete for finance department budget against embedded bank offerings. For SaaS teams building in regulated spend categories, the trade-off is clear: vernacular ownership wins incumbents but filters exploratory traffic, requiring sales infrastructure before conversion math improves.",
  articleBody: "---\ntitle: \"Expensya Homepage Teardown: Oct 2020 to Jun 2026\"\nslug: expensya\ngeneratedAt: 2026-06-11T16:47:12.980Z\nsectionsIncluded: [\"01-intro\", \"07-business-context\"]\n---\n# How Expensya rewrote its homepage over 6 years\n\n*Oct 2020 → Jun 2026 · 2 snapshots · 8 min read*\n\n---\n\n# Expensya Homepage Teardown: How a French SaaS Rewrote Its Positioning Over Six Years\n\nBetween October 2020 and June 2026, Expensya replaced its generic English automation pitch with French-language, UX-centered messaging that assumes market familiarity. The old headline — **\"Automated spend management for all companies\"** — became **\"Voici à quoi devrait ressembler la gestion des dépenses\"** (This is what expense management should look like). That shift signals a move from explaining the category to setting the standard within it. The page also removed company-size navigation and swapped **\"Free trial\"** for **\"Réservez une démo\"** (Book a demo). By the end of this teardown, you will know when narrowing your positioning to a single geography strengthens conversion — and when it costs you pipeline.\n\n## Why the homepage changed\n\nThat repositioning didn't happen in a vacuum. Expensya entered a consolidated spend management category where English-language players (Concur, Expensify, Divvy) competed on multi-geography automation. By Oct 2020, the homepage positioned as a universal tool — **\"Automated spend management for all companies\"** — segmented by company size (Small/Mid/Large), targeting any business seeking paperless process efficiency.\n\nBetween 2020 and 2026, the homepage eliminated size-based navigation and replaced **\"Free trial\"** with **\"Réservez une démo\"**. New section headings — **\"Cartes de paiement & budgets\"**, **\"Multi-devises et multi-pays\"**, **\"Fini le casse-tête administratif, place à la conformité\"** — suggest a shift toward finance teams managing international operations. The meta description's **\"équipes financières modernes\"** framing points to upmarket positioning away from self-serve trial buyers.\n\nThis evolution maps to the European fintech localization pattern — SaaS companies moving from English-first, feature-driven messaging to native-language, compliance-anchored positioning as they compete for finance department budget against embedded bank offerings. For SaaS teams building in regulated spend categories, the trade-off is clear: vernacular ownership wins incumbents but filters exploratory traffic, requiring sales infrastructure before conversion math improves.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-11T16:48:09.914Z",
};
