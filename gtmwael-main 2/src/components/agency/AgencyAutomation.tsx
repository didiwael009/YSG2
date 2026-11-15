import sambalingoPhone from "@/assets/sambalingo-phone.webp";
import { AGENCY_AUTOMATION as A } from "@/content/agency";
import { HEAVY, INK, LIME, SERIF } from "./style";

/** Cream section: the automation proof (134 posts) beside the SambaLingo phone. */
const AgencyAutomation = () => (
  <section aria-labelledby="auto-title" className="px-5 py-20 sm:px-10 md:py-24">
    <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-12">
      <div className="min-w-0 flex-[1_1_460px]">
        <span className="inline-block px-3.5 py-2 text-xs font-bold uppercase" style={{ background: LIME, color: INK }}>
          {A.badge}
        </span>
        <h2 id="auto-title" className="mt-6 leading-[0.95] tracking-[-0.03em]">
          <span className="block text-[clamp(2.75rem,5.5vw,4.5rem)]" style={HEAVY}>{A.line1}</span>
          <span className="block text-[clamp(3.125rem,6.5vw,5.5rem)]" style={SERIF}>{A.line2}</span>
        </h2>
        <p className="mt-7 max-w-[48ch] text-lg" style={{ color: "#333" }}>{A.body}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {A.stats.map((s) => (
            <div key={s.label} className="border-l-4 bg-[#fbfaf7] px-[18px] py-3.5" style={{ borderColor: INK }}>
              <span className="text-[32px]" style={HEAVY}>{s.value}</span> <span className="text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-[1_1_300px] justify-center">
        <img
          src={sambalingoPhone}
          alt="SambaLingo feed on a phone"
          width={400}
          height={543}
          loading="lazy"
          className="h-auto w-full max-w-[320px]"
        />
      </div>
    </div>
  </section>
);

export default AgencyAutomation;
