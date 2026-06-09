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
   * Legacy Phase 4P field — no longer injected into the critic prompt.
   * V3 writer and critic handle entry-point variety autonomously.
   * Retained for backward compat; not used by v3 SECTION_META entries.
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
 * Canonical run order — 6-section architecture (V5).
 * Adds 02-quick-answer (featured-snippet block) between intro and belief shift.
 */
export const SECTION_ORDER: readonly string[] = [
  '01-intro',
  '02-quick-answer',
  '03-visual-timeline',
  '04-messaging-evolution',
  '05-cta-navigation-evolution',
  '06-lessons-for-saas-teams',
] as const;

/** H2 heading fallback for the assembler. null = no heading (intro). Writer output takes precedence. */
export const SECTION_HEADINGS: Record<string, string | null> = {
  '01-intro':                    null,
  '02-quick-answer':             '## Quick answer',
  '03-visual-timeline':          '## The Belief Shift',
  '04-messaging-evolution':      '## The Buyer Shift',
  '05-cta-navigation-evolution': '## The Funnel Shift',
  '06-lessons-for-saas-teams':   '## The Marketing Maturity Lesson',
};

export const SECTION_META: Record<string, SectionMeta> = {
  // ── Phase 4C canonical — 6-section architecture (V5 plain-explainer voice) ───
  '01-intro': {
    title: 'Introduction',
    goalDescription:
      'One paragraph that answers the search query in the first sentence. Names the ' +
      'company, the period, and the single biggest shift. Plain language only.',
    writerInstruction:
`SECTION ROLE: Tell the reader what they will learn — in the first sentence.

The reader typed "[Company] homepage teardown" or "[Company] landing page" into Google.
Your first sentence must deliver value. No build-up.

SEO KEYWORD RULE (CRITICAL):
If the evidence contains a "primaryKeyword" field, you MUST:
  1. Use that exact keyword phrase (or a natural variation) inside the H1.
     The H1 is the # heading at the very top of the article — write it as the
     first line of your output: "# {H1 text here}"
  2. Use the keyword naturally in the first or second sentence of the intro paragraph.

If no "primaryKeyword" is present, skip the # heading line and write only the paragraph.

STRUCTURE:
  • [If primaryKeyword set] First line: "# {H1 containing the keyword}"
  • First sentence: company + period + the biggest shift. Plain words. State it directly.
  • Two to four sentences: one concrete piece of evidence (a quoted headline, a
    CTA change) — bolded — and what it tells us.
  • Last sentence: what the reader will be able to test on their own homepage after reading.

RULES:
  • No subheading. After the # H1 (if present), write the paragraph directly.
  • One paragraph. Under 90 words.
  • Plain language. No expert terms in the intro.
  • No hedge in the first sentence — state the shift directly.
  • The keyword must read naturally — do not force it or repeat it.`,
    wordRange: { min: 55, max: 90 },
    maxRewriteLoops: 0,
    criticMaxTokens: 4096,
  },

  '02-quick-answer': {
    title: 'Quick Answer',
    goalDescription:
      'Three sentences that answer the question completely. Optimised for Google ' +
      'featured snippet extraction. Plain language. No jargon.',
    writerInstruction:
`SECTION ROLE: Answer the search question in three sentences.

A reader who reads only this block must walk away with the full thesis.

STRUCTURE — exactly three sentences:
  Sentence 1: What [Company] changed. (What → what, stated plainly.)
  Sentence 2: What this positioning assumes is already true — state the condition,
              NOT why it "worked." No causation. No "because they own mindshare."
              Example form: "This positioning assumes visitors already know what [X] does."
  Sentence 3: Who should NOT copy this and why — describe the company that lacks
              that condition, in one sentence.

RULES:
  • Heading: "## Quick answer" (lowercase "answer").
  • Plain language only. No expert terms.
  • Maximum 75 words across all three sentences.
  • NEVER say "this works because", "this succeeded because", "they own mindshare",
    "visitors arrive knowing", "will cost you conversions", "will cost you traffic."
  • State conditions, not outcomes. "This works if X is true" is OK.
    "This worked" or "this will cost you" is NOT OK.`,
    wordRange: { min: 50, max: 75 },
    maxRewriteLoops: 1,
    criticMaxTokens: 4096,
    forbiddenPhrases: [
      'this works for them because',
      'works for them because',
      'this worked because',
      'this succeeded',
      'own mindshare',
      'visitors arrive knowing',
      'will cost you conversions',
      'will cost you qualified traffic',
      'will cost you traffic',
      'mindshare with',
      'brand recognition they have',
    ],
  },

  '03-visual-timeline': {
    title: 'The Belief Shift',
    goalDescription:
      'What the new homepage asks visitors to believe. Three H3 sub-blocks. ' +
      'Searchable heading. Plain explainer voice.',
    writerInstruction:
`SECTION ROLE: Show what the homepage now expects the visitor to already believe.

The ## heading must contain searchable terms (e.g. "Shopify homepage positioning:
how the headline changed between 2021 and 2026"). No clever-only headings.

STRUCTURE — three H3 sub-blocks, in this order:

  ### What changed
  ≤60 words. Quote the old headline (bolded) and the new headline (bolded).
  State the shift in plain words. No jargon.

  ### Why it matters
  ≤60 words. What does the new homepage now assume the visitor already knows or
  believes? Plain language only. If you need to name a concept (e.g. "category
  leadership"), define it in the same sentence: "this is category leadership —
  when buyers already know what your company does before they land on the page."

  ### What it costs
  ≤60 words. Name what this targeting change gives up — concrete, not abstract.
  End with a specific test the founder can run on their own page TODAY.
  Make the test runnable in under five minutes.

ENTRY POINT: read the evidence first, then decide what is most interesting about it.
Open ### What changed with that — a finding, a paradox, or a concrete contrast.
Do not default to a generic "the headline shifted from X to Y" opener if the
evidence makes something more interesting.

DO NOT identify buyers here — that is the next section.`,
    wordRange: { min: 140, max: 200 },
    criticMaxTokens: 8192,
    forbiddenPhrases: [
      'this approach succeeds',
      'this works if your brand',
      'this works for companies',
      'this pattern succeeds',
      'succeeds if your',
      'non-branded traffic exceeds',
      'exceeds 40%',
      'exceeds 30%',
      'exceeds 50%',
      'if your traffic exceeds',
      'removing this will cost',
      'will cost conversions',
      'will cost you',
      'visitors typically leave',
      'visitors leave before',
      'they may leave before',
    ],
  },

  '04-messaging-evolution': {
    title: 'The Buyer Shift',
    goalDescription:
      'Who the page now targets vs. who it used to target. Three H3 sub-blocks. ' +
      'Searchable heading. Concrete buyer descriptions, no buyer-stage jargon.',
    writerInstruction:
`SECTION ROLE: Show who the new page is for, in plain language.

The ## heading should include "messaging" or "audience" plus the company name.

STRUCTURE — three H3 sub-blocks:

  ### Who the old page served
  ≤60 words. Describe the old buyer concretely — "the small-business owner setting
  up their first online store," not "the discovery-stage buyer." Quote one or two
  pieces of old vocabulary that prove it — bolded.

  ### Who the new page serves
  ≤60 words. Describe the new buyer concretely. Quote new vocabulary — bolded.
  What stage of the buying process do they appear to be in? Plain words.

  ### What this means for the sales process
  ≤60 words. Plain-language description of how this changes what happens after the
  visitor lands — does the page expect a sales call, a self-serve signup, or
  something else? End with a question the founder should ask about their own page.

State the self-serve → sales-led shift HERE if it applies. Do not restate it elsewhere.`,
    wordRange: { min: 140, max: 200 },
    criticMaxTokens: 8192,
    forbiddenPhrases: [
      'this increased conversions',
      'this drove growth',
      'A/B tested',
      'this proved',
      'this improved performance',
      'procurement-stage',
      'discovery-stage',
      'qualification filter',
      'language for buyers who control',
      'this is language for',
      'this vocabulary signals that buyers',
      'removing category explanations may cost',
      'removing this explanation will cost',
      'will cost you qualified',
      'removing that explanation',
    ],
  },

  '05-cta-navigation-evolution': {
    title: 'The Funnel Shift',
    goalDescription:
      'How the CTA path changed. Three H3 blocks. Audit-style. Concrete, plain, scannable.',
    writerInstruction:
`SECTION ROLE: Show what changed in the conversion path. Make it auditable.

The ## heading should include "CTA" or "conversion path" plus the company name.

STRUCTURE — three H3 sub-blocks:

  ### What changed
  ≤60 words. State the count or the most striking single change in the first sentence.
  Old CTAs (bolded) vs new (bolded). What was removed, what replaced it.

  ### Who this filters out
  ≤60 words. Describe the visitor type the new path no longer serves — concretely.
  Plain language: "people who are still researching and not ready to start a trial,"
  not "discovery-stage visitors."

  ### Audit your own page
  ≤60 words. Give the founder one specific check they can run on their own homepage.
  Not generic — runnable in five minutes. Anchor it to what THIS company's evidence
  revealed about CTA changes.

State CTA-friction direction ONCE here. Do not restate in lessons.`,
    wordRange: { min: 120, max: 180 },
    criticMaxTokens: 8192,
  },

  '06-lessons-for-saas-teams': {
    title: 'The Marketing Maturity Lesson',
    goalDescription:
      'Should the founder copy this? Four H3 blocks for maximum SEO and the clearest ' +
      'possible decision support. The most SEO-valuable section in the article.',
    writerInstruction:
`SECTION ROLE: Help the founder decide whether to copy this move.

The ## heading is the most SEO-critical in the article. Make it explicit:
  "Should SaaS companies copy [Company]'s homepage strategy? When it works and when it doesn't"

STRUCTURE — four H3 sub-blocks, in this order:

  ### The pattern
  ≤60 words. Name the meta-pattern this evolution shows, in plain words. NEW layer —
  do not restate the belief shift, buyer shift, or funnel shift.

  ### Who should copy this
  ≤60 words. Describe the company that has the specific advantage this move requires.
  Concrete: "if a stranger can guess what your product does from the URL alone,
  you have the brand recognition this requires." Not abstract.

  ### Who should NOT copy this
  ≤60 words. The mirror image. Describe the company that does not have the advantage,
  and what happens to them if they copy this anyway. This is the most important
  block for SEO traffic.

  ### The test before you copy
  ≤60 words. One concrete test the founder can run RIGHT NOW. Under five minutes.
  Anchored to what THIS company's evidence revealed.

Three short paragraphs + the test block.
Do NOT restate the belief shift, buyer shift, or funnel shift from earlier sections.`,
    wordRange: { min: 180, max: 260 },
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

  // ── SEO target keyword (optional, set via generate-seo-target.ts) ───────────
  // Inject primaryKeyword into every section's evidence so the intro writer
  // can use it in the H1 and opening paragraph.
  const seoTargetPath = path.join(writingDir, 'seo-target.json');
  if (fs.existsSync(seoTargetPath)) {
    try {
      const seoTarget = JSON.parse(fs.readFileSync(seoTargetPath, 'utf-8')) as {
        primaryKeyword?: string;
        volume?: number | null;
        difficulty?: number | null;
      };
      if (seoTarget.primaryKeyword) {
        evidence['primaryKeyword'] = seoTarget.primaryKeyword;
      }
    } catch {
      // seo-target.json is optional — silently skip if malformed
    }
  }

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
`You are writing one section of a CRO teardown article that is published on a blog
and reached primarily through Google search.

Your reader is split: some are experienced SaaS marketers, some are founders still
learning the vocabulary. Write for BOTH. That means: plain language by default,
expert terms only when they are themselves search terms — and always followed by
a plain-language explanation in the same sentence.

The reader is here to UNDERSTAND, not to admire the thinking. They will leave the
moment they sense you are writing for other strategists.

─── THE NINE RULES ────────────────────────────────────────────────────────────

1. NEVER OVERCLAIM. Hedge causation and quantity, never the facts.

   BAD:  "Shopify excludes most of their historical acquisition funnel."
         (Cannot prove "most" without traffic data.)
   GOOD: "Shopify narrows the type of visitor the homepage is built to serve."

   Hedge words to use when making an inference about WHY or WHAT MAY HAPPEN:
     suggests · signals · indicates · may · likely · points to · is consistent with

   Hedge the inference. Do not hedge the fact.
     "The headline changed." (fact — never hedge this)
     "This suggests the company is targeting a different buyer." (inference — hedge)

2. EVERY EXPERT TERM SHIPS WITH A PLAIN-LANGUAGE TRANSLATION — once.
   Then use the plain language only.

   BAD: "This is procurement-stage framing. The procurement-stage buyer expects..."
        (Term repeated, jargon without explanation.)
   GOOD: "The page now speaks to buyers who are already comparing vendors.
          They expect different things from the page than someone just learning what Shopify is."

   Allowed expert terms (because they are themselves searched):
     positioning · messaging · sales funnel · conversion · onboarding
     buyer journey · product-led growth · sales-led growth · ICP
     category leader · A/B test · message-market fit

   FORBIDDEN as repeated concepts (use once with translation, then drop entirely):
     procurement-stage · discovery-stage · qualification filter · category ownership
     aspiration positioning · identity recruitment · intent signal · working memory
     ICP narrowing · buyer-stage mismatch · friction-to-commitment ratio

   These are not search terms. They are strategist-to-strategist words. Replace with
   what they actually mean.

3. NO STACKED ABSTRACT NOUNS.

   BAD:  "Aspiration positioning through category language creates procurement-stage
          qualification."
   GOOD: "The page stops explaining what Shopify is, and starts filtering for visitors
          who already know."

   Test: if a sentence has three or more abstract nouns in a row, rewrite it as
   something concrete — a person, an action, an outcome.

4. NO LECTURE MODE.

   BAD pattern:  "This is X. The prerequisite is Y. The tradeoff is Z."
                 (Reads like a textbook chapter.)
   GOOD pattern: "Here is what changed. Here is what it means. Here is how to check
                  it on your own site."

   Every paragraph must give the reader a reason to keep reading. State the change,
   then explain why it matters to THEM specifically.

5. HEADINGS MUST INCLUDE SEARCHABLE WORDS.

   The ## section heading is read by Google. Clever headings hurt rankings.

   CLEVER (kill these):
     "Do not copy this unless your URL already completes the category sentence"
     "The page stopped talking to the team lead"

   SEARCHABLE (use these):
     "Why Shopify's AI headline works for Shopify — but not for most SaaS companies"
     "Shopify's homepage shift: from product explanation to identity message"

   Searchable terms to include in headings when relevant:
     [Company name] · homepage · positioning · messaging · headline · CTA
     conversion · landing page · SaaS · AI

6. MIX SENTENCE RHYTHM. Predictable rhythm becomes invisible.

   BAD pattern: same length and structure repeated.
     "The page shifted from X to Y. The new headline does Z. This signals A.
      The tradeoff is B."

   GOOD pattern: short, then long, then short.
     "Shopify can afford to skip the category explanation.
      Most companies cannot — their visitors arrive without knowing what the product does.
      That is the difference between brand-led positioning and vague copy."

7. STATE THE PRACTICAL LESSON EARLY. Do not bury it.

   Each H3 sub-block should make the takeaway clear within its first two sentences.
   The reader should not have to read 500 words to find out what they should do.

   GOOD: "The lesson is not 'write a more aspirational headline.' The lesson is:
          only remove the category explanation when your brand already does that work
          before the page loads."

   Quotable, useful, early.

8. WRITE FOR THE READER WHO IS STILL LEARNING — without losing authority.

   The expert reader can skip past the explanation. The learning reader needs it.
   You serve both with: "Expert term — and what it means."

   "This is category leadership: when buyers already know what your company does
    before they land on the page."

9. ATTACH A CONDITION TO EVERY CAUSAL STATEMENT.

   BAD:  "This will cost qualified pipeline."
   GOOD: "This may cost qualified pipeline if your homepage still depends on
          non-branded search or cold paid traffic."

   Confident, not reckless.

─── THE SELF-CHECK — RUN BEFORE YOU SUBMIT ──────────────────────────────────

Before producing your final output, mentally walk this checklist on your own draft.
Rewrite any line that fails.

  [ ] Did I use any term from the FORBIDDEN list more than once?
      → If yes, replace the second use with plain language.

  [ ] Are there sentences with three or more abstract nouns in a row?
      → If yes, rewrite with concrete subjects (a person, an action, an outcome).

  [ ] Did I make any "this caused X" claim without attaching a condition?
      → If yes, add "if [specific condition]" or hedge with "may" / "suggests".

  [ ] Is any paragraph over 60 words?
      → If yes, split it. (Intro: 90-word cap. All other sections: 60-word cap.)

  [ ] Does the ## section heading contain at least one searchable term?
      → If no, rewrite it with company name, "homepage", or "positioning" in it.

  [ ] Does every H3 sub-block deliver its takeaway in the first two sentences?
      → If no, move the lesson up.

  [ ] Did I state any company intent ("Shopify decided to...")?
      → If yes, rewrite as observation ("the page shifted from X to Y").

─── HARD RULES — never violate ──────────────────────────────────────────────

1. Use ONLY the evidence provided. No invented stats, dates, headlines, or claims.
2. Never claim a change improved conversion or caused a measurable outcome.
3. Never claim company intent.
4. Bold every verbatim website quote: **"quoted text"** — applies to headlines,
   CTA labels, navigation items, section headings, meta descriptions.
5. No bullet lists unless explicitly permitted by the section instruction.

─── COMPRESSION — these conclusions appear ONCE in the article ──────────────

  • Category claim / belief shift  → Belief Shift section only
  • Self-serve vs sales-led buyer  → Buyer Shift section only
  • CTA friction direction         → Funnel Shift section only

Do not restate in the lessons section what was already shown in analysis.`;


// Critic system prompt — threshold is stated in the user prompt so this stays cacheable.
const CRITIC_SYSTEM =
`You are a strict editorial critic for SEO-optimised CRO teardown articles.
The audience is split between expert marketers and founders still learning.
The article must work for both.

Output ONLY valid JSON. No text before or after the JSON object.
JSON SAFETY: When you quote text from the draft inside any string value,
use SINGLE quotes — 'like this'. Never put a raw double-quote inside a JSON string value.

SCORING RUBRIC — score each dimension, then sum to 100:

• evidenceAccuracy (max 25)
  Every claim traces to the provided evidence. No invented facts.
  PENALISE -5 per claim not traceable to evidence.
  PENALISE -10 per outcome/causation claim ("this caused", "this increased").
  PENALISE -3 per causal statement without an attached condition
    (e.g. "This will cost pipeline" without "if [condition]").
  HARD CAP: any unsupported factual claim → cap total at 70.

• plainLanguage (max 20)
  The section avoids strategist-to-strategist jargon. Expert terms appear at most
  once and ship with a plain-language explanation in the same sentence.
  PENALISE -4 per use of these terms AFTER their first appearance:
    procurement-stage · discovery-stage · qualification filter · category ownership
    aspiration positioning · identity recruitment · intent signal · working memory
    ICP narrowing · buyer-stage mismatch · friction-to-commitment ratio
  PENALISE -3 per sentence with 3+ abstract nouns stacked together.
  PENALISE -4 if any expert term is used without an immediate plain-language definition.
  HARD CAP: if any forbidden term appears 3+ times → cap total at 65.

• scannability (max 15)
  Section works for a Google reader who skims.
  PENALISE -4 per paragraph over 60 words (intro exempt, capped at 90).
  PENALISE -5 if an analytical section (03/04/05/06) is missing its H3 subheadings.
  PENALISE -3 per H3 block whose body exceeds 60 words.
  PENALISE -3 if the practical takeaway is buried — not in the first two sentences of an H3 block.

• searchableHeadings (max 10)
  Headings contain searchable terms.
  PENALISE -5 if the ## section heading is "clever-only" with no search terms
    (e.g. "The page stopped talking to the team lead").
  PENALISE -3 if the heading lacks the company name OR a topic term
    ("homepage", "positioning", "messaging", "CTA", "conversion").

• specificity (max 15)
  Section is anchored to THIS company's evidence. Zero generic SaaS commentary.
  PENALISE -5 per paragraph that could appear in a different company's teardown.

• rhythmAndOpening (max 10)
  Sentence length varies. The opening reflects what the evidence makes most interesting,
  not a template default.
  PENALISE -3 if all sentences are roughly the same length.
  PENALISE -4 if the opening is a generic template ("The headline shifted from X to Y")
    when the evidence supported a more interesting entry (a paradox, a finding, a contrast).

• founderTakeaway (max 5)
  Each H3 sub-block delivers its takeaway early — first two sentences.
  The section ends with a specific, runnable test the founder can do in <5 min.
  PENALISE -3 if the final test is generic ("audit your CTAs") instead of specific
    ("count how many primary CTAs above the fold require zero commitment").

HARD CAPS:
  Any conversion outcome claim without data → cap total at 60
  Section is missing H3 subheads (analytical sections only) → cap total at 75
  Section reads like strategist-to-strategist throughout → cap plainLanguage at 5

CALIBRATION:
  90–100: Ready to publish. Plain explainer voice, scannable, specific, no jargon overuse.
  80–89:  Passes with fixable issues. requiredFixes ≥1.
  70–79:  Needs rewrite — usually jargon overuse or buried takeaway.
  Below 70: A hard cap fired or it reads like a textbook chapter.

VARIANCE RULE: if two sections get the same score, justify it or vary it.

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
  const isIntro = sectionId === '01-intro' || sectionId === '02-quick-answer';
  const analyticalSection = !isIntro;

  return `Score and diagnose this ${meta.title} section draft.

SECTION ID: ${sectionId}
PASS THRESHOLD: ${minScore}

SECTION GOAL (evaluate whether the draft achieves this):
${meta.goalDescription}

REQUIRED CHECKS — answer each before scoring:
1. Is every paragraph anchored to THIS company's specific evidence (quoted phrases, dated changes, named elements)?
2. Does the section achieve the stated SECTION GOAL above?
3. Are there any paragraphs that could appear word-for-word in a teardown of a different company?
4. PLAIN LANGUAGE: Are any of the following terms used more than once (second use = required fix)?
   procurement-stage · discovery-stage · qualification filter · category ownership · aspiration positioning
   identity recruitment · intent signal · working memory · ICP narrowing · buyer-stage mismatch · friction-to-commitment ratio
   Also flag: any expert term used WITHOUT an immediate plain-language definition.
5. H3 SUBHEADINGS: ${analyticalSection ? `This is an analytical section — the required H3 sub-blocks MUST be present. List which H3 headings are present and which are missing.` : 'Not required for intro/quick-answer sections.'}
6. SEARCHABLE HEADING: Does the ## section heading contain the company name, "homepage", "positioning", "messaging", "CTA", or "conversion"? Or is it a clever-only heading with no searchable terms?
7. PARAGRAPH LENGTH: Are there any paragraphs over ${isIntro ? '90' : '60'} words? State approximate count per paragraph. Flag each violation.
8. FOUNDER TAKEAWAY: ${analyticalSection ? `Does each H3 sub-block deliver its practical takeaway in the first two sentences? Is the final H3 block a specific, runnable test (under five minutes), anchored to this company's evidence?` : 'Not applicable for intro/quick-answer.'}
9. BOLD QUOTES: Is every verbatim website quote (headlines, CTAs, nav items, section headings, meta descriptions) in **"bold quotes"**? Plain quotes only = required fix.
10. WORD COUNT: Is the section within ${meta.wordRange.min}–${meta.wordRange.max} words? State approximate count. Flag if over.

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
  "rewriteInstruction": "<one-paragraph instruction for the rewriter — empty string only if score >= 90>",
  "dimensionScores": {
    "evidenceAccuracy": <0–25>,
    "plainLanguage": <0–20>,
    "scannability": <0–15>,
    "searchableHeadings": <0–10>,
    "specificity": <0–15>,
    "rhythmAndOpening": <0–10>,
    "founderTakeaway": <0–5>
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
4. Hedge the MECHANISM (why it works), not the FINDING (what changed). One precise hedge per inference — not a hedge per sentence.
5. Never claim a change improved conversion, drove growth, or caused a measurable result.
6. Return the full rewritten section — ## heading on line 1 (for analytical sections), then the body. No explanation.

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
  /**
   * Phase 4P: force a specific writer/rewriter model for ALL sections,
   * overriding each section's writerModel (e.g. run analytical sections on
   * Sonnet instead of their default Opus). Critic model is unaffected.
   */
  writerModelOverride?: string;
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
  // A run-level writerModelOverride (e.g. --writer-model) trumps the per-section default.
  const sectionWriterModel = opts.writerModelOverride ?? getSectionMeta(sectionId).writerModel;
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
  let lastCritic: CriticResult & { pass: boolean; parseFailed?: boolean } = {
    score: 0, pass: false,
    issues: [], requiredFixes: [], riskFlags: [], seoNotes: [],
    rewriteInstruction: '',
  };

  const runCritic = async (draft: string, ver: number): Promise<CriticResult & { pass: boolean; parseFailed?: boolean }> => {
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

    // Graceful degradation: the critic occasionally emits JSON with unescaped inner
    // quotes (our content is dense with **"bold quotes"**). Rather than throw away an
    // already-written draft, salvage the numeric score and keep the draft as-is.
    let raw: CriticResult;
    try {
      raw = parseCriticResponse(resp.content);
    } catch {
      const m = resp.content.match(/"score"\s*:\s*(\d+)/);
      const salvaged = m ? parseInt(m[1], 10) : 0;
      onLog(`Critic v${ver}`, false, `JSON parse failed — salvaged score ${salvaged}; keeping current draft`);
      return {
        score: salvaged, pass: salvaged >= minScore,
        issues: [], requiredFixes: [], riskFlags: [], seoNotes: [],
        rewriteInstruction: '', parseFailed: true,
      };
    }
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

  while (!lastCritic.pass && !lastCritic.parseFailed && loopsUsed < effectiveMaxLoops) {
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
