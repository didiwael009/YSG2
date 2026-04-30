import { useState } from "react";
import { Monitor, AppWindow } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import landingScreenplay from "@/assets/landing-screenplay.webp";
import screenplayDashboard from "@/assets/screenplay-dashboard.png";

const tabs = [
  { id: "landing", label: "Landing Page", icon: Monitor, src: landingScreenplay, alt: "Screenplay Performance Studio — redesigned landing page" },
  { id: "dashboard", label: "Product Dashboard", icon: AppWindow, src: screenplayDashboard, alt: "Screenplay Performance Studio — optimised product dashboard UI/UX" },
] as const;

const ScreenplaySlider = () => {
  const [active, setActive] = useState<"landing" | "dashboard">("landing");

  return (
    <div className="flex-1 relative">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === tab.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Browser frame with sliding images */}
      <div className="rounded-2xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/10">
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-muted/50 border-b border-border/30">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: active === "dashboard" ? "translateX(-100%)" : "translateX(0)" }}
          >
            {tabs.map((tab) => (
              <ResponsiveImage
                key={tab.id}
                src={tab.src}
                alt={tab.alt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                decoding="async"
                className="w-full h-auto block flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenplaySlider;
