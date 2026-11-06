/**
 * Recapture teardown screenshots that were saved while the Wayback Machine showed its
 * "Temporarily Offline" page. Tries the original timestamp, then the nearest 200 capture
 * in the same 6-month slot. Full page at 1440 wide, webp, same paths.
 *
 * Run: bun scripts/cro-teardown/recapture-offline.ts [company/month ...]
 */
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

const kit = await import(path.join(os.homedir(), "browser-kit/lib"));
const { launchKit, humanScroll, pause } = kit;

const ROOT = path.resolve(import.meta.dir, "../..");
const PUBLIC = path.join(ROOT, "public/cro-teardowns");
const OUT_TEXT = process.env.RECAPTURE_TEXT_DIR ?? path.join(os.tmpdir(), "recapture-text");
const FIXTURE = path.join(ROOT, "tests/fixtures/archive-offline.webp");
const MAX_HEIGHT = 12000;

type Target = { company: string; month: string; url: string; ts: string };
const TARGETS: Target[] = [
  { company: "brevo", month: "2023-01", url: "https://www.brevo.com/", ts: "20230504110254" },
  { company: "cashin", month: "2023-01", url: "https://cashin.sa/ar", ts: "20230326193652" },
  { company: "cashin", month: "2026-01", url: "https://cashin.sa/ar", ts: "20260418072402" },
  { company: "crowdanalyzer", month: "2016-07", url: "https://crowdanalyzer.com", ts: "20161020085117" },
  { company: "lemlist", month: "2023-07", url: "https://www.lemlist.com", ts: "20231015210558" },
  { company: "mailerlite", month: "2026-01", url: "https://www.mailerlite.com", ts: "20260401185539" },
  { company: "sendx", month: "2019-01", url: "https://www.sendx.io/", ts: "20190404022738" },
  { company: "wafeq", month: "2022-01", url: "https://www.wafeq.com/en", ts: "20220411203344" },
];

const HIDE_WAYBACK_CSS = `
  #wm-ipp, #wm-ipp-base, #wm-ipp-print, #wm-ipp-inside, #donato,
  .wb-autocomplete-suggestions, #wm-tb, #wm-ipp-float,
  #onetrust-consent-sdk, #CybotCookiebotDialog { display: none !important; }
  html, body { margin-top: 0 !important; padding-top: 0 !important; }
`;

const print = (img: sharp.Sharp) =>
  img.extract({ left: 0, top: 0, width: 800, height: 300 }).resize(80, 30).grayscale().raw().toBuffer();
const offline = await print(sharp(FIXTURE));
const offlineDiff = async (buf: Buffer) => {
  const p = await print(sharp(buf));
  return p.reduce((s, v, i) => s + Math.abs(v - offline[i]), 0) / p.length;
};

/** Six-month slot that contains `month` (Jan–Jun or Jul–Dec). */
const slot = (month: string) => {
  const [y, m] = month.split("-").map(Number);
  return m <= 6 ? [`${y}01`, `${y}06`] : [`${y}07`, `${y}12`];
};

async function candidates(t: Target): Promise<string[]> {
  // RECAPTURE_TS="ts1,ts2" tries exactly these timestamps, in order
  if (process.env.RECAPTURE_TS) return process.env.RECAPTURE_TS.split(",").map((s) => s.trim()).filter(Boolean);
  const [from, to] = slot(t.month);
  const orig = t.ts.slice(0, 6);
  const ranges = [[from, to]];
  if (orig < from || orig > to) ranges.push([orig, orig]); // the original sat outside the slot: try its month too
  const out = [t.ts];
  for (const [f, e] of ranges) {
    const q = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(t.url)}&from=${f}&to=${e}&filter=statuscode:200&collapse=timestamp:8&fl=timestamp&limit=12`;
    try {
      const res = await fetch(q);
      const txt = await res.text();
      for (const line of txt.split("\n").map((l) => l.trim()).filter(Boolean)) if (!out.includes(line)) out.push(line);
    } catch (e) {
      console.warn(`  CDX failed for ${t.company}: ${e}`);
    }
  }
  // nearest to the original first
  const n = Number(t.ts);
  return [out[0], ...out.slice(1).sort((a, b) => Math.abs(Number(a) - n) - Math.abs(Number(b) - n))].slice(0, Number(process.env.RECAPTURE_TRIES ?? 6));
}

const only = process.argv.slice(2);
const targets = only.length ? TARGETS.filter((t) => only.includes(`${t.company}/${t.month}`)) : TARGETS;
fs.mkdirSync(OUT_TEXT, { recursive: true });

const ctx = await launchKit();
const page = ctx.pages()[0] ?? (await ctx.newPage());
const report: Record<string, unknown>[] = [];

for (const t of targets) {
  console.log(`\n== ${t.company} ${t.month}`);
  let done = false;
  for (const ts of await candidates(t)) {
    const url = `https://web.archive.org/web/${ts}/${t.url}`;
    try {
      const res = await page.goto(url, { waitUntil: "load", timeout: 90_000 });
      await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
      await pause(2500, 3500);
      const title = await page.title();
      const text = await page.evaluate(() => document.body?.innerText ?? "");
      if (/Temporarily Offline|Wayback Machine has not archived|Hrm\.|This snapshot cannot be displayed/i.test(title + text.slice(0, 600))) {
        console.log(`  ${ts}: archive error page (${title})`);
        continue;
      }
      // Wayback often fails to replay a site's stylesheets: the page then renders as raw HTML.
      let rules = 0;
      for (let i = 0; i < 3; i++) {
        rules = await page.evaluate(() =>
          [...document.styleSheets].reduce((n, sh) => {
            try { return n + sh.cssRules.length; } catch { return n; }
          }, 0),
        );
        if (rules >= 200) break;
        await pause(4000, 6000);
      }
      if (rules < 200) {
        console.log(`  ${ts}: stylesheets missing (${rules} rules), page renders unstyled`);
        continue;
      }
      // A cookie widget can bring its own rules while the site CSS is gone: the body then keeps the browser's serif default.
      const font = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
      if (/^"?(Times|serif)/i.test(font)) {
        console.log(`  ${ts}: body font is the browser default (${font}), page renders unstyled`);
        continue;
      }
      await page.addStyleTag({ content: HIDE_WAYBACK_CSS });
      // Cookie banners vary per site: drop any fixed or sticky box that talks about cookies
      // (a modal and its full-screen overlay hold little text), then undo the scroll lock they set.
      await page.evaluate(() => {
        for (const el of [...document.querySelectorAll<HTMLElement>("body *")]) {
          if (!el.isConnected) continue;
          const pos = getComputedStyle(el).position;
          const txt = el.innerText ?? "";
          if ((pos === "fixed" || pos === "sticky") && /cookie/i.test(txt) && (el.offsetHeight < 500 || txt.length < 1500)) el.remove();
        }
        for (const el of [document.documentElement, document.body]) {
          el.style.setProperty("overflow", "visible", "important");
          el.style.setProperty("height", "auto", "important");
        }
      });
      await page.evaluate(() => ["wm-ipp", "wm-ipp-base", "wm-ipp-print", "donato"].forEach((id) => document.getElementById(id)?.remove()));
      // scroll through once so lazy images load, then back to top
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(h, MAX_HEIGHT); y += 900) await humanScroll(page, 900);
      await page.evaluate(() => window.scrollTo(0, 0));
      await pause(1500, 2000);
      const full = await page.evaluate(() => document.documentElement.scrollHeight);
      if (full < 1200) {
        console.log(`  ${ts}: page only ${full}px tall, likely a broken replay`);
        continue;
      }
      const png = await page.screenshot({
        fullPage: full <= MAX_HEIGHT,
        clip: full > MAX_HEIGHT ? { x: 0, y: 0, width: 1440, height: MAX_HEIGHT } : undefined,
      });
      const diff = await offlineDiff(png);
      if (diff < 12) {
        console.log(`  ${ts}: still matches the offline fingerprint (${diff.toFixed(1)})`);
        continue;
      }
      const webp = await sharp(png).webp({ quality: 85 }).toBuffer();
      if (webp.length < 20_000) {
        console.log(`  ${ts}: suspiciously small (${webp.length} B), skipping`);
        continue;
      }
      for (const dir of ["selected", "archive-monthly"]) {
        const d = path.join(PUBLIC, t.company, dir);
        if (!fs.existsSync(d)) continue;
        fs.writeFileSync(path.join(d, `${t.month}.webp`), webp);
      }
      fs.writeFileSync(path.join(OUT_TEXT, `${t.company}-${t.month}.txt`), `${url}\nstatus ${res?.status()}\ntitle ${title}\n\n${text}`);
      const meta = await sharp(webp).metadata();
      console.log(`  OK ${ts} → ${meta.width}x${meta.height}, ${Math.round(webp.length / 1024)} KB, diff ${diff.toFixed(1)}`);
      report.push({ ...t, used: ts, url, width: meta.width, height: meta.height, diff: Number(diff.toFixed(1)), title });
      done = true;
      break;
    } catch (e) {
      console.log(`  ${ts}: ${String(e).split("\n")[0]}`);
    }
  }
  if (!done) report.push({ ...t, used: null });
}

await ctx.close();
fs.writeFileSync(path.join(OUT_TEXT, "report.json"), JSON.stringify(report, null, 2));
console.log(`\nreport: ${path.join(OUT_TEXT, "report.json")}`);
