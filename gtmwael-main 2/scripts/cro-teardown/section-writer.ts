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
  /**
   * Rec 2: Override the CLI --max-rewrite-loops for evidence-capped sections.
   * When set, this value takes precedence over the CLI flag.
   * 0 = write v1 and accept it; no rewrite loop regardless of critic score.
   */
  maxRewriteLoops?: number;
  /**
   * Rec 3: Override critic maxTokens for lightweight sections.
   * Analytical sections keep 8192; thin sections use 4096 to prevent truncation waste.
   */
  criticMaxTokens?: number;
  /**
   * Phase 4P: the intended first beat of the section (claim / contrast / number / warning).
   * Used by the critic's distinctiveness check to reward divergence across sections,
   * and documented for the cross-section cohesion pass.
   */
  openingMove?: string;
  /**
   * Phase 4P: per-section writer/rewriter model override.
   * Analytical sections use Opus for sharper prose; the critic stays on its own
   * (cheaper) model. When unset, falls back to getModel('writer').
   */
  writerModel?: string;
}

/**
 * Canonical run order — 5-section architecture (Phase 4N+).
 * 02-at-a-glance dropped: evidence-capped section, not worth iterating.
 */
export const SECTION_ORDER: readonly string[] = [
  '01-intro',
  '03-visual-timeline',
  '04-messaging-evolution',
  '05-cta-navigation-evolution',
  '06-lessons-for-saas-teams',
] as const;

/** H2 heading to prepend in the assembled article. null = no heading (intro). */
export const SECTION_HEADINGS: Record<string, string | null> = {
  '01-intro':                    null,
  '03-visual-timeline':          '## The Belief Shift',
  '04-messaging-evolution':      '## The Buyer Shift',
  '05-cta-navigation-evolution': '## The Funnel Shift',
  '06-lessons-for-saas-teams':   '## The Marketing Maturity Lesson',
};

export const SECTION_META: Record<string, SectionMeta> = {
  // ── Phase 4C canonical — 5-section architecture (Phase 4N+) ─────────────────
  '01-intro': {
    title: 'Introduction',
    openingMove: 'company-and-period',
    goalDescription:
      'One punchy paragraph that names the company, the time period, and the single clearest shift — framed as a marketing story, not a redesign recap. No analysis yet.',
    writerInstruction:
`SECTION ROLE: Hook the reader. Set up the story.

Write ONE paragraph — no more, no less. Cover exactly three things:
  1. Company name and time period (e.g., "Between Jan 2023 and Jun 2026, Intercom…")
  2. The single clearest marketing shift — the claim or identity that changed most visibly
  3. One sentence that tells the reader what this article will reveal

Rules:
  • Lead with the company name. No hedge in the first sentence — state the shift directly.
  • No page elements (H1, nav, CTA labels) mentioned here. They belong in analysis sections.
  • No heading — do NOT output a ## line. Start with the paragraph directly.
  • Under 90 words total.`,
    wordRange: { min: 55, max: 90 },
    // evidence-capped: one pass sufficient, no rewrite loop needed
    maxRewriteLoops: 0,
    criticMaxTokens: 4096,
  },

  '03-visual-timeline': {
    title: 'The Belief Shift',
    openingMove: 'bold-claim',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'What belief is the homepage now asking visitors to accept — and what did it ask before? Lead with the claim, then prove it.',
    writerInstruction:
`SECTION ROLE: Name the belief shift. Show it. Explain what it costs.

STRUCTURE — follow this order exactly:
  1. ## HEADING — MUST be the very first line of your output. Name the specific shift for THIS company, 6–12 words (e.g., "From outcome promise to category ownership bet"). Never a generic title.
  2. OPENING MOVE — CLAIM FIRST: your first body sentence after the heading is a bold, unhedged statement of the belief shift. No "appears to," no "can be read as" in that opening sentence. State what the page now asks the reader to believe.
  3. EVIDENCE — quote the old and new headline / section-heading text, bolded. Name the period. What visibly changed?
  4. INTERPRETATION — what belief is the page now asking visitors to accept? What market assumption does it embed? Hedged here.
  5. TRADEOFF — name one explicitly: "outcome promise vs category claim" or "confidence vs overclaiming."
  6. **So what?** — LABELLED. One founder-facing question: should THEIR homepage make a category claim now, and what's the prerequisite?

2–3 short paragraphs (body, excluding heading). Each under 90 words.
This section does NOT identify buyers — that's the next section's job.`,
    wordRange: { min: 140, max: 220 },
    criticMaxTokens: 8192,
  },

  '04-messaging-evolution': {
    title: 'The Buyer Shift',
    openingMove: 'contrast',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'Who does the page now appear to be written for, and who did it serve before? Open on the contrast itself, not a thesis statement.',
    writerInstruction:
`SECTION ROLE: Name the buyer shift. Show the evidence. Name the tradeoff.

STRUCTURE — follow this order exactly:
  1. ## HEADING — MUST be the very first line of your output. Name the buyer shift for THIS company, 6–12 words (e.g., "The page stopped talking to the team lead"). Never generic.
  2. OPENING MOVE — CONTRAST FIRST: your first body sentences put the two readers side by side, NOT a thesis sentence. Two short sentences — who the old page spoke to, then who the new page speaks to. Example shape: "The old page spoke to the person doing the work. The new one speaks to the person signing the contract." Make the contrast concrete to THIS company's evidence before you interpret anything.
  3. EVIDENCE — quote meta-description changes, headline vocabulary shifts, CTA / navigation labels, all bolded. What in the language signals a different buyer?
  4. INTERPRETATION — what decision stage does the page now target? What does the changed vocabulary suggest about the buying committee? Hedged.
  5. TRADEOFF — name it: "self-serve vs sales-led" or "breadth vs focus."
  6. CLOSE — fold the founder takeaway into your LAST sentence. Do NOT use a bold "So what?" label here. End on a question the founder must answer about their own page: who is it currently written for, and is that the buyer who converts?

2–3 short paragraphs (body, excluding heading). Each under 90 words.
State the self-serve→enterprise shift HERE if applicable — do not repeat it elsewhere.`,
    wordRange: { min: 140, max: 220 },
    criticMaxTokens: 8192,
    forbiddenPhrases: [
      'this increased conversions',
      'this drove growth',
      'A/B tested',
      'this proved',
      'this improved performance',
    ],
  },

  '05-cta-navigation-evolution': {
    title: 'The Funnel Shift',
    openingMove: 'concrete-number',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'How did the conversion path change, and what does fewer/different CTAs signal about the expected buyer journey? Open on the number, not the analysis.',
    writerInstruction:
`SECTION ROLE: Name the funnel shift. Show the CTA evidence. Name the friction tradeoff.

STRUCTURE — follow this order exactly:
  1. ## HEADING — MUST be the very first line of your output. Name the funnel change for THIS company, 6–12 words (e.g., "Fewer CTAs, higher intent required"). Never generic.
  2. OPENING MOVE — NUMBER FIRST: your first body sentence states the concrete change as a count or before/after. Example shape: "Four primary CTAs became two." or "The page removed every mid-funnel ask and kept two." No interpretation in that first sentence — the number IS the hook. Then explain.
  3. EVIDENCE — name the old CTA set vs new CTA set, labels bolded. What was removed, what replaced it?
  4. INTERPRETATION — what does this signal about expected buyer-journey length? Who does the path now serve — and who does it filter out? Hedged.
  5. TRADEOFF — name it: "speed vs qualification" or "proof vs friction."
  6. CLOSE — fold the takeaway into your LAST sentence. Do NOT use a bold "So what?" label here. End on: how many entry points does the founder's own homepage offer, and does that match their traffic quality and sales capacity?

2 tight paragraphs (body, excluding heading). Each under 90 words.
State CTA-friction direction ONCE here — do not repeat in the lessons section.`,
    wordRange: { min: 120, max: 200 },
    criticMaxTokens: 8192,
  },

  '06-lessons-for-saas-teams': {
    title: 'The Marketing Maturity Lesson',
    openingMove: 'counterintuitive-warning',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'What is the meta-pattern of this evolution, and when should founders NOT copy it? Open on the warning, not the pattern.',
    writerInstruction:
`SECTION ROLE: Name the pattern. Give one concrete study. Give one sharp warning.

STRUCTURE — follow this order exactly:
  1. ## HEADING — MUST be the very first line of your output. Name the lesson for THIS company, 6–12 words (e.g., "What founders should check before copying this"). Never generic.
  2. OPENING MOVE — WARNING FIRST: your first body sentence is the counterintuitive caution, NOT the pattern summary. One sharp sentence that tells the founder what NOT to copy from this company before you tell them what to admire. Example shape: "Do not copy this homepage. Not yet — and here is the condition you have to meet first." This inverts the reader's expectation and earns the rest of the section.
  3. DIRECT CLAIM — name the overall pattern this evolution represents. One bold sentence.
  4. EVIDENCE — one specific, concrete observable from THIS company that illustrates the pattern. A NEW angle or synthesis — not a repeat of earlier sections.
  5. INTERPRETATION — what does this pattern cost the company in buyer access or positioning risk? What prerequisite made it viable for THEM specifically? Hedged.
  6. TRADEOFF — the meta tradeoff of the whole evolution. May be a combination: "category claim in exchange for a higher proof burden and longer buyer journey."
  7. **So what?** — LABELLED. The sharpest founder takeaway: a TEST or CONDITION they must check on their own homepage before doing what this company did. Not generic advice.

3 short paragraphs (body, excluding heading). Each under 90 words.
Do NOT restate the belief shift, buyer shift, or funnel shift — add something new.`,
    wordRange: { min: 150, max: 240 },
    criticMaxTokens: 8192,
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
`You are writing one section of a CRO teardown article for startup SaaS founders.

Your reader is a busy SaaS founder. They want to know what shifted, what it signals, and whether to care. They don't want a report. They want a sharp take.

VOICE
Write like Joanna Wiebe: direct, punchy, founder-facing. Not academic. Lead with the claim. Back it with evidence. Short sentences, then a longer explanatory one, then short again. Active voice. No throat-clearing.

SECTION STRUCTURE — follow this order every time:
  1. HEADING (## )     First line of your response. Punchy, case-specific — 6–12 words. Do NOT use generic titles like "The Belief Shift." Name what actually happened for this company.
  2. DIRECT CLAIM      1–2 sentences. State the shift boldly. No hedge on the opening sentence.
  3. EVIDENCE          What changed — quote specific text, name specific elements, date where possible. One paragraph.
  4. INTERPRETATION    What it may mean for positioning, buyer profile, or sales motion. Use "appears to" / "can be read as" / "may suggest." One paragraph. Hedged throughout.
  5. TRADEOFF          One or two sentences. Name it explicitly. Format: "The tradeoff: [X] in exchange for [Y]." Pick from the named tradeoffs below.
  6. SO WHAT?          End with "**So what?**" (bold label), then 1–2 sentences — a founder-facing takeaway specific enough to act on or rule out for their own homepage.

NAMED TRADEOFFS — pick the most accurate one:
  clarity vs credibility
  self-serve vs sales-led
  speed vs qualification
  outcome promise vs category claim
  proof vs friction
  breadth vs focus
  confidence vs overclaiming

FORMATTING RULE — mandatory for scannability:
When quoting verbatim text from the company's website — headlines, CTA labels, navigation items, section headings, meta description text — ALWAYS bold it: **"quoted text"**.
Examples:
  ✓ The headline shifted from **"Support customers at exactly the right moment"** to **"The only helpdesk designed for the AI Agent era."**
  ✓ CTAs changed from **"Get started"** and **"Watch a Demo"** to **"Start free trial"** and **"Contact sales."**
  ✗ The headline shifted from "Support customers..." — plain quotes only, no bold. Wrong.
This applies to every single piece of quoted website text in every section, without exception.

HARD RULES:
1. Use ONLY the evidence provided. No invented facts, metrics, dates, or claims.
2. Never claim a change improved conversion, increased revenue, or drove any outcome.
3. Never claim company intent or internal strategy.
4. No paragraph over 90 words.
5. No bullet lists unless the section instruction explicitly allows them.
6. Every paragraph anchored to THIS company's evidence. Generic = rewrite.

DO NOT:
  × Lecture. Not "It is important to understand that..." or "This demonstrates the value of..."
  × Over-explain. Make the point. Stop.
  × Repeat insights from other sections.
  × Use page elements as topic headings. They are evidence only.
  × Catalogue every change in chronological order. Synthesise.

EDITORIAL COMPRESSION — mandatory:
Each section has ONE job. These conclusions appear ONLY ONCE across the entire article:
  • Belief/category claim shift → The Belief Shift section only
  • Self-serve vs enterprise buyer identification → The Buyer Shift section only
  • CTA friction direction → The Funnel Shift section only
  • Upmarket repositioning signal → state once, in the most relevant section

EVIDENCE-SAFETY — inviolable:
Never write: "this increased conversions" / "[company] decided to" / "A/B tested" /
"this drove revenue" / "based on their strategy" / "this improved performance".
Always write: "can be read as" / "may suggest" / "appears to" / "from visible evidence" / "is consistent with".`;


// Critic system prompt — threshold is stated in the user prompt so this stays cacheable.
const CRITIC_SYSTEM =
`You are a strict editorial critic for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.
JSON SAFETY: When you quote text from the draft inside any string value (issues, requiredFixes, etc.),
use SINGLE quotes — 'like this'. Never put a raw double-quote character inside a JSON string value;
it breaks the parse. Refer to the draft's bold quotes by their words, not by reproducing **"..."** verbatim.

SCORING RUBRIC — score each dimension separately, then sum to 100:
• evidenceAccuracy  (max 25): Every claim traces to the provided evidence. No invented stats.
  PENALISE -5 per phrase that implies a fact not present in the evidence.
• riskControl       (max 10): Interpretations labelled. No causation claims. No conversion-lift claims.
  PENALISE -3 per unlabelled interpretation; -10 per causation claim.
• specificity       (max 15): Tied to THIS company's evidence — not generic SaaS commentary.
  PENALISE -5 per paragraph that could apply word-for-word to a different company's teardown.
  HARD WARNING: If this section could apply to any generic website without changing a word, specificity is capped at 5.
• founderSharpness  (max 20): Does the section give a founder something they can ACT on?
  This replaces vague "CRO depth" scoring. It requires ALL of:
  (a) A direct claim — not "it seems that" as the opening. A bold statement of what shifted.
  (b) A named marketing tradeoff — explicitly stated as "[X] in exchange for [Y]" or "The tradeoff: [X] vs [Y]".
  (c) A "So what?" — a founder-facing takeaway (may be labelled "**So what?**" or natural last sentence).
  PENALISE -8 if no named tradeoff is present.
  PENALISE -7 if no founder takeaway is present at all.
  PENALISE -5 if the section reads like a lecture — explains without claiming. Signs: 3+ consecutive analytical sentences without a direct claim, no tension, no tradeoff.
  PENALISE -3 if the takeaway is generic ("test your CTAs", "know your audience") with no evidence anchor.
  NOTE: The takeaway may be a bold "**So what?**" label OR folded into the closing sentence — BOTH are valid. Do not penalise a section for using a natural closing takeaway instead of the bold label; the section instruction decides which form is required.
• distinctiveness   (max 5): Does the section's OPENING execute its assigned opening move (see ASSIGNED OPENING MOVE in the user prompt)? This rewards variety across the article — sections should NOT all open the same way.
  Award 5 if the opening clearly executes the assigned move (claim / contrast / number / warning).
  Award 2–3 if the opening is competent but generic (e.g., another bold declarative when a contrast or number was assigned).
  Award 0 if the opening ignores the assigned move entirely.
  This is a REWARD dimension — do not penalise creative execution that still honours the assigned move.
• clarity           (max 10): Clear sentences, punchy, no padding. Varied sentence length.
  PENALISE -3 per filler sentence with no evidence anchor; -2 per redundant or padded phrase.
  PENALISE -2 if all sentences are roughly the same length (monotone — no punch).
• analysisDepth     (max 10): Section explains conversion implications and buyer psychology — not just what changed.
  PENALISE -5 if purely descriptive (no buyer psychology, no conversion implication).
  PENALISE -3 if generic — observations that could apply to any SaaS homepage.
  PENALISE -3 if a messaging change is described but no buyer audience is identified.
• editorialQuality  (max 5): Section respects its stated role. No over-long paragraphs. No conclusion-restating.
  PENALISE -3 if section repeats a conclusion that belongs in a different section.
  PENALISE -2 per paragraph that restates the previous paragraph in different wording.
  PENALISE -2 per paragraph that exceeds 90 words without a distinct second idea.

(Dimensions sum to 100: 25 + 10 + 15 + 20 + 5 + 10 + 10 + 5.)

HARD CAPS — apply before summing:
• Any unsupported factual claim → cap total at 70
• Any conversion improvement claim without data → cap total at 60
• No named tradeoff present (except 01-intro) → cap total at 75
• No founder takeaway present at all — neither a bold "So what?" nor a folded closing takeaway (except 01-intro) → cap total at 75
• Section reads like a lecture throughout → cap founderSharpness at 6
• Section is purely descriptive with no CRO/GTM analysis → cap total at 72
• "can be read as" or equivalent appearing more than 3 times in the same section → cap total at 85
• Section word count exceeds 240 words (except 06-lessons: 250) → cap editorialQuality at 5

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

Write the section now. Unless the section instruction says otherwise, start with a ## heading on the first line, then write the body directly below it.`;
}

export function buildCriticPrompt(
  sectionId: string,
  evidence: Record<string, unknown>,
  draft: string,
  minScore: number,
): string {
  const meta = getSectionMeta(sectionId);
  const openingMoveBlock = meta.openingMove
    ? `\nASSIGNED OPENING MOVE: "${meta.openingMove}" — the section's first beat should execute this move (see the distinctiveness dimension). Sections across the article are intentionally assigned DIFFERENT moves so the piece does not read templated.`
    : '';
  return `Score and diagnose this ${meta.title} section draft.

SECTION ID: ${sectionId}
PASS THRESHOLD: ${minScore}${openingMoveBlock}

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
13. REPETITION / SCOPE: Does the section state a conclusion that belongs in a different section (self-serve→enterprise shift, proof burden, CTA friction direction)? If so, include it as an item in "issues" with the note "(belongs in section XX)". Do not dedicate a separate output field to this.
14. WORD COUNT: Is the section within the target range? If over or under, include a note in "issues".
15. BOLD QUOTES CHECK: Every verbatim quote from the company's website (headlines, CTAs, navigation labels, section headings, meta descriptions) must be bolded: **"quoted text"**. If any website quote appears with plain quotes only (no bold), this is a required fix.
16. TRADEOFF CHECK (skip for 01-intro): Is there an explicitly named marketing tradeoff — formatted as "[X] in exchange for [Y]" or "The tradeoff: [X] vs [Y]"? If absent, this is a required fix.
17. TAKEAWAY CHECK (skip for 01-intro): Does the section end with a founder-facing takeaway — either a labelled "**So what?**" OR folded into the closing sentence as a founder action/question? BOTH forms are valid; the section instruction decides which is required. Only flag as a required fix if NO takeaway is present in either form.
18. DISTINCTIVENESS CHECK (skip for 01-intro): Does the opening execute the ASSIGNED OPENING MOVE above (claim / contrast / number / warning)? Score the distinctiveness dimension accordingly. This rewards variety — do not penalise an opening that honours its assigned move just because it differs from the other sections.
19. LECTURE CHECK: Does the section open with bold claims and short punchy sentences, or does it open with hedging and long analytical paragraphs? If 3+ consecutive sentences are analytical explanation with no direct claim, tradeoff, or takeaway, flag as lecture-style.

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
  "rewriteInstruction": "<one-paragraph instruction for the rewriter — empty string only if score >= 90>",
  "dimensionScores": {
    "evidenceAccuracy": <0–25>,
    "riskControl": <0–10>,
    "specificity": <0–15>,
    "founderSharpness": <0–20>,
    "distinctiveness": <0–5>,
    "clarity": <0–10>,
    "analysisDepth": <0–10>,
    "editorialQuality": <0–5>
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
  // Rec 2: per-section override for evidence-capped sections (e.g. 01-intro: maxRewriteLoops=0)
  const effectiveMaxLoops = getSectionMeta(sectionId).maxRewriteLoops ?? maxRewriteLoops;
  // Rec 3: per-section critic token cap (lightweight sections: 4096, analytical: 8192)
  const criticMaxTokens = getSectionMeta(sectionId).criticMaxTokens ?? 8192;
  const minScore = opts.minScore ?? CRITIC_PASS_SCORE;
  const draftOnly = opts.draftOnly ?? false;
  const costBefore = tracker.totalCostUsd;

  // ── Evidence ────────────────────────────────────────────────────────────────
  const evidence = buildAndCacheSectionEvidence(sectionId, writingDir);
  onLog('Evidence', true, `${sectionId}.evidence.json`);

  // Phase 4P: analytical sections override writer/rewriter to Opus for sharper prose.
  // The critic deliberately stays on its own (cheaper) model — quality gate, not generation.
  const sectionWriterModel = getSectionMeta(sectionId).writerModel;
  const writerModel   = sectionWriterModel ?? getModel('writer');
  const criticModel   = getModel('critic');
  const rewriterModel = sectionWriterModel ?? getModel('rewriter');

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
        maxTokens: criticMaxTokens, // Rec 3: per-section override (lightweight: 4096, analytical: 8192)
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

  while (!lastCritic.pass && loopsUsed < effectiveMaxLoops) {
    const rewritePrompt = buildRewriterPrompt(
      sectionId, evidence, currentDraft, lastCritic, minScore,
    );
    if (tracker.wouldExceedBudget(estimateTokens(rewritePrompt), rewriterModel)) {
      onLog('Budget cap — stopping rewrite', false, `$${tracker.totalCostUsd.toFixed(4)}`);
      break;
    }

    loopsUsed++;
    const nextVer = currentVersion + 1;
    onLog(`Rewriter [loop ${loopsUsed}/${effectiveMaxLoops}]`, true, `→ v${nextVer}`);

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
