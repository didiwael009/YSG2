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
      'Write 2–3 paragraphs. Cover: what this teardown studies, which company, the period, and the major changes detected. End with a sentence that leads naturally into the At a Glance section below.',
    wordRange: { min: 180, max: 320 },
  },
  '02-at-a-glance': {
    title: 'At a Glance',
    goalDescription:
      'Quick-reference narrative contextualising the summary-card numbers for a reader who is scanning the article.',
    writerInstruction:
`Write 140–220 words using this exact structure — do not deviate:

OPENING SENTENCE (mandatory):
Name the company, state the date range, and name the single most significant observed change.
Example pattern: "[Company]'s homepage changed most visibly between [from] and [to] in its [element], [element], and [element]."

BODY (3–4 bullet points — use markdown "- "):
Each bullet must:
  • Reference one specific observed fact from the evidence
  • Name the exact page element it describes — H1, CTA text, meta description, nav item, H2 heading, or snapshot date
  • Not interpret intent, strategy, or outcome
  • Not use any phrase from the FORBIDDEN PHRASES list

CLOSING SENTENCE (mandatory):
One cautious synthesis sentence.
Allowed openers: "Taken together, the visible changes suggest…" / "These observed shifts can be read as…" / "Collectively, the evidence shows…"
Forbidden openers: "This shows", "This proves", "This improved", "This strategy"

Do not simply list summary-card numbers — give a sense of what they mean for a reader scanning the article.
Do not claim the numbers caused any business outcome.`,
    wordRange: { min: 140, max: 220 },
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
      'Narrative walkthrough of what changed across the visual snapshots — structural, visual, and textual shifts at each stage.',
    writerInstruction:
      'Write 3–4 paragraphs describing the visual and structural changes observed between snapshots. Reference the before/after evidence blocks. Use cautious language when interpreting: "can be read as", "may suggest".',
    wordRange: { min: 220, max: 400 },
  },
  '04-messaging-evolution': {
    title: 'Messaging Evolution',
    goalDescription:
      'Analysis of how the headline, meta description, and core copy shifted — and what can be cautiously inferred from those shifts.',
    writerInstruction:
      'Write 2–3 paragraphs. Quote the actual before/after text from the evidence. Use phrases like "can be read as" or "may suggest" when interpreting. Do not claim changes caused growth or conversion improvements.',
    wordRange: { min: 200, max: 380 },
  },
  '05-cta-navigation-evolution': {
    title: 'CTA and Navigation Evolution',
    goalDescription:
      'Analysis of which calls-to-action and section headings were added and removed, and what patterns that reveals about the site\'s evolving content strategy.',
    writerInstruction:
      'Write 2–4 paragraphs. Cover both the CTA changes and the H2 changes from the evidence. Quote actual CTA text and H2 headings. Describe what was added and removed, and what patterns emerge. Use cautious interpretive language throughout. Do not claim changes drove conversion.',
    wordRange: { min: 220, max: 420 },
  },
  '06-lessons-for-saas-teams': {
    title: 'Lessons for SaaS Teams',
    goalDescription:
      'Actionable observations SaaS practitioners can study from this homepage evolution.',
    writerInstruction:
      'Write one focused paragraph per lesson card in the evidence (typically 4–5). Each paragraph names the pattern and explains what it can be read as. Keep cautious language. Do not add lessons not found in the evidence. Do not claim lessons prove conversion improved.',
    wordRange: { min: 300, max: 520 },
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
`You are a factual, evidence-driven writer producing one section of a CRO teardown article about a SaaS company's homepage evolution.

HARD RULES — inviolable:
1. Use ONLY the evidence in the user message. Do not add facts, metrics, or claims not present in the evidence.
2. Do NOT claim any change improved conversion, increased revenue, caused growth, or produced any measurable outcome.
3. Do NOT claim to know the company's internal strategy or intent.
4. Separate observed facts from interpretation. When interpreting, use:
   "can be read as" / "may suggest" / "is consistent with" / "observed change" / "may reflect".
5. Keep paragraphs short: 2–4 sentences each.
6. Write only the section body. No markdown headers.
7. No generic filler ("in today's competitive landscape", etc.) unless tied to evidence.
8. Quote actual text from the evidence when relevant.`;

// Critic system prompt — threshold is stated in the user prompt so this stays cacheable.
const CRITIC_SYSTEM =
`You are a strict editorial critic for CRO teardown articles.
Output ONLY valid JSON. No text before or after the JSON object.

SCORING RUBRIC — score each dimension separately, then sum:
• evidenceAccuracy  (max 30): Every claim traces to the provided evidence. No invented stats.
  PENALISE -5 per phrase that implies a fact not present in the evidence.
• clarity           (max 20): Clear sentences, purposeful, no padding.
  PENALISE -3 per filler sentence with no evidence anchor; -2 per redundant or padded phrase.
• specificity       (max 15): Tied to THIS company's evidence — not generic SaaS commentary.
  PENALISE -5 per paragraph that could apply word-for-word to a different company's teardown.
• seoUsefulness     (max 10): Useful for a reader searching CRO teardowns.
  PENALISE -3 if no company-specific proper noun appears in the first 40 words.
• croUsefulness     (max 15): Actionable, observable signal — not vague pattern-naming.
  PENALISE -4 per lesson or observation not traceable to a specific evidence item.
• riskControl       (max 10): Interpretations labelled. No causation claims. No conversion-lift claims.
  PENALISE -3 per unlabelled interpretation; -10 per causation claim.

HARD CAPS — apply before summing:
• Any unsupported factual claim → cap total at 70
• Any conversion improvement claim without data → cap total at 60
• More than one generic filler phrase (no evidence anchor) → cap total at 75
• "can be read as" or equivalent appearing more than twice in the same section → cap total at 85

CALIBRATION — this is mandatory, not optional:
• 90–100: Publication-ready. Issues, requiredFixes, and riskFlags must all be genuinely empty.
  Reserve this band for truly exceptional drafts. Do NOT default to 90+.
• 80–89: Passes threshold. Has fixable issues. requiredFixes must contain at least 1 entry.
• 70–79: Needs a rewrite. requiredFixes must contain at least 2 entries.
• Below 70: Significant problems. A hard cap was triggered.

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
    "evidenceAccuracy": <0–30>,
    "clarity": <0–20>,
    "specificity": <0–15>,
    "seoUsefulness": <0–10>,
    "croUsefulness": <0–15>,
    "riskControl": <0–10>
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
        maxTokens: 1024,
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
