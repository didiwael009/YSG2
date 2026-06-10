/**
 * consistency-validator.ts — Layer 2: Data Consistency Validator
 *
 * PURPOSE
 * -------
 * The article writer must not invent or contradict the calculated counts that
 * come from the diff engine. This validator reads the ground-truth counts from
 * evidence-pack.json and checks them against the assembled article text.
 *
 * This is a CODE-BASED check, not an LLM judgment. It runs in publish-article.ts
 * BEFORE writing the final .ts file. If validation fails, the publish step stops
 * unless --force is passed.
 *
 * GROUND TRUTH SOURCE
 * -------------------
 * evidence-pack.json  →  diffSummary.{h2Added, h2Removed, ctaAdded, ctaRemoved,
 *                                      navAdded, navRemoved, headlines, metaDescs}
 *
 * CHECKS PERFORMED
 * ----------------
 * 1. H1 match           — article text must quote the correct old/new H1
 * 2. Heading counts     — "N added / M removed" claims must match diff
 * 3. CTA counts         — same
 * 4. Nav counts         — same
 * 5. Company name       — must be consistent (no cross-contamination)
 * 6. Date consistency   — fromLabel / toLabel must appear consistently
 *
 * DESIGN NOTES
 * ------------
 * - Count checks use regex to extract numbers from article prose.
 * - The regex is intentionally broad: it catches "5 section headings added",
 *   "added 5 CTAs", "5 new navigation items", etc.
 * - A mismatch only fires when a claim is found AND it contradicts ground truth.
 *   If the article does not mention a count at all, no error is raised.
 * - H1 checks require an EXACT quote of the old and new H1 in the article.
 *   Missing quotes are a warning, not a hard error (the writer may paraphrase).
 *
 * OUTPUT
 * ------
 * {
 *   valid: boolean,
 *   errors: string[],     // hard failures — block publication unless --force
 *   warnings: string[],   // soft issues — logged but do not block
 * }
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConsistencyResult {
  valid:    boolean;
  errors:   string[];
  warnings: string[];
}

interface EvidencePackSummary {
  diffSummary: {
    h2Added:       string[];
    h2Removed:     string[];
    ctaAdded:      string[];
    ctaRemoved:    string[];
    navAdded:      string[];
    navRemoved:    string[];
    headlines:     Array<{ from: string; to: string }>;
    metaDescs:     Array<{ from: string; to: string }>;
    headlineChanges: number;
    metaDescChanges: number;
  };
  companyName:   string;
  fromLabel:     string;
  toLabel:       string;
}

// ─── Count extractor ──────────────────────────────────────────────────────────
//
// Finds claims like:
//   "12 section headings were added and 2 removed"
//   "added 10 CTAs and removed 10"
//   "8 navigation items added · 8 removed"
//   "5 added / 3 removed"
//   "3 new section headings"
// Returns { added, removed } when both numbers are present.
// Returns null if no claim is found (no error in that case — article may omit counts).

interface CountClaim { added: number; removed: number; excerpt: string }

function extractCountClaim(
  text: string,
  subject: RegExp,
): CountClaim | null {
  // Pattern A: "N <subject> added and M removed"
  const patA = new RegExp(
    `(\\d+)\\s+${subject.source}[^.\\n]{0,60}?added[^.\\n]{0,40}?(\\d+)\\s+removed`,
    'i',
  );
  // Pattern B: "N added \\S+ M removed" (count · count or count / count)
  const patB = new RegExp(
    `(\\d+)\\s+added[\\s·/\\-]+(\\d+)\\s+removed[^.\\n]{0,30}?${subject.source}`,
    'i',
  );
  // Pattern C: "N section headings added"  (with optional "and M removed")
  const patC = new RegExp(
    `(\\d+)\\s+(?:new\\s+)?${subject.source}[^.\\n]{0,30}?added`,
    'i',
  );
  // Pattern D: subject then N added · M removed
  const patD = new RegExp(
    `${subject.source}[^.\\n]{0,30}?(\\d+)\\s+added[^.\\n]{0,20}?(\\d+)\\s+removed`,
    'i',
  );

  for (const pat of [patA, patB, patD]) {
    const m = text.match(pat);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (!isNaN(a) && !isNaN(b)) {
        return { added: a, removed: b, excerpt: m[0].slice(0, 80) };
      }
    }
  }

  // Pattern C gives only added count — only report if removed is also visible nearby
  const mc = text.match(patC);
  if (mc) {
    const a = parseInt(mc[1], 10);
    // Look for a removed count in the same sentence
    const sentenceStart = text.lastIndexOf('\n', text.indexOf(mc[0]));
    const sentenceEnd   = text.indexOf('\n', text.indexOf(mc[0]) + mc[0].length);
    const sentence = text.slice(
      Math.max(0, sentenceStart),
      sentenceEnd === -1 ? text.length : sentenceEnd,
    );
    const removedM = sentence.match(/(\d+)\s+removed/i);
    if (removedM) {
      return { added: a, removed: parseInt(removedM[1], 10), excerpt: mc[0].slice(0, 80) };
    }
  }

  return null;
}

// ─── H1 quote checker ─────────────────────────────────────────────────────────
//
// Looks for the old/new H1 values quoted in the article text.
// Flexible: accepts the value bare, in quotes, or in bold markdown.

function articleQuotesH1(articleText: string, h1: string): boolean {
  if (!h1 || h1.length < 4) return true; // too short to check
  // Escape for regex
  const escaped = h1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'i');
  return re.test(articleText);
}

// ─── Main validator ───────────────────────────────────────────────────────────

export function validateConsistency(opts: {
  writingDir: string;
  slug: string;
}): ConsistencyResult {
  const { writingDir, slug } = opts;
  const errors:   string[] = [];
  const warnings: string[] = [];

  // ── Load ground truth ──────────────────────────────────────────────────────
  const packPath = path.join(writingDir, 'evidence-pack.json');
  if (!fs.existsSync(packPath)) {
    warnings.push('evidence-pack.json not found — count consistency checks skipped');
    return { valid: true, errors, warnings };
  }

  let pack: EvidencePackSummary;
  try {
    pack = JSON.parse(fs.readFileSync(packPath, 'utf-8')) as EvidencePackSummary;
  } catch {
    warnings.push('evidence-pack.json could not be parsed — count consistency checks skipped');
    return { valid: true, errors, warnings };
  }

  // ── Load article text ──────────────────────────────────────────────────────
  const articlePath = path.join(writingDir, 'article-final.md');
  if (!fs.existsSync(articlePath)) {
    warnings.push('article-final.md not found — consistency checks skipped');
    return { valid: true, errors, warnings };
  }

  const articleText = fs.readFileSync(articlePath, 'utf-8');
  const ds = pack.diffSummary;

  // ── Check 1: H1 quotes ────────────────────────────────────────────────────
  // If the diff detected a headline change, both old and new H1 should appear
  // somewhere in the article (they're key evidence). Absence is a soft warning.
  if (ds.headlines && ds.headlines.length > 0) {
    const { from: oldH1, to: newH1 } = ds.headlines[0];
    if (!articleQuotesH1(articleText, oldH1)) {
      warnings.push(
        `H1 quote missing: old H1 "${oldH1.slice(0, 60)}" does not appear in article-final.md. ` +
        'The article should quote the old headline.',
      );
    }
    if (!articleQuotesH1(articleText, newH1)) {
      warnings.push(
        `H1 quote missing: new H1 "${newH1.slice(0, 60)}" does not appear in article-final.md. ` +
        'The article should quote the current headline.',
      );
    }
  }

  // ── Check 2: Section heading counts ──────────────────────────────────────
  const truthH2Added   = ds.h2Added?.length   ?? 0;
  const truthH2Removed = ds.h2Removed?.length ?? 0;

  if (truthH2Added + truthH2Removed > 0) {
    const claim = extractCountClaim(
      articleText,
      /(?:section\s+)?headings?|h2s?/,
    );
    if (claim) {
      if (claim.added !== truthH2Added) {
        errors.push(
          `Section heading count mismatch: article says ${claim.added} added, ` +
          `diff JSON says ${truthH2Added} added. (excerpt: "${claim.excerpt}")`,
        );
      }
      if (claim.removed !== truthH2Removed) {
        errors.push(
          `Section heading count mismatch: article says ${claim.removed} removed, ` +
          `diff JSON says ${truthH2Removed} removed. (excerpt: "${claim.excerpt}")`,
        );
      }
    }
  }

  // ── Check 3: CTA counts ───────────────────────────────────────────────────
  const truthCtaAdded   = ds.ctaAdded?.length   ?? 0;
  const truthCtaRemoved = ds.ctaRemoved?.length ?? 0;

  if (truthCtaAdded + truthCtaRemoved > 0) {
    const claim = extractCountClaim(articleText, /ctas?|(?:call[s]?\s+to\s+action)|buttons?/);
    if (claim) {
      if (claim.added !== truthCtaAdded) {
        errors.push(
          `CTA count mismatch: article says ${claim.added} added, ` +
          `diff JSON says ${truthCtaAdded} added. (excerpt: "${claim.excerpt}")`,
        );
      }
      if (claim.removed !== truthCtaRemoved) {
        errors.push(
          `CTA count mismatch: article says ${claim.removed} removed, ` +
          `diff JSON says ${truthCtaRemoved} removed. (excerpt: "${claim.excerpt}")`,
        );
      }
    }
  }

  // ── Check 4: Navigation counts ────────────────────────────────────────────
  const truthNavAdded   = ds.navAdded?.length   ?? 0;
  const truthNavRemoved = ds.navRemoved?.length ?? 0;

  if (truthNavAdded + truthNavRemoved > 0) {
    const claim = extractCountClaim(
      articleText,
      /nav(?:igation)?\s*(?:items?|links?|labels?)?/,
    );
    if (claim) {
      if (claim.added !== truthNavAdded) {
        errors.push(
          `Navigation count mismatch: article says ${claim.added} added, ` +
          `diff JSON says ${truthNavAdded} added. (excerpt: "${claim.excerpt}")`,
        );
      }
      if (claim.removed !== truthNavRemoved) {
        errors.push(
          `Navigation count mismatch: article says ${claim.removed} removed, ` +
          `diff JSON says ${truthNavRemoved} removed. (excerpt: "${claim.excerpt}")`,
        );
      }
    }
  }

  // ── Check 5: Company name consistency ─────────────────────────────────────
  // The article must refer to the correct company. Check that the company name
  // appears at least once and that no OTHER known teardown company name
  // appears where it shouldn't. (Cross-contamination guard.)
  const knownCompanies = [
    'Hootsuite', 'Shopify', 'Vercel', 'Stripe', 'Intercom', 'Crisp',
  ];
  const expectedCompany = pack.companyName;
  const otherCompanies  = knownCompanies.filter(
    c => c.toLowerCase() !== expectedCompany.toLowerCase(),
  );

  const articleLower = articleText.toLowerCase();
  if (!articleLower.includes(expectedCompany.toLowerCase())) {
    errors.push(
      `Company name "${expectedCompany}" not found in article-final.md. ` +
      'The article may have been written for a different company.',
    );
  }

  for (const other of otherCompanies) {
    // Allow brief mentions (comparisons are OK) — flag only if the count is high
    const count = (articleLower.match(new RegExp(other.toLowerCase(), 'g')) ?? []).length;
    if (count > 3) {
      warnings.push(
        `"${other}" appears ${count} times in ${expectedCompany} article — possible cross-contamination.`,
      );
    }
  }

  // ── Check 6: Date consistency ─────────────────────────────────────────────
  // fromLabel and toLabel should appear in the article (they're in every intro).
  // Missing dates suggest the evidence pack was regenerated but the article wasn't.
  const fromLabel = pack.fromLabel ?? '';
  const toLabel   = pack.toLabel   ?? '';

  if (fromLabel && !articleText.includes(fromLabel)) {
    warnings.push(
      `Period label "${fromLabel}" not found in article-final.md. ` +
      'The article may have been written with a different date range.',
    );
  }
  if (toLabel && !articleText.includes(toLabel)) {
    warnings.push(
      `Period label "${toLabel}" not found in article-final.md. ` +
      'The article may have been written with a different date range.',
    );
  }

  // ── Check 7: H2 template diversity ───────────────────────────────────────
  // Compare the new article's H2 headings (normalised by removing the company
  // name) against every already-published article.  Similarity above 60% is a
  // hard error — at scale this creates a doorway-page footprint for Google.
  const articlesDir = path.resolve(
    __dirname,
    '../../src/content/cro-teardown/articles',
  );
  if (fs.existsSync(articlesDir)) {
    // Extract H2s from the new article
    const h2Re = /^## (.+)$/gm;
    const newH2s: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = h2Re.exec(articleText)) !== null) newH2s.push(m[1].trim());

    if (newH2s.length >= 2) {
      // Normalise: strip company name and lowercase
      const normalise = (h: string, company: string) =>
        h
          .replace(new RegExp(company, 'gi'), 'X')
          .toLowerCase()
          .replace(/[^a-z0-9 ]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

      const normNew = newH2s.map(h => normalise(h, pack.companyName));

      // Read every other published article
      const slugFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.ts'));
      for (const file of slugFiles) {
        const fileSlug = file.replace(/\.ts$/, '');
        if (fileSlug === slug) continue; // skip self

        const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
        // Extract company name from the file (companyName: "...")
        const cnMatch = content.match(/companyName:\s*["']([^"']+)["']/);
        const otherCompany = cnMatch ? cnMatch[1] : fileSlug;

        // Extract H2s from published articleBody markdown
        const bodyMatch = content.match(/articleBody:\s*"([\s\S]*?)(?<!\\)"/);
        if (!bodyMatch) continue;
        const otherBody = bodyMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
        const otherH2Re = /^## (.+)$/gm;
        const otherH2s: string[] = [];
        let om: RegExpExecArray | null;
        while ((om = otherH2Re.exec(otherBody)) !== null) otherH2s.push(om[1].trim());
        if (otherH2s.length < 2) continue;

        const normOther = otherH2s.map(h => normalise(h, otherCompany));

        // Jaccard similarity on normalised heading sets
        const setNew   = new Set(normNew);
        const setOther = new Set(normOther);
        const intersection = [...setNew].filter(h => setOther.has(h)).length;
        const union        = new Set([...normNew, ...normOther]).size;
        const similarity   = intersection / union;

        if (similarity >= 0.60) {
          const conflicts = normNew
            .filter(h => setOther.has(h))
            .map(h => `"${h}"`)
            .join(', ');
          errors.push(
            `H2 template similarity with ${otherCompany} article is ${Math.round(similarity * 100)}% ` +
            `(threshold: 60%). Matching normalised headings: ${conflicts}. ` +
            `Rewrite these headings to be company-specific before publishing.`,
          );
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
