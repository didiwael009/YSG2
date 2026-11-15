# Agency Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the hidden `/agency` page ("They create. I automate.") in the style of the creative homepage, as approved on mockup v3.

**Architecture:** One lazy page `src/pages/Agency.tsx` that stacks five section components from `src/components/agency/`. All copy and team data live in `src/content/agency.ts`; style tokens in `src/components/agency/style.ts`. The page reuses the site's `Navigation` and `Footer`, is `noindex`, and is removable by deleting the agency files, the route and the `seoRoutes` entry.

**Tech Stack:** Vite, React 18, react-router 7, Tailwind, lucide-react, vitest (node env, `renderToString`).

**Spec:** `docs/superpowers/specs/2026-11-15-agency-page-design.md`. Mockup: https://claude.ai/artifact/DkiAkFRyAaJahhmT9QQrK5, board "v3, creative homepage style" (source on disk: `/private/tmp/claude-501/-Users-wael-Documents-YSG2--claude-worktrees-wonderful-napier-56a57f/b9e7fba6-6e54-4c59-9c82-dd94d85c0ebd/scratchpad/canvas/project/Crea.dc.html`, may be gone after the session; the artifact stays).

## Global Constraints

- Work from `gtmwael-main 2/` on the worktree branch `claude/wonderful-napier-56a57f` (off `main`, holds the spec and this plan) or a new branch off `main`. Never `creative-2`.
- Never commit `.claude/launch.json`, `public/responsive/*.webp`, `src/lib/responsive-image-manifest.ts`.
- No push. No `npm run build`. Do not use port 8080.
- Do not touch `src/pages/Creative.tsx`, `src/pages/Creative2.tsx`, `src/components/CreativeWorkflowSection.tsx`, or anything on the `creative-2` branch.
- No new dependencies.
- Site copy in English. No em-dashes (`—`). No bold (no `<strong>`, `<b>`, `**`, no `font-bold` on body copy; headings use weight 800 as the design style).
- No invented facts: every fact about a person, client or project comes from the spec's Team and Content sections.
- Colours: ink `#0e0e0e`, cream `#f4f3ee`, lime `#c6f432`. Fonts: Inter 800 heavy, Newsreader italic 500.
- Newsreader is loaded by this page only (a `<link>` added at mount); `index.html` stays unchanged.
- Every "Book a call" goes to `/book`.
- After building, add an entry to the HANDOFF.md Chronology.

## Review Focus

1. Phone width (375px): the big clamp headings and the Pilau word "Swimwear" must not cause horizontal scroll. Checked in Task 6 with `document.documentElement.scrollWidth <= innerWidth`.
2. External portfolio links (Figma, Behance) open in a new tab with `rel="noopener noreferrer"`; internal links (`/book`, `/creative`) do not. Test in Task 3.
3. Every `<img>` has an `alt` attribute (empty only where the link text already names the project). Test in Task 3.
4. `/agency` never reaches the sitemap or indexable list, even though it is in `seoRoutes`. Test in Task 2.
5. Newsreader added twice when the page remounts (navigate away and back). The hook checks for an existing `link[data-agency-font]` first; checked in Task 6 by navigating `/agency` → `/` → `/agency` and counting links.

---

### Task 1: Agency content and images

**Files:**
- Create: `src/content/agency.ts`
- Create: `src/assets/agency/` with `pilau-campaign.webp`, `pilau-green.webp`, `pilau-pink.webp`, `pilau-colors.webp`, `fedi-ooredoo.webp`, `fedi-tunisair.webp`, `fedi-abida.webp`, `fedi-kitkat.webp`
- Test: `tests/agency-content.test.ts`

**Interfaces:**
- Produces (all exported from `@/content/agency`):
  - `type AgencyPerson = { id: "sirine" | "fedi" | "wael"; name: string; short: string; role: string; bio: string; initials: string; photo?: string; link: { label: string; href: string } }`
  - `type AgencyProject = { title: string; label: string; href: string; image: string; alt: string }`
  - `AGENCY_HERO: { badge: string; line1: string; line2: string; sub: string; clientsLabel: string; clients: string[]; frameCaption: string }`
  - `AGENCY_TEAM: { eyebrow: string; line1: string; line2: string; people: AgencyPerson[] }`
  - `AGENCY_WORK: { eyebrow: string; line1: string; line2: string; pilau: { name: string; credit: string; word: string; tagline: string; sentence: string; images: { src: string; alt: string }[]; link: { label: string; href: string } }; fediTitle: string; fediProjects: AgencyProject[] }`
  - `AGENCY_AUTOMATION: { badge: string; line1: string; line2: string; body: string; stats: { value: string; label: string }[] }`
  - `AGENCY_PROCESS: { eyebrow: string; line1: string; line2: string; steps: { title: string; body: string }[]; ctaLine: string; ctaLabel: string; ctaNote: string }`
  - `AGENCY_HERO_IMAGE: { src: string; alt: string }`

- [ ] **Step 1: Convert the images.** Sources from the mockup session: `/private/tmp/claude-501/-Users-wael-Documents-YSG2--claude-worktrees-wonderful-napier-56a57f/b9e7fba6-6e54-4c59-9c82-dd94d85c0ebd/scratchpad/img/{pilau-*,fedi-*}.jpg`. Run `cwebp -q 82 <in>.jpg -o src/assets/agency/<name>.webp` for each. If that folder is gone, recapture: Pilau frames from Sirine's Figma prototype (link in the spec), Fedi covers from the four Behance project pages below, clean crops, no browser chrome. The Pilau captures are only 560x347; if the Figma gives a sharper frame, prefer it (builder's call).

- [ ] **Step 2: Write the failing test** `tests/agency-content.test.ts`

```ts
import { describe, it, expect } from "vitest";
import * as agency from "@/content/agency";

const allStrings = (v: unknown): string[] =>
  typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(allStrings)
  : v && typeof v === "object" ? Object.values(v).flatMap(allStrings) : [];

describe("agency content", () => {
  const text = allStrings(agency);
  it("has no em-dash and no bold markup", () => {
    for (const s of text) {
      expect(s).not.toContain("—");
      expect(s).not.toMatch(/\*\*|<b>|<strong>/);
    }
  });
  it("lists the three people in order", () => {
    expect(agency.AGENCY_TEAM.people.map((p) => p.name)).toEqual(["Sirine Aouididi", "Fedi Amami", "Wael Aouididi"]);
  });
  it("links each collaborator to their public portfolio", () => {
    const [sirine, fedi] = agency.AGENCY_TEAM.people;
    expect(sirine.link.href).toBe("https://www.figma.com/proto/UHJGcTDg637GiBYmO06m9b/portfolio");
    expect(fedi.link.href).toBe("https://www.behance.net/amamifedi");
  });
  it("has Fedi's four Behance projects", () => {
    expect(agency.AGENCY_WORK.fediProjects.map((p) => p.href)).toEqual([
      "https://www.behance.net/gallery/46196185/Ooredoo-Tunisie-Social-Media",
      "https://www.behance.net/gallery/46196829/Tunisair",
      "https://www.behance.net/gallery/95050249/Rebranding-ABIDA",
      "https://www.behance.net/gallery/47905535/Kitkat-The-game",
    ]);
  });
  it("has three steps", () => {
    expect(agency.AGENCY_PROCESS.steps).toHaveLength(3);
  });
});
```

- [ ] **Step 3: Run it:** `npx vitest run tests/agency-content.test.ts`. Expected: FAIL, cannot resolve `@/content/agency`. (If vitest cannot import `.webp` in node, add nothing to config: vite's asset handling resolves imports to strings in vitest; if it fails, report before changing config.)

- [ ] **Step 4: Write `src/content/agency.ts`** with the types above and this exact copy (from mockup v3):

- Hero: badge "Creative team + automation"; line1 "They create."; line2 "I automate."; sub "Sirine and Fedi design the look of your brand. I turn that look into a system that makes and publishes content at volume."; clientsLabel "Their work for"; clients ["Pilau", "Ooredoo", "Tunisair", "ABIDA", "Kitkat"]; frameCaption "Pilau, by Sirine Aouididi"; hero image = `pilau-campaign.webp`, alt "Pilau summer campaign by Sirine Aouididi".
- Team: eyebrow "The team"; line1 "Two creatives."; line2 "One production line."
  - Sirine Aouididi, short "Sirine", role "Creative director, designer", initials "SA", bio "CEO of N°619 Studio. She builds brand identities, like Pilau swimwear. Works in Arabic, French, English and Italian.", link "Portfolio on Figma".
  - Fedi Amami, short "Fedi", role "Art director, graphic designer", initials "FA", bio "Based in Fribourg, Switzerland. Art director at Kyubi in Tunisia. Projects for Ooredoo Tunisie, Tunisair, Kitkat and ABIDA.", link "Portfolio on Behance".
  - Wael Aouididi, short "Wael", role "Automation", initials "WA", photo "/hero-portrait-256.webp", bio "Builds content systems with Claude Code and a stack of AI tools. Top Rated on Upwork.", link { label "His creative work", href "/creative" }.
- Work: eyebrow "The work"; line1 "Brands they"; line2 "already shaped"; Pilau: name "Pilau", credit "Sirine Aouididi, creative director", word "Swimwear", tagline "a brand identity, from crest to campaign", sentence "Editorial look, cream grounds, retro stripes and a crest logo, declined in colour variants.", images green / pink / colors with alts "Green Pilau swimsuit with embroidered starfish", "Pink Pilau swimsuit with floral embroidery", "Pilau logo colour variants", link { "See it on Figma", Sirine's Figma URL }; fediTitle "selected projects"; fediProjects: Ooredoo Tunisie / "Social media", Tunisair / "Campaign", ABIDA / "Rebranding", Kitkat / "The game", each alt "".
- Automation: badge "Produce · Content at scale"; line1 "One system."; line2 "134 posts."; body "Videos, songs, animations and posts, made with Claude Code and a stack of AI tools. I check every piece. You approve it before it goes live."; stats [{ "134", "posts" }, { "3", "languages" }] (sourced: `CreativeWorkflowSection.tsx` says "Posts in three languages").
- Process: eyebrow "How it works"; line1 "One look,"; line2 "made a hundred times"; steps "They set the look" / "Sirine and Fedi design the identity, the art direction and the templates every post starts from.", "I build the system" / "I turn those templates into a pipeline of AI tools and scripts that makes new pieces in the same look.", "Content ships at volume" / "Posts, videos and visuals, in several languages. I check every piece. You approve it before it goes live."; ctaLine "Get the look. Then the volume."; ctaLabel "Book a call"; ctaNote "Free · no commitment".

- [ ] **Step 5: Run the test:** `npx vitest run tests/agency-content.test.ts`. Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content/agency.ts src/assets/agency tests/agency-content.test.ts
git commit -m "feat(agency): content and images for the hidden agency page"
```

---

### Task 2: Route, SEO entry and page shell

**Files:**
- Modify: `src/lib/seo.ts` (add an entry to `seoRoutes`, next to the other `noindex` service pages)
- Modify: `src/App.tsx` (lazy import + `<Route path="/agency">`, next to `/creative`)
- Create: `src/components/agency/style.ts`
- Create: `src/components/agency/useNewsreader.ts`
- Create: `src/pages/Agency.tsx`
- Test: `tests/agency-seo.test.ts`

**Interfaces:**
- Produces from `@/components/agency/style`: `INK = "#0e0e0e"`, `CREAM = "#f4f3ee"`, `LIME = "#c6f432"`, `SERIF: React.CSSProperties = { fontFamily: "Newsreader, Georgia, serif", fontStyle: "italic", fontWeight: 500 }`, `HEAVY: React.CSSProperties = { fontWeight: 800 }`, and `SectionHeading({ eyebrow?, line1, line2, id, align?: "left" | "center", tone: "dark" | "light" })` rendering the lime eyebrow, the heavy line and the serif line as in the spec's Visual style.
- Produces from `@/components/agency/useNewsreader`: `useNewsreader(): void`, same as `creative-2:src/components/creative2/useNewsreader.ts` but with the attribute `data-agency-font` and the href `https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Newsreader:ital,wght@1,500&display=swap`.
- Produces: `src/pages/Agency.tsx` default export `Agency`, rendering `Navigation`, a `<main>` that later tasks fill with `AgencyHero`, `AgencyTeam`, `AgencyWork`, `AgencyAutomation`, `AgencyProcess` in that order, then `Footer`. Page background cream.

- [ ] **Step 1: Write the failing test** `tests/agency-seo.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { getSeoRoute, indexableRoutes } from "@/lib/seo";

describe("/agency SEO", () => {
  it("is a noindex route without global schema", () => {
    const r = getSeoRoute("/agency");
    expect(r.path).toBe("/agency");
    expect(r.noindex).toBe(true);
    expect(r.schemaIncludeGlobal).toBe(false);
  });
  it("is not indexable", () => {
    expect(indexableRoutes.some((r) => r.path === "/agency")).toBe(false);
  });
});
```

- [ ] **Step 2: Run it:** `npx vitest run tests/agency-seo.test.ts`. Expected: FAIL (`r.path` is `*`).

- [ ] **Step 3: Add the `seoRoutes` entry:** path `/agency`, title "They create. I automate. | Your SaaS Growth", description "Sirine Aouididi and Fedi Amami design the look of your brand. Wael Aouididi turns it into a content system that ships at volume.", type `portfolio`, priority 0.1, changefreq `monthly`, `noindex: true`, `schemaIncludeGlobal: false`. No `links`, no `breadcrumbs`.

- [ ] **Step 4: Add `style.ts`, `useNewsreader.ts`, `Agency.tsx` and the route** `<Route path="/agency" element={lazyRoute(<Agency />)} />`.

- [ ] **Step 5: Run the tests:** `npx vitest run tests/agency-seo.test.ts` → PASS, then `npm test` → all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo.ts src/App.tsx src/components/agency src/pages/Agency.tsx tests/agency-seo.test.ts
git commit -m "feat(agency): noindex /agency route, style tokens and page shell"
```

---

### Task 3: Hero and team sections

**Files:**
- Create: `src/components/agency/AgencyHero.tsx`, `src/components/agency/AgencyTeam.tsx`, `src/components/agency/ExternalLink.tsx`
- Modify: `src/pages/Agency.tsx` (mount both)
- Test: `tests/agency-page.test.tsx`

**Interfaces:**
- Consumes: `AGENCY_HERO`, `AGENCY_HERO_IMAGE`, `AGENCY_TEAM` (Task 1); `SectionHeading`, tokens (Task 2).
- Produces: `AgencyHero()` with `id="top"`; `AgencyTeam()` with `id="team"`; `ExternalLink({ href, className?, children })` that adds `target="_blank" rel="noopener noreferrer"` when `href` starts with `http`, renders a plain `<a>` for `#` anchors, and a react-router `Link` otherwise. Task 4 and 5 use `ExternalLink` for every outbound link.

Layout per the mockup: hero is cream, two columns that wrap (text left; Pilau image right in the halftone frame: `radial-gradient(#111 1.1px, transparent 1.6px) 0 0/5px 5px` at ~18% opacity, 2px black frame, corner bracket top right, italic caption). Buttons: black rounded "Book a call" with `ArrowRight` → `/book`, outlined "See the work" → `#work`, italic "Free · no commitment" under. Three name cards with a 4px left border (black, lime for Wael). Client line in heavy grey. Team section ink, three dark cards (rounded-2xl, `border-white/10`, `bg-white/[0.04]`), Wael's card with a lime-tinted border and his photo, the others with initials on a cream circle; role in small uppercase, bio at white/75, a pill link with `ArrowUpRight` (cream pill for collaborators, lime for Wael).

- [ ] **Step 1: Write the failing test** `tests/agency-page.test.tsx` (pattern from `tests/blog-render.test.tsx`)

```tsx
import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Agency from "@/pages/Agency";

const html = renderToString(<MemoryRouter initialEntries={["/agency"]}><Agency /></MemoryRouter>)
  .replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

describe("/agency page", () => {
  it("shows the headline and the three people", () => {
    for (const s of ["They create.", "I automate.", "Sirine Aouididi", "Fedi Amami", "Wael Aouididi"]) expect(html).toContain(s);
  });
  it("links to /book", () => {
    expect(html).toContain('href="/book"');
  });
  it("opens external links in a new tab, safely", () => {
    const external = [...html.matchAll(/<a [^>]*href="https?:[^"]*"[^>]*>/g)].map((m) => m[0]);
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a).toContain('target="_blank"');
      expect(a).toContain('rel="noopener noreferrer"');
    }
  });
  it("gives every image an alt attribute", () => {
    for (const img of html.match(/<img [^>]*>/g) ?? []) expect(img).toMatch(/ alt="/);
  });
  it("has no em-dash", () => {
    expect(html).not.toContain("—");
  });
});
```

- [ ] **Step 2: Run it:** `npx vitest run tests/agency-page.test.tsx`. Expected: FAIL (names missing).
- [ ] **Step 3: Build `ExternalLink`, `AgencyHero`, `AgencyTeam`, mount them in `Agency.tsx`.**
- [ ] **Step 4: Run it:** expected PASS.
- [ ] **Step 5: Commit**

```bash
git add src/components/agency src/pages/Agency.tsx tests/agency-page.test.tsx
git commit -m "feat(agency): hero and team sections"
```

---

### Task 4: Work section

**Files:**
- Create: `src/components/agency/AgencyWork.tsx`
- Modify: `src/pages/Agency.tsx`, `tests/agency-page.test.tsx`

**Interfaces:**
- Consumes: `AGENCY_WORK` (Task 1); `SectionHeading`, `ExternalLink`, tokens (Tasks 2 and 3).
- Produces: `AgencyWork()` with `id="work"`.

Layout: ink background. Pilau as the cream stack card (like `creative-2:src/components/creative2/C2Experience.tsx`): rounded-3xl, 6px lime bar on top, name (2xl, 800) and credit (#333) on one line, the word "Swimwear" heavy at `clamp(3rem, 9vw, 7.5rem)` leading 0.9, tagline in Newsreader italic, the three images in an auto-fit grid (rounded-xl, aspect 560/347, `object-cover`), bottom row with border-top black/15, the sentence (max 46ch) and a black pill link. Then the heading "Fedi Amami" heavy plus "selected projects" in serif, and four dark cards linking to Behance (image fixed height ~190px, title 800, label small uppercase white/60, `ArrowUpRight`).

- [ ] **Step 1: Add a failing test** to `tests/agency-page.test.tsx`:

```tsx
  it("shows Pilau and Fedi's four Behance projects", () => {
    expect(html).toContain("Swimwear");
    for (const id of ["46196185", "46196829", "95050249", "47905535"]) expect(html).toContain(`behance.net/gallery/${id}/`);
  });
```

- [ ] **Step 2: Run it:** expected FAIL.
- [ ] **Step 3: Build `AgencyWork` and mount it after `AgencyTeam`.**
- [ ] **Step 4: Run `npx vitest run tests/agency-page.test.tsx`:** expected PASS.
- [ ] **Step 5: Commit** `git commit -m "feat(agency): work section"` (add the component, the page and the test).

---

### Task 5: Automation and process sections

**Files:**
- Create: `src/components/agency/AgencyAutomation.tsx`, `src/components/agency/AgencyProcess.tsx`
- Modify: `src/pages/Agency.tsx`, `tests/agency-page.test.tsx`

**Interfaces:**
- Consumes: `AGENCY_AUTOMATION`, `AGENCY_PROCESS` (Task 1); `SectionHeading`, tokens; the existing image `@/assets/sambalingo-phone.webp`.
- Produces: `AgencyAutomation()`; `AgencyProcess()` with `id="how"` and the closing CTA with `id="book"`.

Layout: automation is cream, two columns that wrap: lime badge, heading, body (#333, max 48ch), two stat cards with a 4px black left border; on the right the SambaLingo phone image (`alt="SambaLingo feed on a phone"`, width and height set). Process is ink, centred heading, an `<ol>` of three dark cards with "01 02 03" in heavy lime at text-5xl, then the italic serif CTA line, the lime rounded-full "Book a call" pill with `ArrowRight` to `/book`, and the italic note at white/60.

- [ ] **Step 1: Add a failing test:**

```tsx
  it("shows the automation proof and the three steps", () => {
    for (const s of ["One system.", "134 posts.", "01", "02", "03", "They set the look", "I build the system", "Content ships at volume", "Get the look. Then the volume."]) expect(html).toContain(s);
    expect(html.match(/href="\/book"/g)?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
```

- [ ] **Step 2: Run it:** expected FAIL.
- [ ] **Step 3: Build both sections and mount them after `AgencyWork`.**
- [ ] **Step 4: Run `npm test`:** expected all PASS.
- [ ] **Step 5: Commit** `git commit -m "feat(agency): automation and process sections"`.

---

### Task 6: Check in the browser and log it

**Files:**
- Modify: `HANDOFF.md` (Chronology, new `### 2026-11-15` entry or append to it)

- [ ] **Step 1: Start the dev server** on a port other than 8080 (e.g. `npx vite --port 5179`; through the app's preview tool if available; do not commit `.claude/launch.json`). Open `/agency`.
- [ ] **Step 2: Desktop (1440px):** compare with mockup v3 section by section. Console has no errors. Newsreader is applied: `getComputedStyle(<serif line>).fontFamily` starts with `Newsreader` once fonts load.
- [ ] **Step 3: Phone (375px):** `document.documentElement.scrollWidth <= window.innerWidth` is true; cards stack; images keep their ratio; tap targets ≥ 44px.
- [ ] **Step 4: Remount:** navigate `/agency` → `/` → `/agency`; `document.querySelectorAll("link[data-agency-font]").length === 1`.
- [ ] **Step 5: Head:** on `/agency`, `<meta name="robots">` contains `noindex` (if the site sets robots from `seoRoutes` on the client; if not, report it, the generated static pages handle it at build time).
- [ ] **Step 6: HANDOFF entry:** two or three lines: hidden `/agency` page (noindex, not in nav or sitemap), creative-2 style, copy in `src/content/agency.ts`, how to remove it (route, `seoRoutes` entry, `src/pages/Agency.tsx`, `src/components/agency/`, `src/content/agency.ts`, `src/assets/agency/`, the three agency tests).
- [ ] **Step 7: Commit** `git add HANDOFF.md && git commit -m "docs(handoff): log the hidden agency page"`. Take a desktop and a phone screenshot for Wael.
