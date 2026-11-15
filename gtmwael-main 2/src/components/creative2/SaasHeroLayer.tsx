import { memo } from "react";
import { PrimaryCTA, SecondaryCTA } from "@/components/HeroCTA";
import zembraLogo from "@/assets/zembra-logo.svg";
import bottlenexusLogo from "@/assets/bottlenexus-logo-white.svg";
import shipzzerLogoWhite from "@/assets/shipzzer-logo-white.png";
import waelPhoto from "@/assets/wael-standing-color.webp";
import { L, PHOTO_H, PHOTO_W } from "./heroLayout";

const UPWORK_PATH =
  "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.214-1.832-2.148-4.032-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z";

export const HERO_LOGOS = [
  { src: zembraLogo, alt: "Zembra", invert: true, height: "22px" },
  { src: bottlenexusLogo, alt: "BottleNexus", invert: true, height: "22px" },
  { src: shipzzerLogoWhite, alt: "Shipzzer", invert: false, height: "20px" },
];

export { UPWORK_PATH };

/** The homepage SaaS hero, redrawn with the new photo. Hidden from assistive tech; its links stay clickable where this side shows. */
const SaasHeroLayer = () => (
  <div data-layer="saas" aria-hidden="true" className="relative bg-hero-gradient">
    <section className={L.section}>
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[500px] bg-[hsl(260_60%_50%/0.12)] rounded-full blur-[120px] z-0" />
      <div className={L.container}>
        <div className={L.inner}>
          <div className={L.row}>
            <div data-col className={L.textCol}>
              <div data-block="badge">
                <span className={`${L.badge} rounded-full`} style={{ background: "linear-gradient(135deg, #14a800, #3c8224)" }}>
                  <svg viewBox="0 0 24 24" fill="#fff" className="w-3.5 h-3.5 flex-shrink-0"><path d={UPWORK_PATH} /></svg>
                  <span className="text-xs font-semibold text-white">Top Rated on Upwork</span>
                </span>
              </div>
              <h1 data-block="title" className={`${L.h1} font-display`}>
                <span className={`${L.titleSize} text-foreground`}>Automated growth for SaaS.</span>
                <span className={`${L.titleSize} text-gradient mt-1.5`}>One operator. AI agents.</span>
              </h1>
              <p data-block="subtitle" className={`${L.subtitle} text-muted-foreground`}>
                I improve your landing pages, automate content production and run your ads.
              </p>
              <div data-block="ctas" className={L.ctas}>
                <div className="flex flex-col items-center">
                  <PrimaryCTA href="/book">Book a free 20-min audit</PrimaryCTA>
                  <p className={`${L.freeNote} text-muted-foreground`}>Free · no commitment</p>
                </div>
                <SecondaryCTA href="/pricing">See Offers</SecondaryCTA>
              </div>
              <div data-block="cards" className={L.cards}>
                {[
                  { label: "Convert", line: "CRO, outbound, ads", stats: [["4×", "revenue"], ["3×", "CVR"]], accent: "text-purple-300", bar: "bg-purple-500" },
                  { label: "Produce", line: "Content at scale", stats: [["134", "posts"], ["3", "languages"]], accent: "text-orange-400", bar: "bg-orange-500" },
                ].map((door) => (
                  <span key={door.label} className={`${L.card} block rounded-xl border-border/40 bg-foreground/[0.03]`}>
                    <span className={`absolute inset-y-0 left-0 w-1 ${door.bar}`} />
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg font-bold text-foreground">{door.label}</span>
                      <span className="text-xs text-muted-foreground">{door.line} ↓</span>
                    </span>
                    <span className="mt-2 flex gap-5">
                      {door.stats.map(([value, unit]) => (
                        <span key={unit} className="flex items-baseline gap-1.5 text-xs text-muted-foreground">
                          <span className={`font-display text-2xl font-bold leading-none ${door.accent}`}>{value}</span>
                          {unit}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </div>
              <div data-block="logos" className={L.logos}>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Trusted by founders at</p>
                <div className={L.logoRow}>
                  {HERO_LOGOS.map((logo) => (
                    <img
                      key={logo.alt}
                      src={logo.src}
                      alt=""
                      width={80}
                      height={22}
                      style={{ height: `calc(${logo.height} * 0.85)` }}
                      className={`w-auto opacity-50 ${logo.invert ? "brightness-0 invert grayscale" : "grayscale"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div data-block="photo" className={L.photoWrap}>
              <div
                className="absolute pointer-events-none z-0"
                style={{
                  top: "-10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "380px",
                  maxWidth: "100%",
                  height: "380px",
                  background: "radial-gradient(circle, rgba(122, 92, 255, 0.35) 0%, rgba(122, 92, 255, 0.12) 40%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />
              <img
                src={waelPhoto}
                alt=""
                width={PHOTO_W}
                height={PHOTO_H}
                decoding="async"
                className={L.photo}
                style={{ filter: "drop-shadow(0 40px 60px rgba(0, 0, 0, 0.45)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.25))" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default memo(SaasHeroLayer);
