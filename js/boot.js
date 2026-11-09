// Runs before first paint. External (not inline) so the CSP can stay script-src 'self'.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = false;
  try { seen = sessionStorage.getItem('booted') === '1'; } catch (e) { /* storage blocked */ }
  if (!reduced && !seen) root.classList.add('js-boot');
})();
