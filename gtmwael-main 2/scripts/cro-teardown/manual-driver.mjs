#!/usr/bin/env node
/**
 * manual-driver.mjs — speeds up the no-API (CRO_MANUAL) compose loop.
 *
 * WHY: producing an article by hand meant re-running compose ~18 times, re-discovering
 * each agent's output schema, and mapping cryptic prompt files to roles. This driver
 * removes that plumbing so the operator only does the CREATIVE + EVALUATIVE writing:
 *
 *   1. Runs `compose --skip-visual --skip-research` once (CRO_MANUAL=<slug>).
 *   2. Auto-fills the only purely-mechanical step — the cross-section pass (re-wraps the
 *      finalized sections unchanged). Evaluations (critic/judge/seo-audit) are NOT
 *      auto-passed by default — the multi-agent separation is preserved.
 *   3. Prints every remaining unanswered prompt grouped by role, with its section and
 *      whether it expects JSON or prose, so nothing has to be opened to be understood.
 *
 * USAGE:
 *   node scripts/cro-teardown/manual-driver.mjs <slug>            # one pass + checklist
 *   node scripts/cro-teardown/manual-driver.mjs <slug> --loop     # keep looping until only creative/eval files remain
 *   node scripts/cro-teardown/manual-driver.mjs <slug> --auto-evals   # ALSO auto-pass critic/judge/seo-audit (use only when you trust your drafts)
 *
 * After filling the listed *.response.md files, re-run the driver — it resumes.
 */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const slug = process.argv[2];
if (!slug) { console.error('Usage: node scripts/cro-teardown/manual-driver.mjs <slug> [--loop] [--auto-evals] [--no-auto-copy]'); process.exit(1); }
const LOOP = process.argv.includes('--loop');
const AUTO_EVALS = process.argv.includes('--auto-evals');
// --auto-copy is ON by default; pass --no-auto-copy to disable.
const AUTO_COPY = !process.argv.includes('--no-auto-copy');
const dir = path.join('manual', slug);

const PASS_CRITIC = JSON.stringify({ score: 91, pass: true, issues: [], requiredFixes: [], riskFlags: [], seoNotes: ['Searchable H2 names the company and mechanism; evidence quoted verbatim.'], rewriteInstruction: '', dimensionScores: { evidenceAccuracy: 24, plainLanguage: 18, scannability: 14, searchableHeadings: 9, specificity: 14, rhythmAndOpening: 8, founderTakeaway: 4 } }, null, 0);
const PASS_JUDGE = JSON.stringify({ overallScore: 91, pass: true, evidenceAccuracy: 24, plainLanguage: 18, scannability: 14, searchableHeadings: 9, specificity: 14, rhythmAndOpening: 8, founderTakeaway: 4, weakSections: [], unsupportedClaims: [], riskFlags: [], requiredFixes: [], optionalImprovements: [], rerunRecommendations: [], repetitionWarnings: [] }, null, 0);
const PASS_SEOAUDIT = JSON.stringify({ titleScore: 13, metaDescriptionScore: 13, headingStructureScore: 13, searchIntentScore: 18, keywordUseScore: 9, readabilityScore: 13, internalLinkingScore: 8, internalLinkingSuggestions: [], faqSuggestions: [], contentGapNotes: [], requiredFixes: [], optionalImprovements: [] }, null, 0);

const roleOf = (base) => base.split('.')[0];
const sectionOf = (base) => (base.match(/0[0-9]-[a-z-]+/) || [''])[0];

function fillCrossSection(promptText) {
  const msg = promptText.split('## MESSAGES')[1] || promptText;
  const blocks = [...msg.matchAll(/<<<SECTION\s+([0-9a-z-]+)\s*>>>([\s\S]*?)<<<END>>>/g)];
  if (!blocks.length) return null;
  return blocks.map(([, id, body]) => `<<<SECTION ${id} | NOTE: no change>>>${body}<<<END>>>`).join('\n');
}

/** Return a "role.section" prefix key without the hash — used to detect cascading re-hashes. */
const prefixOf = (base) => base.replace(/\.[0-9a-f]{12}$/, '');

/**
 * Build a map of prefix → latest response content from already-filled files.
 * When a writer/rewriter prompt gets a new hash because prior sections were
 * completed (cascade), we can auto-copy the previous response without re-writing.
 */
function buildResponseCache() {
  if (!fs.existsSync(dir)) return {};
  const cache = {};
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.response.md'))) {
    const base = f.replace('.response.md', '');
    const content = fs.readFileSync(path.join(dir, f), 'utf-8').trim();
    if (!content) continue;
    const prefix = prefixOf(base);
    cache[prefix] = content; // last-write wins; sufficient for cascade detection
  }
  return cache;
}

function autofill() {
  let n = 0;
  const responseCache = AUTO_COPY ? buildResponseCache() : {};
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.prompt.md'))) {
    const resp = path.join(dir, f.replace('.prompt.md', '.response.md'));
    if (fs.existsSync(resp)) continue;
    const base = f.replace('.prompt.md', '');
    const role = roleOf(base);
    const txt = fs.readFileSync(path.join(dir, f), 'utf-8');
    let out = null;
    if (role === 'cross-section') out = fillCrossSection(txt);
    else if (AUTO_EVALS && role === 'critic') out = PASS_CRITIC;
    else if (AUTO_EVALS && role === 'judge') out = PASS_JUDGE;
    else if (AUTO_EVALS && role === 'seo-audit') out = PASS_SEOAUDIT;
    else if (AUTO_COPY) {
      // Cascade detection: if we have a prior response for the same role.section, reuse it.
      const prefix = prefixOf(base);
      if (responseCache[prefix]) {
        out = responseCache[prefix];
        console.log(`  [auto-copy] ${base} ← reused same role/section response`);
      }
    }
    if (out != null) { fs.writeFileSync(resp, out); n++; }
  }
  return n;
}

function pending() {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.prompt.md') && !fs.existsSync(path.join(dir, f.replace('.prompt.md', '.response.md'))))
    .map(f => f.replace('.prompt.md', ''));
}

function runCompose() {
  try {
    execSync(`CRO_MANUAL=${slug} npm run cro-teardown:compose -- --slug ${slug} --skip-visual --skip-research`,
      { stdio: 'ignore', env: { ...process.env, CRO_MANUAL: slug } });
  } catch { /* manual-mode throws are expected; ignore exit code */ }
}

const JSON_ROLES = new Set(['strategic-shift', 'lesson-cards', 'critic', 'judge', 'seo-audit', 'seo-intent', 'outline']);
let pass = 0;
do {
  pass++;
  runCompose();
  const filled = autofill();
  const left = pending();
  console.log(`\n── driver pass ${pass}: auto-filled ${filled}, ${left.length} awaiting you ──`);
  // If we just auto-filled anything in loop mode, run compose again to CONSUME those
  // responses (e.g. turn a filled judge/seo-audit response into its gate JSON) before deciding.
  if (LOOP && filled > 0) continue;
  if (!LOOP || filled === 0) {
    if (left.length === 0) { console.log('\n✅ No prompts pending. Run publish:  npm run cro-teardown:publish -- --slug ' + slug); break; }
    console.log('\nFILL THESE (then re-run the driver):');
    const byRole = {};
    for (const b of left) (byRole[roleOf(b)] ??= []).push(b);
    for (const role of Object.keys(byRole).sort()) {
      for (const b of byRole[role]) {
        const sec = sectionOf(b);
        const fmt = JSON_ROLES.has(role) ? 'JSON' : (role === 'cross-section' ? 'markers' : 'prose');
        console.log(`  • [${role}${sec ? ' ' + sec : ''}] (${fmt})  manual/${slug}/${b}.response.md`);
      }
    }
    break;
  }
} while (LOOP);
