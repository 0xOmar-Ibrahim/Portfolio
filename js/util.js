import { animate } from '../assets/vendor/motion.subset.min.js';

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export function toast(message) {
  const host = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  host.append(el);
  if (!reducedMotion) animate(el, { y: [24, 0], opacity: [0, 1] }, { type: 'spring', stiffness: 420, damping: 30 });
  setTimeout(() => el.remove(), 2600);
}

// Pause the page's smooth scroll while a dialog is open.
const scroll = { lenis: null };
export const setLenis = (l) => { scroll.lenis = l; };
export const getLenis = () => scroll.lenis;
export function lockPage(on) {
  document.body.classList.toggle('locked', on);
  if (scroll.lenis) { if (on) scroll.lenis.stop(); else scroll.lenis.start(); }
}

export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (scroll.lenis) scroll.lenis.scrollTo(el, { duration: 1.3 });
  else {
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    // Lazy content can shift the layout during a long smooth scroll, so re-align on arrival.
    addEventListener('scrollend', () => {
      if (Math.abs(el.getBoundingClientRect().top) > 2) el.scrollIntoView({ behavior: 'auto' });
    }, { once: true });
  }
}
