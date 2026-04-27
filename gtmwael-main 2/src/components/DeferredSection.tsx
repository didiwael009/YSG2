import { ReactNode, useEffect, useRef, useState } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  fallbackHeight?: number;
  rootMargin?: string;
}

const DeferredSection = ({
  children,
  fallbackHeight = 240,
  rootMargin = "600px 0px",
}: DeferredSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight: fallbackHeight }}>
      {shouldRender ? children : null}
    </div>
  );
};

export default DeferredSection;
