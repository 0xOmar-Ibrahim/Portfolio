/**
 * Omar Ibrahim - Findings and writeups.
 *
 * TO ADD A WRITEUP: copy the template below into the array (strongest first) and fill it in.
 * All text is plain text. Keep "draft: true" until it is ready, and drafts stay hidden.
 *
 * Only publish what you are allowed to:
 *   - Hack The Box: retired machines and challenges only. Active content is against the rules.
 *   - CTFs: check the organiser's rules, and wait until the event has ended.
 *   - Bug reports and client work: never name a target without written permission.
 *
 * {
 *   id: "htb-machine-name",            // lowercase, used in the link: #writeup/htb-machine-name
 *   draft: true,
 *   type: "HTB retired machine",       // or "CTF writeup", "Code audit", "Responsible disclosure"
 *   title: "Machine name: how I got root",
 *   date: "Dec 2026",
 *   summary: "One or two sentences. What was vulnerable, and what you did about it.",
 *   tags: ["Linux", "SSRF", "PrivEsc"],
 *   sections: [
 *     { heading: "Recon", text: ["A paragraph.", "Another paragraph."], code: "nmap -sC -sV 10.10.10.10" },
 *     { heading: "Foothold", text: ["What you found and why it works."] },
 *     { heading: "Privilege escalation", list: ["A step", "Another step"] },
 *     { heading: "How to fix it", text: ["What the owner should change."] }
 *   ],
 *   // Optional, for audits and reports:
 *   findings: [{ severity: "Medium", title: "", where: "", url: "", evidence: "", result: "", impact: "", fix: "" }],
 *   refs: [{ label: "Certificate", url: "pdfs/example.pdf" }]
 * }
 */

var WRITEUPS_DATA = [
  {
    id: "production-idor",
    type: "Responsible disclosure",
    title: "Critical IDOR on a live production website",
    date: "Feb 2025",
    summary: "In February 2025 I found a critical Insecure Direct Object Reference on a production site that exposed personally identifiable information, including national ID numbers, names and photos. I proved it and reported it through responsible disclosure.",
    tags: ["IDOR", "PII Exposure", "Broken Access Control", "Manual Testing", "Responsible Disclosure"],
    sections: [
      {
        heading: "What I found",
        text: [
          "By manipulating an object identifier in a request, I could reach personal data belonging to other users, including national ID numbers, names and photos. That is why I rated it critical: this data identifies real people and cannot be changed the way a password can.",
        ],
      },
      {
        heading: "What I did about it",
        list: [
          "Proved the flaw and its impact.",
          "Wrote an assessment report with reproduction steps, impact analysis and specific remediation guidance.",
          "Reported it following responsible disclosure practices.",
          "The work started and finished in February 2025.",
        ],
      },
      {
        heading: "Why there are no more details",
        text: [
          "The target and the technical specifics stay private. That is part of disclosing responsibly. I'm happy to talk through the method in an interview.",
        ],
      },
    ],
  },
  {
    id: "self-audit",
    type: "Code audit",
    title: "I audited my own projects and found real bugs",
    date: "Nov 2026",
    summary: "I went back through six of my public repos as if they belonged to a client. SQL injection, a stack buffer overflow and plaintext passwords were all there, in code I once considered finished.",
    tags: ["SQL Injection", "Buffer Overflow", "Credential Storage", "Python", "C", "x86-64"],
    sections: [
      {
        heading: "Why audit my own code",
        text: [
          "These are some of my earlier projects. Reading them again with what I know now seemed like an honest test: can I find bugs in code that I wrote and once thought was fine?",
          "I could. I would rather show that than pretend my early code was perfect.",
        ],
      },
      {
        heading: "Scope and method",
        list: [
          "Six public repositories: Sensor Pipeline, Bank, Employee, Cinema, Morse Code and KeyGarden.",
          "Manual code review, looking for injection, memory safety problems, credential handling and weak randomness.",
          "Where I could, I reproduced a finding with a minimal test on a throwaway copy of the exact vulnerable statement, not the live app.",
          "These are local desktop and command-line apps, so the attacker is whoever controls the input. I rated severity with that in mind: the same bugs on a server would rate higher.",
        ],
      },
    ],
    findings: [
      {
        severity: "Medium",
        title: "SQL injection in record names",
        where: "Real-Time Sensor Pipeline: dataBase.py, lines 38, 47 and 62",
        url: "https://github.com/0xOmar-Ibrahim/Real-Time-Sensor-Data-Visualization-and-Storage/blob/HEAD/dataBase.py#L62",
        evidence: "cr.execute(f\"DELETE from record where name = '{name}'\")",
        result: "name = x' OR '1'='1\n\nbefore: 3 rows\nafter:  0 rows",
        impact: "A record name is typed into a text field and placed directly into SQL. A plain apostrophe crashes the query, a crafted name on the DELETE wipes every recording, and a subquery in the INSERT copies other rows into a stored column. Stacked statements such as DROP TABLE did not work, because Python's sqlite3 runs one statement per execute.",
        fix: "Use bound parameters: cr.execute(\"DELETE from record where name = ?\", (name,)). With that one change, the same payload deleted nothing.",
      },
      {
        severity: "Medium",
        title: "Stack buffer overflow on the old-password prompt",
        where: "Employee Management System: Employee.c, lines 202 to 204",
        url: "https://github.com/0xOmar-Ibrahim/Employee-System-Management-With-Linked-List/blob/HEAD/Employee.c#L202",
        evidence: "char oldPassword[9];\nscanf(\"%s\", &oldPassword);",
        result: "$ python -c \"print('A'*200)\" | ./poc\n*** stack smashing detected ***: terminated",
        impact: "scanf with a bare %s has no length limit, so input longer than 8 characters writes past the buffer. I confirmed the overflow with a stack-protector build. I did not go on to develop an exploit, and the outcome would depend on the compiler's protections.",
        fix: "Limit the read with scanf(\"%8s\", oldPassword), or use fgets with sizeof, as the rest of this project already does.",
      },
      {
        severity: "Medium",
        title: "Plaintext passwords and a hardcoded manager account",
        where: "Bank Management System: GUI.py, lines 84 to 98, and Bank.py, line 23",
        url: "https://github.com/0xOmar-Ibrahim/Bank-Managament-System/blob/HEAD/GUI.py#L84",
        evidence: "self.bank.managers[1020].password == password",
        impact: "Passwords are stored and compared as plaintext, and the manager's short numeric password is written into source code in a public repository. Anyone who reads the repo can log in as manager. There is also no lockout on failed attempts. All data is held in memory, which limits the impact to a single running session.",
        fix: "Create the manager account at first run, store only salted password hashes (bcrypt or Argon2), compare them in constant time, and limit failed attempts.",
      },
      {
        severity: "Low",
        title: "Unbounded string input",
        where: "Cinema Management System: FilmManagement.c, HallManagement.c and HomePage.c (7 calls)",
        url: "https://github.com/0xOmar-Ibrahim/Cinema-Management-System/blob/HEAD/FilmManagement.c#L43",
        evidence: "char name_of_film[20];\nscanf(\"%s\", newFilm->name_of_film);",
        impact: "The same pattern as the Employee bug, this time overflowing struct fields and local buffers. I found this by reading the code and did not run a separate test. Numeric input in this project is checked properly, so the gap is specific to strings.",
        fix: "Add a width to every %s, one less than the buffer size.",
      },
      {
        severity: "Low",
        title: "Out-of-bounds read on non-letter input",
        where: "Morse Code Converter: main.asm, around lines 127 to 150",
        url: "https://github.com/0xOmar-Ibrahim/Morse-Code/blob/HEAD/Morse_Code/main.asm#L127",
        evidence: "sub     al, 41h         ; al - 65\nmov     bl, 5\nmul     bl\nmovzx   rbx, ax\nadd     rcx, rbx",
        impact: "Each character is turned into a table offset with no check that it is between A and Z. A digit or a lowercase letter lands past the end of the table, by up to about 1,275 bytes, and the program prints 4 bytes from that address. This comes from reading the code: I have not assembled and run it to confirm what gets printed.",
        fix: "Convert lowercase to uppercase, reject anything outside A to Z, and only then calculate the offset.",
      },
      {
        severity: "Low",
        title: "Plaintext batch export and a non-cryptographic shuffle",
        where: "KeyGarden: KeyGarden.py, lines 143 and 166",
        url: "https://github.com/0xOmar-Ibrahim/KeyGarden/blob/HEAD/KeyGarden.py#L143",
        evidence: "File = open(\"passwords.txt\", 'w')\n...\nrandom.shuffle(combined)",
        impact: "Batch mode leaves generated passwords in a plaintext file in the working directory. The shuffle uses Python's random module, which is predictable if its state is known. This matters less than it sounds: the characters themselves come from Fernet keys, which use os.urandom, so the output is not predictable just because the shuffle is.",
        fix: "Use secrets.SystemRandom().shuffle, warn before writing a plaintext file or encrypt it, and clear the clipboard after a timeout.",
      },
    ],
    closing: [
      {
        heading: "What held up",
        list: [
          "Morse Code bounds its console read: 255 bytes into a 256-byte buffer.",
          "The Bank app blocks withdrawals larger than the balance.",
          "Employee reads most text fields safely with fgets and sizeof.",
          "KeyGarden's key material comes from a secure source.",
        ],
      },
      {
        heading: "What I took from it",
        text: [
          "The worst bugs were not in the hard parts. They were small conveniences, like an f-string in a query or one bare scanf, sitting right next to code where I had done it properly. Consistency is the real problem, and it's something I now look for in any code I review.",
          "None of this is fixed yet, so these findings are all still open in the repos. Fixing them is the next step.",
        ],
      },
    ],
  },
];

if (typeof window !== 'undefined') {
  window.WRITEUPS_DATA = WRITEUPS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WRITEUPS_DATA };
}
