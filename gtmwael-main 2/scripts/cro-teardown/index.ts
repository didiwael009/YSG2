/**
 * CRO Teardown Generator — Phase 1
 *
 * Collects quarterly (or custom-interval) archived screenshots from the Wayback
 * Machine for a SaaS homepage, plus the current live homepage, and extracts
 * visible page text from the DOM for each captured page.
 *
 * Usage:
 *   npm run cro-teardown -- \
 *     --name Stripe \
 *     --url https://stripe.com \
 *     --from 2023-01 \
 *     --to 2026-06 \
 *     [--step-months 3]
 */

import * as path from 'node:path';
import * as process from 'node:process';
import { slugify, ensureDirs, saveJson } from './utils/files.js';
import { initLogger, log, getLogPath } from './utils/logger.js';
import { createBrowser } from './utils/browser.js';
import { discoverSnapshots } from './wayback.js';
import {
  captureArchivePage,
  captureCurrentPage,
  initSharedContext,
  closeSharedContext,
} from './screenshots.js';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CliArgs {
  name: string;
  url: string;
  from: string;
  to: string;
  stepMonths: number;
}

interface SnapshotRecord {
  month: string;
  slotStart: string;
  slotEnd: string;
  stepMonths: number;
  timestamp: string | null;
  originalUrl: string;
  waybackUrl: string | null;
  screenshotPath: string | null;
  textPathJson: string | null;
  textPathTxt: string | null;
  status: 'captured' | 'failed' | 'not_found';
  qualityScore: null;
  usedInArticle: boolean;
  error: string | null;
}

// ─── CLI parsing ─────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): CliArgs {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--') && i + 1 < argv.length) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }

  const required = ['name', 'url', 'from', 'to'];
  for (const key of required) {
    if (!args[key]) {
      console.error(`Missing required argument: --${key}`);
      console.error(
        'Usage: npm run cro-teardown -- --name <name> --url <url> --from <YYYY-MM> --to <YYYY-MM> [--step-months <n>]',
      );
      process.exit(1);
    }
  }

  if (!/^\d{4}-\d{2}$/.test(args.from) || !/^\d{4}-\d{2}$/.test(args.to)) {
    console.error('--from and --to must be in YYYY-MM format (e.g. 2023-01)');
    process.exit(1);
  }

  const stepMonths = args['step-months'] ? parseInt(args['step-months'], 10) : 3;
  if (isNaN(stepMonths) || stepMonths < 1 || stepMonths > 12) {
    console.error('--step-months must be a number between 1 and 12');
    process.exit(1);
  }

  return { name: args.name, url: args.url, from: args.from, to: args.to, stepMonths };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { name, url, from, to, stepMonths } = parseArgs(process.argv.slice(2));
  const slug = slugify(name);

  const projectRoot = process.cwd();
  const dataDir = path.join(projectRoot, 'data', 'cro-teardowns');
  const publicDir = path.join(projectRoot, 'public', 'cro-teardowns');

  ensureDirs(dataDir, publicDir, slug);
  const logPath = initLogger(dataDir, slug);

  log(`Starting CRO teardown for ${name} (${slug})`);
  log(`URL: ${url} | from: ${from} | to: ${to} | step: ${stepMonths} months`);

  const config = { name, slug, url, from, to, stepMonths, createdAt: new Date().toISOString(), phase: 1 };
  saveJson(path.join(dataDir, slug, 'config.json'), config);
  log('config.json saved');

  // ── Discover Wayback snapshots ──────────────────────────────────────────
  console.log(`\nDiscovering Wayback snapshots for ${name} (every ${stepMonths} months)...`);
  const discovered = await discoverSnapshots(url, from, to, stepMonths);
  const totalSlots = discovered.length;
  const found = discovered.filter((s) => s.status === 'found').length;
  const notFound = discovered.filter((s) => s.status === 'not_found').length;
  log(`Discovery complete: ${found} found, ${notFound} not_found out of ${totalSlots} slots`);
  console.log(`Found ${found} / ${totalSlots} snapshots. Starting screenshots...\n`);

  // ── Launch browser ──────────────────────────────────────────────────────
  const browser = await createBrowser();
  await initSharedContext(browser);
  const archiveDir = path.join(publicDir, slug, 'archive-monthly');
  const pageTextDir = path.join(dataDir, slug, 'page-text');

  // screenshotPath → relative to public/ (web-served)
  // textPath       → relative to project root (data/, not web-served)
  const toScreenshotPath = (abs: string) =>
    '/' + path.relative(path.join(projectRoot, 'public'), abs).replace(/\\/g, '/');
  const toDataPath = (abs: string) =>
    '/' + path.relative(projectRoot, abs).replace(/\\/g, '/');

  const records: SnapshotRecord[] = [];
  let screenshotsSaved = 0;
  let capturesFailed = 0;

  try {
    // ── Archive screenshots ───────────────────────────────────────────────
    for (let i = 0; i < discovered.length; i++) {
      const snapshot = discovered[i];
      const label = `[${String(i + 1).padStart(2)}/${totalSlots}] ${snapshot.month}`;

      if (snapshot.status === 'not_found') {
        records.push({
          month: snapshot.month,
          slotStart: snapshot.slotStart,
          slotEnd: snapshot.slotEnd,
          stepMonths: snapshot.stepMonths,
          timestamp: null,
          originalUrl: url,
          waybackUrl: null,
          screenshotPath: null,
          textPathJson: null,
          textPathTxt: null,
          status: 'not_found',
          qualityScore: null,
          usedInArticle: false,
          error: 'No Wayback snapshot found for this slot',
        });
        process.stdout.write(`  ${label} — not found\n`);
        continue;
      }

      process.stdout.write(`  ${label} — capturing...`);

      const result = await captureArchivePage(
        browser,
        snapshot.waybackUrl!,
        snapshot.month,
        archiveDir,
        pageTextDir,
      );

      if (result.success) {
        screenshotsSaved++;
        records.push({
          month: snapshot.month,
          slotStart: snapshot.slotStart,
          slotEnd: snapshot.slotEnd,
          stepMonths: snapshot.stepMonths,
          timestamp: snapshot.timestamp,
          originalUrl: url,
          waybackUrl: snapshot.waybackUrl,
          screenshotPath: toScreenshotPath(result.screenshotPath!),
          textPathJson: result.textPathJson ? toDataPath(result.textPathJson) : null,
          textPathTxt: result.textPathTxt ? toDataPath(result.textPathTxt) : null,
          status: 'captured',
          qualityScore: null,
          usedInArticle: false,
          error: null,
        });
        process.stdout.write(' done\n');
      } else {
        capturesFailed++;
        records.push({
          month: snapshot.month,
          slotStart: snapshot.slotStart,
          slotEnd: snapshot.slotEnd,
          stepMonths: snapshot.stepMonths,
          timestamp: snapshot.timestamp,
          originalUrl: url,
          waybackUrl: snapshot.waybackUrl,
          screenshotPath: null,
          textPathJson: null,
          textPathTxt: null,
          status: 'failed',
          qualityScore: null,
          usedInArticle: false,
          error: result.error,
        });
        process.stdout.write(` FAILED: ${result.error?.slice(0, 60)}\n`);
      }

      // Pause between captures to stay polite with Wayback
      await new Promise((r) => setTimeout(r, 1_500));
    }

    // ── Current live screenshot ───────────────────────────────────────────
    console.log('\n  Capturing current live homepage...');
    const liveResult = await captureCurrentPage(browser, url, archiveDir, pageTextDir);

    if (liveResult.success) {
      screenshotsSaved++;
      records.push({
        month: 'current',
        slotStart: 'current',
        slotEnd: 'current',
        stepMonths,
        timestamp: null,
        originalUrl: url,
        waybackUrl: null,
        screenshotPath: toScreenshotPath(liveResult.screenshotPath!),
        textPathJson: liveResult.textPathJson ? toDataPath(liveResult.textPathJson) : null,
        textPathTxt: liveResult.textPathTxt ? toDataPath(liveResult.textPathTxt) : null,
        status: 'captured',
        qualityScore: null,
        usedInArticle: false,
        error: null,
      });
      console.log('  Current live — done');
    } else {
      capturesFailed++;
      records.push({
        month: 'current',
        slotStart: 'current',
        slotEnd: 'current',
        stepMonths,
        timestamp: null,
        originalUrl: url,
        waybackUrl: null,
        screenshotPath: null,
        textPathJson: null,
        textPathTxt: null,
        status: 'failed',
        qualityScore: null,
        usedInArticle: false,
        error: liveResult.error,
      });
      console.log(`  Current live — FAILED: ${liveResult.error?.slice(0, 60)}`);
    }
  } finally {
    await closeSharedContext();
    await browser.close();
    log('Browser closed');
  }

  // ── Save archive-snapshots.json ─────────────────────────────────────────
  const snapshotsPath = path.join(dataDir, slug, 'archive-snapshots.json');
  saveJson(snapshotsPath, records);
  log(`archive-snapshots.json saved with ${records.length} entries`);

  // ── Terminal summary ────────────────────────────────────────────────────
  console.log(`
─────────────────────────────────────────────
CRO teardown Phase 1 complete

Company:            ${name}
URL:                ${url}
Step:               every ${stepMonths} months
Slots requested:    ${totalSlots}
Snapshots found:    ${found}
Screenshots saved:  ${screenshotsSaved}
Failed captures:    ${capturesFailed}
Not found:          ${notFound}

Output:
  - ${path.relative(projectRoot, snapshotsPath)}
  - ${path.relative(projectRoot, archiveDir)}/
  - ${path.relative(projectRoot, pageTextDir)}/

Log:
  - ${logPath ? path.relative(projectRoot, logPath) : 'n/a'}
─────────────────────────────────────────────
`);
}

main().catch((err) => {
  console.error('Fatal error:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
