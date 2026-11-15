import { ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";
import { CREATIVE2_COPY } from "@/content/creative2";
import { CREAM, HEAVY, INK, LIME, SERIF } from "./style";

/** Homepage GTMSystemSection position (id="how-it-works"), style A: 3 steps, then the booking link. */
const C2Process = () => {
  const c = CREATIVE2_COPY.process;
  const cta = CREATIVE2_COPY.finalCta;
  return (
    <section
      id="how-it-works"
      aria-labelledby="c2-process-title"
      className="section-padding relative overflow-hidden font-body"
      style={{ background: INK, color: CREAM }}
    >
      <div className="container relative z-10 px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: LIME }}>{c.eyebrow}</p>
          <h2 id="c2-process-title" className="mb-8 leading-[0.95] tracking-[-0.03em]">
            <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>{c.titleLine1}</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl" style={SERIF}>{c.titleLine2}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{c.intro}</p>
        </div>

        <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {c.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <span className="text-5xl leading-none" style={{ ...HEAVY, color: LIME }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-2xl leading-tight" style={HEAVY}>{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/75">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-center md:mt-20">
          <p className="mb-6 max-w-md text-center text-xl" style={SERIF}>{cta.line}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-base font-bold hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6f432]"
            style={{ background: LIME, color: INK }}
          >
            {cta.button}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <p className="mt-3 text-sm italic text-white/60">{cta.note}</p>
        </div>
      </div>
    </section>
  );
};

export default C2Process;
