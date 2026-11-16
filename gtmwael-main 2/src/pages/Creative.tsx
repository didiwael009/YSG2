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

const Creative = () => {
  const [featured, ...others] = rebrandingProjects;
  const f = splitDescription(featured.description);

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

        {/* Brand projects: one featured case, then the others, with their real pages. */}
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

            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] hover:border-white/30 lg:grid-cols-[1.6fr_1fr] ${focusStyle}`}
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[460px]">
                <ResponsiveImage
                  src={featured.cover}
                  alt={`${featured.title} landing page`}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-end p-6 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  {featured.category} · {featured.role}
                </p>
                <p className="mt-3 flex items-start justify-between gap-3 text-4xl leading-none md:text-5xl" style={HEAVY}>
                  {featured.title}
                  <ArrowUpRight className="mt-1 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                </p>
                {f.kicker && <p className="mt-5 text-2xl" style={{ ...SERIF, color: LIME }}>{f.kicker}</p>}
                <p className="mt-3 text-base leading-relaxed text-white/75">{f.text}</p>
              </div>
            </a>

            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((r) => {
                const d = splitDescription(r.description);
                return (
                  <li key={r.title}>
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:border-white/30 ${focusStyle}`}
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <ResponsiveImage
                          src={r.cover}
                          alt={`${r.title} landing page`}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5 md:p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          {r.category} · {r.role}
                        </p>
                        <p className="mt-2 flex items-start justify-between gap-3 text-2xl" style={HEAVY}>
                          {r.title}
                          <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        </p>
                        {d.kicker && <p className="mt-2 text-lg" style={{ ...SERIF, color: LIME }}>{d.kicker}</p>}
                        <p className="mt-1 text-sm leading-relaxed text-white/75">{d.text}</p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
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
