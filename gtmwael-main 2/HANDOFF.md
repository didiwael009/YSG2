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

### 2026-06-12 — V6 pipeline + 3 new teardowns + pipeline optimization

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

### 2026-06-13 (latest) — Audit fixes executed

- **P0 fixed**: clean `npm run build` regenerated sitemap (17 teardowns, Unbounce now included) + prerendered Unbounce SSR route; phantom happi/loom dist routes removed (dist is gitignored, deploy regenerates). Commit on `main`.
- **HANDOFF reconciled**: article count 13→17, false SECTION_ORDER claim struck through with correction, judge-V5 + owned-source issues marked resolved in known-issues table.
- **Hygiene**: discarded abandoned happi.com half-run (27 untracked files, user decision); deleted dead code `draft.ts` + `compose-section.ts` (orphaned, recoverable via git); removed superseded `PLAN-pipeline-optimization.md` (replaced by `AUDIT-2026-06-13.md`).
- **Deferred**: `02-quick-answer` left as documented stub (user decision — not implemented, see known-issues).
- **D2 DONE**: backfilled businessContext into all 9 V1 articles (apollo, clay, crisp, intercom, lemlist, linear, shopify, stripe, vercel) — all 17 teardowns now render a business-context block. Added standalone CLI `cro-teardown:business-context` (generate-business-context.ts was the only Layer generator missing one). Per-article blast radius was +businessContext only; judge 92-94. Verified rendering in SSR HTML.
- **B2 SKIPPED (justified)**: renumbering SECTION_ORDER IDs would touch 410 data files + 10 source files for cosmetic gain, zero user benefit. Not worth it. Audit backlog now clear.

### 2026-06-13 (later) — Full system audit + owned-source fix

- **Owned playbook sources fix** (commit 6a67504): `final-judge.ts` + `section-writer.ts` now treat Landing Page Playbook 2026 / Growth Playbook 2026 as valid first-party evidence. Judge no longer flags citations to them as hallucinations; writer must attribute any number from them in-sentence. (Unbounce's "20% / Wael Aouididi" flags were the book being cited correctly but judged as invented.)
- **Full read-only system audit** → see `AUDIT-2026-06-13.md`. Headline findings: P0 — Unbounce missing from sitemap + stale dist (built before Unbounce, has phantom happi/loom routes); P1 — HANDOFF's SECTION_ORDER "reduced to 2 sections" claim is false (code has 6), `02-quick-answer` is spec'd but dead (not in SECTION_ORDER). Positives: judge confirmed V5, article bodies clean, SSR structure healthy. Backlog ranked in the audit file; nothing fixed yet (report-only).

### 2026-06-13 — Template restructure V6 completion + 3 new teardowns + h1 normalization fix

**V6 template restructure — all 11 changes implemented:**
- Added `businessContext?: string` field to CroTeardownPost type
- ~~SECTION_ORDER reduced to `['01-intro', '07-business-context']`; prose sections 02-06 deleted~~ **[CORRECTED 2026-06-13 audit: this was never applied or was reverted. Live `SECTION_ORDER` in `section-writer.ts:75` still has all 6 sections: `01-intro, 03-visual-timeline, 04-messaging-evolution, 05-cta-navigation-evolution, 07-business-context, 06-lessons-for-saas-teams`. Do not trust the original claim.]**
- Created `generate-business-context.ts` — LLM generator for 3-paragraph business context (≤60 words each)
- Updated `compose-all-sections.ts` to call business context generation after strategic shift detector
- Fixed h2/h3 concatenation in `normalize-page-text.ts` — applied `cleanBodyText()` regex before filtering
- Added `CtaEvolutionTable` mode prop (`'cta' | 'headings' | 'both'`) for dual-section layout
- Fixed CtaEvolutionTable empty state with "None in this period" italic placeholder
- Created `BusinessContextBlock.tsx` — renders 3-paragraph prose in styled box
- Rewrote `TeardownLayout.tsx` with 8-section order + dark eyebrow for lessons
- Updated `publish-article.ts` to load businessContext from `07-business-context.final.md`
- Updated `article-blueprint.ts` featuredImageAlt to include H1 quote

**H1 concatenation fix:**
- Bug: Gong's current H1 came in as `"Revenue AI Built To Predict churnPredict churn"` (camelCase concat)
- Root cause: h1 arrays were not running through `cleanBodyText()` (regex split on camelCase)
- Fix: Added `cleanBodyText` import to `article-blueprint.ts`, applied to 7 h1 extraction sites (lines 211, 278-279, 307, 372-373, 462-463, 532)
- Prevents future articles from inheriting scraper concatenation bugs

**New teardowns published (3 total):**
- **Expensya** (article #11): Oct 2020 → Jun 2026. Phase 1 archive-snapshots.json reconstructed from first run log (2020-10, 2021-01, 2021-07, 2021-10, current); Phase 2 selected 2020-10 vs current; 14 H2 added, 7 removed; intro 88/100, published with --force
- **Gong** (article #12): Jan 2020 → Jun 2026. Phase 1 found 7 snapshots, captured 3 (2020-01, 2021-10, current) due to rate limiting; intro 83/100; published with --force
- **Webflow** (article #13): Jan 2020 → Jun 2026. Phase 1 found 13 snapshots, captured 2 (2020-01, current) due to rate limiting; intro 88/100, passed critic; published with --force

**Loom attempt:**
- Tested: loom.com + www.loom.com across all path variants + Wayback availability API
- Result: Zero archives exist — Loom blocks Wayback Machine crawler (noarchive directives). Cannot produce teardown.

**TypeScript validation:** All changes pass `npx tsc --noEmit` with zero errors.

**V3 writer/critic system integration (same session):**
- `WRITER_SYSTEM` replaced with CRE Win Report voice: 6 entry types (finding/paradox/practitioner/objection/contrast/mechanism), mechanism naming required, tradeoff + founder test woven as prose content (no "**So what?**" / "The tradeoff:" labels)
- `CRITIC_SYSTEM` replaced with V3 rubric: evidenceAccuracy(25), riskControl(10), specificity(15), entryPointOriginality(15), mechanismNaming(10), founderSharpness(15), clarity(10)
- `json-guard.ts` DimensionScores updated for V3 (added entryPointOriginality, mechanismNaming, founderSharpness)

**final-judge.ts V3 rewrite (resolved long-standing calibration gap):**
- JUDGE_SYSTEM replaced with V3 criteria: 6 dimensions — evidenceAccuracy(20), riskControl(15), mechanismQuality(15), founderSharpness(20), clarity(15), sectionCoherence(15)
- Root cause of ~81/100 cap: 4 judge dimensions were hardcoded to 0 in old version
- Critical fix: added "MECHANISM NAMES ARE NOT UNSUPPORTED CLAIMS" block — judge was flagging "qualification filter," "aspiration positioning" etc. as unsupported claims when they are required interpretive labels in V3
- Pass logic updated: `overallScore >= 85 AND evidenceAccuracy >= 15 AND riskControl >= 11 AND unsupportedClaims empty`
- `parseJudgeResponse` updated: removed v2 hard gates (analysisDepth, founderUsefulness, concision)

**LessonCards.tsx hardcoded company name leak (root cause fix):**
- Bug: `LessonCards.tsx` had `"Hootsuite"` hardcoded in disclaimer text — visible on every article
- Fix: added `companyName` prop; `TeardownLayout.tsx` now passes `post.companyName`

**Shopify article V3 rewrite:**
- Full rewrite Sonnet-only (`--writer-model claude-sonnet-4-5`), judge 91/100 PASS
- Manual content fixes applied directly in `*.final.md` (no API reruns) to resolve risk violations: removed invented metrics (60%/40% → "a significant share"), removed intent attribution ("deliberate" friction), removed conversion prediction, hedged ICP narrowing claim

**V5 plain-explainer system — active for all new articles from this point:**
- Voice change: CRE Win Report → plain explainer for SEO/Google traffic (dual audience: advanced marketers + founders learning the vocabulary)
- `WRITER_SYSTEM` → V5: 9 rules, forbidden jargon list (procurement-stage, discovery-stage, qualification filter, category ownership, aspiration positioning, identity recruitment, intent signal, working memory, ICP narrowing, buyer-stage mismatch, friction-to-commitment ratio), 60-word paragraph cap, H3 sub-block requirement per analytical section, searchable heading rule
- **6-section architecture**: `02-quick-answer` added between intro and belief shift — 3-sentence Google featured snippet target (≤75 words)
- `SECTION_META` canonical entries (01-intro, 03-06) replaced with V5 versions; each analytical section (03/04/05/06) has prescribed H3 sub-blocks (e.g. ### What changed / ### Why it matters / ### What it costs); `writerModel: 'claude-opus-4-5'` removed (Sonnet sufficient for plain explainer)
- `CRITIC_SYSTEM` → V5: 7 dimensions summing to 100 — evidenceAccuracy(25), plainLanguage(20), scannability(15), searchableHeadings(10), specificity(15), rhythmAndOpening(10), founderTakeaway(5)
- `json-guard.ts` DimensionScores updated for V5 (removed riskControl/entryPointOriginality/mechanismNaming/founderSharpness/clarity; added plainLanguage/scannability/searchableHeadings/rhythmAndOpening/founderTakeaway)
- `writing-config.ts` SECTION_EVIDENCE_SOURCES: `02-quick-answer` mapped to `[summary-cards, messaging]`

**generate-lesson-cards.ts — LLM-powered lesson cards module:**
- New file at `scripts/cro-teardown/generate-lesson-cards.ts`
- Replaces hardcoded 4-card "Patterns worth borrowing" block (had identical generic titles every article) with per-company LLM call
- Title validation: each card must name the company, quote the site verbatim, or cite a specific number; 4 banned generic title patterns enforced
- Body validation: 50–70 words, ≥3 different categories, 10 forbidden jargon terms checked post-generation
- Output: `section-evidence/lesson-cards.json` — same schema as before; no React template changes needed downstream
- Wired into `compose-all-sections.ts` after section loop, before cross-section pass; resume-aware (skips if file exists unless `--force`); non-fatal on failure (pipeline continues with existing cards)

---

## Current state (as of 2026-06-13)

### Published CRO teardowns (17 total — corrected by 2026-06-13 audit; was wrongly listed as 13)
| Slug | Period | Snapshots | Notes |
|------|--------|-----------|-------|
| hootsuite | 2020–2026 | 2 | V1 pipeline |
| stripe | 2022–2026 | 2 | V1 pipeline |
| intercom | 2023–2026 | 2 | V1 pipeline |
| shopify | 2021–2026 | 2 | V1 pipeline |
| vercel | 2021–2026 | 2 | V1 pipeline |
| crisp | 2020–2026 | 2 | V1 pipeline |
| clay | 2022–2026 | 2 | V1 pipeline |
| linear | 2020–2026 | 2 | V1 pipeline |
| lemlist | 2019–2026 | 2 | V1 pipeline |
| apollo | 2019–2026 | 2 | V6, fixed empty "Added" panel |
| expensya | 2020–2026 | 2 | V6, archive reconstructed from first run |
| gong | 2020–2026 | 3 | V6, rate-limited capture |
| webflow | 2020–2026 | 2 | V6, rate-limited capture |
| apify | 2020–2026 | — | V6, only article with full rich lesson cards |
| buffer | 2019–2026 | — | V6, added 2026-06-12 |
| agorapulse | 2019–2026 | — | V6, added 2026-06-12 |
| unbounce | 2019–2026 | 11 | V6, added 2026-06-12; NOT yet in sitemap/dist (audit P0) |

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
| ~~V3 judge calibration gap~~ / ~~Judge-writer voice mismatch~~ | **RESOLVED (confirmed 2026-06-13 audit)** — `final-judge.ts` is fully V5: 7 dimensions (evidenceAccuracy/plainLanguage/scannability/searchableHeadings/specificity/rhythmAndOpening/founderTakeaway), no `mechanismQuality`, pass ≥90. The need for `--force` is now real content quality (<90), not a broken rubric. | N/A |
| Owned playbook sources flagged as hallucinations | **RESOLVED 2026-06-13** — judge + writer now whitelist Landing Page Playbook 2026 / Growth Playbook 2026 as first-party evidence (commit 6a67504) | N/A |
| 02-quick-answer is a STUB, not implemented — has an evidence-source mapping in `writing-config.ts` + one `isIntro` reference in `section-writer.ts`, but NO `SECTION_META` (no prompt/goal/word-target), NOT in `SECTION_ORDER`, no assembler/React handling. The HANDOFF claim it was "added" was overstated. | Deferred by decision 2026-06-13 — documented stub, left as-is | To activate later: write SECTION_META['02-quick-answer'] (≤75-word featured-snippet target), add to SECTION_ORDER + SECTION_HEADINGS, test one compose |
| Unbounce not in sitemap; dist stale (predates Unbounce, has phantom happi/loom routes) | Open (audit P0 E1/E2) | Rebuild + regen sitemap + redeploy |
| 17 existing articles in V3 voice — no V5 backfill performed; regenerating with `--force` will rewrite in V5 plain-explainer voice | Open by design — V5 only applies to new articles going forward | Run compose `--force` per slug when ready to upgrade an article |
| H2/H3 concatenation normalization — FIXED 2026-06-13 | Resolved — `cleanBodyText` now applied to h2/h3 in normalize-page-text.ts | N/A |
| H1 concatenation normalization — FIXED 2026-06-13 | Resolved — `cleanBodyText` now applied to all 7 h1 extraction sites in article-blueprint.ts | N/A |
| V6 SEO structure weak on H2/H3 hierarchy — only 2 content H2s after intro H1 | Open — by design (React components handle visual/CTA/lesson sections) | SEO audit flags thin structure (68–76/100); consider adding 2–3 more H2 sections in markdown |
| Happi data directories untracked in git | Unresolved — origin unclear | Commit or delete |
| Evidence hallucination guard — LLM invents specific metrics | Open | Manual review before publish |
| Loom unarchivable — blocks Wayback Machine crawler | Confirmed 2026-06-13 — no workaround | Skip Loom teardowns |

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
| `scripts/cro-teardown/generate-business-context.ts` | 3-paragraph business context generator (new V6) |
| `scripts/cro-teardown/section-writer.ts` | Writer + critic loop per section — V5 voice (plain explainer, H3 sub-blocks, 6-section order incl. 02-quick-answer) |
| `scripts/cro-teardown/generate-lesson-cards.ts` | LLM-powered "Patterns worth borrowing" cards — per-company titles, validated output, writes lesson-cards.json |
| `scripts/cro-teardown/final-judge.ts` | Article judge — V3 criteria; mechanismQuality dimension conflicts with V5 voice; needs rewrite |
| `scripts/cro-teardown/publish-article.ts` | Writes .ts article file + registers it + loads businessContext |
| `scripts/cro-teardown/backfill-publish-dates.ts` | One-time backfill of publishedAt dates |
| `scripts/cro-teardown/config/writing-config.ts` | CTA variants, related post sets, slug hash, SECTION_ORDER |
| `scripts/cro-teardown/normalize-page-text.ts` | Layer 1 — h1/h2/h3 concatenation normalization via `cleanBodyText()` |
| `scripts/cro-teardown/article-blueprint.ts` | Phase 4A — builds CroTeardownPost shape + applies h1 normalization |
| `src/content/cro-teardown/index.ts` | Article registry |
| `src/content/cro-teardown/types.ts` | CroTeardownPost type definition (includes businessContext field) |
| `src/components/cro-teardown/BusinessContextBlock.tsx` | Renders 3-paragraph businessContext in styled box (new V6) |
| `src/components/cro-teardown/TeardownLayout.tsx` | 8-section layout with dark eyebrow lessons section (new V6) |
| `src/components/cro-teardown/CtaEvolutionTable.tsx` | Dual-mode table: mode='cta' or mode='headings' + empty state |
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
