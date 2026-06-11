/**
 * InternalLinks.tsx
 *
 * Renders the "Related SaaS growth resources" section when
 * post.internalLinkSuggestions has entries.
 *
 * Only URLs present in the ANCHOR_LABELS map are rendered.
 * No fabricated or fallback URLs are invented.
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Canonical label map — covers all URLs the publisher can emit.
// Extend this map when new routes are added to internalLinkSuggestions.
const ANCHOR_LABELS: Record<string, string> = {
  "/conversion-rate-optimisation-specialist": "SaaS CRO specialist",
  "/landing-page-for-saas": "SaaS landing page strategy",
  "/saas-marketing-agency": "SaaS marketing agency alternative",
  "/optimize-saas-landing-page": "Optimize your SaaS landing page",
  "/b2b-saas-marketing-strategy": "B2B SaaS marketing strategy",
  // CRO teardown cross-links
  "/cro-teardowns/shopify": "Shopify homepage teardown (2021–2026)",
  "/cro-teardowns/hootsuite": "Hootsuite website redesign teardown",
  "/cro-teardowns/stripe": "Stripe homepage teardown (2022–2026)",
  "/cro-teardowns/intercom": "Intercom homepage teardown (2023–2026)",
  "/cro-teardowns/vercel": "Vercel homepage teardown (2021–2026)",
  "/cro-teardowns/crisp": "Crisp messaging homepage teardown",
  "/cro-teardowns/clay": "Clay GTM tool homepage teardown",
  "/cro-teardowns/linear": "Linear homepage teardown (2020–2026)",
  "/cro-teardowns/lemlist": "lemlist homepage teardown (2019–2026)",
  "/cro-teardowns/apollo": "Apollo.io homepage teardown (2019–2026)",
};

interface InternalLinksProps {
  suggestions: string[];
}

const InternalLinks = ({ suggestions }: InternalLinksProps) => {
  // Normalize paths (strip trailing slash for lookup, keep clean href)
  const entries = suggestions
    .map((raw) => {
      const normalized = raw.replace(/\/$/, "");
      const label = ANCHOR_LABELS[normalized];
      return label ? { href: normalized, label } : null;
    })
    .filter((e): e is { href: string; label: string } => e !== null);

  if (entries.length === 0) return null;

  return (
    <section
      aria-label="Related SaaS growth resources"
      className="scroll-mt-28 rounded-[24px] border border-[#e4e2ec] bg-[#fbfbfe] p-6"
    >
      <h3 className="mb-4 font-display text-[20px] font-bold text-[#11101a]">
        Related SaaS growth resources
      </h3>
      <ul className="space-y-2">
        {entries.map(({ href, label }) => (
          <li key={href}>
            <Link
              to={href}
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
            >
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InternalLinks;
