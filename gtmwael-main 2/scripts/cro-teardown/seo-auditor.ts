/**
 * seo-auditor.ts — Phase 4D SEO audit.
 *
 * Evaluates article-final.md and seo.json for:
 *   - SEO title quality
 *   - Meta description quality
 *   - Heading structure (H1, H2 usage)
 *   - Search intent match
 *   - Keyword use (without inventing search volume)
 *   - Readability
 *   - Internal linking / CTA opportunities
 *
 * Writes:
 *   data/cro-teardowns/[slug]/writing/seo-audit.json
 *
 * SECURITY: API key read exclusively from process.env or .env file.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { callLLM } from './llm/anthropic-client.js';
import { CostTracker } from './llm/token-cost.js';
import { withRetry } from './llm/retry.js';
import {
  MODELS,
  MODEL_PRICING,
  SEO_PASS_SCORE,
} from './config/writing-config.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SeoAuditOpts {
  slug: string;
  writingDir: string;
  tracker: CostTracker;
  onLog: (step: string, ok: boolean, detail?: string) => void;
}

export interface SeoAuditResult {
  seoScore: number;
  pass: boolean;
  /** SEO title quality: 0–15 */
  titleScore: number;
  /** Meta description quality: 0–15 */
  metaDescriptionScore: number;
  /** Heading structure (H1, H2 coverage): 0–15 */
  headingStructureScore: number;
  /** Search intent alignment: 0–20 */
  searchIntentScore: number;
  /** Keyword use (primary + secondary): 0–10 */
  keywordUseScore: number;
  /** Readability and scannability: 0–15 */
  readabilityScore: number;
  /** Internal linking / CTA opportunity: 0–10 */
  internalLinkingScore: number;
  internalLinkingSuggestions: string[];
  faqSuggestions: string[];
  contentGapNotes: string[];
  requiredFixes: string[];
  optionalImprovements: string[];
  model: string;
  costUsd: number;
  generatedAt: string;
}

// ─── JSON extractor ───────────────────────────────────────────────────────────

function extractJson(text: string): string | null {
  try { JSON.parse(text.trim()); return text.trim(); } catch { /* probe */ }
  const block = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (block) { try { JSON.parse(block[1].trim()); return block[1].trim(); } catch { /* probe */ } }
  const first = text.indexOf('{');
  const last  = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const c = text.slice(first, last + 1);
    try { JSON.parse(c); return c; } catch { /* probe */ }
  }
  return null;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

function toInt(v: unknown, max: number): number {
  return typeof v === 'number' ? Math.round(Math.max(0, Math.min(max, v))) : 0;
}

function parseSeoResponse(
  raw: string,
  model: string,
  costUsd: number,
): SeoAuditResult {
  const jsonStr = extractJson(raw);
  if (!jsonStr) {
    throw new Error(
      `Could not extract JSON from SEO auditor response.\nFirst 500 chars:\n${raw.slice(0, 500)}`,
    );
  }
  let obj: Record<string, unknown>;
  try {
    obj = JSON.parse(jsonStr) as Record<string, unknown>;
  } catch (err) {
    throw new Error(`SEO audit JSON parse error: ${String(err)}\nInput:\n${jsonStr.slice(0, 500)}`);
  }

  const titleScore           = toInt(obj.titleScore,           15);
  const metaDescriptionScore = toInt(obj.metaDescriptionScore, 15);
  const headingStructureScore = toInt(obj.headingStructureScore, 15);
  const searchIntentScore    = toInt(obj.searchIntentScore,    20);
  const keywordUseScore      = toInt(obj.keywordUseScore,      10);
  const readabilityScore     = toInt(obj.readabilityScore,     15);
  const internalLinkingScore = toInt(obj.internalLinkingScore, 10);

  const seoScore =
    titleScore + metaDescriptionScore + headingStructureScore +
    searchIntentScore + keywordUseScore + readabilityScore + internalLinkingScore;

  return {
    seoScore,
    pass:               seoScore >= SEO_PASS_SCORE,
    titleScore,
    metaDescriptionScore,
    headingStructureScore,
    searchIntentScore,
    keywordUseScore,
    readabilityScore,
    internalLinkingScore,
    internalLinkingSuggestions: asStringArray(obj.internalLinkingSuggestions),
    faqSuggestions:             asStringArray(obj.faqSuggestions),
    contentGapNotes:            asStringArray(obj.contentGapNotes),
    requiredFixes:              asStringArray(obj.requiredFixes),
    optionalImprovements:       asStringArray(obj.optionalImprovements),
    model,
    costUsd,
    generatedAt: new Date().toISOString(),
  };
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SEO_AUDITOR_SYSTEM =
`You are an SEO editor reviewing a CRO teardown article for a SaaS growth marketing blog.
Output ONLY valid JSON. No text before or after the JSON object.

SCORING RUBRIC — score each dimension, then report the individual scores (seoScore is their sum):
• titleScore           (0–15): Is the SEO title compelling, keyword-rich, and under 60 characters?
• metaDescriptionScore (0–15): Is the meta description clear, keyword-anchored, under 155 characters, and click-worthy?
• headingStructureScore (0–15): Does the article have a clear H1, logical H2 hierarchy, and adequate section coverage?
• searchIntentScore    (0–20): Does the article satisfy the primary search intent for someone researching this company's homepage changes?
• keywordUseScore      (0–10): Are the primary and secondary keywords used naturally in the body text?
• readabilityScore     (0–15): Is the article scannable (short paragraphs, no walls of text, bullets where appropriate)?
• internalLinkingScore (0–10): Does the article have opportunities for internal links to related content, and are CTAs positioned well?

HARD RULES:
• Do NOT invent search volume, keyword difficulty, or ranking predictions.
• Do NOT claim any SEO change will "rank" or "drive traffic" as a certainty.
• Suggest improvements only — do not assert outcomes.
• internalLinkingSuggestions should describe where a link could go, not fabricate URLs.
• faqSuggestions should be questions a real searcher might ask — derived from the article content.
• contentGapNotes should identify topics the article could address that are implied by the evidence but not covered.

CALIBRATION:
• 90–100: SEO-ready with minor polish suggestions only.
• 80–89:  Passes with actionable improvements.
• 70–79:  Needs specific fixes before publication.
• Below 70: Structural SEO problems.`;

// ─── Main exported function ───────────────────────────────────────────────────

export async function runSeoAudit(opts: SeoAuditOpts): Promise<SeoAuditResult> {
  const { slug, writingDir, tracker, onLog } = opts;

  const articlePath = path.join(writingDir, 'article-final.md');
  const seoPath     = path.join(writingDir, 'seo.json');
  const outputPath  = path.join(writingDir, 'seo-audit.json');

  if (!fs.existsSync(articlePath)) {
    throw new Error(`article-final.md not found at ${articlePath}`);
  }

  const articleText = fs.readFileSync(articlePath, 'utf-8');
  const seoData = fs.existsSync(seoPath)
    ? JSON.parse(fs.readFileSync(seoPath, 'utf-8')) as Record<string, unknown>
    : {};

  const auditorModel = MODELS.seoAuditor;

  onLog(`SEO auditor [${auditorModel}]`, true, 'calling API…');

  const userPrompt = `Audit the SEO quality of this CRO teardown article for ${slug}.

SEO METADATA (title, meta description, keywords):
${JSON.stringify(seoData, null, 2)}

FULL ARTICLE:
---
${articleText}
---

Score each rubric dimension. The seoScore is the sum of all dimension scores (max 100).

Required JSON shape:
{
  "titleScore": <0–15>,
  "metaDescriptionScore": <0–15>,
  "headingStructureScore": <0–15>,
  "searchIntentScore": <0–20>,
  "keywordUseScore": <0–10>,
  "readabilityScore": <0–15>,
  "internalLinkingScore": <0–10>,
  "internalLinkingSuggestions": ["<where a contextual internal link would help>"],
  "faqSuggestions": ["<question a searcher might ask that this article can answer>"],
  "contentGapNotes": ["<topic implied by the evidence but not addressed in the article>"],
  "requiredFixes": ["<specific fix needed before publication>"],
  "optionalImprovements": ["<nice-to-have improvement>"]
}`;

  const costBefore = tracker.totalCostUsd;

  const resp = await withRetry(
    () => callLLM({
      model:     auditorModel,
      system:    SEO_AUDITOR_SYSTEM,
      messages:  [{ role: 'user', content: userPrompt }],
      maxTokens: 1536,
    }),
    { onRetry: (a, e, d) => onLog(`SEO auditor retry ${a}`, false, `${e.message} (${d}ms)`) },
  );

  const pricing = MODEL_PRICING[auditorModel] ?? MODEL_PRICING['claude-sonnet-4-5']!;
  tracker.add({
    model:         auditorModel,
    role:          'seo-auditor',
    inputTokens:   resp.inputTokens,
    outputTokens:  resp.outputTokens,
    inputCostUsd:  (resp.inputTokens  / 1_000_000) * pricing.inputPerMTok,
    outputCostUsd: (resp.outputTokens / 1_000_000) * pricing.outputPerMTok,
    totalCostUsd:  ((resp.inputTokens / 1_000_000) * pricing.inputPerMTok) +
                   ((resp.outputTokens / 1_000_000) * pricing.outputPerMTok),
    timestamp:     new Date().toISOString(),
  });

  const costUsd = tracker.totalCostUsd - costBefore;
  const result  = parseSeoResponse(resp.content, auditorModel, costUsd);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

  onLog(
    `SEO audit`,
    result.pass,
    `score ${result.seoScore}/100 — ${result.pass ? 'PASS ✓' : 'FAIL'} — $${costUsd.toFixed(4)}`,
  );

  return result;
}
