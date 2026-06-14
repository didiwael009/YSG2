/**
 * Pipeline order tests for compose-all-sections.ts.
 *
 * Parses the source file and asserts that the critical steps execute in the
 * correct order: visual analysis and context research must run BEFORE the
 * strategic shift detector, so the thesis has real business context.
 *
 * WHY source-parsing instead of mocking: compose-all-sections.ts is a CLI
 * entry-point, not a library. Mocking its internals would require refactoring
 * the file. Source-text position is a simpler, faster, equally precise signal.
 *
 * If you deliberately reorder steps, these tests will fail — that's the point.
 * Update the tests and commit the new expected order alongside the code change.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(
  resolve(dir, '../scripts/cro-teardown/compose-all-sections.ts'),
  'utf-8',
);

function pos(needle: string): number {
  const i = src.indexOf(needle);
  if (i === -1) throw new Error(`"${needle}" not found in compose-all-sections.ts`);
  return i;
}

describe('compose-all-sections.ts pipeline execution order', () => {
  it('runVisualAnalyzer is called before runStrategicShiftDetector', () => {
    expect(pos('await runVisualAnalyzer(')).toBeLessThan(pos('await runStrategicShiftDetector('));
  });

  it('runContextResearcher is called before runStrategicShiftDetector', () => {
    expect(pos('await runContextResearcher(')).toBeLessThan(pos('await runStrategicShiftDetector('));
  });

  it('runVisualAnalyzer is called before runContextResearcher', () => {
    expect(pos('await runVisualAnalyzer(')).toBeLessThan(pos('await runContextResearcher('));
  });

  it('runStrategicShiftDetector is called before generateBusinessContext', () => {
    expect(pos('await runStrategicShiftDetector(')).toBeLessThan(pos('await generateBusinessContext('));
  });

  it('runStrategicShiftDetector is called before runSeoIntentPlanner', () => {
    expect(pos('await runStrategicShiftDetector(')).toBeLessThan(pos('await runSeoIntentPlanner('));
  });

  it('runSeoIntentPlanner is called before runOutlineGenerator', () => {
    expect(pos('await runSeoIntentPlanner(')).toBeLessThan(pos('await runOutlineGenerator('));
  });

  it('all six expected runner calls are present', () => {
    const runners = [
      'await runVisualAnalyzer(',
      'await runContextResearcher(',
      'await runStrategicShiftDetector(',
      'await generateBusinessContext(',
      'await runSeoIntentPlanner(',
      'await runOutlineGenerator(',
    ];
    for (const r of runners) {
      expect(src.includes(r), `missing: ${r}`).toBe(true);
    }
  });
});
