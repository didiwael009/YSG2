import { Link } from "react-router-dom";
import GrowthCaseStudyPage from "@/components/case-study/GrowthCaseStudyPage";
import beforeImage from "@/assets/shipzzer-old-landing.webp";
import afterImage from "@/assets/shipzzer-new-landing.webp";

const CaseStudyShipzzer = () => (
  <GrowthCaseStudyPage
    client="Shipzzer"
    title="Top 3 Google rankings + 50% open rate cold email engine in 90 days"
    description="How I turned a generic logistics website into a buyer-intent demand system for Shipzzer, a US freight forwarding SaaS."
    metaTitle="Shipzzer Case Study | Buyer-Intent Demand System"
    metaDescription="How Shipzzer achieved Top 3 Google rankings, 50% cold email open rate, and a buyer-intent demand system."
    canonical="https://www.yoursaasgrowth.com/case-study/shipzzer"
    metrics={[
      { value: "Top 3", label: "Google rankings for target keywords" },
      { value: "50%", label: "Open rate on cold email sequences" },
      { value: "7%", label: "Reply rate on outbound campaigns" },
    ]}
    problemTitle="The product had value. The market could not see it."
    problemParagraphs={[
      "Shipzzer was a solid freight forwarding SaaS with real operational value. But the website looked like every other logistics software: feature-heavy, jargon-loaded, and invisible to search engines.",
      "No demand generation system. No outbound engine. No organic traffic. The product was ready. The market didn't know it existed.",
      "They needed a full GTM rebuild: positioning, SEO architecture, and a scalable cold email system that could generate qualified pipeline.",
    ]}
    builtTitle="From “software website” to buyer-intent demand system"
    built={[
      {
        icon: "🎯",
        title: "Positioning audit",
        description: (
          <>
            Shifted messaging from logistics features to operational outcomes: faster customs clearance, lower freight costs, and real-time visibility.{" "}
            This is the core of the{" "}
            <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy service</Link>.
          </>
        ),
      },
      {
        icon: "🔍",
        title: "SEO architecture by buyer intent",
        description: (
          <>
            Mapped pages to search intent stages. Built content for awareness, consideration, and decision keywords. Secured Top 3 rankings.{" "}
            The approach behind this is covered in the{" "}
            <Link to="/b2b-saas-marketing-strategy" className="text-primary hover:underline">B2B SaaS marketing strategy guide</Link>.
          </>
        ),
      },
      {
        icon: "📧",
        title: "Cold email engine",
        description: (
          <>
            Segmented ICP lists, wrote high-intent sequences, and optimized deliverability. Achieved 50% open rate and 7% reply rate.{" "}
            See the full{" "}
            <Link to="/cold-email-for-saas" className="text-primary hover:underline">cold email for SaaS service</Link> for how this is built.
          </>
        ),
      },
      {
        icon: "📊",
        title: "On-brand messaging system",
        description: (
          <>
            Unified value proposition across website, email, and landing pages. Built a messaging framework the team could scale.{" "}
            This connects to the{" "}
            <Link to="/landing-page-for-saas" className="text-primary hover:underline">SaaS landing page strategy service</Link>.
          </>
        ),
      },
    ]}
    proofIntro="Before: broad logistics messaging with no clear ICP. After: container-depot-specific positioning, clear CTA hierarchy, and SEO-ready structure."
    before={{
      label: "Before",
      title: "Generic logistics SaaS",
      image: beforeImage,
      alt: "Old Shipzzer landing page with broad depot messaging",
      points: ["Broad messaging", "No clear ICP", "No SEO structure"],
    }}
    after={{
      label: "After",
      title: "Buyer-intent landing page",
      image: afterImage,
      alt: "New Shipzzer landing page focused on container depot buyers",
      points: ["Clear ICP: container depots", "Structured pages by use case", "Conversion-focused layout"],
    }}
    proofCaption="Redesigned homepage: outcome-focused messaging, clear CTA hierarchy, SEO-optimized structure."
    results={[
      {
        number: "01.",
        title: "Top 3 Google rankings",
        description: "Qualified search traffic from buyer-intent keywords.",
      },
      {
        number: "02.",
        title: "50% open rate, 7% reply",
        description: "Cold email engine generating qualified pipeline weekly.",
      },
      {
        number: "03.",
        title: "Unified GTM system",
        description: "Positioning, SEO, and outbound aligned under one narrative.",
      },
    ]}
    ctaPreamble={
      <>
        If you want to understand what this kind of system covers, start with the{" "}
        <Link to="/cold-email-for-saas" className="text-primary hover:underline">cold email for SaaS service</Link> or the{" "}
        <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy page</Link>.
      </>
    }
    ctaTitle="If your SaaS has value but no demand system, let's talk."
    ctaLabel="Book a 20-min GTM Audit"
    ctaHref="/book"
    ctaSubtext="Free strategic audit. No pitch. No slides. Just actionable fixes you can implement this week."
  />
);

export default CaseStudyShipzzer;
