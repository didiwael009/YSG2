/**
 * generate-seo-target.ts — Phase 4A-SEO
 *
 * Saves the primary SEO keyword for a teardown so the section writer
 * can use it in the H1 and intro paragraph.
 *
 * Run BEFORE Phase 4C (compose-all-sections):
 *
 *   npm run cro-teardown:seo-target -- --slug shopify --keyword "Shopify landing page"
 *
 * Options:
 *   --slug <string>      Teardown slug (required)
 *   --keyword <string>   Primary SEO keyword (required) — e.g. "Shopify landing page"
 *   --volume <number>    Monthly search volume (optional, for your records)
 *   --difficulty <number> SEO paid-difficulty score (optional, for your records)
 *
 * Writes:
 *   data/cro-teardowns/[slug]/writing/seo-target.json
 *
 * The file is read by section-writer.ts at evidence-build time and injected
 * into the 01-intro and 02-quick-answer sections so the keyword appears
 * naturally in the H1 and opening paragraph.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

// ─── CLI ──────────────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): {
  slug: string;
  keyword: string;
  volume: number | null;
  difficulty: number | null;
} {
  const args: Record<string, string> = {};

  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
      args[key] = argv[i + 1];
      i++;
    }
  }

  if (!args.slug) {
    console.error('Error: --slug is required');
    console.error('Usage: npm run cro-teardown:seo-target -- --slug shopify --keyword "Shopify landing page"');
    process.exit(1);
  }
  if (!args.keyword) {
    console.error('Error: --keyword is required');
    console.error('Usage: npm run cro-teardown:seo-target -- --slug shopify --keyword "Shopify landing page"');
    process.exit(1);
  }

  return {
    slug:       args.slug,
    keyword:    args.keyword,
    volume:     args.volume     ? parseInt(args.volume, 10)     : null,
    difficulty: args.difficulty ? parseInt(args.difficulty, 10) : null,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const cli = parseArgs(process.argv.slice(2));

const writingDir = path.join(
  process.cwd(),
  'data',
  'cro-teardowns',
  cli.slug,
  'writing',
);

fs.mkdirSync(writingDir, { recursive: true });

const seoTarget = {
  slug:             cli.slug,
  primaryKeyword:   cli.keyword,
  volume:           cli.volume,
  difficulty:       cli.difficulty,
  setAt:            new Date().toISOString(),
};

const outPath = path.join(writingDir, 'seo-target.json');
fs.writeFileSync(outPath, JSON.stringify(seoTarget, null, 2), 'utf-8');

console.log(`✓ SEO target saved: ${outPath}`);
console.log(`  primaryKeyword : "${cli.keyword}"`);
if (cli.volume     !== null) console.log(`  volume         : ${cli.volume}/mo`);
if (cli.difficulty !== null) console.log(`  difficulty     : ${cli.difficulty}`);
console.log('');
console.log('Next step — run Phase 4C with this keyword active:');
console.log(`  npm run cro-teardown:compose -- --slug ${cli.slug} --mode standard`);
