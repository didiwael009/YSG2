/**
 * Schema validation tests for the three core pipeline JSON artifacts.
 *
 * These tests load golden fixtures (from the Foreplay teardown run) and assert
 * that every required field is present and has the right type/enum value.
 *
 * WHY: the pipeline parses these files at runtime with no schema enforcement.
 * A prompt change that drops a field or returns a different enum value will
 * silently produce garbage output. These tests catch that before a real run.
 *
 * To update fixtures after an intentional schema change:
 *   cp data/cro-teardowns/<slug>/writing/section-evidence/<file>.json tests/fixtures/
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const fix = (name: string) =>
  JSON.parse(readFileSync(join(dir, 'fixtures', name), 'utf-8')) as Record<string, unknown>;

// ── enum sets (mirrors the TypeScript interfaces) ─────────────────────────────

const STAGE          = ['seed', 'early-growth', 'growth', 'scale', 'public', 'unknown'];
const CONFIDENCE     = ['high', 'medium', 'low'];
const EVENT_TYPE     = ['funding', 'product-launch', 'rebrand', 'competitor-move', 'category-shift', 'hiring', 'other'];
const DESIGN_ERA     = ['early-startup', 'growth', 'mature', 'enterprise'];
const LAYOUT_TYPE    = ['centered-hero', 'multi-column', 'full-bleed', 'minimal', 'other'];
const PROOF_DENSITY  = ['none', 'low', 'medium', 'high'];
const MESSAGE_TYPE   = ['feature', 'outcome', 'category', 'story', 'credibility'];
const BRAND_MATURITY = ['early', 'developing', 'polished', 'enterprise-grade'];

// ── business-context-research.json ───────────────────────────────────────────

describe('business-context-research.json', () => {
  const d = fix('business-context-research.json');

  it('has required string fields', () => {
    for (const f of ['company_stage_start', 'company_stage_end', 'category_context',
                     'icp_evolution', 'confidence_level', 'generatedAt', 'model']) {
      expect(typeof d[f], f).toBe('string');
    }
  });

  it('costUsd is a non-negative number', () => {
    expect(typeof d.costUsd).toBe('number');
    expect(d.costUsd as number).toBeGreaterThanOrEqual(0);
  });

  it('company stages are valid enum values', () => {
    expect(STAGE).toContain(d.company_stage_start);
    expect(STAGE).toContain(d.company_stage_end);
  });

  it('confidence_level is a valid enum value', () => {
    expect(CONFIDENCE).toContain(d.confidence_level);
  });

  it('key_events is a non-empty array with valid items', () => {
    expect(Array.isArray(d.key_events)).toBe(true);
    const events = d.key_events as Array<Record<string, unknown>>;
    expect(events.length).toBeGreaterThan(0);
    for (const ev of events) {
      expect(typeof ev.period, 'period').toBe('string');
      expect(EVENT_TYPE, `type "${ev.type}"`).toContain(ev.type);
      expect(typeof ev.summary, 'summary').toBe('string');
      expect((ev.summary as string).length).toBeGreaterThan(0);
    }
  });

  it('notable_competitors is an array of strings', () => {
    expect(Array.isArray(d.notable_competitors)).toBe(true);
    for (const c of d.notable_competitors as unknown[]) {
      expect(typeof c).toBe('string');
    }
  });

  it('category_context and icp_evolution are non-empty', () => {
    expect((d.category_context as string).length).toBeGreaterThan(0);
    expect((d.icp_evolution as string).length).toBeGreaterThan(0);
  });
});

// ── visual-analysis.json ─────────────────────────────────────────────────────

describe('visual-analysis.json', () => {
  const d = fix('visual-analysis.json');

  it('has required top-level string fields', () => {
    for (const f of ['visual_shift_summary', 'design_evolution_label', 'generatedAt', 'model']) {
      expect(typeof d[f], f).toBe('string');
      expect((d[f] as string).length, f).toBeGreaterThan(0);
    }
  });

  it('costUsd is a non-negative number', () => {
    expect(typeof d.costUsd).toBe('number');
    expect(d.costUsd as number).toBeGreaterThanOrEqual(0);
  });

  it('snapshots is a non-empty array', () => {
    expect(Array.isArray(d.snapshots)).toBe(true);
    expect((d.snapshots as unknown[]).length).toBeGreaterThan(0);
  });

  it('each snapshot has valid fields', () => {
    const snapshots = d.snapshots as Array<Record<string, unknown>>;
    for (const s of snapshots) {
      expect(typeof s.month, 'month').toBe('string');
      expect(/^\d{4}-\d{2}$/.test(s.month as string), `month format "${s.month}"`).toBe(true);
      expect(DESIGN_ERA, `design_era "${s.design_era}"`).toContain(s.design_era);
      expect(LAYOUT_TYPE, `layout_type "${s.layout_type}"`).toContain(s.layout_type);
      expect(typeof s.above_fold_structure, 'above_fold_structure').toBe('string');
      expect(PROOF_DENSITY, `proof_density "${s.proof_density}"`).toContain(s.proof_density);
      expect(MESSAGE_TYPE, `primary_message_type "${s.primary_message_type}"`).toContain(s.primary_message_type);
      expect([1, 2, 3, 4, 5], `visual_sophistication "${s.visual_sophistication}"`).toContain(s.visual_sophistication);
      expect(BRAND_MATURITY, `brand_maturity "${s.brand_maturity}"`).toContain(s.brand_maturity);
    }
  });
});

// ── strategic-shift.json ─────────────────────────────────────────────────────

describe('strategic-shift.json', () => {
  const d = fix('strategic-shift.json');

  it('has required narrative string fields', () => {
    for (const f of [
      'central_thesis', 'old_positioning_frame', 'new_positioning_frame',
      'buyer_shift', 'funnel_shift', 'copy_this_if', 'do_not_copy_this_if',
      'safer_version_for_early_stage_saas', 'risk_if_copied',
      'generatedAt', 'model',
    ]) {
      expect(typeof d[f], f).toBe('string');
      expect((d[f] as string).length, `${f} must not be empty`).toBeGreaterThan(0);
    }
  });

  it('confidence_level is a valid enum value', () => {
    expect(CONFIDENCE).toContain(d.confidence_level);
  });

  it('costUsd is a non-negative number', () => {
    expect(typeof d.costUsd).toBe('number');
    expect(d.costUsd as number).toBeGreaterThanOrEqual(0);
  });

  it('main_evidence is a non-empty array with valid items', () => {
    expect(Array.isArray(d.main_evidence)).toBe(true);
    const evidence = d.main_evidence as Array<Record<string, unknown>>;
    expect(evidence.length).toBeGreaterThan(0);
    for (const ev of evidence) {
      for (const f of ['element', 'old', 'new', 'meaning']) {
        expect(typeof ev[f], `evidence.${f}`).toBe('string');
      }
    }
  });

  it('central_thesis is substantive (>100 chars)', () => {
    expect((d.central_thesis as string).length).toBeGreaterThan(100);
  });
});
