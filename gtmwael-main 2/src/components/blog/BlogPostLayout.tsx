import { useEffect, useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import type { BlogBlock, BlogPost } from "@/lib/blog";
import { CALENDLY_URL } from "@/lib/constants";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const SectionLabel = ({ children }: { children: string }) => (
  <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary" role="presentation">
    {children}
  </span>
);

const renderInlineText = (text: string) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;

    const [, label, href] = match;
    const className =
      "font-semibold text-[#171421] underline decoration-primary/40 decoration-2 underline-offset-4 hover:text-primary";

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
        className={`mb-5 max-w-[760px] text-[17px] leading-[1.72] text-[#3f394b] md:text-lg ${
          lead && index === 0 ? "text-[19px] leading-[1.58] text-[#242030] md:text-[21px]" : ""
        } ${
          dropcap && index === 0
            ? "first-letter:float-left first-letter:pr-2 first-letter:text-[64px] first-letter:font-black first-letter:leading-[0.9] first-letter:text-primary"
            : ""
        }`}
      >
        {renderInlineText(paragraph)}
      </p>
    ))}
  </>
);

const EditorialHeading = ({ id, label, title }: { id?: string; label: string; title: string }) => (
  <section id={id} className="scroll-mt-28">
    <SectionLabel>{label}</SectionLabel>
    <h2 className="mb-5 mt-0 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
      {title}
    </h2>
  </section>
);

const renderBlock = (block: BlogBlock, index: number) => {
  switch (block.type) {
    case "intro":
      return (
        <section
          key={`${block.type}-${index}`}
          id={block.id}
          className="mb-12 scroll-mt-28 rounded-[22px] border border-[#e2d9ff] bg-[#f3efff] px-7 py-6"
        >
          <SectionLabel>{block.label}</SectionLabel>
          <p className="mb-5 max-w-none text-xl font-bold leading-[1.55] text-[#211b31]">
            {block.headline}
          </p>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-0 max-w-none text-xl font-bold leading-[1.55] text-[#211b31]">
              {renderInlineText(paragraph)}
            </p>
          ))}
        </section>
      );

    case "paragraphs":
      return (
        <div key={`${block.type}-${index}`}>
          <Paragraphs paragraphs={block.paragraphs} lead={block.lead} dropcap={block.dropcap} />
        </div>
      );

    case "quote":
      return (
        <blockquote
          key={`${block.type}-${index}`}
          className="my-10 rounded-r-[24px] border-l-[5px] border-primary bg-[#11111f] px-8 py-7 font-display text-2xl font-black leading-tight text-white shadow-[0_24px_70px_rgba(7,7,17,0.16)]"
        >
          {block.text}
        </blockquote>
      );

    case "section":
      return (
        <section key={block.id} id={block.id} className="mt-16 scroll-mt-28">
          <SectionLabel>{block.label}</SectionLabel>
          <h2 className="mb-5 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
            {block.title}
          </h2>
          <Paragraphs paragraphs={block.paragraphs} />
        </section>
      );

    case "split-note":
      return (
        <div
          key={`${block.type}-${index}`}
          className="my-9 grid gap-8 border-y border-[#11111f]/10 py-7 md:grid-cols-2"
        >
          {block.items.map((item) => (
            <div key={item.title} className={item.emphasis ? "border-l-[3px] border-primary pl-5" : ""}>
              <h3 className="mb-3 mt-0 font-display text-[23px] font-bold leading-tight text-[#11101a]">
                {item.title}
              </h3>
              <p className="mb-0 max-w-[760px] text-[16.5px] leading-[1.68] text-[#4d4658]">
                {renderInlineText(item.body)}
              </p>
            </div>
          ))}
        </div>
      );

    case "visual-break":
      return (
        <section
          key={`${block.type}-${index}`}
          id={block.id}
          className="my-12 scroll-mt-28 border-y border-[#11111f]/10 py-6"
        >
          {block.heading ? (
            <>
              <SectionLabel>{block.label ?? "Framework"}</SectionLabel>
              <h2 className="mb-5 mt-0 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
                {block.title}
              </h2>
            </>
          ) : (
            <div className="mb-5 text-[13px] font-black uppercase tracking-[0.08em] text-primary">
              {block.title}
            </div>
          )}
          <div className="grid gap-8 md:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.title}>
                <strong className="mb-3 block text-lg text-[#14111f]">{item.title}</strong>
                <ul className="m-0 max-w-[760px] list-disc pl-5 text-[15.5px] leading-[1.75] text-[#514b5d]">
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
      return (
        <div
          key={`${block.type}-${index}`}
          className="my-11 grid gap-5 rounded-[20px] border border-[#ffd4c0] bg-[#fff3ed] px-6 py-5 md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <strong className="mb-1 block text-[17px] text-[#1d1722]">{block.title}</strong>
            <p className="mb-0 text-[15.5px] leading-[1.55] text-[#514339]">{renderInlineText(block.body)}</p>
          </div>
          <Button variant="hero" size="sm" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              {block.button}
            </a>
          </Button>
        </div>
      );

    case "numbered-list":
      return (
        <section key={block.id} id={block.id} className="mt-16 scroll-mt-28">
          <SectionLabel>{block.label}</SectionLabel>
          <h2 className="mb-5 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
            {block.title}
          </h2>
          <Paragraphs paragraphs={block.paragraphs} />
          <div className="my-8 border-t border-[#11111f]/10">
            {block.items.map((item, itemIndex) => (
              <div
                key={item.title}
                className="grid grid-cols-[52px_1fr] gap-5 border-b border-[#11111f]/10 py-6"
              >
                <div className="text-[13px] font-black tracking-[0.08em] text-primary">
                  {String(itemIndex + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-2 mt-0 font-display text-[21px] font-bold leading-tight text-[#11101a]">
                    {item.title}
                  </h3>
                  <p className="mb-0 max-w-[760px] text-[17px] leading-[1.68] text-[#4d4658]">
                    {renderInlineText(item.body)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case "dark-checklist":
      return (
        <section
          key={block.id}
          id={block.id}
          className="my-14 scroll-mt-28 rounded-[26px] bg-[linear-gradient(135deg,#171021,#0d0d1a)] p-7 text-white shadow-[0_24px_70px_rgba(7,7,17,0.18)] md:p-8"
        >
          <SectionLabel>{block.label}</SectionLabel>
          <h2 className="mb-5 mt-0 font-display text-[31px] font-bold leading-[1.02] text-white md:text-[46px]">
            {block.title}
          </h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 max-w-[760px] text-[17px] leading-[1.72] text-[#d6d0df] md:text-lg">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 border-t border-white/15">
            {block.items.map((item, itemIndex) => (
              <div
                key={item.title}
                className="border-b border-white/15 py-4 text-base leading-[1.6] text-[#f2edf8]"
              >
                <strong className="font-black">
                  {String(itemIndex + 1).padStart(2, "0")} - {item.title}
                </strong>{" "}
                {renderInlineText(item.body)}
              </div>
            ))}
          </div>
        </section>
      );

    case "example":
      return (
        <section key={block.id} id={block.id} className="mt-16 scroll-mt-28">
          <SectionLabel>{block.label}</SectionLabel>
          <h2 className="mb-5 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
            {block.title}
          </h2>
          <Paragraphs paragraphs={block.paragraphs} />
          <div className="my-9 grid gap-8 border-y border-[#11111f]/10 py-7 md:grid-cols-2">
            {block.items.map((item) => (
              <div key={item.title} className={item.emphasis ? "border-l-[3px] border-primary pl-5" : ""}>
                <h3 className="mb-3 mt-0 font-display text-[23px] font-bold leading-tight text-[#11101a]">
                  {item.title}
                </h3>
                <p className="mb-0 max-w-[760px] text-[16.5px] leading-[1.68] text-[#4d4658]">
                  {renderInlineText(item.body)}
                </p>
              </div>
            ))}
          </div>
        </section>
      );

    case "comparison-table":
      return (
        <section key={block.id} id={block.id} className="mt-16 scroll-mt-28">
          <SectionLabel>{block.label}</SectionLabel>
          <h2 className="mb-5 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
            {block.title}
          </h2>
          <p className="mb-5 max-w-[760px] text-[17px] leading-[1.72] text-[#3f394b] md:text-lg">
            {block.paragraph}
          </p>
          <div className="my-9 max-w-full overflow-hidden rounded-[24px] border border-[#11111f]/10 shadow-[0_24px_70px_rgba(7,7,17,0.16)]">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse bg-white text-[15px]">
                <colgroup>
                  <col className="w-[28%]" />
                  <col className="w-[36%]" />
                  <col className="w-[36%]" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="break-words bg-[#11111f] p-4 text-left text-[11px] font-black uppercase tracking-[0.08em] text-white">
                      Element
                    </th>
                    <th className="break-words bg-[#11111f] p-4 text-left text-[11px] font-black uppercase tracking-[0.08em] text-white">
                      Google Ads
                    </th>
                    <th className="break-words bg-[#11111f] p-4 text-left text-[11px] font-black uppercase tracking-[0.08em] text-white">
                      Meta Ads
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.element}>
                      <td className="break-words border-t border-[#11111f]/10 p-4 align-top text-[#494353]">
                        <strong className="text-[#15121f]">{row.element}</strong>
                      </td>
                      <td className="break-words border-t border-[#11111f]/10 p-4 align-top text-[#494353]">
                        {renderInlineText(row.google)}
                      </td>
                      <td className="break-words border-t border-[#11111f]/10 p-4 align-top text-[#494353]">
                        {renderInlineText(row.meta)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );

    case "mid-cta":
      return (
        <div
          key={`${block.type}-${index}`}
          className="my-12 grid gap-5 rounded-[24px] bg-[#11111f] px-6 py-6 text-white shadow-[0_24px_70px_rgba(7,7,17,0.18)] md:grid-cols-[1fr_auto] md:items-center"
        >
          <div>
            <strong className="mb-2 block text-xl leading-tight">{block.title}</strong>
            <p className="mb-0 max-w-[520px] text-[15.5px] leading-[1.55] text-[#cfc9dc]">
              {renderInlineText(block.body)}
            </p>
          </div>
          <Button variant="hero" size="sm" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              {block.button}
            </a>
          </Button>
        </div>
      );

    case "takeaway":
      return (
        <section
          key={block.id}
          id={block.id}
          className="my-10 scroll-mt-28 rounded-[26px] border border-[#ffd7c5] bg-[#fff5ef] p-7"
        >
          <SectionLabel>{block.label}</SectionLabel>
          <h2 className="mb-5 mt-0 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
            {block.title}
          </h2>
          <Paragraphs paragraphs={block.paragraphs} />
          <h3 className="mb-3 mt-9 font-display text-[23px] font-bold leading-tight text-[#17121d]">
            {block.subheading}
          </h3>
          <ul className="m-0 list-disc pl-5 text-base leading-[1.75] text-[#493c36]">
            {block.checklist.map((item) => (
              <li key={item}>{renderInlineText(item)}</li>
            ))}
          </ul>
        </section>
      );

    default:
      return null;
  }
};

const BlogPostLayout = ({ post }: { post: BlogPost }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const page = document.documentElement;
        const max = page.scrollHeight - page.clientHeight;
        const progress = max > 0 ? (page.scrollTop / max) * 100 : 0;
        if (progressRef.current) progressRef.current.style.width = `${progress}%`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <div ref={progressRef} className="fixed left-0 top-0 z-[60] h-[3px] w-0 bg-gradient-to-r from-primary to-[#ff9b6d]" />
      <Navigation />
      <main>
        <article>
          <header className="bg-[radial-gradient(circle_at_15%_0%,rgba(124,60,255,0.28),transparent_30%),radial-gradient(circle_at_85%_5%,rgba(255,91,31,0.22),transparent_30%),linear-gradient(135deg,#090713_0%,#170920_46%,#070711_100%)] pt-32 pb-16 md:pt-36 md:pb-20">
            <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
              <div>
                <SectionLabel>{post.category}</SectionLabel>
                <h1 className="max-w-[850px] font-display text-[42px] font-black leading-[0.96] text-white md:text-[68px]">
                  {post.h1}
                </h1>
                <p className="mt-7 max-w-[650px] text-[19px] leading-[1.55] text-[#cec8dd]">
                  {post.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]">
                    By {post.author}
                  </span>
                  <time
                    dateTime={post.datePublished}
                    className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]"
                  >
                    {formatDate(post.datePublished)}
                  </time>
                  <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]">
                    {post.readTime}
                  </span>
                </div>
              </div>
              <figure className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.06] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  width={1200}
                  height={630}
                  className="aspect-[1200/630] w-full rounded-[20px] object-cover"
                  fetchpriority="high"
                  decoding="async"
                />
              </figure>
            </div>
          </header>

          <div className="rounded-t-[32px] bg-white py-12 text-[#11111f] shadow-[0_-36px_90px_rgba(0,0,0,0.25)] md:py-14">
            <div className="container mx-auto grid max-w-[1320px] gap-10 px-6 lg:grid-cols-[210px_minmax(0,880px)_210px] lg:items-start">
              <aside className="hidden lg:block">
                <nav
                  aria-label="Article contents"
                  className="sticky top-24 rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5"
                >
                  <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#777287]">
                    In this article
                  </div>
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block border-t border-[#11111f]/10 py-2.5 text-[13px] font-semibold text-[#554f63] transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </aside>

              <div className="min-w-0">
                {post.blocks.map(renderBlock)}

                <section id="faq" className="mt-16 scroll-mt-28">
                  <SectionLabel>FAQ</SectionLabel>
                  <h2 className="mb-6 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[46px]">
                    Frequently Asked Questions
                  </h2>
                  <div className="border-t border-[#11111f]/10">
                    {post.faq.map((item, index) => (
                      <details
                        key={item.question}
                        open={index === 0}
                        className="border-b border-[#11111f]/10 py-5"
                      >
                        <summary className="cursor-pointer list-none text-lg font-black text-[#171421]">
                          <h3 className="inline text-lg font-black text-[#171421]">
                            {item.question}
                          </h3>
                        </summary>
                        <p className="mb-0 mt-3 max-w-[760px] text-[16.5px] leading-[1.65] text-[#5d5668]">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>

                <section className="mt-16 rounded-[30px] bg-[#11111f] px-6 py-10 text-center text-white shadow-[0_28px_80px_rgba(7,7,17,0.22)] md:px-11">
                  <SectionLabel>Next step</SectionLabel>
                  <h2 className="mb-3 mt-0 font-display text-[31px] font-bold leading-[1.02] text-white md:text-[46px]">
                    {post.cta.title}
                  </h2>
                  <p className="mx-auto mb-6 max-w-[560px] text-base leading-[1.65] text-[#d0cad9]">
                    {post.cta.body}
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      {post.cta.button}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </section>

                <p className="mt-10 border-l-[3px] border-primary pl-4 text-sm leading-[1.6] text-[#655f70]">
                  External source: {post.source.body}{" "}
                  <a
                    href={post.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#171421] underline decoration-primary/40 decoration-2 underline-offset-4 hover:text-primary"
                  >
                    {post.source.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  .
                </p>

                <section className="mt-20 grid gap-5 rounded-[24px] border border-[#11111f]/10 bg-[#fbfbfe] p-6 md:grid-cols-[64px_1fr]">
                  <div className="h-16 w-16 rounded-full bg-[linear-gradient(135deg,#ff5b1f,#7c3cff)] shadow-[0_16px_36px_rgba(255,91,31,0.2)]" />
                  <div>
                    <strong className="text-lg text-[#11111f]">{post.author}</strong>
                    <p className="mb-0 mt-1 text-[15.5px] leading-[1.55] text-[#5b5466]">
                      {post.authorBio}
                    </p>
                  </div>
                </section>

                <section className="mt-20">
                  <h3 className="mb-5 font-display text-[28px] font-bold text-[#11111f]">
                    Keep reading
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {post.relatedPosts.map((related) => (
                      <Link
                        key={related.href}
                        to={related.href}
                        className="min-h-[130px] rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,7,17,0.09)]"
                      >
                        <small className="text-[11px] font-black uppercase tracking-[0.08em] text-primary">
                          {related.label}
                        </small>
                        <strong className="my-2 block leading-tight text-[#11111f]">{related.title}</strong>
                        <span className="text-sm text-[#6b6475]">{related.description}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-[20px] bg-[#11111f] p-5 text-white shadow-[0_24px_70px_rgba(7,7,17,0.22)]">
                  <strong className="mb-2 block text-[15px] leading-tight">Need the page audited?</strong>
                  <p className="mb-4 text-[13px] leading-[1.5] text-[#c5bfd3]">
                    I will review the traffic source, message match, proof, CTA path, and mobile speed.
                  </p>
                  <Button variant="hero" size="sm" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book audit
                    </a>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostLayout;
