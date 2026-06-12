import { log, logError } from './utils/logger.js';

export interface WaybackSnapshot {
  month: string;       // slot label — equals slotStart
  slotStart: string;   // first month of the search window (YYYY-MM)
  slotEnd: string;     // last month of the search window (YYYY-MM)
  stepMonths: number;  // window size used for this run
  timestamp: string | null;
  originalUrl: string;
  waybackUrl: string | null;
  digest: string | null;
  status: 'found' | 'not_found' | 'duplicate_content';
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function getSlotStarts(from: string, to: string, stepMonths: number): string[] {
  const slots: string[] = [];
  let [year, month] = from.split('-').map(Number);
  const [toYear, toMonth] = to.split('-').map(Number);

  while (year < toYear || (year === toYear && month <= toMonth)) {
    slots.push(`${year}-${String(month).padStart(2, '0')}`);
    month += stepMonths;
    while (month > 12) {
      month -= 12;
      year++;
    }
  }

  return slots;
}

function addMonths(yearStr: string, monStr: string, add: number): { y: number; m: number } {
  let y = Number(yearStr);
  let m = Number(monStr) + add;
  while (m > 12) { m -= 12; y++; }
  while (m < 1)  { m += 12; y--; }
  return { y, m };
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function slotEndMonth(slotStart: string, stepMonths: number): string {
  const [yearStr, monStr] = slotStart.split('-');
  const end = addMonths(yearStr, monStr, stepMonths - 1);
  return `${end.y}-${String(end.m).padStart(2, '0')}`;
}

/** Midpoint timestamp integer (YYYYMMDD) for the given slot */
function slotMidpoint(slotStart: string, stepMonths: number): number {
  const [yearStr, monStr] = slotStart.split('-');
  const mid = addMonths(yearStr, monStr, Math.floor(stepMonths / 2));
  return parseInt(`${mid.y}${String(mid.m).padStart(2, '0')}15`, 10);
}

// ─── CDX helpers ──────────────────────────────────────────────────────────────

/**
 * ONE bulk CDX query for the full date range.
 * Returns [timestamp, digest] rows (header row already stripped).
 * Tries exact URL first; if 0 rows, toggles www/non-www as fallback.
 */
async function fetchAllSnapshots(
  url: string,
  fromDate: string,
  toDate: string,
): Promise<Array<{ timestamp: string; digest: string }>> {
  const base    = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const altBase = base.startsWith('www.') ? base.slice(4) : `www.${base}`;
  const candidates = [base, altBase];

  for (const candidate of candidates) {
    const cdxUrl =
      `https://web.archive.org/cdx/search/cdx` +
      `?url=${encodeURIComponent(candidate)}` +
      `&output=json` +
      `&fl=timestamp,digest` +
      `&from=${fromDate}` +
      `&to=${toDate}` +
      `&filter=statuscode:200` +
      `&collapse=timestamp:6` +   // one row per month, server-side
      `&limit=2000`;

    log(`Bulk CDX query (${candidate}): ${cdxUrl}`);

    let lastErr: unknown;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const resp = await fetch(cdxUrl, { signal: AbortSignal.timeout(45_000) });
        if (!resp.ok) throw new Error(`CDX returned ${resp.status}`);
        const raw = (await resp.json()) as string[][];
        if (!Array.isArray(raw)) break;
        const rows = raw.slice(1); // strip header
        if (rows.length > 0) {
          log(`Bulk CDX: ${rows.length} rows for ${candidate}`);
          return rows.map(r => ({ timestamp: r[0], digest: r[1] ?? '' }));
        }
        break; // empty result — try alt candidate
      } catch (err) {
        lastErr = err;
        if (attempt < 3) {
          const delay = 1500 * attempt;
          log(`CDX attempt ${attempt} failed (${String(err)}), retrying in ${delay}ms…`);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }
    if (lastErr) log(`CDX failed for ${candidate}: ${String(lastErr)}`);
  }

  return [];
}

// ─── Slot bucketing ───────────────────────────────────────────────────────────

/**
 * Given all CDX rows for the full range, assign one best timestamp per slot.
 * "Best" = closest to the slot midpoint.
 */
function bucketToSlots(
  rows: Array<{ timestamp: string; digest: string }>,
  slots: string[],
  stepMonths: number,
): Map<string, { timestamp: string; digest: string }> {
  const result = new Map<string, { timestamp: string; digest: string }>();

  for (const slot of slots) {
    const [yearStr, monStr] = slot.split('-');
    const end = addMonths(yearStr, monStr, stepMonths);
    const windowStart = parseInt(`${yearStr}${monStr.padStart(2, '0')}01`, 10);
    const windowEnd   = parseInt(`${end.y}${String(end.m).padStart(2, '0')}01`, 10);
    const midpoint    = slotMidpoint(slot, stepMonths);

    const slotRows = rows.filter(r => {
      const ts = parseInt(r.timestamp.slice(0, 8), 10);
      return ts >= windowStart && ts < windowEnd;
    });

    if (slotRows.length === 0) continue;

    // Pick the row closest to the midpoint
    let best = slotRows[0];
    let bestDiff = Math.abs(parseInt(best.timestamp.slice(0, 8), 10) - midpoint);
    for (const row of slotRows) {
      const diff = Math.abs(parseInt(row.timestamp.slice(0, 8), 10) - midpoint);
      if (diff < bestDiff) { bestDiff = diff; best = row; }
    }

    result.set(slot, best);
  }

  return result;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function discoverSnapshots(
  url: string,
  from: string,
  to: string,
  stepMonths = 3,
): Promise<WaybackSnapshot[]> {
  const slots = getSlotStarts(from, to, stepMonths);

  // Build full-range date bounds for the single bulk CDX query
  const [fromYear, fromMon] = from.split('-');
  const [toYear, toMon]     = to.split('-');
  const lastDay = daysInMonth(Number(toYear), Number(toMon));
  const fromDate = `${fromYear}${fromMon.padStart(2, '0')}01000000`;
  const toDate   = `${toYear}${toMon.padStart(2, '0')}${lastDay}235959`;

  const rows    = await fetchAllSnapshots(url, fromDate, toDate);
  const bucketed = bucketToSlots(rows, slots, stepMonths);

  // Digest dedup: if a slot's digest is identical to the last kept slot, mark as duplicate
  let lastKeptDigest: string | null = null;
  const snapshots: WaybackSnapshot[] = [];

  for (const slot of slots) {
    const slotEnd = slotEndMonth(slot, stepMonths);
    const hit     = bucketed.get(slot);

    if (!hit) {
      snapshots.push({
        month: slot, slotStart: slot, slotEnd, stepMonths,
        timestamp: null, originalUrl: url, waybackUrl: null,
        digest: null, status: 'not_found',
      });
      log(`Slot ${slot}: not_found`);
      continue;
    }

    const isDuplicate =
      lastKeptDigest !== null &&
      hit.digest.length > 0 &&
      hit.digest === lastKeptDigest;

    if (isDuplicate) {
      // Same content hash as the last kept snapshot — page did not change
      snapshots.push({
        month: slot, slotStart: slot, slotEnd, stepMonths,
        timestamp: hit.timestamp,
        originalUrl: url,
        waybackUrl: `https://web.archive.org/web/${hit.timestamp}/${url}`,
        digest: hit.digest,
        status: 'duplicate_content',
      });
      log(`Slot ${slot}: duplicate_content (digest ${hit.digest.slice(0, 12)}…)`);
    } else {
      lastKeptDigest = hit.digest || null;
      snapshots.push({
        month: slot, slotStart: slot, slotEnd, stepMonths,
        timestamp: hit.timestamp,
        originalUrl: url,
        waybackUrl: `https://web.archive.org/web/${hit.timestamp}/${url}`,
        digest: hit.digest,
        status: 'found',
      });
      log(`Slot ${slot}: found — ${hit.timestamp}`);
    }
  }

  const found = snapshots.filter(s => s.status === 'found').length;
  const dups  = snapshots.filter(s => s.status === 'duplicate_content').length;
  const missing = snapshots.filter(s => s.status === 'not_found').length;
  log(`Discovery complete: ${found} found, ${dups} duplicate_content, ${missing} not_found out of ${slots.length} slots`);

  return snapshots;
}
