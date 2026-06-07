import type { DiffResult } from './diff.js';

// ─── Interpretation choice shapes ─────────────────────────────────────────────

export interface InterpretationChoices {
  croInterpretation: number | null;   // index into CRO_OPTIONS, null = skip
  positioningShift: number | null;
  teamLearning: number | null;
  paidAdsContext: number | null;
  whatToCopy: number | null;
}

// ─── Option lists (shared between prompt layer and MDX layer) ─────────────────

export const CRO_OPTIONS = [
  { label: 'Enterprise repositioning' },
  { label: 'Stronger product-led / self-serve positioning' },
  { label: 'More trust / social-proof focused messaging' },
  { label: 'More AI / product-feature focused positioning' },
  { label: 'Visual redesign only — messaging mostly unchanged' },
  { label: 'Skip this section', skip: true },
];

export const POSITIONING_OPTIONS = [
  { label: 'Moving upmarket (SMB → Mid-market / Enterprise)' },
  { label: 'Moving downmarket (Enterprise → SMB / PLG)' },
  { label: 'Expanding to a new buyer persona' },
  { label: 'Doubling down on existing positioning' },
  { label: 'Skip', skip: true },
];

export const LEARNING_OPTIONS = [
  { label: 'Lessons from how they evolved the headline' },
  { label: 'Lessons from how they changed their CTA strategy' },
  { label: 'Lessons from their trust signal / social proof approach' },
  { label: 'Lessons from navigation simplification or restructuring' },
  { label: 'Skip', skip: true },
];

export const ADS_OPTIONS = [
  { label: 'Likely reflects a brand campaign shift' },
  { label: 'Likely reflects a performance marketing change' },
  { label: 'Skip', skip: true },
];

export const COPY_OPTIONS = [
  { label: 'The headline approach' },
  { label: 'The CTA structure' },
  { label: 'The social proof / trust signal strategy' },
  { label: 'The navigation simplification' },
  { label: 'Skip', skip: true },
];

// ─── Auto-detect best match for full-draft mode ────────────────────────────────

export function autoDetectChoices(diff: DiffResult): InterpretationChoices {
  const toH1 = (diff.toText.h1?.[0] ?? '').toLowerCase();
  const toH2 = diff.toText.h2.join(' ').toLowerCase();
  const toH3 = diff.toText.h3.join(' ').toLowerCase();
  const ctaText = diff.ctaAdded.join(' ').toLowerCase();

  let croInterpretation: number;
  if (/enterprise|platform|organization|global|scale|fleet|intelligence/i.test(toH1 + toH2)) {
    croInterpretation = 1; // Enterprise
  } else if (/ai |artificial|intelligence|smart|automat/i.test(toH1 + toH2 + toH3)) {
    croInterpretation = 4; // AI/product
  } else if (/free|try free|self.serv|get started/i.test(ctaText)) {
    croInterpretation = 2; // PLG
  } else if (diff.visualOnly) {
    croInterpretation = 5; // Visual only
  } else {
    croInterpretation = 3; // Business-impact
  }

  const fromH1 = (diff.fromText.h1?.[0] ?? '').toLowerCase();
  let positioningShift: number;
  if (
    /grow|small|team|starter|individual/i.test(fromH1) &&
    /enterprise|platform|organization|scale/i.test(toH1)
  ) {
    positioningShift = 1; // Moving upmarket
  } else if (diff.visualOnly) {
    positioningShift = 4; // Doubling down
  } else {
    positioningShift = 1; // Default: moving upmarket (most common SaaS pattern)
  }

  return {
    croInterpretation,
    positioningShift,
    teamLearning: 1,  // Default: headline lessons
    paidAdsContext: null,
    whatToCopy: null,
  };
}

// ─── Section builders ──────────────────────────────────────────────────────────

function fmtMonth(m: string): string {
  if (m === 'current') return 'Current';
  const [y, mo] = m.split('-');
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[parseInt(mo, 10) - 1]} ${y}`;
}

function bulletList(items: string[]): string {
  return items.map(s => `- "${s}"`).join('\n');
}

function factsSection(diff: DiffResult): string {
  const parts: string[] = [];

  parts.push(`> *The observations below are extracted automatically from archived page text. No editorial interpretation is applied in this section.*`);
  parts.push('');

  // Headline
  if (diff.headlines.length > 0) {
    const h = diff.headlines[0];
    parts.push(`### Primary headline\n`);
    parts.push(`| | Headline |`);
    parts.push(`|---|---|`);
    parts.push(`| **${fmtMonth(h.fromMonth)}** | "${h.from}" |`);
    parts.push(`| **${fmtMonth(h.toMonth)}** | "${h.to}" |`);
    parts.push('');
  }

  // Meta description
  if (diff.metaDescs.length > 0) {
    const m = diff.metaDescs[0];
    parts.push(`### Meta description\n`);
    parts.push(`**${fmtMonth(m.fromMonth)}:**`);
    parts.push(`> ${m.from}\n`);
    parts.push(`**${fmtMonth(m.toMonth)}:**`);
    parts.push(`> ${m.to}\n`);
  }

  // H2 changes
  if (diff.h2Added.length > 0 || diff.h2Removed.length > 0) {
    parts.push(`### Section headings (H2)\n`);
    if (diff.h2Added.length > 0) {
      parts.push(`**Added:**\n${bulletList(diff.h2Added)}\n`);
    }
    if (diff.h2Removed.length > 0) {
      parts.push(`**Removed:**\n${bulletList(diff.h2Removed)}\n`);
    }
  }

  // CTA changes
  if (diff.ctaAdded.length > 0 || diff.ctaRemoved.length > 0) {
    parts.push(`### CTAs / buttons\n`);
    if (diff.ctaAdded.length > 0) {
      parts.push(`**Added:**\n${bulletList(diff.ctaAdded)}\n`);
    }
    if (diff.ctaRemoved.length > 0) {
      parts.push(`**Removed:**\n${bulletList(diff.ctaRemoved)}\n`);
    }
  }

  // Nav changes
  if (diff.navAdded.length > 0 || diff.navRemoved.length > 0) {
    parts.push(`### Navigation\n`);
    if (diff.navAdded.length > 0) {
      parts.push(`**Added:**\n${bulletList(diff.navAdded)}\n`);
    }
    if (diff.navRemoved.length > 0) {
      parts.push(`**Removed:**\n${bulletList(diff.navRemoved)}\n`);
    }
  }

  if (diff.visualOnly) {
    parts.push(`*No significant text changes were detected between the compared snapshots. The differences appear to be primarily visual or structural.*`);
  }

  return parts.join('\n');
}

// ─── Interpretation text templates ────────────────────────────────────────────

function croInterpretationText(choice: number, diff: DiffResult, insightMode: string): string {
  const fromH1 = diff.fromText.h1?.[0] ?? '';
  const toH1 = diff.toText.h1?.[0] ?? '';
  const prefix = insightMode === 'full-draft'
    ? `> *Auto-generated interpretation (full-draft mode). This is editorial inference, not confirmed strategy.*\n\n`
    : `> *Based on the selected interpretation: **${CRO_OPTIONS[choice - 1]?.label}***\n\n`;

  const templates: Record<number, string> = {
    1: `${prefix}The shift in homepage language — from **"${fromH1}"** to **"${toH1}"** — can be read as a deliberate move upmarket.\n\nThe new messaging de-emphasises individual productivity and instead emphasises platform depth, business impact, and intelligence — signals that typically resonate with enterprise buyers evaluating vendors on capability breadth rather than speed-to-value.\n\nThe addition of terms like *"world's deepest"* and the removal of self-serve trial language from the hero reinforce a positioning frame built around differentiation at scale.\n\n*This is interpretation based on observed text changes, not confirmed strategy.*`,

    2: `${prefix}The homepage evolution suggests a push toward **product-led growth and self-serve adoption**.\n\nThe language shifted from awareness-level outcomes (reach, growth) toward specific actions and immediate value — a pattern associated with PLG strategies that want visitors to experience the product quickly rather than talk to sales.\n\nThe CTA changes and the directness of the new messaging suggest an intent to reduce friction between landing and activation.\n\n*This is interpretation based on observed text changes, not confirmed strategy.*`,

    3: `${prefix}The text changes show a stronger emphasis on **trust signals and social proof** as the primary conversion driver.\n\nThe headline and supporting copy shifted away from feature-led claims toward outcome-led and credibility-led language. New H2s about customer success and social validation suggest the team may be testing whether proof-first messaging out-converts product-first messaging in their category.\n\n*This is interpretation based on observed text changes, not confirmed strategy.*`,

    4: `${prefix}The homepage text changes show a clear shift toward **AI and product-intelligence positioning**.\n\nThe headline and new section headings introduce terminology around social intelligence, AI, and data-driven insights — a reframing that positions the product as a strategic intelligence layer rather than a scheduling tool.\n\nThis mirrors a broader industry shift where social management tools are racing to claim AI-native positioning ahead of commoditisation.\n\n*This is interpretation based on observed text changes, not confirmed strategy.*`,

    5: `${prefix}The text differences between the two periods are minimal. The observed changes appear to be primarily **visual or structural** rather than a deliberate messaging overhaul.\n\nNo significant headline, meta description, or CTA changes were detected that would indicate a strategic repositioning.\n\n*This is interpretation based on observed text changes, not confirmed strategy.*`,
  };

  return templates[choice] ?? '';
}

function positioningText(choice: number, diff: DiffResult, insightMode: string): string {
  const fromH1 = diff.fromText.h1?.[0] ?? '';
  const toH1 = diff.toText.h1?.[0] ?? '';
  const prefix = insightMode === 'full-draft'
    ? `> *Auto-generated (full-draft mode) — editorial inference, not confirmed.*\n\n`
    : `> *Based on the selected interpretation: **${POSITIONING_OPTIONS[choice - 1]?.label}***\n\n`;

  const templates: Record<number, string> = {
    1: `${prefix}Reading the homepage language across this period, the trajectory can be read as **moving upmarket** — from SMB/individual-friendly messaging toward enterprise and mid-market positioning.\n\n**${fmtMonth(diff.fromMonth)}:** "${fromH1}"\n\n**${fmtMonth(diff.toMonth)}:** "${toH1}"\n\nThe before headline is casual, outcome-oriented, and accessible. The after headline is formal, capability-led, and built for a buyer with a larger organisational scope. This pattern is consistent with SaaS companies that expand their enterprise motion by reworking their top-of-funnel language first.\n\n*This is interpretation, not confirmed strategy.*`,

    2: `${prefix}The homepage language evolution can be read as **moving downmarket** — introducing more self-serve, lower-friction messaging to capture smaller teams or individual users.\n\nThis can be a deliberate PLG expansion, a hedge against enterprise sales cycles, or a response to competitive pressure from simpler tools.\n\n*This is interpretation, not confirmed strategy.*`,

    3: `${prefix}The changes suggest an attempt to **address a new buyer persona** — one that may not have been the primary target of the previous messaging.\n\nThis type of homepage evolution is common when a SaaS company identifies an adjacent ICP that their current messaging fails to convert, and tests a broader or shifted value proposition at the top of the funnel.\n\n*This is interpretation, not confirmed strategy.*`,

    4: `${prefix}The changes appear to **reinforce existing positioning** rather than signal a pivot.\n\nThe core value proposition and target buyer appear consistent between periods. The observed changes are likely refinements — tighter copy, updated social proof, or A/B test winners — rather than a strategic repositioning.\n\n*This is interpretation, not confirmed strategy.*`,
  };

  return templates[choice] ?? '';
}

function learningText(choice: number, diff: DiffResult): string {
  const fromH1 = diff.fromText.h1?.[0] ?? '';
  const toH1 = diff.toText.h1?.[0] ?? '';

  const templates: Record<number, string> = {
    1: `**What you can study from the headline evolution:**\n\nThe shift from **"${fromH1}"** to **"${toH1}"** shows a deliberate move from action-oriented, self-referential language to outcome-and-capability language.\n\nIf your homepage headline still uses "you can" or "save time" framing, it may be worth testing whether your buyers respond better to capability claims tied to business outcomes. The most readable signal in this evolution is the removal of casual language and the introduction of superlatives — "world's deepest" — which is a bet that the segment cares more about vendor confidence than approachability.`,

    2: `**What you can study from the CTA changes:**\n\nAcross this period, the visible CTA language shifted in ways that reflect the broader positioning move. SaaS teams often underestimate how much CTA copy leaks positioning signals — "Start Your Free 30-Day Trial" says something different to a buyer than "Contact sales" or "See it in action".\n\nLook at which CTAs were added and removed in the fact section above. Each removed CTA is a hypothesis abandoned, and each added one is a hypothesis now being tested against real traffic.`,

    3: `**What you can study from the trust signal approach:**\n\nThe social proof and credibility signals on the page changed alongside the headline. The earlier period leaned on customer count and story-led case studies. The later version introduces award badges (G2 #1), enterprise-scale metrics, and category-level positioning claims.\n\nThis is a recognisable pattern: when moving upmarket, social proof shifts from "many people use us" to "the right kind of companies use us." If you are in the same transition, audit which social proof signals you are surfacing and ask who they are talking to.`,

    4: `**What you can study from the navigation changes:**\n\nNavigation structure is an underrated positioning signal. It tells a visitor — in two seconds — how the company thinks about itself and its buyer.\n\nThe nav changes in this period reflect the same pattern as the headline: more product-depth signalling, fewer self-serve entry points. SaaS teams that restructure nav as part of an enterprise push are essentially running an ICP filter at the top of the funnel — some visitors self-select out faster, while the target segment stays longer.`,
  };

  return templates[choice] ?? '';
}

function adsContextText(choice: number): string {
  const templates: Record<number, string> = {
    1: `*This section is speculative — paid ads data was not captured in this teardown.*\n\nThe homepage language shift is consistent with a **brand campaign repositioning** rather than direct-response performance marketing. When a SaaS company updates homepage headlines to match a new positioning narrative (enterprise, AI, business impact), it typically follows or accompanies a brand media push targeting the same audience.\n\nIf you have access to their Meta Ads Library or LinkedIn campaigns from this period, checking for creative alignment with the new headline framing would confirm or contradict this reading.`,

    2: `*This section is speculative — paid ads data was not captured in this teardown.*\n\nThe CTA and headline changes are consistent with a **performance marketing iteration** — testing new ad-to-landing-page message match, or adjusting the homepage to match a winning paid creative.\n\nPerformance-led homepage changes tend to tighten the headline-to-offer flow and reduce cognitive load between the ad click and the conversion action.`,
  };

  return templates[choice] ?? '';
}

function whatToCopyText(choice: number, diff: DiffResult): string {
  const templates: Record<number, string> = {
    1: `**What to consider adapting from the headline approach:**\n\nNot the exact words — but the structure. The evolved headline combines a primary outcome ("Drive real business impact") with a capability superlative ("world's deepest social intelligence and management platform").\n\nThis two-layer structure — outcome + differentiated capability — is worth testing if your current headline is either pure outcome ("grow faster") or pure feature-description ("all-in-one tool for X"). Combining both in one sentence signals both relevance and competitive confidence.`,

    2: `**What to consider adapting from the CTA strategy:**\n\nReview the CTA changes in the facts section. The pattern of what was added vs removed gives a signal about which conversion actions the team is prioritising at the time of each snapshot.\n\nSpecifically: if you see a shift from free-trial CTAs to demo/contact CTAs (or vice versa), that is a signal about ICP trust architecture — whether the team believes the product sells itself or whether a human needs to be involved before commitment.`,

    3: `**What to consider adapting from the trust signal approach:**\n\nThe category of social proof used tells you something about the buyer they are targeting. G2 badges signal category leader confidence. Customer count signals widespread adoption. Enterprise logo walls signal "we can handle your scale."\n\nIdentify which credibility signals you are currently leading with, who those signals speak to, and whether your target ICP would be more convinced by a different form of proof.`,

    4: `**What to consider adapting from the navigation structure:**\n\nNavigation is where most SaaS teams make implicit decisions about ICP without realising it. If your navigation is product-feature-led, you are implicitly asking visitors to self-identify their need. If it is use-case-led or role-led, you are guiding them.\n\nCompare the nav labels in the facts section above. The shift from feature-based nav to outcome-and-capability nav is a concrete pattern you can audit on your own site in an afternoon.`,
  };

  return templates[choice] ?? '';
}

// ─── Full MDX assembler ───────────────────────────────────────────────────────

export function buildMdx(opts: {
  companyName: string;
  slug: string;
  originalUrl: string;
  diff: DiffResult;
  choices: InterpretationChoices;
  insightMode: string;
  generatedAt: string;
}): string {
  const { companyName, slug, originalUrl, diff, choices, insightMode, generatedAt } = opts;
  const fromLabel = fmtMonth(diff.fromMonth);
  const toLabel = diff.toMonth === 'current' ? 'today' : fmtMonth(diff.toMonth);

  const title = `How ${companyName}'s homepage changed: ${fromLabel} vs ${toLabel}`;
  const description = `A CRO teardown of ${companyName}'s homepage evolution — factual diffs and ${insightMode === 'facts-only' ? 'no editorial interpretation' : 'selected interpretation'}.`;

  const sections: string[] = [];

  // Frontmatter
  sections.push(`---
title: "${title}"
description: "${description}"
publishedAt: "${generatedAt.slice(0, 10)}"
company: "${slug}"
originalUrl: "${originalUrl}"
compareFrom: "${diff.fromMonth}"
compareTo: "${diff.toMonth}"
insightMode: "${insightMode}"
---`);

  sections.push(`\n## Observed changes\n`);
  sections.push(factsSection(diff));

  // Interpretation sections — only for guided and full-draft
  if (insightMode !== 'facts-only') {
    sections.push(`\n---\n`);

    // CRO interpretation
    if (choices.croInterpretation !== null) {
      sections.push(`## CRO interpretation\n`);
      sections.push(croInterpretationText(choices.croInterpretation, diff, insightMode));
      sections.push('');
    }

    // Positioning shift
    if (choices.positioningShift !== null) {
      sections.push(`\n---\n`);
      sections.push(`## Likely positioning shift\n`);
      sections.push(positioningText(choices.positioningShift, diff, insightMode));
      sections.push('');
    }

    // Team learning
    if (choices.teamLearning !== null) {
      sections.push(`\n---\n`);
      sections.push(`## What SaaS teams can learn\n`);
      sections.push(learningText(choices.teamLearning, diff));
      sections.push('');
    }

    // Paid ads context (optional)
    if (choices.paidAdsContext !== null) {
      sections.push(`\n---\n`);
      sections.push(`## Paid ads context\n`);
      sections.push(adsContextText(choices.paidAdsContext));
      sections.push('');
    }

    // What to copy (optional)
    if (choices.whatToCopy !== null) {
      sections.push(`\n---\n`);
      sections.push(`## What to copy\n`);
      sections.push(whatToCopyText(choices.whatToCopy, diff));
      sections.push('');
    }
  }

  return sections.join('\n').replace(/\n{3,}/g, '\n\n');
}
