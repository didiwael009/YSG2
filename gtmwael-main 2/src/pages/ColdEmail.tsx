import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Target, Mail, Shield, BarChart3, Check, X, Users, Settings, Rocket, MessageSquare, Crosshair, HelpCircle, WifiOff } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const whoFor = [
  "B2B SaaS",
  "~10–100 employees",
  "Real ACV",
  "Founder/VP Sales engaged",
];

const whoNotFor = [
  "Messy CRM",
  "No dedicated sending domain",
  "Chasing miracles",
  "Consumer targets",
];

const problems = [
  {
    title: "Targeting is too wide",
    description: '"CEOs, SaaS, US" is invisible.',
    icon: Crosshair,
  },
  {
    title: "Offer is fuzzy",
    description: "No clear problem → outcome → next step.",
    icon: HelpCircle,
  },
  {
    title: "Deliverability is ignored",
    description: "If it doesn't land, nothing else matters.",
    icon: WifiOff,
  },
];

const whatIDo = [
  {
    title: "ICP with zero guesswork",
    icon: Target,
    description: "Lists built from firmographics, tech stack, and buying signals. Lawful sources. No junk scrape.",
  },
  {
    title: "Messages that make decisions",
    icon: Mail,
    description: "Short, problem → outcome. Each email earns the next one.",
  },
  {
    title: "Deliverability that matters",
    icon: Shield,
    description: "SPF, DKIM, DMARC, dedicated domains, progressive warm‑up, hygiene, reputation monitoring.",
  },
  {
    title: "Learning loops",
    icon: BarChart3,
    description: "Start small. Observe weekly signals. Tune angles, CTAs, timing. No trends, just what works.",
  },
];


const caseStudies = [
  {
    company: "Zembra",
    type: "SaaS • US",
    headline: "4× Revenue",
    tags: ["8 Months", "4X Revenue"],
    description: "Rebuilt outbound from scratch for data/AI buyers. New ICP targeting, signal-driven lists, and SDR enablement. Outcomes: 4× revenue in 8 months with consistent messaging aligned to how technical buyers actually evaluate.",
    accentColor: "text-violet-400",
    borderColor: "border-b-violet-400",
  },
  {
    company: "GrowApp",
    type: "SaaS • UK",
    headline: "50% Open Rate",
    tags: ["Cold Outreach", "Signal Lists"],
    description: "Designed and executed cold email campaigns from zero. Built ICP lists using buying signals, ran A/B tests on sequences, and optimized deliverability. Achieved 50% open rates with clean, targeted outbound.",
    accentColor: "text-cyan-400",
    borderColor: "border-b-cyan-400",
  },
  {
    company: "Shipzzer",
    type: "Logistics • US",
    headline: "7% Reply Rate",
    tags: ["50% Open Rate", "7% Reply Rate"],
    description: "Built outbound assets SDRs actually use. Signal-driven targeting, short sequences, and deliverability-first setup. Achieved 50% open rate and 7% reply rate by aligning outreach with what buyers actually look for.",
    accentColor: "text-fuchsia-400",
    borderColor: "border-b-fuchsia-400",
  },
];

const processSteps = [
  {
    step: "01",
    title: "GTM Audit",
    subtitle: "20 min",
    icon: MessageSquare,
    description: "ICP focus, first angles, buying signals.",
  },
  {
    step: "02",
    title: "Set‑up",
    icon: Settings,
    description: "Domains, authentication, sequences, tracking.",
  },
  {
    step: "03",
    title: "Run",
    icon: Rocket,
    description: "Controlled sends, continuous testing, data-driven reviews.",
  },
];

const faqs = [
  {
    question: "Do you guarantee meetings?",
    answer: "No. We track inbox rate, relevance, and reply quality. If those stay weak, we stop.",
  },
  {
    question: "Is this spam?",
    answer: "No. B2B only, lawful sources, one‑click opt‑out, respectful pacing.",
  },
  {
    question: 'How fast is "fast"?',
    answer: "Expect up to 2 months for warm-up and reputation. We avoid shortcuts that burn domains.",
  },
  {
    question: "What do you need from us?",
    answer: "Dedicated domain(s), ICP clarity, CRM hygiene, and someone who takes calls.",
  },
];

const ColdEmail = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-hero-gradient pt-20">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container relative z-10 px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="font-display font-bold tracking-[-0.03em] mb-6 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95]">Cold Email Engine</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">for B2B SaaS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Signal‑first outbound that produces useful replies without "growth hacks".
            </p>
            
            <div className="animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="/book">
                  Book a 20‑minute GTM Audit
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>



      {/* Why Outbound Usually Fails */}
      <section className="section-padding">
        <div className="container px-4">
          <h2 className="font-display font-bold tracking-tight text-center mb-16">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Why Outbound</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">Usually Fails</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="group relative bg-card/50 border border-border rounded-2xl p-8 hover:border-destructive/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Actually Do */}
      <section className="section-padding bg-card/30 border-y border-border">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold tracking-tight mb-4">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">What I Actually Do</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">(No Cadence Promises)</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whatIDo.map((item, index) => (
              <div key={index} className="flex items-start gap-5 p-6 rounded-2xl border border-border bg-card/50">
                <div className="icon-container-lg flex-shrink-0">
                  <item.icon className="icon-primary-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 rounded-2xl border border-primary/30 bg-primary/5 max-w-3xl mx-auto text-center">
            <p className="text-foreground font-medium">
              <span className="text-primary">Warm‑up reality:</span> Plan for up to 2 months before any volume push. Reputation first.
            </p>
          </div>
        </div>
      </section>


      {/* Proof Section */}
      <section className="section-padding bg-card/30 border-y border-border">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold tracking-tight mb-4">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Proof</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">(Sober, Verifiable)</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <div key={index} className={`bg-card/50 border border-border rounded-2xl p-8 hover:border-white/20 transition-colors border-b-4 ${study.borderColor}`}>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{study.company}</h3>
                  <p className="text-sm text-muted-foreground">{study.type}</p>
                </div>
                <p className={`text-3xl md:text-4xl font-bold mb-4 ${study.accentColor}`}>{study.headline}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{study.description}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-10 text-sm">
            Detailed metrics are shown live in the audit. Screenshots are redacted.
          </p>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-padding">
        <div className="container px-4">
          <h2 className="font-display font-bold tracking-tight text-center mb-16">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">How We</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">Work</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-0">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`py-12 ${index !== processSteps.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="flex items-start gap-6">
                  <div className="icon-container-lg flex-shrink-0">
                    <step.icon className="icon-primary-lg" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Step {step.step}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {step.title}
                      {step.subtitle && (
                        <span className="text-lg text-muted-foreground font-normal ml-2">({step.subtitle})</span>
                      )}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-8 text-sm">
            No weekly commitment is promised or required. We adjust based on indicators.
          </p>
        </div>
      </section>



      {/* Example Email Format */}
      <section className="section-padding">
        <div className="container px-4">
          <h2 className="font-display font-bold tracking-tight text-center mb-12">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Example Email</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">Format (Redacted)</span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/50 border border-border rounded-2xl p-8 font-mono text-sm">
              <p className="text-muted-foreground mb-4">
                <span className="text-primary">Subject:</span> {"{{trigger}}"} at {"{{company}}"}
              </p>
              
              <p className="text-muted-foreground mb-4">
                <span className="text-primary">Body (≤ 60 words):</span>
              </p>
              
              <p className="text-foreground leading-relaxed">
                Noticed {"{{specific signal}}"}. Teams in {"{{peer group}}"} hit {"{{problem}}"} when {"{{context}}"}.
              </p>
              <p className="text-foreground leading-relaxed mt-3">
                I help them get {"{{outcome}}"} without {"{{unwanted tradeoff}}"}.
              </p>
              <p className="text-foreground leading-relaxed mt-3">
                Worth a quick look? If yes, I'll send the 2‑line approach; if not, I'll close the loop.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-card/30 border-y border-border">
        <div className="container px-4">
          <h2 className="font-display font-bold tracking-tight text-center mb-16">
            <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Frequently</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">Asked</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl border border-border bg-card/50">
                <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-bold tracking-tight mb-8">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Book a 20‑minute</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-primary mt-2">GTM Audit</span>
            </h2>
            
            <Button variant="hero" size="lg" className="group" asChild>
              <a href="/book">
                Book Your GTM Audit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ColdEmail;
