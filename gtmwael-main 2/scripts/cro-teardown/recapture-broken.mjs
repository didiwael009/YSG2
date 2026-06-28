/**
 * recapture-broken.mjs
 * Recaptures specific Wayback Machine snapshots that rendered as unstyled HTML.
 * Uses Playwright with a 1440px viewport and waits for network idle.
 *
 * Usage: node scripts/cro-teardown/recapture-broken.mjs
 */

import { chromium } from 'playwright';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const HIDE_WAYBACK_CSS = `
  #wm-ipp, #wm-ipp-base, #wm-ipp-print, #wm-ipp-inside,
  #donato, .wb-autocomplete-suggestions, #wm-tb, #wm-ipp-float {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    position: absolute !important;
    top: -9999px !important;
  }
  body { margin-top: 0 !important; padding-top: 0 !important; }
`;

const TARGETS = [
  {
    slug: 'brevo',
    month: '2023-01',
    url: 'https://web.archive.org/web/20230504110254/https://www.brevo.com/',
    out: 'public/cro-teardowns/brevo/selected/2023-01.webp',
  },
  {
    slug: 'crowdanalyzer',
    month: '2016-07',
    url: 'https://web.archive.org/web/20161020085117/https://crowdanalyzer.com',
    out: 'public/cro-teardowns/crowdanalyzer/selected/2016-07.webp',
  },
  {
    slug: 'lemlist',
    month: '2023-07',
    url: 'https://web.archive.org/web/20231015210558/https://www.lemlist.com',
    out: 'public/cro-teardowns/lemlist/selected/2023-07.webp',
  },
  {
    slug: 'mailerlite',
    month: '2026-01',
    url: 'https://web.archive.org/web/20260401185539/https://www.mailerlite.com',
    out: 'public/cro-teardowns/mailerlite/selected/2026-01.webp',
  },
  {
    slug: 'sendx',
    month: '2019-01',
    url: 'https://web.archive.org/web/20190404022738/https://www.sendx.io/',
    out: 'public/cro-teardowns/sendx/selected/2019-01.webp',
  },
  {
    slug: 'sendx',
    month: '2021-01',
    url: 'https://web.archive.org/web/20210401191427/https://www.sendx.io/',
    out: 'public/cro-teardowns/sendx/selected/2021-01.webp',
  },
];

async function capture(page, target) {
  const dest = path.join(ROOT, target.out);
  console.log(`\n[${target.slug}/${target.month}] Navigating to:\n  ${target.url}`);

  try {
    await page.goto(target.url, { waitUntil: 'load', timeout: 90_000 });
  } catch (e) {
    console.warn(`  ⚠ goto timeout/error: ${e.message.slice(0, 120)} — trying networkidle`);
    try {
      await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    } catch (e2) {
      console.error(`  ✗ Failed: ${e2.message.slice(0, 120)}`);
      return false;
    }
  }

  // Wait for network to settle
  try { await page.waitForLoadState('networkidle', { timeout: 15_000 }); } catch { /* ok */ }

  // Extra wait for JS-rendered content
  await page.waitForTimeout(3000);

  // Hide Wayback toolbar
  try {
    await page.addStyleTag({ content: HIDE_WAYBACK_CSS });
    await page.evaluate(() => {
      ['wm-ipp','wm-ipp-base','wm-ipp-print','donato'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
      document.querySelectorAll('.wb-autocomplete-suggestions').forEach(el => el.remove());
    });
  } catch { /* ok if page doesn't have these */ }

  // Dismiss cookie banners
  const cookieSelectors = [
    '#onetrust-accept-btn-handler',
    'button[id*="accept"]',
    'button[class*="accept"]',
    '.cc-accept',
  ];
  for (const sel of cookieSelectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(800);
        break;
      }
    } catch { /* not found */ }
  }

  // Full-page screenshot as PNG first, then convert to webp
  const tmpPng = dest.replace('.webp', '.tmp.png');
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  await page.screenshot({ path: tmpPng, fullPage: true });
  console.log(`  ✓ PNG captured (${Math.round(fs.statSync(tmpPng).size / 1024)}KB)`);

  // Convert to webp using sharp via node
  try {
    execSync(
      `node -e "require('sharp')('${tmpPng}').webp({quality:85}).toFile('${dest}')" `,
      { cwd: ROOT, stdio: 'inherit' }
    );
    fs.unlinkSync(tmpPng);
    console.log(`  ✓ Saved as webp: ${target.out} (${Math.round(fs.statSync(dest).size / 1024)}KB)`);
    return true;
  } catch (e) {
    // Fallback: just rename png to webp (not ideal but usable)
    fs.renameSync(tmpPng, dest.replace('.webp', '.png'));
    console.warn(`  ⚠ sharp failed, saved as PNG instead: ${e.message.slice(0, 80)}`);
    return false;
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true,
  });

  const results = [];

  for (const target of TARGETS) {
    const page = await context.newPage();
    try {
      const ok = await capture(page, target);
      results.push({ ...target, ok });
    } catch (e) {
      console.error(`  ✗ Unexpected error for ${target.slug}/${target.month}: ${e.message}`);
      results.push({ ...target, ok: false });
    } finally {
      await page.close();
    }
    // Brief pause between Wayback requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 3000));
  }

  await context.close();
  await browser.close();

  console.log('\n═══ RESULTS ═══');
  for (const r of results) {
    console.log(`${r.ok ? '✓' : '✗'} ${r.slug}/${r.month}`);
  }

  const failed = results.filter(r => !r.ok);
  if (failed.length > 0) {
    console.log(`\n${failed.length} capture(s) failed — check URLs above.`);
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
