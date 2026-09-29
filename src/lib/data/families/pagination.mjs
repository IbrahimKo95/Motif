const base = `
& .pg-demo{display:grid;gap:22px;font-family:var(--font-body);color:var(--text)}
& .pg-cap{margin:0 0 8px;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
& .pg{display:grid;gap:10px;justify-items:start;font:400 var(--fs-sm)/1.3 var(--font-body);color:var(--text)}
& .pg-info{margin:0;color:var(--text-muted)}
& .pg-info b{color:var(--text);font-weight:600}
& .pg ul{display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin:0;padding:0;list-style:none}
& .pg li{display:inline-flex}
& .pg-i{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:34px;height:34px;padding:0 10px;border:var(--border-w) solid transparent;border-radius:var(--r-control);background:none;color:var(--text);font:500 var(--fs-sm)/1 var(--font-body);font-variant-numeric:tabular-nums;text-decoration:none;cursor:pointer;transition:background var(--dur) var(--ease),color var(--dur) var(--ease),border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .pg-i:hover{background:var(--bg-subtle)}
& .pg-i:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .pg-i[aria-current=page]{background:var(--accent);color:var(--accent-contrast);font-weight:600}
& .pg-i:disabled,& .pg-i[aria-disabled=true]{opacity:.4;cursor:not-allowed;pointer-events:none}
& .pg-gap{display:inline-grid;place-items:center;min-width:24px;height:34px;color:var(--text-muted);letter-spacing:.1em}
& .pg-ch{width:14px;height:14px;flex:none;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
& .pg-prev .pg-ch{transform:scaleX(-1)}
`;

const ch = `<svg class="pg-ch" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>`;
const page = (n, cur) => `<li><a class="pg-i" href="#" ${cur ? 'aria-current="page" aria-label="Page ' + n + ', page courante"' : `aria-label="Page ${n}"`}>${n}</a></li>`;
const gap = `<li><span class="pg-gap" aria-hidden="true">…</span></li>`;
const prev = (dis) => `<li><button class="pg-i pg-prev" type="button" aria-label="Page précédente"${dis ? " disabled" : ""}>${ch}</button></li>`;
const next = `<li><button class="pg-i pg-next" type="button" aria-label="Page suivante">${ch}</button></li>`;
const nav = (inner, label) => `<nav class="pg" aria-label="${label}"><ul>${inner}</ul></nav>`;

const mid = () => `<div class="pg-demo"><div><p class="pg-cap">Page 3 sur 12</p><div class="pg"><p class="pg-info">Factures <b>41 à 60</b> sur 236</p>${nav(prev() + page(1) + page(2) + page(3, true) + page(4) + gap + page(12) + next, "Pagination des factures")}</div></div><div><p class="pg-cap">Première page</p>${nav(prev(true) + page(1, true) + page(2) + page(3) + page(4) + page(5) + next, "Pagination des résultats de recherche")}</div></div>`;

const minRow = (n, first) => `<nav class="pg pg-min" aria-label="Pagination des factures"><${first ? 'span class="pg-i" aria-disabled="true"' : 'a class="pg-i" href="#"'}>${`<svg class="pg-ch pg-back" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`}Précédent</${first ? "span" : "a"}><p class="pg-pos" aria-current="page">Page <b>${n}</b> sur 12</p><a class="pg-i" href="#">Suivant${ch}</a></nav>`;

const bar = (n, total, label) => `<div class="pg-bar" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${n}"><i style="width:${((n / total) * 100).toFixed(1)}%"></i></div>`;

export default {
  id: "pagination", label: "Pagination", group: "Composants", icon: "f_pagination", size: "md",
  desc: "Naviguer dans une longue liste : pages numérotées, précédent/suivant, segments, pilules, « Charger plus ».",
  base,
  snippet: `<nav class="pg" aria-label="Invoices pagination">
  <ul>
    <li><button class="pg-i pg-prev" type="button" aria-label="Previous page">…chevron svg…</button></li>
    <li><a class="pg-i" href="?page=2" aria-label="Page 2">2</a></li>
    <li><a class="pg-i" href="?page=3" aria-current="page" aria-label="Page 3, current page">3</a></li>
    <li><span class="pg-gap" aria-hidden="true">…</span></li>
    <li><a class="pg-i" href="?page=12" aria-label="Page 12">12</a></li>
    <li><button class="pg-i pg-next" type="button" aria-label="Next page">…chevron svg…</button></li>
  </ul>
</nav>`,
  rules: [
    "Wrap in a nav with an aria-label and a list; the current page carries aria-current=page and every link has a full aria-label ('Page 4').",
    "Always show first, last, current and its immediate neighbors; collapse the rest into a non-interactive ellipsis.",
    "Disable previous on the first page and next on the last rather than hiding them, so the layout never shifts.",
    "Tell the user where they are in plain words ('Factures 41 à 60 sur 236') and prefer real links with ?page= URLs over script-only buttons.",
  ],
  demo: mid,
  variants: [
    {
      id: "pages", name: "Pages numérotées", desc: "Boutons contourés, page active pleine d'accent.", tags: ["Standard", "Lisible"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Each page is a 34px square-ish button with a hairline border and control radius, spaced by 6px; the current page is filled with the solid accent and contrast text.", "Previous and next are icon-only buttons of the same size; the disabled one drops to 40% opacity."],
      css: `
& .pg ul{gap:6px}
& .pg-i{border-color:var(--border);background:var(--surface)}
& .pg-i:hover{border-color:var(--border-strong);background:var(--bg-subtle)}
& .pg-i[aria-current=page]{border-color:var(--accent)}`,
    },
    {
      id: "minimal", name: "Précédent / Suivant", desc: "Deux liens et « Page 3 sur 12 » au centre, sans numéros.", tags: ["Minimal", "Mobile"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["A single row separated from the content by a hairline top rule: text links 'Précédent' and 'Suivant' with 14px chevrons at each end and 'Page 3 sur 12' centered, current number in 600 weight.", "Links have no fill; they darken and underline on hover, and the disabled end stays visible at 40% opacity."],
      demo: () => `<div class="pg-demo"><div><p class="pg-cap">Milieu de liste</p>${minRow(3)}</div><div><p class="pg-cap">Première page</p>${minRow(1, true)}</div></div>`,
      css: `
& .pg-min{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding-top:12px;border-top:var(--border-w) solid var(--border)}
& .pg-min .pg-i{padding:0 4px;min-width:0;border-radius:var(--r-sm);color:var(--text-muted);font-weight:500}
& .pg-min .pg-i:hover{background:none;color:var(--text);text-decoration:underline;text-underline-offset:3px}
& .pg-min .pg-back{transform:none}
& .pg-pos{margin:0;color:var(--text-muted);font-variant-numeric:tabular-nums}
& .pg-pos b{color:var(--text);font-weight:600}`,
    },
    {
      id: "joined", name: "Segments collés", desc: "Un seul bloc bordé, cases séparées par des filets.", tags: ["Compact", "Technique"],
      attrs: { shape: "inherit", depth: "outline", energy: "technical" },
      spec: ["One bordered strip with the control radius and no gaps: cells are separated by 1px vertical rules and only the outer corners are rounded.", "The current cell is a solid accent fill; hover uses bg-subtle and the focus ring is drawn inset so the strip clip never hides it."],
      css: `
& .pg ul{gap:0;background:var(--surface);border:var(--border-w) solid var(--border-strong);border-radius:var(--r-control);overflow:hidden}
& .pg li + li{border-left:var(--border-w) solid var(--border)}
& .pg-i{border:0;border-radius:0;height:32px;min-width:36px;background:none}
& .pg-i:focus-visible{outline-offset:-3px}
& .pg-gap{min-width:30px;height:32px}`,
    },
    {
      id: "pills", name: "Pilules", desc: "Piste arrondie, la page active flotte en pastille.", tags: ["Ludique", "Doux"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["Fully rounded bg-subtle track with 4px padding; pages are round pills, and the current one is a raised surface chip with shadow-sm and accent-text label at 700 weight.", "Previous and next are round icon pills; hover on a page fills it with the raised surface at 60% strength."],
      css: `
& .pg ul{gap:2px;padding:4px;background:var(--bg-subtle);border-radius:var(--r-full)}
& .pg-i{border-radius:var(--r-full);height:32px;min-width:32px}
& .pg-i:hover{background:color-mix(in srgb,var(--surface-raised) 60%,transparent)}
& .pg-i[aria-current=page]{background:var(--surface-raised);color:var(--accent-text);font-weight:700;box-shadow:var(--shadow-sm)}
& .pg-gap{min-width:20px}`,
    },
    {
      id: "more", name: "Charger plus", desc: "Barre de progression, compteur et bouton pour 20 de plus.", tags: ["Infini", "Mobile"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["A 4px progress track (accent fill on bg-subtle) sits above a full-width 44px button labeled with the batch size and a pill counter '+20'; the line above states 'x affichées sur y'.", "When everything is loaded the bar turns success and the button becomes a disabled, quiet 'Tout est affiché' state."],
      demo: () => `<div class="pg-demo"><div class="pg pg-more"><p class="pg-info"><b>20</b> factures affichées sur 236</p>${bar(20, 236, "Factures affichées")}<button class="pg-load" type="button">Charger les suivantes<span class="pg-count">+20</span></button></div><div class="pg pg-more pg-done"><p class="pg-info"><b>236</b> factures affichées sur 236</p>${bar(236, 236, "Factures affichées")}<button class="pg-load" type="button" disabled>Tout est affiché</button></div></div>`,
      css: `
& .pg-more{justify-items:stretch;gap:10px}
& .pg-bar{height:4px;border-radius:var(--r-full);background:var(--bg-subtle);overflow:hidden}
& .pg-bar i{display:block;height:100%;border-radius:inherit;background:var(--accent);transition:width var(--dur) var(--ease)}
& .pg-done .pg-bar i{background:var(--success)}
& .pg-load{box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;height:44px;padding:0 var(--pad-x);border:var(--border-w) solid var(--border-strong);border-radius:var(--r-control);background:var(--surface);color:var(--text);font:600 var(--fs-sm)/1 var(--font-body);cursor:pointer;transition:background var(--dur) var(--ease),border-color var(--dur) var(--ease)}
& .pg-load:hover{background:var(--bg-subtle);border-color:var(--text-muted)}
& .pg-load:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .pg-load:disabled{opacity:.5;cursor:not-allowed;border-style:dashed;background:none}
& .pg-count{padding:3px 8px;border-radius:var(--r-full);background:var(--accent-soft);color:var(--accent-text);font-size:var(--fs-xs);font-variant-numeric:tabular-nums}`,
    },
    {
      id: "brut", name: "Brut", desc: "Cases carrées à contour épais, page active en bloc décalé.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "sharp", depth: "hard", energy: "playful" },
      spec: ["Square cells with 2px text-colored borders, no radius and monospace uppercase numerals; the current page is a solid accent block with contrast text and a 3px 3px hard shadow.", "Hover shifts a cell 2px up-left with a 2px hard shadow, while pressed cells settle back to zero offset."],
      css: `
& .pg ul{gap:8px;padding-right:3px;padding-bottom:3px}
& .pg-i{border:2px solid var(--text);border-radius:0;background:var(--surface);font-family:var(--font-mono);font-weight:700;text-transform:uppercase}
& .pg-i:hover{background:var(--surface);transform:translate(-2px,-2px);box-shadow:2px 2px 0 var(--text)}
& .pg-i:active{transform:none;box-shadow:none}
& .pg-i[aria-current=page]{background:var(--accent);color:var(--accent-contrast);box-shadow:3px 3px 0 var(--text)}
& .pg-gap{font-family:var(--font-mono);font-weight:700;color:var(--text)}`,
    },
  ],
};
