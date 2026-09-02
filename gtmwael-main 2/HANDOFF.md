# Handoff — moving to the new Mac

Written 28 Aug 2026. Repo clean at `aeffb3b`, local and remote in sync.

Everything committed is on GitHub and needs no transfer. This covers the six
things that live outside git, the order to restore them in, and where the work
stands when you pick it up.

---

## Status

| | |
|---|---|
| Uncommitted changes | 0 |
| Migration bundle | `~/Desktop/ysg-mac-migration.zip`, 77 MB |
| Homepage study | live at `/blog/saas-homepage-study` |
| Companies with bad capture data | 8 |
| Published teardowns | 25 |
| Blog articles | 6 |
| Companies with collected data | 62 |

---

## What git does not protect

`git clone git@github.com:didiwael009/YSG2.git` restores all code, content, and
the teardown dataset. The bundle only fills these gaps.

| Outside git | Size | If lost |
|---|---|---|
| `.env` | 1 KB | The Google OAuth flow has to be redone by hand. The other keys are re-issuable from their consoles. |
| `~/.ssh/id_ed25519` | — | No pushes to GitHub until a new key is registered. |
| `~/.claude/skills/` | 584 KB | 13 skills gone: seo-expert, cro-expert, growth-marketing, ppc-expert, ai-marketing, icp-discovery-engine, graphify and others. |
| `~/.claude/*/memory/` | 380 KB | Writing rules, conventions, and project decisions across 12 projects. |
| `manual/` | 5.7 MB | CRO_MANUAL agent responses. Reproducible only by re-running the slow manual loop. |
| `public/cro-teardowns/*/archive-monthly/` | 77 MB | Raw Wayback screenshots. **Treat as permanent** — see the capture warning below. |

### The bundle holds secrets in plain text

`secrets/env.backup` carries the Anthropic API key, the Google refresh token,
and the Supabase keys. `secrets/id_ed25519` is a private SSH key. Keep the
bundle off unencrypted cloud storage and delete it once the new machine works.

A private key that has travelled between machines is a key worth rotating.
Generating a fresh one on the new Mac and registering it with GitHub is the
cleaner move; the copied key is there so you are not locked out while you do it.

---

## Restore, in order

Step 1 comes first because the clone in step 2 fails without it.

### 1. SSH key and permissions

Git refuses a private key with loose permissions, so the `chmod` is not optional.

```bash
mkdir -p ~/.ssh
cp secrets/id_ed25519 secrets/id_ed25519.pub ~/.ssh/
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
ssh -T git@github.com          # expect: Hi didiwael009!
```

### 2. Clone, then drop in the environment

The repo root sits one level above the app folder, which is why the paths below
look doubled. That is correct.

```bash
cd ~/Documents
git clone git@github.com:didiwael009/YSG2.git
cp secrets/env.backup "YSG2/gtmwael-main 2/.env"
```

### 3. Claude configuration and memory

```bash
cp -R claude/skills ~/.claude/skills
cp claude/settings.json ~/.claude/settings.json
cp claude/CLAUDE-global.md ~/.claude/CLAUDE.md
cp claude/CLAUDE-home.md ~/CLAUDE.md

for d in claude/memory/*; do
  mkdir -p ~/.claude/projects/$(basename "$d")
  cp -R "$d" ~/.claude/projects/$(basename "$d")/memory
done
```

### 4. Untracked project files

```bash
cd "YSG2/gtmwael-main 2"
cp -R ../../project/manual ./manual
cp ../../project/launch.json .claude/launch.json

for d in ../../project/archive-monthly/*; do
  cp -R "$d" "public/cro-teardowns/$(basename "$d")/archive-monthly"
done
```

### 5. Install and verify

The GSC check is the real test: it proves the refresh token survived the move.

```bash
npm install
node scripts/gsc.mjs top-pages 5     # should print live Search Console data
npm run build                         # ends with "SEO check passed"
```

---

## Where the work stands

| What | State | Detail |
|---|---|---|
| Homepage study | **Live** | 3,215 words, 54 companies, 542 captures |
| Broken deploy | **Fixed** | An untracked `preply.ts` was breaking every Vercel build; production had been serving a stale bundle |
| FAQ on Meta Ads page | **Live** | 5 entries taken verbatim from queries the page already ranks 1st and 8th for |
| Editorial internal links | **Live** | 13 ranking teardowns now pass authority to money pages in body copy, not just nav |
| Search Console access | **Permanent** | Refresh token in `.env`; no more pasting hourly tokens |
| CASHIN teardown | **Unpublished** | Its central claim was false — see traps |
| `og-default.png` | **Rebuilt** | Was rendering with a black wedge across 21 pages |

---

## Open

**The study earns nothing until it is distributed.** It was built to attract
backlinks that lift `/meta-ads-for-saas` from position 30 to page one. A link
asset attracts no links passively. Prospecting and outreach is the work that
activates everything built this week; skipping it wastes the build.

| Next | Score | Blocked on |
|---|---|---|
| Distribute the study — prospecting list and outreach | — | Nothing |
| Question page: pricing page vs demo page | 12/27 | Nothing. Already ranks 8.2 on 132 impressions |
| Merge the four landing-page / CRO pages | 18/27 | **Your call** which URL survives |
| Extend `/meta-ads-for-saas` to ~5,000 words | 18/27 | **Your campaign data** |
| Rebuild CASHIN from the corrected captures | — | Nothing. Real data is in place |
| Re-collect 8 companies with failed captures | — | Nothing. Use `scripts/collect-http.mjs` |

---

## Traps

These four fail silently. Nobody will rediscover them without this note.

### The browser capture path against Wayback is broken

Phase 1 loads every asset from web.archive.org, which trips their load shedding
and returns "Temporarily Offline" instead of the page. Measured at roughly 89%
failure. It is not a timeout and not your concurrency — a single request per
page works fine, a browser making dozens does not.

Use `scripts/collect-http.mjs` for data. It fetches archived HTML in one request
and succeeded 100% where the browser failed. It produces no screenshots, so
publishing a full teardown still depends on the broken path.

### Roughly one capture in five in the existing corpus is an error page

Still affected: `sahl` 12/13, `tarjama` 11/12, `wafeq` 8/10, `signit` 6/7,
`unifyapps` 6/7, `vennre` 6/7, `fortis` 2/3, `stitch` 1/2. None has a published
article, so nothing is live on bad data — but any analysis touching them needs
the same exclusion the study used.

CASHIN was the one that reached production. Its article said the company went
"from no public web presence" to a structured platform. The archive holds 38
real captures from 2021 showing an active site. The real story existed and was
different. Unpublished rather than patched, because the snapshots, counts, and
prose all descended from the error pages.

### Two site conventions that fail silently

`**bold**` in blog prose renders as literal asterisks. `renderInlineText` in
`BlogPostLayout.tsx` supports links only. No other article uses bold, which is
why the gap never surfaced.

Tailwind opacity steps like `/12` and `/8` do not exist in this config and
resolve to transparent. That made a chart's zero-value bars invisible with no
error anywhere.

### Writing style is a hard rule

Measured against the site's five existing articles: 2 em-dashes across 10,763
words. A first draft of the study carried 46 in 2,990. Em-dashes and bold are
banned from site content; the house voice is short declarative sentences. Saved
in memory as `feedback_no_ai_writing_style`.

---

## Reference

```bash
# Search Console (refresh token, no manual auth)
node scripts/gsc.mjs top-pages 30
node scripts/gsc.mjs top-queries 50
node scripts/gsc.mjs page-queries https://www.yoursaasgrowth.com/meta-ads-for-saas
node scripts/gsc.mjs all-teardowns

# Wayback data collection, HTTP only, no screenshots
node scripts/collect-http.mjs --only slug1,slug2 --concurrency 3

# Build and SEO gates
npm run build
node scripts/seo-check.mjs
```

Web version of this document:
https://claude.ai/code/artifact/c60d6221-008c-4cdc-9bc3-b1d6c60253d1
