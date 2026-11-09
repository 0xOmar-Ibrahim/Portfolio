// Projects: selected gallery, filterable index and the case file dialog.
import { animate } from '../assets/vendor/motion.subset.min.js';
import { $, $$, esc, lockPage, reducedMotion } from './util.js';
import { hasTool, mountTool } from './tools.js';

const SELECTED = ['tryhackme-ctf', 'smart-elevator-rfid', 'esp32-21-relay-controller', 'morse-code-x86', 'voice-smart-home'];

// Better first frames than the data file's cover for the gallery.
const SELECTED_COVER = {
  'smart-elevator-rfid': 'assets/projs-imgs/DWIN_RFID.png',
  'esp32-21-relay-controller': 'assets/projs-imgs/PCB-1.jpg',
  'voice-smart-home': 'assets/projs-imgs/smart-home-11.jpg',
};

// Lab and CTF work has no real screenshots yet, so these get a typeset cover, not a stock image.
const TYPE_COVER = {
  'tryhackme-ctf': { lines: ['HTB Skilled', 'THM Top 7%'], note: 'Labs & CTF operations' },
  'ibm-ethical-hacking': { lines: ['OpenVAS', 'Metasploit'], note: 'IBM capstone', alt: true },
};

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Company', label: 'Company' },
  { key: 'Education', label: 'Education' },
  { key: 'Self-Employed', label: 'Independent' },
];

const opt = (path) => `assets/opt/${path.split('/').pop().replace(/\.[^.]+$/, '')}.webp`;
const data = () => window.PROJECTS_DATA || [];

const typeCover = (t) => `<span class="cover-type ${t.alt ? 'is-alt' : ''}"><small>${esc(t.note)}</small>${t.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</span>`;

function renderSelected() {
  const items = SELECTED.map((id) => data().find((p) => p.id === id)).filter(Boolean);
  $('#selected-track').innerHTML = items.map((p, i) => {
    const media = TYPE_COVER[p.id]
      ? typeCover(TYPE_COVER[p.id])
      : `<img src="${esc(opt(SELECTED_COVER[p.id] || p.image))}" alt="" loading="lazy" data-parallax>`;
    return `<button type="button" class="slide" data-case="${esc(p.id)}">
      <span class="slide__media">${media}</span>
      <span class="slide__text">
        <span class="slide__num mono">${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')} &middot; ${esc(p.date)}</span>
        <span class="slide__title">${esc(p.title)}</span>
        <span class="slide__sub">${esc(p.subtitle)}</span>
        <span class="slide__go">Open case file <svg class="ico"><use href="#i-e"/></svg></span>
      </span>
    </button>`;
  }).join('');
}

function renderRows(filter = 'all') {
  const list = data().filter((p) => filter === 'all' || p.affiliation === filter);
  $('#rows').innerHTML = list.map((p, i) => {
    const t = TYPE_COVER[p.id];
    return `<li><button type="button" class="row" data-case="${esc(p.id)}">
      ${t ? `<span class="row__thumb row__thumb--type"><svg class="ico"><use href="#i-term"/></svg></span>` : `<img class="row__thumb" src="${esc(opt(p.image))}" alt="" loading="lazy">`}
      <span class="row__idx mono">${String(i + 1).padStart(2, '0')}</span>
      <span class="row__title">${esc(p.title)}</span>
      <span class="row__sub">${esc(p.affiliationName || p.affiliation)}</span>
      <span class="row__meta mono">${esc(p.date)}</span>
      <svg class="ico row__arrow"><use href="#i-e"/></svg>
    </button></li>`;
  }).join('');
  if (!reducedMotion && window.gsap) gsap.from('#rows li', { opacity: 0, y: 14, duration: 0.45, stagger: 0.03, ease: 'power2.out', clearProps: 'all' });
  window.ScrollTrigger?.refresh();
}

function initFilters() {
  const host = $('#filters');
  const count = (k) => (k === 'all' ? data().length : data().filter((p) => p.affiliation === k).length);
  $('#archive-total').textContent = String(data().length).padStart(2, '0');
  host.innerHTML = FILTERS.map((f, i) => `<button type="button" class="filter" data-filter="${f.key}" aria-pressed="${i === 0}">${f.label}<small>${count(f.key)}</small></button>`).join('');
  host.addEventListener('click', (e) => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    $$('.filter', host).forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderRows(b.dataset.filter);
  });
}

// Cursor-following preview for the index on pointer devices.
function initPeek() {
  if (!matchMedia('(hover: hover) and (min-width: 900px)').matches || reducedMotion || !window.gsap) return;
  const peek = $('#peek');
  gsap.set(peek, { xPercent: 12, yPercent: -55 });
  const x = gsap.quickTo(peek, 'x', { duration: 0.5, ease: 'power3' });
  const y = gsap.quickTo(peek, 'y', { duration: 0.5, ease: 'power3' });
  let current = null;
  const rows = $('#rows');
  rows.addEventListener('pointermove', (e) => {
    // Keep the preview on screen and clear of the top bar.
    x(Math.min(e.clientX, innerWidth - peek.offsetWidth * 1.12 - 24));
    y(gsap.utils.clamp(peek.offsetHeight * 0.55 + 72, innerHeight - peek.offsetHeight * 0.45 - 16, e.clientY));
    const row = e.target.closest('.row');
    const id = row?.dataset.case;
    if (id === current) return;
    current = id;
    if (!id) return;
    const p = data().find((v) => v.id === id);
    peek.innerHTML = TYPE_COVER[id] ? typeCover(TYPE_COVER[id]) : `<img src="${esc(opt(p.image))}" alt="">`;
    gsap.to(peek, { autoAlpha: 1, scale: 1, duration: 0.3 });
  });
  rows.addEventListener('pointerleave', () => { current = null; gsap.to(peek, { autoAlpha: 0, duration: 0.25 }); });
}

/* ---------- Case file ---------- */
let dlg, panel, teardown = null, opener = null;

const humanize = (k) => k.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
const isPdf = (u) => /\.pdf($|\?)/i.test(u);

function caseHTML(p, idx) {
  const list = data();
  const prev = list[(idx - 1 + list.length) % list.length];
  const next = list[(idx + 1) % list.length];
  const photos = TYPE_COVER[p.id] ? [] : (p.photos?.length ? p.photos : [p.image]);

  const viewer = photos.length ? `<div class="viewer">
      <div class="viewer__stage">
        <img id="v-img" src="${esc(opt(photos[0]))}" alt="${esc(p.title)}, image 1 of ${photos.length}">
        ${photos.length > 1 ? `<button type="button" class="viewer__nav viewer__nav--p" data-step="-1" aria-label="Previous image"><svg class="ico"><use href="#i-w"/></svg></button>
        <button type="button" class="viewer__nav viewer__nav--n" data-step="1" aria-label="Next image"><svg class="ico"><use href="#i-e"/></svg></button>
        <span class="viewer__count mono" id="v-count">1 / ${photos.length}</span>` : ''}
      </div>
      ${photos.length > 1 ? `<div class="thumbs">${photos.map((ph, i) => `<button type="button" data-i="${i}" aria-label="Show image ${i + 1}" aria-current="${i === 0}"><img src="${esc(opt(ph))}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
    </div>` : '';

  const repo = (p.github || '').trim();
  const actions = [
    repo && `<a class="btn btn--gold" href="${esc(repo)}" target="_blank" rel="noopener">${isPdf(repo) ? `<span>Project book (PDF)</span><svg class="ico"><use href="#i-ne"/></svg>` : `<svg class="ico"><use href="#i-gh"/></svg><span>Source on GitHub</span>`}</a>`,
    (p.videoUrl || '').trim() && `<a class="btn btn--line" href="${esc(p.videoUrl)}" target="_blank" rel="noopener"><span>Watch demo video</span><svg class="ico"><use href="#i-ne"/></svg></a>`,
  ].filter(Boolean).join('');

  return `
    <div class="case__top">
      <span class="case__crumb mono">Case file ${String(idx + 1).padStart(2, '0')} &middot; ${esc(p.badge || p.affiliation)}</span>
      <button type="button" class="case__close" data-close aria-label="Close case file"><svg class="ico"><use href="#i-x"/></svg></button>
    </div>
    <div class="case__body">
      <h2 id="case-title">${esc(p.title)}</h2>
      <p class="case__sub">${esc(p.subtitle)}</p>
      <dl class="case__facts">
        <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
        <div><dt>Context</dt><dd>${esc(p.affiliationName || p.affiliation)}</dd></div>
        <div><dt>Date</dt><dd>${esc(p.date)}</dd></div>
      </dl>
      ${actions ? `<div class="case__actions">${actions}</div>` : ''}
      ${viewer}
      <h3>Brief</h3>
      <p class="case__lead">${esc(p.fullDescription.trim())}</p>
      ${hasTool(p) ? `<h3>Try it here</h3><div id="case-tool"></div>` : ''}
      <h3>Highlights</h3>
      <ul class="case__list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      ${p.architecture && Object.keys(p.architecture).length ? `<h3>Architecture</h3>
      <dl class="arch">${Object.entries(p.architecture).map(([k, v]) => `<div><dt>${esc(humanize(k))}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
      <h3>Stack</h3>
      <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="case__pager">
        <button type="button" data-case="${esc(prev.id)}"><svg class="ico"><use href="#i-w"/></svg><span>${esc(prev.title)}</span></button>
        <button type="button" data-case="${esc(next.id)}"><span>${esc(next.title)}</span><svg class="ico"><use href="#i-e"/></svg></button>
      </div>
    </div>`;
}

function fill(p) {
  teardown?.();
  teardown = null;
  const idx = data().indexOf(p);
  panel.innerHTML = caseHTML(p, idx);
  panel.scrollTop = 0;
  if (hasTool(p)) teardown = mountTool(p, $('#case-tool', panel)) || null;

  const photos = TYPE_COVER[p.id] ? [] : (p.photos?.length ? p.photos : [p.image]);
  let i = 0;
  const show = (n) => {
    i = (n + photos.length) % photos.length;
    const img = $('#v-img', panel);
    img.src = opt(photos[i]);
    img.alt = `${p.title}, image ${i + 1} of ${photos.length}`;
    const count = $('#v-count', panel);
    if (count) count.textContent = `${i + 1} / ${photos.length}`;
    $$('.thumbs button', panel).forEach((b, k) => {
      b.setAttribute('aria-current', k === i);
      if (k === i) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  };
  panel.onclick = (e) => {
    const step = e.target.closest('[data-step]');
    if (step) show(i + +step.dataset.step);
    const thumb = e.target.closest('[data-i]');
    if (thumb) show(+thumb.dataset.i);
  };
  dlg.onkeydown = (e) => {
    if (photos.length < 2 || e.target.matches('input')) return;
    if (e.key === 'ArrowRight') show(i + 1);
    if (e.key === 'ArrowLeft') show(i - 1);
  };
}

export function openCase(id) {
  const p = data().find((x) => x.id === id);
  if (!p) return;
  fill(p);
  history.replaceState(null, '', `#case/${id}`);
  if (dlg.open) return;
  opener = document.activeElement;
  lockPage(true);
  dlg.showModal();
  $('[data-close]', panel)?.focus();
  if (!reducedMotion) {
    animate(panel, { x: ['100%', '0%'] }, { type: 'spring', stiffness: 210, damping: 30 });
    animate(dlg, { opacity: [0, 1] }, { duration: 0.25 });
  }
}

function closeCase() {
  if (!dlg.open) return;
  const done = () => {
    teardown?.();
    teardown = null;
    dlg.close();
    lockPage(false);
    history.replaceState(null, '', location.pathname + location.search);
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  };
  if (reducedMotion) return done();
  animate(panel, { x: '100%' }, { duration: 0.28, ease: [0.4, 0, 1, 1] }).then(done);
}

export function initWork() {
  dlg = $('#case');
  panel = $('#case-panel');
  renderSelected();
  initFilters();
  renderRows();
  initPeek();

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case]');
    if (trigger) { openCase(trigger.dataset.case); return; }
    if (e.target.closest('[data-close]')) closeCase();
  });
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeCase(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeCase(); });

  const m = location.hash.match(/^#case\/(.+)$/);
  if (m) openCase(decodeURIComponent(m[1]));
}

export function renderCerts() {
  const certs = window.CERTIFICATES_DATA || [];
  $('#certs-top').innerHTML = certs.filter((c) => c.highlight).map((c) => `
    <a class="cert-top" href="${esc(c.fileUrl)}" target="_blank" rel="noopener" data-reveal>
      <span class="cert-top__meta mono"><span>${esc(c.issuer)}</span><span>${esc(c.date)}</span></span>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.desc)}</p>
      <span class="cert-top__foot mono"><span>${esc(c.tag)}</span><svg class="ico"><use href="#i-ne"/></svg></span>
    </a>`).join('');
  $('#certs').innerHTML = certs.filter((c) => !c.highlight).map((c) => `
    <li data-reveal><a class="cert" href="${esc(c.fileUrl)}" target="_blank" rel="noopener">
      <span class="cert__date mono">${esc(c.date)}</span>
      <span class="cert__title">${esc(c.title)}</span>
      <span class="cert__issuer">${esc(c.issuer)}</span>
      <span class="cert__desc">${esc(c.desc)}</span>
      <svg class="ico cert__arrow"><use href="#i-ne"/></svg>
    </a></li>`).join('');
}
