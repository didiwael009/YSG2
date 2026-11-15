# Agency page: a virtual agency, they create, Wael automates

Date: 2026-11-15. Status: approved by Wael on 2026-11-15 (mockup v3, creative homepage style). Nothing is built yet.

Mockup: Design canvas https://claude.ai/artifact/DkiAkFRyAaJahhmT9QQrK5, board "v3, creative homepage style".

## Why

Wael wants to test a new idea: present creative people he knows as collaborators, next to his own automation work. In his words: "agence virtuelle, moi et mes connaissances... ils créent, j'automatise". The bet is that human creative work plus AI automation is a stronger offer than "one operator, AI agents" alone.

It is an experiment. Wael does not know yet if it helps ("je veux tout tester"), and he may delete the page later. So the page must be cheap to build, isolated from the rest of the site, and easy to remove.

Wael will test it by sending the link to prospects himself. Those prospects are both SaaS founders and brands (fashion, DTC, e-commerce).

## The team (decided by Wael)

Two collaborators plus Wael. Both have agreed to appear with name, photo, role and projects.

- Sirine Aouididi. Facts seen in her Figma portfolio: Creative Director, Designer, CEO of N°619 Studio. Languages: Arabic, French, English, Italian. Main project shown: Pilau, a swimwear brand identity (editorial look, cream backgrounds, retro stripes, a crest logo, colour variants).
  Figma: https://www.figma.com/proto/UHJGcTDg637GiBYmO06m9b/portfolio?page-id=244%3A4059&type=design&node-id=244-8159&viewport=9%2C511%2C0.02&t=RHI76ii26H7zcsHc-1&scaling=min-zoom&mode=design
- Fedi Amami. Facts seen on his Behance: Art Director and Graphic Designer, based in Fribourg, Switzerland. Art Director at Kyubi (Tunisia), Junior Art Director at K.N.S.D (Tunis). Projects include Ooredoo Tunisie social media, Tunisair, Kitkat The game, Rebranding ABIDA, ABIDA 2020 Campaign, Brèbchi app and website, Touneslike website.
  Behance: https://www.behance.net/amamifedi
- Wael Aouididi. The automation side: AI agents, content pipelines, growth automation. His existing site material covers this (homepage, content automation section).

These are facts from their public portfolios. The page copy is drafted from these public sources (see "Content").

## The offer (decided by Wael)

"Look + volume": Sirine and Fedi create the brand, the art direction and the templates. Wael turns that look into a system that produces and publishes content at volume.

## Goals

- One page at `/agency` that shows three people, what each one does, how they work together, and their work.
- It speaks to both SaaS founders and brands.
- One call to action: book a call at `/book`.
- The creative work is shown well enough that a prospect can judge it.

## Non-goals

- No change to the homepage, the navigation, the footer, `/saas-marketing-agency`, `/creative` or the creative-2 branch.
- No pricing, packages or rates on the page.
- No analytics or tracking work for the test. Wael judges it from prospect reactions.
- No contact form. Booking goes through the existing `/book`.
- No new dependencies.

## Anti-goals

- Invented stats, client names or claims about Sirine or Fedi. Every fact about them comes from Wael or from their public portfolios.
- A page that makes Wael look like he resells other people's work. The two sides stay visible as a team.
- A page Google finds or that changes the site's positioning while it is a test. The homepage says "One operator. AI agents." and `/saas-marketing-agency` says Wael is "not [an agency] in the traditional sense". The hidden page avoids contradicting them in public.

## Constraints

- Stack: Vite, React 18, react-router 7, Tailwind, shadcn/ui. npm only.
- Hidden page: `noindex`, not in the nav, not in the sitemap. The pattern exists: a `seoRoutes` entry in `src/lib/seo.ts` with `noindex: true` and `schemaIncludeGlobal: false`. `indexableRoutes` already filters noindex routes out.
- Route added lazily in `src/App.tsx`, like the other pages.
- Site copy in English. No em-dashes. No bold. House voice: short declarative sentences (see HANDOFF.md).
- Do not touch `src/pages/Creative.tsx` or `src/pages/Creative2.tsx`.
- Git: new branch off `main`, never `creative-2`. Never commit `.claude/launch.json`, `public/responsive/*.webp` or `src/lib/responsive-image-manifest.ts`. No push. No `npm run build`. Do not use port 8080.
- After building, add an entry to the HANDOFF.md Chronology (AGENTS.md rule).

## Approaches

- A. The site's own style (dark and light SaaS sections, reusing the homepage components). Wael picked it first, then rejected the mockup: "je valide pas l'aspect SaaS que j'écris pour l'agence créa".
- B. Two new creative directions, "Editorial" (cream, Fraunces serif, Pilau stripes) and "Studio" (black, condensed caps, lime). Wael did not pick either.
- C. The style of the creative homepage on the `creative-2` branch (`/creative-2`, "Style A, cream magazine"). Picked by Wael ("comme la homepage axée créa") and approved on mockup v3.
- D. A section inside an existing page. Rejected: `/creative` is locked by another session, and the homepage would change public positioning during a test.

Wael picked C: the agency page should look like the creative homepage, not like the SaaS pages.

## Visual style (from `creative-2:src/components/creative2/style.ts`)

- Colours: ink `#0e0e0e`, cream `#f4f3ee`, lime `#c6f432`.
- Type: Inter 800 for heavy headings, Newsreader italic 500 for the second line of each heading. Newsreader is loaded on this page only, the way `useNewsreader.ts` does it on creative-2 (a `<link>` added at mount, `index.html` unchanged).
- Section heading: lime eyebrow (small, bold, uppercase, wide tracking), then a heavy line and a larger Newsreader italic line (leading 0.95, tracking -0.03em).
- Dark sections: ink background, cream text, body text white at 75%. Dark cards: rounded-2xl, border white/10, background white/[0.04].
- Cream "stack card" for a featured project, like `C2Experience.tsx`: cream card on ink, rounded-3xl, a 6px lime bar on top, a big heavy word, an italic serif line, a bottom row with a sentence and a black pill link.
- Numbered steps "01 02 03" in heavy lime, like `C2Process.tsx`.
- Buttons: black rounded "Book a call" with an arrow and an outlined "See the work" in the hero; a lime rounded-full pill at the end; "Free · no commitment" in italic under each.
- Hero frame: halftone dot halo, thin black frame and a corner bracket, like the portrait in `CreativeHeroLayer.tsx`.

`creative-2` is not merged into `main`, so the page cannot import `src/components/creative2/*`. The builder copies the few tokens it needs into the agency files (builder's call). Nothing on the `creative-2` branch is touched.

## Page structure (as in mockup v3)

```
[Nav, the site's Navigation]
CREAM  Hero: lime badge "Creative team + automation"
       "They create." / "I automate." (italic)
       one line, [Book a call ->] [See the work], "Free · no commitment"
       three name cards (Sirine, Fedi, Wael) and a "Their work for" client line
       right: Pilau campaign image in the halftone frame
INK    Team: "Two creatives." / "One production line." 3 dark cards
       (initials or photo, name, role, one paragraph, pill link to portfolio)
INK    Work: "Brands they" / "already shaped"
       cream stack card for Pilau (Sirine), 3 images, link to Figma
       "Fedi Amami selected projects": 4 dark cards linking to Behance
CREAM  Automation: badge, "One system." / "134 posts.", one paragraph,
       stat cards 134 posts and 3 languages, phone image on the right
INK    How it works: "One look," / "made a hundred times", steps 01 02 03
       then "Get the look. Then the volume." (italic) and the lime Book a call pill
[Footer, the site's Footer]
```

- The automation section is built on this page in the new style. It does not reuse `CreativeWorkflowSection` (its SaaS look is what Wael rejected). The phone image is one the site already uses for the SambaLingo feed; the builder picks it from the existing assets. The "3 languages" stat must match a source on the site, otherwise the builder drops it and tells Wael.
- "His creative work" on Wael's card links to the site's existing creative work page (`/creative`), builder's call.
- Every "Book a call" goes to `/book`.

## Content (decided by Wael on 2026-11-15)

- Copy: Wael said "tu peux trouver toutes ces informations en ligne". The builder drafts all page copy (headline, one-liners, the three steps, the CTA) from public sources: Sirine's Figma portfolio, Fedi's Behance (and the public pages it links to), and this site for Wael. Every fact about a person, a role, a client or a project must come from one of those sources. No invented stats, results, clients or quotes. The copy lives in one data file and Wael reviews it before sending the link to anyone.
- Images: the builder captures them from Sirine's Figma prototype and Fedi's Behance project pages. Clean crops of the work, no browser chrome.
- Sirine's work: Pilau (the only project in the Figma prototype seen so far; the builder takes the strongest frames: brand title, campaign image, swimwear product, colour variants, crest logo).
- Fedi's work, chosen by Wael: Ooredoo Tunisie social media, Tunisair, Rebranding ABIDA (with the ABIDA 2020 Campaign if it helps), Kitkat The game. Each card links to its Behance project.
- Photos of Sirine and Fedi: from their public profiles (Behance avatar, a portrait in the Figma if there is one). If none is usable, the card shows initials, and the builder says so.
- Card links: Sirine to her Figma portfolio, Fedi to his Behance.
- Voice: the hero and the steps speak as Wael ("I"), the team cards describe each person in the third person. Builder's call, Wael can change it on review.

## Left to the builder

- File layout. Suggested: `src/pages/Agency.tsx` for the page, `src/content/agency.ts` for all copy and team data, images in `src/assets/agency/`. Keeping copy in one data file makes Wael's edits and a later removal simple.
- Image handling. Use plain optimised `.webp` images with width and height set. Do not generate responsive variants into `public/responsive/` or touch the responsive manifest.
- Tests (vitest, in `tests/`): the page renders the three people and a `/book` link; the agency copy has no em-dash and no bold markup; the `/agency` SEO route is `noindex`.
- Mobile layout: the mockup uses auto-fit grids and flex-wrap; the builder keeps that or uses Tailwind breakpoints. Headings scale down with `clamp()` or responsive text sizes.
- Mobile layout: cards stack, images keep their aspect ratio.
- Removal: deleting the page should only mean removing the route, the `seoRoutes` entry and the agency files.
