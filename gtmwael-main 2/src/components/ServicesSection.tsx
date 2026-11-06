import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
import landingZembra from "@/assets/landing-zembra.png";
import sambalingoThumb from "@/assets/casestudy-sambalingo.webp";

type Row = { title: string; body: string; metric?: string; href: string };
type Pillar = {
  name: string;
  line: string;
  image: string;
  imageAlt: string;
  accent: string;
  bar: string;
  rows: Row[];
};

const pillars: Pillar[] = [
  {
    name: "Convert",
    line: "Turn the traffic you already have into pipeline.",
    image: landingZembra,
    imageAlt: "Zembra website I rebuilt",
    accent: "text-[hsl(260,55%,48%)]",
    bar: "bg-[hsl(260,55%,55%)]",
    rows: [
      {
        title: "Landing pages",
        body: "A page a visitor understands in five seconds.",
        metric: "3× CVR",
        href: "/services/landing-page",
      },
      {
        title: "SEO pages",
        body: "Pages built on what your buyers search for.",
        metric: "Top 3 Google",
        href: "/case-study/shipzzer",
      },
      {
        title: "Outbound",
        body: "Cold email aimed at real buying triggers.",
        metric: "7% replies",
        href: "/services/cold-email",
      },
      {
        title: "SaaS homepage teardowns",
        body: "What to borrow from top SaaS sites, what to avoid.",
        href: "/cro-teardowns",
      },
    ],
  },
  {
    name: "Produce",
    line: "Feed every channel without hiring a content team.",
    image: sambalingoThumb,
    imageAlt: "SambaLingo video, song and Instagram feed made by the content system",
    accent: "text-orange-700",
    bar: "bg-orange-500",
    rows: [
      {
        title: "Content automation",
        body: "Claude Code makes it. I check it, you approve it.",
        metric: "134 posts",
        href: "/content-automation",
      },
      {
        title: "Videos, songs and carousels",
        body: "One idea, cut for each channel.",
        href: "/content-automation",
      },
      {
        title: "Three languages",
        body: "French, English and Arabic, each written for its readers.",
        href: "/content-automation",
      },
      {
        title: "Brand and creative",
        body: "Identity, decks and visuals that match the product.",
        href: "/creative",
      },
    ],
  },
];

const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(260,55%,55%)]";

const ServicesSection = () => (
  <section id="services" aria-labelledby="services-title" className="section-padding relative scroll-mt-24 bg-section-light">
    <div className="container relative px-4">
      <div className="mx-auto mb-12 flex max-w-6xl flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[hsl(260,55%,48%)]">What I do</p>
          <h2 id="services-title" className="font-display font-bold leading-[0.95] tracking-tight text-heading-light">
            <span className="block text-5xl md:text-6xl lg:text-7xl">Two jobs.</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl">One growth system.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-body-light">
          Most clients start with one. The two work best together: content brings people in, the page turns them into
          customers.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-10">
        {pillars.map((pillar) => (
          <article key={pillar.name} aria-labelledby={`pillar-${pillar.name}`}>
            <div className="relative overflow-hidden rounded-2xl bg-[#1b1228] shadow-[0_24px_50px_-28px_hsl(260_40%_20%/0.6)]">
              <ResponsiveImage
                src={pillar.image}
                alt={pillar.imageAlt}
                width={640}
                height={400}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <span className={`absolute inset-x-0 bottom-0 h-1.5 ${pillar.bar}`} aria-hidden="true" />
            </div>

            <div className="mt-7 flex items-baseline justify-between gap-4">
              <h3
                id={`pillar-${pillar.name}`}
                className={`font-display text-5xl font-bold tracking-tight md:text-6xl ${pillar.accent}`}
              >
                {pillar.name}
              </h3>
            </div>
            <p className="mt-2 text-lg text-heading-light">{pillar.line}</p>

            <ul className="mt-6 border-t border-[hsl(260,20%,80%)]">
              {pillar.rows.map((row) => (
                <li key={row.title} className="border-b border-[hsl(260,20%,80%)]">
                  <Link
                    to={row.href}
                    className={`group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 ${focusStyle}`}
                  >
                    <span className="font-display text-lg font-semibold text-heading-light">{row.title}</span>
                    <span
                      className={`row-span-2 flex shrink-0 items-center gap-2 font-display text-base font-bold md:text-lg ${pillar.accent}`}
                    >
                      {row.metric}
                      <ArrowUpRight
                        className="h-4 w-4 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm text-body-light">{row.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg text-heading-light">Not sure where to start? I look at your funnel with you.</p>
        <Link
          to="/book"
          className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1b1228] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2a1d3d] ${focusStyle}`}
        >
          Book a free 20-min audit
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesSection;
