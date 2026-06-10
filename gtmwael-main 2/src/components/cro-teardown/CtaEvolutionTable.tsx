const Pill = ({
  text,
  variant,
}: {
  text: string;
  variant: "added" | "removed";
}) => (
  <span
    className={`inline-block rounded-full px-3 py-1 text-[12.5px] font-semibold leading-none ${
      variant === "added"
        ? "bg-[#edf7f0] text-[#2e6b44]"
        : "bg-[#fdf0ee] text-[#9b3b2a]"
    }`}
  >
    {text}
  </span>
);

const CtaEvolutionTable = ({
  ctaAdded,
  ctaRemoved,
  h2Added,
  h2Removed,
}: {
  ctaAdded: string[];
  ctaRemoved: string[];
  h2Added: string[];
  h2Removed: string[];
}) => (
  <section id="cta-evolution" className="scroll-mt-28 space-y-10">
    <div>
      <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
        CTA / button evolution
      </span>
      <h3 className="mb-6 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
        What appeared and what disappeared
      </h3>

      <div className="overflow-hidden rounded-[20px] border border-[#11111f]/10">
        <div className="grid md:grid-cols-2">
          <div className="border-b border-[#11111f]/08 p-5 md:border-b-0 md:border-r">
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#2e6b44]">
              Added
            </div>
            <div className="flex flex-wrap gap-2">
              {ctaAdded.map((cta) => (
                <Pill key={cta} text={cta} variant="added" />
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#9b3b2a]">
              Removed
            </div>
            <div className="flex flex-wrap gap-2">
              {ctaRemoved.map((cta) => (
                <Pill key={cta} text={cta} variant="removed" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="headings" className="scroll-mt-28">
      <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
        Section heading changes
      </span>
      <h3 className="mb-6 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
        How the content architecture shifted
      </h3>

      <div className="overflow-hidden rounded-[20px] border border-[#11111f]/10">
        <div className="grid md:grid-cols-2">
          <div className="border-b border-[#11111f]/08 p-5 md:border-b-0 md:border-r">
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#2e6b44]">
              Added ({h2Added.length})
            </div>
            <ul className="m-0 list-none space-y-2 p-0">
              {h2Added.map((h2) => (
                <li key={h2} className="flex items-start gap-2">
                  <span className="mt-1 flex-none text-[10px] font-black text-[#2e6b44]">+</span>
                  <span className="text-[14px] leading-[1.5] text-[#3f394b]">{h2}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#9b3b2a]">
              Removed ({h2Removed.length})
            </div>
            <ul className="m-0 list-none space-y-2 p-0">
              {h2Removed.map((h2) => (
                <li key={h2} className="flex items-start gap-2">
                  <span className="mt-1 flex-none text-[10px] font-black text-[#9b3b2a]">−</span>
                  <span className="text-[14px] leading-[1.5] text-[#3f394b]">{h2}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CtaEvolutionTable;
