import { ArrowUpRight } from "lucide-react";
import { CREATIVE2_COPY } from "@/content/creative2";
import { videoProjects } from "@/lib/video-data";
import { brandsSpaced as brandsInOrder } from "@/lib/rebrand-data";
import { ADS_URL, POSTS_URL, adSamples, appSamples, postSamples, type Sample } from "@/lib/creative-samples";
import { CREAM, HEAVY, INK, LIME, SERIF } from "./style";


const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6f432]";

/** A label, a "See more on Behance" link, then a row of images at their own aspect ratio. */
const SampleRow = ({ id, label, link, linkLabel, items }: { id: string; label: string; link: string; linkLabel: string; items: Sample[] }) => (
  <div className="mt-14" role="group" aria-labelledby={id}>
    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
      <h3 id={id} className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{label}</h3>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline ${focusStyle}`}
      >
        {linkLabel}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
    <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scroll-px-5 scrollbar-hide sm:-mx-8 sm:px-8 sm:scroll-px-8 lg:-mx-10 lg:px-10 lg:scroll-px-10">
      {items.map((s) => (
        <li key={s.src} className="flex-shrink-0 snap-start">
          <img
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            loading="lazy"
            decoding="async"
            className="h-[240px] w-auto rounded-xl border border-white/10 sm:h-[300px]"
          />
        </li>
      ))}
    </ul>
  </div>
);

/** Each app: icon, name, one line, then its phone screens. */
const AppsRow = ({ label, lines }: { label: string; lines: Record<string, string> }) => (
  <div className="mt-14" role="group" aria-labelledby="c2-apps-title">
    <h3 id="c2-apps-title" className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60">{label}</h3>
    <ul className="grid gap-6 md:grid-cols-2">
      {appSamples.map((a) => (
        <li key={a.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-4">
            <img src={a.icon} alt="" width={64} height={64} loading="lazy" decoding="async" className="h-14 w-14 rounded-[14px]" />
            <div>
              {a.url ? (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-xl hover:underline ${focusStyle}`}
                  style={HEAVY}
                >
                  {a.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <p className="text-xl" style={HEAVY}>{a.name}</p>
              )}
              <p className="mt-1 text-sm leading-snug text-white/75">{lines[a.name]}</p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            {a.screens.map((sc) => (
              <img
                key={sc.src}
                src={sc.src}
                alt={sc.alt}
                width={sc.width}
                height={sc.height}
                loading="lazy"
                decoding="async"
                className="h-[300px] w-auto rounded-[22px] border-4 border-[#1c1c1c] sm:h-[340px]"
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Homepage CreativeWorkflowSection (teaser) + CaseStudyBar positions, style A:
 * the real video projects, ads, social posts and apps, then the brand projects row.
 */
const C2Work = ({ showBrands = true }: { showBrands?: boolean }) => {
  const c = CREATIVE2_COPY.work;
  return (
    <>
      <section
        id="creative-workflow"
        aria-labelledby="creative-workflow-title"
        className="scroll-mt-24 font-body"
        style={{ background: INK, color: CREAM }}
      >
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: LIME }}>{c.eyebrow}</p>
              <h2 id="creative-workflow-title" className="leading-[0.95] tracking-[-0.03em]">
                <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>{c.titleLine1}</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl" style={SERIF}>{c.titleLine2}</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/75">{c.intro}</p>
          </div>

          <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60">{c.videosLabel}</h3>
          <ul className="grid gap-6 md:grid-cols-3">
            {videoProjects.map((v) => (
              <li key={v.title}>
                <a
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:border-white/30 ${focusStyle}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={v.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">{v.platform}</p>
                    <p className="mt-2 flex items-start justify-between gap-3 text-xl" style={HEAVY}>
                      {v.title}
                      <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    </p>
                    <p className="mt-3 flex items-baseline gap-2">
                      <span className="text-4xl leading-none" style={{ ...HEAVY, color: LIME }}>{v.metric}</span>
                      <span className="text-sm text-white/75">{v.metricLabel}</span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <SampleRow id="c2-ads-title" label={c.adsLabel} link={ADS_URL} linkLabel={c.behanceLink} items={adSamples} />
          <SampleRow id="c2-posts-title" label={c.postsLabel} link={POSTS_URL} linkLabel={c.behanceLink} items={postSamples} />
          <AppsRow label={c.appsLabel} lines={c.appLines} />
        </div>
      </section>

      {/* Brand projects row, in the CaseStudyBar position. */}
      {showBrands && (
      <section aria-labelledby="c2-brands-title" className="py-16 font-body md:py-20" style={{ background: INK, color: CREAM }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h3 id="c2-brands-title" className="mb-8 text-2xl md:text-3xl" style={HEAVY}>{c.brandsLabel}</h3>
          <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide">
            {brandsInOrder.map((r) => (
              <li key={r.title} className="w-[250px] flex-shrink-0 snap-start sm:w-[280px] md:w-[320px]">
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:border-white/30 ${focusStyle}`}
                >
                  <div className="h-[180px] overflow-hidden sm:h-[200px]">
                    <img
                      src={r.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="flex items-center justify-between gap-3 text-lg" style={HEAVY}>
                      {r.title}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                      {r.category} · {r.role}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}
    </>
  );
};

export default C2Work;
