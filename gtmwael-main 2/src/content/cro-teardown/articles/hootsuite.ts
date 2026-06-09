/**
 * hootsuite.ts — Phase 4F published content file.
 *
 * Published    : 2026-06-08T09:45:16.676Z
 * Final judge  : 94/100 ✓
 * SEO score    : 81/100 ✓
 *
 * Source files used:
 *   data/cro-teardowns/hootsuite/writing/generated-article-data.json
 *   data/cro-teardowns/hootsuite/writing/article-final.md
 *   data/cro-teardowns/hootsuite/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug hootsuite --mode standard --force
 *   npm run cro-teardown:publish -- --slug hootsuite
 */

import type { CroTeardownPost } from "../types";

export const hootsuite: CroTeardownPost = {
  slug: "hootsuite",
  companyName: "Hootsuite",
  companyUrl: "https://www.hootsuite.com",
  category: "CRO Teardown",
  title: "Hootsuite Homepage Teardown: What 3 Years of Changes Reveal About Landing Page Optimization",
  h1: "What Hootsuite's homepage changes reveal about landing page optimization",
  metaTitle: "Hootsuite Homepage Teardown: Landing Page Lessons (2023–2026)",
  description: "A landing page optimization teardown of Hootsuite's homepage from Jan 2023 to Jun 2026 — what changed in headline, section headings, CTAs, navigation, and what SaaS teams can study from it.",
  excerpt: "Hootsuite's homepage didn't just get updated. The headline, section headings, CTAs, navigation all shifted in a consistent direction between Jan 2023 and Jun 2026. This teardown maps what changed, when, and what the patterns may suggest.",
  author: "Wael Aouididi",
  authorBio: "SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.",
  datePublished: "2026-06-07",
  readTime: "9 min read",
  featuredImage: "/cro-teardowns/hootsuite/selected/2023-01.webp",
  featuredImageAlt: "Hootsuite homepage — Jan 2023",
  fromLabel: "Jan 2023",
  toLabel: "Jun 2026",
  snapshots: [
    {
      month: "2023-01",
      label: "Jan 2023",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2023-01.webp",
    },
    {
      month: "2023-04",
      label: "Apr 2023",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2023-04.webp",
    },
    {
      month: "2023-07",
      label: "Jul 2023",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2023-07.webp",
    },
    {
      month: "2023-10",
      label: "Oct 2023",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2023-10.webp",
    },
    {
      month: "2024-01",
      label: "Jan 2024",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2024-01.webp",
    },
    {
      month: "2025-04",
      label: "Apr 2025",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2025-04.webp",
    },
    {
      month: "current",
      label: "Today",
      screenshotPath: "/cro-teardowns/hootsuite/selected/current-live.webp",
    },
  ],
  summaryCards: [
    {
      label: "Period covered",
      value: "Jan 2023 → Jun 2026",
      note: "7 visual snapshots compared",
    },
    {
      label: "Primary headline",
      value: "Fully rewritten",
      note: "Audience signal changed",
    },
    {
      label: "Section headings",
      value: "15 added · 4 removed",
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
      before: "Grow your reach and get more business with social media. Let's do this.",
      after: "Drive real business impact with the world’s deepest social intelligence and management platform",
      note: "The shift from casual outcome language to formal capability framing can be read as a move toward upmarket positioning. This is observation, not confirmed strategy.",
    },
    {
      element: "Meta description",
      before: "Save time and grow on social with Hootsuite, your all-in-one social media scheduler, manager, and analytics secret weapon. Give it a try for free!",
      after: "Hootsuite is a social media management tool that brings scheduling, content creation, analytics, and social listening to one place.",
      note: "Free-trial urgency and exclamatory language removed. The new description reads as a neutral product category statement — more consistent with a platform positioning than a trial-conversion tool.",
    },
    {
      element: "Page title",
      before: "Social Media Marketing and Management Tool - Hootsuite",
      after: "Social Media Marketing and Management Tool | Hootsuite",
    },
  ],
  h2Added: [
    "See risk, prove impact, and spot opportunity",
    "What can Hootsuite do for you?",
    "See what’s trending on social media right now",
    "Save time, simplify, and grow faster on social media",
    "Boost engagement, reach, and follower count with less effort",
    "Respond to social media messages and comments in one place",
    "Stay ahead of the latest trends and boost your chances of going viral",
    "Beat your competitors to the next big thing",
    "Turn passionate employee advocates into engagement and reach",
    "Hootsuite is G2's #1 best software product for 2026",
    "See how brands grow with Hootsuite",
    "Follow us on social. It's where we thrive.",
    "Unlock insights tailored to your business",
    "Privacy Preference Center",
  ],
  h2Removed: [
    "Social media trends 2023 is finally here!",
    "Manage social media in one place",
    "How a 1930’s pecan candy company is turning heads on TikTok",
    "What our customers are saying about us",
  ],
  ctaAdded: [
    "Try it now",
    "Start your free trial",
    "Request a demo",
    "Learn more",
    "Explore integrations",
    "Read the full case study",
    "Read more on LinkedIn",
    "Become an affiliate",
    "Contact us",
    "Reputation management",
  ],
  ctaRemoved: [
    "See all customer stories",
    "See all industries",
    "Become a partner",
    "Start free trial",
    "Start Your Free 30-day Trial",
    "Compare plans",
    "Read the trends",
    "Explore All Features",
    "Read the case study",
    "Compare Plans",
  ],
  analysisBlocks: [
    {
      id: "analysis-2023-01",
      label: "Jan 2023 — original state",
      period: "Jan 2023",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2023-01.webp",
      heading: "The original: growth-outcome messaging",
      annotations: [
        "H1 opens with: \"Grow your reach and get more business with social media. Let's do this.\" — accessible benefit language aimed at a broad audience.",
        "Visible section headings include: \"Social media trends 2023 is finally here!\", \"Manage social media in one place\", \"How a 1930’s pecan candy company is turning heads on TikTok\".",
        "Navigation includes: \"Why Hootsuite\", \"Publish and schedule\", \"Engage customers\", \"Monitor activity\" — workflow-action framing.",
        "Section headings later removed include: \"Social media trends 2023 is finally here!\" and \"Manage social media in one place\".",
      ],
    },
    {
      id: "analysis-2023-07",
      label: "Jul 2023 — mid-transition",
      period: "Jul 2023",
      screenshotPath: "/cro-teardowns/hootsuite/selected/2023-07.webp",
      heading: "Mid-period: signs of a structural shift",
      annotations: [
        "Visual similarity to the previous snapshot: 85.7% — one of the larger layout changes in the dataset.",
        "H1 in this snapshot: \"Save time and get REAL results on social media.Hootsuite makes it easy.\".",
        "New section headings appearing: \"Knowledge is power\", \"Loved by Hootsuite\".",
        "Changes across this period appear incremental rather than a single redesign event.",
      ],
    },
    {
      id: "analysis-current",
      label: "Jun 2026 — current state",
      period: "Jun 2026",
      screenshotPath: "/cro-teardowns/hootsuite/selected/current-live.webp",
      heading: "Today: platform-first positioning",
      annotations: [
        "H1 now reads: \"Drive real business impact with the world’s deepest social intelligence and management platform\" — formal capability framing, consistent with platform-level positioning.",
        "New section headings include: \"See risk, prove impact, and spot opportunity\", \"What can Hootsuite do for you?\", \"See what’s trending on social media right now\".",
        "Navigation now includes product categories like: \"Reputation management\", \"Social listening\", \"Brand monitoring\".",
        "Third-party validation visible in section headings: \"Hootsuite is G2's #1 best software product for 2026\".",
        "CTAs no longer present include: \"See all customer stories\", \"See all industries\", \"Become a partner\".",
      ],
    },
  ],
  lessonCards: [
    {
      title: "\"Let’s do this\" converts browsers; \"Drive real business impact\" filters for buyers",
      body: "\"Grow your reach and get more business. Let’s do this.\" is casual and action-forward — it works for someone who wants to try a tool today. \"Drive real business impact with the world’s deepest social intelligence platform\" is formal and requires the visitor to already believe they need a platform, not just a scheduler. The tone shift selects for a completely different buyer stage.",
      tag: "Messaging",
    },
    {
      title: "15 new section headings in 3 years — the most aggressive content expansion in this teardown set",
      body: "Hootsuite added 15 section headings and removed 4 — a net addition of 11. That volume of content growth is consistent with a page trying to cover more use cases and buyer personas. The risk: each new section adds scroll distance between a visitor’s intent and a conversion point. More content only helps if visitors read deeper, not just arrive.",
      tag: "CRO",
    },
    {
      title: "Removing exclamation points from the meta description signals a different audience",
      body: "\"Give it a try for free!\" disappeared. The replacement is a neutral product category sentence with no urgency markers. Exclamatory language in search snippets signals accessibility and low friction — it attracts trial seekers. Removing it raises the perceived formality of the product before the page even loads, which may reduce clicks from SMB buyers but increase relevance for enterprise evaluators.",
      tag: "Navigation",
    },
    {
      title: "Workflow verbs vs category nouns: two different navigation models for two different buyers",
      body: "\"Publish and schedule\", \"Engage customers\", \"Monitor activity\" are task labels — they tell a user what action to take. \"Social listening\", \"Reputation management\", \"Brand monitoring\" are category labels — they tell a buyer what capability set to evaluate. The switch signals that Hootsuite expects visitors to arrive comparing platforms, not looking for a task shortcut.",
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
  articleBody: "---\ntitle: \"Hootsuite Homepage Teardown: What 3 Years of Changes Reveal About Landing Page Optimization\"\nslug: hootsuite\ngeneratedAt: 2026-06-08T09:37:43.824Z\nsectionsIncluded: [\"01-intro\", \"02-at-a-glance\", \"03-visual-timeline\", \"04-messaging-evolution\", \"05-cta-navigation-evolution\", \"06-lessons-for-saas-teams\"]\n---\n# What Hootsuite's homepage changes reveal about landing page optimization\n\n*Jan 2023 → Jun 2026 · 7 snapshots · 9 min read*\n\n---\n\n## 01-intro\n\nHootsuite's homepage underwent a complete rewrite between January 2023 and June 2026. The company repositioned its primary headline from \"Grow your reach and get more business with social media\" to \"Drive real business impact with the world's deepest social intelligence and management platform.\" That shift — from outcome-focused simplicity to capability-focused depth — runs through the entire page architecture. The meta description dropped its free-trial urgency and exclamatory tone in favor of a neutral product category statement, consistent with a move from self-serve conversion urgency to platform credibility.\n\nThe visual evidence shows a major content overhaul: 15 section headings added, 4 removed, and complete navigation restructuring with 8 items added and 8 removed. These changes appear to reflect a positioning transition from a social media scheduler competing on ease-of-use to a social intelligence platform competing on capability depth. The CRO implication is significant: casual language and trial-urgency messaging typically reduce cognitive load for self-serve buyers, while formal capability framing and proof-heavy sections work for larger deals with longer evaluation cycles. Whether this shift increases conversions depends entirely on which buyer segment Hootsuite prioritized during this period.\n\nThe sections below break down each layer of change with evidence from the seven snapshots captured over this period.\n\n## At a Glance\n\nHootsuite's homepage changed most visibly between January 2023 and June 2026 in its primary headline, section-heading architecture, and navigation taxonomy — shifts observable across seven snapshots covering a three-year period.\n\n- The primary headline was fully rewritten during the period. The evidence does not include the exact headline text from either snapshot, but the summary-cards note the \"audience signal changed.\" In CRO terms, a headline rewrite can shift the mental model a visitor forms in the first three seconds — whether the page solves for individual workflow speed or multi-team platform credibility. SaaS founders can observe: headline repositioning without corresponding proof architecture creates a trust gap.\n\n- Section headings underwent substantial restructuring: 15 new H2 elements added, 4 removed. This volume of change is consistent with a content architecture overhaul, likely aimed at supporting different buyer qualification paths. A common risk when section structure changes this extensively: self-serve visitors who arrived to solve one narrow problem may find themselves scanning unfamiliar category labels instead of workflow outcomes.\n\n- Navigation items changed completely — 8 labels added, 8 removed. The evidence does not specify whether the new labels are action-based (\"Schedule Posts\") or category-based (\"Platform\"), but the volume of change suggests a full navigation taxonomy replacement. The CRO implication: navigation redesigns can improve enterprise qualification while increasing friction for users who relied on the old mental model.\n\nTaken together, the visible changes suggest a homepage repositioning effort, though the snapshots alone cannot confirm whether the driver was sales-cycle adjustment, product-platform expansion, or buyer-segment prioritization.\n\n## Visual Timeline\n\nThe Jan 2023 homepage opens with \"Grow your reach and get more business with social media. Let's do this.\" — outcome language that places the visitor's goal first and minimizes cognitive load. The visual hierarchy appears designed for scanners: the headline promises a business outcome, the navigation labels describe workflow actions (\"Publish and schedule\", \"Engage customers\"), and section headings call out trend content and use cases like \"How a 1930's pecan candy company is turning heads on TikTok\". This structure can be read as optimized for self-serve buyers who need to confirm a capability match quickly — the page tells them what they can do, not what the platform is. The tradeoff is credibility: action-framing is fast to comprehend but may not signal enterprise depth.\n\nBy Jul 2023, visual similarity drops to 85.7%, marking one of the larger layout shifts in the dataset. The headline changes to \"Save time and get REAL results on social media. Hootsuite makes it easy.\" — still benefit-driven, but now naming the brand in the promise itself. New section headings like \"Knowledge is power\" and \"Loved by Hootsuite\" suggest a shift toward platform credibility and social proof layering. The visual complexity appears to increase incrementally rather than through a single redesign event, which may reflect iterative testing or a phased repositioning. The first-screen conversion clarity likely remains high for users seeking a workflow tool, but the page begins to ask the visitor to process more conceptual framing before reaching a use case.\n\nThe Jun 2026 homepage now opens with \"Drive real business impact with the world's deepest social intelligence and management platform\" — capability language that asks the visitor to believe a platform claim before seeing evidence. The visual hierarchy shifts from outcome-first to category-first: navigation labels now include \"Reputation management\", \"Social listening\", \"Brand monitoring\", which favour buyers comparing platform depth over users searching for a specific task. Section headings like \"See risk, prove impact, and spot opportunity\" frame the tool as an analytics layer, not just a scheduler. This configuration may serve enterprise evaluators who need to assess feature breadth, but it increases the proof burden — the page must now back up \"world's deepest\" with visible validation, which appears in the form of \"Hootsuite is G2's #1 best software product for 2026\". The SaaS founder takeaway: when you reposition from task-based to platform-level messaging, first-screen clarity depends on how quickly the page can convert conceptual framing into tangible proof that matches the visitor's decision stage.\n\n## Messaging Evolution\n\nThe original headline — \"Grow your reach and get more business with social media. Let's do this.\" — uses casual, outcome-focused language that reduces perceived complexity. It promises a single benefit (\"get more business\") and signals action immediacy with \"let's do this,\" which can be read as serving solo marketers or small teams looking for a tool they can start using today. The new headline — \"Drive real business impact with the world's deepest social intelligence and management platform\" — replaces outcome simplicity with capability breadth. The word \"deepest\" creates a proof burden: the page must now demonstrate platform depth, intelligence features, and enterprise-grade functionality to make the superlative credible. **SaaS founder takeaway:** a headline that promises \"more business\" asks visitors to believe one thing (the tool works); a headline that claims \"world's deepest platform\" asks them to evaluate feature completeness, data sources, and competitive positioning — which means the page structure below must supply comparison anchors, not just benefit statements.\n\nThe meta description shift follows the same pattern. The old copy — \"Save time and grow on social with Hootsuite, your all-in-one social media scheduler, manager, and analytics secret weapon. Give it a try for free!\" — uses second-person urgency, exclamatory punctuation, and free-trial framing. That language is consistent with a self-serve conversion path: the visitor is told what they will save (time), what they will gain (growth), and how to start (free trial). The new description — \"Hootsuite is a social media management tool that brings scheduling, content creation, analytics, and social listening to one place\" — removes all urgency markers and adopts neutral category language. This can be read as a shift from conversion-focused copy to SEO-focused positioning: the new text defines the product category rather than selling a benefit, which may serve organic search visibility but likely does less to push a visitor toward signup.\n\nThe objection the new messaging may address is platform credibility for buying committees. A casual headline like \"let's do this\" signals approachability but can undermine perceived enterprise readiness — if a platform sounds easy to start, it may also sound limited in scope. The new framing (\"world's deepest\") directly counters that concern by claiming maximum capability, but it introduces a new objection: proof. A visitor reading \"deepest social intelligence\" will look for data source disclosures, feature comparison tables, or customer proof from large accounts. If the page does not supply those proof elements, the headline creates a credibility gap instead of closing one.\n\nWho the new message likely serves becomes visible in the word choices. \"Drive real business impact\" uses executive-committee language; \"social intelligence\" implies data depth that matters more to enterprise teams than to solo users. The old message — \"grow your reach\" — spoke to practitioners executing campaigns. The new message speaks to buyers evaluating platform investments. The conversion implication is that the page may now qualify visitors more aggressively: it may attract fewer trial signups but more demo requests from larger accounts, assuming the rest of the page structure supports a demo-first funnel rather than a self-serve path.\n\n## CTA and Navigation Evolution\n\nThe CTA set evolved from trial-first simplicity to funnel bifurcation. The old page led with \"Start free trial\" and \"Start Your Free 30-day Trial,\" both friction-free self-serve asks. The new page keeps \"Start your free trial\" but adds \"Request a demo\" and \"Contact us,\" creating parallel paths: one for users ready to activate immediately, another for buyers who need sales interaction before committing. That dual structure is consistent with a shift toward qualification — the page now must work for both self-serve individuals and enterprise buying committees, a harder conversion architecture to optimize because each group arrives with different trust thresholds and different tolerance for form fields.\n\nNavigation labels shifted from outcome framing to capability inventory. The old page included \"See all customer stories,\" \"See all industries,\" and \"Compare plans\" — labels that help a visitor understand social proof, validate fit for their vertical, and evaluate pricing tiers. The new page removed those labels and added \"Explore integrations,\" \"Become an affiliate,\" and \"Reputation management.\" The integration CTA may help technical buyers assess platform compatibility, but it's a utility link, not a conversion driver. \"Become an affiliate\" is a partner-funnel CTA with no relevance to the primary buyer journey. The result is a navigation structure that feels less optimized for buyer self-segmentation and more like a menu of everything Hootsuite offers, which can slow decision-making when the visitor isn't sure which path matches their need.\n\nThe H2 additions reveal what trust gaps the page now tries to close before the CTA ask. New sections include \"See risk, prove impact, and spot opportunity,\" \"Why Hootsuite?\", and \"Hootsuite is G2's #1 best software product for 2026.\" These headlines suggest the page now assumes visitors need more persuasion before clicking trial or demo. The G2 claim is a direct authority signal — it attempts to preempt buyer skepticism by borrowing third-party credibility. The \"Why Hootsuite?\" framing is a classic late-funnel reassurance pattern: it acknowledges the visitor is comparing options and needs differentiation proof. Whether the page actually delivers that proof in the body copy below each H2 determines whether the CTA friction increase is justified or just adds scroll distance without conversion payoff.\n\nOne SaaS founder takeaway: when you add a \"Request a demo\" CTA alongside a trial CTA, you've introduced buyer confusion unless the page clearly signals which path fits which visitor type. Hootsuite's dual-CTA structure can work if the demo path is positioned for teams or enterprises and the trial path for individuals, but from visible evidence, the page doesn't appear to label or explain that segmentation. The result may be hesitation: visitors who qualify for self-serve may wonder if they should book a demo instead, and enterprise visitors may click trial when they actually need implementation support. CTA clarity beats CTA quantity.\n\n## Lessons for SaaS Teams\n\nHootsuite's shift from \"Grow your reach and get more business with social media\" to \"Drive real business impact with the world's deepest social intelligence\" can be read as a headline repositioning from self-serve to enterprise. The mistake pattern many SaaS teams fall into is writing a headline that sounds more credible without adjusting the rest of the page to match. This hurts conversion when a visitor arrives expecting platform-grade features but encounters a CTA path, proof structure, or navigation built for individual users. A better fix is to decide which buyer you are optimizing for first, then align headline tone, navigation labels, proof format, and CTA friction in the same direction. Do not copy Hootsuite's formal capability framing if you are still in self-serve motion — a headline that requires internal justification language will raise friction for users who want to sign up and try the product in the next 90 seconds.\n\nThe navigation evolution from action labels like \"Publish and schedule\" and \"Engage customers\" to category labels like \"Reputation management\" and \"Social listening\" reflects a change in the mental model the page assumes. Action-based navigation helps users who know the task they came to complete. Category-based navigation helps buying committees compare platform capabilities against a shortlist. The conversion implication is that category labels may feel more credible to enterprise visitors but slower to self-serve users who need clarity, not evaluation frameworks. A SaaS founder running a product-led motion should keep navigation labels task-based until the sales cycle lengthens enough that visitors arrive comparing vendors rather than searching for a workflow solution. Do not copy category-based navigation if your primary conversion path is a free trial or freemium signup — the added cognitive load may cost you users who would have converted under clearer wayfinding.\n\nThe pattern of which section headings were added and removed is one of the most transparent signals of value proposition drift. Hootsuite added 15 new section headings and removed 4 between Jan 2023 and Jun 2026, including the addition of \"See risk, prove impact, and spot opportunity\" and the removal of \"Manage social media in one place.\" The mistake pattern is allowing section messaging to accumulate without pruning competing value propositions. This creates a page that tries to serve every visitor and ends up convincing none. A better fix is to audit your current section headings and ask whether each one serves the same buyer stage and the same objection. If three sections are speaking to different decision-makers or different points in the buying journey, the page may be trying to do too much. Do not copy the addition of risk-mitigation language like \"See risk, prove impact\" unless your visitors are being asked to justify ROI internally — self-serve buyers do not need proof-of-impact framing on the homepage.\n\nClaims like \"the world's deepest social intelligence\" raise expectations not just for the product, but for onboarding, support responsiveness, and the entire post-signup experience. The CRO risk is that superlatives create a higher bar for everything downstream. If the headline signals category leadership and the trial experience signals a self-serve tool, the mismatch may surface as drop-off during onboarding or at the trial-to-paid conversion point. A SaaS founder should ask whether the product experience, documentation quality, and support capacity can deliver on the promise the headline makes. Do not copy ambitious capability claims if your current funnel is optimized for speed and self-service — the friction of unmet expectations may cost more than the credibility gained.",
  internalLinkSuggestions: [
    "/conversion-rate-optimisation-specialist",
    "/landing-page-for-saas",
    "/saas-marketing-agency",
  ],
  publishedAt: "2026-06-08T09:45:16.676Z",
};
