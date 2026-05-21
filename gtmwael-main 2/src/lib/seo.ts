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
  schemaType?: "Service" | "Article";
  schemaHeadline?: string;
  schemaDescription?: string;
  schemaDatePublished?: string;
  schemaDateModified?: string;
  schemaIncludeGlobal?: boolean;
  schemaBreadcrumbs?: { name: string; path: string }[] | false;
  schemaFaq?: { question: string; answer: string }[] | false;
  serviceTypeName?: string;
};

export const seoRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "SaaS GTM Strategist for B2B Growth | Your SaaS Growth",
    description: "Fix your SaaS conversion rate before scaling traffic. Wael Aouididi helps B2B SaaS founders fix positioning, landing pages, cold email, and GTM execution.",
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
    title: "Meta Ads for SaaS | B2B Lead Generation | YSG",
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
    title: "SaaS Marketing Plan for B2B Founders | Framework | YSG",
    socialTitle: "SaaS Marketing Plan: A Practical Framework for Founders",
    description: "Most SaaS marketing plans start with channels. This framework starts with positioning, conversion, and trust — then adds traffic.",
    type: "article",
    schemaType: "Article",
    priority: 0.8,
    changefreq: "monthly",
    image: "/saas-marketing-plan-framework-founders-wael-aouididi.webp",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
    breadcrumbs: [{ name: "SaaS Marketing Plan", path: "/saas-marketing-plan" }],
    links: [
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "SaaS conversion rate optimisation", path: "/conversion-rate-optimisation-specialist" },
      { label: "cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
      { label: "B2B SaaS marketing strategy", path: "/b2b-saas-marketing-strategy" },
    ],
    faq: [
      {
        question: "What should a SaaS marketing plan include?",
        answer: "A SaaS marketing plan should include: a clear ICP definition, a positioning statement that explains why a specific buyer would choose this product over alternatives, a landing page and conversion path that earns trust, basic tracking so decisions are based on data, a primary acquisition channel with a 90-day goal, and a follow-up system. Plans that skip the first three and jump straight to channels tend to produce expensive, inconclusive results.",
      },
      {
        question: "How long should a SaaS marketing plan be?",
        answer: "Long enough to be useful, short enough to be used. A one-page framework with honest answers is more valuable than a 40-slide deck that nobody acts on. The goal is clarity about what to fix first and in what order — not comprehensiveness.",
      },
      {
        question: "When should an early-stage SaaS founder start investing in marketing?",
        answer: "As early as possible — but in the right order. Positioning and landing page work should happen before significant acquisition spend. Cold email can start earlier because it provides fast feedback on positioning and offer angle. Paid ads and SEO make more sense once the conversion path is validated.",
      },
      {
        question: "Should a SaaS marketing plan include SEO?",
        answer: "Yes, for most SaaS products. SEO compounds over time and produces qualified organic traffic that supports trust. But SEO is a medium-term channel — it rarely produces meaningful results in under six months. It should be part of the plan, but not the only channel for a founder who needs pipeline now.",
      },
      {
        question: "What is the difference between a SaaS marketing plan and a SaaS GTM strategy?",
        answer: "A GTM strategy defines the overall approach: who you are selling to, how you will reach them, and what the commercial model looks like. A marketing plan is the execution layer: which specific channels, activities, and timelines will be used to generate pipeline. The GTM strategy should exist before the marketing plan is built.",
      },
      {
        question: "How do I know if my SaaS marketing plan is working?",
        answer: "Measure pipeline, not activity. The right metrics are demos booked, trials started, and qualified pipeline created — not email open rates, page views, or social followers. If activity is high but pipeline is flat, the problem is usually positioning, landing page, or conversion path — not channel execution.",
      },
    ],
  },
  {
    path: "/optimize-saas-landing-page",
    title: "How to Optimise a SaaS Landing Page for More Demos",
    description: "The SaaS landing page audit checklist — hero clarity, proof placement, CTA hierarchy, mobile friction, and what to fix before you scale.",
    socialTitle: "How to Optimise a SaaS Landing Page for More Demo Bookings",
    type: "article",
    schemaType: "Article",
    schemaHeadline: "How to Optimise a SaaS Landing Page for More Demo Bookings",
    schemaDatePublished: "2026-05-19",
    schemaDateModified: "2026-05-19",
    schemaIncludeGlobal: false,
    schemaBreadcrumbs: [{ name: "Optimise SaaS Landing Page", path: "/optimize-saas-landing-page" }],
    faq: [
      {
        question: "How do I know if my SaaS landing page needs optimisation?",
        answer:
          "If your page receives qualified traffic but demo bookings are weak or inconsistent, the page needs work. Specific signals: visitors landing and leaving without scrolling past the hero, high mobile bounce rates, a low CTA click rate relative to your traffic source, or a demo booking rate that feels disproportionate to spend. Any of these individually is enough to run through the audit checklist. The exact right numbers depend on your traffic source, ICP, and offer, but the pattern is what matters: qualified traffic in, no conversions out.",
      },
      {
        question: "What is the most common SaaS landing page conversion mistake?",
        answer:
          "Leading with features instead of outcomes. The headline describes the product category instead of the specific result a named buyer gets. The visitor reads it, does not feel recognised as the target, and leaves. Every other optimisation is secondary to getting the hero message right.",
      },
      {
        question: "Should I use the same landing page for paid ads and SEO traffic?",
        answer:
          "Not always. Paid traffic, especially from Meta Ads, arrives with a different state of mind than organic search traffic. Paid visitors often need more context, more proof, and a softer first ask. Search visitors often arrive further along in the decision process. The same page can serve both if it is well-structured, but a dedicated paid landing page with message match to the ad will almost always outperform a shared page.",
      },
      {
        question: "How long should a SaaS landing page be?",
        answer:
          "Long enough to earn the conversion, short enough to hold attention. For most B2B SaaS demo request pages, five to seven clear sections is the right range: hero, problem, what you fix, proof, process or deliverables, and CTA. Length matters less than whether each section earns the next scroll.",
      },
      {
        question: "What is a good conversion rate for a SaaS demo request page?",
        answer:
          "Context matters: traffic source, ICP specificity, offer type, ACV, and buying urgency all affect conversion rates. For warm SaaS traffic, 2-5% can be a useful benchmark range, but the right number depends on your specific setup. Below roughly 1% from qualified traffic almost always signals a messaging, trust, or friction problem worth diagnosing before scaling any acquisition channel.",
      },
    ],
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-19",
    links: [
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "Landing page for lead generation", path: "/landing-page-for-lead-generation" },
      { label: "Landing page optimization best practices", path: "/blog/landing-page-optimization-best-practices-2026" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
      { label: "Shipzzer case study", path: "/case-study/shipzzer" },
      { label: "Book a 20-min SaaS Landing Page Audit", path: "/book" },
    ],
  },
  {
    path: "/google-ads-vs-meta-ads-saas",
    title: "Google Ads vs Meta Ads for SaaS: Which Fits Your Stage?",
    description: "Google Ads vs Meta Ads for SaaS: choose the right channel based on ICP, search demand, offer clarity, and landing page readiness.",
    socialTitle: "Google Ads vs Meta Ads for SaaS: Which Channel Fits Your Stage?",
    type: "article",
    schemaType: "Article",
    schemaHeadline: "Google Ads vs Meta Ads for SaaS: Which Channel Fits Your Stage?",
    schemaDatePublished: "2026-01-01",
    schemaDateModified: "2026-05-19",
    schemaIncludeGlobal: false,
    schemaBreadcrumbs: [{ name: "Google Ads vs Meta Ads for SaaS", path: "/google-ads-vs-meta-ads-saas" }],
    faq: [
      {
        question: "Is Google Ads or Meta Ads better for B2B SaaS?",
        answer:
          "Neither is universally better. Google Ads works better when buyers are already searching for a solution — it captures existing demand. Meta Ads works better when buyers are not yet searching and need to be made aware of the problem or category. The right starting point depends on whether your ICP searches for solutions like yours and whether search volume is sufficient to run a meaningful campaign.",
      },
      {
        question: "How much budget do I need to test Google Ads for SaaS?",
        answer:
          "A practical starting budget is often around $2,000-3,000 per month to get enough signal to optimise. Below that, clicks are usually too few to identify which keywords and ads are working and which are wasting budget. If that minimum is not available, Meta Ads offers more creative testing options at lower CPMs and may be a better starting point.",
      },
      {
        question: "Can I run Google Ads and Meta Ads at the same time for SaaS?",
        answer:
          "Yes, but only after at least one channel is optimised. Running both from day one on a limited budget produces weak signal from both. Start with the channel that best fits the current ICP and offer, get it working, then layer in the second — ideally using Meta to retarget audiences built from Google traffic.",
      },
      {
        question: "What landing page do I need for Google Ads vs Meta Ads?",
        answer:
          "They are different. A Google Ads landing page should confirm the search query intent immediately, move fast to the CTA, and keep the page short and direct. A Meta Ads landing page needs to build context, educate the visitor about the problem, and use a softer first ask. The same page rarely serves both well.",
      },
    ],
    priority: 0.7,
    changefreq: "monthly",
    datePublished: "2026-05-16",
    dateModified: "2026-05-19",
    links: [
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "Landing page strategy by channel", path: "/blog/saas-landing-page-google-meta-ads" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
    ],
  },
  {
    path: "/saas-cold-email-strategy",
    title: "SaaS Cold Email Strategy: Build a Pipeline System | YSG",
    socialTitle: "SaaS Cold Email Strategy: Build a Pipeline System, Not a Blast Campaign",
    description: "Sending more cold emails won't fix weak targeting or a vague offer. Here's the SaaS cold email strategy that actually builds pipeline.",
    type: "article",
    schemaType: "Article",
    schemaHeadline: "SaaS Cold Email Strategy: Build a Pipeline System, Not a Blast Campaign",
    schemaDatePublished: "2026-05-19",
    schemaDateModified: "2026-05-19",
    schemaIncludeGlobal: false,
    schemaBreadcrumbs: [{ name: "SaaS Cold Email Strategy", path: "/saas-cold-email-strategy" }],
    priority: 0.75,
    changefreq: "monthly",
    image: "/cold-email-for-saas-outreach-strategy-wael-aouididi.webp",
    datePublished: "2026-05-19",
    breadcrumbs: [{ name: "SaaS Cold Email Strategy", path: "/saas-cold-email-strategy" }],
    links: [
      { label: "cold email for SaaS service", path: "/cold-email-for-saas" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "LinkedIn outreach for SaaS", path: "/linkedin-outreach-for-saas" },
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "Zembra case study", path: "/case-study/zembra" },
      { label: "Book a 20-min Cold Email Diagnosis", path: "/book" },
    ],
    faq: [
      {
        question: "How many cold emails should I send per day for SaaS outreach?",
        answer:
          "Start conservatively, monitor bounce rates, spam complaints, replies, and domain health, then increase slowly. Specific daily caps depend on inbox age, sender reputation, and current mailbox provider rules, all of which change. The pattern that works for most early-stage SaaS teams is the same regardless of the exact numbers: a well-targeted list of a few hundred contacts per month outperforms a spray-and-pray approach at 5,000+.",
      },
      {
        question: "What is a good cold email reply rate for B2B SaaS?",
        answer:
          "Reply-rate benchmarks vary heavily by ICP, offer, market, data quality, and deliverability. Generic campaigns often sit in the low single digits. A tight, personalised campaign, verified list, properly warmed domain, real offer angle, should perform materially better. The point is less about hitting a specific percentage and more about whether the system is working: if qualified replies are flat or declining, the leak needs to be diagnosed before sending more volume.",
      },
      {
        question: "Do I need a separate domain for cold email?",
        answer:
          "Yes. Sending cold email from your primary domain puts your main email reputation at risk. If deliverability drops or the domain gets flagged, it affects every email from that domain, including transactional emails, product notifications, and support replies. A secondary sending domain, correctly configured and warmed up, keeps outbound isolated.",
      },
      {
        question: "How long should a B2B cold email sequence be?",
        answer:
          "Three to five emails for most B2B SaaS outreach. The first email identifies the problem and makes a low-friction ask. Follow-up emails add new angles or proof points, not \"just checking in\" reminders. The final email is a clear close or break-up framing. Long sequences with no new argument per email tend to raise spam complaints; very short sequences leave replies on the table.",
      },
      {
        question: "What is the difference between cold email and email marketing?",
        answer:
          "Cold email is outbound outreach to people who have not opted in to hear from you. It is one-to-one in tone, highly targeted, and focused on starting a conversation, not broadcasting a message. Email marketing is permission-based, sent to subscribers who have opted in, and typically used for nurture, product updates, and retention. The technical infrastructure, legal requirements, and best practices for each are different.",
      },
    ],
  },
  {
    path: "/b2b-saas-marketing-strategy",
    title: "B2B SaaS Marketing Strategy: Fix This Before Scaling",
    socialTitle: "B2B SaaS Marketing Strategy: What to Fix Before Scaling Traffic",
    description: "B2B SaaS teams often scale before strategy is clear. Fix ICP, positioning, buyer journey, channels, and conversion before adding traffic.",
    type: "article",
    schemaType: "Article",
    priority: 0.8,
    changefreq: "monthly",
    image: "/b2b-saas-marketing-strategy-framework-wael-aouididi.webp",
    datePublished: "2026-05-17",
    dateModified: "2026-05-17",
    breadcrumbs: [{ name: "B2B SaaS Marketing Strategy", path: "/b2b-saas-marketing-strategy" }],
    links: [
      { label: "SaaS GTM strategy", path: "/saas-marketing-agency" },
      { label: "SaaS marketing plan", path: "/saas-marketing-plan" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "SaaS conversion rate optimisation", path: "/conversion-rate-optimisation-specialist" },
      { label: "cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "Meta Ads for SaaS", path: "/meta-ads-for-saas" },
    ],
    faq: [
      {
        question: "What is a B2B SaaS marketing strategy?",
        answer: "A B2B SaaS marketing strategy is the set of decisions that connects ICP, positioning, buyer journey, channel selection, conversion path, and pipeline measurement into a system that turns the right attention into qualified pipeline. It is not a channel plan — it is the thinking that makes channel execution worth doing.",
      },
      {
        question: "How do you create a B2B SaaS marketing strategy?",
        answer: "Start with ICP and positioning — not channels. Map the buyer journey to understand what stage of awareness your buyers are in. Choose channels that match buyer intent. Fix the conversion path. Set up tracking that connects marketing to pipeline. Add follow-up to close the gap between interest and decision.",
      },
      {
        question: "What channels work best for B2B SaaS?",
        answer: "It depends on the ICP, buyer awareness stage, ACV, and sales motion. Cold email works best for narrow ICPs with painful, specific problems. SEO works best when buyers actively search for the problem or category. Paid ads work best once the conversion path is validated. LinkedIn works best when trust and education matter.",
      },
      {
        question: "What is the difference between a SaaS marketing strategy and a GTM strategy?",
        answer: "A GTM strategy defines the overall commercial approach: who you are selling to, how you will reach them, and how the sales motion works. A marketing strategy is focused on how marketing creates demand and pipeline within that direction.",
      },
      {
        question: "How long does a B2B SaaS marketing strategy take to work?",
        answer: "Cold email can produce pipeline within weeks if ICP, offer, and infrastructure are right. SEO typically takes six to twelve months to compound meaningfully. Paid ads need two to three months minimum to generate optimisation data. Fixing the foundations — positioning, landing page, conversion path — produces results across every channel simultaneously.",
      },
      {
        question: "Should early-stage SaaS founders focus on SEO, ads, or outbound first?",
        answer: "For most early-stage B2B SaaS founders, cold email is the highest-leverage starting point. It provides fast feedback on positioning and offer, requires no paid spend, and produces qualified conversations quickly when the ICP is specific. SEO should run in parallel as a medium-term investment. Paid ads make sense once the conversion path is validated.",
      },
    ],
  },
  {
    path: "/landing-page-for-lead-generation",
    title: "Landing Page for Lead Generation: SaaS Guide",
    description: "A landing page for lead generation needs more than a form. Here's the SaaS founder checklist to fix message, proof, and CTA before buying traffic.",
    socialTitle: "Landing Page for Lead Generation: The SaaS Conversion Guide",
    type: "article",
    schemaType: "Article",
    schemaHeadline: "Landing Page for Lead Generation: The SaaS Conversion Guide",
    schemaDatePublished: "2026-05-19",
    schemaDateModified: "2026-05-19",
    schemaIncludeGlobal: false,
    schemaBreadcrumbs: [{ name: "Landing Page for Lead Generation", path: "/landing-page-for-lead-generation" }],
    faq: [
      {
        question: "What is a lead generation landing page for SaaS?",
        answer:
          "A lead generation landing page for SaaS is a focused page designed to capture qualified contact information from visitors coming from a specific traffic source. Unlike a homepage, it serves one audience, one offer, and one conversion action. It removes navigation and distractions to keep attention on the primary CTA, typically a demo request, trial signup, or consultation booking.",
      },
      {
        question: "How is a lead page different from a product page?",
        answer:
          "A product page explains what the product does: its features, use cases, integrations, and pricing. A lead page exists to convert one specific type of visitor into a lead for one specific next step. Product pages support evaluation. Lead pages support conversion. They serve different moments in the buyer journey and should be built separately.",
      },
      {
        question: "What should a SaaS lead page headline say?",
        answer:
          "The headline should name the specific problem your ICP is trying to solve, not describe your product. Visitors from paid or outbound traffic have already seen your ad or email. The page headline confirms they are in the right place. A headline that names a recognisable frustration earns the scroll. A headline that describes a product category does not.",
      },
      {
        question: "How do I reduce friction on a SaaS lead generation form?",
        answer:
          "Remove fields that exist for CRM purposes rather than the visitor's journey. Name and email is sufficient for most B2B SaaS demo requests. Add a maximum of one qualification question if lead scoring requires it. Remove phone number fields unless your sales team calls before demos. Every additional field costs you submissions, so the question is whether the qualification value outweighs the conversion cost.",
      },
      {
        question: "What is a good conversion rate for a SaaS lead generation page?",
        answer:
          "Context matters: traffic source, offer type, ICP specificity, ACV, and buying urgency all affect conversion rates. For warm, targeted SaaS paid traffic, 3-8% can be a useful benchmark range, but the right number depends on your specific setup. Pages receiving broad awareness traffic will convert lower. Below 1% from any qualified paid traffic is a signal to diagnose the message, proof, or friction before increasing spend.",
      },
    ],
    priority: 0.75,
    changefreq: "monthly",
    datePublished: "2026-05-19",
    links: [
      { label: "Landing page for SaaS", path: "/landing-page-for-saas" },
      { label: "How to optimise a SaaS landing page", path: "/optimize-saas-landing-page" },
      { label: "Google Ads vs Meta Ads for SaaS", path: "/google-ads-vs-meta-ads-saas" },
      { label: "Conversion rate optimisation specialist", path: "/conversion-rate-optimisation-specialist" },
      { label: "Book a 20-min SaaS Landing Page Audit", path: "/book" },
    ],
  },
  {
    path: "/linkedin-outreach-for-saas",
    title: "LinkedIn Outreach for SaaS: B2B Prospecting That Works",
    description: "LinkedIn outreach for SaaS fails without ICP clarity, a real offer, and follow-up logic. Here's what founders should fix before sending another message.",
    socialTitle: "LinkedIn Outreach for SaaS: B2B Prospecting That Starts Conversations",
    type: "article",
    schemaType: "Article",
    schemaHeadline: "LinkedIn Outreach for SaaS: B2B Prospecting That Starts Conversations",
    schemaDatePublished: "2026-05-19",
    schemaDateModified: "2026-05-19",
    schemaIncludeGlobal: false,
    schemaBreadcrumbs: [{ name: "LinkedIn Outreach for SaaS", path: "/linkedin-outreach-for-saas" }],
    faq: [
      {
        question: "How many LinkedIn connection requests should I send per week for SaaS outreach?",
        answer:
          "Treat the limit as variable because LinkedIn adjusts thresholds based on account type, history, and policy, and stay well within whatever the current cap appears to be for your account. In practice, 20-40 highly targeted connections per week produces better results than pushing volume. Quality of targeting matters more than volume on LinkedIn. A connection from someone who matches your ICP precisely is worth ten connections from people who roughly match a job title filter.",
      },
      {
        question: "Should I use LinkedIn or cold email for B2B SaaS outreach?",
        answer:
          "Both, used together. LinkedIn alone has connection limits that cap reach. Cold email alone misses the trust signals that LinkedIn content and profile visibility create. The combination, where LinkedIn warms the prospect before email arrives, generally outperforms either channel in isolation.",
      },
      {
        question: "What should I say in a LinkedIn connection request for SaaS?",
        answer:
          "Reference something specific about the person or their company. One observation, one connection to a relevant problem, no CTA. The connection request earns the right to continue the conversation; it does not pitch the product. Keep it under three sentences. If you cannot be specific, do not send it yet.",
      },
      {
        question: "Does LinkedIn outreach work without Sales Navigator?",
        answer:
          "Yes, for early-stage outreach at low volume. The free LinkedIn search has enough filtering capability to build a targeted list for most B2B SaaS ICPs. Sales Navigator becomes worthwhile when you need advanced Boolean search, intent signals, saved lead lists, and the ability to track account changes over time.",
      },
      {
        question: "How do I warm up a LinkedIn profile before outreach?",
        answer:
          "Publish two to three pieces of content relevant to your ICP's problems over 3-4 weeks before starting connection-based outreach. Engage genuinely with posts from people in your target audience: comments that add a specific observation, not generic agreement. This builds profile visibility and demonstrates expertise before a connection request arrives. A prospect who has seen your content once is more likely to accept and respond.",
      },
    ],
    priority: 0.7,
    changefreq: "monthly",
    datePublished: "2026-05-19",
    links: [
      { label: "Cold email for SaaS", path: "/cold-email-for-saas" },
      { label: "SaaS marketing agency alternative", path: "/saas-marketing-agency" },
      { label: "SaaS landing page", path: "/landing-page-for-saas" },
      { label: "SaaS cold email strategy", path: "/saas-cold-email-strategy" },
      { label: "Book a 20-min Outreach Diagnosis", path: "/book" },
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
    description: "How Shipzzer reached Top-3 Google rankings for core industry keywords. The positioning and SEO execution that drove the results — full case study.",
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
    description: "How a positioning and messaging overhaul helped Screenplay's SaaS product convert better. The full GTM execution story and what actually worked.",
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
    description: "How Zembra grew revenue 4× through repositioning, cold email, and GTM execution — without changing the product. Full strategy breakdown inside.",
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
    description: "How Pubrella fixed its go-to-market approach and improved conversion. The strategy, execution, and key takeaways for SaaS founders in a similar spot.",
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
    description: "How a creative angle change cut Write Your Book’s cost per landing page view to £0.22 and lifted CTR to 2.86%. Full Meta Ads case study.",
    type: "case-study",
    schemaType: "Article",
    schemaHeadline: "Write Your Book Meta Ads Case Study: £0.22 Per Landing Page View",
    schemaDatePublished: "2026-01-01",
    schemaDateModified: "2026-05-19",
    schemaIncludeGlobal: false,
    schemaBreadcrumbs: [
      { name: "Case Studies", path: "/case-studies" },
      { name: "Write Your Book", path: "/case-study/write-your-book" },
    ],
    priority: 0.6,
    changefreq: "monthly",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "Write Your Book", path: "/case-study/write-your-book" }],
    links: [{ label: "Meta ads service", path: "/services/meta-ads" }],
  },
  {
    path: "/case-study/growapp",
    title: "GrowApp Meta Ads Case Study: £30K+ MRR SaaS | YSG",
    description: "How GrowApp was built and scaled as a bootstrapped SaaS product. Founder-led growth, positioning decisions, and the GTM lessons that came from it.",
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
    description: "How Bottle Nexus went through a full rebrand and conversion-focused creative execution. The positioning story and creative strategy behind the results.",
    type: "case-study",
    priority: 0.55,
    changefreq: "monthly",
    image: "/assets/landing-bottlenexus.jpg",
    breadcrumbs: [{ name: "Case Studies", path: "/case-studies" }, { name: "BottleNexus", path: "/case-study/bottlenexus" }],
  },
  {
    path: "/case-study/ic-center",
    title: "IC Center Landing Page Case Study",
    description: "How IC Center improved its positioning and GTM approach to attract better-fit clients. The strategy, execution, and key decisions explained in full.",
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
