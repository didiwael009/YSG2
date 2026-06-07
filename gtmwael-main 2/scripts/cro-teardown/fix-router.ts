/**
 * fix-router.ts — Phase 4E issue router.
 *
 * Reads final-judge.json and seo-audit.json, routes each issue to the most
 * likely section ID, and produces a rerun-plan.json.
 *
 * Routing sources, in priority order:
 *   high   — judge.rerunRecommendations (explicit section IDs)
 *   high   — judge.unsupportedClaims (keyword-routed)
 *   medium — judge.weakSections (explicit section IDs)
 *   medium — judge.riskFlags (keyword-routed)
 *   medium — judge.requiredFixes (keyword-routed)
 *   low    — seoAudit.requiredFixes (keyword-routed, skip if metadata-only)
 *
 * Issues that cannot be mapped to a section are collected in skippedIssues.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import type { FinalJudgeResult } from './final-judge.js';
import type { SeoAuditResult } from './seo-auditor.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SectionToRerun {
  sectionId: string;
  reasons: string[];
  priority: 'low' | 'medium' | 'high';
  source: 'final-judge' | 'seo-audit' | 'both';
}

export interface SkippedIssue {
  issue: string;
  reason: string;
}

export interface RerunSource {
  finalJudgePass: boolean;
  seoPass: boolean;
  finalJudgeScore: number;
  seoScore: number;
}

export interface RerunPlan {
  createdAt: string;
  slug: string;
  source: RerunSource;
  sectionsToRerun: SectionToRerun[];
  skippedIssues: SkippedIssue[];
}

export interface BuildRerunPlanOpts {
  slug: string;
  writingDir: string;
  /** Cap total sections returned. Default: no cap (caller applies cap). */
  maxSections?: number;
}

// ─── Section keyword map ──────────────────────────────────────────────────────

const VALID_SECTION_IDS = [
  '01-intro',
  '02-at-a-glance',
  '03-visual-timeline',
  '04-messaging-evolution',
  '05-cta-navigation-evolution',
  '06-lessons-for-saas-teams',
] as const;

type SectionId = typeof VALID_SECTION_IDS[number];

/** Ordered list of keyword → section ID mappings. First match wins. */
const KEYWORD_ROUTES: Array<{ keywords: string[]; sectionId: SectionId }> = [
  {
    sectionId: '05-cta-navigation-evolution',
    keywords: [
      'cta', 'call to action', 'call-to-action', 'navigation', 'nav ',
      'trial', 'demo', 'button', 'conversion path', 'cta evolution',
      'section heading', 'h2 added', 'h2 removed',
    ],
  },
  {
    sectionId: '04-messaging-evolution',
    keywords: [
      'messaging', 'positioning', 'copy', 'headline', 'meta description',
      'value proposition', 'message', 'brand voice', 'tone', 'framing',
      'claim', 'interpretation', 'h1 change', 'headline change',
    ],
  },
  {
    sectionId: '03-visual-timeline',
    keywords: [
      'screenshot', 'visual', 'timeline', 'above the fold', 'above-the-fold',
      'layout', 'snapshot', 'visual change', 'visual timeline', 'hero',
      'similarity score', 'design change', 'visual similarity',
    ],
  },
  {
    sectionId: '02-at-a-glance',
    keywords: [
      'at a glance', 'at-a-glance', 'summary card', 'overall diagnosis',
      'quick reference', 'scanning', 'overview section',
    ],
  },
  {
    sectionId: '06-lessons-for-saas-teams',
    keywords: [
      'lesson', 'recommendation', 'saas founder', 'takeaway', 'saas team',
      'generic advice', 'actionable', 'what saas', 'lessons for',
      'practitioner', 'application', 'founder',
    ],
  },
  {
    sectionId: '01-intro',
    keywords: [
      'intro', 'introduction', 'opening', 'first paragraph', 'article scope',
      'search intent', 'title promise', 'primary keyword', 'keyword in body',
      'keyword not in body', 'keyword.*intro', 'intro.*keyword',
      'keyword.*conclusion', 'conclusion.*keyword', 'mention.*intro',
      'body text', 'article body',
    ],
  },
];

/**
 * Patterns that indicate a metadata or CMS issue — not fixable by section rerun.
 * Matched against the issue text (lowercased).
 */
const SKIP_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /no fix needed/i,                           reason: 'self-corrected' },
  { pattern: /in the cms\b|validate.*cms|cms.*validate/i, reason: 'CMS configuration, not section content' },
  {
    pattern: /meta description (is |ends |length|149|155|character|ellipsis)/i,
    reason: 'metadata field in seo.json, not section content',
  },
  {
    pattern: /(seo )?title (exceeds|length|character|tag|within limit)/i,
    reason: 'metadata field in seo.json, not section content',
  },
  {
    pattern: /date (accuracy|placeholder|future|before .* 20\d\d)/i,
    reason: 'date metadata issue, not section content',
  },
  {
    pattern: /\bcurrent.*snapshot.*date|snapshot.*date.*accurate/i,
    reason: 'snapshot date metadata issue, not section content',
  },
  {
    pattern: /h1 (is |in )(the )?(markdown|cms|page)|validate.*h1|h1.*validate/i,
    reason: 'H1 is a CMS/template concern, not section content',
  },
  {
    pattern: /ellipsis.*serp|serp.*ellipsis|renders? poorly in serp/i,
    reason: 'meta description rendering issue, not section content',
  },
  {
    pattern: /schema|structured data|canonical url|robots\.txt|sitemap/i,
    reason: 'technical SEO concern, not section content',
  },
  {
    pattern: /alt.?text|image.?search|screenshot.*production/i,
    reason: 'production asset concern, not section content',
  },
];

// ─── Routing helpers ──────────────────────────────────────────────────────────

function shouldSkip(issue: string): string | null {
  for (const { pattern, reason } of SKIP_PATTERNS) {
    if (pattern.test(issue)) return reason;
  }
  return null;
}

function routeToSection(issue: string): SectionId | null {
  const lower = issue.toLowerCase();

  // 1. Direct section ID mention
  for (const sid of VALID_SECTION_IDS) {
    if (lower.includes(sid)) return sid;
  }

  // 2. Keyword matching (ordered — first match wins)
  for (const { keywords, sectionId } of KEYWORD_ROUTES) {
    if (keywords.some(kw => lower.includes(kw))) return sectionId;
  }

  return null;
}

// ─── Main builder ─────────────────────────────────────────────────────────────

type Priority = 'low' | 'medium' | 'high';
type Source   = 'final-judge' | 'seo-audit' | 'both';

const PRIORITY_ORDER: Priority[] = ['high', 'medium', 'low'];

function mergePriority(a: Priority, b: Priority): Priority {
  return PRIORITY_ORDER.indexOf(a) <= PRIORITY_ORDER.indexOf(b) ? a : b;
}

function mergeSource(a: Source, b: Source): Source {
  if (a === b) return a;
  return 'both';
}

export function buildRerunPlan(opts: BuildRerunPlanOpts): RerunPlan {
  const { slug, writingDir, maxSections } = opts;

  const judgePath = path.join(writingDir, 'final-judge.json');
  const seoPath   = path.join(writingDir, 'seo-audit.json');
  const outPath   = path.join(writingDir, 'rerun-plan.json');

  const judge = fs.existsSync(judgePath)
    ? (JSON.parse(fs.readFileSync(judgePath, 'utf-8')) as FinalJudgeResult)
    : null;

  const seo = fs.existsSync(seoPath)
    ? (JSON.parse(fs.readFileSync(seoPath, 'utf-8')) as SeoAuditResult)
    : null;

  // Map: sectionId → accumulated entry
  const accumulator = new Map<
    string,
    { reasons: string[]; priority: Priority; source: Source }
  >();

  const skippedIssues: SkippedIssue[] = [];

  function addToSection(
    sectionId: string,
    reason: string,
    priority: Priority,
    source: Source,
  ): void {
    const existing = accumulator.get(sectionId);
    if (existing) {
      if (!existing.reasons.includes(reason)) existing.reasons.push(reason);
      existing.priority = mergePriority(existing.priority, priority);
      existing.source   = mergeSource(existing.source, source);
    } else {
      accumulator.set(sectionId, { reasons: [reason], priority, source });
    }
  }

  function processIssue(
    issue: string,
    priority: Priority,
    source: Source,
  ): void {
    // Check skip patterns first
    const skipReason = shouldSkip(issue);
    if (skipReason) {
      skippedIssues.push({ issue: issue.slice(0, 200), reason: skipReason });
      return;
    }
    // Route to section
    const sectionId = routeToSection(issue);
    if (sectionId) {
      addToSection(sectionId, issue.slice(0, 200), priority, source);
    } else {
      skippedIssues.push({
        issue: issue.slice(0, 200),
        reason: 'cannot map to a specific section — may require manual review',
      });
    }
  }

  // ── Process final judge ────────────────────────────────────────────────────
  if (judge) {
    // Explicit rerun recommendations (judge names sections directly)
    for (const rec of judge.rerunRecommendations) {
      const sid = routeToSection(rec) ?? rec.trim();
      if (VALID_SECTION_IDS.includes(sid as SectionId)) {
        addToSection(sid, `Judge rerun recommendation: ${rec.slice(0, 150)}`, 'high', 'final-judge');
      } else {
        processIssue(rec, 'high', 'final-judge');
      }
    }

    // Unsupported claims — high priority
    for (const claim of judge.unsupportedClaims) {
      processIssue(claim, 'high', 'final-judge');
    }

    // Weak sections — medium priority
    for (const section of judge.weakSections) {
      if (VALID_SECTION_IDS.includes(section as SectionId)) {
        addToSection(section, `Identified as weak section by final judge`, 'medium', 'final-judge');
      } else {
        processIssue(section, 'medium', 'final-judge');
      }
    }

    // Risk flags — medium priority
    for (const flag of judge.riskFlags) {
      processIssue(flag, 'medium', 'final-judge');
    }

    // Required fixes — medium priority
    for (const fix of judge.requiredFixes) {
      processIssue(fix, 'medium', 'final-judge');
    }
  }

  // ── Process SEO audit ──────────────────────────────────────────────────────
  if (seo) {
    // Required fixes — low priority (only if mappable to a section)
    for (const fix of seo.requiredFixes) {
      processIssue(fix, 'low', 'seo-audit');
    }
  }

  // ── Build ordered list ─────────────────────────────────────────────────────
  const sectionsToRerun: SectionToRerun[] = [...accumulator.entries()]
    .map(([sectionId, data]) => ({ sectionId, ...data }))
    .sort((a, b) => {
      const pa = PRIORITY_ORDER.indexOf(a.priority);
      const pb = PRIORITY_ORDER.indexOf(b.priority);
      if (pa !== pb) return pa - pb;
      return VALID_SECTION_IDS.indexOf(a.sectionId as SectionId) -
             VALID_SECTION_IDS.indexOf(b.sectionId as SectionId);
    });

  const capped =
    maxSections !== undefined
      ? sectionsToRerun.slice(0, maxSections)
      : sectionsToRerun;

  // Issues beyond the cap become skipped
  if (maxSections !== undefined && sectionsToRerun.length > maxSections) {
    for (const s of sectionsToRerun.slice(maxSections)) {
      skippedIssues.push({
        issue: `Section ${s.sectionId} (${s.priority} priority)`,
        reason: `Exceeded --max-rerun-sections cap of ${maxSections}`,
      });
    }
  }

  const plan: RerunPlan = {
    createdAt: new Date().toISOString(),
    slug,
    source: {
      finalJudgePass:  judge?.pass  ?? true,
      seoPass:         seo?.pass    ?? true,
      finalJudgeScore: judge?.overallScore ?? 0,
      seoScore:        seo?.seoScore        ?? 0,
    },
    sectionsToRerun: capped,
    skippedIssues,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(plan, null, 2), 'utf-8');

  return plan;
}
