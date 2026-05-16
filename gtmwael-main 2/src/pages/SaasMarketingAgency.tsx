import { ArrowRight, BarChart2, CheckCircle2, LayoutTemplate, Mail, MessageSquare, Search, Target, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "@/components/AnimateIn";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const faqItems = [
  {
    question: "What does a SaaS marketing agency do?",
    answer:
      "A SaaS marketing agency typically helps software companies with channels like SEO, paid ads, content, email, CRO, and demand generation. The problem is that many agencies treat these as separate services. For early-stage SaaS companies, the bigger need is often a connected GTM system — positioning, landing pages, conversion path, analytics, and acquisition working together.",
  },
  {
    question: "Are you a SaaS marketing agency?",
    answer:
      "Not in the traditional sense. I work more like a fractional SaaS growth lead. I help founders diagnose what is blocking growth, fix the core conversion assets, and connect GTM execution across landing pages, CRO, ads, outreach, SEO content, and analytics.",
  },
  {
    question: "When should a SaaS founder hire a marketing agency?",
    answer:
      "You should hire a SaaS marketing agency when you already have clear positioning, a proven offer, working conversion paths, reliable tracking, and enough budget to scale execution. If those pieces are not clear yet, you likely need a GTM and conversion diagnosis first.",
  },
  {
    question: "What should I fix before spending more on SaaS marketing services?",
    answer:
      "Start with positioning, landing page clarity, CTA hierarchy, proof, analytics, and conversion friction. If these are weak, more traffic usually creates more waste — not more pipeline.",
  },
  {
    question: "Do you offer SaaS marketing services?",
    answer:
      "Yes. I help with SaaS positioning, GTM strategy, landing pages, CRO, Meta Ads, cold email, LinkedIn outreach, analytics, and SEO content as part of a wider growth system.",
  },
  {
    question: "Do you help with SEO for SaaS?",
    answer:
      "Yes, but SEO is not a standalone service. I use it as part of a wider SaaS growth system — to capture intent and support trust and pipeline, not just rankings.",
  },
  {
    question: "Do you help with paid ads?",
    answer:
      "Yes. I help with Meta Ads and paid acquisition strategy, especially where ads need better landing pages, stronger offers, clearer tracking, and better conversion paths.",
  },
  {
    question: "Do you help with cold email?",
    answer:
      "Yes. I help with the full cold email process: targeting, domain setup, deliverability, personalisation, sequences, follow-up copy, and testing.",
  },
];

const fitItems = [
  "You have traffic but weak demo bookings.",
  "You are running ads, but the landing page is not converting.",
  "You send cold emails, but replies are low or inconsistent.",
  "You have a strong product, but the website does not explain it clearly.",
  "You are too early for a full B2B SaaS marketing agency but too busy to keep guessing.",
  "You need someone who can think strategically and still execute.",
];

const engagementSteps = [
  {
    number: "01",
    title: "Diagnosis",
    body: "I review your website, funnel, messaging, acquisition channels, and conversion path. The goal is to find what is blocking trust, demos, trials, or qualified pipeline.",
  },
  {
    number: "02",
    title: "Bottleneck Map",
    body: "You get a clear list of what to fix first. Not everything matters equally. Some fixes improve clarity fast. Some reduce friction. Some make ads cheaper. We focus on the highest-leverage fixes first.",
  },
  {
    number: "03",
    title: "Execution",
    body: "I help rewrite, restructure, test, and improve the core GTM assets — homepage, landing page, cold email sequence, ad angle, analytics setup, or B2B SaaS marketing strategy.",
  },
  {
    number: "04",
    title: "Iteration",
    body: "Once the foundation is stronger, we review performance and decide what to scale. More traffic only makes sense when the page, offer, and funnel are ready.",
  },
];

const fixItems = [
  {
    icon: MessageSquare,
    title: "Positioning",
    body: "If buyers cannot understand what you do in a few seconds, every channel becomes harder. I clarify who the product is for, what problem it solves, and why your solution is different.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Page Clarity",
    body: "A SaaS landing page is not a design asset. I restructure the page so visitors understand the offer, the value, the proof, and the CTA before they leave.",
    link: { label: "SaaS landing page strategy", path: "/services/landing-page" },
  },
  {
    icon: TrendingUp,
    title: "CRO and Conversion Path",
    body: "SaaS CRO is not button-colour testing. I look for confusion, doubt, weak proof, CTA friction, mobile issues, form friction, and broken steps between first visit and demo booking.",
  },
  {
    icon: Target,
    title: "Paid Ads and Message Match",
    body: "Ads do not work in isolation. Before recommending more spend, I check whether the ad angle, audience intent, landing page, CTA, tracking, and follow-up path are strong enough to convert.",
    link: { label: "Meta Ads for SaaS", path: "/services/meta-ads" },
  },
  {
    icon: Mail,
    title: "Cold Email and Outreach",
    body: "Cold email is not just a sequence. I help with targeting, deliverability, personalisation, offer angle, and reply handling — achieving around 50% open rates and 7% reply rates across SaaS campaigns.",
    link: { label: "Cold email for SaaS", path: "/services/cold-email" },
  },
  {
    icon: BarChart2,
    title: "Analytics and Growth Visibility",
    body: "A lot of SaaS teams do not have a growth problem. They have a visibility problem. I help define the basic events, conversion points, and funnel signals needed to make better decisions.",
  },
];

const proofItems = [
  {
    company: "Zembra",
    tag: "Rebrand + Outbound GTM",
    result: "4× revenue growth in 8 months",
    body: "The product had traction but unclear positioning and a cold email system that was not converting. I repositioned the offer, rebuilt the outreach infrastructure, and aligned GTM execution.",
  },
  {
    company: "Shipzzer",
    tag: "SEO + Cold Email",
    result: "Top 3 Google rankings · 50% open rate · 7% reply rate",
    body: "A B2B SaaS platform in freight forwarding with weak search visibility and unclear ICP messaging. I restructured the positioning, built cold email sequences, and developed SEO foundations.",
  },
  {
    company: "Pubrella",
    tag: "Landing Page CRO",
    result: "3× visit-to-signup conversion",
    body: "Started with positioning and brand messaging. Then traffic with clean tracking. Then analytics-led CRO. The refreshed landing page and trust-first approach tripled conversion.",
  },
  {
    company: "GrowApp",
    tag: "Full GTM Launch",
    result: "Bootstrapped SaaS — zero to AppSumo launch",
    body: "A product I built and launched from zero — including product marketing, landing page, AppSumo launch execution, and the full acquisition system.",
  },
];

const methodSteps = [
  "Clarify the positioning.",
  "Fix the landing page.",
  "Remove conversion friction.",
  "Make tracking visible.",
  "Scale acquisition.",
];

const SaasMarketingAgency = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ══════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-xl">
              <AnimateIn delay={100}>
                <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                  SaaS GTM Strategy
                </p>
              </AnimateIn>
              <AnimateIn delay={150}>
                <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-6">
                  SaaS Marketing Agency Alternative for B2B Founders
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Most B2B SaaS founders do not need a bigger marketing team first. They need a sharper message, a clearer landing page, a stronger offer, and a conversion path that does not leak trust before the demo call.
                </p>
              </AnimateIn>
              <AnimateIn delay={250}>
                <ul className="space-y-3 mb-8">
                  {[
                    "Fix positioning before scaling traffic",
                    "Connect landing pages, ads, email, and CRO as one system",
                    "Turn attention into qualified pipeline",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground/90">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min GTM Audit
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="xl" className="border-border hover:border-muted-foreground/50" asChild>
                    <Link to="/case-studies">View SaaS case studies</Link>
                  </Button>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn delay={200} className="flex-shrink-0 w-full lg:w-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
                <div className="relative rounded-3xl border border-border/60 bg-card/70 p-4 shadow-2xl shadow-primary/10 lg:max-w-md">
                  <img
                    src="/saas-marketing-agency-alternative-wael-aouididi.webp"
                    alt="Wael Aouididi SaaS marketing agency alternative for B2B founders"
                    width={1200}
                    height={630}
                    decoding="async"
                    fetchPriority="high"
                    className="aspect-[1200/630] w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. WHY AGENCIES FAIL
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="max-w-2xl mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              The Real Problem
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5">
              Why Most SaaS Marketing Agencies Fail Early-Stage Founders
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Most agencies start with a channel. SEO agency? More content. Paid ads? More campaigns. Cold email? More sequences. That sounds useful until you realise the real problem is not the channel.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {[
              { label: "Vague positioning", body: "Your homepage does not explain the product fast enough for a busy buyer." },
              { label: "No trust before the CTA", body: "Your demo CTA appears before the buyer understands the value." },
              { label: "Broken tracking", body: "Your analytics do not show where people drop or which channel converts." },
              { label: "Outbound sounds generic", body: "Your cold email pitch sounds like every other SaaS founder's message." },
              { label: "Traffic lands nowhere", body: "Your paid traffic lands on a page that was never built to convert cold visitors." },
              { label: "Tactics without a system", body: "More ads. More emails. More posts. More tools. But pipeline still feels random." },
            ].map((item, i) => (
              <AnimateIn key={item.label} delay={150 + i * 60}>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-6 h-full hover:border-primary/30 transition-colors duration-300">
                  <p className="text-sm font-black uppercase tracking-widest text-primary mb-2">{item.label}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="mt-10 max-w-2xl">
            <p className="text-foreground/80 text-lg leading-relaxed border-l-4 border-primary pl-5">
              That is why I do not start by asking: which channel should we scale? I start by asking: <strong className="text-foreground">why would a serious buyer trust this enough to take the next step?</strong>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. WHO THIS IS FOR
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <AnimateIn delay={100}>
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                Best Fit
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
                Who This Is For
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                This is for B2B SaaS founders and small teams who already have something real but cannot turn attention into consistent pipeline.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You do not need a 40-slide strategy deck. You need the right problems fixed in the right order.
              </p>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div className="rounded-3xl border border-border/60 bg-card/50 p-7 space-y-3">
                <p className="text-sm font-black uppercase tracking-widest text-primary mb-4">You may be a good fit if:</p>
                {fitItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90 leading-relaxed">{item}</span>
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="hero" size="lg" className="group w-full" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book a 20-min GTM Audit
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              The Process
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
              How the Engagement Works
            </h2>
          </AnimateIn>

          <div className="max-w-3xl mx-auto border-t border-border/50">
            {engagementSteps.map((step, i) => (
              <AnimateIn key={step.number} delay={150 + i * 80}>
                <div className="grid grid-cols-[64px_1fr] gap-6 border-b border-border/50 py-8">
                  <div className="text-[13px] font-black tracking-widest text-primary pt-1">{step.number}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. WHAT I FIX
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              The Work
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              What I Fix Before Scaling Traffic
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Positioning affects the landing page. The landing page affects paid ads. Paid ads affect analytics. Analytics affects CRO. CRO affects pipeline. When these are fixed as a system, growth compounds.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {fixItems.map((item, i) => (
              <AnimateIn key={item.title} delay={150 + i * 70}>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-7 h-full flex flex-col hover:border-primary/30 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.body}</p>
                  {item.link && (
                    <Link
                      to={item.link.path}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      {item.link.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. WHY DIFFERENT
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimateIn delay={100}>
            <div className="rounded-3xl bg-[linear-gradient(135deg,#171021,#0d0d1a)] p-8 md:p-12 text-white">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                Why Different
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                Why This Is Different From a Typical B2B SaaS Marketing Agency
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="border border-white/10 rounded-2xl p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Typical Agency</p>
                  <ul className="space-y-2 text-[#cfc9dc] text-sm leading-relaxed">
                    {[
                      "One person for content",
                      "One person for ads",
                      "One person for design",
                      "One account manager between you and the work",
                      "Works best when GTM is already clear",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-white/30 mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-primary/40 rounded-2xl p-6 bg-primary/5">
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">What I Do</p>
                  <ul className="space-y-2 text-[#e2ddf0] text-sm leading-relaxed">
                    {[
                      "One person connecting positioning, pages, acquisition, CRO, and outreach",
                      "Operator context — I have built and scaled SaaS products",
                      "Fix the foundation before adding traffic",
                      "Direct execution, no account managers",
                      "Right for early-stage teams that need a system",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-[#cfc9dc] text-sm leading-relaxed">
                That is the gap I fill — as a practical SaaS growth partner, not a generic vendor. If you want to see how this translates into a full{" "}
                <Link to="/blog/landing-page-optimization-best-practices-2026" className="text-primary underline underline-offset-4 font-semibold">
                  SaaS marketing plan
                </Link>
                , that breakdown is available separately.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. PROOF
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100} className="text-center mb-16">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Real Work
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Proof and Experience
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              I am not a generic marketer trying to "serve SaaS." I have built and scaled SaaS products myself. I bring operator context. Not just B2B SaaS marketing agency theory.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {proofItems.map((item, i) => (
              <AnimateIn key={item.company} delay={150 + i * 80}>
                <div className="rounded-2xl border border-border/50 bg-card/50 p-7 h-full hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xl font-bold text-foreground">{item.company}</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm font-black text-primary mb-3">{item.result}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500} className="text-center mt-10">
            <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
              <Link to="/case-studies">
                View all case studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. THE METHOD
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100}>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              The Method
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
              Fix Trust Before Scaling Traffic
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Most founders want more leads. That is understandable. But before adding more traffic, I look for the trust gaps that stop people from converting. The sequence is:
            </p>
          </AnimateIn>

          <div className="space-y-3 mb-10">
            {methodSteps.map((step, i) => (
              <AnimateIn key={step} delay={150 + i * 60}>
                <div className="flex items-center gap-5 rounded-2xl border border-border/50 bg-card/50 px-6 py-4 hover:border-primary/30 transition-colors duration-300">
                  <span className="text-[13px] font-black tracking-widest text-primary min-w-[32px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-bold text-foreground">{step}</span>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={500}>
            <p className="text-muted-foreground leading-relaxed border-l-4 border-primary pl-5">
              This is slower than saying "let's launch ads tomorrow." But it prevents wasted budget. Growth works better when the foundation can hold the traffic.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. WHEN NOT TO HIRE ME
      ══════════════════════════════════════════════ */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100}>
            <div className="rounded-2xl border border-border/60 bg-card/30 p-7 md:p-9">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Honest Filter</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-5">
                When You Should Not Hire Me
              </h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                {[
                  "You want a hands-off vendor who disappears for a month and sends a report.",
                  "You want generic content at volume.",
                  "You want someone to \"just run ads\" without touching the page, offer, or tracking.",
                  "You believe traffic alone will fix weak positioning.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-border mt-1 font-bold">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-foreground/80 leading-relaxed text-sm">
                This works best when the founder is willing to fix the uncomfortable parts: the message, the page, the offer, the proof, and the conversion path. That is where the leverage is.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10. FAQ
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimateIn delay={100} className="mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
          </AnimateIn>

          <div className="border-t border-border/50">
            {faqItems.map((item, index) => (
              <AnimateIn key={item.question} delay={100 + index * 40}>
                <details
                  open={index === 0}
                  className="border-b border-border/50 py-5 group"
                >
                  <summary className="cursor-pointer list-none text-base font-bold text-foreground flex items-center justify-between gap-4">
                    <h3 className="inline font-bold text-foreground">{item.question}</h3>
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 opacity-60" />
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed text-[15px]">{item.answer}</p>
                </details>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          11. FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <AnimateIn delay={100}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border border-primary/20 p-12 md:p-16 text-center">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
                Ready to Find the Real Growth Bottleneck?
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 max-w-3xl mx-auto leading-tight">
                Anyone can make promises.
              </h2>
              <p className="text-muted-foreground mb-3 max-w-xl mx-auto leading-relaxed">
                In a 20-minute GTM Audit, you will know quickly whether I understand your problem.
              </p>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed text-sm">
                Bring your website, your current funnel, and the channel you are trying to scale. I will tell you what is wrong, what to fix first, and whether more traffic is actually the next move.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" className="group" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book a 20-min GTM Audit
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" className="border-border hover:border-muted-foreground/50" asChild>
                  <Link to="/case-studies">View case studies</Link>
                </Button>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer hideCTA />
    </div>
  );
};

export default SaasMarketingAgency;
