/**
 * strategic-shift-detector.ts — Layer 3: Strategic Shift Detector
 *
 * PURPOSE
 * -------
 * Article sections must start from a THESIS, not from raw comparison data.
 * This LLM step runs BEFORE the section writer loop and produces a clear
 * thesis object that all six sections can reference as a shared anchor.
 *
 * Without this, each section independently interprets the same data and can
 * arrive at inconsistent or contradictory framings. With this, the intro,
 * messaging section, CTA section, and lessons section all use the same
 * "central_thesis" as their north star.
 *
 * INPUT
 * -----
 * Loaded from section-evidence/normalized-page-text.json and evidence-pack.json:
 *   • old H1, new H1
 *   • old title, new title
 *   • old/new meta description
 *   • normalized strategicNav (from / to)
 *   • normalized primaryCtas (from / to)
 *   • normalized sectionHeadings (from / to)
 *   • diff added/removed lists
 *
 * OUTPUT
 * ------
 * section-evidence/strategic-shift.json — matches the spec exactly:
 * {
 *   central_thesis: string,
 *   old_positioning_frame: string,
 *   new_positioning_frame: string,
 *   buyer_shift: string,
 *   funnel_shift: string,
 *   main_evidence: [{ element, old, new, meaning }],
 *   copy_this_if: string,
 *   do_not_copy_this_if: string,
 *   safer_version_for_early_stage_saas: string,
 *   risk_if_copied: string,
 *   confidence_level: "high" | "medium" | "low",
 * }
 *
 * DESIGN RULES
 * ------------
 * • Do not claim internal company strategy as fact.
 * • Separate observed facts from interpretation.
 * • If evidence is weak, say so and set confidence_level = "low".
 * • The thesis must be company-specific — no generic outputs like "shifted toward AI."
 * • Skip if strategic-shift.json already exists AND --force is not set.
 *
 * CLI (standalone):
 *   npm run cro-teardown:strategic-shift -- --slug hootsuite
 *   npm run cro-teardown:strategic-shift -- --slug hootsuite --force
 */

import * as fs      from 'node:fs';
import * as path    from 'node:path';
import * as process from 'node:process';
import { fileURLToPath } from 'node:url';

import { callLLM }            from './llm/anthropic-client.js';
import { getModel }            from './llm/model-router.js';
import { CostTracker, computeCallCost } from './llm/token-cost.js';
import { withRetry }           from './llm/retry.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StrategicShiftEvidence {
  element: string;
  old:     string;
  new:     string;
  meaning: string;
}

export interface StrategicShift {
  central_thesis:                    string;
  old_positioning_frame:             string;
  new_positioning_frame:             string;
  buyer_shift:                       string;
  funnel_shift:                      string;
  main_evidence:                     StrategicShiftEvidence[];
  copy_this_if:                      string;
  do_not_copy_this_if:               string;
  safer_version_for_early_stage_saas: string;
  risk_if_copied:                    string;
  confidence_level:                  'high' | 'medium' | 'low';
  generatedAt:                       string;
  model:                             string;
  costUsd:                           number;
}

export interface RunStrategicShiftOpts {
  slug:      string;
  writingDir: string;
  tracker:   CostTracker;
  force?:    boolean;
  onLog:     (step: string, ok: boolean, detail?: string) => void;
}

export interface RunStrategicShiftResult {
  shift:    StrategicShift;
  skipped:  boolean;
  costUsd:  number;
  outputPath: string;
}

// ─── JSON extraction (shared pattern with generate-lesson-cards) ──────────────

function extractJson(text: string): string | null {
  try { JSON.parse(text.trim()); return text.trim(); } catch { /* not valid JSON as-is */ }
  const block = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (block) { try { JSON.parse(block[1].trim()); return block[1].trim(); } catch { /* not valid JSON in block */ } }
  const first = text.indexOf('{');
  const last  = text.lastIndexOf('}');
  if (first !== -1 && last > first) {
    const c = text.slice(first, last + 1);
    try { JSON.parse(c); return c; } catch { /* not valid JSON as extracted */ }
  }
  return null;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
`You are a CRO strategist and brand analyst helping produce a homepage teardown article.

Your job is to identify the SINGLE STRONGEST strategic shift in a company's homepage
evolution by examining observed changes in headline, meta description, CTAs, navigation,
and section headings.

─── OUTPUT RULES ───────────────────────────────────────────────────────────────

1. Return ONLY valid JSON. No text before or after.

2. SEPARATION OF FACT AND INFERENCE
   • main_evidence[].old and main_evidence[].new must be EXACT QUOTES from the data.
   • main_evidence[].meaning is interpretation — hedge it with "suggests", "signals",
     "may indicate", "is consistent with", "points to".
   • central_thesis, buyer_shift, funnel_shift are interpretation — never stated as fact.
   • NEVER say "this caused", "this improved", "this increased conversions".
   • NEVER claim to know internal company strategy.

3. COMPANY-SPECIFIC THESIS
   • The central_thesis must name the company explicitly.
   • The thesis must be specific to THIS company — not a generic principle.
   • BANNED outputs:
       ✗ "shifted toward AI" (too generic)
       ✗ "modernised its homepage" (describes every homepage change ever)
       ✗ "improved its messaging" (no content, no specificity)
   • GOOD output shape (example only — do not copy the content):
       ✓ "Intercom moved from practitioner support outcome messaging to AI helpdesk
          category ownership by replacing its 2019 H1 with 'The most human AI agent'
          and removing the 14-day trial CTA that served mid-funnel exploration."

4. CONFIDENCE LEVEL
   • high   — multiple independent signals (H1 + nav + CTA all shift in same direction)
   • medium — 2 clear signals, one uncertain
   • low    — only 1 signal or signals are ambiguous / contradictory

5. COPY THIS IF / DO NOT COPY THIS IF
   • Must describe a SPECIFIC COMPANY PROFILE, not a size or stage.
   • Example: "Your brand name already autocompletes with your product category in
     Google Search" not "you are a large company".

6. SAFER VERSION
   • A concrete, actionable alternative for a company that cannot yet take the same risk.
   • Must include a specific element to change or test.`;

// ─── User prompt builder ──────────────────────────────────────────────────────

function buildUserPrompt(evidence: {
  companyName:  string;
  companyUrl:   string;
  fromLabel:    string;
  toLabel:      string;
  oldH1:        string;
  newH1:        string;
  oldTitle:     string;
  newTitle:     string;
  oldMeta:      string;
  newMeta:      string;
  fromStrategicNav: string[];
  toStrategicNav:   string[];
  fromPrimaryCtas:  string[];
  toPrimaryCtas:    string[];
  fromH2:           string[];
  toH2:             string[];
  h2Added:          string[];
  h2Removed:        string[];
  ctaAdded:         string[];
  ctaRemoved:       string[];
  navAdded:         string[];
  navRemoved:       string[];
}): string {
  return `Identify the single strongest strategic shift for ${evidence.companyName}.

COMPANY: ${evidence.companyName} (${evidence.companyUrl})
PERIOD:  ${evidence.fromLabel} → ${evidence.toLabel}

── OBSERVED CHANGES (facts — do not invent beyond this data) ──────────────────

H1:
  Old: ${evidence.oldH1 || '(no H1 found)'}
  New: ${evidence.newH1 || '(no H1 found)'}

Page title:
  Old: ${evidence.oldTitle || '(unchanged or not captured)'}
  New: ${evidence.newTitle || '(unchanged or not captured)'}

Meta description:
  Old: ${evidence.oldMeta || '(not captured)'}
  New: ${evidence.newMeta || '(not captured)'}

Strategic navigation (from):
  ${evidence.fromStrategicNav.slice(0, 8).join(' · ') || '(none)'}

Strategic navigation (to):
  ${evidence.toStrategicNav.slice(0, 8).join(' · ') || '(none)'}

Primary CTAs (from):
  ${evidence.fromPrimaryCtas.slice(0, 6).join(' · ') || '(none)'}

Primary CTAs (to):
  ${evidence.toPrimaryCtas.slice(0, 6).join(' · ') || '(none)'}

Section headings (from, sample):
  ${evidence.fromH2.slice(0, 5).join(' · ') || '(none)'}

Section headings (to, sample):
  ${evidence.toH2.slice(0, 5).join(' · ') || '(none)'}

Headings ADDED:   ${evidence.h2Added.slice(0, 8).join(' | ') || '(none)'}
Headings REMOVED: ${evidence.h2Removed.slice(0, 8).join(' | ') || '(none)'}
CTAs ADDED:       ${evidence.ctaAdded.slice(0, 6).join(' | ') || '(none)'}
CTAs REMOVED:     ${evidence.ctaRemoved.slice(0, 6).join(' | ') || '(none)'}
Nav ADDED:        ${evidence.navAdded.slice(0, 6).join(' | ') || '(none)'}
Nav REMOVED:      ${evidence.navRemoved.slice(0, 6).join(' | ') || '(none)'}

── REQUIRED OUTPUT SHAPE ──────────────────────────────────────────────────────

{
  "central_thesis": "<company-specific thesis — names the company, specific shift>",
  "old_positioning_frame": "<what the page claimed / promised before>",
  "new_positioning_frame": "<what the page claims / promises now>",
  "buyer_shift": "<who was targeted before → who is targeted now>",
  "funnel_shift": "<what stage of the buyer journey the page served before → now>",
  "main_evidence": [
    {
      "element": "H1 | Meta description | CTA | Navigation | Section headings",
      "old": "<exact quote or list>",
      "new": "<exact quote or list>",
      "meaning": "<hedged interpretation — what this signals or suggests>"
    }
  ],
  "copy_this_if": "<specific company profile condition — not size, not 'you are enterprise'>",
  "do_not_copy_this_if": "<specific condition under which this approach would backfire>",
  "safer_version_for_early_stage_saas": "<concrete element to test instead, for companies without brand recognition>",
  "risk_if_copied": "<specific downstream consequence if misapplied>",
  "confidence_level": "high | medium | low"
}

Return the JSON now.`;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateShift(shift: Partial<StrategicShift>, companyName: string): string[] {
  const issues: string[] = [];
  const required: (keyof StrategicShift)[] = [
    'central_thesis', 'old_positioning_frame', 'new_positioning_frame',
    'buyer_shift', 'funnel_shift', 'main_evidence',
    'copy_this_if', 'do_not_copy_this_if', 'risk_if_copied', 'confidence_level',
  ];
  for (const key of required) {
    if (!shift[key]) issues.push(`Missing field: ${key}`);
  }

  // Thesis must name the company
  if (shift.central_thesis && !shift.central_thesis.toLowerCase().includes(companyName.toLowerCase())) {
    issues.push(`central_thesis does not name the company ("${companyName}")`);
  }

  // Confidence level must be valid
  if (shift.confidence_level && !['high', 'medium', 'low'].includes(shift.confidence_level)) {
    issues.push(`Invalid confidence_level: "${shift.confidence_level}" — must be high | medium | low`);
  }

  // main_evidence must be an array
  if (shift.main_evidence !== undefined && !Array.isArray(shift.main_evidence)) {
    issues.push('main_evidence must be an array');
  }

  return issues;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function runStrategicShiftDetector(
  opts: RunStrategicShiftOpts,
): Promise<RunStrategicShiftResult> {
  const { slug, writingDir, tracker, force = false, onLog } = opts;
  const sectionEvidenceDir = path.join(writingDir, 'section-evidence');
  const outputPath = path.join(sectionEvidenceDir, 'strategic-shift.json');

  // Skip if already exists and not --force
  if (!force && fs.existsSync(outputPath)) {
    const existing = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as StrategicShift;
    onLog('strategic-shift.json', true, 'exists — skipped (pass --force to regenerate)');
    return { shift: existing, skipped: true, costUsd: 0, outputPath };
  }

  // ── Load evidence ─────────────────────────────────────────────────────────
  const packPath = path.join(writingDir, 'evidence-pack.json');
  if (!fs.existsSync(packPath)) {
    throw new Error(
      `evidence-pack.json not found at ${packPath}\n` +
      `Run Phase 4A first: npm run cro-teardown:generate-data -- --name <Company> --slug ${slug}`,
    );
  }

  const pack = JSON.parse(fs.readFileSync(packPath, 'utf-8')) as {
    companyName: string;
    companyUrl:  string;
    fromLabel:   string;
    toLabel:     string;
    diffSummary: {
      headlines:  Array<{ from: string; to: string }>;
      metaDescs:  Array<{ from: string; to: string }>;
      titleChanges?: number;
      h2Added:    string[];
      h2Removed:  string[];
      ctaAdded:   string[];
      ctaRemoved: string[];
      navAdded:   string[];
      navRemoved: string[];
    };
  };

  // Load normalized page text for strategic nav/CTAs
  const normalizedPath = path.join(sectionEvidenceDir, 'normalized-page-text.json');
  let fromNorm: { strategicNav: string[]; primaryCtas: string[]; sectionHeadings: { h2: string[] } } | null = null;
  let toNorm:   typeof fromNorm = null;

  if (fs.existsSync(normalizedPath)) {
    const npt = JSON.parse(fs.readFileSync(normalizedPath, 'utf-8')) as {
      from: { normalized: typeof fromNorm };
      to:   { normalized: typeof toNorm };
    };
    fromNorm = npt.from?.normalized ?? null;
    toNorm   = npt.to?.normalized   ?? null;
  }

  // Load generated-article-data for old/new title
  const gdPath = path.join(writingDir, 'generated-article-data.json');
  let oldTitle = '';
  let newTitle = '';
  if (fs.existsSync(gdPath)) {
    const gd = JSON.parse(fs.readFileSync(gdPath, 'utf-8')) as {
      messagingChanges?: Array<{ element: string; before: string; after: string }>;
    };
    const titleChange = gd.messagingChanges?.find(c => c.element === 'Page title');
    oldTitle = titleChange?.before ?? '';
    newTitle = titleChange?.after  ?? '';
  }

  const ds = pack.diffSummary;
  const evidenceInput = {
    companyName:       pack.companyName,
    companyUrl:        pack.companyUrl,
    fromLabel:         pack.fromLabel,
    toLabel:           pack.toLabel,
    oldH1:             ds.headlines?.[0]?.from ?? '',
    newH1:             ds.headlines?.[0]?.to   ?? '',
    oldTitle,
    newTitle,
    oldMeta:           ds.metaDescs?.[0]?.from ?? '',
    newMeta:           ds.metaDescs?.[0]?.to   ?? '',
    fromStrategicNav:  fromNorm?.strategicNav          ?? [],
    toStrategicNav:    toNorm?.strategicNav             ?? [],
    fromPrimaryCtas:   fromNorm?.primaryCtas            ?? [],
    toPrimaryCtas:     toNorm?.primaryCtas              ?? [],
    fromH2:            fromNorm?.sectionHeadings?.h2    ?? [],
    toH2:              toNorm?.sectionHeadings?.h2      ?? [],
    h2Added:           ds.h2Added    ?? [],
    h2Removed:         ds.h2Removed  ?? [],
    ctaAdded:          ds.ctaAdded   ?? [],
    ctaRemoved:        ds.ctaRemoved ?? [],
    navAdded:          ds.navAdded   ?? [],
    navRemoved:        ds.navRemoved ?? [],
  };

  // ── LLM call ──────────────────────────────────────────────────────────────
  const model = getModel('writer');   // Sonnet — strategic analysis, not prose writing
  const userPrompt = buildUserPrompt(evidenceInput);

  onLog('Running strategic shift detector', true, `model: ${model}`);

  const response = await withRetry(() =>
    callLLM({
      model,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
      maxTokens: 2048,
    }),
  );

  const callCost = computeCallCost(model, 'strategic-shift', response.inputTokens, response.outputTokens);
  tracker.add(callCost);
  const costUsd = callCost.totalCostUsd;

  // ── Parse and validate ────────────────────────────────────────────────────
  const rawJson = extractJson(response.content);
  if (!rawJson) {
    throw new Error(`Strategic shift detector returned non-JSON output:\n${response.content.slice(0, 300)}`);
  }

  let parsed: Partial<StrategicShift>;
  try {
    parsed = JSON.parse(rawJson) as Partial<StrategicShift>;
  } catch (err) {
    throw new Error(`Strategic shift JSON parse error: ${(err as Error).message}`);
  }

  const issues = validateShift(parsed, pack.companyName);
  if (issues.length > 0) {
    onLog('strategic-shift validation', false, issues.join('; '));
    // Non-fatal: save what we have, log the issues
  } else {
    onLog('strategic-shift validation', true, `confidence: ${parsed.confidence_level}`);
  }

  const shift: StrategicShift = {
    central_thesis:                    parsed.central_thesis                    ?? '',
    old_positioning_frame:             parsed.old_positioning_frame             ?? '',
    new_positioning_frame:             parsed.new_positioning_frame             ?? '',
    buyer_shift:                       parsed.buyer_shift                       ?? '',
    funnel_shift:                      parsed.funnel_shift                      ?? '',
    main_evidence:                     parsed.main_evidence                     ?? [],
    copy_this_if:                      parsed.copy_this_if                      ?? '',
    do_not_copy_this_if:               parsed.do_not_copy_this_if               ?? '',
    safer_version_for_early_stage_saas: parsed.safer_version_for_early_stage_saas ?? '',
    risk_if_copied:                    parsed.risk_if_copied                    ?? '',
    confidence_level:                  parsed.confidence_level                  ?? 'medium',
    generatedAt: new Date().toISOString(),
    model,
    costUsd,
  };

  // ── Save to disk ──────────────────────────────────────────────────────────
  fs.mkdirSync(sectionEvidenceDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(shift, null, 2), 'utf-8');
  onLog('strategic-shift.json saved', true, `$${costUsd.toFixed(4)}`);

  return { shift, skipped: false, costUsd, outputPath };
}

// ─── Standalone CLI ───────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] === __filename || process.argv[1]?.endsWith('strategic-shift-detector.js');

if (isMain) {
  const args = process.argv.slice(2);
  const slug  = args[args.indexOf('--slug')  + 1] ?? '';
  const force = args.includes('--force');

  if (!slug) {
    console.error('Usage: npm run cro-teardown:strategic-shift -- --slug <slug> [--force]');
    process.exit(1);
  }

  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');

  if (!fs.existsSync(writingDir)) {
    console.error(`Writing dir not found: ${writingDir}`);
    console.error('Run Phase 4A first: npm run cro-teardown:generate-data -- --name <Company> --slug ' + slug);
    process.exit(1);
  }

  const tracker = new CostTracker(1.0);

  runStrategicShiftDetector({
    slug,
    writingDir,
    tracker,
    force,
    onLog: (step, ok, detail) => console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`),
  })
    .then(result => {
      if (!result.skipped) {
        console.log(`\n✅  Strategic shift saved: ${result.outputPath}`);
        console.log(`    central_thesis: "${result.shift.central_thesis.slice(0, 100)}..."`);
        console.log(`    confidence:     ${result.shift.confidence_level}`);
        console.log(`    cost:           $${result.costUsd.toFixed(4)}`);
      }
    })
    .catch(err => {
      console.error('\nFatal:', err instanceof Error ? err.message : err);
      process.exit(1);
    });
}
