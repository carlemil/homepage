# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal homepage / CV for Carl-Emil Kjellstrand, deployed via GitHub Pages. The
main page is a self-contained `index.html` with all its CSS in one `<style>`
block and no JavaScript. Each project has its own page in `projects/<name>.html`,
all sharing `projects/project.css`. There is no build step, no dependencies, no
framework, and no automated tests — a change is checked by looking at the
rendered page. `assets/` holds the images and videos. `markera-detection.html`
is a standalone write-up page.

## Local development

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server
```

Then visit http://localhost:8000/. Deployment is automatic: pushing to `main`
publishes via GitHub Pages.

## Testing = looking at the page

There is no test suite. Before calling a change done, screenshot the page before
and after and compare them with your own eyes:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=3000 --window-size=1280,6000 --screenshot=$env:TEMP\after.png "file:///D:/source/homepage.worktrees/card-<id>/index.html"
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=3000 --window-size=1280,6000 --screenshot=$env:TEMP\before.png "file:///D:/source/homepage/index.html"
```

`after` is the card worktree, `before` the main checkout (which stays on `main`
and is therefore the unchanged page). Raise the `6000` if the page outgrows it.
Keep the PNGs in `%TEMP%`; never commit them.

Then read both and report two things: (1) what was asked for is visibly there,
and (2) the rest of the page looks exactly as before. `git diff main...HEAD` says
what should have changed; the screenshots are what proves nothing else did.
Anything that moved, vanished or restyled unasked is a failure — fix it first.
Screenshot `markera-detection.html` and any touched `projects/*.html` page the
same way.

## Architecture notes

- **Dark theme is hardcoded** with GitHub-style hex colors (`#0d1117` background,
  `#58a6ff` links, etc.). `color-scheme: light dark` is declared but the palette is
  fixed dark — reuse the existing hex values rather than introducing new ones.

- **Project cards** on the main page are static `<a class="card">` elements, the
  whole card linking to `projects/<name>.html`. Each has a `.thumb` (an image,
  a `video` with `#t=2`, or a `.placeholder` div with two letters), a `.lang` tag,
  a `.status` (`active` or `archived`, which drives the colored status dot via
  CSS), a one-sentence summary, and a "Read more" label.

- **Project pages** are case studies: a `.hero` image (or `.hero.plain` without
  one), an `.glance` facts box (stack, platforms, started, status, links), then
  `.cs` sections of text beside an `img/video/iframe.media` (`.cs.flip` swaps
  sides, `.cs.text` is text only), a `.links` button row and a `.related` line.
  The full project text lives here; the card keeps only the summary. Adding a
  project means a new card and a new page.
