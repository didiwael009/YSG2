import GrowthCaseStudyPage from "@/components/case-study/GrowthCaseStudyPage";
import beforeImage from "@/assets/zembra-old-website.webp";
import afterImage from "@/assets/landing-zembra.png";

const CaseStudyZembra = () => (
  <GrowthCaseStudyPage
    client="Zembra"
    title="4× revenue in 8 months through full SaaS rebrand and outbound revamp"
    description="How I transformed a technical Reviews API into a data-intelligence platform for AI/ML buyers — with positioning, site rebuild, and GTM alignment."
    metaTitle="Zembra Case Study | SaaS Rebrand & Outbound Revamp"
    metaDescription="How Zembra drove 4x revenue growth through a SaaS rebrand, website rebuild, and outbound revamp."
    canonical="https://ysg-2.vercel.app/case-study/zembra"
    metrics={[
      { value: "4×", label: "Revenue growth in 8 months" },
      { value: "Full", label: "Rebrand from tech API to data platform" },
      { value: "GTM", label: "Positioning, messaging, and outbound unified" },
    ]}
    problemTitle="A powerful API nobody understood"
    problemParagraphs={[
      "Zembra had built a Reviews API that scraped data from 125+ review platforms: a technical product with real value for AI/ML teams building sentiment analysis, competitive intelligence, and data enrichment systems.",
      "But the website, messaging, and positioning were all wrong. They talked about review scraping and API endpoints, not the business outcomes buyers cared about: faster model training, richer datasets, and competitive edge.",
      "The market didn't know what problem Zembra solved. They needed a full rebrand: new positioning, new messaging, new site, and a coordinated GTM system to drive awareness and pipeline.",
    ]}
    builtTitle="From “review scraping API” to “data intelligence platform”"
    built={[
      {
        icon: "🎯",
        title: "Full SaaS rebrand",
        description:
          "Repositioned Zembra from a technical API into a data intelligence platform for AI/ML buyers. New brand identity, messaging framework, and value proposition.",
      },
      {
        icon: "🌐",
        title: "Website rebuild",
        description:
          "Redesigned the entire site with outcome-driven messaging, clear buyer journeys, and conversion-optimized landing pages.",
      },
      {
        icon: "📧",
        title: "Outbound email engine",
        description:
          "Built cold email sequences targeting AI/ML teams, data scientists, and product leaders, segmented by use case.",
      },
      {
        icon: "📊",
        title: "Content & messaging system",
        description:
          "Created a unified content library: case studies, use case pages, technical docs, and email templates aligned to the new positioning.",
      },
    ]}
    proofIntro="Before: technical API documentation site with feature lists and developer jargon. After: outcome-driven data intelligence platform with clear buyer journeys and business value."
    before={{
      label: "Before",
      title: "Technical API site",
      image: beforeImage,
      alt: "Old Zembra website with technical API positioning",
      points: ["Developer-first messaging", "Feature lists, no outcomes", "No clear buyer journey", "Generic API documentation feel"],
    }}
    after={{
      label: "After",
      title: "Data intelligence platform",
      image: afterImage,
      alt: "New Zembra website with data intelligence positioning",
      points: ["Buyer-outcome messaging", "Use case narratives", "Clear CTA hierarchy", "Data intelligence platform positioning"],
    }}
    proofCaption="Redesigned homepage: outcome-focused messaging, clear buyer journeys, business value front and center."
    testimonial={{
      quote:
        "Wael has been instrumental in driving our revenue growth at Zembra through his expertise in email outreach automation and strategic rebranding. He is an exemplary growth marketer, capable of exceeding expectations and delivering remarkable results.",
      author: "— Khouaib BouThour",
      role: "Founder, Zembra",
    }}
    results={[
      {
        number: "01.",
        title: "4× revenue growth",
        description: "Repositioning and outbound drove qualified pipeline and closed deals in 8 months.",
      },
      {
        number: "02.",
        title: "Unified GTM system",
        description: "Positioning, messaging, website, and outbound all aligned under one narrative.",
      },
      {
        number: "03.",
        title: "Market clarity",
        description: "AI/ML buyers could finally see what problem Zembra solved and why it mattered.",
      },
    ]}
    ctaTitle="If your SaaS has value but the market can't see it, let's talk."
    ctaLabel="Book a 20-min GTM Audit"
    ctaSubtext="Free strategic audit. No pitch. No slides. Just actionable positioning and messaging fixes you can implement this week."
  />
);

export default CaseStudyZembra;
