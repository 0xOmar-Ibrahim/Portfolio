// Entry point for writeups.html: builds the full list, then wires copy-to-clipboard on the page.
import { initWriteupsPage } from './writeups.js';

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-copy]');
  if (!b) return;
  try {
    await navigator.clipboard.writeText(b.dataset.copy);
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = `Copied ${b.dataset.copy}`;
    document.getElementById('toasts').append(toast);
    setTimeout(() => toast.remove(), 2400);
  } catch (err) { /* clipboard blocked */ }
});

initWriteupsPage();
