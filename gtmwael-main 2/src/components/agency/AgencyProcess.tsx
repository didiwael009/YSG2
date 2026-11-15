import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AGENCY_PROCESS as P } from "@/content/agency";
import { CREAM, HEAVY, INK, LIME, SERIF, SectionHeading } from "./style";

/** Ink section: the three steps, then the closing call to action. */
const AgencyProcess = () => (
  <section id="how" aria-labelledby="how-title" className="px-5 py-20 sm:px-10 md:py-24" style={{ background: INK, color: CREAM }}>
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-14">
        <SectionHeading eyebrow={P.eyebrow} line1={P.line1} line2={P.line2} id="how-title" tone="dark" />
      </div>
      <ol className="m-0 grid list-none gap-6 p-0 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {P.steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-[30px]">
            <span className="text-5xl leading-none" style={{ ...HEAVY, color: LIME }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-2xl" style={HEAVY}>{step.title}</h3>
            <p className="mt-3 text-white/75">{step.body}</p>
          </li>
        ))}
      </ol>
      <div id="book" className="mt-[72px] flex flex-col items-center text-center">
        <p className="mb-6 text-[clamp(2.125rem,4vw,3.25rem)] leading-[1.05]" style={SERIF}>{P.ctaLine}</p>
        <Link
          to="/book"
          className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-[30px] text-[17px] font-bold no-underline"
          style={{ background: LIME, color: INK }}
        >
          {P.ctaLabel}
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
        <p className="mt-3 text-sm italic text-white/60">{P.ctaNote}</p>
      </div>
    </div>
  </section>
);

export default AgencyProcess;
