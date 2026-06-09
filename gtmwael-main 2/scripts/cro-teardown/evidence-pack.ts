/**
 * Phase 4A — Evidence Pack
 *
 * Loads all raw data from disk for a given slug, runs the diff, and produces
 * a normalized EvidencePack that downstream steps consume.
 *
 * No inference, no interpretation — pure data loading and normalization.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { computeDiff, loadPageText, type DiffResult, type PageText } from './diff.js';
import { normalizePageTextPair, type NormalizedResult } from './normalize-page-text.js';
import { formatMonthLabel, formatPeriodLabel } from './config/writing-config.js';

// ─── Types ────────────────────────────────────────────────────────────────────

/** One selected snapshot from selected-snapshots.json */
export interface RawSnapshot {
  month: string;
  label: string;
  /** Public path for <img src> — the selectedPath from selected-snapshots.json */
  screenshotPath: string;
  timestamp: string | null;
  originalUrl: string;
  similarityToPrev: number | null;
  comparedTo: string | null;
}

export interface EvidencePack {
  slug: string;
  companyName: string;
  companyUrl: string;
  fromMonth: string;
  toMonth: string;
  /** Short label for the from period, e.g. "Jan 2023" */
  fromLabel: string;
  /** Short label for the to period, e.g. "Jun 2026" (actual date, not "Today") */
  toLabel: string;
  snapshots: RawSnapshot[];
  diff: DiffResult;
  /** Full PageText for the from snapshot */
  fromText: PageText;
  /** Full PageText for the to snapshot */
  toText: PageText;
  /**
   * PageText for the snapshot with the largest visual delta (lowest similarityToPrev).
   * null if there are fewer than 3 snapshots.
   */
  midTransitionText: PageText | null;
  midTransitionSnapshot: RawSnapshot | null;
  originalUrl: string;
  generatedAt: string;
  warnings: string[];
  /**
   * Layer 1 normalized views of the from/to page text.
   * Separates strategic signals from utility/noise for use by the article writer
   * and downstream LLM steps (strategic-shift-detector, seo-intent-planner).
   */
  normalizedFrom: NormalizedResult;
  normalizedTo: NormalizedResult;
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

interface SelectedEntry {
  month: string;
  slotStart: string;
  slotEnd: string;
  timestamp: string | null;
  originalUrl: string;
  screenshotPath: string;
  selectedPath: string | null;
  selected: boolean;
  duplicate: boolean;
  forceKept: boolean;
  similarityToPrev: number | null;
  comparedTo: string | null;
  mode: string;
}

interface ArchiveEntry {
  month: string;
  originalUrl: string;
}

export async function buildEvidencePack(opts: {
  projectRoot: string;
  slug: string;
  companyName: string;
}): Promise<EvidencePack> {
  const { projectRoot, slug, companyName } = opts;
  const dataDir = path.join(projectRoot, 'data', 'cro-teardowns', slug);
  const warnings: string[] = [];
  const generatedAt = new Date().toISOString();

  // ── 1. Validate prerequisites ─────────────────────────────────────────────
  const selectedPath = path.join(dataDir, 'selected-snapshots.json');
  if (!fs.existsSync(selectedPath)) {
    throw new Error(
      `selected-snapshots.json not found at ${selectedPath}.\n` +
      `Run Phase 1 + Phase 2 first:\n` +
      `  npm run cro-teardown -- --name "${companyName}" --url <url> --from <YYYY-MM> --to <YYYY-MM>\n` +
      `  npm run cro-teardown:select -- --name "${companyName}"`,
    );
  }

  // ── 2. Load selected snapshots ────────────────────────────────────────────
  const rawSelected = readJson<SelectedEntry[]>(selectedPath);
  const archives = rawSelected
    .filter(e => e.month !== 'current')
    .sort((a, b) => a.month.localeCompare(b.month));
  const liveEntry = rawSelected.find(e => e.month === 'current');

  if (archives.length === 0) {
    throw new Error('No archive snapshots found in selected-snapshots.json.');
  }

  const fromEntry = archives[0];
  const toEntry = liveEntry ?? archives[archives.length - 1];

  if (fromEntry.month === toEntry.month) {
    throw new Error('from and to snapshots are the same month — need at least 2 distinct snapshots.');
  }

  // ── 3. Resolve originalUrl ────────────────────────────────────────────────
  const archivePath = path.join(dataDir, 'archive-snapshots.json');
  let originalUrl = fromEntry.originalUrl ?? '';
  if (fs.existsSync(archivePath)) {
    const archiveData = readJson<ArchiveEntry[]>(archivePath);
    originalUrl = archiveData[0]?.originalUrl ?? originalUrl;
  }
  if (!originalUrl) warnings.push('Could not resolve originalUrl from archive-snapshots.json.');

  // ── 4. Load page texts ────────────────────────────────────────────────────
  const fromText = loadPageText(projectRoot, slug, fromEntry.month);
  const toText = loadPageText(projectRoot, slug, toEntry.month);

  if (!fromText) {
    throw new Error(
      `Page text not found for ${fromEntry.month}. ` +
      `Expected: data/cro-teardowns/${slug}/page-text/${fromEntry.month}.json`,
    );
  }
  if (!toText) {
    throw new Error(
      `Page text not found for ${toEntry.month === 'current' ? 'current-live' : toEntry.month}. ` +
      `Expected: data/cro-teardowns/${slug}/page-text/${toEntry.month === 'current' ? 'current-live' : toEntry.month}.json`,
    );
  }

  // ── 5. Compute diff ───────────────────────────────────────────────────────
  const diff = computeDiff(fromText, toText, fromEntry.month, toEntry.month);

  if (diff.visualOnly) {
    warnings.push(
      'No significant text changes detected between from and to snapshots. ' +
      'This may be a visual-only redesign. The generated article will reflect this.',
    );
  }

  // ── 6. Build normalized snapshot list ─────────────────────────────────────
  const snapshots: RawSnapshot[] = rawSelected.map(e => ({
    month: e.month,
    label: formatMonthLabel(e.month),
    screenshotPath: e.selectedPath ?? e.screenshotPath,
    timestamp: e.timestamp,
    originalUrl: e.originalUrl ?? originalUrl,
    similarityToPrev: e.similarityToPrev,
    comparedTo: e.comparedTo,
  }));

  // ── 7. Find mid-transition snapshot ───────────────────────────────────────
  // The snapshot with the largest visual delta (lowest similarityToPrev) among non-forced entries.
  const candidateMiddle = archives.slice(1, -1); // exclude first (forced) and last
  let midTransitionSnapshot: RawSnapshot | null = null;
  let midTransitionText: PageText | null = null;

  if (candidateMiddle.length > 0) {
    const withSim = candidateMiddle
      .map(e => ({
        entry: e,
        snap: snapshots.find(s => s.month === e.month)!,
        sim: e.similarityToPrev ?? 1,
      }))
      .filter(x => x.snap);

    if (withSim.length > 0) {
      withSim.sort((a, b) => a.sim - b.sim); // lowest sim first = biggest change
      const best = withSim[0];
      midTransitionSnapshot = best.snap;
      midTransitionText = loadPageText(projectRoot, slug, best.entry.month);
      if (!midTransitionText) {
        warnings.push(`Page text not found for mid-transition snapshot ${best.entry.month} — annotations will be limited.`);
      }
    }
  } else {
    warnings.push('Only 2 snapshots available — no mid-transition analysis block will be generated.');
  }

  // ── 8. Labels ─────────────────────────────────────────────────────────────
  const fromLabel = formatPeriodLabel(fromEntry.month, generatedAt);
  const toLabel = formatPeriodLabel(toEntry.month, generatedAt);

  // ── 9. Layer 1 — Normalize from/to page text ──────────────────────────────
  // Runs after the diff so it does not affect diff counts.
  // Produces { raw, normalized: { strategicNav, primaryCtas, utilityLinks, sectionHeadings } }
  // for use by downstream LLM steps (strategic-shift-detector, seo-intent-planner).
  const { from: normalizedFrom, to: normalizedTo } = normalizePageTextPair(fromText, toText);

  return {
    slug,
    companyName,
    companyUrl: originalUrl,
    fromMonth: fromEntry.month,
    toMonth: toEntry.month,
    fromLabel,
    toLabel,
    snapshots,
    diff,
    fromText,
    toText,
    midTransitionText,
    midTransitionSnapshot,
    originalUrl,
    generatedAt,
    warnings,
    normalizedFrom,
    normalizedTo,
  };
}
