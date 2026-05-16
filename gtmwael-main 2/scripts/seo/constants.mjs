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
  "/case-study/zembra",
  "/case-study/pubrella",
  "/services/landing-page",
  "/saas-marketing-agency",
  "/services/cold-email",
  "/services/meta-ads",
  "/book",
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
      { label: "Review SaaS landing page conversion work", path: "/services/landing-page" },
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
      { label: "Review landing page conversion service", path: "/services/landing-page" },
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
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Meta ads service", path: "/services/meta-ads" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  "/services/cold-email": {
    intro: "A cold email service for B2B SaaS teams that need cleaner targeting, stronger messaging, deliverability basics, and qualified conversations without spam.",
    sections: [
      {
        heading: "What the cold email system covers",
        body: "The system includes ICP segmentation, list logic, offer framing, sequence writing, deliverability setup, testing, and weekly iteration on the data.",
      },
      {
        heading: "Relevant proof",
        body: "Shipzzer used the approach to reach a 50% open rate and 7% reply rate, while Zembra used outbound as part of a broader rebrand and GTM alignment project.",
      },
    ],
  },
  "/services/meta-ads": {
    intro: "Meta ads strategy for SaaS and B2B offers where creative testing, tracking, retargeting, and buyer signals matter more than broad campaign volume.",
    sections: [
      {
        heading: "Campaign foundations",
        body: "The service focuses on offer clarity, creative angles, tracking quality, audience structure, landing page fit, and disciplined campaign decisions.",
      },
      {
        heading: "When this service fits",
        body: "Meta ads are most useful when the offer has a clear promise, a conversion path, and enough creative variation to test what the market responds to.",
      },
    ],
  },
  "/services/landing-page": {
    intro: "A SaaS landing page conversion service for teams that have traffic or product value but need sharper messaging, proof, structure, and CTA hierarchy.",
    sections: [
      {
        heading: "Conversion work included",
        body: "The work covers hero message clarity, offer positioning, proof placement, objections, page flow, form friction, and stronger calls to action.",
      },
      {
        heading: "Relevant proof",
        body: "Pubrella focused on conversion rate improvement, Screenplay focused on guided product flow, and Shipzzer focused on buyer-intent page structure.",
      },
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
      { label: "SaaS landing page strategy", path: "/services/landing-page" },
      { label: "Cold email for SaaS", path: "/services/cold-email" },
      { label: "Meta Ads for SaaS", path: "/services/meta-ads" },
      { label: "Book a 20-min GTM Audit", path: "/book" },
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
      { label: "Review landing page conversion service", path: "/services/landing-page" },
      { label: "View more SaaS case studies", path: "/case-studies" },
    ],
  },
};
