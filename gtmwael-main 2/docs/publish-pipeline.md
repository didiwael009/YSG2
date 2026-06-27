# Publish Pipeline

## Overview

The CRO teardown pipeline takes a brand slug and produces a published article in `src/content/cro-teardown/articles/[slug].ts`. It has two modes: **standard** (uses Claude API) and **manual** (Claude Code fulfills agent roles, zero API cost).

## Full ordered workflow

### Phase 0 — Preparation
Before starting, run Ubersuggest or your keyword tool to confirm:
- Primary keyword (e.g. "apollo homepage teardown")
- Monthly search volume ≥ 50
- Keyword difficulty ≤ 60

### Phase 1 — Screenshot capture
```bash
npm run cro-teardown:capture -- --slug [slug]
```
Captures Wayback Machine archives for the brand URL across target months.

**QA step (required):** Open each `.webp` file manually. Mark any 503/blank/unstyled captures with `screenshotMissing: true` in the article data. See [screenshot-engine.md](screenshot-engine.md).

### Phase 2 — Snapshot selection
```bash
npm run cro-teardown:select -- --slug [slug]
```
Selects the best 2–4 snapshots for visual diversity.

### Phase 3 — Evidence pack (article data generation)
```bash
npm run cro-teardown:generate-data -- --slug [slug]
```
Generates `data/cro-teardowns/[slug]/writing/generated-article-data.json`.

### Phase 4 — Composition (all sections)
```bash
npm run cro-teardown:compose -- --slug [slug] --mode standard
```
Runs the full section-writing pipeline:
- Layer 1: SEO intent
- Layer 2: Strategic shift detection
- Layer 3: Visual analysis (optional, `--skip-visual` to bypass)
- Layer 4: Context research (optional, `--skip-research` to bypass)
- Layer 3.5: Custom outline generation (optional, `--skip-outline` to bypass)
- Section loop: writer → critic → rewrite per section
- Lesson cards
- Cross-section pass
- Assembly

For zero-API cost, use:
```bash
CRO_MANUAL=true npm run cro-teardown:compose -- --slug [slug] --mode standard
```
Claude Code then receives agent prompts and responds manually.

### Phase 5 — Judge
The composition step auto-runs the judge. To run manually:
```bash
npm run cro-teardown:judge -- --slug [slug]
```
Score must be ≥ 80/100 to publish. Use `--force` to override (only for known judge calibration issues — see memory file `project_judge_v3_v5_gap.md`).

### Phase 6 — Publish
```bash
npm run cro-teardown:publish -- --slug [slug]
```
Writes the final `src/content/cro-teardown/articles/[slug].ts` file.

**After publishing:**
1. Add the article to `src/content/cro-teardown/index.ts` at the correct position (newest first).
2. Add screenshots to `public/cro-teardowns/[slug]/selected/`.
3. Run `node scripts/seo-check.mjs` — must pass.
4. Run `npm run build` — must pass.
5. Commit and push. Vercel auto-deploys.

## Manual mode (CRO_MANUAL)

When `CRO_MANUAL=true` is set, the pipeline pauses at each agent call and prints the prompt. Claude Code (you) reads it and types the response. Useful for:
- Zero cost runs on existing articles
- Debugging specific sections
- Regenerating one section: `--only-section 03-analysis`

## Adding a new article — complete checklist

- [ ] Ubersuggest keyword validation (≥50 vol, ≤60 KD)
- [ ] Screenshots captured and QA'd visually
- [ ] `screenshotMissing: true` set on any bad captures
- [ ] `featuredImage` points to a real, styled screenshot
- [ ] `companyName` correctly cased (e.g. "Apollo" not "apollo")
- [ ] `slug` is clean (no version suffixes like `-v2`)
- [ ] Article added to `index.ts` newest-first by `datePublished`
- [ ] `node scripts/seo-check.mjs` passes
- [ ] `npm run build` passes
- [ ] Visual QA: open `/cro-teardowns/[slug]` in browser, check Hero cards, timeline, analysis blocks

## Key files

| File | Role |
|---|---|
| `scripts/cro-teardown/compose-all-sections.ts` | Orchestrates the full composition pipeline |
| `scripts/cro-teardown/section-writer.ts` | Writer + critic loop per section |
| `scripts/cro-teardown/strategic-shift-detector.ts` | Layer 3: detects the strategic pivot |
| `scripts/cro-teardown/visual-analyzer.ts` | Layer 1.5: Claude vision on screenshots |
| `scripts/cro-teardown/context-researcher.ts` | Layer 4: web research on brand history |
| `scripts/cro-teardown/outline-generator.ts` | Layer 3.5: custom per-brand outline |
| `scripts/cro-teardown/publish-article.ts` | Writes final `.ts` article file |
| `scripts/seo-check.mjs` | Build-time SEO + screenshot validation |
| `src/content/cro-teardown/index.ts` | Article registry (order = newest first) |
| `vercel.json` | Trailing slash normalization + slug redirects |
| `scripts/seo/index.mjs` | SSR prerender — see [seo-engine.md](seo-engine.md) |
