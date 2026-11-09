// Scroll choreography (GSAP + ScrollTrigger + SplitText + Lenis) and page-level interactions.
import { animate, stagger } from '../assets/vendor/motion.subset.min.js';
import { $, $$, toast, lockPage, reducedMotion, setLenis, getLenis, scrollToTarget } from './util.js';
import { initWork, renderCerts, renderWriteups } from './work.js';
import { initConsole } from './console.js';
import { initWriteups } from './writeups.js';

const { gsap, ScrollTrigger, SplitText, Lenis } = window;
const MOTION = !reducedMotion && Boolean(gsap && ScrollTrigger && SplitText);

function showEverything() {
  document.documentElement.classList.remove('js', 'js-boot');
  $('#boot')?.remove();
}

/* ---------- Smooth scroll ---------- */
function initScroll() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  if (!Lenis || matchMedia('(pointer: coarse)').matches) return;
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
  setLenis(lenis);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Boot + hero intro ---------- */
function playBoot() {
  const boot = $('#boot');
  if (!document.documentElement.classList.contains('js-boot')) { boot?.remove(); return Promise.resolve(); }
  try { sessionStorage.setItem('booted', '1'); } catch (e) { /* storage blocked */ }
  const log = $('#boot-log');
  const addr = $('#boot-addr');
  const lines = ['POWER GOOD', 'CLOCK LOCKED', 'MAP 0x00-0xA0 OK', 'SECURE BOOT: ME'];
  const counter = { v: 0 };
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: () => { boot.remove(); document.documentElement.classList.remove('js-boot'); } })
      .to(counter, { v: 160, duration: 0.85, ease: 'power2.inOut', onUpdate: () => {
        addr.textContent = '0x' + Math.round(counter.v).toString(16).toUpperCase().padStart(2, '0');
        log.textContent = lines.slice(0, Math.ceil((counter.v / 160) * lines.length)).join('\n');
      } })
      .add(resolve, '+=0.05')
      .to(boot, { yPercent: -100, duration: 0.65, ease: 'expo.inOut' }, '+=0.05');
  });
}

function heroIntro(scene) {
  let board = null;
  // The scene loads on its own schedule; a slow connection must not stall the intro.
  scene.then((b) => { board = b; b?.begin(gsap); });

  const lines = $$('[data-hero-line]');
  const splits = lines.map((l) => new SplitText(l, { type: 'chars', charsClass: 'ch', aria: 'none' }));
  gsap.set(lines, { visibility: 'visible' });
  const rise = $$('[data-hero-rise]');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  splits.forEach((s, i) => {
    tl.from(s.chars, {
      yPercent: 105, opacity: 0, duration: 1.15,
      stagger: { each: 0.045, from: i ? 'end' : 'start' },
    }, i * 0.12);
  });
  tl.fromTo(rise, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12, clearProps: 'transform,visibility,opacity' }, 0.5);
  tl.from('.hero__meta > *', { y: -14, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.6);

  // The name shifts away from the pointer through the font's weight axis: real type, not a filter.
  if (matchMedia('(hover: hover) and (min-width: 900px)').matches) {
    const chars = splits.flatMap((s) => s.chars);
    const setters = chars.map((c) => (w, wd) => { c.style.fontVariationSettings = `"wdth" ${wd}, "wght" ${w}`; });
    const state = chars.map(() => ({ w: 800, wd: 84 }));
    let rects = [];
    const measure = () => { rects = chars.map((c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
    tl.call(measure);
    addEventListener('resize', measure, { passive: true });
    let mx = -9999, my = -9999, active = false;
    const hero = $('#top');
    hero.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; active = true; }, { passive: true });
    hero.addEventListener('pointerleave', () => { mx = my = -9999; });
    gsap.ticker.add(() => {
      if (!active || scrollY > innerHeight) return;
      let settled = true;
      chars.forEach((_, i) => {
        const r = rects[i];
        if (!r) return;
        const dist = Math.hypot(mx - r[0], my - r[1]);
        const k = Math.max(0, 1 - dist / 340);
        const tw = 800 - k * 480, twd = 84 + k * 16;
        const s = state[i];
        s.w += (tw - s.w) * 0.14;
        s.wd += (twd - s.wd) * 0.14;
        if (Math.abs(tw - s.w) > 0.5) settled = false;
        setters[i](s.w.toFixed(0), s.wd.toFixed(1));
      });
      if (settled && mx < 0) active = false;
    });
  }

  // Scrolling away: the name splits apart and fades as the board tilts under it.
  gsap.timeline({ scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true, onUpdate: (st) => board?.setScroll(st.progress) } })
    .to('.hero__line:not(.hero__line--r)', { xPercent: -7 }, 0)
    .to('.hero__line--r', { xPercent: 7 }, 0)
    .to('.hero__name, .hero__foot', { opacity: 0, ease: 'power1.in' }, 0);
}

/* ---------- Generic reveals ---------- */
function initReveals() {
  gsap.utils.toArray('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.07,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }),
    });
  });

  // Statement lights up word by word, tied to scroll.
  gsap.utils.toArray('[data-words]').forEach((el) => {
    const s = new SplitText(el, { type: 'words', aria: 'auto' });
    gsap.fromTo(s.words, { opacity: 0.16 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.4 },
    });
  });

  gsap.set('[data-reveal]', { y: 34, autoAlpha: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, clearProps: 'transform' }),
  });

  gsap.utils.toArray('[data-clip]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
    gsap.fromTo($('img', el), { scale: 1.2 }, { scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
  });

  // Paper sheets widen to full bleed as they slide over the mask.
  gsap.utils.toArray('[data-panel]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(0% 5% 0% 5%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: true },
    });
  });

  // Numbers count up when they arrive.
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const fmt = new Intl.NumberFormat('en-US');
    const o = { v: 0 };
    gsap.to(o, {
      v: end, duration: end > 100 ? 1.8 : 1.1, ease: 'power3.out',
      onUpdate: () => { el.textContent = fmt.format(Math.round(o.v)); },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Ticker rows drift with scroll.
  gsap.utils.toArray('[data-drift]').forEach((el) => {
    gsap.fromTo(el, { xPercent: +el.dataset.drift < 0 ? 0 : -12 }, {
      xPercent: +el.dataset.drift < 0 ? -22 : 6, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
    });
  });

  // Display type breathes through the width axis.
  gsap.utils.toArray('[data-stretch]').forEach((el) => {
    gsap.fromTo(el, { fontVariationSettings: '"wdth" 50' }, {
      fontVariationSettings: '"wdth" 70', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: 0.4 },
    });
  });

}

/* ---------- Horizontal work gallery ---------- */
function initGallery() {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const track = $('#selected-track');
    const distance = () => Math.max(0, track.scrollWidth - innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: { trigger: '#selected', start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    $$('[data-parallax]', track).forEach((img) => {
      gsap.fromTo(img, { scale: 1.16, xPercent: -5 }, {
        scale: 1.16, xPercent: 5, ease: 'none',
        scrollTrigger: { trigger: img.closest('.slide'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
      });
    });
  });
  mm.add('(max-width: 1023px)', () => {
    $$('.slide__media').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true } });
    });
  });
}

/* ---------- Experience trace ---------- */
function initTrace() {
  const host = $('#timeline');
  const svg = $('#trace');
  const vias = $$('.via', host);
  const base = $('.trace__base', svg);
  const live = $('.trace__live', svg);

  // Route a real-looking trace: vertical runs with a 45-degree jog between vias.
  const build = () => {
    const top = host.getBoundingClientRect().top;
    const ys = vias.map((v) => v.getBoundingClientRect().top - top + v.offsetHeight / 2);
    const h = host.offsetHeight;
    const X = 9;
    let d = `M${X} ${ys[0]}`;
    ys.slice(1).forEach((y, i) => {
      const prev = ys[i];
      const mid = prev + (y - prev) * 0.45;
      d += ` L${X} ${mid} L${X + 16} ${mid + 16} L${X + 16} ${mid + 60} L${X} ${mid + 76} L${X} ${y}`;
    });
    d += ` L${X} ${h}`;
    base.setAttribute('d', d);
    live.setAttribute('d', d);
  };
  build();

  if (!MOTION) return;
  ScrollTrigger.addEventListener('refreshInit', build);
  gsap.fromTo(live, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: host, start: 'top 72%', end: 'bottom 72%', scrub: 0.5 } });
  vias.forEach((v) => ScrollTrigger.create({ trigger: v, start: 'top 72%', toggleClass: { targets: v, className: 'is-lit' } }));
}

/* ---------- Bar, memory map, program counter ---------- */
function initChrome() {
  const bar = $('#bar');
  const pc = $('#pc');
  const map = $('#memmap');
  const links = $$('a', map);
  const navLinks = $$('.bar__nav a');
  const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);

  let last = scrollY;
  const onScroll = () => {
    const y = scrollY;
    bar.classList.toggle('is-solid', y > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    pc.textContent = '0x' + Math.round((y / Math.max(max, 1)) * 160).toString(16).toUpperCase().padStart(2, '0');
    if (!reducedMotion && !document.body.classList.contains('locked')) {
      const hide = y > last + 4 && y > innerHeight * 0.8;
      const show = y < last - 4 || y < 80;
      if (hide) bar.style.transform = 'translateY(-100%)';
      else if (show) bar.style.transform = '';
      last = y;
    }
  };
  bar.style.transition = 'background .3s, backdrop-filter .3s, transform .4s cubic-bezier(.2,.8,.2,1)';
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const hash = `#${e.target.id}`;
      links.forEach((l) => l.classList.toggle('is-here', l.getAttribute('href') === hash));
      navLinks.forEach((l) => l.classList.toggle('is-here', l.getAttribute('href') === hash));
      const theme = e.target.dataset.theme;
      map.classList.toggle('on-paper', theme === 'paper');
      map.classList.toggle('on-signal', theme === 'signal');
    }
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = a.getAttribute('href');
    if (target.length < 2 || !$(target)) return;
    e.preventDefault();
    scrollToTarget(target);
    history.replaceState(null, '', target === '#top' ? location.pathname : target);
  });
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const menu = $('#menu');
  const close = () => { if (menu.open) { menu.close(); lockPage(false); } };
  $('#menu-open').addEventListener('click', () => {
    lockPage(true);
    menu.showModal();
    if (!reducedMotion) {
      animate(menu, { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }, { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] });
      animate($$('nav a', menu), { y: [28, 0], opacity: [0, 1] }, { type: 'spring', stiffness: 300, damping: 26, delay: stagger(0.035, { startDelay: 0.08 }) });
    }
  });
  $('#menu-close').addEventListener('click', close);
  menu.addEventListener('close', () => lockPage(false));
  $$('nav a', menu).forEach((a) => a.addEventListener('click', close));
}

/* ---------- Copy to clipboard ---------- */
function initMicro() {
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      toast(`Copied ${b.dataset.copy}`);
    } catch (err) {
      toast('Could not copy. Please select the text instead.');
    }
  });

}

/* ---------- Start ---------- */
async function startBoardScene() {
  const canvas = $('#board');
  if (!canvas || navigator.connection?.saveData) return null;
  try {
    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl2')) return null;
    const { startBoard } = await import('./hero-scene.js');
    return await startBoard(canvas, { reduced: reducedMotion });
  } catch (err) {
    // The hero has a CSS background of its own, so a failed scene costs nothing.
    console.warn('Board scene unavailable:', err);
    return null;
  }
}

async function start() {
  $('#year').textContent = new Date().getFullYear();
  renderCerts();
  renderWriteups();
  const posts = initWriteups();
  initConsole();
  initMenu();

  await Promise.race([posts, new Promise((r) => setTimeout(r, 2500))]);

  if (!MOTION) {
    if (reducedMotion) document.documentElement.classList.remove('js-boot');
    $('#boot')?.remove();
    if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    initWork();
    initTrace();
    initChrome();
    initMicro();
    startBoardScene();
    if (!gsap) showEverything();
    return;
  }

  initScroll();
  initWork();
  initChrome();
  initMicro();

  const scene = startBoardScene();
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  initGallery();
  initTrace();
  initReveals();

  await playBoot();
  heroIntro(scene);
  ScrollTrigger.refresh();
  addEventListener('load', () => ScrollTrigger.refresh());
  if (location.hash && !/^#(case|writeup|writeups)\//.test(location.hash) && $(location.hash)) getLenis()?.scrollTo(location.hash, { immediate: true });
}

start().catch((err) => {
  console.error(err);
  showEverything();
});
