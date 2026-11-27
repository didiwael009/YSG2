import { LIME, HEAVY, SERIF } from "@/components/creative2/style";

export const focusDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6f432]";
export const focusLight =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e0e0e]";

/** Eyebrow + two-line title (heavy, then serif italic), the creative-2 heading. */
export const Heading = ({
  id,
  eyebrow,
  line1,
  line2,
  dark,
  as: Tag = "h2",
}: {
  id: string;
  eyebrow: string;
  line1: string;
  line2: string;
  dark: boolean;
  as?: "h1" | "h2";
}) => (
  <>
    <p className="mb-4 text-sm font-bold uppercase tracking-widest" style={dark ? { color: LIME } : undefined}>
      {eyebrow}
    </p>
    <Tag id={id} className="leading-[0.95] tracking-[-0.03em]">
      <span className="block text-5xl md:text-6xl lg:text-7xl" style={HEAVY}>{line1}</span>
      <span className="mt-1 block text-5xl md:text-6xl lg:text-7xl" style={SERIF}>{line2}</span>
    </Tag>
  </>
);
