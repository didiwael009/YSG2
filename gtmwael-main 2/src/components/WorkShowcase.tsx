import { ArrowUpRight, ExternalLink } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { ADS_URL, adSamples } from "@/lib/creative-samples";
import { brandsSpaced } from "@/lib/rebrand-data";

type Tone = "light" | "dark";

const TONES = {
  light: { label: "text-[#4d4658]", link: "text-[#11101a]", border: "border-[#11111f]/10", title: "text-[#11101a]" },
  dark: { label: "text-muted-foreground", link: "text-foreground", border: "border-border/50", title: "text-foreground" },
} as const;

/** The SaaS ads from the Behance gallery, in a horizontal row at their own aspect ratio. */
export const AdsRow = ({ tone, id, showLabel = true }: { tone: Tone; id: string; showLabel?: boolean }) => {
  const t = TONES[tone];
  return (
    <div role="group" aria-labelledby={id}>
      <div className={`mb-5 flex flex-wrap items-baseline gap-3 ${showLabel ? "justify-between" : "justify-end"}`}>
        {showLabel && <h3 id={id} className={`text-xs font-bold uppercase tracking-[0.2em] ${t.label}`}>SaaS ads</h3>}
        <a
          href={ADS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-sm underline-offset-4 hover:text-primary hover:underline ${t.link}`}
        >
          See more on Behance
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scroll-px-6 scrollbar-hide">
        {adSamples.map((s) => (
          <li key={s.src} className="flex-shrink-0 snap-start">
            <img
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              loading="lazy"
              decoding="async"
              className={`h-[240px] w-auto rounded-xl border sm:h-[300px] ${t.border}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

/** The 5 landing pages, look-alike colours kept apart. */
export const LandingPagesGrid = ({ tone, id }: { tone: Tone; id: string }) => {
  const t = TONES[tone];
  return (
    <div role="group" aria-labelledby={id}>
      <h3 id={id} className={`mb-5 text-xs font-bold uppercase tracking-[0.2em] ${t.label}`}>Rebranding & Landing Pages</h3>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {brandsSpaced.map((p) => (
          <li key={p.title}>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block">
              <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl border transition-all duration-300 group-hover:border-primary/50 ${t.border}`}>
                <ResponsiveImage
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <span className="mb-1.5 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">{p.role}</span>
                    <h4 className="font-display text-xl font-bold text-white">{p.title}</h4>
                  </div>
                  <ExternalLink className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
