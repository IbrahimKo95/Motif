import { ic } from "../icons.mjs";

const base = `
& .tt-demo{display:grid;gap:22px;justify-items:start}
& .tt-anchor{position:relative;display:inline-flex;flex-direction:column;align-items:center;gap:12px}
& .tt-anchor.tt-side{flex-direction:row}
& .tt-trigger{display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 12px;border:var(--border-w) solid var(--border);background:var(--surface);color:var(--text);font:500 var(--fs-sm)/1 var(--font-body);border-radius:var(--r-control);cursor:pointer;transition:border-color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .tt-trigger:hover{border-color:var(--border-strong);background:var(--bg-subtle)}
& .tt-trigger:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .tt-trigger .ic{color:var(--text-muted)}
& .tt{--tt-bg:var(--text);--tt-fg:var(--bg);--tt-bc:var(--text);position:relative;width:max-content;max-width:210px;padding:7px 10px;background:var(--tt-bg);color:var(--tt-fg);font:500 var(--fs-xs)/1.4 var(--font-body);text-align:left;border:1px solid var(--tt-bc);border-radius:var(--r-sm);box-shadow:var(--shadow-md);pointer-events:none}
& .tt::after{content:'';position:absolute;width:8px;height:8px;background:var(--tt-bg);border:0 solid var(--tt-bc);transform:rotate(45deg)}
& .tt-top{order:-1}
& .tt-top::after{left:calc(50% - 4px);bottom:-5px;border-width:0 1px 1px 0}
& .tt-bottom::after{left:calc(50% - 4px);top:-5px;border-width:1px 0 0 1px}
& .tt-right::after{top:calc(50% - 4px);left:-5px;border-width:0 0 1px 1px}
`;

const trig = (label, icon) => `<button class="tt-trigger" aria-describedby="__ID__">${icon ? ic(icon, 15) : ""}${label}</button>`;
const bubble = (id, place, html, cls = "") => `<span class="tt ${cls} tt-${place}" role="tooltip" id="${id}">${html}</span>`;
const anchor = (id, place, label, icon, html, cls) =>
  `<span class="tt-anchor${place === "right" ? " tt-side" : ""}">${trig(label, icon).replace("__ID__", id)}${bubble(id, place, html, cls)}</span>`;

const demo = (c) => `<div class="tt-demo">${anchor(c.uid + "t1", "top", "TVA 0 %", "info", "Franchise en base de TVA : art. 293 B du CGI.")}${anchor(c.uid + "t2", "bottom", "Lien de paiement", "copy", "Copié dans le presse-papiers")}${anchor(c.uid + "t3", "right", "Payée", "check", "Réglée le 12 mars par virement")}</div>`;

const rich = (c) => `<div class="tt-demo">${anchor(c.uid + "t1", "bottom", "Relance auto", "bell", `<strong class="tt-title">Relances automatiques</strong><span class="tt-body">Nomade écrit à votre client à J+7 et J+14 si la facture reste impayée.</span><a class="tt-link" href="#">Modifier le rythme ${ic("arrow", 13)}</a>`, "tt-rich")}</div>`;

export default {
  id: "tooltips", label: "Info-bulles", group: "Composants", icon: "f_tooltip", size: "sm",
  desc: "Aide contextuelle courte : sombre, claire bordée, verre, brute, popover riche.",
  base,
  snippet: `<span class="tt-anchor">
  <button class="tt-trigger" aria-describedby="tip-vat">VAT 0%</button>
  <span class="tt tt-top" role="tooltip" id="tip-vat">VAT exempt: art. 293 B.</span>
</span>
<!-- Show on :hover and :focus-visible of the trigger, hide on Escape.
     Placements: tt-top, tt-bottom, tt-right (arrow follows the class). -->`,
  rules: [
    "The bubble has role=tooltip and is referenced by aria-describedby on the trigger; it appears on hover and on keyboard focus, and Escape dismisses it.",
    "Tooltips carry short, non-essential text (under 80 characters). Anything interactive or longer belongs in a popover.",
    "Keep an 8px gap between the trigger and the arrow tip and never cover the trigger or neighbouring controls.",
    "Never put the only copy of critical information in a tooltip: touch users cannot hover.",
  ],
  demo,
  variants: [
    {
      id: "dark", name: "Sombre", desc: "Bulle inversée, texte clair, petite flèche.", tags: ["Classique", "Lisible"],
      attrs: { shape: "sharp", depth: "soft", energy: "crisp" },
      spec: ["Bubble uses the text color as fill and the page background as label at 12px, small radius, shadow-md.", "An 8px rotated square forms the arrow, centered on the trigger edge."],
      demo,
      css: ``,
    },
    {
      id: "light", name: "Claire bordée", desc: "Surface claire, filet fin et flèche assortie.", tags: ["Discret", "Sobre"],
      attrs: { shape: "inherit", depth: "outline", energy: "calm" },
      spec: ["Surface fill, 1px strong border and text color label; the arrow repeats the border on its two visible edges.", "Shadow-sm only, so it reads well on white pages and on cards."],
      demo,
      css: `
& .tt{--tt-bg:var(--surface-raised);--tt-fg:var(--text);--tt-bc:var(--border-strong);box-shadow:var(--shadow-sm);border-radius:var(--r-control)}`,
    },
    {
      id: "glass", name: "Verre", desc: "Bulle translucide floutée avec flèche triangulaire.", tags: ["Premium", "Translucide"], stage: "mesh",
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["Bubble at 55% surface opacity with backdrop blur(16px), a 1px light border and an inner top highlight.", "The arrow is a 12x6 triangle (clip-path) in the same translucent fill so it never doubles the opacity inside the bubble."],
      demo,
      css: `
& .tt{--tt-bg:color-mix(in srgb,var(--surface) 62%,transparent);--tt-fg:var(--text);--tt-bc:color-mix(in srgb,var(--text) 14%,transparent);-webkit-backdrop-filter:blur(16px) saturate(1.4);backdrop-filter:blur(16px) saturate(1.4);border-radius:var(--r-control);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),var(--shadow-md)}
& .tt::after{width:12px;height:6px;border:0;transform:none;clip-path:polygon(0 0,100% 0,50% 100%)}
& .tt-top::after{left:calc(50% - 6px);bottom:-6px}
& .tt-bottom::after{left:calc(50% - 6px);top:-6px;transform:rotate(180deg)}
& .tt-right::after{top:calc(50% - 3px);left:-9px;transform:rotate(90deg)}`,
    },
    {
      id: "brut", name: "Brute", desc: "Contour épais, ombre dure, fond d'accent.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "sharp", depth: "hard", energy: "playful" },
      spec: ["Square bubble on the accent-soft fill with a 2px text-colored border, a 3px hard offset shadow and 700 weight labels.", "The arrow is a rotated square carrying the same 2px border on its outer edges."],
      demo,
      css: `
& .tt{--tt-bg:var(--accent-soft);--tt-fg:var(--text);--tt-bc:var(--text);border-width:2px;border-radius:0;font-weight:700;box-shadow:3px 3px 0 var(--text)}
& .tt::after{width:10px;height:10px}
& .tt-top::after{left:calc(50% - 5px);bottom:-7px;border-width:0 2px 2px 0}
& .tt-bottom::after{left:calc(50% - 5px);top:-7px;border-width:2px 0 0 2px}
& .tt-right::after{top:calc(50% - 5px);left:-7px;border-width:0 0 2px 2px}`,
    },
    {
      id: "rich", name: "Popover riche", desc: "Titre, texte et lien dans une carte à flèche.", tags: ["Informatif", "Interactif"],
      attrs: { shape: "inherit", depth: "lift", energy: "friendly" },
      spec: ["A 240px card with a 600 title, two lines of text-muted body and an accent-text link with an arrow icon; padding 14px, radius-surface, shadow-lg.", "Unlike simple tooltips it can hold a link, so it opens on click and stays open until dismissed (role=dialog when it traps focus)."],
      demo: rich,
      css: `
& .tt{--tt-bg:var(--surface-raised);--tt-fg:var(--text);--tt-bc:var(--border);display:grid;gap:6px;width:240px;max-width:100%;padding:14px;border-radius:var(--r-surface);box-shadow:var(--shadow-lg);pointer-events:auto}
& .tt-title{font:var(--heading-weight) var(--fs-sm)/1.3 var(--font-display)}
& .tt-body{color:var(--text-muted);font-size:var(--fs-xs);line-height:1.5;font-weight:400}
& .tt-link{display:inline-flex;align-items:center;gap:4px;margin-top:2px;font-size:var(--fs-xs);font-weight:600;color:var(--accent-text);text-decoration:none}
& .tt-link:hover{text-decoration:underline;text-underline-offset:3px}
& .tt-link:focus-visible{outline:2px solid var(--focus);outline-offset:2px;border-radius:var(--r-sm)}`,
    },
  ],
};
