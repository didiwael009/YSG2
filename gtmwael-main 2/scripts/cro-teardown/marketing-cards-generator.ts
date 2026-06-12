/**
 * marketing-cards-generator.ts — Phase 4C: Marketing signal "At a glance" cards.
 *
 * Generates 4 marketing-lens cards from strategic-shift.json + evidence-pack.json.
 * Replaces the technical counts (H1 rewritten, nav count) with positioning signals
 * that help prospects understand the marketing story, not the diff report.
 *
 * Cards (deterministic, no LLM required for cards 1–3):
 *   1. Positioning shift   — old_positioning_frame → new_positioning_frame
 *   2. Target buyer        — buyer_shift from strategic-shift.json
 *   3. Sales motion        — inferred from CTA diff (free-trial removed / demo added)
 *   4. Design era          — from visual-analysis.json if available, else period fallback
 *
 * CLI (standalone):
 *   npm run cro-teardown:marketing-cards -- --slug clay [--force]
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MarketingCard {
  label: string;
  value: string;
  note?: string;
}

interface StrategicShift {
  central_thesis?:        string;
  old_positioning_frame?: string;
  new_positioning_frame?: string;
  buyer_shift?:           string;
  funnel_shift?:          string;
  confidence_level?:      string;
}

interface EvidencePack {
  companyName?: string;
  fromMonth?:   string;
  toMonth?:     string;
  snapshots?:   unknown[];
  ctaAdded?:    string[];
  ctaRemoved?:  string[];
}

interface VisualAnalysis {
  design_evolution_label?: string;
  visual_shift_summary?:   string;
  snapshots?: { design_era?: string; brand_maturity?: string }[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Shorten a positioning frame to ≤40 chars for the card value. */
function shorten(text: string, maxLen = 40): string {
  if (!text) return '';
  const clean = text.replace(/^["']|["']$/g, '').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 1) + '…';
}

/** Detect sales-motion shift from CTA diff arrays. */
function detectSalesMotion(
  ctaAdded: string[],
  ctaRemoved: string[],
  funnelShift: string,
): { value: string; note: string } {
  const addedLower  = ctaAdded.map(c => c.toLowerCase());
  const removedLower = ctaRemoved.map(c => c.toLowerCase());

  const hadFreeTrial   = removedLower.some(c => c.includes('free') || c.includes('trial') || c.includes('sign up'));
  const addedDemo      = addedLower.some(c => c.includes('demo') || c.includes('book') || c.includes('talk') || c.includes('contact sales'));
  const addedFreeTrial = addedLower.some(c => c.includes('free') || c.includes('trial') || c.includes('sign up'));
  const removedDemo    = removedLower.some(c => c.includes('demo') || c.includes('book') || c.includes('contact sales'));

  if (hadFreeTrial && addedDemo) {
    return {
      value: 'PLG → Sales-led',
      note:  'Free trial removed; demo/book CTA added',
    };
  }
  if (addedFreeTrial && removedDemo) {
    return {
      value: 'Sales-led → PLG',
      note:  'Demo removed; self-serve trial CTA added',
    };
  }
  if (funnelShift && funnelShift.length > 0) {
    return {
      value: shorten(funnelShift, 36),
      note:  'From strategic shift analysis',
    };
  }
  return {
    value: 'Unchanged',
    note:  'No clear sales-motion shift detected in CTA diff',
  };
}

// ─── Card builder ─────────────────────────────────────────────────────────────

export function buildMarketingCards(opts: {
  shift:         StrategicShift;
  evidencePack:  EvidencePack;
  visual?:       VisualAnalysis | null;
}): MarketingCard[] {
  const { shift, evidencePack, visual } = opts;

  const cards: MarketingCard[] = [];

  // ── Card 1: Positioning shift ─────────────────────────────────────────────
  const oldPos = shift.old_positioning_frame ?? '';
  const newPos = shift.new_positioning_frame ?? '';
  if (oldPos || newPos) {
    cards.push({
      label: 'Positioning shift',
      value: `${shorten(oldPos, 18)} → ${shorten(newPos, 18)}`,
      note:  shift.central_thesis ? shorten(shift.central_thesis, 70) : undefined,
    });
  } else {
    cards.push({
      label: 'Positioning shift',
      value: 'See analysis',
      note:  shift.central_thesis ? shorten(shift.central_thesis, 70) : undefined,
    });
  }

  // ── Card 2: Target buyer ───────────────────────────────────────────────────
  const buyerShift = shift.buyer_shift ?? '';
  cards.push({
    label: 'Target buyer',
    value: buyerShift ? shorten(buyerShift, 40) : 'See buyer shift analysis',
    note:  'Inferred from messaging + CTA changes',
  });

  // ── Card 3: Sales motion ───────────────────────────────────────────────────
  const motion = detectSalesMotion(
    evidencePack.ctaAdded  ?? [],
    evidencePack.ctaRemoved ?? [],
    shift.funnel_shift ?? '',
  );
  cards.push({
    label: 'Sales motion',
    value: motion.value,
    note:  motion.note,
  });

  // ── Card 4: Design era (visual-analysis or period fallback) ───────────────
  if (visual?.design_evolution_label) {
    const firstSnap  = visual.snapshots?.[0];
    const lastSnap   = visual.snapshots?.[visual.snapshots.length - 1];
    const eraShift   = firstSnap?.brand_maturity && lastSnap?.brand_maturity
      ? `${firstSnap.brand_maturity} → ${lastSnap.brand_maturity}`
      : visual.design_evolution_label;
    cards.push({
      label: 'Design evolution',
      value: eraShift,
      note:  visual.visual_shift_summary ? shorten(visual.visual_shift_summary, 70) : undefined,
    });
  } else {
    const count = (evidencePack.snapshots ?? []).length;
    const from  = evidencePack.fromMonth ?? '';
    const to    = evidencePack.toMonth ?? '';
    const periodNote = from && to ? `${from} → ${to}` : undefined;
    cards.push({
      label: 'Coverage',
      value: `${count} snapshot${count !== 1 ? 's' : ''}`,
      note:  periodNote,
    });
  }

  return cards;
}

// ─── Runner ───────────────────────────────────────────────────────────────────

export async function runMarketingCardsGenerator(opts: {
  slug:       string;
  writingDir: string;
  force?:     boolean;
}): Promise<{ cards: MarketingCard[]; skipped: boolean; outputPath: string }> {
  const { slug, writingDir, force } = opts;
  const outputPath = path.join(writingDir, 'section-evidence', 'marketing-summary-cards.json');

  if (!force && fs.existsSync(outputPath)) {
    const cached = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as MarketingCard[];
    return { cards: cached, skipped: true, outputPath };
  }

  const shiftPath = path.join(writingDir, 'section-evidence', 'strategic-shift.json');
  if (!fs.existsSync(shiftPath)) {
    throw new Error(
      `strategic-shift.json not found for slug "${slug}". Run Layer 3 first:\n` +
      `  npm run cro-teardown:strategic-shift -- --slug ${slug}`,
    );
  }

  const shift: StrategicShift        = JSON.parse(fs.readFileSync(shiftPath, 'utf-8'));
  const epPath                        = path.join(writingDir, 'evidence-pack.json');
  const evidencePack: EvidencePack    = fs.existsSync(epPath)
    ? JSON.parse(fs.readFileSync(epPath, 'utf-8'))
    : {};

  const visualPath                    = path.join(writingDir, 'section-evidence', 'visual-analysis.json');
  const visual: VisualAnalysis | null = fs.existsSync(visualPath)
    ? JSON.parse(fs.readFileSync(visualPath, 'utf-8'))
    : null;

  const cards = buildMarketingCards({ shift, evidencePack, visual });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2), 'utf-8');

  return { cards, skipped: false, outputPath };
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

const isMain = process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  const args  = process.argv.slice(2);
  let slug    = '';
  let force   = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--slug' && args[i + 1]) { slug = args[++i]; }
    else if (args[i] === '--force') { force = true; }
  }

  if (!slug) {
    console.error('Usage: marketing-cards-generator.ts --slug <slug> [--force]');
    process.exit(1);
  }

  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');

  runMarketingCardsGenerator({ slug, writingDir, force })
    .then(result => {
      if (result.skipped) {
        console.log(`⏭  Skipped (cached). Use --force to regenerate.`);
      } else {
        console.log(`✅  Generated ${result.cards.length} marketing cards → ${result.outputPath}`);
        for (const c of result.cards) {
          console.log(`   ${c.label}: ${c.value}${c.note ? ` (${c.note})` : ''}`);
        }
      }
    })
    .catch(err => { console.error('❌', err); process.exit(1); });
}
