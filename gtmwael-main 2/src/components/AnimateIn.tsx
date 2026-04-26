import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const AnimateIn = ({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: AnimateInProps) => (
  <Tag
    className={cn("animate-fade-up opacity-0", className)}
    style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
  >
    {children}
  </Tag>
);

export default AnimateIn;
