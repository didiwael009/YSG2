import { ArrowUpRight } from "lucide-react";
import { AGENCY_WORK } from "@/content/agency";
import { ExternalLink } from "./ExternalLink";
import { CREAM, HEAVY, INK, LIME, SERIF, SectionHeading } from "./style";

/** Dark work section: Pilau as a cream stack card, then Fedi's four Behance projects. */
const AgencyWork = () => {
  const w = AGENCY_WORK;
  const p = w.pilau;
  return (
    <section id="work" aria-labelledby="agency-work-title" className="pb-20 pt-6 md:pb-24" style={{ background: INK, color: CREAM }}>
      <div className="container px-4">
        <SectionHeading eyebrow={w.eyebrow} line1={w.line1} line2={w.line2} id="agency-work-title" align="left" tone="dark" />

        <article className="relative mt-12 overflow-hidden rounded-3xl px-5 pb-8 pt-6 sm:px-11 sm:pb-10" style={{ background: CREAM, color: INK }}>
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: LIME }} />
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-2xl" style={HEAVY}>{p.name}</h3>
            <p className="text-sm text-[#333]">{p.credit}</p>
          </div>
          <p className="mt-7 text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.03em]" style={HEAVY}>{p.word}</p>
          <p className="mb-7 mt-2 text-2xl md:text-[30px]" style={SERIF}>{p.tagline}</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {p.images.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={560}
                height={347}
                loading="lazy"
                className="block aspect-[560/347] w-full rounded-xl object-cover"
              />
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-5">
            <p className="max-w-[46ch] text-[#333]">{p.sentence}</p>
            <ExternalLink
              href={p.link.href}
              className="inline-flex min-h-[44px] items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              style={{ background: INK }}
            >
              {p.link.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </ExternalLink>
          </div>
        </article>

        <h3 className="mb-6 mt-16 text-[28px]" style={HEAVY}>
          Fedi Amami <span style={SERIF}>{w.fediTitle}</span>
        </h3>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {w.fediProjects.map((proj) => (
            <li key={proj.href}>
              <ExternalLink
                href={proj.href}
                className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] hover:border-white/30"
                style={{ color: CREAM }}
              >
                <img src={proj.image} alt={proj.alt} width={900} height={704} loading="lazy" className="block h-[190px] w-full object-cover" />
                <span className="flex items-start justify-between gap-3 px-5 py-[18px]">
                  <span>
                    <span className="block text-lg" style={HEAVY}>{proj.title}</span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">{proj.label}</span>
                  </span>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AgencyWork;
