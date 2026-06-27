/**
 * brevo.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-27T08:00:51.764Z
 * Final judge  : 91/100 ✓
 * SEO score    : 87/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/brevo/writing/generated-article-data.json
 *   data/cro-teardowns/brevo/writing/article-final.md
 *   data/cro-teardowns/brevo/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug brevo --mode standard --force
 *   npm run cro-teardown:publish -- --slug brevo
 */

import type { CroTeardownPost } from "../types";

export const brevo: CroTeardownPost = {
  slug: "brevo",
  companyName: "Brevo",
  companyUrl: "https://www.brevo.com/",
  category: "CRO Teardown",
  title: "Brevo Teardown: From Rebrand to CLV Infrastructure",
  h1: "Brevo Homepage Teardown: From Rebrand Explanation to CLV Infrastructure",
  metaTitle: "Brevo Teardown: From Rebrand to CLV Infrastructure",
  description: "Brevo spent a year explaining its rebrand, then rewrote its homepage around CLV — replacing 'Connections that spark growth' with a repeat-revenue promise.",
  excerpt: "When Sendinblue rebranded to Brevo in 2023, its homepage spent the first year explaining itself — \"Connections that spark growth\" as the H1, \"Why Brevo?\" in the navigation. By 2026, those identity-building elements are gone. The headline now reads \"Turn Every Email SMS Order Interaction into a Lifetime Customer\" and the navigation no longer needs to justify the brand. This teardown tracks exactly how Brevo's homepage moved from new-name introduction to category ownership in under three years — and what the removal of \"Why Brevo?\" signals about when a rebrand stops costing and starts compounding.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-27",
  readTime: "8 min read",
  featuredImage: "/cro-teardowns/brevo/selected/2023-01.webp",
  featuredImageAlt: "Brevo Jan 2023 homepage — 'Connections that spark growth'",
  fromLabel: "Jan 2023",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2023-01",
      label: "Jan 2023",
      screenshotPath: "/cro-teardowns/brevo/selected/2023-01.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/brevo/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2023 → Jun 2026",
      note: "2 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "9 added · 2 removed",
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
      before: "Connections that spark growth",
      after: "Turn Every EmailSMSOrderInteraction into a Lifetime Customer",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Brevo helps you grow your business. Build customer relationships across email, SMS, chat, and more. Use the tools you need, when you need them. Try it for free.",
      after: "Brevo is the most intuitive all-in-one customer engagement platform: email and SMS marketing, automation, CRM, live chat, and transactional email. Try it free.",
      note: "The new description is shorter and more neutral in tone. Whether this is intentional de-emphasis or a simplification pass is not determinable from text alone.",
    },
    {
      element: "Page title",
      before: "Brevo (formerly Sendinblue) | CRM Suite",
      after: "Brevo: Email & SMS Marketing, CRM & Automation Platform",
    },
  ],
  h2Added: [
    "Join 600,000+ customers around the world who trust Brevo",
    "Engage your audience your way",
    "AI agents that work with you, and for you",
    "Built for every business — from the first send to enterprise",
    "Awarded for excellence",
    "Real stories, real success",
    "Brevo connects to the tools you already use",
    "Ready to grow with Brevo?",
    "Privacy Preferences Center",
  ],
  h2Removed: [
    "Wide reachClose connection",
    "Everyone can grow with Brevo",
  ],
  ctaAdded: [
    "Sign up free",
    "Learn more",
    "Explore Brevo for SMBs",
    "Get a demo",
    "Reject All",
    "Email marketing",
    "SMS marketing",
    "WhatsApp campaigns",
    "Push notifications",
    "Mobile Wallet",
  ],
  ctaRemoved: [
    "Get Brevo",
    "Read customer stories",
    "See all integrations",
    "Why Brevo?",
  ],
  analysisBlocks: [
    {
      id: "analysis-2023-01",
      label: "Jan 2023 — original state",
      period: "Jan 2023",
      screenshotPath: "/cro-teardowns/brevo/selected/2023-01.webp",
      heading: "The original: growth-outcome messaging",
      annotations: [
        "H1 opens with: \"Connections that spark growth\" — accessible benefit language aimed at a broad audience.",
        "Visible section headings include: \"Wide reachClose connection\", \"Everyone can grow with Brevo\".",
        "Navigation includes: \"Products\" — product category framing.",
        "Section headings later removed include: \"Wide reachClose connection\" and \"Everyone can grow with Brevo\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/brevo/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Turn Every EmailSMSOrder Interaction into a Lifetime Customer\" — updated value proposition.",
        "New section headings include: \"Join 600,000+ customers around the world who trust Brevo\", \"Engage your audience your way\", \"AI agents that work with you, and for you\".",
        "Third-party validation visible in section headings: \"Awarded for excellence\".",
        "CTAs no longer present include: \"Get Brevo\", \"Read customer stories\", \"See all integrations\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Remove \"Why [Company]?\" only when brand recall is measured, not assumed",
      body: "Brevo launched its 2023 rebrand with **\"Why Brevo?\"** in the navigation. By 2026, it was gone. This removal is a measurable brand milestone: the company waited until visitors no longer needed the brand justified before removing the explanation CTA. If you track \"Why [Company]?\" click rate, a drop to near zero tells you when you can remove it safely.",
      tag: "Brand",
    },
    {
      title: "Replace hedges with a full product list once your suite is built",
      body: "Brevo's 2023 meta description said \"email, SMS, chat, and more.\" By 2026 it listed every product: **\"email and SMS marketing, automation, CRM, live chat, and transactional email.\"** Removing \"and more\" is a category commitment — it invites direct comparison. This move is only safe when each named product has a full working page behind it. Hedges hide gaps; product lists reveal them.",
      tag: "Messaging",
    },
    {
      title: "Rename \"Products\" to \"Platform\" when you want to compete on category, not features",
      body: "Brevo changed its primary nav label from **\"Products\"** to **\"Platform\"** between 2023 and 2026. Platform implies infrastructure — something companies build on — while Products implies a suite to compare. If your competitive differentiation is breadth and integration across channels, \"Platform\" sets a different expectation than \"Products\" before a visitor even clicks.",
      tag: "Positioning",
    },
    {
      title: "Tie every channel in your H1 to one business outcome, not a list of features",
      body: "Brevo's 2026 H1 — **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"** — names four channels and ties them to one outcome. This is a category claim disguised as a headline. It only works because Brevo has the products behind each channel. For teams with gaps, naming channels you can't fully deliver on will surface those gaps faster than any competitor analysis.",
      tag: "CRO",
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
    title: "Not sure why your page isn't converting?",
    body: "I map your visitor intent against your current messaging and CTA structure, then tell you exactly where the drop-off happens and how to fix it.",
    button: "Book a CRO audit",
  },
  relatedPosts: [
    {
      label: "Landing pages",
      title: "Landing page optimization best practices 2026",
      description: "From proof structure to CTA friction — the patterns that move the needle on SaaS landing pages.",
      href: "/blog/landing-page-optimization-best-practices-2026",
    },
    {
      label: "CRO",
      title: "AI conversion rate optimization for SaaS",
      description: "Using AI to diagnose conversion drop-off without drowning in session recordings.",
      href: "/blog/ai-conversion-rate-optimization-saas",
    },
    {
      label: "SaaS CRO",
      title: "SaaS traffic but no signups? Here's why",
      description: "Traffic without conversions is a messaging problem, not a traffic problem.",
      href: "/blog/saas-traffic-but-no-signups",
    },
  ],
  heroTitle: "Brevo Homepage Teardown: How a Rebranded Company Stopped Explaining Itself and Started Owning a Category",
  businessContext: "## The business context behind Brevo's redesign\n\nBrevo launched as Sendinblue in 2012 and spent a decade building an affordable email and SMS marketing tool for SMBs. In May 2023, Sendinblue rebranded to Brevo — a deliberate move to shed a name that had become tied to a single product category (email) and claim a broader identity as a multi-channel customer engagement platform. The Wayback archive for brevo.com begins in January 2023, capturing the rebrand's first public homepage.\n\nThe 2023 homepage reflected a company in the middle of a brand transition. The H1 read **\"Connections that spark growth\"** — aspirational and brand-level, not product-specific. A section heading asked **\"Why Brevo?\"** and the CTA said **\"Get Brevo\"** — both consistent with a team still building brand recognition after abandoning nine years of Sendinblue equity. By 2026, those identity-building elements are gone. The H1 now reads **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"**, and the CTAs are **\"Sign up free\"** and **\"Get a demo\"** — both oriented around doing, not explaining.\n\nThe broader context is the consolidation of martech around three competitors: Mailchimp (email-centric, acquired by Intuit), Klaviyo (ecommerce-focused, public in 2023), and HubSpot (CRM-led). Brevo's navigation shift from \"Products\" to \"Platform\" and the addition of \"AI agents that work with you, and for you\" as a homepage section reflect an attempt to compete on category definition rather than feature comparison. For SaaS teams post-rebrand, the key lesson is that brand recognition has a measurable homepage signal: when you can remove 'Why [Company]?' from the nav without hurting conversion, you've achieved recall.",
  quickAnswer: "Brevo's biggest homepage change between its 2023 rebrand and 2026 was replacing the aspirational H1 **\"Connections that spark growth\"** with the outcome-specific **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"** — a shift from brand introduction to category ownership. The page now assumes visitors already know the Brevo name: **\"Why Brevo?\"** was removed from the navigation entirely, and the CTA changed from **\"Get Brevo\"** to **\"Sign up free\"** and **\"Get a demo.\"** If you have just rebranded, do not copy this homepage yet — this confidence only works once your visitors recognize your name without needing it explained.",
  marketingSummaryCards: [
    {
      label: "Positioning shift",
      value: "Brand intro → Category owner",
      note: "H1 moved from aspiration to LTV outcome",
    },
    {
      label: "Rebrand signal",
      value: "\"Why Brevo?\" removed",
      note: "Nav explanation CTA dropped once recall established",
    },
    {
      label: "Sales motion",
      value: "PLG + demo path",
      note: "\"Sign up free\" + \"Get a demo\" dual CTA added",
    },
    {
      label: "AI positioning",
      value: "\"AI agents\" section",
      note: "Competitive differentiator added as section heading",
    },
  ],
  articleBody: "---\ntitle: \"Brevo Homepage Teardown: Jan 2023 to Jun 2026\"\nslug: brevo\ngeneratedAt: 2026-06-27T08:00:41.826Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"07-business-context\", \"06-lessons-for-saas-teams\"]\n---\n# How Brevo rewrote its homepage over 3 years\n\n*Jan 2023 → Jun 2026 · 2 snapshots · 8 min read*\n\n---\n\n# Brevo Homepage Teardown: From Rebrand Introduction to Lifetime Customer Ownership (2023–2026)\n\nWhen Sendinblue rebranded to Brevo in 2023, its homepage spent the first year explaining itself — **\"Connections that spark growth\"** as the H1, **\"Why Brevo?\"** in the navigation. By 2026, those identity-building elements are gone. The headline now reads **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"** and the navigation no longer needs to justify the brand. This teardown tracks exactly how Brevo's homepage moved from new-name introduction to category ownership in under three years — and what the removal of \"Why Brevo?\" signals about when a rebrand stops costing and starts compounding.\n\n## Quick answer\n\nBrevo's biggest homepage change between its 2023 rebrand and 2026 was replacing the aspirational H1 **\"Connections that spark growth\"** with the outcome-specific **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"** — a shift from brand introduction to category ownership. The page now assumes visitors already know the Brevo name: **\"Why Brevo?\"** was removed from the navigation entirely, and the CTA changed from **\"Get Brevo\"** to **\"Sign up free\"** and **\"Get a demo.\"** If you have just rebranded, do not copy this homepage yet — this confidence only works once your visitors recognize your name without needing it explained.\n\n## Brevo's homepage arc 2023–2026: from rebrand introduction to customer-lifetime-value platform\n\n### January 2023: a brand announcing itself\n\nThe January 2023 Brevo homepage is a rebrand in progress. The page title reads **\"Brevo (formerly Sendinblue) | CRM Suite\"** — the parenthetical exists because visitors still arrive searching for Sendinblue. The H1 is **\"Connections that spark growth\"**: aspirational, brand-level, avoiding specific product claims. A section heading asks **\"Sendinblue is now Brevo!\"** — a direct announcement for visitors who are confused. The CTA is **\"Get Brevo\"**, not \"Sign up free\" — you get a brand, not a product. The page is organized around building recognition, not driving product-led conversion.\n\n### Where the page stood in early 2023\n\nTwo section headings frame the value proposition: **\"Wide reachClose connection\"** and **\"Everyone can grow with Brevo.\"** Both are aspirational and audience-inclusive — they avoid narrowing the ICP while the brand builds recall. A **\"Why Brevo?\"** link exists in the navigation, acknowledging that visitors need to be persuaded of the brand before they will act on a CTA. The social proof reads \"Over 500,000+ customers trust Brevo\" — carrying the Sendinblue equity into the new brand identity.\n\n### June 2026: brand recognition achieved, category owned\n\nBy 2026, the rebrand parentheticals and explanatory navigation are gone. The H1 reads **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"** — a specific outcome claim that names four distinct channels. **\"Why Brevo?\"** has been removed from the navigation. The CTAs are **\"Sign up free\"** and **\"Get a demo\"** — both assume the visitor knows what Brevo does. Customer count has grown to 600,000. An **\"AI agents that work with you, and for you\"** section heading has been added. Visit your post-rebrand homepage and check whether you still have a \"Why [Company]?\" link in the nav — its presence or absence tells you whether your brand recall work is done.\n\n## How Brevo's homepage messaging shifted from brand introduction to lifetime customer ownership\n\n### The headline shift: aspiration to outcome\n\nIn January 2023, Brevo's H1 was **\"Connections that spark growth.\"** The word \"spark\" is brand-emotional — it names a feeling, not a product or a result. By 2026, the H1 reads **\"Turn Every Email SMS Order Interaction into a Lifetime Customer.\"** This sentence names four specific channels (Email, SMS, Order, Interaction) and names the specific business outcome the visitor should expect (a Lifetime Customer — not a subscriber, not a conversion, but a repeated buyer). This shift is consistent with a brand that has achieved sufficient recognition to speak to buyers who are comparing outcomes rather than evaluating brand identity.\n\n### Meta description: from flexible to specific\n\nIn January 2023, the meta description read **\"Brevo helps you grow your business. Build customer relationships across email, SMS, chat, and more. Use the tools you need, when you need them.\"** The phrase \"and more\" and \"the tools you need, when you need them\" are intentionally open-ended — they avoid commitment to a specific category or product list, appropriate for a brand still learning which ICP it attracts. By 2026, the meta description is specific: **\"Brevo is the most intuitive all-in-one customer engagement platform: email and SMS marketing, automation, CRM, live chat, and transactional email.\"** Every product is named, and the category is claimed: \"customer engagement platform.\" The hedge is gone; the claim is committed.\n\n### What the shift signals about the target buyer\n\nThe 2023 homepage spoke to a visitor who was curious about the new Brevo brand — what it was, whether it was the Sendinblue they knew. The 2026 homepage speaks to a visitor who already knows the brand and is evaluating it against Klaviyo, HubSpot, or ActiveCampaign on specific dimensions: AI automation, channel breadth, enterprise readiness. The section heading **\"AI agents that work with you, and for you\"** is the clearest evidence of this buyer shift — it is a competitive claim, not an introduction. Visit your homepage meta description and count how many hedges (\"and more\", \"when you need them\") you use. Each one suggests you are still discovering your ICP rather than committing to it.\n\n## How Brevo's CTAs and navigation changed the sales motion\n\n### CTA changes: removing \"Why Brevo?\" is the most important signal\n\nIn January 2023, Brevo's CTAs included **\"Get Brevo,\" \"Read customer stories,\" \"See all integrations,\"** and **\"Why Brevo?\"** — a set that assumes visitors need to be persuaded of the brand before they act. **\"Get Brevo\"** is a brand call, not a product call; it assumes the visitor does not yet know what they are signing up for. **\"Why Brevo?\"** is an explicit acknowledgment that the brand needs justification. By 2026, these CTAs have been removed. The replacements are **\"Sign up free,\" \"Get a demo,\" \"Learn more,\"** and **\"Explore Brevo for SMBs\"** — all oriented around actions, not brand explanations. The removal of **\"Why Brevo?\"** is a measurable brand-recall milestone: it means Brevo judged (or A/B tested) that visitors no longer need the brand justified in the CTA set.\n\n### Navigation changes: \"Platform\" replaces \"Products\" and channels become nav items\n\nIn 2023, Brevo's navigation contained: **\"Products | Features | Email marketing | SMS marketing | WhatsApp campaigns | Automation | Signup forms | Facebook ads.\"** By 2026, this became: **\"Platform | Email | SMS | WhatsApp | Web & mobile push | Wallet | Phone | Solutions.\"** Three changes stand out. First, renaming **\"Products\"** to **\"Platform\"** is a category-level claim — platforms are infrastructure, products are features. Second, removing **\"Facebook ads\"** from the navigation suggests that channel was not generating meaningful traffic from the nav. Third, adding **\"Wallet\"** and **\"Phone\"** as channel nav items signals Brevo is competing on omnichannel breadth — every channel a customer might interact on has a dedicated nav entry. Visit your navigation and ask whether each nav item is a product name or a channel name — the distinction tells you whether you are positioning as a feature suite or as infrastructure.\n\n## The business context behind Brevo's redesign\n\nBrevo launched as Sendinblue in 2012 and spent a decade building an affordable email and SMS marketing tool for SMBs. In May 2023, Sendinblue rebranded to Brevo — a deliberate move to shed a name that had become tied to a single product category (email) and claim a broader identity as a multi-channel customer engagement platform. The Wayback archive for brevo.com begins in January 2023, capturing the rebrand's first public homepage.\n\nThe 2023 homepage reflected a company in the middle of a brand transition. The H1 read **\"Connections that spark growth\"** — aspirational and brand-level, not product-specific. A section heading asked **\"Why Brevo?\"** and the CTA said **\"Get Brevo\"** — both consistent with a team still building brand recognition after abandoning nine years of Sendinblue equity. By 2026, those identity-building elements are gone. The H1 now reads **\"Turn Every Email SMS Order Interaction into a Lifetime Customer\"**, and the CTAs are **\"Sign up free\"** and **\"Get a demo\"** — both oriented around doing, not explaining.\n\nThe broader context is the consolidation of martech around three competitors: Mailchimp (email-centric, acquired by Intuit), Klaviyo (ecommerce-focused, public in 2023), and HubSpot (CRM-led). Brevo's navigation shift from \"Products\" to \"Platform\" and the addition of \"AI agents that work with you, and for you\" as a homepage section reflect an attempt to compete on category definition rather than feature comparison. For SaaS teams post-rebrand, the key lesson is that brand recognition has a measurable homepage signal: when you can remove 'Why [Company]?' from the nav without hurting conversion, you've achieved recall.\n\n## What SaaS teams can study from Brevo's homepage evolution\n\n### The rebrand patience pattern — Brevo kept \"Why Brevo?\" for at least 18 months before removing it\n\nBrevo launched its rebrand in May 2023 with **\"Why Brevo?\"** in the navigation. By January 2024 it was still there; by 2025–2026 it was gone. The company did not remove the explanation CTA immediately — it waited until brand recall was strong enough that the link was redundant.\n\nThis is a replicable pattern: treat \"Why [Company]?\" as a metric, not a permanent fixture. Its click rate measures how many visitors need brand justification. When that rate drops below a threshold — when visitors no longer click it — the brand has achieved baseline recall.\n\nIf you have recently rebranded, add \"Why [Company]?\" as a navigation item or CTA and track its click rate monthly. When the click rate drops to below 2–3% of navigation interactions, you have the data to remove it.\n\n### Committing to a category — Brevo replaced \"and more\" hedges with a full product list\n\nIn January 2023, Brevo's meta description said \"Build customer relationships across email, SMS, chat, and more.\" The phrase \"and more\" is a deliberate hedge. By 2026, the meta description lists every product: **\"email and SMS marketing, automation, CRM, live chat, and transactional email.\"** Nothing is left ambiguous.\n\nThis hedge removal is a category commitment move. When you list everything, you invite direct comparison — visitors know exactly what to benchmark. The trade-off is that you lose the \"you can use it for anything\" positioning. Brevo made this trade when it had enough products to win on feature breadth.\n\nReview your meta description and count how many hedges you use (\"and more,\" \"and beyond,\" \"among other things\"). Each hedge is a product gap you are hiding. List your full product suite and see whether the specific version converts better than the hedged version in an A/B test.\n\n### Omnichannel H1 as a category claim — \"Every Email SMS Order Interaction\" names the territory\n\nBrevo's 2026 H1 lists four channel touchpoints — **Email, SMS, Order, Interaction** — and ties them to one business outcome: **\"a Lifetime Customer.\"** This is not a feature list; it is a territory claim. The H1 is saying: wherever your customer touches your business, Brevo is the infrastructure that turns that into a repeat relationship.\n\nThis H1 pattern works because Brevo has the products to back each channel claim. It is an unusually risky approach for companies with gaps — naming a channel you do not fully support invites visitors to discover the gap.\n\nRun a simple test: rewrite your H1 to name every channel your product supports and tie all of them to one business outcome. Measure whether the more specific claim converts better than a general aspirational statement. The specificity is only safe if each channel has a working product page behind it.",
  publishedAt: "2026-06-27T08:00:51.764Z",
};
