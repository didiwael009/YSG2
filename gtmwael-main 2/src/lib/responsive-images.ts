import { responsiveImageManifest, type ResponsiveImageEntry } from "@/lib/responsive-image-manifest";

export type ResponsiveImageData = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

const stripQuery = (src: string) => src.split("?")[0];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getSlugFromSrc = (src: string) => {
  const clean = stripQuery(src);
  const fileName = clean.slice(clean.lastIndexOf("/") + 1);
  return slugify(fileName);
};

const findEntry = (src: string): ResponsiveImageEntry | undefined => {
  const slug = getSlugFromSrc(src);
  const manifest = responsiveImageManifest as Record<string, ResponsiveImageEntry>;
  if (manifest[slug]) return manifest[slug];

  const match = Object.keys(manifest)
    .filter((key) => slug === key || slug.startsWith(`${key}-`))
    .sort((a, b) => b.length - a.length)[0];

  return match ? manifest[match] : undefined;
};

export const getResponsiveImage = (src: string): ResponsiveImageData | undefined => {
  const entry = findEntry(src);
  if (!entry?.variants?.length) return undefined;

  const largest = entry.variants[entry.variants.length - 1];

  return {
    src: largest.src,
    srcSet: entry.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    width: largest.width,
    height: Math.round((entry.height / entry.width) * largest.width),
  };
};
