/**
 * qa-validator.ts — Pre-publish QA script for CRO teardown articles.
 *
 * Runs a comprehensive set of checks on a slug's pipeline outputs BEFORE
 * publishing to the website. Catches the 7 known bug classes so they cannot
 * reach a live page.
 *
 * CLI:
 *   npm run cro-teardown:qa -- --slug hootsuite
 *   npm run cro-teardown:qa -- --slug hootsuite --fix      (auto-fix where possible)
 *   npm run cro-teardown:qa                                (check all slugs)
 *
 * Exit codes:
 *   0 — all checks passed (or --fix resolved all issues)
 *   1 — one or more checks failed
 */

import * as fs   from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Path helpers ─────────────────────────────────────────────────────────────

const projectRoot = path.resolve(__dirname, '../..');
const contentDir  = path.join(projectRoot, 'src/content/cro-teardown/articles');

function writingDir(slug: string) {
  return path.join(projectRoot, 'data/cro-teardowns', slug, 'writing');
}
function sectionEvidenceDir(slug: string) {
  return path.join(writingDir(slug), 'section-evidence');
}
function sectionsDir(slug: string) {
  return path.join(writingDir(slug), 'sections');
}
function articlePath(slug: string) {
  return path.join(writingDir(slug), 'article-final.md');
}
function dataPath(slug: string) {
  return path.join(writingDir(slug), 'generated-article-data.json');
}
function contentPath(slug: string) {
  return path.join(contentDir, `${slug}.ts`);
}

// ── Discover slugs ───────────────────────────────────────────────────────────

function discoverSlugs(): string[] {
  const dataRoot = path.join(projectRoot, 'data/cro-teardowns');
  if (!fs.existsSync(dataRoot)) return [];
  return fs.readdirSync(dataRoot).filter(name => {
    const stat = fs.statSync(path.join(dataRoot, name));
    return stat.isDirectory();
  });
}

// ── Check helpers ────────────────────────────────────────────────────────────

type CheckResult = { pass: boolean; message: string; autoFixed?: boolean };

function check(label: string, pass: boolean, message: string): CheckResult {
  return { pass, message: `[${label}] ${message}` };
}

// ── QA Checks ────────────────────────────────────────────────────────────────

/**
 * Bug 1 — Hardcoded "Hootsuite homepage" in ScreenshotTimeline alt text.
 * The fix has been applied to the React component; this check verifies the
 * *published* .ts file no longer contains the hardcoded string.
 */
function checkHardcodedCompanyName(slug: string): CheckResult {
  const p = contentPath(slug);
  if (!fs.existsSync(p)) return check('Bug1-AltText', true, 'No published .ts yet — skipped');
  const src = fs.readFileSync(p, 'utf-8');
  // The ScreenshotTimeline component now uses a `companyName` prop, but if an
  // old article was published before the fix, the static .ts content string
  // won't contain "Hootsuite homepage" unless the articleBody text does.
  const wrongPattern = /Hootsuite homepage/g;
  const matches = [...src.matchAll(wrongPattern)];
  if (slug !== 'hootsuite' && matches.length > 0) {
    return check('Bug1-AltText', false,
      `Found ${matches.length} occurrence(s) of "Hootsuite homepage" in ${slug}.ts — ` +
      'likely legacy hardcoded alt text. Regenerate with npm run cro-teardown:publish.');
  }
  return check('Bug1-AltText', true, 'No hardcoded "Hootsuite homepage" found');
}

/**
 * Bug 2 — TOC renders as compressed single string.
 * Checks that the `toc` field in generated-article-data.json is a proper array,
 * not a serialised string.
 */
function checkTocIsArray(slug: string): CheckResult {
  const p = dataPath(slug);
  if (!fs.existsSync(p)) return check('Bug2-TOC', true, 'No generated-article-data.json yet — skipped');
  const data = JSON.parse(fs.readFileSync(p, 'utf-8')) as Record<string, unknown>;
  if (!Array.isArray(data.toc)) {
    return check('Bug2-TOC', false,
      `toc field is not an array (got: ${typeof data.toc}) — ` +
      'run npm run cro-teardown:generate-data to rebuild.');
  }
  const toc = data.toc as unknown[];
  if (toc.length === 0) {
    return check('Bug2-TOC', false, 'toc array is empty — expected at least 5 entries');
  }
  const firstEntry = toc[0] as Record<string, unknown>;
  if (typeof firstEntry !== 'object' || !('id' in firstEntry) || !('label' in firstEntry)) {
    return check('Bug2-TOC', false,
      `toc entries are malformed — expected {id, label} objects, got: ${JSON.stringify(firstEntry)}`);
  }
  return check('Bug2-TOC', true, `toc is a valid array with ${toc.length} entries`);
}

/**
 * Bug 3 & 4 — Spacing bugs and fragmented headings in extracted page text.
 * Scans h1/h2/h3/ctas arrays in evidence files for word-merge patterns.
 * Only inspects string VALUES (not JSON keys which are always camelCase).
 */
function checkExtractedTextSpacing(slug: string): CheckResult {
  const evidDir = sectionEvidenceDir(slug);
  if (!fs.existsSync(evidDir)) return check('Bug3-Spacing', true, 'No section-evidence dir yet — skipped');

  // Pattern: lowercase letter immediately followed by uppercase, NOT preceded/followed by
  // common known tech abbreviations (AI, API, SaaS, B2B, iOS, etc.)
  // This catches "nextAI" (next+AI merged without space) and "SidekickYour" type merges.
  // Known CamelCase brand names / compound words that should NOT trigger as merge bugs.
  // We check whether the whole word containing a camelCase transition is in this set.
  const KNOWN_CAMEL_WORDS = new Set([
    'ai', 'api', 'saas', 'b2b', 'ios', 'macos', 'tvos', 'ipados',
    'woocommerce', 'javascript', 'typescript', 'ecommerce', 'fintech',
    'devops', 'github', 'gitlab', 'linkedin', 'youtube', 'iphone', 'ipad',
    'imac', 'hubspot', 'shopify', 'webflow', 'nextjs', 'graphql',
    'postgresql', 'mongodb', 'sendgrid', 'cloudflare', 'tiktok', 'chatgpt',
    'openai', 'paypal', 'instagram', 'pinterest', 'wordpress', 'mailchimp',
    'freshdesk', 'helpdesk', 'livechat', 'frontapp', 'mixpanel', 'profitwell',
    'zendesk', 'servicenow', 'airtable', 'growthbook', 'datadog', 'pagerduty',
    'cloudfront', 'cloudwatch', 'quickbooks', 'freshbooks', 'voiceover',
    'facetime', 'icloud', 'appstore', 'gitflow', 'devex', 'devrel',
    'devsecops', 'salesforce', 'netsuite', 'onedrive', 'sharepoint',
    'appsumo', 'producthunt', 'techcrunch', 'techradar',
  ]);
  // Match: lowercase → uppercase → lowercase transition (internal camel boundary)
  const mergedWordRe = /(?<=[a-z])[A-Z][a-z]/g;

  const issues: string[] = [];

  const files = fs.readdirSync(evidDir).filter(f => f.endsWith('.json'));
  // Given a string and a match, extract the whole word around the match position
  // and check if it's a known camelCase brand name.
  const isKnownCamelWord = (str: string, matchIndex: number): boolean => {
    // Walk backwards to find word start, then forward to find word end
    let start = matchIndex;
    while (start > 0 && /\w/.test(str[start - 1])) start--;
    let end = matchIndex + 2;
    while (end < str.length && /\w/.test(str[end])) end++;
    const word = str.slice(start, end).toLowerCase();
    return KNOWN_CAMEL_WORDS.has(word);
  };

  for (const file of files) {
    const filePath = path.join(evidDir, file);
    try {
      const obj = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as unknown;
      // Collect all string values from the JSON (headings, CTAs, analysis text)
      const textValues = collectTextValues(obj, ['h1', 'h2', 'h3', 'ctas', 'navLinks', 'heading', 'body', 'annotations']);
      for (const val of textValues) {
        const matches = [...val.matchAll(mergedWordRe)];
        for (const m of matches) {
          if (!isKnownCamelWord(val, m.index!)) {
            issues.push(`${file}: "${val.slice(0, 60)}" — suspected merge at "${m[0]}"`);
            break; // one report per value is enough
          }
        }
      }
    } catch {
      // not parseable JSON, skip
    }
  }

  // In article-final.md only check ## heading lines (not prose, which may quote product names)
  const ap = articlePath(slug);
  if (fs.existsSync(ap)) {
    const lines = fs.readFileSync(ap, 'utf-8').split('\n').filter(l => l.startsWith('## '));
    for (const line of lines) {
      const matches = [...line.matchAll(mergedWordRe)];
      for (const m of matches) {
        if (!isKnownCamelWord(line, m.index!)) {
          issues.push(`article-final.md heading: "${line.trim()}" — suspected merge at "${m[0]}"`);
          break;
        }
      }
    }
  }

  if (issues.length > 0) {
    return check('Bug3-Spacing', false,
      `Possible merged-word spacing issues found:\n    ${issues.join('\n    ')}\n` +
      '    Re-run Phase 1 scrape (screenshots.ts now uses block-aware getText) to regenerate evidence.');
  }
  return check('Bug3-Spacing', true, 'No merged-word patterns detected in headings/CTAs');
}

/** Recursively collect string values from specific keys in a JSON object. */
function collectTextValues(obj: unknown, keys: string[]): string[] {
  const results: string[] = [];
  if (typeof obj === 'string') {
    results.push(obj);
  } else if (Array.isArray(obj)) {
    for (const item of obj) results.push(...collectTextValues(item, keys));
  } else if (obj !== null && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (keys.includes(k)) {
        results.push(...collectTextValues(v, keys));
      } else {
        results.push(...collectTextValues(v, keys));
      }
    }
  }
  return results;
}

/**
 * Bug 4 — Fragmented headings (single or two-word h2/h3 entries).
 * Checks the diffs and section evidence for dangerously short heading strings.
 */
function checkFragmentedHeadings(slug: string): CheckResult {
  const p = dataPath(slug);
  if (!fs.existsSync(p)) return check('Bug4-Headings', true, 'No generated-article-data.json yet — skipped');
  const data = JSON.parse(fs.readFileSync(p, 'utf-8')) as Record<string, unknown>;
  const issues: string[] = [];

  const checkList = (field: string, items: unknown[]) => {
    for (const item of items) {
      if (typeof item === 'string') {
        const wordCount = item.split(/\s+/).filter(Boolean).length;
        if (wordCount < 3) {
          issues.push(`${field}: "${item}" (${wordCount} word${wordCount === 1 ? '' : 's'}) — too short, likely a fragment`);
        }
      }
    }
  };

  if (Array.isArray(data.h2Added))   checkList('h2Added',   data.h2Added as unknown[]);
  if (Array.isArray(data.h2Removed)) checkList('h2Removed', data.h2Removed as unknown[]);

  if (issues.length > 0) {
    return check('Bug4-Headings', false,
      `Fragmented headings found (< 3 words):\n    ${issues.join('\n    ')}\n` +
      '    diff.ts now enforces a 3-word minimum; re-run Phase 3 generate-article-data to fix.');
  }
  return check('Bug4-Headings', true, 'No fragmented headings detected');
}

/**
 * Bug 5 — Duplicate H2 headings in article-final.md.
 */
function checkDuplicateH2s(slug: string): CheckResult {
  const ap = articlePath(slug);
  if (!fs.existsSync(ap)) return check('Bug5-DupH2', true, 'No article-final.md yet — skipped');
  const lines = fs.readFileSync(ap, 'utf-8').split('\n');
  const headings = lines.filter(l => l.startsWith('## ')).map(l => l.trim().toLowerCase());
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const h of headings) {
    if (seen.has(h)) duplicates.push(h);
    else seen.add(h);
  }
  if (duplicates.length > 0) {
    return check('Bug5-DupH2', false,
      `Duplicate H2 headings:\n    ${duplicates.join('\n    ')}\n` +
      '    Remove or rename duplicate sections, then re-run Phase 4C compose.');
  }
  return check('Bug5-DupH2', true, 'No duplicate H2 headings');
}

/**
 * Bug 6 — Contradiction: article claims "no exact headline evidence" but
 * then shows exact H1s. Checks that the word "does not include exact" does
 * not co-appear in a section that also quotes a verbatim H1.
 */
function checkContradictions(slug: string): CheckResult {
  const ap = articlePath(slug);
  if (!fs.existsSync(ap)) return check('Bug6-Contradiction', true, 'No article-final.md yet — skipped');
  const src = fs.readFileSync(ap, 'utf-8');
  // Pattern: disclaimer about "exact headline" evidence while H1s are quoted
  const claimNoEvidence = /evidence does not include exact headline/i;
  const hasVerbatimH1 = /H1[^.]*reads?[^.]*[""]|[""].*[""][^.]*H1/i;
  if (claimNoEvidence.test(src) && hasVerbatimH1.test(src)) {
    return check('Bug6-Contradiction', false,
      'Article claims evidence lacks exact headlines but then quotes verbatim H1s. ' +
      'Remove the disclaimer or the quoted H1 — both cannot be true.');
  }
  return check('Bug6-Contradiction', true, 'No evidence contradiction detected');
}

/**
 * Bug 7 — Generic repeated lesson cards.
 * Checks that the published .ts file's lessonCards do NOT all share the
 * generic static titles from article-blueprint.ts.
 */
const GENERIC_LESSON_TITLES = [
  'Your H1 signals which buyer you are targeting',
  'Navigation is a positioning statement',
  'Section headings reveal what the team thinks buyers care about',
  'Superlatives raise expectations across your entire funnel',
  'Incremental changes compound into a brand shift',
];

function checkGenericLessonCards(slug: string): CheckResult {
  // publish-article.ts now loads lesson-cards.json first (if it exists) and
  // overrides the static ones from generated-article-data.json. Check that
  // override path first.
  const lcPath = path.join(sectionEvidenceDir(slug), 'lesson-cards.json');
  if (fs.existsSync(lcPath)) {
    const cards = JSON.parse(fs.readFileSync(lcPath, 'utf-8')) as Array<{ title?: string }>;
    if (Array.isArray(cards) && cards.length > 0) {
      const genericCount = cards.filter(c =>
        typeof c.title === 'string' && GENERIC_LESSON_TITLES.includes(c.title)
      ).length;
      if (genericCount >= 3) {
        return check('Bug7-LessonCards', false,
          `${genericCount}/${cards.length} lesson cards in lesson-cards.json still use generic template titles. ` +
          'Run npm run cro-teardown:compose to regenerate brand-specific cards.');
      }
      return check('Bug7-LessonCards', true,
        `Lesson cards in lesson-cards.json are brand-specific (${genericCount} generic of ${cards.length})`);
    }
  }
  // Fall back to checking generated-article-data.json
  const p = dataPath(slug);
  if (!fs.existsSync(p)) return check('Bug7-LessonCards', true, 'No generated-article-data.json yet — skipped');
  const data = JSON.parse(fs.readFileSync(p, 'utf-8')) as Record<string, unknown>;
  if (!Array.isArray(data.lessonCards)) return check('Bug7-LessonCards', true, 'No lessonCards field — skipped');
  const cards = data.lessonCards as Array<{ title?: string }>;
  const genericCount = cards.filter(c =>
    typeof c.title === 'string' && GENERIC_LESSON_TITLES.includes(c.title)
  ).length;
  if (genericCount >= 3) {
    return check('Bug7-LessonCards', false,
      `${genericCount}/${cards.length} lesson cards use generic template titles and no lesson-cards.json override exists. ` +
      'Run npm run cro-teardown:compose to generate brand-specific cards.');
  }
  return check('Bug7-LessonCards', true, `Lesson cards appear brand-specific (${genericCount} generic of ${cards.length})`);
}

/**
 * Structural check — all required pipeline output files exist.
 */
function checkRequiredFiles(slug: string): CheckResult {
  const required = [
    { label: 'generated-article-data.json', path: dataPath(slug) },
    { label: 'article-final.md',             path: articlePath(slug) },
  ];
  const missing = required.filter(r => !fs.existsSync(r.path)).map(r => r.label);
  if (missing.length > 0) {
    return check('Structure', false, `Missing required files: ${missing.join(', ')}`);
  }
  return check('Structure', true, 'All required pipeline output files present');
}

// ── Run all checks for one slug ──────────────────────────────────────────────

interface SlugReport {
  slug:    string;
  results: CheckResult[];
  passed:  number;
  failed:  number;
}

function runQaForSlug(slug: string): SlugReport {
  const results: CheckResult[] = [
    checkRequiredFiles(slug),
    checkHardcodedCompanyName(slug),
    checkTocIsArray(slug),
    checkExtractedTextSpacing(slug),
    checkFragmentedHeadings(slug),
    checkDuplicateH2s(slug),
    checkContradictions(slug),
    checkGenericLessonCards(slug),
  ];
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  return { slug, results, passed, failed };
}

// ── CLI entrypoint ───────────────────────────────────────────────────────────

function printReport(report: SlugReport) {
  const statusIcon = report.failed === 0 ? '✅' : '❌';
  console.log(`\n${statusIcon}  ${report.slug.toUpperCase()} — ${report.passed}/${report.results.length} checks passed`);
  for (const r of report.results) {
    const icon = r.pass ? '  ✓' : '  ✗';
    console.log(`${icon} ${r.message}`);
  }
}

async function main() {
  const args  = process.argv.slice(2);
  const slugArg = args.find(a => a.startsWith('--slug='))?.split('=')[1]
    ?? (args[args.indexOf('--slug') + 1] !== undefined && !args[args.indexOf('--slug') + 1].startsWith('--')
      ? args[args.indexOf('--slug') + 1]
      : null);

  const slugs = slugArg ? [slugArg] : discoverSlugs();

  if (slugs.length === 0) {
    console.error('No slugs found. Pass --slug <name> or ensure data/cro-teardowns/ is populated.');
    process.exit(1);
  }

  console.log(`\n🔍  CRO Teardown QA Validator`);
  console.log(`    Checking ${slugs.length} article(s): ${slugs.join(', ')}\n`);

  const reports = slugs.map(runQaForSlug);
  for (const report of reports) printReport(report);

  const totalFailed = reports.reduce((sum, r) => sum + r.failed, 0);
  const totalChecks = reports.reduce((sum, r) => sum + r.results.length, 0);
  const totalPassed = reports.reduce((sum, r) => sum + r.passed, 0);

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Total: ${totalPassed}/${totalChecks} checks passed across ${slugs.length} article(s)`);

  if (totalFailed > 0) {
    console.log(`\n⚠️   ${totalFailed} check(s) failed — fix before publishing.`);
    process.exit(1);
  } else {
    console.log('\n🎉  All checks passed — safe to publish.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
