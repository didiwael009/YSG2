import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { AGENCY_TEAM } from "@/content/agency";
import { ExternalLink } from "./ExternalLink";
import { CREAM, HEAVY, INK, LIME, SectionHeading } from "./style";

/** Dark team section: three cards, Wael's with his photo and a lime accent. */
const AgencyTeam = () => {
  const t = AGENCY_TEAM;
  return (
    <section id="team" aria-labelledby="agency-team-title" className="px-5 py-20 sm:px-10 md:py-24" style={{ background: INK, color: CREAM }}>
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow={t.eyebrow} line1={t.line1} line2={t.line2} id="agency-team-title" align="left" tone="dark" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.people.map((p) => {
            const isWael = p.id === "wael";
            return (
              <article
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border bg-white/[0.04] p-7"
                style={{ borderColor: isWael ? "rgba(198,244,50,0.4)" : "rgba(255,255,255,0.1)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.name}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="h-20 w-20 rounded-full object-cover object-[center_20%]"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-20 w-20 items-center justify-center rounded-full text-[26px]"
                      style={{ ...HEAVY, background: CREAM, color: INK }}
                    >
                      {p.initials}
                    </div>
                  )}
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]"
                    style={{ background: LIME, color: INK }}
                  >
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.badge}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl" style={HEAVY}>{p.name}</h3>
                <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: isWael ? LIME : "rgba(255,255,255,0.6)" }}>
                  {p.role}
                </p>
                <p className="text-white/75">{p.bio}</p>
                <ExternalLink
                  href={p.link.href}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-full px-4 py-2.5 text-sm font-semibold hover:brightness-95"
                  style={{ background: isWael ? LIME : CREAM, color: INK }}
                >
                  {p.link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </ExternalLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgencyTeam;
