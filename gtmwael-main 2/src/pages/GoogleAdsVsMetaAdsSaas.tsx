import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function GoogleAdsVsMetaAdsSaas() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Paid Acquisition</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Google Ads vs Meta Ads for SaaS: Which Channel Fits Your Stage?
              </h1>
              <p className="text-lg text-muted-foreground">
                Google captures demand that already exists. Meta creates demand before buyers know they are looking. Both can work for B2B SaaS — but they require different landing pages, different offers, and different expectations.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">The Core Difference: Intent</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg border border-border bg-background/50">
                  <p className="font-semibold text-foreground mb-3">Google Ads</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Buyer is actively searching for a solution</li>
                    <li>• High intent — they have already named the problem</li>
                    <li>• Landing page can move fast to the demo CTA</li>
                    <li>• CPCs are higher but conversion intent is stronger</li>
                    <li>• Works best when the category is established</li>
                    <li>• Loses effectiveness for new or niche categories</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg border border-border bg-background/50">
                  <p className="font-semibold text-foreground mb-3">Meta Ads</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Buyer is not yet actively searching</li>
                    <li>• Lower intent — needs problem education first</li>
                    <li>• Landing page needs more context and proof</li>
                    <li>• CPMs are lower but conversion path is longer</li>
                    <li>• Works well for retargeting and trust-building</li>
                    <li>• Stronger for products that interrupt patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Landing Page Requirements Are Different</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This is where most SaaS founders make the biggest mistake: sending both Google and Meta traffic to the same landing page. The visitor's state of mind when they arrive is completely different, and a single page cannot serve both well.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Google search visitors arrive with a named problem. The landing page should confirm their problem quickly, show specific proof, and offer a direct next step. The copy can assume they know the category.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Meta visitors arrive from an ad they were not looking for. The page needs to earn attention, explain the problem in context, build credibility, and make a softer first ask — often a free resource, a short video, or a low-friction offer before the demo request.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">SaaS landing page strategy →</Link>
                <Link to="/meta-ads-for-saas" className="text-primary hover:underline">Meta Ads for SaaS →</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Which Channel to Start With</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                For most early-stage B2B SaaS products, Meta Ads is a better starting point than Google Ads — not because it is cheaper, but because it allows you to test offer angles and creative direction before committing to expensive search keywords.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If your category has established search demand and buyers actively searching for solutions like yours, Google Ads can produce faster qualified pipeline. The downside is CPCs in competitive SaaS categories are often $15–40+, which requires a tight offer and landing page before spending.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The most effective B2B SaaS paid strategy eventually uses both: Meta for awareness and retargeting, Google for capturing high-intent search. But running both simultaneously from day one splits focus and budget before either is optimised.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Not Sure Which <span className="text-gradient">Channel Fits</span> Your Stage?
              </h2>
              <p className="text-muted-foreground mb-8">
                A 20-minute GTM audit will identify whether you should start with paid search, Meta, or a different channel entirely — based on your ICP, offer clarity, and current conversion path.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a Free GTM Audit
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
