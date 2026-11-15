import type { CSSProperties } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";
import { CREATIVE2_COPY } from "@/content/creative2";

const INK = "#0e0e0e";
const CREAM = "#f4f3ee";
const LIME = "#c6f432";
const SERIF: CSSProperties = { fontFamily: "Newsreader, Georgia, serif", fontStyle: "italic", fontWeight: 500 };
const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e0e0e]";

/** Homepage ServicesSection layout (header row, two-column grid, closing CTA row), style A, the 4 creative services. */
const C2Services = () => {
  const h = CREATIVE2_COPY.servicesHeading;
  const cta = CREATIVE2_COPY.finalCta;
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-padding relative scroll-mt-24 font-body"
      style={{ background: CREAM, color: INK }}
    >
      <div className="container relative px-4">
        <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest">{h.eyebrow}</p>
            <h2 id="services-title" className="leading-[0.95] tracking-[-0.03em]">
              <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight: 800 }}>{h.titleLine1}</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl" style={SERIF}>{h.titleLine2}</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed" style={{ color: "#333" }}>{h.intro}</p>
        </div>

        <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-10">
          {CREATIVE2_COPY.services.map((s, i) => (
            <li key={s.title}>
              <article
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/60 px-6 pb-6 pt-7 md:px-8"
                aria-labelledby={`c2-service-${i}`}
              >
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: INK }} aria-hidden="true" />
                <span className="text-sm font-bold tracking-widest" style={{ color: "#333" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 id={`c2-service-${i}`} className="mt-3 text-3xl tracking-tight md:text-4xl" style={{ fontWeight: 800 }}>
                  {s.title}
                </h3>
                <p className="mt-3 text-lg leading-snug" style={{ color: "#333" }}>{s.line}</p>
                {s.hasSamples && (
                  <a
                    href="#creative-workflow"
                    className={`mt-auto inline-flex items-center gap-2 self-start rounded-full pt-6 text-sm font-semibold underline-offset-4 hover:underline ${focusStyle}`}
                  >
                    {CREATIVE2_COPY.hero.secondaryCta}
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg" style={SERIF}>{cta.line}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold hover:brightness-95 ${focusStyle}`}
            style={{ background: LIME, color: INK }}
          >
            {cta.button}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default C2Services;
