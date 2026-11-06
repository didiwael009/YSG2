import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { BlogBlock } from "@/content/blog/types";
import { CALENDLY_URL } from "@/lib/constants";

/** Blocks that may break out of the 680 px text column, up to 900 px. */
export const WIDE_BLOCKS = new Set<BlogBlock["type"]>(["data-table", "comparison-table", "image-compare", "data-chart"]);

const H2 = "mb-5 mt-0 font-serif text-[28px] font-medium leading-[1.15] text-heading-light md:text-[34px]";
const H3 = "mb-2 mt-0 font-serif text-[21px] font-medium leading-tight text-heading-light";
const BODY = "text-[17px] leading-[1.65] text-body-light-strong md:text-[18px]";
const MUTED = "text-[14px] leading-[1.6] text-body-light";
const RULE = "border-border-light";
const TH = "break-words bg-[hsl(var(--heading-light)/0.05)] p-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-heading-light";
const TD = `break-words border-t ${RULE} p-4 align-top text-body-light-strong`;

export const SectionLabel = ({ children }: { children: ReactNode }) => (
  <span className="mb-3 inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-primary" role="presentation">
    {children}
  </span>
);

export const renderInlineText = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;

    const [, label, href] = match;
    const className =
      "text-heading-light underline decoration-primary/40 decoration-2 underline-offset-4 hover:text-primary";

    if (href.startsWith("/")) {
      return (
        <Link key={`${href}-${index}`} to={href} className={className}>
          {label}
        </Link>
      );
    }

    return (
      <a key={`${href}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  });
};

const Paragraphs = ({
  paragraphs,
  lead = false,
  dropcap = false,
}: {
  paragraphs: string[];
  lead?: boolean;
  dropcap?: boolean;
}) => (
  <>
    {paragraphs.map((paragraph, index) => (
      <p
        key={paragraph}
        className={`mb-5 ${BODY} ${lead && index === 0 ? "font-serif text-[20px] leading-[1.6] text-heading-light md:text-[22px]" : ""} ${
          dropcap && index === 0
            ? "first-letter:float-left first-letter:pr-2 first-letter:font-serif first-letter:text-[64px] first-letter:leading-[0.9] first-letter:text-primary"
            : ""
        }`}
      >
        {renderInlineText(paragraph)}
      </p>
    ))}
  </>
);

const Heading = ({ label, title }: { label: string; title: string }) => (
  <>
    <SectionLabel>{label}</SectionLabel>
    <h2 className={H2}>{title}</h2>
  </>
);

const Footnote = ({ text }: { text?: string }) =>
  text ? <p className={`mt-4 ${MUTED}`}>{renderInlineText(text)}</p> : null;

const CtaButton = ({ label }: { label: string }) => (
  <Button variant="hero" size="sm" asChild>
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  </Button>
);

export const renderBlock = (block: BlogBlock, index: number): ReactNode => {
  switch (block.type) {
    case "intro":
      return (
        <section id={block.id} className="mb-12 scroll-mt-20 rounded-r-lg border-l-[3px] border-primary bg-primary/[0.06] px-7 py-6">
          <SectionLabel>{block.label}</SectionLabel>
          <p className="mb-5 font-serif text-xl leading-[1.55] text-heading-light">{block.headline}</p>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-4 font-serif text-xl leading-[1.55] text-heading-light last:mb-0">
              {renderInlineText(paragraph)}
            </p>
          ))}
        </section>
      );

    case "paragraphs":
      return <Paragraphs paragraphs={block.paragraphs} lead={block.lead} dropcap={block.dropcap} />;

    case "quote":
      return (
        <blockquote className="my-10 border-l-[3px] border-accent pl-6 font-serif text-2xl leading-snug text-heading-light">
          {block.text}
        </blockquote>
      );

    case "section":
      return (
        <section id={block.id} className="mt-16 scroll-mt-20">
          <Heading label={block.label} title={block.title} />
          <Paragraphs paragraphs={block.paragraphs} />
        </section>
      );

    case "split-note":
      return (
        <div className={`my-9 grid gap-8 border-y ${RULE} py-7 md:grid-cols-2`}>
          {block.items.map((item) => (
            <div key={item.title} className={item.emphasis ? "border-l-[3px] border-primary pl-5" : ""}>
              <h3 className={H3}>{item.title}</h3>
              <p className={`mb-0 ${BODY} md:text-[16.5px]`}>{renderInlineText(item.body)}</p>
            </div>
          ))}
        </div>
      );

    case "visual-break":
      return (
        <section id={block.id} className={`my-12 scroll-mt-20 border-y ${RULE} py-6`}>
          {block.heading ? (
            <Heading label={block.label ?? "Framework"} title={block.title} />
          ) : (
            <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.08em] text-primary">{block.title}</div>
          )}
          <div className="grid gap-8 md:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.title}>
                <h3 className={H3}>{item.title}</h3>
                <ul className="m-0 list-disc pl-5 text-[15.5px] leading-[1.75] text-body-light-strong">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{renderInlineText(bullet)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "inline-cta":
    case "mid-cta":
      return (
        <div className={`my-11 grid gap-5 border-y ${RULE} py-6 md:grid-cols-[1fr_auto] md:items-center`}>
          <div>
            <p className="mb-1 font-serif text-[19px] text-heading-light">{block.title}</p>
            <p className={`mb-0 ${MUTED} text-[15.5px]`}>{renderInlineText(block.body)}</p>
          </div>
          <CtaButton label={block.button} />
        </div>
      );

    case "numbered-list":
    case "dark-checklist":
      return (
        <section
          id={block.id}
          className={
            block.type === "dark-checklist"
              ? `my-14 scroll-mt-20 border-y ${RULE} py-8`
              : "mt-16 scroll-mt-20"
          }
        >
          <Heading label={block.label} title={block.title} />
          <Paragraphs paragraphs={block.paragraphs} />
          <div className={`my-8 border-t ${RULE}`}>
            {block.items.map((item, itemIndex) => (
              <div key={item.title} className={`grid grid-cols-[44px_1fr] gap-4 border-b ${RULE} py-5`}>
                <div className="font-mono text-[13px] tracking-[0.08em] text-primary">
                  {String(itemIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className={H3}>{item.title}</h3>
                  <p className={`mb-0 ${BODY} md:text-[17px]`}>{renderInlineText(item.body)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "example":
      return (
        <section id={block.id} className="mt-16 scroll-mt-20">
          <Heading label={block.label} title={block.title} />
          <Paragraphs paragraphs={block.paragraphs} />
          <div className={`my-9 grid gap-8 border-y ${RULE} py-7 md:grid-cols-2`}>
            {block.items.map((item, itemIndex) => (
              <div key={`${item.title}-${itemIndex}`} className={item.emphasis ? "border-l-[3px] border-primary pl-5" : ""}>
                <h3 className={H3}>{item.title}</h3>
                <p className={`mb-0 ${BODY} md:text-[16.5px]`}>{renderInlineText(item.body)}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case "comparison-table":
      return (
        <section id={block.id} className="mt-16 scroll-mt-20">
          <Heading label={block.label} title={block.title} />
          <p className={`mb-5 max-w-[680px] ${BODY}`}>{block.paragraph}</p>
          <div className={`my-9 max-w-full overflow-hidden rounded-xl border ${RULE}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] table-fixed border-collapse text-[15px]">
                <colgroup>
                  <col className="w-[28%]" />
                  <col className="w-[36%]" />
                  <col className="w-[36%]" />
                </colgroup>
                <thead>
                  <tr>
                    {["Element", "Google Ads", "Meta Ads"].map((h) => (
                      <th key={h} className={`${TH} text-left`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.element}>
                      <td className={`${TD} text-heading-light`}>{row.element}</td>
                      <td className={TD}>{renderInlineText(row.google)}</td>
                      <td className={TD}>{renderInlineText(row.meta)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );

    case "data-chart": {
      const max = Math.max(...block.rows.map((r) => r.value), 1);
      return (
        <section id={block.id} className="mt-16 scroll-mt-20">
          <Heading label={block.label} title={block.title} />
          <div className="max-w-[680px]">
            <Paragraphs paragraphs={block.paragraphs} />
          </div>
          <figure className={`my-9 max-w-full overflow-hidden rounded-lg border ${RULE} p-6 md:p-8`}>
            <figcaption className="mb-6 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
              {block.caption}
            </figcaption>
            <div>
              {block.rows.map((row) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[3.4rem_1fr_3rem] items-center gap-3 border-b ${RULE} py-2 last:border-b-0`}
                >
                  <span className="text-right font-mono text-[13px] tabular-nums text-body-light">{row.label}</span>
                  <span className="flex h-4 items-center">
                    <span
                      className={`h-full rounded-sm ${row.muted ? "bg-border-light" : "bg-primary"}`}
                      style={{ width: `${Math.max((row.value / max) * 100, 0.8)}%` }}
                    />
                  </span>
                  <span className="text-right font-mono text-[13px] tabular-nums text-heading-light">{row.display}</span>
                </div>
              ))}
            </div>
            {block.footnote ? (
              <p className={`mb-0 mt-6 border-t ${RULE} pt-4 ${MUTED}`}>{renderInlineText(block.footnote)}</p>
            ) : null}
          </figure>
        </section>
      );
    }

    case "image-compare":
      return (
        <section id={block.id} className="mt-16 scroll-mt-20">
          <Heading label={block.label} title={block.title} />
          <div className="max-w-[680px]">
            <Paragraphs paragraphs={block.paragraphs} />
          </div>
          <div className="my-9 grid gap-5 md:grid-cols-2">
            {[block.before, block.after].map((shot, shotIndex) => (
              <figure key={shot.src} className="m-0">
                {/* Sources are pre-cropped to a 4:3 hero window (see public/study-crops).
                    The ratio is declared here so nothing shifts on load. */}
                <div className={`aspect-[4/3] overflow-hidden rounded-lg border ${RULE}`}>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    width={1100}
                    height={825}
                    className="block h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="mt-3">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
                    {shotIndex === 0 ? "Before" : "After"} {"·"} {shot.caption}
                  </span>
                  {shot.quote ? (
                    <span className={`mt-1 block ${MUTED} text-[15px]`}>{renderInlineText(shot.quote)}</span>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
          <Footnote text={block.footnote} />
        </section>
      );

    case "data-table":
      return (
        <section id={block.id} className="mt-16 scroll-mt-20">
          <Heading label={block.label} title={block.title} />
          <div className="max-w-[680px]">
            <Paragraphs paragraphs={block.paragraphs} />
          </div>
          <div className={`my-9 max-w-full overflow-hidden rounded-xl border ${RULE}`}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[15px]">
                <thead>
                  <tr>
                    {block.columns.map((col, colIndex) => (
                      <th key={col} className={`${TH} ${block.align?.includes(colIndex) ? "text-right" : "text-left"}`}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`${TD} ${
                            block.align?.includes(cellIndex) ? "text-right font-mono tabular-nums text-heading-light" : ""
                          } ${cellIndex === 0 ? "text-heading-light" : ""}`}
                        >
                          {renderInlineText(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footnote text={block.footnote} />
        </section>
      );

    case "takeaway":
      return (
        <section id={block.id} className={`my-10 scroll-mt-20 border-y ${RULE} py-8`}>
          <Heading label={block.label} title={block.title} />
          <Paragraphs paragraphs={block.paragraphs} />
          <h3 className={`${H3} mt-9`}>{block.subheading}</h3>
          <ul className="m-0 list-disc pl-5 text-base leading-[1.75] text-body-light-strong">
            {block.checklist.map((item) => (
              <li key={item}>{renderInlineText(item)}</li>
            ))}
          </ul>
        </section>
      );

    case "news-item":
      return (
        <section id={block.id} className={`scroll-mt-20 border-t ${RULE} pt-10 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-12`}>
          <SectionLabel>{block.rubrique}</SectionLabel>
          <h2 className={H2}>{block.title}</h2>
          <Paragraphs paragraphs={block.text} />
          <figure className="my-6">
            <a href={block.sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={block.image}
                alt={block.imageAlt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`block w-full rounded-lg border ${RULE}`}
              />
            </a>
          </figure>
          <p className={`border-l-2 border-primary pl-4 ${MUTED}`}>
            Limit: {block.limit} Source:{" "}
            <a
              href={block.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-heading-light underline decoration-primary/40 decoration-2 underline-offset-4 hover:text-primary"
            >
              {block.sourceLabel} {"↗"}
            </a>
          </p>
        </section>
      );

    default:
      return null;
  }
};
