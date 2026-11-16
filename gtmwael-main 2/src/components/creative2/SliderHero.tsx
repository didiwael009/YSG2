import { useCallback, useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { CREATIVE2_COPY } from "@/content/creative2";
import SaasHeroLayer from "./SaasHeroLayer";
import CreativeHeroLayer from "./CreativeHeroLayer";
import { START_PERCENT, nextPercentForKey, percentFromPointer, revealPercent } from "./slider";
import { useSyncedBlocks } from "./useSyncedBlocks";

/**
 * Before/after hero: the SaaS hero below, the creative (style A) hero on top,
 * clipped from the left at --p. Drag the handle, or use the arrow keys on it.
 */
const SliderHero = () => {
  const [p, setP] = useState(START_PERCENT);
  const box = useRef<HTMLDivElement>(null);
  const saas = useRef<HTMLDivElement>(null);
  const creative = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  useSyncedBlocks(saas, creative);

  // The SaaS layer stays clickable where it shows, but out of the tab order:
  // keyboard users reach the same actions on the creative layer.
  useEffect(() => {
    saas.current?.querySelectorAll("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
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

  // Keyboard focus on a creative control hidden under the SaaS side moves the handle to show it.
  const onCreativeFocus = (e: FocusEvent<HTMLDivElement>) => {
    const el = box.current;
    if (!el) return;
    const next = revealPercent(p, e.target.getBoundingClientRect(), el.getBoundingClientRect());
    if (next !== null) setP(next);
  };

  const band = CREATIVE2_COPY.band;
  return (
    <>
      <section aria-label="Hero" ref={box} className="relative overflow-hidden" style={{ touchAction: "pan-y pinch-zoom", "--p": `${p}%` } as CSSProperties}>
        <div ref={saas} className="isolate">
          <SaasHeroLayer />
        </div>
        <div ref={creative} onFocus={onCreativeFocus} className="absolute inset-0 z-10 isolate" style={{ clipPath: "inset(0 0 0 var(--p))" }}>
          <CreativeHeroLayer />
        </div>

        {/* Handle: a 2px line with a round knob; the knob is the slider control. */}
        <div className="absolute inset-y-0 z-20 w-0 pointer-events-none" style={{ left: "var(--p)" }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.25)" }} />
          <div className="absolute top-[250px] md:top-[280px] lg:top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
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
      </section>

      {/* Testimonial band, in the homepage's position, style A. */}
      <section className="relative border-y border-black/10" style={{ background: "#f4f3ee", color: "#0e0e0e" }}>
        <div className="container px-4 py-8 md:py-10">
          <blockquote className="max-w-3xl mx-auto border-l-2 border-[#0e0e0e] pl-5 text-left">
            <p className="text-base md:text-lg leading-snug">"{band.quote}"</p>
            <footer className="text-sm mt-2" style={{ color: "#333" }}>{band.author}</footer>
          </blockquote>
        </div>
      </section>
    </>
  );
};

export default SliderHero;
