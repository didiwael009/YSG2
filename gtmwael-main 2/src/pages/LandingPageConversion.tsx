import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Star, Download, Check, X, Search, LayoutTemplate, ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import ScreenplaySlider from "@/components/ScreenplaySlider";
import AnimateIn from "@/components/AnimateIn";
import landingClarrio from "@/assets/landing-clarrio.png";
import landingZembra from "@/assets/landing-zembra.png";
import landingBottlenexus from "@/assets/landing-bottlenexus.png";
import landingShipzzer from "@/assets/landing-shipzzer.png";
import landingPubwrite from "@/assets/landing-pubwrite.png";
import pubrellaScreenshot from "@/assets/pubrella-screenshot.png";
import playbookCover from "@/assets/landing-page-playbook-3d.png";
import playbookPreview1 from "@/assets/playbook-preview-1.png";
import playbookPreview2 from "@/assets/playbook-preview-2.png";
import playbookPreview3 from "@/assets/playbook-preview-3.png";

const portfolioProjects = [
  {
    title: "Pubrella",
    description: "Full SaaS rebrand — brand identity, positioning, and conversion-optimised landing page.",
    result: "3× visit → signup conversion",
    link: "https://pubrella.com/",
    cover: pubrellaScreenshot,
  },
  {
    title: "BottleNexus",
    description: "Alcohol DTC technology — Oversaw rebrand and page design direction.",
    result: "Complete brand repositioning",
    link: "https://www.behance.net/gallery/211674227/Landing-Page",
    cover: landingBottlenexus,
  },
  {
    title: "Zembra",
    description: "Reviews API platform — Led product positioning and page strategy.",
    result: "Clearer value prop, higher engagement",
    link: "https://zembra.io",
    cover: landingZembra,
  },
  {
    title: "Clarrio.ai",
    description: "Healthcare AI platform — Directed messaging and conversion flow.",
    result: "Structured demo funnel",
    link: "https://clarrio.ai",
    cover: landingClarrio,
  },
  {
    title: "Shipzzer",
    description: "Depot management SaaS — Led positioning and page strategy.",
    result: "SEO top 3 + conversion uplift",
    link: "https://shipzzer.com",
    cover: landingShipzzer,
  },
];

const LandingPageConversion = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from("playbook_leads").insert({
        name: leadForm.name,
        email: leadForm.email,
      });
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
    setSubmitted(true);
  };

  const openLeadModal = () => setShowLeadModal(true);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ══════════════════════════════════════════════
          1. HERO — Playbook-focused
      ══════════════════════════════════════════════ */}
      <section className="pt-32 pb-24 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 max-w-xl">
              <AnimateIn delay={100}>
                <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                  Free Playbook
                </p>
              </AnimateIn>
              <AnimateIn delay={150}>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-6">
                  Fix Your Landing Page Before Spending Money on Ads
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  The exact framework I use to turn confusing SaaS landing pages into demo-generating funnels.
                </p>
              </AnimateIn>
              <AnimateIn delay={250}>
                <ul className="space-y-3 mb-8">
                  {[
                    "Diagnose why visitors don't convert",
                    "Structure a landing page that drives demos",
                    "Fix the 5 mistakes killing most SaaS funnels",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/90">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={300}>
                <Button
                  variant="hero"
                  size="xl"
                  className="group"
                  onClick={openLeadModal}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download the Free Playbook
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-muted-foreground/60 mt-3">
                  Takes 10 minutes to read.
                </p>
              </AnimateIn>
            </div>

            {/* Book mockup */}
            <AnimateIn delay={200} className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
                <img
                  src={playbookCover}
                  alt="Landing Page Playbook 2026 — Free download"
                  className="relative w-64 md:w-80 lg:w-96 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={openLeadModal}
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WHAT YOU'LL LEARN
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              What's Inside
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
              Inside the Landing Page Playbook
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: "Landing Page Diagnosis Framework",
                desc: "How to identify the exact reason visitors don't convert.",
              },
              {
                icon: LayoutTemplate,
                title: "Messaging Structure That Converts",
                desc: "The narrative structure used in high-performing SaaS landing pages.",
              },
              {
                icon: Target,
                title: "Conversion Flow Blueprint",
                desc: "How to structure a page so visitors naturally move toward demo or signup.",
              },
            ].map((card, i) => (
              <AnimateIn key={i} delay={150 + i * 100}>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-8 h-full hover:border-primary/30 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. PLAYBOOK PREVIEW
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Sneak Peek
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
              Preview the Playbook
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: playbookPreview1, label: "Landing Page Teardown" },
              { img: playbookPreview2, label: "Funnel Diagram" },
              { img: playbookPreview3, label: "Messaging Framework" },
            ].map((preview, i) => (
              <AnimateIn key={i} delay={150 + i * 100}>
                <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/30 hover:border-primary/30 transition-all duration-300 group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={preview.img}
                      alt={preview.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-foreground">{preview.label}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10"
              onClick={openLeadModal}
            >
              <Download className="mr-2 h-5 w-5" />
              Get the Full Playbook
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. TESTIMONIAL (moved up)
      ══════════════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100}>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary">5.0 on Upwork</span>
              </div>
              <blockquote className="text-foreground text-lg md:text-xl leading-relaxed italic mb-5">
                "Wael acted as a growth partner. We started with positioning, brand messaging and copy; then traffic (Meta Ads) with clean tracking; then analytics-led CRO. With this trust–traffic–analytics approach and a refreshed landing, our <strong className="text-primary not-italic">visit → signup conversion improved by about 3×</strong>. Easy to work with and fast."
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Pubrella · Early-Stage GTM</span>
                <span className="hidden sm:inline">·</span>
                <span>Jan – Feb 2026</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. PORTFOLIO AS PROOF
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Real Work
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              These frameworks come from real SaaS projects
            </h2>
          </AnimateIn>

          {/* Screenplay Performance Studio — special card */}
          <AnimateIn delay={150} className="mb-12">
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50 p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 space-y-5">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                    GTM Launch · Landing Page + Funnel + Product UI/UX
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
                    Screenplay Performance Studio
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    AI tool for screenwriters — reads scenes aloud with emotion and pacing. Optimised the full funnel end-to-end: landing page, onboarding, and product dashboard UI/UX.
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">What I did</h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      {[
                        "Pulled the interactive demo into the hero — visitors hear the product within 3 seconds",
                        "Rewrote the headline from feature-speak to an emotional question",
                        "Restructured the full funnel: hero → proof → CTA",
                        "Optimised the product dashboard UI/UX",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild variant="outline" size="sm" className="mt-2 w-fit">
                    <a href="https://screenplayperformancestudio.com/landing.html" target="_blank" rel="noopener noreferrer">
                      View Live Site <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                <ScreenplaySlider />
              </div>
            </div>
          </AnimateIn>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project, i) => (
              <AnimateIn key={i} delay={200 + i * 80}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/30 hover:border-primary/30 transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-xs font-semibold text-primary">{project.result}</p>
                    </div>
                  </div>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. INLINE LEAD CAPTURE FORM
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-lg">
          <AnimateIn delay={100} className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
              <Download className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
              Get the Playbook
            </h2>
            <p className="text-muted-foreground">
              Drop your details and I'll send it straight over.
            </p>
          </AnimateIn>

          <AnimateIn delay={200}>
            {!submitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-secondary/50 border-border h-12"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-secondary/50 border-border h-12"
                />
                <Input
                  placeholder="Company (optional)"
                  value={leadForm.company}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-secondary/50 border-border h-12"
                />
                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  Send Me the Playbook
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-muted-foreground/60 text-center">
                  No spam. Just the playbook.
                </p>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">You're in 🎯</h3>
                <p className="text-muted-foreground mb-6">Click below to download your playbook.</p>
                <Button variant="hero" size="lg" asChild>
                  <a href="/wael-landing-page-playbook-2026.pdf" download="Landing_Page_Playbook_2026.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
              </div>
            )}
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border border-primary/20 p-12 md:p-16 text-center">
            <AnimateIn delay={100}>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 max-w-3xl mx-auto leading-tight">
                If your landing page confuses visitors, nothing else will fix your funnel.
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" onClick={openLeadModal}>
                  <Download className="mr-2 h-5 w-5" />
                  Download the Playbook
                </Button>
                <Button asChild variant="outline" size="xl" className="border-border hover:border-muted-foreground/50">
                  <a href="/book">
                    Book a Call
                  </a>
                </Button>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LEAD CAPTURE MODAL (from hero/preview CTA)
      ══════════════════════════════════════════════ */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <button
              onClick={() => { setShowLeadModal(false); setSubmitted(false); }}
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">Landing Page Playbook 2026</h3>
                  <p className="text-muted-foreground">
                    Get my full playbook — positioning, messaging, structure & conversion tactics.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-secondary/50 border-border"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-secondary/50 border-border"
                  />
                  <Button type="submit" variant="hero" size="lg" className="w-full group">
                    Send Me the Playbook
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                <p className="text-muted-foreground mb-6">Click below to download your playbook.</p>
                <div className="flex flex-col gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href="/wael-landing-page-playbook-2026.pdf" download="Landing_Page_Playbook_2026.pdf">
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
    </div>
  );
};

export default LandingPageConversion;
