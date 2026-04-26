import { Shield, Zap, LineChart, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";
import AnimateIn from "./AnimateIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const layers = [
  {
    icon: Shield,
    number: "01",
    title: "Build trust before you ask for attention",
    intro: "Everything begins here. Before we drive a single visitor, we make sure your brand is credible and your message is crystal clear.",
    gradient: "from-blue-500 to-cyan-400",
    gradientBg: "from-blue-500/10 to-cyan-500/5",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    glowColor: "bg-blue-500/20",
    dotColor: "bg-blue-400",
    focusPoints: [
      { label: "Brand foundation", description: "Social media presence, founder/CEO visibility, website polish—the basics that make people think \"this is real.\"" },
      { label: "Messaging clarity", description: "I rewrite your homepage, landing pages, and key CTAs so visitors instantly understand what you do, who it's for, and what pain you solve." },
      { label: "Conversion optimization", description: "Remove friction from the signup or demo path. If someone's interested, nothing should confuse or slow them down." },
    ],
  },
  {
    icon: Zap,
    number: "02",
    title: "Now we attract the right traffic",
    intro: "Once the storefront looks good and the message converts, we open the doors.",
    gradient: "from-emerald-500 to-teal-400",
    gradientBg: "from-emerald-500/10 to-teal-500/5",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    glowColor: "bg-emerald-500/20",
    dotColor: "bg-emerald-400",
    focusPoints: [
      { label: "Organic first", description: "SEO, content, founder-led posts, community engagement—building momentum without spending." },
      { label: "Targeted outreach", description: "Direct conversations with the right people via email, LinkedIn, or partnerships." },
      { label: "Paid when it makes sense", description: "If the budget allows and organic is working, we layer in ads to accelerate—but only after we know the funnel converts." },
    ],
  },
  {
    icon: LineChart,
    number: "03",
    title: "Measure, learn, improve",
    intro: "Growth isn't a one-time setup. It's a feedback loop.",
    gradient: "from-purple-500 to-pink-400",
    gradientBg: "from-purple-500/10 to-pink-500/5",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20",
    glowColor: "bg-purple-500/20",
    dotColor: "bg-purple-400",
    focusPoints: [
      { label: "Clean tracking", description: "Know where leads come from, what converts, and what costs too much." },
      { label: "Weekly experiments", description: "One hypothesis, one test, one decision—keep what works, kill what doesn't." },
      { label: "Compounding improvements", description: "Small, consistent wins add up fast." },
    ],
  },
];

const GTMSystemSection = () => {
  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[hsl(260_50%_30%/0.15)] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[hsl(250_60%_35%/0.1)] rounded-full blur-[100px]" />
      
      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20">
          <AnimateIn delay={50} className="text-center">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              My Approach
            </p>
          </AnimateIn>
          <AnimateIn delay={100} className="text-center leading-tight">
            <h2 className="font-display font-bold mb-8">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-foreground">Trust first,</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">then traffic</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} className="text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I don't start with ads or outreach. I start with trust—because traffic to a broken foundation is just burned budget.
            </p>
          </AnimateIn>
        </div>
        
        {/* Accordion Layers */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              
              return (
                <AccordionItem
                  key={layer.title}
                  value={`item-${index}`}
                  className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 animate-fade-up opacity-0"
                  style={{ animationDelay: `${(index + 3) * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className={`absolute inset-0 ${layer.glowColor} rounded-2xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
                  
                  <AccordionTrigger className="px-6 py-5 md:px-8 md:py-6 hover:no-underline [&[data-state=open]>div>div>.chevron]:rotate-180">
                    <div className="flex items-center gap-4 md:gap-6 w-full">
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${layer.gradient} p-[1px]`}>
                          <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${layer.iconColor}`} strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className={`absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br ${layer.gradient} flex items-center justify-center`}>
                          <span className="text-[10px] md:text-xs font-bold text-white">{layer.number}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-tight">
                          {layer.title}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base mt-1 line-clamp-1 md:line-clamp-none">
                          {layer.intro}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                    <div className="pt-2">
                      <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 font-medium">What I focus on</h4>
                      <div className="grid gap-4">
                        {layer.focusPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${layer.gradient} flex items-center justify-center mt-0.5`}>
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                            <div className="flex-1">
                              <span className="font-semibold text-foreground">{point.label}</span>
                              <span className="text-muted-foreground"> — {point.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
        
        {/* CTA */}
        <AnimateIn delay={700} className="flex flex-col items-center mt-16 md:mt-20">
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Ready to build a growth system that compounds?
          </p>
          <Button variant="hero" size="lg" className="group" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a 20-min GTM Audit
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
};

export default GTMSystemSection;
