import type { MessagingChange } from "@/lib/cro-teardown";

const MessagingEvolution = ({
  changes,
  fromLabel,
  toLabel,
}: {
  changes: MessagingChange[];
  fromLabel: string;
  toLabel: string;
}) => (
  <section id="messaging" className="scroll-mt-28">
    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
      Messaging evolution
    </span>
    <h3 className="mb-2 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
      How the language changed
    </h3>
    <p className="mb-7 text-[15px] leading-[1.6] text-[#5b5468]">
      Verbatim text extracted from page snapshots. No paraphrasing.
    </p>

    <div className="space-y-5">
      {changes.map((change) => (
        <div
          key={change.element}
          className="overflow-hidden rounded-[20px] border border-[#11111f]/10"
        >
          <div className="border-b border-[#11111f]/10 bg-[#fafafe] px-5 py-3">
            <span className="text-[12px] font-black uppercase tracking-[0.07em] text-[#555063]">
              {change.element}
            </span>
          </div>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-[#11111f]/08 bg-[#fff8f7] p-5 md:border-b-0 md:border-r">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#c0826a]">
                {fromLabel}
              </div>
              <p className="mb-0 text-[15px] leading-[1.6] text-[#3f394b] italic">
                "{change.before}"
              </p>
            </div>
            <div className="bg-[#f6fbf7] p-5">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#5a9068]">
                {toLabel}
              </div>
              <p className="mb-0 text-[15px] leading-[1.6] text-[#3f394b] italic">
                "{change.after}"
              </p>
            </div>
          </div>

          {change.note && (
            <div className="border-t border-[#11111f]/08 bg-[#fafafe] px-5 py-3.5">
              <p className="mb-0 text-[13px] leading-[1.55] text-[#6b6375]">
                <span className="font-bold text-[#514b5d]">Reading: </span>
                {change.note}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>

    <p className="mt-4 border-l-[3px] border-primary pl-4 text-[13px] leading-[1.6] text-[#7a7285]">
      These are observations based on text extracted from archived pages. They are not confirmed internal strategy.
    </p>
  </section>
);

export default MessagingEvolution;
