// Copy for /creative-2. Draft for Wael's approval.
// Sources: hero copy from docs/superpowers/specs/2026-11-15-creative-2-design.md;
// figures 134 / 3 / 5 confirmed by Wael; experience and work from
// src/lib/video-data.ts, src/lib/rebrand-data.ts and src/components/ExperienceSection.tsx;
// testimonials verbatim from src/components/TestimonialSection.tsx.

type Stat = [string, string];

export type C2HeroCard = { label: string; line: string; stats: Stat[] };
export type C2Service = { title: string; line: string; hasSamples: boolean };
export type C2Experience = {
  company: string;
  role: string;
  metric: string;
  metricLabel: string;
  sentence: string;
  proofs: { label: string; url: string }[];
};
export type C2Testimonial = {
  name: string;
  role: string;
  quote: string;
  highlight: string;
  linkLabel: string;
  linkUrl: string;
};
export type C2Step = { title: string; body: string };

export const CREATIVE2_COPY = {
  hero: {
    badge: "Top Rated on Upwork",
    titleLine1: "Videos. Carousels.",
    titleLine2: "Brands. Ads.",
    subtitle: "Short animated videos, carousels, brand identity and product ads.",
    primaryCta: "Book a call",
    secondaryCta: "See the work",
    freeNote: "Free · no commitment",
    cards: [
      { label: "Produce", line: "Content at scale", stats: [["134", "posts"], ["3", "languages"]] },
      { label: "Rebrand", line: "Identity and pages", stats: [["5", "brand projects"]] },
    ] as C2HeroCard[],
    trustedBy: "Trusted by founders at",
  },
  band: {
    quote: "Wael acted as a growth partner. We started with positioning, brand messaging and copy; then traffic (Meta Ads) with clean tracking; then analytics-led CRO.",
    author: "Felix W, Founder of Pubrella",
  },
  experience: {
    eyebrow: "Track Record",
    titleLine1: "Creative work",
    titleLine2: "that shipped",
    items: [
      {
        company: "Bottle Nexus",
        role: "Head of Creative",
        metric: "Rebrand",
        metricLabel: "from brand foundations to weekly content",
        sentence: "Identity, website and a weekly content engine. Reels, reports and decks.",
        proofs: [
          { label: "Instagram", url: "https://www.instagram.com/bottlenexus/" },
          { label: "Behance", url: "https://www.behance.net/gallery/234607371/Saas-B2B-Content-Creation" },
        ],
      },
      {
        // Figure from src/lib/video-data.ts (TikTok Viral Account).
        company: "TikTok account",
        role: "Short video",
        metric: "4M+",
        metricLabel: "views",
        sentence: "Viral content strategy that captured millions of eyeballs with scroll-stopping hooks.",
        proofs: [{ label: "TikTok", url: "https://www.tiktok.com/@.jmayel.sekran" }],
      },
      {
        // Figure from src/lib/video-data.ts (AI Travel YouTube Channel).
        company: "AI travel channel",
        role: "YouTube",
        metric: "60K",
        metricLabel: "views in 3 months",
        sentence: "AI-powered travel content that built an engaged audience from scratch.",
        proofs: [{ label: "YouTube", url: "https://www.youtube.com/@NomadBudget" }],
      },
      {
        company: "Pubrella",
        role: "Full Rebrand",
        metric: "Rebrand",
        metricLabel: "identity, visual direction and positioning",
        sentence: "Led the complete brand identity, visual direction and product positioning.",
        proofs: [{ label: "Live site", url: "https://pubrella.com/" }],
      },
    ] as C2Experience[],
  },
  servicesHeading: {
    eyebrow: "What I do",
    titleLine1: "Four things,",
    titleLine2: "made for your brand",
    intro: "One idea, cut for each channel. Claude Code makes it. I check it, you approve it.",
  },
  services: [
    {
      title: "Short animated videos",
      line: "2D and 3D characters, mascot sketches and motion graphics with animated captions.",
      hasSamples: true,
    },
    {
      title: "Carousels and posts",
      line: "Carousels and posts in English, French and Arabic. Written, not translated.",
      hasSamples: true,
    },
    {
      title: "Brand identity and pages",
      line: "Identity, decks and visuals that match the product, and the pages that carry them.",
      hasSamples: true,
    },
    {
      title: "Product videos and ads",
      line: "Product stories and ads cut for each channel.",
      hasSamples: true,
    },
  ] as C2Service[],
  work: {
    eyebrow: "Selected work",
    titleLine1: "Videos, ads",
    titleLine2: "and brands",
    intro: "Videos, ads, social posts, the apps I built and the brand projects I led.",
    videosLabel: "Videos",
    adsLabel: "SaaS ads",
    postsLabel: "Social media posts",
    behanceLink: "See more on Behance",
    // App lines: from Wael's screenshots, to be checked by Wael.
    appsLabel: "Apps I built",
    appLines: {
      GymVoice: "My iPhone app for my AI agents: podcasts, music, chat and the decisions I approve.",
      SambaLingo: "An app to learn Brazilian Portuguese with short sessions and songs.",
    } as Record<string, string>,
    brandsLabel: "Brand projects",
  },
  testimonials: {
    eyebrow: "What clients say",
    titleLine1: "Proof",
    titleLine2: "from the brands",
    items: [
      {
        name: "Khoubeib Bouthour",
        role: "CEO · Zembra · B2B SaaS · May 2024",
        quote: "Wael has been instrumental in driving our revenue growth at Zembra through his expertise in email outreach automation and strategic rebranding.",
        highlight: "He is an exemplary growth marketer, capable of exceeding expectations and delivering remarkable results.",
        linkLabel: "View on LinkedIn",
        linkUrl: "https://www.linkedin.com/in/aouididi-wael-81b7037a/details/recommendations/",
      },
      {
        name: "Felix W",
        role: "Founder · Pubrella.com",
        quote: "Wael acted as a growth partner. We started with positioning, brand messaging and copy; then traffic (Meta Ads) with clean tracking; then analytics-led CRO.",
        highlight: "With this trust–traffic–analytics approach and a refreshed landing, our visit→signup conversion improved by about 3×. Easy to work with and fast.",
        linkLabel: "View on Upwork",
        linkUrl: "https://www.upwork.com/freelancers/waelaouididi",
      },
    ] as C2Testimonial[],
  },
  process: {
    eyebrow: "How it works",
    titleLine1: "From brief",
    titleLine2: "to post",
    intro: "One call to start. Then I make it, check it and send it for your yes.",
    steps: [
      { title: "A call about your brand", body: "Your product, your channels and what you want to post." },
      { title: "I make it, then check it", body: "Claude Code makes it. I check every piece before you see it." },
      { title: "You approve, it ships", body: "Nothing goes out without your yes. One idea, cut for each channel." },
    ] as C2Step[],
  },
  finalCta: {
    line: "Have a video, a carousel or a brand in mind?",
    button: "Book a call",
    note: "Free · no commitment",
  },
};
