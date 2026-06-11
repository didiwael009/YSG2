import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import type { CroTeardownPost } from "@/lib/cro-teardown";
import { CALENDLY_URL } from "@/lib/constants";
import TeardownHero from "./TeardownHero";
import SummaryCards from "./SummaryCards";
import ScreenshotTimeline from "./ScreenshotTimeline";
import ScreenshotAnalysisBlock from "./ScreenshotAnalysisBlock";
import MessagingEvolution from "./MessagingEvolution";
import CtaEvolutionTable from "./CtaEvolutionTable";
import BusinessContextBlock from "./BusinessContextBlock";
import LessonCards from "./LessonCards";
import TeardownCTA from "./TeardownCTA";
import ArticleBody from "./ArticleBody";
import InternalLinks from "./InternalLinks";

const TeardownLayout = ({ post }: { post: CroTeardownPost }) => {
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
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[60] h-[3px] w-0 bg-gradient-to-r from-primary to-[#ff9b6d]"
      />
      <Navigation />
      <main>
        <article>
          <TeardownHero post={post} />

          <div className="rounded-t-[32px] bg-white py-12 text-[#11111f] shadow-[0_-36px_90px_rgba(0,0,0,0.25)] md:py-14">
            <div className="container mx-auto grid max-w-[1320px] gap-10 px-6 lg:grid-cols-[210px_minmax(0,880px)_210px] lg:items-start">

              {/* Left sidebar — TOC */}
              <aside className="hidden lg:block">
                <nav
                  aria-label="Article contents"
                  className="sticky top-24 rounded-[20px] border border-[#11111f]/10 bg-[#fbfbfe] p-5"
                >
                  <div className="mb-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#777287]">
                    In this teardown
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

              {/* Main content */}
              <div className="min-w-0 space-y-16">

                {/* 1. Summary cards */}
                <section id="summary" className="scroll-mt-28">
                  <SummaryCards cards={post.summaryCards} />
                </section>

                {/* 2. Visual timeline */}
                <ScreenshotTimeline snapshots={post.snapshots} companyName={post.companyName} />

                {/* 3. Screenshot analysis */}
                <section id="analysis" className="scroll-mt-28 space-y-12">
                  <div>
                    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                      Screenshot analysis
                    </span>
                    <h2 className="mb-2 font-display text-[31px] font-bold leading-[1.02] text-[#11101a] md:text-[38px]">
                      Biggest visible changes
                    </h2>
                    <p className="text-[15px] leading-[1.6] text-[#5b5468]">
                      Three moments that capture the arc of the evolution.
                    </p>
                  </div>
                  {post.analysisBlocks.map((block) => (
                    <ScreenshotAnalysisBlock key={block.id} block={block} />
                  ))}
                </section>

                {/* 4. Messaging evolution */}
                <MessagingEvolution
                  changes={post.messagingChanges}
                  fromLabel={post.fromLabel}
                  toLabel={post.toLabel}
                />

                {/* 5. CTA evolution */}
                <CtaEvolutionTable
                  ctaAdded={post.ctaAdded}
                  ctaRemoved={post.ctaRemoved}
                  h2Added={post.h2Added}
                  h2Removed={post.h2Removed}
                  mode="cta"
                />

                {/* 6. Section heading changes */}
                <CtaEvolutionTable
                  ctaAdded={post.ctaAdded}
                  ctaRemoved={post.ctaRemoved}
                  h2Added={post.h2Added}
                  h2Removed={post.h2Removed}
                  mode="headings"
                />

                {/* 7. Why it changed — business context (new articles) */}
                {post.businessContext && (
                  <BusinessContextBlock post={post} />
                )}

                {/* 8. Patterns worth borrowing */}
                <section id="lessons" className="scroll-mt-28 space-y-6">
                  <div className="rounded-[20px] bg-[#11111f] px-6 py-5">
                    <span className="text-[11px] font-black uppercase tracking-[0.09em] text-[#ff9b6d]">
                      Patterns worth borrowing
                    </span>
                    <h2 className="mt-1 font-display text-[26px] font-bold leading-[1.1] text-white md:text-[30px]">
                      What SaaS teams can study
                    </h2>
                  </div>
                  <LessonCards lessons={post.lessonCards} companyName={post.companyName} />
                </section>

                {/* Legacy article body — rendered only when businessContext is absent (old articles) */}
                {!post.businessContext && post.articleBody && (
                  <ArticleBody markdown={post.articleBody} />
                )}

                {/* Related SaaS growth resources */}
                {post.internalLinkSuggestions && post.internalLinkSuggestions.length > 0 && (
                  <InternalLinks suggestions={post.internalLinkSuggestions} />
                )}

                {/* Phase 4G CTA — CRO diagnosis */}
                <section className="rounded-[28px] bg-[#11111f] px-8 py-10 text-white shadow-[0_24px_70px_rgba(7,7,17,0.22)]">
                  <h2 className="mb-3 font-display text-[26px] font-bold leading-[1.1] md:text-[30px]">
                    Want this kind of teardown for your SaaS?
                  </h2>
                  <p className="mb-6 max-w-[540px] text-[15.5px] leading-[1.6] text-[#c5bfd3]">
                    If your homepage has traffic but weak demos, the problem may not be acquisition.
                    It may be clarity, trust, CTA structure, or conversion path friction.
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/conversion-rate-optimisation-specialist">
                      Book a SaaS CRO diagnosis
                    </Link>
                  </Button>
                </section>

                {/* Final CTA */}
                <TeardownCTA
                  title={post.cta.title}
                  body={post.cta.body}
                  button={post.cta.button}
                />

                {/* Author */}
                <section className="grid gap-5 rounded-[24px] border border-[#11111f]/10 bg-[#fbfbfe] p-6 md:grid-cols-[64px_1fr]">
                  <div className="h-16 w-16 rounded-full bg-[linear-gradient(135deg,#ff5b1f,#7c3cff)] shadow-[0_16px_36px_rgba(255,91,31,0.2)]" />
                  <div>
                    <strong className="text-lg text-[#11111f]">{post.author}</strong>
                    <p className="mb-0 mt-1 text-[15.5px] leading-[1.55] text-[#5b5466]">
                      {post.authorBio}
                    </p>
                  </div>
                </section>

                {/* Related posts */}
                <section>
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
                        <strong className="my-2 block leading-tight text-[#11111f]">
                          {related.title}
                        </strong>
                        <span className="text-sm text-[#6b6475]">{related.description}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right sidebar — audit CTA */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 rounded-[20px] bg-[#11111f] p-5 text-white shadow-[0_24px_70px_rgba(7,7,17,0.22)]">
                  <strong className="mb-2 block text-[15px] leading-tight">
                    Need your page audited?
                  </strong>
                  <p className="mb-4 text-[13px] leading-[1.5] text-[#c5bfd3]">
                    I review the traffic source, message match, proof, CTA path, and mobile speed.
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

export default TeardownLayout;
