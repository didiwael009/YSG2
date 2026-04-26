import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";

interface CalendlyCTAProps {
  label?: string;
  variant?: "hero" | "default" | "outline";
  size?: "default" | "lg" | "xl";
  className?: string;
  fullWidth?: boolean;
}

const CalendlyCTA = ({
  label = "Book a 20-min GTM Audit",
  variant = "hero",
  size = "lg",
  className,
  fullWidth = false,
}: CalendlyCTAProps) => (
  <Button
    variant={variant}
    size={size}
    className={`group ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
    asChild
  >
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
      {label}
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </a>
  </Button>
);

export default CalendlyCTA;
