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
  // ── Phase 4C canonical — 5-section architecture (Phase 4V+) ─────────────────
  '01-intro': {
    title: 'Introduction',
    goalDescription:
      'One paragraph. Names the company, period, and single clearest shift. ' +
      'Reads like the first line of a Win Report — specific enough that the reader ' +
      'knows exactly what they are about to learn and why it matters to them.',
    writerInstruction:
`SECTION ROLE: Make the reader need to know what happened.

BEFORE YOU WRITE — find in the evidence:
  • What changed most visibly between the first and last snapshot?
  • Is there anything surprising, counterintuitive, or ironic about that change?
  • What is the one thing a SaaS founder would immediately want to understand?

ENTRY OPTIONS — pick the one your evidence supports:
  FINDING   → "[Company] rewrote its homepage headline three times in four years.
               By the end, it was selling a different product to a different buyer."
  PARADOX   → "[Company] had [X]. And then it removed all of it."
  CONTRAST  → "In [year], [Company]'s homepage said [X]. Today it says [Y].
               This teardown maps what shifted, and what it may signal."

REQUIRED BEATS (in any order):
  1. Company name and period — in the first sentence
  2. The single clearest shift — stated directly, not teased
  3. One sentence that tells the founder what they will be able to test on their
     own homepage after reading this

RULES:
  • No heading — do NOT output a ## line. Start with the paragraph directly.
  • One paragraph only. Under 90 words.
  • No page elements (H1, nav, CTA labels) mentioned here — they belong in analysis.
  • No hedge in the first sentence. State the shift directly.`,
    wordRange: { min: 55, max: 90 },
    maxRewriteLoops: 0,
    criticMaxTokens: 4096,
  },

  '03-visual-timeline': {
    title: 'The Belief Shift',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'Names the belief the homepage now asks visitors to accept — and what it ' +
      'asked before. Identifies the psychological mechanism. Names the tradeoff. ' +
      'Ends with a founder test they can run today.',
    writerInstruction:
`SECTION ROLE: Show what the homepage now asks visitors to BELIEVE — not just what it says.

BEFORE YOU WRITE — interrogate the evidence:
  • What assumption about the market does the new homepage embed?
    (e.g. "visitors already know they need this category" / "AI is table stakes")
  • What did the OLD homepage assume about the visitor?
  • Is the shift from a PRODUCT CLAIM to a CATEGORY CLAIM? Or from OUTCOME to IDENTITY?
  • Is there anything ironic or counterintuitive about what got removed?

ENTRY OPTIONS — pick the one your evidence supports:
  FINDING      → Lead with what the page now requires the visitor to already believe.
                 "To respond to [Company]'s current headline, you have to already
                  believe that [X]. The 2023 version made no such demand."
  PARADOX      → Lead with what the company gave up. "The old headline worked for
                  anyone who wanted [X]. The new one only works if you accept [Y]."
  MECHANISM    → Name the GTM pattern first. "There is a positioning move called
                  [mechanism name]. [Company]'s homepage shows every signal of it."
  CONTRAST     → Old headline vs new headline in two sentences. Then interrogate the gap.

REQUIRED BEATS:
  1. A specific quoted headline or heading change — bolded, dated
  2. The named mechanism: what GTM or buyer-psychology pattern is this?
     (e.g. "category claim," "identity recruitment," "market assumption shift,"
     "aspiration positioning," "credibility-to-outcome pivot")
  3. What the new positioning ASSUMES about the visitor — stated as an assumption,
     hedged only once
  4. The tradeoff — one sentence, not labeled: what this gains vs what it gives up
  5. Founder test — last sentence: a specific condition they can check right now

2–3 paragraphs. Each under 90 words.
DO NOT identify buyers here — that is the next section's job.`,
    wordRange: { min: 140, max: 220 },
    criticMaxTokens: 8192,
  },

  '04-messaging-evolution': {
    title: 'The Buyer Shift',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'Names who the page now appears to be written for, who it was written for ' +
      'before, and what specific language changes signal that shift. Names the ' +
      'buyer stage and decision context the new page targets.',
    writerInstruction:
`SECTION ROLE: Name the buyer. Show the language evidence. Name what changed in the selling motion.

BEFORE YOU WRITE — interrogate the evidence:
  • Who does the OLD vocabulary serve? (beginners, team leads, growth operators, procurement...)
  • Who does the NEW vocabulary serve? (different stage? different committee member? different awareness level?)
  • What specific words EXITED that signal the old buyer? What ENTERED that signal the new one?
  • What decision stage does the new language target?
    (awareness / consideration / procurement / expansion)
  • Is there a buying-committee shift? (end user → economic buyer, team lead → CTO...)

ENTRY OPTIONS — pick the one your evidence supports:
  CONTRAST      → Two buyers, two sentences. "The old page spoke to [buyer A].
                   The new one speaks to [buyer B]." Then show the language evidence.
  PRACTITIONER  → What only someone who has done B2B sales would notice.
                  "No company rewrites 'Start your business' to 'All-in-one platform'
                   to serve the same buyer. That is a different sales conversation."
  OBJECTION     → Surface the question the founder reader is already forming.
                  "The obvious question: who exactly is [Company] talking to now?"
  MECHANISM     → Name the sales-motion shift first.
                  "This is a motion change — from product-led to sales-assisted.
                   The language shift is the evidence."

REQUIRED BEATS:
  1. Old buyer vs new buyer — named specifically, not as "different audience"
  2. Specific quoted language changes — meta description, H1, CTA labels, nav items — bolded
  3. Named mechanism: what selling motion, buyer stage, or decision context does this serve?
     (e.g. "procurement-stage buyer," "category-aware evaluator," "expansion motion,"
     "demo-first sales cycle," "ICP narrowing")
  4. What this targeting change COSTS — who is now underserved by the page
  5. Founder test — last sentence: "Who is YOUR homepage currently written for —
     and is that the buyer who actually shows up to sales calls?"
     (make it specific to what this evidence showed, not generic)

2–3 paragraphs. Each under 90 words.
State the self-serve→enterprise shift HERE if applicable — do not repeat it in other sections.`,
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
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'Shows how the conversion path changed. Names the friction-to-commitment ' +
      'ratio shift. Explains who this path now serves and who it filters out.',
    writerInstruction:
`SECTION ROLE: Show the funnel architecture change. Name what it filters. Name the cost.

BEFORE YOU WRITE — interrogate the evidence:
  • Did the CTA set EXPAND or CONTRACT? (more options vs fewer, more friction vs less)
  • What STAGE of the buyer journey did removed CTAs serve?
    (awareness / consideration / trial intent / direct purchase)
  • What do the ADDED CTAs assume the visitor already knows or believes?
  • Is there a signal about expected sales cycle length in these changes?
  • What type of visitor does this new path FILTER OUT vs CAPTURE?

ENTRY OPTIONS — pick the one your evidence supports:
  FINDING      → Lead with the count or the most striking single removal.
                 "Every mid-funnel CTA disappeared. What replaced them assumes
                  the visitor already knows what they want."
  PARADOX      → Lead with what seems contradictory.
                 "[Company] added more CTAs but reduced the paths to conversion."
  PRACTITIONER → What a funnel architect would immediately notice.
                 "Four entry points became two. That is not simplification —
                  that is a qualification decision."
  CONTRAST     → Old CTA set vs new, then name the funnel theory behind the change.

REQUIRED BEATS:
  1. Specific old CTA labels vs new — bolded, the actual text
  2. What the removed CTAs were serving (buyer stage, intent level)
  3. Named mechanism: what funnel or sales concept explains this?
     (e.g. "qualification filter," "intent signal," "friction-to-commitment ratio,"
     "mid-funnel collapse," "self-selection architecture")
  4. Who this path CANNOT serve anymore — named specifically
  5. Founder test — last sentence: a specific audit they can run on their own CTA set
     (e.g. "count how many of your CTAs require zero commitment — and what % of
      trials they generate")

2 tight paragraphs. Each under 90 words.
State CTA friction direction ONCE here — do not restate in the lessons section.`,
    wordRange: { min: 120, max: 200 },
    criticMaxTokens: 8192,
  },

  '06-lessons-for-saas-teams': {
    title: 'The Marketing Maturity Lesson',
    writerModel: 'claude-opus-4-5',
    goalDescription:
      'Names the meta-pattern this evolution represents. Names the prerequisite ' +
      'that made it viable for THIS company. Tells founders what to check before ' +
      'copying it. Does not restate what was already shown in the analysis sections.',
    writerInstruction:
`SECTION ROLE: Name the pattern. Give the prerequisite. Name who should NOT copy this.

BEFORE YOU WRITE — interrogate the evidence:
  • What is the meta-pattern? (e.g. "brand-led positioning replacing category-led,"
    "identity recruitment replacing product education," "proof removal at scale")
  • What does this company have that MAKES this evolution viable?
    (brand recognition, market share, word-of-mouth, category ownership...)
  • What would happen to a company WITHOUT that prerequisite that tried to copy this?
  • Is there a specific risk the new positioning creates downstream?
    (onboarding mismatch, proof burden, buyer expectation gap...)
  • What is the ONE test a founder can run to know whether they are ready for this move?

ENTRY OPTIONS — pick the one your evidence supports:
  WARNING      → Open with who should NOT copy this before telling anyone to admire it.
                 "Do not copy this. Not unless [specific prerequisite] is already true."
  MECHANISM    → Name the pattern class first — then show this company as the example.
                 "[Pattern name] is when a market leader [description]. This is what
                  [Company]'s evolution looks like from the outside."
  PRACTITIONER → What a GTM advisor would tell a client who said "I want to do what
                  [Company] did." Name the condition check before the enthusiasm.
  PARADOX      → Name what seems like a mistake before explaining why it was not —
                 for THEM, given what they had.

REQUIRED BEATS:
  1. The meta-pattern — named in one sentence, not restated from earlier sections
  2. The specific prerequisite THIS company had — concrete, not vague
     ("Shopify's URL completes the category sentence before the headline loads"
      is concrete. "They had strong brand awareness" is not.)
  3. What happens to a company that copies this without the prerequisite — name it
  4. The tradeoff of the WHOLE EVOLUTION — one sentence summing the entire arc
  5. Founder test — last sentence: a specific, named condition to check before
     making a similar move on their own homepage. A real test, not a platitude.

3 short paragraphs. Each under 90 words.
Do NOT restate the belief shift, buyer shift, or funnel shift — add the new layer only.`,
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
`You are writing one section of a CRO teardown article for B2B SaaS founders.

Your reader has 90 seconds of patience. They are smart, skeptical, and have seen
a hundred surface-level "lessons" articles. They will stop reading the moment they
sense a template. Your job is to give them something they have not thought of before,
backed by evidence they can verify themselves.

─── VOICE ───────────────────────────────────────────────────────────────────────

Study how Conversion Rate Experts writes their Win Reports. These are the specific
patterns you must replicate:

FINDING FIRST, EXPLANATION SECOND.
State what happened. Then ask why. Never build to the reveal.
Wrong: "When we look at how Intercom evolved its homepage, we can observe..."
Right: "Intercom dropped every CTA that required zero commitment. Here is why that matters."

SHORT SENTENCE. THEN A LONGER ONE THAT EXPLAINS IT. THEN SHORT AGAIN.
Vary rhythm like a practitioner talking, not an editor writing.
Wrong: "The headline changed significantly over the three-year period, shifting from a product-outcome framing that addressed immediate user needs to a more category-defining claim."
Right: "The headline changed twice. First it named what the product does. Then it named what the buyer should become."

NAME THE PSYCHOLOGICAL MECHANISM.
CRE names "intention-action gap," "temporal discounting," "effort heuristic."
You must name the GTM or buyer-psychology mechanism behind each observation.
Not: "removing CTAs may have filtered for higher-intent visitors"
Yes: "this is a qualification filter — a deliberate friction increase that trades volume for intent signal"

NEVER ANNOUNCE YOUR STRUCTURE.
No "The tradeoff is X vs Y." No "**So what?**" No "In this section..."
The tradeoff must be named — but as a sentence, not a label.
The founder takeaway must land — but as the last sentence, not a section header.
Wrong: "**So what?** Ask whether your page is doing the same."
Right: "Ask whether your page is doing the same — before your next ad campaign does it for you."

TREAT THE READER AS SMART.
Plant the question before the answer. "Notice what is missing from that list."
Let them arrive one beat before you explain. Then confirm.

HEDGING RULE — practitioner precision, not legal caution:
Hedge the MECHANISM (why it works), never the FINDING (what changed).
Wrong: "This can be read as a possible move toward..."
Right: "The headline changed. Whether that was a deliberate repositioning or a copy refresh is not verifiable — but the effect on buyer signal is visible."
Hedging every sentence makes you sound like you don't know what you are talking about.
Hedge once, precisely, where the inference actually carries risk.

─── ENTRY POINT — the most important rule in this prompt ─────────────────────

Before you write a word, ask: "What is the single most interesting thing in this evidence?"

The answer determines how you open. There are six possible entry types. Choose the
one that fits THIS evidence — not the one that fits a template:

  FINDING   — the result or shift is surprising enough to lead with baldly.
               "Shopify removed every 'Explore' CTA. All of them."

  PARADOX   — the company did something counterintuitive given what they had.
               "Intercom had a product people loved. Then it stopped talking about the product."

  PRACTITIONER OBSERVATION — what only someone who has done this work would notice.
               "No sales team rewrites navigation on a whim. Eight items in, eight items out suggests a deliberate audit, not a refresh."

  OBJECTION — surface the question the reader is already asking.
               "The obvious question: why would a company with 25,000 customers stop talking about customer count?"

  CONTRAST  — old vs new in two sentences, then interrogate the gap.
               "2021: 'The platform commerce is built on.' 2026: 'Be the next AI all-star.' That is not a copy update. That is a different value proposition for a different buyer."

  MECHANISM — name the psychology first, then show the evidence that maps to it.
               "There is a GTM pattern called category abandonment — when a market leader stops defending the category and starts recruiting an identity instead. Shopify's homepage shows every signal of it."

Do NOT default to CONTRAST every time because it is the easiest. If the most
interesting thing is a paradox, open on the paradox. Let the evidence lead.

─── MANDATORY CONTENT — every section must contain all four ─────────────────

1. A SPECIFIC FINDING stated directly. One sentence. No hedge on the opening claim.
2. A NAMED MECHANISM — the psychological, GTM, or conversion principle at work.
   Use real terminology: "qualification filter," "category claim," "intent signal,"
   "social proof collapse," "friction-to-commitment ratio," "buyer stage mismatch."
3. A TRADEOFF — not labeled, just named. Two things in tension. One sentence.
   "That trades discovery-stage visitors for procurement-stage buyers."
4. A FOUNDER TEST — the last sentence. A specific question or condition the founder
   can check on their own homepage RIGHT NOW. Not generic advice. A real test.
   Wrong: "Make sure your CTAs match your traffic quality."
   Right: "Open your analytics. If more than 30% of your trial starts come from
   a 'Learn more' click, removing that CTA costs you pipeline, not just traffic."

─── FORMATTING ──────────────────────────────────────────────────────────────

• First line of your response: the ## heading. 6–12 words. Name the actual shift
  for THIS company — not a generic label. Not "The Belief Shift." Not "Messaging Analysis."
  Name what actually happened. "Shopify stopped recruiting beginners" is a heading.
  "Messaging evolution" is not.

• Bold every verbatim quote from the company's website: **"quoted text"**
  This includes headlines, CTA labels, navigation items, section headings, meta descriptions.
  Plain quotes with no bold = required fix.

• No bullet lists unless the section instruction explicitly permits them.
• No paragraph over 90 words.
• No subheadings within a section.

─── HARD RULES — inviolable ─────────────────────────────────────────────────

1. Use ONLY the evidence provided. No invented stats, dates, or claims.
2. Never claim a change improved conversion, increased revenue, or caused any outcome.
3. Never claim company intent: not "Shopify decided to," not "their strategy was to."
4. Every paragraph anchored to THIS company's specific evidence.
   If the paragraph could appear in a teardown of a different company, rewrite it.
5. Never use: "this increased conversions" / "A/B tested" / "this drove revenue" /
   "based on their strategy" / "this improved performance."
6. Use: "from visible evidence" / "the pattern is consistent with" /
   "this functions as" / "the effect is observable even if the intent is not."

─── COMPRESSION — mandatory ──────────────────────────────────────────────────

Each section has ONE job. Make the point. Stop.
The following conclusions appear only ONCE across the entire article:
  • Category claim / belief shift → first analytical section only
  • Self-serve vs enterprise buyer identification → buyer section only
  • CTA friction direction → funnel section only
Do not restate in lessons what was already shown in analysis.`;


// Critic system prompt — threshold is stated in the user prompt so this stays cacheable.
const CRITIC_SYSTEM =
`You are a strict editorial critic for CRO teardown articles about SaaS homepages.
Output ONLY valid JSON. No text before or after the JSON object.
JSON SAFETY: When you quote text from the draft inside any string value (issues, requiredFixes, etc.),
use SINGLE quotes — 'like this'. Never put a raw double-quote character inside a JSON string value;
it breaks the parse. Refer to the draft's bold quotes by their words, not by reproducing **"..."** verbatim.

SCORING RUBRIC — score each dimension, then sum to 100:

• evidenceAccuracy (max 25)
  Every claim traces to the provided evidence. No invented stats, dates, or company names.
  PENALISE -5 per phrase that implies a fact not in the evidence.
  PENALISE -10 per any claim of conversion outcome, revenue impact, or A/B test.
  HARD CAP: any unsupported factual claim → cap total at 70.

• riskControl (max 10)
  Interpretations are appropriately hedged. No causation claimed. No intent attributed.
  BUT: hedging must be precise — one hedge per inference, not a hedge per sentence.
  PENALISE -3 per unlabelled interpretation presented as confirmed fact.
  PENALISE -4 if hedging is mechanical ("can be read as" appearing 3+ times) — this
  signals the writer is protecting themselves, not informing the reader.
  PENALISE -3 if a finding (what changed) is hedged — findings are facts, not inferences.

• specificity (max 15)
  Section is anchored to THIS company's evidence. Zero generic SaaS commentary.
  PENALISE -5 per paragraph that could appear word-for-word in a different company's teardown.
  HARD CAP: if the section could apply to any website without changing a word → cap at 5.

• entryPointOriginality (max 15)
  The opening reflects WHAT THE EVIDENCE MAKES INTERESTING — not a default template.
  The writer had six entry types to choose from (finding / paradox / practitioner /
  objection / contrast / mechanism). The correct choice depends on the evidence.
  PENALISE -8 if the writer defaulted to CONTRAST when a more interesting entry was available.
    Signs of lazy contrast: opening with "Old headline: X / New headline: Y" when
    the paradox, mechanism, or finding was far more compelling.
  PENALISE -6 if the opening is generic (could open any teardown section).
  PENALISE -4 if the opening announces its structure ("In this section we will examine...").
  REWARD: if the opening type is a genuine match to the most interesting aspect of
  the evidence, no deduction — even if it is a contrast. The test is FIT, not novelty.

• mechanismNaming (max 10)
  The section names the psychological, GTM, or conversion principle behind the observation.
  "Qualification filter," "category claim," "intent signal," "buyer stage mismatch,"
  "identity recruitment," "proof removal at scale" — real terminology, not paraphrase.
  PENALISE -6 if no mechanism is named — only observations, no principle.
  PENALISE -3 if the mechanism is vague ("a shift in targeting") rather than named.
  EXEMPT: 01-intro (no mechanism required).

• founderSharpness (max 15)
  Does the section give a founder something specific they can test or decide?
  This requires ALL THREE — check for CONTENT, not for labeled tags:
  (a) A TRADEOFF — two things in tension, named in one sentence. Not labeled "The tradeoff:".
      Just a sentence that makes both sides visible.
  (b) A FOUNDER TEST — the last sentence. A specific condition, question, or audit
      they can run on their own homepage RIGHT NOW. Not generic ("know your audience").
      Specific: "open your analytics and look at what % of trial starts come from
      your highest-friction CTA."
  (c) The test is ANCHORED to what this evidence showed — not a floating principle.
  PENALISE -7 if no tradeoff present (except 01-intro).
  PENALISE -6 if no founder test present (except 01-intro).
  PENALISE -4 if the founder test is generic, unanchored to the evidence.
  PENALISE -3 if either is labeled with a bold header rather than woven in.

• clarity (max 10)
  Punchy. Varied sentence rhythm. No padding. Short sentence. Then a longer explanatory one.
  PENALISE -3 per filler sentence with no evidence anchor.
  PENALISE -3 if all sentences are roughly the same length (monotone — no punch).
  PENALISE -2 per phrase that announces rather than shows ("this demonstrates that...").

HARD CAPS — apply before summing:
  Any conversion outcome claim without data → cap total at 60
  No named mechanism (except intro) → cap total at 75
  No tradeoff present (except intro) → cap total at 75
  No founder test present (except intro) → cap total at 75
  Opening is pure template / could open any teardown → cap entryPointOriginality at 3
  Section is purely descriptive — no mechanism, no buyer psychology → cap total at 65
  "can be read as" or equivalent appears 3+ times → cap riskControl at 4
  Word count exceeds section max (220 / 200 / 240 for analytical sections) → cap total at 80

CALIBRATION:
  90–100: Publication-ready. Real insight, original entry, named mechanism, specific
          founder test, no padding. Reserve this band — do NOT award for accurate-but-flat.
  80–89:  Passes. Has 1–2 fixable issues. requiredFixes must have ≥1 entry.
  70–79:  Needs a rewrite. Usually a template entry point or missing mechanism.
  Below 70: A hard cap fired or the section is mostly generic description.

VARIANCE RULE: If you assign the same score to two or more sections, re-read each
and justify explicitly — or vary the score.

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
  const isIntro = sectionId === '01-intro';
  const introExempt = isIntro ? '\n   EXEMPT: 01-intro.' : '';

  return `Score and diagnose this ${meta.title} section draft.

SECTION ID: ${sectionId}
PASS THRESHOLD: ${minScore}

SECTION GOAL (evaluate whether the draft achieves this):
${meta.goalDescription}

REQUIRED CHECKS — answer each before scoring:
1. Is every paragraph anchored to THIS company's specific evidence (quoted phrases, dated changes, named elements)?
2. Does the section achieve the stated SECTION GOAL above?
3. Are there any paragraphs that could appear word-for-word in a teardown of a different company?
4. Is the hedging PRECISE — one hedge per inference where the inference actually carries risk? Or is it mechanical ("can be read as" appearing 3+ times, hedging every sentence)?
5. ENTRY POINT: Which of the six entry types was used (finding / paradox / practitioner / objection / contrast / mechanism)? Was it the best fit for the most interesting aspect of this evidence, or a default CONTRAST when a stronger move was available?
6. MECHANISM: Is a named GTM, buyer-psychology, or conversion principle present (e.g., "qualification filter," "category claim," "intent signal," "buyer stage mismatch")? Or only observations with no named principle?${introExempt}
7. TRADEOFF: Is a tradeoff woven into the prose as content — two things in tension, one sentence — NOT labeled as "The tradeoff:"?${introExempt}
8. FOUNDER TEST: Is the LAST SENTENCE a specific, actionable test the founder can run on their own homepage right now? Not generic advice ("know your audience") — a real condition or audit ("open your analytics and check what % of trials come from your lowest-friction CTA").${introExempt}
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
    "riskControl": <0–10>,
    "specificity": <0–15>,
    "entryPointOriginality": <0–15>,
    "mechanismNaming": <0–10>,
    "founderSharpness": <0–15>,
    "clarity": <0–10>
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
