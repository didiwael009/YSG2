import { ArrowRight, BarChart2, CheckCircle2, FileSearch, MessageSquare, Shield, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "What is a conversion rate optimisation specialist?",
    answer:
      "A conversion rate optimisation specialist diagnoses why visitors to a website or landing page are not taking the desired action — usually booking a demo, starting a trial, or making a purchase — and fixes the underlying causes. For B2B SaaS, this means auditing messaging clarity, proof, CTA structure, funnel friction, and trust signals across the full conversion path.",
  },
  {
    question: "Is a conversion optimisation consultant useful if we do not have enough traffic for A/B testing?",
    answer:
      "Yes. A/B testing requires significant traffic volume to produce reliable results. Most early-stage SaaS products do not have that volume. Qualitative CRO — reviewing messaging, proof, CTA structure, friction, and analytics — produces faster and more reliable improvements without needing high traffic. The audit identifies root causes, not marginal test variations.",
  },
  {
    question: "What is a reasonable SaaS conversion rate to aim for?",
    answer:
      "It depends on traffic source and offer type. Demo request pages driven by paid traffic often see between 2% and 8%. Well-optimised organic landing pages for B2B SaaS can reach 3–5%. These ranges vary significantly by ICP specificity, offer clarity, and page trust signals. If conversion is consistently below 1%, there is almost always a messaging or trust problem worth diagnosing before increasing spend.",
  },
  {
    question: "How is this different from hiring a CRO agency?",
    answer:
      "A CRO agency typically runs tests at scale and charges accordingly. For early-stage SaaS, the problem is usually not test volume — it is fundamental messaging, trust, and funnel structure. I work on those root causes directly, not on testing marginal variations of a page that has not yet earned the right to convert.",
  },
  {
    question: "Do you help with landing page copy as well as strategy?",
    answer:
      "Yes. The audit includes rewriting where needed. Strategy without execution is not useful at this stage. See the full SaaS landing page service for more detail on what that looks like in practice.",
  },
  {
    question: "Can you improve conversion without a full redesign?",
    answer:
      "Yes, and this is usually the right approach first. A full redesign is expensive, slow, and often not necessary. Most conversion gains come from messaging rewrites, proof restructuring, CTA placement, and friction removal — changes that do not require rebuilding the page from scratch.",
  },
  {
    question: "What if my conversion problem is actually a traffic quality problem?",
    answer:
      "Both are possible and the audit checks for this. If traffic is low-intent or mismatched with the offer, CRO will not solve the problem by itself. In that case, we fix acquisition intent before optimising the conversion path.",
  },
];

const leakSigns = [
  {
    label: "Vague hero message",
    body: "Your homepage headline describes the product category, not the outcome. Visitors read it and still cannot tell who the product is for or why it matters to them specifically.",
  },
  {
    label: "Weak or missing proof",
    body: "You have testimonials, but they are generic. No specifics, no before and after, no named company or result. Visitors see the testimonials and feel nothing.",
  },
  {
    label: "Wrong CTA timing",
    body: "The demo CTA appears before the visitor understands what the product does. Or the CTA is buried at the bottom after a wall of text they did not read.",
  },
  {
    label: "Friction in the demo or trial flow",
    body: "The booking form asks for too much too early. The trial requires a credit card. The confirmation email gives no signal about what happens next.",
  },
  {
    label: "No clear ICP signal on the page",
    body: "The page tries to speak to everyone. No named role, no named problem, no named industry. Visitors leave — not because the product is wrong, but because the page gave no signal it was built for them.",
  },
];

const auditItems = [
  {
    icon: MessageSquare,
    title: "Messaging Clarity",
    body: "Does the hero answer who this is for, what problem it solves, and why now? Is the value visible in the first scroll? Does the copy use the language your buyer uses?",
  },
  {
    icon: Target,
    title: "CTA Structure",
    body: "Where does the primary CTA appear? Is there a logical sequence from awareness to interest to action? Are secondary CTAs confusing the main conversion goal?",
  },
  {
    icon: Shield,
    title: "Proof and Trust Signals",
    body: "Are testimonials specific and credible? Is there a case study with a real result? Does the proof appear at the moment the visitor needs reassurance — or buried at the bottom?",
  },
  {
    icon: FileSearch,
    title: "Funnel Friction",
    body: "How many steps between first visit and a booked demo? What does the form ask for? What happens after submission? Is the confirmation email useful or generic?",
  },
  {
    icon: BarChart2,
    title: "Analytics Visibility",
    body: "Do you know where visitors drop? Do you have scroll depth data? Are demo booking conversions tracked as events? Without visibility, you are guessing at what to fix.",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Conversion Audit",
    body: "I review the full path: homepage, landing pages, demo flow, confirmation, and any paid or outbound traffic landing pages. I identify the three to five highest-impact problems blocking conversion.",
  },
  {
    number: "02",
    title: "Priority Fix Map",
    body: "You get a clear ranked list of what to fix, why it matters, and what good looks like. No jargon. No 40-page report. No padding.",
  },
  {
    number: "03",
    title: "Execution",
    body: "I help rewrite and restructure the core conversion assets. This connects directly to the SaaS landing page work and, where relevant, the messaging used in cold email and paid ads — because conversion problems often run across all channels at once.",
  },
  {
    number: "04",
    title: "Review",
    body: "Once fixes are live, I review performance and identify the next layer of improvements. CRO is not a one-time audit. But the first pass usually moves the number meaningfully.",
  },
];

const proofItems = [
  {
    company: "Zembra",
    tag: "Positioning + Conversion Path",
    result: "Significant revenue growth through clearer positioning",
    body: "Weak positioning meant visitors could not tell what the product was for in the first scroll. After repositioning the hero, restructuring the proof section, and rebuilding the outreach-to-landing-page flow, the product saw significant growth.",
  },
  {
    company: "Shipzzer",
    tag: "ICP Messaging + SEO",
    result: "Top-3 organic rankings on core industry keywords",
    body: "The page explained features but not outcomes. After restructuring the messaging for a specific ICP and aligning the GTM strategy with conversion intent, Shipzzer reached top-3 organic rankings with a page that could hold the traffic.",
  },
  {
    company: "GrowApp",
    tag: "Full Acquisition System",
    result: "Bootstrapped — zero to AppSumo launch",
    body: "Built and launched the full acquisition and conversion system from zero, including the landing page, AppSumo listing, and trial flow — as a bootstrapped SaaS founder who needed the page to convert without a marketing team.",
  },
];

const ConversionRateOptimisationSpecialist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ══════════════════════════════════════════════
          1. HERO — dark
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 bg-[radial-gradient(circle_at_15%_0%,rgba(124,60,255,0.28),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(255,91,31,0.18),transparent_30%),linear-gradient(135deg,#090713_0%,#170920_46%,#070711_100%)]">
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-xl">
              <AnimateIn delay={100}>
                <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                  SaaS CRO Consultant
                </p>
              </AnimateIn>
              <AnimateIn delay={150}>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                  Conversion Rate Optimisation Specialist for SaaS Companies
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p className="text-lg text-[#cec8dd] mb-4 leading-relaxed">
                  If your SaaS has traffic but not enough demos, the problem is usually not the channel. It is the conversion path.
                </p>
                <p className="text-[#cec8dd] mb-8 leading-relaxed">
                  I help B2B SaaS founders find where trust breaks — then fix the messaging, proof, CTA structure, and funnel friction stopping visitors from taking the next step. Not button-colour testing. Real diagnosis, then execution.
                </p>
              </AnimateIn>
              <AnimateIn delay={250}>
                <ul className="space-y-3 mb-8">
                  {[
                    "Full conversion path audit — not just the landing page in isolation",
                    "Execution included, not just a slide deck of recommendations",
                    "Fix trust gaps before spending more on acquisition",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min GTM Audit
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10" asChild>
                    <Link to="/case-studies">View case studies</Link>
                  </Button>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn delay={200} className="flex-shrink-0 w-full lg:w-auto">
              <div className="relative lg:max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
                <figure className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                  <img
                    src="/saas-conversion-rate-optimisation-specialist-wael-aouididi.webp"
                    alt="SaaS conversion rate optimisation specialist Wael Aouididi auditing a SaaS funnel"
                    width={1200}
                    height={630}
                    decoding="async"
                    fetchPriority="high"
                    className="aspect-[1200/630] w-full rounded-[20px] object-cover"
                  />
                </figure>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WHY NOT BUTTON COLOURS — light
      ══════════════════════════════════════════════ */}
      <section className="rounded-t-[32px] bg-white py-20 md:py-28 shadow-[0_-36px_90px_rgba(0,0,0,0.25)]">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimateIn delay={100} className="mb-14">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Real Problem
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02] mb-5">
              Why SaaS Conversion Problems Are Rarely Button-Colour Problems
            </h2>
            <p className="text-[#4d4658] text-lg leading-relaxed mb-6">
              Most CRO advice is written for e-commerce. Add urgency. Test the headline colour. Move the CTA above the fold. That is not SaaS.
            </p>
            <p className="text-[#4d4658] text-lg leading-relaxed mb-8">
              SaaS buyers do not impulse-buy. They evaluate. They compare. They read, scroll, leave, come back, and then decide whether to book a demo or move on. The conversion problem in B2B SaaS is almost always a trust problem.
            </p>
            <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.09em] text-primary mb-4">Visitors are asking:</p>
              <div className="space-y-3">
                {[
                  "Do I understand what this does in the first few seconds?",
                  "Is this built for someone like me?",
                  "Is there proof that it works?",
                  "What happens if I book a demo — am I going to be pressured?",
                  "Why should I trust this founder or product over the others I just looked at?",
                ].map((q) => (
                  <div key={q} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">—</span>
                    <span className="text-[#4d4658] text-sm leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <blockquote className="rounded-r-[24px] border-l-[5px] border-primary bg-[#11111f] px-8 py-7 font-display text-xl font-black leading-tight text-white shadow-[0_24px_70px_rgba(7,7,17,0.16)]">
              I look beyond the page design and review the full path from traffic source to demo booking. That is the gap I fix.
            </blockquote>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. SIGNS OF LEAKING — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              Diagnosis
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-white leading-[1.02] mb-4">
              Signs Your SaaS Conversion Path Is Leaking
            </h2>
            <p className="text-[#cec8dd] max-w-xl mx-auto leading-relaxed">
              If you recognise more than two of these, you have a conversion problem worth fixing before spending more on acquisition.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
            {leakSigns.map((item, i) => (
              <AnimateIn key={item.label} delay={150 + i * 70}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 h-full hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300">
                  <p className="text-[11px] font-black uppercase tracking-[0.09em] text-primary mb-3">{item.label}</p>
                  <p className="text-[#cec8dd] text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="text-center">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a 20-min GTM Audit — Find the Leak
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. WHAT I AUDIT — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14 max-w-2xl mx-auto">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Audit
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02] mb-4">
              What I Audit
            </h2>
            <p className="text-[#4d4658] leading-relaxed">
              I review the full conversion path — not just the landing page in isolation.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {auditItems.map((item, i) => (
              <AnimateIn key={item.title} delay={150 + i * 70}>
                <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-7 h-full hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(124,60,255,0.08)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#11101a] mb-3">{item.title}</h3>
                  <p className="text-[#4d4658] text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. HOW I WORK — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14 max-w-2xl mx-auto">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              The Process
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-white leading-[1.02] mb-4">
              How I Work
            </h2>
            <p className="text-[#cec8dd] leading-relaxed">
              After the audit, you get a prioritised fix list — not a 40-page report you will never read.
            </p>
          </AnimateIn>

          <div className="max-w-3xl mx-auto border-t border-white/10">
            {howItWorks.map((step, i) => (
              <AnimateIn key={step.number} delay={150 + i * 80}>
                <div className="grid grid-cols-[64px_1fr] gap-6 border-b border-white/10 py-8">
                  <div className="text-[13px] font-black tracking-widest text-primary pt-1">{step.number}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[#cec8dd] leading-relaxed text-[15.5px]">
                      {step.number === "03" ? (
                        <>
                          I help rewrite and restructure the core conversion assets. This connects directly to the{" "}
                          <Link to="/landing-page-for-saas" className="text-primary hover:underline">
                            SaaS landing page
                          </Link>{" "}
                          work and, where relevant, the messaging used in{" "}
                          <Link to="/cold-email-for-saas" className="text-primary hover:underline">
                            cold email for SaaS
                          </Link>{" "}
                          — because conversion problems often run across all channels at once.
                        </>
                      ) : (
                        step.body
                      )}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. PROOF — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-14">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
              Real Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[46px] text-[#11101a] leading-[1.02] mb-4">
              Proof and Experience
            </h2>
            <p className="text-[#4d4658] max-w-xl mx-auto leading-relaxed">
              I have audited and rebuilt conversion paths across multiple B2B SaaS products as both an operator and a consultant.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
            {proofItems.map((item, i) => (
              <AnimateIn key={item.company} delay={150 + i * 80}>
                <div className="rounded-2xl border border-[#11111f]/10 bg-[#fbfbfe] p-7 h-full hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,7,17,0.09)] transition-all duration-300">
                  <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                    <span className="font-display text-xl font-bold text-[#11101a]">{item.company}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-black text-primary mb-3">{item.result}</p>
                  <p className="text-[#4d4658] text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="text-center">
            <Button variant="outline" size="lg" className="border-[#11111f]/20 text-[#11101a] hover:border-primary/40 hover:text-primary" asChild>
              <Link to="/case-studies">
                View all case studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. WHO THIS IS NOT FOR + FAQ — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100} className="mb-16">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7 md:p-9">
              <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                Honest Filter
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-5">
                Who This Is Not For
              </h2>
              <ul className="space-y-3">
                {[
                  "You want a long research report and no execution.",
                  "You believe your conversion problem is a design problem. Prettier pages with vague messaging still do not convert.",
                  "You want someone to validate that your current page is fine. If it is fine, the audit will say so. But founders who are not willing to hear otherwise will not get value from the process.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#cec8dd] text-[15px] leading-relaxed">
                    <span className="text-white/25 font-bold mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[#cec8dd] leading-relaxed text-sm border-l-[3px] border-primary pl-4">
                This works best for founders who already suspect the page is the problem and want to know exactly what to fix.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. FAQ — light
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-28" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100} className="mb-10">
            <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">FAQ</span>
            <h2 className="font-display font-bold text-3xl md:text-[46px] text-[#11101a] leading-[1.02]">
              Frequently Asked Questions
            </h2>
          </AnimateIn>

          <div className="border-t border-[#11111f]/10">
            {faqItems.map((item, index) => (
              <AnimateIn key={item.question} delay={100 + index * 40}>
                <details
                  open={index === 0}
                  className="border-b border-[#11111f]/10 py-5"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <h3 className="text-base font-black text-[#171421]">{item.question}</h3>
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 opacity-60" />
                  </summary>
                  <p className="mt-3 text-[#5d5668] leading-relaxed text-[15.5px]">{item.answer}</p>
                </details>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. FINAL CTA — dark
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100}>
            <div className="relative rounded-3xl overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(124,60,255,0.25),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,91,31,0.15),transparent_50%),linear-gradient(135deg,#0f0a1a,#170920)] border border-primary/20 p-12 md:p-16 text-center shadow-[0_28px_80px_rgba(7,7,17,0.4)]">
              <span className="mb-4 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                Ready to Find Where Your Funnel Is Leaking?
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 max-w-3xl mx-auto leading-tight">
                If you have traffic but not enough demos, the answer is in the conversion path.
              </h2>
              <p className="text-[#cec8dd] mb-3 max-w-xl mx-auto leading-relaxed">
                In a 20-minute GTM Audit, I will tell you exactly where trust is breaking down and what to fix first.
              </p>
              <p className="text-[#cec8dd]/70 mb-10 max-w-xl mx-auto leading-relaxed text-sm">
                Bring your website, your traffic source, and your current demo or trial numbers. We will find the leak.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min GTM Audit
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/landing-page-for-saas">SaaS landing page strategy</Link>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
};

export default ConversionRateOptimisationSpecialist;
