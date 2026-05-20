import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const ruleItems = [
  {
    question: "Does the hero create instant recognition?",
    answer:
      "The visitor should know who the page is for and why it matters within five seconds. If recognition takes longer than that, every section below the hero is doing work the hero should have done.",
  },
  {
    question: "Does the proof appear before doubt peaks?",
    answer:
      "If proof only appears near the footer, most visitors never see it. Proof needs to land in the same scroll as the first hesitation, not three sections later.",
  },
  {
    question: "Is the CTA matched to visitor intent?",
    answer:
      "Cold traffic, high-intent paid search, and demo-ready visitors need different asks. The same CTA cannot serve all three.",
  },
  {
    question: "Can we track the leak?",
    answer:
      "If scroll depth, CTA clicks, form starts, and demo bookings are not tracked, optimisation becomes guesswork. Tracking is the precondition for everything else.",
  },
];

const sixAreas = [
  {
    title: "Hero clarity",
    body: "Rewrite the headline to state the outcome for a specific ICP. Remove jargon. Test whether a new visitor can understand what the product does in under five seconds without reading the subhead.",
  },
  {
    title: "Proof placement",
    body: "Move your strongest proof — specific results, recognisable logos, or a named customer quote — to the second or third section, close to where doubt peaks.",
  },
  {
    title: "CTA hierarchy",
    body: "Every page should have one primary CTA and a secondary softer action. If the page has three or four equally prominent CTAs, conversion is diluted.",
  },
  {
    title: "Objection handling",
    body: "List the three reasons buyers hesitate before booking a demo — usually price uncertainty, implementation risk, and ROI doubt — and address each explicitly.",
  },
  {
    title: "Form friction",
    body: "Ask only for what you need to run the demo. Extra form fields lower submission rates, especially when they serve CRM needs rather than the visitor's next step.",
  },
  {
    title: "Mobile experience",
    body: "If the hero is unreadable at mobile width or the CTA button is below the fold on a small screen, you are losing visitors at the first step.",
  },
];

const auditChecklist = [
  "H1 names the outcome for a specific ICP — not a category or tagline",
  "Subheadline confirms who the product is for",
  "Proof appears above the fold or in the second section",
  "Primary CTA is specific and matches the traffic source",
  "No more than two CTA options on the page",
  "Navigation is removed or simplified on paid traffic pages",
  "At least one customer quote names a specific result",
  "Hero answers what it does, who it is for, why trust it, and what to do next",
  "Page loads in under 3 seconds on mobile",
  "No broken links or placeholder text anywhere",
  "Form asks only for what the next step requires",
  "Page explains what happens after the CTA is clicked",
];

const afterBeforeExamples = [
  {
    before: "All-in-one project management for teams",
    after: "Close projects 40% faster without status meetings — for distributed engineering teams",
  },
  {
    before: "Smart invoicing software",
    after: "Get paid in 3 days instead of 30 — invoice automation for freelance teams",
  },
  {
    before: "Your all-in-one HR platform",
    after: "Onboard new hires in one afternoon, not one week — for scaling SaaS teams",
  },
];

const faq = [
  {
    q: "How do I know if my SaaS landing page needs optimisation?",
    a: "If the page receives qualified traffic but demo bookings are weak or inconsistent, the page needs work. Look for visitors landing and leaving without scrolling past the hero, high mobile bounce rates, a low CTA click rate relative to your traffic source, or a demo booking rate that feels out of proportion to spend.",
  },
  {
    q: "What is the most common SaaS landing page conversion mistake?",
    a: "Leading with features instead of outcomes. The headline describes the product category instead of the specific result a named buyer gets. The visitor reads it, does not feel recognised as the target, and leaves.",
  },
  {
    q: "Should I use the same landing page for paid ads and SEO traffic?",
    a: "Not always. Paid visitors often need more context, more proof, and a softer first ask. Search visitors often arrive further along in the decision process. A dedicated paid landing page with message match to the ad will usually outperform a shared page.",
  },
  {
    q: "How long should a SaaS landing page be?",
    a: "Long enough to earn the conversion, short enough to hold attention. For most B2B SaaS demo request pages, five to seven clear sections is the right range: hero, problem, what you fix, proof, process or deliverables, and CTA.",
  },
  {
    q: "What is a good conversion rate for a SaaS demo request page?",
    a: "Context matters: traffic source, ICP specificity, offer type, ACV, and buying urgency all affect conversion rates. For warm SaaS traffic, 2-5% can be a useful benchmark range, but the right number depends on your setup. Below roughly 1% from qualified traffic usually signals a messaging, trust, or friction problem worth diagnosing before scaling acquisition.",
  },
];

export default function OptimizeSaasLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Landing Page CRO</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                How to Optimise a SaaS Landing Page for More Demo Bookings
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Most SaaS landing page optimisation articles start with button colours and A/B tests. This guide starts with the structural problems that account for most conversion failures.
              </p>
              <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">
                More traffic does not fix a weak landing page. It makes the weakness more expensive. If you want the diagnosis before guessing, see the SaaS landing page strategy service.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="hero" size="lg" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min SaaS Landing Page Audit
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Link
                  to="/landing-page-for-saas"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  SaaS landing page strategy service
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-background p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">My rule before optimising</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 text-foreground">Check the conversion path before changing the design</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {ruleItems.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-border bg-card p-5">
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-foreground mb-2">{item.question}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                If any of these four are weak, A/B testing is premature. Fix the conversion path first.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">The Highest-Leverage Section: Your Hero</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If the first scroll does not answer who this is for, what problem it solves, and what happens next, the rest of the page is irrelevant.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The hero headline is not a tagline. It should describe the outcome your buyer gets, not the feature your product offers.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {afterBeforeExamples.map((item) => (
                  <div key={item.before} className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Weak</p>
                    <p className="font-semibold text-foreground mb-4">{item.before}</p>
                    <p className="text-xs uppercase tracking-wider text-primary mb-2">Strong</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.after}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                The hero CTA should match the visitor&apos;s readiness level. “Book a demo” is appropriate for high-intent paid search traffic. “See how it works” fits colder traffic.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">Six Optimisation Areas That Move Conversion</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {sixAreas.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-background p-5">
                    <p className="font-semibold text-foreground mb-2">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">The SaaS Landing Page Audit Checklist</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Run through this before scaling any paid traffic, outbound, or SEO channel to the page. If you need a broader diagnosis, read the landing page for lead generation guide before buying more traffic.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {auditChecklist.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-4 flex gap-3">
                    <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950 px-6 py-8 md:px-8 md:py-10 text-slate-100">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Not sure where it leaks?</p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Most landing page problems are not where the founder thinks they are.</h2>
                  <p className="text-sm md:text-base leading-relaxed text-slate-300">
                    The hero may be fine and the CTA may be the leak — or the page may convert clicks but lose visitors on the mobile form. Without tracking, it is a guess. With tracking, it is a 20-minute job to find the right fix.
                  </p>
                </div>
                <Button variant="hero" size="lg" className="group shrink-0" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min SaaS Landing Page Audit
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">When to Run A/B Tests vs Qualitative Fixes</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A/B testing requires significant traffic to produce statistically significant results. If your landing page gets fewer than 1,000 unique visitors per month, you cannot run a meaningful A/B test — the sample size is too small and results will not be reliable.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For most early-stage SaaS products, qualitative optimisation produces faster improvements without needing high traffic volume. That means reviewing the page against the checklist, watching session recordings, running five-second tests, and applying structured conversion frameworks before any visual changes.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">
                  Landing page for SaaS →
                </Link>
                <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">
                  CRO specialist →
                </Link>
                <Link to="/blog/landing-page-optimization-best-practices-2026" className="text-primary hover:underline">
                  landing page optimization best practices →
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">FAQ</h2>
              <div className="space-y-6">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-border bg-background p-6">
                    <h3 className="font-display text-xl font-bold mb-3 text-foreground">{item.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                    {"linkTo" in item && item.linkTo ? (
                      <Link to={item.linkTo} className="mt-3 inline-flex text-sm font-medium text-primary hover:underline">
                        {item.linkLabel}
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Related work</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For an example of SaaS positioning and landing page work, see the Shipzzer case study.
              </p>
              <Link to="/case-study/shipzzer" className="inline-flex text-sm font-medium text-primary hover:underline">
                Shipzzer case study
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Get Your Landing Page <span className="text-gradient">Audited</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I review the hero, proof, CTA structure, and mobile experience — and tell you exactly what to fix first.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min SaaS Landing Page Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <p className="mt-6 text-sm text-muted-foreground">
                For an example of SaaS positioning and landing page work, see the{" "}
                <Link to="/case-study/shipzzer" className="text-primary hover:underline">
                  Shipzzer case study
                </Link>
                .
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
