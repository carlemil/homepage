# homepage

Personal homepage and CV for Carl-Emil Kjellstrand, hosted with GitHub Pages.

A single self-contained `index.html` (all CSS and JavaScript inlined) presenting a
short bio, a gallery of projects, and work experience. Project cards can open an
inline modal with a screenshot, a screenshot gallery, or an embedded video.

## Structure

- `index.html` — the entire site: markup, styles, and the modal viewer script.
- `assets/` — images and videos referenced by the project cards.

## Projects featured

- **Markera** — Kotlin Multiplatform + Compose app detecting bullet-hole positions with a YOLOv8 ONNX model.
- **OneLife** — a browser-played text adventure driven by AI agents.
- **burnTheWeb** — an interactive Sierpiński triangle rendered with a classic fire effect.
- **FieldShootingTimer** — a customizable shooting-practice timer for Android and iOS.
- **appshooter** — a tool for managing shooting competitions.
- **ColorMatch** — an Android app that frames an image with its best-matching palette color.
- **LSystemCamera** — an Android experiment combining L-system fractals with the device camera.
- **LMSLHT-web-js-client** — a web/JavaScript client for LMSLHT.

## Local development

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server
```

Then visit <http://localhost:8000/>.
