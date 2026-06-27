/**
 * Thin wrapper around the Anthropic Messages API.
 * API key is read from process.env.ANTHROPIC_API_KEY.
 * If that is not set, the project-root .env file is checked automatically.
 * The key is NEVER hardcoded.
 */

// Type-only import — erased at runtime, so this module loads even when the SDK
// is not installed (e.g. no-API manual mode). The value is imported lazily in getClient().
import type Anthropic from '@anthropic-ai/sdk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';
import { isManualMode, resolveManual } from './manual-provider.js';

/**
 * Reads ANTHROPIC_API_KEY from a .env file in the project root.
 * Only called when the environment variable is not already set.
 * Supports lines like:  ANTHROPIC_API_KEY=sk-ant-...
 * Lines starting with # are treated as comments.
 */
function tryLoadDotEnv(): void {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    if (key !== 'ANTHROPIC_API_KEY') continue;
    const value = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (value) {
      process.env.ANTHROPIC_API_KEY = value;
      console.log('  ℹ Loaded ANTHROPIC_API_KEY from .env file');
    }
    break;
  }
}

let _client: Anthropic | null = null;

async function getClient(): Promise<Anthropic> {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) tryLoadDotEnv();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new Error(
        'ANTHROPIC_API_KEY is not set.\n\n' +
        'Create a file called  .env  in the root of the project and add this line:\n\n' +
        '  ANTHROPIC_API_KEY=sk-ant-your-key-here\n\n' +
        'Save the file and run the command again.\n\n' +
        '(Or run in no-API mode: set CRO_MANUAL=<slug> to fulfil agent calls manually.)',
      );
    }
    // Lazy import so the SDK is only required when an actual API call is made.
    const { default: AnthropicSDK } = await import('@anthropic-ai/sdk');
    _client = new AnthropicSDK({ apiKey: apiKey.trim() });
  }
  return _client;
}

export interface LLMResponse {
  content: string;
  inputTokens: number;
  outputTokens: number;
  /** Tokens served from prompt cache (billed at 0.1× input). 0 when caching is off or a cache miss. */
  cacheReadTokens: number;
  /** Tokens written to prompt cache (billed at 1.25× input). Non-zero only on the first call that seeds the cache. */
  cacheCreationTokens: number;
  model: string;
  stopReason: string;
}

export async function callLLM(opts: {
  model: string;
  system: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  maxTokens?: number;
  /**
   * When true, the (static) system prompt is sent as a cache_control block so
   * repeated calls that share the same system prompt within ~5 min are billed
   * at the cache-read rate. Quality is unaffected — the model sees identical text.
   */
  cacheSystem?: boolean;
}): Promise<LLMResponse> {
  // No-API multi-agent mode: fulfil this call from a file written by Claude Code
  // (or a Writer/Critic sub-agent) instead of hitting the paid API. See manual-provider.ts.
  if (isManualMode()) {
    return resolveManual({ model: opts.model, system: opts.system, messages: opts.messages });
  }

  const client = await getClient();

  const system = opts.cacheSystem
    ? [{ type: 'text' as const, text: opts.system, cache_control: { type: 'ephemeral' as const } }]
    : opts.system;

  const response = await client.messages.create({
    model: opts.model,
    max_tokens: opts.maxTokens ?? 4096,
    system,
    messages: opts.messages,
  });

  const content = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map(b => b.text)
    .join('');

  return {
    content,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    cacheReadTokens: response.usage.cache_read_input_tokens ?? 0,
    cacheCreationTokens: response.usage.cache_creation_input_tokens ?? 0,
    model: response.model,
    stopReason: response.stop_reason ?? 'end_turn',
  };
}
