import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* =========================================================================
 * Case Study Kit — shared primitives for the redesigned case study system
 * Light-first rhythm: LIGHT, LIGHT, LIGHT, DARK, LIGHT, LIGHT, DARK, LIGHT
 * Only orange accents on key words, arrows, CTAs, small highlights.
 * ========================================================================= */

/* ---------- Sections -------------------------------------------------- */

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/** White / very-light section. Use for most of the page. */
export const LightSection = ({ id, children, className = "" }: SectionProps) => (
  <section
    id={id}
    className={`bg-[hsl(0_0%_100%)] text-[hsl(240_20%_15%)] px-4 py-20 md:py-28 ${className}`}
  >
    <div className="mx-auto max-w-[1180px]">{children}</div>
  </section>
);

/** Subtle off-white section to separate two consecutive light sections. */
export const SubtleSection = ({ id, children, className = "" }: SectionProps) => (
  <section
    id={id}
    className={`bg-[hsl(0_0%_98%)] text-[hsl(240_20%_15%)] px-4 py-20 md:py-28 ${className}`}
  >
    <div className="mx-auto max-w-[1180px]">{children}</div>
  </section>
);

/** Dark navy emphasis section. Use sparingly (max 2 per page). */
export const DarkSection = ({ id, children, className = "" }: SectionProps) => (
  <section
    id={id}
    className={`bg-[hsl(240_30%_8%)] text-[hsl(0_0%_98%)] px-4 py-20 md:py-28 ${className}`}
  >
    <div className="mx-auto max-w-[1180px]">{children}</div>
  </section>
);

/* ---------- Headings -------------------------------------------------- */

export const Eyebrow = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <p
    className={`text-[11px] font-bold tracking-[0.22em] uppercase mb-4 text-primary`}
    data-tone={tone}
  >
    {children}
  </p>
);

export const SectionHead = ({
  eyebrow,
  title,
  sub,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) => {
  const subColor = tone === "dark" ? "text-white/70" : "text-[hsl(240_10%_45%)]";
  return (
    <div
      className={`mb-14 md:mb-16 ${
        align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"
      }`}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl md:text-[42px] font-bold leading-[1.1] tracking-tight">
        {title}
      </h2>
      {sub && <p className={`mt-4 text-base md:text-lg ${subColor}`}>{sub}</p>}
    </div>
  );
};

/* ---------- Hero ------------------------------------------------------ */

export const HeroBackLink = () => (
  <Link
    to="/"
    className="inline-flex items-center gap-2 text-sm text-[hsl(240_10%_45%)] hover:text-primary transition-colors mb-10"
  >
    <span aria-hidden>←</span> Back to Home
  </Link>
);

export const HeroBadges = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2 mb-7">
    {items.map((b) => (
      <span
        key={b}
        className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/15"
      >
        {b}
      </span>
    ))}
  </div>
);

/* ---------- Cards ----------------------------------------------------- */

export const LightCard = ({
  children,
  className = "",
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-2xl bg-white p-6 md:p-7 transition-shadow shadow-[0_2px_12px_-4px_hsl(240_20%_20%/0.08)] hover:shadow-[0_8px_28px_-8px_hsl(240_20%_20%/0.12)] ${
      highlight
        ? "border border-primary/30 ring-1 ring-primary/10"
        : "border border-[hsl(240_10%_92%)]"
    } ${className}`}
  >
    {children}
  </div>
);

export const DarkCard = ({
  children,
  className = "",
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-2xl p-6 md:p-7 ${
      highlight
        ? "bg-[hsl(240_25%_12%)] border border-primary/30"
        : "bg-[hsl(240_25%_11%)] border border-white/8"
    } ${className}`}
  >
    {children}
  </div>
);

export const ProblemCard = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) => (
  <LightCard>
    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-lg font-bold mb-2 leading-tight">{title}</h3>
    <p className="text-[15px] text-[hsl(240_10%_45%)] leading-relaxed">{desc}</p>
  </LightCard>
);

/* ---------- Browser frame for screenshots ----------------------------- */

export const BrowserFrame = ({
  src,
  alt,
  url,
  height = 360,
}: {
  src: string;
  alt: string;
  url?: string;
  height?: number;
}) => (
  <figure className="overflow-hidden rounded-2xl border border-[hsl(240_10%_90%)] bg-white shadow-[0_8px_32px_-12px_hsl(240_20%_20%/0.18)]">
    <div className="flex items-center gap-2 px-3 py-2 bg-[hsl(240_10%_97%)] border-b border-[hsl(240_10%_92%)]">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(0_70%_70%)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(40_85%_70%)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(140_45%_65%)]" />
      </div>
      {url && (
        <span className="ml-2 text-[11px] font-mono text-[hsl(240_10%_55%)] truncate">
          {url}
        </span>
      )}
    </div>
    <div className="bg-white overflow-hidden" style={{ maxHeight: height }}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
    </div>
  </figure>
);

/* ---------- Before / After block -------------------------------------- */

export const BeforeAfter = ({
  beforeSrc,
  beforeAlt,
  beforePoints,
  afterSrc,
  afterAlt,
  afterPoints,
  beforeUrl,
  afterUrl,
}: {
  beforeSrc: string;
  beforeAlt: string;
  beforePoints: string[];
  afterSrc: string;
  afterAlt: string;
  afterPoints: string[];
  beforeUrl?: string;
  afterUrl?: string;
}) => (
  <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
    <div>
      <Pill tone="muted">Before</Pill>
      <div className="mt-4">
        <BrowserFrame src={beforeSrc} alt={beforeAlt} url={beforeUrl} />
      </div>
      <ul className="mt-5 space-y-2">
        {beforePoints.map((p) => (
          <li
            key={p}
            className="text-[15px] text-[hsl(240_10%_45%)] flex items-start gap-2"
          >
            <span className="mt-2 w-1 h-1 rounded-full bg-[hsl(240_10%_60%)] flex-none" />
            {p}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <Pill tone="primary">After</Pill>
      <div className="mt-4">
        <BrowserFrame src={afterSrc} alt={afterAlt} url={afterUrl} />
      </div>
      <ul className="mt-5 space-y-2">
        {afterPoints.map((p) => (
          <li
            key={p}
            className="text-[15px] text-[hsl(240_15%_25%)] flex items-start gap-2"
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-none" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ---------- Pills ----------------------------------------------------- */

export const Pill = ({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "primary" | "dark";
}) => {
  const styles = {
    muted:
      "bg-[hsl(240_10%_94%)] text-[hsl(240_10%_45%)] border border-[hsl(240_10%_88%)]",
    primary: "bg-primary/10 text-primary border border-primary/20",
    dark: "bg-white/5 text-white/80 border border-white/10",
  } as const;
  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${styles[tone]}`}
    >
      {children}
    </span>
  );
};

/* ---------- Strategy shift (Old → New) -------------------------------- */

export const StrategyShift = ({
  oldLabel,
  newLabel,
  caption,
  tone = "dark",
}: {
  oldLabel: string;
  newLabel: string;
  caption?: string;
  tone?: "light" | "dark";
}) => {
  const oldBox =
    tone === "dark"
      ? "bg-white/[0.04] border border-white/10 text-white/85"
      : "bg-white border border-[hsl(240_10%_90%)] text-[hsl(240_15%_25%)]";
  const newBox =
    tone === "dark"
      ? "bg-primary/15 border border-primary/40 text-white"
      : "bg-primary/8 border border-primary/30 text-[hsl(240_20%_15%)]";
  const captionColor =
    tone === "dark" ? "text-white/60" : "text-[hsl(240_10%_45%)]";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
        <div className={`rounded-2xl p-7 text-center ${oldBox}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">
            Old
          </p>
          <p className="text-lg md:text-xl font-semibold leading-tight">{oldLabel}</p>
        </div>
        <div className="flex items-center justify-center">
          <ArrowRight className="w-6 h-6 text-primary md:rotate-0 rotate-90" />
        </div>
        <div className={`rounded-2xl p-7 text-center ${newBox}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
            New
          </p>
          <p className="text-lg md:text-xl font-semibold leading-tight">{newLabel}</p>
        </div>
      </div>
      {caption && (
        <p className={`text-center mt-8 text-sm md:text-base ${captionColor}`}>
          {caption}
        </p>
      )}
    </div>
  );
};

/* ---------- Horizontal flow ------------------------------------------- */

export const HorizontalFlow = ({
  steps,
  caption,
  tone = "light",
}: {
  steps: { icon: LucideIcon; label: string }[];
  caption?: string;
  tone?: "light" | "dark";
}) => {
  const captionColor =
    tone === "dark" ? "text-white/60" : "text-[hsl(240_10%_45%)]";
  const labelColor = tone === "dark" ? "text-white/90" : "text-[hsl(240_15%_25%)]";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3 md:gap-4">
            <div className="flex flex-col items-center text-center min-w-[72px]">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.4)] mb-2">
                <step.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className={`text-xs md:text-sm font-semibold ${labelColor}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 text-primary/70 -mt-5" />
            )}
          </div>
        ))}
      </div>
      {caption && (
        <p className={`text-center mt-10 text-sm md:text-base ${captionColor}`}>
          {caption}
        </p>
      )}
    </div>
  );
};

/* ---------- Outcome cards (dark) -------------------------------------- */

export const OutcomeCard = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc?: string;
}) => (
  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-7 hover:border-primary/30 transition-colors">
    <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-lg font-bold mb-2 leading-tight text-white">{title}</h3>
    {desc && <p className="text-[15px] text-white/65 leading-relaxed">{desc}</p>}
  </div>
);

/* ---------- CTA block ------------------------------------------------- */

export const FinalCTA = ({
  title,
  highlight,
  href,
  label = "Work with me",
}: {
  title: string;
  highlight?: string;
  href: string;
  label?: string;
}) => (
  <div className="text-center max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-[44px] font-bold tracking-tight leading-[1.1]">
      {title}{" "}
      {highlight && (
        <span className="text-primary text-[inherit] block md:inline">{highlight}</span>
      )}
    </h2>
    <div className="mt-9">
      <Button variant="hero" size="xl" asChild>
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {label} <ArrowRight className="w-5 h-5 ml-1" />
        </a>
      </Button>
    </div>
  </div>
);
