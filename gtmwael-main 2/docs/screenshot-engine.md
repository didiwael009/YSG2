# Screenshot Engine

## What it does

Captures Wayback Machine archives for a given company URL across multiple time periods, saves them as `.webp` files under `public/cro-teardowns/[slug]/selected/`, and feeds them into the teardown article.

## Capture process

1. **Phase 1 (capture):** `scripts/cro-teardown/screenshot-runner.ts` hits the Wayback CDX API to find the closest available snapshot to a target month, then puppeteer-screenshots the Wayback URL.
2. **Phase 2 (selection):** `scripts/cro-teardown/screenshot-selector.ts` picks the best 2–4 snapshots from the raw captures based on visual diversity and date spread. Output: `data/cro-teardowns/[slug]/selected-snapshots.json`.
3. **Phase 3 (copy):** Selected `.webp` files are copied to `public/cro-teardowns/[slug]/selected/`. A `current-live.webp` is captured from the live URL directly.

## Known failure modes

### 1. 503 Wayback pages (blank 7–10 KB WebP)
**Symptom:** Screenshot file is <20 KB; image shows only a white/grey placeholder or Wayback error page.  
**Root cause:** The Wayback archive returned a 503 or maintenance page at capture time.  
**Detection:** `scripts/seo-check.mjs` rejects any screenshot <20 KB without `screenshotMissing: true`.  
**Fix:** Add `screenshotMissing: true` to the `SnapshotEntry` and/or `AnalysisBlock` in the article `.ts` file. The UI will show an "Archive unavailable" placeholder instead of the broken image.

### 2. Unstyled / CSS-fail captures (330–500 KB WebP, looks like raw HTML text)
**Symptom:** Screenshot is large (>100 KB) but shows raw text, no layout, no images — CSS failed to load in the Wayback viewer.  
**Root cause:** The Wayback CDX served the HTML page but CSS assets returned 404 from the archive. Puppeteer captured the unstyled result.  
**Detection:** File size gate cannot catch this (file is large). Requires human visual inspection.  
**Fix:** Same as above — `screenshotMissing: true` on the entry. Set `featuredImage` to a screenshot that does have proper styling (e.g. `current-live.webp`).

### 3. Hero shows broken "before" screenshot
**Symptom:** `TeardownHero` renders a white box or broken image as the "before" card.  
**Root cause:** Hero was hardcoded to `snapshots[0]`. If that snapshot has `screenshotMissing: true`, a bad path was rendered.  
**Fix (already applied):** `TeardownHero.tsx` uses `snapshots.find(s => !s.screenshotMissing)` as the "before" source. Falls back to showing single "current" card when no valid early snapshot exists.

## Validation gate (seo-check.mjs)

`scripts/seo-check.mjs` runs at build time. It:
- Loads all CRO teardown articles from `src/content/cro-teardown/index.ts`.
- For each `SnapshotEntry` and `AnalysisBlock`, resolves `screenshotPath` to `public/[path]`.
- Rejects any file <20 KB that doesn't have `screenshotMissing: true`.

**This gate cannot catch unstyled HTML captures** — those are visually broken but file-size passes. Visual QA is required before publishing.

## Recommended workflow when adding a new article

1. Run the capture phase.
2. Open each selected `.webp` visually — do not trust file size alone.
3. For any 503/maintenance/unstyled screenshot: set `screenshotMissing: true` on that entry.
4. For `featuredImage`: pick a screenshot that actually looks like a real homepage.
5. Run `node scripts/seo-check.mjs` — if it passes, the screenshot gate is clean.
6. Check `TeardownHero` visually in the dev preview to confirm "before/after" cards render correctly.

## UI components

| Component | File | Behavior when `screenshotMissing: true` |
|---|---|---|
| `ScreenshotTimeline` | `src/components/cro-teardown/ScreenshotTimeline.tsx` | Shows archive icon + "Archive unavailable" label |
| `ScreenshotAnalysisBlock` | `src/components/cro-teardown/ScreenshotAnalysisBlock.tsx` | Drops image column; observations panel goes full-width |
| `TeardownHero` | `src/components/cro-teardown/TeardownHero.tsx` | Skips missing entries to find first real screenshot |
