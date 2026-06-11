import type { CroTeardownPost } from "@/lib/cro-teardown";

const BusinessContextBlock = ({ post }: { post: CroTeardownPost }) => {
  if (!post.businessContext) return null;

  // Strip the leading "## Why the homepage changed" heading if present —
  // we render it ourselves as an eyebrow + H2 pair.
  const prose = post.businessContext
    .replace(/^##\s+Why the homepage changed\n+/i, '')
    .trim();

  const paragraphs = prose
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="business-context" className="scroll-mt-28 space-y-5">
      <div>
        <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
          Why it changed
        </span>
        <h2 className="mb-6 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
          The business context behind the redesign
        </h2>
      </div>

      <div className="rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-6 space-y-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[15px] leading-[1.65] text-[#3f394b]"
            dangerouslySetInnerHTML={{
              __html: p
                // Bold markdown **"quotes"** → <strong>
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default BusinessContextBlock;
