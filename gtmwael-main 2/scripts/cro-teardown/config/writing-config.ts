/**
 * Writing configuration — defaults and templates for CRO teardown article generation.
 * All values here are factual, cautious, and editorial-inference-free.
 */

// ─── LLM model config (Phase 4B) ─────────────────────────────────────────────

export const MODELS = {
  writer:     'claude-sonnet-4-5',
  critic:     'claude-sonnet-4-5',
  rewriter:   'claude-sonnet-4-5',
  judge:      'claude-opus-4-5',    // used by final-judge.ts (flagship mode)
  seoAuditor: 'claude-haiku-4-5-20251001',   // Rec 6: structured rubric scoring — haiku is sufficient
} as const;

export type ModelRole = keyof typeof MODELS;

/** USD per million tokens. Keep in sync with https://www.anthropic.com/pricing */
export const MODEL_PRICING: Record<string, { inputPerMTok: number; outputPerMTok: number }> = {
  'claude-sonnet-4-5': { inputPerMTok: 3.00,  outputPerMTok: 15.00 },
  'claude-opus-4-5':   { inputPerMTok: 15.00, outputPerMTok: 75.00 },
  'claude-haiku-4-5-20251001':  { inputPerMTok: 0.80,  outputPerMTok: 4.00 },
};

/**
 * Final judge model by run mode.
 * - standard  → Sonnet (fast, cheap)
 * - flagship  → Opus   (highest quality)
 * - budget    → Sonnet
 * - draft     → Sonnet (judge skipped in draft mode, but entry kept for completeness)
 */
export const JUDGE_MODEL_BY_MODE: Record<string, string> = {
  standard: 'claude-sonnet-4-5',
  flagship: 'claude-opus-4-5',
  budget:   'claude-sonnet-4-5',
  draft:    'claude-sonnet-4-5',
};

/** A section passes if its critic score reaches this threshold. */
export const CRITIC_PASS_SCORE = 85;

/** Phase 4D: full-article judge pass threshold (overallScore). */
export const JUDGE_PASS_SCORE = 90;

/** Phase 4D: SEO audit pass threshold (seoScore). */
export const SEO_PASS_SCORE = 80;

/**
 * Maps section IDs to the Phase 4A evidence file base-names to aggregate.
 * The files live in data/cro-teardowns/[slug]/writing/section-evidence/.
 */
export const SECTION_EVIDENCE_SOURCES: Record<string, string[]> = {
  // ── Phase 4C canonical IDs (compose-all-sections) ──────────────────────────
  // 6-section architecture (V5): adds 02-quick-answer between intro and belief shift
  //
  // Layer 3 (strategic-shift) is injected into sections that require a thesis
  // anchor: intro, quick answer, messaging evolution, and lessons.
  // Visual timeline and CTA/nav sections work from factual diff data — thesis
  // is less critical there and adds token cost without clear benefit.
  // seo-intent is injected into intro and quick-answer: these sections carry the
  // primary keyword in H1, meta-description hook, and opening sentence frame.
  // Messaging-evolution also benefits from knowing the intent angle (commercial vs
  // informational shifts how copy is framed). Other sections are factual/visual.
  '01-intro':                    ['summary-cards', 'messaging', 'strategic-shift', 'seo-intent'],
  '02-quick-answer':             ['summary-cards', 'messaging', 'strategic-shift', 'seo-intent'],
  '03-visual-timeline':          ['analysis-blocks', 'messaging'],
  '04-messaging-evolution':      ['messaging', 'summary-cards', 'strategic-shift', 'seo-intent'],
  '05-cta-navigation-evolution': ['cta-changes', 'h2-changes'],
  '06-lessons-for-saas-teams':   ['lesson-cards', 'summary-cards', 'strategic-shift'],
  '07-business-context':         ['messaging', 'summary-cards', 'strategic-shift', 'business-context-research'],
  // ── Phase 4B legacy IDs (compose-section — backward compat) ────────────────
  '02-timeline': ['summary-cards'],
  '03-analysis': ['analysis-blocks'],
  '04-messaging': ['messaging'],
  '05-headings': ['h2-changes'],
  '06-cta':      ['cta-changes'],
  '07-lessons':  ['lesson-cards'],
};

// ─── Author ───────────────────────────────────────────────────────────────────

export const DEFAULT_AUTHOR = 'Wael Aouididi';
export const DEFAULT_AUTHOR_BIO =
  'SaaS Growth Marketer and fractional growth lead. I help B2B SaaS founders diagnose landing page, CRO, positioning, and analytics leaks before scaling traffic.';

// ─── Article metadata ─────────────────────────────────────────────────────────

export const CATEGORY = 'CRO Teardown';

// ─── CTA ──────────────────────────────────────────────────────────────────────

export const DEFAULT_CTA = {
  title: 'Want your homepage audited like this?',
  body: 'I review your traffic sources, message match, CTA path, proof structure, and mobile experience — then give you a specific list of what to change and why.',
  button: 'Book a page audit',
};

// ─── Related posts (links into the existing blog) ─────────────────────────────

export const DEFAULT_RELATED_POSTS = [
  {
    label: 'SaaS CRO',
    title: "SaaS traffic but no signups? Here's why",
    description:
      'If your page is getting visits but not converting, the issue is usually message match — not traffic volume.',
    href: '/blog/saas-traffic-but-no-signups',
  },
  {
    label: 'Landing pages',
    title: 'Landing page optimization best practices 2026',
    description:
      'The patterns that separate high-converting SaaS pages from the ones that bleed spend.',
    href: '/blog/landing-page-optimization-best-practices-2026',
  },
  {
    label: 'CRO',
    title: 'AI conversion rate optimization for SaaS',
    description:
      'How to use AI tools to identify conversion leaks without drowning in data.',
    href: '/blog/ai-conversion-rate-optimization-saas',
  },
];

// ─── TOC structure — must stay in sync with TeardownLayout.tsx section IDs ────

export const TOC_SECTIONS: { label: string; id: string }[] = [
  { label: 'Quick summary', id: 'summary' },
  { label: 'Visual timeline', id: 'timeline' },
  { label: 'Screenshot analysis', id: 'analysis' },
  { label: 'Messaging evolution', id: 'messaging' },
  { label: 'Section heading changes', id: 'headings' },
  { label: 'CTA evolution', id: 'cta-evolution' },
  { label: 'Why it changed', id: 'business-context' },
  { label: 'What SaaS teams can study', id: 'lessons' },
];

// ─── Month label helpers ───────────────────────────────────────────────────────

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Converts a month key to a short display label.
 * "2023-01"  → "Jan 2023"
 * "current"  → "Today"
 */
export function formatMonthLabel(month: string): string {
  if (month === 'current') return 'Today';
  const [year, mon] = month.split('-');
  const idx = parseInt(mon, 10) - 1;
  return `${MONTH_NAMES[idx] ?? mon} ${year}`;
}

/**
 * Like formatMonthLabel but "current" resolves to the real calendar month
 * of generatedAt — better for period strings like "Jan 2023 → Jun 2026".
 */
export function formatPeriodLabel(month: string, generatedAt: string): string {
  if (month !== 'current') return formatMonthLabel(month);
  const d = new Date(generatedAt);
  return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/**
 * Approximate years between two month keys.
 * Used for H1 copy like "over 3 years".
 */
export function yearsBetween(fromMonth: string, toMonth: string, generatedAt: string): number {
  const parseMonth = (m: string): Date => {
    if (m === 'current') return new Date(generatedAt);
    const [y, mo] = m.split('-').map(Number);
    return new Date(Date.UTC(y, mo - 1, 1));
  };
  const diff = parseMonth(toMonth).getTime() - parseMonth(fromMonth).getTime();
  return Math.max(1, Math.round(diff / (365.25 * 24 * 60 * 60 * 1000)));
}

// ─── Read-time estimator ───────────────────────────────────────────────────────

export function estimateReadTime(opts: {
  snapshotCount: number;
  messagingChanges: number;
  analysisBlocks: number;
  lessonCards: number;
}): string {
  const minutes =
    5 +
    Math.ceil(opts.analysisBlocks / 2) +
    (opts.messagingChanges > 1 ? 1 : 0) +
    (opts.lessonCards > 3 ? 1 : 0);
  return `${minutes} min read`;
}

// ─── Cautious messaging-note templates ────────────────────────────────────────

/**
 * Returns a factual, cautious note for a headline change.
 * Never claims causation or confirmed strategy.
 */
export function headlineChangeNote(before: string, after: string): string {
  const afterLower = after.toLowerCase();
  const beforeLower = before.toLowerCase();

  const afterEnterprise = /platform|intelligence|enterprise|business impact|roi|risk|prove/i.test(after);
  const beforeCasual = /let'?s|grow your|save time|get more|try|free/i.test(before);
  const hasSuperlative = /world'?s|leading|#1|most|deepest|best/i.test(after);
  const removedFreeTrialCta = /free/i.test(beforeLower) && !/free/i.test(afterLower);

  if (afterEnterprise && beforeCasual) {
    return 'The shift from casual outcome language to formal capability framing can be read as a move toward upmarket positioning. This is observation, not confirmed strategy.';
  }
  if (hasSuperlative) {
    return `The addition of a superlative claim can be read as a bid for category leadership rather than feature parity. This is interpretation based on observed text changes.`;
  }
  if (removedFreeTrialCta) {
    return 'The removal of free-trial urgency from this element may reflect a shift toward a longer sales cycle or demo-first motion. This is observation, not confirmed data.';
  }
  return 'This change can be read as a deliberate update to the primary value proposition frame. No confirmed strategy is implied.';
}

/**
 * Returns a cautious note for a meta description change.
 */
export function metaDescChangeNote(before: string, after: string): string {
  const removedFree = /free/i.test(before) && !/free/i.test(after);
  const removedExclamation = before.includes('!') && !after.includes('!');
  const afterPlain = after.length < before.length;

  if (removedFree && removedExclamation) {
    return 'Free-trial urgency and exclamatory language removed. The new description reads as a neutral product category statement — more consistent with a platform positioning than a trial-conversion tool.';
  }
  if (removedFree) {
    return 'Free-trial language removed. The new description reads as a category statement rather than a conversion prompt.';
  }
  if (afterPlain) {
    return 'The new description is shorter and more neutral in tone. Whether this is intentional de-emphasis or a simplification pass is not determinable from text alone.';
  }
  return 'Meta description updated. The change in framing may reflect a positioning adjustment or an SEO update.';
}
