import type { CroTeardownPost } from "@/lib/cro-teardown";

/**
 * QuickAnswerBlock — the ≤75-word featured-snippet TL;DR.
 *
 * Rendered near the top of the teardown as a visible answer box. Mirrors the
 * JSON-LD FAQ answer so Google can pull the on-page text as a featured snippet
 * (position zero) in addition to the structured-data rich result.
 */
const QuickAnswerBlock = ({ post }: { post: CroTeardownPost }) => {
  if (!post.quickAnswer) return null;

  // The section file is a single paragraph; strip any stray leading "## Quick answer".
  const prose = post.quickAnswer
    .trim()
    .replace(/^##\s+.*\n+/, "")
    .trim();

  if (!prose) return null;

  const renderHtml = (text: string) =>
    text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return (
    <section
      id="quick-answer"
      aria-label="Quick answer"
      className="scroll-mt-28 rounded-[22px] border border-[#ffd9c4] bg-[#fff5ef] px-7 py-6"
    >
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-primary">
        Quick answer
      </p>
      <p
        className="m-0 max-w-[760px] text-[17px] font-semibold leading-[1.65] tracking-[-0.01em] text-[#322843] md:text-[18.5px]"
        dangerouslySetInnerHTML={{ __html: renderHtml(prose) }}
      />
    </section>
  );
};

export default QuickAnswerBlock;
