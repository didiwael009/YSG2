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
   * Per-section critic pass threshold override.
   * When set, this value takes precedence over the CLI --min-score and CRITIC_PASS_SCORE (85).
   * Use for sections where evidence constraints make 85 structurally hard to reach
   * (e.g. 03-visual-timeline is limited by sparse visual evidence — 80 is the right bar).
   */
  minScore?: number;
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
 * Canonical run order — 6-section architecture (V6).
 * All sections receive visual analysis, context research, and custom outline overrides.
 * 07-business-context is written by generate-business-context.ts before the
 * section loop runs; with --force the loop overwrites it with the outline's custom H2.
 */
export const SECTION_ORDER: readonly string[] = [
  '01-intro',
  '03-visual-timeline',
  '04-messaging-evolution',
  '05-cta-navigation-evolution',
  '07-business-context',
  '06-lessons-for-saas-teams',
] as const;

/** H2 heading fallback for the assembler. null = no heading (intro). Writer output takes precedence. */
export const SECTION_HEADINGS: Record<string, string | null> = {
  '01-intro':                    null,
  '03-visual-timeline':          '## Visual timeline',
  '04-messaging-evolution':      '## Messaging evolution',
  '05-cta-navigation-evolution': '## CTA and navigation changes',
  '07-business-context':         '## Why the homepage changed',
  '06-lessons-for-saas-teams':   '## What SaaS teams can study',
};

export const SECTION_META: Record<string, SectionMeta> = {
  // ── Phase 4C canonical — 6-section architecture (V6) ─────────────────────────
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

  '07-business-context': {
    title: 'Why the Homepage Changed',
    goalDescription:
      'Three short paragraphs explaining the business context behind the homepage evolution. ' +
      'Market entry context, product/competitive evolution, and industry shift. Plain language. ' +
      'Each paragraph ≤60 words.',
    minScore: 82,
    writerInstruction:
`SECTION ROLE: Explain WHY the homepage evolved — the business context behind the changes.

This section is written if generate-business-context.ts has not already produced the file.
Use the evidence to infer the most likely business reasons for the homepage shifts.

STRUCTURE — exactly three paragraphs, no H3 subheadings:

  Paragraph 1 — Market entry context (≤60 words):
  What was happening in [Company]'s market during the period covered?
  What category were they entering or defending? Name the context plainly.

  Paragraph 2 — Product/competitive evolution (≤60 words):
  What changed in their product or competitive environment that would explain
  the homepage shifts? Quote specific homepage changes as evidence.
  Hedge inferences: "suggests", "points to", "is consistent with".

  Paragraph 3 — Industry shift + convergence (≤60 words):
  What broader industry trend does this evolution map to?
  What other SaaS companies in adjacent categories made similar moves?
  End with a single observation about what this says for SaaS teams in this space.

RESEARCH HEDGING RULE (applies to any fact from business-context-research.json):
  Any specific figure, date, or named event from the research must be hedged:
  • Funding rounds, valuations, acquisition prices → "reportedly", "according to public reports"
  • Named announcements → "publicly announced" only if the research explicitly says so
  • Specific dates tied to events → "in [period]" not "on [exact date]" unless the evidence cites a primary source
  Never state a dollar figure, valuation, or acquisition price as a bare fact.

CITATION GUIDANCE (if citation-context is present in the evidence):
  Use exactly 1 citation from citation-context.recommendedCitations — embedded naturally in
  paragraph 2 or 3. Never list citations. Never force more than one.
  Format options:
    • "As [Author] describes in [Title], [observation]."
    • "This is consistent with [Author]'s framework in [Title] — [observation]."
    • "The pattern [Author] calls [concept] in [Title] is visible here: [observation]."
  The citation should support a claim you are already making — not replace evidence with theory.
  If no citation-context is present, skip this step entirely.

RULES:
  • H2 heading: "## Why the homepage changed"
  • Three paragraphs only. No bullet lists. No H3 subheadings.
  • Each paragraph ≤60 words.
  • Plain language throughout. No jargon.
  • Hedge every inference. Never claim causation.
  • Use only evidence provided — no invented market context.`,
    wordRange: { min: 120, max: 200 },
    maxRewriteLoops: 1,
    criticMaxTokens: 4096,
  },
  '03-visual-timeline': {
    title: 'Visual Timeline',
    goalDescription:
      'Walk the reader through the visual arc of the homepage — when changes happened, ' +
      'what each phase looked like, and what the progression from first to last snapshot reveals. ' +
      'Anchored to specific screenshot observations from the evidence.',
    writerInstruction:
`SECTION ROLE: Show the homepage evolution visually — not just what changed, but when and how dramatically.

STRUCTURE — 2–3 H3 subheadings, each covering a distinct phase or moment in the visual arc:

  H3 1 — The starting point (earliest snapshot):
  What did the page look like? Describe the above-fold layout, layout type,
  and primary message in plain terms. Quote any actual headline text visible.

  H3 2 — The shift (what changed at the visible inflection point):
  When did the most visible change happen? Name the approximate period.
  Quote specific evidence (headline change, CTA removal, design overhaul).

  H3 3 — Where it landed (most recent snapshot):
  How different is the current page from the starting point?
  End with one concrete test: "Visit your homepage and [do this specific thing]."

EVIDENCE CONSTRAINT (critical):
  • Only cite design details (layout type, headline text, CTA labels) that appear explicitly
    in analysis-blocks.json, messaging.json, or visual-analysis.json.
  • Prefer qualitative labels when the evidence provides them (e.g. "enterprise-grade",
    "polished"). If you cite a numerical value from the evidence, always pair it with its
    qualitative label in the same sentence — never cite a number alone.
  • Do not cite "visual sophistication" as a standalone number — always attach the label:
    "a visual sophistication score of 4 out of 5 — described in the evidence as polished."

RULES:
  • ## heading: company name + "homepage" + a time span or change descriptor
    Example: "## Gong's homepage from 2020 to 2026: from education to infrastructure"
  • Each H3 format: "[period or phase] — [what was happening]"
  • HARD PARAGRAPH CAP: each paragraph ≤ 60 words. Split any paragraph that exceeds this.
  • Every visual claim must come from the analysis-blocks or visual-analysis evidence
  • Never describe what the page intended to do — only what it shows
  • Quote at least one specific headline or copy change per H3`,
    wordRange: { min: 180, max: 320 },
    maxRewriteLoops: 2,
    minScore: 80,
    criticMaxTokens: 8192,
  },

  '04-messaging-evolution': {
    title: 'Messaging Evolution',
    goalDescription:
      'Analyze the shifts in headline, meta description, and body copy — ' +
      'what the page started saying vs what it says now, and what each shift ' +
      'signals about the target buyer.',
    writerInstruction:
`SECTION ROLE: Show how the written message on the page changed — and what each change says about who the page is now written for.

STRUCTURE — 2–3 H3 subheadings:

  H3 1 — Headline shift:
  Show the before → after headline in **bold quotes**.
  One paragraph: what changed and what it signals about the target buyer.
  Max 70 words.

  H3 2 — Meta description and copy:
  Show the before → after meta description in **bold quotes**.
  1–2 sentences on what changed in body copy language (feature terms → outcome terms, etc.).
  Max 70 words.

  H3 3 — What the messaging shift signals:
  One observation about who the page is now written for vs before.
  End with a specific test: "Visit your homepage and count [specific thing]."

RULES:
  • ## heading: company name + "messaging" or "homepage copy" + the shift direction
    Example: "## How Expensya's homepage messaging shifted from global SaaS to French market"
  • Bold every verbatim quote: **"like this"**
  • Hedge all buyer inferences: "suggests", "is consistent with", "may indicate"
  • One concrete founder test at the end of the final H3`,
    wordRange: { min: 200, max: 380 },
    maxRewriteLoops: 2,
    criticMaxTokens: 8192,
  },

  '05-cta-navigation-evolution': {
    title: 'CTA and Navigation Evolution',
    goalDescription:
      'Analyze what CTAs were added and removed, what navigation items changed, ' +
      'and what these shifts signal about the sales motion and buyer journey.',
    writerInstruction:
`SECTION ROLE: Show what CTAs and navigation items changed — and what each addition or removal signals about where the company wants visitors to go next.

STRUCTURE — 2 H3 subheadings:

  H3 1 — CTA changes:
  Name the CTAs added or removed in **bold quotes**.
  One paragraph: what the original CTA assumed about the visitor,
  what the new CTA assumes instead.

  H3 2 — Navigation changes:
  Name the nav items added or removed in **bold quotes**.
  What was removed? What does the removal signal about what the company
  no longer needs to explain to visitors? End with a specific founder test.

EVIDENCE CONSTRAINT (critical — violations will fail the critic):
  • ONLY cite CTA text and navigation items that appear VERBATIM in the evidence JSON
    (ctaAdded, ctaRemoved, navAdded, navRemoved fields).
  • Do NOT paraphrase, infer, combine, or assume items exist.
  • If an item is not explicitly listed in the evidence — do not name it.
  • Before writing, list every item you plan to name and verify it appears in the JSON.

RULES:
  • ## heading: company name + "CTA" or "navigation" + the direction of change
    Example: "## How Webflow's CTA and navigation moved from self-serve to demo-first"
  • Bold all CTA text and nav items in quotes
  • Hedge all intent inferences
  • HARD PARAGRAPH CAP: each paragraph ≤ 55 words. Split any paragraph that exceeds this.
  • One founder test at the end of the final H3
  • No generic SaaS advice — every sentence anchored to this company's evidence`,
    wordRange: { min: 180, max: 320 },
    maxRewriteLoops: 2,
    criticMaxTokens: 8192,
  },

  '06-lessons-for-saas-teams': {
    title: 'What SaaS Teams Can Study',
    goalDescription:
      'Draw 3 concrete, specific patterns from this homepage evolution that SaaS teams can apply. ' +
      'Each pattern must be anchored to this company\'s specific evidence — not generic advice.',
    writerInstruction:
`SECTION ROLE: Give SaaS teams 3 specific, usable patterns from this homepage's evolution.

STRUCTURE — exactly 3 H3 subheadings, each a distinct pattern:

  H3 format: "[Pattern name] — [What this company did specifically]"
  Example: "Navigation simplification — Gong removed 4 educational nav items as category matured"

  Each H3 body — 3 SHORT paragraphs, each ≤ 55 words:
  • Paragraph 1: What this company did — cite the specific evidence (quote the change). ≤ 55 words.
  • Paragraph 2: Why this matters — what condition makes this pattern worth testing. ≤ 55 words.
  • Paragraph 3: A runnable test: "Visit your [specific page] and [do this specific thing]". ≤ 55 words.

  DO NOT merge these into a single paragraph. 3 separate short paragraphs per H3.

CITATION GUIDANCE (if citation-context is present in the evidence):
  Use exactly 1 citation from citation-context.recommendedCitations — placed in one H3 body,
  embedded in a sentence that supports a claim you are already making.
  Format options:
    • "As [Author] describes in [Title], [observation]."
    • "This is consistent with [Author]'s framework in [Title] — [observation]."
  Never list citations. Never force a citation where it reads awkwardly.
  Never invent a citation not listed in citation-context.
  If no citation-context is present, skip this step entirely.

RULES:
  • ## heading: "What SaaS teams can study from [Company]'s homepage evolution"
  • Each H3 must name the company
  • Every pattern must cite a quoted change or named element from the evidence
  • Conditions attached to every "should you test this" inference
  • HARD PARAGRAPH CAP: no single paragraph may exceed 55 words — split before submitting
  • Each founder test must be specific and completable in under 5 minutes`,
    wordRange: { min: 220, max: 380 },
    maxRewriteLoops: 2,
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
  force = false,
): Record<string, unknown> {
  const sectionEvidenceDir = path.join(writingDir, 'section-evidence');
  const cachePath = path.join(sectionEvidenceDir, `${sectionId}.evidence.json`);

  if (!force && fs.existsSync(cachePath)) {
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

10. MAX 2 IDEAS PER PARAGRAPH.

   One analytical paragraph = one finding. State it in sentence 1. Explain why
   in sentences 2–3. Draw the implication in sentence 4 at most. If you need
   sentence 5, you have a second idea — start a new paragraph.

   FORMULA: FINDING → EXPLANATION → EXAMPLE → IMPLICATION

11. SENTENCE BUDGET: average sentence under 20 words. Hard cap 35 words.
   If a sentence joins two clauses with "which", "and", or "that says", split it.
   Long sentences bury the finding. Short sentences land the punch.

   BAD:  "The headline shifted from features to outcomes, which often signals an ICP
          narrowing driven by competitive pressure, and this is consistent with the CTA
          change and the navigation simplification, which together suggest a buyer
          qualification shift, meaning the page is now filtering for a specific
          company stage rather than welcoming all comers."
          (4 ideas stacked; reader must hold everything at once.)

   GOOD: "The headline stopped naming a category and started assuming the reader
          already knows what the product does. That is a shift from explaining to
          qualifying — the page now filters for buyers who arrive informed.
          Test it: if your own headline still contains words like 'platform' or
          'solution', it is probably still in explanation mode."
          (One idea: headline-as-filter. Three sentences. Takeaway at the end.)

─── STYLE REFERENCE — plain writing rules ───────────────────────────────────

These rules apply to every section. Check your draft against them before submitting.

  • Write like you are explaining to a smart client on a call — not drafting a report.
  • Use short sentences. Use short paragraphs. Vary them.
  • Start with the problem or finding. Do not build up to it.
  • Every section answers one clear question. Do not cover two topics in one section.
  • Use examples. A before/after quote or a concrete scenario beats an abstract claim.
  • Be specific. "14 new headings added" is more useful than "significant structural change".
  • Useful beats clever. If a sentence sounds smart but is hard to understand, rewrite it.
  • Clarity wins. Simple converts better than complicated.

─── THE SELF-CHECK — RUN BEFORE YOU SUBMIT ──────────────────────────────────

Before producing your final output, mentally walk this checklist on your own draft.
Rewrite any line that fails.

  [ ] Did I use any term from the FORBIDDEN list more than once?
      → If yes, replace the second use with plain language.

  [ ] Are there sentences with three or more abstract nouns in a row?
      → If yes, rewrite with concrete subjects (a person, an action, an outcome).

  [ ] Did I make any "this caused X" claim without attaching a condition?
      → If yes, add "if [specific condition]" or hedge with "may" / "suggests".

  [ ] Is any paragraph over 60 words? Count every paragraph.
      → Intro: hard cap 90 words. All other sections: hard cap 60 words.
      → If the section instruction specifies a tighter cap (e.g. 55 words), that takes precedence.
      → If any paragraph exceeds its cap, split it before submitting. No exceptions.

  [ ] Does any paragraph contain more than 2 distinct ideas?
      → If yes, split it. One paragraph = one finding.

  [ ] Does each analytical paragraph state its finding within the first 2 sentences?
      → If no, move the finding up. Do not build to it.

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
  PENALISE -8 per named CTA or navigation item in section 05 that does NOT appear verbatim
    in the ctaAdded, ctaRemoved, navAdded, or navRemoved arrays of the evidence.
  PENALISE -5 per financial figure, date, or named event in section 07 that is not hedged
    with "reportedly", "according to public reports", or equivalent hedge language.
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

  READABILITY RULES (density and structure — scored within this dimension):
  PENALISE -3 if any analytical paragraph contains more than 2 distinct ideas
    (concepts the reader must track simultaneously).
  PENALISE -3 if an analytical paragraph does not state its finding within the
    first 2 sentences — the finding must come first, not at the end.
  PENALISE -3 if the section reads like a strategic memo or consultant report
    rather than a plain explanation to a smart founder.
  PENALISE -3 if the closing sentence of an analytical paragraph is abstract
    ("this reflects a broader shift toward...") rather than concrete or actionable.
  FORMULA CHECK: every analytical paragraph should follow
    FINDING → EXPLANATION → EXAMPLE → IMPLICATION.
    If a paragraph cannot be mapped to this formula, it likely needs to be split.
  SENTENCE LENGTH:
  PENALISE -3 if more than 12% of sentences in the section exceed 30 words.
  PENALISE -2 if any single sentence exceeds 45 words.

• scannability (max 15)
  Section works for a Google reader who skims.
  PENALISE -4 per paragraph over 60 words (intro exempt, capped at 90).
  PENALISE -5 if an analytical section (03/04/05/06) is missing its H3 subheadings.
  PENALISE -4 per H3 block whose body contains any single paragraph exceeding 60 words.
  PENALISE -3 if the practical takeaway is buried — not in the first two sentences of an H3 block.
  HARD CAP: if any single paragraph exceeds 90 words (regardless of section) → cap scannability at 5.

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
  outlineOverride?: { customH2: string | null; customGoal: string } | null,
): string {
  const meta = getSectionMeta(sectionId);
  const forbiddenBlock =
    meta.forbiddenPhrases && meta.forbiddenPhrases.length > 0
      ? `\nFORBIDDEN PHRASES — never use any of these, not even partially:\n${meta.forbiddenPhrases.map(p => `  • "${p}"`).join('\n')}`
      : '';

  const effectiveGoal = outlineOverride?.customGoal ?? meta.goalDescription;
  const h2Override = outlineOverride?.customH2
    ? `\nOUTLINE H2 (use this exact heading, not the default): ${outlineOverride.customH2}`
    : '';

  return `Write the ${meta.title} section for a CRO teardown article about ${String(evidence.companyName ?? 'the company')}.

SECTION GOAL: ${effectiveGoal}${h2Override}
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
  outlineOverride?: { customH2: string | null; customGoal: string } | null,
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

  const h2Override = outlineOverride?.customH2
    ? `\nOUTLINE H2 (use this exact heading — do not revert to the default): ${outlineOverride.customH2}`
    : '';

  return `Rewrite the ${meta.title} section to fix specific editorial issues.

SECTION ID: ${sectionId}
CRITIC SCORE: ${criticResult.score}/100 (needs ≥ ${minScore} to pass)
${structuralDirective}
WRITER INSTRUCTION (follow this structure when doing a structural rewrite):
${meta.writerInstruction}${h2Override}
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
  /** Force evidence re-build even if the cache file already exists. */
  forceEvidence?: boolean;
  /**
   * Phase 4P: force a specific writer/rewriter model for ALL sections,
   * overriding each section's writerModel (e.g. run analytical sections on
   * Sonnet instead of their default Opus). Critic model is unaffected.
   */
  writerModelOverride?: string;
  /**
   * Layer 3.5 outline override: custom H2 heading and goal for this section.
   * When provided, the outline's brand-specific H2 and goal replace the
   * generic SECTION_META defaults in the writer prompt.
   */
  outlineOverride?: {
    customH2:   string | null;
    customGoal: string;
  };
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
  // Per-section pass threshold override (e.g. 03-visual-timeline: 80, others: 85)
  const minScore = getSectionMeta(sectionId).minScore ?? (opts.minScore ?? CRITIC_PASS_SCORE);
  const draftOnly = opts.draftOnly ?? false;
  const costBefore = tracker.totalCostUsd;

  // ── Evidence ────────────────────────────────────────────────────────────────
  const evidence = buildAndCacheSectionEvidence(sectionId, writingDir, opts.forceEvidence ?? false);
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
      messages: [{ role: 'user', content: buildWriterPrompt(sectionId, evidence, opts.outlineOverride) }],
      maxTokens: 2048,
      cacheSystem: true,
    }),
    { onRetry: (a, e, d) => onLog(`Writer retry ${a}`, false, `${e.message} (${d}ms)`) },
  );
  tracker.add(computeCallCost(writerModel, 'writer', writerResp.inputTokens, writerResp.outputTokens, writerResp.cacheReadTokens, writerResp.cacheCreationTokens));
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
        cacheSystem: true,
      }),
      { onRetry: (a, e, d) => onLog(`Critic retry ${a}`, false, `${e.message} (${d}ms)`) },
    );
    tracker.add(computeCallCost(criticModel, `critic-v${ver}`, resp.inputTokens, resp.outputTokens, resp.cacheReadTokens, resp.cacheCreationTokens));

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
      sectionId, evidence, currentDraft, lastCritic, minScore, opts.outlineOverride,
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
        cacheSystem: true,
      }),
      { onRetry: (a, e, d) => onLog(`Rewriter retry ${a}`, false, `${e.message} (${d}ms)`) },
    );
    tracker.add(computeCallCost(rewriterModel, `rewriter-v${nextVer}`, rwResp.inputTokens, rwResp.outputTokens, rwResp.cacheReadTokens, rwResp.cacheCreationTokens));
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
