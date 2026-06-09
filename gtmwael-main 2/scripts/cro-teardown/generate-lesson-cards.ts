/**
 * generate-lesson-cards.ts
 *
 * Replaces the hardcoded lesson-cards template (which currently generates the
 * "Patterns worth borrowing" block with identical H3 titles in every article)
 * with an LLM call that produces 4 unique cards per company.
 *
 * OUTPUT: writes data/cro-teardowns/[slug]/writing/section-evidence/lesson-cards.json
 *         in the SAME schema the existing React template already consumes — so
 *         no template changes are needed downstream.
 *
 * Each card has:
 *   • number   — "01" through "04"
 *   • title    — case-specific observation, NOT a generic principle
 *   • category — varies per card from a pool (Messaging / Navigation / Positioning /
 *                Brand / Funnel / Trust / Strategy / CRO / Pricing)
 *   • body     — 50–70 words, plain language, website quotes bolded
 *
 * Voice rules from writer-system-v5 apply: plain explainer, no jargon overuse,
 * hedged inferences, no causation claims.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { callLLM } from './llm/anthropic-client.js';
import { getModel } from './llm/model-router.js';
import { CostTracker, computeCallCost } from './llm/token-cost.js';
import { withRetry } from './llm/retry.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LessonCard {
  number: string;
  title: string;
  category: string;
  body: string;
}

export interface GenerateLessonCardsOpts {
  slug: string;
  writingDir: string;
  tracker: CostTracker;
  /** Defaults to the 'writer' role model. Pass 'judge' to use Opus for higher-quality titles. */
  model?: string;
  /** Number of cards to generate. Default 4 to match the existing template. */
  cardCount?: number;
  onLog: (step: string, ok: boolean, detail?: string) => void;
}

export interface GenerateLessonCardsResult {
  cards: LessonCard[];
  costUsd: number;
  model: string;
  outputPath: string;
  generatedAt: string;
}

// ─── JSON extraction ──────────────────────────────────────────────────────────

function extractJson(text: string): string | null {
  try { JSON.parse(text.trim()); return text.trim(); } catch {}
  const block = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (block) { try { JSON.parse(block[1].trim()); return block[1].trim(); } catch {} }
  const first = text.indexOf('{');
  const last  = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const c = text.slice(first, last + 1);
    try { JSON.parse(c); return c; } catch {}
  }
  return null;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const LESSON_CARDS_SYSTEM =
`You generate the "Patterns worth borrowing" card block for a CRO teardown article.

The reader is SEO traffic from Google. They scan this block. They will skip past
generic-sounding titles. Your one job: produce four cards that are SPECIFIC TO
THIS COMPANY — not interchangeable principles.

Output ONLY valid JSON. No text before or after the JSON object.

─── THE PROBLEM YOU ARE SOLVING ────────────────────────────────────────────

The previous version of these cards used identical titles in every article:
  • "Your H1 signals which buyer you are targeting"
  • "Navigation is a positioning statement"
  • "Section headings reveal what the team thinks buyers care about"
  • "Incremental changes compound into a brand shift"

These titles are TRUE but they apply to every company. After two articles, the
reader knows the structure and stops reading. Your job is to fix that.

─── TITLE RULES — non-negotiable ───────────────────────────────────────────

EVERY TITLE must include at least ONE of:
  (a) The company name explicitly ("Shopify removed every 'Explore' link")
  (b) A direct quote from the company's website ("'Be the next AI all-star' is not
       a headline for first-time founders")
  (c) A specific number from this teardown ("8 navigation items removed is not
       simplification — it is a positioning decision")

BANNED title patterns — these are too generic:
  ✗ "Your H1 signals..."
  ✗ "Navigation is a positioning statement"
  ✗ "Section headings reveal..."
  ✗ "Your [thing] tells you who you are targeting"
  ✗ Any title that starts with "Your" and contains a generic noun

GOOD title shape:
  ✓ "Shopify dropped 'Start your business' from every navigation menu"
  ✓ "Intercom's new meta description does not promise a free trial — that is a sales-motion change"
  ✓ "When a company removes 8 'Explore' CTAs, it is filtering, not simplifying"

─── BODY RULES ──────────────────────────────────────────────────────────────

Each body is 50–70 words. One short paragraph.
Plain language. No strategist-to-strategist jargon.

FORBIDDEN words in the body (these are search-hostile and reader-hostile):
  procurement-stage · discovery-stage · qualification filter · category ownership
  aspiration positioning · identity recruitment · intent signal · working memory
  buyer-stage mismatch · friction-to-commitment ratio

Replace with plain language: "buyers who already know what they want",
"people still researching", "the page filters out casual visitors".

Bold every verbatim website quote: **"quoted text"**.

Hedge inferences (suggests, signals, indicates, may, likely, points to).
Never hedge facts ("the headline changed" is a fact — do not hedge it).
Never claim outcome ("this caused conversions to drop").

─── CATEGORY POOL — vary across the 4 cards ────────────────────────────────

Pick from: Messaging · Navigation · Positioning · Brand · Funnel · Trust ·
Strategy · CRO · Pricing · Onboarding

Rule: at least 3 different categories across the 4 cards. Do not use the same
category twice unless the evidence makes it unavoidable.

─── COVERAGE — the four cards should span the article ──────────────────────

The four cards together should give a reader who skims ONLY this block a complete
picture. Try to cover:
  Card 1 — the biggest visible change (usually headline or messaging)
  Card 2 — the navigation or CTA shift (the conversion path change)
  Card 3 — the section-heading or structural shift (what the team prioritises now)
  Card 4 — the meta-pattern (what the evolution as a whole says)

But the EVIDENCE leads. If this company shows nothing interesting in navigation,
do not force a navigation card — pick a more interesting angle from the evidence.

─── SELF-CHECK BEFORE OUTPUT ───────────────────────────────────────────────

Walk this checklist on your own draft before submitting:

  [ ] Does EVERY title name the company, quote the company, or cite a specific number?
      → If any title is generic, rewrite it.

  [ ] Are there at least 3 different categories across the 4 cards?
      → If not, vary them.

  [ ] Does any body contain a forbidden jargon term?
      → If yes, replace with plain language.

  [ ] Is every verbatim website quote bolded (**"like this"**)?
      → If not, fix the formatting.

  [ ] Did I claim any outcome ("this increased X", "this caused Y")?
      → If yes, rewrite as observation with a hedged inference.`;

// ─── User prompt builder ─────────────────────────────────────────────────────

interface EvidenceBag {
  companyName: string;
  companyUrl: string;
  fromLabel: string;
  toLabel: string;
  snapshotCount: number;
  [key: string]: unknown;
}

function buildUserPrompt(
  evidence: EvidenceBag,
  cardCount: number,
): string {
  return `Generate ${cardCount} "Patterns worth borrowing" cards for ${evidence.companyName}.

CONTEXT:
  Company: ${evidence.companyName} (${evidence.companyUrl})
  Period:  ${evidence.fromLabel} → ${evidence.toLabel}
  Snapshots: ${evidence.snapshotCount}

ALL EVIDENCE FILES (use only what is here — do not invent):
${JSON.stringify(evidence, null, 2)}

Return the JSON object now. Required shape:
{
  "cards": [
    {
      "number": "01",
      "title": "<case-specific title — names the company OR quotes their text OR cites a number>",
      "category": "<one of: Messaging / Navigation / Positioning / Brand / Funnel / Trust / Strategy / CRO / Pricing / Onboarding>",
      "body": "<50–70 words. Plain language. Bold verbatim quotes. Hedge inferences.>"
    }
    // ... ${cardCount} cards total
  ]
}`;
}

// ─── Validation ──────────────────────────────────────────────────────────────

const FORBIDDEN_JARGON = [
  'procurement-stage',
  'discovery-stage',
  'qualification filter',
  'category ownership',
  'aspiration positioning',
  'identity recruitment',
  'intent signal',
  'working memory',
  'buyer-stage mismatch',
  'friction-to-commitment ratio',
];

const BANNED_TITLE_PATTERNS = [
  /^your h1 signals/i,
  /^navigation is a positioning statement$/i,
  /^section headings reveal/i,
  /^incremental changes compound/i,
  /^your [a-z]+ (signals|tells you|reveals)/i,
];

/**
 * Validates a card set against the rules in the prompt.
 * Returns warning strings — empty array means clean.
 */
function validateCards(cards: LessonCard[], companyName: string): string[] {
  const warnings: string[] = [];
  const companyLower = companyName.toLowerCase();
  const categories = new Set<string>();

  for (const [i, card] of cards.entries()) {
    const cardLabel = `card ${i + 1}`;

    // 1. Title must be case-specific.
    const titleLower = card.title.toLowerCase();
    const hasCompanyName = titleLower.includes(companyLower);
    const hasQuote = /["“][^"”]+["”]/.test(card.title);
    const hasNumber = /\d/.test(card.title);
    if (!hasCompanyName && !hasQuote && !hasNumber) {
      warnings.push(`${cardLabel}: title lacks company name, quote, or number — likely generic`);
    }
    // 2. Title must not match banned patterns.
    for (const pat of BANNED_TITLE_PATTERNS) {
      if (pat.test(card.title)) {
        warnings.push(`${cardLabel}: title matches banned generic pattern — "${card.title}"`);
        break;
      }
    }
    // 3. Body must not contain forbidden jargon.
    const bodyLower = card.body.toLowerCase();
    for (const term of FORBIDDEN_JARGON) {
      if (bodyLower.includes(term)) {
        warnings.push(`${cardLabel}: body uses forbidden term "${term}"`);
      }
    }
    // 4. Body must be 50–70 words (allow ±10% slack).
    const wc = card.body.split(/\s+/).filter(Boolean).length;
    if (wc < 45 || wc > 80) {
      warnings.push(`${cardLabel}: body is ${wc} words — target 50–70`);
    }
    // 5. No outcome / causation claims.
    if (/\bthis (caused|increased|drove|improved|reduced)\b/i.test(card.body)) {
      warnings.push(`${cardLabel}: body makes a causation claim — must be hedged`);
    }
    categories.add(card.category);
  }
  // 6. At least 3 different categories.
  if (categories.size < 3 && cards.length >= 4) {
    warnings.push(`only ${categories.size} unique categories across ${cards.length} cards — needs ≥3`);
  }
  return warnings;
}

// ─── Evidence loader ──────────────────────────────────────────────────────────

function loadEvidenceBag(writingDir: string, slug: string): EvidenceBag {
  const gdPath = path.join(writingDir, 'generated-article-data.json');
  if (!fs.existsSync(gdPath)) {
    throw new Error(`generated-article-data.json not found at ${gdPath}`);
  }
  const gd = JSON.parse(fs.readFileSync(gdPath, 'utf-8')) as {
    companyName?: string; companyUrl?: string;
    fromLabel?: string; toLabel?: string;
    snapshots?: unknown[];
  };

  const evidence: EvidenceBag = {
    companyName: gd.companyName ?? slug,
    companyUrl:  gd.companyUrl  ?? '',
    fromLabel:   gd.fromLabel   ?? '',
    toLabel:     gd.toLabel     ?? '',
    snapshotCount: Array.isArray(gd.snapshots) ? gd.snapshots.length : 0,
  };

  // Pull in the supporting evidence files so the model has the full picture.
  const evDir = path.join(writingDir, 'section-evidence');
  const sources = ['messaging', 'cta-changes', 'h2-changes', 'analysis-blocks', 'summary-cards'];
  for (const src of sources) {
    const p = path.join(evDir, `${src}.json`);
    if (fs.existsSync(p)) {
      try {
        evidence[src] = JSON.parse(fs.readFileSync(p, 'utf-8'));
      } catch {
        // Skip malformed files silently — they will just not contribute evidence.
      }
    }
  }
  return evidence;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generateLessonCards(
  opts: GenerateLessonCardsOpts,
): Promise<GenerateLessonCardsResult> {
  const { slug, writingDir, tracker, onLog } = opts;
  const cardCount = opts.cardCount ?? 4;
  const model = opts.model ?? getModel('writer');
  const costBefore = tracker.totalCostUsd;

  // ── Load evidence ──────────────────────────────────────────────────────────
  const evidence = loadEvidenceBag(writingDir, slug);
  onLog(`Lesson cards [${model}]`, true, `${cardCount} cards — calling API…`);

  // ── Call the LLM ───────────────────────────────────────────────────────────
  const resp = await withRetry(
    () => callLLM({
      model,
      system: LESSON_CARDS_SYSTEM,
      messages: [{ role: 'user', content: buildUserPrompt(evidence, cardCount) }],
      maxTokens: 2048,
    }),
    { onRetry: (a, e, d) => onLog(`Lesson cards retry ${a}`, false, `${e.message} (${d}ms)`) },
  );
  tracker.add(computeCallCost(model, 'lesson-cards', resp.inputTokens, resp.outputTokens));

  // ── Parse ──────────────────────────────────────────────────────────────────
  const jsonStr = extractJson(resp.content);
  if (!jsonStr) {
    throw new Error(
      `Could not extract JSON from lesson-cards response.\nFirst 500:\n${resp.content.slice(0, 500)}`,
    );
  }
  const parsed = JSON.parse(jsonStr) as { cards?: unknown };
  if (!Array.isArray(parsed.cards)) {
    throw new Error('Lesson-cards response has no "cards" array.');
  }

  const cards: LessonCard[] = parsed.cards
    .filter((c): c is Record<string, unknown> => typeof c === 'object' && c !== null)
    .map((c, i) => ({
      number:   typeof c.number   === 'string' ? c.number   : String(i + 1).padStart(2, '0'),
      title:    typeof c.title    === 'string' ? c.title.trim()    : '',
      category: typeof c.category === 'string' ? c.category.trim() : 'Strategy',
      body:     typeof c.body     === 'string' ? c.body.trim()     : '',
    }))
    .filter(c => c.title && c.body)
    .slice(0, cardCount);

  if (cards.length < cardCount) {
    throw new Error(
      `Lesson-cards: expected ${cardCount} cards, got ${cards.length} valid ones.`,
    );
  }

  // ── Validate against rules — warnings, not hard failures ──────────────────
  const warnings = validateCards(cards, evidence.companyName);
  for (const w of warnings) onLog('Lesson cards: ⚠', false, w);

  // ── Write output (same path/schema the existing template consumes) ─────────
  const outputPath = path.join(writingDir, 'section-evidence', 'lesson-cards.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2), 'utf-8');

  const costUsd = tracker.totalCostUsd - costBefore;
  onLog(
    'Lesson cards',
    warnings.length === 0,
    `${cards.length} cards, ${warnings.length} warning(s) — $${costUsd.toFixed(4)}`,
  );

  return {
    cards,
    costUsd,
    model,
    outputPath,
    generatedAt: new Date().toISOString(),
  };
}
