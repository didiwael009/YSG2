import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "What should a SaaS marketing plan include?",
    answer:
      "A SaaS marketing plan should include: a clear ICP definition, a positioning statement that explains why a specific buyer would choose this product over alternatives, a landing page and conversion path that earns trust, basic tracking so decisions are based on data, a primary acquisition channel with a 90-day goal, and a follow-up system. Plans that skip the first three and jump straight to channels tend to produce expensive, inconclusive results.",
  },
  {
    question: "How long should a SaaS marketing plan be?",
    answer:
      "Long enough to be useful, short enough to be used. A one-page framework with honest answers is more valuable than a 40-slide deck that nobody acts on. The goal is clarity about what to fix first and in what order — not comprehensiveness.",
  },
  {
    question: "When should an early-stage SaaS founder start investing in marketing?",
    answer:
      "As early as possible — but in the right order. Positioning and landing page work should happen before significant acquisition spend. Cold email can start earlier because it provides fast feedback on positioning and offer angle. Paid ads and SEO make more sense once the conversion path is validated.",
  },
  {
    question: "Should a SaaS marketing plan include SEO?",
    answer:
      "Yes, for most SaaS products. SEO compounds over time and produces qualified organic traffic that supports trust. But SEO is a medium-term channel — it rarely produces meaningful results in under six months. It should be part of the plan, but not the only channel for a founder who needs pipeline now.",
  },
  {
    question: "What is the difference between a SaaS marketing plan and a SaaS GTM strategy?",
    answer:
      "A GTM strategy defines the overall approach: who you are selling to, how you will reach them, and what the commercial model looks like. A marketing plan is the execution layer: which specific channels, activities, and timelines will be used to generate pipeline. The GTM strategy should exist before the marketing plan is built. See the B2B SaaS marketing strategy guide for more on that distinction.",
  },
  {
    question: "How do I know if my SaaS marketing plan is working?",
    answer:
      "Measure pipeline, not activity. The right metrics are demos booked, trials started, and qualified pipeline created — not email open rates, page views, or social followers. If activity is high but pipeline is flat, the problem is usually positioning, landing page, or conversion path — not channel execution.",
  },
];

export default function SaasMarketingPlan() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ══════════════════════════════════════════════
          HERO — dark
      ══════════════════════════════════════════════ */}
      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                SaaS Growth Framework
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
                SaaS Marketing Plan: A Practical Framework for Founders
              </h1>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Most SaaS marketing plans are built backwards.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                They start with channels: which ads to run, which content to publish, which outreach sequences to write. Then founders wonder why the plan is not producing pipeline.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The channel is rarely the problem.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The problem is that most SaaS marketing plans skip the steps that make channels work: positioning, landing page clarity, conversion path, and trust. Without those foundations, more traffic produces more evidence that something is broken — not more demos.
              </p>

              {/* 6-step order */}
              <div id="order" className="rounded-xl border border-border bg-card/60 p-6 mb-8">
                <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  The SaaS Marketing Plan Order
                </p>
                <ol className="space-y-2">
                  {[
                    "Positioning",
                    "Landing page",
                    "Conversion path",
                    "Tracking",
                    "Acquisition channels",
                    "Follow-up",
                  ].map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="text-[11px] font-black text-primary min-w-[24px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-4">
                  If you skip the first four, SEO, ads, and cold email will only amplify the leak.
                </p>
              </div>

              {/* Visual flow: SaaS marketing plan order */}
              <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-medium">
                {["Positioning", "Landing Page", "Conversion Path", "Tracking", "Acquisition", "Follow-up"].map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-primary">{step}</span>
                    {i < arr.length - 1 && <span className="text-muted-foreground">→</span>}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min GTM Audit
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TABLE OF CONTENTS
      ══════════════════════════════════════════════ */}
      <section className="py-8 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Contents</p>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
              {[
                { href: "#order", label: "The SaaS Marketing Plan Order" },
                { href: "#how-to-use", label: "How to Use This Framework" },
                { href: "#why-plans-fail", label: "Why Most SaaS Marketing Plans Fail" },
                { href: "#step-1", label: "Step 1 — Nail the Positioning First" },
                { href: "#step-2", label: "Step 2 — Fix the Landing Page" },
                { href: "#step-3", label: "Step 3 — Build the Conversion Path" },
                { href: "#step-4", label: "Step 4 — Make Tracking Visible" },
                { href: "#step-5", label: "Step 5 — Choose the Right Channels" },
                { href: "#step-6", label: "Step 6 — Build a Follow-Up System" },
                { href: "#mistakes", label: "Common Mistakes" },
                { href: "#diagnosis", label: "Quick Diagnosis" },
                { href: "#template", label: "One-Page Template" },
                { href: "#faq", label: "FAQ" },
              ].map((item) => (
                <a key={item.href} href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW TO USE + WHY PLANS FAIL — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">

              {/* How to use */}
              <h2 id="how-to-use" className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                How to Use This Framework
              </h2>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                Six steps. Specific order. Each step builds on the one before it.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                Positioning informs the landing page. The landing page shapes the conversion path. The conversion path determines what tracking you need. Tracking tells you which channels are worth scaling. Channels feed the follow-up system.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                Skip a step and you will feel it — usually as wasted spend, flat pipeline, or channels that work for a month then stop.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                <strong className="text-[#11101a]">As a diagnostic:</strong> Read each step and score yourself honestly. Where is the weakest link? Fix that first. You do not need to fix everything — you need to fix the step holding back every step after it.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                <strong className="text-[#11101a]">As a build order:</strong> Follow the steps in sequence. Resist jumping to channels before the foundations are solid. Most founders who do that spend six months testing channels when the real problem was on the landing page.
              </p>
              <p className="text-[#4d4658] mb-10 leading-relaxed">
                This is not about perfection. Good enough to learn from is the goal. Start with Step 1. Fix the gap. Move to Step 2. For the strategy layer that sits behind this plan, the{" "}
                <Link to="/b2b-saas-marketing-strategy" className="text-primary hover:underline">
                  B2B SaaS marketing strategy
                </Link>{" "}
                guide covers the full picture.
              </p>

              {/* Why plans fail */}
              <h2 id="why-plans-fail" className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                Why Most SaaS Marketing Plans Fail
              </h2>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                Here is what most SaaS marketing plans look like in practice:
              </p>
              <ol className="space-y-2 mb-6 pl-1">
                {[
                  "Pick a channel — SEO, paid ads, cold email, content.",
                  "Execute for 60–90 days.",
                  "See weak results.",
                  "Blame the channel.",
                  "Try a different channel.",
                  "Repeat.",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                    <span className="text-primary font-bold flex-shrink-0 min-w-[20px]">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                The cycle continues. The pipeline stays unpredictable.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                The reason this happens is not bad execution. It is wrong sequencing.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                Channels are amplifiers. They take what you already have — your positioning, your landing page, your offer, your conversion path — and send more people through it. If those foundations are weak, more traffic makes the problem more visible, not less.
              </p>
              <p className="text-[#4d4658] mb-4 leading-relaxed">
                A founder who builds a SaaS marketing plan around channels first is spending money to discover what is already broken. That is expensive research.
              </p>
              <p className="text-[#4d4658] leading-relaxed">
                The right SaaS marketing plan starts with foundations. Then adds channels only when the foundation can hold the traffic. If you want someone to diagnose this for your specific situation, the{" "}
                <Link to="/saas-marketing-agency" className="text-primary hover:underline">
                  SaaS marketing agency alternative
                </Link>{" "}
                page explains how that works in practice.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEPS 1–2 — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto space-y-14">

              {/* Step 1 */}
              <div id="step-1">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 1</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Nail the Positioning First
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Every other step in this plan depends on this one. If positioning is vague, the landing page will be vague. If the landing page is vague, the ads will be expensive. If the ads are expensive, the pipeline will feel random.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Positioning is not a tagline. It is the answer to one question:
                </p>
                <blockquote className="border-l-4 border-primary pl-5 py-2 mb-4">
                  <p className="text-foreground font-semibold leading-relaxed">
                    Why would a specific person with a specific problem choose this product over every other option available to them right now?
                  </p>
                </blockquote>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Most SaaS products have weak positioning because they try to appeal to too broad an audience. The messaging is vague enough to include everyone — which means it speaks clearly to no one.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg border border-border bg-card/50 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Weak positioning</p>
                    <ul className="space-y-2">
                      {[
                        '"The all-in-one platform for growing teams"',
                        '"Streamline your workflow with intelligent automation"',
                        '"Everything you need to manage your business"',
                      ].map((item) => (
                        <li key={item} className="text-sm text-muted-foreground leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">Strong positioning</p>
                    <ul className="space-y-2">
                      {[
                        '"For freight forwarders who need real-time shipment visibility without rebuilding their TMS"',
                        '"Cold email infrastructure for early-stage SaaS founders doing founder-led outbound"',
                        '"Landing page conversion audits for B2B SaaS with traffic but weak demo bookings"',
                      ].map((item) => (
                        <li key={item} className="text-sm text-muted-foreground leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The difference is specificity. Strong positioning names a role, a problem, a context, and a reason why now.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Weak: "Project management software for modern teams." Better: "Project management software for remote product teams that need fewer status meetings and clearer sprint ownership." The first version describes a category. The second names the buyer, the context, the pain, and the outcome.
                </p>

                <div className="rounded-lg border border-border bg-card/60 p-5">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Before building any other part of your SaaS marketing plan, answer these four questions:
                  </p>
                  <ol className="space-y-2">
                    {[
                      "Who is this for — specifically? Not 'small businesses.' A named role, industry, company size, and situation.",
                      "What painful problem does it solve — in the language your buyer uses, not your product language?",
                      "Why does it matter now — what is the trigger that makes this problem urgent?",
                      "Why this product and not the alternatives — what is the specific mechanism that makes it different?",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary font-bold flex-shrink-0 min-w-[20px]">{i + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Step 2 */}
              <div id="step-2">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 2</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Fix the Landing Page Before Scaling Traffic
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Positioning tells visitors what you do. The landing page is where they decide whether to trust it.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The landing page is where your SaaS marketing plan either works or leaks. Every channel sends traffic somewhere. Ads, cold email, SEO, partnerships — they all eventually bring a visitor to a page that either earns their trust or loses it.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Most SaaS landing pages fail to earn trust because they are built around the product, not the buyer. A typical weak SaaS landing page opens with a headline that describes a product category not an outcome, uses feature lists instead of outcome statements, has no ICP signal, shows logos or testimonials that are too generic to be persuasive, and puts the CTA before the visitor has enough context to act on it.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A{" "}
                  <Link to="/landing-page-for-saas" className="text-primary hover:underline">
                    SaaS landing page
                  </Link>{" "}
                  that earns trust does the opposite. It opens with the buyer's problem. It shows proof that is specific and credible. It answers objections before they are asked. And it asks for the demo at the moment the visitor has enough context to say yes.
                </p>

                <div className="rounded-lg border border-border bg-card/60 p-5 mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Before you scale any acquisition channel, check your landing page:
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Can a first-time visitor understand what this does and who it is for within five seconds?",
                      "Does the headline name an outcome, not a feature or product category?",
                      "Is there proof that is specific — a named company, a real result, a before and after?",
                      "Does the page handle the top three objections your buyers have?",
                      "Is the CTA asking for something appropriate for where the visitor is in their awareness?",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-3">
                    If the answer to any of these is no, fix the page before adding more traffic. More traffic into a leaking page is wasted budget.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  A common example: a founder sends paid traffic to a landing page with this hero — "Automate your workflow with AI." That does not tell the visitor who it is for, what workflow, or why they should trust it. A clearer version: "AI workflow automation for B2B support teams handling 500+ tickets per week." Now the page has a buyer, a use case, and a situation. The rest of the page becomes much easier to build.
                </p>
              </div>

            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEPS 3–4 — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto space-y-14">

              {/* Step 3 */}
              <div id="step-3">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 3</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                  Build the Conversion Path
                </h2>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  A good landing page earns the click. The conversion path determines what happens after it — and most of the pipeline is lost here.
                </p>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  The conversion path is everything between the first visit and the demo booking or trial signup. Most SaaS teams think about the landing page in isolation. But the conversion path includes:
                </p>
                <ul className="space-y-2 mb-6 pl-1">
                  {[
                    "The landing page and its CTA",
                    "The booking flow or trial signup form",
                    "The confirmation email or next step",
                    "The follow-up sequence before the demo",
                    "The demo itself and what happens after",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  Each of these steps is a potential leak. A long booking form loses people who were interested but not committed. A generic confirmation email with no next step loses the momentum built on the landing page. No follow-up sequence before the demo means a percentage of booked demos become no-shows.
                </p>

                <div className="rounded-lg border border-[#11111f]/10 bg-[#f9f8fc] p-5 mb-6">
                  <p className="text-sm font-semibold text-[#11101a] mb-3">
                    Map your current conversion path and look for:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Steps that ask for more information than necessary",
                      "Gaps where the visitor gets no communication after taking action",
                      "Points where the product's value is not reinforced between first visit and demo",
                      "Any friction that makes the next step feel harder than it needs to be",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                        <span className="text-primary mt-1 flex-shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  The goal of the conversion path is to reduce the distance between interest and commitment. Every unnecessary step or gap is an opportunity for the buyer to reconsider or forget.
                </p>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  That is when{" "}
                  <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">
                    SaaS conversion rate optimisation
                  </Link>{" "}
                  becomes genuinely useful — not as a fix for weak traffic, but as a way to compound results from traffic that is already somewhat qualified.
                </p>
                <p className="text-[#4d4658] leading-relaxed">
                  A common conversion leak is asking for too much too early. A visitor clicks "Book a Demo" and lands on a form asking for full name, work email, company size, phone number, job title, budget, timeline, and a message. A shorter form, a calendar with clear expectations, or a lower-friction CTA like "Get a 20-min diagnosis" will usually convert better and filter less aggressively.
                </p>
              </div>

              {/* Step 4 */}
              <div id="step-4">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 4</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                  Make Tracking Visible
                </h2>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  Without tracking, every marketing decision is a guess. With it, you can find the leak instead of just feeling it.
                </p>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  Common tracking gaps in early-stage SaaS:
                </p>
                <ul className="space-y-2 mb-6 pl-1">
                  {[
                    "Demo bookings are not tracked as conversion events",
                    "Paid traffic is not separated from organic in analytics",
                    "UTM parameters are inconsistent or missing",
                    "Scroll depth and CTA click events are not set up",
                    "No way to tell which channel or page is producing the most qualified pipeline",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg border border-[#11111f]/10 bg-[#f9f8fc] p-5 mb-6">
                  <p className="text-sm font-semibold text-[#11101a] mb-3">
                    At minimum, every SaaS marketing plan should have:
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Conversion events for demo bookings, trial signups, and contact form submissions",
                      "Source attribution so you know which channel each conversion came from",
                      "A way to separate traffic quality — not just volume",
                      "Weekly review of the metrics that actually connect to pipeline",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[#4d4658] leading-relaxed">
                  A SaaS marketing plan should track actions that show buying intent: pricing page visits, demo CTA clicks, form starts, form completions, trial signups, email reply rate, demo booked, demo attended, and lead source by channel. Without this, you cannot tell whether the problem is traffic quality, landing page clarity, form friction, or sales follow-up. Each of those is a different fix.
                </p>
              </div>

            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MID-PAGE CTA
      ══════════════════════════════════════════════ */}
      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-primary/5 p-7 md:p-9 text-center">
              <p className="text-sm font-semibold text-foreground mb-2">
                If your positioning is clear and your landing page is solid, the next thing blocking pipeline is usually the conversion path or the tracking.
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                In a 20-minute GTM Audit I will show you which step is the real bottleneck.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min GTM Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEPS 5–6 — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto space-y-14">

              {/* Step 5 */}
              <div id="step-5">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 5</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                  Choose the Right Acquisition Channels
                </h2>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  This is the step most founders start with. It should be the fifth. Channels only work when the four steps before them are solid.
                </p>
                <p className="text-[#4d4658] mb-8 leading-relaxed">
                  Only after the foundations are in place — positioning, landing page, conversion path, tracking — does it make sense to invest seriously in acquisition channels. The right channel depends on the product, the ICP, the ACV, and the buying motion. There is no universal answer. But there are useful principles.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-lg font-bold mb-3 text-[#11101a]">SEO and Content</h3>
                    <p className="text-[#4d4658] leading-relaxed">
                      SEO compounds over time and works best for SaaS products where buyers actively search for solutions — which is most B2B SaaS in established categories. The mistake most founders make is targeting broad keywords too early. Start with specific, buyer-intent queries. Content works when it matches that intent: practical frameworks, teardowns, and guides a qualified buyer would bookmark. Generic keyword-stuffed articles do not compound. Useful ones do. Google's <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">helpful content guidance</a> is a useful filter here: create content for people first, not just search engines.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold mb-3 text-[#11101a]">Cold Email</h3>
                    <p className="text-[#4d4658] mb-3 leading-relaxed">
                      <Link to="/cold-email-for-saas" className="text-primary hover:underline">
                        Cold email for SaaS
                      </Link>{" "}
                      is the most direct outbound channel available to early-stage founders. It does not require a large budget. It does require a specific ICP, a clean sending infrastructure, and a genuine offer angle.
                    </p>
                    <p className="text-[#4d4658] leading-relaxed">
                      Cold email works when the list is tight, the message connects a specific problem to a specific outcome, and the follow-up adds value rather than just checking in. It does not work when the list is too broad, the message is generic, and the infrastructure is broken. Most failed cold email programmes have all three problems.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold mb-3 text-[#11101a]">Paid Ads</h3>
                    <p className="text-[#4d4658] mb-3 leading-relaxed">
                      <Link to="/meta-ads-for-saas" className="text-primary hover:underline">
                        Meta Ads for SaaS
                      </Link>{" "}
                      and other paid channels are amplifiers. They work when the landing page converts and the offer angle is clear. They are expensive ways to diagnose a broken funnel.
                    </p>
                    <p className="text-[#4d4658] leading-relaxed">
                      For most early-stage SaaS founders, paid acquisition makes sense after the organic and outbound channels have validated the positioning and landing page. The exception is when the product has a short sales cycle, a clear ICP, and enough margin to absorb the cost of testing.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold mb-3 text-[#11101a]">The channel sequencing principle</h3>
                    <p className="text-[#4d4658] mb-4 leading-relaxed">
                      Do not try to run all channels at once. Most early-stage SaaS teams have limited time and budget. The right approach is to start with the channel that reaches the most qualified buyer with the least infrastructure, validate the positioning and conversion path, then expand.
                    </p>
                    <p className="text-[#4d4658] mb-4 leading-relaxed">
                      For most B2B SaaS founders in the early stage:
                    </p>
                    <ol className="space-y-2 mb-4">
                      {[
                        "Cold email — low cost, direct, fast feedback",
                        "SEO — compounds over time, supports trust",
                        "Paid ads — scales what is already working",
                      ].map((item, i) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-[#4d4658] leading-relaxed">
                          <span className="text-primary font-bold flex-shrink-0 min-w-[20px]">{i + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="text-[#4d4658] leading-relaxed">
                      The right starting channel depends on the buyer. The channel depends on buyer awareness, urgency, deal size, and how clearly the problem is already being searched.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div id="step-6">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Step 6</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                  Build a Follow-Up System
                </h2>
                <p className="text-[#4d4658] mb-4 leading-relaxed">
                  Most pipeline is not lost in the channel. It is lost in the silence between the first conversation and the decision.
                </p>
                <p className="text-[#4d4658] mb-6 leading-relaxed">
                  A prospect books a demo and gets a generic calendar invite. No context. No reinforcement of why they should show up. No pre-read or value before the meeting. The demo happens — or does not — and the follow-up after is a single "just checking in" email that gets ignored.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-[#11111f]/10 bg-[#f9f8fc] p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#11101a] mb-3">Before the demo</p>
                    <ul className="space-y-2">
                      {[
                        "A confirmation email that explains what will happen in the meeting",
                        "One pre-read piece — a case study, a teardown, a relevant article — that warms up the buyer before they join",
                        "A reminder 24 hours before",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#4d4658] leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-[#11111f]/10 bg-[#f9f8fc] p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#11101a] mb-3">After the demo</p>
                    <ul className="space-y-2">
                      {[
                        "A same-day summary of what was discussed and what the next step is",
                        "A follow-up sequence over the next 7–14 days that adds value — a relevant insight, a case study that matches their situation",
                        "A clear close at the end that either moves them forward or lets them opt out",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[#4d4658] leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-[#4d4658] mt-5 leading-relaxed">
                  The goal of the follow-up system is to maintain momentum between the first conversation and the decision. Most B2B buyers need multiple touchpoints. Without a system, those touchpoints do not happen.
                </p>
              </div>

            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MISTAKES + DIAGNOSIS — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto space-y-14">

              {/* Common mistakes */}
              <div id="mistakes">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  Common SaaS Marketing Plan Mistakes
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      label: "Starting with tactics before positioning is clear",
                      body: "Ads, content, cold email — all of these require clear positioning to work. Running tactics before positioning is clear means every channel is working against itself.",
                    },
                    {
                      label: "Treating the landing page as a design project",
                      body: "The landing page is a conversion asset. Design supports conversion. It does not replace copy, positioning, and proof.",
                    },
                    {
                      label: "Measuring activity instead of pipeline",
                      body: "Open rates, click-through rates, page views, social followers — these are activity metrics. They tell you something is happening. They do not tell you whether it is producing revenue. Measure demos booked, trials started, and qualified pipeline.",
                    },
                    {
                      label: "Running too many channels at once",
                      body: "Spreading limited resources across five channels means none of them gets enough attention to work. Pick one or two. Get them working. Then expand.",
                    },
                    {
                      label: "Giving up too early",
                      body: "Most channels take longer to produce results than founders expect. Cold email needs two to three months of testing to dial in. SEO takes six to twelve months to compound. Paid ads need enough spend to generate optimisation data. Quitting after four weeks is the most common reason channels appear not to work.",
                    },
                    {
                      label: "Skipping the follow-up",
                      body: "Pipeline is lost between the first conversation and the decision. A follow-up system is not optional — it is where most of the revenue actually comes from.",
                    },
                  ].map((item) => (
                    <div key={item.label} className="p-5 rounded-lg border border-border bg-card/50">
                      <p className="font-semibold text-foreground mb-2">{item.label}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick diagnosis */}
              <div id="diagnosis">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Quick Diagnosis
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Use this if you are not sure where the problem is.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      condition: "Traffic is growing but demos are flat",
                      fix: "Check the landing page first. The page is probably not earning trust fast enough.",
                    },
                    {
                      condition: "Demos are booked but no-shows are high",
                      fix: "Check the pre-demo follow-up. Visitors who do not get a confirmation with context and a reminder will forget they signed up.",
                    },
                    {
                      condition: "Cold email reply rates are low",
                      fix: "Check ICP and offer angle before rewriting the sequence. The message is usually the problem, not the words.",
                    },
                    {
                      condition: "Paid ads are expensive and producing few demos",
                      fix: "Check message match between the ad and the landing page before changing the audience or budget.",
                    },
                    {
                      condition: "Pipeline is inconsistent month to month",
                      fix: "Check tracking first. You may already have pipeline but no visibility into where it is coming from.",
                    },
                  ].map((item) => (
                    <div key={item.condition} className="rounded-lg border border-border bg-card/50 p-5">
                      <p className="text-sm font-semibold text-foreground mb-1.5">
                        If {item.condition} —
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.fix}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                  If one of these sounds familiar, the problem is probably not the channel. It is the step before the channel.
                </p>
              </div>

            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ONE-PAGE TEMPLATE — light
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-[#11111f]/10">
        <div className="container px-4">
          <AnimateIn>
            <div id="template" className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-[#11101a]">
                The One-Page SaaS Marketing Plan Template
              </h2>
              <p className="text-[#4d4658] mb-8 leading-relaxed">
                Use this as a working framework. Fill it in honestly. If you cannot answer a section, that section is the priority to fix before adding acquisition spend.
              </p>

              <div className="space-y-5">
                {[
                  {
                    number: "1",
                    title: "ICP (Ideal Customer Profile)",
                    fields: ["Role:", "Industry:", "Company size:", "Specific problem this product solves:", "Trigger that makes the problem urgent now:"],
                  },
                  {
                    number: "2",
                    title: "Positioning Statement",
                    fields: ["For [specific role] who [specific problem], [product name] is the [category] that [specific outcome] — unlike [alternative], which [limitation]."],
                  },
                  {
                    number: "3",
                    title: "Landing Page Audit",
                    fields: [
                      "Does the hero answer who this is for and what problem it solves? Yes / No",
                      "Is there specific, credible proof? Yes / No",
                      "Is the CTA appropriate for the visitor's awareness level? Yes / No",
                      "Are the top three objections handled on the page? Yes / No",
                    ],
                    note: "If any answer is No, fix the page before scaling traffic.",
                  },
                  {
                    number: "4",
                    title: "Conversion Path",
                    fields: [
                      "Demo booking flow: friction points identified?",
                      "Confirmation email: does it set expectations?",
                      "Pre-demo sequence: does it reinforce value?",
                      "Post-demo follow-up: is there a system?",
                    ],
                  },
                  {
                    number: "5",
                    title: "Tracking Setup",
                    fields: [
                      "Demo bookings tracked as conversion events? Yes / No",
                      "Source attribution working correctly? Yes / No",
                      "Weekly pipeline metrics being reviewed? Yes / No",
                    ],
                  },
                  {
                    number: "6",
                    title: "Primary Acquisition Channel",
                    fields: [
                      "Channel chosen:",
                      "Why this channel for this ICP:",
                      "90-day goal (not vanity metrics — pipeline):",
                      "Weekly input metric to track:",
                    ],
                  },
                  {
                    number: "7",
                    title: "Follow-Up System",
                    fields: [
                      "Pre-demo sequence: in place / not in place",
                      "Post-demo sequence: in place / not in place",
                      "Close cadence: defined / not defined",
                    ],
                  },
                ].map((section) => (
                  <div key={section.number} className="rounded-xl border border-[#11111f]/10 bg-[#f9f8fc] p-5">
                    <div className="flex items-start gap-4">
                      <span className="text-[11px] font-black tracking-widest text-primary min-w-[24px] mt-0.5">
                        {String(parseInt(section.number)).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-[#11101a] mb-3">{section.title}</p>
                        <ul className="space-y-1.5">
                          {section.fields.map((field) => (
                            <li key={field} className="text-sm text-[#4d4658] leading-relaxed">
                              {field}
                            </li>
                          ))}
                        </ul>
                        {section.note && (
                          <p className="text-xs text-primary font-medium mt-3">{section.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[#4d4658] mt-8 leading-relaxed">
                This framework will not produce results by itself. A framework is only useful when it is honest. Fill in the gaps truthfully and the gaps will tell you what to fix first.
              </p>
              <p className="text-[#4d4658] mt-3 leading-relaxed">
                If you want help working through the diagnosis and finding the real bottleneck, see the{" "}
                <Link to="/saas-marketing-agency" className="text-primary hover:underline">
                  SaaS marketing agency alternative
                </Link>{" "}
                page or the full{" "}
                <Link to="/b2b-saas-marketing-strategy" className="text-primary hover:underline">
                  B2B SaaS marketing strategy
                </Link>{" "}
                guide.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-background" id="faq">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-foreground">FAQ</h2>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <p className="font-semibold text-foreground mb-2 leading-snug">{item.question}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — dark
      ══════════════════════════════════════════════ */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Ready to Build a SaaS Marketing Plan That Actually Produces Pipeline?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If you have been running channels without consistent results, the problem is almost always in the foundations — not the tactics.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                In a 20-minute GTM Audit, I will tell you what is actually blocking growth and what to fix first. Bring your current marketing setup, your conversion numbers, and the channel you are most focused on. We will find the bottleneck.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min GTM Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground/60 mt-4">
                Also see:{" "}
                <Link to="/saas-marketing-agency" className="hover:text-primary transition-colors">
                  SaaS marketing agency alternative
                </Link>
                {" "}·{" "}
                <Link to="/b2b-saas-marketing-strategy" className="hover:text-primary transition-colors">
                  B2B SaaS marketing strategy
                </Link>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
