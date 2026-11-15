import { useEffect, type RefObject } from "react";

/**
 * Gives each [data-pair] wrapper in both sides a min-height equal to the taller of the two
 * sections it holds, so every section starts at the same y on both sides. It measures the
 * section inside each wrapper (not the wrapper), so setting the min-height never re-triggers it.
 */
export function useSyncedPairs(a: RefObject<HTMLElement>, b: RefObject<HTMLElement>): void {
  useEffect(() => {
    const ra = a.current;
    const rb = b.current;
    if (!ra || !rb) return;
    let frame = 0;

    const pairs = (root: HTMLElement) => Array.from(root.querySelectorAll<HTMLElement>("[data-pair]"));
    const inner = (el: HTMLElement) => (el.firstElementChild as HTMLElement | null) ?? el;

    const sync = () => {
      const pa = pairs(ra);
      const pb = new Map(pairs(rb).map((el) => [el.dataset.pair!, el]));
      for (const el of pa) {
        const other = pb.get(el.dataset.pair!);
        if (!other) continue;
        const h = Math.max(inner(el).getBoundingClientRect().height, inner(other).getBoundingClientRect().height);
        el.style.minHeight = `${h}px`;
        other.style.minHeight = `${h}px`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    for (const el of [...pairs(ra), ...pairs(rb)]) ro.observe(inner(el));
    // Lazy images change section heights after mount.
    ra.addEventListener("load", schedule, true);
    rb.addEventListener("load", schedule, true);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      ra.removeEventListener("load", schedule, true);
      rb.removeEventListener("load", schedule, true);
    };
  }, [a, b]);
}
