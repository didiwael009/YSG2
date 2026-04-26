import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/waelaouididi/30min";

const Book = () => {
  useEffect(() => {
    // Preconnect for faster Calendly handshake
    const addLink = (rel: string, href: string, crossorigin = false) => {
      if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return null;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossorigin) link.crossOrigin = "";
      document.head.appendChild(link);
      return link;
    };
    const preconnects = [
      addLink("preconnect", "https://assets.calendly.com", true),
      addLink("preconnect", "https://calendly.com", true),
      addLink("dns-prefetch", "https://assets.calendly.com"),
    ].filter(Boolean) as HTMLLinkElement[];

    // Inject Calendly widget script (only once globally)
    let injectedScript: HTMLScriptElement | null = null;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (!existing) {
      injectedScript = document.createElement("script");
      injectedScript.src = "https://assets.calendly.com/assets/external/widget.js";
      injectedScript.async = true;
      document.body.appendChild(injectedScript);
    }

    // Calendly event tracking → dataLayer
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

    return () => {
      window.removeEventListener("message", handleMessage);
      preconnects.forEach((l) => l.remove());
    };
  }, []);

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

      {/* CALENDLY */}
      <section className="relative px-4 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-border bg-card/30 backdrop-blur-sm shadow-glow-blue">
            <div
              className="calendly-inline-widget"
              data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=1a1530&text_color=ffffff&primary_color=ff6a2c`}
              style={{ minWidth: "320px", height: "720px" }}
            />
          </div>
          <noscript>
            <div className="text-center mt-6">
              <a
                href={CALENDLY_URL}
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold"
              >
                Book a 20-min audit
              </a>
            </div>
          </noscript>

          {/* Reassurance */}
          <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-muted-foreground">
            {["20-min free audit", "No commitment", "Real actionable insights"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
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
