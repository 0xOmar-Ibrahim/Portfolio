// Small tools that genuinely do what the original projects do, running in the browser.
import { esc } from './util.js';

const MORSE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', 0: '-----',
};

function morseTool(host) {
  host.innerHTML = `
    <div class="tool">
      <label for="t-morse">Text to encode</label>
      <input id="t-morse" type="text" value="OMAR IBRAHIM" maxlength="60">
      <div class="tool__out" id="t-morse-out" aria-live="polite"></div>
      <div class="tool__row"><span>A browser port of the encoding idea, played with Web Audio.</span>
        <button type="button" class="btn btn--line" id="t-morse-play">Play tones</button></div>
    </div>`;
  const input = host.querySelector('#t-morse');
  const out = host.querySelector('#t-morse-out');
  const play = host.querySelector('#t-morse-play');
  let ctx = null;
  const encode = () => input.value.toUpperCase().split('').map((c) => (c === ' ' ? '/' : MORSE[c] || '')).filter(Boolean).join(' ');
  const render = () => { out.textContent = encode() || 'Waiting for input'; };
  input.addEventListener('input', render);
  render();
  play.addEventListener('click', async () => {
    if (ctx) { await ctx.close(); ctx = null; play.textContent = 'Play tones'; return; }
    ctx = new AudioContext();
    const own = ctx;
    const unit = 0.075;
    let t = ctx.currentTime + 0.05;
    for (const s of encode()) {
      if (s === '.' || s === '-') {
        const len = s === '.' ? unit : unit * 3;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = 620;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.16, t + 0.005);
        g.gain.setValueAtTime(0.16, t + len - 0.005);
        g.gain.linearRampToValueAtTime(0, t + len);
        o.connect(g).connect(ctx.destination);
        o.start(t);
        o.stop(t + len);
        t += len + unit;
      } else if (s === ' ') t += unit * 2;
      else t += unit * 4;
    }
    play.textContent = 'Stop';
    setTimeout(() => { if (ctx === own) { own.close(); ctx = null; play.textContent = 'Play tones'; } }, (t - own.currentTime) * 1000 + 100);
  });
  return () => { if (ctx) ctx.close(); ctx = null; };
}

function passwordTool(host) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  host.innerHTML = `
    <div class="tool">
      <label for="t-pass-len">Length: <span id="t-pass-n">20</span> characters</label>
      <input id="t-pass-len" type="range" min="12" max="48" value="20">
      <div class="tool__out" id="t-pass-out"></div>
      <div class="tool__row"><span id="t-pass-bits"></span>
        <button type="button" class="btn btn--line" id="t-pass-new">Generate</button></div>
    </div>`;
  const len = host.querySelector('#t-pass-len');
  // Rejection sampling: a plain modulo would bias the alphabet.
  const limit = 256 - (256 % CHARS.length);
  const gen = () => {
    const n = +len.value;
    let s = '';
    while (s.length < n) {
      for (const b of crypto.getRandomValues(new Uint8Array(n * 2))) {
        if (b < limit && s.length < n) s += CHARS[b % CHARS.length];
      }
    }
    host.querySelector('#t-pass-n').textContent = n;
    host.querySelector('#t-pass-out').textContent = s;
    host.querySelector('#t-pass-bits').textContent = `About ${(n * Math.log2(CHARS.length)).toFixed(1)} bits of entropy. A browser version using crypto.getRandomValues. Nothing leaves your device.`;
  };
  len.addEventListener('input', gen);
  host.querySelector('#t-pass-new').addEventListener('click', gen);
  gen();
}

function numberTool(host) {
  host.innerHTML = `
    <div class="tool">
      <label for="t-num">Decimal value (0 to 4294967295)</label>
      <input id="t-num" type="number" value="1337" min="0" max="4294967295">
      <div class="tool__out" id="t-num-out"></div>
      <div class="tool__row"><span>A browser version that also shows byte order, which the desktop tool does not.</span></div>
    </div>`;
  const input = host.querySelector('#t-num');
  const out = host.querySelector('#t-num-out');
  const render = () => {
    const v = Math.min(Math.max(Math.floor(+input.value) || 0, 0), 0xffffffff) >>> 0;
    const hex = v.toString(16).toUpperCase().padStart(8, '0');
    const bytes = hex.match(/../g);
    const ascii = v >= 32 && v < 127 ? String.fromCharCode(v) : 'n/a';
    out.innerHTML = `<dl>
      <dt>HEX</dt><dd>0x${hex}</dd>
      <dt>BIN</dt><dd>${v.toString(2).padStart(32, '0').match(/.{4}/g).join(' ')}</dd>
      <dt>OCT</dt><dd>0o${v.toString(8)}</dd>
      <dt>ASCII</dt><dd>${esc(ascii)}</dd>
      <dt>BE</dt><dd>${bytes.join(' ')}</dd>
      <dt>LE</dt><dd>${[...bytes].reverse().join(' ')}</dd>
      <dt>~X</dt><dd>${(~v) >>> 0} (u32)</dd>
    </dl>`;
  };
  input.addEventListener('input', render);
  render();
}

const TOOLS = { 'morse-interactive': morseTool, 'password-generator': passwordTool, 'number-converter': numberTool };

export const hasTool = (project) => Boolean(TOOLS[project.demoType]);
export const mountTool = (project, host) => TOOLS[project.demoType]?.(host);
