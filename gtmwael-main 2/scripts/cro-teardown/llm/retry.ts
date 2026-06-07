/**
 * Retry with exponential back-off for Anthropic API rate-limit / overload errors.
 */

export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  onRetry?: (attempt: number, error: Error, delayMs: number) => void;
}

function isRetryable(err: unknown): boolean {
  if (!(err instanceof Error)) return false;

  // Check numeric status property (Anthropic SDK sets this on API errors)
  const status = (err as Record<string, unknown>).status;
  if (typeof status === 'number' && [429, 529, 500, 502, 503].includes(status)) return true;

  // Check message text for common patterns
  const msg = err.message.toLowerCase();
  if (
    msg.includes('429') ||
    msg.includes('529') ||
    msg.includes('rate limit') ||
    msg.includes('overloaded') ||
    msg.includes('econnreset') ||
    msg.includes('etimedout') ||
    msg.includes('socket hang up')
  ) {
    return true;
  }

  return false;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const maxAttempts = opts.maxAttempts ?? 3;
  const initialDelay = opts.initialDelayMs ?? 2_000;
  const maxDelay = opts.maxDelayMs ?? 30_000;

  let lastError: Error = new Error('withRetry: no attempts made');

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt === maxAttempts || !isRetryable(err)) throw lastError;

      // Exponential back-off with ±20 % jitter
      const base = Math.min(initialDelay * Math.pow(2, attempt - 1), maxDelay);
      const delayMs = Math.floor(base * (0.8 + Math.random() * 0.4));

      opts.onRetry?.(attempt, lastError, delayMs);
      await new Promise<void>(resolve => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}
