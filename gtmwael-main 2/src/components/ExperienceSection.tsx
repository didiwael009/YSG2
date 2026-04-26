import { ArrowRight } from "lucide-react";
import growappLogo from "@/assets/growapp-logo.jpeg";
import zembraLogo from "@/assets/zembra-logo.svg";
import bottlenexusLogo from "@/assets/bottlenexus-logo-white.svg";
import shipzzerLogoWhite from "@/assets/shipzzer-logo-white.png";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
const experiences = [{
  company: "GrowApp",
  location: "UK",
  role: "Founder & CMO",
  headline: "$30K+ MRR",
  tags: ["Bootstrapped SaaS", "AppSumo Launch"],
  description: "Built and scaled my own B2B SaaS from zero to $30K+ MRR. End-to-end ownership—positioning, pricing, outreach, and an AppSumo launch—proving I can turn a raw idea into repeatable revenue. Not a client gig—my product.",
  bulletPoints: [],
  links: [{
    label: "View AppSumo Listing",
    url: "https://appsumo.com/products/growapp/",
    superscript: "1"
  }],
  logo: growappLogo,
  logoClass: "h-8 w-8 rounded-md",
  isTextualLogo: false,
  gradientFrom: "from-orange-500",
  gradientTo: "to-amber-400",
  accentColor: "text-orange-400"
}, {
  company: "Zembra",
  location: "US",
  role: "Marketing Lead",
  headline: "4× Revenue",
  tags: ["8 Months", "4X Revenue"],
  description: "Led the full SaaS rebrand and outbound revamp for data/AI buyers; rebuilt narrative, site, offers, and SDR enablement. Outcomes: 4× revenue in 8 months with consistent outbound messaging aligned to how technical buyers actually evaluate.",
  bulletPoints: [],
  links: [{
    label: "Read Press Release",
    url: "https://www.einpresswire.com/article/689256436/zembra-unveils-new-logo-and-website-expands-services-to-empower-individuals-with-data-and-ai",
    superscript: "2"
  }],
  logo: zembraLogo,
  logoClass: "h-7 w-auto",
  isTextualLogo: true,
  gradientFrom: "from-purple-500",
  gradientTo: "to-pink-500",
  accentColor: "text-purple-400"
}, {
  company: "Bottle Nexus",
  location: "US",
  role: "Head of Creative",
  headline: "Full Rebrand",
  tags: ["New Landing Page", "Creative Ops"],
  description: "Delivered a full rebrand from brand foundations to live content, then ran ongoing creative ops. From Sept '24 → Feb '25, built the identity, site system, and a weekly content engine (reels, reports, decks) that ships on-brand.",
  bulletPoints: ["Visual identity & brand system", "Website & content engine", "Ongoing creative execution"],
  links: [{
    label: "See Live Brand & Content",
    url: "https://www.instagram.com/bottlenexus/",
    superscript: "3"
  }, {
    label: "B2B Design Content",
    url: "https://www.behance.net/gallery/234607371/Saas-B2B-Content-Creation",
    superscript: "4"
  }],
  logo: bottlenexusLogo,
  logoClass: "h-6 w-auto",
  isTextualLogo: true,
  gradientFrom: "from-cyan-500",
  gradientTo: "to-teal-400",
  accentColor: "text-cyan-400"
}, {
  company: "Shipzzer",
  location: "US",
  role: "GTM Strategist",
  headline: "Top-3 Google",
  tags: ["50% Open Rate", "7% Reply Rate"],
  description: "Designed GTM around buyer intent: positioning, SEO content, and outbound assets SDRs use. Achieved Top-3 Google rankings, 50% open rate, and 7% reply rate, aligning search and outreach with what buyers actually look for.",
  bulletPoints: ["SEO content systems", "High-intent outbound flows", "Demand capture strategy"],
  links: [{
    label: "See Live Google Ranking",
    url: "https://www.google.com/search?q=yard+depot+systems",
    superscript: "3"
  }, {
    label: "See Apollo Screenshot",
    url: "https://www.upwork.com/freelancers/waelaouididi?p=1993524023080235008",
    superscript: "4"
  }],
  logo: shipzzerLogoWhite,
  logoClass: "h-6 w-auto",
  isTextualLogo: true,
  gradientFrom: "from-blue-500",
  gradientTo: "to-purple-500",
  accentColor: "text-blue-400"
}];
const ExperienceCard = ({
  exp,
  index
}: {
  exp: typeof experiences[0];
  index: number;
}) => <div className="relative bg-card border border-border/50 rounded-2xl p-6 hover:border-border transition-all duration-300 animate-fade-up opacity-0 overflow-hidden h-full" style={{
  animationDelay: `${(index + 2) * 100}ms`,
  animationFillMode: 'forwards'
}}>
    {/* Header with company logo */}
    <div className="mb-2">
      <div className="flex items-center gap-3">
        <img src={exp.logo} alt={`${exp.company} logo`} loading="lazy" width={32} height={32} className={`${exp.logoClass} ${exp.isTextualLogo ? 'brightness-0 invert' : ''}`} />
        <div className="flex items-center gap-2">
          {!exp.isTextualLogo && <h3 className="font-display text-xl font-semibold text-foreground">
              {exp.company}
            </h3>}
          <span className="text-muted-foreground text-sm">({exp.location})</span>
        </div>
      </div>
      <p className={`text-sm mt-1 ${exp.accentColor}`}>{exp.role}</p>
    </div>
    
    {/* Large headline */}
    <h4 className={`font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${exp.gradientFrom} ${exp.gradientTo} bg-clip-text text-transparent`}>
      {exp.headline}
    </h4>
    
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-4">
      {exp.tags.map((tag, i) => <span key={i} className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border rounded-md">
          {tag}
        </span>)}
    </div>
    
    {/* Description */}
    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
      {exp.description}
    </p>
    
    {/* Bullet points */}
    {exp.bulletPoints.length > 0 && (
      <ul className="space-y-2 mb-4">
        {exp.bulletPoints.map((point, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    )}
    
    {/* Links */}
    <div className="flex flex-wrap gap-4">
      {exp.links.map((link, i) => <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-sm ${exp.accentColor} hover:opacity-80 transition-colors`}>
          {link.label}<sup className="text-[10px]">{link.superscript}</sup>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>)}
    </div>
    
    {/* Gradient bottom border */}
    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.gradientFrom} ${exp.gradientTo}`} />
  </div>;
const ExperienceSection = () => {
  return <section id="experience" className="section-padding relative">
      <div className="container px-4">
        <div className="text-center mb-20 animate-fade-up opacity-0" style={{
        animationDelay: '100ms',
        animationFillMode: 'forwards'
      }}>
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Track Record
          </p>
          <h2 className="font-display font-bold mb-6">
            <span className="block text-5xl md:text-6xl lg:text-7xl">Real SaaS experience.</span>
            <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">Real growth delivered.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I Don't Just Talk Strategy — I've Built It, Launched It, and Scaled It.
          </p>
          <p className="text-muted-foreground mt-3">
            From scrappy B2B launches to multi-country rebrands, here's what I've done with real SaaS companies.
          </p>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-4">
              {experiences.map((exp, index) => <CarouselItem key={exp.company} className="pl-4 basis-[85%]">
                  <ExperienceCard exp={exp} index={index} />
                </CarouselItem>)}
            </CarouselContent>
            
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {experiences.map((_, index) => <div key={index} className="w-2 h-2 rounded-full bg-primary/30" />)}
            </div>
          </Carousel>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Swipe to explore →
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {experiences.map((exp, index) => <ExperienceCard key={exp.company} exp={exp} index={index} />)}
        </div>
      </div>
    </section>;
};
export default ExperienceSection;