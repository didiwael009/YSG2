# HANDOFF.md — Full Project Context

> **Rule for every AI session:** Read this file before starting any task.
> If you find a gap in the chronology or a decision that is not documented here, add it before closing the session.

---

## Owner

**Wael Aouididi**
Email: wael.aouididi@gmail.com
Role: SaaS GTM consultant / growth marketer
Site: gtmwael.com (deployed on Vercel)
GitHub user: didiwael009

---

## What this project is

A personal SaaS GTM / growth portfolio website.
Serves as: positioning page, lead generation, content hub, and proof of expertise.

Stack: Vite + React + TypeScript + Tailwind + shadcn/ui + Supabase + Vercel. Package manager: **npm only**.

The real app lives inside `gtmwael-main 2/`. The outer repo root has a Vercel config pointing into it. Do not rename this folder.

---

## Books and owned assets on the site

- `public/wael-landing-page-playbook-2026.pdf` — Wael's real published playbook. Valid citation target in articles.
- `public/wael-growth-playbook-2026.pdf` — second published playbook. Valid citation target.

These are legitimate references. Do **not** flag them as hallucinations.

---

## Chronology

### 2026-04-26 — Site launch
- Initial Vercel deployment. Case studies site, prelaunch SEO infrastructure, Supabase env guard.

### 2026-04-27 to 2026-05-06 — SEO batch + blog foundation
- Image optimization, LCP, favicon, global footer use-cases, mobile hero.
- First blog articles added: SaaS landing page article, cold email, LinkedIn outreach.
- Blog system wired up with structured data and SEO guardrails.

### 2026-05-07 to 2026-05-08
- Blog SEO publishing guardrails documented.
- Removed unsourced Meta Ads social KPIs from articles.
- Landing Page Optimization Best Practices 2026 article added.

### 2026-05-16
- SEO optimization system built. Blog split.

### 2026-05-21 to 2026-05-22
- Codex marketing skills: SEO and service page internal links.
- Google Search Console feedback applied.

### 2026-06-06 to 2026-06-07
- Portfolio service pages restored in navigation.
- Mobile navigation drawer added.
- Performance, a11y, SEO, and dependency cleanup.

### 2026-06-08 — CRO teardown engine V1 + SSR
- First two CRO teardown articles: Hootsuite and Stripe.
- SSR prerendering added for teardown pages.
- Phase 4M writing depth system built.
- Third blog post + new content optimization system.

### 2026-06-09 — CRO teardown engine scaling
- 4-layer pipeline added: normalization, consistency validator, strategic shift detector, SEO intent planner.
- New teardowns: Clay, Linear, Crisp, Vercel, Shopify, Apollo, Expensya + 2 more.
- Final judge (final-judge.ts) written — **NOTE: still V3, 4 dimensions hardcoded to 0, caps scores at ~81**.
- Ubersuggest SEO integration.

### 2026-06-10 to 2026-06-11
- Linear and Clay teardowns refined.
- Fable model runs (fable1, fable2, fable3) for article quality experiments.
- Expensya and Apollo teardowns finalized.
- 2 additional blog posts published.

### 2026-06-12 — V6 pipeline + 3 new teardowns + pipeline optimization (current state)

**V6 convergence (commit 461c76c, 4dfdfc2):**
- Visual analyzer added (Claude vision on .webp screenshots → `visual-analysis.json`)
- Context researcher added (web search on brand → `business-context-research.json`)
- Custom outline generator added (Layer 3.5 → `article-outline.json` with unique angle + custom H2s)
- Marketing summary cards added (4 marketing-signal cards replacing technical "At a glance")
- All 14 existing articles regenerated through V6 pipeline
- UI redesign applied across all teardown pages

**Pipeline speed optimization (commit 672f774) — 7 tasks:**
- Task A: Wayback CDX bulk query (one request instead of 31 sequential) → `wayback.ts` rewritten
- Task B: Phase 1 concurrency 3→2, `duplicate_content` status added
- Task C: publishedAt never-overwrite + backfill script (16 articles spread Feb–Jun 2026, FNV-1a hash)
- Task D: Unique H1 + seo_title per article from outline (not template defaults)
- Task E: Business context H2 reads outline's `custom_h2`, not hardcoded "Why the homepage changed"
- Task F: Sentence-length critic rule (-3 if >12% sentences >30 words) + writer 35-word hard cap
- Task G: 3-variant CTA rotation by slug hash (`getCtaForSlug`, `getRelatedPostsForSlug`)

**Buffer + Agorapulse teardowns (commit 0d32e62)**
**Unbounce teardown (commit d397d7e):**
- 11 snapshots, threshold 0.99
- Unique H1 from outline: "Unbounce dropped 'ad spend' from its H1 — and that changed everything"
- Bug fixed: `wayback.ts` `bucketToSlots` — `windowStart`/`windowEnd` were loop-scoped but referenced outside

---

## Current state (as of 2026-06-12)

### Published CRO teardowns (17 total)
| Slug | Period | Snapshots |
|------|--------|-----------|
| shopify | 2021–2026 | — |
| hootsuite | 2020–2026 | — |
| stripe | 2022–2026 | — |
| intercom | 2023–2026 | — |
| vercel | 2021–2026 | — |
| crisp | 2020–2026 | — |
| clay | 2022–2026 | — |
| linear | 2020–2026 | — |
| lemlist | 2019–2026 | — |
| apollo | 2019–2026 | — |
| expensya | 2021–2026 | — |
| gong | 2020–2026 | — |
| webflow | 2020–2026 | — |
| apify | 2020–2026 | — |
| buffer | 2019–2026 | — |
| agorapulse | 2019–2026 | — |
| unbounce | 2019–2026 | 11 |

### Published blog articles (7 total)
- /saas-marketing-plan
- /optimize-saas-landing-page
- /google-ads-vs-meta-ads-saas
- /saas-cold-email-strategy
- /b2b-saas-marketing-strategy
- /landing-page-for-lead-generation
- /linkedin-outreach-for-saas
- /blog/saas-landing-page-google-meta-ads
- /blog/saas-traffic-but-no-signups
- /blog/ai-conversion-rate-optimization-saas
- /blog/landing-page-optimization-best-practices-2026
- /blog/saas-product-video

---

## Known open issues

| Issue | Status | Workaround |
|-------|--------|------------|
| V3 judge calibration gap — 4 dimensions always 0, caps articles at ~81/100 | Open — `final-judge.ts` not yet rewritten | Publish with `--force` |
| Happi data directories untracked in git | Unresolved — origin unclear | Commit or delete |
| Rich lesson cards — only Apify has full rich fields | Incomplete | Other articles use SimpleCard fallback |
| Evidence hallucination guard — LLM invents specific metrics | Open | Manual review before publish |
| Digest dedup never fired in practice yet | Untested on a site with stable pages | Code correct, benefit unobserved |

---

## CRO teardown pipeline — CLI reference

```bash
# Phase 1: screenshots
npm run cro-teardown -- --name <Company> --url <url> --from YYYY-MM --to YYYY-MM --step-months 3

# Phase 2: select snapshots
npm run cro-teardown:select -- --slug <slug> [--threshold 0.99]

# Phase 4A: generate article data
npm run cro-teardown:generate-data -- --name <Company> --slug <slug>

# Phase 4C: compose + write article
npm run cro-teardown:compose -- --slug <slug> [--force]

# Phase 4F: publish
npm run cro-teardown:publish -- --slug <slug> [--force]

# Standalone sub-commands
npm run cro-teardown:visual-analyze -- --slug <slug>
npm run cro-teardown:research -- --slug <slug>
npm run cro-teardown:outline -- --slug <slug>
```

Default threshold 0.96 is often too aggressive — use `--threshold 0.99` for most sites.

---

## Key files

| File | Purpose |
|------|---------|
| `scripts/cro-teardown/wayback.ts` | Bulk CDX snapshot discovery + digest dedup |
| `scripts/cro-teardown/index.ts` | Phase 1 orchestrator (screenshots) |
| `scripts/cro-teardown/compose-all-sections.ts` | Phase 4C orchestrator (all layers) |
| `scripts/cro-teardown/outline-generator.ts` | Layer 3.5 — unique angle + custom H2s |
| `scripts/cro-teardown/visual-analyzer.ts` | Claude vision analysis of .webp screenshots |
| `scripts/cro-teardown/context-researcher.ts` | Web research on brand events + category |
| `scripts/cro-teardown/section-writer.ts` | Writer + critic loop per section |
| `scripts/cro-teardown/final-judge.ts` | Article judge — V3, needs rewrite |
| `scripts/cro-teardown/publish-article.ts` | Writes .ts article file + registers it |
| `scripts/cro-teardown/backfill-publish-dates.ts` | One-time backfill of publishedAt dates |
| `scripts/cro-teardown/config/writing-config.ts` | CTA variants, related post sets, slug hash |
| `src/content/cro-teardown/index.ts` | Article registry |
| `src/components/cro-teardown/teardownMeta.ts` | Card metadata per slug |
| `TASKS.md` | Active task list |
| `SEO_RULES.md` | SEO standards |

---

## Instructions for AI filling this document

If you are an AI agent reading this at the start of a session:

1. Read this file fully before touching any code.
2. If you complete work in this session, **add an entry to the Chronology section** before closing.
3. If you discover a decision or context that is missing from this file, add it.
4. If you are picking up from a prior session summary, reconcile the summary against this file and update any gaps.
5. Never assume a context you don't see documented here — ask the user.
