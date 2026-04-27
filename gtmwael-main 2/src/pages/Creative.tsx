import { Sparkles, ExternalLink, Play, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import VideoGrid from "@/components/VideoGrid";
import { videoProjects } from "@/lib/video-data";
import { CALENDLY_URL } from "@/lib/constants";
import landingClarrio from "@/assets/landing-clarrio.jpg";
import landingZembra from "@/assets/landing-zembra.png";
import landingBottlenexus from "@/assets/landing-bottlenexus.jpg";
import landingShipzzer from "@/assets/landing-shipzzer.jpg";
import landingPubwrite from "@/assets/landing-pubwrite.jpg";

const rebrandingProjects = [
  {
    title: "Pubrella",
    description: "Full SaaS rebrand — Led complete brand identity, visual direction, and product positioning",
    link: "https://pubrella.com/",
    category: "SaaS",
    role: "Full Rebrand",
    cover: landingPubwrite,
    featured: true,
  },
  {
    title: "BottleNexus",
    description: "Alcohol DTC technology — Oversaw rebrand and page design direction",
    link: "https://www.behance.net/gallery/211674227/Landing-Page",
    category: "E-commerce",
    role: "Project Lead",
    cover: landingBottlenexus,
  },
  {
    title: "Zembra",
    description: "Reviews API platform — Led product positioning and page strategy",
    link: "https://zembra.io",
    category: "SaaS",
    role: "Project Lead",
    cover: landingZembra,
  },
  {
    title: "Clarrio.ai",
    description: "Healthcare AI platform — Directed messaging and conversion flow",
    link: "https://clarrio.ai",
    category: "HealthTech",
    role: "Project Lead",
    cover: landingClarrio,
  },
  {
    title: "Shipzzer",
    description: "Depot management SaaS — Led positioning and page strategy",
    link: "https://shipzzer.com",
    category: "Logistics",
    role: "Project Lead",
    cover: landingShipzzer,
  },
];

const Creative = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Creative Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6">
            Work That
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Speaks For Itself
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From viral videos to high-converting landing pages — creative assets engineered for attention and action.
          </p>
        </div>
      </section>

      {/* Rebranding Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Rebranding & Landing Pages</h2>
              <p className="text-muted-foreground">Full brand transformations and conversion-optimized pages</p>
            </div>
          </div>

          {/* Featured Pubwrite */}
          <a 
            href={rebrandingProjects[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block mb-8"
          >
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              <img 
                src={rebrandingProjects[0].cover} 
                alt={rebrandingProjects[0].title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary text-xs font-semibold text-primary-foreground mb-4">
                  {rebrandingProjects[0].role}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3">{rebrandingProjects[0].title}</h3>
                <p className="text-lg text-white/80 max-w-2xl">{rebrandingProjects[0].description}</p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
            </div>
          </a>

          {/* Other Rebranding Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rebrandingProjects.slice(1).map((page, index) => (
              <a 
                key={index}
                href={page.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl mb-4">
                  <img 
                    src={page.cover} 
                    alt={page.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="inline-block w-fit px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white mb-2">
                      {page.role}
                    </span>
                    <h3 className="text-2xl font-semibold text-white">{page.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{page.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Creation / Video Section */}
      <section className="py-20 relative bg-section-light">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Content Creation</h2>
              <p className="text-muted-foreground">Scroll-stopping video content that captures attention</p>
            </div>
          </div>

          <VideoGrid projects={videoProjects} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 border border-primary/20 p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Need Creative That Converts?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss your next project and create something that drives real results.
            </p>
            <Button asChild variant="hero" size="lg">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Creative;
