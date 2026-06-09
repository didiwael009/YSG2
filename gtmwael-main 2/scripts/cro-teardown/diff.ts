import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageText {
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  h3: string[];
  ctas: string[];
  navLinks: string[];
  bodyText: string;
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
  ctaAdded: string[];
  ctaRemoved: string[];
  navAdded: string[];
  navRemoved: string[];
  visualOnly: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nonEmpty(s: string | null | undefined): s is string {
  return typeof s === 'string' && s.trim().length > 0;
}

function setDiff(a: string[], b: string[]): { added: string[]; removed: string[] } {
  const sa = new Set(a);
  const sb = new Set(b);
  return { added: b.filter(x => !sa.has(x)), removed: a.filter(x => !sb.has(x)) };
}

// ─── CTA / nav noise filters ──────────────────────────────────────────────────

/** Language selectors, legal boilerplate, app-store badges, raw URLs */
const NOISE_RE = /english|french|german|spanish|portuguese|italian|legal|privacy|accessibility|cookie|©|app store|google play|https?:/i;

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
  /^(open|close)\s+navigation\b|^allow all$|^confirm my choices$|^more information$|^clear$|^apply$|^cancel$|^cookies?\s+details?$/i;

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

  // CTAs and nav — apply noise filters before diffing, then sort action CTAs first
  const cta = setDiff(cleanCtas(fromText.ctas ?? []), cleanCtas(toText.ctas ?? []));
  const nav = setDiff(cleanNav(fromText.navLinks ?? []), cleanNav(toText.navLinks ?? []));
  const ctaAddedSorted   = prioritizeCtas(cta.added);
  const ctaRemovedSorted = prioritizeCtas(cta.removed);

  const totalSignificantChanges =
    headlines.length + metaDescs.length +
    h2.added.length + h2.removed.length +
    cta.added.length + cta.removed.length;

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
