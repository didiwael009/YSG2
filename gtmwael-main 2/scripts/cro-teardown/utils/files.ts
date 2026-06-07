import * as fs from 'node:fs';
import * as path from 'node:path';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function ensureDirs(dataDir: string, publicDir: string, slug: string): void {
  const dirs = [
    path.join(dataDir, slug),
    path.join(dataDir, slug, 'logs'),
    path.join(dataDir, slug, 'page-text'),
    path.join(publicDir, slug, 'archive-monthly'),
    path.join(publicDir, slug, 'selected'),
  ];
  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function saveJson(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function saveText(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}
