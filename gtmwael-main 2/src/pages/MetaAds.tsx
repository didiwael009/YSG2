import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Target, Users, Palette, Check, Download, Star, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";

import metaAdsDashboard from "@/assets/meta-ads-dashboard.png";
import adCreative1 from "@/assets/ad-creative-1.jpg";
import adCreative2 from "@/assets/ad-creative-2.jpg";
import adCreative3 from "@/assets/ad-creative-3.jpg";
import adCreative4 from "@/assets/ad-creative-4.jpg";

const bottlenecks = [
  {
    step: "01",
    title: "Tracking",
    subtitle: "Meta doesn't see the buyer",
    description: "Events are messy. We fix Pixel + CAPI, set value events, and stop optimising for vanity clicks.",
    icon: Target,
    accentColor: "text-violet-400",
    borderColor: "border-b-violet-400",
  },
  {
    step: "02",
    title: "Targeting",
    subtitle: "Audiences are broad, signals are weak",
    description: "We build lookalikes from real buyers and stack behaviours (ATC, product views, time) across 0–7–30 days.",
    icon: Users,
    accentColor: "text-cyan-400",
    borderColor: "border-b-cyan-400",
  },
  {
    step: "03",
    title: "Creative",
    subtitle: "Fatigue kills after 72 hours",
    description: "New concepts every two weeks with anti-fatigue rules. Hooks that lift CTR while CPA drops.",
    icon: Palette,
    accentColor: "text-fuchsia-400",
    borderColor: "border-b-fuchsia-400",
  },
];

const sprintItems = [
  {
    title: "Tracking that tells the truth",
    description: "Pixel + CAPI, value conversions, clean attribution. EMQ monitored.",
  },
  {
    title: "Signal-based targeting",
    description: "Buyers → lookalikes, behaviour stacking, staged retargeting.",
  },
  {
    title: "Creative rotation",
    description: "4 concepts × 3 variations (static/motion/UGC-style) every 2 weeks.",
  },
  {
    title: "Daily steering",
    description: "Rules for budgets, swaps, and tests. Weekly summary.",
  },
];

const caseStudies = [
  {
    client: "DTC Skincare",
    details: "AOV £48, £15k/mo",
    metrics: [
      { label: "ROAS (Meta 7-day click)", before: "1.2", after: "3.1" },
      { label: "CPA", before: "£42", after: "£23" },
    ],
    actions: "CAPI gateway, buyers LAL 1-2%, UGC 'routine 30s'.",
    accentColor: "text-violet-400",
    borderColor: "border-b-violet-400",
  },
  {
    client: "Growapp",
    details: "SaaS B2B Free Trial",
    metrics: [
      { label: "Cost per Lead", before: "£30+", after: "£3–£7" },
      { label: "Trial requests (6 months)", before: "—", after: "847" },
      { label: "Warm traffic CPV", before: "—", after: "£0.20–£0.35" },
    ],
    actions: "Killed generic lead form → direct Trial offer. Split campaigns (warm/prospecting/tests). Fixed tracking, monitored frequency caps, scaled winners +30% every 2 days.",
    accentColor: "text-cyan-400",
    borderColor: "border-b-cyan-400",
    caseStudyLink: "/case-study/growapp",
    highlight: "73% lower CPL vs. industry average",
  },
];


const auditReviewItems = [
  "Tracking stack (Pixel, CAPI, events & attribution)",
  "Buyer signals (audiences, sequencing)",
  "Creative fit (hooks, fatigue, cadence)",
];

const creatives = [
  { src: adCreative1, alt: "Feed ad creative - square format" },
  { src: adCreative2, alt: "Concept creative - product showcase" },
  { src: adCreative3, alt: "Split comparison creative" },
  { src: adCreative4, alt: "Story ad creative - vertical format" },
];

const MetaAds = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from("playbook_leads").insert({
        name: leadForm.name,
        email: leadForm.email,
      });
    } catch {
      // Keep the download flow working even if the optional lead backend is unavailable.
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-20">
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(900px 600px at 50% 30%, rgba(0,0,0,0.5), transparent 60%)',
          }}
        />
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Subtle background glow */}
        <div className="absolute top-[25%] right-[20%] w-[500px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4 animate-fade-up opacity-0" style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}>
                Meta Ads
              </p>
              <h1 className="font-display font-bold mb-8 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Buyer-led</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">acquisition.</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg animate-fade-up opacity-0" style={{ animationDelay: '180ms', animationFillMode: 'forwards' }}>
                Meta ads optimized for <span className="font-semibold text-foreground">real demand</span> — not traffic. Tuned to purchase-level signals, not CPM or clicks.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-12 mb-10 animate-fade-up opacity-0" style={{ animationDelay: '260ms', animationFillMode: 'forwards' }}>
                <div className="text-center lg:text-left">
                  <p className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">+38%</p>
                  <p className="text-sm text-muted-foreground mt-2">Conversion rate</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">−26%</p>
                  <p className="text-sm text-muted-foreground mt-2">CPA reduction</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">11</p>
                  <p className="text-sm text-muted-foreground mt-2">Active accounts</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 animate-fade-up opacity-0" style={{ animationDelay: '340ms', animationFillMode: 'forwards' }}>
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="group"
                  onClick={() => scrollToSection("audit")}
                >
                  Get a 30-min audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="glass" 
                  size="xl"
                  className="group"
                  onClick={() => setShowLeadModal(true)}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Meta Ads Playbook
                </Button>
              </div>

              <p className="text-xs text-muted-foreground/60 animate-fade-up opacity-0" style={{ animationDelay: '420ms', animationFillMode: 'forwards' }}>
                Attribution: Meta 7-day click. Results vary by offer, spend, and seasonality.
              </p>
            </div>

            {/* Right: macOS-style Proof Snapshot card */}
            <div className="relative animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <div className="relative">
                {/* macOS-style window */}
                <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                  {/* Window title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">Proof Snapshot</span>
                  </div>
                  
                  {/* Dashboard content */}
                  <div className="p-2">
                    <img 
                      src={metaAdsDashboard} 
                      alt="Meta Ads Manager Dashboard showing campaign performance" 
                      className="w-full rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Floating CPC badge */}
                <div className="absolute -bottom-4 -right-4 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3 shadow-xl">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">CPC</p>
                  <p className="text-xl font-bold text-foreground">€0.19</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Why Your Spend Underperforms */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why your spend underperforms</h2>
            <p className="text-lg text-muted-foreground">Three bottlenecks we remove</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bottlenecks.map((item, index) => (
              <div 
                key={index} 
                className={`bg-card/50 border border-border rounded-2xl p-8 hover:border-white/20 transition-colors border-b-4 ${item.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-2xl font-bold ${item.accentColor}`}>{item.step}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-lg font-semibold text-foreground">{item.title}</span>
                </div>
                <p className={`text-lg font-medium mb-3 ${item.accentColor}`}>{item.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proving Sprint Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header - consistent with other sections */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proving sprint</h2>
            <p className="text-lg text-muted-foreground">Truth and traction in 30 days — or walk away free</p>
          </div>

          {/* Sprint Items Grid - 2x2 for balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {sprintItems.map((item, index) => (
              <div 
                key={index} 
                className="group bg-card/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:bg-card/80"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Step {index + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => scrollToSection("audit")}
            >
              Run the sprint
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proof</h2>
            <p className="text-lg text-muted-foreground">Results that are hard to miss</p>
          </div>

          {/* Traffic Efficiency Metric */}
          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-12 max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Traffic efficiency metric</p>
            <p className="text-5xl md:text-6xl font-bold text-primary mb-2">£0.19</p>
            <p className="text-xl text-foreground mb-1">CPC</p>
            <p className="text-muted-foreground mb-6">
              CTR 2.86% · Conversion rate 4.00% (Dec 2025). Used to feed audiences and reduce CPA.
            </p>
            <Button 
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="lg"
            >
              <Link to="/case-study/write-your-book">See Full Case Study</Link>
            </Button>
          </div>

          {/* Dashboard Screenshot */}
          <div className="mb-16">
            <div className="bg-card/30 border border-border rounded-2xl p-4 overflow-hidden">
              <img 
                src={metaAdsDashboard} 
                alt="Meta Ads Manager Dashboard showing campaign performance" 
                className="w-full rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className={`bg-card/50 border border-border rounded-2xl p-8 hover:border-white/20 transition-colors border-b-4 ${study.borderColor}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-bold text-foreground">{study.client}</h3>
                  {study.highlight && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-cyan-400/10 ${study.accentColor}`}>
                      {study.highlight}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{study.details}</p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-muted-foreground font-medium">Metric</th>
                        <th className="text-right py-2 text-muted-foreground font-medium">Before</th>
                        <th className="text-right py-2 text-muted-foreground font-medium">After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {study.metrics.map((metric, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3 text-foreground">{metric.label}</td>
                          <td className="py-3 text-right text-muted-foreground">{metric.before}</td>
                          <td className={`py-3 text-right font-semibold ${study.accentColor}`}>{metric.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium text-foreground">Actions:</span> {study.actions}
                </p>

                {study.caseStudyLink && (
                  <Link 
                    to={study.caseStudyLink}
                    className={`inline-flex items-center gap-2 text-sm font-medium ${study.accentColor} hover:underline`}
                  >
                    View full case study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Gallery */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Creative examples</h2>
            <p className="text-lg text-muted-foreground">Feed, Stories, Reels formats</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {creatives.map((creative, index) => (
              <div 
                key={index} 
                className="bg-card/30 border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors aspect-[4/5]"
              >
                <img 
                  src={creative.src} 
                  alt={creative.alt} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Review Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client's review</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
              ))}
              <span className="ml-2 text-lg font-semibold">5.0</span>
            </div>
          </div>

          <div className="bg-card/50 border border-border rounded-2xl p-8">
            <p className="text-lg text-foreground/90 leading-relaxed italic mb-6">
              "Wael is solid. He's a rare Upwork contractor who goes the extra mile and delivers more than originally promised. He was constantly thinking about my funnel improvements and how to get more customers and clicks—sharing ideas and insights proactively. He gave me some great ideas to optimise my funnel and was very thorough. I'd recommend him if you want to optimise your Meta ad spend or your funnel. You want him on your team."
            </p>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground font-medium">— Upwork Client</p>
              <a 
                href="https://www.upwork.com/freelancers/~0172dd07fc1cdd655c?promobnr=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Verify on Upwork
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => { setShowLeadModal(false); setSubmitted(false); }}
          />
          
          {/* Modal */}
          <div className="relative bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-black/50 animate-fade-up">
            <button 
              onClick={() => { setShowLeadModal(false); setSubmitted(false); }}
              aria-label="Close Meta Ads playbook form"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Meta Ads Playbook 2026</h3>
                  <p className="text-muted-foreground">
                    Get my full playbook — tracking, targeting, creative rotation & budget rules. Drop your details below.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <Input
                    placeholder="Your name"
                    aria-label="Your name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-secondary/50 border-border"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    aria-label="Your email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-secondary/50 border-border"
                  />
                  <Button type="submit" variant="hero" size="lg" className="w-full group">
                    Download the Playbook
                    <Download className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground/60 mt-4 text-center">
                  No spam. Just the playbook.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">You're in 🎯</h3>
                <p className="text-muted-foreground mb-6">
                  Click below to download your playbook.
                </p>
                <div className="flex flex-col gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href="/wael-growth-playbook-2026.pdf" download="Meta_Ads_Playbook_2026.pdf">
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { setShowLeadModal(false); setSubmitted(false); }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MetaAds;
