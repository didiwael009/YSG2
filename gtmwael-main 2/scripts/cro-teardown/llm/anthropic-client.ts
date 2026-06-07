/**
 * Thin wrapper around the Anthropic Messages API.
 * API key is read from process.env.ANTHROPIC_API_KEY.
 * If that is not set, the project-root .env file is checked automatically.
 * The key is NEVER hardcoded.
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';

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

function getClient(): Anthropic {
  if (!_client) {
    if (!process.env.ANTHROPIC_API_KEY) tryLoadDotEnv();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new Error(
        'ANTHROPIC_API_KEY is not set.\n\n' +
        'Create a file called  .env  in the root of the project and add this line:\n\n' +
        '  ANTHROPIC_API_KEY=sk-ant-your-key-here\n\n' +
        'Save the file and run the command again.',
      );
    }
    _client = new Anthropic({ apiKey: apiKey.trim() });
  }
  return _client;
}

export interface LLMResponse {
  content: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
  stopReason: string;
}

export async function callLLM(opts: {
  model: string;
  system: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  maxTokens?: number;
}): Promise<LLMResponse> {
  const client = getClient();

  const response = await client.messages.create({
    model: opts.model,
    max_tokens: opts.maxTokens ?? 4096,
    system: opts.system,
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
    model: response.model,
    stopReason: response.stop_reason ?? 'end_turn',
  };
}
