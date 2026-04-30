import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";
import { ArrowRight, Check, X } from "lucide-react";

type Metric = { value: string; label: string };
type TextBlock = { icon: string; title: string; description: string };
type ProofSide = { label: string; title: string; image: string; alt: string; points: string[] };
type Result = { number: string; title: string; description: string };

type Props = {
  client: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  metrics: Metric[];
  problemTitle: string;
  problemParagraphs: string[];
  builtTitle: string;
  built: TextBlock[];
  proofIntro: string;
  before: ProofSide;
  after: ProofSide;
  proofCaption: string;
  extra?: ReactNode;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  results: Result[];
  ctaTitle: string;
  ctaLabel: string;
  ctaSubtext: string;
};

const useDocumentMeta = (title: string, description: string, canonical: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
      const created = !el;
      if (!el) {
        if (selector.startsWith("link")) {
          el = document.createElement("link");
          (el as HTMLLinkElement).rel = "canonical";
        } else {
          el = document.createElement("meta");
          const match = selector.match(/\[(name|property)="([^"]+)"\]/);
          if (match) (el as HTMLMetaElement).setAttribute(match[1], match[2]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return { el, created };
    };

    const created: HTMLElement[] = [];
    const track = (result: { el: HTMLElement; created: boolean }) => {
      if (result.created) created.push(result.el);
    };

    track(setMeta('meta[name="description"]', "content", description));
    track(setMeta('link[rel="canonical"]', "href", canonical));
    track(setMeta('meta[property="og:title"]', "content", title));
    track(setMeta('meta[property="og:description"]', "content", description));
    track(setMeta('meta[property="og:url"]', "content", canonical));
    track(setMeta('meta[property="og:type"]', "content", "article"));
    track(setMeta('meta[name="twitter:card"]', "content", "summary_large_image"));

    return () => {
      document.title = previousTitle;
      created.forEach((el) => el.remove());
    };
  }, [title, description, canonical]);
};

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">{children}</p>
);

const GrowthCaseStudyPage = ({
  client,
  title,
  description,
  metaTitle,
  metaDescription,
  canonical,
  metrics,
  problemTitle,
  problemParagraphs,
  builtTitle,
  built,
  proofIntro,
  before,
  after,
  proofCaption,
  extra,
  testimonial,
  results,
  ctaTitle,
  ctaLabel,
  ctaSubtext,
}: Props) => {
  useDocumentMeta(metaTitle, metaDescription, canonical);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,hsl(var(--primary)/0.18),transparent_34%),radial-gradient(circle_at_16%_34%,hsl(var(--accent)/0.1),transparent_28%)]" />
          <div className="container relative z-10 mx-auto px-6">
            <Link
              to="/case-studies"
              className="mb-10 inline-flex text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              ← Back to case studies
            </Link>
            <SectionLabel>{client}</SectionLabel>
            <h1 className="font-display max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((metric) => (
                <article key={metric.label} className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-lg shadow-background/20">
                  <strong className="block font-display text-5xl font-bold leading-none text-primary">
                    {metric.value}
                  </strong>
                  <span className="mt-4 block text-sm uppercase tracking-[0.16em] text-muted-foreground">
                    {metric.label}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/40 py-20">
          <div className="container mx-auto max-w-4xl px-6">
            <SectionLabel>The problem</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {problemTitle}
            </h2>
            <div className="mt-8 grid gap-6 text-lg leading-relaxed text-muted-foreground">
              {problemParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionLabel>What I built</SectionLabel>
            <h2 className="font-display max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {builtTitle}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {built.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border/60 bg-card/70 p-7 shadow-lg shadow-background/20">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl">
                    {item.icon}
                  </span>
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-card/30 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionLabel>Visual proof</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              The before/after transformation
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">{proofIntro}</p>

            <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_auto_1fr]">
              {[before, after].map((side, index) => {
                const isAfter = index === 1;
                return (
                  <article key={side.label} className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-xl shadow-background/30">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${isAfter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {side.label}
                      </span>
                      <strong className="text-sm text-foreground">{side.title}</strong>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-border bg-white">
                      <ResponsiveImage
                        src={side.image}
                        alt={side.alt}
                        className="h-[380px] w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                      />
                    </div>
                    <ul className="mt-5 grid gap-3">
                      {side.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                          {isAfter ? <Check className="mt-0.5 h-4 w-4 flex-none text-primary" /> : <X className="mt-0.5 h-4 w-4 flex-none text-muted-foreground" />}
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
              <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20 lg:flex">
                →
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-muted-foreground">{proofCaption}</p>
          </div>
        </section>

        {extra}

        {testimonial && (
          <section className="py-20">
            <div className="container mx-auto max-w-4xl px-6">
              <SectionLabel>Client testimonial</SectionLabel>
              <figure className="rounded-2xl border border-border/60 border-l-primary bg-card/70 p-8 shadow-lg shadow-background/20">
                <blockquote className="text-xl italic leading-relaxed text-foreground">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  <strong>{testimonial.author}</strong>
                  <span className="block text-muted-foreground/70">{testimonial.role}</span>
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <section className="border-y border-border/60 bg-card/40 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <SectionLabel>Results summary</SectionLabel>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              What it produced
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {results.map((result) => (
                <article key={result.number} className="rounded-2xl border border-border/60 bg-background/70 p-7 shadow-lg shadow-background/20">
                  <span className="font-display text-2xl font-bold text-primary">{result.number}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{result.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{result.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center md:py-28">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">{ctaTitle}</h2>
            <Button className="mt-8" variant="hero" size="lg" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">{ctaSubtext}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GrowthCaseStudyPage;
