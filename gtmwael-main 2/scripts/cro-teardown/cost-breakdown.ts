#!/usr/bin/env tsx
/**
 * CRO Teardown — Cost Breakdown Report
 *
 * Reads all pipeline logs for a given slug and produces a cost-breakdown.json
 * with full role/section/waste analysis.
 *
 * Usage: npm run cro-teardown:cost-breakdown -- --slug <slug>
 * Output: data/cro-teardowns/<slug>/writing/cost-breakdown.json
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const slugIdx = args.indexOf('--slug');
if (slugIdx === -1 || !args[slugIdx + 1]) {
  console.error('Usage: cost-breakdown.ts --slug <slug>');
  process.exit(1);
}
const slug = args[slugIdx + 1];

// ─── Paths ────────────────────────────────────────────────────────────────────

const DATA_ROOT = path.resolve(process.cwd(), 'data/cro-teardowns', slug, 'writing');
const OUT_PATH  = path.join(DATA_ROOT, 'cost-breakdown.json');

function loadJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T; }
  catch { return null; }
}

// ─── Input types ──────────────────────────────────────────────────────────────

interface RawLogEntry {
  step:      string;
  section?:  string;
  ok:        boolean;
  detail?:   string;
  ts:        string;
}

interface CostReportCall {
  model:          string;
  role:           string;   // writer | critic-v1 | critic-v2 | rewriter-v2 | final-judge | seo-auditor
  inputTokens:    number;
  outputTokens:   number;
  inputCostUsd:   number;
  outputCostUsd:  number;
  totalCostUsd:   number;
  timestamp:      string;
}

interface CostReportFile {
  slug:          string;
  section:       string;
  calls:         CostReportCall[];
  totalCostUsd:  number;
  generatedAt:   string;
}

interface QualitySummary {
  sections: Array<{
    sectionId:     string;
    finalScore:    number;
    passed:        boolean;
    loopsUsed:     number;
    sectionCostUsd?: number;
  }>;
  finalJudgeScore?:  number;
  finalJudgePass?:   boolean;
  seoScore?:         number;
  seoPass?:          boolean;
  articleWordCount?: number;
}

// ─── Canonical call record ────────────────────────────────────────────────────

type Role = 'writer' | 'critic' | 'rewriter' | 'finalJudge' | 'seoAudit';

interface Call {
  role:              Role;
  sectionId:         string | null;  // null for final judge / SEO
  model:             string;
  inputTokens:       number | null;
  outputTokens:      number | null;
  cost:              number;
  ts:                string;
  runId:             number;
  isTruncationError: boolean;
  score:             number | null;
  isPass:            boolean | null;
  rewriteVersion:    number | null;  // 1 = v1, 2 = v2 rewrite, etc.
  source:            'cost-report' | 'run-log';
  reason:            string;         // human label for expensiveCalls
}

// ─── Role detection ───────────────────────────────────────────────────────────

function detectRole(step: string): Role | null {
  const s = step.toLowerCase();
  if (s.startsWith('writer →') || s === 'writer v1') return 'writer';
  if (s.startsWith('rewriter →')) return 'rewriter';
  // critic, section error, rerun error
  if (s.startsWith('critic') || s === 'section error' || s === 'rerun error') return 'critic';
  if (s.includes('final judge') || s === 'final judge') return 'finalJudge';
  if (s.includes('seo audit') || s.includes('seo-auditor') || s.includes('seo auditor')) return 'seoAudit';
  return null;
}

function normaliseCostReportRole(r: string): Role {
  if (r.startsWith('writer'))     return 'writer';
  if (r.startsWith('rewriter'))   return 'rewriter';
  if (r.startsWith('critic'))     return 'critic';
  if (r === 'final-judge')        return 'finalJudge';
  if (r === 'seo-auditor')        return 'seoAudit';
  return 'writer';
}

// ─── Parse cost-report files ──────────────────────────────────────────────────

function parseCostReport(report: CostReportFile, defaultSectionId: string | null): Call[] {
  // Map section from cost-report metadata: if "rerun" or "full", sectionId is null per call
  // For single-section reports, sectionId = that section for writer/critic/rewriter calls
  const isSingleSection =
    report.section !== 'rerun' &&
    report.section !== 'full' &&
    report.section !== 'all';

  const calls: Call[] = [];
  let rewriteVersion = 1;

  for (const c of report.calls) {
    const role = normaliseCostReportRole(c.role);

    // section attribution
    let sectionId: string | null = null;
    if (role !== 'finalJudge' && role !== 'seoAudit') {
      sectionId = isSingleSection ? report.section : defaultSectionId;
    }

    // version tracking: each writer starts a new v-sequence
    if (role === 'writer') rewriteVersion = 1;
    else if (role === 'rewriter') rewriteVersion++;

    // parse version from role string e.g. "critic-v2"
    const vMatch = c.role.match(/v(\d+)/);
    const rv = vMatch ? parseInt(vMatch[1], 10) : (role === 'writer' ? 1 : rewriteVersion);

    // human reason label
    const reason = buildReason(role, rv, c.inputTokens, c.outputTokens, false);

    calls.push({
      role,
      sectionId,
      model:             c.model,
      inputTokens:       c.inputTokens,
      outputTokens:      c.outputTokens,
      cost:              c.totalCostUsd,
      ts:                c.timestamp,
      runId:             -1,          // will be fixed after merge
      isTruncationError: false,
      score:             null,
      isPass:            null,
      rewriteVersion:    rv,
      source:            'cost-report',
      reason,
    });
  }
  return calls;
}

function buildReason(
  role: Role, version: number | null, inTok: number | null,
  outTok: number | null, isTrunc: boolean,
): string {
  if (isTrunc) return `critic v${version ?? '?'} — truncated (JSON cut before closing brace)`;
  if (role === 'writer')     return version && version > 1 ? `writer v${version} (re-attempt after judge rerun)` : 'initial writer';
  if (role === 'rewriter')   return `rewriter v${version ?? '?'} (loop ${(version ?? 1) - 1})`;
  if (role === 'critic') {
    const out = outTok ?? 0;
    if (out > 6000) return `critic v${version ?? '?'} — verbose response (${out} output tokens)`;
    return `critic v${version ?? '?'}`;
  }
  if (role === 'finalJudge') return 'final judge';
  if (role === 'seoAudit')   return 'SEO auditor';
  return role;
}

// ─── Parse run-log ────────────────────────────────────────────────────────────
//
// Dollar amounts in section-loop steps (writer/rewriter/critic) are CUMULATIVE
// within a run segment. Final-judge and SEO-audit dollar amounts are PER-CALL.
//
// A new run segment starts when the cumulative value drops by >50% from the
// previous maximum seen in the current segment.

function parseRunLog(entries: RawLogEntry[]): Call[] {
  const calls: Call[] = [];

  let runId = 0;
  let prevCumul = 0;
  let maxCumulInRun = 0;
  let currentSection: string | null = null;

  const STANDALONE_ROLES = new Set<Role>(['finalJudge', 'seoAudit']);

  for (const entry of entries) {
    const detail = entry.detail ?? '';
    const stepLower = entry.step.toLowerCase();

    // Update section context from entry.section field
    if (entry.section) {
      currentSection = entry.section;
    }

    // Flag truncation errors (no dollar in these — just flag them for wasteSignals)
    const isTruncation =
      entry.step === 'SECTION ERROR' ||
      entry.step === 'RERUN ERROR' ||
      (entry.step === 'final judge' && detail.includes('Could not extract JSON'));

    // Extract dollar amount
    const dollarMatch = detail.match(/\$(\d+\.\d+)/);
    if (!dollarMatch) {
      // No cost recorded — but record truncation events for waste detection
      if (isTruncation) {
        const role = detectRole(entry.step) ?? 'critic';
        const vMatch = detail.match(/v(\d+)/i);
        const rv = vMatch ? parseInt(vMatch[1], 10) : null;
        calls.push({
          role,
          sectionId: entry.section ?? currentSection,
          model: 'claude-sonnet-4-5',
          inputTokens: null,
          outputTokens: null,
          cost: 0,         // cost unknown — absorbed in next delta
          ts: entry.ts,
          runId,
          isTruncationError: true,
          score: null,
          isPass: false,
          rewriteVersion: rv,
          source: 'run-log',
          reason: buildReason('critic', rv, null, null, true),
        });
      }
      continue;
    }

    const amount = parseFloat(dollarMatch[1]);
    const role = detectRole(entry.step);
    if (!role) continue;

    const isStandalone = STANDALONE_ROLES.has(role);

    if (isStandalone) {
      // Per-call cost — record directly
      const scoreMatch = detail.match(/score (\d+)\/100/);
      const isPass = detail.includes('PASS') ? true : detail.includes('FAIL') ? false : null;

      calls.push({
        role,
        sectionId: null,
        model: 'claude-sonnet-4-5',
        inputTokens: null,
        outputTokens: null,
        cost: amount,
        ts: entry.ts,
        runId,
        isTruncationError: false,
        score: scoreMatch ? parseInt(scoreMatch[1], 10) : null,
        isPass,
        rewriteVersion: null,
        source: 'run-log',
        reason: role === 'seoAudit' ? 'SEO auditor' : 'final judge',
      });
      continue;
    }

    // Cumulative — detect run boundary
    if (amount < prevCumul * 0.5 && prevCumul > 0.01) {
      runId++;
      prevCumul = 0;
      maxCumulInRun = 0;
    }

    const perCallCost = Math.max(0, amount - prevCumul);
    prevCumul = amount;
    maxCumulInRun = Math.max(maxCumulInRun, amount);

    if (perCallCost < 0.0001) continue; // skip zero-delta entries

    // Extract token counts (writer/rewriter detail: "N in / M out")
    const tokenMatch = detail.match(/(\d+) in \/ (\d+) out/);
    const inputTokens  = tokenMatch ? parseInt(tokenMatch[1], 10) : null;
    const outputTokens = tokenMatch ? parseInt(tokenMatch[2], 10) : null;

    // Extract score
    const scoreMatch = detail.match(/score (\d+)\/100/);
    const score  = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
    const isPass = detail.includes('PASS') ? true : detail.includes('FAIL') ? false : null;

    // Extract version from step name
    const vMatch = entry.step.match(/v(\d+)/i);
    const rewriteVersion = vMatch ? parseInt(vMatch[1], 10) : (role === 'writer' ? 1 : null);

    calls.push({
      role,
      sectionId: entry.section ?? currentSection,
      model: 'claude-sonnet-4-5',
      inputTokens,
      outputTokens,
      cost: perCallCost,
      ts: entry.ts,
      runId,
      isTruncationError: false,
      score,
      isPass,
      rewriteVersion,
      source: 'run-log',
      reason: buildReason(role, rewriteVersion, inputTokens, outputTokens, false),
    });
  }

  return calls;
}

// ─── Merge & deduplicate ──────────────────────────────────────────────────────
// Cost-report data takes precedence over run-log data when timestamps match (±15s).

function mergeCalls(runLogCalls: Call[], costReportCalls: Call[]): Call[] {
  const WINDOW_MS = 15_000;

  // Build a set of timestamps (ms) from cost-report calls
  const crTsSet = new Set(costReportCalls.map(c => new Date(c.ts).getTime()));

  // Filter run-log calls that don't overlap with cost-report timestamps
  const filteredRunLog = runLogCalls.filter(c => {
    const ts = new Date(c.ts).getTime();
    for (const crTs of crTsSet) {
      if (Math.abs(ts - crTs) < WINDOW_MS) return false;
    }
    return true;
  });

  // Assign runIds to cost-report calls based on ordering
  // Cost-report runs come after the main run-log runs
  const maxRunId = filteredRunLog.reduce((m, c) => Math.max(m, c.runId), 0);
  let crRunId = maxRunId + 1;
  let prevCrTs = 0;
  const crWithRunIds = costReportCalls.map(c => {
    const ts = new Date(c.ts).getTime();
    if (prevCrTs > 0 && ts - prevCrTs > 5 * 60_000) crRunId++; // >5 min gap = new run
    prevCrTs = ts;
    return { ...c, runId: crRunId };
  });

  return [...filteredRunLog, ...crWithRunIds].sort(
    (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime(),
  );
}

// ─── Aggregation helpers ──────────────────────────────────────────────────────

interface RoleStats { calls: number; cost: number; percent: number; }

function buildByRole(calls: Call[], total: number): Record<Role, RoleStats> {
  const map: Record<Role, RoleStats> = {
    writer:     { calls: 0, cost: 0, percent: 0 },
    critic:     { calls: 0, cost: 0, percent: 0 },
    rewriter:   { calls: 0, cost: 0, percent: 0 },
    finalJudge: { calls: 0, cost: 0, percent: 0 },
    seoAudit:   { calls: 0, cost: 0, percent: 0 },
  };
  for (const c of calls) {
    map[c.role].calls++;
    map[c.role].cost += c.cost;
  }
  for (const r of Object.keys(map) as Role[]) {
    map[r].percent = total > 0 ? Math.round((map[r].cost / total) * 1000) / 10 : 0;
    map[r].cost = Math.round(map[r].cost * 100000) / 100000;
  }
  return map;
}

interface SectionStats {
  sectionId:    string;
  totalCost:    number;
  writerCost:   number;
  criticCost:   number;
  rewriterCost: number;
  calls:        number;
  rewriteCount: number;
  finalScore:   number | null;
  pass:         boolean | null;
}

function buildBySection(calls: Call[], quality: QualitySummary | null): SectionStats[] {
  const map = new Map<string, SectionStats>();

  for (const c of calls) {
    if (!c.sectionId) continue;
    if (!map.has(c.sectionId)) {
      map.set(c.sectionId, {
        sectionId:    c.sectionId,
        totalCost:    0,
        writerCost:   0,
        criticCost:   0,
        rewriterCost: 0,
        calls:        0,
        rewriteCount: 0,
        finalScore:   null,
        pass:         null,
      });
    }
    const s = map.get(c.sectionId)!;
    s.totalCost += c.cost;
    s.calls++;
    if (c.role === 'writer')   s.writerCost   += c.cost;
    if (c.role === 'critic')   s.criticCost   += c.cost;
    if (c.role === 'rewriter') { s.rewriterCost += c.cost; s.rewriteCount++; }
  }

  // Overlay quality summary scores
  if (quality?.sections) {
    for (const qs of quality.sections) {
      const s = map.get(qs.sectionId);
      if (s) {
        s.finalScore = qs.finalScore;
        s.pass       = qs.passed;
      }
    }
  }

  // Round costs
  const result = [...map.values()].map(s => ({
    ...s,
    totalCost:    Math.round(s.totalCost    * 100000) / 100000,
    writerCost:   Math.round(s.writerCost   * 100000) / 100000,
    criticCost:   Math.round(s.criticCost   * 100000) / 100000,
    rewriterCost: Math.round(s.rewriterCost * 100000) / 100000,
  }));

  return result.sort((a, b) => b.totalCost - a.totalCost);
}

// ─── Waste detection ──────────────────────────────────────────────────────────

interface WasteSignal {
  type: 'rewrite_loop' | 'critic_truncation' | 'repeated_judge' | 'failed_section' | 'verbose_output' | 'redundant_seo_audit';
  sectionId:            string | null;
  estimatedWasteCost:   number;
  note:                 string;
}

function detectWaste(calls: Call[], quality: QualitySummary | null): WasteSignal[] {
  const signals: WasteSignal[] = [];

  // 1. Critic truncations
  const truncations = calls.filter(c => c.isTruncationError);
  if (truncations.length > 0) {
    // Group by section
    const bySec = new Map<string, number>();
    for (const t of truncations) {
      const k = t.sectionId ?? '(none)';
      bySec.set(k, (bySec.get(k) ?? 0) + 1);
    }
    for (const [sec, count] of bySec) {
      // Estimate: each truncation consumed ~1500 output tokens + 3300 input tokens
      // at claude-sonnet-4-5 rates ($3/Mtok in, $15/Mtok out):
      // = 3300*3/1e6 + 1500*15/1e6 ≈ $0.0099 + $0.0225 = $0.0324 each
      const estCost = Math.round(count * 0.032 * 100000) / 100000;
      signals.push({
        type:                'critic_truncation',
        sectionId:           sec === '(none)' ? null : sec,
        estimatedWasteCost:  estCost,
        note:                `${count} critic JSON truncation(s) — response cut before closing brace. Tokens consumed but output unparseable. Fixed by Phase 4N reliability patch.`,
      });
    }
  }

  // 2. Rewrite loops that didn't improve score past threshold
  const sectionRewrites = new Map<string, { loops: number; cost: number; passed: boolean }>();
  for (const c of calls) {
    if (c.role !== 'rewriter' || !c.sectionId) continue;
    const k = c.sectionId;
    if (!sectionRewrites.has(k)) sectionRewrites.set(k, { loops: 0, cost: 0, passed: false });
    const r = sectionRewrites.get(k)!;
    r.loops++;
    r.cost += c.cost;
  }
  // Find matching critic costs for those sections
  for (const c of calls) {
    if (c.role !== 'critic' || !c.sectionId) continue;
    const k = c.sectionId;
    if (sectionRewrites.has(k)) {
      sectionRewrites.get(k)!.cost += c.cost;
    }
  }
  // overlay pass info
  if (quality?.sections) {
    for (const qs of quality.sections) {
      if (sectionRewrites.has(qs.sectionId)) {
        sectionRewrites.get(qs.sectionId)!.passed = qs.passed;
      }
    }
  }
  for (const [sec, r] of sectionRewrites) {
    if (r.loops === 0) continue;
    if (!r.passed) {
      // loops ran but section still failed → all rewriter cost is waste
      signals.push({
        type:                'rewrite_loop',
        sectionId:           sec,
        estimatedWasteCost:  Math.round(r.cost * 100000) / 100000,
        note:                `${r.loops} rewrite loop(s) for section "${sec}" — section still failed critic after all loops. Rewriter+critic cost incurred without quality improvement.`,
      });
    } else if (r.loops >= 2) {
      // Multiple loops to converge — only the excess loops are waste
      // (1 loop may be justified, 2+ may not be)
      const estWaste = Math.round((r.cost / r.loops) * (r.loops - 1) * 100000) / 100000;
      signals.push({
        type:                'rewrite_loop',
        sectionId:           sec,
        estimatedWasteCost:  estWaste,
        note:                `${r.loops} rewrite loops needed for section "${sec}" to pass. ${r.loops - 1} excess loop(s) represent avoidable cost if writer prompt produced a better first draft.`,
      });
    }
  }

  // 3. Repeated final-judge calls (only 1 should be needed on the winning run)
  const judges = calls.filter(c => c.role === 'finalJudge');
  const successfulJudges = judges.filter(c => c.isPass === true);
  if (judges.length > 1) {
    const excessJudges = judges.length - 1;
    const excessCost = judges
      .filter(c => c.isPass !== true)
      .reduce((s, c) => s + c.cost, 0);
    signals.push({
      type:                'repeated_judge',
      sectionId:           null,
      estimatedWasteCost:  Math.round(excessCost * 100000) / 100000,
      note:                `Final judge called ${judges.length} times (${successfulJudges.length} passed). ${excessJudges} unnecessary judge call(s) on incomplete or failing article states — judge should run only once after all sections converge.`,
    });
  }

  // 4. Redundant SEO audits (only the final one needed)
  const seoAudits = calls.filter(c => c.role === 'seoAudit');
  if (seoAudits.length > 1) {
    const excessCost = seoAudits
      .slice(0, -1)
      .reduce((s, c) => s + c.cost, 0);
    signals.push({
      type:                'redundant_seo_audit',
      sectionId:           null,
      estimatedWasteCost:  Math.round(excessCost * 100000) / 100000,
      note:                `SEO audit called ${seoAudits.length} times (once per assembly). Only the final audit matters — intermediate audits on incomplete articles produce no actionable signal.`,
    });
  }

  // 5. Failed sections that hit max loops and never passed
  const failedSections = (quality?.sections ?? []).filter(s => !s.passed);
  for (const fs of failedSections) {
    if (!sectionRewrites.has(fs.sectionId)) {
      // section had writer+critic but no rewrite (just failed first pass)
      const sectionCalls = calls.filter(c => c.sectionId === fs.sectionId);
      const cost = sectionCalls.reduce((s, c) => s + c.cost, 0);
      signals.push({
        type:                'failed_section',
        sectionId:           fs.sectionId,
        estimatedWasteCost:  Math.round(cost * 100000) / 100000,
        note:                `Section "${fs.sectionId}" finished at ${fs.finalScore}/100 (below pass threshold). Evidence quality limits how high the critic can score it — not a pipeline inefficiency, but a structural ceiling.`,
      });
    }
  }

  // 6. Verbose critic output (output tokens > 1500 but section still failed)
  const verboseCritics = calls.filter(
    c => c.role === 'critic' && (c.outputTokens ?? 0) > 1500 && c.isPass === false && !c.isTruncationError,
  );
  for (const c of verboseCritics) {
    signals.push({
      type:                'verbose_output',
      sectionId:           c.sectionId,
      estimatedWasteCost:  Math.round(c.cost * 100000) / 100000,
      note:                `Critic produced ${c.outputTokens} output tokens for section "${c.sectionId ?? '?'}" but still failed — verbose issues/analysisDepthWarnings arrays inflated response without helping the rewriter. Phase 4N reliability patch reduces this.`,
    });
  }

  return signals;
}

// ─── Recommendations ──────────────────────────────────────────────────────────

interface Recommendation {
  idea:               string;
  estimatedSavings:   string;
  risk:               'low' | 'medium' | 'high';
  reason:             string;
}

function buildRecommendations(
  calls:   Call[],
  waste:   WasteSignal[],
  byRole:  Record<Role, RoleStats>,
  total:   number,
): Recommendation[] {
  const recs: Recommendation[] = [];

  const judgeWaste   = waste.filter(w => w.type === 'repeated_judge').reduce((s, w) => s + w.estimatedWasteCost, 0);
  const seoWaste     = waste.filter(w => w.type === 'redundant_seo_audit').reduce((s, w) => s + w.estimatedWasteCost, 0);
  const truncWaste   = waste.filter(w => w.type === 'critic_truncation').reduce((s, w) => s + w.estimatedWasteCost, 0);
  const rewriteWaste = waste.filter(w => w.type === 'rewrite_loop').reduce((s, w) => s + w.estimatedWasteCost, 0);
  const criticTotal  = byRole.critic.cost;

  // 1. Call judge/SEO only on the final winning assembly (low risk, clear savings)
  if (judgeWaste + seoWaste > 0.01) {
    recs.push({
      idea: 'Run final judge and SEO audit only once — after all sections converge — not after every intermediate assembly.',
      estimatedSavings: `~$${(judgeWaste + seoWaste).toFixed(3)} on this run (${Math.round((judgeWaste + seoWaste) / total * 100)}% of total)`,
      risk: 'low',
      reason: `Final judge was called ${calls.filter(c => c.role === 'finalJudge').length} times, SEO audit ${calls.filter(c => c.role === 'seoAudit').length} times. Only the last call of each produced the published result.`,
    });
  }

  // 2. Prevent rerun cycles for structurally limited sections (02-at-a-glance)
  const atAGlanceCalls = calls.filter(c => c.sectionId === '02-at-a-glance');
  const atAGlanceCost  = atAGlanceCalls.reduce((s, c) => s + c.cost, 0);
  if (atAGlanceCost > 0.05) {
    recs.push({
      idea: 'For structurally constrained sections (02-at-a-glance, intro), set max-rewrite-loops=0 or use a lighter critic — they are capped by evidence density, not writing quality.',
      estimatedSavings: `~$${(atAGlanceCost * 0.5).toFixed(3)} per run for at-a-glance + intro (skip rewrite loops on evidence-thin sections)`,
      risk: 'low',
      reason: `02-at-a-glance cycled through 2 full rewrite loops and finished at 68/100. The score is limited by sparse evidence (4 snapshots), not fixable by iteration. The rewriter cost is pure overhead.`,
    });
  }

  // 3. Reduce critic maxTokens for non-analytical sections
  if (truncWaste > 0.05) {
    recs.push({
      idea: 'Cap critic maxTokens at 4096 for intro/at-a-glance sections; keep 8192 only for analytical sections (messaging, CTA, lessons).',
      estimatedSavings: `~$${(truncWaste * 0.4).toFixed(3)} by preventing truncations on lightweight sections`,
      risk: 'low',
      reason: `${waste.filter(w => w.type === 'critic_truncation').length} truncation event(s) consumed tokens without producing usable JSON. Most occurred on simpler sections that don't need verbose critic output.`,
    });
  }

  // 4. Reduce max-rewrite-loops from 2 to 1 globally
  if (rewriteWaste > 0.05) {
    recs.push({
      idea: 'Reduce default max-rewrite-loops from 2 to 1. Sections that pass need 0–1 loops; sections limited by evidence quality never converge regardless of loop count.',
      estimatedSavings: `~$${(rewriteWaste * 0.6).toFixed(3)} on rewrite overhead (second loop rarely improves score beyond first loop)`,
      risk: 'medium',
      reason: `Sections like 05-cta and 02-at-a-glance ran 2 full loops. 05-cta passed on loop 2 (would have needed it), but 02-at-a-glance didn't improve. A 1-loop default with selective 2-loop opt-in would reduce waste without impacting pass rates.`,
    });
  }

  // 5. Use haiku for writer, sonnet only for critic
  const writerTotal = byRole.writer.cost;
  if (writerTotal > 0.05) {
    recs.push({
      idea: 'Use claude-haiku for writer calls and reserve claude-sonnet for critic and rewriter only. Writers just expand evidence — cheaper model is sufficient.',
      estimatedSavings: `~$${(writerTotal * 0.85).toFixed(3)} (haiku is ~20× cheaper than sonnet for equivalent output length)`,
      risk: 'medium',
      reason: `Writer calls produced first drafts that almost always failed critic (critic catches quality issues regardless of writer model). A cheaper writer model + sonnet critic preserves quality while cutting writer cost by ~85%.`,
    });
  }

  // 6. Use haiku for SEO audit
  const seoTotal = byRole.seoAudit.cost;
  if (seoTotal > 0.02) {
    recs.push({
      idea: 'Run SEO audit with claude-haiku (structured scoring task, doesn\'t require analytical depth of sonnet).',
      estimatedSavings: `~$${(seoTotal * 0.85).toFixed(3)} (haiku is sufficient for structured rubric-based scoring)`,
      risk: 'low',
      reason: `SEO audit applies a fixed rubric — the task is pattern matching and scoring, not open-ended reasoning. Haiku handles structured scoring tasks reliably.`,
    });
  }

  // 7. Reduce number of sections (4 instead of 6)
  const writerAvgCost = writerTotal / Math.max(1, byRole.writer.calls);
  const criticAvgCost = criticTotal / Math.max(1, byRole.critic.calls);
  recs.push({
    idea: 'Consolidate to 4 analytical sections (merge intro+at-a-glance, merge visual-timeline+messaging) to reduce total section count from 6 to 4.',
    estimatedSavings: `~$${(2 * (writerAvgCost + criticAvgCost * 1.5)).toFixed(3)} by eliminating 2 section writer+critic cycles per run`,
    risk: 'high',
    reason: `A 4-section structure eliminates the two weakest sections (intro scores with minimal evidence-specific insight; at-a-glance is structurally constrained by snapshot count). Quality impact unknown until tested.`,
  });

  return recs;
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

function pct(n: number, total: number): string {
  return total > 0 ? `${Math.round((n / total) * 1000) / 10}%` : '0%';
}
function usd(n: number): string { return `$${n.toFixed(5)}`; }
function pad(s: string, n: number): string { return s.padEnd(n); }
function rpad(s: string, n: number): string { return s.padStart(n); }

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log(`\nCRO Teardown — Cost Breakdown: ${slug}`);
  console.log('─'.repeat(60));

  // Load files
  const runLog         = loadJson<RawLogEntry[]>(path.join(DATA_ROOT, 'run-log.json')) ?? [];
  const costReport     = loadJson<CostReportFile>(path.join(DATA_ROOT, 'cost-report.json'));
  const rerunReport    = loadJson<CostReportFile>(path.join(DATA_ROOT, 'rerun-cost-report.json'));
  const qualitySummary = loadJson<QualitySummary>(path.join(DATA_ROOT, 'quality-summary.json'));
  const finalJudgeFile = loadJson<{ overallScore?: number; pass?: boolean; costUsd?: number; generatedAt?: string }>(
    path.join(DATA_ROOT, 'final-judge.json'),
  );
  const seoAuditFile   = loadJson<{ seoScore?: number; pass?: boolean; costUsd?: number; generatedAt?: string }>(
    path.join(DATA_ROOT, 'seo-audit.json'),
  );

  if (runLog.length === 0) {
    console.error(`No run-log.json found at ${DATA_ROOT}`);
    process.exit(1);
  }

  // Parse
  const runLogCalls    = parseRunLog(runLog);
  const crCalls        = costReport  ? parseCostReport(costReport,  costReport.section)  : [];
  const rerunCrCalls   = rerunReport ? parseCostReport(rerunReport, null) : [];

  // Merge
  const allCalls = mergeCalls(runLogCalls, [...crCalls, ...rerunCrCalls]);

  // Totals
  const totalCost  = Math.round(allCalls.reduce((s, c) => s + c.cost, 0) * 100000) / 100000;
  const totalCalls = allCalls.length;

  // Aggregations
  const byRole    = buildByRole(allCalls, totalCost);
  const bySection = buildBySection(allCalls, qualitySummary);

  // Top 5 expensive calls
  const expensiveCalls = allCalls
    .filter(c => c.cost > 0)
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5)
    .map(c => ({
      role:         c.role,
      sectionId:    c.sectionId ?? '(article-wide)',
      model:        c.model,
      inputTokens:  c.inputTokens,
      outputTokens: c.outputTokens,
      cost:         Math.round(c.cost * 100000) / 100000,
      reason:       c.reason,
    }));

  // Waste signals
  const wasteSignals = detectWaste(allCalls, qualitySummary);
  const totalWaste   = wasteSignals.reduce((s, w) => s + w.estimatedWasteCost, 0);

  // Recommendations
  const recommendations = buildRecommendations(allCalls, wasteSignals, byRole, totalCost);

  // Build output
  const output = {
    slug,
    totalCost,
    totalCalls,
    totalWasteEstimate:  Math.round(totalWaste * 100000) / 100000,
    byRole,
    bySection,
    expensiveCalls,
    wasteSignals: wasteSignals.map(w => ({
      ...w,
      estimatedWasteCost: Math.round(w.estimatedWasteCost * 100000) / 100000,
    })),
    recommendations,
    meta: {
      finalJudgeScore:  qualitySummary?.finalJudgeScore  ?? finalJudgeFile?.overallScore ?? null,
      finalJudgePass:   qualitySummary?.finalJudgePass   ?? finalJudgeFile?.pass         ?? null,
      seoScore:         qualitySummary?.seoScore         ?? seoAuditFile?.seoScore       ?? null,
      seoPass:          qualitySummary?.seoPass          ?? seoAuditFile?.pass           ?? null,
      articleWordCount: qualitySummary?.articleWordCount ?? null,
      generatedAt:      new Date().toISOString(),
    },
  };

  // ── Print report ────────────────────────────────────────────────────────────
  console.log(`\n  Total cost : $${totalCost.toFixed(5)}`);
  console.log(`  Total calls: ${totalCalls}`);
  console.log(`  Waste est. : $${totalWaste.toFixed(5)} (${pct(totalWaste, totalCost)} of total)`);

  console.log(`\n${'─'.repeat(60)}`);
  console.log('  BY ROLE');
  console.log(`  ${pad('Role', 12)} ${rpad('Calls', 7)} ${rpad('Cost', 10)} ${rpad('%', 7)}`);
  console.log(`  ${'-'.repeat(38)}`);
  const roleOrder: Role[] = ['writer', 'critic', 'rewriter', 'finalJudge', 'seoAudit'];
  for (const r of roleOrder) {
    const s = byRole[r];
    if (s.calls === 0) continue;
    console.log(`  ${pad(r, 12)} ${rpad(String(s.calls), 7)} ${rpad(usd(s.cost), 10)} ${rpad(String(s.percent) + '%', 7)}`);
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log('  BY SECTION');
  console.log(`  ${pad('Section', 34)} ${rpad('Cost', 9)} ${rpad('Writer', 8)} ${rpad('Critic', 8)} ${rpad('Rwrtr', 7)} ${rpad('Loops', 6)} ${rpad('Score', 6)} Pass`);
  console.log(`  ${'-'.repeat(88)}`);
  for (const s of bySection) {
    const scoreStr = s.finalScore != null ? String(s.finalScore) : '—';
    const passStr  = s.pass === true ? '✓' : s.pass === false ? '✗' : '—';
    console.log(
      `  ${pad(s.sectionId, 34)} ${rpad(usd(s.totalCost), 9)} ${rpad(usd(s.writerCost), 8)} ${rpad(usd(s.criticCost), 8)} ${rpad(usd(s.rewriterCost), 7)} ${rpad(String(s.rewriteCount), 6)} ${rpad(scoreStr, 6)} ${passStr}`,
    );
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log('  TOP 5 EXPENSIVE CALLS');
  expensiveCalls.forEach((c, i) => {
    const tok = c.inputTokens != null
      ? ` (${c.inputTokens}in / ${c.outputTokens}out tok)`
      : '';
    console.log(`  ${i + 1}. $${c.cost.toFixed(5)}  [${c.role}] ${c.sectionId}${tok}`);
    console.log(`     ${c.reason}`);
  });

  console.log(`\n${'─'.repeat(60)}`);
  console.log('  WASTE SIGNALS');
  if (wasteSignals.length === 0) {
    console.log('  (none detected)');
  } else {
    for (const w of wasteSignals) {
      console.log(`  ⚠ [${w.type}]  ${w.sectionId ?? '(article)'}  est. waste $${w.estimatedWasteCost.toFixed(5)}`);
      console.log(`    ${w.note}`);
    }
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log('  RECOMMENDATIONS  (safest savings first)');
  recommendations.forEach((r, i) => {
    console.log(`\n  ${i + 1}. [risk: ${r.risk}]  ${r.idea}`);
    console.log(`     Savings: ${r.estimatedSavings}`);
    console.log(`     Why:     ${r.reason}`);
  });

  console.log(`\n${'─'.repeat(60)}\n`);

  // Write JSON
  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
  console.log(`  ✓ cost-breakdown.json written to ${OUT_PATH}\n`);
}

main();
