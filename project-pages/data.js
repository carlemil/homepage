// Mockup data: one short summary per project. The full text stays in ../index.html.
// Years are GitHub repo creation years (TaleBindery is private, assumed 2026).
const A = '../assets/';
const PROJECTS = [
  { id: 'tickets', name: 'Tickets', lang: 'Python', status: 'active', year: 2026, thumb: A + 'tickets.png',
    summary: 'A personal Jira replacement: a lane board I drag cards around on while Claude Code agents work the same cards over MCP.',
    tags: ['MCP', 'SQLite', 'Claude Code'], live: null, gh: 'https://github.com/carlemil/tickets' },
  { id: 'talebindery', name: 'TaleBindery', lang: 'TypeScript', status: 'active', year: 2026, thumb: null,
    summary: 'Turns a story idea and photos of the real people in it into an illustrated picture book.',
    tags: ['Next.js', 'BullMQ', 'Gemini'], live: null, gh: null },
  { id: 'markera', name: 'Markera', lang: 'Kotlin', status: 'active', year: 2026, thumb: A + 'markera/a7_userview_tilt.jpg',
    summary: 'Scores a precision-shooting series from one phone photo of the target — on-device YOLOv8, OCR and geometry.',
    tags: ['KMP', 'ONNX', 'ML Kit'], live: ['Google Play', 'https://play.google.com/store/apps/details?id=se.kjellstrand.markera'], gh: 'https://github.com/carlemil/Markera' },
  { id: 'onelife', name: 'OneLife', lang: 'Python', status: 'active', year: 2026, thumb: A + 'onelife.png',
    summary: 'A text adventure where you talk your way past AI-driven characters. Death is real.',
    tags: ['LLM', 'Game'], live: ['Play', 'https://onelifegame.duckdns.org/'], gh: 'https://github.com/carlemil/OneLife' },
  { id: 'kicktro', name: 'KickTro', lang: 'JavaScript', status: 'active', year: 2026, thumb: null,
    summary: 'A beat-reactive WebGL2 demoscene engine with 55 effects, stackable four layers deep.',
    tags: ['WebGL2', 'Shaders'], live: ['kicktro.com', 'https://kicktro.com'], gh: 'https://github.com/carlemil/kicktro' },
  { id: 'fst', name: 'FieldShootingTimer', lang: 'Kotlin', status: 'active', year: 2024, thumb: null,
    summary: 'A shot timer that calls out Swedish field-shooting range commands. One codebase, Android and iOS.',
    tags: ['KMP', 'Compose'], live: ['iOS/Android', 'https://carlemil.github.io/FieldShootingTimer/'], gh: 'https://github.com/carlemil/FieldShootingTimer' },
  { id: 'appshooter', name: 'appshooter', lang: 'Kotlin', status: 'active', year: 2024, thumb: null,
    summary: 'Companion app for webshooter.se: browse competitions, sign up, follow results and score trends.',
    tags: ['KMP', 'Offline'], live: ['Android', 'https://play.google.com/store/apps/details?id=se.kjellstrand.webshooter&hl=en'], gh: 'https://github.com/carlemil/webshooter' },
  { id: 'colormatch', name: 'ColorMatch', lang: 'Kotlin', status: 'archived', year: 2025, thumb: A + 'colormatch-1.jpg',
    summary: 'Frames each photo with the palette color that best matches its most prominent hues.',
    tags: ['Compose', 'CIE LAB'], live: null, gh: 'https://github.com/carlemil/ColorMatch' },
  { id: 'lsystemcamera', name: 'LSystemCamera', lang: 'Kotlin', status: 'active', year: 2020, thumb: A + 'lsystemcamera.mp4',
    summary: 'Redraws the live viewfinder as one space-filling L-system curve, thick where the image is dark.',
    tags: ['CameraX', 'KMP'], live: ['Google Play', 'https://play.google.com/store/apps/details?id=se.kjellstrand.lsystemcamera'], gh: 'https://github.com/carlemil/LSystemCamera' },
  { id: 'lmslht', name: 'LMSLHT-web-js-client', lang: 'JavaScript', status: 'archived', year: 2026, thumb: null,
    summary: 'The browser version: a photo redrawn as a single-line L-system halftone.',
    tags: ['Canvas'], live: ['Open', 'https://carlemil.github.io/LMSLHT-web-js-client/index.html'], gh: 'https://github.com/carlemil/LMSLHT-web-js-client' },
];

// Every "Read more" opens the Markera sample page in these mockups.
const MORE = '#markera';

function thumb(p, cls) {
  cls = cls || '';
  if (!p.thumb) return '<div class="placeholder ' + cls + '">' + p.name.slice(0, 2) + '</div>';
  if (p.thumb.endsWith('.mp4')) return '<video class="' + cls + '" src="' + p.thumb + '#t=2" muted playsinline preload="metadata"></video>';
  return '<img class="' + cls + '" src="' + p.thumb + '" alt="">';
}
function status(p) {
  return '<span class="status ' + p.status + '">' + (p.status === 'active' ? 'Active' : 'Archived') + '</span>';
}
function render(sel, fn) {
  document.querySelector(sel).innerHTML = PROJECTS.map(fn).join('');
}
