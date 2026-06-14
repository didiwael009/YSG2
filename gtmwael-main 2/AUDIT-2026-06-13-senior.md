# Senior Technical Audit — yoursaasgrowth / CRO Teardown Engine

**Date:** 2026-06-13
**Auditor:** Senior technical auditor (independent pass)
**Scope:** Full repo — security, correctness, build/deploy drift, dependency health, code quality, docs.
**Method:** Read-only. Claims verified against live code, git, dist, sitemap, `npm audit`, `eslint`, `tsc`.
**Outcome:** Findings only. **No changes implemented.**

> Cross-references the prior same-day `AUDIT-2026-06-13.md`. Where that audit's findings have since been resolved or changed, this is noted.

---

## Severity legend
- **P0** — security exposure or live-site breakage. Address now.
- **P1** — correctness/process risk that will bite. Address soon.
- **P2** — hygiene, dead code, drift. Address when convenient.
- **P3** — nicety / consistency.

---

## Executive summary

The codebase is in **reasonable health**. No hardcoded secrets reach version control, the XSS surface is genuinely mitigated, and the build typechecks clean. The real risks are **operational, not catastrophic**:

1. A money-spending LLM pipeline (~14.7k LOC) with **zero automated tests** and **15 silent empty-catch blocks** — failures are swallowed and a degraded article can still publish.
2. **Dependency vulnerabilities** (5 high / 4 moderate), including `react-router-dom` which ships to the browser.
3. **Build/deploy drift** — a stale `loom` route still lives in `dist/` though it's absent from the registry.
4. **Loose TypeScript** (`strict: false`, `strictNullChecks: false`) on a null-heavy data pipeline.

---

## P0 — Security & exposure

| ID | Finding | Evidence |
|----|---------|----------|
| **S1** | **`.env.save` sits on disk in plaintext with live secrets.** Mode `600`, untracked (gitignored via `*.env.save`), so it is *not* in git — but it is an unencrypted credential backup containing `ANTHROPIC_API_KEY` and Supabase keys. Backup files like this are a classic accidental-leak vector (rsync, tar, IDE indexing, support bundles). | `ls -la .env.save` → `-rw------- 1131 bytes`; gitignore line `*.env.save` |
| **S2** | **Runtime dependency vulnerabilities reach the shipped app.** `npm audit` reports **9 vulns (5 high, 4 moderate)**. `react-router-dom@7.x` (runtime, browser-shipped) depends on vulnerable `react-router`. `ws` (moderate, memory disclosure) and `yaml` (moderate, stack overflow) are in the build/tooling chain. | `npm audit --omit=dev` → 9 vulnerabilities; `fix available via npm audit fix` |

**Verified NOT a problem (good):**
- No hardcoded secrets in any tracked file. The only `sk-ant-` hits are documentation placeholders in `anthropic-client.ts`.
- `.env` is gitignored and untracked. `git ls-files | grep .env` → empty.
- All API-key access goes through `process.env.ANTHROPIC_API_KEY` + a `tryLoadDotEnv()` helper, matching the project's stated security rule.
- Supabase keys exposed to the client are `VITE_SUPABASE_PUBLISHABLE_KEY` (anon/publishable by design — safe to ship).

---

## P1 — Correctness & process risk

| ID | Finding | Evidence |
|----|---------|----------|
| **Q1** | **No automated tests anywhere.** Zero `*.test.ts` / `*.spec.ts` across a 14.7k-LOC pipeline that spends real Anthropic credits per run. Any regression (prompt change, schema drift, reorder) is caught only by reading output. The recent pipeline-reorder work (visual/research before strategic-shift) has no test asserting the new order or the research-injection contract. | `find … -name '*.test.*'` → none |
| **Q2** | **15 silent empty-catch blocks (`no-empty`).** The pipeline's pervasive "non-fatal try/catch" pattern swallows errors with no log in several places. Combined with **resume-by-file-existence** caching, a half-written or empty JSON artifact causes a step to be silently *skipped*, and the article still assembles and can publish degraded. This is the structural cause of the kind of "nonsense content" already hit on Foreplay. | `eslint` → 15× `no-empty`; `compose-all-sections.ts` catches are logged, but several lower-level `catch {}` are not |
| **Q3** | **No cost ceiling / budget guard.** The pipeline chains many metered LLM calls with no hard stop. The real-world Foreplay run exhausted credits mid-compose ($1.51) and left the article in a broken, partially-judged state. A per-run USD ceiling that aborts cleanly would prevent half-baked publishes. | Foreplay incident (HANDOFF); no budget check in `compose-all-sections.ts` |
| **Q4** | **TypeScript strictness is disabled.** `strict: false`, `strictNullChecks: false`, `noImplicitAny: false` across both tsconfigs. For a pipeline that parses optional JSON fields everywhere (`r.key_events ?? []`, `e.period ?? '?'`), null-safety is exactly the class of bug most likely to slip through — and the compiler is told to ignore it. | `tsconfig.json` / `tsconfig.app.json` |

---

## P2 — Drift, dead code, hygiene

| ID | Finding | Evidence |
|----|---------|----------|
| **D1** | **Stale `loom` route still in `dist/`.** `dist/cro-teardowns/loom/` is built and (if `dist` is the deploy artifact) served, but `loom` is **not** in the article registry (`index.ts`) — no `import { loom }`, not in `croTeardownPosts`. The prior audit flagged `happi` + `loom`; `happi` is now cleaned, `loom` remains. A fresh `npm run build` from a clean tree resolves it. | `comm` of dist routes vs registry → `loom` only in dist; `grep loom index.ts` → absent |
| **D2** | **sitemap (19) vs registry (18) mismatch.** 19 `cro-teardowns` entries in `public/sitemap.xml`, 18 articles in the registry. Likely the same stale `loom` leaking into the generated sitemap. Worth confirming the sitemap is regenerated from the registry, not from `dist`. | `grep -c cro-teardowns sitemap.xml` → 19; registry → 18 |
| **D3** | **Three lockfiles, ambiguous package manager.** `bun.lock`, `bun.lockb`, *and* `package-lock.json` all tracked. `npm` scripts are used in `package.json`, but the bun lockfiles invite drift and "works on my machine" installs. Pick one manager; delete the others. | `ls *.lock* package-lock.json` |
| **D4** | **Orphaned scripts.** `draft.ts` and `compose-section.ts` have no importers (superseded by `compose-all-sections.ts`). Dead code. (Confirms prior audit C1/C2 — still present.) | `git grep "from '…/compose-section'"` → none |
| **D5** | **Documentation sprawl.** 8 top-level doc/spec files: `HANDOFF.md` (23 KB), `AGENTS.md`, `PROJECT_CONTEXT.md`, `AUDIT-2026-06-13.md`, `TASKS.md`, `SKILL.md`, `CODEX_MARKETING_SKILLS_README.md`, `SEO_RULES.md`. The prior audit already documented HANDOFF drift (stale counts, a SECTION_ORDER change that never happened). Overlapping sources of truth guarantee future drift. | repo root listing |
| **D6** | **18 ESLint errors.** 15× `no-empty` (Q2), 2× `ban-ts-comment`, 1× `prefer-const`. `npm run lint` is not clean, so it can't gate CI. | `eslint .` → 22 problems (18 errors, 4 warnings) |

---

## P3 — Niceties

| ID | Finding |
|----|---------|
| **N1** | **XSS path is safe but implicitly so.** `ArticleBody.tsx` / `BusinessContextBlock.tsx` / `QuickAnswerBlock.tsx` use `dangerouslySetInnerHTML`, but `renderHtml()` runs `escapeHtml()` first and the bold/italic regexes exclude `<>`, so injected tags can't survive. Safety depends entirely on (a) content staying build-time-trusted and (b) `escapeHtml` always running first. A one-line comment is there; a shared sanitization helper (or DOMPurify) would make the guarantee explicit rather than convention-based. No action required today. |
| **N2** | `SECTION_ORDER` IDs are non-sequential (`01,03,04,05,07,06`) and `02-quick-answer` history is confusing — a readability trap for the next maintainer (carried from prior audit B2). |
| **N3** | `.DS_Store` (10 KB) tracked-adjacent and present in repo root; gitignored but cluttering the tree. |

---

## What's healthy (don't touch)

- Secret handling: no leaks in git, consistent env-var discipline.
- `tsc --noEmit` passes clean — the loose config still compiles without type errors.
- The recent pipeline reorder (visual + context research → strategic-shift) is wired correctly and typechecks; the research-injection contract into `strategic-shift-detector.ts` is sound.
- Graceful Supabase degradation (`disabledSupabaseClient`) when env is unconfigured.

---

## Recommended remediation order

1. **S2** — `npm audit fix`, re-test the app (5 high vulns, one browser-shipped).
2. **S1** — delete `.env.save`; if a backup is needed, encrypt it (e.g. `age`/`gpg`).
3. **D1/D2** — clean `dist/`, rebuild from a clean tree, confirm sitemap regenerates from the registry.
4. **Q2/Q3** — replace silent `catch {}` with logged failures; add a per-run USD ceiling that aborts cleanly.
5. **Q1** — add a minimal test harness: schema-validation tests on the JSON artifacts + one golden-path assertion on section order. Highest leverage given the money-per-run model.
6. **Q4** — enable `strictNullChecks` incrementally (it will surface real bugs in the `?? fallback` code).
7. **D3/D4/D6** — one lockfile; delete orphaned scripts; get `lint` to zero so it can gate CI.

---

*Read-only audit. No source, config, or data files were modified. This report is the only artifact written.*
