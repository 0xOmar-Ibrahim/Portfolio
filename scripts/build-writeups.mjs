// Builds writeups/index.json from the .md files in writeups/.
// The deploy workflow runs this on every push, so adding a writeup is just: add a .md file, push.
// To preview locally after adding one:  node scripts/build-writeups.mjs
//
// Files starting with "_" and README.md are ignored.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'writeups');
const inCI = Boolean(process.env.GITHUB_ACTIONS);
const warn = (file, msg) => console.log(inCI ? `::warning file=writeups/${file}::${msg}` : `WARNING ${file}: ${msg}`);

function parse(src) {
  const meta = {};
  let body = src.replace(/^﻿/, '');
  const m = body.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (m) {
    body = body.slice(m[0].length);
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z_]+)\s*:\s*(.*)$/);
      if (!kv) continue;
      let v = kv[2].trim().replace(/^["']|["']$/g, '');
      if (kv[1] === 'tags') v = v.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      if (v === 'true') v = true;
      if (v === 'false') v = false;
      meta[kv[1]] = v;
    }
  }
  return { meta, body };
}

// Markdown to plain text for cards: drops formatting marks but keeps text like "CVE-2025-55182" intact.
const plain = (md) => String(md)
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/^\s*(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
  .replace(/\*\*|__|`|~~/g, '')
  .replace(/(^|\s)[*_](\S[^*_]*\S|\S)[*_](?=\s|[.,;:!?]|$)/g, '$1$2')
  .replace(/\s+/g, ' ')
  .trim();

const items = [];
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).sort()) {
  if (file.startsWith('_') || file.toLowerCase() === 'readme.md') continue;
  const { meta, body } = parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const slug = file.replace(/\.md$/, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const title = meta.title || (body.match(/^#\s+(.+)$/m) || [])[1];
  if (!title) { warn(file, 'skipped: add a "title:" line or a "# Heading".'); continue; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(meta.date || ''))) { warn(file, 'skipped: add "date: YYYY-MM-DD" at the top.'); continue; }
  const firstPara = body.split(/\r?\n\s*\r?\n/).map((b) => b.trim()).find((b) => b && !/^(#|```|!\[|\||>|-|\*|\d+\.)/.test(b)) || '';
  const summary = meta.summary ? plain(meta.summary) : (plain(firstPara).slice(0, 220) + (plain(firstPara).length > 220 ? '…' : ''));
  const words = plain(body).split(' ').filter(Boolean).length;
  items.push({
    slug, file, title: String(title).trim(), date: meta.date,
    type: meta.type || 'Writeup', summary, autoSummary: !meta.summary, tags: Array.isArray(meta.tags) ? meta.tags : [],
    draft: meta.draft === true, minutes: Math.max(1, Math.round(words / 200)),
  });
}
items.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify({ items }, null, 2) + '\n');
console.log(`writeups/index.json: ${items.filter((i) => !i.draft).length} published, ${items.filter((i) => i.draft).length} draft`);
