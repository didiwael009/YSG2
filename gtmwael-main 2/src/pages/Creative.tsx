import { ArrowRight, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResponsiveImage from "@/components/ResponsiveImage";
import C2Work from "@/components/creative2/C2Work";
import { CREAM, HEAVY, INK, LIME, SERIF } from "@/components/creative2/style";
import { BOOKING_URL } from "@/lib/constants";
import { rebrandingProjects } from "@/lib/rebrand-data";

const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6f432]";

/** "Full SaaS rebrand — Led complete..." → ["Full SaaS rebrand", "Led complete..."], shown without the dash. */
const splitDescription = (d: string) => {
  const [kicker, ...rest] = d.split(" — ");
  return rest.length ? { kicker, text: rest.join(" ") } : { kicker: "", text: d };
};

/** The brand projects kept on this page, in this order. */
const SHOWN = ["Shipzzer", "Zembra", "BottleNexus"];

const Creative = () => {
  const shown = SHOWN.map((t) => rebrandingProjects.find((r) => r.title === t)).filter(
    (r): r is (typeof rebrandingProjects)[number] => Boolean(r),
  );

  return (
    <div className="min-h-screen overflow-x-clip font-body" style={{ background: INK }}>
      <Navigation />

      <main id="main">
        {/* Hero, in the homepage creative style: cream, lime badge, heavy line + italic serif line. */}
        <section className="relative pb-16 pt-32 md:pb-24 md:pt-40" style={{ background: CREAM, color: INK }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <span
              className="mb-6 inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.04em]"
              style={{ background: LIME, color: INK }}
            >
              Creative Portfolio
            </span>
            <h1 className="leading-[0.95] tracking-[-0.035em]">
              <span className="block text-6xl md:text-8xl lg:text-9xl" style={HEAVY}>Work That</span>
              <span className="mt-2 block text-6xl md:text-8xl lg:text-9xl" style={SERIF}>Speaks For Itself</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/70 md:text-xl">
              From viral videos to high-converting landing pages. Creative assets engineered for attention and action.
            </p>
          </div>
        </section>

        {/* Brand projects: three cases, with their real pages. */}
        <section aria-labelledby="folio-brands-title" style={{ background: INK, color: CREAM }}>
          <div className="mx-auto max-w-7xl px-5 pb-6 pt-16 sm:px-8 lg:px-10 lg:pt-24">
            <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: LIME }}>Brand projects</p>
                <h2 id="folio-brands-title" className="leading-[0.95] tracking-[-0.03em]">
                  <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>Rebranding &amp;</span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl" style={SERIF}>Landing Pages</span>
                </h2>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-white/75">Full brand transformations and conversion-optimized pages</p>
            </div>

            {/* Stacked case cards: on large screens each one sticks and the next slides over it. */}
            <ol className="space-y-8 pb-10 lg:space-y-16">
              {shown.map((r, i) => {
                const d = splitDescription(r.description);
                const host = new URL(r.link).hostname.replace(/^www\./, "");
                return (
                  <li key={r.title} className="lg:sticky" style={{ top: `${96 + i * 28}px` }}>
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group grid overflow-hidden rounded-[28px] border border-white/10 bg-[#171717] shadow-[0_-24px_60px_rgba(0,0,0,0.45)] hover:border-white/25 lg:grid-cols-[1fr_1.5fr] ${focusStyle}`}
                    >
                      <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-6xl leading-none md:text-7xl" style={{ ...SERIF, color: LIME }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
                            {r.category}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">{r.role}</p>
                          <p className="mt-3 text-4xl leading-none md:text-5xl" style={HEAVY}>{r.title}</p>
                          {d.kicker && <p className="mt-4 text-2xl" style={{ ...SERIF, color: LIME }}>{d.kicker}</p>}
                          <p className="mt-3 max-w-sm text-base leading-relaxed text-white/75">{d.text}</p>
                          <span
                            className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform group-hover:translate-x-1"
                            style={{ background: LIME, color: INK }}
                          >
                            View project
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>
                      </div>

                      {/* The real page, in a browser window. */}
                      <div className="order-first flex items-center p-3 md:p-6 lg:order-none lg:pl-0">
                        <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-0.6deg]">
                          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3" aria-hidden="true">
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            <span className="ml-3 truncate rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/55">{host}</span>
                          </div>
                          <div className="aspect-[1920/996] overflow-hidden">
                            <ResponsiveImage
                              src={r.cover}
                              alt={`${r.title} landing page`}
                              sizes="(min-width: 1024px) 55vw, 100vw"
                              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Videos, ads, social posts and apps, as on the homepage. */}
        <C2Work showBrands={false} />

        {/* Closing call, in the homepage creative style. */}
        <section aria-labelledby="folio-cta-title" className="pb-24 pt-8 md:pb-32" style={{ background: INK, color: CREAM }}>
          <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
            <h2 id="folio-cta-title" className="leading-[0.95] tracking-[-0.03em]">
              <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>Need Creative</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl" style={SERIF}>That Converts?</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Let's discuss your next project and create something that drives real results.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-base font-bold hover:brightness-95 ${focusStyle}`}
              style={{ background: LIME, color: INK }}
            >
              Book a Call
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Creative;
