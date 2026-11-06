# Blog magazine: home page and article template

Date: 2026-11-06. Approved mockup: `.superpowers/brainstorm/7641-1793984431/content/magazine-v3.html` (local only, gitignored).

## Why

The blog today (`src/pages/Blog.tsx`) is a dark page of hardcoded cards for SEO guides. The teardowns live apart at `/cro-teardowns`, and the AI news from Wael's daily veille has no home on the site.

Wael wants the blog to read like a digital agency's magazine. Visitors arrive from social or Google, and they are not only SaaS founders: they run digital businesses and come for the latest AI news and growth or creative techniques. When they want to work with someone, Wael's profile is right there. The targets are anyone relaunching a site, and digital agencies.

Wael's references are The Information, TechCrunch and Newcomer: "un blog magazine simple comme tout le monde", in the site's colours.

## Goals

- One magazine home at `/blog` that mixes three content types:
  - AI News: a new issue every 4 days;
  - Guides: the existing SEO posts;
  - Teardowns: the existing 24 at `/cro-teardowns`.
- One article layout, shared by guides and news, that is light and easy to read.
- Wael's profile and a "Work with me" CTA on the home and on every article.

## Non-goals

- No change to teardown URLs or to the teardown article body. They keep their `/cro-teardowns/:slug` pages and data.
- No video inside articles.
- No comments, likes, newsletter, search or sign-in. Those are things the reference sites have that Wael did not ask for.
- No change to the main home page.

## Anti-goals

The project fails even if it works when:
- Content is invented. No made-up figures or scores in templates, sample data or copy. Every number comes from the source.
- It looks like a template or AI slop: glow everywhere, emoji, generic gradients on every card.
- Pages get heavy. No new font download for the serif, no client-side-only rendering of article text. Pages must still prerender.
- Existing SEO is lost: URLs, titles and canonicals of current posts and teardowns stay as they are.

## Decided with Wael

- **Layout**: classic magazine. Direction A was chosen first, then simplified in v2 on Wael's references.
- **Home, top to bottom**:
  1. Tabs: Latest, AI News, Guides, Teardowns.
  2. The lead block on a dark band, in three columns:
     - left: one big story with an image, category, serif title, one-line summary and byline;
     - middle: two stories with images;
     - right: a "Latest news" list of titles and dates only.
  3. "AI News" section: title, a "See all" pill, two stories with images, then a row of three small text items.
  4. "Teardowns" section: four cards (screenshot plus title) and an "All 24" pill linking to `/cro-teardowns`.
  5. "Guides" section: three cards (image plus title).
  6. Profile band: "Written by Wael", one line on what he does, and a "Work with me" button.
- **Article page**, one model:
  - category label, then a serif title, a one-line summary, and the byline with author, date and read time;
  - a main image;
  - the text in a narrow column, about 560 to 680 px;
  - a right sidebar with Wael's card ("Work with me") and the latest news.
- **News issue**:
  - one article holding 4 or 5 mixed items (LLM news, content automation, digital business);
  - each item has a heading, its image, the text, and a line "Limit: … Source: … ↗";
  - this line reuses the veille's existing `limite` and `source` fields.
- **Colours**: the site's own tokens.
  - Cream background `--background-light` (30 30% 96%).
  - Orange `--primary` (16 90% 50%) for category labels, buttons and pills.
  - Purple `--accent` (250 70% 62%) for section rules.
  - The dark hero gradient (240 30% 6% to 260 35% 12%) for the lead band and the profile band.
  - Headings in `--heading-light`.
- **Removed on Wael's request**: the score out of 10 on teardowns and invented figures in news.

## Builder's calls (Claude's, Wael can override)

- **Serif titles** use a system stack (`Georgia, "Times New Roman", serif`), so nothing new is downloaded. Body text stays in the site's body font. Small labels (category, tabs) use the system monospace, as on The Information.
- **News issues are blog posts**:
  - `category: "AI News"` and a new `news-item` block in the `BlogBlock` union, served at `/blog/:slug`;
  - this reuses `BlogArticle` and the prerender with no new route;
  - each `news-item` carries `rubrique`, `title`, `text`, `image`, `imageAlt`, `limit`, `sourceLabel` and `sourceUrl`.
- **Data for the home** comes from `blogPosts` and `croTeardownPosts`. Hardcoded cards in `Blog.tsx` go away.
- **Tabs filter in place**: they use `?type=news|guides|teardowns` on `/blog` and render server-side the same as "Latest". The Teardowns tab can simply link to `/cro-teardowns`.
- **"Latest"** sorts everything by `datePublished`. The lead story is the newest guide or study, or a `featured: true` flag on a post if Wael wants to pin one.
- **Mobile**: one column. The lead story comes first, then the two middle stories, then the "Latest news" list. Sections keep their order.
- **Profile copy**: "Written by Wael. I rebuild sites, run content and ads for digital businesses and agencies." The button goes to `/book`. No bold and no em-dashes, per the site rules.

### After the builder check (Claude's calls)

- **What the home shows**:
  - The "AI News" section and the "Latest news" column show individual news items taken from the newest issues. Each item links to its anchor inside the issue (`/blog/<issue>#<item>`).
  - "Latest" mixes guides and news issues.
  - Teardowns stay in their own section. Only the newest teardown also appears in the middle column of the lead.
  - With zero news issues, the "AI News" section is hidden and the "Latest news" column lists the newest guides and teardowns. The home never shows an empty block or a fake item.
- **Order**:
  - Teardowns sort by `datePublished`, then by their order in `croTeardownPosts`, because many teardowns share a date.
  - The lead story is the newest guide, unless a guide sets `featured: true`.
- **Tabs and SEO**:
  - `/blog` prerenders the Latest view. `?type=` filters on the client, and its canonical stays `/blog`. No new routes.
  - The `/blog` title and description widen to the new audience: "Growth, AI and Content Blog | Your SaaS Growth" plus a matching description. This page only; every post and teardown URL, title and canonical stays unchanged.
- **News issue type**:
  - For `category: "AI News"`, the fields `faq`, `source`, `primaryKeyword`, `internalLinks` and `relatedPosts` become optional. The TOC lists the items.
  - Issues get Article JSON-LD and go in the sitemap and `llms.txt` like other posts.
- **Existing guides**:
  - They get the new header, sidebar and narrow column.
  - Their blocks keep their structure. Dark blocks (`dark-checklist`, the dark quote, dark table headers) are restyled light on the cream background.
  - Wide blocks (data-table, comparison-table, image-compare) may break out of the narrow column up to about 900 px.
- **Article sidebar**: on mobile it moves under the text. "Latest news" falls back to the newest posts when no news exists.
- **Profile**: portrait `hero-portrait-*.webp`. The same copy on the home band and in the article card.

### Wael's answers after the builder check

- **Guide images.** New images are generated with Google Flow through browser-kit:
  - first `browser-kit ensure`, then the `flow:generate` flow, as described in the browser-kit skill;
  - no text inside any generated image, since Flow writes text badly; titles stay in our HTML;
  - one image per guide that currently uses `og-default.png`, saved as webp in `public/` and set as a new `cardImage` field (`featuredImage` and OG images stay as they are);
  - fallback if Flow fails: the local FLUX.2 klein 4B model.
- **First news issue ships in this build.**
  - It covers the veille of Nov 3 to 6, written in English, 4 or 5 mixed items.
  - Each item's image is a capture of the source thread or page (Reddit post or article), linked to it. Photos posted by other people are not reused as they are.
  - Wael reads and approves the issue text before the push.

## Later, separate step (not in this build)

- `veille-to-blog` script: turns a veille day (`~/tools/gtm-post-du-jour/veille/carrousels/<date>/contenu*.json`) into a news issue TS file, so the next issues every 4 days come from the script. The first issue is written by hand in this build.
- Nothing gets published without Wael's OK.

## Open to the builder

Component split, exact spacing and type scale, image aspect ratios, and how the teardown cards pick their screenshot (`featuredImage`).
