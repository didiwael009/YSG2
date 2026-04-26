import { Mail, Search, Video, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import AnimateIn from "./AnimateIn";

const services = [
  {
    icon: Mail,
    title: "Cold Email Engine",
    description: "Build a predictable outbound system based on targeting, buying triggers, and bulletproof deliverability.",
    features: [
      "ICP targeting & advanced research",
      "High-intent message architecture",
      "Deliverability + warm-up infrastructure",
    ],
  },
  {
    icon: Search,
    title: "SEO + Content System",
    description: "Content frameworks and landing pages engineered to rank and convert with precision.",
    features: [
      "Technical SEO & structured content",
      "Conversion-focused landing pages",
      "Long-form content for ranking",
    ],
  },
  {
    icon: Video,
    title: "Creative Engine: Video, Social & Visual Identity",
    description: "One unified creative system that builds trust, stops the scroll, and supports revenue. Instead of separating video and social, I treat them as one engine: brand + distribution.",
    features: [
      "Short-form video for ads & social (LinkedIn, X, Meta)",
      "Branded thumbnails, carousels & visual systems",
      "Founder-led content & narrative positioning",
      "Creative designed to support pipeline — not vanity metrics",
    ],
    hasLink: true,
    linkText: "View Creative Portfolio",
    linkHref: "/creative",
  },
  {
    icon: Zap,
    title: "Landing Pages, Branding & Conversion Optimization",
    description: "Traffic only works when the page does its job. I design and optimize landing pages that communicate value instantly and push visitors to act.",
    features: [
      "Brand-aligned landing page design (clarity over decoration)",
      "Homepage & offer page rewrites for instant comprehension",
      "CTA hierarchy, friction removal & flow optimization",
      "Conversion diagnostics: why users hesitate or drop",
    ],
    goal: "When someone lands, they understand, trust, and convert — fast.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden bg-section-light">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(260_50%_80%/0.12)] rounded-full blur-[100px]" />
      
      <div className="container px-4 relative z-10">
        <SectionHeader
          label="What I Do"
          line1="Growth"
          line2="services"
          variant="light"
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <AnimateIn
              key={service.title}
              delay={(index + 2) * 100}
              className="card-light rounded-2xl p-6 md:p-8 hover:border-[hsl(260,40%,70%)] transition-all duration-300 group"
            >
              <div className="icon-container-lg mb-6 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10">
                <service.icon className="icon-primary-lg" />
              </div>
              
              <h3 className="font-display text-xl md:text-2xl font-semibold text-heading-light mb-4">
                {service.title}
              </h3>
              
              <p className="text-body-light mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-body-light-strong">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {service.goal && (
                <p className="text-sm text-primary/90 italic border-l-2 border-primary/30 pl-3">
                  Goal: {service.goal}
                </p>
              )}
              
              {service.hasLink && (
                <Link 
                  to={service.linkHref || "#"} 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  {service.linkText} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
