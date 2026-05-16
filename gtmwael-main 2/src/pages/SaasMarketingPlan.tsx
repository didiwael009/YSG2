import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function SaasMarketingPlan() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">SaaS Growth</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                SaaS Marketing Plan: A GTM Framework for B2B Founders
              </h1>
              <p className="text-lg text-muted-foreground">
                Most B2B SaaS founders build a marketing plan the wrong way — channel first, strategy second. This guide covers the order that actually works: positioning, landing page, one acquisition channel, then scale.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto prose prose-invert max-w-none">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Why Most SaaS Marketing Plans Fail</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The most common mistake is treating each channel as a separate plan. SEO is disconnected from the landing page. Cold email is disconnected from positioning. Ads are disconnected from conversion. Each channel operates independently, and no one owns the full pipeline from first touch to booked demo.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A working SaaS marketing plan connects all channels around one clear offer, one clear buyer, and one clear conversion path. Without that foundation, adding more channels just creates more noise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The second mistake is starting with the wrong question. Most founders ask "which channel should we use?" before they can clearly answer "what are we selling, to whom, and why should they believe us?" Channel selection is a late-stage decision, not an early one.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">The Order That Works for Early-Stage B2B SaaS</h2>
              <div className="space-y-6 mt-6">
                {[
                  {
                    step: "01",
                    title: "Positioning clarity",
                    body: "Define who the product is for, what specific problem it solves, and why it is different. This is not a tagline exercise — it is the foundation every channel message is built on. If positioning is vague, every downstream activity is less effective.",
                  },
                  {
                    step: "02",
                    title: "Landing page",
                    body: "Before any acquisition channel is activated, the conversion destination must work. A landing page that cannot convert warm traffic will not convert paid or cold traffic. Fix the page before spending on the channel.",
                  },
                  {
                    step: "03",
                    title: "One acquisition channel",
                    body: "Add one channel — either cold email or paid ads — and prove it can produce qualified conversations before adding a second. Splitting attention across three channels at the start produces weak results in all three.",
                  },
                  {
                    step: "04",
                    title: "SEO and content as a trust layer",
                    body: "Publish content that answers the questions your buyers ask before they decide to book a demo. SEO supports trust and pipeline — it is not a standalone growth strategy for early-stage SaaS.",
                  },
                  {
                    step: "05",
                    title: "Analytics before you scale",
                    body: "Before adding budget or a second channel, know where visitors drop off, what pages convert, and which acquisition source produces qualified leads. Without this, scaling accelerates waste.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5 items-start p-5 rounded-lg border border-border">
                    <span className="text-xs font-mono text-primary flex-shrink-0 mt-1">{item.step}</span>
                    <div>
                      <p className="font-semibold text-foreground mb-2">{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
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
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">What Belongs in a SaaS Marketing Plan</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A practical SaaS marketing plan is not a 30-page document. It is a set of clear decisions about who you are reaching, how you are reaching them, what happens when they arrive, and how you will know if it is working.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "ICP definition", body: "Who exactly is the buyer — role, company stage, trigger, pain." },
                  { label: "Positioning statement", body: "What the product does, for whom, and why it is different." },
                  { label: "Conversion path", body: "Landing page, demo flow, CTA, follow-up sequence." },
                  { label: "Acquisition channel", body: "One primary channel with a clear budget, cadence, and success metric." },
                  { label: "Analytics baseline", body: "Traffic, conversion rate, demo-to-close, and pipeline attribution." },
                  { label: "Content plan", body: "3–5 pieces per quarter that answer buyer questions and support trust." },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-lg border border-border bg-background/50">
                    <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm">
                <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy →</Link>
                <Link to="/cold-email-for-saas" className="text-primary hover:underline">Cold email for SaaS →</Link>
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">Landing page for SaaS →</Link>
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
                Get a <span className="text-gradient">GTM Audit</span> for Your SaaS
              </h2>
              <p className="text-muted-foreground mb-8">
                In 20 minutes I can identify what is missing from your current GTM plan — positioning gaps, conversion problems, or channel misalignment.
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
