import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export interface PromptOption {
  label: string;
  skip?: boolean;
}

let rl: ReturnType<typeof createInterface> | null = null;

export function openPromptSession(): void {
  rl = createInterface({ input: stdin, output: stdout });
}

export function closePromptSession(): void {
  rl?.close();
  rl = null;
}

/**
 * Show a numbered menu and return the 1-based index of the selected option.
 * The last option is always "Skip" (unless the caller includes their own skip).
 * Returns `null` if the user picks skip.
 */
export async function askChoice(
  question: string,
  options: PromptOption[],
): Promise<number | null> {
  if (!rl) throw new Error('Prompt session not open. Call openPromptSession() first.');

  const skipIndex = options.length; // 1-based: last item

  console.log('\n' + question);
  options.forEach((opt, i) => {
    const marker = opt.skip ? '↩' : `${i + 1}.`;
    console.log(`  ${marker} ${opt.label}`);
  });
  console.log('');

  while (true) {
    const raw = await rl.question(`  Your choice (1–${options.length}): `);
    const n = parseInt(raw.trim(), 10);
    if (!isNaN(n) && n >= 1 && n <= options.length) {
      return options[n - 1].skip ? null : n;
    }
    console.log(`  ↳ Please enter a number between 1 and ${options.length}.`);
  }
}

/** Print a visible section divider in the prompt flow */
export function printDivider(label: string): void {
  const line = '─'.repeat(52);
  console.log(`\n${line}\n  ${label}\n${line}`);
}
