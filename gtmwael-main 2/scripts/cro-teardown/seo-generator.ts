/**
 * seo-generator.ts
 *
 * Derives seo.json from existing Phase 4A metadata and the generated intro section.
 * No LLM calls — all data is derived deterministically from what already exists.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SeoData {
  title: string;
  metaDescription: string;
  slug: string;
  canonicalPath: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  suggestedExcerpt: string;
  generatedAt: string;
}

export interface SeoGeneratorOpts {
  slug: string;
  writingDir: string;
  sectionsDir: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Trims whitespace and collapses internal newlines for single-line use. */
function oneLine(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

/**
 * Extracts a ≤155-char excerpt from the intro section final.
 * Prefers a full sentence ending with ". " or ".\n".
 */
function extractExcerpt(text: string, maxLen = 155): string {
  const flat = oneLine(text);
  if (flat.length <= maxLen) return flat;

  // Walk backwards from maxLen to find the end of a sentence
  const candidate = flat.slice(0, maxLen);
  const lastDot = candidate.lastIndexOf('. ');
  if (lastDot > 80) return candidate.slice(0, lastDot + 1).trim();
  // Fallback: cut at last space
  const lastSpace = candidate.lastIndexOf(' ');
  return (lastSpace > 60 ? candidate.slice(0, lastSpace) : candidate).trim() + '…';
}

// ─── Generator ────────────────────────────────────────────────────────────────

export function generateSeo(opts: SeoGeneratorOpts): SeoData {
  const { slug, writingDir, sectionsDir } = opts;

  // ── Load Phase 4A metadata ─────────────────────────────────────────────────
  const gdPath = path.join(writingDir, 'generated-article-data.json');
  if (!fs.existsSync(gdPath)) {
    throw new Error(
      `generated-article-data.json not found at ${gdPath}\n` +
      `Run Phase 4A before generating SEO data.`,
    );
  }

  const gd = JSON.parse(fs.readFileSync(gdPath, 'utf-8')) as {
    title: string;
    description: string;
    companyName: string;
    fromLabel: string;
    toLabel: string;
    h1: string;
    [key: string]: unknown;
  };

  const companyName = gd.companyName ?? slug;

  // ── Title ──────────────────────────────────────────────────────────────────
  const title = gd.title ?? `${companyName} Homepage CRO Teardown`;

  // ── Meta description (≤160 chars) ─────────────────────────────────────────
  // Use the article description if it fits, otherwise truncate.
  const rawDesc = gd.description ?? `A CRO teardown of ${companyName}'s homepage evolution from ${gd.fromLabel} to ${gd.toLabel}.`;
  const metaDescription = rawDesc.length <= 160 ? rawDesc : extractExcerpt(rawDesc, 160);

  // ── Suggested excerpt from intro section ───────────────────────────────────
  const introPath = path.join(sectionsDir, '01-intro.final.md');
  let suggestedExcerpt = metaDescription; // fallback
  if (fs.existsSync(introPath)) {
    const introText = fs.readFileSync(introPath, 'utf-8');
    const firstPara = introText.trim().split(/\n\n/)[0] ?? '';
    if (firstPara.length > 40) {
      suggestedExcerpt = extractExcerpt(firstPara, 155);
    }
  }

  // ── Keywords ───────────────────────────────────────────────────────────────
  const companyLower  = companyName.toLowerCase();
  const primaryKeyword = `${companyName} homepage CRO teardown`;

  const secondaryKeywords = [
    `${companyName} homepage redesign`,
    `${companyName} landing page analysis`,
    `${companyName} messaging evolution`,
    `SaaS homepage CRO teardown`,
    `homepage A/B test analysis`,
    `SaaS conversion optimisation case study`,
  ].filter(kw => kw.toLowerCase() !== primaryKeyword.toLowerCase());

  // ── Canonical path ─────────────────────────────────────────────────────────
  const canonicalPath = `/cro-teardowns/${companyLower !== slug ? slug : companyLower}`;

  const seoData: SeoData = {
    title,
    metaDescription,
    slug,
    canonicalPath,
    primaryKeyword,
    secondaryKeywords,
    suggestedExcerpt,
    generatedAt: new Date().toISOString(),
  };

  // ── Write output ───────────────────────────────────────────────────────────
  const outputPath = path.join(writingDir, 'seo.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(seoData, null, 2), 'utf-8');

  return seoData;
}
