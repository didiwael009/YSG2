/**
 * section-writer.ts — shared core for the writer → critic → rewriter loop.
 *
 * Imported by:
 *   compose-section.ts     (single-section Phase 4B CLI)
 *   compose-all-sections.ts (Phase 4C orchestrator)
 *
 * Nothing in here reads process.argv or calls process.exit.
 * All I/O for run logs and cost reports is handled by the caller.
 *
 * SECURITY: API key is never handled here — anthropic-client.ts reads it
 *           exclusively from process.env.ANTHROPIC_API_KEY or .env file.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { callLLM } from './llm/anthropic-client.js';
import { getModel } from './llm/model-router.js';
import { CostTracker, computeCallCost, estimateTokens } from './llm/token-cost.js';
import { parseCriticResponse, type CriticResult } from './llm/json-guard.js';
import { withRetry } from './llm/retry.js';
import { CRITIC_PASS_SCORE, SECTION_EVIDENCE_SOURCES } from './config/writing-config.js';

// ─── Section catalogue ────────────────────────────────────────────────────────

export interface SectionMeta {
  title: string;
  goalDescription: string;
  writerInstruction: string;
  wordRange: { min: number; max: number };
  /**
   * Section-specific phrases the writer and rewriter must never use.
   * Injected into both prompts when present.
   */
  forbiddenPhrases?: string[];
}

/** Canonical run order for Phase 4C compose-all-sections. */
export const SECTION_ORDER: readonly string[] = [
  '01-intro',
  '02-at-a-glance',
  '03-visual-timeline',
  '04-messaging-evolution',
  '05-cta-navigation-evolution',
  '06-lessons-for-saas-teams',
] as const;

/** H2 heading to prepend in the assembled article. null = no heading (intro). */
export const SECTION_HEADINGS: Record<string, string | null> = {
  '01-intro':                    null,
  '02-at-a-glance':              '## At a Glance',
  '03-visual-timeline':          '## Visual Timeline',
  '04-messaging-evolution':      '## Messaging Evolution',
  '05-cta-navigation-evolution': '## CTA and Navigation Evolution',
  '06-lessons-for-saas-teams':   '## Lessons for SaaS Teams',
};

export const SECTION_META: Record<string, SectionMeta> = {
  // ── Phase 4C canonical ────────────────────────────────────────────────────
  '01-intro': {
    title: 'Introduction',
    goalDescription:
      'Opens the article, introduces the company and period, previews the major changes, and gives the reader a clear reason to continue.',
    writerInstruction:
`THIS SECTION'S JOB: Orient the reader. Name the company, the period, the scale of change, and the single clearest repositioning signal. Lead into what the rest of the article covers.
THIS SECTION DOES NOT: analyse messaging, explain CTA mechanics, or state lessons — those belong in later sections.

Write 2 paragraphs. Cover: which company, the period, and the major observable changes detected (headline rewrite, navigation restructuring, section additions). End with a sentence that sets up what the rest of the article investigates. Keep each paragraph under 90 words.`,
    wordRange: { min: 150, max: 220 },
  },
  '02-at-a-glance': {
    title: 'At a Glance',
    goalDescription:
      'Quick-reference narrative contextualising the summary-card numbers for a reader who is scanning the article.',
    writerInstruction:
`THIS SECTION'S JOB: Give the reader a fast orientation to the three most observable changes. Names elements, dates, and magnitudes. Cautious language only.
THIS SECTION DOES NOT: explain what the changes mean for buyers, analyse messaging strategy, or draw lessons — those belong in sections 03–06.

Write using this exact structure — do not deviate:

OPENING SENTENCE (mandatory):
Name the company, state the date range, and name the single most significant observed change.
Example pattern: "[Company]'s homepage changed most visibly between [from] and [to] in its [element], [element], and [element]."

BODY (3 bullet points maximum — use markdown "- "):
Each bullet must:
  • Reference one specific observed fact from the evidence
  • Name the exact page element it describes — H1, CTA text, meta description, nav item, H2 heading, or snapshot date
  • Not interpret intent, strategy, or outcome
  • Stay under 40 words

CLOSING SENTENCE (mandatory):
One cautious synthesis sentence. Maximum 25 words.
Allowed openers: "Taken together, the visible changes suggest…" / "These observed shifts can be read as…" / "Collectively, the evidence shows…"

Total length: 110–160 words. Do not exceed 160 words.`,
    wordRange: { min: 110, max: 160 },
    forbiddenPhrases: [
      'iterative testing',
      'conversion lift',
      'improved performance',
      'strategic overhaul',
      'growth strategy',
      'internal strategy',
      'this shows',
      'this proves',
      'this improved',
      'this strategy',
    ],
  },
  '03-visual-timeline': {
    title: 'Visual Timeline',
    goalDescription:
      'Narrative walkthrough of what changed across the visual snapshots — structural, visual, and textual shifts at each stage — with analysis of what each change implies for first-screen conversion clarity and buyer comprehension.',
    writerInstruction:
`THIS SECTION'S JOB: Walk through what changed visually and structurally across the snapshots. For each change, state one conversion implication. One paragraph per snapshot era.
THIS SECTION DOES NOT: explain headline wording in depth (that is messaging evolution), draw final lessons (that is section 06), or repeat the self-serve→enterprise conclusion — state it once here if relevant, then do not repeat it in other sections.

Write 3 paragraphs — one per major snapshot era. Each paragraph:
  • Names the snapshot date and quotes specific headline or section-heading text from the evidence
  • States how the visual hierarchy changed — what the page asks the visitor to notice first
  • States one conversion implication (first-screen clarity, buyer type fit, or CTA discoverability)
  • Stays under 90 words

Use cautious language: "can be read as", "may suggest", "appears to".
Do not claim changes caused any outcome.`,
    wordRange: { min: 190, max: 280 },
  },
  '04-messaging-evolution': {
    title: 'Messaging Evolution',
    goalDescription:
      'Analysis of how the headline, meta description, and core copy shifted — including who the old vs new message likely served, what objections the new message may address, and what proof burden it creates.',
    writerInstruction:
`THIS SECTION'S JOB: Analyse the headline and meta description changes — who each message served, what proof burden the new message creates. This is where the self-serve→enterprise analysis belongs if applicable. State it once and completely here.
THIS SECTION DOES NOT: describe visual layout (that is section 03), explain CTAs (that is section 05), or repeat the proof-burden conclusion in multiple paragraphs — say it once.

Write 3 paragraphs. Each paragraph under 90 words. Quote actual before/after text from the evidence.

Paragraph 1 — the headline shift: quote the old and new headline. State who the old message likely served vs who the new message likely serves.
Paragraph 2 — the meta description shift: quote it. State what changed about urgency, category framing, or call-to-action intent.
Paragraph 3 — the proof burden: what must the page now demonstrate to make the new headline credible? One SaaS founder takeaway as the final sentence.

Do not claim changes caused growth or conversion improvements.
Use cautious language: "can be read as", "may suggest", "likely served", "appears to".`,
    wordRange: { min: 210, max: 300 },
    forbiddenPhrases: [
      'this increased conversions',
      'this drove growth',
      'Stripe decided',
      'Hootsuite decided',
      'their strategy was',
      'A/B tested',
      'this proved',
      'this improved performance',
    ],
  },
  '05-cta-navigation-evolution': {
    title: 'CTA and Navigation Evolution',
    goalDescription:
      'Analysis of which calls-to-action and navigation items were added and removed — including what funnel motion they signal, whether CTA friction increased or decreased, and what trust the page must build before each ask.',
    writerInstruction:
`THIS SECTION'S JOB: Analyse the CTA set and navigation taxonomy changes. State the CTA friction direction once. State one navigation insight once. One SaaS founder takeaway at the end.
THIS SECTION DOES NOT: repeat the self-serve→enterprise conclusion (stated in messaging), restate proof burden (stated in messaging), or draw broad lessons (that is section 06).

Write 3 paragraphs. Each paragraph under 90 words. Quote actual CTA text and navigation labels from the evidence.

Paragraph 1 — CTA evolution: what CTAs were added or removed. Does this suggest a self-serve, sales-led, or bifurcated funnel? Did friction increase or decrease?
Paragraph 2 — Navigation evolution: what labels were added or removed. Does the new structure help buyers self-segment, or does it add cognitive load?
Paragraph 3 — one SaaS founder takeaway about CTA architecture or navigation structure, tied to the specific evidence above.

Use cautious interpretive language throughout. Do not claim changes drove conversion.`,
    wordRange: { min: 190, max: 270 },
  },
  '06-lessons-for-saas-teams': {
    title: 'Lessons for SaaS Teams',
    goalDescription:
      'Three to four practical lessons SaaS founders can study from this homepage evolution — each converting analysis from earlier sections into an actionable observation with a when-not-to-copy condition.',
    writerInstruction:
`THIS SECTION'S JOB: Convert the analysis from sections 03–05 into practical observations. Each lesson must add something new — not restate what messaging, visual timeline, or CTA sections already said.
THIS SECTION DOES NOT: re-explain the self-serve→enterprise shift (already stated in section 04), restate the proof burden (already stated in section 04), or redescribe visual changes (already stated in section 03). If a paragraph restates an earlier section's conclusion, delete it.

Write 3 lessons — one focused paragraph per lesson, each under 90 words.

Each lesson MUST include ALL FOUR of the following in compressed form:
  (1) PATTERN — the specific pattern, named and tied to this company's evidence (one sentence)
  (2) CRO MECHANISM — what it costs or gains in visitor attention, trust, or action (one sentence)
  (3) FIX — a concrete alternative a SaaS founder can apply (one sentence)
  (4) WHEN NOT TO COPY — the condition under which copying this change would backfire (one sentence)

Use cautious language. Do not claim lessons prove conversion improved.`,
    wordRange: { min: 260, max: 390 },
  },
  // ── Phase 4B legacy IDs (kept for compose-section.ts backward compat) ────
  '02-timeline': {
    title: 'Visual Timeline',
    goalDescription: 'Contextualises the snapshot count and spacing.',
    writerInstruction: 'Write 1–2 paragraphs on the timeline context. No headings.',
    wordRange: { min: 80, max: 180 },
  },
  '03-analysis': {
    title: 'Screenshot Analysis',
    goalDescription: 'Walks through key visual changes in narrative form.',
    writerInstruction: 'Write 3–4 paragraphs on the visual and structural changes. No headings.',
    wordRange: { min: 250, max: 450 },
  },
  '04-messaging': {
    title: 'Messaging Evolution',
    goalDescription: 'Analyses how the headline, meta, and copy shifted.',
    writerInstruction: 'Write 2–3 paragraphs. Quote before/after text. No headings.',
    wordRange: { min: 200, max: 380 },
  },
  '05-headings': {
    title: 'Section Heading Changes',
    goalDescription: 'Analyses what H2 additions and removals signal.',
    writerInstruction: 'Write 2–3 paragraphs on H2 changes. Cautious language. No headings.',
    wordRange: { min: 180, max: 320 },
  },
  '06-cta': {
    title: 'CTA Evolution',
    goalDescription: 'Analyses CTA additions and removals.',
    writerInstruction: 'Write 2–3 paragraphs. Quote actual CTA text. No headings.',
    wordRange: { min: 180, max: 320 },
  },
  '07-lessons': {
    title: 'What SaaS Teams Can Study',
    goalDescription: 'Draws observable patterns SaaS teams can study.',
    writerInstruction: 'One paragraph per lesson card. Cautious language. No headings.',
    wordRange: { min: 280, max: 500 },
  },
};

export function getSectionMeta(sectionId: string): SectionMeta {
  return (
    SECTION_META[sectionId] ?? {
      title: sectionId,
      goalDescription: 'Article section.',
      writerInstruction: 'Write the section using only the evidence provided.',
      wordRange: { min: 150, max: 400 },
    }
  );
}

// ─── Evidence builder ─────────────────────────────────────────────────────────

interface GeneratedArticleData {
  companyName: string;
  companyUrl: string;
  title: string;
  h1: string;
  description: string;
  fromLabel: string;
  toLabel: string;
  snapshots: unknown[];
  [key: string]: unknown;
}

interface ArticleBlueprint {
  dataQuality?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Builds (or loads from cache) the section-evidence JSON that the writer receives.
 * Saved to section-evidence/[sectionId].evidence.json so it can be inspected.
 */
export function buildAndCacheSectionEvidence(
  sectionId: string,
  writingDir: string,
): Record<string, unknown> {
  const sectionEvidenceDir = path.join(writingDir, 'section-evidence');
  const cachePath = path.join(sectionEvidenceDir, `${sectionId}.evidence.json`);

  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, 'utf-8')) as Record<string, unknown>;
  }

  const gdPath = path.join(writingDir, 'generated-article-data.json');
  if (!fs.existsSync(gdPath)) {
    throw new Error(
      `generated-article-data.json not found at ${gdPath}\n` +
      `Run Phase 4A first: npm run cro-teardown:generate-data -- --name <Company> --slug <slug>`,
    );
  }
  const gd = JSON.parse(fs.readFileSync(gdPath, 'utf-8')) as GeneratedArticleData;

  const bpPath = path.join(writingDir, 'article-blueprint.json');
  const bp = fs.existsSync(bpPath)
    ? (JSON.parse(fs.readFileSync(bpPath, 'utf-8')) as ArticleBlueprint)
    : {};

  const evidence: Record<string, unknown> = {
    sectionId,
    companyName: gd.companyName,
    companyUrl: gd.companyUrl,
    articleTitle: gd.title,
    h1: gd.h1,
    fromLabel: gd.fromLabel,
    toLabel: gd.toLabel,
    snapshotCount: (gd.snapshots as unknown[]).length,
    dataQuality: bp.dataQuality ?? null,
  };

  const sources = SECTION_EVIDENCE_SOURCES[sectionId] ?? [];
  for (const source of sources) {
    const srcPath = path.join(sectionEvidenceDir, `${source}.json`);
    if (fs.existsSync(srcPath)) {
      evidence[source] = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
    } else {
      console.log(`  ⚠ Evidence source not found: ${source}.json (section: ${sectionId})`);
    }
  }

  fs.mkdirSync(sectionEvidenceDir, { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(evidence, null, 2), 'utf-8');
  return evidence;
}

// ─── Prompt builders ──────────────────────────────────────────────────────────

export const WRITER_SYSTEM =
`You are a factual, evidence-driven SaaS CRO analyst writing one section of a teardown article about a SaaS company's homepage evolution. Your writing voice is Wael Aouididi: direct, practical, SaaS-specific, CRO-aware, GTM-aware — no fake certainty, no invented metrics, no generic marketing filler.

HARD RULES — inviolable:
1. Use ONLY the evidence in the user message. Do not add facts, metrics, or claims not present in the evidence.
2. Do NOT claim any change improved conversion, increased revenue, caused growth, or produced any measurable outcome.
3. Do NOT claim to know the company's internal strategy or intent.
4. Separate observed facts from interpretation. When interpreting, use:
   "can be read as" / "may suggest" / "is consistent with" / "observed" / "may reflect" /
   "appears to" / "from visible evidence" / "likely" / "the page seems to".
5. Keep paragraphs short: 2–4 sentences each.
6. Write only the section body. No markdown headers.
7. No generic filler ("in today's competitive landscape", "increasingly important", etc.) unless tied directly to evidence.
8. Quote actual text from the evidence when relevant.

CRO/GTM DEPTH LAYER — REQUIRED for all analytical sections:
Every analytical paragraph must include at least THREE of these six depth dimensions:

  (A) OBSERVED CHANGE    — what specifically changed; quote exact text or name the element
  (B) CONVERSION IMPLICATION — what this may mean for visitor action, attention, or drop-off
  (C) BUYER PSYCHOLOGY   — what mental state, decision stage, or buyer type this targets
  (D) TRUST/PROOF IMPLICATION — what trust gap this may close or what proof burden it creates
  (E) CTA/FUNNEL IMPLICATION — whether this affects the conversion path, funnel motion, or sales cycle
  (F) SAAS FOUNDER TAKEAWAY — one observation a SaaS founder can study for their own page

ANTI-GENERIC RULE — mandatory:
If a paragraph could appear word-for-word in a teardown of a DIFFERENT company, it is not acceptable.
Every analytical paragraph must be anchored to this specific company's observable evidence.

EVIDENCE-SAFETY RULES — inviolable:
Never write: "this increased conversions" / "Hootsuite did this because" / "Stripe decided to" /
"A/B tested" / "this drove revenue" / "based on their strategy" / "this improved performance".
Always write: "can be read as" / "may suggest" / "appears to" / "from visible evidence" / "likely" / "is consistent with".

EDITORIAL COMPRESSION — mandatory:
Each section has ONE job. Do not re-explain a conclusion another section already made.
These conclusions may appear only ONCE across the entire article:
  • casual→formal framing / outcome language→capability language → state once (in messaging or visual timeline, not both)
  • self-serve vs enterprise buyer shift → state once (in messaging OR lessons, not in every section)
  • proof burden created by new messaging → state once (in messaging)
  • CTA friction increase or decrease → state once (in the CTA section)
  • upmarket repositioning signal → state once

Compression rules:
  • Paragraphs must stay under 90 words. One idea per paragraph. If two ideas fit in one paragraph, that is two paragraphs that need to be cut.
  • If a sentence restates what the previous sentence implied, delete it.
  • If you find yourself writing "as mentioned above" or "as noted earlier" — that is a repetition. Delete the paragraph.
  • Do not write a transitional paragraph that summarises what you just said. End the section, not your summary of it.

EXAMPLES — the difference between shallow and deep CRO writing:

BAD (surface description — fails the depth test):
"The homepage became more enterprise-focused."

BETTER (buyer psychology + conversion implication):
"The old headline reduces cognitive load for a self-serve user: it promises a simple outcome in
plain language. The new headline asks the visitor to believe a larger platform claim. That framing
can work for bigger buyers, but only if the page quickly backs it with proof, use cases, and a CTA
path that matches a longer sales cycle."

BAD (surface observation — fails the funnel test):
"Navigation changed from actions to product categories."

BETTER (buyer psychology + CTA/funnel implication):
"Action-based navigation labels help users who know the task they came to complete. Category-based
labels help buying committees compare platform capabilities. The CRO tradeoff is clarity versus
qualification: the page may become more credible to enterprise buyers while feeling heavier for
self-serve users who arrived looking for a specific workflow."`;


// Critic system prompt — threshold is stated in the user prompt so this stays cacheable.
const CRITIC_SYSTEM =
`You are a strict editorial critic for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.

SCORING RUBRIC — score each dimension separately, then sum to 100:
• evidenceAccuracy  (max 25): Every claim traces to the provided evidence. No invented stats.
  PENALISE -5 per phrase that implies a fact not present in the evidence.
• clarity           (max 10): Clear sentences, purposeful, no padding.
  PENALISE -3 per filler sentence with no evidence anchor; -2 per redundant or padded phrase.
• specificity       (max 15): Tied to THIS company's evidence — not generic SaaS commentary.
  PENALISE -5 per paragraph that could apply word-for-word to a different company's teardown.
  HARD WARNING: If this section could apply to any generic website without changing a word, specificity is capped at 5.
• seoUsefulness     (max 10): Useful for a reader searching CRO teardowns.
  PENALISE -3 if no company-specific proper noun appears in the first 40 words.
• croUsefulness     (max 10): Actionable, observable signal — not vague pattern-naming.
  PENALISE -4 per lesson or observation not traceable to a specific evidence item.
• riskControl       (max 10): Interpretations labelled. No causation claims. No conversion-lift claims.
  PENALISE -3 per unlabelled interpretation; -10 per causation claim.
• analysisDepth     (max 10): Section goes beyond surface description — includes conversion implication,
  buyer psychology, trust/proof analysis, or SaaS founder takeaway.
  PENALISE -5 if the section is purely descriptive (no conversion implication, no buyer psychology, no trust analysis).
  PENALISE -3 if the section is generic — observations that could apply to any SaaS homepage.
  PENALISE -3 if no founder takeaway or actionable observation for a SaaS team is present.
  PENALISE -3 if a messaging change is described but no buyer audience is identified.
  HARD CAP: If this section could apply to any generic website without changing a word, analysisDepth is capped at 5.
• editorialQuality  (max 10): Section respects its stated role. Does not repeat conclusions from other sections.
  Each paragraph has one idea. No paragraph exceeds 90 words. No transitional padding.
  PENALISE -4 if the section repeats a conclusion that belongs in a different section (self-serve→enterprise shift,
  proof burden, CTA friction — each may appear only once across the article).
  PENALISE -3 per paragraph that restates the previous paragraph's conclusion in different wording.
  PENALISE -2 per paragraph that exceeds 90 words without a distinct second idea justifying the length.
  PENALISE -3 if a closing paragraph summarises what the section just said instead of ending it.

HARD CAPS — apply before summing:
• Any unsupported factual claim → cap total at 70
• Any conversion improvement claim without data → cap total at 60
• More than one generic filler phrase (no evidence anchor) → cap total at 75
• Section is purely descriptive with no CRO/GTM analysis → cap total at 72
• "can be read as" or equivalent appearing more than twice in the same section → cap total at 85
• Section word count exceeds 310 words → cap editorialQuality at 5

CALIBRATION — this is mandatory, not optional:
• 90–100: Publication-ready. Issues, requiredFixes, and riskFlags must all be genuinely empty.
  Reserve this band for drafts with real CRO depth, buyer psychology, AND evidence accuracy AND editorial compression.
  Do NOT award 90+ for accurate-but-shallow or accurate-but-repetitive description.
• 80–89: Passes threshold. Has fixable issues. requiredFixes must contain at least 1 entry.
• 70–79: Needs a rewrite. requiredFixes must contain at least 2 entries.
• Below 70: Significant problems. A hard cap was triggered or the analysis is mostly descriptive or repetitive.

VARIANCE RULE: Sections differ in purpose, length, and evidence density. Scores MUST reflect
those differences. If you assign the same score to multiple sections, re-read each one and
justify the equality explicitly — otherwise vary the score.

requiredFixes must never be empty if score < 90.
rewriteInstruction must never be empty if score < 90.`;

export function buildWriterPrompt(
  sectionId: string,
  evidence: Record<string, unknown>,
): string {
  const meta = getSectionMeta(sectionId);
  const forbiddenBlock =
    meta.forbiddenPhrases && meta.forbiddenPhrases.length > 0
      ? `\nFORBIDDEN PHRASES — never use any of these, not even partially:\n${meta.forbiddenPhrases.map(p => `  • "${p}"`).join('\n')}`
      : '';

  return `Write the ${meta.title} section for a CRO teardown article about ${String(evidence.companyName ?? 'the company')}.

SECTION GOAL: ${meta.goalDescription}
WRITER INSTRUCTION:
${meta.writerInstruction}
TARGET LENGTH: ${meta.wordRange.min}–${meta.wordRange.max} words${forbiddenBlock}

CONTEXT:
- Company: ${String(evidence.companyName ?? '')} (${String(evidence.companyUrl ?? '')})
- Period: ${String(evidence.fromLabel ?? '')} → ${String(evidence.toLabel ?? '')}
- Snapshots compared: ${String(evidence.snapshotCount ?? '?')}

SECTION EVIDENCE (use only this — do not invent anything):
${JSON.stringify(evidence, null, 2)}

Write the section body now. No heading. No title. Start directly with the first sentence.`;
}

export function buildCriticPrompt(
  sectionId: string,
  evidence: Record<string, unknown>,
  draft: string,
  minScore: number,
): string {
  const meta = getSectionMeta(sectionId);
  return `Score and diagnose this ${meta.title} section draft.

SECTION ID: ${sectionId}
PASS THRESHOLD: ${minScore}

SECTION GOAL (evaluate whether the draft achieves this):
${meta.goalDescription}

REQUIRED CHECKS — answer each before scoring:
1. Does every paragraph contain at least one piece of company-specific evidence (a quoted phrase, a dated change, a named page element)?
2. Does the section achieve the stated SECTION GOAL above?
3. Are there any sentences that could appear word-for-word in a teardown of a different company?
4. Does "can be read as" or equivalent hedging phrase appear more than twice in the section?
5. Is the hedging language meaningful (covering a real interpretive gap) or mechanical (a verbal tic)?
6. Does every observation that sounds like a lesson or conclusion trace back to a specific item in the SECTION EVIDENCE?
7. Does the section include at least one CONVERSION IMPLICATION (what a change may mean for visitor action or drop-off)?
8. Does the section include BUYER PSYCHOLOGY (who the change targets, what decision stage or mental state)?
9. For messaging sections: is a buyer audience identified (who the old vs new message likely served)?
10. Does the section include a practical SAAS FOUNDER TAKEAWAY — something a SaaS founder can study?
11. Is any analytical paragraph purely descriptive, with no conversion or psychology implication?
12. EDITORIAL COMPRESSION: Does any paragraph exceed 90 words? State approximate word count and whether the extra length introduces a distinct second idea.
13. REPETITION CHECK: Does the section state a conclusion that belongs in a different section? Check: self-serve→enterprise shift (belongs in messaging/04), proof burden (belongs in messaging/04), CTA friction direction (belongs in CTA/05). One flag per violation.
14. WORD COUNT: Approximate word count. Is it within the target range?

SECTION EVIDENCE (ground truth):
${JSON.stringify(evidence, null, 2)}

SECTION DRAFT:
---
${draft}
---

Score each rubric dimension separately, apply hard caps if triggered, then sum.
requiredFixes must contain at least 1 entry if score < 90.
rewriteInstruction must be populated if score < 90.

Output the JSON object now. Required shape:
{
  "score": <integer 0–100>,
  "pass": <true if score >= ${minScore}>,
  "issues": ["<specific problem with the draft>"],
  "requiredFixes": ["<specific, actionable fix — must have ≥1 entry if score < 90>"],
  "riskFlags": ["<claim that is unsupported or too causal>"],
  "seoNotes": ["<SEO observation, positive or negative>"],
  "analysisDepthWarnings": ["<paragraph that is purely descriptive or missing buyer psychology / conversion implication>"],
  "repetitionWarnings": ["<conclusion that appears more than once (self-serve→enterprise, proof burden, CTA friction)>"],
  "wordCountWarning": "<empty string if within range, else 'OVER: ~N words (max M)' or 'UNDER: ~N words (min M)'>",
  "rewriteInstruction": "<one-paragraph instruction for the rewriter — empty string only if score >= 90>",
  "dimensionScores": {
    "evidenceAccuracy": <0–25>,
    "clarity": <0–10>,
    "specificity": <0–15>,
    "seoUsefulness": <0–10>,
    "croUsefulness": <0–10>,
    "riskControl": <0–10>,
    "analysisDepth": <0–10>,
    "editorialQuality": <0–10>
  }
}`;
}

export function buildRewriterPrompt(
  sectionId: string,
  evidence: Record<string, unknown>,
  currentDraft: string,
  criticResult: CriticResult,
  minScore: number,
): string {
  const meta = getSectionMeta(sectionId);
  const fixList = criticResult.requiredFixes.length > 0
    ? criticResult.requiredFixes.map(f => `  • ${f}`).join('\n')
    : '  (none listed — improve per the rewrite instruction below)';
  const issueList = criticResult.issues.length > 0
    ? criticResult.issues.map(i => `  • ${i}`).join('\n')
    : '  (none listed)';
  const riskList = criticResult.riskFlags.length > 0
    ? criticResult.riskFlags.map(r => `  ⚠ ${r}`).join('\n')
    : '  (none listed)';

  const forbiddenBlock =
    meta.forbiddenPhrases && meta.forbiddenPhrases.length > 0
      ? `\nFORBIDDEN PHRASES — remove any occurrence of these from the rewrite:\n${meta.forbiddenPhrases.map(p => `  • "${p}"`).join('\n')}`
      : '';

  // When the critic flagged structural problems (missing company name, list-like prose,
  // unsupported interpretation), a cosmetic polish will not fix the score.
  // Detect this by checking for 3+ required fixes or a score below 80.
  const needsStructuralRewrite =
    criticResult.requiredFixes.length >= 3 || criticResult.score < 80;
  const structuralDirective = needsStructuralRewrite
    ? `\n⚠ STRUCTURAL REWRITE REQUIRED — do NOT polish the current draft.
Write a fresh version that follows the WRITER INSTRUCTION exactly.
The current draft failed because of structural problems (missing company name, list-like prose,
or unsupported interpretation) that cannot be fixed by editing the existing text.
Treat the CURRENT DRAFT as a reference only — do not preserve its sentence structure.\n`
    : '';

  return `Rewrite the ${meta.title} section to fix specific editorial issues.

SECTION ID: ${sectionId}
CRITIC SCORE: ${criticResult.score}/100 (needs ≥ ${minScore} to pass)
${structuralDirective}
WRITER INSTRUCTION (follow this structure when doing a structural rewrite):
${meta.writerInstruction}
TARGET LENGTH: ${meta.wordRange.min}–${meta.wordRange.max} words${forbiddenBlock}

REQUIRED FIXES:
${fixList}

ISSUES FOUND:
${issueList}

RISK FLAGS (unsupported or too causal):
${riskList}

REWRITE INSTRUCTION:
${criticResult.rewriteInstruction || 'Improve clarity and specificity per the issues listed.'}

CURRENT DRAFT:
---
${currentDraft}
---

SECTION EVIDENCE (do not add any fact not present here):
${JSON.stringify(evidence, null, 2)}

RULES:
1. Fix every REQUIRED FIX.
2. Resolve every RISK FLAG (soften or remove the flagged claim).
3. Do not add any fact not present in the SECTION EVIDENCE.
4. Maintain cautious language: "can be read as", "may suggest", "observed".
5. Never claim a change improved conversion, drove growth, or caused a measurable result.
6. Return only the rewritten section body. No heading. No explanation.

Rewrite now.`;
}

// ─── Internal file helpers ────────────────────────────────────────────────────

function saveText(filePath: string, text: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text, 'utf-8');
}

function saveJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Core loop ────────────────────────────────────────────────────────────────

export interface WriteSectionResult {
  sectionId: string;
  finalVersion: number;
  /** null when draftOnly — no critic was called. */
  finalScore: number | null;
  passed: boolean;
  loopsUsed: number;
  riskFlags: string[];
  remainingIssues: string[];
  finalContent: string;
  /** Cost of only this section's API calls (delta on the shared tracker). */
  sectionCostUsd: number;
}

export interface WriteSectionOpts {
  sectionId: string;
  writingDir: string;
  sectionsDir: string;
  maxRewriteLoops: number;
  /** Pass-score threshold. Defaults to CRITIC_PASS_SCORE (85). */
  minScore?: number;
  /** Skip critic and rewriter — write v1 only and save as final. */
  draftOnly?: boolean;
  tracker: CostTracker;
  /** Called for each step so the caller controls console output and run-log. */
  onLog: (step: string, ok: boolean, detail?: string) => void;
}

export async function writeSectionLoop(
  opts: WriteSectionOpts,
): Promise<WriteSectionResult> {
  const { sectionId, writingDir, sectionsDir, maxRewriteLoops, tracker, onLog } = opts;
  const minScore = opts.minScore ?? CRITIC_PASS_SCORE;
  const draftOnly = opts.draftOnly ?? false;
  const costBefore = tracker.totalCostUsd;

  // ── Evidence ────────────────────────────────────────────────────────────────
  const evidence = buildAndCacheSectionEvidence(sectionId, writingDir);
  onLog('Evidence', true, `${sectionId}.evidence.json`);

  const writerModel   = getModel('writer');
  const criticModel   = getModel('critic');
  const rewriterModel = getModel('rewriter');

  // ── Writer ──────────────────────────────────────────────────────────────────
  onLog(`Writer [${writerModel}]`, true, 'calling API…');
  const writerResp = await withRetry(
    () => callLLM({
      model: writerModel,
      system: WRITER_SYSTEM,
      messages: [{ role: 'user', content: buildWriterPrompt(sectionId, evidence) }],
      maxTokens: 2048,
    }),
    { onRetry: (a, e, d) => onLog(`Writer retry ${a}`, false, `${e.message} (${d}ms)`) },
  );
  tracker.add(computeCallCost(writerModel, 'writer', writerResp.inputTokens, writerResp.outputTokens));
  saveText(path.join(sectionsDir, `${sectionId}.v1.md`), writerResp.content);
  onLog(
    'Writer → v1',
    true,
    `${writerResp.inputTokens} in / ${writerResp.outputTokens} out — $${tracker.totalCostUsd.toFixed(4)}`,
  );

  // ── Draft-only shortcut ──────────────────────────────────────────────────────
  if (draftOnly) {
    saveText(path.join(sectionsDir, `${sectionId}.final.md`), writerResp.content);
    onLog('Final (draft-only)', true, 'no critique — v1 saved as final');
    return {
      sectionId,
      finalVersion: 1,
      finalScore: null,
      passed: false,
      loopsUsed: 0,
      riskFlags: [],
      remainingIssues: [],
      finalContent: writerResp.content,
      sectionCostUsd: tracker.totalCostUsd - costBefore,
    };
  }

  // ── Critic + rewrite loop ────────────────────────────────────────────────────
  let currentDraft = writerResp.content;
  let currentVersion = 1;
  let loopsUsed = 0;
  let lastCritic: CriticResult & { pass: boolean } = {
    score: 0, pass: false,
    issues: [], requiredFixes: [], riskFlags: [], seoNotes: [],
    rewriteInstruction: '',
  };

  const runCritic = async (draft: string, ver: number): Promise<CriticResult & { pass: boolean }> => {
    const resp = await withRetry(
      () => callLLM({
        model: criticModel,
        system: CRITIC_SYSTEM,
        messages: [{ role: 'user', content: buildCriticPrompt(sectionId, evidence, draft, minScore) }],
        maxTokens: 8192, // Phase 4N: extra output fields (repetitionWarnings, overExplanation, longParagraph, wordCountWarning, editorialQuality)
      }),
      { onRetry: (a, e, d) => onLog(`Critic retry ${a}`, false, `${e.message} (${d}ms)`) },
    );
    tracker.add(computeCallCost(criticModel, `critic-v${ver}`, resp.inputTokens, resp.outputTokens));

    const raw = parseCriticResponse(resp.content);
    const effectivePass = raw.score >= minScore;
    const result = { ...raw, pass: effectivePass };

    saveJson(
      path.join(sectionsDir, `${sectionId}.review.v${ver}.json`),
      { ...result, effectivePassThreshold: minScore },
    );
    onLog(
      `Critic v${ver}`,
      effectivePass,
      `score ${result.score}/100 — ${effectivePass ? 'PASS ✓' : 'FAIL'} — $${tracker.totalCostUsd.toFixed(4)}`,
    );
    return result;
  };

  lastCritic = await runCritic(currentDraft, currentVersion);

  while (!lastCritic.pass && loopsUsed < maxRewriteLoops) {
    const rewritePrompt = buildRewriterPrompt(
      sectionId, evidence, currentDraft, lastCritic, minScore,
    );
    if (tracker.wouldExceedBudget(estimateTokens(rewritePrompt), rewriterModel)) {
      onLog('Budget cap — stopping rewrite', false, `$${tracker.totalCostUsd.toFixed(4)}`);
      break;
    }

    loopsUsed++;
    const nextVer = currentVersion + 1;
    onLog(`Rewriter [loop ${loopsUsed}/${maxRewriteLoops}]`, true, `→ v${nextVer}`);

    const rwResp = await withRetry(
      () => callLLM({
        model: rewriterModel,
        system: WRITER_SYSTEM,
        messages: [{ role: 'user', content: rewritePrompt }],
        maxTokens: 2048,
      }),
      { onRetry: (a, e, d) => onLog(`Rewriter retry ${a}`, false, `${e.message} (${d}ms)`) },
    );
    tracker.add(computeCallCost(rewriterModel, `rewriter-v${nextVer}`, rwResp.inputTokens, rwResp.outputTokens));
    currentDraft = rwResp.content;
    currentVersion = nextVer;

    saveText(path.join(sectionsDir, `${sectionId}.v${currentVersion}.md`), currentDraft);
    onLog(
      `Rewriter → v${currentVersion}`,
      true,
      `${rwResp.inputTokens} in / ${rwResp.outputTokens} out — $${tracker.totalCostUsd.toFixed(4)}`,
    );

    lastCritic = await runCritic(currentDraft, currentVersion);
  }

  // ── Final ────────────────────────────────────────────────────────────────────
  saveText(path.join(sectionsDir, `${sectionId}.final.md`), currentDraft);
  onLog(
    `Final v${currentVersion}`,
    lastCritic.pass,
    lastCritic.pass
      ? `score ${lastCritic.score}/100 — PASS`
      : `score ${lastCritic.score}/100 — did not reach ${minScore}`,
  );

  return {
    sectionId,
    finalVersion: currentVersion,
    finalScore: lastCritic.score,
    passed: lastCritic.pass,
    loopsUsed,
    riskFlags: lastCritic.riskFlags,
    remainingIssues: lastCritic.issues,
    finalContent: currentDraft,
    sectionCostUsd: tracker.totalCostUsd - costBefore,
  };
}
