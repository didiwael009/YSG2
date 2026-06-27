/**
 * publish-article.ts — Phase 4F deterministic publisher.
 *
 * Reads the pipeline outputs for a given slug and writes the final TypeScript
 * content file into the website source tree, then registers it in index.ts.
 *
 * CLI:
 *   npm run cro-teardown:publish -- --slug hootsuite
 *   npm run cro-teardown:publish -- --slug hootsuite --dry-run
 *   npm run cro-teardown:publish -- --slug hootsuite --force
 *
 * Quality gates (all three must pass unless --force):
 *   • finalJudgePass === true
 *   • seoPass === true
 *   • unsupportedClaims.length === 0
 *
 * DETERMINISTIC — zero API calls. No LLM is invoked.
 *
 * Output files:
 *   src/content/cro-teardown/articles/[slug].ts   (written unless --dry-run)
 *   src/content/cro-teardown/index.ts              (updated unless --dry-run)
 *   data/cro-teardowns/[slug]/writing/publish-report.json (always written)
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { FinalJudgeResult } from './final-judge.js';
import type { SeoAuditResult }   from './seo-auditor.js';
import { validateConsistency }   from './consistency-validator.js';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CliArgs {
  slug:   string;
  dryRun: boolean;
  force:  boolean;
}

interface PublishReport {
  publishedAt:       string;
  slug:              string;
  dryRun:            boolean;
  forced:            boolean;
  qualityGates: {
    finalJudgePass:    boolean;
    finalJudgeScore:   number;
    seoPass:           boolean;
    seoScore:          number;
    unsupportedClaims: string[];
  };
  consistencyCheck: {
    valid:    boolean;
    errors:   string[];
    warnings: string[];
  };
  blockedReasons:    string[];
  articlePath:       string;
  indexUpdated:      boolean;
  internalLinkSuggestionsAdded: string[];
  fieldsOverridden:  string[];
}

// ─── Internal link suggestions ────────────────────────────────────────────────
// Dynamically picks 3 other published teardown articles (excludes current slug).
// Falls back to service pages if fewer than 3 other teardowns are published.

const ALL_TEARDOWN_SLUGS: string[] = [
  'shopify', 'hootsuite', 'stripe', 'intercom', 'vercel', 'crisp',
  'clay', 'linear', 'lemlist', 'apollo', 'expensya', 'gong', 'webflow', 'apify',
  'buffer', 'agorapulse',
];

function getRelatedTeardownLinks(currentSlug: string): string[] {
  const others = ALL_TEARDOWN_SLUGS.filter(s => s !== currentSlug);
  // Shuffle deterministically by slug so the same article always gets the same links
  const seed = currentSlug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...others].sort((a, b) => {
    const ha = (a.charCodeAt(0) * 31 + seed) % 97;
    const hb = (b.charCodeAt(0) * 31 + seed) % 97;
    return ha - hb;
  });
  return shuffled.slice(0, 3).map(s => `/cro-teardowns/${s}`);
}

const INTERNAL_LINK_SCORE_THRESHOLD = 8;

// ─── CLI parser ───────────────────────────────────────────────────────────────

function parseCli(argv: string[]): CliArgs {
  const args = argv.slice(2);
  let slug  = '';
  let dryRun = false;
  let force  = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slug' && args[i + 1]) {
      slug = args[++i];
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    } else if (args[i] === '--force') {
      force = true;
    }
  }

  if (!slug) {
    console.error('Usage: publish-article.ts --slug <slug> [--dry-run] [--force]');
    process.exit(1);
  }

  return { slug, dryRun, force };
}

// ─── TypeScript literal serialiser ───────────────────────────────────────────

/**
 * Converts a JSON-safe value to a TypeScript object-literal string.
 * - Strings: JSON.stringify (double-quoted, properly escaped)
 * - Objects: unquoted identifier keys, one per line
 * - Arrays: one item per line
 * - null/undefined filtered at object level
 */
function toTsValue(val: unknown, depth = 0): string {
  const pad   = '  '.repeat(depth);
  const inner = '  '.repeat(depth + 1);

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return JSON.stringify(val);
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(v => `${inner}${toTsValue(v, depth + 1)}`).join(',\n');
    return `[\n${items},\n${pad}]`;
  }

  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const entries = Object.entries(obj)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${inner}${k}: ${toTsValue(v, depth + 1)}`);
    if (entries.length === 0) return '{}';
    return `{\n${entries.join(',\n')},\n${pad}}`;
  }

  return JSON.stringify(val);
}

// ─── Slug → identifier ────────────────────────────────────────────────────────

/** 'some-company' → 'someCompany' */
function slugToVarName(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// ─── Article TypeScript generator ────────────────────────────────────────────

function generateArticleTs(opts: {
  varName:          string;
  data:             Record<string, unknown>;
  articleBody:      string;
  publishedAt:      string;
  internalLinkSuggestions?: string[];
  finalJudgeScore:  number;
  seoScore:         number;
}): string {
  const { varName, data, articleBody, publishedAt, finalJudgeScore, seoScore } = opts;

  const post: Record<string, unknown> = {
    ...data,
    articleBody,
    ...(opts.internalLinkSuggestions?.length
      ? { internalLinkSuggestions: opts.internalLinkSuggestions }
      : {}),
    publishedAt,
  };

  const slug = String(data.slug ?? varName);

  return `/**
 * ${varName}.ts — Phase 4F published content file.
 *
 * Published    : ${publishedAt}
 * Final judge  : ${finalJudgeScore}/100 ${finalJudgeScore >= 90 ? '✓' : '✗'}
 * SEO score    : ${seoScore}/100 ${seoScore >= 80 ? '✓' : '✗'}
 *
 * Source files used:
 *   data/cro-teardowns/${slug}/writing/generated-article-data.json
 *   data/cro-teardowns/${slug}/writing/article-final.md
 *   data/cro-teardowns/${slug}/writing/seo.json
 *
 * To regenerate article content:
 *   npm run cro-teardown:compose -- --slug ${slug} --mode standard --force
 *   npm run cro-teardown:publish -- --slug ${slug}
 */

import type { CroTeardownPost } from "../types";

export const ${varName}: CroTeardownPost = ${toTsValue(post, 0)};
`;
}

// ─── Index.ts updater ────────────────────────────────────────────────────────

/**
 * Adds the import and array entry to index.ts if not already present.
 * Returns true if the file was modified.
 */
function updateIndexTs(opts: {
  indexPath: string;
  slug:      string;
  varName:   string;
  dryRun:    boolean;
}): boolean {
  const { indexPath, slug, varName, dryRun } = opts;

  let src = fs.readFileSync(indexPath, 'utf-8');
  let modified = false;

  // ── 1. Import line ──────────────────────────────────────────────────────────
  const importLine = `import { ${varName} } from "./articles/${slug}";`;
  if (!src.includes(importLine)) {
    // Insert before the first export statement
    const exportIdx = src.search(/^export\b/m);
    if (exportIdx === -1) {
      src = importLine + '\n' + src;
    } else {
      src = src.slice(0, exportIdx) + importLine + '\n' + src.slice(exportIdx);
    }
    modified = true;
  }

  // ── 2. Array entry ──────────────────────────────────────────────────────────
  // Matches: croTeardownPosts: CroTeardownPost[] = [...];
  const arrayMatch = src.match(
    /(export const croTeardownPosts:\s*CroTeardownPost\[\]\s*=\s*\[)([^\]]*?)(\];)/s,
  );
  if (arrayMatch) {
    const [, prefix, content, suffix] = arrayMatch;
    const existing = content.split(',').map(s => s.trim()).filter(Boolean);
    if (!existing.includes(varName)) {
      const updated = [...existing, varName].join(', ');
      src = src.replace(arrayMatch[0], `${prefix}${updated}${suffix}`);
      modified = true;
    }
  }

  if (modified && !dryRun) {
    fs.writeFileSync(indexPath, src, 'utf-8');
  }

  return modified;
}

// ─── Quality gate check ───────────────────────────────────────────────────────

function checkQualityGates(
  judge: FinalJudgeResult | null,
  seo:   SeoAuditResult   | null,
  force: boolean,
): { blocked: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (!judge) {
    reasons.push('final-judge.json not found — run Phase 4D first');
  } else {
    if (!judge.pass) {
      reasons.push(`Final judge FAIL — score ${judge.overallScore}/100 (need ≥ 90)`);
    }
    if (judge.unsupportedClaims.length > 0) {
      reasons.push(
        `${judge.unsupportedClaims.length} unsupported claim(s): ${judge.unsupportedClaims.slice(0, 2).join('; ')}`,
      );
    }
  }

  if (!seo) {
    reasons.push('seo-audit.json not found — run Phase 4D first');
  } else if (!seo.pass) {
    reasons.push(`SEO audit FAIL — score ${seo.seoScore}/100 (need ≥ 80)`);
  }

  const blocked = reasons.length > 0 && !force;
  return { blocked, reasons };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const cli = parseCli(process.argv);
  const { slug, dryRun, force } = cli;

  const projectRoot  = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir   = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');
  const contentDir   = path.join(projectRoot, 'src', 'content', 'cro-teardown', 'articles');
  const indexPath    = path.join(projectRoot, 'src', 'content', 'cro-teardown', 'index.ts');
  const reportPath   = path.join(writingDir, 'publish-report.json');

  const varName = slugToVarName(slug);

  console.log(`\n📦  Phase 4F — Publish Article`);
  console.log(`    slug    : ${slug}`);
  console.log(`    varName : ${varName}`);
  console.log(`    dryRun  : ${dryRun}`);
  console.log(`    force   : ${force}`);
  console.log('');

  // ── Load quality gate files ─────────────────────────────────────────────────
  const judgePath = path.join(writingDir, 'final-judge.json');
  const seoPath   = path.join(writingDir, 'seo-audit.json');

  const judge = fs.existsSync(judgePath)
    ? (JSON.parse(fs.readFileSync(judgePath, 'utf-8')) as FinalJudgeResult)
    : null;

  const seoAudit = fs.existsSync(seoPath)
    ? (JSON.parse(fs.readFileSync(seoPath, 'utf-8')) as SeoAuditResult)
    : null;

  // ── Quality gate check ──────────────────────────────────────────────────────
  const { blocked, reasons } = checkQualityGates(judge, seoAudit, force);

  if (blocked) {
    console.error('🚫  Publish blocked — quality gates not met:');
    for (const r of reasons) console.error(`    • ${r}`);
    console.error('\n    Run with --force to publish anyway.');
    process.exit(1);
  }

  if (reasons.length > 0 && force) {
    console.warn('⚠️   Publishing with --force despite quality gate issues:');
    for (const r of reasons) console.warn(`    • ${r}`);
    console.warn('');
  }

  // ── Load article data ───────────────────────────────────────────────────────
  const dataPath    = path.join(writingDir, 'generated-article-data.json');
  const articlePath = path.join(writingDir, 'article-final.md');
  const seoJsonPath = path.join(writingDir, 'seo.json');

  if (!fs.existsSync(dataPath)) {
    console.error(`❌  generated-article-data.json not found at ${dataPath}`);
    console.error('    Run Phase 4A first: npm run cro-teardown:generate-data -- --slug ' + slug);
    process.exit(1);
  }

  if (!fs.existsSync(articlePath)) {
    console.error(`❌  article-final.md not found at ${articlePath}`);
    console.error('    Run Phase 4C first: npm run cro-teardown:compose -- --slug ' + slug);
    process.exit(1);
  }

  const structuredData = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as Record<string, unknown>;
  const articleBody    = fs.readFileSync(articlePath, 'utf-8');
  const seoData        = fs.existsSync(seoJsonPath)
    ? (JSON.parse(fs.readFileSync(seoJsonPath, 'utf-8')) as Record<string, string>)
    : null;

  // ── Override h1 / title / metaTitle / description from outline if available ──
  const outlinePath = path.join(writingDir, 'article-outline.json');
  if (fs.existsSync(outlinePath)) {
    const outline = JSON.parse(fs.readFileSync(outlinePath, 'utf-8')) as {
      h1?: string;
      seo_title?: string;
      description?: string;
    };
    if (outline.h1 && typeof outline.h1 === 'string') {
      structuredData.h1 = outline.h1;
      console.log(`✅  Overrode h1 from outline: "${outline.h1}"`);
    }
    if (outline.seo_title && typeof outline.seo_title === 'string') {
      structuredData.title     = outline.seo_title;
      structuredData.metaTitle = outline.seo_title;
      console.log(`✅  Overrode title/metaTitle from outline: "${outline.seo_title}"`);
    }
    if (outline.description && typeof outline.description === 'string') {
      structuredData.description = outline.description;
      console.log(`✅  Overrode description from outline: "${outline.description.slice(0, 60)}…"`);
    }
  }

  // ── Load business context section if available (Phase 4C V6) ───────────────
  // New articles have sections/07-business-context.final.md written by
  // generate-business-context.ts. Stored as `businessContext` for BusinessContextBlock.
  const bcPath = path.join(writingDir, 'sections', '07-business-context.final.md');
  if (fs.existsSync(bcPath)) {
    const bcContent = fs.readFileSync(bcPath, 'utf-8').trim();
    if (bcContent) {
      structuredData.businessContext = bcContent;
      console.log(`✅  Loaded business context from sections/07-business-context.final.md`);
    }
  }

  // ── Load quick-answer section if available (Phase 4C, section 02-quick-answer) ──
  // Featured-snippet TL;DR. Rendered by QuickAnswerBlock + mirrored into JSON-LD FAQ.
  const qaPath = path.join(writingDir, 'sections', '02-quick-answer.final.md');
  if (fs.existsSync(qaPath)) {
    const qaContent = fs.readFileSync(qaPath, 'utf-8').trim().replace(/^##\s+.*\n+/, '').trim();
    if (qaContent) {
      structuredData.quickAnswer = qaContent;
      console.log(`✅  Loaded quick answer from sections/02-quick-answer.final.md`);
    }
  }

  // ── Override excerpt with AI-written intro paragraph if available ────────
  // 01-intro.final.md is unique per brand — far better than the template excerpt
  // from article-blueprint.ts. Extract first real paragraph (after the # heading).
  const introPath = path.join(writingDir, 'sections', '01-intro.final.md');
  if (fs.existsSync(introPath)) {
    const introRaw = fs.readFileSync(introPath, 'utf-8').trim();
    // Strip leading # heading line, then take the first non-empty paragraph
    const introBody = introRaw.replace(/^#[^\n]*\n+/, '').trim();
    const firstPara = introBody.split(/\n\n+/)[0]?.trim();
    if (firstPara) {
      // Strip markdown bold markers for plain text excerpt
      const plainExcerpt = firstPara.replace(/\*\*([^*]+)\*\*/g, '$1');
      structuredData.excerpt = plainExcerpt;
      console.log(`✅  Overrode excerpt with AI-written intro paragraph from 01-intro.final.md`);
    }
  }

  // ── Override lesson cards with LLM-generated version if available ─────────
  // Phase 4C writes brand-specific cards to section-evidence/lesson-cards.json.
  // These replace the static generic cards from article-blueprint.ts so every
  // published article has unique, brand-specific lesson cards.
  const lessonCardsPath = path.join(writingDir, 'section-evidence', 'lesson-cards.json');
  if (fs.existsSync(lessonCardsPath)) {
    const llmCards = JSON.parse(fs.readFileSync(lessonCardsPath, 'utf-8'));
    if (Array.isArray(llmCards) && llmCards.length > 0) {
      // Normalise field names: lesson-cards.json may use `category` instead of `tag`
      // (the TypeScript type requires `tag`). Map it here so published .ts files are
      // always type-correct without needing every upstream generator to know the type.
      structuredData.lessonCards = llmCards.map((card: Record<string, unknown>) => {
        if ('category' in card && !('tag' in card)) {
          const { category, number: _n, ...rest } = card;
          return { ...rest, tag: category };
        }
        const { number: _n, ...rest } = card;
        return rest;
      });
      console.log(`✅  Loaded ${llmCards.length} LLM-generated lesson cards from section-evidence/lesson-cards.json`);
    }
  }

  // ── Load marketing summary cards if available (Phase 4C marketing-cards-generator) ──
  const marketingCardsPath = path.join(writingDir, 'section-evidence', 'marketing-summary-cards.json');
  if (fs.existsSync(marketingCardsPath)) {
    const mCards = JSON.parse(fs.readFileSync(marketingCardsPath, 'utf-8'));
    if (Array.isArray(mCards) && mCards.length > 0) {
      structuredData.marketingSummaryCards = mCards;
      console.log(`✅  Loaded ${mCards.length} marketing signal cards from marketing-summary-cards.json`);
    }
  }

  // ── Decide what to override ─────────────────────────────────────────────────
  // Keep structured data description/excerpt as-is — they're the complete
  // versions. The seo.json metaDescription is SERP-truncated ("…" ending).
  // We do update metaTitle if seo.json has a version (they match for Hootsuite).
  const fieldsOverridden: string[] = [];

  if (seoData?.title && seoData.title !== structuredData.metaTitle) {
    structuredData.metaTitle = seoData.title;
    fieldsOverridden.push('metaTitle');
  }

  // ── Internal link suggestions ───────────────────────────────────────────────
  const internalLinkingScore = seoAudit?.internalLinkingScore ?? INTERNAL_LINK_SCORE_THRESHOLD;
  const internalLinkSuggestionsAdded: string[] =
    internalLinkingScore < INTERNAL_LINK_SCORE_THRESHOLD
      ? getRelatedTeardownLinks(slug)
      : [];

  // ── Layer 2: Data consistency validation ─────────────────────────────────────
  // Checks that count claims in article-final.md match diff JSON ground truth.
  // Hard errors block publication unless --force. Warnings are always logged.
  const consistencyResult = validateConsistency({ writingDir, slug });

  if (consistencyResult.warnings.length > 0) {
    console.warn('\n⚠️   Consistency warnings:');
    for (const w of consistencyResult.warnings) console.warn(`    • ${w}`);
  }

  if (!consistencyResult.valid) {
    console.error('\n❌  Consistency validation failed:');
    for (const e of consistencyResult.errors) console.error(`    • ${e}`);
    if (!force) {
      console.error('\n    Run with --force to publish anyway.');
      process.exit(1);
    } else {
      console.warn('⚠️   --force: publishing despite consistency errors above.');
    }
  } else {
    console.log(`✅  Consistency validation passed`);
  }

  // ── Preserve existing publishedAt — never overwrite to avoid date clustering ──
  // If the article file already exists, extract and keep its publishedAt.
  // Only set a fresh timestamp on first publish.
  const articleOutputPath = path.join(contentDir, `${slug}.ts`);
  let publishedAt = new Date().toISOString();
  if (fs.existsSync(articleOutputPath)) {
    const existingSrc = fs.readFileSync(articleOutputPath, 'utf-8');
    const existingDate = existingSrc.match(/publishedAt:\s*"([^"]+)"/)?.[1];
    if (existingDate) {
      publishedAt = existingDate;
      console.log(`ℹ️   Preserved existing publishedAt: ${publishedAt}`);
    }
  }

  // ── Generate TypeScript content ─────────────────────────────────────────────

  const articleTs = generateArticleTs({
    varName,
    data:                    structuredData,
    articleBody,
    publishedAt,
    internalLinkSuggestions: internalLinkSuggestionsAdded,
    finalJudgeScore:         judge?.overallScore ?? 0,
    seoScore:                seoAudit?.seoScore ?? 0,
  });

  // ── Write article file ──────────────────────────────────────────────────────

  if (dryRun) {
    console.log(`🔍  [dry-run] Would write: ${path.relative(projectRoot, articleOutputPath)}`);
    console.log(`    First 400 chars of generated file:\n`);
    console.log(articleTs.slice(0, 400) + '…\n');
  } else {
    fs.mkdirSync(contentDir, { recursive: true });
    fs.writeFileSync(articleOutputPath, articleTs, 'utf-8');
    console.log(`✅  Wrote: ${path.relative(projectRoot, articleOutputPath)}`);
  }

  // ── Update index.ts ─────────────────────────────────────────────────────────
  const indexUpdated = updateIndexTs({ indexPath, slug, varName, dryRun });

  if (dryRun) {
    console.log(`🔍  [dry-run] index.ts: ${indexUpdated ? 'would update (import/array)' : 'no change needed'}`);
  } else {
    console.log(`${indexUpdated ? '✅  Updated' : 'ℹ️   No change to'}: ${path.relative(projectRoot, indexPath)}`);
  }

  // ── Write publish report ────────────────────────────────────────────────────
  const report: PublishReport = {
    publishedAt,
    slug,
    dryRun,
    forced: force && reasons.length > 0,
    qualityGates: {
      finalJudgePass:    judge?.pass            ?? false,
      finalJudgeScore:   judge?.overallScore    ?? 0,
      seoPass:           seoAudit?.pass         ?? false,
      seoScore:          seoAudit?.seoScore     ?? 0,
      unsupportedClaims: judge?.unsupportedClaims ?? [],
    },
    consistencyCheck: {
      valid:    consistencyResult.valid,
      errors:   consistencyResult.errors,
      warnings: consistencyResult.warnings,
    },
    blockedReasons:              reasons,
    articlePath:                 path.relative(projectRoot, articleOutputPath),
    indexUpdated,
    internalLinkSuggestionsAdded,
    fieldsOverridden,
  };

  fs.mkdirSync(writingDir, { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`📄  Report: ${path.relative(projectRoot, reportPath)}`);

  // ── Summary ─────────────────────────────────────────────────────────────────
  console.log('');
  console.log('─'.repeat(60));
  console.log(dryRun ? '📋  DRY RUN complete — no files written' : '🚀  Publish complete');
  console.log(`    Final judge : ${judge?.overallScore ?? '?'}/100 ${judge?.pass ? '✓' : '✗'}`);
  console.log(`    SEO score   : ${seoAudit?.seoScore ?? '?'}/100 ${seoAudit?.pass ? '✓' : '✗'}`);
  console.log(`    Article     : ${path.relative(projectRoot, articleOutputPath)}`);
  if (internalLinkSuggestionsAdded.length > 0) {
    console.log(`    Internal links added (${internalLinkSuggestionsAdded.length}): ${internalLinkSuggestionsAdded.join(', ')}`);
  }
  console.log('─'.repeat(60));
}

// ─── Entry guard ──────────────────────────────────────────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error('\n❌  publish-article failed:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
