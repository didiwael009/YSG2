import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

export default function LinkedinOutreachForSaas() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-28 pb-16 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">B2B Outreach</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                LinkedIn Outreach for SaaS: B2B Prospecting That Starts Conversations
              </h1>
              <p className="text-lg text-muted-foreground">
                LinkedIn outreach for B2B SaaS is not a volume channel. It is a precision channel — 20 highly targeted connections per week, warmed by relevant content, with a message that earns a reply rather than demands one.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-card border-y border-border">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">LinkedIn as a Trust Layer, Not a Volume Channel</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                LinkedIn outreach at high volume — sending 50+ connection requests per day with generic messages — produces low reply rates, damages your profile's social selling index, and risks LinkedIn restrictions. The channel works differently than cold email.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The most effective LinkedIn outreach strategy for B2B SaaS uses the platform as a warm-up layer: publish relevant content that the target audience would find useful, engage with their posts before connecting, and then connect with a message that references something specific — not a product pitch.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A prospect who has seen your content twice before receiving a connection request is 3–5x more likely to accept and reply than a prospect receiving a cold connection with no prior exposure.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4">
          <AnimateIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-6 text-foreground">Profile Optimisation Comes First</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Every LinkedIn outreach message arrives with a profile attached. If the profile reads like a CV — job titles, dates, vague accomplishments — the message lands without credibility. Before sending outreach, the profile should clearly communicate who you help, what they achieve, and why you are worth a conversation.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Headline", body: "Not your job title. Who you help and what outcome you produce." },
                  { label: "About section", body: "One paragraph on the problem you solve, for whom, and with what result." },
                  { label: "Featured section", body: "One piece of strong proof — a case study, a result, or a relevant post." },
                  { label: "Experience", body: "Written in terms of outcomes, not job responsibilities." },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-lg border border-border bg-card">
                    <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
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
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Running LinkedIn and Cold Email Together</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The same buyer approached by email and LinkedIn with a consistent message responds at meaningfully higher rates than either channel alone. LinkedIn creates familiarity and social proof. Email provides the direct ask with more room for context.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A simple multichannel sequence: connect on LinkedIn and comment on one of their posts (day 1), send the first cold email (day 3), follow up with a LinkedIn message after the first email if no reply (day 7), send a follow-up email (day 10).
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The message across both channels should be consistent — same offer angle, same ICP signal, same next step. Inconsistent messages across channels create confusion rather than familiarity.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/cold-email-for-saas" className="text-primary hover:underline">Cold email for SaaS →</Link>
                <Link to="/saas-marketing-agency" className="text-primary hover:underline">SaaS GTM strategy →</Link>
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
                Build an Outreach System <span className="text-gradient">That Earns Replies</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                I build outbound systems that combine cold email and LinkedIn into one coherent pipeline channel — with consistent messaging, a proper warm-up sequence, and a conversion path that qualifies before the call.
              </p>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min Outreach Diagnosis
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
