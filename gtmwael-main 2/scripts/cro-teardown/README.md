# CRO Teardown Generator — Phase 1

Collects archived homepage screenshots from the Wayback Machine at a configurable interval, plus a current live capture, and extracts visible page text from the DOM for each page.

## Usage

```bash
npm run cro-teardown -- \
  --name Stripe \
  --url https://stripe.com \
  --from 2023-01 \
  --to 2026-06 \
  [--step-months 3]
```

### Options

| Flag | Required | Default | Description |
|---|---|---|---|
| `--name` | yes | — | Company display name (e.g. `Stripe`) |
| `--url` | yes | — | Homepage URL to capture |
| `--from` | yes | — | Start month in `YYYY-MM` format |
| `--to` | yes | — | End month in `YYYY-MM` format (inclusive) |
| `--step-months` | no | `3` | How many months between each snapshot slot. `1` = every month, `3` = quarterly, `6` = bi-annual |

The company name is slugified automatically: `Stripe` → `stripe`, `Buffer Inc` → `buffer-inc`.

## Output

```
data/cro-teardowns/[slug]/
  config.json              # run parameters
  archive-snapshots.json   # full manifest with paths, timestamps, and status
  page-text/
    2023-01.json           # structured DOM text (title, h1–h3, CTAs, nav, body)
    2023-01.txt            # plain-text version
    current-live.json
    current-live.txt
  logs/
    run-[timestamp].log    # detailed per-step log

public/cro-teardowns/[slug]/
  archive-monthly/
    2023-01.webp           # full-page screenshot (WebP via sharp)
    2023-04.webp
    …
    current-live.webp      # live homepage snapshot
  selected/                # reserved for Phase 2 (curated picks)
```

Both output roots are gitignored — screenshots and extracted text are not committed.

## How snapshot discovery works

For each slot (spaced `--step-months` apart starting at `--from`):

1. The Wayback CDX API is queried for all archived snapshots within that slot's date window.
2. The snapshot closest to the **midpoint** of the window is selected.
3. If no archive exists for that window the slot is marked `not_found`.

CDX requests are sequential with a 500 ms delay to stay polite with the Wayback API.

## archive-snapshots.json schema

Each entry in the manifest:

```json
{
  "month": "2023-01",
  "slotStart": "2023-01",
  "slotEnd": "2023-03",
  "stepMonths": 3,
  "timestamp": "20230215015358",
  "originalUrl": "https://stripe.com",
  "waybackUrl": "https://web.archive.org/web/20230215015358/https://stripe.com",
  "screenshotPath": "/cro-teardowns/stripe/archive-monthly/2023-01.webp",
  "textPathJson": "/data/cro-teardowns/stripe/page-text/2023-01.json",
  "textPathTxt": "/data/cro-teardowns/stripe/page-text/2023-01.txt",
  "status": "captured",
  "qualityScore": null,
  "usedInArticle": false,
  "error": null
}
```

Status values: `captured` | `failed` | `not_found`

The `current` entry uses `"month": "current"` and has no `waybackUrl` or `timestamp`.

## File structure

```
scripts/cro-teardown/
  index.ts          # CLI entrypoint and orchestrator
  wayback.ts        # Wayback CDX discovery
  screenshots.ts    # Playwright capture + DOM text extraction
  utils/
    browser.ts      # browser/context factory
    files.ts        # slugify, ensureDirs, saveJson, saveText
    logger.ts       # file logger (detail stays out of the terminal)
  README.md
```

## Phase 2 — Visual deduplication + preview

```bash
# Auto mode (default threshold 0.96)
npm run cro-teardown:select -- --name Hootsuite [--threshold 0.96]

# Manual mode — pick exact months
npm run cro-teardown:select -- --name Hootsuite --manual 2023-01,2024-07,current-live
```

Reads `archive-snapshots.json`, fingerprints each captured screenshot (32×32 grayscale via sharp), and marks any image with cosine similarity ≥ threshold to the previous kept image as a duplicate. The first archive entry and `current-live` are always kept.

**Output:**

| File | Description |
|---|---|
| `data/[slug]/scored-snapshots.json` | All captured entries with similarity scores |
| `data/[slug]/selected-snapshots.json` | Kept entries only |
| `data/[slug]/preview.html` | Visual grid — selected highlighted, duplicates greyed |
| `public/[slug]/selected/*.webp` | Copied selected screenshots |

Open the preview: `open data/cro-teardowns/[slug]/preview.html`

## Phase roadmap

| Phase | Status | Description |
|---|---|---|
| 1 | done | Wayback discovery, screenshots, DOM text extraction |
| 2 | done | Visual deduplication, selection, preview |
| 3 | planned | CRO analysis and MDX article generation |
