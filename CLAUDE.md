# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal homepage / CV for Carl-Emil Kjellstrand, deployed via GitHub Pages. The
entire site is a single self-contained `index.html` — all CSS is in one `<style>`
block and all JavaScript in one `<script>` block. There is no build step, no
dependencies, no framework, and no automated tests — a change is checked by
looking at the rendered page. `assets/` holds the images and videos referenced
by project cards. `markera-detection.html` is a standalone write-up page.

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
Screenshot `markera-detection.html` the same way when it was touched. A change
that adds media also needs the modal opened and looked at: `python -m
http.server` in the worktree, then click that card's button.

## Architecture notes

- **Dark theme is hardcoded** with GitHub-style hex colors (`#0d1117` background,
  `#58a6ff` links, etc.). `color-scheme: light dark` is declared but the palette is
  fixed dark — reuse the existing hex values rather than introducing new ones.

- **Project cards** are static `<article class="card">` elements. Each has a
  `.lang` tag, a `.status` (`active` or `archived`, which drives the colored status
  dot via CSS), a description, and a `.links` row.

- **The modal media viewer** is the one piece of interactivity. Cards open images
  or video in a shared modal (`#mediaModal`) via `data-*` attributes on `<button>`
  elements — the script wires these up by attribute, so adding media to a card
  needs no JS changes, only the right attribute:
  - `data-video="assets/x.mp4"` → video player
  - `data-image="assets/x.png"` → single image
  - `data-images="assets/a.jpg,assets/b.jpg"` → comma-separated scrolling gallery

  Modal closes on the `×` button, backdrop click, or Escape.
