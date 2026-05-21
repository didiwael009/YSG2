import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const ruleItems = [
  {
    title: "Where is the visitor coming from?",
    body: "Paid traffic, cold outbound, organic search, and referrals each arrive with different levels of context. The same offer needs different framing for each.",
  },
  {
    title: "What does the visitor already believe?",
    body: "A cold Meta visitor needs more education than someone who clicked a high-intent Google search. The page should pick up where the traffic source left off.",
  },
  {
    title: "What proof would make this buyer trust the page?",
    body: "Generic testimonials do not help if the visitor does not recognise the use case or the company. Proof has to match the audience the page is targeting.",
  },
  {
    title: "What is the one action we want next?",
    body: "If the page is asking for multiple actions, it has stopped being a lead page. One next step, chosen on purpose.",
  },
];

const leadPageIncludes = [
  {
    title: "A headline that names the problem",
    body: "The headline should identify the exact problem your ICP has, not what your product does. Visitors from paid or outbound traffic have low patience for feature descriptions. Name the frustration first.",
    example: "\"The project management tool for engineering teams\" describes the product. \"Stop losing sprint velocity to status meetings\" names the problem.",
  },
  {
    title: "Proof that matches the audience",
    body: "If the ad targeted logistics companies, the proof on the page should reference logistics companies. Mismatched proof actively reduces conversion for the targeted visitor.",
    example: "A single specific quote that names a role, a problem, and a result from a company in the target industry does more than five vague star ratings.",
  },
  {
    title: "A single conversion path",
    body: "One CTA. One form. One next step. The page should not offer a free trial, demo request, newsletter signup, and product tour simultaneously.",
    example: "Choose which action matters most for this traffic source and remove the alternatives.",
  },
  {
    title: "Qualification built into the copy",
    body: "The best lead generation pages do the qualification work in the copy before the form appears.",
    example: "\"This is for B2B SaaS teams with 10-100 employees scaling outbound for the first time\" removes unqualified visitors before they reach the form.",
  },
  {
    title: "Mobile-first layout",
    body: "Many B2B buyers research solutions on mobile even when they complete the purchase journey on desktop.",
    example: "If the CTA is below the fold on mobile or the form has eight fields, mobile conversion will approach zero regardless of how strong the copy is.",
  },
];

const checklistItems = [
  "Headline names the specific problem, not the product category, not \"all-in-one,\" not a tagline",
  "Page is built for one traffic source: paid, organic, or outbound; not optimised for all three simultaneously",
  "Proof references the same industry as the targeted audience; mismatched proof reduces conversion",
  "One primary CTA: one form, one next step; secondary CTAs removed or strongly deprioritised",
  "Navigation removed or simplified on paid traffic versions because full nav creates exit paths before conversion",
  "Form asks only for name and email at minimum; add one qualification question maximum if needed for lead scoring",
  "Above-the-fold content answers three questions: what is this, who is it for, what happens next",
  "Mobile CTA is visible without scrolling; check on an actual phone, not just a responsive preview",
  "No placeholder testimonials or anonymous \"5 stars\" because vague proof reduces trust",
  "The page does not link out to other pages before conversion because case studies, blog posts, and resource links are exits on a lead page",
];

const trafficSources = [
  {
    label: "Paid Traffic",
    title: "Meta Ads or Google Ads",
    body: "Remove navigation. Match the ad message in the headline exactly. Use a direct CTA such as demo, trial, or audit. Keep the page focused.",
    link: "/google-ads-vs-meta-ads-saas",
    linkLabel: "Google Ads vs Meta Ads for SaaS",
  },
  {
    label: "Cold Outbound",
    title: "Email or LinkedIn",
    body: "The visitor arrives warm but not hot. The page should be shorter than a full service page, load fast, and name the same ICP and problem from the message.",
  },
  {
    label: "Organic SEO",
    title: "Research traffic",
    body: "Keep some navigation. Allow for longer reads. A softer CTA is acceptable because the conversion goal is often trust-building before a direct ask.",
  },
];

const faq = [
  {
    question: "What is a lead generation landing page for SaaS?",
    answer:
      "A lead generation landing page for SaaS is a focused page designed to capture qualified contact information from visitors coming from a specific traffic source. Unlike a homepage, it serves one audience, one offer, and one conversion action. It removes navigation and distractions to keep attention on the primary CTA, typically a demo request, trial signup, or consultation booking.",
  },
  {
    question: "How is a lead page different from a product page?",
    answer:
      "A product page explains what the product does: its features, use cases, integrations, and pricing. A lead page exists to convert one specific type of visitor into a lead for one specific next step. Product pages support evaluation. Lead pages support conversion. They serve different moments in the buyer journey and should be built separately.",
  },
  {
    question: "What should a SaaS lead page headline say?",
    answer:
      "The headline should name the specific problem your ICP is trying to solve, not describe your product. Visitors from paid or outbound traffic have already seen your ad or email. The page headline confirms they are in the right place. A headline that names a recognisable frustration earns the scroll. A headline that describes a product category does not.",
  },
  {
    question: "How do I reduce friction on a SaaS lead generation form?",
    answer:
      "Remove fields that exist for CRM purposes rather than the visitor's journey. Name and email is sufficient for most B2B SaaS demo requests. Add a maximum of one qualification question if lead scoring requires it. Remove phone number fields unless your sales team calls before demos. Every additional field costs you submissions, so the question is whether the qualification value outweighs the conversion cost.",
  },
  {
    question: "What is a good conversion rate for a SaaS lead generation page?",
    answer:
      "Context matters: traffic source, offer type, ICP specificity, ACV, and buying urgency all affect conversion rates. For warm, targeted SaaS paid traffic, 3-8% can be a useful benchmark range, but the right number depends on your specific setup. Pages receiving broad awareness traffic will convert lower. Below 1% from any qualified paid traffic is a signal to diagnose the message, proof, or friction before increasing spend.",
    link: "/conversion-rate-optimisation-specialist",
    linkLabel: "SaaS CRO specialist",
  },
];

export default function LandingPageForLeadGeneration() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_85%_15%,white_0,transparent_25%)]" />
          <div className="container relative z-10 px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-primary">Lead Generation</p>
                <h1 className="font-display max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                  Landing Page for Lead Generation: The SaaS Conversion Guide
                </h1>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
                  <div className="space-y-5 text-lg leading-8 text-muted-foreground">
                    <p>A lead generation landing page for SaaS is not a homepage with a form.</p>
                    <p>It is a focused conversion asset designed to serve one traffic source, one buyer type, and one next step, and eliminate everything else.</p>
                    <p>
                      Most SaaS lead pages fail not because the form is wrong but because the page serving the form is wrong. If you need the service version of this work, see my{" "}
                      <Link to="/landing-page-for-saas" className="font-medium text-primary underline-offset-4 hover:underline">
                        SaaS landing page strategy service
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Lead page filter</p>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />One traffic source</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />One buyer type</p>
                      <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />One conversion action</p>
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
                    <Link to="/optimize-saas-landing-page">Read the page audit checklist</Link>
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">My rule before building</p>
                <h2 className="font-display max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Do not redesign the page until the conversion strategy is clear.
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Before writing or redesigning a SaaS lead page, I check four things. If these four points are unclear, a new design will not fix the strategy gap.
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
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-[#faf9f6] py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Homepage vs lead page</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    A homepage compromises. A lead page focuses.
                  </h2>
                </div>
                <div className="space-y-0 border-y border-[#ded9d1]">
                  {[
                    "A homepage serves many audiences: potential customers, current users, job seekers, press, investors, and partners. Every section compromises for every audience.",
                    "A lead generation landing page serves one: a specific buyer coming from a specific source with a specific intent.",
                    "The most effective lead pages are ruthless about focus. One offer. One audience. One next step.",
                  ].map((item, index) => (
                    <div key={item} className="grid gap-5 border-b border-[#ded9d1] py-7 last:border-b-0 sm:grid-cols-[3rem_1fr]">
                      <span className="font-display text-2xl font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <p className="text-lg leading-8 text-[#514b5d]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto max-w-5xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">What a high-converting SaaS lead page includes</h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                  These are the pieces that make the form worth filling out before the visitor ever reaches it.
                </p>
                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {leadPageIncludes.map((item, index) => (
                    <div key={item.title} className={index === 4 ? "border-t border-border pt-6 md:col-span-2" : "border-t border-border pt-6"}>
                      <p className="mb-3 text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="font-display text-2xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground/80">{item.example}</p>
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
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Lead page checklist</p>
                    <h2 className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-[#11101a] md:text-5xl">
                      10 things to check before sending traffic
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-[#514b5d]">
                    Run through this list before connecting any paid, outbound, or SEO traffic to a lead generation page. For the broader diagnostic, read{" "}
                    <Link to="/optimize-saas-landing-page" className="font-medium text-primary underline-offset-4 hover:underline">
                      how to optimise a SaaS landing page
                    </Link>
                    .
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
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Source matters</p>
                  <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                    Lead pages change by traffic source.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-white/72">
                    The offer can stay the same. The way the page handles trust, context, and the ask should not.
                  </p>
                </div>
                <Button variant="hero" size="lg" className="group shrink-0" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min SaaS Landing Page Audit
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>

              <div className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 md:grid-cols-3">
                {trafficSources.map((item) => (
                  <div key={item.label} className="bg-[#0f0d19] p-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.label}</p>
                    <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {item.body}
                      {item.link ? (
                        <>
                          {" "}
                          For the difference in approach, see{" "}
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
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white py-20 text-[#11101a] md:py-24">
          <div className="container px-4">
            <AnimateIn>
              <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Form friction</p>
                  <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#11101a] md:text-6xl">
                    Form length is a conversion decision, not a CRM wish list.
                  </h2>
                </div>
                <div className="space-y-6 text-lg leading-8 text-[#514b5d]">
                  <p>
                    <a href="https://blog.hubspot.com/marketing/form-field-length" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">
                      HubSpot&apos;s analysis of over 40,000 landing pages
                    </a>{" "}
                    found that forms with three fields convert better than forms with six or more.
                  </p>
                  <p>
                    For B2B SaaS demo requests, name and email is usually sufficient. If you need to qualify leads before booking, add one question: company size, use case, or timeline.
                  </p>
                  <p>
                    Phone number fields drop conversion significantly and are rarely necessary before the first call. The goal of the form is to start the conversation, not to complete a CRM intake.
                  </p>
                </div>
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
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Build a lead page that qualifies before the form</p>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                  If the page gets traffic but not qualified leads, the problem is diagnosable.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/72">
                  In a 20-minute landing page audit, I review the traffic source, message match, proof, CTA path, and mobile experience, then tell you what to fix first.
                </p>
                <div className="mt-8">
                  <Button variant="hero" size="lg" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min SaaS Landing Page Audit
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer hideCTA />
    </div>
  );
}
