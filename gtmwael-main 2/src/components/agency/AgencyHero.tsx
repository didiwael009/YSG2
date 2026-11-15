import { ArrowRight } from "lucide-react";
import { AGENCY_HERO, AGENCY_HERO_IMAGE, AGENCY_TEAM } from "@/content/agency";
import { ExternalLink } from "./ExternalLink";
import { CREAM, HEAVY, INK, LIME, SERIF } from "./style";

const HALFTONE = "radial-gradient(#111 1.1px, transparent 1.6px) 0 0/5px 5px";

/** Cream hero: headline, two buttons, name cards, clients; Pilau image in the halftone frame. */
const AgencyHero = () => {
  const h = AGENCY_HERO;
  return (
    <section id="top" aria-labelledby="agency-title" className="container px-4 py-16 md:py-20">
      <div className="flex flex-wrap items-center gap-12 lg:gap-14">
        <div className="min-w-0 flex-[1_1_520px]">
          <span className="inline-block px-3.5 py-2 text-xs font-bold uppercase tracking-wide" style={{ background: LIME, color: INK }}>
            {h.badge}
          </span>
          <h1 id="agency-title" className="mt-6 leading-[0.95] tracking-[-0.03em]">
            <span className="block text-[clamp(44px,6.4vw,92px)]" style={HEAVY}>{h.line1}</span>
            <span className="mt-1.5 block text-[clamp(48px,7vw,100px)]" style={SERIF}>{h.line2}</span>
          </h1>
          <p className="mt-9 max-w-[46ch] text-lg text-[#333] md:text-[19px]">{h.sub}</p>

          <div className="mt-7 flex flex-wrap gap-4">
            <ExternalLink
              href="/book"
              className="group inline-flex min-h-14 items-center gap-2.5 rounded-[14px] px-7 text-[17px] font-bold hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ background: INK, color: CREAM }}
            >
              Book a call
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </ExternalLink>
            <ExternalLink
              href="#work"
              className="inline-flex min-h-14 items-center rounded-[14px] border-2 px-7 text-[17px] font-bold hover:bg-black/5"
              style={{ borderColor: INK, color: INK }}
            >
              See the work
            </ExternalLink>
          </div>
          <p className="ml-10 mt-3 text-sm italic text-[#555]">Free · no commitment</p>

          <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {AGENCY_TEAM.people.map((p) => (
              <li
                key={p.id}
                className="border-l-4 bg-[#fbfaf7] px-[18px] py-4"
                style={{ borderLeftColor: p.id === "wael" ? LIME : INK }}
              >
                <p className="text-lg" style={HEAVY}>{p.short}</p>
                <p className="mt-0.5 text-sm text-[#444]">{p.role.split(",")[0]}</p>
              </li>
            ))}
          </ul>

          <p className="mb-2.5 mt-8 text-[13px] uppercase tracking-[0.16em] text-[#444]">{h.clientsLabel}</p>
          <p className="flex flex-wrap gap-x-7 gap-y-1.5 text-2xl text-[#3a3a3a]" style={HEAVY}>
            {h.clients.map((c) => <span key={c}>{c}</span>)}
          </p>
        </div>

        <figure className="relative min-w-0 flex-[1_1_420px] p-4 sm:p-6">
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.18]" style={{ background: HALFTONE }} />
          <div className="relative border-2 p-3.5" style={{ borderColor: INK, background: CREAM }}>
            <div aria-hidden="true" className="absolute right-[18px] top-[18px] z-[1] h-[34px] w-[34px] border-r-[3px] border-t-[3px]" style={{ borderColor: INK }} />
            <img
              src={AGENCY_HERO_IMAGE.src}
              alt={AGENCY_HERO_IMAGE.alt}
              width={560}
              height={700}
              className="block aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="relative mt-2.5 text-lg" style={SERIF}>{h.frameCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default AgencyHero;
