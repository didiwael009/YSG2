# SEO Engine

## What it does

Generates SSR-prerendered HTML for all CRO teardown articles, runs validation checks, and produces structured data (JSON-LD, Open Graph, sitemap) at build time.

## SSR prerender

`scripts/seo/index.mjs` is the entry point. It:
1. Loads `croTeardownPosts` from `src/content/cro-teardown/index.ts`.
2. Builds a `seoRoutes` set: `/cro-teardowns/[slug]` (no trailing slash).
3. Calls `renderToString` via Vite SSR (`src/entry-server.tsx`) for each route.
4. Writes the prerendered HTML to `dist/cro-teardowns/[slug]/index.html`.

### Critical rule: no trailing slash in route paths

The `prerenderRoutes` set **must not** include trailing slashes. A mismatch between route format in the prerender list and the actual React Router `<Route>` paths causes the SSR to serve a static fallback (~10 KB) instead of the actual article content (~55-65 KB).

**Wrong (causes 10 KB static fallback for all articles):**
```js
...croTeardownPosts.map((post) => `/cro-teardowns/${post.slug}/`)
```

**Correct:**
```js
...croTeardownPosts.map((post) => `/cro-teardowns/${post.slug}`)
```

This bug was active from June 8 to June 27, 2026. All articles were rendering <10 KB HTML visible to crawlers.

## Validation gate (seo-check.mjs)

Run `node scripts/seo-check.mjs` to validate:
- Each article has exactly 1 `<h1>`.
- Prerendered HTML has enough `<p>` paragraphs (≥5) — catches SSR failures.
- Internal links count (≥5 per article).
- JSON-LD structured data is present.
- Screenshot files pass size gate (see [screenshot-engine.md](screenshot-engine.md)).

Always run this after adding new articles or changing the route structure.

## Article index sort order

`src/content/cro-teardown/index.ts` exports `croTeardownPosts`. The array order controls:
- The order articles appear on the `/cro-teardowns` index page.
- Internal linking order ("Related teardowns").
- Sitemap order (affects crawl priority).

**Rule: newest first by `datePublished`.** Articles published more recently appear first. Do not use creation order, alphabetical order, or ad-hoc insertion.

## Structured data

Each article generates:
- `Article` JSON-LD with `headline`, `description`, `datePublished`, `author`.
- `FAQPage` JSON-LD when `post.faqItems` is present.
- Open Graph meta tags (`og:title`, `og:description`, `og:image`).
- Twitter card meta tags.

## Sitemap

`scripts/seo/sitemap.mjs` generates `public/sitemap.xml` from `croTeardownPosts`. Runs as part of `npm run build`.

## Canonical URL and trailing slash

`vercel.json` is set to `"trailingSlash": false`. Vercel will redirect any URL with a trailing slash to the non-slash version (301). No trailing slashes anywhere in article slugs, links, or redirects.

## Slug conventions

- All slugs lowercase, hyphen-separated.
- No version suffixes in public slugs (use `lucidya` not `lucidya-v2`).
- If an article is regenerated with a V2 pipeline but same brand, expose it at the clean slug. Add a 301 redirect from the old slug in `vercel.json`.

## Known SEO issues log

| Date | Issue | Fix applied |
|---|---|---|
| 2026-06-27 | Apollo brand name all lowercase in H1/title/meta | Fixed — `companyName`, `h1`, `metaTitle`, `description`, `featuredImageAlt` capitalized |
| 2026-06-27 | Article index oldest-first (bad for crawl priority) | Fixed — reordered newest-first |
| 2026-06-27 | TOC `<a>` tags concatenated in crawler output | Fixed — wrapped in `<ul><li>` |
| 2026-06-27 | `lucidya-v2` slug exposed publicly | Fixed — slug changed to `lucidya`, 301 redirect from `/cro-teardowns/lucidya-v2` |
| 2026-06-27 | All teardown articles serving 10 KB SSR fallback since June 8 | Fixed — trailing slash removed from `prerenderRoutes` in `scripts/seo/index.mjs` |
