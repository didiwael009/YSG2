/**
 * citation-resolver.ts
 *
 * Reads strategic-shift.json and maps the detected shift types to
 * 2-3 relevant book/source citations from the GTM + CRO reference library.
 * Writes citation-context.json to section-evidence/ so the section writers
 * for 06-lessons-for-saas-teams and 07-business-context can cite credibly.
 *
 * No LLM calls — this is a deterministic mapping step.
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';

// ─── Citation library (trimmed from gtm_cro_reference_library.md) ────────────

interface Source {
  id:              string;
  title:           string;
  author:          string;
  domain:          string;
  citationPattern: string;   // sentence template the writer can adapt
  concepts:        string[]; // keywords used for routing
}

const SOURCES: Source[] = [
  {
    id:              'SRC-001',
    title:           'Obviously Awesome',
    author:          'April Dunford',
    domain:          'Positioning',
    citationPattern: 'As Dunford describes in Obviously Awesome, [observation about positioning shift].',
    concepts:        ['positioning', 'icp', 'category', 'differentiation', 'competitive', 'framing', 'value prop', 'reposition'],
  },
  {
    id:              'SRC-012',
    title:           'Crossing the Chasm',
    author:          'Geoffrey Moore',
    domain:          'Market development',
    citationPattern: "Moore's whole-product model in Crossing the Chasm describes [observation about category or market expansion].",
    concepts:        ['category', 'market', 'expansion', 'platform', 'enterprise', 'mainstream', 'beachhead', 'ecosystem'],
  },
  {
    id:              'SRC-005',
    title:           'AI SaaS Founder Playbook',
    author:          'Operator field reports 2025–2026',
    domain:          'AI SaaS GTM',
    citationPattern: 'The AI SaaS Founder Playbook describes this pattern as [observation about AI positioning or platform moat].',
    concepts:        ['ai', 'agent', 'automation', 'platform', 'moat', 'infrastructure', 'tool', 'api'],
  },
  {
    id:              'SRC-004',
    title:           'The Sales Acceleration Formula',
    author:          'Mark Roberge',
    domain:          'Sales + demand gen',
    citationPattern: "Roberge's Sales Acceleration Formula identifies [observation about sales motion or funnel change].",
    concepts:        ['sales', 'demo', 'enterprise', 'inbound', 'motion', 'funnel', 'self-serve', 'plg', 'led'],
  },
  {
    id:              'SRC-011',
    title:           '$100M Offers',
    author:          'Alex Hormozi',
    domain:          'Offer design + pricing',
    citationPattern: 'Hormozi notes in $100M Offers that [observation about offer framing or value signal].',
    concepts:        ['offer', 'pricing', 'free', 'trial', 'value', 'framing', 'cta', 'premium'],
  },
  {
    id:              'SRC-008',
    title:           'Landing Page Playbook 2026',
    author:          'Wael Aouididi',
    domain:          'CRO',
    citationPattern: 'The Landing Page Playbook benchmark data shows [observation about CTA structure or conversion pattern].',
    concepts:        ['landing', 'cro', 'conversion', 'cta', 'above the fold', 'headline', 'copy', 'proof'],
  },
];

// ─── Routing ──────────────────────────────────────────────────────────────────

function scoreSource(source: Source, signals: string[]): number {
  const text = signals.join(' ').toLowerCase();
  return source.concepts.reduce((score, kw) => score + (text.includes(kw) ? 1 : 0), 0);
}

function pickCitations(signals: string[]): Source[] {
  const scored = SOURCES
    .map(s => ({ source: s, score: scoreSource(s, signals) }))
    .sort((a, b) => b.score - a.score);

  // Always include Obviously Awesome — it's the foundation for any positioning article
  const top = scored.slice(0, 4);
  const hasObviouslyAwesome = top.some(x => x.source.id === 'SRC-001');
  if (!hasObviouslyAwesome) {
    top[top.length - 1] = { source: SOURCES[0], score: 0 };
  }

  return top
    .filter(x => x.score > 0 || x.source.id === 'SRC-001')
    .slice(0, 3)
    .map(x => x.source);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface StrategicShift {
  central_thesis?:     string;
  positioning_shift?:  string;
  buyer_shift?:        string;
  sales_motion_shift?: string;
  category_shift?:     string;
  [key: string]: unknown;
}

export interface CitationContext {
  recommendedCitations: {
    id:              string;
    title:           string;
    author:          string;
    domain:          string;
    citationPattern: string;
  }[];
  usageInstruction: string;
  generatedAt:      string;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function resolveCitations(opts: {
  writingDir: string;
  force?:     boolean;
}): CitationContext | null {
  const outputPath = path.join(opts.writingDir, 'section-evidence', 'citation-context.json');

  if (!opts.force && fs.existsSync(outputPath)) {
    return JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as CitationContext;
  }

  const shiftPath = path.join(opts.writingDir, 'section-evidence', 'strategic-shift.json');
  if (!fs.existsSync(shiftPath)) return null;

  const shift = JSON.parse(fs.readFileSync(shiftPath, 'utf-8')) as StrategicShift;

  // Build signal text from all shift fields
  const signals: string[] = [
    shift.central_thesis     ?? '',
    shift.positioning_shift  ?? '',
    shift.buyer_shift        ?? '',
    shift.sales_motion_shift ?? '',
    shift.category_shift     ?? '',
  ].filter(Boolean);

  const citations = pickCitations(signals);

  const result: CitationContext = {
    recommendedCitations: citations.map(c => ({
      id:              c.id,
      title:           c.title,
      author:          c.author,
      domain:          c.domain,
      citationPattern: c.citationPattern,
    })),
    usageInstruction:
      'Use 1-2 of these citations naturally — embedded in a sentence, not listed separately. ' +
      'Format: "As [Author] notes in [Title], ..." or "This is consistent with [Author]\'s framework in [Title]." ' +
      'Never invent citations. Only cite sources listed here.',
    generatedAt: new Date().toISOString(),
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  return result;
}
