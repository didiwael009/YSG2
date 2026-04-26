import { Check, Zap, Target, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";
import SectionHeader from "./SectionHeader";
import AnimateIn from "./AnimateIn";

const OfferSection = () => {
  const features = [
    "Landing page fixes + branding alignment (clarity, trust, CTA hierarchy, friction removal)",
    "LinkedIn content plan + branded visuals (founder + company narrative)",
    "SEO strategy + on-page optimization (titles, internal links, conversion hooks)",
    "One blog post per month engineered to rank and convert",
    "Cold email engine from warm-up to sending (SPF, DKIM, DMARC + sequences + iteration)",
  ];

  const badges = [
    { icon: User, label: "One GTM owner" },
    { icon: Zap, label: "Execution-first" },
    { icon: Target, label: "Designed for pipeline" },
  ];

  return (
    <section id="offer" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(260_50%_45%/0.08)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          label="GTM Execution Package"
          line1="Six-month"
          line2="GTM execution"
          description="Build a GTM system that converts — not a pile of tactics."
          subtitle="Hands-on execution across positioning, landing pages, LinkedIn content and visuals, SEO strategy and one blog post per month, plus cold email from warm-up to sending. Run as one system, not disconnected tasks."
        />

        {/* Terms row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Minimum commitment</p>
            <p className="text-lg font-semibold">six months</p>
          </div>
          <div className="hidden md:block w-px bg-border" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Billing</p>
            <p className="text-lg font-semibold">monthly</p>
          </div>
          <div className="hidden md:block w-px bg-border" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Mode</p>
            <p className="text-lg font-semibold">fractional GTM lead</p>
          </div>
        </div>

        {/* Pricing card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-[hsl(260_40%_40%/0.3)] bg-gradient-to-b from-[hsl(260_30%_18%/0.4)] to-transparent p-8 md:p-10">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[hsl(260_40%_45%/0.25)] to-transparent opacity-50 blur-sm -z-10" />
            
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">Monthly retainer</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-6xl font-bold text-primary">$3,500</span>
              </div>
              <p className="text-muted-foreground mt-2">per month · six-month minimum</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {badges.map((badge, index) => (
                <div key={index} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/50">
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="hero" 
                size="xl"
                className="w-full sm:w-auto"
                onClick={() => window.open(CALENDLY_URL, '_blank')}
              >
                Book a 20-min GTM Audit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
