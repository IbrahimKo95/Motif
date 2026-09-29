import { ic } from "../icons.mjs";

const base = `
& .bc{font:400 var(--fs-sm)/1 var(--font-body);color:var(--text-muted)}
& .bc ol{display:flex;align-items:center;flex-wrap:wrap;gap:0;margin:0;padding:0;list-style:none}
& .bc li{display:inline-flex;align-items:center;min-width:0}
& .bc li + li::before{content:'/';flex:none;margin:0 8px;color:var(--border-strong)}
& .bc a{display:inline-flex;align-items:center;gap:6px;color:var(--text-muted);text-decoration:none;border-radius:var(--r-sm);transition:color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .bc a:hover{color:var(--text);text-decoration:underline;text-underline-offset:3px}
& .bc a:focus-visible,& .bc button:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .bc [aria-current=page]{color:var(--text);font-weight:600;white-space:nowrap}
& .bc .ell{display:inline-grid;place-items:center;min-width:24px;height:24px;padding:0;border:0;background:none;color:var(--text-muted);font:inherit;letter-spacing:.1em;cursor:pointer;border-radius:var(--r-sm)}
& .bc .ell:hover{background:var(--bg-subtle);color:var(--text)}
& .bc-stack{display:grid;gap:16px}
& .bc-cap{margin:0 0 6px;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
`;

const trail = (o = {}) => {
  const home = o.home ? `<li><a href="#" aria-label="Accueil">${ic("home", 15)}</a></li>` : `<li><a href="#">Accueil</a></li>`;
  const mid = o.ellipsis ? `<li><button class="ell" aria-label="Afficher les niveaux masqués">…</button></li>` : `<li><a href="#">Clients</a></li>`;
  return `<nav class="bc" aria-label="Fil d'Ariane"><ol>${home}${mid}<li><a href="#">Atelier Vasseur</a></li><li><a href="#">Factures</a></li><li><a href="#" aria-current="page">Facture 2026-042</a></li></ol></nav>`;
};
const demo = (o) => `<div class="bc-stack">${trail(o)}<div><p class="bc-cap">Niveau réduit</p>${trail({ ...o, ellipsis: true }).replace(/<li><a href="#">Atelier Vasseur<\/a><\/li>/, "")}</div></div>`;

export default {
  id: "breadcrumbs", label: "Fil d'Ariane", group: "Composants", icon: "f_breadcrumb", size: "sm",
  desc: "Indiquer où l'on se trouve : slash, chevrons, pilules, terminal, maison avec ellipse.",
  base,
  snippet: `<nav class="bc" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/clients">Clients</a></li>
    <li><a href="/clients/vasseur/invoices">Invoices</a></li>
    <li><a href="#" aria-current="page">Invoice 2026-042</a></li>
  </ol>
</nav>`,
  rules: [
    "Wrap in a nav with an aria-label and an ordered list; the last item carries aria-current=page and is not a link target.",
    "Separators are drawn with CSS pseudo-elements so they stay out of the accessibility tree.",
    "Collapse the middle levels into an ellipsis button beyond four levels; never truncate the current page.",
    "Show breadcrumbs only for hierarchies of three levels or more, above the page title.",
  ],
  demo: () => demo({}),
  variants: [
    {
      id: "slash", name: "Slash", desc: "Liens discrets séparés par des barres obliques.", tags: ["Discret", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Text-muted links separated by a strong-border slash with 8px margins; the current page is 600 weight in the text color.", "Links underline on hover with a 3px offset."],
      demo: () => demo({}),
      css: ``,
    },
    {
      id: "chevron", name: "Chevrons", desc: "Séparateur en chevron et lien actif teinté.", tags: ["Standard", "Lisible"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Separators are 6px CSS chevrons (rotated 1.5px borders) in text-muted with 10px margins.", "Links get a padded bg-subtle hover with control radius; the current page is text color at 600 weight."],
      demo: () => demo({}),
      css: `
& .bc li + li::before{content:'';width:6px;height:6px;margin:0 8px 0 6px;border:solid var(--text-muted);border-width:1.5px 1.5px 0 0;transform:rotate(45deg);opacity:.7}
& .bc a{padding:5px 6px;border-radius:var(--r-control)}
& .bc a:hover{background:var(--bg-subtle);text-decoration:none}
& .bc [aria-current=page]{padding:5px 6px}`,
    },
    {
      id: "pills", name: "Pilules", desc: "Chaque niveau est une pastille, le dernier en accent.", tags: ["Ludique", "Visible"],
      attrs: { shape: "pill", depth: "flat", energy: "friendly" },
      spec: ["Each level is a fully rounded chip on bg-subtle with a hairline border, 28px tall, gaps of 6px and no separator glyph.", "The current page uses the accent-soft fill and accent-text label."],
      demo: () => demo({}),
      css: `
& .bc ol{gap:6px}
& .bc li + li::before{display:none}
& .bc a,& .bc [aria-current=page]{height:28px;padding:0 12px;border-radius:var(--r-full);background:var(--bg-subtle);border:var(--border-w) solid var(--border)}
& .bc a:hover{background:var(--surface-raised);border-color:var(--border-strong);text-decoration:none}
& .bc a[aria-current=page]{background:var(--accent-soft);border-color:transparent;color:var(--accent-text)}
& .bc .ell{height:28px;border-radius:var(--r-full);background:var(--bg-subtle);border:var(--border-w) solid var(--border)}`,
    },
    {
      id: "terminal", name: "Terminal", desc: "Chemin de fichier en police mono avec invite.", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Monospace 13px path on a bg-subtle strip with a hairline border and square corners, prefixed by an accent-text '~/' prompt.", "Levels are lowercase by convention and joined by '/'; the current page ends with a static accent block cursor."],
      demo: () => demo({}),
      css: `
& .bc{font-family:var(--font-mono);font-size:var(--fs-xs);padding:9px 12px;background:var(--bg-subtle);border:var(--border-w) solid var(--border);border-radius:var(--r-sm);text-transform:lowercase}
& .bc ol::before{content:'~/';margin-right:2px;color:var(--accent-text);font-weight:700}
& .bc li + li::before{content:'/';margin:0 2px;color:var(--text-muted)}
& .bc a{color:var(--text-muted)}
& .bc [aria-current=page]{color:var(--accent-text)}
& .bc [aria-current=page]::after{content:'';width:.6em;height:1.1em;margin-left:5px;background:var(--accent);opacity:.8}`,
    },
    {
      id: "home", name: "Maison", desc: "Icône d'accueil, ellipse et dernier niveau en relief.", tags: ["Compact", "Mobile"],
      attrs: { shape: "inherit", depth: "outline", energy: "calm" },
      spec: ["Starts with a 15px home icon button; middle levels collapse into an ellipsis control, arrows are thin chevrons.", "The trail sits in a bordered surface capsule with control radius; the current page is text color at 600 weight."],
      demo: () => demo({ home: true }),
      css: `
& .bc ol{display:inline-flex;padding:4px 8px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-control);box-shadow:var(--shadow-sm)}
& .bc li + li::before{content:'›';margin:0 6px;font-size:1.2em;line-height:1;color:var(--text-muted)}
& .bc li:first-child a{padding:4px;color:var(--text)}
& .bc a:hover{text-decoration:none;color:var(--accent-text)}
& .bc .ell{border-radius:var(--r-sm);background:var(--bg-subtle)}`,
    },
  ],
};
