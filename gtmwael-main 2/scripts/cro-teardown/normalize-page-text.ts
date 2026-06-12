/**
 * normalize-page-text.ts — Layer 1: Data Normalization
 *
 * Produces a { raw, normalized } view of extracted PageText before it enters
 * the diff engine, strategy detector, SEO planner, or article writer.
 *
 * PURPOSE
 * -------
 * The scraper captures everything the browser sees: cookie banners, language
 * switchers, footer boilerplate, accessibility skip-links, social embeds, and
 * carousel repetition. If these reach the diff or the LLM, they become noise
 * that inflates change counts and pollutes the article.
 *
 * This module does NOT replace the existing cleanCtas()/cleanNav() filters in
 * diff.ts — those work at diff time to remove noise from comparisons. This module
 * adds a parallel view used by the article writer and downstream LLM steps to
 * understand the strategic intent of a page.
 *
 * OUTPUT SHAPE
 * ------------
 * {
 *   raw: PageText,               — untouched scraper output
 *   normalized: {
 *     strategicNav: string[],    — nav items that signal product/buyer intent
 *     primaryCtas: string[],     — action CTAs (imperative verbs, not utility)
 *     utilityLinks: string[],    — login/account/language/legal (kept, just separated)
 *     sectionHeadings: {
 *       h2: string[],
 *       h3: string[],
 *     },
 *   },
 * }
 *
 * CASING RULE
 * -----------
 * Deduplication is case-insensitive ("Contact Sales" = "contact sales" = "CONTACT SALES").
 * The first-seen original casing is kept in the output.
 */

import type { PageText } from './diff.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NormalizedPageText {
  strategicNav: string[];
  primaryCtas: string[];
  utilityLinks: string[];
  sectionHeadings: {
    h2: string[];
    h3: string[];
  };
  /** Whitespace-normalized body text, safe to include in LLM context. */
  bodyText: string;
}

export interface NormalizedResult {
  raw: PageText;
  normalized: NormalizedPageText;
}

// ─── Ignored label blacklist ──────────────────────────────────────────────────
//
// Items here are stripped from ALL strategic categories.
// They may still appear in utilityLinks if they match the utility pattern.
//
// Rules:
//   • Lower-case only — comparison is done with .toLowerCase()
//   • Exact-match strings plus sub-string patterns (see isIgnored())
//   • Extend this list when new noise patterns are observed in page-text JSONs

const IGNORED_LABELS: ReadonlySet<string> = new Set([
  // Accessibility
  'skip to content',
  'skip to main content',
  'skip to navigation',
  'skip navigation',
  'accessibility',
  'accessibility statement',

  // Legal / cookie boilerplate
  'privacy policy',
  'privacy',
  'terms',
  'terms of service',
  'terms and conditions',
  'cookie settings',
  'cookie policy',
  'cookies',
  'manage cookies',
  'accept all cookies',
  'accept cookies',
  'reject all',
  'more information',
  'confirm my choices',
  'allow all',
  // Cookie-banner dismiss buttons
  'got it',
  'got it!',
  'ok',
  'accept',
  'i agree',

  // Language / region switchers
  'français',
  'french',
  'france',
  'deutsch',
  'deutsch (deutschland)',
  'deutschland',
  'español',
  'spanish',
  'italiano',
  'portuguese',
  'português',
  'english',
  'english (us)',
  'english (uk)',
  'language',
  'change language',
  'change your country or region',
  'select region',
  'select language',
  'global',
  'united states',
  'united kingdom',

  // Generic footer
  'sitemap',
  'back to top',
  'scroll to top',
  '© ',   // matched via startsWith check
]);

// ─── Utility link detection ───────────────────────────────────────────────────
//
// These are genuine product touchpoints but should NOT be counted as strategic
// conversion signals unless they are the PRIMARY CTA on the page.
// They are kept in utilityLinks so the writer can reference them if needed.

const UTILITY_PATTERNS: ReadonlyArray<RegExp> = [
  /^(log\s?in|login)$/i,
  /^(sign\s?in|signin)$/i,
  /^(sign\s?up|signup)$/i,
  /^(create\s+(an?\s+)?account)$/i,
  /^(my\s+account|account)$/i,
  /^(dashboard|go\s+to\s+dashboard)$/i,
  /^(profile|settings)$/i,
  /^(help|help\s+center|support|contact\s+support)$/i,
  /^(status|system\s+status)$/i,
  /^(careers|jobs|we'?re?\s+hiring)$/i,
  /^(about|about\s+us)$/i,
  /^(blog|news|press|newsroom)$/i,
  /^(documentation?|docs|api\s+docs|api\s+reference)$/i,
];

// ─── Action CTA detection ─────────────────────────────────────────────────────
//
// Primary CTAs start with an imperative verb that drives conversion.
// These are floated to the front of primaryCtas[].

const ACTION_CTA_RE = /^(start|get|try|request|book|sign\s+up|see\s+all|explore|compare|read|learn|download|watch|register|schedule|contact|become|discover|view|build|deploy|launch|upgrade|buy|join|apply|claim)\b/i;

// ─── Noise patterns (always strip, never classify) ────────────────────────────

const STRIP_ALWAYS: ReadonlyArray<RegExp> = [
  /^skip\s+to\b/i,                // skip-to-* accessibility links
  /\bhomepage\b/i,                 // logo alt text / homepage link
  /^(open|close)\s+navigation\b/i, // hamburger toggles
  /©/,                             // copyright lines
  /https?:\/\//,                   // raw URLs
  /@\w+/,                          // social @handles
  /\p{Emoji_Presentation}/u,       // emoji from social embeds
  /\s{2,}/,                        // tabs / multi-space (scraped formatting noise)
];

// ─── Body text normalization ──────────────────────────────────────────────────

/**
 * Normalize raw bodyText before it enters LLM context.
 *
 * Two passes:
 * 1. Split inline-element concatenation artifacts: a run of 3+ lowercase letters
 *    immediately followed by an uppercase letter + 2+ lowercase letters indicates
 *    two words that were joined without a space (e.g. "FeatureGot it!").
 *    Word-boundary split inserts a space at that junction.
 *    Limit: may also split camelCase product names (e.g. "TweetHunter" → "Tweet Hunter"),
 *    which is acceptable since bodyText is LLM context, never a quoted source.
 * 2. Collapse all runs of whitespace (tabs, newlines, double-spaces) → single space.
 */
export function cleanBodyText(raw: string): string {
  return raw
    .replace(/([a-z]{3,})([A-Z][a-z]{2,})/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Heading quality rules ────────────────────────────────────────────────────
//
// A heading is "strategic" when:
//   • It has at least 3 words (removes fragments like "Scale your", "Build")
//   • It is at least 10 characters long
//   • It does not match STRIP_ALWAYS

const MIN_HEADING_WORDS = 3;
const MIN_HEADING_CHARS = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isNonEmpty(s: string): boolean {
  return typeof s === 'string' && s.trim().length > 0;
}

function isSuppressed(label: string): boolean {
  const lc = label.trim().toLowerCase();

  // Exact match in blacklist
  if (IGNORED_LABELS.has(lc)) return true;

  // Starts with copyright marker
  if (lc.startsWith('© ') || lc.startsWith('copyright')) return true;

  // Matches a strip-always pattern
  if (STRIP_ALWAYS.some(re => re.test(label))) return true;

  // Too long (nav/CTA items over 60 chars are almost certainly body text)
  if (label.length > 60) return true;

  return false;
}

function isUtility(label: string): boolean {
  return UTILITY_PATTERNS.some(re => re.test(label.trim()));
}

/**
 * Case-insensitive deduplication: keeps the first-seen casing.
 */
function caseInsensitiveDedupe(items: string[]): string[] {
  const seen = new Set<string>();
  return items.filter(item => {
    const key = item.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Remove items that appear more than maxRepeat times — carousel/ticker dedup.
 * Identical strings (case-insensitive) beyond the first occurrence are removed.
 * This is handled by caseInsensitiveDedupe; this function is kept explicit for
 * documentation purposes.
 */
function dedupeCarousel(items: string[]): string[] {
  return caseInsensitiveDedupe(items);
}

function isStrategicHeading(h: string): boolean {
  if (!isNonEmpty(h)) return false;
  if (isSuppressed(h)) return false;
  if (h.length < MIN_HEADING_CHARS) return false;
  const wordCount = h.trim().split(/\s+/).filter(Boolean).length;
  return wordCount >= MIN_HEADING_WORDS;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * normalizePageText — Layer 1 entry point.
 *
 * Takes raw scraper output (PageText) and returns a { raw, normalized } pair.
 * The raw field is always the unmodified input.
 * The normalized field separates strategic signals from utility/noise.
 *
 * IMPORTANT: This does NOT modify the raw PageText object.
 * IMPORTANT: This does NOT affect the diff engine — diff.ts has its own filters.
 */
export function normalizePageText(raw: PageText): NormalizedResult {
  // ── 1. Nav links ─────────────────────────────────────────────────────────────
  // Split into strategicNav (product/buyer signals) and utilityLinks.
  const navCandidates = dedupeCarousel(
    (raw.navLinks ?? [])
      .filter(isNonEmpty)
      .filter(s => s.length <= 50)
      .filter(s => !isSuppressed(s)),
  );

  const strategicNav: string[] = [];
  const utilityLinks: string[] = [];

  for (const item of navCandidates) {
    if (isUtility(item)) {
      utilityLinks.push(item);
    } else {
      strategicNav.push(item);
    }
  }

  // ── 2. CTAs ───────────────────────────────────────────────────────────────────
  // primaryCtas = action CTAs (imperative verbs, strategic).
  // Utility CTAs (login, sign in) go to utilityLinks too.
  const ctaCandidates = dedupeCarousel(
    (raw.ctas ?? [])
      .filter(isNonEmpty)
      .filter(s => s.length <= 55)
      .filter(s => !isSuppressed(s)),
  );

  const primaryCtas: string[] = [];

  for (const item of ctaCandidates) {
    if (isUtility(item)) {
      // Avoid double-adding to utilityLinks (nav may have already added it)
      const lc = item.toLowerCase();
      if (!utilityLinks.some(u => u.toLowerCase() === lc)) {
        utilityLinks.push(item);
      }
    } else {
      primaryCtas.push(item);
    }
  }

  // Float action CTAs to the front
  const actionCtas = primaryCtas.filter(s => ACTION_CTA_RE.test(s));
  const otherCtas  = primaryCtas.filter(s => !ACTION_CTA_RE.test(s));
  const sortedCtas = [...actionCtas, ...otherCtas];

  // ── 3. Section headings ───────────────────────────────────────────────────────
  // Apply the same space-split pass as bodyText to catch inline-element concat
  // artifacts (e.g. "revenueacceleration" → "revenue acceleration").
  const h2 = caseInsensitiveDedupe(
    (raw.h2 ?? []).map(s => cleanBodyText(s)).filter(isStrategicHeading),
  );
  const h3 = caseInsensitiveDedupe(
    (raw.h3 ?? []).map(s => cleanBodyText(s)).filter(isStrategicHeading),
  );

  // ── 4. Utility links dedup ─────────────────────────────────────────────────
  const dedupedUtility = caseInsensitiveDedupe(utilityLinks);

  return {
    raw,
    normalized: {
      strategicNav,
      primaryCtas: sortedCtas,
      utilityLinks: dedupedUtility,
      sectionHeadings: { h2, h3 },
      bodyText: cleanBodyText(raw.bodyText ?? ''),
    },
  };
}

/**
 * normalizePageTextPair — convenience wrapper for the from/to diff pair.
 *
 * Returns normalized views for both snapshots in one call.
 * Used by evidence-pack.ts to enrich the EvidencePack.
 */
export function normalizePageTextPair(
  fromText: PageText,
  toText: PageText,
): { from: NormalizedResult; to: NormalizedResult } {
  return {
    from: normalizePageText(fromText),
    to:   normalizePageText(toText),
  };
}
