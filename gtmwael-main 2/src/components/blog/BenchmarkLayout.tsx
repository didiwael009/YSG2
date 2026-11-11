import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import TeardownCTA from "@/components/cro-teardown/TeardownCTA";
import type { BlogPost } from "@/lib/blog";
import { CALENDLY_URL } from "@/lib/constants";
import { renderBlock } from "./blocks";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));

const GENERIC_BANNER = "/og-default.png";
const CHIP = "rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-extrabold text-[#e5dfef]";

/**
 * The shared blog blocks are written for the serif blog look. Inside the teardown body,
 * headings switch to Sora, copy to Inter and section labels to the teardown kicker.
 */
const TEARDOWN_TEXT = [
  "[&_.font-serif]:font-body",
  "[&_h2.font-serif]:font-display [&_h2.font-serif]:font-bold [&_h2.font-serif]:leading-[1.02] [&_h2.font-serif]:text-[#11101a] [&_h2.font-serif]:text-[31px] md:[&_h2.font-serif]:text-[38px]",
  "[&_h3.font-serif]:font-display [&_h3.font-serif]:font-bold [&_h3.font-serif]:text-[#11101a]",
  "[&_span.font-mono]:font-body [&_span.font-mono]:font-black [&_span.font-mono]:tracking-[0.09em]",
].join(" ");

// fetchpriority is not in this React version's types.
const HIGH_PRIORITY = { fetchpriority: "high" } as Record<string, string>;

const BenchmarkLayout = ({ post }: { post: BlogPost }) => {
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

  const faq = post.faq ?? [];
  const related = post.relatedPosts ?? [];
  const hasCover = Boolean(post.featuredImage) && post.featuredImage !== GENERIC_BANNER;

  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <div ref={progressRef} className="fixed left-0 top-0 z-[60] h-[3px] w-0 bg-gradient-to-r from-primary to-[#ff9b6d]" />
      <Navigation />
      <main>
        <article>
          <header className="bg-[radial-gradient(circle_at_15%_0%,rgba(124,60,255,0.28),transparent_30%),radial-gradient(circle_at_85%_5%,rgba(255,91,31,0.22),transparent_30%),linear-gradient(135deg,#090713_0%,#170920_46%,#070711_100%)] pb-16 pt-32 md:pb-20 md:pt-36">
            <div className={`container mx-auto grid max-w-6xl gap-10 px-6 ${hasCover ? "lg:grid-cols-[minmax(0,1fr)_420px]" : ""} lg:items-center`}>
              <div>
                <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">{post.category}</span>
                <h1 className="max-w-[820px] font-display text-[38px] font-black leading-[0.98] text-white md:text-[60px]">{post.h1}</h1>
                <p className="mt-6 max-w-[580px] text-[18px] leading-[1.58] text-[#cec8dd]">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className={CHIP}>By {post.author}</span>
                  <time dateTime={post.datePublished} className={CHIP}>
                    {formatDate(post.datePublished)}
                  </time>
                  {post.dateModified !== post.datePublished ? (
                    <time dateTime={post.dateModified} className={CHIP}>
                      Updated {formatDate(post.dateModified)}
                    </time>
                  ) : null}
                  <span className={CHIP}>{post.readTime}</span>
                </div>
              </div>
              {hasCover ? (
                <figure className="m-0 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.06] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    width={1200}
                    height={630}
                    className="block h-auto w-full rounded-[14px]"
                    {...HIGH_PRIORITY}
                    decoding="async"
                  />
                </figure>
              ) : null}
            </div>
          </header>

          <div className="rounded-t-[32px] bg-white py-12 text-[#11111f] shadow-[0_-36px_90px_rgba(0,0,0,0.25)] md:py-14">
            <div className="container mx-auto grid max-w-[1320px] gap-10 px-6 lg:grid-cols-[210px_minmax(0,880px)_210px] lg:items-start">
              {post.toc.length > 0 ? (
                <aside className="hidden lg:block">
                  <nav aria-label="Article contents" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5">
                    <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#777287]">In this article</div>
                    <ul className="m-0 list-none p-0">
                      {post.toc.map((item) => (
                        <li key={item.id} className="border-t border-[#11111f]/10">
                          <a href={`#${item.id}`} className="block py-2.5 text-[13px] font-semibold text-[#554f63] transition-colors hover:text-primary">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              ) : (
                <div className="hidden lg:block" />
              )}

              <div className="min-w-0 space-y-16">
                {post.toc.length > 0 ? (
                  <details className="rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5 lg:hidden">
                    <summary className="cursor-pointer text-[11px] font-black uppercase tracking-[0.08em] text-[#777287]">
                      In this article ({post.toc.length})
                    </summary>
                    <ul className="m-0 mt-3 list-none p-0">
                      {post.toc.map((item) => (
                        <li key={item.id} className="border-t border-[#11111f]/10">
                          <a href={`#${item.id}`} className="block py-2.5 text-[14px] font-semibold text-[#554f63] hover:text-primary">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}

                <div className={TEARDOWN_TEXT}>
                  {post.blocks.map((block, index) => (
                    <div key={`${block.type}-${index}`}>{renderBlock(block, index)}</div>
                  ))}
                </div>

                {faq.length > 0 ? (
                  <section id="faq" className="scroll-mt-28">
                    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">FAQ</span>
                    <h2 className="mb-5 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                      {faq.map((item, index) => (
                        <details key={item.question} open={index === 0} className="rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5">
                          <summary className="cursor-pointer list-none">
                            <h3 className="inline font-display text-[17px] font-bold text-[#11101a]">{item.question}</h3>
                          </summary>
                          <p className="mb-0 mt-3 text-[16px] leading-[1.65] text-[#3d3849]">{item.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                {post.source ? (
                  <p className="border-l-2 border-primary pl-4 text-sm leading-[1.6] text-[#5b5468]">
                    External source: {post.source.body}{" "}
                    <a
                      href={post.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#11101a] underline decoration-primary/40 decoration-2 underline-offset-4 hover:text-primary"
                    >
                      {post.source.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    .
                  </p>
                ) : null}

                <TeardownCTA title={post.cta.title} body={post.cta.body} button={post.cta.button} />

                <section className="grid gap-5 rounded-[24px] border border-[#11111f]/10 bg-[#fbfbfe] p-6 md:grid-cols-[64px_1fr]">
                  <div className="h-16 w-16 rounded-full bg-[linear-gradient(135deg,#ff5b1f,#7c3cff)] shadow-[0_16px_36px_rgba(255,91,31,0.2)]" />
                  <div>
                    <strong className="text-lg text-[#11111f]">{post.author}</strong>
                    <p className="mb-0 mt-1 text-[15.5px] leading-[1.55] text-[#5b5466]">{post.authorBio}</p>
                  </div>
                </section>

                {related.length > 0 ? (
                  <section>
                    <h3 className="mb-5 font-display text-[28px] font-bold text-[#11111f]">Keep reading</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {related.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="min-h-[130px] rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,7,17,0.09)]"
                        >
                          <small className="text-[11px] font-black uppercase tracking-[0.08em] text-primary">{item.label}</small>
                          <strong className="my-2 block leading-tight text-[#11111f]">{item.title}</strong>
                          <span className="text-sm text-[#6b6475]">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-[20px] bg-[#11111f] p-5 text-white shadow-[0_24px_70px_rgba(7,7,17,0.22)]">
                  <strong className="mb-2 block text-[15px] leading-tight">{post.cta.title}</strong>
                  <Button variant="hero" size="sm" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      {post.cta.button}
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

export default BenchmarkLayout;
