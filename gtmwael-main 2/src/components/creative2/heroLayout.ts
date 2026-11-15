// Layout classes copied from src/components/HeroSection.tsx (not imported, so the
// homepage never changes). Both slider layers use these, so their blocks share boxes.
export const L = {
  section: "relative min-h-screen flex items-center justify-center",
  container:
    "container relative px-4 pt-16 pb-8 md:py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center lg:justify-center",
  inner: "w-full max-w-5xl mx-auto",
  row: "relative flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-0",
  textCol: "relative z-[2] text-center lg:text-left order-2 lg:order-1 max-w-xl lg:max-w-[620px]",
  badge: "inline-flex items-center gap-2 px-4 py-1.5 mb-4",
  h1: "font-bold tracking-[-0.03em] mb-3 text-left",
  titleSize: "block text-balance text-[1.8rem] md:text-[2.25rem] lg:text-[2.7rem] leading-[1]",
  subtitle: "text-sm md:text-base mb-3 leading-[1.45] max-w-[60ch] text-pretty text-left",
  ctas: "flex flex-col sm:flex-row items-center sm:items-start gap-2.5",
  cta: "relative inline-flex items-center justify-center gap-2 h-12 px-8 text-base",
  freeNote: "hidden sm:block text-xs mt-2 whitespace-nowrap",
  cards: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5 text-left",
  card: "group relative overflow-hidden border px-4 pb-3 pt-3.5 transition-colors",
  logos: "mt-5 text-center lg:text-left",
  logoRow: "flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 sm:gap-x-8 md:gap-x-10",
  photoWrap: "order-1 lg:order-2 relative z-[3] flex-shrink-0 lg:ml-2",
  photo: "relative z-[1] w-64 md:w-72 lg:w-[420px] h-auto block select-none",
} as const;

// wael-new.webp is 840x973; at 420px wide the box is 420x486.
export const PHOTO_W = 420;
export const PHOTO_H = 486;
