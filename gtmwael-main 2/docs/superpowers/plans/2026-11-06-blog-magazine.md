# Blog Magazine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn `/blog` into a light magazine home (Latest, AI News, Teardowns, Guides, profile band), give guides and news one shared light article layout, and ship the first AI News issue (veille Nov 3 to 6).

**Architecture:** All home-page selection logic lives in one pure module (`src/content/blog/magazine.ts`) tested with vitest. News issues are ordinary `BlogPost`s with `category: "AI News"` and a new `news-item` block, so `/blog/:slug`, the prerender, sitemap and JSON-LD reuse the existing pipeline. Components are split by page region under `src/components/blog/`.

**Tech Stack:** Vite + React 18 + React Router + Tailwind 3.4, vitest (node env), SSR prerender via `scripts/seo/index.mjs`.

**Spec:** `docs/superpowers/specs/2026-11-06-blog-magazine-design.md` (approved). Visual reference: `.superpowers/brainstorm/7641-1793984431/content/magazine-v3.html` (local, gitignored). Read both before Task 1.

## Global Constraints

- Project root: `/Users/wael/Documents/YSG2/gtmwael-main 2`. Dev server http://localhost:8081. Never touch port 8080 (Open WebUI).
- Build (do not use `npm run build`, it hangs locally): `npx tsc --noEmit -p .` then `npx vite build` then `node scripts/generate-seo-pages.mjs` then `node scripts/seo-check.mjs`. Tests: `npx vitest run`.
- No commits and no push during execution. Wael commits only on his word, after he approves the issue text (Task 7). Never stage `ysg-mac-migration/`.
- Site copy: no em-dash (`—`), no bold (`<b>`, `<strong>`, `font-bold` on body copy, `**`). Titles may use weight 500 serif.
- No invented content: every figure in copy or sample data comes from a source file. No scores.
- Serif = `Georgia, "Times New Roman", serif` (system, nothing downloaded). Labels/tabs = `ui-monospace, Menlo, monospace`. Body = site body font.
- Colours: cream `hsl(var(--background-light))` (30 30% 96%), orange `hsl(var(--primary))` (16 90% 50%) for category labels, buttons, pills, active tab; purple `hsl(var(--accent))` (250 70% 62%) 3px section rules; dark band `linear-gradient(180deg,hsl(240 30% 6%),hsl(260 35% 12%))` for lead band and profile band; headings `hsl(var(--heading-light))`.
- No glow, no emoji, no gradient on cards. Images: `loading="lazy"` except the first visible one, explicit `width`/`height`.
- Existing post and teardown URLs, `metaTitle`, canonical stay byte-identical. Only `/blog` title/description change.
- Profile copy, same everywhere: "Written by Wael. I rebuild sites, run content and ads for digital businesses and agencies." Button "Work with me" to `/book`. Portrait `/hero-portrait-256.webp`.
- Article `.ts` files must stay a single literal `export const x: BlogPost = {...};` (the SEO scripts eval it with `Function`): no imports used inside, no function calls, no template literals with expressions.
- Browser automation (Flow, Reddit captures) only through browser-kit: `browser-kit ensure <site>`, `launchKit()` from `~/browser-kit/lib.ts`, human helpers. Never type credentials. Reddit read-only.
- Reply to Wael in French.

## Review Focus

1. Phone width (375 px): lead band, 4-column teardown row, wide tables and image-compare must not create horizontal page scroll. Expect one column and wide blocks scrolling inside their own box. Pinned in Task 4 Step 6 and Task 3 Step 6.
2. Unknown or repeated `?type=` value (`?type=foo`, `?type=NEWS`): expect the Latest view, never an empty page. Pinned in Task 1 test `parseTab`.
3. Deep link `/blog/<issue>#<item-id>` from the home: the item heading must land below the fixed nav, not under it. Pinned in Task 3 Step 6 (`scroll-mt-28` on each item, checked in browser).
4. A teardown or guide whose card image path does not exist in `public/` would show a broken image on the home. Expect every card image to exist. Pinned in Task 1 test `every card image exists`.
5. Hydration: a visitor landing on `/blog?type=news` gets prerendered Latest HTML; React must not throw a hydration mismatch. Expect the filter applied after mount, no console error. Pinned in Task 4 Step 6.

---

### Task 1: Types and magazine selection logic

**Files:**
- Modify: `src/content/blog/types.ts`
- Create: `src/content/blog/magazine.ts`
- Modify: `vitest.config.ts` (add `@` alias to `src`, include `tests/**/*.test.{ts,tsx}`)
- Test: `tests/blog-magazine.test.ts`

**Interfaces:**
- Produces, in `types.ts`:
  - new `BlogBlock` member `{ type: "news-item"; id: string; rubrique: string; title: string; text: string[]; image: string; imageAlt: string; limit: string; sourceLabel: string; sourceUrl: string }` (`text` is paragraphs).
  - `BlogPost` gains `featured?: boolean` and `cardImage?: string`; `faq`, `source`, `primaryKeyword`, `internalLinks`, `relatedPosts` become optional (`?`).
- Produces, in `magazine.ts`:
  - `export const NEWS_CATEGORY = "AI News"`
  - `export type MagazineTab = "latest" | "news" | "guides"`
  - `export type CardRef = { title: string; href: string; date: string; label: string; image?: string; imageAlt?: string }`
  - `isNewsIssue(post: BlogPost): boolean`
  - `getNewsItems(posts: BlogPost[]): CardRef[]` — newest issue first, items in issue order; `href` = `${post.path}#${item.id}`, `label` = item.rubrique, `date` = issue `datePublished`, image = item image.
  - `getGuides(posts: BlogPost[]): BlogPost[]` — non-news, `datePublished` desc.
  - `getLeadGuide(posts: BlogPost[]): BlogPost | undefined` — first guide with `featured: true`, else newest guide.
  - `sortTeardowns(posts: CroTeardownPost[]): CroTeardownPost[]` — `datePublished` desc; ties: later array index first (the array grows by appending).
  - `getLatestColumn(posts: BlogPost[], teardowns: CroTeardownPost[], n: number): CardRef[]` — news items if any exist; otherwise newest guides and teardowns merged by date. Never returns placeholder items.
  - `toCard(post: BlogPost | CroTeardownPost): CardRef` — guide: `image = cardImage ?? featuredImage`, `label = category`; teardown: `href = /cro-teardowns/${slug}`, `label = "Teardown"`, `image = featuredImage`.
  - `parseTab(value: string | null): MagazineTab` — `"news"`, `"guides"` exactly (lower-case); anything else `"latest"`.

- [ ] **Step 1: Write the failing tests** in `tests/blog-magazine.test.ts`, using small inline fixtures plus the real `blogPosts` and `croTeardownPosts`:
  - `getNewsItems` on two fixture issues (Nov 2 with items a,b; Nov 6 with c) returns hrefs `["/blog/nov6#c", "/blog/nov2#a", "/blog/nov2#b"]`.
  - `getNewsItems(blogPostsWithoutNews)` returns `[]`; `getLatestColumn(blogPostsWithoutNews, croTeardownPosts, 4)` has length 4, every href starts with `/blog/` or `/cro-teardowns/`.
  - `getLeadGuide` returns the `featured: true` fixture over a newer unflagged one; with no flag returns the newest by date.
  - `sortTeardowns` on three fixtures `[A 2026-06-10, B 2026-06-10, C 2026-07-01]` returns `[C, B, A]`.
  - `parseTab("news") === "news"`, `parseTab("guides") === "guides"`, `parseTab("foo") === "latest"`, `parseTab("NEWS") === "latest"`, `parseTab(null) === "latest"`.
  - `every card image exists`: for every real guide and teardown, `toCard(x).image` resolves to an existing file under `public/`.
  - `getGuides(blogPosts)` excludes any `category: "AI News"` post.
- [ ] **Step 2:** Run `npx vitest run tests/blog-magazine.test.ts`. Expected: FAIL, cannot resolve `magazine`.
- [ ] **Step 3:** Edit `types.ts` and `vitest.config.ts`, implement `magazine.ts` with the signatures above.
- [ ] **Step 4:** Run `npx vitest run` and `npx tsc --noEmit -p .`. Expected: all tests PASS. `tsc` will now report every place that reads the newly optional fields (`BlogPostLayout.tsx`, `Blog.tsx`); list them in the task report, they are fixed in Tasks 3 and 4. If anything else fails, add `?? []` / optional chaining at that call site.

### Task 2: Profile components (shared)

**Files:**
- Create: `src/components/blog/WaelProfile.tsx`
- Test: `tests/blog-render.test.tsx`

**Interfaces:**
- Produces: `ProfileBand(): JSX.Element` (dark band, portrait, profile copy, "Work with me" button to `/book`, used at the bottom of the home) and `ProfileCard(): JSX.Element` (sidebar card, light, same copy and button). Copy is one exported constant `PROFILE_COPY`.

- [ ] **Step 1: Write the failing test** `renders the profile copy and /book link`: `renderToString(<MemoryRouter><ProfileBand/></MemoryRouter>)` contains `PROFILE_COPY` exactly, `href="/book"`, `hero-portrait-256.webp`, and does not contain `—`. Same assertions for `ProfileCard`.
- [ ] **Step 2:** Run `npx vitest run tests/blog-render.test.tsx`. Expected: FAIL (module missing).
- [ ] **Step 3:** Implement both components. Button uses the orange gradient `linear-gradient(135deg,hsl(16 90% 55%),hsl(30 90% 50%))`, pill shape, white text. Use `<Link>`.
- [ ] **Step 4:** Run the test. Expected: PASS.

### Task 3: Shared light article layout and the `news-item` block

**Files:**
- Create: `src/components/blog/blocks.tsx` (move `renderBlock` and its helpers out of `BlogPostLayout.tsx`, restyle light, add `news-item`)
- Create: `src/components/blog/ArticleSidebar.tsx`
- Modify: `src/components/blog/BlogPostLayout.tsx`
- Test: `tests/blog-render.test.tsx`

**Interfaces:**
- Consumes: `ProfileCard` (Task 2); `getNewsItems`, `getLatestColumn`, `isNewsIssue` (Task 1).
- Produces: `renderBlock(block: BlogBlock, index: number): ReactNode` in `blocks.tsx`; `ArticleSidebar({ currentPath }: { currentPath: string })` lists `ProfileCard` then "Latest news" (5 items from `getLatestColumn(blogPosts, croTeardownPosts, 5)`, excluding links into `currentPath`).

Layout decisions (from spec + mockup article section):
- Whole page on cream background. Header: monospace orange category label (for AI News: `AI NEWS · ` + upper-case date range from `post.breadcrumbTitle` if present, else category), serif h1 (~40-48 px desktop, weight 500), serif dek = `post.excerpt`, byline `By Wael · <date> · <readTime>` in muted small text, then the main image (`featuredImage`) full column width.
- Body grid desktop: text column `max-w-[680px]` + sidebar 260 px; sidebar sticky. Below `lg`, sidebar renders after the text.
- Wide blocks (`data-table`, `comparison-table`, `image-compare`, `data-chart`) get a wrapper allowed up to `max-w-[900px]` on `xl`, with `overflow-x-auto` on tables.
- Dark blocks restyled light: `dark-checklist` becomes a bordered cream card with orange numbers; the quote becomes serif with a 3px purple left rule; table headers become `--heading-light` text on a light tint. Structure and text of every block unchanged.
- `news-item`: `<section id={id} className="scroll-mt-28">`, monospace orange rubrique, serif h2 title, paragraphs, figure with `<a href={sourceUrl} target="_blank" rel="noopener noreferrer">` wrapping the capture image (`imageAlt`), then the line `Limit: {limit} Source: <a ...>{sourceLabel} ↗</a>` with a 2px orange left border, small muted text.
- TOC: for AI News, the TOC lists the items (`post.toc`, ids = item ids). Keep the TOC as a compact list above the text on desktop and mobile (no left column; the sidebar takes the right).
- FAQ, external source line, "Keep reading" render only when their field is present and non-empty. The existing CTA section stays, restyled light, button to `CALENDLY_URL` as today.
- Keep the reading progress bar.

- [ ] **Step 1: Write the failing tests** in `tests/blog-render.test.tsx` (render `BlogPostLayout` inside `MemoryRouter` with `renderToString`):
  - `news issue renders anchored items`: with a fixture AI News post holding two `news-item` blocks and no `faq`/`source`/`relatedPosts`, HTML contains `id="item-a"`, `id="item-b"`, `Limit:`, the two `sourceUrl`s with `rel="noopener noreferrer"`, and does not contain `Frequently Asked Questions`.
  - `guide keeps its FAQ and title`: for the real `saas-traffic-but-no-signups` post, HTML contains its `h1`, every FAQ question, and `Written by Wael` is absent from the body but `PROFILE_COPY` is present once (sidebar).
  - `no dark page shell`: HTML does not contain `bg-[#070711]`.
- [ ] **Step 2:** Run `npx vitest run tests/blog-render.test.tsx`. Expected: FAIL.
- [ ] **Step 3:** Implement `blocks.tsx`, `ArticleSidebar.tsx`, rewrite `BlogPostLayout.tsx` per the decisions above.
- [ ] **Step 4:** Run `npx vitest run` and `npx tsc --noEmit -p .`. Expected: PASS, no type errors in `src/components/blog/`.
- [ ] **Step 5:** Start the preview (`preview_start` name for port 8081, create `.claude/launch.json` entry `npm run dev -- --port 8081` if missing) and open every guide: `/blog/saas-landing-page-google-meta-ads`, `/blog/saas-traffic-but-no-signups`, `/blog/ai-conversion-rate-optimization-saas`, `/blog/landing-page-optimization-best-practices-2026`, `/blog/saas-product-video`, `/blog/saas-homepage-study`. Expected: no console errors, every block visible on cream, no dark section left except the CTA if kept dark by choice (it should be light).
- [ ] **Step 6:** Review Focus 1 and 3: at 375 px on `/blog/saas-homepage-study` run `document.documentElement.scrollWidth <= window.innerWidth` → `true`. After Task 6 exists, open `/blog/<issue>#<second-item-id>` and confirm via `getBoundingClientRect().top >= navHeight` that the heading is not under the nav. Take one desktop and one mobile screenshot for the report.

### Task 4: Magazine home `/blog`

**Files:**
- Modify: `src/pages/Blog.tsx` (full rewrite, hardcoded cards removed)
- Create: `src/components/blog/magazine/MagazineTabs.tsx`, `LeadBand.tsx`, `NewsSection.tsx`, `TeardownsSection.tsx`, `GuidesSection.tsx`
- Modify: `src/lib/seo.ts` (the `/blog` entry only), `scripts/seo/constants.mjs` (`routeContent["/blog"]` intro and section text), `public/llms.txt` (`/blog` line)
- Test: `tests/blog-render.test.tsx`

**Interfaces:**
- Consumes: everything in `magazine.ts` (Task 1), `ProfileBand` (Task 2).
- Produces: `extraGuides: CardRef[]` exported from `magazine.ts` (add it there) with the two non-`/blog` guides that the old page linked: `{ title: "B2B SaaS Marketing Strategy: What to Fix Before Scaling Traffic", href: "/b2b-saas-marketing-strategy", ... }` and the `/saas-marketing-plan` card (copy its current title from `Blog.tsx` before deleting). Use `date` = the date those pages show; if none, put them after dated guides. They appear in the Guides section and Guides tab so these pages keep their inbound link from `/blog`.

Page, top to bottom (mockup v3):
1. `h1` visually small or sr-only: "Growth, AI and Content Blog" (one h1 for SEO).
2. Tabs (monospace): Latest `/blog`, AI News `/blog?type=news`, Guides `/blog?type=guides`, Teardowns `/cro-teardowns`. Active tab: 3px orange underline.
3. Lead band on the dark gradient, grid `1.9fr 1fr 1fr`: left `getLeadGuide` (image, category, serif title ~30-36 px, excerpt, byline); middle newest teardown (`sortTeardowns(...)[0]`) and newest news item (if none, second-newest guide); right "Latest news" from `getLatestColumn(..., 4)` minus anything already shown in the band. Mobile order: lead, middle two, list.
4. "AI News" section (purple rule, serif h2, pill "See all" to `/blog?type=news`): 2 items with images then 3 text items. Hidden when `getNewsItems` is empty.
5. "Teardowns" section: 4 cards from `sortTeardowns` (image + `title`), pill `All ${croTeardownPosts.length}` to `/cro-teardowns`.
6. "Guides" section: 3 cards (`toCard`, image + title) excluding the lead guide, pill "See all" to `/blog?type=guides`.
7. `ProfileBand`.

Tabs filtering: the server render is always Latest. On the client read `useSearchParams()` inside a `useEffect` into state via `parseTab`, so the first client render matches the prerendered HTML. `news` view: all news items as a list (serif title, rubrique, date). `guides` view: all guides + `extraGuides` as cards. Canonical stays `/blog` (no change to head logic).

SEO copy for `/blog` in `src/lib/seo.ts`: title `Growth, AI and Content Blog | Your SaaS Growth`; description (120-155 chars, no em-dash): `AI news every few days, growth guides and teardowns of real SaaS homepages, for digital businesses and agencies relaunching a site or scaling content.` (verify length, adjust wording only to fit). Same description in `constants.mjs` intro; `llms.txt` line: `- /blog — AI news issues, growth and conversion guides, and homepage teardowns.` (llms.txt is not site copy; the existing file already uses `—`, keep its format).

- [ ] **Step 1: Write the failing tests** (`renderToString(<MemoryRouter initialEntries={["/blog"]}><Blog/></MemoryRouter>)`):
  - `home lists real content`: contains the lead guide's title, `href="/cro-teardowns"`, `All 24` (computed: `All ${croTeardownPosts.length}`), `href="/b2b-saas-marketing-strategy"`, `href="/saas-marketing-plan"`, `PROFILE_COPY`, exactly one `<h1`.
  - `no news, no news section`: with `blogPosts` having no AI News (state before Task 6), HTML does not contain `>AI News</h2>`; it still contains the `Latest news` heading with 4 links.
  - `no em-dash in home copy`: rendered text (strip tags) contains no `—`.
- [ ] **Step 2:** Run `npx vitest run tests/blog-render.test.tsx`. Expected: FAIL.
- [ ] **Step 3:** Implement components, rewrite `Blog.tsx`, update `seo.ts`, `constants.mjs`, `llms.txt`.
- [ ] **Step 4:** Run `npx vitest run` and `npx tsc --noEmit -p .`. Expected: PASS.
- [ ] **Step 5:** Run the 4 build commands. Expected: `seo-check` passes; `dist/blog/index.html` contains `<title>Growth, AI and Content Blog | Your SaaS Growth</title>` and the lead guide title in the body HTML.
- [ ] **Step 6:** Review Focus 1 and 5 in the browser (port 8081): `/blog` at desktop and 375 px, `scrollWidth <= innerWidth` → `true`; open `/blog?type=news`, `/blog?type=guides`, `/blog?type=foo` with `npx vite preview` of the built `dist` (prerendered HTML + hydration): `read_console_messages` with `onlyErrors` shows no hydration error, `?type=foo` shows Latest. Screenshots desktop + mobile.

### Task 5: Guide card images (Google Flow via browser-kit)

**Files:**
- Create: `public/blog/cards/<slug>.webp` for the five guides whose `featuredImage` is `/og-default.png`: `saas-landing-page-google-meta-ads`, `saas-traffic-but-no-signups`, `ai-conversion-rate-optimization-saas`, `landing-page-optimization-best-practices-2026`, `saas-homepage-study`
- Modify: those five article files (add `cardImage: "/blog/cards/<slug>.webp"`; `featuredImage` and `ogImage` unchanged)
- Create (outside repo): prompts in `/Users/wael/Documents/whisk-api-main/prompts/blog-cards/<slug>.txt`

**Interfaces:**
- Consumes: `cardImage` field (Task 1). Only home cards read it (via `toCard`); the article header keeps `featuredImage`.

- [ ] **Step 1:** Load the `browser-kit` skill. In one shell, in `/Users/wael/Documents/whisk-api-main`: `browser-kit ensure google-flow`, then `eval "$(browser-kit slot pick google-flow)"`, then `bun run flow:check $FLOW_PROJECT` and `bun run flow:configure --aspect 16:9 --count 1 --model nano_banana_pro`. If ensure opens a window, tell Wael only: "connecte-toi dans la fenêtre qui vient de s'ouvrir, rien d'autre". Expected: check OK.
- [ ] **Step 2:** Write one prompt file per guide. Shared style line in every prompt: "editorial magazine illustration, flat shapes and paper texture, warm cream background, accents of orange (#f2551a) and violet (#7a5ce6), deep navy shadows, no text, no letters, no logos, no UI screenshots, no people's faces". Subjects: meta-ads → two diverging paths from one doorway; traffic-no-signups → a crowd of small shapes flowing past an open door; ai-cro → a compass made of interlocking gears over a page; landing-page-best-practices → a page layout made of stacked paper blocks with one highlighted; homepage-study → many small framed panels in a grid, a few tinted.
- [ ] **Step 3:** For each: `bun run flow:generate --file prompts/blog-cards/<slug>.txt --count 1 --aspect 16:9 --out output/blog-cards/<slug>`. If Flow fails twice for one image, fall back to the local model: `"<venv python from ~/.claude/CLAUDE.md>" generer.py "<prompt>" --taille 1216x640` in that scratch folder.
- [ ] **Step 4:** Convert each to webp 1200x630, quality 80, into `public/blog/cards/<slug>.webp` (`npx sharp-cli` or `cwebp` if installed; check `~/.claude/outils-installes.md` first). Expected: each file < 150 KB.
- [ ] **Step 5:** Dispatch one subagent to look at the five webp files and answer per file: any text or letter-like marks (yes/no), any face (yes/no), fits the palette (yes/no). Regenerate any "yes / no-fit" once.
- [ ] **Step 6:** Add `cardImage` to the five article files. Run `npx vitest run` (the `every card image exists` test now covers them). Expected: PASS.

### Task 6: First AI News issue (Nov 3 to 6) and SEO pipeline support

**Files:**
- Create: `src/content/blog/articles/ai-news-2026-11-06.ts` (export `aiNews20261106`, slug `ai-news-2026-11-06`, path `/blog/ai-news-2026-11-06`)
- Modify: `src/content/blog/index.ts` (import + append to `blogPosts`, keep the `import { x } from "./articles/..."` and `name,` formats the SEO regexes expect, trailing comma included)
- Create: `public/blog/ai-news/2026-11-06/<item-id>.webp` (one capture per item)
- Modify: `scripts/seo/utils.mjs` (`createBlogSeoRoutes`: `(post.relatedPosts ?? [])`, `faq: post.faq ?? []`)
- Modify: `scripts/seo-check.mjs` (for `category === "AI News"` skip the primary-keyword, `internalLinks`, `relatedPosts` and pillar checks; keep title, description length, alt, canonical, prerender and broken-link checks)
- Modify: `public/llms.txt` (add `- /blog/ai-news-2026-11-06 — AI News, Nov 3 to 6, 2026.`)
- Test: `tests/ai-news-issue.test.ts`

**Interfaces:**
- Consumes: `news-item` block and optional fields (Task 1), layout (Task 3), home (Task 4).

Content rules:
- Source data: `~/tools/gtm-post-du-jour/veille/carrousels/2026-11-03/contenu.json` (articles: `fr.titre`, `fr.texte`, `fr.limite`, `source.url`) and `candidats.json` of 2026-11-04, -05, -06 (`titre`, `resume`, `angle`, `limite`, `faits`, `source`). Read only the chosen entries.
- Five items, mixed, in this order (Wael may swap any at review): 1. Alibaba: Qwen 4 and 5 will stay open source (11-03); 2. A Claude connector brought 24,000 signups without ads (11-05); 3. Kimi K3.1 Pro, 2.8T parameters, open weights (11-05); 4. Open source is free, but the SaaS wins (11-06); 5. Anthropic limits Claude Code on game clones (11-03).
- Written in English by Wael in the first person where he comments. Each item: `rubrique` (one of `MODELS`, `GROWTH`, `BUSINESS`, `TOOLS`), title 4-10 words, 60-120 words of text, then what it changes for someone running a site or an agency in one or two sentences. `limit` from the veille `limite`. Every number appears in that entry's `faits`, `texte` or source thread; if not, drop the number.
- Post fields: `category: "AI News"`, `breadcrumbTitle: "Nov 3 to 6"`, `title`/`h1` naming the two strongest items, `metaTitle` <= 65 chars, `description` 120-155 chars, `excerpt` one sentence, `author: "Wael Aouididi"`, `datePublished`/`dateModified: "2026-11-06"`, `readTime` from word count (220 wpm), `toc` = items, `featuredImage` = first item capture, `ogImage` = same, `featuredImageAlt`, `searchIntent`, `secondaryKeywords: []`, `cta` reused from `saas-traffic-but-no-signups`. No `faq`, `source`, `relatedPosts`, `internalLinks`.
- Captures: for each item, open `source.url` with a browser-kit script (`launchKit()`, read-only, no click on vote/comment/join), screenshot the post header and title area only (no other users' photos or embedded media), 1200 px wide, crop to at most 1200x700, save webp quality 80 to `public/blog/ai-news/2026-11-06/<item-id>.webp`. If the source is not Reddit, capture the article headline area. If a page needs sign-in or blocks, use the old Reddit host (`old.reddit.com`) same URL; if still blocked, stop and tell Wael which item.

- [ ] **Step 1: Write the failing test** `tests/ai-news-issue.test.ts` on the real post `getBlogPostBySlug("ai-news-2026-11-06")`:
  - exists, `category === "AI News"`, `path === "/blog/ai-news-2026-11-06"`;
  - 4 or 5 `news-item` blocks; ids unique; `toc.map(t => t.id)` equals the item ids in order;
  - each item: `sourceUrl` starts with `https://`, `limit` and `imageAlt` non-empty, `image` exists under `public/`;
  - `description.length` between 120 and 155, `metaTitle.length <= 65`;
  - `JSON.stringify(post)` contains no `—` and no `**`;
  - `getNewsItems(blogPosts)[0].href` starts with `/blog/ai-news-2026-11-06#`.
- [ ] **Step 2:** Run `npx vitest run tests/ai-news-issue.test.ts`. Expected: FAIL (post missing).
- [ ] **Step 3:** Take the five captures (Content rules above). Expected: five webp files, each < 200 KB.
- [ ] **Step 4:** Write the issue file and register it in `index.ts`. Patch `utils.mjs`, `seo-check.mjs`, `llms.txt`.
- [ ] **Step 5:** Run `npx vitest run`. Expected: all PASS (Task 4's `no news, no news section` test must now build its own news-free list from `blogPosts.filter(p => !isNewsIssue(p))`; fix the test input, not the component, if it fails).
- [ ] **Step 6:** Run the 4 build commands. Expected: `seo-check` passes; `dist/blog/ai-news-2026-11-06/index.html` exists, has one `<title>`, the canonical `https://www.yoursaasgrowth.com/blog/ai-news-2026-11-06`, an `Article` JSON-LD node, and every item heading in the HTML; `dist/sitemap.xml` (or `public/sitemap.xml`, whichever the pipeline writes) lists the path.
- [ ] **Step 7:** Browser: `/blog` now shows the AI News section and the lead band news story; click a news item, land on its anchor (Review Focus 3, Task 3 Step 6). Screenshot.

### Task 7: Final check and Wael's review gate

**Files:** none new.

- [ ] **Step 1:** `npx vitest run`, then the 4 build commands. Expected: all green. Compare the `<title>` and canonical of the 6 guides and 3 sample teardowns (`linear`, `lemlist`, `stripe`) in `dist/` against the `metaTitle` and path in their source files (`grep -o '<title>[^<]*' dist/blog/<slug>/index.html`). Expected: identical.
- [ ] **Step 2:** Request a whole-branch review (superpowers:requesting-code-review) against the spec and this plan; fix confirmed findings.
- [ ] **Step 3:** Send Wael, in French: screenshots of `/blog` (desktop + mobile), one guide, the issue; and the issue text as a readable file (`docs/superpowers/ai-news-2026-11-06-review.md`, English text of the 5 items with their sources). Ask him to approve or edit the text. Nothing is committed before his OK.
- [ ] **Step 4:** On Wael's OK and only if he asks to ship: commit the spec, this plan, `.gitignore`, and the code/content/images in one commit ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, push to `main`, then verify the Vercel deploy serves `/blog` and `/blog/ai-news-2026-11-06` with the new titles.
