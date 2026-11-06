import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import growappLogo from "@/assets/growapp-logo.jpeg";
import zembraLogo from "@/assets/zembra-logo.svg";
import bottlenexusLogo from "@/assets/bottlenexus-logo-white.svg";
import shipzzerLogoWhite from "@/assets/shipzzer-logo-white.png";

type Experience = {
  company: string;
  location: string;
  role: string;
  metric: string;
  metricLabel: string;
  sentence: string;
  caseStudy: string;
  proofs: { label: string; url: string }[];
  logo: string;
  logoClass: string;
  textualLogo: boolean;
  gradient: string;
  bar: string;
};

const experiences: Experience[] = [
  {
    company: "GrowApp",
    location: "UK",
    role: "Founder and CMO",
    metric: "$30K+",
    metricLabel: "MRR on my own SaaS",
    sentence: "I built it from zero. Positioning, pricing, outreach, then an AppSumo launch.",
    caseStudy: "/case-study/growapp",
    proofs: [{ label: "AppSumo listing", url: "https://appsumo.com/products/growapp/" }],
    logo: growappLogo,
    logoClass: "h-8 w-8 rounded-lg",
    textualLogo: false,
    gradient: "from-orange-500 to-amber-300",
    bar: "from-orange-500 to-amber-400",
  },
  {
    company: "Zembra",
    location: "US",
    role: "Marketing Lead",
    metric: "4×",
    metricLabel: "revenue in 8 months",
    sentence: "New brand, new site and an outbound rebuilt for data and AI buyers.",
    caseStudy: "/case-study/zembra",
    proofs: [
      {
        label: "Press release",
        url: "https://www.einpresswire.com/article/689256436/zembra-unveils-new-logo-and-website-expands-services-to-empower-individuals-with-data-and-ai",
      },
    ],
    logo: zembraLogo,
    logoClass: "h-8 w-auto",
    textualLogo: true,
    gradient: "from-purple-400 to-pink-400",
    bar: "from-purple-500 to-pink-500",
  },
  {
    company: "Bottle Nexus",
    location: "US",
    role: "Head of Creative",
    metric: "Rebrand",
    metricLabel: "from brand foundations to weekly content",
    sentence: "Identity, website and a weekly content engine. Reels, reports and decks, Sept 2024 to Feb 2025.",
    caseStudy: "/case-study/bottlenexus",
    proofs: [
      { label: "Instagram", url: "https://www.instagram.com/bottlenexus/" },
      { label: "Behance", url: "https://www.behance.net/gallery/234607371/Saas-B2B-Content-Creation" },
    ],
    logo: bottlenexusLogo,
    logoClass: "h-7 w-auto",
    textualLogo: true,
    gradient: "from-cyan-400 to-teal-300",
    bar: "from-cyan-500 to-teal-400",
  },
  {
    company: "Shipzzer",
    location: "US",
    role: "GTM Strategist",
    metric: "Top 3",
    metricLabel: 'on Google for "yard depot systems"',
    sentence: "SEO pages and outbound built on buyer intent. 7% reply rate on cold email.",
    caseStudy: "/case-study/shipzzer",
    proofs: [{ label: "Live Google ranking", url: "https://www.google.com/search?q=yard+depot+systems" }],
    logo: shipzzerLogoWhite,
    logoClass: "h-7 w-auto",
    textualLogo: true,
    gradient: "from-blue-400 to-purple-400",
    bar: "from-blue-500 to-purple-500",
  },
];

const focusStyle =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400";

const ExperienceSection = () => (
  <section id="experience" aria-labelledby="experience-title" className="section-padding relative scroll-mt-24">
    <div className="container px-4">
      <div className="mx-auto mb-14 max-w-5xl md:mb-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">Track Record</p>
        <h2 id="experience-title" className="font-display font-bold">
          <span className="block text-5xl md:text-6xl lg:text-7xl">Four companies.</span>
          <span className="block text-gradient text-6xl md:text-7xl lg:text-8xl">One result each.</span>
        </h2>
      </div>

      <ol className="mx-auto max-w-5xl" aria-label="Results with four companies">
        {experiences.map((exp, index) => (
          <li
            key={exp.company}
            className="stack-card mb-6 last:mb-0 md:mb-8"
            style={{ "--stack-top": `calc(5.5rem + ${index * 3.5}rem)` } as CSSProperties}
          >
            <article className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#17111f] px-6 pb-7 pt-5 shadow-[0_-16px_40px_-20px_#000b] md:min-h-[400px] md:px-12 md:pb-10">
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${exp.bar}`} aria-hidden="true" />

              <div className="flex min-h-8 flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="flex items-center gap-3 font-display text-2xl font-semibold">
                  <img
                    src={exp.logo}
                    alt={exp.textualLogo ? exp.company : ""}
                    loading="lazy"
                    width={32}
                    height={32}
                    className={`${exp.logoClass} ${exp.textualLogo ? "brightness-0 invert" : ""}`}
                  />
                  {!exp.textualLogo && exp.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {exp.role} · {exp.location}
                </p>
              </div>

              <div className="my-auto py-8 md:py-6">
                <p
                  className={`bg-gradient-to-r ${exp.gradient} bg-clip-text font-display font-bold leading-[0.9] tracking-tight text-transparent text-[clamp(3rem,12vw,8rem)]`}
                >
                  {exp.metric}
                </p>
                <p className="mt-3 text-xl text-foreground/90 md:text-3xl">{exp.metricLabel}</p>
              </div>

              <div className="flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
                <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground">{exp.sentence}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {exp.proofs.map((proof) => (
                    <a
                      key={proof.url}
                      href={proof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground hover:text-foreground ${focusStyle}`}
                    >
                      {proof.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                  <Link
                    to={exp.caseStudy}
                    className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#17111f] hover:bg-white/85 ${focusStyle}`}
                  >
                    Case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ExperienceSection;
