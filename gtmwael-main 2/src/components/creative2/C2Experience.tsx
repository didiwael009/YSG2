import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { CREATIVE2_COPY } from "@/content/creative2";

const INK = "#0e0e0e";
const CREAM = "#f4f3ee";
const LIME = "#c6f432";
const SERIF: CSSProperties = { fontFamily: "Newsreader, Georgia, serif", fontStyle: "italic", fontWeight: 500 };
const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6f432]";

/** Homepage ExperienceSection layout (sticky stacked cards), style A and creative work. */
const C2Experience = () => {
  const c = CREATIVE2_COPY.experience;
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-padding relative scroll-mt-24 font-body"
      style={{ background: INK, color: CREAM }}
    >
      <div className="container px-4">
        <div className="mx-auto mb-14 max-w-5xl md:mb-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: LIME }}>{c.eyebrow}</p>
          <h2 id="experience-title" className="tracking-[-0.03em]">
            <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ fontWeight: 800 }}>{c.titleLine1}</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl" style={SERIF}>{c.titleLine2}</span>
          </h2>
        </div>

        <ol className="mx-auto max-w-5xl" aria-label="Creative work">
          {c.items.map((exp, index) => (
            <li
              key={exp.company}
              className="stack-card mb-6 last:mb-0 md:mb-8"
              style={{ "--stack-top": `calc(5.5rem + ${index * 3.5}rem)` } as CSSProperties}
            >
              <article
                className="relative flex flex-col overflow-hidden rounded-3xl border border-black/10 px-6 pb-7 pt-5 shadow-[0_-16px_40px_-20px_#000b] md:min-h-[400px] md:px-12 md:pb-10"
                style={{ background: CREAM, color: INK }}
              >
                <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: LIME }} aria-hidden="true" />

                <div className="flex min-h-8 flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="text-2xl" style={{ fontWeight: 800 }}>{exp.company}</h3>
                  <p className="text-sm" style={{ color: "#333" }}>{exp.role}</p>
                </div>

                <div className="my-auto py-8 md:py-6">
                  <p className="leading-[0.9] tracking-tight text-[clamp(3rem,12vw,8rem)]" style={{ fontWeight: 800 }}>
                    {exp.metric}
                  </p>
                  <p className="mt-3 text-xl md:text-3xl" style={SERIF}>{exp.metricLabel}</p>
                </div>

                <div className="flex flex-col gap-5 border-t border-black/15 pt-6 md:flex-row md:items-end md:justify-between">
                  <p className="max-w-[46ch] text-base leading-relaxed" style={{ color: "#333" }}>{exp.sentence}</p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {exp.proofs.map((proof) => (
                      <a
                        key={proof.url}
                        href={proof.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white hover:opacity-85 ${focusStyle}`}
                        style={{ background: INK }}
                      >
                        {proof.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default C2Experience;
