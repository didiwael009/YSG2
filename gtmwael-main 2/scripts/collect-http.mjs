#!/usr/bin/env node
/**
 * HTTP-only Wayback collector for the homepage study.
 *
 * The browser-based Phase 1 pipeline loads every asset from web.archive.org,
 * which trips Wayback's load-shedding and yields "Temporarily Offline" pages
 * (~89% failure rate observed). This fetches the archived HTML in a single
 * request per snapshot and parses the fields the study needs. No screenshots.
 *
 *   node scripts/collect-http.mjs [--only slug1,slug2] [--concurrency 3]
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const TARGETS = [
  ['Notion','https://www.notion.so/',2019],      ['Figma','https://www.figma.com/',2017],
  ['Slack','https://slack.com/',2015],           ['Airtable','https://airtable.com/',2016],
  ['Asana','https://asana.com/',2015],           ['Monday','https://monday.com/',2017],
  ['Calendly','https://calendly.com/',2016],     ['Zapier','https://zapier.com/',2015],
  ['Canva','https://www.canva.com/',2015],       ['Miro','https://miro.com/',2019],       ['RealtimeBoard','https://realtimeboard.com/',2014],
  ['Typeform','https://www.typeform.com/',2015], ['Framer','https://www.framer.com/',2017],
  ['Supabase','https://supabase.com/',2020],     ['Sentry','https://sentry.io/',2016],
  ['Twilio','https://www.twilio.com/',2015],     ['Datadog','https://www.datadoghq.com/',2015],
  ['PostHog','https://posthog.com/',2020],       ['Railway','https://railway.app/',2021],
  ['Amplitude','https://amplitude.com/',2015],   ['Mixpanel','https://mixpanel.com/',2015],
  ['Segment','https://segment.com/',2015],       ['Loom','https://www.loom.com/',2017],
  ['Ramp','https://ramp.com/',2020],             ['Brex','https://www.brex.com/',2018],
  ['Deel','https://www.deel.com/',2019],         ['Rippling','https://www.rippling.com/',2018],
  ['Gusto','https://gusto.com/',2016],           ['Vanta','https://www.vanta.com/',2020],
  ['Drata','https://drata.com/',2021],           ['Retool','https://retool.com/',2019],
];

const args = process.argv.slice(2);
const argOf = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const ONLY = (argOf('only', '') || '').split(',').filter(Boolean);
const CONC = Number(argOf('concurrency', 3));
const END_YEAR = 2026;

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchText(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; homepage-research/1.0)', 'Accept-Encoding': 'gzip' },
        signal: AbortSignal.timeout(70_000),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      return buf[0] === 0x1f && buf[1] === 0x8b ? gunzipSync(buf).toString('utf8') : buf.toString('utf8');
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(3000 * (i + 1));
    }
  }
}

const strip = h => (h || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

function extract(html) {
  html = html.replace(/<!--\s*BEGIN WAYBACK TOOLBAR INSERT\s*-->[\s\S]*?<!--\s*END WAYBACK TOOLBAR INSERT\s*-->/gi, '')
             .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, '');
  const one = re => { const m = html.match(re); return m ? strip(m[1]) : ''; };
  const many = re => [...html.matchAll(re)].map(m => strip(m[1])).filter(Boolean);
  const body = strip(html).slice(0, 12000);
  return {
    title: one(/<title[^>]*>([\s\S]*?)<\/title>/i),
    metaDescription: one(/<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i),
    h1: many(/<h1[^>]*>([\s\S]*?)<\/h1>/gi).slice(0, 5),
    h2: many(/<h2[^>]*>([\s\S]*?)<\/h2>/gi).slice(0, 40),
    h3: many(/<h3[^>]*>([\s\S]*?)<\/h3>/gi).slice(0, 40),
    ctas: many(/<(?:a|button)[^>]*>([\s\S]*?)<\/(?:a|button)>/gi).slice(0, 300),
    navLinks: many(/<nav[^>]*>([\s\S]*?)<\/nav>/gi).slice(0, 1),
    bodyText: body,
  };
}

// A capture is unusable only if it is Wayback's own error page, or carries no
// content at all. Some archived pages render their title client-side and have
// none in the HTML while still holding real headings — those are kept.
const failed = t =>
  /Temporarily Offline|Wayback Machine|Internet Archive/i.test(t.title || '') ||
  (!t.title && !t.h1.length && !t.h2.length);

/** Enumerate real captures via the CDX index — the availability API misses many. */
async function cdxCaptures(url) {
  const q = new URLSearchParams({
    url: url.replace(/^https?:\/\//, '').replace(/\/$/, ''),
    output: 'json', fl: 'timestamp', filter: 'statuscode:200',
    collapse: 'timestamp:6', from: '2014', to: '2026', limit: '400',
  });
  try {
    const rows = JSON.parse(await fetchText('https://web.archive.org/cdx/search/cdx?' + q));
    const ts = rows.slice(1).map(r => r[0]).sort();
    // Some hosts serve mostly redirects, so the statuscode:200 filter starves the
    // result. Fall back to an unfiltered index when the first pass is near-empty.
    if (ts.length >= 4) return ts;
    q.delete('filter');
    const all = JSON.parse(await fetchText('https://web.archive.org/cdx/search/cdx?' + q));
    return all.slice(1).map(r => r[0]).sort();
  } catch { return []; }
}

async function collect([name, url, startYear]) {
  const slug = slugify(name);
  const dir = `data/cro-teardowns/${slug}/page-text`;
  if (existsSync(`data/cro-teardowns/${slug}`) && !ONLY.includes(slug)) {
    console.log(`  skip  ${name} — already has data`); return null;
  }
  mkdirSync(dir, { recursive: true });
  let ok = 0, bad = 0;
  const all = await cdxCaptures(url);
  // one capture per year: the first available in or after June, else the last of that year
  const picks = [];
  for (let y = startYear; y <= END_YEAR; y++) {
    const inYear = all.filter(ts => ts.startsWith(String(y)));
    if (!inYear.length) continue;
    picks.push([y, inYear.find(ts => ts.slice(4, 6) >= '06') || inYear[inYear.length - 1]]);
  }
  for (const [y, ts] of picks) {
    try {
      const t = extract(await fetchText(`https://web.archive.org/web/${ts}/${url}`));
      if (failed(t)) { bad++; continue; }
      writeFileSync(`${dir}/${y}-${ts.slice(4, 6)}.json`, JSON.stringify({ ...t, _source: `https://web.archive.org/web/${ts}/${url}`, _timestamp: ts }, null, 2));
      ok++;
    } catch { bad++; }
    await sleep(1200);
  }
  try {
    const t = extract(await fetchText(url));
    if (!failed(t)) { writeFileSync(`${dir}/current-live.json`, JSON.stringify({ ...t, _source: url }, null, 2)); ok++; }
    else bad++;
  } catch { bad++; }
  writeFileSync(`data/cro-teardowns/${slug}/config.json`,
    JSON.stringify({ name, slug, url, from: `${startYear}-06`, to: `${END_YEAR}-06`, method: 'http-only', createdAt: new Date().toISOString() }, null, 2));
  console.log(`  done  ${name.padEnd(12)} ${ok} captured, ${bad} unavailable`);
  return { slug, ok, bad };
}

const list = ONLY.length ? TARGETS.filter(t => ONLY.includes(slugify(t[0]))) : TARGETS;
console.log(`Collecting ${list.length} companies, concurrency ${CONC}\n`);
const queue = [...list]; const results = [];
await Promise.all(Array.from({ length: CONC }, async () => {
  while (queue.length) { const r = await collect(queue.shift()); if (r) results.push(r); }
}));
const tot = results.reduce((a, r) => a + r.ok, 0);
console.log(`\nDONE — ${results.length} companies, ${tot} usable snapshots`);
