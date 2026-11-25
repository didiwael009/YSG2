import { memo } from "react";
import { ArrowRight } from "lucide-react";
import waelPhoto from "@/assets/wael-standing-bw.webp";
import waelPhoto480 from "@/assets/wael-standing-bw-480.webp";
import { BOOKING_URL } from "@/lib/constants";
import { CREATIVE2_COPY } from "@/content/creative2";
import { L, PHOTO_H, PHOTO_SIZES, PHOTO_W, photoSrcSet } from "./heroLayout";
import { HERO_LOGOS } from "./SaasHeroLayer";

const UPWORK_URL = "https://www.upwork.com/freelancers/~0172dd07fc1cdd655c";
const INK = "#0e0e0e";
const HALFTONE = "radial-gradient(#111 1.1px, transparent 1.6px) 0 0/5px 5px";
const HALOS = [
  { scale: 1.2, opacity: 0.14 },
  { scale: 1.13, opacity: 0.3 },
  { scale: 1.06, opacity: 0.6 },
];
const CARD_LINKS = ["#creative-workflow", "#experience"];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Style A ("cream magazine") version of the hero. Same layout and blocks as the SaaS layer. */
const CreativeHeroLayer = () => {
  const c = CREATIVE2_COPY.hero;
  // The halos only need the outline, so the small file is enough (and is the one phones already load).
  const mask = `url(${waelPhoto480}) center bottom/contain no-repeat`;
  return (
    <div data-layer="creative" className="relative font-body" style={{ background: "#f4f3ee", color: INK }}>
      <section className={L.section}>
        <div className={L.container}>
          <div className={L.inner}>
            <div className={L.row}>
              <div data-col className={L.textCol}>
                <div data-block="badge">
                  <a
                    href={UPWORK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${L.badge} rounded-full text-xs font-bold uppercase tracking-[0.02em] hover:brightness-95`}
                    style={{ background: "#c6f432", color: INK }}
                  >
                    {c.badge}
                  </a>
                </div>
                <h1 data-block="title" className={L.h1}>
                  <span className={L.titleSize} style={{ fontWeight: 800 }}>{c.titleLine1}</span>
                  <span
                    className={`${L.titleSize} mt-1.5`}
                    style={{ fontFamily: "Newsreader, Georgia, serif", fontStyle: "italic", fontWeight: 500, letterSpacing: "-0.02em", maxWidth: "12ch" }}
                  >
                    {c.titleLine2}
                  </span>
                </h1>
                <p data-block="subtitle" className={L.subtitle} style={{ color: "#333" }}>
                  {c.subtitle}
                </p>
                <div data-block="ctas" className={L.ctas}>
                  <div className="flex flex-col items-center">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${L.cta} group rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      style={{ background: INK }}
                    >
                      <span>{c.primaryCta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                    <p className={`${L.freeNote} italic`} style={{ color: "#333" }}>{c.freeNote}</p>
                  </div>
                  <a
                    href="#creative-workflow"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("creative-workflow");
                    }}
                    className={`${L.cta} rounded-xl font-semibold transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                    style={{ border: `1.5px solid ${INK}`, color: INK }}
                  >
                    {c.secondaryCta}
                  </a>
                </div>
                <div data-block="cards" className={L.cards}>
                  {c.cards.map((card, i) => (
                    <a
                      key={card.label}
                      href={CARD_LINKS[i]}
                      className={`${L.card} block border-black/10 bg-white/60 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      style={{ borderLeft: `4px solid ${INK}` }}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-lg font-bold">{card.label}</span>
                        <span className="text-xs" style={{ color: "#333" }}>{card.line} ↓</span>
                      </span>
                      <span className="mt-2 flex gap-5">
                        {card.stats.map(([value, unit]) => (
                          <span key={unit} className="flex items-baseline gap-1.5 text-xs" style={{ color: "#333" }}>
                            <span className="text-2xl font-bold leading-none" style={{ color: INK }}>{value}</span>
                            {unit}
                          </span>
                        ))}
                      </span>
                    </a>
                  ))}
                </div>
                <div data-block="logos" className={L.logos}>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#333" }}>{c.trustedBy}</p>
                  <div className={L.logoRow}>
                    {HERO_LOGOS.map((logo) => (
                      <button
                        key={logo.alt}
                        type="button"
                        onClick={() => scrollTo("experience")}
                        className="flex-shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                        aria-label={`View ${logo.alt} work`}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          width={80}
                          height={22}
                          loading="lazy"
                          style={{ height: `calc(${logo.height} * 0.85)` }}
                          className="w-auto brightness-0 opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div data-block="photo" className={L.photoWrap}>
                {/* Frame with corner mark, sized from the mockup's .A .frame / .corner rules. */}
                <div className="absolute pointer-events-none" style={{ left: "3.1%", top: "9.5%", width: "102.9%", height: "90.5%", border: "1.5px solid #111" }} />
                <div className="absolute pointer-events-none" style={{ left: "93.8%", top: "12.4%", width: "6%", aspectRatio: "1", borderTop: "2px solid #111", borderRight: "2px solid #111" }} />
                {HALOS.map((h) => (
                  <div
                    key={h.scale}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: HALFTONE,
                      WebkitMask: mask,
                      mask,
                      transform: `scale(${h.scale})`,
                      transformOrigin: "50% 100%",
                      opacity: h.opacity,
                    }}
                  />
                ))}
                <img
                  src={waelPhoto}
                  srcSet={photoSrcSet(waelPhoto480, waelPhoto)}
                  sizes={PHOTO_SIZES}
                  alt="Wael Aouididi"
                  width={PHOTO_W}
                  height={PHOTO_H}
                  {...({ fetchpriority: "high" } as Record<string, string>)}
                  decoding="async"
                  className={L.photo}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(CreativeHeroLayer);
