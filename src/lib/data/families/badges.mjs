import { ic } from "../icons.mjs";

const base = `
& .badge{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;font:600 11.5px/1 var(--font-body);border-radius:var(--r-full);white-space:nowrap;--c:var(--text-muted);--cc:var(--bg)}
& .badge-accent{--c:var(--accent-text);--cc:var(--accent-contrast)}
& .badge-success{--c:var(--success);--cc:var(--success-contrast)}
& .badge-warning{--c:var(--warning);--cc:var(--warning-contrast)}
& .badge-danger{--c:var(--danger);--cc:var(--danger-contrast)}
& .badge-info{--c:var(--info);--cc:var(--info-contrast)}
& .tag{display:inline-flex;align-items:center;gap:4px;height:24px;padding:0 4px 0 10px;font:500 12px/1 var(--font-body);color:var(--text);background:var(--bg-subtle);border:1px solid var(--border);border-radius:var(--r-sm)}
& .tag button{display:grid;place-items:center;width:18px;height:18px;border:0;background:none;color:var(--text-muted);cursor:pointer;border-radius:4px;font-size:14px;line-height:1}
& .tag button:hover{background:var(--border);color:var(--text)}
`;

const demo = () => `<div class="stack"><div class="row"><span class="badge badge-accent">Nouveau</span><span class="badge badge-success">Actif</span><span class="badge badge-warning">En attente</span><span class="badge badge-danger">Échec</span></div><div class="row"><span class="badge badge-info">Bêta</span><span class="badge">Brouillon</span><span class="badge badge-accent">12</span><span class="tag">design<button aria-label="Retirer">×</button></span></div></div>`;

export default {
  id: "badges", label: "Badges", group: "Composants", icon: "f_badges", size: "sm",
  desc: "Statuts, compteurs et étiquettes. Teintés, pleins, contour, point de couleur…",
  base,
  snippet: `<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Failed</span>
<span class="badge badge-accent">New</span>
<span class="badge">Draft</span>
<span class="tag">design <button aria-label="Remove tag">×</button></span>`,
  rules: [
    "A badge states a status or a count, in one or two words. Never rely on color alone: keep the text (and an icon or dot when useful).",
    "Semantic colors are reserved for meaning: success, warning, danger, info. Use accent or neutral for everything else.",
    "Badges are not buttons. Removable tags use a real button with an aria-label.",
    "Use tabular numerals for counts.",
  ],
  demo,
  variants: [
    {
      id: "soft", name: "Teinté", desc: "Fond léger de la couleur, texte de la couleur.", tags: ["Doux", "Standard"],
      attrs: { shape: "pill", depth: "flat", energy: "calm" },
      spec: ["Fully rounded, fill is the semantic color mixed 13% into the surface, label is the semantic text color.", "Neutral badges use bg-subtle with text-muted."],
      css: `
& .badge{background:color-mix(in srgb,var(--c) 13%,var(--surface));color:var(--c)}
& .badge:not([class*=badge-]){background:var(--bg-subtle)}`,
    },
    {
      id: "solid", name: "Plein", desc: "Aplat saturé avec texte contrasté.", tags: ["Visible", "Franc"],
      attrs: { shape: "pill", depth: "flat", energy: "crisp" },
      spec: ["Solid semantic fill with the matching contrast color as label.", "Neutral badge uses text color as fill and bg as label.", "Use sparingly: solid badges pull the eye."],
      css: `
& .badge{background:var(--c);color:var(--cc)}
& .badge-accent{background:var(--accent);color:var(--accent-contrast)}
& .badge:not([class*=badge-]){background:var(--text);color:var(--bg)}`,
    },
    {
      id: "outline", name: "Contour", desc: "Simple trait de la couleur, fond transparent.", tags: ["Léger", "Précis"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Transparent fill with a 1px semantic border and semantic text.", "Radius follows the small radius so badges look like small controls.", "Neutral badge uses the strong border."],
      css: `
& .badge{background:transparent;color:var(--c);border:1px solid var(--c);border-radius:var(--r-sm);height:22px}
& .badge:not([class*=badge-]){border-color:var(--border-strong)}`,
    },
    {
      id: "dot", name: "Point", desc: "Pastille neutre avec un point de statut coloré.", tags: ["Discret", "Statut"],
      attrs: { shape: "pill", depth: "outline", energy: "calm" },
      spec: ["Neutral pill (surface fill, hairline border, text color) with a 7px colored dot before the label.", "The dot carries the meaning; the text stays neutral, which reads well in dense tables."],
      css: `
& .badge{background:var(--surface);color:var(--text);border:1px solid var(--border)}
& .badge::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--c)}
& .badge:not([class*=badge-])::before{background:var(--border-strong)}`,
    },
    {
      id: "mono", name: "Étiquette", desc: "Rectangle net en police mono, angles droits.", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Rectangular label with 2px radius, monospace 11px text and a subtle semantic tint.", "Feels like a CLI status or a git label."],
      css: `
& .badge{font-family:var(--font-mono);font-weight:500;border-radius:2px;background:color-mix(in srgb,var(--c) 12%,var(--surface));color:var(--c);border:1px solid color-mix(in srgb,var(--c) 30%,transparent);padding:0 7px}
& .tag{font-family:var(--font-mono);border-radius:2px}`,
    },
    {
      id: "glow", name: "Lumineux", desc: "Teinte douce avec liseré interne et halo léger.", tags: ["Premium", "Nocturne"],
      attrs: { shape: "pill", depth: "soft", energy: "premium" },
      spec: ["Tinted fill with a 1px inner ring in the semantic color at 35% and a faint outer glow.", "Works best on dark themes; on light themes the glow stays subtle."],
      css: `
& .badge{background:color-mix(in srgb,var(--c) 14%,var(--surface));color:var(--c);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 35%,transparent),0 0 14px -2px color-mix(in srgb,var(--c) 35%,transparent)}
& .badge:not([class*=badge-]){box-shadow:inset 0 0 0 1px var(--border);background:var(--bg-subtle)}`,
    },
    {
      id: "ribbon", name: "Ruban", desc: "Étiquette pleine à queue d'aronde, découpée en pointe.", tags: ["Éditorial", "Franc"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Square-cornered solid label with a swallowtail notch cut into the right edge (clip-path), 22px tall, fill is the semantic color with its contrast color as text.", "Extra 14px right padding keeps the label clear of the notch; reads like a ribbon or price tag."],
      css: `
& .badge{border-radius:0;padding:0 15px 0 10px;background:var(--c);color:var(--cc);clip-path:polygon(0 0,100% 0,calc(100% - 7px) 50%,100% 100%,0 100%);letter-spacing:.02em}
& .badge-accent{background:var(--accent);color:var(--accent-contrast)}
& .badge:not([class*=badge-]){background:var(--text);color:var(--bg)}`,
    },
    {
      id: "sticker", name: "Sticker", desc: "Autocollant brut incliné, contour épais et ombre dure.", tags: ["Ludique", "Audacieux"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["Uppercase 10.5px extra-bold label with a 2px text-colored border, 2px hard offset shadow and a 30% semantic tint.", "Badges tilt -3deg, every second one +2.5deg, so a row looks hand-stuck; the tilt straightens on hover."],
      css: `
& .badge{height:24px;padding:0 10px;border-radius:var(--r-sm);background:color-mix(in srgb,var(--c) 30%,var(--surface));color:var(--text);border:2px solid var(--text);box-shadow:2px 2px 0 var(--text);font-weight:800;font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;transform:rotate(-3deg);transition:transform var(--dur) var(--ease)}
& .badge:nth-child(even){transform:rotate(2.5deg)}
& .badge:hover{transform:rotate(0)}
& .badge:not([class*=badge-]){background:var(--surface)}`,
    },
    {
      id: "dashed", name: "Pointillé", desc: "Bordure en tirets sur fond à peine teinté, style étiquette à découper.", tags: ["Léger", "Artisanal"],
      attrs: { shape: "sharp", depth: "outline", energy: "friendly" },
      spec: ["1.5px dashed semantic border, radius-sm, a 6% semantic wash and semantic text; neutral badges use the strong border.", "The dashed edge reads as provisional or draft, so prefer it for drafts, suggestions and empty slots."],
      css: `
& .badge{background:color-mix(in srgb,var(--c) 6%,transparent);color:var(--c);border:1.5px dashed var(--c);border-radius:var(--r-sm);height:22px;padding:0 8px}
& .badge:not([class*=badge-]){border-color:var(--border-strong)}`,
    },
    {
      id: "gradient", name: "Dégradé", desc: "Pastille glacée en dégradé, reflet fin sur le dessus.", tags: ["Premium", "Vivant"],
      attrs: { shape: "pill", depth: "lift", energy: "premium" },
      spec: ["Diagonal gradient from the semantic color to the same color mixed 32% into the text color, a 1px top highlight and a small tinted drop shadow.", "Label uses the contrast color; keep to one or two gradient badges per view."],
      css: `
& .badge{height:24px;padding:0 11px;background:linear-gradient(120deg,var(--c),color-mix(in srgb,var(--c) 68%,var(--text)));color:var(--cc);box-shadow:inset 0 1px 0 color-mix(in srgb,white 35%,transparent),0 2px 6px -1px color-mix(in srgb,var(--c) 45%,transparent)}
& .badge-accent{background:linear-gradient(120deg,var(--accent),color-mix(in srgb,var(--accent) 68%,var(--text)));color:var(--accent-contrast)}
& .badge:not([class*=badge-]){background:linear-gradient(120deg,var(--text),color-mix(in srgb,var(--text) 70%,var(--bg)));color:var(--bg);box-shadow:inset 0 1px 0 color-mix(in srgb,white 25%,transparent)}`,
    },
    {
      id: "icon", name: "Icône ronde", desc: "Pastille douce avec une icône dans un disque plein.", tags: ["Expressif", "Statut"],
      attrs: { shape: "pill", depth: "flat", energy: "friendly" },
      spec: ["Soft tinted pill with neutral text and a 16px solid disc on the left holding a 10px icon in the contrast color.", "The icon adds a shape cue to the color, so status stays readable without relying on hue."],
      demo: () => `<div class="stack"><div class="row"><span class="badge badge-accent">${ic("sparkle", 10)}Nouveau</span><span class="badge badge-success">${ic("circleCheck", 10)}Actif</span><span class="badge badge-warning">${ic("alert", 10)}En attente</span><span class="badge badge-danger">${ic("circleX", 10)}Échec</span></div><div class="row"><span class="badge badge-info">${ic("info", 10)}Bêta</span><span class="badge">${ic("folder", 10)}Brouillon</span><span class="badge badge-accent">${ic("bell", 10)}12</span><span class="tag">design<button aria-label="Retirer">×</button></span></div></div>`,
      snippet: `<span class="badge badge-success"><svg class="ic">…</svg>Active</span>
<span class="badge badge-warning"><svg class="ic">…</svg>Pending</span>
<span class="badge badge-danger"><svg class="ic">…</svg>Failed</span>
<span class="badge"><svg class="ic">…</svg>Draft</span>
<span class="tag">design <button aria-label="Remove tag">×</button></span>`,
      css: `
& .badge{height:24px;padding:0 10px 0 4px;background:color-mix(in srgb,var(--c) 13%,var(--surface));color:var(--text)}
& .badge:not([class*=badge-]){background:var(--bg-subtle)}
& .badge .ic{box-sizing:content-box;width:10px;height:10px;padding:3px;border-radius:50%;background:var(--c);color:var(--cc)}
& .badge-accent .ic{background:var(--accent);color:var(--accent-contrast)}
& .badge:not([class*=badge-]) .ic{background:var(--text-muted)}`,
    },
  ],
};
