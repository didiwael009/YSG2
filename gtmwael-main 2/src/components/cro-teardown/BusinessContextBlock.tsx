import type { CroTeardownPost } from "@/lib/cro-teardown";

const GENERIC_HEADINGS = [
  'why the homepage changed',
  'the business context behind the redesign',
];

const BusinessContextBlock = ({ post }: { post: CroTeardownPost }) => {
  if (!post.businessContext) return null;

  const raw = post.businessContext.trim();

  // Extract the leading ## heading if present
  const h2Match = raw.match(/^##\s+(.+)/);
  const extractedH2 = h2Match ? h2Match[1].trim() : null;

  // Use extracted H2 unless it's one of the generic fallback phrases
  const isGeneric = !extractedH2 || GENERIC_HEADINGS.includes(extractedH2.toLowerCase());
  const displayH2 = isGeneric
    ? `The business context behind ${post.companyName}'s redesign`
    : extractedH2;

  // Strip the leading ## heading line before splitting into blocks
  const prose = raw.replace(/^##\s+.+\n+/, '').trim();

  const blocks = prose
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  // Only internal paths (leading "/") are linkable — this output goes through
  // dangerouslySetInnerHTML, so external and javascript: URLs are not accepted.
  const renderHtml = (text: string) =>
    text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(
        /\[([^\]]+)\]\((\/[A-Za-z0-9\-/]*)\)/g,
        '<a href="$2" class="font-medium text-primary underline underline-offset-2 hover:no-underline">$1</a>',
      );

  return (
    <section id="business-context" className="scroll-mt-28">
      {/* Section header */}
      <div className="mb-10 border-b border-[#11111f]/10 pb-8">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.16em] text-primary">
          Why it changed
        </p>
        <h2 className="font-display text-[32px] font-black leading-[1.0] tracking-[-0.04em] text-[#11101a] md:text-[46px]">
          {displayH2}
        </h2>
      </div>

      {/* Body blocks */}
      <div className="space-y-7">
        {blocks.map((block, i) => {
          // ### subheading
          if (block.startsWith('### ')) {
            return (
              <h3
                key={i}
                className="font-display text-[20px] font-black leading-tight tracking-[-0.03em] text-[#11101a] md:text-[24px]"
              >
                {block.replace(/^###\s+/, '')}
              </h3>
            );
          }
          // Pull-quote: starts with > or is entirely **bold**
          if (block.startsWith('>') || /^\*\*[^*]+\*\*$/.test(block)) {
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary py-1 pl-5 font-display text-[22px] font-black leading-[1.2] tracking-[-0.03em] text-[#11101a] md:text-[26px]"
                dangerouslySetInnerHTML={{ __html: renderHtml(block.replace(/^>\s*/, '')) }}
              />
            );
          }
          // Regular paragraph
          return (
            <p
              key={i}
              className="max-w-[800px] text-[17px] leading-[1.75] tracking-[-0.01em] text-[#3f394b] md:text-[19px]"
              dangerouslySetInnerHTML={{ __html: renderHtml(block) }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BusinessContextBlock;
