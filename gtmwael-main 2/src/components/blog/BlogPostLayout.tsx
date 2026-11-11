import { useEffect, useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog";
import { CALENDLY_URL } from "@/lib/constants";
import { isNewsIssue } from "@/content/blog/magazine";
import { DARK_BAND } from "./WaelProfile";
import { SectionLabel, WIDE_BLOCKS, renderBlock } from "./blocks";
import BenchmarkLayout from "./BenchmarkLayout";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const H2 = "mb-6 mt-0 font-serif text-[28px] font-medium leading-[1.15] text-heading-light md:text-[34px]";
const GENERIC_BANNER = "/og-default.png";
const TOC_LINK = "block py-1.5 text-[14px] leading-snug text-body-light-strong hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const TocList = ({ items }: { items: BlogPost["toc"] }) => (
  <ol className="m-0 list-none p-0">
    {items.map((item) => (
      <li key={item.id}>
        <a href={`#${item.id}`} className={TOC_LINK}>
          {item.label}
        </a>
      </li>
    ))}
  </ol>
);

// fetchpriority is not in this React version's types.
const HIGH_PRIORITY = { fetchpriority: "high" } as Record<string, string>;

const ClassicLayout = ({ post }: { post: BlogPost }) => {
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

  const isNews = isNewsIssue(post);
  const kicker = isNews ? `AI News${post.breadcrumbTitle ? ` \u00b7 ${post.breadcrumbTitle}` : ""}` : post.category;
  const faq = post.faq ?? [];
  const related = post.relatedPosts ?? [];
  const tocTitle = isNews ? "In this issue" : "In this article";
  const hasCover = Boolean(post.featuredImage) && post.featuredImage !== GENERIC_BANNER;

  return (
    <div className="min-h-screen bg-background-light text-heading-light">
      <div ref={progressRef} className="fixed left-0 top-0 z-[60] h-[3px] w-0 bg-primary" />
      <Navigation variant="blog" />
      <main>
        <article className="mx-auto max-w-[1240px] px-4 pb-20 pt-24 sm:px-6 md:pt-28">
          <div className="grid gap-x-14 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* One axis: kicker, title, dek, meta and cover share the body's left edge. */}
            <header className="min-w-0 max-w-[760px] lg:col-start-2">
              <span className="mb-4 inline-block font-mono text-[12px] uppercase tracking-[0.1em] text-primary">{kicker}</span>
              <h1 className="font-serif text-[32px] font-medium leading-[1.12] tracking-[-0.01em] text-heading-light md:text-[48px]">
                {post.h1}
              </h1>
              <p className="mt-5 font-serif text-[19px] leading-[1.5] text-body-light-strong md:text-[21px]">{post.excerpt}</p>
              <p className="mt-4 text-sm text-body-light">
                By {post.author} {"\u00b7"} <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>{" "}
                {"\u00b7"} {post.readTime}
              </p>
              {hasCover ? (
                <figure className="mt-8 overflow-hidden rounded-lg border border-border-light">
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    width={1200}
                    height={630}
                    className="block h-auto w-full object-contain"
                    {...HIGH_PRIORITY}
                    decoding="async"
                  />
                </figure>
              ) : null}
            </header>

            {post.toc.length > 0 ? (
              <aside className="hidden lg:col-start-1 lg:row-start-2 lg:block">
                <nav aria-label="Article contents" className="sticky top-20 mt-12 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6">
                  <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-body-light">{tocTitle}</div>
                  <div className="border-l border-border-light pl-4">
                    <TocList items={post.toc} />
                  </div>
                </nav>
              </aside>
            ) : null}

            <div className="min-w-0 lg:col-start-2 lg:row-start-2">
              {post.toc.length > 0 ? (
                <details className="mt-8 max-w-[720px] border-y border-border-light py-3 lg:hidden">
                  <summary className="cursor-pointer font-mono text-[12px] uppercase tracking-[0.1em] text-heading-light">
                    {tocTitle} ({post.toc.length})
                  </summary>
                  <div className="mt-2">
                    <TocList items={post.toc} />
                  </div>
                </details>
              ) : null}

              <div className="mt-12">
                {post.blocks.map((block, index) => (
                  <div key={`${block.type}-${index}`} className={WIDE_BLOCKS.has(block.type) ? "max-w-[900px]" : "max-w-[720px]"}>
                    {renderBlock(block, index)}
                  </div>
                ))}
              </div>

              <div className="max-w-[720px]">
                {faq.length > 0 ? (
                  <section id="faq" className="mt-16 scroll-mt-20">
                    <SectionLabel>FAQ</SectionLabel>
                    <h2 className={H2}>Frequently Asked Questions</h2>
                    <div className="border-t border-border-light">
                      {faq.map((item, index) => (
                        <details key={item.question} open={index === 0} className="border-b border-border-light py-5">
                          <summary className="cursor-pointer list-none">
                            <h3 className="inline font-serif text-lg font-medium text-heading-light">{item.question}</h3>
                          </summary>
                          <p className="mb-0 mt-3 text-[17px] leading-[1.65] text-body-light-strong">{item.answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                {post.source ? (
                  <p className="mt-10 border-l-2 border-primary pl-4 text-sm leading-[1.6] text-body-light">
                    External source: {post.source.body}{" "}
                    <a
                      href={post.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-heading-light underline decoration-primary/40 decoration-2 underline-offset-4 hover:text-primary"
                    >
                      {post.source.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    .
                  </p>
                ) : null}

                <section style={{ background: DARK_BAND }} className="mt-16 rounded-xl px-6 py-10 text-white md:px-10">
                  <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-primary">Next step</span>
                  <h2 className="mb-3 mt-0 font-serif text-[26px] font-medium leading-[1.15] text-white md:text-[32px]">{post.cta.title}</h2>
                  <p className="mb-6 max-w-[560px] text-base leading-[1.65] text-white/80">{post.cta.body}</p>
                  <Button variant="hero" size="lg" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      {post.cta.button}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </section>

                {related.length > 0 ? (
                  <section className="mt-16">
                    <h2 className="mb-2 border-b border-border-light pb-2 font-mono text-[12px] font-normal uppercase tracking-[0.1em] text-heading-light">
                      Keep reading
                    </h2>
                    <div className="grid gap-x-8 md:grid-cols-3">
                      {related.map((item) => (
                        <Link key={item.href} to={item.href} className="group block border-b border-border-light py-5">
                          <small className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">{item.label}</small>
                          <span className="my-2 block font-serif text-[17px] leading-tight text-heading-light group-hover:text-primary">
                            {item.title}
                          </span>
                          <span className="text-sm text-body-light">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </main>
      <div className="bg-background text-foreground">
        <Footer />
      </div>
    </div>
  );
};

const BlogPostLayout = ({ post }: { post: BlogPost }) =>
  post.layout === "teardown" ? <BenchmarkLayout post={post} /> : <ClassicLayout post={post} />;

export default BlogPostLayout;
