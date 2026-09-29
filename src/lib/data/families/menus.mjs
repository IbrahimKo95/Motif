import { ic } from "../icons.mjs";

const base = `
& .menu{display:flex;flex-direction:column;width:min(100%,262px);padding:4px;margin:0;background:var(--surface);color:var(--text);font:400 var(--fs-sm)/1.3 var(--font-body);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-md)}
& .mi{display:flex;align-items:center;gap:10px;width:100%;min-height:34px;padding:0 10px;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;border-radius:var(--r-sm);transition:background var(--dur) var(--ease),color var(--dur) var(--ease)}
& .mi .ic{flex:none;color:var(--text-muted)}
& .mi .lbl{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
& .mi kbd{flex:none;font:500 11px/1 var(--font-mono);color:var(--text-muted)}
& .mi:hover:not(:disabled),& .mi.is-active{background:var(--bg-subtle)}
& .mi:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
& .mi:disabled{opacity:.45;cursor:not-allowed}
& .mi-danger,& .mi-danger .ic{color:var(--danger)}
& .msep{height:1px;margin:4px 6px;border:0;background:var(--border)}
& .mlabel{padding:8px 10px 4px;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
`;

// o.icons / o.kbd / o.groups pilotent le balisage de démo de chaque variante.
const menu = (o = {}) => {
  const it = (cls, icon, label, key, dis) =>
    `<button class="mi${cls ? " " + cls : ""}" role="menuitem"${dis ? " disabled" : ""}>${o.icons ? ic(icon, 16) : ""}<span class="lbl">${label}</span>${o.kbd && key ? `<kbd>${key}</kbd>` : ""}</button>`;
  const sep = `<hr class="msep" role="separator">`;
  const lab = (t) => (o.groups ? `<div class="mlabel" role="presentation">${t}</div>` : "");
  return `<div class="menu" role="menu" aria-label="Actions de la facture">${lab("Facture")}${it("", "copy", "Dupliquer", "⌘D")}${it("is-active", "mail", "Envoyer par e-mail", "⌘⏎")}${o.groups ? sep + lab("Export") : ""}${it("", "download", "Télécharger le PDF", "⌘P")}${it("", "folder", "Archiver", "", true)}${sep}${it("mi-danger", "x", "Supprimer", "⌫")}</div>`;
};

export default {
  id: "menus", label: "Menus", group: "Composants", icon: "f_menu", size: "md",
  desc: "Menus déroulants et contextuels : liste simple, icônes et raccourcis, groupes, verre, commandes, brut.",
  base,
  snippet: `<div class="menu" role="menu" aria-label="Invoice actions">
  <div class="mlabel" role="presentation">Invoice</div>
  <button class="mi" role="menuitem"><svg class="ic" aria-hidden="true">…</svg><span class="lbl">Duplicate</span><kbd>⌘D</kbd></button>
  <button class="mi is-active" role="menuitem"><span class="lbl">Send by email</span><kbd>⌘⏎</kbd></button>
  <button class="mi" role="menuitem" disabled><span class="lbl">Archive</span></button>
  <hr class="msep" role="separator">
  <button class="mi mi-danger" role="menuitem"><span class="lbl">Delete</span></button>
</div>`,
  rules: [
    "Use role=menu with role=menuitem children (menuitemcheckbox/radio for toggles). Arrow keys move the highlight, Enter activates, Escape closes and returns focus to the trigger.",
    "Destructive items go last, after a separator, in the danger color. Disabled items stay visible so the menu keeps a stable shape.",
    "Keep menus to about 8 items; group with labels or separators beyond that. Labels are verbs in sentence case.",
    "Keyboard shortcuts are right-aligned in a monospace face and never carry meaning on their own.",
  ],
  demo: () => menu({}),
  variants: [
    {
      id: "list", name: "Liste", desc: "Panneau bordé, lignes sobres et surbrillance grise.", tags: ["Sobre", "Standard"],
      attrs: { shape: "inherit", depth: "soft", energy: "calm" },
      spec: ["Surface panel with a hairline border, radius-surface and shadow-md; 4px inner padding.", "34px rows with small radius; hover and highlighted rows use a bg-subtle fill. Labels only, no icons."],
      demo: () => menu({}),
      css: ``,
    },
    {
      id: "icons", name: "Icônes & raccourcis", desc: "Pastille d'icône, raccourcis en touches, ligne active pleine.", tags: ["Riche", "Productif"],
      attrs: { shape: "inherit", depth: "lift", energy: "friendly" },
      spec: ["Each row starts with a 26px bg-subtle tile holding a 16px icon; shortcuts render as bordered mono keycaps at the row end.", "The highlighted row is filled with the solid accent and contrast text; the tile turns translucent.", "Rows are 40px tall with control radius."],
      demo: () => menu({ icons: true, kbd: true }),
      css: `
& .menu{width:min(100%,290px);padding:6px;box-shadow:var(--shadow-lg)}
& .mi{min-height:40px;padding:0 8px;gap:12px;border-radius:var(--r-control)}
& .mi .ic{box-sizing:content-box;padding:5px;border-radius:var(--r-sm);background:var(--bg-subtle)}
& .mi kbd{padding:3px 5px;border:1px solid var(--border);border-bottom-width:2px;border-radius:var(--r-sm);background:var(--surface-raised)}
& .mi:hover:not(:disabled){background:var(--bg-subtle)}
& .mi.is-active{background:var(--accent);color:var(--accent-contrast)}
& .mi.is-active .ic{background:color-mix(in srgb,var(--accent-contrast) 18%,transparent);color:inherit}
& .mi.is-active kbd{color:var(--accent-contrast);background:transparent;border-color:color-mix(in srgb,var(--accent-contrast) 40%,transparent)}
& .mi-danger .ic{background:color-mix(in srgb,var(--danger) 12%,transparent)}`,
    },
    {
      id: "grouped", name: "Groupée", desc: "Sections titrées, filets et barre d'accent sur l'actif.", tags: ["Structuré", "Dense"],
      attrs: { shape: "sharp", depth: "outline", energy: "crisp" },
      spec: ["Flat panel with a strong 1px border and no shadow; sections have uppercase 11px labels and hairline separators that span the full width.", "Rows are square; the highlighted row shows a 3px accent bar on its left edge and an accent-soft fill.", "Use for menus with more than six items."],
      demo: () => menu({ groups: true }),
      css: `
& .menu{padding:0;border-color:var(--border-strong);border-radius:var(--r-sm);box-shadow:none;overflow:hidden}
& .mi{border-radius:0;box-shadow:inset 3px 0 0 transparent;padding:0 14px}
& .mi:hover:not(:disabled){background:var(--bg-subtle)}
& .mi.is-active{background:var(--accent-soft);color:var(--accent-text);box-shadow:inset 3px 0 0 var(--accent)}
& .mlabel{padding:10px 14px 6px;background:var(--bg-subtle)}
& .mlabel:not(:first-child){border-top:1px solid var(--border)}
& .msep{margin:0}`,
    },
    {
      id: "glass", name: "Verre", desc: "Carte flottante translucide, lignes en pilule.", tags: ["Premium", "Translucide"], stage: "mesh",
      attrs: { shape: "round", depth: "glass", energy: "premium" },
      spec: ["Panel at 55% surface opacity with backdrop blur(18px) and saturation boost, a 1px light border and an inner top highlight.", "Rows are fully rounded; the highlighted row is a 60% white-tinted pill. Separators fade at both ends.", "Only over rich backgrounds."],
      demo: () => menu({ icons: true }),
      css: `
& .menu{padding:8px;background:color-mix(in srgb,var(--surface) 55%,transparent);-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);border:1px solid color-mix(in srgb,var(--text) 14%,transparent);border-radius:calc(var(--r-surface) + 4px);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),var(--shadow-lg)}
& .mi{border-radius:var(--r-full);padding:0 14px}
& .mi:hover:not(:disabled),& .mi.is-active{background:color-mix(in srgb,var(--surface) 62%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 10%,transparent)}
& .msep{height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--text) 22%,transparent),transparent)}`,
    },
    {
      id: "command", name: "Commandes", desc: "Menu sombre à la palette de commandes, mono.", tags: ["Technique", "Nocturne"],
      attrs: { shape: "inherit", depth: "soft", energy: "technical" },
      spec: ["Always-dark panel (near-black mixed from the page background) with white text in the monospace face, whatever the theme.", "The highlighted row is filled with the accent color and shows a leading chevron; shortcuts are dimmed mono text.", "Separators are 1px lines at 12% white."],
      demo: () => menu({ kbd: true }),
      css: `
& .menu{background:color-mix(in srgb,var(--bg) 10%,black);color:rgb(255 255 255 / .92);border:1px solid rgb(255 255 255 / .12);font-family:var(--font-mono);box-shadow:var(--shadow-lg);border-radius:var(--r-control)}
& .mi{border-radius:var(--r-sm);font-size:var(--fs-xs)}
& .mi .ic,& .mi kbd{color:rgb(255 255 255 / .5)}
& .mi:hover:not(:disabled){background:rgb(255 255 255 / .09)}
& .mi.is-active{background:var(--accent);color:var(--accent-contrast)}
& .mi.is-active::before{content:'›';margin-right:-4px;font-weight:700}
& .mi.is-active kbd{color:var(--accent-contrast);opacity:.75}
& .mi-danger{color:color-mix(in srgb,var(--danger) 70%,white)}
& .msep{background:rgb(255 255 255 / .12)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Contour épais, ombre dure, lignes séparées par des traits.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "sharp", depth: "hard", energy: "playful" },
      spec: ["2px text-colored border and a 5px hard offset shadow, square corners.", "Rows are separated by 2px lines, bold 600 labels; the highlighted row is a solid accent block.", "Danger row inverts to a solid danger fill on hover."],
      demo: () => menu({}),
      css: `
& .menu{padding:0;border:2px solid var(--text);border-radius:0;box-shadow:5px 5px 0 var(--text)}
& .mi{min-height:38px;border-radius:0;font-weight:600;padding:0 14px}
& .mi + .mi{border-top:2px solid var(--text)}
& .mi:hover:not(:disabled){background:var(--text);color:var(--bg)}
& .mi.is-active{background:var(--accent);color:var(--accent-contrast)}
& .mi-danger:hover:not(:disabled){background:var(--danger);color:var(--danger-contrast)}
& .msep{display:none}`,
    },
  ],
};
