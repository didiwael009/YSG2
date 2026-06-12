/**
 * visual-analyzer.ts — Layer 1.5: Visual screenshot analysis via Claude vision.
 *
 * Reads the first and last selected .webp screenshots for a slug and uses
 * Claude Haiku (multimodal) to analyze design era, layout, brand maturity,
 * proof density, and the visual shift between snapshots.
 *
 * This feeds into:
 *   - strategic-shift-detector.ts (additional context)
 *   - marketing-cards-generator.ts (Card 4: Design evolution)
 *   - outline-generator.ts (visual framing for custom angle)
 *
 * Output: data/cro-teardowns/[slug]/writing/section-evidence/visual-analysis.json
 *
 * CLI:
 *   npm run cro-teardown:visual-analyze -- --slug clay [--force]
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import Anthropic from '@anthropic-ai/sdk';
import sharp from 'sharp';
import { CostTracker, computeCallCost } from './llm/token-cost.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VisualSnapshot {
  month:                string;
  design_era:           'early-startup' | 'growth' | 'mature' | 'enterprise';
  layout_type:          'centered-hero' | 'multi-column' | 'full-bleed' | 'minimal' | 'other';
  above_fold_structure: string;
  proof_density:        'none' | 'low' | 'medium' | 'high';
  primary_message_type: 'feature' | 'outcome' | 'category' | 'story' | 'credibility';
  visual_sophistication: 1 | 2 | 3 | 4 | 5;
  brand_maturity:       'early' | 'developing' | 'polished' | 'enterprise-grade';
}

export interface VisualAnalysis {
  snapshots:             VisualSnapshot[];
  visual_shift_summary:  string;
  design_evolution_label: string;
  generatedAt:           string;
  model:                 string;
  costUsd:               number;
}

export interface RunVisualAnalyzerResult {
  analysis:    VisualAnalysis;
  skipped:     boolean;
  costUsd:     number;
  outputPath:  string;
}

// ─── Anthropic client ─────────────────────────────────────────────────────────

function tryLoadDotEnv(): void {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  for (const raw of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (key !== 'ANTHROPIC_API_KEY') continue;
    const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (val) process.env.ANTHROPIC_API_KEY = val;
    break;
  }
}

function getClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) tryLoadDotEnv();
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key?.trim()) throw new Error('ANTHROPIC_API_KEY not set');
  return new Anthropic({ apiKey: key.trim() });
}

// ─── Image loader ─────────────────────────────────────────────────────────────

const MAX_DIM = 3840; // well below the 8000px API limit; preserves detail

async function loadImageAsBase64(
  filePath: string,
): Promise<{ data: string; media_type: 'image/webp' | 'image/png' | 'image/jpeg' }> {
  const ext = path.extname(filePath).toLowerCase();
  const media_type =
    ext === '.webp' ? 'image/webp' as const :
    ext === '.png'  ? 'image/png'  as const :
                     'image/jpeg' as const;

  // Resize if any dimension exceeds MAX_DIM — keeps the API happy and reduces tokens.
  const buf = await sharp(filePath)
    .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
    .toBuffer();

  return { data: buf.toString('base64'), media_type };
}

// ─── Prompt ───────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
`You are a senior brand and web design analyst reviewing homepage screenshots.
Your job: analyze each screenshot on its visual design qualities — not guess business strategy.
Only describe what is visually observable. Do not invent claims.

Output ONLY valid JSON. No markdown, no text before or after.
JSON SAFETY: use single quotes inside string values if quoting text.`;

function buildUserPrompt(months: string[]): string {
  return `Analyze these ${months.length} homepage screenshot(s): [${months.join(', ')}].

For EACH screenshot, provide:
- design_era: one of "early-startup" | "growth" | "mature" | "enterprise"
- layout_type: one of "centered-hero" | "multi-column" | "full-bleed" | "minimal" | "other"
- above_fold_structure: plain 1-sentence description of the above-fold layout (headline, image, CTA arrangement)
- proof_density: one of "none" | "low" | "medium" | "high" (logos, testimonials, social proof visible above fold)
- primary_message_type: one of "feature" | "outcome" | "category" | "story" | "credibility"
- visual_sophistication: integer 1–5 (1=basic/amateur, 5=highly polished/enterprise)
- brand_maturity: one of "early" | "developing" | "polished" | "enterprise-grade"

Then provide:
- visual_shift_summary: 1–2 plain sentences describing the most visible design change between first and last screenshot. If only one screenshot, describe its visual character.
- design_evolution_label: a short label (3–6 words) for the design arc, e.g. "startup-to-platform", "minimal-to-rich", "rebrand-simplification", "early-to-enterprise"

Return this exact JSON shape:
{
  "snapshots": [
    {
      "month": "2021-07",
      "design_era": "early-startup",
      "layout_type": "centered-hero",
      "above_fold_structure": "...",
      "proof_density": "low",
      "primary_message_type": "feature",
      "visual_sophistication": 2,
      "brand_maturity": "early"
    }
  ],
  "visual_shift_summary": "...",
  "design_evolution_label": "..."
}`;
}

// ─── Runner ───────────────────────────────────────────────────────────────────

export async function runVisualAnalyzer(opts: {
  slug:        string;
  writingDir:  string;
  publicDir:   string;
  tracker?:    CostTracker;
  force?:      boolean;
  onLog?:      (msg: string) => void;
}): Promise<RunVisualAnalyzerResult> {
  const { slug, writingDir, publicDir, tracker, force, onLog = console.log } = opts;

  const outputPath = path.join(writingDir, 'section-evidence', 'visual-analysis.json');

  if (!force && fs.existsSync(outputPath)) {
    const cached = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as VisualAnalysis;
    return { analysis: cached, skipped: true, costUsd: 0, outputPath };
  }

  // ── Find selected screenshots ─────────────────────────────────────────────
  const selectedDir = path.join(publicDir, 'cro-teardowns', slug, 'selected');
  if (!fs.existsSync(selectedDir)) {
    throw new Error(`Selected screenshots dir not found: ${selectedDir}`);
  }

  const allFiles = fs.readdirSync(selectedDir)
    .filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f))
    .sort();

  if (allFiles.length === 0) {
    throw new Error(`No screenshot files found in ${selectedDir}`);
  }

  // Use first + last (captures the arc); if only one, use it alone
  const toAnalyze = allFiles.length === 1
    ? [allFiles[0]]
    : [allFiles[0], allFiles[allFiles.length - 1]];

  onLog(`  Visual analyzer: analyzing ${toAnalyze.length} of ${allFiles.length} screenshots`);

  // ── Build message with image blocks ──────────────────────────────────────
  const imageBlocks: Anthropic.ImageBlockParam[] = await Promise.all(
    toAnalyze.map(async fname => {
      const { data, media_type } = await loadImageAsBase64(path.join(selectedDir, fname));
      return {
        type: 'image' as const,
        source: { type: 'base64' as const, media_type, data },
      };
    }),
  );

  const months = toAnalyze.map(f => f.replace(/\.(webp|png|jpg|jpeg)$/i, ''));
  const textBlock: Anthropic.TextBlockParam = {
    type: 'text' as const,
    text: buildUserPrompt(months),
  };

  const model = 'claude-haiku-4-5-20251001';
  const client = getClient();

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      { role: 'user', content: [...imageBlocks, textBlock] },
    ],
  });

  const inputTokens  = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  const callCost     = computeCallCost(model, 'visual-analysis', inputTokens, outputTokens);
  if (tracker) tracker.add(callCost);
  const costUsd = callCost.totalCostUsd;

  const rawText = response.content.find(b => b.type === 'text')?.text ?? '';

  let parsed: Partial<VisualAnalysis>;
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] ?? rawText) as Partial<VisualAnalysis>;
  } catch {
    throw new Error(`Visual analyzer: failed to parse JSON response.\nRaw:\n${rawText.slice(0, 400)}`);
  }

  const analysis: VisualAnalysis = {
    snapshots:              (parsed.snapshots ?? []) as VisualSnapshot[],
    visual_shift_summary:   parsed.visual_shift_summary ?? '',
    design_evolution_label: parsed.design_evolution_label ?? 'unknown',
    generatedAt:            new Date().toISOString(),
    model,
    costUsd,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2), 'utf-8');

  onLog(`  ✓ visual-analysis.json — ${analysis.design_evolution_label} · $${costUsd.toFixed(4)}`);

  return { analysis, skipped: false, costUsd, outputPath };
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
    console.error('Usage: visual-analyzer.ts --slug <slug> [--force]');
    process.exit(1);
  }

  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');
  const publicDir   = path.join(projectRoot, 'public');

  runVisualAnalyzer({ slug, writingDir, publicDir, force })
    .then(r => {
      if (r.skipped) {
        console.log(`⏭  Skipped (cached). Use --force to regenerate.`);
      } else {
        console.log(`✅  Visual analysis complete`);
        console.log(`   Label: ${r.analysis.design_evolution_label}`);
        console.log(`   Summary: ${r.analysis.visual_shift_summary}`);
        console.log(`   Cost: $${r.costUsd.toFixed(4)}`);
      }
    })
    .catch(err => { console.error('❌', err); process.exit(1); });
}
