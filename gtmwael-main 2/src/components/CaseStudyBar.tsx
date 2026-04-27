import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import landingZembra from "@/assets/landing-zembra.png";
import landingShipzzer from "@/assets/landing-shipzzer.jpg";
import pubrellaScreenshot from "@/assets/pubrella-screenshot.jpg";
import landingScreenplay from "@/assets/screenplay-hero-screenshot.png";
import landingBottlenexus from "@/assets/landing-bottlenexus.jpg";
import icCenterHero from "@/assets/ic-center-hero.png";

const caseStudies = [
  {
    id: "zembra",
    client: "Zembra",
    achievement: "4× Revenue",
    description: "Full GTM system that quadrupled revenue in 6 months",
    image: landingZembra,
    link: "/case-study/zembra",
    tags: ["GTM", "Funnel", "Ads"],
  },
  {
    id: "pubrella",
    client: "Pubrella",
    achievement: "3× CVR",
    description: "Landing page & funnel redesign tripling conversion rate",
    image: pubrellaScreenshot,
    link: "/case-study/pubrella",
    tags: ["Landing Page", "CRO"],
  },
  {
    id: "shipzzer",
    client: "Shipzzer",
    achievement: "50% Open · 7% Reply",
    description: "Cold email system hitting elite engagement benchmarks",
    image: landingShipzzer,
    link: "/case-study/shipzzer",
    tags: ["Cold Email", "Outbound"],
  },
  {
    id: "screenplay",
    client: "Screenplay",
    achievement: "GTM Launch",
    description: "Performance studio landing page delivering wow in 3 seconds",
    image: landingScreenplay,
    link: "/case-study/screenplay",
    tags: ["Landing Page", "UI/UX"],
  },
  {
    id: "bottlenexus",
    client: "BottleNexus",
    achievement: "Full GTM",
    description: "Complete go-to-market system for wine marketplace platform",
    image: landingBottlenexus,
    link: "/case-study/bottlenexus",
    tags: ["GTM", "Landing Page"],
  },
  {
    id: "ic-center",
    client: "IC Center",
    achievement: "CRO",
    description: "Full landing page build with funnel messaging and CRO-optimized design",
    image: icCenterHero,
    link: "/case-study/ic-center",
    tags: ["Landing Page", "CRO", "Funnel"],
  },
];

const CaseStudyBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-20 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2 block">
              Case Studies
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Results that speak
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll case studies left"
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll case studies right"
              className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              to={study.link}
              className="group flex-shrink-0 w-[250px] sm:w-[280px] md:w-[320px] snap-start"
            >
              <div className="rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                {/* Thumbnail */}
                <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden">
                  <img
                    src={study.image}
                    alt={`${study.client} case study`}
                    width={320}
                    height={200}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Achievement badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                    {study.achievement}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-display font-bold text-foreground">
                      {study.client}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyBar;
