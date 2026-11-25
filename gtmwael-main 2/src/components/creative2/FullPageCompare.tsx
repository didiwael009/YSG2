import { useCallback, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { CREATIVE2_COPY } from "@/content/creative2";
import SectionDivider from "@/components/SectionDivider";
import ExperienceSection from "@/components/ExperienceSection";
import ServicesSection from "@/components/ServicesSection";
import CreativeWorkflowSection from "@/components/CreativeWorkflowSection";
import CaseStudyBar from "@/components/CaseStudyBar";
import TestimonialSection from "@/components/TestimonialSection";
import GTMSystemSection from "@/components/GTMSystemSection";
import SaasHeroLayer from "./SaasHeroLayer";
import CreativeHeroLayer from "./CreativeHeroLayer";
import C2Experience from "./C2Experience";
import C2Services from "./C2Services";
import C2Work from "./C2Work";
import C2Testimonials from "./C2Testimonials";
import C2Process from "./C2Process";
import { START_PERCENT, nextPercentForKey, percentFromPointer, revealPercent } from "./slider";
import { useSyncedBlocks } from "./useSyncedBlocks";
import { useSyncedPairs } from "./useSyncedPairs";

/** The homepage's testimonial band under the hero (HeroSection), as on the homepage. */
const SaasBand = () => (
  <section className="relative bg-background border-y border-border/40">
    <div className="container px-4 py-8 md:py-10">
      <blockquote className="max-w-3xl mx-auto border-l-2 border-primary pl-5 text-left">
        <p className="text-base md:text-lg text-foreground/90 leading-snug">
          "Shipped more in two weeks than our last full-time hire did in a quarter."
        </p>
        <footer className="text-sm text-muted-foreground mt-2">Khoubeib, Founder of Zembra</footer>
      </blockquote>
    </div>
  </section>
);

/** The same band in style A, as on /creative-2. */
const CreativeBand = () => {
  const band = CREATIVE2_COPY.band;
  return (
    <section className="relative border-y border-black/10" style={{ background: "#f4f3ee", color: "#0e0e0e" }}>
      <div className="container px-4 py-8 md:py-10">
        <blockquote className="max-w-3xl mx-auto border-l-2 border-[#0e0e0e] pl-5 text-left">
          <p className="text-base md:text-lg leading-snug">"{band.quote}"</p>
          <footer className="text-sm mt-2" style={{ color: "#333" }}>{band.author}</footer>
        </blockquote>
      </div>
    </section>
  );
};

const Pair = ({ name, children }: { name: string; children: ReactNode }) => (
  <div data-pair={name}>
    <div>{children}</div>
  </div>
);

/**
 * Test version of the before/after slider over the whole page: the homepage below,
 * /creative-2 on top, clipped from the left at --p. Each pair of sections gets the
 * same height on both sides, so they line up all the way down.
 */
const FullPageCompare = () => {
  const [p, setP] = useState(START_PERCENT);
  const box = useRef<HTMLDivElement>(null);
  const saas = useRef<HTMLDivElement>(null);
  const creative = useRef<HTMLDivElement>(null);
  const saasHero = useRef<HTMLDivElement>(null);
  const creativeHero = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  useSyncedBlocks(saasHero, creativeHero);
  useSyncedPairs(saas, creative);

  // The SaaS side stays clickable where it shows, but out of the tab order, and its ids
  // go so in-page links land on the creative side's sections (same y).
  useEffect(() => {
    const root = saas.current;
    if (!root) return;
    root.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach((el) => el.setAttribute("tabindex", "-1"));
    root.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  }, []);

  const fromPointer = useCallback((clientX: number) => {
    const el = box.current;
    if (el) setP(percentFromPointer(clientX, el.getBoundingClientRect()));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromPointer(e.clientX);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = nextPercentForKey(p, e.key);
    if (next === null) return;
    e.preventDefault();
    setP(next);
  };
  const onCreativeFocus = (e: FocusEvent<HTMLDivElement>) => {
    const el = box.current;
    if (!el) return;
    const next = revealPercent(p, e.target.getBoundingClientRect(), el.getBoundingClientRect());
    if (next !== null) setP(next);
  };

  return (
    <div ref={box} className="relative" style={{ touchAction: "pan-y pinch-zoom", "--p": `${p}%` } as CSSProperties}>
      <div ref={saas} data-side="saas" aria-hidden="true" className="isolate">
        <Pair name="hero"><div ref={saasHero}><SaasHeroLayer /></div></Pair>
        <Pair name="band"><SaasBand /></Pair>
        <Pair name="d1"><SectionDivider variant="glow" /></Pair>
        <Pair name="experience"><ExperienceSection /></Pair>
        <Pair name="d2"><SectionDivider variant="curve-to-light" /></Pair>
        <Pair name="services"><ServicesSection /></Pair>
        <Pair name="d3"><SectionDivider variant="curve-to-dark" /></Pair>
        <Pair name="work"><CreativeWorkflowSection /><CaseStudyBar /></Pair>
        <Pair name="d4"><SectionDivider variant="curve-to-light" /></Pair>
        <Pair name="proof"><TestimonialSection /></Pair>
        <Pair name="d5"><SectionDivider variant="curve-to-dark" /></Pair>
        <Pair name="process"><GTMSystemSection /></Pair>
      </div>
      <div
        ref={creative}
        data-side="creative"
        onFocus={onCreativeFocus}
        className="absolute inset-0 z-10 isolate bg-background"
        style={{ clipPath: "inset(0 0 0 var(--p))" }}
      >
        <Pair name="hero"><div ref={creativeHero}><CreativeHeroLayer /></div></Pair>
        <Pair name="band"><CreativeBand /></Pair>
        <Pair name="d1"><SectionDivider variant="glow" /></Pair>
        <Pair name="experience"><C2Experience /></Pair>
        <Pair name="d2"><SectionDivider variant="curve-to-light" /></Pair>
        <Pair name="services"><C2Services /></Pair>
        <Pair name="d3"><SectionDivider variant="curve-to-dark" /></Pair>
        <Pair name="work"><C2Work /></Pair>
        <Pair name="d4"><SectionDivider variant="curve-to-light" /></Pair>
        <Pair name="proof"><C2Testimonials /></Pair>
        <Pair name="d5"><SectionDivider variant="curve-to-dark" /></Pair>
        <Pair name="process"><C2Process /></Pair>
      </div>

      {/* Handle: a 2px line down the whole compare area; the knob stays mid-screen while you scroll. */}
      <div className="absolute inset-y-0 z-20 w-0 pointer-events-none" style={{ left: "var(--p)" }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.25)" }} />
        <div className="sticky left-0 h-0" style={{ top: "50vh" }}>
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2.5 rounded-full bg-[#0e0e0e] px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-orange-400">SAAS</span>
            <div
              role="slider"
              aria-label="Compare SaaS and creative"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(p)}
              aria-valuetext={`${Math.round(p)}% SaaS`}
              aria-orientation="horizontal"
              tabIndex={0}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              className="pointer-events-auto flex h-12 w-12 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-[#0e0e0e] text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6f432]"
              style={{ touchAction: "none" }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </div>
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 rounded-full bg-[#0e0e0e] px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-white">CREATIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageCompare;
