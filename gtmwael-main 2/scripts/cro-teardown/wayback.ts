import { log, logError } from './utils/logger.js';

export interface WaybackSnapshot {
  month: string;       // slot label — equals slotStart
  slotStart: string;   // first month of the search window (YYYY-MM)
  slotEnd: string;     // last month of the search window (YYYY-MM)
  stepMonths: number;  // window size used for this run
  timestamp: string | null;
  originalUrl: string;
  waybackUrl: string | null;
  status: 'found' | 'not_found';
}

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

// Build a CDX query URL for one URL variant + date window
function buildCdxUrl(urlForCdx: string, fromDate: string, toDate: string): string {
  return (
    `https://web.archive.org/cdx/search/cdx` +
    `?url=${encodeURIComponent(urlForCdx)}` +
    `&output=json` +
    `&fl=timestamp` +
    `&from=${fromDate}` +
    `&to=${toDate}` +
    `&filter=statuscode:200` +
    `&limit=500` +
    `&collapse=timestamp:8`
  );
}

// Fetch CDX with retries + exponential backoff
async function fetchCdxWithRetry(
  cdxUrl: string,
  maxAttempts = 3,
): Promise<string[][]> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(cdxUrl, { signal: AbortSignal.timeout(45_000) });
      if (!response.ok) throw new Error(`CDX API returned ${response.status}`);
      const data = (await response.json()) as string[][];
      return Array.isArray(data) ? data.slice(1) : [];
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts) {
        const delay = 1500 * attempt; // 1.5s, 3s
        log(`CDX attempt ${attempt} failed (${String(err)}), retrying in ${delay}ms…`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}

// Search the full [windowMonths]-month window starting at slotStart.
// Tries exact URL first, then toggles www/non-www as fallback.
// Picks the snapshot closest to the midpoint of the window.
async function findSnapshotForSlot(
  url: string,
  slotStart: string,
  windowMonths: number,
): Promise<{ timestamp: string | null; slotLabel: string }> {
  const [yearStr, monStr] = slotStart.split('-');

  const fromDate = `${yearStr}${monStr.padStart(2, '0')}01000000`;

  const end = addMonths(yearStr, monStr, windowMonths - 1);
  const endPadMon = String(end.m).padStart(2, '0');
  const lastDay = daysInMonth(end.y, end.m);
  const toDate = `${end.y}${endPadMon}${lastDay}235959`;

  // Midpoint of the window: start + floor(windowMonths/2) months, day 15
  const mid = addMonths(yearStr, monStr, Math.floor(windowMonths / 2));
  const midTarget = parseInt(`${mid.y}${String(mid.m).padStart(2, '0')}15`, 10);

  // Build candidate URL variants: exact URL + www/non-www toggle
  const base = url.replace(/^https?:\/\//, '');
  const altBase = base.startsWith('www.') ? base.slice(4) : `www.${base}`;
  const candidates = [base, altBase];

  let rows: string[][] = [];

  for (const candidate of candidates) {
    const cdxUrl = buildCdxUrl(candidate, fromDate, toDate);
    log(`CDX query for slot ${slotStart} (window ${windowMonths}mo): ${cdxUrl}`);
    try {
      rows = await fetchCdxWithRetry(cdxUrl);
      if (rows.length > 0) break; // found results — no need to try alt variant
    } catch (err) {
      log(`CDX query failed for ${candidate} slot ${slotStart}: ${String(err)}`);
    }
  }

  if (rows.length === 0) {
    log(`No snapshot found for slot ${slotStart}`);
    return { timestamp: null, slotLabel: slotStart };
  }

  const timestamps = rows.map((r) => r[0]);

  // Pick snapshot closest to the window midpoint
  let best = timestamps[0];
  let bestDiff = Math.abs(parseInt(timestamps[0].slice(0, 8), 10) - midTarget);

  for (const ts of timestamps) {
    const diff = Math.abs(parseInt(ts.slice(0, 8), 10) - midTarget);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = ts;
    }
  }

  log(`Best snapshot for slot ${slotStart}: ${best}`);
  return { timestamp: best, slotLabel: slotStart };
}

const CDX_DELAY_MS = 1200; // polite — avoid Wayback rate-limit

function slotEndMonth(slotStart: string, stepMonths: number): string {
  const [yearStr, monStr] = slotStart.split('-');
  const end = addMonths(yearStr, monStr, stepMonths - 1);
  return `${end.y}-${String(end.m).padStart(2, '0')}`;
}

export async function discoverSnapshots(
  url: string,
  from: string,
  to: string,
  stepMonths = 3,
): Promise<WaybackSnapshot[]> {
  const slots = getSlotStarts(from, to, stepMonths);
  const snapshots: WaybackSnapshot[] = [];

  for (const slot of slots) {
    const slotEnd = slotEndMonth(slot, stepMonths);

    try {
      const { timestamp } = await findSnapshotForSlot(url, slot, stepMonths);

      if (timestamp) {
        snapshots.push({
          month: slot,
          slotStart: slot,
          slotEnd,
          stepMonths,
          timestamp,
          originalUrl: url,
          waybackUrl: `https://web.archive.org/web/${timestamp}/${url}`,
          status: 'found',
        });
      } else {
        snapshots.push({
          month: slot,
          slotStart: slot,
          slotEnd,
          stepMonths,
          timestamp: null,
          originalUrl: url,
          waybackUrl: null,
          status: 'not_found',
        });
      }
    } catch (err) {
      logError(`CDX query failed for slot ${slot}: ${err instanceof Error ? err.message : String(err)}`);
      snapshots.push({
        month: slot,
        slotStart: slot,
        slotEnd,
        stepMonths,
        timestamp: null,
        originalUrl: url,
        waybackUrl: null,
        status: 'not_found',
      });
    }

    await new Promise((r) => setTimeout(r, CDX_DELAY_MS));
  }

  return snapshots;
}
