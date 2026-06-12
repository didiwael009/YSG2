/**
 * backfill-publish-dates.ts
 *
 * One-time script: spreads the publishedAt dates for all 16 CRO teardown
 * articles across a realistic ~4-month window, eliminating the bulk-generation
 * fingerprint (all 14 original articles had publishedAt within 3 seconds).
 *
 * Dates are deterministic per slug (seeded from slug hash), so re-running
 * produces the same output. Run once and commit.
 *
 * Usage:
 *   npx tsx scripts/cro-teardown/backfill-publish-dates.ts [--dry-run]
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname   = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');
const contentDir  = path.join(projectRoot, 'src', 'content', 'cro-teardown', 'articles');

const dryRun = process.argv.includes('--dry-run');

// ─── Deterministic date spread ────────────────────────────────────────────────

/**
 * Simple deterministic hash of a string → unsigned 32-bit integer.
 * Not cryptographic — just needs to be stable across runs.
 */
function slugHash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Assign a publish date to each slug.
 *
 * Window: 2026-02-03 (Mon) → 2026-06-10 (Tue) — ~4 months, all weekdays.
 * Buffer of 10 days before today (2026-06-12) so the newest articles look
 * a few days old, not published on the run date.
 *
 * Publishing cadence: 2–3 articles per "week-cluster", staggered 3–8 days.
 */
function buildDateMap(slugs: string[]): Map<string, string> {
  // Sort slugs deterministically so the order doesn't change if new articles added
  const sorted = [...slugs].sort();

  // Base: 2026-02-03T09:00:00.000Z
  const base = new Date('2026-02-03T09:00:00.000Z').getTime();
  // Total window: ~128 days
  const windowMs = 128 * 24 * 60 * 60 * 1000;

  const map = new Map<string, string>();

  for (const slug of sorted) {
    const h = slugHash(slug);
    // Position within window: 0..1
    const frac = (h & 0xFFFF) / 0xFFFF;
    const offsetMs = Math.floor(frac * windowMs);

    // Start from base + offset
    let d = new Date(base + offsetMs);

    // Push to next weekday if it lands on Sat/Sun
    const day = d.getUTCDay();
    if (day === 0) d = new Date(d.getTime() + 24 * 60 * 60 * 1000);  // Sun → Mon
    if (day === 6) d = new Date(d.getTime() + 2 * 24 * 60 * 60 * 1000); // Sat → Mon

    // Hour: 08:00–17:00 UTC, minutes from hash
    const hour = 8 + ((h >> 16) & 0x0F) % 10;
    const min  = (h >> 8) & 0x3F;
    d.setUTCHours(hour, min, 0, 0);

    // Cap at 2026-06-10 (safety buffer before today)
    const cap = new Date('2026-06-10T17:00:00.000Z').getTime();
    if (d.getTime() > cap) d = new Date(cap - ((h & 0xFF) * 60 * 1000));

    map.set(slug, d.toISOString());
  }

  return map;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.ts'));
const slugs = files.map(f => f.replace(/\.ts$/, ''));

const dateMap = buildDateMap(slugs);

let changed = 0;

for (const file of files) {
  const slug    = file.replace(/\.ts$/, '');
  const newDate = dateMap.get(slug)!;
  const filePath = path.join(contentDir, file);
  const src = fs.readFileSync(filePath, 'utf-8');

  // Extract current date
  const m = src.match(/publishedAt:\s*"([^"]+)"/);
  const oldDate = m?.[1] ?? '(not found)';

  if (oldDate === newDate) {
    console.log(`  ✓ ${slug}: unchanged (${newDate})`);
    continue;
  }

  console.log(`  ${dryRun ? '[dry-run] ' : ''}${slug}:`);
  console.log(`    was: ${oldDate}`);
  console.log(`    now: ${newDate}`);

  if (!dryRun) {
    // Replace all occurrences of the publishedAt field (appears in comment + data)
    const updated = src
      .replace(/(Published\s*:\s*)([^\n]+)/, `$1${newDate}`)
      .replace(/(publishedAt:\s*")[^"]+(")/g, `$1${newDate}$2`);
    fs.writeFileSync(filePath, updated, 'utf-8');
    changed++;
  }
}

if (dryRun) {
  console.log('\n[dry-run] No files written. Remove --dry-run to apply.');
} else {
  console.log(`\n✅  Updated ${changed}/${files.length} files.`);
}
