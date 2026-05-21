import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const ruleItems = [
  {
    title: "Does the hero create instant recognition?",
    body: "The visitor should know who the page is for and why it matters within five seconds. If recognition takes longer than that, every section below the hero is doing work the hero should have done.",
  },
  {
    title: "Does the proof appear before doubt peaks?",
    body: "If proof only appears near the footer, most visitors never see it. Proof needs to land in the same scroll as the first hesitation, not three sections later.",
  },
  {
    title: "Is the CTA matched to visitor intent?",
    body: "Cold traffic, high-intent paid search, and demo-ready visitors need different asks. The same CTA cannot serve all three.",
  },
  {
    title: "Can we track the leak?",
    body: "If scroll depth, CTA clicks, form starts, and demo bookings are not tracked, optimisation becomes guesswork. Tracking is the precondition for everything else.",
  },
];

const optimisationAreas = [
  {
    title: "Hero clarity",
    body: "Rewrite the headline to state the outcome for a specific ICP. Remove jargon. Test whether a new visitor can understand what the product does in under five seconds without reading the subhead.",
  },
  {
    title: "Proof placement",
    body: "Social proof placed only at the bottom of the page is proof placed after most visitors have already left. Move your strongest proof, specific results, recognisable logos, or a customer quote with a named outcome, to the second or third section, close to where doubt peaks.",
  },
  {
    title: "CTA hierarchy",
    body: "Every page should have one primary CTA and a secondary softer action. If the page has three or four equally prominent CTAs, conversion is diluted. Choose the primary action, demote the rest.",
  },
  {
    title: "Objection handling",
    body: "List the three reasons your buyers hesitate before booking a demo. For most B2B SaaS products, they include price uncertainty, implementation risk, and ROI doubt. Address each one explicitly in the page, not buried in the FAQ.",
  },
  {
    title: "Form friction",
    body: "Extra form fields often reduce submissions, especially when they serve CRM needs rather than the visitor's next step. Ask only for what you need to run the demo. Phone number fields tend to lower conversion unless your sales team actually calls leads before the demo. Name and email is sufficient in most cases.",
  },
  {
    title: "Mobile experience",
    body: "Many B2B decision-makers research solutions on mobile, even for products they will buy on desktop. If the hero is unreadable at mobile width or the CTA button is below the fold on a small screen, you are losing visitors at the first step.",
  },
];

const checklistItems = [
  "H1 names the outcome for a specific ICP, not a product category or tagline",
  "Subheadline confirms who the product is for",
  "Proof appears above the fold or in the second section",
  "Primary CTA is specific",
  "No more than two CTA options on the page",
  "Navigation is removed or simplified on paid traffic pages",
  "At least one customer quote names a specific result",
  "The hero answers what it does, who it is for, why trust it, and what to do next",
  "Page loads in under 3 seconds on mobile",
  "No broken links or placeholder text anywhere",
  "Form asks only for what the next step requires",
  "The page explains what happens after the CTA is clicked",
];

const headlineExamples = [
  {
    weak: "All-in-one project management for teams",
    strong: "Close projects 40% faster without status meetings, for distributed engineering teams",
    note: "The first tells me what the product is. The second tells me what I get, for whom, and removes a specific pain point.",
  },
  {
    weak: "Smart invoicing software",
    strong: "Get paid in 3 days instead of 30, invoice automation for freelance teams",
    note: "The second headline names the before state, the after state, and the audience in one sentence.",
  },
  {
    weak: "Your all-in-one HR platform",
    strong: "Onboard new hires in one afternoon, not one week, for scaling SaaS teams",
    note: "The stronger version names the outcome, the contrast, and the audience.",
  },
];

const qualitativeFixes = [
  "Reviewing the page against the 12-point checklist above",
  "Watching session recordings to see where visitors stop scrolling",
  "Running five-second tests with new visitors to check hero comprehension",
  "Applying structured conversion frameworks before any visual changes",
];

const faq = [
  {
    question: "How do I know if my SaaS landing page needs optimisation?",
    answer:
      "If your page receives qualified traffic but demo bookings are weak or inconsistent, the page needs work. Specific signals: visitors landing and leaving without scrolling past the hero, high mobile bounce rates, a low CTA click rate relative to your traffic source, or a demo booking rate that feels disproportionate to spend. Any of these individually is enough to run through the audit checklist. The exact right numbers depend on your traffic source, ICP, and offer, but the pattern is what matters: qualified traffic in, no conversions out.",
  },
  {
    question: "What is the most common SaaS landing page conversion mistake?",
    answer:
      "Leading with features instead of outcomes. The headline describes the product category instead of the specific result a named buyer gets. The visitor reads it, does not feel recognised as the target, and leaves. Every other optimisation is secondary to getting the hero message right.",
  },
  {
    question: "Should I use the same landing page for paid ads and SEO traffic?",
    answer:
      "Not always. Paid traffic, especially from Meta Ads, arrives with a different state of mind than organic search traffic. Paid visitors often need more context, more proof, and a softer first ask. Search visitors often arrive further along in the decision process. The same page can serve both if it is well-structured, but a dedicated paid landing page with message match to the ad will almost always outperform a shared page.",
    link: "/landing-page-for-lead-generation",
    linkLabel: "Landing page for lead generation",
  },
  {
    question: "How long should a SaaS landing page be?",
    answer:
      "Long enough to earn the conversion, short enough to hold attention. For most B2B SaaS demo request pages, five to seven clear sections is the right range: hero, problem, what you fix, proof, process or deliverables, and CTA. Length matters less than whether each section earns the next scroll.",
  },
  {
    question: "What is a good conversion rate for a SaaS demo request page?",
    answer:
      "Context matters: traffic source, ICP specificity, offer type, ACV, and buying urgency all affect conversion rates. For warm SaaS traffic, 2-5% can be a useful benchmark range, but the right number depends on your specific setup. Below roughly 1% from qualified traffic almost always signals a messaging, trust, or friction problem worth diagnosing before scaling any acquisition channel.",
    link: "/conversion-rate-optimisation-specialist",
    linkLabel: "SaaS CRO specialist",
  },
];

export default function OptimizeSaasLandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_80%_10%,white_0,transparent_25%)]" />
          <div className="container relative z-10 px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  Landing Page CRO
                </p>
                <h1 className="font-display max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                  How to Optimise a SaaS Landing Page for More Demo Bookings
                </h1>
                <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
                  <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                    <p>
                      Most SaaS landing page optimisation articles start with button colours and A/B tests.
                    </p>
                    <p>
                      This one starts with the three structural problems that account for most conversion failures, and the checklist you can run through before spending another pound or dollar on traffic. Whether you call it "optimise" or "optimize," the job is the same: find the conversion leak before scaling traffic.
                    </p>
                    <p>
                      More traffic does not fix a weak landing page. It makes the weakness more expensive. If you want this diagnosed instead of guessing, see my{" "}
                      <Link to="/landing-page-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                        SaaS landing page strategy service
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Audit focus</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Hero recognition speed</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Proof placement vs doubt curve</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />CTA-intent match</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Tracking the leak</p>
                    </div>
                  </div>
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min SaaS Landing Page Audit
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/blog/landing-page-optimization-best-practices-2026">
                      Read conversion benchmarks
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-border bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">My rule before optimising</p>
                <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Check the conversion path before changing the design.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Before changing copy, design, or CTAs, I check four things. If any of these four are weak, A/B testing is premature.
                </p>
                <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
                  {ruleItems.map((item) => (
                    <div key={item.title} className="bg-background p-6 md:p-7">
                      <CheckCircle2 className="mb-5 h-6 w-6 text-primary" />
                      <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">
                  If any of these four are weak, A/B testing is premature. Fix the conversion path first.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="lg:pt-8">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Highest leverage section</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    Your hero decides whether the rest of the page gets read.
                  </h2>
                </div>
                <div className="space-y-0 border-y border-[#ded9d1]">
                  {[
                    "If the first scroll does not answer who this is for, what problem it solves, and what happens next, the rest of the page is irrelevant. Many visitors who do not convert leave before reaching the second screen.",
                    "The hero headline is not a tagline. It should describe the outcome your buyer gets, not the feature your product offers.",
                    "The hero CTA should match the visitor's readiness level. \"Book a demo\" fits high-intent paid search. \"See how it works\" fits colder traffic.",
                  ].map((item, index) => (
                    <div key={item} className="grid gap-5 border-b border-[#ded9d1] py-7 last:border-b-0 sm:grid-cols-[3rem_1fr]">
                      <span className="font-display text-2xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <p className="text-lg leading-8 text-[#514b5d]">{item}</p>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">Six optimisation areas that move conversion</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  These are the six places where most SaaS landing pages lose visitors who would have converted if the page had done its job.
                </p>
                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {optimisationAreas.map((item, index) => (
                    <div key={item.title} className="border-t border-border pt-6">
                      <p className="mb-3 text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="font-display text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-[#ded9d1] bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Audit checklist</p>
                  <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                    The SaaS landing page audit checklist
                  </h2>
                </div>
                  <p className="mt-5 text-lg leading-8 text-[#514b5d]">
                    Run through this before scaling any paid traffic, outbound, or SEO channel to the page.
                  </p>
                </div>
                <div className="mt-12 grid gap-x-10 gap-y-0 lg:grid-cols-2">
                  {checklistItems.map((item, index) => (
                    <div key={item} className="group grid grid-cols-[3.5rem_1fr] gap-5 border-t border-[#d8d2c9] py-6">
                      <div className="flex items-start justify-between">
                        <span className="font-display text-xl font-bold text-[#bcb5aa] transition-colors group-hover:text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      </div>
                      <p className="text-base leading-7 text-[#514b5d]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-16 text-white">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Not sure where the page is leaking?</p>
                  <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                    Most landing page problems are not where the founder thinks they are.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-white/72">
                    The hero may be fine and the CTA may be the leak, or the page may convert clicks but lose visitors on the mobile form. Without tracking, it is a guess.
                  </p>
                </div>
                <Button variant="hero" size="lg" className="group shrink-0" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min SaaS Landing Page Audit
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white py-16 text-[#11101a]">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div className="lg:sticky lg:top-28">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Headline rewrite pattern</p>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-[#11101a] md:text-4xl">
                      From category label to buyer outcome
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-[#514b5d]">
                      Weak headlines describe the product. Strong headlines show the buyer the before state, the after state, and who the promise is for.
                    </p>
                  </div>

                  <div className="space-y-5">
                  {headlineExamples.map((item) => (
                    <div key={item.weak} className="rounded-2xl border border-[#ded9d1] bg-[#faf9f6] p-5 md:p-6">
                      <div className="grid gap-4 md:grid-cols-[1fr_auto_1.25fr] md:items-center">
                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8393]">Weak</p>
                          <p className="text-base font-semibold leading-7 text-[#6a6374]">{item.weak}</p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Strong</p>
                          <p className="font-display text-xl font-bold leading-snug text-[#11101a] md:text-2xl">{item.strong}</p>
                        </div>
                      </div>
                      <p className="mt-5 border-t border-[#ded9d1] pt-4 text-sm leading-7 text-[#514b5d]">{item.note}</p>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="border-y border-[#ded9d1] bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div>
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Testing order</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      When to run A/B tests vs qualitative fixes
                    </h2>
                <p className="mt-6 text-lg leading-8 text-[#514b5d]">
                      A/B testing requires significant traffic to produce statistically significant results. If your landing page receives low monthly traffic, A/B testing may not produce reliable learning because the sample size is too small and any "winner" will be noise more often than signal. Use qualitative diagnosis first.
                    </p>
                    <p className="mt-5 text-base leading-8 text-[#514b5d]">
                      For most early-stage SaaS products, qualitative optimisation produces faster improvements without needing high traffic volume.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-[#d8d2c9] sm:block" />
                    <div className="space-y-5">
                  {qualitativeFixes.map((item, index) => (
                    <div key={item} className="relative grid gap-4 rounded-2xl border border-[#ded9d1] bg-white p-5 shadow-[0_18px_45px_rgba(17,16,26,0.04)] sm:grid-cols-[2.5rem_1fr]">
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4ee] text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9b9488]">Step {index + 1}</p>
                        <p className="text-base leading-7 text-[#514b5d]">{item}</p>
                      </div>
                    </div>
                  ))}
                    </div>
                  </div>
                </div>
                <p className="mt-10 max-w-4xl border-t border-[#d8d2c9] pt-6 text-base leading-8 text-[#514b5d]">
                  Qualitative fixes first. A/B tests when traffic volume makes the data trustworthy. See{" "}
                  <Link to="/blog/landing-page-optimization-best-practices-2026" className="font-medium text-primary underline-offset-4 hover:underline">
                    landing page optimization best practices
                  </Link>{" "}
                  for benchmarks and traffic thresholds.
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">FAQ</h2>
                <div className="mt-10 divide-y divide-border border-y border-border">
                  {faq.map((item) => (
                    <div key={item.question} className="py-7">
                      <h3 className="font-display text-xl font-bold text-foreground">{item.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.answer}
                        {item.link ? (
                          <>
                            {" "}
                            <Link to={item.link} className="font-medium text-primary underline-offset-4 hover:underline">
                              {item.linkLabel}
                            </Link>
                            .
                          </>
                        ) : null}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#0f0d19] py-20 text-white">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-4xl text-center">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Get your landing page audited</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  If the page is not converting qualified traffic, the problem is diagnosable.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
                  In a 20-minute session, I review the hero, proof, CTA structure, mobile experience, and conversion path, then tell you exactly what to fix first.
                </p>
                <div className="mt-8">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min SaaS Landing Page Audit
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
                <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/60">
                  For an example of SaaS positioning and landing page work, see the{" "}
                  <Link to="/case-study/shipzzer" className="font-medium text-primary underline-offset-4 hover:underline">
                    Shipzzer case study
                  </Link>
                  .
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
