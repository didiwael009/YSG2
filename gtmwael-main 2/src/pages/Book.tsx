import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/waelaouididi/30min";
const CALENDLY_PARAMS =
  "hide_gdpr_banner=1&background_color=1a1530&text_color=ffffff&primary_color=ff6a2c";

const Book = () => {
  const [loaded, setLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Warm up the connection on idle so the click-to-load feels instant,
  // without blocking the initial render with Calendly's heavy bundle.
  useEffect(() => {
    const addLink = (rel: string, href: string, crossorigin = false) => {
      if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossorigin) link.crossOrigin = "";
      document.head.appendChild(link);
    };
    const warm = () => {
      addLink("preconnect", "https://assets.calendly.com", true);
      addLink("preconnect", "https://calendly.com", true);
      addLink("dns-prefetch", "https://assets.calendly.com");
    };
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const id = idle(warm);
    return () => {
      const cancel = (
        window as unknown as { cancelIdleCallback?: (h: number) => void }
      ).cancelIdleCallback;
      if (cancel) cancel(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  // Calendly event tracking → dataLayer (attached only after the widget loads)
  useEffect(() => {
    if (!loaded) return;
    const handleMessage = (e: MessageEvent) => {
      if (
        typeof e.data === "object" &&
        e.data?.event &&
        typeof e.data.event === "string" &&
        e.data.event.indexOf("calendly") === 0
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "calendly_interaction",
          calendlyEvent: e.data.event,
          payload: e.data.payload ?? null,
        });
        if (e.data.event === "calendly.event_scheduled") {
          w.dataLayer.push({ event: "booking_completed", value: 1 });
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [loaded]);

  const loadCalendly = () => {
    if (loaded) return;
    setLoaded(true);

    const inject = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Calendly = (window as any).Calendly;
      if (Calendly && widgetRef.current) {
        Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?${CALENDLY_PARAMS}`,
          parentElement: widgetRef.current,
        });
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) {
      inject();
    } else {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = inject;
      document.body.appendChild(script);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[hsl(260_60%_50%/0.15)] rounded-full blur-[120px] pointer-events-none"
      />

      {/* HERO */}
      <section className="relative px-6 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
            Free 20-min audit
          </p>
          <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.05] text-3xl md:text-5xl">
            Your SaaS isn't converting.
            <span className="block text-gradient mt-2">That's the problem.</span>
          </h1>
          <p className="mt-5 md:mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I fix messaging, landing pages, and tracking before you scale ads.
          </p>
          <p className="mt-4 text-sm md:text-base font-semibold text-foreground">
            <span className="text-primary">4×</span> revenue growth
            <span className="mx-2 text-muted-foreground">·</span>
            <span className="text-primary">+300%</span> conversion lift
          </p>
        </div>
      </section>

      {/* BOOKING */}
      <section className="relative px-4 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-border bg-card/30 backdrop-blur-sm shadow-glow-blue">
            {loaded ? (
              <div
                ref={widgetRef}
                className="calendly-inline-widget"
                style={{ minWidth: "320px", height: "720px" }}
              />
            ) : (
              <button
                type="button"
                onClick={loadCalendly}
                onMouseEnter={loadCalendly}
                onTouchStart={loadCalendly}
                className="group w-full flex flex-col items-center justify-center gap-5 px-6 py-20 md:py-28 text-center cursor-pointer"
                style={{ minHeight: "420px" }}
                aria-label="Load the booking calendar"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 text-primary transition-transform duration-200 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
                <span className="font-display text-xl md:text-2xl font-bold text-foreground">
                  Pick a time that works for you
                </span>
                <span className="text-sm text-muted-foreground max-w-sm">
                  Live calendar · 30-min slot · instant confirmation
                </span>
                <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 group-hover:opacity-90 group-hover:-translate-y-px">
                  Open the calendar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* Fallback for users who prefer a direct link / no-JS */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Calendar not loading?{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Open it in a new tab
            </a>
            .
          </p>

          {/* Reassurance */}
          <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-muted-foreground">
            {["20-min free audit", "No commitment", "Real actionable insights"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Want proof first?{" "}
            <a href="/case-studies" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              View SaaS growth case studies
            </a>
            .
          </p>
        </div>
      </section>

      {/* WHAT I FIX */}
      <section className="relative px-6 py-16 md:py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-8">
            What I fix
          </h2>
          <ul className="grid grid-cols-3 gap-4 md:gap-10">
            {["Messaging", "Conversion", "Tracking"].map((item) => (
              <li
                key={item}
                className="text-base md:text-2xl font-display font-semibold text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Book;
