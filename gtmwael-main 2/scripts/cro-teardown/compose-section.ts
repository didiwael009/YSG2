/**
 * Phase 4B — Single-section composer CLI.
 *
 * Usage:
 *   npm run cro-teardown:compose-section -- \
 *     --slug hootsuite --section 01-intro \
 *     --mode standard --max-cost 1 --max-rewrite-loops 2
 *
 * Options:
 *   --slug <string>            Teardown slug (e.g. "hootsuite")
 *   --section <string>         Section ID (e.g. "01-intro")
 *   --mode <string>            "standard" (default) | "draft" (writer only, no critique)
 *   --max-cost <number>        Budget cap in USD (default: 1.00)
 *   --max-rewrite-loops <n>    Max critic→rewrite iterations (default: 2)
 *   --min-score <number>       [TEST ONLY] Override pass threshold for this run (default: 85).
 *
 * SECURITY: ANTHROPIC_API_KEY is read exclusively from process.env or .env file.
 *           It is NEVER hardcoded.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

import { CostTracker } from './llm/token-cost.js';
import { writeSectionLoop } from './section-writer.js';
import { CRITIC_PASS_SCORE } from './config/writing-config.js';

// ─── CLI ──────────────────────────────────────────────────────────────────────

interface CliArgs {
  slug: string;
  section: string;
  mode: 'standard' | 'draft';
  maxCostUsd: number;
  maxRewriteLoops: number;
  minScore: number;
}

function parseArgs(argv: string[]): CliArgs {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--') && i + 1 < argv.length) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  if (!args.slug)    { console.error('Error: --slug is required');    process.exit(1); }
  if (!args.section) { console.error('Error: --section is required'); process.exit(1); }

  const mode = (args.mode ?? 'standard') as CliArgs['mode'];
  if (mode !== 'standard' && mode !== 'draft') {
    console.error(`Error: --mode must be "standard" or "draft", got "${mode}"`);
    process.exit(1);
  }

  return {
    slug:            args.slug,
    section:         args.section,
    mode,
    maxCostUsd:      parseFloat(args['max-cost'] ?? '1.00'),
    maxRewriteLoops: parseInt(args['max-rewrite-loops'] ?? '2', 10),
    minScore:        args['min-score'] !== undefined
                       ? parseInt(args['min-score'], 10)
                       : CRITIC_PASS_SCORE,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function saveJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function appendRunLog(
  logPath: string,
  entry: { step: string; ok: boolean; detail?: string },
): void {
  let existing: unknown[] = [];
  if (fs.existsSync(logPath)) {
    try { existing = JSON.parse(fs.readFileSync(logPath, 'utf-8')) as unknown[]; } catch {}
  }
  existing.push({ ...entry, ts: new Date().toISOString() });
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2), 'utf-8');
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

  const tracker = new CostTracker(cli.maxCostUsd);
  const errors: string[] = [];

  const log = (step: string, ok: boolean, detail?: string): void => {
    const icon = ok ? '✓' : '✗';
    console.log(`  ${icon} ${step}${detail ? ` — ${detail}` : ''}`);
    appendRunLog(logPath, { step, ok, detail });
  };

  // Banner
  console.log(`\nCRO Teardown — Phase 4B: Section Composer`);
  console.log(
    `  Slug: ${cli.slug}  |  Section: ${cli.section}  |  Mode: ${cli.mode}` +
    `  |  Budget: $${cli.maxCostUsd}  |  Max loops: ${cli.maxRewriteLoops}` +
    (cli.minScore !== CRITIC_PASS_SCORE ? `  |  Min-score: ${cli.minScore} ⚠ TEST` : '') +
    '\n',
  );
  if (cli.minScore !== CRITIC_PASS_SCORE) {
    console.log(
      `  ⚠ TEST MODE: pass threshold overridden to ${cli.minScore}` +
      ` (default ${CRITIC_PASS_SCORE})\n`,
    );
  }

  if (!fs.existsSync(writingDir)) {
    console.error(
      `  ✗ Writing directory not found: ${writingDir}\n` +
      `  Run Phase 4A first:\n` +
      `    npm run cro-teardown:generate-data -- --name <Company> --slug ${cli.slug}`,
    );
    process.exit(1);
  }

  try {
    const result = await writeSectionLoop({
      sectionId:       cli.section,
      writingDir,
      sectionsDir,
      maxRewriteLoops: cli.maxRewriteLoops,
      minScore:        cli.minScore,
      draftOnly:       cli.mode === 'draft',
      tracker,
      onLog:           log,
    });

    // Persist reports
    saveJson(costPath,   tracker.toReport(cli.slug, cli.section));
    saveJson(errorsPath, { errors, count: 0 });

    // Summary
    const div = '─'.repeat(60);
    console.log(`\n${div}`);
    console.log(`  Phase 4B complete — ${cli.section}`);
    console.log(div);
    console.log(`  Final version : v${result.finalVersion}`);
    if (result.finalScore !== null) {
      console.log(
        `  Final score   : ${result.finalScore}/100 — ${result.passed ? 'PASS ✓' : 'DID NOT PASS ✗'}` +
        (cli.minScore !== CRITIC_PASS_SCORE ? ` (threshold: ${cli.minScore} ⚠ test)` : ''),
      );
    } else {
      console.log(`  Final score   : n/a (draft-only mode)`);
    }
    console.log(`  Loops used    : ${result.loopsUsed} / ${cli.maxRewriteLoops}`);
    console.log(`  Total cost    : $${tracker.totalCostUsd.toFixed(6)}`);
    console.log(`\n  Output: data/cro-teardowns/${cli.slug}/writing/sections/${cli.section}.final.md`);

    if (result.remainingIssues.length > 0) {
      console.log(`\n  Remaining issues:`);
      for (const i of result.remainingIssues) console.log(`    • ${i}`);
    }
    if (result.riskFlags.length > 0) {
      console.log(`\n  Risk flags:`);
      for (const f of result.riskFlags) console.log(`    ⚠ ${f}`);
    }
    console.log(`\n${div}\n`);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(msg);
    console.error(`\n  ✗ Fatal error: ${msg}\n`);
    saveJson(errorsPath, { errors, count: errors.length });
    process.exit(1);
  }
}

main();
