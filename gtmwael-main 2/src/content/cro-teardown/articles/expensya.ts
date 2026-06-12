/**
 * expensya.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-12T08:29:39.651Z
 * Final judge  : 42/100 ✓
 * SEO score    : 75/100 ✓
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
      title: "Expensya replaced \"Automated spend management for all companies\" with French-language messaging",
      body: "The original headline **\"Automated spend management for all companies\"** positioned the product as a universal automation tool. The new French headline **\"Voici à quoi devrait ressembler la gestion des dépenses\"** (This is what expense management should look like) signals a geographic repositioning. This suggests Expensya may be prioritising French-speaking markets or filtering for buyers who prefer localised solutions over English-first SaaS competitors.",
      tag: "Positioning",
    },
    {
      title: "Removing \"Free trial\" from the CTA set is a sales-motion change, not simplification",
      body: "The primary CTA changed from **\"Free trial\"** to **\"Réservez une démo\"** (Book a demo). This shift moves the conversion path from self-serve trial to assisted sales. It likely indicates Expensya is targeting larger accounts or longer deal cycles where a demo qualifies intent better than a trial signup. The change filters out casual visitors and signals that buyers already know what category they need.",
      tag: "Funnel",
    },
    {
      title: "\"Cartes de paiement & budgets\" and \"Politiques de dépenses\" are new H2s — the product expanded",
      body: "The new section headings **\"Cartes de paiement & budgets\"** (Payment cards & budgets) and **\"Politiques de dépenses\"** (Expense policies) did not appear in the 2020 version. These headings suggest Expensya added product capabilities beyond basic expense reporting. The prominence of these sections on the homepage indicates the team now views compliance and card issuance as core selling points, not secondary features.",
      tag: "Messaging",
    },
    {
      title: "14 new section headings and a full language shift point to a market-focus tightening",
      body: "Expensya added 14 new section headings and removed 7 generic ones like **\"Equip yourself with the most comprehensive business spend and expense management solution\"**. The new headings are shorter, more specific, and entirely in French. This comprehensive content overhaul—paired with the CTA and headline changes—suggests the company decided to own a narrower market segment rather than pitch universal automation to all company sizes.",
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
  businessContext: "## Why Expensya abandoned English and narrowed to France after the Medius acquisition\n\nThe homepage shift wasn't gradual drift — it followed a specific acquisition and regulatory timeline.\n\n### Market entry timing: French e-invoicing mandate\n\nExpensya's homepage switched to French-only in 2023, the same year Medius acquired it for over $100M. Medius publicly cited France's July 2024 e-invoicing mandate as strategic rationale. The timing suggests Expensya was repositioned to serve a regulatory moment rather than continue competing as an international SaaS product.\n\n### Product evolution: from software to embedded cards\n\nThe March 2023 Swan partnership added embedded corporate cards before the acquisition closed. The homepage shifted from **\"Automated spend management for all companies\"** to **\"Cartes de paiement & budgets\"** as the lead section heading, pointing to product evolution from expense tracking software to integrated financial platform.\n\n### Industry consolidation: expense tools absorbed into spend suites\n\nStandalone expense tools like Expensya were being acquired by AP automation platforms during this period, competing against all-in-one challengers like Ramp, Brex, and Spendesk. The French-only homepage and **\"Réservez une démo\"** CTA (replacing **\"Free trial\"**) are consistent with narrowing to a specific market where Medius could bundle AP and expense into a unified platform.\n\n### Quick test: does your homepage assume English-speaking international buyers?\n\nVisit your homepage. Count how many primary CTAs, headlines, and navigation items assume English-speaking visitors. If over 50%, check your analytics: what percentage of converting traffic comes from non-English markets? If you have strong brand presence in one geography but spread messaging across many, you may be diluting conversion by staying international when a focused market would convert better.",
  marketingSummaryCards: [
    {
      label: "Market scope",
      value: "Multi-country → France-only",
      note: "Entire homepage switched from English to French, removing international navigation",
    },
    {
      label: "Product positioning",
      value: "Expense software → Card + software bundle",
      note: "Added 'Cartes de paiement & budgets' as first section heading after Swan partnership",
    },
    {
      label: "Buyer persona",
      value: "Any company size → Finance teams",
      note: "Removed Small/Mid/Large nav; added 'équipes financières modernes' in meta description",
    },
    {
      label: "Acquisition model",
      value: "Self-serve trial → Demo-gated sales",
      note: "Replaced 'Free trial' CTA with 'Réservez une démo' post-acquisition",
    },
  ],
  articleBody: "---\ntitle: \"Expensya Homepage Teardown: Oct 2020 to Jun 2026\"\nslug: expensya\ngeneratedAt: 2026-06-12T08:26:36.266Z\nsectionsIncluded: [\"01-intro\", \"07-business-context\"]\n---\n# How Expensya rewrote its homepage over 6 years\n\n*Oct 2020 → Jun 2026 · 2 snapshots · 8 min read*\n\n---\n\n# Expensya Homepage Teardown: How a SaaS Company Exited the English-Speaking Market\n\nExpensya replaced its English homepage with a French-only site between October 2020 and June 2026. The company's headline shifted from **\"Automated spend management for all companies\"** to **\"Voici à quoi devrait ressembler la gestion des dépenses\"** — a change that signals more than localization. The old site offered a free trial and explained features to English-speaking prospects of any company size. The new site assumes visitors already know what expense management should look like, gates access behind **\"Réservez une démo\"**, and addresses **\"équipes financières modernes\"** exclusively in French. This teardown shows how to read a homepage shift as a deliberate market exit — and when narrowing geography can strengthen positioning.\n\n## Why Expensya abandoned English and narrowed to France after the Medius acquisition\n\nThe homepage shift wasn't gradual drift — it followed a specific acquisition and regulatory timeline.\n\n### Market entry timing: French e-invoicing mandate\n\nExpensya's homepage switched to French-only in 2023, the same year Medius acquired it for over $100M. Medius publicly cited France's July 2024 e-invoicing mandate as strategic rationale. The timing suggests Expensya was repositioned to serve a regulatory moment rather than continue competing as an international SaaS product.\n\n### Product evolution: from software to embedded cards\n\nThe March 2023 Swan partnership added embedded corporate cards before the acquisition closed. The homepage shifted from **\"Automated spend management for all companies\"** to **\"Cartes de paiement & budgets\"** as the lead section heading, pointing to product evolution from expense tracking software to integrated financial platform.\n\n### Industry consolidation: expense tools absorbed into spend suites\n\nStandalone expense tools like Expensya were being acquired by AP automation platforms during this period, competing against all-in-one challengers like Ramp, Brex, and Spendesk. The French-only homepage and **\"Réservez une démo\"** CTA (replacing **\"Free trial\"**) are consistent with narrowing to a specific market where Medius could bundle AP and expense into a unified platform.\n\n### Quick test: does your homepage assume English-speaking international buyers?\n\nVisit your homepage. Count how many primary CTAs, headlines, and navigation items assume English-speaking visitors. If over 50%, check your analytics: what percentage of converting traffic comes from non-English markets? If you have strong brand presence in one geography but spread messaging across many, you may be diluting conversion by staying international when a focused market would convert better.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-12T08:29:39.651Z",
};
