/**
 * Phase 4C + 4D — All-sections orchestrator.
 *
 * Runs the writer → critic → rewriter loop across every section in order,
 * assembles article-final.md, generates seo.json, then runs the Phase 4D
 * final judge and SEO audit.
 *
 * Usage:
 *   npm run cro-teardown:compose -- \
 *     --slug hootsuite --mode standard --max-cost 3 --max-rewrite-loops 2
 *
 * Options:
 *   --slug <string>              Teardown slug (required)
 *   --mode <string>              "standard" (default) | "draft" | "flagship"
 *                                  standard  → Sonnet for all roles + Sonnet judge
 *                                  flagship  → Sonnet for writing + Opus final judge
 *                                  draft     → writer only, no critique, no judge
 *   --max-cost <number>          Global budget cap in USD (default: 3.00)
 *   --max-rewrite-loops <n>      Max rewrite loops per section (default: 2)
 *   --only-section <string>      Run a single section only (e.g. 04-messaging-evolution)
 *   --force                      Regenerate sections even if final.md already exists
 *   --skip-final-judge           Skip the Phase 4D final article judge
 *   --skip-seo-audit             Skip the Phase 4D SEO audit
 *
 * Resume behaviour (default, no flag needed):
 *   If a section's final.md already exists, it is skipped unless --force is passed.
 *
 * Writes:
 *   data/cro-teardowns/[slug]/writing/sections/[section].*
 *   data/cro-teardowns/[slug]/writing/article-final.md
 *   data/cro-teardowns/[slug]/writing/seo.json
 *   data/cro-teardowns/[slug]/writing/final-judge.json      (Phase 4D)
 *   data/cro-teardowns/[slug]/writing/seo-audit.json        (Phase 4D)
 *   data/cro-teardowns/[slug]/writing/quality-summary.json
 *   data/cro-teardowns/[slug]/writing/cost-report.json
 *   data/cro-teardowns/[slug]/writing/run-log.json  (appended)
 *   data/cro-teardowns/[slug]/writing/errors.json
 *
 * SECURITY: ANTHROPIC_API_KEY is read exclusively from process.env or .env file.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

import { CostTracker } from './llm/token-cost.js';
import { getModel } from './llm/model-router.js';
import {
  SECTION_ORDER,
  writeSectionLoop,
  type WriteSectionResult,
} from './section-writer.js';
import { generateLessonCards }          from './generate-lesson-cards.js';
import { generateBusinessContext }      from './generate-business-context.js';
import { runStrategicShiftDetector }    from './strategic-shift-detector.js';
import { runSeoIntentPlanner }          from './seo-intent-planner.js';
import { runVisualAnalyzer }            from './visual-analyzer.js';
import { runContextResearcher }         from './context-researcher.js';
import { runOutlineGenerator, type ArticleOutline } from './outline-generator.js';
import { runMarketingCardsGenerator }   from './marketing-cards-generator.js';
import { runCrossSectionPass } from './cross-section-pass.js';
import { resolveCitations }   from './citation-resolver.js';
import { assembleArticle } from './article-assembler.js';
import { generateSeo } from './seo-generator.js';
import { runFinalJudge, type FinalJudgeResult } from './final-judge.js';
import { runSeoAudit, type SeoAuditResult } from './seo-auditor.js';
import { buildRerunPlan } from './fix-router.js';
import { executeRerunPlan } from './rerun-failed-sections.js';
import { CRITIC_PASS_SCORE } from './config/writing-config.js';

// ─── CLI ──────────────────────────────────────────────────────────────────────

interface CliArgs {
  slug: string;
  mode: 'standard' | 'draft' | 'flagship';
  maxCostUsd: number;
  maxRewriteLoops: number;
  onlySection: string | null;
  force: boolean;
  skipFinalJudge: boolean;
  skipSeoAudit: boolean;
  skipCrossSection: boolean;
  rerunFailed: boolean;
  maxRerunSections: number;
  /** Force all section writers/rewriters to this model (e.g. claude-sonnet-4-5). null = per-section defaults. */
  writerModel: string | null;
  /** Max sections composed concurrently. Sections are independent (cohesion runs after), so >1 is safe. */
  concurrency: number;
  /** Skip Layer 1.5 visual screenshot analysis. */
  skipVisual: boolean;
  /** Skip business context web research. */
  skipResearch: boolean;
  /** Skip Layer 3.5 custom outline generator. */
  skipOutline: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args: Record<string, string> = {};
  const flags = new Set<string>();

  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
      args[key] = argv[i + 1];
      i++;
    } else {
      flags.add(key);
    }
  }

  if (!args.slug) { console.error('Error: --slug is required'); process.exit(1); }

  const mode = (args.mode ?? 'standard') as CliArgs['mode'];
  if (mode !== 'standard' && mode !== 'draft' && mode !== 'flagship') {
    console.error(`Error: --mode must be "standard", "draft", or "flagship", got "${mode}"`);
    process.exit(1);
  }

  return {
    slug:             args.slug,
    mode,
    maxCostUsd:       parseFloat(args['max-cost'] ?? '3.00'),
    maxRewriteLoops:  parseInt(args['max-rewrite-loops'] ?? '2', 10),
    onlySection:      args['only-section'] ?? null,
    force:            flags.has('force'),
    // In draft mode or single-section mode, judge steps are skipped by default.
    skipFinalJudge:   flags.has('skip-final-judge') || mode === 'draft',
    skipSeoAudit:     flags.has('skip-seo-audit')   || mode === 'draft',
    skipCrossSection: flags.has('skip-cross-section'),
    // Phase 4E: selective rerun after judge/SEO
    rerunFailed:      flags.has('rerun-failed'),
    maxRerunSections: parseInt(args['max-rerun-sections'] ?? '3', 10),
    writerModel:      args['writer-model'] ?? null,
    // Default 3: each section runs 5–6 sequential calls internally, so 3 in flight
    // keeps API concurrency modest while cutting wall-clock ~2–3×. Pass --concurrency 1
    // to fall back to the original fully-sequential behaviour.
    concurrency:      Math.max(1, parseInt(args['concurrency'] ?? '3', 10)),
    skipVisual:       flags.has('skip-visual'),
    skipResearch:     flags.has('skip-research'),
    skipOutline:      flags.has('skip-outline'),
  };
}

/**
 * Runs `worker` over `items` with at most `limit` promises in flight at once.
 * Results are returned in the original item order. A worker that throws is the
 * worker's own responsibility to catch — this helper does not swallow rejections.
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function saveJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function appendRunLog(
  logPath: string,
  entry: { section?: string; step: string; ok: boolean; detail?: string },
): void {
  let existing: unknown[] = [];
  if (fs.existsSync(logPath)) {
    try { existing = JSON.parse(fs.readFileSync(logPath, 'utf-8')) as unknown[]; } catch {}
  }
  existing.push({ ...entry, ts: new Date().toISOString() });
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2), 'utf-8');
}

// ─── Quality summary ──────────────────────────────────────────────────────────

interface SectionQualityEntry {
  sectionId: string;
  finalVersion: number;
  finalScore: number | null;
  passed: boolean;
  loopsUsed: number;
  riskFlagCount: number;
  riskFlags: string[];
  remainingIssueCount: number;
  remainingIssues: string[];
  sectionCostUsd: number;
}

interface QualitySummary {
  slug: string;
  generatedAt: string;
  mode: string;
  sections: SectionQualityEntry[];
  averageScore: number | null;
  passCount: number;
  failCount: number;
  skippedCount: number;
  totalRewriteLoops: number;
  weakSections: string[];
  allRiskFlags: string[];
  sectionErrors: Array<{ section: string; error: string }>;
  // ── Phase 4D fields ────────────────────────────────────────────────────────
  finalJudgeScore?:    number;
  finalJudgePass?:     boolean;
  seoScore?:           number;
  seoPass?:            boolean;
  finalRequiredFixes?: string[];
  seoRequiredFixes?:   string[];
  // ── Phase 4N fields ────────────────────────────────────────────────────────
  articleWordCount?:    number;
  repetitionWarnings?:  string[];
  editorialWarnings?:   string[];
  overLengthWarning?:   string | null;
}

function buildQualitySummary(
  slug: string,
  mode: string,
  results: WriteSectionResult[],
  skipped: string[],
  sectionErrors: Array<{ section: string; error: string }>,
  judgeResult?: FinalJudgeResult | null,
  seoResult?:   SeoAuditResult   | null,
  assemblerResult?: { wordCount: number; repetitionWarnings: string[]; editorialWarnings: string[]; overLengthWarning: string | null } | null,
): QualitySummary {
  const scored = results.filter(r => r.finalScore !== null);
  const averageScore =
    scored.length > 0
      ? Math.round((scored.reduce((s, r) => s + (r.finalScore ?? 0), 0) / scored.length) * 10) / 10
      : null;

  const weakSections = results
    .filter(r => r.finalScore !== null && (r.finalScore as number) < 80)
    .map(r => r.sectionId);

  const allRiskFlags = [...new Set(results.flatMap(r => r.riskFlags))];

  const base: QualitySummary = {
    slug,
    generatedAt: new Date().toISOString(),
    mode,
    sections: results.map(r => ({
      sectionId:           r.sectionId,
      finalVersion:        r.finalVersion,
      finalScore:          r.finalScore,
      passed:              r.passed,
      loopsUsed:           r.loopsUsed,
      riskFlagCount:       r.riskFlags.length,
      riskFlags:           r.riskFlags,
      remainingIssueCount: r.remainingIssues.length,
      remainingIssues:     r.remainingIssues,
      sectionCostUsd:      r.sectionCostUsd,
    })),
    averageScore,
    passCount:         results.filter(r => r.passed).length,
    failCount:         results.filter(r => !r.passed && r.finalScore !== null).length,
    skippedCount:      skipped.length,
    totalRewriteLoops: results.reduce((s, r) => s + r.loopsUsed, 0),
    weakSections,
    allRiskFlags,
    sectionErrors,
  };

  if (judgeResult) {
    base.finalJudgeScore    = judgeResult.overallScore;
    base.finalJudgePass     = judgeResult.pass;
    base.finalRequiredFixes = judgeResult.requiredFixes;
  }
  if (seoResult) {
    base.seoScore         = seoResult.seoScore;
    base.seoPass          = seoResult.pass;
    base.seoRequiredFixes = seoResult.requiredFixes;
  }
  if (assemblerResult) {
    base.articleWordCount   = assemblerResult.wordCount;
    base.repetitionWarnings = assemblerResult.repetitionWarnings;
    base.editorialWarnings  = assemblerResult.editorialWarnings;
    base.overLengthWarning  = assemblerResult.overLengthWarning;
  }

  return base;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const cli = parseArgs(process.argv.slice(2));
  const projectRoot = process.cwd();
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', cli.slug, 'writing');
  const sectionsDir = path.join(writingDir, 'sections');
  const logPath     = path.join(writingDir, 'run-log.json');
  const errorsPath  = path.join(writingDir, 'errors.json');
  const costPath    = path.join(writingDir, 'cost-report.json');
  const qualityPath = path.join(writingDir, 'quality-summary.json');

  if (!fs.existsSync(writingDir)) {
    console.error(
      `  ✗ Writing directory not found: ${writingDir}\n` +
      `  Run Phase 4A first:\n` +
      `    npm run cro-teardown:generate-data -- --name <Company> --slug ${cli.slug}`,
    );
    process.exit(1);
  }

  const tracker = new CostTracker(cli.maxCostUsd);
  const results: WriteSectionResult[] = [];
  const skipped: string[] = [];
  const sectionErrors: Array<{ section: string; error: string }> = [];

  // Article outline from Layer 3.5 (populated later in the pipeline)
  let articleOutline: ArticleOutline | null = null;

  // Determine which sections to run
  const sectionsToRun: string[] = cli.onlySection
    ? [cli.onlySection]
    : [...SECTION_ORDER];

  // ── Banner ──────────────────────────────────────────────────────────────────
  const div = '─'.repeat(60);
  console.log(`\nCRO Teardown — Phase 4C: All-Sections Composer`);
  console.log(div);
  console.log(`  Slug       : ${cli.slug}`);
  console.log(`  Sections   : ${cli.onlySection ?? `all (${sectionsToRun.length})`}`);
  console.log(`  Mode       : ${cli.mode}`);
  console.log(`  Budget     : $${cli.maxCostUsd}`);
  console.log(`  Max loops  : ${cli.maxRewriteLoops}`);
  console.log(`  Concurrency: ${cli.concurrency}${cli.concurrency > 1 ? ' (sections composed in parallel)' : ' (sequential)'}`);
  console.log(`  Force      : ${cli.force ? 'yes — regenerating all' : 'no — skipping existing finals'}`);
  if (cli.skipFinalJudge)    console.log(`  Judge      : skipped (--skip-final-judge)`);
  if (cli.skipSeoAudit)      console.log(`  SEO audit  : skipped (--skip-seo-audit)`);
  if (cli.skipCrossSection)  console.log(`  Cross-sect : skipped (--skip-cross-section)`);
  if (cli.rerunFailed)    console.log(`  Rerun mode : enabled (max ${cli.maxRerunSections} sections)`);
  console.log(div + '\n');

  // ── Layer 1.5: Visual screenshot analysis ─────────────────────────────────────
  // Runs FIRST so visual context is available to the strategic shift detector.
  // Analyzes first + last selected .webp screenshots via Claude vision.
  // Output: section-evidence/visual-analysis.json
  // Feeds: strategic-shift context, marketing cards Card 4, outline generator.
  if (cli.mode !== 'draft' && !cli.onlySection && !cli.skipVisual) {
    console.log(`\n${div}`);
    console.log(`  Layer 1.5 — Visual screenshot analysis`);
    try {
      const visualLog = (msg: string): void => {
        console.log(msg);
        appendRunLog(logPath, { section: '_visual-analysis', step: msg, ok: true });
      };
      const visualResult = await runVisualAnalyzer({
        slug:       cli.slug,
        writingDir,
        publicDir:  path.join(projectRoot, 'public'),
        tracker,
        force:      cli.force,
        onLog:      visualLog,
      });
      if (visualResult.skipped) {
        console.log(`  ↩ Skipping visual analysis — visual-analysis.json exists`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Visual analysis failed (non-fatal): ${msg}`);
      sectionErrors.push({ section: '_visual-analysis', error: msg });
      appendRunLog(logPath, { section: '_visual-analysis', step: 'VISUAL ANALYSIS ERROR', ok: false, detail: msg });
    }
  }

  // ── Context researcher (business context web research) ─────────────────────────
  // Runs SECOND — before Layer 3 — so the strategic shift detector has real business
  // context (funding, pivots, category shifts) before it determines the thesis.
  // Output: section-evidence/business-context-research.json
  // Feeds: Layer 3 (strategic shift), business context section writer, outline generator.
  if (cli.mode !== 'draft' && !cli.onlySection && !cli.skipResearch) {
    console.log(`\n${div}`);
    console.log(`  Context researcher — business context research`);
    try {
      const researchLog = (msg: string): void => {
        console.log(msg);
        appendRunLog(logPath, { section: '_context-research', step: msg, ok: true });
      };
      const researchResult = await runContextResearcher({
        slug:       cli.slug,
        writingDir,
        tracker,
        force:      cli.force,
        onLog:      researchLog,
      });
      if (researchResult.skipped) {
        console.log(`  ↩ Skipping context research — business-context-research.json exists`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Context research failed (non-fatal): ${msg}`);
      sectionErrors.push({ section: '_context-research', error: msg });
      appendRunLog(logPath, { section: '_context-research', step: 'CONTEXT RESEARCH ERROR', ok: false, detail: msg });
    }
  }

  // ── Layer 3: Strategic shift detector ────────────────────────────────────────
  // Runs after visual analysis + context research so it has full business context
  // before determining the thesis. Output: section-evidence/strategic-shift.json
  // Skipped in draft mode, single-section runs, and when file already exists (unless --force).
  if (cli.mode !== 'draft' && !cli.onlySection) {
    console.log(`\n${div}`);
    console.log(`  Layer 3 — Strategic shift detector`);
    try {
      const shiftLog = (step: string, ok: boolean, detail?: string): void => {
        console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`);
        appendRunLog(logPath, { section: '_strategic-shift', step, ok, detail: detail ?? '' });
      };
      const shiftResult = await runStrategicShiftDetector({
        slug:       cli.slug,
        writingDir,
        tracker,
        force:      cli.force,
        onLog:      shiftLog,
      });
      if (!shiftResult.skipped) {
        console.log(`  ✓ strategic-shift.json — confidence: ${shiftResult.shift.confidence_level}  $${shiftResult.costUsd.toFixed(4)}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Strategic shift detector failed (non-fatal): ${msg}`);
      sectionErrors.push({ section: '_strategic-shift', error: msg });
      appendRunLog(logPath, { section: '_strategic-shift', step: 'STRATEGIC SHIFT ERROR', ok: false, detail: msg });
      // Non-fatal: pipeline continues. Section writers will lack the thesis but can still run.
    }
  }

  // ── Citation resolver ─────────────────────────────────────────────────────────
  // Deterministic — no LLM call. Maps strategic-shift fields to 2-3 book citations.
  // Writes section-evidence/citation-context.json for use by sections 06 and 07.
  if (cli.mode !== 'draft' && !cli.onlySection) {
    try {
      const citations = resolveCitations({ writingDir, force: cli.force });
      if (citations) {
        const titles = citations.recommendedCitations.map(c => c.title).join(', ');
        console.log(`  ✓ citation-context.json — ${citations.recommendedCitations.length} sources: ${titles}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Citation resolver failed (non-fatal): ${msg}`);
    }
  }

  // ── Business context (07-business-context.final.md) ──────────────────────────
  // Runs after strategic shift so the thesis is available. Writes directly to
  // sections/07-business-context.final.md; the section loop will skip the section
  // since the final.md already exists. Skipped in draft mode and single-section runs.
  if (cli.mode !== 'draft' && !cli.onlySection) {
    console.log(`\n${div}`);
    console.log(`  Business context generator`);
    try {
      const bcLog = (step: string, ok: boolean, detail?: string): void => {
        console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`);
        appendRunLog(logPath, { section: '_business-context', step, ok, detail: detail ?? '' });
      };
      const bcResult = await generateBusinessContext({
        slug:        cli.slug,
        writingDir,
        sectionsDir,
        tracker,
        force:       cli.force,
        onLog:       bcLog,
      });
      if (!bcResult.skipped) {
        console.log(`  ✓ 07-business-context.final.md — $${bcResult.costUsd.toFixed(4)}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Business context generation failed (non-fatal): ${msg}`);
      sectionErrors.push({ section: '_business-context', error: msg });
      appendRunLog(logPath, { section: '_business-context', step: 'BUSINESS CONTEXT ERROR', ok: false, detail: msg });
    }
  }

  // ── Layer 4: SEO intent planner ──────────────────────────────────────────────
  // Runs after strategic shift so the thesis is available when picking the
  // SEO angle. Output: section-evidence/seo-intent.json
  // Also auto-writes seo-target.json when no manual keyword has been set.
  // Skipped in draft mode, single-section runs, and when file already exists (unless --force).
  if (cli.mode !== 'draft' && !cli.onlySection) {
    console.log(`\n${div}`);
    console.log(`  Layer 4 — SEO intent planner`);
    try {
      const seoLog = (step: string, ok: boolean, detail?: string): void => {
        console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`);
        appendRunLog(logPath, { section: '_seo-intent', step, ok, detail: detail ?? '' });
      };
      const seoIntentResult = await runSeoIntentPlanner({
        slug:       cli.slug,
        writingDir,
        tracker,
        force:      cli.force,
        onLog:      seoLog,
      });
      if (!seoIntentResult.skipped) {
        console.log(
          `  ✓ seo-intent.json — keyword: "${seoIntentResult.intent.primary_keyword}"` +
          `  confidence: ${seoIntentResult.intent.confidence_level}` +
          `  $${seoIntentResult.costUsd.toFixed(4)}`,
        );
        if (seoIntentResult.wroteTarget) {
          console.log(`  ✓ seo-target.json auto-written (override with --keyword)`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ SEO intent planner failed (non-fatal): ${msg}`);
      sectionErrors.push({ section: '_seo-intent', error: msg });
      appendRunLog(logPath, { section: '_seo-intent', step: 'SEO INTENT ERROR', ok: false, detail: msg });
      // Non-fatal: section writers fall back to evidence-pack keywords as before.
    }
  }

  // ── Layer 3.5: Custom outline generator ────────────────────────────────────────
  // Generates a brand-specific article outline with custom H2s, goals, and
  // marketing-signal "At a glance" cards. Uses all prior layer outputs as input.
  // Output: article-outline.json
  if (cli.mode !== 'draft' && !cli.onlySection && !cli.skipOutline) {
    console.log(`\n${div}`);
    console.log(`  Layer 3.5 — Custom outline generator`);
    try {
      const outlineLog = (msg: string): void => {
        console.log(msg);
        appendRunLog(logPath, { section: '_outline', step: msg, ok: true });
      };
      const outlineResult = await runOutlineGenerator({
        slug:       cli.slug,
        writingDir,
        dataRoot:   path.join(projectRoot, 'data', 'cro-teardowns'),
        tracker,
        force:      cli.force,
        onLog:      outlineLog,
      });
      if (outlineResult.skipped) {
        console.log(`  ↩ Skipping outline — article-outline.json exists`);
      }
      articleOutline = outlineResult.outline;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Outline generation failed (non-fatal): ${msg}`);
      sectionErrors.push({ section: '_outline', error: msg });
      appendRunLog(logPath, { section: '_outline', step: 'OUTLINE ERROR', ok: false, detail: msg });
    }
  } else {
    // Load existing outline if available (e.g. --skip-outline on a resume run)
    const outlinePath = path.join(writingDir, 'article-outline.json');
    if (fs.existsSync(outlinePath)) {
      try {
        articleOutline = JSON.parse(fs.readFileSync(outlinePath, 'utf-8')) as ArticleOutline;
      } catch {
        // ignore malformed outline
      }
    }
  }

  // ── Marketing signal cards ──────────────────────────────────────────────────────
  // Generates 4 marketing-lens "At a glance" cards from strategic-shift + evidence.
  // When article-outline.json has at_a_glance_cards, those take precedence.
  // Otherwise falls back to deterministic cards from marketing-cards-generator.
  // Output: section-evidence/marketing-summary-cards.json
  if (cli.mode !== 'draft' && !cli.onlySection) {
    try {
      if (articleOutline?.at_a_glance_cards?.length) {
        // Outline generator already produced marketing cards — save them directly
        const cardsPath = path.join(writingDir, 'section-evidence', 'marketing-summary-cards.json');
        fs.mkdirSync(path.dirname(cardsPath), { recursive: true });
        fs.writeFileSync(cardsPath, JSON.stringify(articleOutline.at_a_glance_cards, null, 2), 'utf-8');
        console.log(`\n  ✓ marketing-summary-cards.json — ${articleOutline.at_a_glance_cards.length} cards (from outline)`);
      } else {
        const cardsResult = await runMarketingCardsGenerator({
          slug:       cli.slug,
          writingDir,
          force:      cli.force,
        });
        if (!cardsResult.skipped) {
          console.log(`\n  ✓ marketing-summary-cards.json — ${cardsResult.cards.length} cards (deterministic)`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Marketing cards generation failed (non-fatal): ${msg}`);
    }
  }

  // ── Section composition (parallel, bounded) ──────────────────────────────────
  // Sections are independent: each reads its own evidence and writes its own
  // .final.md. Whole-article cohesion is handled afterwards by cross-section-pass,
  // so composing them concurrently changes wall-clock only, not output.

  // Phase 1 — resume filter (cheap fs checks, kept sequential).
  const toCompose: string[] = [];
  for (const sectionId of sectionsToRun) {
    const finalPath = path.join(sectionsDir, `${sectionId}.final.md`);
    if (!cli.force && fs.existsSync(finalPath)) {
      console.log(`  ↩ Skipping ${sectionId} — final.md exists (pass --force to regenerate)`);
      skipped.push(sectionId);
      appendRunLog(logPath, { section: sectionId, step: 'skipped (final exists)', ok: true });
      continue;
    }
    toCompose.push(sectionId);
  }

  // Split the remaining budget across sections so the aggregate still honours the
  // global cap even though sections no longer run strictly one-at-a-time. Each
  // section gets its own sub-tracker; per-call budget gates fire inside it.
  const remainingBudget = Math.max(0, cli.maxCostUsd - tracker.totalCostUsd);
  const perSectionBudget = toCompose.length > 0 ? remainingBudget / toCompose.length : remainingBudget;

  // Phase 2 — compose with at most cli.concurrency sections in flight.
  const composed = await mapWithConcurrency(toCompose, cli.concurrency, async (sectionId) => {
    const sectionTracker = new CostTracker(perSectionBudget);
    const sectionLog = (step: string, ok: boolean, detail?: string): void => {
      const icon = ok ? '✓' : '✗';
      console.log(`  ${icon} [${sectionId}] ${step}${detail ? ` — ${detail}` : ''}`);
      appendRunLog(logPath, { section: sectionId, step, ok, detail });
    };

    try {
      const outlineSec = articleOutline?.sections.find(s => s.id === sectionId);
      const result = await writeSectionLoop({
        sectionId,
        writingDir,
        sectionsDir,
        maxRewriteLoops: cli.maxRewriteLoops,
        minScore:        CRITIC_PASS_SCORE,   // always use default in Phase 4C
        draftOnly:       cli.mode === 'draft',
        ...(cli.writerModel ? { writerModelOverride: cli.writerModel } : {}),
        ...(outlineSec ? { outlineOverride: { customH2: outlineSec.custom_h2 ?? null, customGoal: outlineSec.goal } } : {}),
        tracker:         sectionTracker,
        onLog:           sectionLog,
      });
      return { sectionId, result, calls: sectionTracker.getCalls(), error: null as string | null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { sectionId, result: null as WriteSectionResult | null, calls: sectionTracker.getCalls(), error: msg };
    }
  });

  // Phase 3 — merge sub-tracker costs into the global tracker (in section order)
  // and collect results / errors.
  for (const c of composed) {
    for (const call of c.calls) tracker.add(call);
    if (c.result) {
      results.push(c.result);
      const scoreStr = c.result.finalScore !== null
        ? `score ${c.result.finalScore}/100 — ${c.result.passed ? 'PASS ✓' : 'FAIL ✗'}`
        : 'draft (no score)';
      console.log(`\n  ✓ ${c.sectionId} done — ${scoreStr}  cost $${c.result.sectionCostUsd.toFixed(4)}`);
    }
    if (c.error) {
      console.error(`\n  ✗ ${c.sectionId} FAILED: ${c.error}`);
      sectionErrors.push({ section: c.sectionId, error: c.error });
      appendRunLog(logPath, { section: c.sectionId, step: 'SECTION ERROR', ok: false, detail: c.error });
    }
  }

  // ── Lesson cards (V5 phase) ───────────────────────────────────────────────────
  // Generates 4 company-specific "Patterns worth borrowing" cards via LLM.
  // Writes to section-evidence/lesson-cards.json — same schema the React template
  // already consumes, so no template changes needed downstream.
  // Skipped in draft mode, single-section runs, and when file already exists (unless --force).
  if (cli.mode !== 'draft' && !cli.onlySection) {
    console.log(`\n${div}`);
    const lessonCardsPath = path.join(writingDir, 'section-evidence', 'lesson-cards.json');
    if (!cli.force && fs.existsSync(lessonCardsPath)) {
      console.log(`  ↩ Skipping lesson cards — lesson-cards.json exists (pass --force to regenerate)`);
    } else {
      try {
        const cardsLog = (step: string, ok: boolean, detail?: string): void => {
          console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`);
          appendRunLog(logPath, { section: '_lesson-cards', step, ok, detail: detail ?? '' });
        };
        const cardsResult = await generateLessonCards({
          slug: cli.slug,
          writingDir,
          tracker,
          onLog: cardsLog,
        });
        console.log(
          `  ✓ lesson-cards.json — ${cardsResult.cards.length} cards  $${cardsResult.costUsd.toFixed(4)}`,
        );
        appendRunLog(logPath, {
          step: 'lesson-cards done',
          ok: true,
          detail: `${cardsResult.cards.length} cards — $${cardsResult.costUsd.toFixed(4)}`,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  ⚠ Lesson cards generation failed (non-fatal): ${msg}`);
        sectionErrors.push({ section: '_lesson-cards', error: msg });
        appendRunLog(logPath, {
          section: '_lesson-cards',
          step: 'LESSON CARDS ERROR',
          ok: false,
          detail: msg,
        });
        // Non-fatal: pipeline continues with any pre-existing lesson-cards.json (or without cards).
      }
    }
  }

  // ── Phase 4P: cross-section cohesion + variety pass (Opus) ───────────────────
  // Runs after all sections have a .final.md, before assembly. One whole-article
  // call varies duplicated openings and adds light transitions. Fail-safe: any
  // integrity violation keeps the original section (see cross-section-pass.ts).
  // Skipped in draft mode (cost) and auto-skipped when fewer than 2 sections exist.
  if (cli.mode !== 'draft' && !cli.skipCrossSection) {
    console.log(`\n${div}`);
    try {
      const crossLog = (step: string, ok: boolean, detail?: string): void => {
        console.log(`  ${ok ? '✓' : '⚠'} ${step}${detail ? ` — ${detail}` : ''}`);
        appendRunLog(logPath, { section: '_cross-section', step, ok, detail: detail ?? '' });
      };
      const crossResult = await runCrossSectionPass({
        slug: cli.slug,
        sectionsDir,
        sectionOrder: [...SECTION_ORDER],
        tracker,
        // Sonnet by default: this pass only adds transitions + varies duplicated
        // openings — Opus output ($75/Mtok) is overkill and was ~5× the cost for
        // no quality gain. --writer-model still overrides (e.g. sonnet-only runs).
        model: cli.writerModel ?? getModel('rewriter'),
        onLog: crossLog,
      });
      for (const w of crossResult.integrityWarnings) {
        console.log(`  ⚠ Cohesion integrity: ${w}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ⚠ Cross-section pass failed (non-fatal): ${msg}`);
      appendRunLog(logPath, { section: '_cross-section', step: 'CROSS-SECTION ERROR', ok: false, detail: msg });
      // Non-fatal: fall through to assembly with the per-section finals untouched.
    }
  }

  // ── Assemble article ─────────────────────────────────────────────────────────
  console.log(`\n${div}`);
  console.log(`  Assembling article-final.md…`);
  let assemblerResult: ReturnType<typeof assembleArticle> | null = null;
  try {
    assemblerResult = assembleArticle({
      slug: cli.slug,
      writingDir,
      sectionsDir,
      sectionOrder: [...SECTION_ORDER],
    });
    console.log(
      `  ✓ article-final.md — ${assemblerResult.sectionsIncluded.length} sections, ` +
      `~${assemblerResult.wordCount} words`,
    );
    if (assemblerResult.sectionsMissing.length > 0) {
      console.log(`  ⚠ Sections missing from article: ${assemblerResult.sectionsMissing.join(', ')}`);
    }
    if (assemblerResult.overLengthWarning) {
      console.log(`  ⚠ ${assemblerResult.overLengthWarning}`);
    }
    for (const w of assemblerResult.repetitionWarnings) {
      console.log(`  ⚠ Repetition: ${w}`);
    }
    if (assemblerResult.editorialWarnings.length > 0) {
      console.log(`  ⚠ Editorial: ${assemblerResult.editorialWarnings.length} over-long paragraph(s)`);
      for (const w of assemblerResult.editorialWarnings) {
        console.log(`    • ${w}`);
      }
    }
    appendRunLog(logPath, {
      step: 'assemble article-final.md',
      ok: true,
      detail: `${assemblerResult.sectionsIncluded.length} sections, ${assemblerResult.wordCount} words`,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗ Assembly failed: ${msg}`);
    sectionErrors.push({ section: '_assembler', error: msg });
    appendRunLog(logPath, { step: 'assemble article-final.md', ok: false, detail: msg });
  }

  // ── Generate SEO ──────────────────────────────────────────────────────────────
  let seoData: ReturnType<typeof generateSeo> | null = null;
  try {
    seoData = generateSeo({ slug: cli.slug, writingDir, sectionsDir });
    console.log(`  ✓ seo.json — "${seoData.primaryKeyword}"`);
    appendRunLog(logPath, { step: 'generate seo.json', ok: true, detail: seoData.primaryKeyword });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  ✗ SEO generation failed: ${msg}`);
    sectionErrors.push({ section: '_seo', error: msg });
    appendRunLog(logPath, { step: 'generate seo.json', ok: false, detail: msg });
  }

  // ── Phase 4D: Final judge ─────────────────────────────────────────────────────
  let judgeResult: FinalJudgeResult | null = null;
  if (!cli.skipFinalJudge && assemblerResult && assemblerResult.sectionsMissing.length === 0) {
    try {
      judgeResult = await runFinalJudge({
        slug:       cli.slug,
        writingDir,
        mode:       cli.mode,
        tracker,
        onLog: (step, ok, detail) => {
          const icon = ok ? '✓' : '✗';
          console.log(`  ${icon} ${step}${detail ? ` — ${detail}` : ''}`);
          appendRunLog(logPath, { step, ok, detail });
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ Final judge failed: ${msg}`);
      sectionErrors.push({ section: '_final-judge', error: msg });
      appendRunLog(logPath, { step: 'final judge', ok: false, detail: msg });
    }
  } else if (!cli.skipFinalJudge && assemblerResult && assemblerResult.sectionsMissing.length > 0) {
    console.log(
      `  ⚠ Final judge skipped — article incomplete ` +
      `(missing: ${assemblerResult.sectionsMissing.join(', ')})`,
    );
  }

  // ── Phase 4D: SEO audit ───────────────────────────────────────────────────────
  let seoAuditResult: SeoAuditResult | null = null;
  if (!cli.skipSeoAudit && seoData && assemblerResult && assemblerResult.sectionsMissing.length === 0) {
    try {
      seoAuditResult = await runSeoAudit({
        slug:       cli.slug,
        writingDir,
        tracker,
        onLog: (step, ok, detail) => {
          const icon = ok ? '✓' : '✗';
          console.log(`  ${icon} ${step}${detail ? ` — ${detail}` : ''}`);
          appendRunLog(logPath, { step, ok, detail });
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ SEO audit failed: ${msg}`);
      sectionErrors.push({ section: '_seo-audit', error: msg });
      appendRunLog(logPath, { step: 'seo audit', ok: false, detail: msg });
    }
  }

  // ── Phase 4E: Selective rerun (if --rerun-failed) ────────────────────────────
  if (cli.rerunFailed && !cli.onlySection) {
    // Always build the plan so rerun-plan.json exists for inspection
    const rerunPlan = buildRerunPlan({
      slug:        cli.slug,
      writingDir,
      maxSections: cli.maxRerunSections,
    });

    if (rerunPlan.sectionsToRerun.length > 0) {
      console.log(`\n${div}`);
      console.log(`  Phase 4E: Selective rerun — ${rerunPlan.sectionsToRerun.length} section(s) identified`);
      for (const s of rerunPlan.sectionsToRerun) {
        console.log(`    → ${s.sectionId} [${s.priority}] via ${s.source}`);
      }
      console.log(div);

      try {
        const rerunResult = await executeRerunPlan({
          slug:             cli.slug,
          writingDir,
          sectionsDir,
          plan:             rerunPlan,
          mode:             cli.mode,
          maxCostUsd:       cli.maxCostUsd,
          maxRewriteLoops:  cli.maxRewriteLoops,
          maxRerunSections: cli.maxRerunSections,
          skipFinalJudge:   cli.skipFinalJudge,
          skipSeoAudit:     cli.skipSeoAudit,
          tracker,
          onLog: (section, step, ok, detail) => {
            appendRunLog(logPath, { section: section ?? undefined, step, ok, detail });
          },
        });

        // Update judge/seo results with the post-rerun versions
        if (rerunResult.finalJudgeResult) judgeResult   = rerunResult.finalJudgeResult;
        if (rerunResult.seoAuditResult)   seoAuditResult = rerunResult.seoAuditResult;

        // Merge rerun section results back into the main results array
        for (const rerunSect of rerunResult.sectionResults) {
          const idx = results.findIndex(r => r.sectionId === rerunSect.sectionId);
          if (idx >= 0) results[idx] = rerunSect;
          else results.push(rerunSect);
        }

        for (const e of rerunResult.errors) sectionErrors.push(e);

        console.log(`\n  ✓ Phase 4E complete — ${rerunResult.sectionsRerun.length} section(s) rerun`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  ✗ Phase 4E rerun failed: ${msg}`);
        sectionErrors.push({ section: '_phase4e', error: msg });
        appendRunLog(logPath, { step: 'phase 4E rerun', ok: false, detail: msg });
      }
    } else {
      console.log(`\n  Phase 4E: No sections identified for rerun (plan saved to rerun-plan.json)`);
    }
  } else if (!cli.onlySection && (judgeResult || seoAuditResult)) {
    // Always generate rerun-plan.json after Phase 4D even without --rerun-failed,
    // so the user can inspect it and run cro-teardown:rerun-failed separately.
    buildRerunPlan({
      slug:        cli.slug,
      writingDir,
      maxSections: cli.maxRerunSections,
    });
  }

  // ── Persist reports ───────────────────────────────────────────────────────────
  const quality = buildQualitySummary(
    cli.slug, cli.mode, results, skipped, sectionErrors,
    judgeResult, seoAuditResult, assemblerResult,
  );
  saveJson(qualityPath, quality);
  saveJson(costPath,    tracker.toReport(cli.slug, cli.onlySection ?? 'all'));
  saveJson(errorsPath,  { errors: sectionErrors, count: sectionErrors.length });

  // ── Final summary ─────────────────────────────────────────────────────────────
  console.log(`\n${div}`);
  console.log(`  Phase 4C complete`);
  console.log(div);
  console.log(`  Sections run    : ${results.length}  |  Skipped: ${skipped.length}  |  Errors: ${sectionErrors.length}`);

  if (quality.averageScore !== null) {
    console.log(`  Average score   : ${quality.averageScore}/100`);
    console.log(`  Pass / Fail     : ${quality.passCount} / ${quality.failCount}`);
  }
  console.log(`  Total cost      : $${tracker.totalCostUsd.toFixed(6)}  (budget: $${cli.maxCostUsd})`);

  // Per-section score table
  if (results.length > 0) {
    console.log(`\n  Section scores:`);
    for (const r of results) {
      const scoreLabel = r.finalScore !== null ? `${r.finalScore}/100` : 'n/a (draft)';
      const passLabel  = r.finalScore !== null ? (r.passed ? 'PASS ✓' : 'FAIL ✗') : '';
      const rewrites   = r.loopsUsed > 0 ? ` (${r.loopsUsed} rewrite${r.loopsUsed > 1 ? 's' : ''})` : '';
      console.log(`    ${r.sectionId.padEnd(32)} ${scoreLabel.padEnd(10)} ${passLabel}${rewrites}`);
    }
  }

  if (quality.weakSections.length > 0) {
    console.log(`\n  Weak sections (score < 80):`);
    for (const s of quality.weakSections) console.log(`    ⚠ ${s}`);
  }

  if (quality.allRiskFlags.length > 0) {
    console.log(`\n  Risk flags across all sections:`);
    for (const f of quality.allRiskFlags.slice(0, 10)) console.log(`    ⚠ ${f}`);
    if (quality.allRiskFlags.length > 10) {
      console.log(`    … and ${quality.allRiskFlags.length - 10} more (see quality-summary.json)`);
    }
  }

  if (sectionErrors.length > 0) {
    console.log(`\n  Errors / warnings:`);
    for (const e of sectionErrors) console.log(`    ✗ [${e.section}] ${e.error}`);
  }

  // Phase 4D summary lines
  if (judgeResult) {
    const jLabel = judgeResult.pass ? 'PASS ✓' : 'FAIL ✗';
    console.log(`\n  Final judge      : ${judgeResult.overallScore}/100 — ${jLabel} [${judgeResult.model}]`);
    if (!judgeResult.pass) {
      if (judgeResult.unsupportedClaims.length > 0) {
        console.log(`    ⚠ Unsupported claims: ${judgeResult.unsupportedClaims.length}`);
      }
      if (judgeResult.requiredFixes.length > 0) {
        console.log(`    ✗ Required fixes: ${judgeResult.requiredFixes.length}`);
        for (const f of judgeResult.requiredFixes.slice(0, 3))
          console.log(`      • ${f}`);
      }
      if (judgeResult.rerunRecommendations.length > 0) {
        console.log(`    ↩ Rerun: ${judgeResult.rerunRecommendations.join(', ')}`);
      }
    }
  }
  if (seoAuditResult) {
    const sLabel = seoAuditResult.pass ? 'PASS ✓' : 'FAIL ✗';
    console.log(`  SEO audit        : ${seoAuditResult.seoScore}/100 — ${sLabel}`);
    if (!seoAuditResult.pass && seoAuditResult.requiredFixes.length > 0) {
      for (const f of seoAuditResult.requiredFixes.slice(0, 2))
        console.log(`      • ${f}`);
    }
  }

  if (assemblerResult) {
    console.log(`\n  article-final.md : ${assemblerResult.outputPath}`);
  }
  if (seoData) {
    console.log(`  seo.json         : ${path.join(writingDir, 'seo.json')}`);
  }
  if (judgeResult) {
    console.log(`  final-judge.json : ${path.join(writingDir, 'final-judge.json')}`);
  }
  if (seoAuditResult) {
    console.log(`  seo-audit.json   : ${path.join(writingDir, 'seo-audit.json')}`);
  }
  if (fs.existsSync(path.join(writingDir, 'rerun-plan.json'))) {
    console.log(`  rerun-plan.json  : ${path.join(writingDir, 'rerun-plan.json')}`);
  }
  console.log(`  quality-summary  : ${qualityPath}`);
  console.log(`\n${div}\n`);
}

main();
