import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Zap, Check, Star, Globe, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import landingBottlenexus from "@/assets/landing-bottlenexus.png";
import bottlenexusLogo from "@/assets/bottlenexus-logo.svg";
import { CALENDLY_URL } from "@/lib/constants";

const CaseStudyBottlenexus = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <img src={bottlenexusLogo} alt="BottleNexus" className="w-12 h-12 rounded-xl object-contain bg-card p-1" />
            <span className="text-sm text-muted-foreground">Head of Creative · US</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            BottleNexus — <span className="text-primary">Full Rebrand</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4">
            Delivered a full rebrand from brand foundations to live content, then ran ongoing creative ops. From Sept '24 → Feb '25, built the identity, site system, and a weekly content engine (reels, reports, decks) that ships on-brand.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["New Landing Page", "Creative Ops", "Visual Identity", "Content Engine"].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg">
            {[
              { metric: "Full", label: "Rebrand" },
              { metric: "B2B", label: "Wine Market" },
              { metric: "Weekly", label: "Content Engine" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{s.metric}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Win */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Win</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            BottleNexus was launching a wine marketplace connecting producers with buyers. They needed everything — brand positioning, a conversion-focused landing page, and a go-to-market strategy to acquire their first users. I built the full system from scratch, giving them a launch-ready platform with clear messaging and acquisition funnels.
          </p>
        </div>
      </section>

      {/* The Proof */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Proof</h2>
          <p className="text-muted-foreground mb-8 text-center">Landing page designed and built for BottleNexus</p>

          <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-muted-foreground ml-2">bottlenexus.com</span>
            </div>
            <div className="p-2">
              <img src={landingBottlenexus} alt="BottleNexus landing page" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* What I Did */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What I Did</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Globe, title: "Visual Identity & Brand System", desc: "Created the full brand identity — logo, color system, typography, and brand guidelines — from scratch for the wine marketplace." },
              { icon: Target, title: "Website & Content Engine", desc: "Built a conversion-focused landing page and set up a weekly content engine producing reels, reports, and decks on-brand." },
              { icon: BarChart3, title: "Ongoing Creative Execution", desc: "Ran creative ops from Sept '24 → Feb '25, shipping consistent on-brand content across all channels weekly." },
              { icon: Zap, title: "Funnel & GTM Strategy", desc: "Designed user acquisition funnels for both sides of the marketplace with targeted messaging and CTAs." },
            ].map((item) => (
              <div key={item.title} className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 p-6">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Unlocked */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What This Unlocked</h2>
          <div className="space-y-4">
            {[
              "Launch-ready platform with professional brand identity",
              "Clear two-sided marketplace positioning",
              "Conversion-optimized landing page for both producers and buyers",
              "Structured GTM playbook for phased market entry",
              "Scalable acquisition funnels for sustainable growth",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Sentence Summary */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <Star className="w-8 h-8 text-primary mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium italic text-foreground leading-relaxed">
            "I built BottleNexus's entire go-to-market system — brand, landing page, and growth strategy — turning an idea into a launch-ready wine marketplace."
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to launch your product?</h2>
          <p className="text-muted-foreground mb-8">Book a free diagnostic call and let's build your GTM system.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="https://www.instagram.com/bottlenexus/" target="_blank" rel="noopener noreferrer">
                See Live Brand & Content
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="https://www.behance.net/gallery/234607371/Saas-B2B-Content-Creation" target="_blank" rel="noopener noreferrer">
                B2B Design Content
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyBottlenexus;
