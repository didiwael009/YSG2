import { blogPosts, getBlogPostByPath } from "./blog";

export const SITE_URL = "https://www.yoursaasgrowth.com";
export const BRAND_NAME = "Your SaaS Growth";
export const AUTHOR_NAME = "Wael Aouididi";
export const DEFAULT_OG_IMAGE = "/og-default.png";

export type SeoRoute = {
  path: string;
  title: string;
  socialTitle?: string;
  description: string;
  type: "website" | "service" | "case-study" | "portfolio" | "profile" | "booking" | "blog" | "article";
  priority: number;
  changefreq: "weekly" | "monthly";
  image?: string;
  breadcrumbs?: { name: string; path: string }[];
  excerpt?: string;
  links?: { label: string; path: string }[];
  datePublished?: string;
  dateModified?: string;
  faq?: { question: string; answer: string }[];
  schemaType?: "Service";
  serviceTypeName?: string;
};

export const seoRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "SaaS GTM Strategist for B2B Growth | Your SaaS Growth",
    description: "B2B SaaS growth systems by Wael Aouididi: positioning, landing pages, cold email, SEO, Meta ads, and GTM execution.",
    type: "website",
    priority: 1,
    changefreq: "weekly",
    image: "/hero-portrait.webp",
    excerpt: "A conversion-focused SaaS growth portfolio for founders who need clearer positioning, stronger acquisition, and better conversion.",
    links: [
      { label: "SaaS growth case studies", path: "/case-studies" },
      { label: "SaaS growth blog", path: "/blog" },
      { label: "Cold email service", path: "/services/cold-email" },
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Book a GTM audit", path: "/book" },
    ],
  },
  {
    path: "/case-studies",
    title: "SaaS Growth Case Studies | Your SaaS Growth",
    description: "Explore SaaS growth case studies covering rebrands, landing page CRO, cold email systems, SEO architecture, and full GTM rebuilds.",
    type: "portfolio",
    priority: 0.9,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }],
    links: [
      { label: "Shipzzer SEO and cold email case study", path: "/case-study/shipzzer" },
      { label: "Screenplay product funnel case study", path: "/case-study/screenplay" },
      { label: "Zembra rebrand case study", path: "/case-study/zembra" },
      { label: "Pubrella CRO case study", path: "/case-study/pubrella" },
    ],
  },
  {
    path: "/blog",
    title: "SaaS Growth Blog | Your SaaS Growth",
    description: "Practical SaaS growth articles on landing pages, paid ads strategy, conversion optimization, cold email, and GTM execution.",
    type: "blog",
    priority: 0.8,
    changefreq: "weekly",
    breadcrumbs: [{ name: "Blog", path: "/blog" }],
    links: [
      { label: "SaaS landing page article", path: "/blog/saas-landing-page-google-meta-ads" },
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Meta ads service", path: "/services/meta-ads" },
    ],
  },
  {
    path: "/services/cold-email",
    title: "Cold Email Engine for B2B SaaS | Your SaaS Growth",
    description: "Build a B2B SaaS cold email system with ICP segmentation, deliverability, message testing, and qualified pipeline generation.",
    type: "service",
    priority: 0.85,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Services", path: "/" }, { name: "Cold Email", path: "/services/cold-email" }],
    links: [
      { label: "Shipzzer cold email case study", path: "/case-study/shipzzer" },
      { label: "Zembra outbound revamp case study", path: "/case-study/zembra" },
      { label: "Book a cold email audit", path: "/book" },
    ],
  },
  {
    path: "/services/meta-ads",
    title: "Meta Ads for SaaS Growth | Your SaaS Growth",
    description: "Meta ads strategy for SaaS and B2B offers: tracking, buyer signals, creative testing, retargeting, and CPA-focused optimization.",
    type: "service",
    priority: 0.8,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Services", path: "/" }, { name: "Meta Ads", path: "/services/meta-ads" }],
    links: [
      { label: "Growapp Meta ads case study", path: "/case-study/growapp" },
      { label: "Download the Meta ads playbook", path: "/wael-growth-playbook-2026.pdf" },
    ],
  },
  {
    path: "/services/landing-page",
    title: "SaaS Landing Page Conversion Service | Your SaaS Growth",
    description: "Improve SaaS landing page conversion with sharper positioning, clearer page structure, stronger proof, and CTA hierarchy.",
    type: "service",
    priority: 0.85,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Services", path: "/" }, { name: "Landing Page Conversion", path: "/services/landing-page" }],
    links: [
      { label: "Pubrella landing page CRO case study", path: "/case-study/pubrella" },
      { label: "Screenplay funnel case study", path: "/case-study/screenplay" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  {
    path: "/saas-marketing-agency",
    title: "SaaS Marketing Agency Alternative for B2B Founders | YSG",
    description: "I help B2B SaaS founders fix positioning, landing pages, CRO, ads, and outreach — so traffic turns into qualified pipeline.",
    socialTitle: "SaaS Marketing Agency Alternative for B2B Founders",
    type: "service",
    schemaType: "Service",
    serviceTypeName: "SaaS GTM Strategy for B2B Founders",
    priority: 0.9,
    changefreq: "monthly",
    image: "/saas-marketing-agency-alternative-wael-aouididi.webp",
    datePublished: "2026-05-16",
    dateModified: "2026-05-16",
    breadcrumbs: [{ name: "SaaS Marketing Agency Alternative", path: "/saas-marketing-agency" }],
    excerpt: "A SaaS marketing agency alternative for B2B founders who need positioning, landing pages, CRO, ads, outreach, and analytics fixed as one growth system.",
    links: [
      { label: "SaaS landing page strategy", path: "/landing-page-for-saas" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Conversion rate optimisation", path: "/conversion-rate-optimisation-specialist" },
      { label: "SaaS growth case studies", path: "/case-studies" },
      { label: "Book a 20-min GTM Audit", path: "/book" },
    ],
    faq: [
      {
        question: "What does a SaaS marketing agency do?",
        answer:
          "A SaaS marketing agency typically helps software companies with channels like SEO, paid ads, content, email, CRO, and demand generation. The problem is that many agencies treat these as separate services. For early-stage SaaS companies, the bigger need is often a connected GTM system — positioning, landing pages, conversion path, analytics, and acquisition working together.",
      },
      {
        question: "Are you a SaaS marketing agency?",
        answer:
          "Not in the traditional sense. I work more like a fractional SaaS growth lead. I help founders diagnose what is blocking growth, fix the core conversion assets, and connect GTM execution across landing pages, CRO, ads, outreach, SEO content, and analytics.",
      },
      {
        question: "When should a SaaS founder hire a marketing agency?",
        answer:
          "You should hire a SaaS marketing agency when you already have clear positioning, a proven offer, working conversion paths, reliable tracking, and enough budget to scale execution. If those pieces are not clear yet, you likely need a GTM and conversion diagnosis first.",
      },
      {
        question: "What should I fix before spending more on SaaS marketing services?",
        answer:
          "Start with positioning, landing page clarity, CTA hierarchy, proof, analytics, and conversion friction. If these are weak, more traffic usually creates more waste — not more pipeline.",
      },
      {
        question: "Do you offer SaaS marketing services?",
        answer:
          "Yes. I help with SaaS positioning, GTM strategy, landing pages, CRO, Meta Ads, cold email, LinkedIn outreach, analytics, and SEO content as part of a wider growth system.",
      },
      {
        question: "Do you help with SEO for SaaS?",
        answer:
          "Yes, but SEO is not a standalone service. I use it as part of a wider SaaS growth system — to capture intent and support trust and pipeline, not just rankings.",
      },
      {
        question: "Do you help with paid ads?",
        answer:
          "Yes. I help with Meta Ads and paid acquisition strategy, especially where ads need better landing pages, stronger offers, clearer tracking, and better conversion paths.",
      },
      {
        question: "Do you help with cold email?",
        answer:
          "Yes. I help with the full cold email process: targeting, domain setup, deliverability, personalisation, sequences, follow-up copy, and testing.",
      },
    ],
  },
  {
    path: "/cold-email-for-saas",
    title: "Cold Email for SaaS: Outreach & Pipeline System | YSG",
    socialTitle: "Cold Email for SaaS: Outreach Strategy That Supports Pipeline",
    description: "I build cold email systems for B2B SaaS founders — targeting, infrastructure, offer angle, sequences, and follow-up that generate replies.",
    type: "service",
    schemaType: "Service",
    serviceTypeName: "Cold Email Outreach for B2B SaaS",
    priority: 0.9,
    changefreq: "monthly",
    image: "/cold-email-for-saas-outreach-strategy-wael-aouididi.webp",
    datePublished: "2026-05-16",
    dateModified: "2026-05-16",
    breadcrumbs: [{ name: "Cold Email for SaaS", path: "/cold-email-for-saas" }],
    excerpt: "Most SaaS cold email fails before the first send. I fix targeting, deliverability, offer clarity, and follow-up so outreach produces real pipeline.",
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "SaaS conversion rate optimisation", path: "/conversion-rate-optimisation-specialist" },
      { label: "Book a 20-min Cold Email Diagnosis", path: "/book" },
    ],
    faq: [
      {
        question: "What is cold email for SaaS?",
        answer: "Cold email for SaaS is outbound email outreach sent to potential buyers who have not previously engaged with your product. Done correctly, it is a direct, scalable way to reach your ideal customer profile and move qualified prospects toward a demo or trial. Done incorrectly, it damages sender reputation, produces no replies, and convinces founders the channel does not work.",
      },
      {
        question: "Why is my SaaS cold email going to spam?",
        answer: "The most common causes are sending from a primary domain without proper DNS setup, skipping inbox warm-up on new domains, sending too many emails too quickly, high bounce rates from unverified lists, and spam complaint rates above acceptable thresholds. The fix starts with a deliverability audit before sending another email.",
      },
      {
        question: "What reply rate should I expect from B2B cold email?",
        answer: "Reply rates vary significantly based on ICP specificity, offer clarity, personalisation quality, and sequence logic. A well-built system can reach 5–10% reply rates. Broad lists with generic copy typically produce under 1%. The gap is not about volume — it is about how well every element of the system is aligned.",
      },
      {
        question: "How many emails should a cold email sequence have?",
        answer: "Three to five emails is the standard range for B2B SaaS outreach. The first email introduces the problem and the offer. Follow-up emails add a new angle, a proof point, or a lower-friction ask. More than five emails risks spam complaints. Fewer than three leaves replies on the table.",
      },
      {
        question: "Do I need a separate domain for cold email?",
        answer: "Yes. Sending cold email from your primary domain puts your main email reputation at risk. A secondary sending domain, configured correctly and warmed up properly, keeps outbound separate from your core infrastructure.",
      },
    ],
  },
  {
    path: "/landing-page-for-saas",
    title: "Landing Page for SaaS: Messaging, Strategy & CRO | YSG",
    socialTitle: "Landing Page for SaaS: Strategy, Messaging, and CRO",
    description: "I restructure SaaS landing pages so visitors understand the offer, trust the product, and book a demo — before they leave.",
    type: "service",
    schemaType: "Service",
    serviceTypeName: "SaaS Landing Page Strategy and CRO",
    priority: 0.9,
    changefreq: "monthly",
    image: "/saas-landing-page-strategy-messaging-cro-wael-aouididi.webp",
    datePublished: "2026-05-16",
    dateModified: "2026-05-16",
    breadcrumbs: [{ name: "Landing Page for SaaS", path: "/landing-page-for-saas" }],
    excerpt: "A SaaS landing page is not a design asset. It is where positioning, proof, trust, and conversion intent meet. Here is how I fix it.",
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "SaaS conversion rate optimisation", path: "/conversion-rate-optimisation-specialist" },
      { label: "Book a 20-min SaaS Landing Page Diagnosis", path: "/book" },
    ],
    faq: [
      {
        question: "What makes a SaaS landing page different from a regular landing page?",
        answer: "B2B SaaS buyers do not impulse-buy. They evaluate, compare, return, and then decide. A SaaS landing page needs to earn trust across multiple sessions, answer objections before they are asked, and guide a sceptical buyer through a longer evaluation process. Generic landing page advice written for e-commerce does not account for this.",
      },
      {
        question: "Should I fix the landing page before running ads?",
        answer: "Yes, in almost every case. Paid traffic amplifies what is already on the page. If the page has weak messaging, vague proof, or friction in the demo flow, more ad spend makes those problems more expensive — not less visible. Fix the page first, then scale the channel.",
      },
      {
        question: "How long should a SaaS landing page be?",
        answer: "Long enough to earn the conversion, short enough to hold attention. For most B2B SaaS products, this means five to seven clear sections. Length matters less than whether each section earns the next scroll.",
      },
      {
        question: "Do you rewrite the copy or just give recommendations?",
        answer: "I rewrite where needed. Recommendations without execution are not useful at this stage. The audit identifies what is broken. The execution fixes it — including hero rewrites, proof section restructuring, CTA copy, and objection handling.",
      },
    ],
  },
  {
    path: "/conversion-rate-optimisation-specialist",
    title: "Conversion Rate Optimisation Specialist for SaaS | YSG",
    socialTitle: "Conversion Rate Optimisation Specialist for SaaS Companies",
    description: "I audit SaaS conversion paths and fix what stops demos from booking — clarity, trust, CTA friction, proof, and funnel leaks.",
    type: "service",
    schemaType: "Service",
    serviceTypeName: "Conversion Rate Optimisation for B2B SaaS",
    priority: 0.9,
    changefreq: "monthly",
    image: "/saas-conversion-rate-optimisation-specialist-wael-aouididi.webp",
    datePublished: "2026-05-16",
    dateModified: "2026-05-16",
    breadcrumbs: [{ name: "Conversion Rate Optimisation Specialist", path: "/conversion-rate-optimisation-specialist" }],
    excerpt: "Most SaaS conversion problems are not button colours. I find where trust breaks and fix the path from first visit to demo booking.",
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Book a 20-min GTM Audit", path: "/book" },
    ],
    faq: [
      {
        question: "What is a conversion rate optimisation specialist?",
        answer: "A conversion rate optimisation specialist diagnoses why visitors to a website or landing page are not taking the desired action — usually booking a demo, starting a trial, or making a purchase — and fixes the underlying causes. For B2B SaaS, this means auditing messaging clarity, proof, CTA structure, funnel friction, and trust signals across the full conversion path.",
      },
      {
        question: "Is a conversion optimisation consultant useful if we do not have enough traffic for A/B testing?",
        answer: "Yes. A/B testing requires significant traffic volume. Most early-stage SaaS products do not have that volume. Qualitative CRO — reviewing messaging, proof, CTA structure, and analytics — produces faster improvements without needing high traffic.",
      },
      {
        question: "What is a reasonable SaaS conversion rate to aim for?",
        answer: "Demo request pages driven by paid traffic often see between 2% and 8%. Well-optimised organic landing pages for B2B SaaS can reach 3–5%. If conversion is consistently below 1%, there is almost always a messaging or trust problem worth diagnosing before increasing spend.",
      },
      {
        question: "Can you improve conversion without a full redesign?",
        answer: "Yes, and this is usually the right approach first. Most conversion gains come from messaging rewrites, proof restructuring, CTA placement, and friction removal — changes that do not require rebuilding the page from scratch.",
      },
    ],
  },
  {
    path: "/meta-ads-for-saas",
    title: "Meta Ads for SaaS: Creative, Funnel, and Conversion",
    socialTitle: "Meta Ads for SaaS: Creative, Funnel, and Conversion",
    description: "I help B2B SaaS founders run Meta Ads that convert — with the right offer angle, creative, landing page, tracking, and retargeting path.",
    type: "service",
    schemaType: "Service",
    serviceTypeName: "Meta Ads Strategy and Management for B2B SaaS",
    priority: 0.9,
    changefreq: "monthly",
    image: "/meta-ads-for-saas-creative-funnel-conversion-wael-aouididi.webp",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
    breadcrumbs: [{ name: "Meta Ads for SaaS", path: "/meta-ads-for-saas" }],
    excerpt: "Most SaaS Meta Ads fail because the offer, creative, landing page, and tracking are not connected. I fix the system before scaling spend.",
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "SaaS conversion rate optimisation", path: "/conversion-rate-optimisation-specialist" },
      { label: "cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Google Ads vs Meta Ads for SaaS", path: "/google-ads-vs-meta-ads-saas" },
      { label: "Book a 15-minute Meta Ads diagnosis", path: "/book" },
    ],
    faq: [
      {
        question: "Do Meta Ads work for B2B SaaS?",
        answer: "Yes, but with conditions. Meta Ads work for B2B SaaS when the product solves a problem a specific audience recognises, the ACV justifies paid acquisition costs, the landing page and tracking are ready, and there is a lower-friction entry point beyond a cold demo request. Without these conditions, the channel produces data on why it is not working — not pipeline.",
      },
      {
        question: "What is a reasonable budget to start Meta Ads for SaaS?",
        answer: "There is no universal number. The more important question is whether the landing page, offer, and tracking are ready before the budget is set. Spending more on a broken system produces more expensive failures, not better results.",
      },
      {
        question: "Should I use Meta Ads or Google Ads for SaaS?",
        answer: "Google Ads capture active intent — people searching for a solution. Meta Ads create demand by reaching people before they search. For most early-stage SaaS products, Google Ads convert better at lower volume. Meta Ads scale better once creative, offer, and retargeting are working.",
      },
      {
        question: "Why are my Meta Ads getting clicks but no demos?",
        answer: "The most common cause is a mismatch between the ad and the landing page — different language, different ICP signal, or a generic page that resets the visitor's context. The second cause is a high-friction CTA asking for too much from cold traffic. Both are fixable before increasing spend.",
      },
      {
        question: "What creative format works best for SaaS Meta Ads?",
        answer: "For cold traffic, problem-led creative that opens with a specific pain the ICP recognises tends to outperform product-led creative. For retargeting, proof-led creative works better because the audience already has context. Measure cost-per-result, not click-through rate.",
      },
      {
        question: "How does the Meta Ads landing page connect to SaaS conversion rate optimisation?",
        answer: "They are the same problem viewed from different angles. Paid traffic exposes conversion problems faster because every non-converting visitor has a direct cost. A conversion rate optimisation audit and a Meta Ads setup often need to happen together — fixing the ads without fixing the page leaves most of the opportunity on the table.",
      },
      {
        question: "Can Meta Ads replace cold email for SaaS?",
        answer: "Not usually at early stage. Cold email reaches a specific named ICP directly and can generate pipeline with a small, well-targeted list. Meta Ads require more infrastructure and produce results more slowly. Most B2B SaaS founders benefit from running both as part of a connected acquisition system.",
      },
    ],
  },
  {
    path: "/saas-marketing-plan",
    title: "SaaS Marketing Plan: GTM Strategy for B2B Founders | YSG",
    description: "A practical SaaS marketing plan framework for B2B founders — positioning, channels, landing pages, cold email, paid ads, and conversion in one system.",
    type: "article",
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "SaaS Marketing Plan", path: "/saas-marketing-plan" }],
    links: [
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
    ],
  },
  {
    path: "/optimize-saas-landing-page",
    title: "How to Optimise a SaaS Landing Page for More Demos | YSG",
    description: "A practical guide to SaaS landing page optimisation — hero clarity, proof placement, CTA hierarchy, mobile friction, and conversion path fixes that increase demo bookings.",
    type: "article",
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "Optimise SaaS Landing Page", path: "/optimize-saas-landing-page" }],
    links: [
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
    ],
  },
  {
    path: "/google-ads-vs-meta-ads-saas",
    title: "Google Ads vs Meta Ads for SaaS: Which Channel Fits? | YSG",
    description: "Compare Google Ads and Meta Ads for B2B SaaS — intent differences, landing page requirements, budget considerations, and when to use each channel for pipeline.",
    type: "article",
    priority: 0.7,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "Google Ads vs Meta Ads for SaaS", path: "/google-ads-vs-meta-ads-saas" }],
    links: [
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
    ],
  },
  {
    path: "/saas-cold-email-strategy",
    title: "SaaS Cold Email Strategy: Build a Pipeline System | YSG",
    description: "A complete SaaS cold email strategy guide — ICP targeting, domain setup, deliverability, offer framing, sequences, and follow-up logic that generates qualified replies.",
    type: "article",
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "SaaS Cold Email Strategy", path: "/saas-cold-email-strategy" }],
    links: [
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
    ],
  },
  {
    path: "/b2b-saas-marketing-strategy",
    title: "B2B SaaS Marketing Strategy for Founders | YSG",
    description: "A B2B SaaS marketing strategy framework — positioning, demand creation, demand capture, conversion, and the order in which founders should build their GTM system.",
    type: "article",
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "B2B SaaS Marketing Strategy", path: "/b2b-saas-marketing-strategy" }],
    links: [
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
    ],
  },
  {
    path: "/landing-page-for-lead-generation",
    title: "Landing Page for Lead Generation: SaaS Conversion Guide | YSG",
    description: "How to build a SaaS landing page for lead generation — offer clarity, trust signals, form friction, and the conversion path structure that qualifies leads before the demo.",
    type: "article",
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "Landing Page for Lead Generation", path: "/landing-page-for-lead-generation" }],
    links: [
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
    ],
  },
  {
    path: "/linkedin-outreach-for-saas",
    title: "LinkedIn Outreach for SaaS: B2B Prospecting That Works | YSG",
    description: "LinkedIn outreach strategy for B2B SaaS founders — profile positioning, connection messaging, content as warm-up, and how to run LinkedIn alongside cold email.",
    type: "article",
    priority: 0.7,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    breadcrumbs: [{ name: "LinkedIn Outreach for SaaS", path: "/linkedin-outreach-for-saas" }],
    links: [
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
    ],
  },
  {
    path: "/creative/community-management",
    title: "Community Management for SaaS Brands | Your SaaS Growth",
    description: "Community and content systems for SaaS brands that need stronger social proof, founder visibility, and audience engagement.",
    type: "service",
    priority: 0.65,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Creative", path: "/creative" }, { name: "Community Management", path: "/creative/community-management" }],
  },
  {
    path: "/pricing",
    title: "SaaS Growth Pricing and Offers | Your SaaS Growth",
    description: "Compare SaaS growth offers for GTM strategy, landing pages, cold email, Meta ads, and conversion-focused growth execution.",
    type: "service",
    priority: 0.75,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Pricing", path: "/pricing" }],
  },
  {
    path: "/creative",
    title: "Creative Folio for SaaS Growth | Your SaaS Growth",
    description: "A creative portfolio of SaaS landing pages, ad creatives, social content, video assets, and conversion-focused visual systems.",
    type: "portfolio",
    priority: 0.7,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Creative Folio", path: "/creative" }],
  },
  {
    path: "/resume",
    title: "Wael Aouididi Resume | SaaS GTM Strategist",
    description: "Resume and experience for Wael Aouididi, SaaS founder and GTM strategist focused on B2B growth, funnels, and acquisition.",
    type: "profile",
    priority: 0.55,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Resume", path: "/resume" }],
  },
  {
    path: "/book",
    title: "Book a 20-Min SaaS GTM Audit | Your SaaS Growth",
    description: "Book a free strategic SaaS GTM audit with Wael Aouididi and get actionable fixes for positioning, acquisition, and conversion.",
    type: "booking",
    priority: 0.8,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Book a GTM Audit", path: "/book" }],
  },
  {
    path: "/case-study/shipzzer",
    title: "Shipzzer SEO and Cold Email Case Study",
    description: "How Shipzzer reached Top 3 Google rankings and a 50% cold email open rate through SEO architecture and GTM messaging.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/shipzzer-new-landing.webp",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Shipzzer", path: "/case-study/shipzzer" }],
    links: [
      { label: "Cold email service", path: "/services/cold-email" },
      { label: "Landing page conversion service", path: "/services/landing-page" },
    ],
  },
  {
    path: "/case-study/screenplay",
    title: "Screenplay Product Funnel Case Study",
    description: "How Screenplay Performance Studio moved from a confusing AI tool into a guided upload-to-export product funnel.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/landing-screenplay.webp",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Screenplay", path: "/case-study/screenplay" }],
    links: [
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Book a funnel audit", path: "/book" },
    ],
  },
  {
    path: "/case-study/zembra",
    title: "Zembra SaaS Rebrand Case Study",
    description: "How Zembra grew revenue 4x in 8 months through a Reviews API rebrand, website rebuild, and outbound GTM alignment.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/landing-zembra.png",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Zembra", path: "/case-study/zembra" }],
    links: [
      { label: "Cold email service", path: "/services/cold-email" },
      { label: "Book a rebrand audit", path: "/book" },
    ],
  },
  {
    path: "/case-study/pubrella",
    title: "Pubrella Landing Page CRO Case Study",
    description: "How Pubrella increased landing page conversion 3x through positioning clarity, trust signals, friction removal, and CTA hierarchy.",
    type: "case-study",
    priority: 0.75,
    changefreq: "monthly",
    image: "/assets/pubrella-after.jpg",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Pubrella", path: "/case-study/pubrella" }],
    links: [
      { label: "Landing page conversion service", path: "/services/landing-page" },
      { label: "Book a landing page audit", path: "/book" },
    ],
  },
  {
    path: "/case-study/write-your-book",
    title: "Write Your Book Meta Ads Case Study",
    description: "A Meta ads and funnel case study showing lower CPC, stronger creative testing, and better conversion economics.",
    type: "case-study",
    priority: 0.6,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Write Your Book", path: "/case-study/write-your-book" }],
    links: [{ label: "Meta ads service", path: "/services/meta-ads" }],
  },
  {
    path: "/case-study/growapp",
    title: "Growapp Meta Ads Case Study",
    description: "A SaaS Meta ads case study covering trial offer positioning, tracking, campaign structure, and lower cost per lead.",
    type: "case-study",
    priority: 0.6,
    changefreq: "monthly",
    image: "/assets/growapp-meta-dashboard.png",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Growapp", path: "/case-study/growapp" }],
    links: [{ label: "Meta ads service", path: "/services/meta-ads" }],
  },
  {
    path: "/case-study/bottlenexus",
    title: "BottleNexus SaaS Content Case Study",
    description: "A SaaS content and social proof case study for BottleNexus, covering creative assets, brand trust, and buyer education.",
    type: "case-study",
    priority: 0.55,
    changefreq: "monthly",
    image: "/assets/landing-bottlenexus.jpg",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "BottleNexus", path: "/case-study/bottlenexus" }],
  },
  {
    path: "/case-study/ic-center",
    title: "IC Center Landing Page Case Study",
    description: "A landing page case study for IC Center focused on offer clarity, page structure, and conversion-ready positioning.",
    type: "case-study",
    priority: 0.55,
    changefreq: "monthly",
    image: "/assets/ic-center-hero.png",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "IC Center", path: "/case-study/ic-center" }],
  },
];

export const indexableRoutes = seoRoutes.filter((route) => !route.path.includes("*"));

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
};

const blogPostToSeoRoute = (post: (typeof blogPosts)[number]): SeoRoute => ({
  path: post.path,
  title: post.metaTitle,
  socialTitle: post.title,
  description: post.description,
  type: "article",
  priority: 0.75,
  changefreq: "monthly",
  image: post.ogImage,
  datePublished: post.datePublished,
  dateModified: post.dateModified,
  breadcrumbs: [
    { name: "Blog", path: "/blog" },
    { name: post.breadcrumbTitle ?? post.title, path: post.path },
  ],
  excerpt: post.excerpt,
  links: post.relatedPosts.map((related) => ({ label: related.title, path: related.href })),
  faq: post.faq,
});

export const getSeoRoute = (path: string) => {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  const staticRoute = seoRoutes.find((route) => route.path === normalizedPath);
  if (staticRoute) return staticRoute;

  const blogPost = getBlogPostByPath(normalizedPath);
  if (blogPost) return blogPostToSeoRoute(blogPost);

  return seoRoutes[0];
};
