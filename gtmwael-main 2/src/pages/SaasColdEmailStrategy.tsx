import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function SaasColdEmailStrategy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Cold Outreach</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                SaaS Cold Email Strategy: Build a Pipeline System, Not a Blast Campaign
              </h1>
              <p className="text-lg text-muted-foreground">
                Cold email is one of the most direct acquisition channels for B2B SaaS — and one of the most misused. The difference between a system that produces qualified pipeline and one that ends in spam folders is not volume. It is precision.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Targeting: Where SaaS Cold Email Wins or Loses</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The biggest cold email mistake is targeting job titles instead of buyers with a specific, time-sensitive problem. Sending to "VP of Engineering" is not targeting — it is guessing. Sending to VP of Engineering at companies that have recently hired two senior engineers, moved to a new CI/CD tool, and have a public job posting for DevOps is targeting.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A tight ICP with a specific trigger generates 10x the reply rate of a broad list with generic copy. Volume is the worst solution to a targeting problem.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Useful targeting signals for B2B SaaS include: funding announcements, recent hires in relevant departments, tool stack indicators from job postings, company growth signals, and technology adoption patterns visible through public data.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">Infrastructure: Before the First Email Sends</h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Secondary sending domain",
                    body: "Never send cold email from your primary domain. Set up a secondary domain — similar but not identical to the main domain — dedicated to outbound. If deliverability is damaged, it stays isolated.",
                  },
                  {
                    title: "DNS configuration",
                    body: "SPF, DKIM, and DMARC records must be correctly configured on every sending domain before the first email sends. Missing any of these significantly increases spam placement.",
                  },
                  {
                    title: "Inbox warm-up",
                    body: "New sending domains need 2–4 weeks of warm-up before sending to real prospects. Warm-up services simulate natural email patterns to build sender reputation gradually.",
                  },
                  {
                    title: "List verification",
                    body: "Bounce rates above 3–5% damage sender reputation. Every list should be verified before sending. Remove invalid addresses, role-based emails, and known spam traps.",
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
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Copy and Sequence Structure</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The first email does one job: earn a reply. It does not need to explain the full product. It needs to identify the problem, connect it specifically to the recipient, and make a low-friction ask.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A three-to-five email sequence works best for B2B SaaS. Each follow-up adds a new angle — a proof point, a different framing of the problem, or a softer ask — not a repeated "just checking in."
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Personalisation is not variable fields. "I noticed you work in {"{"}industry{"}"}" is noise. Real personalisation connects something specific about the recipient's company, role, or recent activity to a problem your product solves.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/cold-email-for-saas" className="text-primary hover:underline">Cold email for SaaS service →</Link>
                <Link to="/landing-page-for-saas" className="text-primary hover:underline">Where cold email sends replies →</Link>
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
                Build a Cold Email System <span className="text-gradient">That Generates Pipeline</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I build end-to-end cold email systems for B2B SaaS founders — from infrastructure to sequences to follow-up logic.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min Cold Email Diagnosis
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
