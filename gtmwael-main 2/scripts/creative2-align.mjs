// browser-kit:exempt — test of our own local page (localhost:8081), Wael's OK on 2026-11-15.
// Box check for /creative-2: both hero layers must line up block by block at
// 1280, 768 and 375 wide, and the slider must respond to keys and drag.
// Usage: node scripts/creative2-align.mjs [screenshot-dir]
import { chromium } from "playwright";
import path from "node:path";

const URL = process.env.C2_URL ?? "http://localhost:8081/creative-2";
const SHOT_DIR = process.argv[2];
const WIDTHS = [1280, 768, 375];
let failed = 0;

const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed++;
};

const boxes = (page) =>
  page.evaluate(() => {
    const out = {};
    for (const layer of ["saas", "creative"]) {
      out[layer] = {};
      const root = document.querySelector(`[data-layer="${layer}"]`);
      for (const el of root.querySelectorAll("[data-block]")) {
        const r = el.getBoundingClientRect();
        out[layer][el.dataset.block] = { x: r.x, y: r.y, width: r.width, height: r.height };
      }
      const img = root.querySelector('[data-block="photo"] img');
      out[layer].__photoBottom = img ? img.getBoundingClientRect().bottom : null;
    }
    return out;
  });

const settle = async (page) => {
  await page.evaluate(() => document.fonts.ready);
  // useSyncedBlocks runs on the next animation frame after a resize.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 50)))));
};

const sliderValue = (page) => page.getAttribute('[role="slider"]', "aria-valuenow").then(Number);

// Home goes to 0, then ten ArrowRight steps of 5 bring the handle back to 50.
const toFifty = async (page, knob) => {
  await knob.focus();
  await page.keyboard.press("Home");
  for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowRight");
};

// The installed Google Chrome, so no Playwright browser download is needed.
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: WIDTHS[0], height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForSelector('[data-layer="creative"] [data-block="photo"] img');
await settle(page);

for (const w of WIDTHS) {
  await page.setViewportSize({ width: w, height: 900 });
  await settle(page);
  const b = await boxes(page);
  for (const name of Object.keys(b.saas).filter((k) => !k.startsWith("__"))) {
    const s = b.saas[name];
    const c = b.creative[name];
    const ok = Boolean(c) && ["x", "y", "width", "height"].every((k) => Math.abs(s[k] - c[k]) <= 1);
    check(ok, `${w}px block ${name}${ok ? "" : ` saas=${JSON.stringify(s)} creative=${JSON.stringify(c)}`}`);
  }
  const pb = b.saas.__photoBottom !== null && Math.abs(b.saas.__photoBottom - b.creative.__photoBottom) < 0.5;
  check(pb, `${w}px photo bottoms ${b.saas.__photoBottom} / ${b.creative.__photoBottom}`);
}

// Slider behaviour at 1280.
await page.setViewportSize({ width: 1280, height: 900 });
await settle(page);
await page.evaluate(() => window.scrollTo(0, 0));
const knob = page.locator('[role="slider"]');
await toFifty(page, knob);
check((await sliderValue(page)) === 50, "handle at 50");
await page.keyboard.press("ArrowRight");
await page.keyboard.press("ArrowRight");
const afterKeys = await sliderValue(page);
check(afterKeys === 60, `ArrowRight twice -> ${afterKeys}`);

const hero = await page.locator('section[aria-label="Hero"]').boundingBox();
const k = await knob.boundingBox();
await page.mouse.move(k.x + k.width / 2, k.y + k.height / 2);
await page.mouse.down();
await page.mouse.move(hero.x + hero.width * 0.25, k.y + k.height / 2, { steps: 8 });
await page.mouse.up();
const dragged = await sliderValue(page);
check(dragged >= 24 && dragged <= 26, `drag to 25% -> ${dragged}`);

await toFifty(page, knob);
check((await sliderValue(page)) === 50, "handle back to 50");
const hits = await page.evaluate(() => {
  const heroBox = document.querySelector('section[aria-label="Hero"]').getBoundingClientRect();
  const ctas = document.querySelector('[data-layer="creative"] [data-block="ctas"]').getBoundingClientRect();
  const y = ctas.top + ctas.height / 2;
  const at = (fx) => document.elementFromPoint(heroBox.left + heroBox.width * fx, y);
  const layerOf = (el) => el?.closest("[data-layer]")?.getAttribute("data-layer") ?? "none";
  const left = at(0.25);
  // The visible SaaS button must take the click: a hit on a link inside the SaaS layer.
  return { left: left?.closest('[data-layer="saas"] a') ? "saas link" : layerOf(left), right: layerOf(at(0.75)) };
});
check(hits.left === "saas link", `25% inside ctas hits ${hits.left}`);
check(hits.right === "creative", `75% inside ctas hits ${hits.right}`);

// Tab from the handle back to the creative primary CTA: the handle must move so it shows.
await toFifty(page, knob);
await page.locator('[data-layer="creative"] [data-block="ctas"] a').first().focus();
await settle(page);
const shown = await page.evaluate(() => {
  const a = document.querySelector('[data-layer="creative"] [data-block="ctas"] a').getBoundingClientRect();
  const hero = document.querySelector('section[aria-label="Hero"]').getBoundingClientRect();
  const p = Number(document.querySelector('[role="slider"]').getAttribute("aria-valuenow"));
  return { ok: a.left >= hero.left + (hero.width * p) / 100, p };
});
check(shown.ok, `focused creative CTA visible (handle ${shown.p})`);

if (SHOT_DIR) {
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 900 });
    await settle(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    const file = path.join(SHOT_DIR, `creative-2-${w}.png`);
    await page.screenshot({ path: file });
    console.log(`shot ${file}`);
  }
}

await browser.close();
console.log(failed ? `${failed} check(s) failed` : "all checks passed");
process.exit(failed ? 1 : 0);
