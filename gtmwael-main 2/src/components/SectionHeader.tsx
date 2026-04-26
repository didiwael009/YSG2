import AnimateIn from "./AnimateIn";

interface SectionHeaderProps {
  label: string;
  line1: string;
  line2: string;
  description?: string;
  subtitle?: string;
  /** Use "light" when placed on a cream/light section */
  variant?: "dark" | "light";
  align?: "center" | "left";
  delay?: number;
}

const SectionHeader = ({
  label,
  line1,
  line2,
  description,
  subtitle,
  variant = "dark",
  align = "center",
  delay = 100,
}: SectionHeaderProps) => {
  const isCenter = align === "center";
  const line1Color = variant === "light" ? "text-heading-light" : "text-foreground";

  return (
    <AnimateIn delay={delay} className={`${isCenter ? "text-center" : ""} mb-16 md:mb-20`}>
      <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
        {label}
      </p>
      <h2 className="font-display font-bold mb-6">
        <span className={`block text-5xl md:text-6xl lg:text-7xl ${line1Color}`}>{line1}</span>
        <span className="block text-6xl md:text-7xl lg:text-8xl text-gradient">{line2}</span>
      </h2>
      {description && (
        <p className={`text-lg text-muted-foreground ${isCenter ? "max-w-2xl mx-auto" : ""}`}>
          {description}
        </p>
      )}
      {subtitle && (
        <p className="text-muted-foreground mt-3">
          {subtitle}
        </p>
      )}
    </AnimateIn>
  );
};

export default SectionHeader;
