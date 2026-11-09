/**
 * Omar Ibrahim - Portfolio Project Database
 * Detailed briefs, security architectures, photos, video flags, and affiliation metadata.
 * 
 * Affiliation Types: "Company" | "Self-Employed" | "University"
 */

var PROJECTS_DATA = [
  {
    id: "tryhackme-ctf",
    title: "Penetration Testing Labs & CTF Operations",
    subtitle: "HTB 'Skilled' Rank, TryHackMe Top 7% & HITU IEEE CTF 4th Solo",
    affiliation: "Self-Employed",
    affiliationName: "Independent / CTF",
    featured: true,
    badge: "HTB Skilled & THM Top 7%",
    image: "assets/images/pentest-lab.jpg",
    photos: [
      "assets/images/pentest-lab.jpg"
    ],
    videoUrl: "",
    tags: ["Hack The Box", "TryHackMe", "Nmap", "Metasploit", "Gobuster", "Linux Privilege Escalation", "OWASP Top 10", "Burp Suite"],
    date: "2024 - 2026",
    role: "Offensive Security Researcher / Solo CTF Competitor",
    summary: "Hands-on offensive security operations spanning Hack The Box ('Skilled' Rank, Level 33, 14,310 XP) and TryHackMe (Top 7% worldwide across 70+ completed virtual labs), plus 4th solo placement in the HITU IEEE CTF against 3-5 member competitor teams.",
    fullDescription: `
      An extensive repository of offensive security engagements, room walkthroughs, and custom exploit chains across Linux and Windows environments. Demonstrates real-world red teaming methodologies from reconnaissance and active service enumeration to weaponization, privilege escalation, and lateral movement.
    `,
    highlights: [
      "Achieved official 'Skilled' Rank (Level 33, 14,310 XP, 6 Badges) on Hack The Box with 753.2 XP weekly average.",
      "Secured Top 7% global ranking on TryHackMe across 70+ simulated attack scenarios.",
      "Achieved 4th place at HITU IEEE CTF competing solo against teams of 3–5 engineers under rigorous time constraints.",
      "Mastered Linux kernel exploitation, SUID binary abuses, sudo configuration flaws, and cron job hijacking.",
      "Extensive web application penetration testing for SQLi, XSS, SSRF, IDOR, and Broken Authentication."
    ],
    architecture: {
      recon: "Active enumeration using Nmap, Gobuster, Nikto, and custom Bash automation scripts.",
      exploitation: "Metasploit framework payloads, searchsploit PoCs, manual web exploit chains, and reverse shells.",
      privesc: "LinPEAS, WinPEAS, GTFOBins, manual PATH hijacking, and capabilities inspection.",
      reporting: "Comprehensive vulnerability reports with remediation roadmaps and CVSS v3.1 severity metrics."
    },
    demoType: "nmap-simulator"
  },
  {
    id: "ibm-ethical-hacking",
    title: "IBM Ethical Hacking & Vulnerability Capstone",
    subtitle: "IBM Cybersecurity Analyst Professional Certification Capstone",
    affiliation: "Self-Employed",
    affiliationName: "IBM Professional Capstone",
    featured: true,
    badge: "IBM Capstone Project",
    image: "assets/images/pentest-lab.jpg",
    photos: [
      "assets/images/pentest-lab.jpg"
    ],
    videoUrl: "",
    tags: ["OpenVAS", "Metasploit", "CVE Analysis", "Vulnerability Assessment", "CVSS Scoring", "Hardening"],
    date: "Jan 2026",
    role: "Lead Security Analyst",
    summary: "End-to-end vulnerability assessment and exploitation engagement utilizing OpenVAS and Metasploit. Analyzed critical CVE findings, executed controlled lab exploits, and produced an executive remediation plan.",
    fullDescription: `
      As part of the IBM Cybersecurity Analyst Professional Specialization (14 courses), this capstone simulated an enterprise network penetration audit. The project encompassed initial reconnaissance, automated and manual vulnerability scanning with Greenbone/OpenVAS, validation through Metasploit modules, and formulation of remediation playbooks.
    `,
    highlights: [
      "Conducted automated vulnerability scans across heterogeneous subnet configurations with OpenVAS.",
      "Mapped scan results to the MITRE ATT&CK matrix and prioritized CVEs based on real-world exploitability.",
      "Conducted controlled validation testing using Metasploit Framework to verify false positives.",
      "Delivered a 14-course culmination report covering threat intelligence, SIEM integration, and incident response defense."
    ],
    architecture: {
      recon: "Network topology mapping, service banner grabbing, and port categorization.",
      scanning: "OpenVAS NVTs (Network Vulnerability Tests) with credentialed and non-credentialed profiles.",
      validation: "Controlled payload staging in isolated subnet sandboxes.",
      mitigation: "Patch management prioritization, firewall rules, and cipher suite hardening."
    },
    demoType: "cve-inspector"
  },
  {
    id: "smart-elevator-rfid",
    title: "Smart Elevator Interface System",
    subtitle: "Embedded Hardware Security & Time-Limited RFID Access Control",
    affiliation: "Company",
    affiliationName: "LABstar",
    featured: true,
    badge: "LABstar Production System",
    image: "assets/projs-imgs/des-1.png",
    photos: [
      "assets/projs-imgs/DWIN_RFID.png",
      "assets/projs-imgs/des-1.png",
      "assets/projs-imgs/des-2.png"
    ],
    videoUrl: "",
    tags: ["Embedded C", "RFID Auth", "Hardware Security", "ESP32", "Access Control", "SPI/I2C", "DWIN"],
    date: "Aug 2023 – Jun 2025",
    role: "Embedded Software Developer (LABstar)",
    summary: "Hardware-level security and access control system for multi-floor industrial elevators utilizing RFID token authentication, time-limited cryptographic permissions, and secure microcontroller communication.",
    fullDescription: `
      Engineered at LABstar, this industrial-grade embedded solution enforces strict physical and logical access control. The system verifies RFID UID signatures with an on-board encrypted database, assigns ephemeral floor access keys with strict countdown timeouts, and prevents relay or replay attacks on the hardware bus.
    `,
    highlights: [
      "Implemented hardware-to-board authorization logic with millisecond-grade execution.",
      "Enforced time-limited floor access tokens with automatic revocation and relay tamper-proofing.",
      "Designed secure serial and SPI communication routines between RFID reader modules and the core MCU.",
      "Built resilient error-handling routines against voltage fluctuations and signal spoofing attempts.",
      "Interface with DWIN screen"
    ],
    architecture: {
      hardware: "Microcontroller (ESP32/AVR), RC522 RFID reader, Relay output banks, I2C Status Display, DWIN Screen.",
      security: "Cryptographic token verification, Anti-replay nonce validation, and EEPROM audit logging.",
      protocol: "Low-latency SPI communication with timeout verification.",
      failover: "Hardware watchdog timer and fail-secure physical lockout protocols."
    },
    demoType: "rfid-simulator"
  },
  {
    id: "labstar-elevator-control",
    title: "LABstar Elevator Control System",
    subtitle: "Flutter Mobile App for Wi-Fi TCP-Based Elevator Control via ESP32",
    affiliation: "Company",
    affiliationName: "LABstar",
    featured: false,
    badge: "IoT Mobile Application",
    image: "assets/projs-imgs/IOT-0.png",
    photos: [
      "assets/projs-imgs/IOT-0.png",
      "assets/projs-imgs/IOT-1.jpeg",
      "assets/projs-imgs/IOT-2.jpeg",
    ],
    videoUrl: "",
    github: "",
    tags: ["Flutter", "Dart", "TCP/IP", "ESP32", "IoT", "Wi-Fi Communication", "Role-Based Access"],
    date: "2026",
    role: "Mobile & Embedded Developer",
    summary: "Cross-platform Flutter app that controls a multi-floor elevator system over a dedicated Wi-Fi network, sending TCP commands to an ESP32 controller with role-based access for admins and technicians.",
    fullDescription: `
      LABstar is a mobile control panel for an elevator system, built in Flutter and paired with an ESP32-based hardware controller. The app connects to a dedicated local access point ("LABstar Elevator") and communicates floor selection and door commands over the TCP protocol directly to the ESP32, which drives the elevator's relay/motor hardware. The UI presents a clean numbered floor keypad (0–11) alongside dedicated Open and Close door controls, styled for quick, glanceable operation. A built-in connectivity guard detects when the phone isn't joined to the elevator's Wi-Fi network and walks the user through connecting via Settings, preventing commands from being sent without an active link. Access is role-based, distinguishing between admin and technician accounts to control which functions (e.g., configuration vs. basic operation) each user type can perform.
    `,
    highlights: [
      "Built a Flutter UI with a numbered floor keypad (0–11) plus dedicated Open/Close door controls.",
      "Implemented direct Wi-Fi TCP socket communication between the app and an ESP32 elevator controller.",
      "Designed a connectivity-guard screen that detects missing Wi-Fi association and guides the user to connect to the correct network.",
      "Added role-based access control distinguishing admin and technician permission levels.",
      "Displayed live connection status (Wi-Fi, call/support, info) directly in the app header for quick diagnostics."
    ],
    architecture: {
      app: "Flutter (Dart) cross-platform mobile application.",
      communication: "TCP socket connection over a dedicated local Wi-Fi access point ('LABstar Elevator').",
      controller: "ESP32 microcontroller receiving TCP commands and driving elevator relay/motor hardware.",
      access: "Role-based authentication separating admin and technician capabilities."
    },
    demoType: "app-screens-view"
  },
  {
    id: "electronics-mgmt-rbac",
    title: "Electronics Management & RBAC Security System",
    subtitle: "SQL-Backed Multi-User Inventory Protection & Audit Trails",
    affiliation: "Company",
    affiliationName: "LABstar",
    featured: false,
    badge: "LABstar Enterprise System",
    image: "assets/projs-imgs/01.jpg",
    photos: [
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
    videoUrl: "",
    tags: ["Python", "GUI", "SQL", "RBAC", "Access Control", "Data Integrity", "Audit Logging", "Desktop App", "Application Security"],
    date: "2024",
    role: "Embedded Software Developer (LABstar)",
    summary: "Enterprise inventory and sales management platform built with strict Role-Based Access Control (RBAC) and automated SQL audit trails to safeguard multi-user industrial collaboration.",
    fullDescription: `
      Developed for industrial operations at LABstar, this system enforces the principle of least privilege across all user tiers. Every database query, transaction, and inventory adjustment is cryptographically tagged with the actor's session ID and logged in an immutable audit ledger to prevent internal data tampering and privilege escalation.
    `,
    highlights: [
      "Enforced Role-Based Access Control (RBAC) across multi-user operational workstations.",
      "Prevented SQL injection vulnerabilities via parameterized queries and strict input sanitization.",
      "Maintained automated audit trails detailing user timestamps, transaction hashes, and permission elevation attempts.",
      "Reduced inventory reconciliation anomalies to zero through transactional ACID guarantees."
    ],
    architecture: {
      auth: "Role-based privilege matrix with Granular CRUD authorization tiers.",
      database: "Relational SQL database with foreign key constraints, triggers, and encrypted sensitive fields.",
      logging: "Immutable append-only audit trail capturing IP, user ID, timestamp, and query diffs.",
      resilience: "Automated daily backup pipelines and role verification middleware."
    },
    demoType: "rbac-matrix"
  },
  {
    id: "bank-management-system",
    title: "Secure Bank Management System",
    subtitle: "Multi-User GUI with Encrypted Permission Levels & Transaction Accountability",
    affiliation: "Education",
    affiliationName: "MICA",
    featured: true,
    badge: "FinTech Security",

    image: "./assets/projs-imgs/Bank-1.png",
    photos: [
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
      "./assets/projs-imgs/Bank-11.png",
    ],
    videoUrl: "https://drive.google.com/file/d/15RhqgTHMY3Aq9-Z-kI0AA7WC4AWtFOKm/view?usp=sharing",
    github: "https://github.com/0xOmar-Ibrahim/Bank-Managament-System",
    tags: ["Python", "CustomTkinter", "RBAC", "Transaction Logging", "Security Architecture"],
    date: "2024",
    role: "Lead Software & Security Developer",
    summary: "Modern graphical banking platform engineered with multi-tier RBAC for Customers, Tellers, and Branch Managers, featuring encrypted permission storage, session timeout locks, and tamper-evident transaction logs.",
    fullDescription: `
      A desktop financial software application built in Python utilizing CustomTkinter for a sleek dark mode UI. Designed with a defensive programming paradigm to protect against unauthorized account modifications, balance manipulation, and privilege escalation between employee tiers.
    `,
    highlights: [
      "Created multi-user GUI with distinct authorization tiers: Customer, Teller, and Manager.",
      "Engineered encrypted permission records and hashed credential storage using modern hashing standards.",
      "Built real-time transaction logging with account balance verification and anti-overdraft locks.",
      "Implemented auto-session termination after inactivity periods to prevent unauthorized terminal access."
    ],
    architecture: {
      gui: "CustomTkinter responsive dark-mode GUI with asynchronous state management.",
    },
    demoType: "rbac-matrix"
  },
  {
    id: "sensor-telemetry-pipeline",
    title: "Real-Time Sensor Data Telemetry Pipeline",
    subtitle: "Serial Data Ingestion, SQLite Storage & Anomaly Detection Visualization",
    affiliation: "Company",
    affiliationName: "LABstar",
    featured: true,
    badge: "IoT Anomaly Detection",
    image: "assets/projs-imgs/RT-sensor-1.png",
    photos: [
      "assets/projs-imgs/RT-sensor-1.png",
      "assets/projs-imgs/RT-sensor-2.png"
    ],
    videoUrl: "",
    github: "https://github.com/0xOmar-Ibrahim/Real-Time-Sensor-Data-Visualization-and-Storage",
    tags: ["Python", "NumPy", "Matplotlib", "SQLite", "Serial Telemetry", "Anomaly Detection"],
    date: "2024",
    role: "Systems & Data Pipeline Developer",
    summary: "High-throughput asynchronous telemetry ingestion pipeline capable of capturing serial hardware sensor streams, buffering in SQLite, and rendering real-time dynamic visualizations with threshold-based anomaly alerts.",
    fullDescription: `
      Designed for IoT and industrial hardware monitoring, this pipeline captures high-frequency serial data packets from microcontroller test benches. Utilizes NumPy for real-time mathematical smoothing and statistical outlier detection, alerting operators instantly to anomalous spikes indicative of hardware failure or signal interception.
    `,
    highlights: [
      "Engineered multi-threaded serial communication worker with automated baud rate synchronization.",
      "Integrated SQLite high-speed batch inserts with memory caching for zero dropped packets.",
      "Constructed live Matplotlib visualization updating at 60 FPS without UI freezing.",
      "Implemented statistical 3-sigma anomaly detection to flag unauthorized voltage/frequency deviations."
    ],
    architecture: {
      ingest: "PySerial asynchronous non-blocking stream reader with CRC checksum validation.",
      processing: "NumPy array vectorization for moving averages and standard deviation calculation.",
      storage: "Indexed SQLite time-series schema optimized for range queries.",
      presentation: "Dynamic real-time Matplotlib canvas integrated into custom desktop UI."
    },
    demoType: "sensor-visualizer"
  },
  {
    id: "morse-code-x86",
    title: "Morse Code Converter in Pure x86-64 Assembly",
    subtitle: "Zero-Dependency Low-Level Binary with O(1) Lookup & Direct Win32 API",
    affiliation: "Self-Employed",
    affiliationName: "Independent Research",
    featured: true,
    badge: "x86-64 Assembly / Reverse Engineering",
    image: "assets/projs-imgs/asm-0.png",
    photos: [
      "assets/projs-imgs/asm-0.png"
    ],
    videoUrl: "https://drive.google.com/file/d/1JUuuz_s9QbO3GJCs5nsDDxvb-YOnT09k/view?usp=sharing",
    github: "https://github.com/0xOmar-Ibrahim/Morse-Code",
    tags: ["x86-64 Assembly", "Win32 API", "Low-Level Systems", "Memory Management", "Reverse Engineering"],
    date: "2024",
    role: "Assembly Systems Developer",
    summary: "Ultra-compact terminal-based encoder/decoder written entirely in x86-64 Assembly utilizing raw Win32 console APIs without the C standard library. Demonstrates profound low-level binary comprehension critical for reverse engineering.",
    fullDescription: `
      Engineered from scratch in pure MASM/NASM assembly for the x86-64 architecture. Features manual stack frame construction, direct register manipulation, custom memory-mapped O(1) translation lookup tables, and direct invocation of Kernel32 Win32 I/O functions. Produces an executable under 4KB with zero runtime dependencies.
    `,
    highlights: [
      "Engineered without standard C runtime (no libc/msvcrt) using direct Win32 API syscalls.",
      "Constructed constant-time O(1) ASCII-to-Morse and Morse-to-ASCII pointer lookup tables.",
      "Manual stack alignment, 64-bit calling convention compliance (RCX, RDX, R8, R9), and register safety.",
      "Exemplifies low-level memory layout and binary execution principles essential for binary exploitation & malware analysis."
    ],
    architecture: {
      isa: "x86-64 Intel Architecture (General Purpose Registers: RAX, RBX, RCX, RDX, RSI, RDI).",
      syscalls: "Kernel32.dll: GetStdHandle, ReadConsoleA, WriteConsoleA, ExitProcess.",
      memory: "Static .data and .rdata segment tables with manual pointer arithmetic in .text segment.",
      optimization: "Zero register spills, bitwise character normalization, and loop unrolling."
    },
    demoType: "morse-interactive"
  },
  {
    id: "employee-management-c",
    title: "Employee Management System in C",
    subtitle: "High-Performance Linked List Architecture with Binary File Persistence & O(n) Search",
    affiliation: "Self-Employed",
    affiliationName: "Independent Systems Software",
    featured: true,
    badge: "Pure C / Data Structures & Algorithms",
    image: "assets/projs-imgs/Employee-C-1.png",
    photos: [
      "assets/projs-imgs/Employee-C-0.png"
    ],
    videoUrl: "",
    github: "https://github.com/0xOmar-Ibrahim/Employee-System-Management-With-Linked-List",
    tags: ["C Programming", "Linked Lists", "Binary File I/O", "Dynamic Memory", "Data Structures", "Algorithms", "CRUD Engine", "Cross-Platform"],
    date: "2024",
    role: "Systems Programmer & Software Engineer",
    summary: "A robust, memory-efficient employee management engine built with pure C. Features dynamic singly-linked list architectures, O(n) early-exit multi-criteria search, mark-and-sweep lazy deletion, and automated binary disk serialization with data integrity verification.",
    fullDescription: `
      A high-performance terminal systems application engineered in pure ANSI C implementing foundational computer science paradigms with production-grade optimizations. Built on a modular architecture separating data structures, storage drivers, search algorithms, and user interaction routines. Features dynamic heap allocation with zero memory leaks, fast multi-field record querying (ID, name, department, job title), lazy deletion for batch memory compaction, automated formatted text report generation, and binary file persistence with integrity checks across Linux, Windows, and macOS.
    `,
    highlights: [
      "Complete CRUD Operations: Add, view, update, and remove employee records seamlessly via an intuitive menu-driven CLI interface.",
      "Dynamic Singly Linked List: Zero-leak heap memory management with custom node allocation, pointer traversal, and audited heap cleanup.",
      "Multi-Criteria Search Engine: Rapid multi-parameter filtering (by ID, full name, department, or job title) with O(n) early-exit heuristics.",
      "Binary File Serialization: Compact, high-speed binary disk storage (.bin/.dat) with automatic state recovery and data integrity checks.",
      "Batch Mark-and-Sweep Lazy Deletion: Algorithmic optimization for deferred deallocation and batch memory compaction during heavy write cycles.",
      "Automated Report Exporter: Generates formatted audit rosters and company directory plain text files for administrative export.",
      "Defensive Input Validation: Robust buffer overflow prevention, type checking, and error recovery on all interactive CLI input streams.",
      "Cross-Platform Portability: Strict ANSI/C99 standard compliance compiling and executing seamlessly on Linux, Windows, and macOS."
    ],
    architecture: {
      dataStructures: "Dynamic Singly-Linked List with node pointer chaining, manual malloc/free heap management, and O(1) head insertion.",
      storageLayer: "Binary serialization stream (.dat/.bin) with fixed-struct records, file header validation, and instant seek capability.",
      searchEngine: "Multi-field query dispatcher with early-exit condition parsing and substring matching heuristics.",
      memoryOptimization: "Dynamic memory allocated strictly on demand and batch mark-and-sweep lazy deletion compaction.",
      modularDesign: "Modular C architecture with decoupled header (.h) definitions, driver compilation units (.c), and clean separation of concerns."
    },
    demoType: "c-linked-list"
  },
  {
    id: "cinema-management-c",
    title: "Cinema Management & Ticket Reservation System",
    subtitle: "Modular C Application with Binary File Persistence & Seat Allocation",
    affiliation: "Education",
    affiliationName: "NCT University",
    featured: false,
    badge: "Modular C Systems",
    image: "assets/projs-imgs/0.jpg",
    photos: [
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
    videoUrl: "https://drive.google.com/file/d/1cZr9MdRxbTFVsaIv4UaVEV2UPFfqIjEM/view?usp=sharing",
    github: "https://github.com/0xOmar-Ibrahim/Cinema-Management-System",
    tags: ["C Programming", "Binary File I/O", "Data Structures", "Modular Architecture", "Memory Safety"],
    date: "2023",
    role: "Systems Programmer",
    summary: "High-efficiency cinema management software developed in standard C. Implements custom struct serialization, 2D matrix seat reservations, and transactional file record locking.",
    fullDescription: `
      A clean, modular terminal application in pure C demonstrating sound software engineering practices. Handles movie catalogs, screening schedules, and real-time hall seat allocation with persistent binary file storage, ensuring atomic writes and data recovery.
    `,
    highlights: [
      "Structured in modular headers and compilation units with strict separation of concerns.",
      "Engineered binary file handling routines with record seek, struct serialization, and backup recovery.",
      "Designed dynamic 2D visual seat matrix with live availability tracking.",
      "Applied defensive programming with rigorous buffer overflow prevention and pointer validation."
    ],
    architecture: {
      language: "Standard C99 with GCC / Clang compiler toolchain.",
      storage: "Binary file streams (.dat) with fixed-size record indexing for instant seeking.",
      memory: "Dynamic allocation with Valgrind leak checking and zero memory corruption.",
      ui: "Interactive ANSI color terminal UI with validation loops."
    },
    demoType: "c-code-view"
  },
  {
    id: "voice-smart-home",
    title: "Voice-Controlled Smart Home & Custom PCB",
    subtitle: "Team Leader Graduation Project integrating Flutter, Firebase & ESP8266",
    affiliation: "Education",
    affiliationName: "MICA Graduation Project",
    featured: true,
    badge: "MICA Graduation Project Lead (2025)",
    image: "assets/projs-imgs/smart-home-0.jpg",
    photos: [
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
    videoUrl: "",
    github: "pdfs/Graguation-Project-Book.pdf",
    tags: ["Flutter", "ESP8266 / ESP32", "Firebase", "PCB Design", "Team Leadership", "IoT Security"],
    date: "2025",
    role: "Technical Project Lead & PCB Designer",
    summary: "Led a multidisciplinary engineering team to design and build an IoT smart home ecosystem featuring a custom-designed PCB, voice command processing via a Flutter mobile application, and real-time Firebase synchronization.",
    fullDescription: `
      As the Technical Project Lead for the MICA Graduation Project, directed cross-functional workflows across mobile app development, embedded C firmware, PCB schematic design, and cloud database architecture. Built a low-latency IoT controller with secure Wi-Fi credential provisioning and role-based device actuation.
    `,
    highlights: [
      "Directed team task distribution, milestone scheduling, and complete engineering documentation.",
      "Designed and fabricated custom PCB circuit boards with optocoupler relay isolation and voltage regulation.",
      "Engineered Flutter cross-platform mobile application with speech-to-text voice command parsing.",
      "Integrated secure Firebase Realtime Database rules with device authentication tokens."
    ],
    architecture: {
      mobile: "Flutter / Dart cross-platform mobile application with Voice Recognition SDK.",
      cloud: "Firebase Realtime Database with strict JSON security authorization rules.",
      hardware: "ESP8266 / ESP32 microcontroller with Wi-Fi Station/AP provisioning and SPI/I2C buses.",
      pcb: "Custom dual-layer PCB with power surge protection and noise filtering capacitors."
    },
    demoType: "iot-controller-demo"
  },
  {
    id: "keygarden-pass-gen",
    title: "KeyGarden – Cryptographic Password Suite",
    subtitle: "CustomTkinter Desktop Security Tool with Entropy Analysis & Batch Export",
    affiliation: "Self-Employed",
    affiliationName: "Independent Security Tool",
    featured: false,
    badge: "Cyber Tooling",
    image: "assets/projs-imgs/key-gard-0.png",
    photos: [
      "assets/projs-imgs/key-gard-0.png"
    ],
    videoUrl: "",
    github: "https://github.com/0xOmar-Ibrahim/KeyGarden",
    tags: ["Python", "CustomTkinter", "Cryptography", "Entropy Analysis", "Security Tooling"],
    date: "2024",
    role: "Creator & Security Developer",
    summary: "High-security password generation utility featuring CSPRNG randomness, Shannon entropy calculation, customizable character spaces, passphrase generation, and encrypted batch exports.",
    fullDescription: `
      Created for cybersecurity analysts and privacy-focused users requiring cryptographically secure, high-entropy credentials. Replaces pseudorandom generators with Python's 'secrets' module (OS-level CSPRNG) to protect against entropy exhaustion and brute-force predictability.
    `,
    highlights: [
      "Utilizes cryptographically secure pseudo-random number generator (CSPRNG) via OS entropy.",
      "Calculates real-time Shannon entropy (bits) and estimates brute-force cracking times.",
      "Supports 4 generation modes: Standard Cryptographic, Text-infused, Diceware Passphrase, and Batch Export.",
      "Built with CustomTkinter for an intuitive, modern dark cybersecurity interface."
    ],
    architecture: {
      engine: "Python secrets module + cryptographic entropy collector.",
      algorithm: "Shannon Entropy calculation: H = -sum(p * log2(p)).",
      export: "Encrypted CSV / JSON export with AES password protection.",
      gui: "CustomTkinter with clipboard auto-wipe timer for clipboard security."
    },
    demoType: "password-generator"
  },
  {
    id: "number-system-converter",
    title: "Universal Number System & ASCII Converter",
    subtitle: "Low-Level Base-2/8/10/16 & Character Representation Calculator",
    affiliation: "Self-Employed",
    affiliationName: "Independent Research",
    featured: false,
    badge: "Low-Level Computing",
    image: "assets/projs-imgs/calc-0.png",
    photos: [
      "assets/projs-imgs/calc-0.png"
    ],
    videoUrl: "",
    github: "https://github.com/0xOmar-Ibrahim/universal-number-system",
    tags: ["Python", "Tkinter", "Binary Arithmetic", "Hex/ASCII", "Reverse Engineering Support"],
    date: "2024",
    role: "Developer",
    summary: "Multi-base computational converter and bitwise visualizer designed for reverse engineers and security researchers analyzing binary data representations, hex payloads, and memory offsets.",
    fullDescription: `
      A dedicated utility for reverse engineering and exploit development workflows. Converts values across Binary, Octal, Decimal, Hexadecimal, and ASCII strings simultaneously with bitwise logic inspection (AND, OR, XOR, NOT, shifts) and endianness switching.
    `,
    highlights: [
      "Synchronous conversion across Binary, Hexadecimal, Decimal, Octal, and ASCII representations.",
      "Bit-level inspection grid showing 8-bit, 16-bit, 32-bit, and 64-bit integer signed/unsigned interpretations.",
      "Endianness toggle (Big Endian vs Little Endian) for binary analysis and shellcode crafting.",
      "Fast keyboard-driven UI designed for quick lookup during CTFs and code debugging."
    ],
    architecture: {
      engine: "Python bitwise manipulation engine with precision arbitrary integer support.",
      endian: "Byte-swapping algorithm with custom padding for shellcode inspection.",
      gui: "Lightweight, snappy Tkinter desktop interface with copy-on-click fields."
    },
    demoType: "number-converter"
  },
  {
    id: "esp32-21-relay-controller",
    title: "21-Channel Relay Control Board",
    subtitle: "ESP32-Based Modular Relay Driver PCB with Darlington Array Isolation",
    affiliation: "Self-Employed",
    affiliationName: "Independent Design",
    featured: false,
    badge: "Embedded PCB Design",
    image: "assets/projs-imgs/PCB-1.jpg",
    photos: [
      "assets/projs-imgs/PCB-0.jpg",
      "assets/projs-imgs/PCB-1.jpg",
      "assets/projs-imgs/PCB-2.jpg",
      "assets/projs-imgs/PCB-3.jpg"
    ],
    videoUrl: "",
    github: "",
    tags: ["PCB Design", "ESP32", "Power Electronics", "EasyEDA", "Relay Control", "Embedded Systems"],
    date: "2025",
    role: "Hardware Designer",
    summary: "Custom PCB built around an ESP32 (NodeMCU-32S) that independently drives 21 relay channels through darlington transistor arrays, with an onboard buck converter for clean 5V logic power.",
    fullDescription: `
      A complete relay-control mainboard designed in EasyEDA, centered on an ESP32-WROOM-32 (NodeMCU-32S) module. All 21 GPIO-driven outputs are buffered through three 16-pin darlington driver arrays (Q1, Q2, Q3) instead of driving relay coils directly from the MCU, protecting the ESP32 from back-EMF and current overload. Each relay stage has its own transistor switch, base resistor, and snubber capacitor, laid out in repeatable "Control Relays" blocks (three groups of 7) for easy routing and debugging. Onboard power regulation steps 12V down to a stable 5V rail using an LM2587 switching regulator, with input/output filtering caps and a flyback diode for the inductor. A dedicated terminal block breaks out the 4 input control lines, 12V, 5V, 3.3V, and GND for external wiring.
    `,
    highlights: [
      "Designed full schematic and 1-layer PCB layout in EasyEDA, from concept to 3D render.",
      "Used 3 darlington transistor array ICs to isolate ESP32 GPIOs from 21 individual relay driver stages.",
      "Grouped relays into three repeatable 'Control Relays' blocks (7 channels each) for clean, modular routing.",
      "Integrated an LM2567/LM2587-based switching regulator to derive a regulated 5V rail from 12V input.",
      "Added flyback diodes and decoupling capacitors across each relay stage to suppress inductive kickback.",
      "Broke out a labeled terminal header (IN1–IN4, 12V, 5V, 3.3V, GND) for simple external integration."
    ],
    architecture: {
      mcu: "ESP32-WROOM-32 on a NodeMCU-32S dev module, using GPIOs mapped to in1–in21.",
      driving: "Three multi-channel darlington transistor arrays (Q1/Q2/Q3) buffering GPIO outputs to relay coil transistors.",
      power: "12V input regulated to 5V via LM2587 buck converter, with 3.3V supplied by the ESP32 module's onboard regulator.",
      layout: "1-layer PCB with symmetric left/right relay banks and bottom-row relays, routed in EasyEDA."
    },
    demoType: "pcb-schematic-view"
  }
];

if (typeof window !== 'undefined') {
  window.PROJECTS_DATA = PROJECTS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
