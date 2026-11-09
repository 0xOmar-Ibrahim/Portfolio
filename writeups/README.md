# Writeups

Each `.md` file in this folder is one writeup on the site.

## Add a writeup

1. Copy `_template.md` to a new name, for example `htb-machine-name.md`. The name becomes the link:
   `#writeups/htb-machine-name`.
2. Fill in the lines between the two `---` lines at the top, then write the body in Markdown.
3. Put screenshots in `writeups/images/` and link them as `images/your-file.png`.
4. Commit and push. The deploy builds the list for you.

## The top block

| Field | Required | Example |
| --- | --- | --- |
| `title` | yes (or start the body with `# Title`) | `Machine Name: from recon to root` |
| `date` | yes, as YYYY-MM-DD | `2026-11-09` |
| `type` | no, defaults to Writeup | `HTB retired machine`, `CTF writeup`, `Research` |
| `summary` | no, defaults to the first paragraph | One or two sentences for the card |
| `tags` | no | `[Linux, Web, PrivEsc]` |
| `draft` | no | `true` keeps it off the site |

If a file is missing a title or date, it is skipped and the deploy log shows a warning.

## Preview before publishing

```
node scripts/build-writeups.mjs
python -m http.server 8000
```

Open http://localhost:8000. Add `?drafts` to the address
(http://localhost:8000/?drafts) to see drafts too.

## Notes

- Images and links must point to files in this repo or to `https://` pages. Images hosted on other
  sites are blocked by the site's Content-Security-Policy, so save them into `images/` instead.
- Raw HTML in a writeup is cleaned before display, and scripts never run.
- Only publish what you are allowed to: retired Hack The Box content, finished CTFs whose rules
  allow it, and no real target without written permission.
