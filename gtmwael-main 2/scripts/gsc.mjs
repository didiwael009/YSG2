#!/usr/bin/env node
// GSC helper — auto-refreshes the access token, then runs a query
// Usage: node scripts/gsc.mjs <command> [args]
//
// Commands:
//   top-pages [rows]          top pages by clicks (default 30)
//   top-queries [rows]        top queries by clicks (default 50)
//   page-queries <url> [rows] queries for a specific page (default 20)
//   all-teardowns             queries for all 5 low-CTR teardown pages

import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnv() {
  const env = {};
  const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

async function getAccessToken(env) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }).toString(),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token refresh failed: ' + JSON.stringify(data));
  return data.access_token;
}

async function gscQuery(token, property, payload) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

function fmt(n, decimals = 1) {
  return n == null ? '-' : Number(n).toFixed(decimals);
}

function printTable(rows, dimensions) {
  if (!rows?.length) { console.log('No data'); return; }
  for (const r of rows) {
    const keys = r.keys?.join(' | ') ?? '-';
    console.log(`${keys.padEnd(60)} clicks:${r.clicks} impr:${r.impressions} pos:${fmt(r.position)} ctr:${fmt(r.ctr * 100)}%`);
  }
}

async function main() {
  const [,, cmd, arg1, arg2] = process.argv;
  const env = loadEnv();

  if (!env.GOOGLE_REFRESH_TOKEN) {
    console.error('No GOOGLE_REFRESH_TOKEN in .env — run: node scripts/gsc-auth.mjs');
    process.exit(1);
  }

  const token = await getAccessToken(env);
  const property = env.GOOGLE_GSC_PROPERTY;
  const basePayload = {
    startDate: '2026-01-01',
    endDate: '2026-08-25',
    type: 'web',
  };

  if (cmd === 'top-pages') {
    const rows = parseInt(arg1 ?? '30');
    const data = await gscQuery(token, property, { ...basePayload, dimensions: ['page'], rowLimit: rows });
    console.log(`\nTop ${rows} pages:\n`);
    printTable(data.rows, ['page']);

  } else if (cmd === 'top-queries') {
    const rows = parseInt(arg1 ?? '50');
    const data = await gscQuery(token, property, { ...basePayload, dimensions: ['query'], rowLimit: rows });
    console.log(`\nTop ${rows} queries:\n`);
    printTable(data.rows, ['query']);

  } else if (cmd === 'page-queries') {
    if (!arg1) { console.error('Usage: page-queries <page-url> [rows]'); process.exit(1); }
    const rows = parseInt(arg2 ?? '20');
    const data = await gscQuery(token, property, {
      ...basePayload,
      dimensions: ['query'],
      dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: arg1 }] }],
      rowLimit: rows,
    });
    console.log(`\nQueries for ${arg1}:\n`);
    printTable(data.rows, ['query']);

  } else if (cmd === 'all-teardowns') {
    const pages = [
      'https://www.yoursaasgrowth.com/cro-teardowns/linear',
      'https://www.yoursaasgrowth.com/cro-teardowns/intercom',
      'https://www.yoursaasgrowth.com/cro-teardowns/apify',
      'https://www.yoursaasgrowth.com/cro-teardowns/clay',
      'https://www.yoursaasgrowth.com/cro-teardowns/expensya',
    ];
    for (const page of pages) {
      const data = await gscQuery(token, property, {
        ...basePayload,
        dimensions: ['query'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'equals', expression: page }] }],
        rowLimit: 10,
      });
      const name = page.split('/').pop();
      console.log(`\n--- ${name} ---`);
      printTable(data.rows, ['query']);
    }

  } else {
    console.log(`
Usage: node scripts/gsc.mjs <command>

Commands:
  top-pages [n]          top pages by clicks
  top-queries [n]        top queries by clicks
  page-queries <url> [n] queries driving a specific page
  all-teardowns          queries for all 5 low-CTR teardown pages
`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
