import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function B2bSaasMarketingStrategy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">GTM Strategy</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                B2B SaaS Marketing Strategy: The Framework That Actually Works
              </h1>
              <p className="text-lg text-muted-foreground">
                Most B2B SaaS marketing strategy advice was written for teams with budgets, full-time marketers, and established products. This framework is written for founders who need to build pipeline before they can afford the team.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Fix Positioning Before Choosing Channels</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Most B2B SaaS marketing strategy problems start before the channels. The offer is unclear, the ICP is too broad, and the landing page cannot convert any traffic reliably. Channel selection before these are fixed just burns budget faster.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Positioning is not your tagline. It is the answer to three specific questions: who is this for exactly, what problem does it solve for that person, and why should they believe you can do it. Until those three questions have clear, specific answers, no channel will work efficiently.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The fastest way to validate positioning is not a survey. It is a cold email to ten ideal customers describing the problem, and watching whether any of them reply.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Demand Creation vs Demand Capture</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                B2B SaaS marketing strategy breaks into two fundamentally different jobs: creating demand and capturing demand. Most founders start with demand capture — SEO, Google Ads — because it feels more measurable. But for early-stage products without category awareness, capture channels have no demand to capture.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-5 rounded-lg border border-border">
                  <p className="font-semibold text-foreground mb-3">Demand creation</p>
                  <p className="text-sm text-muted-foreground mb-3">Reaches buyers before they are actively searching. Teaches them to recognise the problem.</p>
                  <p className="text-xs text-muted-foreground font-mono">Cold email → LinkedIn → Meta Ads → Content</p>
                </div>
                <div className="p-5 rounded-lg border border-border">
                  <p className="font-semibold text-foreground mb-3">Demand capture</p>
                  <p className="text-sm text-muted-foreground mb-3">Reaches buyers who are already searching for a solution. Captures intent that already exists.</p>
                  <p className="text-xs text-muted-foreground font-mono">Google Ads → SEO → Review sites → G2</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A working B2B SaaS marketing strategy uses both layers in sequence. Start with demand creation to validate the offer and build a retargeting audience. Then add demand capture once the conversion path is proven.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">The Conversion Path: Where Strategy Meets Execution</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The best B2B SaaS marketing strategy in the world is useless if the landing page does not convert. Every acquisition channel eventually sends a potential buyer to a page, a form, or a booking link. If that destination is weak, the channel appears to underperform — even when it is working.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Before scaling any channel, audit the conversion path: can a new visitor understand the offer in five seconds, find proof they trust, and take the next step without friction? If not, fix those before adding spend or volume.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
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
                Build a B2B SaaS Marketing Strategy <span className="text-gradient">That Connects</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                A 20-minute GTM audit will identify the positioning gaps, channel mismatches, and conversion blockers that are limiting your current growth.
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
