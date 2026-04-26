import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Mail, Route, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const stats = [
  { value: "4", label: "international SaaS projects" },
  { value: "2×", label: "SaaS founder experience" },
  { value: "100%", label: "Upwork Job Success Score" },
];

const caseStudies = [
  {
    client: "Shipzzer",
    title: "Top 3 Google rankings + 50% open rate cold email engine in 90 days",
    description:
      "Full GTM rebuild for a freight forwarding SaaS. Built SEO architecture, cold email sequences, and an on-brand messaging system for container depot buyers.",
    metric: "Top 3",
    label: "Google rankings for target keywords",
    href: "/case-study/shipzzer",
    icon: Route,
  },
  {
    client: "Screenplay",
    title: "From confusing AI tool to guided product funnel",
    description:
      "Rebuilt the user experience for an AI screenplay product. Turned a scattered product flow into a guided funnel with clearer onboarding and monetization logic.",
    metric: "Guided",
    label: "product funnel from entry to export",
    href: "/case-study/screenplay",
    icon: Sparkles,
  },
  {
    client: "Zembra",
    title: "4× revenue in 8 months through full SaaS rebrand and outbound revamp",
    description:
      "Led a rebrand for a Reviews API SaaS, shifting it from technical API positioning to a clearer data-intelligence platform narrative activated through outbound.",
    metric: "4×",
    label: "revenue growth in 8 months",
    href: "/case-study/zembra",
    icon: Mail,
  },
  {
    client: "Pubrella",
    title: "3× landing page conversion through positioning and CRO",
    description:
      "Overhauled a SaaS landing page with clearer messaging, reduced friction, better trust signals, and a sharper CTA hierarchy.",
    metric: "3×",
    label: "visit-to-signup conversion lift",
    href: "/case-study/pubrella",
    icon: BarChart3,
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,hsl(var(--primary)/0.18),transparent_34%),radial-gradient(circle_at_16%_34%,hsl(var(--accent)/0.11),transparent_28%)]" />
          <div className="container relative z-10 mx-auto px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Portfolio
            </p>
            <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              SaaS Growth Case Studies
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Real results from B2B SaaS marketing and growth projects. Rebrands, landing page
              optimization, cold email systems, SEO architecture, and full GTM rebuilds.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="lg" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a 20-min GTM Audit
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#featured-work">View case studies</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/60 bg-card/60 p-6 text-center shadow-lg shadow-background/20"
                >
                  <strong className="block font-display text-4xl font-bold text-primary">
                    {stat.value}
                  </strong>
                  <span className="mt-2 block text-sm uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-work" className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Featured work
              </p>
              <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Four different growth problems, one connected GTM lens
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {caseStudies.map((item) => (
                <Link
                  key={item.client}
                  to={item.href}
                  className="group rounded-2xl border border-border/60 bg-card/70 p-7 text-left shadow-lg shadow-background/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/10"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.client}
                    </p>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-7 border-t border-border/60 pt-6">
                    <strong className="block font-display text-4xl font-bold text-primary">
                      {item.metric}
                    </strong>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/30 py-20">
          <div className="container mx-auto px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              About
            </p>
            <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Built by a 2× SaaS founder who's been in your shoes
            </h2>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-muted-foreground">
              I've founded, scaled, and sold SaaS products. I've run positioning, messaging, landing
              pages, SEO, cold email, paid ads, and analytics. These case studies represent real
              client work, not theory or templates.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
