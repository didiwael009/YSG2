import SectionHeader from "./SectionHeader";
import VideoGrid from "./VideoGrid";
import { videoProjects } from "@/lib/video-data";

const VideoCreativitySection = () => {
  return (
    <section id="creative" className="relative py-32 overflow-hidden">
      {/* Distinct background to break monotony */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header - Asymmetric layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="lg:max-w-2xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Video That Converts
            </p>
            <h2 className="font-display font-bold text-foreground leading-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl">Creative that</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">stops the scroll</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground lg:max-w-sm lg:text-right">
            From viral TikToks to cinematic brand films — video content engineered for attention and action.
          </p>
        </div>

        <VideoGrid projects={videoProjects} />
      </div>
    </section>
  );
};

export default VideoCreativitySection;
