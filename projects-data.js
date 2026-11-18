/**
 * Omar Ibrahim - Project data.
 *
 * Everything here should be something you can defend in an interview, and the public repos
 * should back it up. Optional security fields shown in the case file:
 *   securityAngle  one sentence on why this matters for security work
 *   attackPlan     how you would attack it today (a plan, not a claim of work done)
 *   audit          { writeup: "<writeups-data.js id>", note: "what the audit found" }
 *
 * Affiliation types: "Company" | "Self-Employed" | "Education"
 */

var PROJECTS_DATA = [
  {
    "id": "tryhackme-ctf",
    "title": "Penetration Testing Labs & CTF Operations",
    "subtitle": "HTB Skilled rank, TryHackMe top 7% and 4th solo at the HITU IEEE CTF",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent / CTF",
    "featured": true,
    "badge": "HTB Skilled & THM Top 7%",
    "image": "assets/images/pentest-lab.jpg",
    "photos": [
      "assets/images/pentest-lab.jpg"
    ],
    "videoUrl": "",
    "tags": [
      "Hack The Box",
      "TryHackMe",
      "Nmap",
      "Metasploit",
      "Gobuster",
      "Linux Privilege Escalation",
      "OWASP Top 10",
      "Burp Suite"
    ],
    "date": "2024 - 2026",
    "role": "Offensive Security Researcher / Solo CTF Competitor",
    "summary": "Hands-on offensive security operations spanning Hack The Box ('Skilled' Rank, Level 33, 14,310 XP) and TryHackMe (Top 7% worldwide across 70+ completed virtual labs), plus 4th solo placement in the HITU IEEE CTF against 3-5 member competitor teams.",
    "fullDescription": "An extensive repository of offensive security engagements, room walkthroughs, and custom exploit chains across Linux and Windows environments. Demonstrates real-world red teaming methodologies from reconnaissance and active service enumeration to weaponization, privilege escalation, and lateral movement.",
    "highlights": [
      "Reached Hack The Box 'Skilled' rank (Level 33, 14,310 XP, 6 badges), averaging 753.2 XP a week.",
      "Reached the top 7% globally on TryHackMe across 70+ rooms.",
      "Placed 4th at the HITU IEEE CTF competing solo against teams of 3 to 5.",
      "Practised Linux privilege escalation: SUID binaries, sudo misconfigurations and cron job hijacking.",
      "Practised web testing for SQLi, XSS, SSRF, IDOR and broken authentication."
    ],
    "architecture": {
      "recon": "Active enumeration using Nmap, Gobuster, Nikto, and custom Bash automation scripts.",
      "exploitation": "Metasploit framework payloads, searchsploit PoCs, manual web exploit chains, and reverse shells.",
      "privesc": "LinPEAS, WinPEAS, GTFOBins, manual PATH hijacking, and capabilities inspection.",
      "reporting": "Comprehensive vulnerability reports with remediation roadmaps and CVSS v3.1 severity metrics."
    },
    "demoType": "nmap-simulator",
    "securityAngle": "Most of my offensive practice happens here: recon, exploitation and privilege escalation against live targets, under time pressure."
  },
  {
    "id": "ordova",
    "title": "Ordova — Code Complexity Analyzer",
    "subtitle": "Reads your code's Big-O, then runs it in a sandbox to check — six languages, a VS Code extension and an API",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent product (ordova.tech)",
    "featured": true,
    "badge": "Product / Static Analysis & Sandbox",
    "image": "assets/projs-imgs/ordova-home.png",
    "photos": [
      "assets/projs-imgs/ordova-home.png",
      "assets/projs-imgs/ordova-result.png",
      "assets/projs-imgs/ordova-accuracy.png"
    ],
    "videoUrl": "",
    "github": "",
    "liveUrl": "https://ordova.tech",
    "tags": [
      "Static Analysis",
      "AST",
      "tree-sitter",
      "Sandboxing",
      "gVisor",
      "seccomp",
      "Python",
      "Node.js",
      "VS Code Extension",
      "REST API"
    ],
    "date": "2026",
    "role": "Creator & Developer",
    "summary": "A tool that answers 'how fast is this code?' three ways: it reads the Big-O from the source, runs the function in a sandbox to check the estimate against real timings, and proposes faster versions it verifies give the same results. Six languages, with a website, a REST API and a VS Code extension.",
    "fullDescription": "Ordova reads a function's complexity from its syntax tree — loops, recursion solved as recurrences, amortized graph traversals and two-variable bounds — and explains every result with the exact lines that cause it. It then benchmarks the same function on growing inputs in an isolated sandbox and reports whether the measurements agree with the analysis. An optimizer suggests faster versions; for Python it proves a rewrite returns identical results across edge cases, input distributions and random seeds before showing the measured speed-up. Because it runs code it doesn't trust, the benchmarks happen in a hardened runner — a throwaway Linux user per job, no network, hard limits and gVisor — that a 39-check attack suite hits on every deploy. It ships as a website, a REST API and a VS Code extension, across Python, JavaScript, TypeScript, Java, C++ and Go.",
    "securityAngle": "Ordova runs strangers' code for a living, so the hard part is the sandbox: untrusted code never touches the web server, and gVisor sits between each job's container and the VPS kernel, so even a container escape can't reach the host.",
    "highlights": [
      "Derives Big-O (O, Ω, Θ) and space from the code itself — loops, recursion recurrences, amortized DFS/BFS and two-variable bounds — and explains each result with line numbers.",
      "Checks the estimate by actually running the function on growing inputs in a sandbox, fitting the measured curve, and reporting whether the two agree.",
      "Suggests faster versions, and for Python proves a rewrite returns the same results across edge cases, input distributions and random seeds before showing the measured speed-up.",
      "Parses six languages — Python through its own AST, and JavaScript, TypeScript, Java, C++ and Go through tree-sitter.",
      "Runs untrusted code in a locked-down sandbox: a throwaway Linux user per job, no network (seccomp), hard limits, and gVisor between the container and the host kernel — probed by a 39-check attack suite in CI.",
      "Ships as a website, a REST API and a VS Code extension that shows the complexity above every function."
    ],
    "attackPlan": [
      "Escape the sandbox: try to open a network socket or reach the database from benchmarked code — both are blocked at the kernel with seccomp and an internal-only network.",
      "Read another job's data: each job runs as its own throwaway unprivileged user and is cleaned up after, so there is nothing left to read.",
      "Stall the service with a pathological parser input — caught by parsing in a separate worker process with a 2-second limit.",
      "Exhaust resources with a fork bomb or memory spike: hard limits on CPU, memory, processes and file size apply to programs and compilers alike."
    ],
    "architecture": {
      "analysis": "A static analyzer walks the syntax tree (Python ast; tree-sitter for the rest) and builds the cost from loops, calls and recurrences, with a confidence score.",
      "sandbox": "A separate runner executes untrusted code with no secrets and no network, a per-job Linux user, seccomp and resource limits, with gVisor between each job's container and the VPS kernel.",
      "optimizer": "Rule-based rewrites are verified in the sandbox for identical results before they are timed against the original.",
      "clients": "A website, a REST API (/api/analyze, /optimize, /compare) and a VS Code extension that is a thin client over the same API."
    },
    "defenses": [
      "Untrusted code never runs on the web server. Benchmarks go to a separate runner service that holds no secrets and can't reach the database.",
      "Each job runs as its own throwaway, unprivileged Linux user and is wiped afterwards, so one submission can never see another's files, processes or data.",
      "The network is cut two ways: the runner sits on an internal-only network, and each job is also blocked from opening a socket at the kernel with seccomp — hostile code has nothing to reach and nowhere to send data.",
      "gVisor runs between the job's container and the VPS kernel: it handles the container's system calls in user space, so a container breakout lands in gVisor's sandbox kernel instead of the host's real one.",
      "Hard limits on CPU, memory, processes and file size apply to the program and its compiler alike, so a fork bomb or memory spike dies instead of taking the machine down.",
      "Language guards add a second layer — Python audit hooks, Node's permission model, and source checks for C++, Java and Go.",
      "A 39-check attack suite tries to break all of it — reach the network or database, read secrets, become root, exhaust memory, leave files behind — in CI and after every deploy. Every attack must fail."
    ]
  },
  {
    "id": "hexicon",
    "title": "Hexicon — The Open Lexicon of Security",
    "subtitle": "A multilingual, community-curated security library with 1,000+ CVE field notes",
    "affiliation": "Self-Employed",
    "affiliationName": "Open-source project",
    "featured": true,
    "badge": "Open Source / Data & Web",
    "image": "assets/projs-imgs/hexicon-home.png",
    "photos": [
      "assets/projs-imgs/hexicon-home.png",
      "assets/projs-imgs/hexicon-domains.png",
      "assets/projs-imgs/hexicon-poster.png"
    ],
    "videoUrl": "",
    "github": "https://github.com/0xOmar-Ibrahim/Hexicon",
    "liveUrl": "https://hexicon-murex.vercel.app",
    "tags": [
      "Node.js",
      "YAML",
      "Static Site",
      "CI/CD",
      "JSON Schema",
      "CVE",
      "CISA KEV",
      "i18n",
      "Open Source"
    ],
    "date": "2026",
    "role": "Creator & Maintainer",
    "summary": "An open library that maps the whole field of cybersecurity: 533 tagged learning resources across 14 domains and 1,000+ curated CVE pages for the most actively exploited vulnerabilities, in five languages. Built as a static site generated from validated YAML, with CI and a weekly CVE sync.",
    "fullDescription": "Hexicon is my answer to the 'one giant Markdown list that slowly rots' problem in security. Every resource and every CVE is a small, schema-validated YAML file, and Node scripts build those into a fast static site that is searchable, filterable and translated into five languages (including right-to-left Arabic). A weekly GitHub Action keeps the CVE data current from NVD, CISA KEV and FIRST EPSS, and CI rejects any contribution that fails the schema or links to a dead page. It is free and open source under MIT for the code and CC BY 4.0 for the content.",
    "securityAngle": "I built the reference I wanted as a pentester: 1,000 actively-exploited CVEs ranked by real-world exploitability, each with advisories, detections and patches in one place.",
    "highlights": [
      "Curated 1,000+ CVE field notes for the most actively exploited vulnerabilities, ranked by EPSS with CVSS, CWE and ransomware flags.",
      "Catalogued 533 learning resources across 14 security domains, each tagged by level, cost and language and link-checked in CI.",
      "Built the whole site as static files generated from YAML — searchable and filterable, with no backend to attack.",
      "Automated a weekly job that syncs CVE metadata from NVD, CISA KEV and FIRST EPSS.",
      "Shipped the interface and content in five languages, including right-to-left Arabic.",
      "Validated every contribution against JSON Schemas in CI, so malformed data cannot merge."
    ],
    "attackPlan": [
      "It is a static site built from YAML, so the real surface is the build, not a server: review the CI for a malicious pull request that smuggles script through a crafted YAML field.",
      "Every resource is a contributed URL; test how links are rendered and checked for stored XSS or SSRF.",
      "The weekly sync pulls from NVD, CISA KEV and EPSS; check what happens when a feed returns malformed or hostile data.",
      "Translations are user-contributed; confirm Arabic and RTL strings cannot break out of the template."
    ],
    "architecture": {
      "data": "One YAML file per resource and per CVE, each validated against a JSON Schema in CI.",
      "build": "Node scripts turn the YAML into a static, searchable site with no runtime backend.",
      "automation": "A weekly GitHub Action syncs CVE metadata from NVD, CISA KEV and FIRST EPSS.",
      "i18n": "Interface and descriptions in English, German, French, Arabic (right-to-left) and Russian."
    }
  },
  {
    "id": "ibm-ethical-hacking",
    "title": "IBM Ethical Hacking & Vulnerability Capstone",
    "subtitle": "IBM Cybersecurity Analyst Professional Certification Capstone",
    "affiliation": "Self-Employed",
    "affiliationName": "IBM Professional Capstone",
    "featured": true,
    "badge": "IBM Capstone Project",
    "image": "assets/images/pentest-lab.jpg",
    "photos": [
      "assets/images/pentest-lab.jpg"
    ],
    "videoUrl": "",
    "tags": [
      "OpenVAS",
      "Metasploit",
      "CVE Analysis",
      "Vulnerability Assessment",
      "CVSS Scoring",
      "Hardening"
    ],
    "date": "Jan 2026",
    "role": "Security Analyst (course capstone)",
    "summary": "End-to-end vulnerability assessment and exploitation engagement utilizing OpenVAS and Metasploit. Analyzed critical CVE findings, executed controlled lab exploits, and produced an executive remediation plan.",
    "fullDescription": "As part of the IBM Cybersecurity Analyst Professional Specialization (14 courses), this capstone simulated an enterprise network penetration audit. The project encompassed initial reconnaissance, automated and manual vulnerability scanning with Greenbone/OpenVAS, validation through Metasploit modules, and formulation of remediation playbooks.",
    "highlights": [
      "Ran automated vulnerability scans across lab subnets with OpenVAS.",
      "Prioritised CVEs by real-world exploitability and mapped results to MITRE ATT&CK.",
      "Validated findings with Metasploit in a controlled lab to rule out false positives.",
      "Completed as part of the 14-course IBM Cybersecurity Analyst certificate, covering threat intelligence, SIEM and incident response."
    ],
    "architecture": {
      "recon": "Network topology mapping, service banner grabbing, and port categorization.",
      "scanning": "OpenVAS NVTs (Network Vulnerability Tests) with credentialed and non-credentialed profiles.",
      "validation": "Controlled payload staging in isolated subnet sandboxes.",
      "mitigation": "Patch management prioritization, firewall rules, and cipher suite hardening."
    },
    "demoType": "cve-inspector",
    "securityAngle": "A full assessment cycle in a lab: scan, validate by exploiting, then turn the results into a remediation plan."
  },
  {
    "id": "morse-code-x86",
    "title": "Morse Code Converter in Pure x86-64 Assembly",
    "subtitle": "Win32 console program with no C runtime, written in MASM",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent Research",
    "featured": true,
    "badge": "x86-64 Assembly",
    "image": "assets/projs-imgs/asm-0.png",
    "photos": [
      "assets/projs-imgs/asm-0.png"
    ],
    "videoUrl": "https://drive.google.com/file/d/1JUuuz_s9QbO3GJCs5nsDDxvb-YOnT09k/view?usp=sharing",
    "github": "https://github.com/0xOmar-Ibrahim/Morse-Code",
    "tags": [
      "x86-64 Assembly",
      "MASM",
      "Win32 API",
      "Reverse Engineering Practice"
    ],
    "date": "2024",
    "role": "Assembly Systems Developer",
    "summary": "Text-to-Morse encoder written entirely in x86-64 MASM, calling the Win32 console API directly with no C runtime. Built to learn to read and reason about assembly for reverse engineering.",
    "fullDescription": "Written from scratch in MASM for x86-64. It manages registers, the stack and Windows shadow space by hand, and reads and writes through kernel32 with no standard library. Writing assembly is the quickest way I know to get better at reading it, which is the skill reverse engineering depends on.",
    "highlights": [
      "Used no C runtime: all I/O goes through GetStdHandle, ReadConsoleA and WriteConsoleA.",
      "Encodes A to Z with constant-time table lookup.",
      "Follows the Windows x64 calling convention by hand, including shadow space and stack alignment.",
      "Bounded the console read: 255 bytes into a 256-byte buffer."
    ],
    "architecture": {
      "isa": "x86-64, MASM syntax.",
      "api": "Kernel32: GetStdHandle, ReadConsoleA, WriteConsoleA, GetConsoleMode, SetConsoleMode.",
      "memory": "Static .data tables with manual pointer arithmetic."
    },
    "demoType": "morse-interactive",
    "securityAngle": "My groundwork for reverse engineering, and auditing it turned up an out-of-bounds read, which is a very assembly-shaped bug.",
    "audit": {
      "writeup": "self-audit",
      "note": "No range check on input characters, so anything outside A to Z reads past the lookup table."
    }
  },
  {
    "id": "keygarden-pass-gen",
    "title": "KeyGarden, a Password Generator",
    "subtitle": "CustomTkinter desktop tool with auto, text-based, passphrase and batch modes",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent Security Tool",
    "featured": false,
    "badge": "Security Tooling",
    "image": "assets/projs-imgs/key-gard-0.png",
    "photos": [
      "assets/projs-imgs/key-gard-0.png"
    ],
    "videoUrl": "",
    "github": "https://github.com/0xOmar-Ibrahim/KeyGarden",
    "tags": [
      "Python",
      "CustomTkinter",
      "Cryptography Library",
      "Security Tooling"
    ],
    "date": "2024",
    "role": "Creator",
    "summary": "Desktop password generator with four modes: auto, text-based, passphrase and batch export. Key material comes from the cryptography library's Fernet keys, which use the operating system's secure random source.",
    "fullDescription": "A Python and CustomTkinter tool for generating strong passwords. Auto mode combines three Fernet keys, whose bytes come from os.urandom, then shuffles the result. Text mode mixes in text you choose, and passphrase mode turns a phrase into a variation with substituted characters. Auditing it later showed where it could be stronger: see below.",
    "highlights": [
      "Built four modes: auto, text-based, passphrase and batch export.",
      "Generated key material with Fernet keys from the cryptography library.",
      "Added one-click copy to the clipboard."
    ],
    "architecture": {
      "engine": "cryptography.fernet key generation, combined and shuffled.",
      "gui": "CustomTkinter desktop interface."
    },
    "demoType": "password-generator",
    "securityAngle": "Sound key material, with a weaker shuffle and plaintext batch export that my own audit caught.",
    "audit": {
      "writeup": "self-audit",
      "note": "Batch mode writes passwords to a plaintext file, and the shuffle uses Python's non-cryptographic random module."
    }
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
