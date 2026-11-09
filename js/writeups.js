// Markdown writeups: lists writeups/index.json and renders each .md file inside the side panel.
import { Marked } from '../assets/vendor/marked.min.js';
import DOMPurify from '../assets/vendor/purify.min.js';
import { $, $$, esc, toast } from './util.js';
import { showInPanel } from './work.js';

const BASE = 'writeups/';
const showDrafts = new URLSearchParams(location.search).has('drafts');
let items = [];

const fmtDate = (d) => new Date(`${d}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
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

export async function loadWriteups() {
  const section = $('#writeups');
  try {
    const res = await fetch(`${BASE}index.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    items = ((await res.json()).items || []).filter((w) => showDrafts || !w.draft);
  } catch (e) {
    items = [];
  }
  if (!items.length) {
    section?.remove();
    $$('a[href="#writeups"]').forEach((a) => a.remove());
    return items;
  }
  $('#md-list').innerHTML = items.map((w) => `
    <button type="button" class="writeup" data-post="${esc(w.slug)}" data-reveal>
      <span class="writeup__meta mono">${esc(w.type)}<span>${esc(fmtDate(w.date))} &middot; ${w.minutes} min read</span></span>
      <span>
        <span class="writeup__title">${w.draft ? '<span class="sev sev--low">Draft</span> ' : ''}${esc(w.title)}</span>
        <span class="writeup__sum">${esc(w.summary)}</span>
        ${w.tags.length ? `<span class="writeup__count">${w.tags.map((t) => `<span class="sev sev--low">${esc(t)}</span>`).join('')}</span>` : ''}
      </span>
      <span class="writeup__go">Read <svg class="ico"><use href="#i-e"/></svg></span>
    </button>`).join('');
  return items;
}

export async function openPost(slug) {
  const w = items.find((x) => x.slug === slug);
  if (!w) return false;
  let body;
  try {
    const res = await fetch(BASE + w.file, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    body = (await res.text()).replace(/^﻿/, '').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  } catch (e) {
    toast('Could not load that writeup. Please try again.');
    return false;
  }
  // The panel shows the title already, so drop a leading "# Title".
  body = body.replace(/^\s*#\s+.+\r?\n/, '');
  const html = DOMPurify.sanitize(marked.parse(body), { FORBID_TAGS: ['style', 'form', 'input', 'iframe'] });

  showInPanel(`
    <div class="case__top">
      <span class="case__crumb mono">${esc(w.type)} &middot; ${esc(fmtDate(w.date))} &middot; ${w.minutes} min read</span>
      <button type="button" class="case__close" data-close aria-label="Close writeup"><svg class="ico"><use href="#i-x"/></svg></button>
    </div>
    <div class="case__body">
      <h2 id="case-title">${esc(w.title)}</h2>
      ${w.summary ? `<p class="case__sub">${esc(w.summary)}</p>` : ''}
      ${w.tags.length ? `<ul class="tags">${w.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <article class="prose" id="prose">${html}</article>
    </div>`, `#writeups/${slug}`, (panel) => {
    $$('table', panel).forEach((t) => { const wrap = document.createElement('div'); wrap.className = 'prose__table'; t.replaceWith(wrap); wrap.append(t); });
    $$('pre', panel).forEach((pre) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'prose__copy mono';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(pre.innerText.replace(/\nCopy$/, '')); btn.textContent = 'Copied'; } catch (e) { btn.textContent = 'Select to copy'; }
        setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
      });
      pre.append(btn);
    });
  });
  return true;
}

export function initWriteups() {
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-post]');
    if (b) openPost(b.dataset.post);
  });
  return loadWriteups().then(() => {
    const m = location.hash.match(/^#writeups\/(.+)$/);
    if (m) openPost(decodeURIComponent(m[1]));
  });
}
