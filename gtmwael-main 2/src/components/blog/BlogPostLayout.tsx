import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import type { BlogPost, BlogSection } from "@/lib/blog";
import { CALENDLY_URL } from "@/lib/constants";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const SectionIntro = ({ paragraphs }: { paragraphs?: string[] }) => {
  if (!paragraphs?.length) return null;

  return (
    <div className="mt-6 space-y-5">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-lg leading-8 text-[#514b5f]">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

const ArticleCard = ({ title, body, index }: { title: string; body: string; index?: number }) => (
  <div className="rounded-[22px] border border-[#11111f]/10 bg-[#fbf9ff] p-6 shadow-[0_14px_36px_rgba(17,17,31,0.06)]">
    {typeof index === "number" && (
      <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {String(index + 1).padStart(2, "0")}
      </span>
    )}
    <h3 className="font-display text-xl font-semibold leading-tight text-[#11111f]">
      {title}
    </h3>
    <p className="mt-3 text-base leading-7 text-[#625b70]">{body}</p>
  </div>
);

const renderSection = (section: BlogSection) => {
  if (section.type === "table") {
    return (
      <section key={section.id} id={section.id} className="scroll-mt-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Compare</p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-[#11111f] md:text-4xl">
          {section.title}
        </h2>
        <SectionIntro paragraphs={section.intro} />
        <div className="mt-8 overflow-x-auto rounded-[22px] border border-[#11111f]/10 bg-white shadow-[0_20px_55px_rgba(17,17,31,0.08)]">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-[#11111f] text-white">
                <th className="p-4 text-xs font-bold uppercase tracking-[0.16em] text-primary">Element</th>
                <th className="p-4 text-xs font-bold uppercase tracking-[0.16em] text-primary">Google Ads</th>
                <th className="p-4 text-xs font-bold uppercase tracking-[0.16em] text-primary">Meta Ads</th>
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row.element} className="border-b border-[#11111f]/10 last:border-b-0">
                  <td className="p-4 font-semibold text-[#11111f]">{row.element}</td>
                  <td className="p-4 text-[#625b70]">{row.google}</td>
                  <td className="p-4 text-[#625b70]">{row.meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (section.type === "takeaway") {
    return (
      <section key={section.id} id={section.id} className="scroll-mt-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Founder note</p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-[#11111f] md:text-4xl">
          {section.title}
        </h2>
        <SectionIntro paragraphs={section.intro} />
        <div className="mt-8 rounded-[26px] border border-primary/20 bg-[#fff5ef] p-7">
          <h3 className="font-display text-2xl font-semibold text-[#11111f]">
            Before you scale paid ads, check the foundation.
          </h3>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {section.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-7 text-[#514b5f]">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section key={section.id} id={section.id} className="scroll-mt-28">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
        {section.type === "example" ? "Example" : "Strategy"}
      </p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-[#11111f] md:text-4xl">
        {section.title}
      </h2>
      <SectionIntro paragraphs={section.intro} />
      <div
        className={`mt-8 grid gap-5 ${
          section.type === "split" || section.type === "example" ? "md:grid-cols-2" : ""
        }`}
      >
        {section.cards.map((card, index) => (
          <ArticleCard key={card.title} title={card.title} body={card.body} index={index} />
        ))}
      </div>
    </section>
  );
};

const BlogPostLayout = ({ post }: { post: BlogPost }) => {
  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Navigation />
      <main>
        <article>
          <header className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_0%,rgba(124,60,255,0.28),transparent_30%),radial-gradient(circle_at_88%_4%,rgba(255,91,31,0.22),transparent_30%),linear-gradient(135deg,#090713_0%,#170920_46%,#070711_100%)] pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
              <div>
                <Link
                  to="/blog"
                  className="inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Blog
                </Link>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  {post.category}
                </p>
                <h1 className="mt-5 font-display max-w-5xl text-5xl font-bold leading-[0.96] text-white md:text-7xl">
                  {post.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-[#d8d2e6] md:text-xl">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-[#eeeaf8]">
                    By {post.author}
                  </span>
                  <time
                    dateTime={post.publishedAt}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-[#eeeaf8]"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-[#eeeaf8]">
                    {post.readTime}
                  </span>
                </div>
              </div>

              <aside className="rounded-[24px] border border-white/10 bg-white/[0.07] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
                <strong className="block text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {post.heroNote.label}
                </strong>
                <p className="mt-4 text-base leading-7 text-[#eeeaf8]">{post.heroNote.body}</p>
              </aside>
            </div>
          </header>

          <div className="rounded-t-[32px] bg-white py-12 text-[#11111f] shadow-[0_-36px_90px_rgba(0,0,0,0.25)] md:py-16">
            <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[210px_minmax(0,760px)_210px] lg:items-start">
              <aside className="hidden lg:block">
                <nav
                  aria-label="Article table of contents"
                  className="sticky top-24 rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#777287]">
                    In this article
                  </p>
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block border-t border-[#11111f]/10 py-3 text-sm font-semibold leading-tight text-[#554f63] transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </aside>

              <div className="min-w-0">
                <div className="rounded-[26px] border border-primary/15 bg-[#fff5ef] p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Opening idea
                  </p>
                  <div className="mt-5 space-y-5">
                    {post.intro.map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-8 text-[#514b5f]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="mt-6 font-display text-2xl font-semibold leading-tight text-[#11111f]">
                    {post.thesis}
                  </p>
                </div>

                <nav
                  aria-label="Mobile article table of contents"
                  className="mt-8 rounded-[22px] border border-[#11111f]/10 bg-[#fbfbfe] p-5 lg:hidden"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#777287]">
                    In this article
                  </p>
                  <div className="grid gap-2">
                    {post.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="text-sm font-semibold leading-tight text-[#554f63] hover:text-primary"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </nav>

                <div className="mt-14 space-y-16 md:mt-20 md:space-y-20">
                  {post.sections.map(renderSection)}

                  <section id="faq" className="scroll-mt-28">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      FAQ
                    </p>
                    <h2 className="font-display text-3xl font-semibold leading-tight text-[#11111f] md:text-4xl">
                      Frequently Asked Questions
                    </h2>
                    <div className="mt-8 space-y-5">
                      {post.faq.map((item) => (
                        <div
                          key={item.question}
                          className="rounded-[22px] border border-[#11111f]/10 bg-[#fbf9ff] p-6"
                        >
                          <h3 className="font-display text-xl font-semibold text-[#11111f]">
                            {item.question}
                          </h3>
                          <p className="mt-3 text-base leading-7 text-[#625b70]">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[28px] border border-primary/20 bg-[#11111f] p-8 text-white shadow-[0_24px_70px_rgba(17,17,31,0.18)]">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Next step
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-semibold leading-tight">
                      {post.cta.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[#cec8dd]">
                      {post.cta.body}
                    </p>
                    <div className="mt-7">
                      <Button variant="hero" size="lg" asChild>
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                          {post.cta.button}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </section>

                  <section className="rounded-[22px] border border-[#11111f]/10 bg-[#fbfbfe] p-6 text-sm leading-7 text-[#625b70]">
                    <p>
                      External source: {post.source.body}{" "}
                      <a
                        href={post.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary/80"
                      >
                        {post.source.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      .
                    </p>
                  </section>
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-[20px] bg-[#11111f] p-5 text-white shadow-[0_24px_70px_rgba(7,7,17,0.22)]">
                  <strong className="block text-base font-semibold leading-tight">
                    Need the page audited?
                  </strong>
                  <p className="mt-3 text-sm leading-6 text-[#c5bfd3]">
                    I will review the traffic source, message match, proof, CTA path, and mobile speed.
                  </p>
                  <Button variant="hero" size="sm" className="mt-4 w-full" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      Book audit
                    </a>
                  </Button>
                  <Link
                    to="/services/landing-page"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    Landing page service
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
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
