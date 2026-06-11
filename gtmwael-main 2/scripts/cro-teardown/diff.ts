import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ElementType = 'nav_link' | 'hero_cta' | 'body_cta' | 'section_heading' | 'footer_link';

export interface TypedElement {
  text: string;
  type: ElementType;
}

export interface PageText {
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  h3: string[];
  /** hero_cta + body_cta only (v2 scraper). Legacy v1 files may include nav items. */
  ctas: string[];
  navLinks: string[];
  bodyText: string;
  /** Typed element list; present for scrapes after the classification fix. */
  elements?: TypedElement[];
}

export interface TextChange {
  from: string;
  to: string;
  fromMonth: string;
  toMonth: string;
}

export interface DiffResult {
  fromMonth: string;
  toMonth: string;
  fromText: PageText;
  toText: PageText;
  headlines: TextChange[];
  titles: TextChange[];
  metaDescs: TextChange[];
  h2Added: string[];
  h2Removed: string[];
  h3Added: string[];
  h3Removed: string[];
  /** Union of heroCTA + bodyCta buckets — backward-compat for evidence-pack and article schema. */
  ctaAdded: string[];
  ctaRemoved: string[];
  navAdded: string[];
  navRemoved: string[];
  /** Per-type bucket diffs — populated when typed elements are available. */
  heroCTAAdded: string[];
  heroCTARemoved: string[];
  bodyCtaAdded: string[];
  bodyCtaRemoved: string[];
  footerLinkAdded: string[];
  footerLinkRemoved: string[];
  visualOnly: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nonEmpty(s: string | null | undefined): s is string {
  return typeof s === 'string' && s.trim().length > 0;
}

function setDiff(a: string[], b: string[]): { added: string[]; removed: string[] } {
  // Case-insensitive comparison: "Contact Sales" and "contact sales" are the same
  // logical label. We compare on lowercased keys but keep the original casing from
  // each array in the output so article prose can quote the text accurately.
  const saKeys = new Map(a.map(x => [x.trim().toLowerCase(), x]));
  const sbKeys = new Map(b.map(x => [x.trim().toLowerCase(), x]));
  return {
    added:   [...sbKeys.entries()].filter(([k]) => !saKeys.has(k)).map(([, v]) => v),
    removed: [...saKeys.entries()].filter(([k]) => !sbKeys.has(k)).map(([, v]) => v),
  };
}

// ─── CTA / nav noise filters ──────────────────────────────────────────────────

/** Language selectors, legal boilerplate, app-store badges, raw URLs, footer nav */
const NOISE_RE =
  /english|french|german|spanish|portuguese|italian|legal|privacy|accessibility|cookie|©|app store|google play|https?:|sitemap|back to top|scroll to top|select region|select language|change.*country|change.*region/i;

/** Accessibility skip-navigation links: "Skip to content", "Skip to main", etc. */
const SKIP_LINK_RE = /^skip\s+to\b/i;

/**
 * Homepage links — word-boundary match catches both "homepage" (bare)
 * and "Hootsuite homepage" (logo alt-text link).
 */
const HOMEPAGE_RE = /\bhomepage\b/i;

/**
 * Cookie-consent dialog buttons and hamburger-menu toggles that
 * the scraper sometimes captures as interactive elements.
 */
const UI_CHROME_RE =
  /^(open|close)\s+navigation\b|^allow all$|^confirm my choices$|^more information$|^clear$|^apply$|^cancel$|^cookies?\s+details?$|^got\s+it!?$|^ok$|^accept$|^i\s+agree$/i;

/**
 * Social-media embed noise: @mentions and emoji presentation characters.
 * These come from embedded feed items, not page CTAs.
 */
const SOCIAL_EMBED_RE = /@\w+|\p{Emoji_Presentation}/u;

/**
 * Single-word strings that ARE legitimate standalone CTAs and should survive
 * the single-word filter below (e.g. a "Login" button).
 */
const SINGLE_WORD_CTA_ALLOWLIST = new Set([
  'login', 'signup', 'register', 'subscribe', 'try', 'demo',
  'download', 'upgrade', 'buy', 'join', 'apply', 'book', 'watch', 'contact',
]);

/**
 * Returns true when the string is a single word that is NOT a known CTA verb —
 * i.e. it is a generic nav label like "Products", "Pricing", "Careers".
 */
function isSingleWordNavNoise(s: string): boolean {
  const words = s.trim().split(/\s+/);
  if (words.length !== 1) return false;
  return !SINGLE_WORD_CTA_ALLOWLIST.has(words[0].toLowerCase());
}

/**
 * Cleans a raw CTA list by removing accessibility chrome, homepage links,
 * cookie-consent UI, social-embed text, and single-word generic nav labels.
 */
function cleanCtas(raw: string[]): string[] {
  return raw
    .filter(s => nonEmpty(s))
    .filter(s => s.length <= 45)
    .filter(s => !NOISE_RE.test(s))
    .filter(s => !SKIP_LINK_RE.test(s.trim()))
    .filter(s => !HOMEPAGE_RE.test(s.trim()))
    .filter(s => !UI_CHROME_RE.test(s.trim()))
    .filter(s => !SOCIAL_EMBED_RE.test(s))
    .filter(s => !isSingleWordNavNoise(s))
    .map(s => s.trim())
    .filter((s, i, arr) => arr.indexOf(s) === i);
}

/**
 * Action CTAs start with an imperative verb — float these to the front so the
 * slice(0, 10) window always captures genuine conversion elements first.
 */
const ACTION_CTA_RE =
  /^(start|get|try|request|book|sign\s+up|see\s+all|explore|compare|read|learn|download|watch|register|schedule|contact|become)\b/i;

function prioritizeCtas(ctas: string[]): string[] {
  const action = ctas.filter(s => ACTION_CTA_RE.test(s));
  const rest   = ctas.filter(s => !ACTION_CTA_RE.test(s));
  return [...action, ...rest];
}

/** Cleans raw nav-link lists: remove skip links, homepage, and boilerplate. */
function cleanNav(raw: string[]): string[] {
  return raw
    .filter(s => nonEmpty(s))
    .filter(s => s.length <= 35)
    .filter(s => !NOISE_RE.test(s))
    .filter(s => !/\s{2,}/.test(s))
    .filter(s => !SKIP_LINK_RE.test(s.trim()))
    .filter(s => !HOMEPAGE_RE.test(s.trim()))
    .map(s => s.trim())
    .filter((s, i, arr) => arr.indexOf(s) === i);
}

// ─── Backward-compat element migration ───────────────────────────────────────

/**
 * Build a typed element list from legacy PageText (no `.elements` field).
 * Items in navLinks → nav_link; items in ctas not already in navLinks → body_cta.
 * Hero detection requires DOM context and is not possible from text alone.
 */
function migrateToElements(text: PageText): TypedElement[] {
  const navSet = new Set((text.navLinks ?? []).map(s => s.trim().toLowerCase()));
  const elements: TypedElement[] = (text.navLinks ?? []).map(t => ({ text: t, type: 'nav_link' as ElementType }));
  for (const t of (text.ctas ?? [])) {
    if (!navSet.has(t.trim().toLowerCase())) {
      elements.push({ text: t, type: 'body_cta' });
    }
  }
  return elements;
}

// ─── Diff engine ──────────────────────────────────────────────────────────────

export function computeDiff(
  fromText: PageText,
  toText: PageText,
  fromMonth: string,
  toMonth: string,
): DiffResult {
  // H1 — compare only the primary headline (first h1)
  const headlines: TextChange[] = [];
  const fromH1 = fromText.h1?.[0]?.trim();
  const toH1 = toText.h1?.[0]?.trim();
  if (fromH1 && toH1 && fromH1 !== toH1) {
    headlines.push({ from: fromH1, to: toH1, fromMonth, toMonth });
  }

  // Title
  const titles: TextChange[] = [];
  if (nonEmpty(fromText.title) && nonEmpty(toText.title) && fromText.title !== toText.title) {
    titles.push({ from: fromText.title.trim(), to: toText.title.trim(), fromMonth, toMonth });
  }

  // Meta description
  const metaDescs: TextChange[] = [];
  if (
    nonEmpty(fromText.metaDescription) &&
    nonEmpty(toText.metaDescription) &&
    fromText.metaDescription !== toText.metaDescription
  ) {
    metaDescs.push({ from: fromText.metaDescription.trim(), to: toText.metaDescription.trim(), fromMonth, toMonth });
  }

  // H2 / H3 — filter noise: must be > 4 chars AND at least 3 words to avoid
  // fragmented headings like "Scale your", "without compromising", "Build"
  const minWords = (s: string) => s.split(/\s+/).filter(Boolean).length >= 3;
  const h2 = setDiff(
    (fromText.h2 ?? []).filter(s => s.length > 4 && minWords(s)),
    (toText.h2 ?? []).filter(s => s.length > 4 && minWords(s)),
  );
  const h3 = setDiff(
    (fromText.h3 ?? []).filter(s => s.length > 4 && minWords(s)),
    (toText.h3 ?? []).filter(s => s.length > 4 && minWords(s)),
  );

  // Use typed elements when available; fall back to heuristic migration for legacy JSON files.
  const fromElements = fromText.elements ?? migrateToElements(fromText);
  const toElements   = toText.elements   ?? migrateToElements(toText);

  const byType = (els: TypedElement[], type: ElementType) =>
    els.filter(e => e.type === type).map(e => e.text);

  // Per-bucket diffs — diffs run within type only, never across buckets.
  const heroCTA    = setDiff(cleanCtas(byType(fromElements, 'hero_cta')),   cleanCtas(byType(toElements, 'hero_cta')));
  const bodyCta    = setDiff(cleanCtas(byType(fromElements, 'body_cta')),   cleanCtas(byType(toElements, 'body_cta')));
  const footerLink = setDiff(cleanNav(byType(fromElements, 'footer_link')), cleanNav(byType(toElements, 'footer_link')));
  const nav        = setDiff(cleanNav(byType(fromElements, 'nav_link')),    cleanNav(byType(toElements, 'nav_link')));

  // ctaAdded/Removed = union of hero + body; backward-compat for evidence-pack + article schema.
  const dedupeByKey = (arr: string[]) => {
    const seen = new Set<string>();
    return arr.filter(s => { const k = s.trim().toLowerCase(); return seen.has(k) ? false : (seen.add(k), true); });
  };
  const ctaAddedSorted   = prioritizeCtas(dedupeByKey([...heroCTA.added,   ...bodyCta.added]));
  const ctaRemovedSorted = prioritizeCtas(dedupeByKey([...heroCTA.removed, ...bodyCta.removed]));

  const totalSignificantChanges =
    headlines.length + metaDescs.length +
    h2.added.length + h2.removed.length +
    ctaAddedSorted.length + ctaRemovedSorted.length;

  return {
    fromMonth,
    toMonth,
    fromText,
    toText,
    headlines,
    titles,
    metaDescs,
    h2Added: h2.added,
    h2Removed: h2.removed,
    h3Added: h3.added.slice(0, 8),
    h3Removed: h3.removed.slice(0, 8),
    ctaAdded: ctaAddedSorted.slice(0, 10),
    ctaRemoved: ctaRemovedSorted.slice(0, 10),
    navAdded: nav.added.slice(0, 8),
    navRemoved: nav.removed.slice(0, 8),
    heroCTAAdded: heroCTA.added,
    heroCTARemoved: heroCTA.removed,
    bodyCtaAdded: bodyCta.added,
    bodyCtaRemoved: bodyCta.removed,
    footerLinkAdded: footerLink.added.slice(0, 8),
    footerLinkRemoved: footerLink.removed.slice(0, 8),
    visualOnly: totalSignificantChanges === 0,
  };
}

// ─── Loader ───────────────────────────────────────────────────────────────────

export function loadPageText(
  projectRoot: string,
  slug: string,
  month: string,
): PageText | null {
  const jsonPath = path.join(
    projectRoot,
    'data',
    'cro-teardowns',
    slug,
    'page-text',
    `${month === 'current' ? 'current-live' : month}.json`,
  );
  if (!fs.existsSync(jsonPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as PageText;
  } catch {
    return null;
  }
}
