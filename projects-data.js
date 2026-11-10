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
    "id": "smart-elevator-rfid",
    "title": "Smart Elevator Interface System",
    "subtitle": "RFID authentication and time-limited floor access on production elevators",
    "affiliation": "Company",
    "affiliationName": "LABstar",
    "featured": true,
    "badge": "LABstar Production System",
    "image": "assets/projs-imgs/des-1.png",
    "photos": [
      "assets/projs-imgs/DWIN_RFID.png",
      "assets/projs-imgs/des-1.png",
      "assets/projs-imgs/des-2.png"
    ],
    "videoUrl": "",
    "tags": [
      "Embedded C",
      "RFID Auth",
      "Access Control",
      "SPI",
      "DWIN",
      "Physical Security"
    ],
    "date": "Aug 2023 – Jun 2025",
    "role": "Embedded Software Developer (LABstar)",
    "summary": "RFID authentication and time-limited floor access for multi-floor elevators at LABstar, including the communication between the reader, the controller and the DWIN touch display.",
    "fullDescription": "Built at LABstar. A user presents an RFID card, the controller checks it against its authorised list, and floor access is granted for a limited time before it expires. This is the physical-access version of the problem I now test in web apps: who are you, what may you reach, and for how long.",
    "highlights": [
      "Implemented RFID authentication with authorisation rules per user and floor.",
      "Enforced time-limited access that expires automatically.",
      "Wrote the communication between the RFID reader, the controller and the relay outputs.",
      "Built the operator interface on a DWIN touch display."
    ],
    "architecture": {
      "hardware": "Microcontroller board, RFID reader, relay output banks and a DWIN touch display.",
      "access": "Per-user authorisation with time-limited floor access.",
      "protocol": "Serial and SPI links between the reader, controller and display."
    },
    "demoType": "rfid-simulator",
    "securityAngle": "A physical access control system: authentication, authorisation and session expiry, enforced in firmware instead of on a web server.",
    "attackPlan": [
      "Clone an authorised card: if the check relies only on the UID, a cloned UID passes.",
      "Sniff the reader-to-controller lines to see whether anything on that bus can be replayed.",
      "Try to read or extend access by interrupting power during the expiry countdown.",
      "Look for debug headers on the board and try to dump the firmware and the authorised list."
    ]
  },
  {
    "id": "labstar-elevator-control",
    "title": "LABstar Elevator Control System",
    "subtitle": "Flutter Mobile App for Wi-Fi TCP-Based Elevator Control via ESP32",
    "affiliation": "Company",
    "affiliationName": "LABstar",
    "featured": false,
    "badge": "IoT Mobile Application",
    "image": "assets/projs-imgs/IOT-0.png",
    "photos": [
      "assets/projs-imgs/IOT-0.png",
      "assets/projs-imgs/IOT-1.jpeg",
      "assets/projs-imgs/IOT-2.jpeg"
    ],
    "videoUrl": "",
    "github": "",
    "tags": [
      "Flutter",
      "Dart",
      "TCP/IP",
      "ESP32",
      "IoT",
      "Wi-Fi Communication",
      "Role-Based Access"
    ],
    "date": "2026",
    "role": "Mobile & Embedded Developer",
    "summary": "Cross-platform Flutter app that controls a multi-floor elevator system over a dedicated Wi-Fi network, sending TCP commands to an ESP32 controller with role-based access for admins and technicians.",
    "fullDescription": "LABstar is a mobile control panel for an elevator system, built in Flutter and paired with an ESP32-based hardware controller. The app connects to a dedicated local access point (\"LABstar Elevator\") and communicates floor selection and door commands over the TCP protocol directly to the ESP32, which drives the elevator's relay/motor hardware. The UI presents a clean numbered floor keypad (0–11) alongside dedicated Open and Close door controls, styled for quick, glanceable operation. A built-in connectivity guard detects when the phone isn't joined to the elevator's Wi-Fi network and walks the user through connecting via Settings, preventing commands from being sent without an active link. Access is role-based, distinguishing between admin and technician accounts to control which functions (e.g., configuration vs. basic operation) each user type can perform.",
    "highlights": [
      "Built a Flutter UI with a numbered floor keypad (0–11) plus dedicated Open/Close door controls.",
      "Implemented direct Wi-Fi TCP socket communication between the app and an ESP32 elevator controller.",
      "Designed a connectivity-guard screen that detects missing Wi-Fi association and guides the user to connect to the correct network.",
      "Added role-based access control distinguishing admin and technician permission levels.",
      "Displayed live connection status (Wi-Fi, call/support, info) directly in the app header for quick diagnostics."
    ],
    "architecture": {
      "app": "Flutter (Dart) cross-platform mobile application.",
      "communication": "TCP socket connection over a dedicated local Wi-Fi access point ('LABstar Elevator').",
      "controller": "ESP32 microcontroller receiving TCP commands and driving elevator relay/motor hardware.",
      "access": "Role-based authentication separating admin and technician capabilities."
    },
    "demoType": "app-screens-view",
    "securityAngle": "A mobile app that moves real hardware over Wi-Fi, so the network path and the role check are both attack surface.",
    "attackPlan": [
      "Capture the app's TCP traffic to see whether commands are authenticated or encrypted.",
      "Send floor and door commands straight to the ESP32 without the app, to test whether the role check lives on the controller or only in the UI.",
      "Replay a captured command and see whether the controller accepts it.",
      "Test the Wi-Fi access point itself: password strength and who else can join."
    ]
  },
  {
    "id": "electronics-mgmt-rbac",
    "title": "Electronics Management & RBAC Security System",
    "subtitle": "Multi-user inventory and sales system with role-based access and audit trails",
    "affiliation": "Company",
    "affiliationName": "LABstar",
    "featured": false,
    "badge": "LABstar Enterprise System",
    "image": "assets/projs-imgs/01.jpg",
    "photos": [
      "assets/projs-imgs/01.jpg",
      "assets/projs-imgs/00.jpg",
      "assets/projs-imgs/07.jpg",
      "assets/projs-imgs/02.jpg",
      "assets/projs-imgs/03.jpg",
      "assets/projs-imgs/04.jpg",
      "assets/projs-imgs/05.jpg",
      "assets/projs-imgs/06.jpg",
      "assets/projs-imgs/08.jpg",
      "assets/projs-imgs/09.jpg"
    ],
    "videoUrl": "",
    "tags": [
      "Python",
      "SQL",
      "RBAC",
      "Access Control",
      "Audit Logging",
      "Desktop App"
    ],
    "date": "2024",
    "role": "Embedded Software Developer (LABstar)",
    "summary": "Inventory and sales system built at LABstar with role-based access control and automated audit trails on a SQL database, so each user reaches only what their role allows.",
    "fullDescription": "Built for day-to-day operations at LABstar. Each role gets only the actions it needs, and changes to stock and sales are recorded in an audit trail. Designing this taught me how access control is supposed to work, which is exactly what I now look for when it doesn't.",
    "highlights": [
      "Implemented RBAC across multi-user workstations, applying least privilege.",
      "Blocked unauthorised data access through role checks.",
      "Added automated audit trails for inventory and sales changes.",
      "Built the desktop interface in Python on a SQL backend."
    ],
    "architecture": {
      "auth": "Role-based permissions per user tier.",
      "database": "Relational SQL database.",
      "logging": "Automated audit trail of inventory and sales changes."
    },
    "demoType": "rbac-matrix",
    "securityAngle": "Least privilege and accountability from the builder's side, which is the same logic I break when testing for IDOR and broken access control.",
    "attackPlan": [
      "Log in as the lowest role and try every privileged action directly, skipping the UI.",
      "Test all input fields for SQL injection.",
      "Check whether a user can edit or delete the audit trail that records their own actions."
    ]
  },
  {
    "id": "bank-management-system",
    "title": "Secure Bank Management System",
    "subtitle": "Multi-user banking app with Customer, Teller and Manager roles",
    "affiliation": "Education",
    "affiliationName": "MICA",
    "featured": true,
    "badge": "Python / RBAC",
    "image": "./assets/projs-imgs/Bank-1.png",
    "photos": [
      "./assets/projs-imgs/Bank-1.png",
      "./assets/projs-imgs/Bank-2.png",
      "./assets/projs-imgs/Bank-3.png",
      "./assets/projs-imgs/Bank-4.png",
      "./assets/projs-imgs/Bank-5.png",
      "./assets/projs-imgs/Bank-6.png",
      "./assets/projs-imgs/Bank-7.png",
      "./assets/projs-imgs/Bank-8.png",
      "./assets/projs-imgs/Bank-9.png",
      "./assets/projs-imgs/Bank-10.png",
      "./assets/projs-imgs/Bank-11.png"
    ],
    "videoUrl": "https://drive.google.com/file/d/15RhqgTHMY3Aq9-Z-kI0AA7WC4AWtFOKm/view?usp=sharing",
    "github": "https://github.com/0xOmar-Ibrahim/Bank-Managament-System",
    "tags": [
      "Python",
      "Tkinter",
      "RBAC",
      "Transaction Logging"
    ],
    "date": "2024",
    "role": "Developer",
    "summary": "Desktop banking app in Python and Tkinter with separate Customer, Teller and Manager roles, a transaction log and balance checks on withdrawals.",
    "fullDescription": "A Python and Tkinter application with three separate interfaces, one per role. Tellers manage customers, managers also manage tellers, and each account has a transaction log. I later audited this code and found how it handles passwords needs fixing: see the audit below.",
    "highlights": [
      "Built three role-based interfaces: Customer, Teller and Manager.",
      "Added a transaction log view for accountability.",
      "Blocked withdrawals that exceed the available balance.",
      "Modelled accounts, loans and users with separate Python classes."
    ],
    "architecture": {
      "gui": "Tkinter interfaces, one per role.",
      "model": "Python classes for Bank, Customer, Teller, accounts and loans, held in memory."
    },
    "demoType": "rbac-matrix",
    "securityAngle": "Good role separation in the interface, with a real credential-storage flaw I later found by auditing my own code.",
    "audit": {
      "writeup": "self-audit",
      "note": "Passwords are held and compared in plaintext, and the manager account is hardcoded."
    }
  },
  {
    "id": "sensor-telemetry-pipeline",
    "title": "Real-Time Sensor Data Telemetry Pipeline",
    "subtitle": "Serial data capture, SQLite storage and live plotting",
    "affiliation": "Company",
    "affiliationName": "LABstar",
    "featured": true,
    "badge": "IoT Data Pipeline",
    "image": "assets/projs-imgs/RT-sensor-1.png",
    "photos": [
      "assets/projs-imgs/RT-sensor-1.png",
      "assets/projs-imgs/RT-sensor-2.png"
    ],
    "videoUrl": "",
    "github": "https://github.com/0xOmar-Ibrahim/Real-Time-Sensor-Data-Visualization-and-Storage",
    "tags": [
      "Python",
      "Matplotlib",
      "SQLite",
      "PySerial",
      "Threading"
    ],
    "date": "2024",
    "role": "Developer",
    "summary": "Reads live sensor data from a serial port at a selectable baud rate, plots it in real time, stores each recording in SQLite and exports it to Excel.",
    "fullDescription": "A Python desktop tool for monitoring hardware test benches. A background thread reads the serial port while Matplotlib draws the live graph, and each named recording goes into SQLite for later replay. My audit later found SQL injection in how it stores those record names: see below.",
    "highlights": [
      "Read serial data on a background thread, with baud rates from 4,800 to 921,600.",
      "Drew live graphs with Matplotlib, refreshing every 100 ms.",
      "Stored recordings in SQLite and replayed them later as plots.",
      "Exported recordings to Excel for reporting."
    ],
    "architecture": {
      "ingest": "PySerial reader on a background thread.",
      "storage": "SQLite table of named recordings.",
      "presentation": "Matplotlib animation inside a CustomTkinter interface, plus Excel export."
    },
    "demoType": "sensor-visualizer",
    "securityAngle": "Where I found the clearest bug in my own code: SQL injection through a record name, proven with a working payload.",
    "audit": {
      "writeup": "self-audit",
      "note": "SQL injection in the record name: one payload deleted every stored recording."
    }
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
    "id": "employee-management-c",
    "title": "Employee Management System in C",
    "subtitle": "Linked-list record system with roles, search and text report export",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent Systems Software",
    "featured": true,
    "badge": "Pure C / Data Structures",
    "image": "assets/projs-imgs/Employee-C-1.png",
    "photos": [
      "assets/projs-imgs/Employee-C-0.png"
    ],
    "videoUrl": "",
    "github": "https://github.com/0xOmar-Ibrahim/Employee-System-Management-With-Linked-List",
    "tags": [
      "C",
      "Linked Lists",
      "Dynamic Memory",
      "File I/O",
      "CMake"
    ],
    "date": "2024",
    "role": "Developer",
    "summary": "Terminal employee system in C, built on a singly linked list with manual memory management, multi-field search, role fields and a formatted text report.",
    "fullDescription": "A C command-line application split into separate modules for the data structure, file output and the user interface. It covers adding, viewing, editing and removing records, searching by ID, name, department or job title, and exporting a report. Most input is bounded with fgets, but my audit found one call that isn't: see below.",
    "highlights": [
      "Built add, view, edit and remove on a singly linked list with malloc and free.",
      "Added search by ID, name, department and job title.",
      "Exported a formatted employee report to a text file.",
      "Bounded most text input with fgets and sizeof."
    ],
    "architecture": {
      "dataStructures": "Singly linked list with manual malloc and free.",
      "search": "Field-by-field comparison across the list.",
      "output": "Text report written to All_Employee.txt.",
      "modularDesign": "Separate .c and .h modules, built with CMake."
    },
    "demoType": "c-linked-list",
    "securityAngle": "Practice with the memory handling that exploitation depends on, including a stack buffer overflow I later found in it.",
    "audit": {
      "writeup": "self-audit",
      "note": "Stack buffer overflow on the old-password prompt, confirmed with a stack-protector build."
    }
  },
  {
    "id": "cinema-management-c",
    "title": "Cinema Management & Ticket Reservation System",
    "subtitle": "Modular C application for films, halls, seats and tickets",
    "affiliation": "Education",
    "affiliationName": "NCT University",
    "featured": false,
    "badge": "Modular C Systems",
    "image": "assets/projs-imgs/0.jpg",
    "photos": [
      "assets/projs-imgs/0.jpg",
      "assets/projs-imgs/1.jpg",
      "assets/projs-imgs/2.jpg",
      "assets/projs-imgs/3.jpg",
      "assets/projs-imgs/4.jpg",
      "assets/projs-imgs/5.jpg",
      "assets/projs-imgs/6.jpg",
      "assets/projs-imgs/7.jpg",
      "assets/projs-imgs/8.jpg",
      "assets/projs-imgs/9.jpg",
      "assets/projs-imgs/10.jpg",
      "assets/projs-imgs/11.jpg",
      "assets/projs-imgs/12.jpg",
      "assets/projs-imgs/13.jpg",
      "assets/projs-imgs/14.jpg",
      "assets/projs-imgs/15.jpg",
      "assets/projs-imgs/16.jpg",
      "assets/projs-imgs/17.jpg",
      "assets/projs-imgs/18.jpg"
    ],
    "videoUrl": "https://drive.google.com/file/d/1cZr9MdRxbTFVsaIv4UaVEV2UPFfqIjEM/view?usp=sharing",
    "github": "https://github.com/0xOmar-Ibrahim/Cinema-Management-System",
    "tags": [
      "C",
      "Modular Architecture",
      "Structs",
      "File I/O"
    ],
    "date": "2023",
    "role": "Systems Programmer",
    "summary": "Terminal cinema system in C that manages films, halls and seat reservations, and writes each ticket to a text file.",
    "fullDescription": "A modular C program with separate files for films, halls and the home page. It tracks seats per hall and validates numeric input, re-prompting when a read fails. My audit found its text input is not bounded: see below.",
    "highlights": [
      "Structured the program in separate modules with headers.",
      "Tracked seat availability per hall.",
      "Validated numeric input by checking every scanf result.",
      "Generated each ticket as a text file."
    ],
    "architecture": {
      "language": "C, built with CMake.",
      "data": "Structs for films and halls, with seat flags per hall.",
      "output": "Text ticket files."
    },
    "demoType": "c-code-view",
    "securityAngle": "Numeric input is validated properly, but seven unbounded string reads show why I now check every input path.",
    "audit": {
      "writeup": "self-audit",
      "note": "Seven scanf(\"%s\") calls read into fixed buffers with no length limit."
    }
  },
  {
    "id": "voice-smart-home",
    "title": "Voice-Controlled Smart Home & Custom PCB",
    "subtitle": "Team Leader Graduation Project integrating Flutter, Firebase & ESP8266",
    "affiliation": "Education",
    "affiliationName": "MICA Graduation Project",
    "featured": true,
    "badge": "MICA Graduation Project Lead (2025)",
    "image": "assets/projs-imgs/smart-home-0.jpg",
    "photos": [
      "assets/projs-imgs/smart-home-0.jpg",
      "assets/projs-imgs/smart-home-2.jpg",
      "assets/projs-imgs/smart-home-3.jpg",
      "assets/projs-imgs/smart-home-4.jpg",
      "assets/projs-imgs/smart-home-5.jpg",
      "assets/projs-imgs/smart-home-6.jpg",
      "assets/projs-imgs/smart-home-7.jpg",
      "assets/projs-imgs/smart-home-8.jpg",
      "assets/projs-imgs/smart-home-10.jpg",
      "assets/projs-imgs/smart-home-9.jpg",
      "assets/projs-imgs/smart-home-11.jpg"
    ],
    "videoUrl": "",
    "github": "pdfs/Graguation-Project-Book.pdf",
    "tags": [
      "Flutter",
      "ESP8266",
      "Firebase",
      "PCB Design",
      "Team Leadership",
      "IoT"
    ],
    "date": "2025",
    "role": "Technical Project Lead & PCB Designer",
    "summary": "Led a multidisciplinary team to build a smart home with a custom PCB, voice commands through a Flutter app and real-time sync through Firebase.",
    "fullDescription": "As technical lead for the MICA graduation project, I coordinated mobile app development, embedded firmware, PCB design and the cloud database. The full project book is linked above.",
    "highlights": [
      "Led task distribution, milestones and engineering documentation.",
      "Designed and built a custom PCB with optocoupler relay isolation and voltage regulation.",
      "Built a Flutter mobile app with speech-to-text voice commands.",
      "Connected the devices to a Firebase Realtime Database."
    ],
    "architecture": {
      "mobile": "Flutter and Dart with voice recognition.",
      "cloud": "Firebase Realtime Database.",
      "hardware": "ESP8266 microcontroller over Wi-Fi.",
      "pcb": "Custom board with relay isolation and power regulation."
    },
    "demoType": "iot-controller-demo",
    "securityAngle": "An end-to-end IoT system: phone, cloud and hardware, which is the same chain I would map first when testing a real device.",
    "attackPlan": [
      "Test the Firebase security rules: can an unauthenticated client read state or switch a device?",
      "Decompile the mobile app and look for embedded API keys and database URLs.",
      "Dump the ESP8266 flash and look for stored Wi-Fi credentials.",
      "Test how the system behaves if the cloud is unreachable or returns unexpected data."
    ]
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
  },
  {
    "id": "number-system-converter",
    "title": "Universal Number System & ASCII Converter",
    "subtitle": "Base-2/8/10/16 and ASCII converter with binary arithmetic",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent Research",
    "featured": false,
    "badge": "Low-Level Computing",
    "image": "assets/projs-imgs/calc-0.png",
    "photos": [
      "assets/projs-imgs/calc-0.png"
    ],
    "videoUrl": "",
    "github": "https://github.com/0xOmar-Ibrahim/universal-number-system",
    "tags": [
      "Python",
      "CustomTkinter",
      "Binary Arithmetic",
      "Hex & ASCII"
    ],
    "date": "2024",
    "role": "Developer",
    "summary": "Desktop converter for binary, octal, decimal, hexadecimal and ASCII, with 8, 16 and 32-bit signed and unsigned modes, complements and binary arithmetic.",
    "fullDescription": "A small utility for working with number representations, useful during CTFs and low-level debugging. It converts across bases and ASCII, and handles signed and unsigned values at common widths.",
    "highlights": [
      "Converts between binary, octal, decimal, hexadecimal and ASCII.",
      "Supports 8, 16 and 32-bit values, signed and unsigned.",
      "Calculates one's and two's complement.",
      "Performs binary addition, subtraction, multiplication and division."
    ],
    "architecture": {
      "engine": "Python conversion and arithmetic functions.",
      "gui": "CustomTkinter desktop interface."
    },
    "demoType": "number-converter"
  },
  {
    "id": "esp32-21-relay-controller",
    "title": "21-Channel Relay Control Board",
    "subtitle": "ESP32-Based Modular Relay Driver PCB with Darlington Array Isolation",
    "affiliation": "Self-Employed",
    "affiliationName": "Independent Design",
    "featured": false,
    "badge": "Embedded PCB Design",
    "image": "assets/projs-imgs/PCB-1.jpg",
    "photos": [
      "assets/projs-imgs/PCB-0.jpg",
      "assets/projs-imgs/PCB-1.jpg",
      "assets/projs-imgs/PCB-2.jpg",
      "assets/projs-imgs/PCB-3.jpg"
    ],
    "videoUrl": "",
    "github": "",
    "tags": [
      "PCB Design",
      "ESP32",
      "Power Electronics",
      "EasyEDA",
      "Relay Control",
      "Embedded Systems"
    ],
    "date": "2025",
    "role": "Hardware Designer",
    "summary": "Custom PCB built around an ESP32 (NodeMCU-32S) that independently drives 21 relay channels through darlington transistor arrays, with an onboard buck converter for clean 5V logic power.",
    "fullDescription": "A complete relay-control mainboard designed in EasyEDA, centered on an ESP32-WROOM-32 (NodeMCU-32S) module. All 21 GPIO-driven outputs are buffered through three 16-pin darlington driver arrays (Q1, Q2, Q3) instead of driving relay coils directly from the MCU, protecting the ESP32 from back-EMF and current overload. Each relay stage has its own transistor switch, base resistor, and snubber capacitor, laid out in repeatable \"Control Relays\" blocks (three groups of 7) for easy routing and debugging. Onboard power regulation steps 12V down to a stable 5V rail using an LM2587 switching regulator, with input/output filtering caps and a flyback diode for the inductor. A dedicated terminal block breaks out the 4 input control lines, 12V, 5V, 3.3V, and GND for external wiring.",
    "highlights": [
      "Designed the full schematic and 1-layer PCB layout in EasyEDA, from concept to 3D render.",
      "Used 3 darlington transistor array ICs to isolate ESP32 GPIOs from 21 individual relay driver stages.",
      "Grouped relays into three repeatable 'Control Relays' blocks (7 channels each) for clean, modular routing.",
      "Integrated an LM2587 switching regulator to derive a regulated 5V rail from 12V input.",
      "Added flyback diodes and decoupling capacitors across each relay stage to suppress inductive kickback.",
      "Broke out a labeled terminal header (IN1 to IN4, 12V, 5V, 3.3V, GND) for simple external integration."
    ],
    "architecture": {
      "mcu": "ESP32-WROOM-32 on a NodeMCU-32S dev module, using GPIOs mapped to in1–in21.",
      "driving": "Three multi-channel darlington transistor arrays (Q1/Q2/Q3) buffering GPIO outputs to relay coil transistors.",
      "power": "12V input regulated to 5V via LM2587 buck converter, with 3.3V supplied by the ESP32 module's onboard regulator.",
      "layout": "1-layer PCB with symmetric left/right relay banks and bottom-row relays, routed in EasyEDA."
    },
    "demoType": "pcb-schematic-view",
    "securityAngle": "I designed this board from schematic to layout, so I know where to probe a device like it: exposed headers, flash and buses.",
    "attackPlan": [
      "Use the exposed headers and the module's USB-serial port to reach the ESP32 bootloader.",
      "Dump the flash with esptool, which only secure boot and flash encryption would stop, and search it for secrets.",
      "Trace GPIOs to relays from the board, then look for ways to drive outputs from outside the firmware."
    ]
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
