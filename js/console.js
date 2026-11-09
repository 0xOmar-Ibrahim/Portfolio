// 0xConsole: every command reads from the same data as the page, so counts cannot drift.
import { animate } from '../assets/vendor/motion.subset.min.js';
import { $, $$, esc, lockPage, reducedMotion } from './util.js';
import { openCase, openWriteup } from './work.js';
import { getWriteups, openPost } from './writeups.js';

const RESUME = 'pdfs/Omar%20Ibrahim%20Fathy%20-%20Junior%20Pentester.pdf';
const HTB = 'https://profile.hackthebox.com/profile/019d54eb-0059-73f5-b194-30bb57793407';
const link = (href, text = href) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
const g = (s) => `<span class="c-g">${s}</span>`;
const w = (s) => `<span class="c-w">${s}</span>`;
const d = (s) => `<span class="c-d">${s}</span>`;
const r = (s) => `<span class="c-r">${s}</span>`;

const COMMANDS = {
  help: () => {
    const rows = [
      ['whoami', 'Who I am and where I rank'], ['ctf', 'Competition results and platform rankings'], ['skills', 'Languages, tools and methods'],
      ['projects', `List all ${window.PROJECTS_DATA.length} projects`], ['findings', 'List audits and disclosures'], ['writeups', 'List writeups'], ['open <id>', 'Open a project, finding or writeup'], ['exp', 'Work and training history'],
      ['edu', 'Education and national ranking'], ['certs', 'Certificates with links'], ['contact', 'Email, phone and profiles'], ['resume', 'Open the resume PDF'],
      ['nmap [host]', 'A joke scan of this page, not real traffic'], ['clear', 'Clear the screen'], ['exit', 'Close the console'],
    ];
    return rows.map(([c, t]) => `  ${g(esc(c.padEnd(13)))}${t}`).join('\n');
  },
  whoami: () => `${w('OMAR IBRAHIM')}  Penetration Tester &amp; Ethical Hacker
Giza, Egypt. Open to pentest and offensive security roles.
Found and disclosed a critical production IDOR exposing PII
HTB Skilled (Lvl 33, 14,310 XP) / TryHackMe top 7% / #9 global Hawaii Cyber CTF / #4 solo IEEE CTF
3rd nationally in Egypt, Embedded Systems &amp; AI`,
  ctf: () => `${g('HACK THE BOX')}     Skilled, Level 33, 14,310 XP, 753.2 XP/week, 19 active weeks, 6 badges
                 ${link(HTB)}
${g('TRYHACKME')}        Top 7% worldwide, 70+ rooms
                 ${link('https://tryhackme.com/p/0x4FMR')}
${g('HAWAII CYBER')}     #9 global, powered by Hack The Box
                 ${link('pdfs/Hawaii-Cyber-CTF.pdf', 'certificate')}
${g('PWN3RX0 (IEEE)')}   #4 solo against teams of 3 to 5
                 ${link('pdfs/IEEE-CTF.pdf', 'certificate')}`,
  skills: () => `${g('LANGUAGES ')} C, Python 3, x86-64 Assembly, SQL, Bash, PowerShell, JavaScript
${g('OFFENSIVE ')} OWASP Top 10, manual web pentesting, privilege escalation, CVE exploitation
${g('TOOLS     ')} Metasploit, OpenVAS, Burp Suite, Nmap, Wireshark, Gobuster, IDA Pro, SQLmap
${g('HARDWARE  ')} ESP32, ESP8266, RFID security, custom PCB design, Firebase, Flutter`,
  projects: () => window.PROJECTS_DATA.map((p, i) => `${d(String(i + 1).padStart(2, '0'))} ${g(esc(p.id.padEnd(28)))}${esc(p.title)}`).join('\n') + `\n\n${d("Type 'open <id>', e.g. open morse-code-x86")}`,
  findings: () => (window.WRITEUPS_DATA || []).filter((x) => !x.draft).map((x) => `${g(esc(x.id.padEnd(20)))}${esc(x.title)}`).join('\n') + `\n\n${d("Type 'open <id>', e.g. open self-audit")}`,
  exp: () => `${g('Aug 2026 - Sep 2026')}  Penetration Testing &amp; AppSec Trainee, NTI
${g('Oct 2025 - Nov 2025')}  Python Developer Intern, CodeAlpha
${g('Feb 2025           ')}  Independent web security research, critical IDOR disclosed
${g('Aug 2023 - Jun 2025')}  Embedded Software Developer, LABstar`,
  edu: () => `${g('Expected 2029')}  BSc Information Technology, New Cairo Technological University
${g('Jun 2025     ')}  Diploma, Embedded Systems &amp; AI, MICA (Giza)
               ${w('Ranked 3rd nationally across Egypt')}`,
  certs: () => window.CERTIFICATES_DATA.filter((c) => !c.hidden).map((c) => `${g(esc(c.date.padEnd(9)))}${link(c.fileUrl, c.title)} ${d(esc(c.issuer))}`).join('\n'),
  contact: () => `${g('email   ')} <a href="mailto:omarforsec@gmail.com">omarforsec@gmail.com</a>
${g('phone   ')} 01061408612 / 01144130977
${g('github  ')} ${link('https://github.com/0xOmar-Ibrahim')}
${g('linkedin')} ${link('https://www.linkedin.com/in/0x4fmar')}`,
  nmap: (args) => `${d('# No packets sent. This only "scans" the portfolio you are reading.')}
Nmap scan report for ${esc(args[0] || 'portfolio.local')}
PORT      STATE  SERVICE
80/tcp    open   projects (${window.PROJECTS_DATA.length} found)
443/tcp   open   certificates (${window.CERTIFICATES_DATA.filter((c) => !c.hidden).length} found)
1337/tcp  open   ctf-scoreboard
8080/tcp  open   recruiter-inbox ${g('&lt;-- try this one')}`,
  sudo: () => `omar is not in the sudoers file. ${r('This incident will be reported.')}`,
  ls: () => 'projects/  certs/  resume.pdf  scoreboard.txt  .secrets',
  cat: (args) => (args[0] === '.secrets'
    ? `${r('Permission denied.')} Nice try, though.`
    : /resume/i.test(args[0] || '') ? COMMANDS.whoami() : `cat: ${esc(args[0] || '')}: try 'cat resume'`),
  matrix: () => g('01001111 01001101 01000001 01010010'),
};
COMMANDS.ctfs = COMMANDS.ctf;
COMMANDS.writeups = () => (getWriteups().length
  ? getWriteups().map((x) => `${g(esc(x.date))}  ${g(esc(x.slug.padEnd(26)))}${esc(x.title)}`).join('\n') + `\n\n${d("Type 'open <id>' to read one")}`
  : d('No writeups published yet.'));
COMMANDS.certificates = COMMANDS.certs;

export function initConsole() {
  const dlg = $('#console');
  const win = $('#console-win');
  const out = $('#console-out');
  const screen = $('#console-screen');
  const input = $('#console-in');
  const history = [];
  let hIdx = 0;

  const print = (html, cls) => {
    const el = document.createElement('div');
    if (cls) el.className = cls;
    el.innerHTML = html;
    out.append(el);
    screen.scrollTop = screen.scrollHeight;
  };

  const banner = () => {
    print(`${w("Omar Ibrahim's offensive security console.")}\nType ${g('help')} or pick a command:`);
    const chips = document.createElement('div');
    chips.className = 'console__chips';
    for (const c of ['whoami', 'ctf', 'findings', 'projects', 'skills', 'certs', 'contact', 'nmap']) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = c;
      b.addEventListener('click', () => { run(c); input.focus(); });
      chips.append(b);
    }
    out.append(chips);
  };

  function close() {
    if (!dlg.open) return;
    const done = () => { dlg.close(); lockPage(false); };
    if (reducedMotion) return done();
    animate(win, { opacity: 0, scale: 0.97 }, { duration: 0.16 }).then(done);
  }

  function open() {
    if (dlg.open) return;
    lockPage(true);
    dlg.showModal();
    input.focus();
    if (!reducedMotion) animate(win, { opacity: [0, 1], scale: [0.95, 1], y: [24, 0] }, { type: 'spring', stiffness: 340, damping: 28 });
    else { win.style.opacity = 1; win.style.transform = 'none'; }
  }

  function run(raw) {
    const line = raw.trim();
    if (!line) return;
    history.push(line);
    hIdx = history.length;
    print(`<span class="prompt">omar@sec-station:~$</span> ${esc(line)}`);
    const [cmd, ...args] = line.split(/\s+/);
    const name = cmd.toLowerCase();

    if (name === 'clear') { out.innerHTML = ''; return; }
    if (['exit', 'quit', 'close'].includes(name)) { close(); return; }
    if (name === 'resume' || name === 'pdf') {
      window.open(RESUME, '_blank', 'noopener');
      print(`${g('[+]')} Opening ${link(RESUME, 'resume PDF')}`);
      return;
    }
    if (name === 'open') {
      const hit = window.PROJECTS_DATA.find((p) => p.id.toLowerCase() === (args[0] || '').toLowerCase());
      const report = (window.WRITEUPS_DATA || []).find((x) => !x.draft && x.id === (args[0] || '').toLowerCase());
      if (report) {
        print(`${g('[+]')} Opening ${esc(report.title)}`);
        setTimeout(() => { dlg.close(); lockPage(false); openWriteup(report.id); }, 300);
        return;
      }
      const post = getWriteups().find((x) => x.slug === (args[0] || '').toLowerCase());
      if (post) {
        print(`${g('[+]')} Opening ${esc(post.title)}`);
        setTimeout(() => { dlg.close(); lockPage(false); openPost(post.slug); }, 300);
        return;
      }
      if (!hit) { print(r(args[0] ? `'${esc(args[0])}' not found. Type 'projects', 'findings' or 'writeups' for IDs.` : "Usage: open <id>. Type 'projects', 'findings' or 'writeups' for IDs.")); return; }
      print(`${g('[+]')} Opening ${esc(hit.title)}`);
      setTimeout(() => { dlg.close(); lockPage(false); openCase(hit.id); }, 300);
      return;
    }
    const fn = Object.prototype.hasOwnProperty.call(COMMANDS, name) ? COMMANDS[name] : null;
    print(fn ? fn(args) : r(`Command '${esc(cmd)}' not found. Type 'help'.`));
    print('&nbsp;');
  }

  banner();
  $('#console-form').addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && hIdx > 0) { e.preventDefault(); input.value = history[--hIdx]; }
    if (e.key === 'ArrowDown') { e.preventDefault(); hIdx = Math.min(hIdx + 1, history.length); input.value = history[hIdx] || ''; }
  });
  screen.addEventListener('click', (e) => { if (!e.target.closest('a,button') && !getSelection().toString()) input.focus(); });
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  $('#console-close').addEventListener('click', close);
  $$('[data-console]').forEach((b) => b.addEventListener('click', open));
  addEventListener('keydown', (e) => {
    if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return;
    if (dlg.open) { e.preventDefault(); close(); return; }
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '') || $('#case').open) return;
    e.preventDefault();
    open();
  });
}
