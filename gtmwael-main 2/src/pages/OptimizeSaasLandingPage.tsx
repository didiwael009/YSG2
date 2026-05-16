import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function OptimizeSaasLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Landing Page CRO</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                How to Optimise a SaaS Landing Page for More Demo Bookings
              </h1>
              <p className="text-lg text-muted-foreground">
                Most SaaS landing page optimisation articles start with button colours and A/B tests. This guide starts with the three structural problems that account for most conversion failures.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">The Highest-Leverage Section: Your Hero</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If the first scroll does not answer three questions — who this is for, what problem it solves, and what happens next — the rest of the page is irrelevant. Most visitors who do not convert leave before the second screen.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The hero headline is not a tagline. It should describe the outcome your buyer gets, not the feature your product offers. "Ship code faster" is a feature statement. "The code review tool that cuts review cycles from 3 days to 3 hours" is an outcome for a specific buyer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The hero CTA should match the visitor's readiness level. "Book a demo" is appropriate for high-intent paid search traffic. "See how it works" is more appropriate for social or cold traffic who have not yet decided they have a problem.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">Six Optimisation Areas That Move Conversion</h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Hero clarity",
                    body: "Rewrite the headline to state the outcome for a specific ICP. Remove jargon. Test whether a new visitor can understand what the product does in under five seconds without reading the subhead.",
                  },
                  {
                    title: "Proof placement",
                    body: "Social proof placed only at the bottom of the page is proof placed after most visitors have already left. Move your strongest proof — specific results, recognisable logos, or a specific customer quote — to the second or third section, close to where doubt peaks.",
                  },
                  {
                    title: "CTA hierarchy",
                    body: "Every page should have one primary CTA and a secondary softer action. If the page has three or four equally prominent CTAs, conversion is diluted. Prioritise and remove.",
                  },
                  {
                    title: "Objection handling",
                    body: "List the three reasons your buyers hesitate before booking a demo. They probably include price uncertainty, implementation risk, and ROI doubt. Address each one explicitly in the page — not in the FAQ.",
                  },
                  {
                    title: "Form friction",
                    body: "Every extra form field reduces submission rates. Ask only for what you need to run the demo. Phone number fields drop conversion significantly unless your sales team actually calls leads before demos.",
                  },
                  {
                    title: "Mobile experience",
                    body: "Over 40% of B2B decision-makers research solutions on mobile, even for products they will buy on desktop. If the hero is unreadable at mobile width or the CTA button is below the fold, you are losing visitors at the first step.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-lg border border-border">
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
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">When to Run A/B Tests vs Qualitative Fixes</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A/B testing requires significant traffic to produce statistically significant results. If your landing page gets fewer than 1,000 unique visitors per month, you cannot run a meaningful A/B test — the sample size is too small and results will not be reliable.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For most early-stage SaaS products, qualitative optimisation — reviewing the page against messaging principles, watching session recordings, running user interviews, and applying structured conversion frameworks — produces faster improvements without needing high traffic volume.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">Landing page for SaaS →</Link>
                <Link to="/conversion-rate-optimisation-specialist" className="text-primary hover:underline">CRO specialist →</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Get Your Landing Page <span className="text-gradient">Audited</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I review the hero, proof, CTA structure, and mobile experience — and tell you exactly what to fix first.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min Landing Page Audit
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
