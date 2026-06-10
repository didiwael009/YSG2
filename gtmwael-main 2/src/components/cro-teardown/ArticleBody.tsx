/**
 * ArticleBody.tsx — Phase 4J redesign
 *
 * Renders post.articleBody (pipeline-generated markdown) as editorial-styled sections.
 * Design language matches BlogPostLayout:
 *   - orange eyebrow labels
 *   - light tinted summary card (At a Glance)
 *   - warm insight card (Messaging Evolution)
 *   - dark numbered block (Lessons for SaaS Teams)
 *   - mid-analysis CTA card (after Messaging section)
 *   - founder takeaway card (before Lessons section)
 *
 * No external dependencies. Content is not modified — only styled.
 * Cautious language ("can be read as", "may suggest", "not confirmed") is preserved as-is.
 *
 * Uses dangerouslySetInnerHTML — safe because all content is pipeline-generated,
 * not user-supplied.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Inline HTML helpers ───────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*([^*<>]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*<>]+)\*/g, "<em>$1</em>");
}

// ─── Block-level HTML renderer ─────────────────────────────────────────────────

function blockHtml(block: string): string {
  const t = block.trim();
  if (!t || t === "---") return "";
  if (t.startsWith("#")) return ""; // H1 / H2 handled by section structure
  if (t.startsWith("### ")) {
    return `<h3 class="mt-7 mb-2 font-display text-[19px] font-bold leading-[1.2] text-[#11101a]">${inlineMarkdown(t.slice(4).trim())}</h3>`;
  }
  if (t.startsWith("> ")) {
    return `<blockquote class="my-6 rounded-r-[20px] border-l-[4px] border-primary bg-[#fff5ef] px-6 py-4 text-[16px] font-semibold leading-[1.6] text-[#3d2a1a] italic">${inlineMarkdown(t.slice(2).trim())}</blockquote>`;
  }
  if (t.split("\n").every((l) => l.startsWith("- "))) {
    const items = t
      .split("\n")
      .filter((l) => l.startsWith("- "))
      .map((l) => `<li class="mb-2 leading-[1.75]">${inlineMarkdown(l.slice(2))}</li>`)
      .join("");
    return `<ul class="my-5 ml-5 list-disc space-y-0.5 text-[16px] text-[#3a3548]">${items}</ul>`;
  }
  return `<p class="mb-5 text-[16.5px] leading-[1.75] text-[#3a3548]">${inlineMarkdown(t)}</p>`;
}

/** Render a chunk of markdown to an HTML string (safe — pipeline content only). */
function renderHtml(md: string): string {
  return md
    .split(/\n\n+/)
    .map(blockHtml)
    .filter(Boolean)
    .join("\n");
}

// ─── Markdown section parser ───────────────────────────────────────────────────

interface MdSection {
  heading: string;   // "" for content before the first H2
  content: string;
}

function stripFrontmatter(md: string): string {
  return md.replace(/^---[\s\S]*?---\s*\n/, "");
}

function parseSections(markdown: string): MdSection[] {
  const body = stripFrontmatter(markdown);
  const lines = body.split("\n");
  const sections: MdSection[] = [];
  let currentHeading = "";
  let buf: string[] = [];

  const flush = () => {
    const content = buf.join("\n").trim();
    if (content || currentHeading) sections.push({ heading: currentHeading, content });
    buf = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentHeading = line.slice(3).trim();
    } else {
      buf.push(line);
    }
  }
  flush();
  return sections;
}

// ─── Heading classifiers ───────────────────────────────────────────────────────

const isSectionId = (h: string) => /^\d{2}-/.test(h);
const isAtAGlance = (h: string) => /glance|summary/i.test(h);
const isTimeline  = (h: string) => /timeline|visual timeline/i.test(h);
const isMessaging = (h: string) => /messaging|message/i.test(h) && !/cta|navigation/i.test(h);
const isCtaNav    = (h: string) => /cta|navigation/i.test(h);
const isLessons   = (h: string) => /lesson|takeaway/i.test(h);

// ─── Section label ─────────────────────────────────────────────────────────────

const SectionLabel = ({ children, light = false }: { children: string; light?: boolean }) => (
  <span
    className={`mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] ${
      light ? "text-[#ff9b6d]" : "text-primary"
    }`}
  >
    {children}
  </span>
);

// ─── Section: intro prose (section-id sections, no heading shown) ─────────────

const IntroSection = ({ content }: { content: string }) => (
  <div
    className="mb-10 max-w-[700px]"
    dangerouslySetInnerHTML={{ __html: renderHtml(content) }}
  />
);

// ─── Section: At a Glance — light purple summary card ─────────────────────────

const AtAGlanceSection = ({ content }: { content: string }) => {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const leadPara = blocks.find((b) => !b.startsWith("- "));
  const bullets = blocks
    .filter((b) => b.startsWith("- ") || b.split("\n").some((l) => l.startsWith("- ")))
    .flatMap((b) =>
      b
        .split("\n")
        .filter((l) => l.startsWith("- "))
        .map((l) => l.slice(2).trim())
    );
  const trailParas = blocks.filter((b) => !b.startsWith("- ") && b !== leadPara);

  return (
    <section className="scroll-mt-28 rounded-[22px] border border-[#e2d9ff] bg-[#f3efff] px-7 py-6">
      <SectionLabel>At a glance</SectionLabel>
      {leadPara && (
        <p
          className="mb-5 text-[17px] font-semibold leading-[1.55] text-[#211b31]"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(leadPara) }}
        />
      )}
      {bullets.length > 0 && (
        <div className="mb-5 border-t border-[#d8d0f5]">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-[#d8d0f5] py-3">
              <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <p
                className="m-0 text-[15.5px] leading-[1.72] text-[#322843]"
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(bullet) }}
              />
            </div>
          ))}
        </div>
      )}
      {trailParas.map((p, i) => (
        <p
          key={i}
          className="mb-3 text-[15px] leading-[1.7] text-[#4a3f62] last:mb-0"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(p) }}
        />
      ))}
    </section>
  );
};

// ─── Section: Visual Timeline — plain white with eyebrow label ────────────────

const TimelineSection = ({ heading, content }: { heading: string; content: string }) => (
  <section className="scroll-mt-28">
    <SectionLabel>Visual timeline</SectionLabel>
    <h2 className="mb-4 mt-0 font-display text-[26px] font-bold leading-[1.1] text-[#11101a] md:text-[32px]">
      {heading}
    </h2>
    <div
      className="max-w-[700px]"
      dangerouslySetInnerHTML={{ __html: renderHtml(content) }}
    />
  </section>
);

// ─── Section: Messaging Evolution — warm tinted card ─────────────────────────

const MessagingSection = ({ heading, content }: { heading: string; content: string }) => (
  <section className="scroll-mt-28 rounded-[22px] border border-[#ffd7c5] bg-[#fff5ef] px-7 py-6">
    <SectionLabel>Messaging analysis</SectionLabel>
    <h2 className="mb-4 mt-0 font-display text-[26px] font-bold leading-[1.1] text-[#3d1a06] md:text-[32px]">
      {heading}
    </h2>
    <div
      className="max-w-[700px] [&_p]:text-[#4d3520]"
      dangerouslySetInnerHTML={{ __html: renderHtml(content) }}
    />
  </section>
);

// ─── Section: CTA & Navigation — bordered white section ───────────────────────

const CtaNavSection = ({ heading, content }: { heading: string; content: string }) => (
  <section className="scroll-mt-28 border-y border-[#11111f]/10 py-8">
    <SectionLabel>CTA &amp; navigation</SectionLabel>
    <h2 className="mb-4 mt-0 font-display text-[26px] font-bold leading-[1.1] text-[#11101a] md:text-[32px]">
      {heading}
    </h2>
    <div
      className="max-w-[700px]"
      dangerouslySetInnerHTML={{ __html: renderHtml(content) }}
    />
  </section>
);

// ─── Section: Lessons — dark card with numbered rows ─────────────────────────

const LessonsSection = ({ heading, content }: { heading: string; content: string }) => {
  const lessons = content
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter((b) => b && !b.startsWith("#") && !b.startsWith("---") && !b.startsWith("*"));

  return (
    <section className="scroll-mt-28 rounded-[26px] bg-[linear-gradient(135deg,#171021,#0d0d1a)] p-7 text-white shadow-[0_24px_70px_rgba(7,7,17,0.18)] md:p-8">
      <SectionLabel light>Lessons</SectionLabel>
      <h2 className="mb-2 mt-0 font-display text-[26px] font-bold leading-[1.02] text-white md:text-[32px]">
        {heading}
      </h2>
      <p className="mb-8 text-[15px] leading-[1.6] text-[#b8b4c8]">
        Based on observable changes — not confirmed strategy or outcome data.
      </p>
      <div className="border-t border-white/15">
        {lessons.map((lesson, i) => (
          <div key={i} className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/15 py-5">
            <div className="text-[13px] font-black tracking-[0.08em] text-[#ff9b6d]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <p
              className="m-0 text-[16px] leading-[1.72] text-[#f2edf8]"
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(lesson) }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Generic fallback section (alternating styles) ────────────────────────────

const GenericSection = ({
  heading,
  content,
  variant,
}: {
  heading: string;
  content: string;
  variant: 0 | 1 | 2;
}) => {
  const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const wrapperClass =
    variant === 1
      ? "scroll-mt-28 rounded-[22px] border border-[#e8e4f2] bg-[#f9f7fe] px-7 py-6"
      : variant === 2
      ? "scroll-mt-28 border-y border-[#11111f]/10 py-8"
      : "scroll-mt-28 py-6";
  return (
    <section id={id} className={wrapperClass}>
      <h2 className="mb-4 mt-0 font-display text-[26px] font-bold leading-[1.1] text-[#11101a] md:text-[32px]">
        {heading}
      </h2>
      <div
        className="max-w-[700px]"
        dangerouslySetInnerHTML={{ __html: renderHtml(content) }}
      />
    </section>
  );
};

// ─── Mid-analysis CTA ──────────────────────────────────────────────────────────

const MidAnalysisCta = () => (
  <div className="grid gap-5 rounded-[24px] bg-[#11111f] px-6 py-7 text-white shadow-[0_24px_70px_rgba(7,7,17,0.18)] md:grid-cols-[1fr_auto] md:items-center">
    <div>
      <strong className="mb-2 block text-[18px] leading-[1.25]">
        Seeing the same problem on your SaaS homepage?
      </strong>
      <p className="mb-0 max-w-[520px] text-[15.5px] leading-[1.55] text-[#cfc9dc]">
        If your page explains the product but does not create trust, the problem is probably message
        hierarchy, proof, or CTA path friction.
      </p>
    </div>
    <Button variant="hero" size="sm" asChild>
      <Link to="/conversion-rate-optimisation-specialist/">
        Book a SaaS CRO diagnosis
        <ArrowRight className="ml-1 h-3.5 w-3.5" />
      </Link>
    </Button>
  </div>
);

// ─── Founder takeaway card ─────────────────────────────────────────────────────

const FounderTakeaway = () => (
  <section className="scroll-mt-28 rounded-[26px] border border-[#ffd7c5] bg-[#fff5ef] p-7">
    <SectionLabel>Founder takeaway</SectionLabel>
    <h2 className="mb-4 mt-0 font-display text-[28px] font-bold leading-[1.1] text-[#11101a] md:text-[34px]">
      Your homepage is a positioning system, not a brochure.
    </h2>
    <p className="mb-0 max-w-[640px] text-[16.5px] leading-[1.72] text-[#4d3f36]">
      Every headline, CTA, section heading, and navigation label tells visitors who the product is
      for and what they should believe before taking action.
    </p>
  </section>
);

// ─── Main component ────────────────────────────────────────────────────────────

interface ArticleBodyProps {
  markdown: string;
}

const ArticleBody = ({ markdown }: ArticleBodyProps) => {
  const sections = parseSections(markdown);

  // The "01-intro" section ID block renders as flowing prose (no heading shown)
  const introSection = sections.find((s) => isSectionId(s.heading));

  // All non-section-ID, non-empty H2 sections get styled card treatment
  const displaySections = sections.filter((s) => !isSectionId(s.heading) && s.heading !== "");

  // Build ordered element list with injected CTA and takeaway
  const elements: ReactNode[] = [];
  let midCtaInserted = false;
  let genericIdx = 0;

  displaySections.forEach((section, displayIdx) => {
    const h = section.heading;

    // Inject founder takeaway BEFORE the Lessons section
    if (isLessons(h)) {
      elements.push(<FounderTakeaway key="founder-takeaway" />);
    }

    // Render section with appropriate style
    if (isAtAGlance(h)) {
      elements.push(<AtAGlanceSection key={h} content={section.content} />);
    } else if (isTimeline(h)) {
      elements.push(<TimelineSection key={h} heading={h} content={section.content} />);
    } else if (isMessaging(h)) {
      elements.push(<MessagingSection key={h} heading={h} content={section.content} />);
    } else if (isCtaNav(h)) {
      elements.push(<CtaNavSection key={h} heading={h} content={section.content} />);
    } else if (isLessons(h)) {
      elements.push(<LessonsSection key={h} heading={h} content={section.content} />);
    } else {
      elements.push(
        <GenericSection
          key={h}
          heading={h}
          content={section.content}
          variant={(genericIdx % 3) as 0 | 1 | 2}
        />
      );
      genericIdx++;
    }

    // Inject mid-analysis CTA after Messaging Evolution (or after 3rd display section)
    if (!midCtaInserted && (isMessaging(h) || displayIdx === 2)) {
      elements.push(<MidAnalysisCta key="mid-cta" />);
      midCtaInserted = true;
    }
  });

  return (
    <section
      aria-label="Full CRO analysis"
      className="mt-2 scroll-mt-28 border-t border-[#e4e2ec] pt-10"
    >
      {/* ── Section header ── */}
      <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
        Full CRO analysis
      </span>
      <p className="mb-8 max-w-[660px] text-[16px] leading-[1.72] text-[#6b6475]">
        The visual teardown above shows what changed. This section explains what those changes may
        mean for SaaS positioning, trust, CTA structure, and conversion paths.
      </p>

      {/* ── Intro prose (01-intro section — heading suppressed) ── */}
      {introSection && <IntroSection content={introSection.content} />}

      {/* ── Styled display sections ── */}
      <div className="space-y-10">{elements}</div>
    </section>
  );
};

export default ArticleBody;
