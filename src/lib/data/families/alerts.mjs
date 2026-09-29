import { ic } from "../icons.mjs";

const base = `
& .alert{display:flex;gap:12px;align-items:flex-start;width:100%;padding:14px 16px;font-family:var(--font-body);color:var(--text);border-radius:var(--r-surface);--c:var(--info)}
& .alert-info{--c:var(--info)}
& .alert-success{--c:var(--success)}
& .alert-warning{--c:var(--warning)}
& .alert-danger{--c:var(--danger)}
& .alert .ic{flex:none;width:18px;height:18px;margin-top:1px;color:var(--c)}
& .alert-title{display:block;font:600 var(--fs-sm)/1.3 var(--font-body)}
& .alert-text{margin:2px 0 0;font:400 var(--fs-xs)/1.45 var(--font-body);color:var(--text-muted)}
& .alert-close{margin-left:auto;flex:none;width:24px;height:24px;display:grid;place-items:center;border:0;background:none;color:var(--text-muted);cursor:pointer;border-radius:4px}
& .alert-close:hover{color:var(--text);background:color-mix(in srgb,var(--text) 8%,transparent)}
`;

const demo = () => `<div class="stack" style="width:min(100%,340px)">
<div class="alert alert-info" role="status">${ic("info")}<div><strong class="alert-title">Nouvelle version disponible</strong><p class="alert-text">La mise à jour sera appliquée cette nuit.</p></div></div>
<div class="alert alert-success" role="status">${ic("circleCheck")}<div><strong class="alert-title">Paiement confirmé</strong><p class="alert-text">Le reçu a été envoyé par e-mail.</p></div></div>
<div class="alert alert-danger" role="alert">${ic("circleX")}<div><strong class="alert-title">Échec de la synchronisation</strong><p class="alert-text">Vérifiez votre connexion et réessayez.</p></div></div>
</div>`;

export default {
  id: "alerts", label: "Alertes & toasts", group: "Composants", icon: "f_alerts", size: "md",
  desc: "Messages d'information, de succès et d'erreur : bandeau teinté, barre, contour, toast.",
  base,
  snippet: `<div class="alert alert-danger" role="alert">
  <svg class="ic">…</svg>
  <div><strong class="alert-title">Sync failed</strong>
  <p class="alert-text">Check your connection and try again.</p></div>
  <button class="alert-close" aria-label="Dismiss">×</button>
</div>   <!-- variants: alert-info | alert-success | alert-warning | alert-danger -->`,
  rules: [
    "Message names what happened and how to fix it. No apologies, no vague 'Something went wrong'.",
    "Use role=status for info and success, role=alert for errors. Toasts live in a persistent live region.",
    "Always pair color with an icon and text. Success toasts auto-dismiss after ~5s, errors persist until dismissed.",
    "Toast text repeats the action name (Saved, Published, Deleted) and offers Undo when reversible.",
  ],
  demo,
  variants: [
    {
      id: "soft", name: "Teintée", desc: "Fond de la couleur du message, icône colorée.", tags: ["Doux", "Standard"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Fill is the semantic color mixed 10% into the surface, with a 1px border at 25% of the same color.", "Icon carries the full semantic color; title stays neutral for readability."],
      css: `
& .alert{background:color-mix(in srgb,var(--c) 10%,var(--surface));border:1px solid color-mix(in srgb,var(--c) 25%,transparent)}`,
    },
    {
      id: "bar", name: "Barre", desc: "Surface neutre avec un liseré coloré à gauche.", tags: ["Net", "Sobre"],
      attrs: { shape: "sharp", depth: "outline", energy: "crisp" },
      spec: ["Neutral surface with a hairline border and a 4px semantic bar on the left edge.", "Radius is reduced so the bar reads as a clean edge."],
      css: `
& .alert{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--c);border-radius:var(--r-sm)}`,
    },
    {
      id: "outline", name: "Contour", desc: "Trait coloré, fond transparent.", tags: ["Léger", "Précis"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Transparent fill with a 1.5px semantic border; icon and title in semantic color, body text neutral.", "Best on white or subtle backgrounds; works in dense forms because it adds no visual weight."],
      css: `
& .alert{background:transparent;border:1.5px solid var(--c)}
& .alert-title{color:var(--c)}`,
    },
    {
      id: "toast", name: "Toast sombre", desc: "Bulle inversée avec ombre, façon notification flottante.", tags: ["Premium", "Flottant"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Inverse surface (text color as fill) with inverse text, shadow-lg and a colored icon.", "Compact padding; use as transient toasts anchored bottom-center or bottom-right, not inline."],
      css: `
& .alert{background:var(--text);color:var(--bg);border:0;box-shadow:var(--shadow-lg);padding:12px 14px}
& .alert-text{color:color-mix(in srgb,var(--bg) 72%,var(--text))}
& .alert .ic{color:color-mix(in srgb,var(--c) 55%,var(--bg))}
& .alert-close{color:color-mix(in srgb,var(--bg) 70%,var(--text))}
& .alert-close:hover{color:var(--bg);background:color-mix(in srgb,var(--bg) 14%,transparent)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Bloc coloré, gros contour et ombre décalée.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["Semantic tint fill, 2px text border, 4px hard shadow.", "Title is bold and uppercase-free; icon sits in a bordered square."],
      css: `
& .alert{background:color-mix(in srgb,var(--c) 16%,var(--surface));border:2px solid var(--text);box-shadow:4px 4px 0 var(--text)}
& .alert-title{font-weight:800}
& .alert .ic{padding:3px;box-sizing:content-box;width:16px;height:16px;border:2px solid var(--text);border-radius:var(--r-sm);background:var(--surface);color:var(--text)}`,
    },
    {
      id: "banner", name: "Bannière", desc: "Bandeau plein de la couleur du message, pleine largeur.", tags: ["Visible", "Système"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["Edge-to-edge strip with no radius, filled with the solid semantic color and its contrast color for icon, title and body.", "Content is vertically centered with 12px padding; the dismiss button inherits the contrast color. Reserve for page-level or system messages."],
      css: `
& .alert{border-radius:0;align-items:center;padding:12px 16px;background:var(--c);color:var(--cc)}
& .alert-info{--cc:var(--info-contrast)}
& .alert-success{--cc:var(--success-contrast)}
& .alert-warning{--cc:var(--warning-contrast)}
& .alert-danger{--cc:var(--danger-contrast)}
& .alert .ic{margin-top:0;color:inherit}
& .alert-text{color:inherit;opacity:.88}
& .alert-close{color:inherit}
& .alert-close:hover{color:inherit;background:color-mix(in srgb,var(--cc) 18%,transparent)}
& .alert-close:focus-visible{outline:2px solid var(--cc);outline-offset:1px}`,
    },
    {
      id: "chip", name: "Pastille", desc: "Carte neutre ombrée avec icône dans une pastille teintée.", tags: ["Moderne", "Aérien"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Neutral surface with a hairline border and shadow-sm; the icon sits in a 32px tinted rounded square (semantic color at 14%).", "Text stays neutral so only the icon chip carries color; content is vertically centered."],
      css: `
& .alert{align-items:center;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-sm);padding:12px 14px}
& .alert .ic{box-sizing:content-box;width:16px;height:16px;padding:8px;margin-top:0;border-radius:var(--r-control);background:color-mix(in srgb,var(--c) 14%,var(--surface))}`,
    },
    {
      id: "inline", name: "En ligne", desc: "Message compact, titre et détail sur un même fil de texte.", tags: ["Dense", "Formulaire"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Compact 8px 12px padding with a faint 8% semantic wash and no border; title and body run as one wrapping sentence instead of two lines.", "Title is bold and body is muted, separated by a small gap; the icon shrinks to 16px. Best beside form fields and inside cards."],
      css: `
& .alert{align-items:center;gap:10px;padding:8px 12px;border-radius:var(--r-control);background:color-mix(in srgb,var(--c) 8%,var(--surface))}
& .alert .ic{width:16px;height:16px;margin-top:0}
& .alert > div{display:block;min-width:0}
& .alert-title,& .alert-text{display:inline}
& .alert-title{font-size:var(--fs-xs)}
& .alert-text{margin:0 0 0 6px}`,
    },
    {
      id: "callout", name: "Double barre", desc: "Callout éditorial : deux filets à gauche, titre serif.", tags: ["Éditorial", "Documentation"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["A 4px semantic bar plus a 1px semantic hairline (at 45%) separated by a 3px gap on the left edge, drawn with inset box-shadows; 6% semantic wash behind.", "Title uses the display font; the icon is hidden so the double rule is the only signal. Made for docs and long-form callouts."],
      css: `
& .alert{padding:14px 16px 14px 24px;border-radius:0 var(--r-sm) var(--r-sm) 0;background:color-mix(in srgb,var(--c) 6%,var(--surface));box-shadow:inset 4px 0 0 var(--c),inset 7px 0 0 var(--surface),inset 8px 0 0 color-mix(in srgb,var(--c) 45%,transparent)}
& .alert .ic{display:none}
& .alert-title{font-family:var(--font-display);font-size:var(--fs-base);font-weight:var(--heading-weight);letter-spacing:var(--heading-tracking);color:var(--text)}
& .alert-text{font-size:var(--fs-sm);line-height:1.5}`,
    },
    {
      id: "console", name: "Console", desc: "Sortie de terminal : étiquette [info], police mono.", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "outline", energy: "technical" },
      spec: ["Monospace text on a bg-subtle panel with a strong hairline border and radius-sm; icon replaced by a bracketed level tag ([info], [ok], [warn], [err]) in the semantic color.", "Body line is prefixed with a muted '> ' prompt. Fits build logs, CLI tools and developer dashboards."],
      css: `
& .alert{align-items:baseline;background:var(--bg-subtle);border:1px solid var(--border-strong);border-radius:var(--r-sm);font-family:var(--font-mono);padding:10px 12px}
& .alert .ic{display:none}
& .alert-title{font:600 var(--fs-xs)/1.4 var(--font-mono)}
& .alert-title::before{content:'[info] ';color:var(--c);font-weight:700}
& .alert-success .alert-title::before{content:'[ok] '}
& .alert-warning .alert-title::before{content:'[warn] '}
& .alert-danger .alert-title::before{content:'[err] '}
& .alert-text{font:400 var(--fs-xs)/1.5 var(--font-mono)}
& .alert-text::before{content:'> ';color:var(--text-muted)}`,
    },
  ],
};
