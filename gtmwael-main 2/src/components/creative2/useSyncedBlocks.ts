import { useEffect, type RefObject } from "react";
import { maxHeights } from "./slider";

function blocks(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>("[data-block]"));
}

function measure(root: HTMLElement): Record<string, number> {
  const out: Record<string, number> = {};
  for (const el of blocks(root)) out[el.dataset.block!] = el.getBoundingClientRect().height;
  return out;
}

/**
 * Gives each data-block in both layers a min-height equal to the taller of its two
 * versions, so the blocks below line up at every width. Runs on mount, when a layer's
 * width changes, and when web fonts finish loading.
 */
export function useSyncedBlocks(a: RefObject<HTMLElement>, b: RefObject<HTMLElement>): void {
  useEffect(() => {
    const ra = a.current;
    const rb = b.current;
    if (!ra || !rb) return;
    let frame = 0;
    let lastWidth = -1;

    const sync = () => {
      // The text column sizes to its content; give layer b the width of layer a's column
      // so the photos beside them sit at the same x.
      const colA = ra.querySelector<HTMLElement>("[data-col]");
      const colB = rb.querySelector<HTMLElement>("[data-col]");
      if (colA && colB) {
        colB.style.width = "";
        colB.style.width = `${colA.getBoundingClientRect().width}px`;
      }
      const all = [...blocks(ra), ...blocks(rb)];
      for (const el of all) el.style.minHeight = "";
      const h = maxHeights(measure(ra), measure(rb));
      for (const el of all) el.style.minHeight = `${h[el.dataset.block!]}px`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    schedule();
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w === lastWidth) return;
      lastWidth = w;
      schedule();
    });
    ro.observe(ra);
    let alive = true;
    document.fonts?.ready.then(() => alive && schedule());
    // Fonts added later (Newsreader, Inter 800) fire loadingdone.
    const onFonts = () => schedule();
    document.fonts?.addEventListener?.("loadingdone", onFonts);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", onFonts);
    };
  }, [a, b]);
}
