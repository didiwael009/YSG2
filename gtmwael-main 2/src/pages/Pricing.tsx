import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { BOOKING_URL } from "@/lib/constants";
import AnimateIn from "@/components/AnimateIn";
import { CREAM, HEAVY, INK, LIME, SERIF } from "@/components/creative2/style";
import { focusDark, focusLight } from "@/components/creative2/kit";

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

type Offer = (typeof offers)[number];

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
    <div className="border-b border-black/15">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`group flex w-full items-center justify-between gap-4 rounded-sm py-5 text-left ${focusLight}`}
      >
        <span className="text-lg font-semibold group-hover:underline group-hover:underline-offset-4">{q}</span>
        <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-base leading-relaxed" style={{ color: "#333" }}>{a}</p>
      </div>
    </div>
  );
}

/* ── Offer Card ───────────────────────────────────── */

function OfferCard({ offer }: { offer: Offer }) {
  const isFeatured = "featured" in offer && offer.featured === true;
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-8 ${
        isFeatured ? "bg-white shadow-[0_30px_60px_-30px_#0006]" : "border border-black/10 bg-white/60"
      }`}
      style={isFeatured ? { border: `2px solid ${INK}` } : undefined}
    >
      <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: isFeatured ? LIME : INK }} aria-hidden="true" />

      {/* Step badge */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
          style={isFeatured ? { background: LIME, color: INK } : { background: INK, color: CREAM }}
        >
          Step {offer.step}
        </span>
      </div>

      <h2 className="mb-2 text-2xl tracking-tight md:text-3xl" style={HEAVY}>{offer.title}</h2>
      <p className="mb-6 text-base leading-snug" style={{ color: "#333" }}>{offer.tagline}</p>

      {/* Price */}
      <p className="mb-1 text-5xl tracking-tight md:text-6xl" style={HEAVY}>{offer.price}</p>
      <p className="mb-1 text-sm" style={{ color: "#555" }}>{offer.priceSub}</p>
      <p className="mb-6 text-xl" style={SERIF}>{offer.timeline}</p>

      {/* Bullets */}
      <ul className="mb-6 space-y-3">
        {offer.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* For you */}
      <div className="mb-6 border-t border-black/10 pt-4">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "#555" }}>Right for you if</p>
        <p className="text-lg leading-snug" style={SERIF}>{offer.forYou}</p>
      </div>

      {/* CTA */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold transition-transform hover:-translate-y-0.5 ${focusLight}`}
        style={isFeatured ? { background: INK, color: "#fff" } : { border: `1.5px solid ${INK}` }}
      >
        {offer.cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </a>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────── */

const Pricing = () => {
  return (
    <main className="min-h-screen overflow-x-clip" style={{ background: INK }}>
      <Navigation />

      <div className="font-body" style={{ background: CREAM, color: INK }}>
        {/* Hero */}
        <section aria-labelledby="pricing-title" className="pb-14 pt-32 md:pb-16 md:pt-40">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <AnimateIn delay={50}>
              <p
                className="mb-6 inline-flex rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.06em]"
                style={{ background: LIME, color: INK }}
              >
                Pricing
              </p>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h1 id="pricing-title" className="tracking-[-0.03em]">
                <span className="block text-[clamp(3rem,7vw,5.75rem)] leading-[0.95]" style={HEAVY}>Three offers.</span>{" "}
                <span className="mt-2 block text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[1.02]" style={SERIF}>One path to pipeline.</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={170}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed md:text-xl" style={{ color: "#333" }}>
                Diagnose the blockers. Fix conversion. Build a channel that runs every month.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* 3 Offer Cards */}
        <section aria-label="Offers" className="pb-20 md:pb-28">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {offers.map((offer) => (
                <AnimateIn key={offer.step} delay={100 + parseInt(offer.step) * 100} className="h-full">
                  <OfferCard offer={offer} />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="pricing-faq-title" className="border-t border-black/10 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <AnimateIn delay={50}>
              <h2 id="pricing-faq-title" className="mb-10 text-center text-4xl leading-[1.05] tracking-[-0.03em] md:text-6xl">
                <span className="text-4xl md:text-6xl" style={HEAVY}>Common</span>{" "}
                <span className="text-4xl md:text-6xl" style={SERIF}>questions</span>
              </h2>
            </AnimateIn>
            <div>
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <section aria-labelledby="pricing-cta-title" className="section-padding-sm font-body" style={{ background: INK, color: CREAM }}>
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <AnimateIn delay={50}>
            <h2 id="pricing-cta-title" className="mb-4 text-4xl leading-tight md:text-5xl" style={SERIF}>
              Not sure where<br />to start?
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/75">
              Book a 20-minute fit call. No pitch. We'll identify which offer matches your current situation.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-base font-bold hover:brightness-95 ${focusDark}`}
              style={{ background: LIME, color: INK }}
            >
              Book a 20-Minute Fit Call
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </main>
  );
};

export default Pricing;
