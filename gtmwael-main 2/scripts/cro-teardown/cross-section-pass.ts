/**
 * cross-section-pass.ts — Phase 4P: whole-article variety + cohesion editor.
 *
 * Runs AFTER every section has a .final.md but BEFORE article-assembler.ts.
 * One model call (Opus by default) reads all sections together and does the two
 * things the per-section critic loop structurally cannot:
 *
 *   1. DE-DUPLICATE openings and rhythm. If multiple sections open the same way
 *      (e.g. three bold declaratives in a row) it rewrites the offenders so the
 *      article stops feeling templated.
 *   2. INSERT CONNECTIVE TISSUE. Adds at most ONE short transition sentence per
 *      section so the piece reads as one building argument, not five islands.
 *
 * It NEVER touches evidence, quotes, hedging, or factual claims — only the
 * connective/rhythmic layer. Output is written back to each [sectionId].final.md
 * (originals are preserved as [sectionId].pre-cohesion.md).
 *
 * SECURITY: API key handled by anthropic-client.ts only.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { callLLM } from './llm/anthropic-client.js';
import { getModel } from './llm/model-router.js';
import { CostTracker, computeCallCost } from './llm/token-cost.js';
import { withRetry } from './llm/retry.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CrossSectionOpts {
  slug: string;
  sectionsDir: string;
  /** Section IDs in article order. Intro (01) is included but never gets a leading transition. */
  sectionOrder: readonly string[];
  tracker: CostTracker;
  /** Model override. Defaults to the 'rewriter' role; pass 'judge' to use Opus. */
  model?: string;
  onLog: (step: string, ok: boolean, detail?: string) => void;
}

export interface CrossSectionEdit {
  sectionId: string;
  changed: boolean;
  /** What the editor reported doing, for the run log. */
  note: string;
}

export interface CrossSectionResult {
  edits: CrossSectionEdit[];
  sectionsChanged: number;
  /** Set if the model returned a section that wasn't requested, or dropped one. */
  integrityWarnings: string[];
  costUsd: number;
  model: string;
  generatedAt: string;
}

// ─── Delimiter parsing ─────────────────────────────────────────────────────────
//
// The article body is dense with bold website quotes (**"..."**). Round-tripping
// that through JSON is fragile — models routinely emit the inner double-quotes
// unescaped and the whole payload fails to parse. So the editor returns each
// section between literal markers that never occur in markdown, and we slice the
// content out verbatim. Immune to quotes, newlines, and markdown of any kind.

interface ParsedSection {
  note: string;
  content: string;
}

/**
 * Parses blocks of the form:
 *   <<<SECTION 03-visual-timeline | NOTE: varied the opening>>>
 *   ## Heading
 *   body...
 *   <<<END>>>
 * Returns a map of sectionId → { note, content }. Tolerant of stray prose
 * before/after the blocks (model preamble), missing NOTE, and ``` fences.
 */
function parseDelimited(text: string): Record<string, ParsedSection> {
  const out: Record<string, ParsedSection> = {};
  // Tolerant of extra angle brackets the model sometimes emits (e.g. ">>>>").
  const re = /<{3,}SECTION\s+([^\s|>]+)\s*(?:\|\s*NOTE:\s*([^>]*?))?>{3,}\s*\n([\s\S]*?)\n?<{3,}END>{3,}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const id = m[1].trim();
    const note = (m[2] ?? '').trim();
    let content = m[3].trim();
    // Strip an accidental ```...``` wrapper if the model added one.
    const fence = content.match(/^```(?:\w+)?\s*\n([\s\S]*?)\n?```$/);
    if (fence) content = fence[1].trim();
    if (id && content) out[id] = { note, content };
  }
  return out;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const CROSS_SECTION_SYSTEM =
`You are the final-pass editor for a CRO teardown article about a SaaS homepage.
Every section was written and edited in isolation. Your job covers THREE tasks:

TASK 1 — OPENING VARIETY
De-duplicate section openings. If multiple sections open with the same move
(e.g. three bold declaratives in a row), vary two of them — turn one into a
contrast, one into a concrete number, etc.

TASK 2 — CONNECTIVE TISSUE
Add AT MOST ONE short transition sentence per section (except the intro) so the
article reads as one building argument. A transition references what the prior
section established, in <12 words. One sentence at the start. Never a paragraph.

TASK 3 — REDUNDANCY ELIMINATION
This is the most important task. For every analytical conclusion in the article:

  Classify it as one of:
    CALLBACK   = references a prior section's conclusion AND adds new information
                 or a new angle on it → KEEP as-is, it adds value
    REDUNDANT  = restates a prior conclusion without adding anything new →
                 REWRITE: either cut the restatement or reframe it to add new context
    UNIQUE     = appears only once or is distinct enough → KEEP

  How to tell CALLBACK from REDUNDANT:
    Ask: "If the reader has already read the earlier instance, does seeing this again
    change what they understand or what they would do?"
    YES → CALLBACK (keep)
    NO  → REDUNDANT (rewrite)

  What REDUNDANT looks like:
    - Section 3 says "MailerLite moved from product features to outcomes"
    - Section 6 says "The shift away from features toward user outcomes is clear"
    → Section 6's conclusion is REDUNDANT — cut or reframe with new evidence

  What a CALLBACK looks like:
    - Section 3 establishes "MailerLite moved to outcomes messaging"
    - Section 6 says "That outcomes shift (established in the messaging section) also
      shows in the navigation: feature names vanished, replaced by audience stages"
    → Section 6 BUILDS on section 3 with new evidence → CALLBACK, keep it

YOU MAY:
  • Rewrite a section's OPENING (Task 1)
  • Add one transition sentence per section (Task 2)
  • Rewrite or cut REDUNDANT conclusion restatements (Task 3)
  • Tighten a redundant phrase that repeats wording from an earlier section

YOU MAY NOT — these are inviolable:
  × Add, remove, or alter any quoted website text (anything in **bold quotes**).
  × Add any fact, metric, date, company name, or claim not already in the section.
  × Change any hedged interpretation into a stronger or weaker claim.
  × Remove a "So what?" takeaway or a named tradeoff.
  × Change the ## heading text.
  × Make any paragraph exceed 90 words.
  × Reorder or merge sections.
  × Touch the intro section's opening (it is the hook — leave it).
  × Turn a CALLBACK into a REDUNDANT rewrite — callbacks are valuable, never cut them.

Treat bold-quoted text and headings as FROZEN. Edit only the prose around them.

OUTPUT FORMAT — return EVERY section, even unchanged ones, each wrapped in literal markers:

<<<SECTION <sectionId> | NOTE: <what you did in <12 words, or "no change">>>>
<full section text, heading included, verbatim markdown — keep all **bold quotes** exactly>
<<<END>>>

Repeat for each section in order. Output ONLY these blocks. No JSON, no preamble, no commentary
outside the markers. Never alter the marker syntax. The text between the markers is copied to disk
exactly as you write it, so it must be the complete, final section.`;

// ─── Prompt builder ────────────────────────────────────────────────────────────

interface LoadedSection {
  sectionId: string;
  content: string;
}

function buildUserPrompt(sections: LoadedSection[]): string {
  const blocks = sections
    .map(s => `<<<SECTION ${s.sectionId}>>>\n${s.content}\n<<<END>>>`)
    .join('\n\n');

  const idList = sections.map(s => s.sectionId).join(', ');

  return `Here are all sections of the article in order, each between markers. Edit only the connective/rhythmic layer per your rules.

${blocks}

---

Return EVERY section back in the exact output format from the system prompt — even unchanged ones.
Sections to return (these exact ids): ${idList}.
Keep every **bold quote** and every ## heading verbatim. The text between markers is written to disk as-is.`;
}

// ─── Integrity check ───────────────────────────────────────────────────────────

/**
 * Verifies the editor did not violate the frozen-content contract.
 * Returns a list of warnings; an empty list means the edit is safe to apply.
 * On any warning for a given section, the ORIGINAL is kept (fail-safe).
 */
function checkIntegrity(
  original: string,
  edited: string,
): string[] {
  const warnings: string[] = [];

  // 1. Heading must be unchanged.
  const headingOf = (t: string): string | null => {
    const first = t.trim().split('\n')[0]?.trim() ?? '';
    return first.startsWith('## ') ? first : null;
  };
  const origHeading = headingOf(original);
  const editHeading = headingOf(edited);
  if (origHeading !== editHeading) {
    warnings.push(`heading changed: "${origHeading}" → "${editHeading}"`);
  }

  // 2. Every bold-quoted span in the original must survive verbatim.
  const boldQuotes = (t: string): string[] =>
    [...t.matchAll(/\*\*"[^"]*"\*\*/g)].map(m => m[0]);
  const origQuotes = boldQuotes(original);
  for (const q of origQuotes) {
    if (!edited.includes(q)) {
      warnings.push(`dropped or altered bold quote: ${q.slice(0, 60)}`);
    }
  }

  // 3. No new bold quote may be introduced (would imply invented evidence).
  const editQuotes = boldQuotes(edited);
  for (const q of editQuotes) {
    if (!origQuotes.includes(q)) {
      warnings.push(`introduced a new bold quote (possible invented evidence): ${q.slice(0, 60)}`);
    }
  }

  // 4. No paragraph may exceed 90 words.
  for (const para of edited.split(/\n\n+/)) {
    const words = para.split(/\s+/).filter(Boolean).length;
    if (words > 90) {
      warnings.push(`paragraph exceeds 90 words (~${words}w) after edit`);
    }
  }

  // 5. Sanity: edited body shouldn't balloon (a sign the model rewrote wholesale).
  const wc = (t: string) => t.split(/\s+/).filter(Boolean).length;
  const origWc = wc(original);
  const editWc = wc(edited);
  if (editWc > origWc * 1.35) {
    warnings.push(`length grew >35% (${origWc}→${editWc}w) — likely over-rewrite, not a connective pass`);
  }

  return warnings;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export async function runCrossSectionPass(
  opts: CrossSectionOpts,
): Promise<CrossSectionResult> {
  const { slug, sectionsDir, sectionOrder, tracker, onLog } = opts;
  const model = opts.model ?? getModel('rewriter');
  const costBefore = tracker.totalCostUsd;

  // ── Load every section that exists ─────────────────────────────────────────
  const sections: LoadedSection[] = [];
  for (const sectionId of sectionOrder) {
    const finalPath = path.join(sectionsDir, `${sectionId}.final.md`);
    if (!fs.existsSync(finalPath)) {
      onLog('Cross-section: missing', false, `${sectionId}.final.md not found — skipping`);
      continue;
    }
    const content = fs.readFileSync(finalPath, 'utf-8').trim();
    if (content) sections.push({ sectionId, content });
  }

  if (sections.length < 2) {
    onLog('Cross-section pass', false, `only ${sections.length} section(s) — skipped (needs ≥2)`);
    return {
      edits: [],
      sectionsChanged: 0,
      integrityWarnings: [],
      costUsd: 0,
      model,
      generatedAt: new Date().toISOString(),
    };
  }

  onLog(`Cross-section pass [${model}]`, true, `${sections.length} sections — calling API…`);

  const resp = await withRetry(
    () => callLLM({
      model,
      system: CROSS_SECTION_SYSTEM,
      messages: [{ role: 'user', content: buildUserPrompt(sections) }],
      // Whole article in, whole article out — give it room.
      maxTokens: 8192,
    }),
    { onRetry: (a, e, d) => onLog(`Cross-section retry ${a}`, false, `${e.message} (${d}ms)`) },
  );
  tracker.add(computeCallCost(model, 'cross-section', resp.inputTokens, resp.outputTokens));

  // ── Parse ───────────────────────────────────────────────────────────────────
  const returned = parseDelimited(resp.content);
  if (Object.keys(returned).length === 0) {
    throw new Error(
      `Could not parse any sections from cross-section pass.\nFirst 500:\n${resp.content.slice(0, 500)}`,
    );
  }

  // ── Apply edits with per-section integrity gating ───────────────────────────
  const edits: CrossSectionEdit[] = [];
  const integrityWarnings: string[] = [];
  let sectionsChanged = 0;

  for (const { sectionId, content: original } of sections) {
    const entry = returned[sectionId];
    const finalPath = path.join(sectionsDir, `${sectionId}.final.md`);

    if (!entry || !entry.content.trim()) {
      integrityWarnings.push(`${sectionId}: editor returned nothing — keeping original`);
      edits.push({ sectionId, changed: false, note: 'editor returned nothing; original kept' });
      continue;
    }

    const edited = entry.content.trim();
    const note   = entry.note;

    // Identical → nothing to do.
    if (edited === original) {
      edits.push({ sectionId, changed: false, note: note || 'no change needed' });
      continue;
    }

    // Gate: any integrity warning → keep original, do NOT write the edit.
    const violations = checkIntegrity(original, edited);
    if (violations.length > 0) {
      for (const v of violations) integrityWarnings.push(`${sectionId}: ${v}`);
      // Preserve the rejected candidate for inspection.
      fs.writeFileSync(
        path.join(sectionsDir, `${sectionId}.cohesion-rejected.md`),
        edited, 'utf-8',
      );
      edits.push({
        sectionId, changed: false,
        note: `edit rejected (${violations.length} integrity violation(s)); original kept`,
      });
      onLog(`Cross-section: ${sectionId}`, false, `rejected — ${violations[0]}`);
      continue;
    }

    // Safe: back up the pre-cohesion version, then write the edit.
    fs.writeFileSync(
      path.join(sectionsDir, `${sectionId}.pre-cohesion.md`),
      original, 'utf-8',
    );
    fs.writeFileSync(finalPath, edited, 'utf-8');
    sectionsChanged++;
    edits.push({ sectionId, changed: true, note: note || 'edited' });
    onLog(`Cross-section: ${sectionId}`, true, note || 'edited');
  }

  const costUsd = tracker.totalCostUsd - costBefore;
  onLog(
    'Cross-section pass',
    integrityWarnings.length === 0,
    `${sectionsChanged} changed, ${integrityWarnings.length} rejected — $${costUsd.toFixed(4)}`,
  );

  return {
    edits,
    sectionsChanged,
    integrityWarnings,
    costUsd,
    model,
    generatedAt: new Date().toISOString(),
  };
}
