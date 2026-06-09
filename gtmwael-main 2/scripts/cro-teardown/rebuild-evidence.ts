/**
 * rebuild-evidence.ts — Regenerates section evidence files without re-running LLM.
 *
 * Deletes stale *.evidence.json cache files and rebuilds them deterministically
 * from generated-article-data.json + cta-changes.json etc. Zero LLM calls.
 *
 * CLI:
 *   npm run cro-teardown:rebuild-evidence -- --slug shopify
 *   npm run cro-teardown:rebuild-evidence               (all slugs)
 */

import * as path   from 'node:path';
import * as fs     from 'node:fs';
import * as process from 'node:process';
import { fileURLToPath } from 'url';
import { buildAndCacheSectionEvidence } from './section-writer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

const SECTION_IDS = [
  '01-intro',
  '02-quick-answer',
  '03-visual-timeline',
  '04-messaging-evolution',
  '05-cta-navigation-evolution',
  '06-lessons-for-saas-teams',
];

function discoverSlugs(): string[] {
  const dataRoot = path.join(projectRoot, 'data/cro-teardowns');
  if (!fs.existsSync(dataRoot)) return [];
  return fs.readdirSync(dataRoot).filter(name =>
    fs.statSync(path.join(dataRoot, name)).isDirectory()
  );
}

async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.find(a => a.startsWith('--slug='))?.split('=')[1]
    ?? (args[args.indexOf('--slug') + 1] !== undefined && !args[args.indexOf('--slug') + 1]?.startsWith('--')
        ? args[args.indexOf('--slug') + 1]
        : null);

  const slugs = slugArg ? [slugArg] : discoverSlugs();

  console.log(`\n🔄  Section evidence rebuild (force, no LLM)`);
  console.log(`    Slugs: ${slugs.join(', ')}\n`);

  for (const slug of slugs) {
    const writingDir = path.join(projectRoot, 'data/cro-teardowns', slug, 'writing');
    const gdPath = path.join(writingDir, 'generated-article-data.json');
    if (!fs.existsSync(gdPath)) {
      console.log(`  [${slug}] No generated-article-data.json — skipping`);
      continue;
    }
    console.log(`\n📦  ${slug.toUpperCase()}`);
    for (const sectionId of SECTION_IDS) {
      try {
        const evidence = buildAndCacheSectionEvidence(sectionId, writingDir, true /* force */);
        // Verify no merge patterns remain
        const raw = JSON.stringify(evidence);
        const MERGE = ['SidekickYour','HugoYour','InboxGet','GatewayOne','SandboxIsolated',
                       'AgentAn','SDKThe','DeliveryFast','ComputeServers','NewConnect'];
        const remaining = MERGE.filter(p => raw.includes(p));
        const icon = remaining.length > 0 ? '⚠️ ' : '  ✓';
        const detail = remaining.length > 0 ? ` (MERGE: ${remaining.join(', ')})` : '';
        console.log(`  ${icon} ${sectionId}.evidence.json${detail}`);
      } catch (err) {
        console.log(`  ✗ ${sectionId}: ${(err as Error).message?.slice(0, 60)}`);
      }
    }
  }

  console.log('\n✅  Evidence rebuild complete.');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
