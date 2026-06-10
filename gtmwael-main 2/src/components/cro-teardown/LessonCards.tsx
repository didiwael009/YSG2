import type { LessonCard } from "@/lib/cro-teardown";

const LessonCards = ({ lessons, companyName }: { lessons: LessonCard[]; companyName: string }) => (
  <section id="lessons" className="scroll-mt-28">
    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
      What SaaS teams can study
    </span>
    <h3 className="mb-2 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
      Patterns worth borrowing
    </h3>
    <p className="mb-8 text-[15px] leading-[1.6] text-[#5b5468]">
      These are observations and inferences — not confirmed strategy from {companyName}.
    </p>

    <div className="border-t border-[#11111f]/10">
      {lessons.map((lesson, index) => (
        <div
          key={lesson.title}
          className="grid grid-cols-[52px_1fr] gap-5 border-b border-[#11111f]/10 py-7"
        >
          <div className="text-[13px] font-black tracking-[0.06em] text-primary">
            {String(index + 1).padStart(2, "0")}
          </div>
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
      ))}
    </div>
  </section>
);

export default LessonCards;
