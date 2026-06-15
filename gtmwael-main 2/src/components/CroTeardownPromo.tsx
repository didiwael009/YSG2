import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  { name: "Clay",      domain: "clay.com" },
  { name: "Shopify",   domain: "shopify.com" },
  { name: "Linear",    domain: "linear.app" },
  { name: "Intercom",  domain: "intercom.com" },
  { name: "Apollo",    domain: "apollo.io" },
  { name: "Hootsuite", domain: "hootsuite.com" },
];

const CroTeardownPromo = () => (
  <section
    className="py-14 md:py-16"
    style={{ background: "var(--gradient-section-light)" }}
  >
    <div className="container px-4 max-w-3xl mx-auto text-center">
      {/* Eyebrow */}
      <span className="inline-block text-xs font-black uppercase tracking-[0.18em] text-primary mb-4">
        CRO Teardowns
      </span>

      {/* Headline */}
      <h2 className="font-display text-2xl md:text-[28px] font-bold text-zinc-900 leading-snug mb-4">
        See how top SaaS companies evolve their homepage messaging.
      </h2>

      {/* Body */}
      <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl mx-auto">
        Real homepage teardowns from brands like Clay, Shopify, and Intercom —
        what to borrow, what to avoid, and how to improve your own page.
      </p>

      {/* Logo strip */}
      <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap mb-10">
        {BRANDS.map(({ name, domain }) => (
          <div
            key={domain}
            className="flex flex-col items-center gap-1.5 group"
            title={name}
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
              alt={name}
              width={28}
              height={28}
              className="rounded-md grayscale opacity-40 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-80"
              loading="lazy"
            />
            <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wide group-hover:text-muted-foreground transition-colors">
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/cro-teardowns"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-150"
      >
        Explore CRO teardowns
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);

export default CroTeardownPromo;
