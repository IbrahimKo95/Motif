// Wordmarks fictifs : texte + glyphe SVG simple, jamais de vraies marques.
const G = {
  circle: '<circle cx="12" cy="12" r="10"/>',
  square: '<rect x="3" y="3" width="18" height="18" rx="2"/>',
  tri: '<path d="M12 3 22 21H2z"/>',
  ring: '<path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/>',
  diamond: '<path d="m12 2 10 10-10 10L2 12z"/>',
  half: '<path d="M2 12a10 10 0 0 1 20 0z"/><path d="M2 15h20v3H2z"/>',
};
const NAMES = [
  { g: "circle", n: "verlan", c: "m1" },
  { g: "square", n: "ORME", c: "m2" },
  { g: "tri", n: "Kolibri Studio", c: "m3" },
  { g: "half", n: "tramway/", c: "m4" },
  { g: "ring", n: "Halcyon", c: "m5" },
  { g: "diamond", n: "Bureau Ficelle", c: "m6" },
];
const mark = (m) => `<span class="lg-mark ${m.c}"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">${G[m.g]}</svg>${m.n}</span>`;
const items = (arr = NAMES, cls = "lg-item") => arr.map((m) => `<li class="${cls}">${mark(m)}</li>`).join("");

const base = `
& .lg{padding:56px 48px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .lg-cap{margin:0;text-align:center;font:600 var(--fs-xs)/1.4 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted)}
& .lg-list{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px 40px}
& .lg-item{display:flex;align-items:center;justify-content:center}
& .lg-mark{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;font:600 var(--fs-lg)/1 var(--font-display);letter-spacing:var(--heading-tracking);color:var(--text-muted);transition:color var(--dur) var(--ease)}
& .lg-item:hover .lg-mark{color:var(--text)}
& .lg-mark.m1{font-weight:800;letter-spacing:-.02em;font-size:22px}
& .lg-mark.m2{font-family:var(--font-body);font-weight:700;letter-spacing:.22em;font-size:var(--fs-sm)}
& .lg-mark.m3{font-style:italic;font-weight:500;font-size:var(--fs-xl)}
& .lg-mark.m4{font-family:var(--font-mono);font-weight:500;font-size:var(--fs-base);letter-spacing:0}
& .lg-mark.m5{font-weight:400;font-size:var(--fs-xl);letter-spacing:.02em}
& .lg-mark.m6{font-family:var(--font-body);font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:var(--fs-sm)}
@media (max-width:820px){& .lg{padding:40px 20px}& .lg-list{justify-content:center;gap:20px 28px}}
`;

const snippet = `<section class="lg" aria-labelledby="lg-title">
  <p class="lg-cap" id="lg-title">Trusted by 12,400 freelancers</p>
  <ul class="lg-list">
    <li class="lg-item"><span class="lg-mark"><svg aria-hidden="true">…</svg>Acme Studio</span></li>
    <!-- 5 more, wordmarks as SVG or text with alt text -->
  </ul>
</section>`;

const cap = `<p class="lg-cap" id="__ID__">Ils facturent avec Nomade</p>`;

export default {
  id: "logos", label: "Logos clients", group: "Sections", icon: "f_logos", size: "lg", fit: 900,
  desc: "Preuve sociale par les logos : bandeau, cartes, défilement, chiffre, pilules.",
  base, snippet,
  rules: [
    "Show 5 to 8 real customer logos that your audience recognizes, all at the same optical height, in one neutral color. Never use logos without permission.",
    "Give the strip a one-line caption that says who the logos are (customers, press, integrations). Do not mix categories.",
    "Provide the company name as text or alt text on every logo. Animated strips must stop under prefers-reduced-motion and pause on hover.",
    "Place it right below the hero, before the first feature. It is a supporting line, so keep it visually quieter than the headline.",
  ],
  demo: () => `<section class="lg" aria-label="Clients">${cap.replace("__ID__", "x")}<ul class="lg-list" style="margin-top:24px">${items()}</ul></section>`,
  variants: [
    {
      id: "band", name: "Bandeau sobre", desc: "Une ligne de logos gris sur bande teintée.", tags: ["Discret", "Standard"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["Full-width bg-subtle band framed by 1px hairlines top and bottom, a small uppercase caption above a single row of six wordmarks spread evenly.", "Wordmarks are text-muted at rest and switch to text color on hover; no boxes."],
      demo: () => `<section class="lg" aria-label="Clients">${cap.replace("__ID__", "b")}<ul class="lg-list" style="margin-top:28px">${items()}</ul></section>`,
      css: `
& .lg{padding:44px 48px 48px;background:var(--bg-subtle);border-block:1px solid var(--border)}
& .lg-mark{opacity:.85}
& .lg-item:hover .lg-mark{opacity:1}`,
    },
    {
      id: "cards", name: "Grille en cartes", desc: "Chaque logo dans sa cellule bordée.", tags: ["Structuré", "Clair"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Three-by-two grid of 88px-tall bordered surface cells with 12px gaps, each centering one wordmark.", "Hover raises the cell to shadow-md and darkens the wordmark; the caption sits left-aligned above the grid."],
      demo: () => `<section class="lg" aria-label="Clients"><p class="lg-cap">Ils nous font confiance pour facturer</p><ul class="lg-list">${items()}</ul></section>`,
      css: `
& .lg-cap{text-align:left;margin-bottom:20px}
& .lg-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
& .lg-item{height:88px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);transition:box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease)}
& .lg-item:hover{box-shadow:var(--shadow-md);border-color:var(--border-strong)}
@media (max-width:820px){& .lg-list{grid-template-columns:repeat(2,minmax(0,1fr))}}`,
    },
    {
      id: "marquee", name: "Défilement", desc: "Bande infinie de logos qui glisse doucement.", tags: ["Animé", "Dynamique"],
      attrs: { shape: "sharp", depth: "flat", energy: "friendly" },
      spec: ["A single track that scrolls left in a 32s linear loop (two identical sets, translateX to -50%), masked with 12% fades on both edges.", "Pauses on hover and focus-within, and stops entirely under prefers-reduced-motion; the duplicate set is aria-hidden."],
      snippet: `<section class="lg">
  <p class="lg-cap">Trusted by 12,400 freelancers</p>
  <div class="lg-view">
    <div class="lg-track">
      <ul class="lg-list">…logos…</ul>
      <ul class="lg-list" aria-hidden="true">…same logos…</ul>
    </div>
  </div>
</section>`,
      demo: () => `<section class="lg" aria-label="Clients">${cap.replace("__ID__", "m")}<div class="lg-view"><div class="lg-track"><ul class="lg-list">${items()}</ul><ul class="lg-list" aria-hidden="true">${items()}</ul></div></div></section>`,
      css: `
@keyframes lg-scroll{to{transform:translateX(-50%)}}
& .lg{padding-inline:0}
& .lg-view{margin-top:28px;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent);mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent)}
& .lg-track{display:flex;width:max-content;animation:lg-scroll 32s linear infinite}
& .lg-view:hover .lg-track,& .lg-view:focus-within .lg-track{animation-play-state:paused}
& .lg-list{flex:none;flex-wrap:nowrap;justify-content:flex-start;gap:0}
& .lg-item{padding-inline:28px}
@media (prefers-reduced-motion:reduce){& .lg-track{animation:none}}`,
    },
    {
      id: "proof", name: "Chiffre et logos", desc: "Une phrase de preuve chiffrée et une grille de logos.", tags: ["Confiance", "Chiffré"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Two columns: on the left a 56px display-face figure with a one-sentence proof and a text link; on the right a 2x3 wordmark grid divided by hairlines.", "The figure uses tabular numerals and a real, dated statistic."],
      demo: () => `<section class="lg" aria-label="Clients"><div class="lg-proof"><div class="lg-stat"><p class="lg-num">12 400</p><p class="lg-claim">indépendants et petites agences facturent avec Nomade, pour 38 M€ encaissés depuis janvier.</p><a class="lg-link" href="#">Lire les études de cas</a></div><ul class="lg-list">${items()}</ul></div></section>`,
      css: `
& .lg-proof{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:center}
& .lg-stat{display:grid;gap:12px;justify-items:start}
& .lg-num{margin:0;font:var(--heading-weight) var(--fs-4xl)/1 var(--font-display);letter-spacing:var(--heading-tracking);font-variant-numeric:tabular-nums}
& .lg-claim{margin:0;max-width:32ch;font-size:var(--fs-base);line-height:1.5;color:var(--text-muted)}
& .lg-link{font:600 var(--fs-sm)/1 var(--font-body);color:var(--accent-text);text-underline-offset:4px}
& .lg-link:focus-visible{outline:2px solid var(--focus);outline-offset:3px}
& .lg-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;border-top:1px solid var(--text);border-left:1px solid var(--border-strong)}
& .lg-item{height:76px;border-right:1px solid var(--border-strong);border-bottom:1px solid var(--border-strong)}
@media (max-width:820px){& .lg-proof{grid-template-columns:1fr;gap:32px}}`,
    },
    {
      id: "pills", name: "Pilules", desc: "Logos dans des pastilles arrondies, centrées.", tags: ["Ludique", "Doux"],
      attrs: { shape: "pill", depth: "outline", energy: "friendly" },
      spec: ["Centered caption over a wrapping row of full-radius pills (42px tall, 1px border, 20px inline padding) each holding a glyph in accent-text and a wordmark.", "Hover fills the pill with accent-soft."],
      demo: () => `<section class="lg" aria-label="Clients">${cap.replace("__ID__", "p")}<ul class="lg-list" style="margin-top:24px">${items()}</ul></section>`,
      css: `
& .lg-list{justify-content:center;gap:12px}
& .lg-item{height:42px;padding:0 20px;background:var(--surface);border:1px solid var(--border-strong);border-radius:var(--r-full);transition:background var(--dur) var(--ease),border-color var(--dur) var(--ease)}
& .lg-item:hover{background:var(--accent-soft);border-color:var(--accent)}
& .lg-mark svg{color:var(--accent-text)}
& .lg-mark{color:var(--text)}`,
    },
  ],
};
