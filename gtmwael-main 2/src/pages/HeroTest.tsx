import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HeroSectionProposed from "@/components/HeroSectionProposed";

// Test page, not linked anywhere, noindex (404 SEO fallback) and blocked in robots.txt.
// /test/hero?v=current or ?v=proposed
const HeroTest = () => {
  const [params, setParams] = useSearchParams();
  const [version, setVersion] = useState<"current" | "proposed">(
    params.get("v") === "current" ? "current" : "proposed"
  );

  useEffect(() => {
    setParams({ v: version }, { replace: true });
  }, [version, setParams]);

  const tab = (v: "current" | "proposed", label: string) => (
    <button
      type="button"
      onClick={() => setVersion(v)}
      aria-pressed={version === v}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        version === v ? "bg-white text-black" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      {version === "current" ? <HeroSection /> : <HeroSectionProposed />}
      <div className="fixed right-3 top-[84px] z-[100] flex gap-1 md:right-auto md:top-auto md:bottom-4 md:left-1/2 md:-translate-x-1/2 rounded-full border border-white/15 bg-black/80 p-1 backdrop-blur">
        {tab("current", "Actuel")}
        {tab("proposed", "Proposé")}
      </div>
    </main>
  );
};

export default HeroTest;
