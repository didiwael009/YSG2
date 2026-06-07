/**
 * CRO Teardown — Phase 2: visual deduplication + preview
 *
 * Auto mode (default):
 *   npm run cro-teardown:select -- --name Hootsuite [--threshold 0.96]
 *
 * Manual mode:
 *   npm run cro-teardown:select -- --name Hootsuite --manual 2023-01,2024-07,current-live
 */

import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { slugify, saveJson, saveText } from './utils/files.js';
import { initLogger, log } from './utils/logger.js';
import { fingerprint, similarity } from './dedup.js';
import { generatePreviewHtml } from './preview.js';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ArchiveEntry {
  month: string;
  slotStart?: string;
  slotEnd?: string;
  stepMonths?: number;
  timestamp?: string | null;
  originalUrl: string;
  waybackUrl?: string | null;
  screenshotPath: string | null;
  status: 'captured' | 'failed' | 'not_found';
}

export interface ScoredEntry {
  month: string;
  slotStart: string;
  slotEnd: string;
  timestamp: string | null;
  originalUrl: string;
  screenshotPath: string;       // relative to public/
  selectedPath: string | null;  // relative to public/, set after copy
  selected: boolean;
  duplicate: boolean;
  forceKept: boolean;           // first archive or current-live
  similarityToPrev: number | null;
  comparedTo: string | null;
  mode: 'auto' | 'manual';
}

// ─── CLI parsing ─────────────────────────────────────────────────────────────

interface CliArgs {
  name: string;
  threshold: number;
  manual: string[] | null;
}

function parseArgs(argv: string[]): CliArgs {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--') && i + 1 < argv.length) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }

  if (!args.name) {
    console.error('Missing required argument: --name');
    console.error('Usage: npm run cro-teardown:select -- --name <name> [--threshold 0.96] [--manual month1,month2]');
    process.exit(1);
  }

  const threshold = args.threshold !== undefined ? parseFloat(args.threshold) : 0.96;
  if (isNaN(threshold) || threshold <= 0 || threshold > 1) {
    console.error('--threshold must be a number between 0 and 1 (e.g. 0.96)');
    process.exit(1);
  }

  // Accept both 'current' and 'current-live' as aliases for the live entry
  const manual = args.manual
    ? args.manual.split(',').map(m => m.trim() === 'current-live' ? 'current' : m.trim()).filter(Boolean)
    : null;

  return { name: args.name, threshold, manual };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sortKey(month: string): string {
  return month === 'current' ? 'zzzz' : month;
}

function absImagePath(projectRoot: string, webPath: string): string {
  // webPath is like /cro-teardowns/slug/archive-monthly/2023-01.webp
  return path.join(projectRoot, 'public', webPath);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const { name, threshold, manual } = parseArgs(process.argv.slice(2));
  const mode: 'auto' | 'manual' = manual !== null ? 'manual' : 'auto';
  const slug = slugify(name);

  const projectRoot = process.cwd();
  const dataDir = path.join(projectRoot, 'data', 'cro-teardowns', slug);
  const publicDir = path.join(projectRoot, 'public', 'cro-teardowns', slug);
  const selectedDir = path.join(publicDir, 'selected');

  // Validate inputs
  const snapshotsPath = path.join(dataDir, 'archive-snapshots.json');
  if (!fs.existsSync(snapshotsPath)) {
    console.error(`archive-snapshots.json not found at ${snapshotsPath}`);
    console.error(`Run Phase 1 first: npm run cro-teardown -- --name "${name}" --url <url> --from <YYYY-MM> --to <YYYY-MM>`);
    process.exit(1);
  }

  fs.mkdirSync(selectedDir, { recursive: true });
  initLogger(dataDir, slug);
  log(`Phase 2 select — ${slug} | mode: ${mode}${mode === 'auto' ? ` | threshold: ${threshold}` : ` | months: ${manual!.join(',')}`}`);

  // Load and filter to captured entries only
  const allEntries: ArchiveEntry[] = JSON.parse(fs.readFileSync(snapshotsPath, 'utf-8'));
  const captured = allEntries
    .filter(e => e.status === 'captured' && e.screenshotPath)
    .sort((a, b) => sortKey(a.month).localeCompare(sortKey(b.month)));

  if (captured.length === 0) {
    console.error('No captured screenshots found. Run Phase 1 first.');
    process.exit(1);
  }

  log(`${captured.length} captured entries loaded`);

  // ── Deduplication ──────────────────────────────────────────────────────────
  const scored: ScoredEntry[] = [];

  if (mode === 'manual') {
    const manualSet = new Set(manual!);
    for (const entry of captured) {
      const keep = manualSet.has(entry.month);
      scored.push({
        month: entry.month,
        slotStart: entry.slotStart ?? entry.month,
        slotEnd: entry.slotEnd ?? entry.month,
        timestamp: entry.timestamp ?? null,
        originalUrl: entry.originalUrl,
        screenshotPath: entry.screenshotPath!,
        selectedPath: null,
        selected: keep,
        duplicate: false,
        forceKept: entry.month === 'current' || (keep && entry.month !== 'current'),
        similarityToPrev: null,
        comparedTo: null,
        mode: 'manual',
      });
    }
  } else {
    // Auto mode: fingerprint each image, compare sequentially to last kept
    const fps = new Map<string, Float32Array>();

    process.stdout.write(`\nFingerprinting ${captured.length} screenshots`);
    for (const entry of captured) {
      const abs = absImagePath(projectRoot, entry.screenshotPath!);
      try {
        fps.set(entry.month, await fingerprint(abs));
        process.stdout.write('.');
      } catch (err) {
        log(`Fingerprint failed for ${entry.month}: ${err instanceof Error ? err.message : String(err)}`);
        process.stdout.write('!');
      }
    }
    process.stdout.write('\n\n');

    let lastKeptMonth: string | null = null;

    for (let i = 0; i < captured.length; i++) {
      const entry = captured[i];
      const isFirst = i === 0;
      const isLive = entry.month === 'current';

      // Always keep: first archive entry and current-live
      if (isFirst || isLive) {
        scored.push({
          month: entry.month,
          slotStart: entry.slotStart ?? entry.month,
          slotEnd: entry.slotEnd ?? entry.month,
          timestamp: entry.timestamp ?? null,
          originalUrl: entry.originalUrl,
          screenshotPath: entry.screenshotPath!,
          selectedPath: null,
          selected: true,
          duplicate: false,
          forceKept: true,
          similarityToPrev: null,
          comparedTo: null,
          mode: 'auto',
        });
        if (!isLive) lastKeptMonth = entry.month;
        log(`${entry.month}: force-kept (${isFirst ? 'first' : 'current-live'})`);
        continue;
      }

      const fp = fps.get(entry.month);
      const prevFp = lastKeptMonth ? fps.get(lastKeptMonth) : null;
      let sim: number | null = null;

      if (fp && prevFp) {
        sim = similarity(fp, prevFp);
      }

      const isDuplicate = sim !== null && sim >= threshold;

      scored.push({
        month: entry.month,
        slotStart: entry.slotStart ?? entry.month,
        slotEnd: entry.slotEnd ?? entry.month,
        timestamp: entry.timestamp ?? null,
        originalUrl: entry.originalUrl,
        screenshotPath: entry.screenshotPath!,
        selectedPath: null,
        selected: !isDuplicate,
        duplicate: isDuplicate,
        forceKept: false,
        similarityToPrev: sim,
        comparedTo: lastKeptMonth,
        mode: 'auto',
      });

      if (!isDuplicate) lastKeptMonth = entry.month;
      log(`${entry.month}: ${isDuplicate ? `duplicate (${sim})` : `kept (sim=${sim})`} vs ${lastKeptMonth}`);
    }
  }

  // ── Copy selected screenshots to selected/ ────────────────────────────────
  for (const entry of scored) {
    if (!entry.selected) continue;

    const srcAbs = absImagePath(projectRoot, entry.screenshotPath);
    const filename = path.basename(entry.screenshotPath);
    const destAbs = path.join(selectedDir, filename);
    const webPath = `/cro-teardowns/${slug}/selected/${filename}`;

    try {
      fs.copyFileSync(srcAbs, destAbs);
      entry.selectedPath = webPath;
      log(`Copied ${entry.month} → selected/${filename}`);
    } catch (err) {
      log(`Copy failed for ${entry.month}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // ── Save scored-snapshots.json ────────────────────────────────────────────
  const scoredPath = path.join(dataDir, 'scored-snapshots.json');
  saveJson(scoredPath, scored);
  log(`scored-snapshots.json saved (${scored.length} entries)`);

  // ── Save selected-snapshots.json ──────────────────────────────────────────
  const selectedEntries = scored.filter(e => e.selected);
  const selectedPath = path.join(dataDir, 'selected-snapshots.json');
  saveJson(selectedPath, selectedEntries);
  log(`selected-snapshots.json saved (${selectedEntries.length} entries)`);

  // ── Generate preview.html ─────────────────────────────────────────────────
  const previewDir = dataDir;
  const html = generatePreviewHtml({
    projectRoot,
    previewDir,
    slug,
    companyName: name,
    originalUrl: captured[0]?.originalUrl ?? '',
    mode,
    threshold: mode === 'auto' ? threshold : null,
    manualMonths: manual ?? [],
    entries: scored,
    generatedAt: new Date().toLocaleString(),
  });
  const previewPath = path.join(dataDir, 'preview.html');
  saveText(previewPath, html);
  log(`preview.html saved`);

  // ── Terminal summary ──────────────────────────────────────────────────────
  const totalSelected = scored.filter(e => e.selected).length;
  const totalDuplicates = scored.filter(e => e.duplicate).length;

  console.log(`
─────────────────────────────────────────────
CRO teardown Phase 2 complete

Company:      ${name}
Mode:         ${mode}${mode === 'auto' ? ` (threshold ${threshold})` : ''}
Captured:     ${captured.length}
Selected:     ${totalSelected}
Duplicates:   ${totalDuplicates}

Output:
  - data/cro-teardowns/${slug}/scored-snapshots.json
  - data/cro-teardowns/${slug}/selected-snapshots.json
  - data/cro-teardowns/${slug}/preview.html
  - public/cro-teardowns/${slug}/selected/

Open preview:
  open data/cro-teardowns/${slug}/preview.html
─────────────────────────────────────────────
`);
}

main().catch(err => {
  console.error('Fatal error:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
