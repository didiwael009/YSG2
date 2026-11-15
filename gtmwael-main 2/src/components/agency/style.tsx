import type { CSSProperties } from "react";

/** Creative homepage style tokens, copied for /agency (creative-2 is not on main). */
export const INK = "#0e0e0e";
export const CREAM = "#f4f3ee";
export const LIME = "#c6f432";
export const SERIF: CSSProperties = { fontFamily: "Newsreader, Georgia, serif", fontStyle: "italic", fontWeight: 500 };
export const HEAVY: CSSProperties = { fontWeight: 800 };

type SectionHeadingProps = {
  eyebrow?: string;
  line1: string;
  line2: string;
  id: string;
  align?: "left" | "center";
  tone: "dark" | "light";
};

/** Lime eyebrow, heavy line, serif italic line. `id` goes on the h2 for aria-labelledby. */
export function SectionHeading({ eyebrow, line1, line2, id, align = "center", tone }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p
          className="mb-4 text-sm font-bold uppercase tracking-widest"
          style={{ color: tone === "dark" ? LIME : INK }}
        >
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="leading-[0.95] tracking-[-0.03em]" style={{ color: tone === "dark" ? CREAM : INK }}>
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>{line1}</span>
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={SERIF}>{line2}</span>
      </h2>
    </div>
  );
}
