// Markdown writeups. Each writeup opens in a new tab on its own page (writeup.html?p=<slug>).
// This module renders the lists (home + writeups.html) and provides the shared Markdown renderer
// that the single-writeup page (js/writeup-view.js) uses.
import { Marked } from '../assets/vendor/marked.min.js';
import DOMPurify from '../assets/vendor/purify.min.js';
import { $, $$, esc } from './util.js';

const BASE = 'writeups/';
const showDrafts = new URLSearchParams(location.search).has('drafts');
let items = [];

export const fmtDate = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
const isRelative = (u) => u && !/^([a-z][a-z0-9+.-]*:|#|\/)/i.test(u);

const marked = new Marked({ gfm: true, breaks: false });
marked.use({
  walkTokens(t) {
    // Paths in a writeup are relative to the writeups folder, like on GitHub.
    if ((t.type === 'image' || t.type === 'link') && isRelative(t.href)) t.href = BASE + t.href;
  },
});
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && /^https?:/i.test(node.getAttribute('href') || '')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
  if (node.tagName === 'IMG') { node.setAttribute('loading', 'lazy'); node.setAttribute('decoding', 'async'); }
});

export function getWriteups() { return items; }

export async function loadIndex() {
  if (items.length) return items;
  try {
    const res = await fetch(`${BASE}index.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    items = ((await res.json()).items || []).filter((w) => showDrafts || !w.draft);
  } catch (e) {
    items = [];
  }
  return items;
}

// The reading page for one writeup. Opened in a new tab everywhere.
export const postUrl = (slug) => `writeup.html?p=${encodeURIComponent(slug)}${showDrafts ? '&drafts' : ''}`;
export function openPost(slug) { window.open(postUrl(slug), '_blank', 'noopener'); }

export function cardHTML(w) {
  return `<a class="writeup" href="${postUrl(w.slug)}" target="_blank" rel="noopener" data-reveal>
      <span class="writeup__meta mono">${esc(w.type)}<span>${esc(fmtDate(w.date))} &middot; ${w.minutes} min read</span></span>
      <span>
        <span class="writeup__title">${w.draft ? '<span class="sev sev--low">Draft</span> ' : ''}${esc(w.title)}</span>
        <span class="writeup__sum">${esc(w.summary)}</span>
        ${w.tags.length ? `<span class="writeup__count">${w.tags.map((t) => `<span class="sev sev--low">${esc(t)}</span>`).join('')}</span>` : ''}
      </span>
      <span class="writeup__go">Read <svg class="ico"><use href="#i-ne"/></svg></span>
    </a>`;
}

// Fetch a writeup's Markdown and return sanitized HTML plus its neighbours. Used by writeup-view.js.
export async function renderMarkdown(slug) {
  await loadIndex();
  const w = items.find((x) => x.slug === slug);
  if (!w) return null;
  const res = await fetch(BASE + w.file, { cache: 'no-cache' });
  if (!res.ok) throw new Error(res.status);
  let body = (await res.text()).replace(/^﻿/, '').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  body = body.replace(/^\s*#\s+.+\r?\n/, ''); // the page prints the title already
  const html = DOMPurify.sanitize(marked.parse(body), { FORBID_TAGS: ['style', 'form', 'input', 'iframe'] });
  const idx = items.indexOf(w);
  return { w, html, newer: items[idx - 1] || null, older: items[idx + 1] || null };
}

// After the prose HTML is in the DOM: wrap tables so they scroll, add a Copy button to code blocks.
export function enhanceProse(root) {
  $$('table', root).forEach((t) => { const wrap = document.createElement('div'); wrap.className = 'prose__table'; t.replaceWith(wrap); wrap.append(t); });
  $$('pre', root).forEach((pre) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'prose__copy mono';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(pre.querySelector('code')?.innerText ?? pre.innerText); btn.textContent = 'Copied'; } catch (e) { btn.textContent = 'Select to copy'; }
      setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
    });
    pre.append(btn);
  });
}

// HOME PAGE: newest few, with a link to the full page. Section hides itself when empty.
export async function initWriteups() {
  const section = $('#writeups');
  const list = $('#md-list');
  await loadIndex();
  if (!items.length) {
    section?.remove();
    $$('a[href="#writeups"]').forEach((a) => a.remove());
    return items;
  }
  const LATEST = 3;
  if (list) list.innerHTML = items.slice(0, LATEST).map(cardHTML).join('');
  const all = $('#writeups-all');
  if (all) {
    all.hidden = false;
    all.textContent = items.length > LATEST ? `All ${items.length} writeups` : 'Open the writeups page';
  }
  return items;
}

// WRITEUPS PAGE (writeups.html): the full list with search and topic filters.
export async function initWriteupsPage() {
  await loadIndex();
  const host = $('#wp-list');
  const empty = $('#wp-empty');
  const search = $('#wp-search');
  const filters = $('#wp-filters');
  const more = $('#wp-more');
  const count = $('#wp-count');
  if (!items.length) { empty.hidden = false; search?.closest('.wp-controls')?.remove(); more.remove(); return; }

  const STEP = 8;
  let shown = STEP;
  let tag = 'all';
  let query = '';

  const tags = [...new Set(items.flatMap((w) => w.tags))].sort();
  filters.innerHTML = [['all', 'All'], ...tags.map((t) => [t, t])]
    .map(([k, label], i) => `<button type="button" class="filter" data-tag="${esc(k)}" aria-pressed="${i === 0}">${esc(label)}</button>`).join('');

  const matches = () => items.filter((w) => {
    if (tag !== 'all' && !w.tags.includes(tag)) return false;
    if (!query) return true;
    return `${w.title} ${w.summary} ${w.type} ${w.tags.join(' ')}`.toLowerCase().includes(query);
  });

  const render = () => {
    const list = matches();
    count.textContent = `${list.length} writeup${list.length === 1 ? '' : 's'}`;
    host.innerHTML = list.length
      ? list.slice(0, shown).map(cardHTML).join('')
      : `<p class="wp-none">No writeups match that. <button type="button" class="link-btn" id="wp-reset">Clear filters</button></p>`;
    more.hidden = list.length <= shown;
    more.textContent = `Show more (${Math.max(list.length - shown, 0)})`;
  };

  filters.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tag]');
    if (!b) return;
    $$('.filter', filters).forEach((x) => x.setAttribute('aria-pressed', x === b));
    tag = b.dataset.tag; shown = STEP; render();
  });
  search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); shown = STEP; render(); });
  more.addEventListener('click', () => { shown += STEP; render(); });
  host.addEventListener('click', (e) => {
    if (e.target.closest('#wp-reset')) { tag = 'all'; query = ''; search.value = ''; shown = STEP; $$('.filter', filters).forEach((x, i) => x.setAttribute('aria-pressed', i === 0)); render(); }
  });

  render();
}
