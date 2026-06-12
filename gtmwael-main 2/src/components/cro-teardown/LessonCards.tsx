import type { LessonCard } from "@/lib/cro-teardown";

const LessonCards = ({ lessons, companyName }: { lessons: LessonCard[]; companyName: string }) => (
  <section id="lessons" className="scroll-mt-28">
    {/* Hero header */}
    <div className="border-b border-[#11111f]/10 pb-8 mb-0">
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-primary">
        What SaaS teams can study
      </p>
      <h2 className="mb-4 font-display text-[40px] font-black leading-[0.96] tracking-[-0.04em] text-[#11101a] md:text-[56px]">
        Patterns worth borrowing
      </h2>
      <p className="mb-5 max-w-[780px] text-[18px] leading-[1.45] tracking-[-0.01em] text-[#686173]">
        These are observations and inferences from {companyName}'s homepage evolution — not confirmed company strategy.
      </p>
      <div className="max-w-[800px] border-l-4 border-primary bg-[#fff4ef] px-5 py-4 text-[15px] leading-[1.55] text-[#44404f]">
        <strong className="font-black text-[#11111f]">Better way to read this:</strong> do not judge the homepage as a design object. Look at what changed in buyer, funnel, positioning, and category narrative.
      </div>
    </div>

    {/* Pattern cards */}
    <div>
      {lessons.map((lesson, index) => {
        const num = lesson.number ?? String(index + 1).padStart(2, "0");
        const hasRich = !!(lesson.h2 && lesson.signals?.length);

        return hasRich ? (
          <RichCard key={lesson.title} lesson={lesson} num={num} />
        ) : (
          <SimpleCard key={lesson.title} lesson={lesson} num={num} />
        );
      })}
    </div>
  </section>
);

/* ── Rich card (mockup layout) ─────────────────────────────────────────────── */
const RichCard = ({ lesson, num }: { lesson: LessonCard; num: string }) => (
  <article className="grid grid-cols-1 gap-4 border-b border-[#11111f]/10 py-10 md:grid-cols-[72px_1fr] md:gap-8 md:py-14">
    {/* Index column — on mobile: flex row (num + tag inline); on desktop: stacked */}
    <aside className="flex items-center gap-3 md:block md:pt-1">
      <div className="font-display text-[26px] font-black leading-none tracking-[-0.04em] text-primary md:text-[28px]">
        {num}
      </div>
      <span className="inline-flex items-center rounded-full border border-primary/25 bg-[#fff4ef] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#d93c16] md:mt-3">
        {lesson.tag}
      </span>
    </aside>

    {/* Content column */}
    <div>
      <h3 className="m-0 font-display text-[26px] font-black leading-[1.08] tracking-[-0.05em] text-[#11101a] md:text-[38px]">
        {lesson.h2}
      </h3>

      {/* Before / after quote row */}
      {lesson.before && lesson.after && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 max-w-[900px]">
          <div className="rounded-[16px] border border-[#e7e2dc] bg-white p-4">
            {lesson.beforeLabel && (
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a8493]">
                {lesson.beforeLabel}
              </p>
            )}
            <p className="m-0 font-display text-[19px] font-black leading-[1.18] tracking-[-0.04em] text-[#11101a] md:text-[22px]">
              "{lesson.before}"
            </p>
          </div>
          <div className="rounded-[16px] border border-primary/30 bg-[#fff4ef] p-4">
            {lesson.afterLabel && (
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a8493]">
                {lesson.afterLabel}
              </p>
            )}
            <p className="m-0 font-display text-[19px] font-black leading-[1.18] tracking-[-0.04em] text-[#11101a] md:text-[22px]">
              "{lesson.after}"
            </p>
          </div>
        </div>
      )}

      {/* Body grid: copy + signals sidebar */}
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_240px]">
        <div>
          <p className="m-0 max-w-[760px] text-[16px] leading-[1.75] tracking-[-0.01em] text-[#44404f] md:text-[18px]">
            {lesson.body}
          </p>
          {lesson.takeaway && (
            <div className="mt-5 border-l-4 border-primary py-0.5 pl-4">
              <p className="m-0 text-[16px] font-[760] leading-[1.55] tracking-[-0.01em] text-[#11101a]">
                {lesson.takeaway}
              </p>
            </div>
          )}
        </div>

        {lesson.signals && lesson.signals.length > 0 && (
          <aside className="border-t-2 border-primary pt-4 lg:border-t-2 lg:border-l-0">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#d93c16]">
              What changed
            </p>
            <ul className="m-0 grid gap-2.5 p-0 list-none">
              {lesson.signals.map((s) => (
                <li
                  key={s}
                  className="relative pl-4 text-[14px] leading-[1.45] text-[#44404f] before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary before:content-['']"
                >
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  </article>
);

/* ── Simple card (legacy fallback) ─────────────────────────────────────────── */
const SimpleCard = ({ lesson, num }: { lesson: LessonCard; num: string }) => (
  <div className="grid grid-cols-[52px_1fr] gap-5 border-b border-[#11111f]/10 py-7">
    <div className="text-[13px] font-black tracking-[0.06em] text-primary">{num}</div>
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="m-0 font-display text-[20px] font-bold leading-tight text-[#11101a] md:text-[22px]">
          {lesson.title}
        </h3>
        <span className="rounded-full border border-[#e2d9ff] bg-[#f3efff] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.06em] text-[#6b52c4]">
          {lesson.tag}
        </span>
      </div>
      <p className="mb-0 max-w-[680px] text-[15.5px] leading-[1.7] text-[#4d4658]">
        {lesson.body}
      </p>
    </div>
  </div>
);

export default LessonCards;
