import * as path from 'node:path';
import type { ScoredEntry } from './select.js';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function imgRelPath(previewDir: string, projectRoot: string, webPath: string): string {
  // webPath is like /cro-teardowns/slug/archive-monthly/2023-01.webp
  // Images live under public/ so full abs = projectRoot/public + webPath
  const abs = path.join(projectRoot, 'public', webPath);
  return path.relative(previewDir, abs).replace(/\\/g, '/');
}

export function generatePreviewHtml(opts: {
  projectRoot: string;
  previewDir: string;  // where preview.html is saved
  slug: string;
  companyName: string;
  originalUrl: string;
  mode: 'auto' | 'manual';
  threshold: number | null;
  manualMonths: string[];
  entries: ScoredEntry[];
  generatedAt: string;
}): string {
  const { projectRoot, previewDir, slug, companyName, originalUrl, mode, threshold, entries, generatedAt } = opts;

  const selected = entries.filter(e => e.selected).length;
  const duplicates = entries.filter(e => e.duplicate).length;

  const cards = entries.map(entry => {
    const isFirst = entry.forceKept && entry.month !== 'current';
    const isLive  = entry.month === 'current';
    const imgSrc  = imgRelPath(previewDir, projectRoot, entry.screenshotPath);

    let badges = '';
    if (isFirst) badges += `<span class="badge badge-first">⭐ First</span>`;
    if (isLive)  badges += `<span class="badge badge-live">⚡ Live</span>`;
    if (entry.selected && !isFirst && !isLive) badges += `<span class="badge badge-selected">✓ Selected</span>`;
    if (entry.duplicate) badges += `<span class="badge badge-dup">✕ Duplicate</span>`;

    let scoreHtml = '';
    if (entry.similarityToPrev !== null) {
      const pct = (entry.similarityToPrev * 100).toFixed(1);
      scoreHtml = `<div class="score">vs ${esc(entry.comparedTo ?? '')} · ${pct}% similar</div>`;
    }

    const cardClass = [
      'card',
      entry.selected ? 'card-selected' : '',
      entry.duplicate ? 'card-dup' : '',
      isLive ? 'card-live' : '',
    ].filter(Boolean).join(' ');

    const label = isLive ? 'Current live' : entry.month;

    return `
    <div class="${esc(cardClass)}">
      <div class="img-wrap">
        <img src="${esc(imgSrc)}" loading="lazy" alt="${esc(label)}" />
        ${entry.duplicate ? '<div class="dup-overlay"></div>' : ''}
      </div>
      <div class="card-body">
        <div class="month">${esc(label)}</div>
        ${badges}
        ${scoreHtml}
        ${entry.timestamp ? `<div class="ts">Archived ${esc(entry.timestamp.slice(0,8))}</div>` : ''}
      </div>
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CRO Teardown — ${esc(companyName)}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0f1117; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; padding: 24px; }
  h1 { font-size: 20px; font-weight: 600; }
  .meta { color: #94a3b8; font-size: 12px; margin-top: 4px; }
  .meta a { color: #60a5fa; text-decoration: none; }
  .stats { display: flex; gap: 16px; margin: 16px 0 24px; }
  .stat { background: #1e2433; border-radius: 8px; padding: 10px 16px; }
  .stat-val { font-size: 22px; font-weight: 700; }
  .stat-label { font-size: 11px; color: #64748b; margin-top: 2px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card { background: #1e2433; border-radius: 10px; overflow: hidden; border: 2px solid transparent; transition: border-color 0.15s; }
  .card-selected { border-color: #22c55e; }
  .card-dup { border-color: #475569; opacity: 0.55; }
  .card-live { border-color: #60a5fa; }
  .img-wrap { position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; background: #0f1117; }
  .img-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .dup-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
  .card-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 5px; }
  .month { font-weight: 600; font-size: 13px; }
  .badges { display: flex; flex-wrap: wrap; gap: 4px; }
  .badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
  .badge-first    { background: #78350f; color: #fde68a; }
  .badge-live     { background: #1e3a5f; color: #93c5fd; }
  .badge-selected { background: #14532d; color: #86efac; }
  .badge-dup      { background: #1e293b; color: #64748b; }
  .score { font-size: 11px; color: #64748b; }
  .ts { font-size: 11px; color: #475569; }
  .legend { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; font-size: 12px; color: #94a3b8; }
  .dot { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
</style>
</head>
<body>
<h1>CRO Teardown — ${esc(companyName)}</h1>
<p class="meta">
  <a href="${esc(originalUrl)}" target="_blank">${esc(originalUrl)}</a>
  &nbsp;·&nbsp;
  ${esc(mode === 'auto' ? `auto (threshold ${threshold})` : 'manual selection')}
  &nbsp;·&nbsp;
  Generated ${esc(generatedAt)}
</p>

<div class="stats">
  <div class="stat"><div class="stat-val">${entries.length}</div><div class="stat-label">Captured</div></div>
  <div class="stat"><div class="stat-val" style="color:#22c55e">${selected}</div><div class="stat-label">Selected</div></div>
  <div class="stat"><div class="stat-val" style="color:#64748b">${duplicates}</div><div class="stat-label">Duplicates</div></div>
</div>

<div class="legend">
  <span><span class="dot" style="background:#22c55e"></span>Selected</span>
  <span><span class="dot" style="background:#60a5fa"></span>Current live</span>
  <span><span class="dot" style="background:#78350f"></span>First archive (always kept)</span>
  <span><span class="dot" style="background:#475569;opacity:0.55"></span>Duplicate (skipped)</span>
</div>

<div class="grid">
${cards}
</div>
</body>
</html>`;
}
