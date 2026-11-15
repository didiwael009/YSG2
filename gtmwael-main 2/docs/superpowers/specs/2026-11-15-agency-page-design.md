# Agency page: a virtual agency, they create, Wael automates

Date: 2026-11-15. Status: draft, waiting for Wael's approval. Nothing is built yet.

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

- A. The site's own style (picked by Wael). Dark and light sections alternating like the homepage, reusing `Navigation`, `Footer`, `SectionDivider`, `AnimateIn` and the `/book` flow. The creative work sits in a light section so the cream and colour of the portfolios read well. Cheapest to build, consistent, easy to delete. It looks more like the rest of the site than like a creative studio.
- B. An editorial studio look inspired by Sirine's Figma (cream background, wide letter-spaced type, stripes). Feels like a real creative agency. More design work, overlaps with the creative-2 redesign in progress, and clashes with the site for SaaS prospects.
- C. A section inside an existing page. Rejected: `/creative` is locked by another session, and the homepage would change public positioning during a test.

Wael picked A: the test is about the team's work, not the page's styling.

## Page structure (proposal, Wael to confirm with the copy)

Sketch, top to bottom:

```
[Nav]
DARK   Hero: headline, one line, [Book a call] [See the work ↓]
DARK   Team: 3 cards (photo, name, role, one line, link to portfolio)
LIGHT  How it works: 3 steps
       1 They set the look   2 I build the system   3 Content ships at volume
LIGHT  Work: Sirine (Pilau) · Fedi (selected projects, link to Behance)
DARK   Automation: reuse CreativeWorkflowSection (variant "teaser")
DARK   CTA block: headline, one line, [Book a call] -> /book
[Footer]
```

- Hero. The working headline comes from Wael's own phrase, "ils créent, j'automatise", which gives "They create. I automate." in English.
- Team. Wael's card uses his existing portrait (`/hero-portrait-*.webp`). Each collaborator links out to their portfolio (Figma or Behance, or another link they prefer).
- How it works. Three steps that describe the "look + volume" offer. The step text comes from Wael.
- Work. Grouped by person, so a prospect sees who did what. Images come from the collaborators' portfolios.
- Automation. `src/components/CreativeWorkflowSection.tsx` already has `variant="teaser"` (the homepage uses it) and is not one of the locked files. Reuse it as is, with no edit to the shared component (my call: the homepage depends on it). If its heading reads wrong on this page, the builder tells Wael.
- CTA. A simple block like the one at the end of `Creative.tsx`, linking to `/book`. `BookingSection` is not reused because its copy is about a "GTM audit".

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
- Mobile layout: cards stack, images keep their aspect ratio.
- Removal: deleting the page should only mean removing the route, the `seoRoutes` entry and the agency files.
