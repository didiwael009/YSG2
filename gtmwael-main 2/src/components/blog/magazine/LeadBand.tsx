import { Link } from "react-router-dom";
import type { BlogPost } from "@/content/blog/types";
import type { CroTeardownPost } from "@/content/cro-teardown/types";
import { getLatestColumn, getLeadGuide, getNewsItems, toCard } from "@/content/blog/magazine";
import { Cover, FOCUS, Kicker, formatShortDate } from "./shared";

/** React 18 types lack `fetchpriority`; spreading keeps the lowercase attribute in the HTML. */
const HIGH_PRIORITY = { fetchpriority: "high" } as Record<string, string>;

const STUDY_SLUG = "saas-homepage-study";
const STUDY_SHOTS = [
  { src: "/study-crops/vercel-2021-07.webp", caption: "Vercel, July 2021" },
  { src: "/study-crops/vercel-current-live.webp", caption: "Vercel, today" },
];

/** The study's own cover: the sample size, the scope, and two real captures from the corpus. */
const StudyCover = () => (
  <div className="rounded-md border border-border-light bg-[hsl(var(--heading-light)/0.03)] p-5 md:p-7">
    <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
      <span className="font-serif text-[104px] font-medium leading-[0.85] text-heading-light md:text-[160px]">54</span>
      <span className="pb-2 md:pb-4">
        <span className="block font-serif text-[24px] leading-tight text-heading-light md:text-[30px]">SaaS homepages</span>
        <span className="mt-1 block font-mono text-[13px] tracking-[0.08em] text-primary md:text-[15px]">2015{"–"}2026</span>
      </span>
    </div>
    <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
      {STUDY_SHOTS.map((shot) => (
        <figure key={shot.src} className="m-0">
          <img
            src={shot.src}
            alt={`${shot.caption} homepage capture`}
            width={1100}
            height={825}
            {...HIGH_PRIORITY}
            className="block aspect-[4/3] w-full rounded-sm border border-border-light object-cover object-top"
          />
          <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-body-light">{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  </div>
);

/** Top of the index: the lead story on the left, a compact text list of the latest items on the right. */
const LeadBand = ({ posts, teardowns }: { posts: BlogPost[]; teardowns: CroTeardownPost[] }) => {
  const lead = getLeadGuide(posts);
  if (!lead) return null;
  const card = toCard(lead);
  const heading = getNewsItems(posts).length > 0 ? "Latest news" : "Latest";
  const latest = getLatestColumn(posts, teardowns, 8)
    .filter((c) => c.href !== lead.path)
    .slice(0, 4);

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
      <Link to={lead.path} className={`group block min-w-0 rounded-md ${FOCUS}`}>
        {lead.slug === STUDY_SLUG ? <StudyCover /> : <Cover cover={card.cover} label={card.label} title={card.title} />}
        <Kicker className="mt-5">{lead.category}</Kicker>
        <h2 className="mt-2 font-serif text-[28px] font-medium leading-[1.12] text-heading-light group-hover:text-primary md:text-[38px]">
          {lead.title}
        </h2>
        <p className="mt-3 max-w-[680px] text-[17px] leading-[1.6] text-body-light-strong">{lead.excerpt}</p>
        <span className="mt-3 block text-[13px] text-body-light">
          {`By ${lead.author} · ${formatShortDate(lead.datePublished)} · ${lead.readTime}`}
        </span>
      </Link>

      {latest.length > 0 ? (
        <nav aria-label="Latest" className="min-w-0 lg:border-l lg:border-border-light lg:pl-10">
          <div className="border-b border-heading-light pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-heading-light">
            {heading}
          </div>
          <ul className="m-0 list-none p-0">
            {latest.map((item) => (
              <li key={item.href} className="border-b border-border-light py-4 last:border-b-0">
                <Link to={item.href} className={`block font-serif text-[17px] leading-snug text-heading-light hover:text-primary ${FOCUS}`}>
                  {item.title}
                </Link>
                <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-body-light">
                  {`${item.label} · ${formatShortDate(item.date)}`}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
};

export default LeadBand;
