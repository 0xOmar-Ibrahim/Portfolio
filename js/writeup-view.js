// Single-writeup reading page (writeup.html?p=<slug>). Full page, its own tab.
import { renderMarkdown, enhanceProse, postUrl, fmtDate, getWriteups } from './writeups.js';
import { $, esc } from './util.js';

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

const root = $('#article-root');
const slug = new URLSearchParams(location.search).get('p');

function notFound(msg) {
  root.innerHTML = `<div class="article article--msg">
    <p class="mono article__kicker">Writeup</p>
    <h1 class="article__title">Not found</h1>
    <p class="article__sum">${esc(msg)}</p>
    <a class="link-btn" href="writeups.html"><svg class="ico"><use href="#i-w"/></svg> All writeups</a>
  </div>`;
}

function pager(older, newer) {
  if (!older && !newer) return '';
  const link = (w, dir, label) => `<a href="${postUrl(w.slug)}">
      ${dir === 'prev' ? '<svg class="ico"><use href="#i-w"/></svg>' : ''}
      <span><span class="mono">${label}</span><span class="article__pager-t">${esc(w.title)}</span></span>
      ${dir === 'next' ? '<svg class="ico"><use href="#i-e"/></svg>' : ''}
    </a>`;
  return `<nav class="article__pager" aria-label="More writeups">
    ${older ? link(older, 'prev', 'Older') : '<span></span>'}
    ${newer ? link(newer, 'next', 'Newer') : ''}
  </nav>`;
}

async function main() {
  if (!slug) { notFound('No writeup was requested.'); return; }
  let data;
  try {
    data = await renderMarkdown(slug);
  } catch (e) {
    notFound('That writeup could not be loaded. Please try again.');
    return;
  }
  if (!data) {
    notFound(getWriteups().length ? 'That writeup does not exist, or it is still a draft.' : 'No writeups are published yet.');
    return;
  }
  const { w, html, older, newer } = data;
  document.title = `${w.title} | Writeups | Omar Ibrahim`;

  root.innerHTML = `<article class="article">
    <a class="article__back mono" href="writeups.html"><svg class="ico"><use href="#i-w"/></svg> All writeups</a>
    <header class="article__head">
      <p class="mono article__kicker">${esc(w.type)} &middot; ${esc(fmtDate(w.date))} &middot; ${w.minutes} min read</p>
      <h1 class="article__title">${esc(w.title)}</h1>
      ${w.summary && !w.autoSummary ? `<p class="article__sum">${esc(w.summary)}</p>` : ''}
      ${w.tags.length ? `<ul class="tags">${w.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    </header>
    <div class="prose">${html}</div>
    ${pager(older, newer)}
  </article>`;
  enhanceProse($('.prose', root));
}

main();
