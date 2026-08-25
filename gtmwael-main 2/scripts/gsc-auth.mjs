#!/usr/bin/env node
// One-time OAuth flow — run this once to get a refresh token saved to .env
// Usage: node scripts/gsc-auth.mjs

import http from 'http';
import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env before running.
function readEnvVar(key) {
  try {
    const raw = readFileSync(new URL('../.env', import.meta.url), 'utf8');
    const m = raw.match(new RegExp(`^${key}="?([^"\\n]*)"?`, 'm'));
    return m?.[1] ?? null;
  } catch { return null; }
}
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || readEnvVar('GOOGLE_CLIENT_ID');
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || readEnvVar('GOOGLE_CLIENT_SECRET');
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env first.');
  process.exit(1);
}
const REDIRECT_URI = 'http://localhost:8765';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPE)}` +
  `&access_type=offline` +
  `&prompt=consent`;

console.log('\nOpening browser for Google auth...\n');
exec(`open "${authUrl}"`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  if (!code) {
    res.end('No code — try again.');
    return;
  }

  res.end('<h2>Auth complete — you can close this tab.</h2>');
  server.close();

  const body = new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  });

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const tokens = await tokenRes.json();

  if (!tokens.refresh_token) {
    console.error('No refresh_token returned:', tokens);
    process.exit(1);
  }

  const envPath = resolve(process.cwd(), '.env');
  let env = readFileSync(envPath, 'utf8');

  const lines = [
    `GOOGLE_CLIENT_ID="${CLIENT_ID}"`,
    `GOOGLE_CLIENT_SECRET="${CLIENT_SECRET}"`,
    `GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`,
    `GOOGLE_GSC_PROPERTY="sc-domain:yoursaasgrowth.com"`,
  ];

  for (const line of lines) {
    const key = line.split('=')[0];
    if (env.includes(key)) {
      env = env.replace(new RegExp(`^${key}=.*$`, 'm'), line);
    } else {
      env += `\n${line}`;
    }
  }

  writeFileSync(envPath, env);
  console.log('\n✓ Saved to .env:');
  console.log('  GOOGLE_CLIENT_ID');
  console.log('  GOOGLE_CLIENT_SECRET');
  console.log('  GOOGLE_REFRESH_TOKEN');
  console.log('  GOOGLE_GSC_PROPERTY');
  console.log('\nDone. You never need to do this again.\n');
});

server.listen(8765, () => {
  console.log('Waiting for Google callback on http://localhost:8765 ...');
});
