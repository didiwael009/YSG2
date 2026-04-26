import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Target, Zap, Check, Star, Layout, MousePointerClick, MessageSquare, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import icCenterHero from "@/assets/ic-center-hero.png";
import icCenterFullLanding from "@/assets/ic-center-full-landing.png";
import { CALENDLY_URL } from "@/lib/constants";

const CaseStudyICCenter = () => {
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

          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Case Study
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            IC Center — <span className="text-primary">Landing Page & CRO</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Full landing page build with funnel messaging and design optimized for conversion — turning visitors into qualified leads.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Layout className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">Full</div>
              <div className="text-sm text-muted-foreground">Landing Page</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">Funnel</div>
              <div className="text-sm text-muted-foreground">Messaging</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <MousePointerClick className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">CRO</div>
              <div className="text-sm text-muted-foreground">Optimized</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary">Design</div>
              <div className="text-sm text-muted-foreground">Enhanced</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Win */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Win</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            IC Center needed a landing page that would convert cold traffic into booked consultations. I built the full page from scratch — strategy-first messaging, scroll-optimized layout, and conversion-focused design — creating a funnel that moves visitors from problem-aware to action-ready in one scroll.
          </p>
        </div>
      </section>

      {/* The Proof */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Proof</h2>
          <p className="text-muted-foreground mb-8 text-center">Landing page designed and built for IC Center</p>

          <div className="space-y-8">
            {/* Hero screenshot */}
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground ml-2">IC Center — Hero Section</span>
              </div>
              <div className="p-2">
                <img src={icCenterHero} alt="IC Center landing page hero section" className="w-full rounded-lg" />
              </div>
            </div>

            {/* Full landing page */}
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground ml-2">IC Center — Full Landing Page</span>
              </div>
              <div className="p-2">
                <img src={icCenterFullLanding} alt="IC Center full landing page" className="w-full rounded-lg" />
              </div>
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
              { icon: Layout, title: "Landing Page Build", desc: "Designed and developed a full conversion-focused landing page from scratch — structure, copy hierarchy, and visual flow." },
              { icon: MessageSquare, title: "Funnel Messaging", desc: "Crafted the full messaging framework: headline hooks, objection handling, social proof placement, and CTA sequencing." },
              { icon: MousePointerClick, title: "CRO Enhancement", desc: "Optimized every scroll section for conversion — strategic CTA placement, friction removal, and trust signal positioning." },
              { icon: Layers, title: "Design System", desc: "Built a cohesive visual identity with consistent spacing, typography hierarchy, and brand-aligned color palette." },
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
              "Conversion-optimized landing page turning cold traffic into leads",
              "Clear funnel messaging that moves visitors from awareness to action",
              "Professional brand presence building instant credibility",
              "Scroll-optimized layout with strategic CTA placement",
              "Reusable design system for future marketing pages",
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
            "I built IC Center's landing page end-to-end — from funnel messaging to CRO-optimized design — turning their web presence into a lead generation machine."
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want a landing page like this?</h2>
          <p className="text-muted-foreground mb-8">Book a free diagnostic call and let's craft your conversion machine.</p>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">Book a Call</Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyICCenter;
