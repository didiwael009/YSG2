import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";
import AnimateIn from "./AnimateIn";

const benefits = [
  "A fresh, experienced take on your GTM approach",
  "Immediate clarity on what's working, what's broken, and what's missing",
  "Zero slides. Zero preparation. Just real strategic input from someone who's built SaaS from scratch",
];

const BookingSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-section-light">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(260_50%_85%/0.08)] to-transparent" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn delay={50}>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Let's Talk
            </p>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h2 className="font-display font-bold mb-4">
              <span className="block text-5xl md:text-6xl lg:text-7xl text-heading-light">Book a 20-min</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">GTM audit</span>
            </h2>
          </AnimateIn>
          
          <AnimateIn delay={200}>
            <p className="text-lg text-body-light mb-10">
              No pitch. No fluff. Just a real conversation to help you see what's blocking your growth — and what to fix next.
            </p>
          </AnimateIn>
          
          <div className="text-left max-w-xl mx-auto mb-10 space-y-4">
            {benefits.map((benefit, index) => (
              <AnimateIn key={index} delay={(index + 3) * 100} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-body-light-strong">{benefit}</span>
              </AnimateIn>
            ))}
          </div>
          
          <AnimateIn delay={600}>
            <Button variant="hero" size="xl" className="group" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a 20-min GTM Audit
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
