import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function LandingPageForLeadGeneration() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Lead Generation</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Landing Page for Lead Generation: The SaaS Conversion Guide
              </h1>
              <p className="text-lg text-muted-foreground">
                A lead generation landing page for SaaS is not a homepage with a form. It is a focused conversion asset designed to serve one traffic source, one buyer type, and one next step — and eliminate everything else.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">The Difference Between a Lead Page and a Homepage</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A homepage serves many audiences: potential customers, current users, job seekers, press, investors, and partners. Every section has to compromise for every audience.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A lead generation landing page serves one: a specific buyer coming from a specific source with a specific intent. Every word, every proof element, every CTA should be chosen for that one person and that one conversion goal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This distinction matters practically. If you are running Meta Ads to a page and the page also has navigation, blog links, case studies for a different buyer segment, and multiple CTAs — you are diluting the conversion path with every element that does not serve the intended visitor.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">What a High-Converting SaaS Lead Page Includes</h2>
              <div className="space-y-5">
                {[
                  {
                    title: "A headline that names the problem",
                    body: "The headline should identify the exact problem your ICP has — not what your product does. Visitors from paid or outbound traffic have low patience for feature descriptions. Name the frustration first.",
                  },
                  {
                    title: "Proof that matches the audience",
                    body: "If the ad was targeting logistics companies, the proof on the page should reference logistics companies. Mismatched proof — testimonials from a different industry or use case — actively reduces conversion for the targeted visitor.",
                  },
                  {
                    title: "A single conversion path",
                    body: "One CTA, one form, one next step. The page should not offer a free trial, a demo request, a newsletter signup, and a product tour simultaneously. Decide which action matters most for this traffic source and remove the alternatives.",
                  },
                  {
                    title: "Qualification built into the copy",
                    body: "The best lead generation pages do the qualification work in the copy, before the form appears. If the hero clearly states who this is for and who it is not for, you get fewer submissions and more qualified ones.",
                  },
                  {
                    title: "Mobile-first layout",
                    body: "Over 40% of B2B buyers research solutions on mobile even for desktop purchases. If the CTA is below the fold on mobile, or the form has eight fields, mobile conversion will approach zero regardless of how strong the copy is.",
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
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Form Length: How Many Fields Is Too Many?</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Research consistently shows that removing form fields increases submission rates. Each additional field reduces conversion, particularly when the field serves CRM data needs rather than the visitor's conversion journey.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For B2B SaaS demo requests, name and email is usually sufficient. If you need to qualify leads before booking, add one qualification question — company size, use case, or timeline. Phone number fields drop conversion significantly and are rarely necessary before the first call.
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
                Build a Lead Page <span className="text-gradient">That Qualifies Before the Form</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I design and write SaaS lead generation pages aligned to specific traffic sources — paid, outbound, or organic — so the page converts the right visitors, not just any visitors.
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
