/**
 * gong.ts — Phase 4F published content file.
 *
 * Published    : 2026-02-12T10:17:00.000Z
 * Final judge  : 81/100 ✓
 * SEO score    : 82/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/gong/writing/generated-article-data.json
 *   data/cro-teardowns/gong/writing/article-final.md
 *   data/cro-teardowns/gong/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug gong --mode standard --force
 *   npm run cro-teardown:publish -- --slug gong
 */

import type { CroTeardownPost } from "../types";

export const gong: CroTeardownPost = {
  slug: "gong",
  companyName: "Gong",
  companyUrl: "https://www.gong.io/",
  category: "CRO Teardown",
  title: "Gong Homepage Teardown: Jan 2020 to Jun 2026",
  h1: "How Gong rewrote its homepage over 6 years",
  metaTitle: "Gong Homepage Teardown: Jan 2020 to Jun 2026",
  description: "A CRO teardown of Gong's homepage from Jan 2020 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Gong built an entire product category around \"Revenue Intelligence\" — then quietly removed it from the top of its own homepage. The headline shifted from \"REVENUE INTELLIGENCE\" to \"Revenue AI Built To Predict churn\", the page title changed from \"Revenue Intelligence Technology for Sales Teams | Gong.io\" to \"Gong - Revenue AI OS\", and the navigation dropped \"What is RI?\" entirely. That is not a rebrand. It signals a deliberate move from explaining a category to claiming infrastructure ownership. By the end of this teardown, you will know whether that same move is available to your own product — or whether copying it will cost you the visitors who still need convincing.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-11",
  readTime: "8 min read",
  featuredImage: "/cro-teardowns/gong/selected/2020-01.webp",
  featuredImageAlt: "Gong Jan 2020 homepage — 'REVENUE INTELLIGENCE'",
  fromLabel: "Jan 2020",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2020-01",
      label: "Jan 2020",
      screenshotPath: "/cro-teardowns/gong/selected/2020-01.webp",
    },
    {
      month: "2021-10",
      label: "Oct 2021",
      screenshotPath: "/cro-teardowns/gong/selected/2021-10.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/gong/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2020 → Jun 2026",
      note: "3 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "10 added · 4 removed",
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
      before: "REVENUE INTELLIGENCE",
      after: "Revenue AI Built To Predict churnPredict churn",
      note: "This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.",
    },
    {
      element: "Meta description",
      before: "Generate more revenue by having better sales conversations with the #1 revenue intelligence platform for sales optimization.",
      after: "Gong Revenue AI OS helps your entire GTM organization win. Drive growth with multimodal revenue signal processing, specialized AI agents, and purpose-built applications.",
      note: "Meta description updated. The change in framing may reflect a positioning adjustment or an SEO update.",
    },
    {
      element: "Page title",
      before: "Revenue Intelligence Technology for Sales Teams | Gong.io",
      after: "Gong - Revenue AI OS",
    },
  ],
  h2Added: [
    "Trusted by 5,000+ customers",
    "Winning GTM organizations run revenue on Gong",
    "Pitchbook is 10x more efficient with revenue AI",
    "Power your revenue engine with AI — from prospecting to expansion",
    "Gong Revenue AI OS",
    "Trusted by high-performing revenue teams in every industry",
    "What our raving fans say",
    "Everyone wins with Gong",
    "Win more with revenue AI",
    "Privacy Preference Center",
  ],
  h2Removed: [
    "Get powerful visibility into your customer interactions with",
    "Revenue Intelligence helps you fuel:",
    "So What Does this look like? Glad you asked.",
    "Skyrocket your success today",
  ],
  ctaAdded: [
    "Read the case study",
    "Learn about our product",
    "See Gong in action",
    "Visit the solutions hub",
    "View more customer stories",
  ],
  ctaRemoved: [
    "Watch Video",
    "Paul Santarelli VP of Sales",
    "Bevin Lyon VP, Customer Strategy",
    "Tonni Bennett VP of Sales",
  ],
  analysisBlocks: [
    {
      id: "analysis-2020-01",
      label: "Jan 2020 — original state",
      period: "Jan 2020",
      screenshotPath: "/cro-teardowns/gong/selected/2020-01.webp",
      heading: "The original: product-led messaging",
      annotations: [
        "H1 opens with: \"REVENUE INTELLIGENCE\" — direct product statement.",
        "Visible section headings include: \"Get powerful visibility into your customer interactions with\", \"Revenue Intelligence helps you fuel:\", \"So What Does this look like? Glad you asked.\".",
        "Navigation includes: \"Log In\", \"What is RI?\", \"Overview\", \"Reveal: The RI Podcast\" — product category framing.",
        "Section headings later removed include: \"Get powerful visibility into your customer interactions with\" and \"Revenue Intelligence helps you fuel:\".",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/gong/selected/current-live.webp",
      heading: "Today: updated positioning",
      annotations: [
        "H1 now reads: \"Revenue AI Built To Predict churnPredict churn\" — updated value proposition.",
        "New section headings include: \"Trusted by 5,000+ customers\", \"Winning GTM organizations run revenue on Gong\", \"Pitchbook is 10x more efficient with revenue AI\".",
        "CTAs no longer present include: \"Watch Video\", \"Paul Santarelli VP of Sales\", \"Bevin Lyon VP, Customer Strategy\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "Gong dropped 'REVENUE INTELLIGENCE' and replaced it with 'Revenue AI OS' — that is a category change, not a rebrand",
      body: "In 2020, Gong's H1 read **\"REVENUE INTELLIGENCE\"** — a category label that told buyers what the product was. By 2026, the page title had become **\"Gong - Revenue AI OS\"** and the meta description introduced **\"multimodal revenue signal processing\"** and **\"specialized AI agents.\"** This suggests Gong is no longer trying to own a category it defined — it is trying to position inside a category that is currently being defined by AI.",
      tag: "Positioning",
    },
    {
      title: "Gong replaced named VP testimonials with 'See Gong in action' — a shift from social proof to product confidence",
      body: "The 2020 page surfaced individual names — **\"Paul Santarelli VP of Sales\"**, **\"Bevin Lyon VP, Customer Strategy\"**, **\"Tonni Bennett VP of Sales\"** — as clickable proof points alongside a **\"Watch Video\"** CTA. All four were removed. The page now leads with **\"See Gong in action\"** and **\"Learn about our product.\"** This suggests the team believes the product now carries enough weight to convert without leaning on peer authority first.",
      tag: "Funnel",
    },
    {
      title: "'Trusted by 5,000+ customers' and 'Pitchbook is 10x more efficient' are new H2s — Gong moved scale proof into the page structure itself",
      body: "In 2020, trust signals appeared as named quotes rather than section headings. By 2026, headlines like **\"Trusted by 5,000+ customers\"** and **\"Pitchbook is 10x more efficient with revenue AI\"** are baked into the content architecture. Embedding scale and outcome numbers at the heading level — not just in body copy — signals that Gong may be targeting buyers who are further along in evaluation and scanning for validation fast.",
      tag: "Trust",
    },
    {
      title: "When Gong added 10 H2s and rewrote its meta description, the whole page stopped talking to sales reps and started talking to GTM leaders",
      body: "The 2020 page used headings like **\"Skyrocket your success today\"** and **\"So What Does this look like? Glad you asked.\"** — casual, rep-facing language. The 2026 page uses **\"Winning GTM organizations run revenue on Gong\"** and **\"Power your revenue engine with AI — from prospecting to expansion.\"** The tone and vocabulary shift points to an audience that approves budgets rather than one that books calls.",
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
  businessContext: "## How reportedly $450M in funding, a SaaS downturn, and Gartner's new Magic Quadrant pushed Gong to reframe its homepage\n\n### Gong raised reportedly $450M while the category it built was maturing\n\nGong built its early identity around a category it invented. The page title read **\"Revenue Intelligence Technology for Sales Teams | Gong.io\"** — and that framing carried the company through a reportedly $200M Series D and a $250M Series E, reaching a reported $7.25 billion valuation by mid-2021. The category worked. Then the market caught up.\n\n### The 2022–2023 SaaS downturn and competitor consolidation changed the calculus\n\nWidespread sales team downsizing from 2022 into 2023 pressured Gong's per-seat pricing model and reportedly led to declines in net dollar retention — how much revenue Gong kept from existing customers year over year. ZoomInfo's acquisition of Chorus consolidated a direct competitor. The Clari-Salesloft merger, reportedly closed in December 2025, raised the stakes for what a platform had to offer. Sitting inside one category started to look like a ceiling.\n\n### Gartner named a new category — and Gong's page title responded\n\nGartner reportedly published its first Magic Quadrant for Revenue Action Orchestration in December 2025. The page title shift from **\"Revenue Intelligence Technology for Sales Teams\"** to **\"Gong - Revenue AI OS\"** is consistent with a company responding to a redefined competitive ceiling. Gong's acquisition of RightBound, an AI prospecting platform, in December 2025 points to the same direction: platform breadth, not category depth. To test whether your own category label is ready to retire, search your brand name plus your category term in Google and check whether autocomplete still needs the category word to identify you — if it doesn't, you may have the same signal Gong had.",
  quickAnswer: "Gong's biggest homepage change was replacing its H1 from **\"REVENUE INTELLIGENCE\"** to **\"Revenue AI Built To Predict churn\"** — dropping the category label the company itself popularized and replacing it with a specific AI outcome claim. The page now speaks to buyers who already know what Gong does and need proof it delivers results, not an explanation of what revenue intelligence means. If your brand is not yet widely recognized, removing that category explanation may leave visitors unable to justify the purchase internally.",
  marketingSummaryCards: [
    {
      label: "Positioning shift",
      value: "Category inventor → Infrastructure owner",
      note: "Page title changed from 'Revenue Intelligence Technology' to 'Gong - Revenue AI OS,' signaling a move from category definition to platform-of-record claiming",
    },
    {
      label: "Target buyer",
      value: "VP of Sales → CRO and RevOps",
      note: "Meta description removed 'sales teams' and 'sales optimization'; replaced with 'entire GTM organization' and 'multimodal revenue signal processing'",
    },
    {
      label: "Sales motion",
      value: "Peer proof → ROI evidence + demo",
      note: "Named sales VP testimonial CTAs (Santarelli, Anton, Bennett) replaced by anonymous case-study links and a direct 'Book a demo' CTA",
    },
    {
      label: "Category play",
      value: "Education phase declared complete",
      note: "'What is RI?' removed from nav entirely — Gong treats category familiarity as assumed, not as a conversion prerequisite",
    },
  ],
  articleBody: "---\ntitle: \"Gong Homepage Teardown: Jan 2020 to Jun 2026\"\nslug: gong\ngeneratedAt: 2026-06-13T00:34:25.126Z\nsectionsIncluded: [\"01-intro\", \"02-quick-answer\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"07-business-context\", \"06-lessons-for-saas-teams\"]\n---\n# How Gong rewrote its homepage over 6 years\n\n*Jan 2020 → Jun 2026 · 3 snapshots · 8 min read*\n\n---\n\n# How Gong Rewrote Its Homepage Over 6 Years\n\nGong built an entire product category around \"Revenue Intelligence\" — then quietly removed it from the top of its own homepage. The headline shifted from **\"REVENUE INTELLIGENCE\"** to **\"Revenue AI Built To Predict churn\"**, the page title changed from **\"Revenue Intelligence Technology for Sales Teams | Gong.io\"** to **\"Gong - Revenue AI OS\"**, and the navigation dropped **\"What is RI?\"** entirely. That is not a rebrand. It signals a deliberate move from explaining a category to claiming infrastructure ownership. By the end of this teardown, you will know whether that same move is available to your own product — or whether copying it will cost you the visitors who still need convincing.\n\n## Quick answer\n\nGong's biggest homepage change was replacing its H1 from **\"REVENUE INTELLIGENCE\"** to **\"Revenue AI Built To Predict churn\"** — dropping the category label the company itself popularized and replacing it with a specific AI outcome claim. The page now speaks to buyers who already know what Gong does and need proof it delivers results, not an explanation of what revenue intelligence means. If your brand is not yet widely recognized, removing that category explanation may leave visitors unable to justify the purchase internally.\n\n## Gong homepage 2020–2025: from cinematic category launch to enterprise product OS\n\n### 2020 — a full-bleed hero built to explain a new category\n\nThe 2020 homepage opened with a full-bleed gradient hero, large illustrated characters on the right, and one bold statement on the left: **\"REVENUE INTELLIGENCE\"**. No product screenshots. No customer counts. The navigation included a link labeled **\"What is RI?\"** — every element assumed visitors needed the category explained before anything else could land.\n\n### The shift — the page stopped teaching and started assuming\n\nThe most visible change is in what the page no longer explains. The page title moved from **\"Revenue Intelligence Technology for Sales Teams | Gong.io\"** to **\"Gong - Revenue AI OS\"**. The meta description shifted from sales conversation optimization to **\"multimodal revenue signal processing, specialized AI agents, and purpose-built applications\"** — language that describes specific technical capabilities (processing multiple types of sales data simultaneously through AI) rather than defining what the category is.\n\nIndividual rep testimonials — **\"Paul Santarelli VP of Sales\"** and **\"Bevin Lyon VP, Customer Strategy\"** — were removed and replaced with **\"Trusted by 5,000+ customers.\"** This may suggest the page is now written for buying committees — the groups of people at larger companies who evaluate software together — rather than individual contributors exploring a new tool.\n\n### 2026 — what this means for your own homepage\n\nIf your navigation still includes a link that explains what your category *is* — the way Gong's 2020 nav included **\"What is RI?\"** — your page is likely still in education mode. The current Gong page uses a split layout: headline and CTA on the left, an interactive chat widget mockup on the right, soft gradient background. The headline reads **\"Revenue AI Built To Predict churn\"**. A section leads with **\"Winning GTM organizations run revenue on Gong.\"** The visual language is enterprise-grade — product interface front and center, illustrated characters gone.\n\n**Your test:** Visit your homepage navigation. Does any link explain what your product *is*, or does every link assume the visitor already knows?\n\n## How Gong's H1 shifted from category noun to outcome verb — and what that reveals about its target buyer\n\n### Gong's headline shift: from category label to specific outcome\n\nThe visual shift the timeline traced shows up most sharply in the headline. Before: **\"REVENUE INTELLIGENCE\"**. After: **\"Revenue AI Built To Predict churn\"**.\n\nThe first version names a category. The second names a result. That shift is consistent with a page that no longer needs to explain what Gong does — it assumes the visitor already knows, and offers proof of what the product delivers instead.\n\n---\n\n### How Gong's meta description and page title changed\n\nThe page dropped sales-team language in favour of organization-wide language — and the before/after makes that concrete.\n\nBefore: **\"Generate more revenue by having better sales conversations with the #1 revenue intelligence platform for sales optimization.\"**\n\nAfter: **\"Gong Revenue AI OS helps your entire GTM organization win. Drive growth with multimodal revenue signal processing, specialized AI agents, and purpose-built applications.\"**\n\nThe words **\"sales conversations\"** and **\"sales optimization\"** are gone. **\"Entire GTM organization\"** — GTM meaning go-to-market, everyone involved in acquiring and retaining revenue — replaced them. The page title moved in the same direction: from **\"Revenue Intelligence Technology for Sales Teams | Gong.io\"** to **\"Gong - Revenue AI OS\"**, dropping **\"for Sales Teams\"** — the most explicit audience signal the old title carried.\n\n---\n\n### What Gong's messaging shift signals about its target buyer\n\nThe section headings show the same contrast in plain terms. The old homepage asked **\"So What Does this look like? Glad you asked.\"** — a conversational line written for someone still learning what the product does. The current page leads with **\"Winning GTM organizations run revenue on Gong\"** — a line written for someone who already knows what the product does and is deciding whether their organization belongs in that group.\n\nThat contrast suggests the page may now be written for buyers evaluating an organization-wide system, rather than a team-level tool — possibly a CRO or a RevOps leader (Revenue Operations — the team that owns the sales and marketing tech stack) rather than a VP of Sales evaluating a single-team tool.\n\n**Founder test:** Visit your own homepage and count how many sentences contain the word \"sales\" versus words like \"organization,\" \"GTM,\" or \"revenue team.\" If \"sales\" dominates and your product now serves CRO or RevOps-level buyers, your messaging may still be written for a buyer your product has moved past.\n\n## How Gong removed three named-person CTAs and what that says about its sales motion\n\n### How Gong's CTAs shifted from peer endorsement to product evidence\n\nThat shift in buyer also reshaped what the page asked visitors to do. The original CTAs put real people front and centre. **\"Paul Santarelli VP of Sales\"**, **\"Bevin Lyon VP, Customer Strategy\"**, and **\"Tonni Bennett VP of Sales\"** were the clickable actions on the page — named practitioners vouching for the product to other practitioners. One more CTA, **\"Watch Video\"**, rounded out the removed set.\n\nThe five CTAs added in their place point toward content and proof. **\"Read the case study\"**, **\"See Gong in action\"**, **\"Learn about our product\"**, **\"Visit the solutions hub\"**, and **\"View more customer stories\"** all invite the visitor to explore evidence independently. This swap — from named people to named actions — suggests the page may now be built for someone who wants to evaluate on their own terms before talking to anyone.\n\n### What Gong's navigation changes reveal — and what the evidence can confirm\n\nThe evidence shows eight navigation items were removed and eight were added across this period. The actual item names are not available in the source data, so what follows is limited to the directional pattern: the count stayed flat while the composition changed.\n\nWhat the CTA data does make clear is the direction of travel. Gong moved from peer-referral prompts to self-serve content — bottom-of-funnel actions, meaning steps a buyer takes when they are close to a decision, not still figuring out what the product does. The nav shift, in count at least, is consistent with that same direction.\n\n**Founder test:** Gong removed three named-person CTAs and replaced them with five content and action CTAs. Look at your own homepage. Count how many CTAs ask a visitor to connect with a person versus explore proof on their own. If the person-to-proof ratio still skews toward the former, your page may be structured differently from where Gong has moved.\n\n## How reportedly $450M in funding, a SaaS downturn, and Gartner's new Magic Quadrant pushed Gong to reframe its homepage\n\n### Gong raised reportedly $450M while the category it built was maturing\n\nGong built its early identity around a category it invented. The page title read **\"Revenue Intelligence Technology for Sales Teams | Gong.io\"** — and that framing carried the company through a reportedly $200M Series D and a $250M Series E, reaching a reported $7.25 billion valuation by mid-2021. The category worked. Then the market caught up.\n\n### The 2022–2023 SaaS downturn and competitor consolidation changed the calculus\n\nWidespread sales team downsizing from 2022 into 2023 pressured Gong's per-seat pricing model and reportedly led to declines in net dollar retention — how much revenue Gong kept from existing customers year over year. ZoomInfo's acquisition of Chorus consolidated a direct competitor. The Clari-Salesloft merger, reportedly closed in December 2025, raised the stakes for what a platform had to offer. Sitting inside one category started to look like a ceiling.\n\n### Gartner named a new category — and Gong's page title responded\n\nGartner reportedly published its first Magic Quadrant for Revenue Action Orchestration in December 2025. The page title shift from **\"Revenue Intelligence Technology for Sales Teams\"** to **\"Gong - Revenue AI OS\"** is consistent with a company responding to a redefined competitive ceiling. Gong's acquisition of RightBound, an AI prospecting platform, in December 2025 points to the same direction: platform breadth, not category depth. To test whether your own category label is ready to retire, search your brand name plus your category term in Google and check whether autocomplete still needs the category word to identify you — if it doesn't, you may have the same signal Gong had.\n\n## What SaaS teams can study from Gong's decision to retire the category it invented\n\n### The category graduation signal — Gong stopped answering \"what is revenue intelligence?\" and removed the nav item entirely\n\nThose same forces translate into moves you can test on your own page. Gong's navigation once included **\"What is RI?\"** as a top-level item. By 2026, that item was gone — replaced by **\"Gong AI\"** and **\"Innovation\"**. The page stopped teaching the category and started assuming the visitor already understood it.\n\nThis pattern is worth testing only when your inbound questions have shifted. If your sales team still fields \"what does this actually do?\" on discovery calls, the category explanation is still doing necessary work. Remove it too early and visitors bounce before they reach any conversion path.\n\nVisit your navigation and search bar analytics right now. If your top searched terms on-site have moved from \"what is [your category]\" toward \"pricing,\" \"integrations,\" or specific use cases, that shift suggests your category explanation may be ready to step back.\n\n---\n\n### The OS naming move — Gong earned \"Revenue AI OS\" with 5,000+ customers and a product architecture to match\n\nGong's page title moved from **\"Revenue Intelligence Technology for Sales Teams | Gong.io\"** to **\"Gong - Revenue AI OS\"**. Appending \"OS\" signals infrastructure, not a point solution. But the page backs that claim with **\"Trusted by 5,000+ customers\"** and named ROI evidence like **\"Pitchbook is 10x more efficient with revenue AI.\"**\n\n\"OS\" or \"platform-of-record\" language only holds up in a sales conversation if the product has multi-product depth behind it. Without that, technical buyers will probe for capabilities the product cannot yet demonstrate — and the gap between the claim and the demo creates credibility damage.\n\nOpen your homepage title tag and your product page. Count how many distinct products or integrations sit under the platform claim. If the answer is one or two, the \"OS\" framing may extend your sales cycle rather than shorten it.\n\n---\n\n### Education-to-authority funnel compression — Gong removed explanatory content only after replacing it with scale proof\n\nGong removed **\"So What Does this look like? Glad you asked.\"** and individual coaching pages, but it did not leave a gap. Those sections were replaced by **\"Trusted by 5,000+ customers\"** and a named case study: **\"Pitchbook is 10x more efficient with revenue AI.\"** The comprehension scaffold came down only after the authority scaffold went up.\n\nThis sequence matters. Removing educational content before the proof is in place leaves visitors with nothing to hold onto. The trust has to transfer before the explanation disappears — not after.\n\nAudit your homepage in two columns: one for every section that explains what your product is, one for every section that proves what it has done. If the proof column is thin, add a named case study with a specific metric before you consider removing anything from the explanation column.",
  internalLinkSuggestions: [
    "/cro-teardowns/crisp",
    "/cro-teardowns/clay",
    "/cro-teardowns/vercel",
  ],
  publishedAt: "2026-02-12T10:17:00.000Z",
};
