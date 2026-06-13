import * as path from 'node:path';
import * as fs from 'node:fs';
import type { Browser, BrowserContext } from 'playwright';
// @ts-expect-error — sharp is a devDependency without bundled types in this project
import sharp from 'sharp';
import { createContext } from './utils/browser.js';
import { saveJson, saveText } from './utils/files.js';
import { log, logError } from './utils/logger.js';

// One shared context so all Wayback requests reuse the same HTTP/2 connection
let sharedCtx: BrowserContext | null = null;

export async function initSharedContext(browser: Browser): Promise<void> {
  sharedCtx = await createContext(browser);
}

export async function closeSharedContext(): Promise<void> {
  if (sharedCtx) {
    await sharedCtx.close();
    sharedCtx = null;
  }
}

export interface PageText {
  title: string;
  metaDescription: string;
  h1: string[];
  h2: string[];
  h3: string[];
  ctas: string[];
  navLinks: string[];
  bodyText: string;
}

export interface CaptureResult {
  success: boolean;
  screenshotPath: string | null;
  textPathJson: string | null;
  textPathTxt: string | null;
  error: string | null;
}

// CSS injected into every page to hide Wayback toolbar and common overlays
const HIDE_WAYBACK_CSS = `
  #wm-ipp,
  #wm-ipp-base,
  #wm-ipp-print,
  #wm-ipp-inside,
  #donato,
  .wb-autocomplete-suggestions,
  #wm-tb,
  #wm-ipp-float {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    position: absolute !important;
    top: -9999px !important;
  }
  /* Push body back if the toolbar shifted it */
  body {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
`;

// Common cookie banner selectors to try clicking away
const COOKIE_BUTTON_SELECTORS = [
  'button[id*="accept"]',
  'button[class*="accept"]',
  'button[id*="cookie"]',
  'button[class*="cookie"]',
  '[aria-label*="accept cookies" i]',
  '[aria-label*="accept all" i]',
  '#onetrust-accept-btn-handler',
  '.cc-accept',
];

async function hideWaybackToolbar(page: import('playwright').Page): Promise<void> {
  await page.addStyleTag({ content: HIDE_WAYBACK_CSS });
  // Also remove via JS for elements that might re-inject themselves
  await page.evaluate(() => {
    const ids = ['wm-ipp', 'wm-ipp-base', 'wm-ipp-print', 'donato'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    document.querySelectorAll('.wb-autocomplete-suggestions').forEach((el) => el.remove());
  });
}

async function dismissCookieBanners(page: import('playwright').Page): Promise<void> {
  for (const selector of COOKIE_BUTTON_SELECTORS) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 800 })) {
        await btn.click({ timeout: 1000 });
        log(`Dismissed cookie banner with selector: ${selector}`);
        return;
      }
    } catch {
      // Not found — try next
    }
  }
}

// Written as a string to prevent esbuild's __name helper from leaking into
// the serialized browser context when Playwright calls fn.toString().
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
      if (node.nodeType === 3) { // text node
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

  // Classify a clickable element by its nearest semantic container.
  // All <nav> and <header> descendants → nav_link (consistent with the navLinks selector).
  // <footer> descendants → footer_link.
  // Ancestors with a hero/banner class → hero_cta.
  // Everything else → body_cta.
  function classifyEl(el) {
    var node = el.parentElement;
    while (node && node !== bodyClone) {
      var tag = (node.tagName || '').toUpperCase();
      if (tag === 'NAV' || tag === 'HEADER') return 'nav_link';
      if (tag === 'FOOTER') return 'footer_link';
      var cls = ((node.className || '') + ' ' + (node.id || '')).toLowerCase();
      if (/\\bhero\\b|\\bbanner\\b|\\bjumbotron\\b|\\bsplash\\b/.test(cls)) return 'hero_cta';
      node = node.parentElement;
    }
    return 'body_cta';
  }

  var title = document.title || '';
  var metaEl = document.querySelector('meta[name="description"]');
  var metaDescription = metaEl ? (metaEl.getAttribute('content') || '') : '';

  var h1 = unique(Array.from(bodyClone.querySelectorAll('h1')).map(function(el) { return getText(el); }));
  var h2 = unique(Array.from(bodyClone.querySelectorAll('h2')).map(function(el) { return getText(el); }));
  var h3 = unique(Array.from(bodyClone.querySelectorAll('h3')).map(function(el) { return getText(el); }));

  // Build typed element list: extract text + classify each clickable element.
  var allClickable = Array.from(bodyClone.querySelectorAll('button, a[href], [role="button"]'))
    .map(function(el) { return { el: el, text: getText(el) }; })
    .filter(function(item) { return item.text.length > 0 && item.text.length < 120; });

  var elements = allClickable.map(function(item) {
    return { text: item.text, type: classifyEl(item.el) };
  });

  // ctas = hero_cta + body_cta only (nav and footer excluded).
  var ctas = unique(
    elements
      .filter(function(e) { return e.type === 'hero_cta' || e.type === 'body_cta'; })
      .map(function(e) { return e.text; })
  );

  var navLinks = unique(
    Array.from(bodyClone.querySelectorAll('nav a, header a'))
      .map(function(el) { return clean(el.textContent); })
  );

  var bodyText = clean(bodyClone.textContent || '');

  return { title: title, metaDescription: metaDescription, h1: h1, h2: h2, h3: h3, ctas: ctas, navLinks: navLinks, bodyText: bodyText, elements: elements };
})()`;

async function extractPageText(page: import('playwright').Page): Promise<PageText> {
  return page.evaluate(EXTRACT_PAGE_TEXT_SCRIPT) as Promise<PageText>;
}

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
  lines.push('CTAS / BUTTONS:');
  text.ctas.forEach((c) => lines.push(`  - ${c}`));
  lines.push('');
  lines.push('NAV LINKS:');
  text.navLinks.forEach((n) => lines.push(`  - ${n}`));
  lines.push('');
  lines.push('BODY TEXT:');
  lines.push(text.bodyText);
  return lines.join('\n');
}

// Retry delays: if attempt fails with a network error, wait then try again.
// On retry, attemptCapture will use a fresh context since the shared one was recycled.
const CAPTURE_RETRY_DELAYS_MS = [5_000, 12_000];

async function capturePage(
  browser: Browser,
  targetUrl: string,
  screenshotDest: string,
  textJsonDest: string,
  textTxtDest: string,
  isWayback: boolean,
): Promise<CaptureResult> {
  let lastError = '';

  for (let attempt = 0; attempt <= CAPTURE_RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      const delay = CAPTURE_RETRY_DELAYS_MS[attempt - 1];
      log(`Retry attempt ${attempt} for ${targetUrl} (waiting ${delay}ms)`);
      await new Promise((r) => setTimeout(r, delay));
      // Re-init shared context for the retry
      if (!sharedCtx) {
        sharedCtx = await createContext(browser);
        log('Shared context re-initialised for retry');
      }
    }

    const result = await attemptCapture(browser, targetUrl, screenshotDest, textJsonDest, textTxtDest, isWayback);
    if (result.success) return result;

    lastError = result.error ?? 'unknown error';
    const isRetryable = lastError.includes('net::ERR_');
    if (!isRetryable) return result;

    log(`Retryable error on attempt ${attempt + 1}: ${lastError.slice(0, 120)}`);
  }

  return { success: false, screenshotPath: null, textPathJson: null, textPathTxt: null, error: lastError };
}

async function attemptCapture(
  browser: Browser,
  targetUrl: string,
  screenshotDest: string,
  textJsonDest: string,
  textTxtDest: string,
  isWayback: boolean,
): Promise<CaptureResult> {
  // Use the shared context if available; fall back to a fresh one-shot context
  // (the fallback path is used if the shared context died)
  let ownCtx: BrowserContext | null = null;
  let ctx = sharedCtx;
  if (!ctx) {
    ownCtx = await createContext(browser);
    ctx = ownCtx;
  }

  const page = await ctx.newPage();

  try {
    log(`Navigating to: ${targetUrl}`);

    // 'load' waits for all resources (images, fonts, scripts) — reduces missing elements
    await page.goto(targetUrl, {
      waitUntil: 'load',
      timeout: 60_000,
    });

    // After load, wait for the network to go quiet so lazy-loaded content finishes
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {
      // networkidle may never fire on pages with persistent connections — that's fine
    });

    // Final settle for CSS animations / web fonts to render
    await page.waitForTimeout(isWayback ? 2000 : 1000);

    if (isWayback) {
      await hideWaybackToolbar(page);
      await page.waitForTimeout(500);
    }

    await dismissCookieBanners(page);

    // Try to extract text; don't fail the screenshot if extraction fails
    let textPathJson: string | null = null;
    let textPathTxt: string | null = null;
    try {
      const text = await extractPageText(page);
      saveJson(textJsonDest, text);
      saveText(textTxtDest, pageTextToPlain(text));
      textPathJson = textJsonDest;
      textPathTxt = textTxtDest;
      log(`Text extracted and saved to ${textJsonDest}`);
    } catch (err) {
      logError(
        `Text extraction failed for ${targetUrl}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }

    // Playwright may not support webp directly; capture PNG then convert via sharp
    const isPng = screenshotDest.endsWith('.png');
    const pngPath = isPng ? screenshotDest : screenshotDest.replace(/\.webp$/, '.png');

    await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });

    if (!isPng) {
      // Convert PNG → WebP via sharp. Cap height at 16 000 px (WebP max is 16 383).
      await sharp(pngPath)
        .resize({ height: 16_000, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(screenshotDest);
      fs.unlinkSync(pngPath);
    }

    log(`Screenshot saved to ${screenshotDest}`);

    return {
      success: true,
      screenshotPath: screenshotDest,
      textPathJson,
      textPathTxt,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logError(`Capture failed for ${targetUrl}: ${message}`);
    // If the shared context errored, tear it down so the next retry gets a fresh one
    if (sharedCtx && message.includes('net::ERR_')) {
      log('Recycling shared context after network error');
      await sharedCtx.close().catch(() => {});
      sharedCtx = null;
    }
    return { success: false, screenshotPath: null, textPathJson: null, textPathTxt: null, error: message };
  } finally {
    await page.close();
    // Close the fallback context only if we created it
    if (ownCtx) await ownCtx.close().catch(() => {});
  }
}

export async function captureArchivePage(
  browser: Browser,
  waybackUrl: string,
  month: string,
  archiveDir: string,
  pageTextDir: string,
): Promise<CaptureResult> {
  const screenshotDest = path.join(archiveDir, `${month}.webp`);
  const textJsonDest = path.join(pageTextDir, `${month}.json`);
  const textTxtDest = path.join(pageTextDir, `${month}.txt`);

  return capturePage(browser, waybackUrl, screenshotDest, textJsonDest, textTxtDest, true);
}

export async function captureCurrentPage(
  browser: Browser,
  url: string,
  archiveDir: string,
  pageTextDir: string,
): Promise<CaptureResult> {
  const screenshotDest = path.join(archiveDir, 'current-live.webp');
  const textJsonDest = path.join(pageTextDir, 'current-live.json');
  const textTxtDest = path.join(pageTextDir, 'current-live.txt');

  return capturePage(browser, url, screenshotDest, textJsonDest, textTxtDest, false);
}

/**
 * Parallel-safe variant: caller provides an already-open BrowserContext.
 * Used when multiple captures run concurrently — each worker owns its context,
 * so recycling on error cannot affect other workers.
 */
export async function capturePageWithContext(
  ctx: import('playwright').BrowserContext,
  waybackUrl: string,
  month: string,
  archiveDir: string,
  pageTextDir: string,
  isWayback: boolean,
): Promise<CaptureResult> {
  const screenshotDest = path.join(archiveDir, `${month}.webp`);
  const textJsonDest = path.join(pageTextDir, `${month}.json`);
  const textTxtDest = path.join(pageTextDir, `${month}.txt`);

  return attemptCaptureWithContext(ctx, waybackUrl, screenshotDest, textJsonDest, textTxtDest, isWayback);
}

export async function captureCurrentPageWithContext(
  ctx: import('playwright').BrowserContext,
  url: string,
  archiveDir: string,
  pageTextDir: string,
): Promise<CaptureResult> {
  const screenshotDest = path.join(archiveDir, 'current-live.webp');
  const textJsonDest = path.join(pageTextDir, 'current-live.json');
  const textTxtDest = path.join(pageTextDir, 'current-live.txt');

  return attemptCaptureWithContext(ctx, url, screenshotDest, textJsonDest, textTxtDest, false);
}

async function attemptCaptureWithContext(
  ctx: import('playwright').BrowserContext,
  targetUrl: string,
  screenshotDest: string,
  textJsonDest: string,
  textTxtDest: string,
  isWayback: boolean,
): Promise<CaptureResult> {
  const RETRY_DELAYS_MS = [5_000, 12_000];
  let lastError = '';

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) {
      const delay = RETRY_DELAYS_MS[attempt - 1];
      log(`Retry attempt ${attempt} for ${targetUrl} (waiting ${delay}ms)`);
      await new Promise((r) => setTimeout(r, delay));
    }

    const page = await ctx.newPage();
    try {
      log(`Navigating to: ${targetUrl}`);
      await page.goto(targetUrl, { waitUntil: 'load', timeout: 60_000 });
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
      await page.waitForTimeout(isWayback ? 2000 : 1000);

      if (isWayback) {
        await hideWaybackToolbar(page);
        await page.waitForTimeout(500);
      }

      await dismissCookieBanners(page);

      let textPathJson: string | null = null;
      let textPathTxt: string | null = null;
      try {
        const text = await extractPageText(page);
        saveJson(textJsonDest, text);
        saveText(textTxtDest, pageTextToPlain(text));
        textPathJson = textJsonDest;
        textPathTxt = textTxtDest;
        log(`Text extracted and saved to ${textJsonDest}`);
      } catch (err) {
        logError(`Text extraction failed for ${targetUrl}: ${err instanceof Error ? err.message : String(err)}`);
      }

      const isPng = screenshotDest.endsWith('.png');
      const pngPath = isPng ? screenshotDest : screenshotDest.replace(/\.webp$/, '.png');
      await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });

      if (!isPng) {
        await sharp(pngPath)
          .resize({ height: 16_000, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(screenshotDest);
        fs.unlinkSync(pngPath);
      }

      log(`Screenshot saved to ${screenshotDest}`);
      return { success: true, screenshotPath: screenshotDest, textPathJson, textPathTxt, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logError(`Capture failed for ${targetUrl}: ${message}`);
      lastError = message;
      const isRetryable = message.includes('net::ERR_');
      if (!isRetryable) return { success: false, screenshotPath: null, textPathJson: null, textPathTxt: null, error: message };
    } finally {
      await page.close();
    }
  }

  return { success: false, screenshotPath: null, textPathJson: null, textPathTxt: null, error: lastError };
}
