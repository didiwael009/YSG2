import { Link } from "react-router-dom";
import type { CardRef, Cover as CoverData } from "@/content/blog/magazine";

/** One container for every blog block, so the header, grids, author band and footer share the same edges. */
export const BLOG_CONTAINER = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8";

export const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${date}T00:00:00`),
  );

export const Kicker = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`block font-mono text-[11px] uppercase tracking-[0.08em] text-primary ${className}`}>{children}</span>
);

const FRAME =
  "relative aspect-video overflow-hidden rounded-md border border-border-light bg-[hsl(var(--heading-light)/0.04)]";
const TAG =
  "absolute bottom-2 left-2 rounded-sm bg-[hsl(var(--heading-light)/0.85)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white";

/** Top-left crop of a full-page capture, so a 16:9 frame shows the headline area at a legible size. */
const Crop = ({ src, label }: { src: string; label: string }) => (
  <div className="relative overflow-hidden">
    <img src={src} alt="" width={1440} height={1080} loading="lazy" className="absolute left-0 top-0 w-[133%] max-w-none" />
    <span className={TAG}>{label}</span>
  </div>
);

/** 16:9 card cover: before/after pair, single capture, whole schema, or a typographic fallback. */
export const Cover = ({ cover, label, title }: { cover: CoverData; label: string; title: string }) => {
  if (cover.kind === "pair") {
    return (
      <div className={`${FRAME} grid grid-cols-2 gap-px bg-border-light`} role="img" aria-label={`${title}: ${cover.before.label} and ${cover.after.label}`}>
        <Crop src={cover.before.src} label={cover.before.label} />
        <Crop src={cover.after.src} label={cover.after.label} />
      </div>
    );
  }
  if (cover.kind === "shot") {
    return (
      <div className={FRAME}>
        <img src={cover.src} alt={cover.label} width={1440} height={810} loading="lazy" className="h-full w-full object-cover object-top" />
      </div>
    );
  }
  if (cover.kind === "schema") {
    return (
      <div className={FRAME}>
        <img src={cover.src} alt={cover.alt} width={1376} height={768} loading="lazy" className="h-full w-full object-contain p-3" />
      </div>
    );
  }
  return (
    <div className={`${FRAME} flex items-end p-5`} aria-hidden="true">
      <span className="absolute left-5 top-5 h-[3px] w-10 bg-primary" />
      <span className="font-serif text-[26px] font-medium leading-none text-heading-light md:text-[30px]">{label}</span>
    </div>
  );
};

/** Section header: thin rule, serif h2, link to the full list on the right. */
export const SectionHead = ({ title, pill, to }: { title: string; pill: string; to: string }) => (
  <div className="mb-7 flex items-baseline justify-between gap-4 border-t border-border-light pt-5">
    <h2 className="m-0 font-serif text-[26px] font-medium leading-tight text-heading-light md:text-[30px]">{title}</h2>
    <Link
      to={to}
      className={`shrink-0 font-mono text-[12px] uppercase tracking-[0.08em] text-primary underline-offset-4 hover:underline ${FOCUS}`}
    >
      {`${pill} →`}
    </Link>
  </div>
);

/** The one card used by Teardowns, Guides and the Guides tab. */
export const Card = ({ card }: { card: CardRef }) => (
  <Link to={card.href} className={`group block rounded-md ${FOCUS}`}>
    <Cover cover={card.cover} label={card.label} title={card.title} />
    <Kicker className="mt-4">{card.label}</Kicker>
    <h3 className="mt-1.5 font-serif text-[19px] font-medium leading-snug text-heading-light group-hover:text-primary">
      {card.title}
    </h3>
    <span className="mt-2 block text-[13px] text-body-light">{formatShortDate(card.date)}</span>
  </Link>
);
