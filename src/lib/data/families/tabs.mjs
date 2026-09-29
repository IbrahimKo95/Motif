import { ic } from "../icons.mjs";

const base = `
& .tabs{display:flex;gap:4px}
& .tab{display:inline-flex;align-items:center;gap:8px;height:var(--control-h);padding:0 var(--pad-x);font:600 var(--fs-ctl)/1 var(--font-body);color:var(--text-muted);background:none;border:0;cursor:pointer;white-space:nowrap;transition:color var(--dur) var(--ease),background var(--dur) var(--ease),border-color var(--dur) var(--ease)}
& .tab:hover:not(:disabled){color:var(--text)}
& .tab:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
& .tab:disabled{opacity:.45;cursor:not-allowed}
& .tab[aria-selected=true]{color:var(--text)}
& .tab .count{font:600 11px/1 var(--font-body);padding:3px 6px;border-radius:99px;background:var(--bg-subtle);color:var(--text-muted)}
& .tab-panel{margin:14px 0 0;font:400 var(--fs-sm)/1.5 var(--font-body);color:var(--text-muted);max-width:34ch}
`;

const demo = () => `<div class="tabs-demo"><div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">Aperçu</button><button class="tab" role="tab" aria-selected="false">Activité<span class="count">4</span></button><button class="tab" role="tab" aria-selected="false">Réglages</button><button class="tab" role="tab" aria-selected="false" disabled>Archives</button></div><p class="tab-panel">Résumé du projet, membres actifs et prochaines échéances.</p></div>`;

export default {
  id: "tabs", label: "Onglets", group: "Composants", icon: "f_tabs", size: "sm",
  desc: "Naviguer entre des vues sœurs : soulignés, pilules, segmentés, dossier, verticaux.",
  base,
  snippet: `<div class="tabs-demo">
  <div class="tabs" role="tablist" aria-label="Project sections">
    <button class="tab" role="tab" id="t1" aria-selected="true" aria-controls="p1">Overview</button>
    <button class="tab" role="tab" id="t2" aria-selected="false" aria-controls="p2" tabindex="-1">Activity <span class="count">4</span></button>
  </div>
  <div class="tab-panel" role="tabpanel" id="p1" aria-labelledby="t1">…</div>
</div>`,
  rules: [
    "Use tabs only for sibling views of the same object, never for steps of a process.",
    "Follow the WAI-ARIA tabs pattern: role=tablist/tab/tabpanel, arrow keys move between tabs, only the selected tab is in the tab order.",
    "Labels are one or two words. Counts are secondary information in text-muted.",
    "If tabs overflow, scroll horizontally with an edge fade; never wrap to two rows.",
  ],
  demo,
  variants: [
    {
      id: "underline", name: "Soulignés", desc: "Un trait d'accent glisse sous l'onglet actif.", tags: ["Classique", "Net"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["A hairline bottom border spans the row; the selected tab shows a 2px accent bar that scales in from the center.", "Selected label is text color, inactive labels are text-muted.", "No fill or radius."],
      css: `
& .tabs{border-bottom:1px solid var(--border);gap:8px}
& .tab{position:relative;border-radius:0}
& .tab::after{content:'';position:absolute;left:var(--pad-x);right:var(--pad-x);bottom:-1px;height:2px;background:var(--accent);transform:scaleX(0);transition:transform var(--dur) var(--ease)}
& .tab[aria-selected=true]::after{transform:scaleX(1)}`,
    },
    {
      id: "pills", name: "Pilules", desc: "L'onglet actif est un bouton teinté.", tags: ["Doux", "Moderne"],
      attrs: { shape: "inherit", depth: "flat", energy: "friendly" },
      spec: ["Selected tab has an accent-soft fill and accent-text label, with the count turning into a solid accent chip.", "Hover shows a bg-subtle fill.", "Radius follows the control radius."],
      css: `
& .tab{border-radius:var(--r-control)}
& .tab:hover:not(:disabled){background:var(--bg-subtle)}
& .tab[aria-selected=true]{background:var(--accent-soft);color:var(--accent-text)}
& .tab[aria-selected=true] .count{background:var(--accent);color:var(--accent-contrast)}`,
    },
    {
      id: "segmented", name: "Segmenté", desc: "Rail gris avec un curseur surélevé sous l'onglet actif.", tags: ["Compact", "Précis"],
      attrs: { shape: "inherit", depth: "soft", energy: "crisp" },
      spec: ["Tabs live inside a bg-subtle track with a hairline border and 3px padding.", "Selected tab is a raised surface with a small shadow.", "Best for 2 to 4 short options."],
      css: `
& .tabs{display:inline-flex;padding:3px;gap:2px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:calc(var(--r-control) + 3px)}
& .tab{height:calc(var(--control-h) - 8px);border-radius:var(--r-control)}
& .tab[aria-selected=true]{background:var(--surface-raised);color:var(--text);box-shadow:var(--shadow-sm),0 0 0 1px var(--border)}`,
    },
    {
      id: "folder", name: "Dossier", desc: "Onglets à oreilles qui se fondent avec le contenu.", tags: ["Classique", "Structuré"],
      attrs: { shape: "inherit", depth: "outline", energy: "calm" },
      spec: ["Tabs sit on a strong bottom border; the selected tab has side and top borders and the page background so it merges with the panel below.", "Top corners follow the control radius, bottom corners are square.", "Inactive tabs show a subtle fill on hover."],
      css: `
& .tabs{gap:2px;border-bottom:1px solid var(--border-strong);align-items:flex-end}
& .tab{height:calc(var(--control-h) - 4px);border:1px solid transparent;border-bottom:0;border-radius:var(--r-control) var(--r-control) 0 0;margin-bottom:-1px}
& .tab:hover:not(:disabled){background:var(--bg-subtle)}
& .tab[aria-selected=true]{background:var(--bg);border-color:var(--border-strong)}`,
    },
    {
      id: "rail", name: "Vertical", desc: "Liste latérale avec barre d'accent, pour les réglages.", tags: ["Réglages", "Dense"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["Tabs stack vertically along a hairline rail; the selected tab shows a 2px accent bar on the rail and a soft accent fade.", "Labels are left aligned. Use for settings pages with 4 to 8 sections.", "Panel sits to the right with a 20px gap."],
      css: `
& .tabs-demo{display:flex;gap:20px;align-items:flex-start}
& .tabs{flex-direction:column;gap:0;border-left:1px solid var(--border);min-width:150px}
& .tab{justify-content:flex-start;border-left:2px solid transparent;margin-left:-1px;border-radius:0}
& .tab[aria-selected=true]{border-left-color:var(--accent);background:linear-gradient(90deg,var(--accent-soft),transparent)}
& .tab-panel{margin:8px 0 0;max-width:22ch}`,
    },
    {
      id: "brackets", name: "Crochets", desc: "Police mono, l'onglet actif est entre [ ].", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Monospace labels; the selected tab is wrapped in accent-text square brackets.", "No borders, fills or radius.", "Counts render as plain text in parentheses-like chips without fill."],
      css: `
& .tab{font-family:var(--font-mono);font-weight:500;padding:0 calc(var(--pad-x) * .6)}
& .tab::before{content:'[';opacity:0;margin-right:.5ch}
& .tab::after{content:']';opacity:0;margin-left:.5ch}
& .tab[aria-selected=true]{color:var(--accent-text)}
& .tab[aria-selected=true]::before,& .tab[aria-selected=true]::after{opacity:1}
& .tab .count{background:none;padding:0}`,
    },
    {
      id: "capsule", name: "Capsule", desc: "Pilule pleine qui glisse d'un onglet à l'autre.", tags: ["Fluide", "Moderne"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["Tabs share equal-width columns inside a full-radius bg-subtle capsule; one text-colored pill slides beneath the selected tab (transform transition, 1.5x base duration) and the selected label switches to the page background color.", "The pill is driven by :has() on the selected index and supports up to 5 tabs; set --n on .tabs to the tab count (default 4).", "Disabled tabs keep their column."],
      css: `
& .tabs{--n:4;--p:4px;position:relative;display:inline-grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:0;padding:var(--p);background:var(--bg-subtle);border:1px solid var(--border);border-radius:var(--r-full)}
& .tabs::before{content:'';position:absolute;z-index:0;top:var(--p);bottom:var(--p);left:var(--p);width:calc((100% - var(--p) * 2) / var(--n));border-radius:var(--r-full);background:var(--text);box-shadow:var(--shadow-sm);transition:transform calc(var(--dur) * 1.5) var(--ease)}
& .tabs:has(.tab:nth-child(2)[aria-selected=true])::before{transform:translateX(100%)}
& .tabs:has(.tab:nth-child(3)[aria-selected=true])::before{transform:translateX(200%)}
& .tabs:has(.tab:nth-child(4)[aria-selected=true])::before{transform:translateX(300%)}
& .tabs:has(.tab:nth-child(5)[aria-selected=true])::before{transform:translateX(400%)}
& .tabs{max-width:100%}
& .tab{position:relative;z-index:1;justify-content:center;height:calc(var(--control-h) - 8px);padding:0 8px;gap:4px;font-size:calc(var(--fs-ctl) - 1px);border-radius:var(--r-full)}
& .tab[aria-selected=true]{color:var(--bg)}
& .tab .count{padding:2px 5px;font-size:10px}
& .tab[aria-selected=true] .count{background:color-mix(in srgb,var(--bg) 22%,transparent);color:var(--bg)}`,
    },
    {
      id: "stack", name: "Cartes", desc: "Onglets-cartes qui se chevauchent, l'actif passe devant.", tags: ["Tactile", "Structuré"],
      attrs: { shape: "inherit", depth: "lift", energy: "friendly" },
      spec: ["Each tab is a fully rounded-top card overlapping its neighbor by 10px; inactive cards use bg-subtle with a hairline border and sit lower.", "The selected card is surface-raised with a medium shadow, lifted 3px and drawn above the others (z-index), with an accent top edge.", "Hover raises inactive cards by 2px."],
      css: `
& .tabs{gap:0;padding:6px 0 0;align-items:flex-end}
& .tab{position:relative;height:calc(var(--control-h) - 4px);margin-left:-8px;padding:0 calc(var(--pad-x) * .6);font-size:calc(var(--fs-ctl) - 1px);background:var(--bg-subtle);border:1px solid var(--border);border-bottom:0;border-radius:var(--r-surface) var(--r-surface) 0 0;transition:transform var(--dur) var(--ease),background var(--dur) var(--ease),box-shadow var(--dur) var(--ease),color var(--dur) var(--ease)}
& .tab:first-child{margin-left:0}
& .tab:hover:not(:disabled):not([aria-selected=true]){transform:translateY(-2px)}
& .tab[aria-selected=true]{z-index:2;transform:translateY(-3px);height:calc(var(--control-h) - 1px);background:var(--surface-raised);border-color:var(--border-strong);border-top:2px solid var(--accent);box-shadow:var(--shadow-md)}
& .tab:nth-child(2){z-index:1}`,
    },
    {
      id: "icon-top", name: "Icône dessus", desc: "Pictogramme au-dessus du libellé, façon barre d'application.", tags: ["Mobile", "Visuel"],
      attrs: { shape: "inherit", depth: "flat", energy: "friendly" },
      spec: ["Each tab stacks a 20px icon above a 12px label in a 72px-min column; the selected tab colors both accent-text and shows a 3px accent bar with rounded ends above it.", "Counts become a small absolute badge at the icon's top right.", "The row has a hairline bottom border; hover fills the column with bg-subtle."],
      snippet: `<div class="tabs" role="tablist" aria-label="Sections">
  <button class="tab" role="tab" aria-selected="true"><svg class="ic">…</svg>Overview</button>
  <button class="tab" role="tab" aria-selected="false"><svg class="ic">…</svg>Activity <span class="count">4</span></button>
</div>`,
      demo: () => `<div class="tabs-demo"><div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">${ic("home", 20)}Aperçu</button><button class="tab" role="tab" aria-selected="false">${ic("chart", 20)}Activité<span class="count">4</span></button><button class="tab" role="tab" aria-selected="false">${ic("settings", 20)}Réglages</button><button class="tab" role="tab" aria-selected="false" disabled>${ic("folder", 20)}Archives</button></div><p class="tab-panel">Résumé du projet, membres actifs et prochaines échéances.</p></div>`,
      css: `
& .tabs{gap:2px;border-bottom:1px solid var(--border)}
& .tab{position:relative;flex-direction:column;justify-content:center;gap:6px;min-width:72px;height:auto;padding:14px 10px 10px;font-size:12px;border-radius:var(--r-control) var(--r-control) 0 0}
& .tab .ic{width:20px;height:20px}
& .tab:hover:not(:disabled){background:var(--bg-subtle)}
& .tab::before{content:'';position:absolute;top:0;left:22%;right:22%;height:3px;border-radius:0 0 3px 3px;background:var(--accent);transform:scaleX(0);transition:transform var(--dur) var(--ease)}
& .tab[aria-selected=true]{color:var(--accent-text)}
& .tab[aria-selected=true]::before{transform:scaleX(1)}
& .tab .count{position:absolute;top:8px;left:calc(50% + 6px);padding:2px 5px;font-size:10px;background:var(--accent);color:var(--accent-contrast)}`,
    },
    {
      id: "thick", name: "Barre épaisse", desc: "Rail épais teinté, l'actif s'allume en accent plein.", tags: ["Audacieux", "Lisible"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["A 4px accent-soft rail runs under the whole row; each tab overlays its own 4px segment on it: transparent at rest, 40% text-muted on hover, solid accent when selected.", "Labels are 700 weight in text-muted, text color when selected; no fills, no radius.", "The selected bar extends the full tab width edge to edge, unlike the centered thin underline style."],
      css: `
& .tabs{gap:0;box-shadow:inset 0 -4px 0 var(--accent-soft)}
& .tab{position:relative;height:calc(var(--control-h) + 4px);padding:0 calc(var(--pad-x) + 2px);font-weight:700;border-radius:0}
& .tab::after{content:'';position:absolute;left:0;right:0;bottom:0;height:4px;background:transparent;transition:background var(--dur) var(--ease)}
& .tab:hover:not(:disabled)::after{background:color-mix(in srgb,var(--text-muted) 40%,transparent)}
& .tab[aria-selected=true]::after{background:var(--accent)}
& .tab[aria-selected=true]{color:var(--text)}`,
    },
    {
      id: "marker", name: "Surligneur", desc: "Titres en police d'affichage, l'actif est surligné au marqueur.", tags: ["Éditorial", "Expressif"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Labels use the display font at a slightly larger size with no track or border; inactive tabs are text-muted.", "The selected tab gets a highlighter swipe: an accent-soft band covering the lower 45% of the label, skewed -4deg, which grows from left to right on selection.", "Hover underlines the label with a 1px currentColor line offset 4px."],
      css: `
& .tabs{gap:2px}
& .tab{position:relative;isolation:isolate;font-family:var(--font-display);font-weight:var(--heading-weight);font-size:var(--fs-ctl);letter-spacing:var(--heading-tracking);padding:0 calc(var(--pad-x) * .5);border-radius:0}
& .tab::before{content:'';position:absolute;z-index:-1;left:2px;right:2px;bottom:32%;height:45%;background:var(--accent-soft);transform:skewX(-4deg) scaleX(0);transform-origin:left center;transition:transform calc(var(--dur) * 1.5) var(--ease)}
& .tab[aria-selected=true]::before{transform:skewX(-4deg) scaleX(1)}
& .tab[aria-selected=true]{color:var(--text)}
& .tab:hover:not(:disabled):not([aria-selected=true]){text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}`,
    },
  ],
};
