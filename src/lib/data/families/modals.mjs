const base = `
& .modal{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:20px}
& .scrim{position:absolute;inset:0;background:var(--overlay)}
& .dialog{position:relative;width:min(100%,400px);max-height:100%;overflow:auto;background:var(--surface-raised);color:var(--text);font-family:var(--font-body);padding:var(--pad);border-radius:var(--r-surface);box-shadow:var(--shadow-lg);display:grid;gap:12px}
& .dialog-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
& .dialog-title{margin:0;font:var(--heading-weight) var(--fs-xl)/1.2 var(--font-display);letter-spacing:var(--heading-tracking)}
& .dialog-close{flex:none;width:28px;height:28px;display:grid;place-items:center;border:0;background:none;color:var(--text-muted);border-radius:6px;cursor:pointer;font-size:20px;line-height:1}
& .dialog-close:hover{background:var(--bg-subtle);color:var(--text)}
& .dialog-text{margin:0;font-size:var(--fs-sm);line-height:1.55;color:var(--text-muted)}
& .dialog-foot{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}
`;

const demo = (c) => `<div class="modal-demo"><div class="modal" role="presentation"><div class="scrim"></div><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="${c.uid}t"><div class="dialog-head"><h4 class="dialog-title" id="${c.uid}t">Supprimer ce projet ?</h4><button class="dialog-close" aria-label="Fermer">×</button></div><p class="dialog-text">Les 12 fichiers et l'historique seront supprimés définitivement. Cette action est irréversible.</p><div class="dialog-foot">${c.scope("buttons", `<button class="btn btn-secondary">Annuler</button><button class="btn btn-danger">Supprimer le projet</button>`)}</div></div></div></div>`;

export default {
  id: "modals", label: "Modales", group: "Composants", icon: "f_modals", size: "md", fit: 520, fitMax: 1.2, deps: ["buttons"],
  desc: "Fenêtres de dialogue : centrée, feuille du bas, panneau latéral ou brute.",
  base,
  snippet: `<div class="modal" role="presentation">
  <div class="scrim"></div>
  <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
    <div class="dialog-head"><h2 class="dialog-title" id="dlg-title">Delete this project?</h2><button class="dialog-close" aria-label="Close">×</button></div>
    <p class="dialog-text">All 12 files and history will be permanently deleted.</p>
    <div class="dialog-foot"><button class="btn btn-secondary">Cancel</button><button class="btn btn-danger">Delete project</button></div>
  </div>
</div>`,
  rules: [
    "Use a modal for a focused decision or short task. Long or complex content deserves its own page.",
    "Title is the question; buttons repeat the verb ('Delete project', not 'OK'). Primary action last on the right.",
    "Implement: focus trap, Esc closes, focus returns to the trigger, scroll lock, aria-modal and aria-labelledby.",
    "Never open a modal from a modal. On small screens center dialogs become bottom sheets.",
  ],
  demo,
  variants: [
    {
      id: "centered", name: "Centrée", desc: "Dialogue au centre sur un voile sombre.", tags: ["Classique", "Standard"],
      attrs: { shape: "inherit", depth: "soft", energy: "crisp" },
      spec: ["Dialog is centered with radius-surface, shadow-lg, max-width 400px over an overlay scrim.", "Header has title left and a close button right; actions right-aligned."],
      css: ``,
    },
    {
      id: "sheet", name: "Feuille", desc: "S'ouvre depuis le bas avec une poignée.", tags: ["Mobile", "Tactile"],
      attrs: { shape: "round", depth: "soft", energy: "friendly" },
      spec: ["Dialog is anchored to the bottom edge, full width up to 520px, with only the top corners rounded (radius-surface) and a small drag handle.", "Primary action fills the width on narrow screens."],
      css: `
& .modal{place-items:end center;padding:0}
& .dialog{width:min(100%,520px);border-radius:var(--r-surface) var(--r-surface) 0 0;padding-top:calc(var(--pad) + 10px)}
& .dialog::before{content:'';position:absolute;top:8px;left:50%;width:36px;height:4px;margin-left:-18px;border-radius:2px;background:var(--border-strong)}
@media (max-width:520px){& .dialog-foot{flex-direction:column-reverse}& .dialog-foot .btn{width:100%}}`,
    },
    {
      id: "drawer", name: "Panneau", desc: "Panneau latéral pleine hauteur, côté droit.", tags: ["Détail", "Productivité"],
      attrs: { shape: "sharp", depth: "soft", energy: "crisp" },
      spec: ["Full-height panel pinned to the right, 400px wide, with a hairline left border and no radius.", "Header is separated by a hairline; footer sticks to the bottom."],
      css: `
& .modal{place-items:stretch end;padding:0}
& .dialog{width:min(100%,380px);height:100%;max-height:none;border-radius:0;border-left:1px solid var(--border-strong);align-content:start;grid-template-rows:auto 1fr auto}
& .dialog-head{padding-bottom:12px;border-bottom:1px solid var(--border)}
& .dialog-foot{align-self:end}`,
    },
    {
      id: "brut", name: "Brute", desc: "Gros contour, ombre décalée, titre lourd.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["2px text border and an 8px hard offset shadow on the dialog.", "Header sits on an accent-soft band separated by a 2px rule; the scrim is flat with no blur."],
      css: `
& .dialog{border:2px solid var(--text);box-shadow:8px 8px 0 var(--text);padding:0;gap:0}
& .dialog-head{padding:14px var(--pad);background:var(--accent-soft);border-bottom:2px solid var(--text)}
& .dialog-title{font-weight:800}
& .dialog-text{padding:16px var(--pad) 4px}
& .dialog-foot{padding:12px var(--pad) var(--pad);margin-top:0}
& .dialog-close{border:2px solid var(--text);border-radius:var(--r-sm);background:var(--surface);color:var(--text)}`,
    },
    {
      id: "fullscreen", name: "Plein écran", desc: "Le dialogue remplit toute la fenêtre, contenu centré.", tags: ["Immersif", "Mobile"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["Dialog fills the whole viewport with no radius or shadow on the page background; header on top with a hairline, actions pinned at the bottom with a hairline.", "Body text is centered in a 52ch column at fs-base. Use for long tasks, media viewers and mobile flows."],
      css: `
& .modal{padding:0;place-items:stretch}
& .scrim{display:none}
& .dialog{width:100%;height:100%;max-height:none;border-radius:0;box-shadow:none;background:var(--bg);grid-template-rows:auto 1fr auto;gap:0}
& .dialog-head{padding-bottom:12px;border-bottom:1px solid var(--border)}
& .dialog-text{align-self:center;justify-self:center;max-width:52ch;text-align:center;font-size:var(--fs-base);line-height:1.6}
& .dialog-foot{margin-top:0;padding-top:12px;border-top:1px solid var(--border)}`,
    },
    {
      id: "glass", name: "Verre", desc: "Dialogue translucide et flouté sur un fond coloré.", tags: ["Premium", "Translucide"], stage: "mesh",
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["Dialog at 55% surface opacity with backdrop blur(20px) saturate(1.4), a 1px light border and an inner top highlight; the scrim is only a 25% veil so the backdrop stays rich.", "Verify text contrast against the busiest part of the backdrop."],
      demo: (c) => `<div class="modal-demo" style="background:transparent"><div class="modal" role="presentation"><div class="scrim"></div><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="${c.uid}t"><div class="dialog-head"><h4 class="dialog-title" id="${c.uid}t">Supprimer ce projet ?</h4><button class="dialog-close" aria-label="Fermer">×</button></div><p class="dialog-text">Les 12 fichiers et l'historique seront supprimés définitivement. Cette action est irréversible.</p><div class="dialog-foot">${c.scope("buttons", `<button class="btn btn-secondary">Annuler</button><button class="btn btn-danger">Supprimer le projet</button>`)}</div></div></div></div>`,
      css: `
& .scrim{background:color-mix(in srgb,var(--overlay) 25%,transparent)}
& .dialog{background:color-mix(in srgb,var(--surface) 55%,transparent);-webkit-backdrop-filter:blur(20px) saturate(1.4);backdrop-filter:blur(20px) saturate(1.4);border:1px solid color-mix(in srgb,var(--text) 14%,transparent);box-shadow:inset 0 1px 0 color-mix(in srgb,white 35%,transparent),var(--shadow-lg)}
& .dialog-text{color:var(--text)}
& .dialog-close:hover{background:color-mix(in srgb,var(--text) 10%,transparent)}`,
    },
    {
      id: "banded", name: "En-tête coloré", desc: "Bandeau d'accent plein en haut, corps clair dessous.", tags: ["Marqué", "Structuré"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Dialog has no padding; its header is a solid accent band with the contrast color for title and close button, clipped by the dialog radius.", "Body and actions get their own padding below; shadow-lg stays soft, unlike the hard-edged brutal variant."],
      css: `
& .dialog{padding:0;gap:0;overflow:hidden}
& .dialog-head{align-items:center;padding:14px var(--pad);background:var(--accent);color:var(--accent-contrast)}
& .dialog-close{color:var(--accent-contrast)}
& .dialog-close:hover{background:color-mix(in srgb,var(--accent-contrast) 18%,transparent);color:var(--accent-contrast)}
& .dialog-close:focus-visible{outline:2px solid var(--accent-contrast);outline-offset:1px}
& .dialog-text{padding:16px var(--pad) 4px}
& .dialog-foot{padding:12px var(--pad) var(--pad);margin-top:0}`,
    },
    {
      id: "popover", name: "Popover", desc: "Petite confirmation ancrée à son déclencheur, sans voile.", tags: ["Compact", "Contextuel"],
      attrs: { shape: "inherit", depth: "soft", energy: "crisp" },
      spec: ["Compact 300px panel anchored under its trigger with a 12px arrow, hairline border and shadow-lg; no scrim, the page stays visible and clickable outside.", "Title drops to fs-base, text to fs-xs, and buttons stay right-aligned. Use for quick confirmations on a single item."],
      demo: (c) => `<div class="modal-demo"><div style="position:absolute;top:16px;right:22px">${c.scope("buttons", `<button class="btn btn-secondary">Supprimer</button>`)}</div><div class="modal" role="presentation"><div class="scrim"></div><div class="dialog" role="dialog" aria-modal="false" aria-labelledby="${c.uid}t"><div class="dialog-head"><h4 class="dialog-title" id="${c.uid}t">Supprimer ce projet ?</h4><button class="dialog-close" aria-label="Fermer">×</button></div><p class="dialog-text">Les 12 fichiers seront supprimés définitivement.</p><div class="dialog-foot">${c.scope("buttons", `<button class="btn btn-secondary">Annuler</button><button class="btn btn-danger">Supprimer</button>`)}</div></div></div></div>`,
      css: `
& .modal{place-items:start end;padding:66px 22px 0}
& .scrim{display:none}
& .dialog{width:min(100%,300px);overflow:visible;gap:8px;border:1px solid var(--border-strong)}
& .dialog::before{content:'';position:absolute;top:-7px;right:32px;width:12px;height:12px;background:var(--surface-raised);border-left:1px solid var(--border-strong);border-top:1px solid var(--border-strong);transform:rotate(45deg)}
& .dialog-title{font-size:var(--fs-base)}
& .dialog-text{font-size:var(--fs-xs)}
& .dialog-foot{margin-top:4px}`,
    },
  ],
};
