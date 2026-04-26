import GrowthCaseStudyPage from "@/components/case-study/GrowthCaseStudyPage";
import beforeImage from "@/assets/pubrella-before.png";
import afterImage from "@/assets/pubrella-after.png";

const Framework = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">The CRO framework</p>
      <h2 className="font-display max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
        How the 3× conversion lift was achieved
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            number: "01",
            title: "Messaging clarity",
            description: "Rewrote hero, subheads, and feature copy to make the promise, proof, and CTA instantly clear.",
          },
          {
            number: "02",
            title: "Trust signal placement",
            description: "Added testimonials, logos, case study snippets, and credibility markers where visitors hesitate.",
          },
          {
            number: "03",
            title: "Friction removal & CTA hierarchy",
            description: "Reduced competing paths and created a single clear conversion path with progressive disclosure.",
          },
        ].map((item) => (
          <article key={item.number} className="rounded-2xl border border-border/60 bg-card/70 p-7">
            <span className="font-display text-2xl font-bold text-primary">{item.number}</span>
            <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudyPubrella = () => (
  <GrowthCaseStudyPage
    client="Pubrella"
    title="3× landing page conversion through positioning and CRO"
    description="How I transformed a confusing SaaS landing page into a high-converting demand capture system — with messaging clarity, friction removal, and CTA optimization."
    metaTitle="Pubrella Case Study | Landing Page CRO"
    metaDescription="How Pubrella tripled landing page conversion through positioning, messaging clarity, friction removal, and CRO."
    canonical="https://yoursaasgrowth.com/case-study/pubrella"
    metrics={[
      { value: "3×", label: "Visit-to-signup conversion increase" },
      { value: "Clear", label: "Value prop from confusion to instant understanding" },
      { value: "CRO", label: "Trust signals, friction removal, CTA hierarchy" },
    ]}
    problemTitle="Visitors landed, read, and left. No action."
    problemParagraphs={[
      "Pubrella had a SaaS product with real value, but the landing page didn't communicate it. Visitors arrived, scrolled, tried to understand what the product did, and then bounced without signing up.",
      "The messaging was vague. The value proposition was buried. The CTAs competed with each other. Trust signals were missing. The page was designed, but it wasn't built to convert.",
      "They needed a full landing page overhaul: positioning clarity, friction removal, trust-building, and a CRO framework that turned visitors into signups.",
    ]}
    builtTitle="From confusing landing page to conversion-optimized demand system"
    built={[
      {
        icon: "🎯",
        title: "Messaging clarity audit",
        description:
          "Rewrote the hero section, value proposition, and feature descriptions to eliminate confusion.",
      },
      {
        icon: "🔍",
        title: "Friction removal",
        description:
          "Identified and eliminated conversion blockers: unclear CTAs, missing trust signals, cognitive overload, and unnecessary fields.",
      },
      {
        icon: "🏆",
        title: "Trust signal architecture",
        description:
          "Added social proof, testimonials, case study previews, security badges, and credibility markers at strategic friction points.",
      },
      {
        icon: "📊",
        title: "CTA hierarchy & flow optimization",
        description:
          "Restructured the page flow with one primary CTA, clear visual hierarchy, and progressive disclosure.",
      },
    ]}
    proofIntro="Before: confusing messaging, competing CTAs, no trust signals, high cognitive load. After: clear value prop, single CTA path, trust-building architecture, friction removed."
    before={{
      label: "Before",
      title: "Unclear demand page",
      image: beforeImage,
      alt: "Old Pubrella landing page",
      points: ["Vague value proposition", "Competing CTAs", "No strong social proof", "High friction", "Unclear buyer journey"],
    }}
    after={{
      label: "After",
      title: "Conversion demand system",
      image: afterImage,
      alt: "New Pubrella landing page",
      points: ["Crystal-clear value proposition", "Single primary CTA", "Trust signals at friction points", "Streamlined signup", "Guided buyer journey"],
    }}
    proofCaption="Redesigned landing page: messaging clarity, friction removal, trust architecture, CTA optimization."
    extra={<Framework />}
    results={[
      {
        number: "01.",
        title: "3× conversion lift",
        description: "Visit-to-signup rate tripled through messaging clarity and friction removal.",
      },
      {
        number: "02.",
        title: "Reduced bounce rate",
        description: "Visitors stayed longer, understood faster, and converted more.",
      },
      {
        number: "03.",
        title: "Scalable CRO system",
        description: "Framework can be replicated across other pages and campaigns.",
      },
    ]}
    ctaTitle="If your landing page gets traffic but doesn't convert, let's fix it."
    ctaLabel="Book a 20-min Landing Page Audit"
    ctaSubtext="Free conversion audit. No pitch. No slides. Just actionable CRO fixes you can implement this week."
  />
);

export default CaseStudyPubrella;
