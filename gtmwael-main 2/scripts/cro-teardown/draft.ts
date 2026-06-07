/**
 * CRO Teardown — Phase 3: article draft generator
 *
 * Usage:
 *   npm run cro-teardown:draft -- <slug|--name name> [options]
 *
 * Options:
 *   --insight-mode  facts-only | guided | full-draft   (default: guided)
 *   --no-interactive                                    (alias for facts-only)
 *
 * Examples:
 *   npm run cro-teardown:draft -- hootsuite
 *   npm run cro-teardown:draft -- hootsuite --insight-mode guided
 *   npm run cro-teardown:draft -- hootsuite --insight-mode full-draft
 *   npm run cro-teardown:draft -- hootsuite --no-interactive
 */

import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { slugify, saveText } from './utils/files.js';
import { initLogger, log } from './utils/logger.js';
import { computeDiff, loadPageText, type DiffResult } from './diff.js';
import {
  buildMdx,
  autoDetectChoices,
  CRO_OPTIONS,
  POSITIONING_OPTIONS,
  LEARNING_OPTIONS,
  ADS_OPTIONS,
  COPY_OPTIONS,
  type InterpretationChoices,
} from './mdx.js';
import {
  openPromptSession,
  closePromptSession,
  askChoice,
  printDivider,
} from './prompt.js';

// ─── Types ────────────────────────────────────────────────────────────────────

type InsightMode = 'facts-only' | 'guided' | 'full-draft';

interface SelectedEntry {
  month: string;
  screenshotPath: string | null;
  status: string;
}

// ─── CLI parsing ──────────────────────────────────────────────────────────────

interface CliArgs {
  slug: string;
  companyName: string;
  insightMode: InsightMode;
}

function parseArgs(argv: string[]): CliArgs {
  const args: Record<string, string> = {};
  const positional: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      if (argv[i] === '--no-interactive') {
        args['insight-mode'] = 'facts-only';
      } else if (i + 1 < argv.length) {
        args[argv[i].slice(2)] = argv[i + 1];
        i++;
      }
    } else {
      positional.push(argv[i]);
    }
  }

  // Accept positional slug OR --name
  const rawName = positional[0] || args.name;
  if (!rawName) {
    console.error('Missing company name. Usage: npm run cro-teardown:draft -- <slug-or-name> [--insight-mode guided]');
    process.exit(1);
  }

  const slug = slugify(rawName);
  // Reconstruct display name from slug if positional (best-effort capitalisation)
  const companyName = args.name || rawName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const rawMode = args['insight-mode'] ?? 'guided';
  const validModes: InsightMode[] = ['facts-only', 'guided', 'full-draft'];
  if (!validModes.includes(rawMode as InsightMode)) {
    console.error(`--insight-mode must be one of: ${validModes.join(' | ')}`);
    process.exit(1);
  }

  return { slug, companyName, insightMode: rawMode as InsightMode };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { slug, companyName, insightMode } = parseArgs(process.argv.slice(2));

  const projectRoot = process.cwd();
  const dataDir = path.join(projectRoot, 'data', 'cro-teardowns', slug);
  const draftsDir = path.join(dataDir, 'drafts');

  // Validate Phase 1 + Phase 2 ran first
  const selectedPath = path.join(dataDir, 'selected-snapshots.json');
  if (!fs.existsSync(selectedPath)) {
    console.error(`selected-snapshots.json not found. Run Phase 1 then Phase 2 first:`);
    console.error(`  npm run cro-teardown -- --name "${companyName}" --url <url> --from <YYYY-MM> --to <YYYY-MM>`);
    console.error(`  npm run cro-teardown:select -- --name "${companyName}"`);
    process.exit(1);
  }

  fs.mkdirSync(draftsDir, { recursive: true });
  initLogger(dataDir, slug);
  log(`Phase 3 draft — ${slug} | mode: ${insightMode}`);

  // Load selected snapshots
  const selected: SelectedEntry[] = JSON.parse(fs.readFileSync(selectedPath, 'utf-8'));

  // Pick from/to: earliest non-current vs current (or latest available)
  const archives = selected.filter(e => e.month !== 'current').sort((a, b) => a.month.localeCompare(b.month));
  const liveEntry = selected.find(e => e.month === 'current');
  const fromEntry = archives[0];
  const toEntry = liveEntry ?? archives[archives.length - 1];

  if (!fromEntry || !toEntry || fromEntry.month === toEntry.month) {
    console.error('Need at least 2 selected snapshots (one archive + current-live) to generate a diff.');
    process.exit(1);
  }

  // Load page text
  const fromText = loadPageText(projectRoot, slug, fromEntry.month);
  const toText = loadPageText(projectRoot, slug, toEntry.month);

  if (!fromText || !toText) {
    console.error(`Missing page-text for ${!fromText ? fromEntry.month : toEntry.month}. Text extraction may have failed during Phase 1.`);
    process.exit(1);
  }

  // Run diff
  const diff = computeDiff(fromText, toText, fromEntry.month, toEntry.month);
  log(`Diff computed: ${diff.headlines.length} headline changes, ${diff.h2Added.length + diff.h2Removed.length} h2 changes, ${diff.ctaAdded.length + diff.ctaRemoved.length} cta changes`);

  // ── Collect interpretation choices ─────────────────────────────────────────
  let choices: InterpretationChoices;

  if (insightMode === 'facts-only') {
    choices = { croInterpretation: null, positioningShift: null, teamLearning: null, paidAdsContext: null, whatToCopy: null };

  } else if (insightMode === 'full-draft') {
    choices = autoDetectChoices(diff);
    console.log(`\n[full-draft] Auto-detected interpretations:`);
    if (choices.croInterpretation) console.log(`  CRO: ${CRO_OPTIONS[choices.croInterpretation - 1]?.label}`);
    if (choices.positioningShift) console.log(`  Positioning: ${POSITIONING_OPTIONS[choices.positioningShift - 1]?.label}`);

  } else {
    // guided — interactive prompts
    openPromptSession();
    try {
      choices = await runGuidedPrompts(diff, companyName);
    } finally {
      closePromptSession();
    }
  }

  // ── Build MDX ───────────────────────────────────────────────────────────────
  const generatedAt = new Date().toISOString();

  // Resolve originalUrl from archive-snapshots.json
  const archivePath = path.join(dataDir, 'archive-snapshots.json');
  let originalUrl = '';
  if (fs.existsSync(archivePath)) {
    const archive = JSON.parse(fs.readFileSync(archivePath, 'utf-8'));
    originalUrl = archive[0]?.originalUrl ?? '';
  }
  const finalMdx = buildMdx({ companyName, slug, originalUrl, diff, choices, insightMode, generatedAt });

  // ── Save ────────────────────────────────────────────────────────────────────
  const ts = new Date().toISOString().slice(0, 10);
  const filename = `${slug}-cro-teardown-${ts}.mdx`;
  const outPath = path.join(draftsDir, filename);
  const latestPath = path.join(draftsDir, 'latest.mdx');

  saveText(outPath, finalMdx);
  saveText(latestPath, finalMdx);
  log(`Draft saved: ${filename}`);

  // ── Summary ─────────────────────────────────────────────────────────────────
  const selectedCount = Object.values(choices).filter(v => v !== null).length;
  console.log(`
─────────────────────────────────────────────
CRO teardown Phase 3 complete

Company:       ${companyName}
Compared:      ${fromEntry.month} → ${toEntry.month}
Insight mode:  ${insightMode}
Diff summary:  ${diff.headlines.length} headline · ${diff.h2Added.length + diff.h2Removed.length} h2 · ${diff.ctaAdded.length + diff.ctaRemoved.length} cta changes
${insightMode !== 'facts-only' ? `Interpretation: ${selectedCount} section(s) included\n` : ''}
Output:
  - data/cro-teardowns/${slug}/drafts/${filename}
  - data/cro-teardowns/${slug}/drafts/latest.mdx
─────────────────────────────────────────────
`);
}

// ─── Guided prompt flow ───────────────────────────────────────────────────────

async function runGuidedPrompts(
  diff: DiffResult,
  companyName: string,
): Promise<InterpretationChoices> {
  const choices: InterpretationChoices = {
    croInterpretation: null,
    positioningShift: null,
    teamLearning: null,
    paidAdsContext: null,
    whatToCopy: null,
  };

  printDivider(`${companyName} — CRO interpretation`);

  // Show the headline diff as context before prompting
  if (diff.headlines.length > 0) {
    const h = diff.headlines[0];
    console.log(`\nDetected main headline shift:`);
    console.log(`  From: "${h.from}"`);
    console.log(`  To:   "${h.to}"`);
  } else if (diff.metaDescs.length > 0) {
    const m = diff.metaDescs[0];
    console.log(`\nNo headline change detected. Meta description changed:`);
    console.log(`  From: "${m.from.slice(0, 80)}..."`);
    console.log(`  To:   "${m.to.slice(0, 80)}..."`);
  } else {
    console.log(`\nNo significant text change detected. This may be a visual-only redesign.`);
  }

  // 1. CRO interpretation
  const croPick = await askChoice(
    'How should this homepage shift be interpreted?',
    CRO_OPTIONS,
  );
  choices.croInterpretation = croPick;

  // 2. Positioning shift
  printDivider('Positioning shift');
  if (diff.headlines.length > 0) {
    const h = diff.headlines[0];
    console.log(`\nFrom: "${h.from}"`);
    console.log(`To:   "${h.to}"`);
  }
  const posPick = await askChoice(
    'What does this suggest about their market positioning?',
    POSITIONING_OPTIONS,
  );
  choices.positioningShift = posPick;

  // 3. What SaaS teams can learn
  printDivider('What SaaS teams can learn');
  const learnPick = await askChoice(
    'Which learning angle should be highlighted?',
    LEARNING_OPTIONS,
  );
  choices.teamLearning = learnPick;

  // 4. Paid ads context (optional)
  printDivider('Paid ads context (optional)');
  const adsPick = await askChoice(
    'Add a paid ads context note?',
    ADS_OPTIONS,
  );
  choices.paidAdsContext = adsPick;

  // 5. What to copy (optional)
  printDivider('What to copy (optional)');
  const copyPick = await askChoice(
    'Add a "what to copy" section?',
    COPY_OPTIONS,
  );
  choices.whatToCopy = copyPick;

  return choices;
}

main().catch(err => {
  console.error('Fatal error:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
