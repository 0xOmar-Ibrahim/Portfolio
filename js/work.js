// Projects: selected gallery, filterable index and the case file dialog.
import { animate } from '../assets/vendor/motion.subset.min.js';
import { $, $$, esc, lockPage, reducedMotion } from './util.js';
import { hasTool, mountTool } from './tools.js';

const SELECTED = ['tryhackme-ctf', 'ibm-ethical-hacking', 'smart-elevator-rfid', 'morse-code-x86', 'esp32-21-relay-controller'];

// Index order: security first, then systems with a security angle, then the rest.
const ORDER = ['tryhackme-ctf', 'ibm-ethical-hacking', 'smart-elevator-rfid', 'electronics-mgmt-rbac', 'labstar-elevator-control', 'sensor-telemetry-pipeline', 'bank-management-system', 'morse-code-x86', 'keygarden-pass-gen', 'esp32-21-relay-controller', 'voice-smart-home', 'employee-management-c', 'cinema-management-c', 'number-system-converter'];

// Earlier work, folded away under the "All" view so the first impression stays on security.
const EARLIER = new Set(['cinema-management-c', 'number-system-converter']);

// Better first frames than the data file's cover for the gallery.
const SELECTED_COVER = {
  'smart-elevator-rfid': 'assets/projs-imgs/DWIN_RFID.png',
  'esp32-21-relay-controller': 'assets/projs-imgs/PCB-1.jpg',
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
        <span class="slide__sub">${esc(p.securityAngle || p.subtitle)}</span>
        <span class="slide__go">Open case file <svg class="ico"><use href="#i-e"/></svg></span>
      </span>
    </button>`;
  }).join('');
}

let showEarlier = false;
let currentFilter = 'all';

function renderRows(filter = currentFilter) {
  currentFilter = filter;
  const inFilter = data().filter((p) => filter === 'all' || p.affiliation === filter);
  const list = inFilter.filter((p) => filter !== 'all' || showEarlier || !EARLIER.has(p.id));
  const more = $('#rows-more');
  const hidden = inFilter.length - list.length;
  more.hidden = hidden === 0;
  more.textContent = `Show ${hidden} earlier project${hidden === 1 ? '' : 's'}`;
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
      ${p.securityAngle ? `<p class="angle">${esc(p.securityAngle)}</p>` : ''}
      <h3>Brief</h3>
      <p class="case__lead">${esc(p.fullDescription.trim())}</p>
      ${p.audit ? `<h3>What my audit found</h3>
      <div class="audit-note"><p>${esc(p.audit.note)}</p>
        <button type="button" class="link-btn" data-writeup="${esc(p.audit.writeup)}">Read the audit <svg class="ico"><use href="#i-e"/></svg></button></div>` : ''}
      ${hasTool(p) ? `<h3>Try it here</h3><div id="case-tool"></div>` : ''}
      <h3>Highlights</h3>
      <ul class="case__list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      ${p.attackPlan?.length ? `<h3>How I'd attack it today</h3>
      <p class="case__note">A test plan from what I know now, not work I have already done on this system.</p>
      <ul class="case__list">${p.attackPlan.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
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

const writeups = () => (window.WRITEUPS_DATA || []).filter((w) => !w.draft);
const sevClass = (s) => `sev sev--${esc(String(s).toLowerCase())}`;

function sectionHTML(s) {
  return `<h3>${esc(s.heading)}</h3>
    ${(s.text || []).map((t) => `<p class="case__lead">${esc(t)}</p>`).join('')}
    ${s.list ? `<ul class="case__list">${s.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
    ${s.code ? `<pre class="case__code"><code>${esc(s.code)}</code></pre>` : ''}`;
}

function findingHTML(f) {
  return `<article class="finding">
    <div class="finding__head"><span class="${sevClass(f.severity)}">${esc(f.severity)}</span><h4>${esc(f.title)}</h4></div>
    ${f.url ? `<a class="finding__where" href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.where)}</a>` : `<p class="finding__where">${esc(f.where)}</p>`}
    ${f.evidence ? `<pre class="case__code"><code>${esc(f.evidence)}</code></pre>` : ''}
    ${f.result ? `<pre class="case__code case__code--out"><code>${esc(f.result)}</code></pre>` : ''}
    <dl><dt>Impact</dt><dd>${esc(f.impact)}</dd><dt>Fix</dt><dd>${esc(f.fix)}</dd></dl>
  </article>`;
}

function writeupHTML(w) {
  return `
    <div class="case__top">
      <span class="case__crumb mono">${esc(w.type)} &middot; ${esc(w.date)}</span>
      <button type="button" class="case__close" data-close aria-label="Close writeup"><svg class="ico"><use href="#i-x"/></svg></button>
    </div>
    <div class="case__body">
      <h2 id="case-title">${esc(w.title)}</h2>
      <p class="case__sub">${esc(w.summary)}</p>
      <ul class="tags">${(w.tags || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
      ${(w.sections || []).map(sectionHTML).join('')}
      ${w.findings?.length ? `<h3>Findings (${w.findings.length})</h3>${w.findings.map(findingHTML).join('')}` : ''}
      ${(w.closing || []).map(sectionHTML).join('')}
      ${w.refs?.length ? `<h3>References</h3><ul class="case__list">${w.refs.map((r) => `<li><a class="finding__where" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a></li>`).join('')}</ul>` : ''}
    </div>`;
}

export function renderWriteups() {
  const host = $('#writeups');
  const list = writeups();
  // No published writeups: hide the section and its links rather than showing an empty shelf.
  if (!list.length) {
    $('#findings').remove();
    $$('a[href="#findings"]').forEach((a) => a.remove());
    return;
  }
  host.innerHTML = list.map((w) => {
    const counts = ['High', 'Medium', 'Low'].map((sev) => [sev, (w.findings || []).filter((f) => f.severity === sev).length]).filter(([, n]) => n);
    return `<button type="button" class="writeup" data-writeup="${esc(w.id)}" data-reveal>
      <span class="writeup__meta mono">${esc(w.type)}<span>${esc(w.date)}</span></span>
      <span>
        <span class="writeup__title">${esc(w.title)}</span>
        <span class="writeup__sum">${esc(w.summary)}</span>
        ${counts.length ? `<span class="writeup__count">${counts.map(([sev, n]) => `<span class="${sevClass(sev)}">${n} ${esc(sev)}</span>`).join('')}</span>` : ''}
      </span>
      <span class="writeup__go">Read <svg class="ico"><use href="#i-e"/></svg></span>
    </button>`;
  }).join('');
}

function revealPanel() {
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

export function openWriteup(id) {
  const w = writeups().find((x) => x.id === id);
  if (!w) return;
  teardown?.();
  teardown = null;
  panel.onclick = null;
  dlg.onkeydown = null;
  panel.innerHTML = writeupHTML(w);
  panel.scrollTop = 0;
  history.replaceState(null, '', `#writeup/${id}`);
  revealPanel();
}

export function openCase(id) {
  const p = data().find((x) => x.id === id);
  if (!p) return;
  fill(p);
  history.replaceState(null, '', `#case/${id}`);
  if (dlg.open) return;
  revealPanel();
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
  window.PROJECTS_DATA?.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
  const rows = $('#rows');
  const more = document.createElement('button');
  more.type = 'button';
  more.id = 'rows-more';
  more.className = 'rows-more';
  more.addEventListener('click', () => { showEarlier = true; renderRows(); });
  rows.after(more);
  renderSelected();
  initFilters();
  renderRows();

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-case]');
    if (trigger) { openCase(trigger.dataset.case); return; }
    const report = e.target.closest('[data-writeup]');
    if (report) { openWriteup(report.dataset.writeup); return; }
    if (e.target.closest('[data-close]')) closeCase();
  });
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeCase(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeCase(); });

  const m = location.hash.match(/^#(case|writeup)\/(.+)$/);
  if (m) (m[1] === 'case' ? openCase : openWriteup)(decodeURIComponent(m[2]));
}

export function renderCerts() {
  const certs = window.CERTIFICATES_DATA || [];
  const shown = certs.filter((c) => !c.hidden);
  $('#certs-top').innerHTML = shown.filter((c) => c.highlight).map((c) => `
    <a class="cert-top" href="${esc(c.fileUrl)}" target="_blank" rel="noopener" data-reveal>
      <span class="cert-top__meta mono"><span>${esc(c.issuer)}</span><span>${esc(c.date)}</span></span>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.desc)}</p>
      <span class="cert-top__foot mono"><span>${esc(c.tag)}</span><svg class="ico"><use href="#i-ne"/></svg></span>
    </a>`).join('');
  $('#certs').innerHTML = shown.filter((c) => !c.highlight).map((c) => `
    <li data-reveal><a class="cert" href="${esc(c.fileUrl)}" target="_blank" rel="noopener">
      <span class="cert__date mono">${esc(c.date)}</span>
      <span class="cert__title">${esc(c.title)}</span>
      <span class="cert__issuer">${esc(c.issuer)}</span>
      <span class="cert__desc">${esc(c.desc)}</span>
      <svg class="ico cert__arrow"><use href="#i-ne"/></svg>
    </a></li>`).join('');
}
