/**
 * CroTeardownIndex.tsx — /cro-teardowns/
 *
 * Lists all published CRO teardown articles from the content system.
 * No API calls. Fully static from src/content/cro-teardown/index.ts.
 */

import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { croTeardownPosts } from "@/lib/cro-teardown";
import type { CroTeardownPost } from "@/lib/cro-teardown";

// ─── Score badge ──────────────────────────────────────────────────────────────

const ScoreBadge = ({ label, value }: { label: string; value: number }) => {
  const color =
    value >= 90 ? "text-green-700 bg-green-50 border-green-200" :
    value >= 80 ? "text-blue-700 bg-blue-50 border-blue-200" :
                  "text-amber-700 bg-amber-50 border-amber-200";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${color}`}
    >
      {label} {value}/100
    </span>
  );
};

// ─── Article card ─────────────────────────────────────────────────────────────

const ArticleCard = ({ post }: { post: CroTeardownPost }) => {
  const judgeScore  = (post as { finalJudgeScore?: number }).finalJudgeScore;
  const seoScore    = (post as { seoScore?: number }).seoScore;
  const publishedAt = post.publishedAt;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : post.datePublished;

  return (
    <Link
      to={`/cro-teardowns/${post.slug}/`}
      className="group flex flex-col rounded-[24px] border border-[#11111f]/10 bg-[#fbfbfe] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,7,17,0.09)]"
    >
      {/* Category chip */}
      <small className="mb-3 block text-[11px] font-black uppercase tracking-[0.08em] text-primary">
        CRO Teardown
      </small>

      {/* Company + period */}
      <div className="mb-1 flex items-baseline gap-2">
        <h2 className="font-display text-[22px] font-bold leading-tight text-[#11101a] group-hover:text-primary transition-colors">
          {post.companyName}
        </h2>
        <span className="text-[13px] text-[#9390a0]">
          {post.fromLabel} → {post.toLabel}
        </span>
      </div>

      {/* Article title */}
      <p className="mb-3 text-[13px] font-semibold text-[#554f63]">{post.title}</p>

      {/* Description */}
      <p className="mb-5 grow text-[14.5px] leading-[1.6] text-[#6b6475]">
        {post.description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#11111f]/8 pt-4">
        <div className="flex flex-wrap gap-2">
          {judgeScore !== undefined && (
            <ScoreBadge label="Quality" value={judgeScore} />
          )}
          {seoScore !== undefined && (
            <ScoreBadge label="SEO" value={seoScore} />
          )}
        </div>
        <span className="text-[12px] text-[#9390a0]">{formattedDate}</span>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-primary">
        Read teardown
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
      </div>
    </Link>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CroTeardownIndex = () => {
  // Title / meta / JSON-LD handled globally by SeoManager via getSeoRoute.
  return (
    <div className="min-h-screen bg-[#070711] text-white">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 pt-24 md:pt-32">
          <div className="max-w-[660px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5">
              <BarChart2 className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
              <span className="text-[11px] font-black uppercase tracking-[0.09em] text-primary">
                CRO Teardowns
              </span>
            </div>

            <h1 className="mb-5 font-display text-[40px] font-bold leading-[1.05] md:text-[54px]">
              SaaS homepage teardowns
            </h1>

            <p className="mb-8 text-[17px] leading-[1.7] text-[#b8b4c8]">
              Evidence-based SaaS homepage teardowns. Built to show where trust, messaging,
              CTA structure, and conversion paths improve before scaling traffic.
            </p>

            <p className="text-[14px] leading-[1.65] text-[#9390a0]">
              Each teardown compares historical snapshots to map observable changes in
              headlines, navigation, CTAs, and page structure — without inventing metrics
              or claiming confirmed strategy.
            </p>
          </div>
        </section>

        {/* Article grid */}
        <section className="rounded-t-[32px] bg-white py-14 text-[#11111f] shadow-[0_-36px_90px_rgba(0,0,0,0.25)]">
          <div className="container mx-auto max-w-[1320px] px-6">

            {croTeardownPosts.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <Search className="h-10 w-10 text-[#c5bfd3]" />
                <p className="text-[#9390a0]">No teardowns published yet. Check back soon.</p>
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-[28px] font-bold text-[#11101a]">
                    Published teardowns
                  </h2>
                  <span className="text-[13px] text-[#9390a0]">
                    {croTeardownPosts.length} article{croTeardownPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {croTeardownPosts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}

            {/* Bottom CTA */}
            <div className="mt-16 rounded-[28px] bg-[#11111f] px-8 py-10 text-white shadow-[0_24px_70px_rgba(7,7,17,0.18)]">
              <h3 className="mb-3 font-display text-[24px] font-bold leading-[1.1]">
                Want your SaaS homepage torn down?
              </h3>
              <p className="mb-6 max-w-[500px] text-[15px] leading-[1.6] text-[#c5bfd3]">
                If your homepage has traffic but weak demos, the problem may not be acquisition.
                It may be clarity, trust, CTA structure, or conversion path friction.
              </p>
              <Link
                to="/conversion-rate-optimisation-specialist"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                Book a SaaS CRO diagnosis
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CroTeardownIndex;
