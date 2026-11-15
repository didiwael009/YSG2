import { ExternalLink } from "lucide-react";
import { CREATIVE2_COPY } from "@/content/creative2";
import { CREAM, HEAVY, INK, SERIF } from "./style";

const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e0e0e]";

/** Homepage TestimonialSection position (id="proof"), style A: both quotes shown side by side. */
const C2Testimonials = () => {
  const c = CREATIVE2_COPY.testimonials;
  return (
    <section
      id="proof"
      aria-labelledby="c2-proof-title"
      className="relative py-16 font-body md:py-24"
      style={{ background: CREAM, color: INK }}
    >
      <div className="container px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest">{c.eyebrow}</p>
            <h2 id="c2-proof-title" className="leading-[0.95] tracking-[-0.03em]">
              <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>{c.titleLine1}</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl" style={SERIF}>{c.titleLine2}</span>
            </h2>
          </div>

          <ul className="grid gap-6 md:grid-cols-2">
            {c.items.map((t) => (
              <li key={t.name}>
                <figure className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 md:p-8">
                  <span className="text-6xl leading-none" style={SERIF} aria-hidden="true">"</span>
                  <blockquote className="mt-2 flex-1">
                    <p className="text-base leading-relaxed" style={{ color: "#333" }}>{t.quote}</p>
                    <p className="mt-4 text-lg leading-snug" style={SERIF}>{t.highlight}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-black/10 pt-5">
                    <span>
                      <span className="block text-base" style={HEAVY}>{t.name}</span>
                      <span className="block text-sm" style={{ color: "#333" }}>{t.role}</span>
                    </span>
                    <a
                      href={t.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold underline underline-offset-4 ${focusStyle}`}
                    >
                      {t.linkLabel}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default C2Testimonials;
