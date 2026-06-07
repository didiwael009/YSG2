import * as fs from 'node:fs';
import * as path from 'node:path';

let logFilePath: string | null = null;

export function initLogger(dataDir: string, slug: string): string {
  const logsDir = path.join(dataDir, slug, 'logs');
  fs.mkdirSync(logsDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_');
  logFilePath = path.join(logsDir, `run-${ts}.log`);
  fs.writeFileSync(logFilePath, `CRO Teardown run started at ${new Date().toISOString()}\n`);
  return logFilePath;
}

export function log(message: string): void {
  const line = `[${new Date().toISOString()}] ${message}`;
  if (logFilePath) {
    fs.appendFileSync(logFilePath, line + '\n');
  }
}

export function logError(message: string): void {
  const line = `[${new Date().toISOString()}] ERROR: ${message}`;
  if (logFilePath) {
    fs.appendFileSync(logFilePath, line + '\n');
  }
}

export function getLogPath(): string | null {
  return logFilePath;
}
