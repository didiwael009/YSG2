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
 *     [--concurrency 3]
 */

import * as path from 'node:path';
import * as process from 'node:process';
import { slugify, ensureDirs, saveJson } from './utils/files.js';
import { initLogger, log, getLogPath } from './utils/logger.js';
import { createBrowser, createContext } from './utils/browser.js';
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
  concurrency: number;
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
  status: 'captured' | 'failed' | 'not_found' | 'duplicate_content';
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
        'Usage: npm run cro-teardown -- --name <name> --url <url> --from <YYYY-MM> --to <YYYY-MM> [--step-months <n>] [--concurrency <n>]',
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

  const concurrency = args['concurrency'] ? parseInt(args['concurrency'], 10) : 2;
  if (isNaN(concurrency) || concurrency < 1 || concurrency > 6) {
    console.error('--concurrency must be a number between 1 and 6');
    process.exit(1);
  }

  return { name: args.name, url: args.url, from: args.from, to: args.to, stepMonths, concurrency };
}

// ─── Concurrency helper ───────────────────────────────────────────────────────

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

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { name, url, from, to, stepMonths, concurrency } = parseArgs(process.argv.slice(2));
  const slug = slugify(name);

  const projectRoot = process.cwd();
  const dataDir = path.join(projectRoot, 'data', 'cro-teardowns');
  const publicDir = path.join(projectRoot, 'public', 'cro-teardowns');

  ensureDirs(dataDir, publicDir, slug);
  const logPath = initLogger(dataDir, slug);

  log(`Starting CRO teardown for ${name} (${slug})`);
  log(`URL: ${url} | from: ${from} | to: ${to} | step: ${stepMonths} months | concurrency: ${concurrency}`);

  const config = { name, slug, url, from, to, stepMonths, createdAt: new Date().toISOString(), phase: 1 };
  saveJson(path.join(dataDir, slug, 'config.json'), config);
  log('config.json saved');

  // ── Discover Wayback snapshots ──────────────────────────────────────────
  console.log(`\nDiscovering Wayback snapshots for ${name} (every ${stepMonths} months)...`);
  const discovered = await discoverSnapshots(url, from, to, stepMonths);
  const totalSlots = discovered.length;
  const found = discovered.filter((s) => s.status === 'found').length;
  const notFound = discovered.filter((s) => s.status === 'not_found').length;
  const dupContent = discovered.filter((s) => s.status === 'duplicate_content').length;
  log(`Discovery complete: ${found} found, ${dupContent} duplicate_content, ${notFound} not_found out of ${totalSlots} slots`);
  console.log(`Found ${found} / ${totalSlots} snapshots (${dupContent} digest-identical skipped). Starting screenshots (concurrency: ${concurrency})...\n`);

  // ── Launch browser ──────────────────────────────────────────────────────
  const browser = await createBrowser();
  const archiveDir = path.join(publicDir, slug, 'archive-monthly');
  const pageTextDir = path.join(dataDir, slug, 'page-text');

  const toScreenshotPath = (abs: string) =>
    '/' + path.relative(path.join(projectRoot, 'public'), abs).replace(/\\/g, '/');
  const toDataPath = (abs: string) =>
    '/' + path.relative(projectRoot, abs).replace(/\\/g, '/');

  // "not_found" and "duplicate_content" slots produce records immediately — no capture needed
  const skippedRecords: SnapshotRecord[] = discovered
    .filter((s) => s.status === 'not_found' || s.status === 'duplicate_content')
    .map((s) => ({
      month: s.month,
      slotStart: s.slotStart,
      slotEnd: s.slotEnd,
      stepMonths: s.stepMonths,
      timestamp: s.timestamp ?? null,
      originalUrl: url,
      waybackUrl: s.waybackUrl ?? null,
      screenshotPath: null,
      textPathJson: null,
      textPathTxt: null,
      status: s.status as 'not_found' | 'duplicate_content',
      qualityScore: null,
      usedInArticle: false,
      error: s.status === 'not_found'
        ? 'No Wayback snapshot found for this slot'
        : 'Identical content digest to previous snapshot — skipped',
    }));

  // Only slots with new content need capture
  const toCapture = discovered.filter((s) => s.status === 'found');

  let screenshotsSaved = 0;
  let capturesFailed = 0;
  let capturedRecords: SnapshotRecord[] = [];

  try {
    if (concurrency === 1) {
      // ── Sequential mode (original behaviour) ─────────────────────────────
      await initSharedContext(browser);

      for (let i = 0; i < toCapture.length; i++) {
        const snapshot = toCapture[i];
        const label = `[${String(i + 1).padStart(2)}/${toCapture.length}]`;
        process.stdout.write(`  ${label} ${snapshot.month} — capturing...`);

        const result = await captureArchivePage(
          browser,
          snapshot.waybackUrl!,
          snapshot.month,
          archiveDir,
          pageTextDir,
        );

        if (result.success) {
          screenshotsSaved++;
          capturedRecords.push({
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
          capturedRecords.push({
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

        await new Promise((r) => setTimeout(r, 1_500));
      }

      await closeSharedContext();
    } else {
      // ── Parallel mode ─────────────────────────────────────────────────────
      // Each worker creates its own BrowserContext so recycling on error is safe.
      // No shared context is initialised — captureArchivePage falls back to creating
      // its own context per call when sharedCtx is null.

      const parallelResults = await mapWithConcurrency(
        toCapture,
        concurrency,
        async (snapshot, workerIdx) => {
          // Each parallel worker uses a fresh isolated context (no global sharedCtx)
          const ctx = await createContext(browser);
          try {
            const { capturePageWithContext } = await import('./screenshots.js');
            const result = await capturePageWithContext(
              ctx,
              snapshot.waybackUrl!,
              snapshot.month,
              archiveDir,
              pageTextDir,
              true,
            );

            const status = result.success ? '✓' : '✗';
            const detail = result.success ? 'done' : `FAILED: ${result.error?.slice(0, 50)}`;
            console.log(`  ${status} ${snapshot.month} — ${detail}`);

            return { snapshot, result };
          } finally {
            await ctx.close().catch(() => {});
          }
        },
      );

      for (const { snapshot, result } of parallelResults) {
        if (result.success) {
          screenshotsSaved++;
          capturedRecords.push({
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
        } else {
          capturesFailed++;
          capturedRecords.push({
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
        }
      }
    }

    // ── Current live screenshot (always sequential — just one) ────────────
    console.log('\n  Capturing current live homepage...');
    // For live capture, use a fresh isolated context
    const liveCtx = await createContext(browser);
    let liveResult;
    try {
      const { captureCurrentPageWithContext } = await import('./screenshots.js');
      liveResult = await captureCurrentPageWithContext(liveCtx, url, archiveDir, pageTextDir);
    } finally {
      await liveCtx.close().catch(() => {});
    }

    if (liveResult.success) {
      screenshotsSaved++;
      capturedRecords.push({
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
      capturedRecords.push({
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
    await browser.close();
    log('Browser closed');
  }

  // Merge records in original slot order
  const recordsByMonth = new Map(capturedRecords.map((r) => [r.month, r]));
  const skippedByMonth = new Map(skippedRecords.map((r) => [r.month, r]));
  const records: SnapshotRecord[] = [];
  for (const s of discovered) {
    if (s.status === 'not_found' || s.status === 'duplicate_content') {
      const r = skippedByMonth.get(s.month);
      if (r) records.push(r);
    } else {
      const r = recordsByMonth.get(s.month);
      if (r) records.push(r);
    }
  }
  // Append current-live at end
  const liveRecord = recordsByMonth.get('current');
  if (liveRecord) records.push(liveRecord);

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
Concurrency:        ${concurrency}
Slots requested:    ${totalSlots}
Snapshots found:    ${found}
Digest-skipped:     ${dupContent}
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
