import type { SummaryCard } from "@/lib/cro-teardown";

const SummaryCards = ({ cards }: { cards: SummaryCard[] }) => (
  <section id="summary" className="scroll-mt-28">
    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
      At a glance
    </span>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-[20px] border border-[#11111f]/10 bg-[#fafafe] p-5"
        >
          <div className="mb-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#9990a8]">
            {card.label}
          </div>
          <div className="font-display text-[22px] font-bold leading-tight text-[#11101a]">
            {card.value}
          </div>
          {card.note && (
            <p className="mb-0 mt-1.5 text-[13px] leading-[1.5] text-[#6b6375]">{card.note}</p>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default SummaryCards;
