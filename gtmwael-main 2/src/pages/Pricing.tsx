import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { CALENDLY_URL } from "@/lib/constants";
import AnimateIn from "@/components/AnimateIn";

/* ── Data ─────────────────────────────────────────── */

const offers = [
  {
    step: "01",
    title: "Pipeline Diagnostic",
    tagline: "Find the exact blockers slowing your signups and demo requests.",
    price: "$497",
    priceSub: "one-time · no commitment",
    timeline: "Delivered in 48 hours",
    bullets: [
      "Positioning and messaging audit",
      "Landing page conversion review",
      "Funnel drop-off analysis",
      "Written action plan with ranked priorities",
      "30-min debrief call",
    ],
    forYou: "You have a live product but aren't sure where the conversion breakdown is.",
    cta: "Start with a Diagnostic",
  },
  {
    step: "02",
    title: "Conversion Sprint",
    tagline: "Rebuild the message, page, and conversion path for clarity and action.",
    price: "$2,500",
    priceSub: "one-time · full execution",
    timeline: "Delivered in 7 days",
    bullets: [
      "Full messaging rewrite — headline to CTA",
      "Landing page rebuild — clarity, hierarchy, conversion",
      "Conversion path optimisation to first action",
      "Acquisition channel recommendation",
      "One revision round included",
    ],
    forYou: "You have traffic but conversion is below 2%, or visitors leave without taking action.",
    cta: "Start the Sprint",
    featured: true,
  },
  {
    step: "03",
    title: "Pipeline Engine",
    tagline: "One acquisition channel executed monthly. Scoped, reported, measurable.",
    price: "$1,500",
    priceSub: "per month · cancel anytime",
    timeline: "First results in 14 days",
    bullets: [
      "One channel: Cold Email, LinkedIn, or Paid Ads",
      "ICP targeting and campaign setup",
      "Weekly execution and channel reporting",
      "Monthly review — results and next 30 days",
      "Not included: strategy consulting, brand work, multi-channel",
    ],
    forYou: "Your page converts but you lack a consistent, repeatable source of qualified leads.",
    cta: "Start the Engine",
  },
];

const faqs = [
  {
    q: "Do I need to start with the Diagnostic?",
    a: "Not necessarily. If you already know what's broken and need execution, you can jump straight to the Sprint or Engine. The Diagnostic is ideal when you're unsure where the problem is.",
  },
  {
    q: "What if I need the Sprint and the Engine together?",
    a: "Many clients start with the Sprint to fix conversion, then add the Engine for ongoing lead generation. We can bundle them — book a call and we'll scope it.",
  },
  {
    q: "Which channel should I pick for the Pipeline Engine?",
    a: "It depends on your ICP and stage. Cold email works best for B2B with a clear buyer. LinkedIn for high-ticket. Paid ads when you have budget and a converting page. We'll recommend the right one on the call.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. The Diagnostic and Sprint are one-time. The Engine is month-to-month — cancel anytime with 30 days' notice.",
  },
  {
    q: "What kind of SaaS do you work with?",
    a: "B2B SaaS, typically seed to Series A. If you sell to businesses and struggle with pipeline, we're a good fit.",
  },
];

/* ── FAQ Item ─────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0"}`}>
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ── Offer Card ───────────────────────────────────── */

function OfferCard({ offer }: { offer: typeof offers[0] }) {
  const isFeatured = (offer as any).featured;
  return (
    <div className={`rounded-2xl p-6 md:p-8 flex flex-col h-full transition-all duration-300 relative ${
      isFeatured
        ? "glass-card border-primary/40 hover:border-primary/60"
        : "glass-card hover:border-primary/30"
    }`}>
      {/* Step badge */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
          Step {offer.step}
        </span>
      </div>

      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">{offer.title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{offer.tagline}</p>

      {/* Price */}
      <div className="mb-1">
        <span className="text-4xl md:text-5xl font-bold text-primary">{offer.price}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{offer.priceSub}</p>
      <p className="text-sm font-medium text-primary mb-6">{offer.timeline}</p>

      {/* Bullets */}
      <ul className="space-y-3 mb-6">
        {offer.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
            <span className="text-primary mt-0.5">→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* For you */}
      <div className="border-t border-border/30 pt-4 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Right for you if</p>
        <p className="text-sm text-foreground/70 italic">{offer.forYou}</p>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Button
          variant={isFeatured ? "default" : "outline"}
          size="lg"
          className="w-full group"
          asChild
        >
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            {offer.cta}
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────── */

const Pricing = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[hsl(260_60%_50%/0.1)] rounded-full blur-[120px]" />
        <div className="container px-4 relative z-10 max-w-4xl mx-auto text-center">
          <AnimateIn delay={50}>
            <span className="text-muted-foreground font-medium text-xs uppercase tracking-[0.2em]">Pricing</span>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.03em] mt-4 mb-6">
              Three offers.<br />
              <span className="text-primary">One path to pipeline.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={170}>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Diagnose the blockers. Fix conversion. Build a channel that runs every month.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* 3 Offer Cards */}
      <section className="pb-20 md:pb-28 relative">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <AnimateIn key={offer.step} delay={100 + parseInt(offer.step) * 100}>
                <OfferCard offer={offer} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve-to-light" />

      {/* FAQ */}
      <section className="py-16 md:py-24 relative bg-section-light">
        <div className="container px-4 max-w-3xl mx-auto">
          <AnimateIn delay={50}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-heading-light text-center">
              Common questions
            </h2>
          </AnimateIn>
          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve-to-dark" />

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <AnimateIn delay={50}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Not sure where<br />to start?
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Book a 20-minute fit call. No pitch. We'll identify which offer matches your current situation.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <Button variant="hero" size="xl" className="group" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a 20-Minute Fit Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </AnimateIn>
        </div>
      </section>

      <SectionDivider variant="curve-to-light" />

      <Footer hideCTA />
    </main>
  );
};

export default Pricing;
