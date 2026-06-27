/**
 * One-off script: recapture specific Wayback URLs that previously returned 503.
 * Usage: node scripts/cro-teardown/recapture-wayback.mjs
 */

import { chromium } from 'playwright';
import sharp from 'sharp';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const CAPTURES = [
  {
    waybackUrl: 'http://web.archive.org/web/20150701124607/https://www.mailerlite.com/',
    label: 'MailerLite Jul 2015',
    outputs: [
      path.join(ROOT, 'public/cro-teardowns/mailerlite/selected/2015-07.webp'),
      path.join(ROOT, 'public/cro-teardowns/mailerlite/archive-monthly/2015-07.webp'),
    ],
  },
  {
    waybackUrl: 'http://web.archive.org/web/20190602071727/https://www.mailerlite.com/',
    label: 'MailerLite Jun 2019 (replaces failed Jan 2019)',
    outputs: [
      path.join(ROOT, 'public/cro-teardowns/mailerlite/selected/2019-01.webp'),
      path.join(ROOT, 'public/cro-teardowns/mailerlite/archive-monthly/2019-01.webp'),
    ],
  },
  {
    waybackUrl: 'http://web.archive.org/web/20220701235522/https://www.mailerlite.com/',
    label: 'MailerLite Jul 2022',
    outputs: [
      path.join(ROOT, 'public/cro-teardowns/mailerlite/selected/2022-07.webp'),
      path.join(ROOT, 'public/cro-teardowns/mailerlite/archive-monthly/2022-07.webp'),
    ],
  },
];

const HIDE_WAYBACK_CSS = `
  #wm-ipp, #wm-ipp-base, #wm-ipp-print, #wm-ipp-inside, #donato,
  .wb-autocomplete-suggestions, #wm-tb, #wm-ipp-float {
    display: none !important; visibility: hidden !important; height: 0 !important;
    position: absolute !important; top: -9999px !important;
  }
  body { margin-top: 0 !important; padding-top: 0 !important; }
`;

async function capture(page, url, label) {
  console.log(`\nCapturing: ${label}`);
  console.log(`  URL: ${url}`);

  await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await page.waitForTimeout(2500);

  await page.addStyleTag({ content: HIDE_WAYBACK_CSS });
  await page.evaluate(() => {
    ['wm-ipp', 'wm-ipp-base', 'wm-ipp-print', 'donato'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    document.querySelectorAll('.wb-autocomplete-suggestions').forEach((el) => el.remove());
  });
  await page.waitForTimeout(500);

  const pngBuffer = await page.screenshot({ fullPage: false });
  console.log(`  Screenshot taken (${pngBuffer.length} bytes PNG)`);
  return pngBuffer;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  for (const { waybackUrl, label, outputs } of CAPTURES) {
    try {
      const pngBuffer = await capture(page, waybackUrl, label);
      const webpBuffer = await sharp(pngBuffer).webp({ quality: 85 }).toBuffer();
      console.log(`  Converted to WebP: ${webpBuffer.length} bytes`);

      if (webpBuffer.length < 20_000) {
        console.warn(`  WARNING: WebP is still suspiciously small (${webpBuffer.length} bytes) — may still be a 503`);
      }

      for (const dest of outputs) {
        fs.writeFileSync(dest, webpBuffer);
        console.log(`  Saved → ${path.relative(ROOT, dest)}`);
      }
      passed++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  console.log(`\nDone: ${passed} captured, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
