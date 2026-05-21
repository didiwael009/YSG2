import path from "node:path";
import { fileURLToPath } from "node:url";

// Shared filesystem locations and static route configuration for the SEO build.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = path.resolve(__dirname, "../..");
export const distDir = path.join(projectRoot, "dist");
export const distAssetsDir = path.join(distDir, "assets");
export const sourceAssetsDir = path.join(projectRoot, "src/assets");
export const seoSourcePath = path.join(projectRoot, "src/lib/seo.ts");
export const blogIndexPath = path.join(projectRoot, "src/content/blog/index.ts");
export const blogArticlesDir = path.join(projectRoot, "src/content/blog/articles");

export const prerenderRoutePaths = [
  "/",
  "/blog",
  "/case-studies",
  "/case-study/shipzzer",
  "/creative",
  "/resume",
  "/case-study/screenplay",
  "/case-study/bottlenexus",
  "/case-study/growapp",
  "/case-study/ic-center",
  "/case-study/write-your-book",
  "/case-study/zembra",
  "/case-study/pubrella",
  "/pricing",
  "/saas-marketing-agency",
  "/cold-email-for-saas",
  "/landing-page-for-saas",
  "/conversion-rate-optimisation-specialist",
  "/meta-ads-for-saas",
  "/book",
  "/saas-marketing-plan",
  "/optimize-saas-landing-page",
  "/google-ads-vs-meta-ads-saas",
  "/saas-cold-email-strategy",
  "/b2b-saas-marketing-strategy",
  "/landing-page-for-lead-generation",
  "/linkedin-outreach-for-saas",
];

export const routeContent = {
  "/": {
    intro: "Your SaaS Growth helps B2B founders turn unclear offers into GTM systems that can be understood, trusted, and acted on.",
    sections: [
      {
        heading: "Growth systems for SaaS founders",
        body: "The work connects positioning, landing pages, cold email, SEO, Meta ads, and creative direction so acquisition channels reinforce one message instead of operating as disconnected tactics.",
      },
      {
        heading: "Proof across real SaaS projects",
        body: "The portfolio includes freight forwarding SaaS, AI workflow products, Reviews API positioning, content platforms, ecommerce infrastructure, and conversion-focused landing pages.",
      },
    ],
    links: [
      { label: "Explore SaaS growth case studies", path: "/case-studies" },
      { label: "Review SaaS landing page conversion work", path: "/landing-page-for-saas" },
      { label: "Book a 20-minute SaaS GTM audit", path: "/book" },
    ],
  },
  "/case-studies": {
    intro: "A portfolio of SaaS growth case studies showing how clearer positioning, funnel structure, SEO, outbound, and conversion work translate into stronger demand.",
    sections: [
      {
        heading: "Featured SaaS outcomes",
        body: "Shipzzer shows SEO and cold email execution, Screenplay shows funnel clarity, Zembra shows rebrand and outbound alignment, and Pubrella shows landing page CRO.",
      },
      {
        heading: "How the work is evaluated",
        body: "Each case study explains the starting problem, what was rebuilt, visual proof where available, and the business or funnel outcome that made the work valuable.",
      },
    ],
  },
  "/blog": {
    intro: "Practical SaaS growth articles on landing pages, paid ads strategy, conversion optimization, cold email, and GTM execution.",
    sections: [
      {
        heading: "Latest SaaS growth article",
        body: "The first article explains why Google Ads and Meta Ads traffic should not usually be sent to the same SaaS landing page, because the visitor intent and trust path are different.",
      },
      {
        heading: "Topics covered",
        body: "The blog focuses on SaaS landing pages, paid traffic, conversion optimization, demand creation, demand capture, and practical founder decisions before scaling acquisition.",
      },
    ],
    links: [
      { label: "Read the SaaS landing page article", path: "/blog/saas-landing-page-google-meta-ads" },
      { label: "Review landing page conversion service", path: "/landing-page-for-saas" },
      { label: "Explore SaaS case studies", path: "/case-studies" },
    ],
  },
  "/blog/saas-landing-page-google-meta-ads": {
    intro: "Google Ads captures demand. Meta Ads creates demand. SaaS founders should match the landing page to the visitor's intent instead of sending both channels to one generic page.",
    sections: [
      {
        heading: "Google Ads captures demand",
        body: "Search visitors already know they have a problem and are actively comparing solutions, so the page should confirm intent quickly, show proof, and make the next step easy.",
      },
      {
        heading: "Meta Ads creates demand",
        body: "Social visitors are interrupted while scrolling, so the page needs more context, problem education, proof, objection handling, and often a softer call to action.",
      },
      {
        heading: "Founder takeaway",
        body: "A paid ads strategy does not end at the click. The landing page has to finish the job by matching the visitor's state of mind before more ad spend is added.",
      },
    ],
    links: [
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  "/cold-email-for-saas": {
    intro: "A cold email system for B2B SaaS founders — domain setup, deliverability, ICP targeting, offer framing, personalisation, sequences, and follow-up that generate qualified pipeline.",
    sections: [
      {
        heading: "Why SaaS cold email fails",
        body: "The channel works. The execution is usually broken in one of five places: weak targeting, broken infrastructure, vague offer angle, no real personalisation, and no follow-up logic. Fix all five and cold email becomes a predictable pipeline channel.",
      },
      {
        heading: "What I handle end to end",
        body: "Domain setup and DNS configuration, inbox warm-up, ICP definition and list building, personalisation frameworks, three-to-five email sequences with follow-up logic that adds a new angle rather than just checking in.",
      },
    ],
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
      { label: "Book a 20-min Cold Email Diagnosis", path: "/book" },
    ],
  },
  "/landing-page-for-saas": {
    intro: "A SaaS landing page strategy and CRO service for B2B founders whose page is getting traffic but not converting demos — covering hero clarity, proof, CTA hierarchy, objection handling, and mobile friction.",
    sections: [
      {
        heading: "Why SaaS landing pages fail",
        body: "The landing page is the conversion point for every channel. Ads send traffic there. Cold email sends replies there. SEO sends organic visitors there. If the page does not convert, every channel becomes more expensive and less predictable.",
      },
      {
        heading: "What gets fixed",
        body: "Hero clarity so the first scroll answers who this is for and why it matters. CTA hierarchy that earns the demo request before asking for it. Proof that earns trust at the right moments. Objection handling woven into the right positions. Mobile friction identified and removed.",
      },
    ],
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Book a 20-min SaaS Landing Page Diagnosis", path: "/book" },
    ],
  },
  "/conversion-rate-optimisation-specialist": {
    intro: "A SaaS conversion rate optimisation service for B2B founders with traffic but weak demos — auditing messaging clarity, proof, CTA structure, funnel friction, and analytics visibility across the full conversion path.",
    sections: [
      {
        heading: "Why SaaS conversion problems are not button-colour problems",
        body: "SaaS buyers do not impulse-buy. The conversion problem in B2B SaaS is almost always a trust problem — visitors need to understand the offer fast, see proof that earns belief, and feel safe taking the next step.",
      },
      {
        heading: "What the audit covers",
        body: "Full conversion path review: homepage, landing pages, demo flow, confirmation, and any paid or outbound traffic landing pages. A prioritised fix list — not a 40-page report. Execution included.",
      },
    ],
    links: [
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "Book a 20-min GTM Audit", path: "/book" },
    ],
  },
  "/saas-marketing-agency": {
    intro: "A SaaS marketing agency alternative for B2B founders who need positioning, landing pages, CRO, ads, outreach, and analytics fixed as one growth system.",
    sections: [
      {
        heading: "Fix trust before traffic",
        body: "Most B2B SaaS founders do not need a bigger marketing team first. They need a sharper message, a clearer landing page, a stronger offer, and a conversion path that does not leak trust before the demo call.",
      },
      {
        heading: "Connected SaaS GTM execution",
        body: "The work connects positioning, landing pages, CRO, analytics, cold email, paid ads, and the full path from first visit to qualified pipeline.",
      },
    ],
    links: [
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
      { label: "Book a 20-min GTM Audit", path: "/book" },
    ],
  },
  "/meta-ads-for-saas": {
    intro: "I help B2B SaaS founders run Meta Ads that convert — with the right offer angle, creative, landing page, tracking, and retargeting path built as one connected system.",
    sections: [
      {
        heading: "Why SaaS Meta Ads fail",
        body: "Most SaaS Meta Ads fail because founders blame the platform, the audience, or the budget — when the real problem is earlier. The offer angle is wrong for cold traffic. The creative does not earn attention. The landing page is not built for paid traffic. Tracking is incomplete. There is no retargeting path. Fix all five and the channel works.",
      },
      {
        heading: "What I fix before scaling spend",
        body: "Offer angle for cold traffic, creative testing with cost-per-result decisions, landing page alignment to the exact ad angle, pixel and CAPI tracking configuration, and a structured retargeting path from awareness to conversion — connected to the full GTM system, not running in isolation.",
      },
      {
        heading: "Proof",
        body: "GrowApp: CPL dropped from £30+ to £3–7, 847 trial requests in 6 months. DTC Skincare: ROAS went from 1.2 to 3.1, CPA dropped from £42 to £23. Zembra: aligned paid and outbound with repositioned messaging contributing to 4X revenue growth.",
      },
    ],
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "Google Ads vs Meta Ads for SaaS", path: "/google-ads-vs-meta-ads-saas" },
      { label: "Book a 15-minute Meta Ads diagnosis", path: "/book" },
    ],
  },
  "/saas-marketing-plan": {
    intro: "A practical SaaS marketing plan framework for B2B founders covering positioning, acquisition channels, landing pages, cold email, paid ads, and conversion in one connected system.",
    sections: [
      {
        heading: "Why most SaaS marketing plans fail",
        body: "The most common mistake is treating each channel as a separate plan. SEO is disconnected from the landing page. Cold email is disconnected from positioning. Ads are disconnected from conversion. A working SaaS marketing plan connects all channels around one clear offer and one clear buyer.",
      },
      {
        heading: "The order that works for early-stage B2B SaaS",
        body: "Start with positioning clarity. Then fix the landing page. Then add one acquisition channel at a time — either cold email or paid ads first. Once one channel converts reliably, layer the second. SEO content supports both.",
      },
    ],
    links: [
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
    ],
  },
  "/optimize-saas-landing-page": {
    intro: "A practical guide to SaaS landing page optimisation — hero clarity, proof placement, CTA hierarchy, mobile friction removal, and conversion path fixes that increase demo bookings.",
    sections: [
      {
        heading: "Start with the hero section",
        body: "If the first scroll does not answer who this is for, what problem it solves, and what the next step is, everything below it is wasted. The hero is the highest-leverage section for conversion improvement.",
      },
      {
        heading: "Proof, CTA, and friction",
        body: "Place proof near the decision point — not just at the bottom. Match the CTA label to the buyer's actual next step. Remove form fields that exist for your CRM convenience, not for the user's conversion journey.",
      },
    ],
    links: [
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
    ],
  },
  "/google-ads-vs-meta-ads-saas": {
    intro: "Google Ads captures demand. Meta Ads creates it. For B2B SaaS founders choosing between paid channels, the decision depends on where your buyers are in the awareness journey.",
    sections: [
      {
        heading: "Google Ads for SaaS",
        body: "Search captures buyers who already know they have a problem and are comparing solutions. Landing pages for Google traffic can move faster to the CTA because the visitor has pre-qualified intent.",
      },
      {
        heading: "Meta Ads for SaaS",
        body: "Social reaches buyers before they are actively searching. The landing page needs more context, education, and softer proof before asking for a demo. Retargeting is where Meta delivers most of its value for SaaS.",
      },
    ],
    links: [
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
    ],
  },
  "/saas-cold-email-strategy": {
    intro: "A complete SaaS cold email strategy guide — ICP targeting, domain setup, deliverability, offer framing, sequences, and follow-up logic that generates qualified replies, not noise.",
    sections: [
      {
        heading: "Targeting is where SaaS cold email wins or loses",
        body: "The biggest cold email mistake is targeting job titles instead of buyers with a specific, time-sensitive problem. A tight ICP with a specific trigger generates 10x the reply rate of a broad list with generic copy.",
      },
      {
        heading: "Infrastructure and deliverability come before the first send",
        body: "Sending from the primary domain without warm-up or proper DNS is the fastest way to destroy deliverability. A secondary sending domain, configured and warmed up correctly, keeps outbound separate from transactional email.",
      },
    ],
    links: [
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
    ],
  },
  "/b2b-saas-marketing-strategy": {
    intro: "A B2B SaaS marketing strategy framework for founders — positioning, demand creation, demand capture, conversion, and the order in which to build the GTM system for early pipeline.",
    sections: [
      {
        heading: "Fix positioning before choosing channels",
        body: "Most B2B SaaS marketing strategy problems start before the channels. The offer is unclear, the ICP is too broad, and the landing page cannot convert any traffic reliably. Channel selection before these are fixed just burns budget faster.",
      },
      {
        heading: "Demand creation vs demand capture",
        body: "Cold email and Meta Ads create demand by reaching buyers before they are searching. Google Ads and SEO capture demand from buyers who are already looking. A working B2B SaaS marketing strategy uses both layers in sequence, not simultaneously.",
      },
    ],
    links: [
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
    ],
  },
  "/landing-page-for-lead-generation": {
    intro: "How to build a SaaS landing page for lead generation — offer clarity, trust signals, form friction, and the conversion path structure that qualifies leads before the demo call.",
    sections: [
      {
        heading: "The difference between a lead generation page and a homepage",
        body: "A homepage serves many audiences. A lead generation landing page serves one: a buyer from a specific channel with a specific intent. Every element on the page should narrow focus, not broaden it.",
      },
      {
        heading: "What qualifies the lead before the form",
        body: "The best lead generation pages do the qualification work in the copy — before the form appears. If the offer clarity, proof, and CTA copy are right, you get fewer form submissions but more qualified ones.",
      },
    ],
    links: [
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
    ],
  },
  "/linkedin-outreach-for-saas": {
    intro: "LinkedIn outreach strategy for B2B SaaS founders — profile positioning, connection messaging, content as warm-up, and how to run LinkedIn alongside cold email for more qualified conversations.",
    sections: [
      {
        heading: "LinkedIn works as a trust layer, not a volume channel",
        body: "LinkedIn outreach at high volume produces low reply rates and can damage your profile. The channel works best as a targeted trust-builder: reach 20-50 ideal buyers per week, warm them with content, then connect with a relevant message.",
      },
      {
        heading: "Running LinkedIn and cold email together",
        body: "The same buyer approached by email and LinkedIn with a consistent message responds at higher rates than either channel alone. LinkedIn view creates familiarity. Email provides the direct ask. Together they work better than separately.",
      },
    ],
    links: [
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
    ],
  },
  "/creative/community-management": {
    intro: "Community management and social content for SaaS brands that need stronger credibility, founder visibility, and useful audience engagement.",
    sections: [
      {
        heading: "What the content system supports",
        body: "The service turns product updates, customer education, founder points of view, and social proof into repeatable content that supports demand creation across LinkedIn, social channels, and community touchpoints.",
      },
      {
        heading: "Creative examples",
        body: "The portfolio includes logistics SaaS content, AI and healthtech visual storytelling, Pubrella creatives, and product education for foodtech teams that need clearer trust signals.",
      },
    ],
    links: [
      { label: "View the creative folio", path: "/creative" },
      { label: "Explore SaaS growth case studies", path: "/case-studies" },
    ],
  },
  "/pricing": {
    intro: "Pricing and offers for SaaS growth work across GTM strategy, landing pages, cold email, Meta ads, and conversion-focused execution.",
    sections: [
      {
        heading: "How the offers are structured",
        body: "The service packages are designed around practical execution: diagnosing the current funnel, fixing the highest-leverage issues, and building repeatable acquisition systems that a founder can keep using after the engagement.",
      },
      {
        heading: "Best fit",
        body: "The work fits SaaS founders who need hands-on growth help across positioning, acquisition, conversion, and go-to-market execution instead of disconnected one-off marketing tasks.",
      },
    ],
    links: [
      { label: "Compare relevant case studies", path: "/case-studies" },
      { label: "Book a GTM audit before choosing a package", path: "/book" },
    ],
  },
  "/creative": {
    intro: "A creative folio of SaaS landing pages, ad creatives, social content, videos, and visual systems built to support growth and conversion.",
    sections: [
      {
        heading: "Landing page and brand examples",
        body: "The folio includes work for Pubrella, BottleNexus, Zembra, Clarrio, Shipzzer, and other products where visual clarity supports buyer understanding.",
      },
      {
        heading: "Creative with a conversion role",
        body: "The visual work is treated as part of the funnel: it must explain the offer faster, build trust, and make the next action easier.",
      },
    ],
  },
  "/resume": {
    intro: "Wael Aouididi's resume as a SaaS founder and GTM strategist focused on positioning, funnels, acquisition, and conversion.",
    sections: [
      {
        heading: "Relevant experience",
        body: "The background combines SaaS founder experience with hands-on work across SEO, landing pages, cold email, Meta ads, creative direction, analytics, and conversion-focused GTM execution.",
      },
      {
        heading: "How this supports client work",
        body: "The portfolio reflects practical execution from someone who has built products, worked with founders, and understands the pressure behind go-to-market decisions, product clarity, and sales pipeline.",
      },
    ],
    links: [
      { label: "View SaaS growth case studies", path: "/case-studies" },
      { label: "Book a strategy call", path: "/book" },
    ],
  },
  "/book": {
    intro: "Book a 20-minute SaaS GTM audit to identify practical fixes for positioning, acquisition, landing page conversion, or outbound performance.",
    sections: [
      {
        heading: "What the audit is for",
        body: "The call is designed to find the highest-leverage problems in the current growth system and turn them into actionable next steps.",
      },
      {
        heading: "Useful topics to review",
        body: "Common audit topics include unclear positioning, weak landing page structure, cold email underperformance, paid traffic issues, and missing proof.",
      },
    ],
  },
  "/case-study/shipzzer": {
    intro: "Shipzzer is a freight forwarding SaaS case study covering SEO architecture, buyer-intent positioning, landing page structure, and cold email execution.",
    sections: [
      {
        heading: "The challenge",
        body: "The product had operational value but the website and demand system did not clearly communicate that value to container depot buyers or search engines.",
      },
      {
        heading: "The outcome",
        body: "The work produced Top 3 Google rankings for target keywords, a 50% cold email open rate, a 7% reply rate, and clearer GTM messaging.",
      },
    ],
  },
  "/case-study/screenplay": {
    intro: "Screenplay Performance Studio is a product funnel case study about turning a confusing AI audio tool into a guided upload-to-export workflow.",
    sections: [
      {
        heading: "The challenge",
        body: "Users could not immediately understand where to start, what the product would do, or why the payment step appeared before value was clear.",
      },
      {
        heading: "The outcome",
        body: "The product story shifted from generic AI audio generation to a guided screenplay performance workflow with clearer steps and better value perception.",
      },
    ],
  },
  "/case-study/zembra": {
    intro: "Zembra is a Reviews API case study covering SaaS rebrand, website rebuild, outbound email, and GTM messaging for AI and data buyers.",
    sections: [
      {
        heading: "The challenge",
        body: "The product scraped reviews from many platforms, but the messaging sounded like a technical scraping API instead of a data intelligence platform.",
      },
      {
        heading: "The outcome",
        body: "The rebrand and outbound revamp aligned positioning, messaging, website, and acquisition around clearer buyer value, contributing to 4x revenue growth.",
      },
    ],
  },
  "/case-study/pubrella": {
    intro: "Pubrella is a landing page CRO case study focused on positioning clarity, trust signals, friction removal, and a stronger conversion path.",
    sections: [
      {
        heading: "The challenge",
        body: "The product had value, but visitors were not understanding the offer quickly enough and the page lacked a focused path to signup.",
      },
      {
        heading: "The outcome",
        body: "The landing page conversion system improved clarity, reduced hesitation, strengthened proof, and helped produce a 3x conversion lift.",
      },
    ],
  },
  "/case-study/write-your-book": {
    intro: "Write Your Book is a Meta ads and funnel case study focused on offer angles, creative testing, and stronger conversion economics.",
    sections: [
      {
        heading: "The challenge",
        body: "The project needed clearer ad angles and a funnel message that could attract serious writers while controlling cost per lead and keeping the offer credible.",
      },
      {
        heading: "The outcome",
        body: "The campaign work clarified the offer, tested creative directions, and identified stronger economics for paid acquisition through more focused messages and visual angles.",
      },
    ],
  },
  "/case-study/growapp": {
    intro: "Growapp is a SaaS Meta ads case study covering trial offer positioning, tracking, campaign structure, and lower lead costs.",
    sections: [
      {
        heading: "The challenge",
        body: "The campaign needed a clearer trial offer, reliable tracking, and sharper creative tests before scaling budget across Meta ads and related acquisition experiments.",
      },
      {
        heading: "The outcome",
        body: "The work improved campaign structure, clarified the offer, and supported lower cost-per-lead ranges through testing, iteration, and cleaner campaign decisions.",
      },
    ],
  },
  "/case-study/bottlenexus": {
    intro: "BottleNexus is a SaaS content and social proof case study for an alcohol DTC technology platform.",
    sections: [
      {
        heading: "The challenge",
        body: "The product needed stronger buyer education, clearer brand trust, and content that made the marketplace technology easier for beverage brands and buyers to understand.",
      },
      {
        heading: "The outcome",
        body: "The work supported a clearer GTM narrative, visual trust, and useful content assets for buyer education, brand credibility, and go-to-market communication.",
      },
    ],
    links: [
      { label: "View the full case study portfolio", path: "/case-studies" },
      { label: "Explore creative folio examples", path: "/creative" },
    ],
  },
  "/case-study/ic-center": {
    intro: "IC Center is a landing page case study focused on offer clarity, page structure, and conversion-ready positioning.",
    sections: [
      {
        heading: "The challenge",
        body: "The page needed a clearer hierarchy so visitors could quickly understand the offer, trust the message, and move toward the next action without extra explanation.",
      },
      {
        heading: "The outcome",
        body: "The landing page work clarified the offer, strengthened page flow, and created a more conversion-ready structure with clearer sections and stronger action paths.",
      },
    ],
    links: [
      { label: "Review landing page conversion service", path: "/landing-page-for-saas" },
      { label: "View more SaaS case studies", path: "/case-studies" },
    ],
  },
};
