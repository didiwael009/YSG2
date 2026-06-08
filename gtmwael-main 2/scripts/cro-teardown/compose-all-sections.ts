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
import {
  SECTION_ORDER,
  writeSectionLoop,
  type WriteSectionResult,
} from './section-writer.js';
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
  rerunFailed: boolean;
  maxRerunSections: number;
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
    // Phase 4E: selective rerun after judge/SEO
    rerunFailed:      flags.has('rerun-failed'),
    maxRerunSections: parseInt(args['max-rerun-sections'] ?? '3', 10),
  };
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
  console.log(`  Force      : ${cli.force ? 'yes — regenerating all' : 'no — skipping existing finals'}`);
  if (cli.skipFinalJudge) console.log(`  Judge      : skipped (--skip-final-judge)`);
  if (cli.skipSeoAudit)   console.log(`  SEO audit  : skipped (--skip-seo-audit)`);
  if (cli.rerunFailed)    console.log(`  Rerun mode : enabled (max ${cli.maxRerunSections} sections)`);
  console.log(div + '\n');

  // ── Section loop ─────────────────────────────────────────────────────────────
  for (const sectionId of sectionsToRun) {
    const finalPath = path.join(sectionsDir, `${sectionId}.final.md`);

    // Resume check
    if (!cli.force && fs.existsSync(finalPath)) {
      console.log(`  ↩ Skipping ${sectionId} — final.md exists (pass --force to regenerate)`);
      skipped.push(sectionId);
      appendRunLog(logPath, { section: sectionId, step: 'skipped (final exists)', ok: true });
      continue;
    }

    // Global budget check — stop before the section, not mid-way
    if (tracker.totalCostUsd >= cli.maxCostUsd) {
      const msg = `Global budget $${cli.maxCostUsd} reached after ${results.length} section(s). Stopping.`;
      console.log(`\n  ⚠ ${msg}`);
      sectionErrors.push({ section: sectionId, error: msg });
      appendRunLog(logPath, { section: sectionId, step: 'budget cap — skipped', ok: false, detail: msg });
      break;
    }

    console.log(`\n${div}`);
    console.log(`  Section: ${sectionId}`);
    console.log(div);

    const sectionLog = (step: string, ok: boolean, detail?: string): void => {
      const icon = ok ? '✓' : '✗';
      console.log(`  ${icon} ${step}${detail ? ` — ${detail}` : ''}`);
      appendRunLog(logPath, { section: sectionId, step, ok, detail });
    };

    try {
      const result = await writeSectionLoop({
        sectionId,
        writingDir,
        sectionsDir,
        maxRewriteLoops: cli.maxRewriteLoops,
        minScore:        CRITIC_PASS_SCORE,   // always use default in Phase 4C
        draftOnly:       cli.mode === 'draft',
        tracker,
        onLog:           sectionLog,
      });

      results.push(result);

      const scoreStr = result.finalScore !== null
        ? `score ${result.finalScore}/100 — ${result.passed ? 'PASS ✓' : 'FAIL ✗'}`
        : 'draft (no score)';
      console.log(`\n  ✓ ${sectionId} done — ${scoreStr}  cost $${result.sectionCostUsd.toFixed(4)}`);

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`\n  ✗ ${sectionId} FAILED: ${msg}`);
      sectionErrors.push({ section: sectionId, error: msg });
      appendRunLog(logPath, { section: sectionId, step: 'SECTION ERROR', ok: false, detail: msg });
      // Continue with next section — don't abort the whole run
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
  if (!cli.skipSeoAudit && seoData) {
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
