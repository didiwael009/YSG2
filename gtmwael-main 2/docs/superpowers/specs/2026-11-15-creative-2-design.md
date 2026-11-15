# Creative 2 page: design

Date: 2026-11-15. Status: for Wael's approval.

## Intent

yoursaasgrowth.com sells SaaS growth today. Wael wants a creative side too, to win new creative clients and get them to book a call. Services: short animated videos, carousels and posts, brand identity and pages, product videos and ads.

The idea is a before/after slider. The visitor drags a handle across the hero: the left part is the SaaS hero they know, the right part is the same hero redrawn as a creative studio. Every creative block sits exactly on top of its SaaS block, so only the style changes while you drag.

## Decisions taken by Wael

- New page `/creative-2`. The existing `/creative` page stays as it is and is not used as a base. The homepage does not change.
- Style A, "cream magazine": cream background, dark ink, halftone halo around the photo, black frame with a corner mark, italic serif second line, lime badge. Reference mockup: `docs/superpowers/specs/2026-11-15-creative-2-mockup.html`, option A (copied from the brainstorm folder, which is gitignored; it loads the photo from `/files/`, the photo is in `docs/superpowers/specs/2026-11-15-creative-2/wael-new.png`).
- Wael's new photo (cutout of the white t-shirt, glasses photo) on both sides of the slider, in exactly the same box, bottom edge on the same line.
- Goal of the page: book a call (`CALENDLY_URL`).

## Goals

- The slider hero works with a mouse, a finger and the keyboard.
- Both layers line up block by block at every screen width, not only at 1280 px.
- The creative side has its own call button that opens the booking link.
- Below the hero, the page shows the creative services and real work, in style A.

## Non-goals

- No change to the homepage, to `/creative`, or to the global navigation.
- No scroll animations in this first version.

## Anti-goals (it would be a failure if)

- The two layers drift apart at some width, so text jumps while dragging.
- The slider makes the page slow on a phone.
- Copy, figures or client names appear that Wael did not give or approve.

## Approaches considered

1. Slider on the homepage, linking to a creative page. Most traffic, but every SaaS visitor sees it. Not chosen: Wael wants the homepage untouched.
2. Slider on the existing `/creative`. Not chosen: Wael asked to leave that page alone.
3. New page `/creative-2` that opens on the slider. Chosen by Wael.

Technique (my call): plain CSS `clip-path: inset(0 0 0 var(--p))` on the top layer, with pointer events for the drag. No new library: it is light and smooth on mobile. GSAP is only worth it later, for scroll animations.

## Design

### Hero slider

- Two layers stacked in one container: SaaS layer below, creative layer on top, clipped from the left at `--p`.
- My call: both layers come from the same hero component with a `variant` prop (`"saas" | "creative"`), so they share one layout and line up by construction at every breakpoint. Only colours, fonts and copy differ. The existing `HeroSection` is not modified for the homepage; the builder either adds the prop without changing its default output, or copies its layout into a page-local component. Either way the homepage must render pixel-identical.
- The SaaS layer uses Wael's new photo, in the same box as the homepage portrait (420 px wide, bottom aligned). The homepage keeps its current photo.
- Handle: white 2 px line, round knob with a double arrow, labels "SAAS" (left, orange) and "CREATIVE" (right, white).
- Alignment contract (my call): the creative variant has the same block list as the SaaS hero (badge, title, subtitle, two buttons, "Free, no commitment" line, two cards, trusted-by logos). At each breakpoint every block gets a min height equal to the taller of its two versions, so neither copy can push the blocks below it. Creative copy is tuned until it fits the same line count as the SaaS copy; it is never clipped.
- Interaction (my call): `clip-path` also clips hit testing, so each side's buttons work where that side is visible. For screen readers and keyboard focus, the creative layer is the page's main content; the SaaS layer is `aria-hidden` and `inert`.
- Navigation and footer (my call): the global `Navigation` and `Footer` stay as on other pages; the nav floats over the hero as on the homepage.
- Starting position: 50%. My call.
- Keyboard: the handle is focusable, with left and right arrows moving 5%. My call.
- On mobile the slider works the same way on the stacked mobile layout. My call: both variants share the mobile layout too, so it stays aligned.

### Creative side copy (from the mockup)

- Badge: "Top Rated on Upwork".
- Title: "Videos. Carousels." then, in italic serif, "Brands. Ads."
- Subtitle: "Short animated videos, carousels, brand identity and product ads."
- Buttons: "Book a call" (Calendly) and "See the work" (scrolls to the work section).
- Cards: "Produce, content at scale, 134 posts, 3 languages" and "Rebrand, identity and pages, 5 brand projects". Wael confirmed these figures are true and can ship.

### Page composition: same as the homepage (Wael)

`/creative-2` keeps the homepage's composition: the same sections, in the same order and the same places, with the same dividers. Only the content and the style (A) change. Mapping of `src/pages/Index.tsx`:

| Homepage (`Index.tsx`) | `/creative-2` |
|---|---|
| `Navigation` | same global nav |
| `HeroSection` | the slider hero (above) |
| `SectionDivider glow` | same |
| `ExperienceSection` | same layout, creative experience |
| `SectionDivider curve-to-light` | same |
| `ServicesSection` | same layout, the 4 creative services |
| `SectionDivider curve-to-dark` | same |
| `CreativeWorkflowSection teaser` + `CaseStudyBar` | same layout, the work: `videoProjects` (`src/lib/video-data.ts`), the rebrand list in `src/pages/Creative.tsx`, and the carousel and ad examples Wael will supply |
| `SectionDivider curve-to-light` | same |
| `TestimonialSection` | same layout, only testimonials that are about creative work |
| `SectionDivider curve-to-dark` | same |
| `GTMSystemSection` | same layout, the creative process and the final "Book a call" |
| `Footer` | same |

Each section keeps its homepage layout and position (my call on how: a style-A variant of each section, or page-local copies; the homepage must render pixel-identical). If a homepage section has no real creative content to fill it, the builder flags it to Wael rather than inventing content or removing the section.

Copy for these sections (Wael's answer): I draft it from his real data (videos, rebrands, Upwork, figures above), he approves it before it ships. Carousels and product ads: Wael supplies the examples; until they arrive, those two services show in the services section without samples.

The data is reused. `/creative` itself is not touched; the builder moves the rebrand list to a shared file only if that leaves `/creative` unchanged.

### Assets

- Photo: the cutout `wael-new.png` from the mockup (840x973, transparent background), converted to WebP in `src/assets/`.
- Fonts: Inter is already used; Newsreader italic is added for the serif line.

## Constraints

- Site copy in English, no em-dashes, no bold in copy, no invented figures or facts.
- Port 8080 is not touched. `npm run build` is not run.
- Never commit `.claude/launch.json`, `public/responsive/*.webp`, `src/lib/responsive-image-manifest.ts` or the `ysg-mac-migration` bundle.

## Search engines (Wael)

`/creative-2` is `noindex` and stays out of the sitemap while `/creative` exists.

## Waiting on Wael (does not block the build)

- Carousel and product ad examples for the work section.
- Approval of the section copy I draft.

## Left to the builder

- Component split and file names.
- Exact style-A tokens (cream, ink, lime, halftone halo, frame) taken from the `.A` rules in `docs/superpowers/specs/2026-11-15-creative-2-mockup.html`.
- Tests (my call on tooling): Vitest (`npm test`) for the slider logic (pointer and keyboard to `--p`, clamped 0 to 100). A Playwright script against the dev server on port 8081 that checks both layers' blocks have the same boxes at 375, 768 and 1280 px. Both tools are already in the repo.
