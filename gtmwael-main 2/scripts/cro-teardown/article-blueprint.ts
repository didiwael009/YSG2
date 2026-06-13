/**
 * Phase 4A — Article Blueprint
 *
 * Transforms an EvidencePack into a complete CroTeardownPost object.
 * All content is derived deterministically from the evidence:
 *   - Headline/meta/CTA changes → MessagingChanges
 *   - Diff counts → SummaryCards
 *   - Selected snapshots → SnapshotEntries + AnalysisBlocks
 *   - Observed diff patterns → LessonCards
 *
 * Language rules:
 *   - "can be read as", "may suggest", "observed" — never "this caused", "this improved"
 *   - No invented metrics, no conversion lift claims
 *   - Facts and cautious interpretation clearly separated
 */

import type { EvidencePack } from './evidence-pack.js';
import type {
  AnalysisBlock,
  LessonCard,
  MessagingChange,
  SnapshotEntry,
  SummaryCard,
} from '../../src/content/cro-teardown/types.js';
import type { CroTeardownPost } from '../../src/content/cro-teardown/types.js';
import {
  DEFAULT_AUTHOR,
  DEFAULT_AUTHOR_BIO,
  TOC_SECTIONS,
  CATEGORY,
  getCtaForSlug,
  getRelatedPostsForSlug,
  estimateReadTime,
  headlineChangeNote,
  metaDescChangeNote,
  yearsBetween,
} from './config/writing-config.js';
import { cleanBodyText } from './normalize-page-text.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataQuality {
  headlineChanged: boolean;
  metaChanged: boolean;
  titleChanged: boolean;
  snapshotCount: number;
  h2Added: number;
  h2Removed: number;
  ctaAdded: number;
  ctaRemoved: number;
  navAdded: number;
  navRemoved: number;
  visualOnly: boolean;
  hasMidTransition: boolean;
}

export interface SectionEvidence {
  summaryCards: SummaryCard[];
  snapshots: SnapshotEntry[];
  messagingChanges: MessagingChange[];
  analysisBlocks: AnalysisBlock[];
  lessonCards: LessonCard[];
  h2Added: string[];
  h2Removed: string[];
  ctaAdded: string[];
  ctaRemoved: string[];
}

export interface ArticleBlueprint {
  post: CroTeardownPost;
  sectionEvidence: SectionEvidence;
  dataQuality: DataQuality;
  warnings: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function slugToVarName(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

// ─── Summary cards ────────────────────────────────────────────────────────────

function buildSummaryCards(pack: EvidencePack, quality: DataQuality): SummaryCard[] {
  const cards: SummaryCard[] = [];

  // 1. Period covered
  cards.push({
    label: 'Period covered',
    value: `${pack.fromLabel} → ${pack.toLabel}`,
    note: `${quality.snapshotCount} visual snapshot${quality.snapshotCount !== 1 ? 's' : ''} compared`,
  });

  // 2. Primary headline
  if (quality.headlineChanged) {
    cards.push({
      label: 'Primary headline',
      value: 'Fully rewritten',
      note: 'Audience signal changed',
    });
  } else {
    cards.push({
      label: 'Primary headline',
      value: 'Unchanged',
      note: 'Same H1 text across the period',
    });
  }

  // 3. Section headings
  const h2Total = quality.h2Added + quality.h2Removed;
  if (h2Total > 0) {
    cards.push({
      label: 'Section headings',
      value: `${quality.h2Added} added · ${quality.h2Removed} removed`,
      note:
        h2Total > 10
          ? 'Major content architecture overhaul'
          : h2Total > 4
          ? 'Significant structure changes'
          : 'Minor structure adjustments',
    });
  } else {
    cards.push({
      label: 'Section headings',
      value: 'Unchanged',
      note: 'Same H2 structure across the period',
    });
  }

  // 4. Navigation / CTAs
  const navTotal = quality.navAdded + quality.navRemoved;
  if (navTotal > 0) {
    cards.push({
      label: 'Navigation',
      value: `${quality.navAdded} added · ${quality.navRemoved} removed`,
      note: navTotal > 6 ? 'Navigation overhauled' : 'Navigation updated',
    });
  } else {
    const ctaTotal = quality.ctaAdded + quality.ctaRemoved;
    cards.push({
      label: 'CTAs',
      value: ctaTotal > 0 ? `${quality.ctaAdded} added · ${quality.ctaRemoved} removed` : 'Unchanged',
      note: ctaTotal > 0 ? 'Button / link inventory changed' : 'Same CTA structure',
    });
  }

  return cards;
}

// ─── Snapshot entries ─────────────────────────────────────────────────────────

function buildSnapshotEntries(pack: EvidencePack): SnapshotEntry[] {
  return pack.snapshots.map(s => ({
    month: s.month,
    label: s.label,
    screenshotPath: s.screenshotPath,
  }));
}

// ─── Messaging changes ────────────────────────────────────────────────────────

function buildMessagingChanges(pack: EvidencePack): MessagingChange[] {
  const changes: MessagingChange[] = [];
  const { diff } = pack;

  // Primary headline
  for (const h of diff.headlines) {
    changes.push({
      element: 'Primary headline (H1)',
      before: h.from,
      after: h.to,
      note: headlineChangeNote(h.from, h.to),
    });
  }

  // Meta description
  for (const m of diff.metaDescs) {
    changes.push({
      element: 'Meta description',
      before: m.from,
      after: m.to,
      note: metaDescChangeNote(m.from, m.to),
    });
  }

  // Page title (if changed and different signal from H1)
  for (const t of diff.titles) {
    if (!diff.headlines.some(h => h.from === t.from && h.to === t.to)) {
      changes.push({
        element: 'Page title',
        before: t.from,
        after: t.to,
      });
    }
  }

  return changes;
}

// ─── Analysis blocks ──────────────────────────────────────────────────────────

function buildAnalysisBlocks(pack: EvidencePack): AnalysisBlock[] {
  const blocks: AnalysisBlock[] = [];
  const { diff, fromText, toText, fromLabel, toLabel } = pack;

  // ── Block 1: baseline (from snapshot) ──────────────────────────────────────
  const fromH1 = cleanBodyText(fromText.h1?.[0]?.trim() ?? '');
  const fromSnap = pack.snapshots.find(s => s.month === pack.fromMonth);
  if (fromSnap) {
    const baselineAnnotations: string[] = [];

    if (fromH1) {
      const h1IsBenefit = /grow|reach|get more|save time|easy|simple/i.test(fromH1);
      const h1IsAgency  = /\bwe\b|\bour\b|agency|studio|\bpractice\b|hire us|design house|portfolio/i.test(fromH1);
      baselineAnnotations.push(
        `H1 opens with: "${fromH1}" — ` +
        (h1IsBenefit
          ? 'accessible benefit language aimed at a broad audience.'
          : h1IsAgency
            ? 'a first-person identity statement, not a product or outcome claim.'
            : 'a direct product statement.'),
      );
    }

    const fromH2Sample = fromText.h2?.slice(0, 3).filter(Boolean) ?? [];
    if (fromH2Sample.length > 0) {
      baselineAnnotations.push(
        `Visible section headings include: "${fromH2Sample.join('", "')}".`,
      );
    }

    const fromNavSample = diff.fromText.navLinks?.slice(0, 5).filter(s => s.length <= 35) ?? [];
    if (fromNavSample.length > 0) {
      const navJoined   = fromNavSample.join(' ');
      const navWorkflow = /publish|engage|monitor|advertise|analyze/i.test(navJoined);
      const navAgency   = /services|hire|our work|portfolio|disciplines|about us|case stud/i.test(navJoined);
      baselineAnnotations.push(
        `Navigation includes: "${fromNavSample.slice(0, 4).join('", "')}" — ` +
        (navWorkflow
          ? 'workflow-action framing.'
          : navAgency
            ? 'agency-service framing.'
            : 'product category framing.'),
      );
    }

    if (diff.h2Removed.length > 0) {
      baselineAnnotations.push(
        `Section headings later removed include: "${diff.h2Removed[0]}"${
          diff.h2Removed[1] ? ` and "${diff.h2Removed[1]}"` : ''
        }.`,
      );
    }

    blocks.push({
      id: `analysis-${pack.fromMonth}`,
      label: `${fromLabel} — original state`,
      period: fromLabel,
      screenshotPath: fromSnap.screenshotPath,
      heading: fromH1
        ? `The original: ${
            /grow|reach|get more/i.test(fromH1)
              ? 'growth-outcome'
              : /\bwe\b|\bour\b|agency|studio|\bpractice\b|hire us|design house|portfolio/i.test(fromH1)
                ? 'agency identity'
                : 'product-led'
          } messaging`
        : `The original state — ${fromLabel}`,
      annotations: baselineAnnotations,
    });
  }

  // ── Block 2: mid-transition (biggest visual delta) ─────────────────────────
  if (pack.midTransitionSnapshot) {
    const mt = pack.midTransitionSnapshot;
    const mtText = pack.midTransitionText;
    const simScore = mt.similarityToPrev != null
      ? `${(mt.similarityToPrev * 100).toFixed(1)}%`
      : 'unknown';

    const midAnnotations: string[] = [
      `Visual similarity to the previous snapshot: ${simScore} — ` +
      (mt.similarityToPrev != null && mt.similarityToPrev < 0.90
        ? 'one of the larger layout changes in the dataset.'
        : 'a moderate visual change.'),
    ];

    if (mtText) {
      const mtH1 = cleanBodyText(mtText.h1?.[0]?.trim() ?? '') || undefined;
      if (mtH1 && mtH1 !== cleanBodyText(fromText.h1?.[0]?.trim() ?? '')) {
        midAnnotations.push(`H1 in this snapshot: "${mtH1}".`);
      }
      const mtH2Added = mtText.h2?.filter(h => !fromText.h2?.includes(h)).slice(0, 2) ?? [];
      if (mtH2Added.length > 0) {
        midAnnotations.push(`New section headings appearing: "${mtH2Added.join('", "')}".`);
      }
    } else {
      midAnnotations.push(
        'Section headings and CTAs were shifting from the baseline structure toward the current configuration.',
      );
    }

    midAnnotations.push(
      'Changes across this period appear incremental rather than a single redesign event.',
    );

    blocks.push({
      id: `analysis-${mt.month}`,
      label: `${mt.label} — mid-transition`,
      period: mt.label,
      screenshotPath: mt.screenshotPath,
      heading: `Mid-period: signs of a structural shift`,
      annotations: midAnnotations,
    });
  }

  // ── Block 3: current/to snapshot ──────────────────────────────────────────
  const toH1 = cleanBodyText(toText.h1?.[0]?.trim() ?? '');
  const toSnap = pack.snapshots.find(s => s.month === pack.toMonth);
  if (toSnap) {
    const currentAnnotations: string[] = [];

    if (toH1) {
      currentAnnotations.push(
        `H1 now reads: "${toH1}" — ` +
        (/impact|intelligence|platform|enterprise|business/i.test(toH1)
          ? 'formal capability framing, consistent with platform-level positioning.'
          : 'updated value proposition.'),
      );
    }

    const toH2Sample = diff.h2Added.slice(0, 3);
    if (toH2Sample.length > 0) {
      currentAnnotations.push(
        `New section headings include: "${toH2Sample.join('", "')}".`,
      );
    }

    // Check for enterprise product categories in nav
    const enterpriseNavTerms = diff.navAdded
      .filter(n => /reputation|listening|intelligence|crisis|market research|monitoring/i.test(n))
      .slice(0, 3);
    if (enterpriseNavTerms.length > 0) {
      currentAnnotations.push(
        `Navigation now includes product categories like: "${enterpriseNavTerms.join('", "')}".`,
      );
    }

    // Check for awards / G2 / third-party validation
    const awardsInH2 = diff.h2Added.filter(h => /#1|award|g2|best|recognition/i.test(h));
    if (awardsInH2.length > 0) {
      currentAnnotations.push(
        `Third-party validation visible in section headings: "${awardsInH2[0]}".`,
      );
    }

    if (diff.ctaRemoved.length > 0) {
      currentAnnotations.push(
        `CTAs no longer present include: "${diff.ctaRemoved.slice(0, 3).join('", "')}".`,
      );
    }

    blocks.push({
      id: `analysis-current`,
      label: `${toLabel} — current state`,
      period: toLabel,
      screenshotPath: toSnap.screenshotPath,
      heading: toH1
        ? `Today: ${/impact|intelligence|platform/i.test(toH1) ? 'platform-first' : 'updated'} positioning`
        : `Current state — ${toLabel}`,
      annotations: currentAnnotations,
    });
  }

  return blocks;
}

// ─── Lesson cards ─────────────────────────────────────────────────────────────

function buildLessonCards(pack: EvidencePack, quality: DataQuality): LessonCard[] {
  const lessons: LessonCard[] = [];
  const { diff } = pack;
  const fromH1 = cleanBodyText(pack.fromText.h1?.[0]?.trim() ?? '');
  const toH1 = cleanBodyText(pack.toText.h1?.[0]?.trim() ?? '');

  // 1. Headline lesson (if headline changed)
  if (quality.headlineChanged && fromH1 && toH1) {
    const fromCasual = /let'?s|grow your|save time|get more|easy/i.test(fromH1);
    const toFormal = /impact|intelligence|platform|business|enterprise/i.test(toH1);

    lessons.push({
      title: 'Your H1 signals which buyer you are targeting',
      body:
        fromCasual && toFormal
          ? `The shift from "${fromH1.slice(0, 60)}${fromH1.length > 60 ? '...' : ''}" to "${toH1.slice(0, 60)}${toH1.length > 60 ? '...' : ''}" can be read as moving from accessible outcome language to formal capability framing. Casual, action-oriented headlines tend to attract self-serve users. Formal, capability-led headlines tend to attract buyers who need to justify a purchase internally.`
          : `The headline changed from "${fromH1.slice(0, 60)}${fromH1.length > 60 ? '...' : ''}" to "${toH1.slice(0, 60)}${toH1.length > 60 ? '...' : ''}". The framing of your H1 is one of the clearest signals of which buyer you are targeting and what you expect them to do next.`,
      tag: 'Messaging',
    });
  }

  // 2. Navigation lesson (if significant nav change)
  const navChangeTotal = quality.navAdded + quality.navRemoved;
  if (navChangeTotal >= 4 && diff.navRemoved.length > 0 && diff.navAdded.length > 0) {
    const removedSample = diff.navRemoved.slice(0, 3).join('", "');
    const addedSample = diff.navAdded.slice(0, 3).join('", "');
    const fromAction = /publish|engage|monitor|advertise|analyze|schedule/i.test(diff.navRemoved.join(' '));
    const toCategory = /reputation|listening|intelligence|crisis|monitoring/i.test(diff.navAdded.join(' '));

    lessons.push({
      title: 'Navigation is a positioning statement',
      body:
        fromAction && toCategory
          ? `The switch from workflow-action labels like "${removedSample}" to product-category labels like "${addedSample}" signals a different user mental model. Action-based navigation suits individual users who know what task they want to do. Category-based navigation suits teams evaluating a platform against a vendor shortlist.`
          : `Navigation items changed from "${removedSample}" to "${addedSample}". The labels your navigation uses reveal what you think your visitor is trying to decide — and who that visitor is.`,
      tag: 'Navigation',
    });
  }

  // 3. Content architecture lesson (if many H2 changes)
  if (quality.h2Added >= 5) {
    const addedSample = diff.h2Added.slice(0, 2).join('" and "');
    const removedSample = diff.h2Removed.slice(0, 2).join('" and "');
    lessons.push({
      title: 'Section headings reveal what the team thinks buyers care about',
      body:
        `${quality.h2Added} section headings were added and ${quality.h2Removed} removed between ${pack.fromLabel} and ${pack.toLabel}. ` +
        (addedSample
          ? `New headings include "${addedSample}". `
          : '') +
        (removedSample
          ? `Headings that disappeared include "${removedSample}". `
          : '') +
        'The pattern of what gets added and removed is one of the clearest signals of how a team is re-prioritizing its value proposition.',
      tag: 'CRO',
    });
  }

  // 4. Superlative lesson (if superlative detected in current headline or H2)
  const superlativeSource = [toH1, ...diff.h2Added].find(t =>
    /world'?s|leading|#1|most|deepest|best|only/i.test(t),
  );
  if (superlativeSource) {
    const claim = superlativeSource.slice(0, 70) + (superlativeSource.length > 70 ? '...' : '');
    lessons.push({
      title: 'Superlatives raise expectations across your entire funnel',
      body: `Claims like "${claim}" raise the bar for everything downstream — including the product experience, onboarding, and support. If the homepage signals category leadership and the product experience signals a self-serve tool, the mismatch may create friction at the trial-to-paid stage. This is not a caution against ambitious claims — it is a note that the rest of the funnel must match them.`,
      tag: 'CRO Risk',
    });
  }

  // 5. Always: strategy lesson about incremental compounding
  const yearsSpan = yearsBetween(pack.fromMonth, pack.toMonth, pack.generatedAt);
  lessons.push({
    title: 'Incremental changes compound into a brand shift',
    body: `Across ${quality.snapshotCount} snapshots spanning ${yearsSpan > 1 ? `roughly ${yearsSpan} years` : 'this period'}, no single update here was a dramatic overhaul. The end state looks very different from the start because small, consistent changes in the same direction accumulate. This is worth studying if your own homepage has been drifting without a clear direction.`,
    tag: 'Strategy',
  });

  return lessons.slice(0, 5); // cap at 5 to keep the page readable
}

// ─── Title and metadata generation ───────────────────────────────────────────

function buildTitleBlock(pack: EvidencePack, quality: DataQuality): {
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  excerpt: string;
} {
  const { companyName, fromLabel, toLabel } = pack;
  const yearsSpan = yearsBetween(pack.fromMonth, pack.toMonth, pack.generatedAt);
  const fromH1 = cleanBodyText(pack.fromText.h1?.[0]?.trim() ?? '');
  const toH1 = cleanBodyText(pack.toText.h1?.[0]?.trim() ?? '');

  const title = quality.visualOnly
    ? `${companyName} Homepage Visual Teardown: ${fromLabel} to ${toLabel}`
    : `${companyName} Homepage Teardown: ${fromLabel} to ${toLabel}`;

  const h1 = quality.headlineChanged && yearsSpan >= 2
    ? `How ${companyName} rewrote its homepage over ${yearsSpan} year${yearsSpan !== 1 ? 's' : ''}`
    : quality.visualOnly
    ? `${companyName} homepage visual evolution: ${fromLabel} to ${toLabel}`
    : `${companyName} homepage changes: what shifted between ${fromLabel} and ${toLabel}`;

  const metaTitle = `${companyName} Homepage CRO Teardown — ${fromLabel} to ${toLabel}`;

  const changesDescription = [
    quality.headlineChanged && 'headline',
    (quality.h2Added + quality.h2Removed) > 0 && 'section headings',
    (quality.ctaAdded + quality.ctaRemoved) > 0 && 'CTAs',
    (quality.navAdded + quality.navRemoved) > 0 && 'navigation',
  ].filter(Boolean).join(', ');

  const description = quality.visualOnly
    ? `A visual CRO teardown of ${companyName}'s homepage evolution from ${fromLabel} to ${toLabel} — ${quality.snapshotCount} snapshots compared, no significant text changes detected.`
    : `A CRO teardown of ${companyName}'s homepage from ${fromLabel} to ${toLabel} — what changed in ${changesDescription || 'page structure'}, and what SaaS teams can study from it.`;

  const excerpt = quality.headlineChanged && fromH1 && toH1
    ? `${companyName}'s homepage didn't just get updated. The ${changesDescription} all shifted in a consistent direction between ${fromLabel} and ${toLabel}. This teardown maps what changed, when, and what the patterns may suggest.`
    : quality.visualOnly
    ? `${companyName}'s homepage changed visually between ${fromLabel} and ${toLabel}, with ${quality.snapshotCount} distinct snapshots to compare. The primary text content stayed largely consistent — the changes were structural and visual.`
    : `${companyName}'s homepage structure changed between ${fromLabel} and ${toLabel}. This teardown maps ${changesDescription} changes across ${quality.snapshotCount} snapshots and extracts patterns worth studying.`;

  return { title, h1, metaTitle, description, excerpt };
}

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildArticleBlueprint(pack: EvidencePack): ArticleBlueprint {
  const { diff } = pack;
  const warnings: string[] = [...pack.warnings];

  const quality: DataQuality = {
    headlineChanged: diff.headlines.length > 0,
    metaChanged: diff.metaDescs.length > 0,
    titleChanged: diff.titles.length > 0,
    snapshotCount: pack.snapshots.length,
    h2Added: diff.h2Added.length,
    h2Removed: diff.h2Removed.length,
    ctaAdded: diff.ctaAdded.length,
    ctaRemoved: diff.ctaRemoved.length,
    navAdded: diff.navAdded.length,
    navRemoved: diff.navRemoved.length,
    visualOnly: diff.visualOnly,
    hasMidTransition: pack.midTransitionSnapshot !== null,
  };

  if (!quality.headlineChanged && !quality.metaChanged) {
    warnings.push('No headline or meta description changes detected. The generated article will focus on structural changes only.');
  }

  const summaryCards = buildSummaryCards(pack, quality);
  const snapshots = buildSnapshotEntries(pack);
  const messagingChanges = buildMessagingChanges(pack);
  const analysisBlocks = buildAnalysisBlocks(pack, quality);
  const lessonCards = buildLessonCards(pack, quality);

  const { title, h1, metaTitle, description, excerpt } = buildTitleBlock(pack, quality);

  const firstSnapshot = pack.snapshots[0];
  const featuredImage = firstSnapshot?.screenshotPath ?? '';
  const fromH1ForAlt = cleanBodyText(pack.fromText.h1?.[0]?.trim() ?? '');
  const featuredImageAlt = fromH1ForAlt
    ? `${pack.companyName} ${pack.fromLabel} homepage — '${fromH1ForAlt}'`
    : `${pack.companyName} homepage — ${pack.fromLabel}`;

  const readTime = estimateReadTime({
    snapshotCount: pack.snapshots.length,
    messagingChanges: messagingChanges.length,
    analysisBlocks: analysisBlocks.length,
    lessonCards: lessonCards.length,
  });

  const post: CroTeardownPost = {
    slug: pack.slug,
    companyName: pack.companyName,
    companyUrl: pack.companyUrl,
    category: CATEGORY,
    title,
    h1,
    metaTitle,
    description,
    excerpt,
    author: DEFAULT_AUTHOR,
    authorBio: DEFAULT_AUTHOR_BIO,
    datePublished: pack.generatedAt.slice(0, 10),
    readTime,
    featuredImage,
    featuredImageAlt,
    fromLabel: pack.fromLabel,
    toLabel: pack.toLabel,
    snapshots,
    summaryCards,
    messagingChanges,
    h2Added: diff.h2Added,
    h2Removed: diff.h2Removed,
    ctaAdded: diff.ctaAdded,
    ctaRemoved: diff.ctaRemoved,
    analysisBlocks,
    lessonCards,
    toc: TOC_SECTIONS,
    cta: getCtaForSlug(pack.slug),
    relatedPosts: getRelatedPostsForSlug(pack.slug),
  };

  const sectionEvidence: SectionEvidence = {
    summaryCards,
    snapshots,
    messagingChanges,
    analysisBlocks,
    lessonCards,
    h2Added: diff.h2Added,
    h2Removed: diff.h2Removed,
    ctaAdded: diff.ctaAdded,
    ctaRemoved: diff.ctaRemoved,
  };

  return { post, sectionEvidence, dataQuality: quality, warnings };
}
