/**
 * fix-page-text-extraction.ts — Targeted page-text re-extraction.
 *
 * Runs ONLY text re-extraction (no new screenshots) for specific slug+month
 * combinations using the FIXED block-aware getText() walker in screenshots.ts.
 *
 * This is used to repair stale page-text JSON files that were created with the
 * old el.textContent extractor (which merged adjacent block elements without
 * spaces). Screenshots are NOT re-captured — only the .json and .txt files
 * in data/cro-teardowns/{slug}/page-text/ are updated.
 *
 * CLI:
 *   npm run cro-teardown:fix-text -- --slug shopify
 *   npm run cro-teardown:fix-text -- --slug crisp
 *   npm run cro-teardown:fix-text -- --slug vercel
 *   npm run cro-teardown:fix-text              (all stale slugs)
 *
 * After running, proceed with:
 *   npm run cro-teardown:generate-data -- --slug <slug>
 *   npm run cro-teardown:compose       -- --slug <slug> --mode standard --force --skip-cross-section
 *   npm run cro-teardown:publish       -- --slug <slug> --force
 */

import * as path   from 'node:path';
import * as fs     from 'node:fs';
import * as process from 'node:process';
import { fileURLToPath } from 'url';
import { createBrowser } from './utils/browser.js';
import { createContext } from './utils/browser.js';
import { saveJson, saveText } from './utils/files.js';
import type { PageText } from './screenshots.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// ── Fixed EXTRACT_PAGE_TEXT_SCRIPT (block-aware getText walker) ───────────────
// This is a copy of the fixed version in screenshots.ts.
// The root cause of the merge bugs was using el.textContent instead of getText(),
// which concatenates block-child nodes without spaces.
const EXTRACT_PAGE_TEXT_SCRIPT = `(() => {
  var waybackIds = ['wm-ipp', 'wm-ipp-base', 'wm-ipp-print', 'wm-ipp-inside', 'donato'];
  waybackIds.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.parentNode && el.parentNode.removeChild(el);
  });
  document.querySelectorAll('.wb-autocomplete-suggestions').forEach(function(el) {
    el.parentNode && el.parentNode.removeChild(el);
  });

  var bodyClone = document.body ? document.body.cloneNode(true) : document.createElement('body');
  ['script', 'style', 'noscript', 'svg', 'iframe', 'canvas'].forEach(function(tag) {
    bodyClone.querySelectorAll(tag).forEach(function(el) {
      el.parentNode && el.parentNode.removeChild(el);
    });
  });

  function clean(s) { return (s || '').replace(/\\s+/g, ' ').trim(); }
  function unique(arr) { return Array.from(new Set(arr.filter(Boolean))); }

  // Walk child nodes and join block-level elements with a space to avoid
  // words merging (e.g. "Be the nextAI all-star" from adjacent span/div nodes).
  function getText(el) {
    var BLOCK = /^(DIV|P|H[1-6]|LI|TD|TH|SECTION|ARTICLE|HEADER|FOOTER|ASIDE|MAIN|NAV|BLOCKQUOTE|PRE|FIGURE|FIGCAPTION|FORM|FIELDSET|LEGEND|DETAILS|SUMMARY|DL|DT|DD|OL|UL)$/;
    var parts = [];
    function walk(node) {
      if (node.nodeType === 3) {
        var t = node.nodeValue || '';
        if (t.replace(/\\s/g, '')) parts.push(t);
      } else if (node.nodeType === 1) {
        var tag = node.tagName || '';
        var isBlock = BLOCK.test(tag);
        if (isBlock && parts.length && parts[parts.length - 1] !== ' ') parts.push(' ');
        Array.prototype.forEach.call(node.childNodes, walk);
        if (isBlock && parts.length && parts[parts.length - 1] !== ' ') parts.push(' ');
      }
    }
    walk(el);
    return clean(parts.join(''));
  }

  var title = document.title || '';
  var metaEl = document.querySelector('meta[name="description"]');
  var metaDescription = metaEl ? (metaEl.getAttribute('content') || '') : '';

  var h1 = unique(Array.from(bodyClone.querySelectorAll('h1')).map(function(el) { return getText(el); }));
  var h2 = unique(Array.from(bodyClone.querySelectorAll('h2')).map(function(el) { return getText(el); }));
  var h3 = unique(Array.from(bodyClone.querySelectorAll('h3')).map(function(el) { return getText(el); }));

  var ctas = unique(
    Array.from(bodyClone.querySelectorAll('button, a[href], [role="button"]'))
      .map(function(el) { return getText(el); })
      .filter(function(t) { return t.length > 0 && t.length < 120; })
  );

  var navLinks = unique(
    Array.from(bodyClone.querySelectorAll('nav a, header a'))
      .map(function(el) { return getText(el); })
  );

  var bodyText = clean(getText(bodyClone));

  return { title: title, metaDescription: metaDescription, h1: h1, h2: h2, h3: h3, ctas: ctas, navLinks: navLinks, bodyText: bodyText };
})()`;

// ── Slugs with known stale page-text (merge bugs from old textContent extractor) ─
const STALE_SLUGS: Record<string, string[]> = {
  shopify: ['current'],
  crisp:   ['2022-07', '2023-01', '2023-07', '2024-01', 'current'],
  vercel:  ['2024-07', '2025-01', 'current'],
};

// ── Helper: format page text as a plain-text summary ─────────────────────────
function pageTextToPlain(text: PageText): string {
  const lines: string[] = [];
  lines.push(`TITLE: ${text.title}`);
  lines.push(`META DESCRIPTION: ${text.metaDescription}`);
  lines.push('');
  lines.push('H1:');
  text.h1.forEach((h) => lines.push(`  - ${h}`));
  lines.push('');
  lines.push('H2:');
  text.h2.forEach((h) => lines.push(`  - ${h}`));
  lines.push('');
  lines.push('H3:');
  text.h3.forEach((h) => lines.push(`  - ${h}`));
  lines.push('');
  lines.push('CTAs:');
  text.ctas.forEach((c) => lines.push(`  - ${c}`));
  lines.push('');
  lines.push('NAV LINKS:');
  text.navLinks.forEach((n) => lines.push(`  - ${n}`));
  lines.push('');
  lines.push('BODY TEXT (first 2000 chars):');
  lines.push(text.bodyText.slice(0, 2000));
  return lines.join('\n');
}

// ── Re-extract text from a URL using Playwright ───────────────────────────────
async function reExtractPageText(
  browser: import('playwright').Browser,
  url: string,
  isWayback: boolean,
): Promise<PageText | null> {
  const ctx = await createContext(browser);
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.waitForTimeout(2_500);

    // Hide Wayback toolbar if present
    if (isWayback) {
      await page.addStyleTag({
        content: `#wm-ipp,#wm-ipp-base,#wm-ipp-print,#wm-ipp-inside,#donato { display:none!important; }`,
      });
      await page.evaluate(() => {
        ['wm-ipp', 'wm-ipp-base', 'wm-ipp-print', 'donato'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.remove();
        });
      });
    }

    const result = await page.evaluate(EXTRACT_PAGE_TEXT_SCRIPT) as PageText;
    return result;
  } catch (err) {
    console.error(`  ✗ Failed to extract text from ${url}:`, (err as Error).message?.slice(0, 80));
    return null;
  } finally {
    await ctx.close();
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.find(a => a.startsWith('--slug='))?.split('=')[1]
    ?? (args[args.indexOf('--slug') + 1] !== undefined && !args[args.indexOf('--slug') + 1]?.startsWith('--')
        ? args[args.indexOf('--slug') + 1]
        : null);

  const slugsToFix = slugArg
    ? (STALE_SLUGS[slugArg] ? [slugArg] : (() => { console.error(`Unknown slug: ${slugArg}`); process.exit(1); })())
    : Object.keys(STALE_SLUGS);

  console.log(`\n🔧  Page-text re-extraction (fixed getText() walker)`);
  console.log(`    Slugs: ${slugsToFix.join(', ')}\n`);

  const browser = await createBrowser();

  try {
    for (const slug of slugsToFix) {
      const months = STALE_SLUGS[slug];
      const pageTextDir = path.join(projectRoot, 'data/cro-teardowns', slug, 'page-text');
      const archiveSnapshotsPath = path.join(projectRoot, 'data/cro-teardowns', slug, 'archive-snapshots.json');

      if (!fs.existsSync(archiveSnapshotsPath)) {
        console.warn(`  ⚠️   No archive-snapshots.json for ${slug} — skipping`);
        continue;
      }

      const snapshots = JSON.parse(fs.readFileSync(archiveSnapshotsPath, 'utf-8')) as Array<{
        month: string;
        waybackUrl: string | null;
        originalUrl: string;
        status: string;
      }>;

      console.log(`\n📦  ${slug.toUpperCase()} — re-extracting ${months.length} snapshot(s): ${months.join(', ')}`);

      for (const month of months) {
        const isCurrent = month === 'current';
        const record = isCurrent
          ? snapshots.find(s => s.month === 'current')
          : snapshots.find(s => s.month === month);

        if (!record) {
          console.warn(`  ⚠️   No snapshot record for ${slug}/${month} — skipping`);
          continue;
        }

        const targetUrl = isCurrent
          ? record.originalUrl
          : record.waybackUrl;

        if (!targetUrl) {
          console.warn(`  ⚠️   No URL for ${slug}/${month} — skipping`);
          continue;
        }

        const label = isCurrent ? 'current-live' : month;
        process.stdout.write(`  [${slug}/${label}] Extracting from ${targetUrl.slice(0, 60)}... `);

        const text = await reExtractPageText(browser, targetUrl, !isCurrent);

        if (!text) {
          process.stdout.write('FAILED\n');
          continue;
        }

        // Write updated page-text files
        const jsonPath = path.join(pageTextDir, `${label}.json`);
        const txtPath  = path.join(pageTextDir, `${label}.txt`);

        fs.mkdirSync(pageTextDir, { recursive: true });
        saveJson(jsonPath, text);
        saveText(txtPath, pageTextToPlain(text));

        // Verify the merge strings are gone
        const rawJson = JSON.stringify(text);
        const MERGE_PATTERNS = ['SidekickYour', 'HugoYour', 'InboxGet', 'GatewayOne',
                                'SandboxIsolated', 'AgentAn', 'SDKThe', 'DeliveryFast',
                                'ComputeServers', 'NewConnect'];
        const remaining = MERGE_PATTERNS.filter(p => rawJson.includes(p));
        if (remaining.length > 0) {
          process.stdout.write(`⚠️  MERGE STILL PRESENT: ${remaining.join(', ')}\n`);
        } else {
          process.stdout.write('✅ clean\n');
        }

        // Pause between captures (polite to Wayback)
        if (!isCurrent) await new Promise(r => setTimeout(r, 2_000));
      }
    }
  } finally {
    await browser.close();
  }

  console.log('\n✅  Re-extraction complete.');
  console.log('   Next steps:');
  for (const slug of slugsToFix) {
    console.log(`     npm run cro-teardown:generate-data -- --slug ${slug}`);
    console.log(`     npm run cro-teardown:compose -- --slug ${slug} --mode standard --force --skip-cross-section`);
    console.log(`     npm run cro-teardown:publish -- --slug ${slug} --force`);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
