import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const ruleItems = [
  {
    question: "Where is the visitor coming from?",
    answer:
      "Paid traffic, cold outbound, organic search, and referrals each arrive with different context. The same offer needs different framing for each.",
  },
  {
    question: "What does the visitor already believe?",
    answer:
      "A cold Meta visitor needs more education than someone who clicked a high-intent Google search. The page should continue the conversation the channel started.",
  },
  {
    question: "What proof would make this buyer trust the page?",
    answer:
      "Generic testimonials do not help if the visitor does not recognise the use case or company. Proof has to match the audience the page is targeting.",
  },
  {
    question: "What is the one action we want next?",
    answer:
      "If the page is asking for multiple actions, it has stopped being a lead page. One next step, chosen on purpose, keeps the conversion path clean.",
  },
];

const checklistItems = [
  "Headline names the specific problem — not the product category or a vague tagline",
  "Page is built for one traffic source — paid, organic, or outbound; not all three at once",
  "Proof references the same industry as the targeted audience",
  "One primary CTA — one form, one next step; secondary CTAs removed or deprioritised",
  "Navigation removed or simplified on paid traffic versions",
  "Form asks only for name and email at minimum; add one qualification question max",
  "Above-the-fold content answers three questions: what is this, who is it for, what happens next",
  "Mobile CTA is visible without scrolling on real devices",
  "No placeholder testimonials or anonymous five-star blocks",
  "The page does not link out to other pages before conversion",
];

const trafficSections = [
  {
    title: "Paid Traffic",
    body: "Meta Ads and Google Ads need different versions of the page. Paid traffic should see a direct headline match, a focused offer, and a CTA that keeps the page moving forward.",
    note: "If you want the channel split explained more fully, read the Google vs Meta breakdown before sending spend.",
    linkLabel: "Google Ads vs Meta Ads for SaaS",
    linkTo: "/google-ads-vs-meta-ads-saas",
  },
  {
    title: "Cold Outbound",
    body: "Cold email and LinkedIn bring a warmer but not ready-to-buy visitor. The page should stay short, load fast, and restate the same ICP and problem from the outbound message.",
    note: "If the outbound ask is a 20-minute call, the page should confirm the same ask — not introduce a new one.",
    linkLabel: "SaaS landing page strategy service",
    linkTo: "/landing-page-for-saas",
  },
  {
    title: "Organic SEO",
    body: "Organic visitors are often researching, not deciding. Keep enough context to build trust, but avoid turning the page into a homepage with a form.",
    note: "Organic pages can support a softer CTA when the visitor still needs education before they are ready to book.",
    linkLabel: "how to optimise a SaaS landing page",
    linkTo: "/optimize-saas-landing-page",
  },
];

const faq = [
  {
    q: "What is a lead generation landing page for SaaS?",
    a: "A lead generation landing page for SaaS is a focused page designed to capture qualified contact information from visitors coming from a specific traffic source. Unlike a homepage, it serves one audience, one offer, and one conversion action. It removes navigation and distractions to keep attention on the primary CTA.",
  },
  {
    q: "How is a lead page different from a product page?",
    a: "A product page explains what the product does — features, use cases, integrations, and pricing. A lead page exists to convert one specific type of visitor into a lead for one specific next step. Product pages support evaluation. Lead pages support conversion.",
  },
  {
    q: "What should a SaaS lead page headline say?",
    a: "The headline should name the specific problem your ICP is trying to solve — not describe your product. A headline that names a recognisable frustration earns the scroll. A headline that describes a product category does not.",
  },
  {
    q: "How do I reduce friction on a SaaS lead generation form?",
    a: "Remove fields that exist for CRM purposes rather than the visitor's journey. Name and email is sufficient for most B2B SaaS demo requests. Add a maximum of one qualification question if lead scoring requires it. Remove phone number fields unless your sales team calls before demos.",
  },
  {
    q: "What is a good conversion rate for a SaaS lead generation page?",
    a: "Context matters: traffic source, offer type, ICP specificity, ACV, and buying urgency all affect conversion rates. For warm, targeted SaaS paid traffic, 3-8% can be a useful benchmark range, but the right number depends on your specific setup. Below 1% from qualified paid traffic is a signal to diagnose message, proof, or friction before increasing spend. See the SaaS CRO specialist page for how conversion diagnosis works.",
    linkLabel: "SaaS CRO specialist",
    linkTo: "/conversion-rate-optimisation-specialist",
  },
];

export default function LandingPageForLeadGeneration() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Lead Generation</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Landing Page for Lead Generation: The SaaS Conversion Guide
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                A lead generation landing page for SaaS is not a homepage with a form. It is a focused conversion asset designed to serve one traffic source, one buyer type, and one next step — and eliminate everything else.
              </p>
              <p className="mt-4 text-muted-foreground max-w-3xl leading-relaxed">
                Most SaaS lead pages fail not because the form is wrong but because the page serving the form is wrong. It speaks to too many audiences, carries too much navigation, and makes the conversion path compete with itself before the visitor reaches the CTA.
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
            <div className="max-w-4xl mx-auto">
              <div className="rounded-3xl border border-border bg-background p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">My rule before building</p>
                <h2 className="font-display text-2xl font-bold mb-5 text-foreground">Check the traffic source before touching the design</h2>
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
                  If these four points are unclear, the page should not be redesigned yet. The conversion strategy is still missing, and a new design will not fix a strategy gap.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">What a High-Converting SaaS Lead Page Includes</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "A headline that names the problem",
                    body: "The headline should identify the exact problem your ICP has — not what your product does. Visitors from paid or outbound traffic have low patience for feature descriptions.",
                  },
                  {
                    title: "Proof that matches the audience",
                    body: "If the traffic was targeted at logistics companies, the proof on the page should reference logistics companies. Mismatched proof reduces conversion for the visitor you want.",
                  },
                  {
                    title: "A single conversion path",
                    body: "One CTA. One form. One next step. The page should not offer a free trial, a demo request, a newsletter signup, and a product tour simultaneously.",
                  },
                  {
                    title: "Qualification built into the copy",
                    body: "The best lead generation pages do the qualification work in the copy before the form appears. If the hero clearly states who this is for, you get fewer submissions and more qualified ones.",
                  },
                  {
                    title: "Mobile-first layout",
                    body: "Many B2B buyers research on mobile even when they convert on desktop. If the CTA is below the fold on mobile, or the form has eight fields, mobile conversion will collapse.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-semibold text-foreground mb-2">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Lead Page Checklist: 10 Things to Check Before Sending Traffic</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Run through this list before connecting any paid, outbound, or SEO traffic to a lead generation page. If you want a broader diagnostic, read{" "}
                <Link to="/optimize-saas-landing-page" className="text-primary hover:underline">
                  how to optimise a SaaS landing page
                </Link>{" "}
                before buying more traffic.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {checklistItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-background p-4 flex gap-3">
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

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950 px-6 py-8 md:px-8 md:py-10 text-slate-100">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Quick diagnostic</p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Stop buying traffic before the page can convert it.</h2>
                  <p className="text-sm md:text-base leading-relaxed text-slate-300">
                    If the page is unclear, the traffic source only makes the leak more expensive. Fix the message, proof, and CTA before you scale spend.
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
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Lead Pages by Traffic Source — What Changes</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {trafficSections.map((section) => (
                  <div key={section.title} className="rounded-3xl border border-border bg-card p-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">{section.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-4">{section.body}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-5">{section.note}</p>
                    <Link to={section.linkTo} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                      {section.linkLabel}
                    </Link>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">Form Length: How Many Fields Is Too Many?</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <a
                  href="https://blog.hubspot.com/marketing/form-field-length"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  HubSpot's analysis of over 40,000 landing pages
                </a>{" "}
                found that forms with three fields convert better than forms with six or more. Each additional field reduces submission rates, especially when the field serves CRM needs rather than the visitor's journey.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For B2B SaaS demo requests, name and email is usually sufficient. If you need to qualify leads before booking, add one question — company size, use case, or timeline. Phone number fields drop conversion significantly and are rarely necessary before the first call.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">
                  Landing page for SaaS →
                </Link>
                <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">
                  CRO specialist →
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">FAQ</h2>
              <div className="space-y-6">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-border bg-card p-6">
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

      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Build a Lead Page <span className="text-gradient">That Qualifies Before the Form</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I design and write SaaS lead generation pages aligned to specific traffic sources — paid, outbound, or organic — so the page converts the right visitors, not just any visitors.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min SaaS Landing Page Audit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
}
