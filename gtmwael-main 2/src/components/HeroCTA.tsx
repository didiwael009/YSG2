import * as React from "react";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const PrimaryCTA = ({ href, children, className }: HeroCTAProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    setIsPressed(true);
    setIsLoading(true);
    
    // Simulate loading then navigate
    setTimeout(() => {
      setIsPressed(false);
      // Allow the link to proceed
      window.open(href, '_blank', 'noopener,noreferrer');
      setTimeout(() => setIsLoading(false), 500);
    }, 800);
    
    e.preventDefault();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base font-bold",
        "bg-primary text-primary-foreground",
        "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isLoading && "pointer-events-none opacity-90",
        isPressed && "scale-[0.97]",
        className
      )}
      style={{
        transform: isPressed ? "scale(0.97)" : "scale(1)",
      }}
    >
      {/* Intensified glow on hover */}
      <span 
        className="absolute inset-0 rounded-lg bg-primary/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-110"
      />
      
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Booking…</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </>
      )}
    </a>
  );
};

export const SecondaryCTA = ({ href, children, className }: HeroCTAProps) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base font-semibold",
        "bg-transparent text-foreground border border-border",
        "overflow-hidden",
        "transition-all duration-300",
        "hover:border-muted-foreground/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Animated gradient sweep on hover */}
      <span className="absolute inset-0 -z-10">
        <span 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: 'translateX(-100%)',
            animation: 'none',
          }}
        />
        <span 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]"
        />
      </span>
      
      {/* Subtle border glow */}
      <span className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 transition-colors duration-300" />
      
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
};
