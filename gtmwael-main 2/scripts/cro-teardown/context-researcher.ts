/**
 * context-researcher.ts — Pre-Layer 3: Business context research.
 *
 * Uses Claude Sonnet with the web_search tool to research the company's
 * business context during the teardown period: funding rounds, product launches,
 * category events, competitor moves, and ICP evolution.
 *
 * This external context feeds Layer 3 (strategic-shift-detector) and the
 * business-context section writer so articles explain WHY pages changed —
 * not just WHAT changed.
 *
 * Output: data/cro-teardowns/[slug]/writing/section-evidence/business-context-research.json
 *
 * CLI:
 *   npm run cro-teardown:research -- --slug clay [--force]
 */

import * as fs   from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import Anthropic from '@anthropic-ai/sdk';
import { CostTracker, computeCallCost } from './llm/token-cost.js';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BusinessContextEvent {
  period:  string;
  type:    'funding' | 'product-launch' | 'rebrand' | 'competitor-move' | 'category-shift' | 'hiring' | 'other';
  summary: string;
}

export interface BusinessContextResearch {
  company_stage_start:  'seed' | 'early-growth' | 'growth' | 'scale' | 'public' | 'unknown';
  company_stage_end:    'seed' | 'early-growth' | 'growth' | 'scale' | 'public' | 'unknown';
  key_events:           BusinessContextEvent[];
  category_context:     string;
  icp_evolution:        string;
  notable_competitors:  string[];
  confidence_level:     'high' | 'medium' | 'low';
  generatedAt:          string;
  model:                string;
  costUsd:              number;
}

export interface RunContextResearcherResult {
  research:   BusinessContextResearch;
  skipped:    boolean;
  costUsd:    number;
  outputPath: string;
}

interface EvidencePack {
  companyName?: string;
  companyUrl?:  string;
  fromMonth?:   string;
  toMonth?:     string;
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

// ─── Prompts ──────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
`You are a B2B SaaS market analyst researching the business context behind a company's
homepage evolution. Your job is to find factual, publicly available information about
the company during a specific time period.

RULES:
- Search for the company's actual public history (funding, product launches, rebrands, etc.)
- Hedge all claims: use "reportedly", "according to", "publicly announced", "sources indicate"
- Never invent facts. If you cannot find information, say so with confidence_level: "low"
- Focus on events that would explain MARKETING or POSITIONING changes (not technical product details)
- Output ONLY valid JSON. No markdown, no text before or after.
- JSON SAFETY: use single quotes inside string values if quoting text`;

function buildUserPrompt(company: string, url: string, fromMonth: string, toMonth: string): string {
  return `Research the business context for ${company} (${url}) between ${fromMonth} and ${toMonth}.

I need to understand what business events explain why their homepage positioning changed during this period.

Search for:
1. Funding rounds or major investment events
2. Major product launches or pivots
3. Rebrands or positioning shifts
4. Key competitor moves that affected this company
5. Category-level shifts (market maturity, new entrants, consolidation)
6. Changes in target customer (ICP evolution — who they were selling to at start vs end)

After searching, output this exact JSON shape:
{
  "company_stage_start": "seed|early-growth|growth|scale|public|unknown",
  "company_stage_end": "seed|early-growth|growth|scale|public|unknown",
  "key_events": [
    {
      "period": "2022-Q3",
      "type": "funding|product-launch|rebrand|competitor-move|category-shift|hiring|other",
      "summary": "1-2 sentences. Hedge with 'reportedly', 'according to public sources', etc."
    }
  ],
  "category_context": "1-2 sentences on what was happening in this product category during the period",
  "icp_evolution": "1-2 sentences on how their target customer profile appears to have changed",
  "notable_competitors": ["competitor1", "competitor2"],
  "confidence_level": "high|medium|low"
}

Important:
- key_events should include 3-6 of the most relevant events (not exhaustive)
- If you find limited public information, still provide what you know and set confidence_level to "low"
- Stick to events in the period ${fromMonth} to ${toMonth}`;
}

// ─── Tool-use loop ────────────────────────────────────────────────────────────

async function runWithWebSearch(
  client: Anthropic,
  model: string,
  systemPrompt: string,
  userMessage: string,
): Promise<{ text: string; inputTokens: number; outputTokens: number }> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage },
  ];

  let totalInput  = 0;
  let totalOutput = 0;
  let finalText   = '';

  // Agentic loop: keep going while Claude wants to use tools
  for (let iteration = 0; iteration < 8; iteration++) {
    const response = await client.messages.create({
      model,
      max_tokens: 2048,
      system: systemPrompt,
      tools: [{ type: 'web_search_20250305' as const, name: 'web_search' }],
      messages,
    } as Parameters<typeof client.messages.create>[0]);

    totalInput  += response.usage.input_tokens;
    totalOutput += response.usage.output_tokens;

    if (response.stop_reason === 'end_turn') {
      finalText = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map(b => b.text)
        .join('');
      break;
    }

    if (response.stop_reason === 'tool_use') {
      // Add assistant turn with all blocks
      messages.push({ role: 'assistant', content: response.content });

      // Build tool results for each tool_use block
      const toolResults: Anthropic.ToolResultBlockParam[] = response.content
        .filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use')
        .map(b => ({
          type: 'tool_result' as const,
          tool_use_id: b.id,
          content: '',  // web_search results are injected by the API server
        }));

      // For web_search, the results are returned in the NEXT assistant message
      // automatically by the API — we just need to include the tool_result turn
      messages.push({ role: 'user', content: toolResults });
      continue;
    }

    // Unexpected stop reason — capture whatever text is available
    finalText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('');
    break;
  }

  return { text: finalText, inputTokens: totalInput, outputTokens: totalOutput };
}

// ─── Runner ───────────────────────────────────────────────────────────────────

export async function runContextResearcher(opts: {
  slug:       string;
  writingDir: string;
  tracker?:   CostTracker;
  force?:     boolean;
  onLog?:     (msg: string) => void;
}): Promise<RunContextResearcherResult> {
  const { slug, writingDir, tracker, force, onLog = console.log } = opts;

  const outputPath = path.join(writingDir, 'section-evidence', 'business-context-research.json');

  if (!force && fs.existsSync(outputPath)) {
    const cached = JSON.parse(fs.readFileSync(outputPath, 'utf-8')) as BusinessContextResearch;
    return { research: cached, skipped: true, costUsd: 0, outputPath };
  }

  const epPath = path.join(writingDir, 'evidence-pack.json');
  if (!fs.existsSync(epPath)) {
    throw new Error(
      `evidence-pack.json not found for slug "${slug}". Run Phase 4A first:\n` +
      `  npm run cro-teardown:generate-data -- --slug ${slug}`,
    );
  }

  const ep: EvidencePack = JSON.parse(fs.readFileSync(epPath, 'utf-8'));
  const company    = ep.companyName  ?? slug;
  const url        = ep.companyUrl   ?? '';
  const fromMonth  = ep.fromMonth    ?? 'unknown start';
  const toMonth    = ep.toMonth      ?? 'present';

  const model  = 'claude-sonnet-4-6';
  const client = getClient();

  onLog(`  Context researcher: researching ${company} (${fromMonth} → ${toMonth})`);

  const userMessage = buildUserPrompt(company, url, fromMonth, toMonth);

  let result: { text: string; inputTokens: number; outputTokens: number };
  try {
    result = await runWithWebSearch(client, model, SYSTEM_PROMPT, userMessage);
  } catch (err: unknown) {
    // web_search tool may not be available in all regions/plans — fall back to
    // knowledge-only call without tool use
    onLog(`  ⚠ Web search unavailable (${(err as Error).message?.slice(0, 60)}), falling back to knowledge-only`);
    const fallback = await client.messages.create({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage + '\n\nNote: use your training knowledge only — no web search available.' }],
    });
    const text = fallback.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('');
    result = { text, inputTokens: fallback.usage.input_tokens, outputTokens: fallback.usage.output_tokens };
  }

  const callCost = computeCallCost(model, 'context-research', result.inputTokens, result.outputTokens);
  if (tracker) tracker.add(callCost);
  const costUsd = callCost.totalCostUsd;

  let parsed: Partial<BusinessContextResearch>;
  try {
    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    parsed = JSON.parse(jsonMatch?.[0] ?? result.text) as Partial<BusinessContextResearch>;
  } catch {
    throw new Error(
      `Context researcher: failed to parse JSON response.\nRaw:\n${result.text.slice(0, 400)}`,
    );
  }

  const research: BusinessContextResearch = {
    company_stage_start:  parsed.company_stage_start  ?? 'unknown',
    company_stage_end:    parsed.company_stage_end    ?? 'unknown',
    key_events:           parsed.key_events           ?? [],
    category_context:     parsed.category_context     ?? '',
    icp_evolution:        parsed.icp_evolution        ?? '',
    notable_competitors:  parsed.notable_competitors  ?? [],
    confidence_level:     parsed.confidence_level     ?? 'low',
    generatedAt:          new Date().toISOString(),
    model,
    costUsd,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(research, null, 2), 'utf-8');

  onLog(`  ✓ business-context-research.json — ${research.key_events.length} events, confidence: ${research.confidence_level} · $${costUsd.toFixed(4)}`);

  return { research, skipped: false, costUsd, outputPath };
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
    console.error('Usage: context-researcher.ts --slug <slug> [--force]');
    process.exit(1);
  }

  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const writingDir  = path.join(projectRoot, 'data', 'cro-teardowns', slug, 'writing');

  runContextResearcher({ slug, writingDir, force })
    .then(r => {
      if (r.skipped) {
        console.log(`⏭  Skipped (cached). Use --force to regenerate.`);
      } else {
        console.log(`✅  Context research complete`);
        console.log(`   Stage: ${r.research.company_stage_start} → ${r.research.company_stage_end}`);
        console.log(`   Events: ${r.research.key_events.length}`);
        console.log(`   Confidence: ${r.research.confidence_level}`);
        console.log(`   Cost: $${r.costUsd.toFixed(4)}`);
      }
    })
    .catch(err => { console.error('❌', err); process.exit(1); });
}
