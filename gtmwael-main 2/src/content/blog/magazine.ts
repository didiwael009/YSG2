import type { BlogPost } from "./types";
import type { CroTeardownPost } from "@/content/cro-teardown/types";

export const NEWS_CATEGORY = "AI News";

export type MagazineTab = "latest" | "news" | "guides";

/** What a card shows in its 16:9 frame. */
export type Cover =
  | { kind: "pair"; before: { src: string; label: string }; after: { src: string; label: string } }
  | { kind: "shot"; src: string; label: string }
  | { kind: "schema"; src: string; alt: string }
  | { kind: "type" };

export type CardRef = {
  title: string;
  href: string;
  date: string;
  label: string;
  image?: string;
  imageAlt?: string;
  cover: Cover;
};

/** The generic site banner: never used as a cover. */
const GENERIC_BANNER = "/og-default.png";

export const coverSources = (cover: Cover): string[] =>
  cover.kind === "pair" ? [cover.before.src, cover.after.src] : cover.kind === "type" ? [] : [cover.src];

/**
 * Captures saved while the Wayback Machine was down: they show the archive's
 * "Temporarily Offline" page, not the company's homepage. Never used as covers.
 */
const ARCHIVE_OFFLINE_CAPTURES = new Set([
  "/cro-teardowns/brevo/selected/2023-01.webp",
  "/cro-teardowns/cashin/selected/2023-01.webp",
  "/cro-teardowns/cashin/selected/2026-01.webp",
  "/cro-teardowns/crowdanalyzer/selected/2016-07.webp",
  "/cro-teardowns/lemlist/selected/2023-07.webp",
  "/cro-teardowns/mailerlite/selected/2026-01.webp",
  "/cro-teardowns/sendx/selected/2019-01.webp",
  "/cro-teardowns/wafeq/selected/2022-01.webp",
]);

const teardownCover = (post: CroTeardownPost): Cover => {
  const usable = post.snapshots.filter((s) => !s.screenshotMissing && !ARCHIVE_OFFLINE_CAPTURES.has(s.screenshotPath));
  if (usable.length === 0) return { kind: "type" };
  const first = usable[0];
  const last = usable[usable.length - 1];
  const shot = (s: (typeof usable)[number]) => ({
    src: s.screenshotPath,
    label: s.screenshotPath.endsWith("current-live.webp") ? "Today" : s.label,
  });
  return usable.length === 1 ? { kind: "shot", ...shot(first) } : { kind: "pair", before: shot(first), after: shot(last) };
};

const imageCover = (src: string | undefined, alt: string | undefined): Cover =>
  src && src !== GENERIC_BANNER ? { kind: "schema", src, alt: alt ?? "" } : { kind: "type" };

export const isNewsIssue = (post: BlogPost) => post.category === NEWS_CATEGORY;

const byDateDesc = <T extends { datePublished: string }>(a: T, b: T) =>
  b.datePublished.localeCompare(a.datePublished);

export function getNewsItems(posts: BlogPost[]): CardRef[] {
  return posts
    .filter(isNewsIssue)
    .sort(byDateDesc)
    .flatMap((post) =>
      post.blocks.flatMap((block) =>
        block.type === "news-item"
          ? [
              {
                title: block.title,
                href: `${post.path}#${block.id}`,
                date: post.datePublished,
                label: block.rubrique,
                image: block.image,
                imageAlt: block.imageAlt,
                cover: { kind: "shot", src: block.image, label: block.rubrique } as Cover,
              },
            ]
          : [],
      ),
    );
}

export const getGuides = (posts: BlogPost[]) =>
  posts.filter((p) => !isNewsIssue(p)).sort(byDateDesc);

export function getLeadGuide(posts: BlogPost[]): BlogPost | undefined {
  const guides = getGuides(posts);
  return guides.find((g) => g.featured) ?? guides[0];
}

export function sortTeardowns(posts: CroTeardownPost[]): CroTeardownPost[] {
  return posts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => byDateDesc(a.post, b.post) || b.index - a.index)
    .map(({ post }) => post);
}

const isTeardown = (post: BlogPost | CroTeardownPost): post is CroTeardownPost =>
  "companyName" in post;

export function toCard(post: BlogPost | CroTeardownPost): CardRef {
  if (isTeardown(post)) {
    return {
      title: post.title,
      href: `/cro-teardowns/${post.slug}`,
      date: post.datePublished,
      label: "Teardown",
      image: post.featuredImage,
      imageAlt: post.featuredImageAlt,
      cover: teardownCover(post),
    };
  }
  return {
    title: post.title,
    href: post.path,
    date: post.datePublished,
    label: post.category,
    image: post.cardImage ?? post.featuredImage,
    imageAlt: post.featuredImageAlt,
    cover: imageCover(post.cardImage ?? post.featuredImage, post.featuredImageAlt),
  };
}

export function getLatestColumn(posts: BlogPost[], teardowns: CroTeardownPost[], n: number): CardRef[] {
  const news = getNewsItems(posts);
  if (news.length > 0) return news.slice(0, n);
  return [...getGuides(posts).map(toCard), ...sortTeardowns(teardowns).map(toCard)]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, n);
}

export function parseTab(value: string | null): MagazineTab {
  return value === "news" || value === "guides" ? value : "latest";
}

/** Guides that live outside /blog/*: listed on the magazine so they keep their inbound link from /blog. */
export const extraGuides: CardRef[] = [
  {
    title: "B2B SaaS Marketing Strategy: What to Fix Before Scaling Traffic",
    href: "/b2b-saas-marketing-strategy",
    date: "2026-05-17",
    label: "B2B SaaS Growth",
    image: "/b2b-saas-marketing-strategy-framework-wael-aouididi.webp",
    imageAlt: "B2B SaaS marketing strategy framework",
    cover: {
      kind: "schema",
      src: "/b2b-saas-marketing-strategy-framework-wael-aouididi.webp",
      alt: "B2B SaaS marketing strategy framework",
    },
  },
  {
    title: "SaaS Marketing Plan: A Practical Framework for Founders",
    href: "/saas-marketing-plan",
    date: "2026-05-17",
    label: "SaaS GTM",
    image: "/saas-marketing-plan-framework-founders-wael-aouididi.webp",
    imageAlt: "SaaS marketing plan framework for founders",
    cover: {
      kind: "schema",
      src: "/saas-marketing-plan-framework-founders-wael-aouididi.webp",
      alt: "SaaS marketing plan framework for founders",
    },
  },
];

/** Every guide as a card, newest first: /blog guides plus the extra guide pages. */
export const getAllGuideCards = (posts: BlogPost[]): CardRef[] =>
  [...getGuides(posts).map(toCard), ...extraGuides].sort((a, b) => b.date.localeCompare(a.date));
