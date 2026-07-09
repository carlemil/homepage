# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal homepage / CV for Carl-Emil Kjellstrand, deployed via GitHub Pages. The
entire site is a single self-contained `index.html` — all CSS is in one `<style>`
block and all JavaScript in one `<script>` block. There is no build step, no
dependencies, no framework, and no tests. `assets/` holds the images and videos
referenced by project cards.

## Local development

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server
```

Then visit http://localhost:8000/. Deployment is automatic: pushing to `main`
publishes via GitHub Pages.

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
