import GrowthCaseStudyPage from "@/components/case-study/GrowthCaseStudyPage";
import oldLanding from "@/assets/screenplay-old-landing.png";
import newLanding from "@/assets/screenplay-hero-screenshot.png";
import oldUpload from "@/assets/screenplay-old-pricing.webp";
import oldCasting from "@/assets/screenplay-old-casting.webp";
import oldPerform from "@/assets/screenplay-old-perform.webp";
import newUpload from "@/assets/screenplay-new-upload.webp";
import newCasting from "@/assets/screenplay-new-casting.webp";
import newStudio from "@/assets/screenplay-new-studio.webp";

const Slider = ({ title, images }: { title: string; images: { label: string; src: string }[] }) => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">{title}</p>
      <div className="grid auto-cols-[86%] grid-flow-col gap-5 overflow-x-auto pb-5 md:auto-cols-[54%]">
        {images.map((image) => (
          <figure key={image.label} className="rounded-2xl border border-border/60 bg-card/70 p-4">
            <figcaption className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {image.label}
            </figcaption>
            <img src={image.src} alt={image.label} className="h-[420px] w-full rounded-xl border border-border bg-white object-contain object-top" loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudyScreenplay = () => (
  <GrowthCaseStudyPage
    client="Screenplay Performance Studio"
    title="From confusing AI tool to guided product funnel"
    description="How I reframed Screenplay Performance Studio into a step-by-step workflow users could understand, follow, and complete."
    metaTitle="Screenplay Performance Studio Case Study | Guided Product Funnel"
    metaDescription="How Screenplay Performance Studio was reframed from a confusing AI audio tool into a guided product funnel."
    canonical="https://yoursaasgrowth.com/case-study/screenplay"
    metrics={[
      { value: "Clear", label: "Product story from AI tool to workflow" },
      { value: "5 steps", label: "Upload, Casting, Perform, Paywall, Export" },
      { value: "Value first", label: "Paywall moved after engagement" },
    ]}
    problemTitle="The product worked. The experience didn’t."
    problemParagraphs={[
      "Screenplay Performance Studio had a strong product idea: helping users turn written dialogue into performed audio. But the experience around the product was not clear enough.",
      "Users could not immediately understand where to start, what the product would do for them, or what outcome they would get at the end.",
      "The product did not need more features. It needed a clearer path to value.",
    ]}
    builtTitle="From “AI audio tool” to guided screenplay performance system"
    built={[
      {
        icon: "🎯",
        title: "Product positioning",
        description:
          "Shifted the message from a broad AI audio tool to a specific screenplay performance workflow.",
      },
      {
        icon: "🧭",
        title: "User journey architecture",
        description:
          "Mapped the full product flow from first action to final outcome: Upload, Casting, Perform, Paywall, Export.",
      },
      {
        icon: "📝",
        title: "Landing page narrative",
        description:
          "Rebuilt the page around the user’s real question: how do I turn my script into something I can hear?",
      },
      {
        icon: "💳",
        title: "Funnel and paywall logic",
        description:
          "Repositioned monetization later in the journey, after users engaged with the product and understood the value.",
      },
    ]}
    proofIntro="Before: unclear AI audio tool. After: guided product funnel with a clear path from script to outcome."
    before={{
      label: "Before",
      title: "Unclear AI audio tool",
      image: oldLanding,
      alt: "Old Screenplay landing page",
      points: ["Abstract positioning", "No clear entry point", "Weak user journey", "Unclear next action"],
    }}
    after={{
      label: "After",
      title: "Guided product funnel",
      image: newLanding,
      alt: "New Screenplay landing page",
      points: ["Clear first action", "Specific screenplay use case", "Step-by-step journey", "Stronger CTA hierarchy"],
    }}
    proofCaption="The product now feels less like a tool to explore and more like a workflow to complete."
    extra={
      <>
        <Slider
          title="Old funnel"
          images={[
            { label: "Purchase first", src: oldUpload },
            { label: "Casting", src: oldCasting },
            { label: "Perform", src: oldPerform },
          ]}
        />
        <Slider
          title="New funnel"
          images={[
            { label: "Upload", src: newUpload },
            { label: "Casting", src: newCasting },
            { label: "Perform", src: newStudio },
          ]}
        />
      </>
    }
    results={[
      {
        number: "01.",
        title: "Clearer product narrative",
        description: "The product story shifted from AI audio generation to screenplay performance workflow.",
      },
      {
        number: "02.",
        title: "Stronger user progression",
        description: "The experience changed from scattered exploration into a guided sequence users could follow.",
      },
      {
        number: "03.",
        title: "Better value perception before payment",
        description: "The funnel was restructured so monetization appears after the user has moved closer to the outcome.",
      },
    ]}
    ctaTitle="If your SaaS product has value but users don’t get it, let’s fix the path."
    ctaLabel="Book a 20-min GTM Audit"
    ctaSubtext="Free strategic audit. No pitch. No slides. Just actionable fixes you can implement this week."
  />
);

export default CaseStudyScreenplay;
