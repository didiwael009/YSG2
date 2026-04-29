import { ReactNode, useEffect, useRef, useState } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  idleDelay?: number;
  fallbackHeight?: number;
}

const DeferredSection = ({
  children,
  idleDelay = 7000,
  fallbackHeight = 240,
}: DeferredSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(
    () => typeof window === "undefined" || !!document.getElementById("root")?.hasChildNodes()
  );

  useEffect(() => {
    if (shouldRender) return;

    const render = () => setShouldRender(true);
    const scrollEvents = ["scroll", "wheel", "touchmove", "keydown"];

    if (typeof window === "undefined") {
      setShouldRender(true);
      return;
    }

    const timeoutId = window.setTimeout(render, idleDelay);
    const cleanup = () => {
      scrollEvents.forEach((eventName) => window.removeEventListener(eventName, render));
      window.clearTimeout(timeoutId);
    };

    scrollEvents.forEach((eventName) => {
      window.addEventListener(eventName, render, { once: true, passive: true });
    });

    return cleanup;
  }, [idleDelay, shouldRender]);

  return (
    <div ref={ref} style={shouldRender ? undefined : { minHeight: fallbackHeight }}>
      {shouldRender ? children : null}
    </div>
  );
};

export default DeferredSection;
