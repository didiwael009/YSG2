import { ArrowRight, CheckCircle2, Target, Users, Palette, BarChart3, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "Do Meta Ads work for B2B SaaS?",
    answer:
      "Yes — but differently than for e-commerce. B2B SaaS buyers do not impulse-convert. Meta Ads work best as a trust-building and demand-capture channel: reaching people who fit your ICP, warming them with content and social proof, and retargeting them after a visit or engagement. The mistake most SaaS founders make is treating Meta like a direct-response channel on day one.",
  },
  {
    question: "What is the main reason Meta Ads fail for SaaS companies?",
    answer:
      "Usually it is one of three things: poor tracking that sends bad signals to the algorithm, broad audiences with no real buyer intent, or ad creative that has fatigued and is no longer generating attention. Any one of these alone tanks performance. Often it is a combination of all three running simultaneously.",
  },
  {
    question: "How important is Meta Pixel and CAPI setup for SaaS?",
    answer:
      "Critical. Without a properly configured Pixel and Conversions API, Meta cannot see your real buyers — it optimises for clicks instead of demos. The Conversions API sends server-side events that survive ad blockers and iOS privacy changes. Without it, you are flying blind and paying more for worse results.",
  },
  {
    question: "What budget do I need to start Meta Ads for SaaS?",
    answer:
      "For B2B SaaS, a minimum of €1,500–2,500/month in ad spend is needed to get meaningful data. Below that, the learning phase takes too long and audiences are too small to optimise against. Budget matters less than having the right tracking, creative, and landing page in place before you spend.",
  },
  {
    question: "How do you handle creative fatigue?",
    answer:
      "Frequency caps and weekly EMQ monitoring. New ad concepts every two weeks minimum — not just new images, but new hooks, angles, and formats. I build anti-fatigue rules into the campaign structure so underperforming ads are paused automatically, and new variations enter before reach drops significantly.",
  },
  {
    question: "Should I fix the landing page before running Meta Ads?",
    answer:
      "Yes. Always. Paid traffic amplifies what is already on the page. If the landing page has weak messaging, missing proof, or a friction-heavy demo flow, Meta Ads spend makes those problems more expensive — not more visible. Fix the conversion path first, then scale the channel.",
  },
];

const failureReasons = [
  {
    label: "Broken tracking",
    body: "Events are firing incorrectly, CAPI is missing, and Meta is optimising for the wrong signals. The algorithm cannot find real buyers because it does not know what a real buyer looks like.",
  },
  {
    label: "Broad audiences",
    body: "Interest targeting stacks too wide. Lookalikes built from weak data. No layered retargeting. The ads reach everyone and convert no one.",
  },
  {
    label: "Creative fatigue",
    body: "The same three creatives running for months. Frequency climbing. CPM rising. CTR dropping. But no new concepts in the pipeline because no one owns the refresh cycle.",
  },
  {
    label: "No landing page alignment",
    body: "The ad makes a specific promise. The landing page makes a different one. The visitor clicks through and loses confidence immediately. Conversion dies between the ad and the page.",
  },
];

const processSteps = [
  {
    step: "01",
    label: "Tracking audit and repair",
    body: "Pixel + CAPI setup, value events configured, EMQ monitored. Meta sees your real buyers — not just clicks.",
    icon: Target,
  },
  {
    step: "02",
    label: "Audience architecture",
    body: "Lookalikes from real buyers. Behavioural layers across 0–7–30 day windows. Retargeting split by intent signal.",
    icon: Users,
  },
  {
    step: "03",
    label: "Creative system",
    body: "New concepts every two weeks. Anti-fatigue rules. Hooks tested against CTR and CPA — not vanity metrics.",
    icon: Palette,
  },
  {
    step: "04",
    label: "Landing page alignment",
    body: "Ad angle and landing page messaging matched. Offer clarity, proof, and CTA hierarchy reviewed before spend scales.",
    icon: Shield,
  },
  {
    step: "05",
    label: "Optimisation cadence",
    body: "Weekly performance review. CPA targets set by campaign stage. Budget shifted toward what works — not spread thin.",
    icon: BarChart3,
  },
];

const fitItems = [
  "You are spending on Meta Ads but demo bookings are inconsistent or low.",
  "Your tracking is unclear and attribution feels unreliable.",
  "Creative has been running for months with no refresh cycle in place.",
  "You want to use Meta as a retargeting layer after organic or cold email.",
  "You are launching a paid acquisition channel and want to build it correctly from day one.",
  "Your landing page and ad creative are not aligned — same budget, lower results.",
];

export default function MetaAdsForSaas() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Meta Ads for SaaS</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Paid Acquisition That Finds Real Buyers —{" "}
                <span className="text-gradient">Not Just Clicks</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I run Meta Ads for B2B SaaS founders who are spending budget but not seeing qualified demos. Tracking, audiences, creative, and landing page alignment — fixed as one system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min Meta Ads Audit
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/case-study/growapp">See a Meta Ads Case Study</Link>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Why Meta Ads fails — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Why Most SaaS Meta Ads Campaigns Underperform
              </h2>
              <p className="text-muted-foreground mb-10">
                The problem is rarely the channel. Meta Ads work for B2B SaaS — but only when tracking, audiences, creative, and landing page alignment are all working together. Most campaigns fail on at least two of these simultaneously.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {failureReasons.map((item) => (
                  <div key={item.label} className="p-5 rounded-lg border border-border bg-background/50">
                    <p className="font-semibold text-foreground mb-2">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Process — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                How I Fix Meta Ads for SaaS
              </h2>
              <p className="text-muted-foreground mb-10">
                Before scaling spend, I audit what the algorithm is seeing, who it is reaching, and what happens after the click. Most improvements come before adding budget.
              </p>
              <div className="space-y-6">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex gap-5 items-start p-5 rounded-lg border border-border">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-primary">{step.step}</span>
                        <p className="font-semibold text-foreground">{step.label}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Fit check — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                This Is a Good Fit If...
              </h2>
              <p className="text-muted-foreground mb-8">
                I work with B2B SaaS founders who have a real product and a conversion problem — not founders who need volume before the offer is clear.
              </p>
              <ul className="space-y-3">
                {fitItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-5 rounded-lg border border-border bg-background/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Not a fit:</span> If you are pre-product, pre-ICP clarity, or looking for a media buyer to hand off to without strategic input. Meta Ads alone do not fix a positioning problem.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* How it connects — light */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Meta Ads Work Best as Part of a GTM System
              </h2>
              <p className="text-muted-foreground mb-6">
                Paid acquisition is one channel in a wider growth system. The strongest results come when Meta Ads run alongside a conversion-ready landing page, a warm retargeting audience from organic, and a follow-up sequence for cold leads.
              </p>
              <p className="text-muted-foreground mb-8">
                If only one channel is running, results are capped. If the landing page is weak, ad spend is wasted. I build the paid layer as part of a system — not as a standalone fix.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/landing-page-for-saas" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Zap className="w-4 h-4" />
                  SaaS Landing Page Strategy
                </Link>
                <Link to="/cold-email-for-saas" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Zap className="w-4 h-4" />
                  Cold Email for SaaS
                </Link>
                <Link to="/conversion-rate-optimisation-specialist" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Zap className="w-4 h-4" />
                  Conversion Rate Optimisation
                </Link>
                <Link to="/case-study/growapp" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <Zap className="w-4 h-4" />
                  Growapp Meta Ads Case Study
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ — dark */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">
                Meta Ads for SaaS — Common Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Start With a <span className="text-gradient">Meta Ads Audit</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                In 20 minutes I can tell you what is blocking your paid performance — tracking, audiences, creative, or the page itself.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min Meta Ads Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free. No pitch. Just a diagnosis of what is blocking paid performance.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
