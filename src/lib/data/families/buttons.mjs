import { ic } from "../icons.mjs";

const base = `
& .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:var(--control-h);padding:0 var(--pad-x);font:600 var(--fs-ctl)/1 var(--font-body);cursor:pointer;border:var(--border-w) solid transparent;border-radius:var(--r-control);white-space:nowrap;text-decoration:none;transition:background var(--dur) var(--ease),border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease),transform var(--dur) var(--ease),color var(--dur) var(--ease),filter var(--dur) var(--ease)}
& .btn:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .btn:disabled,& .btn[aria-disabled=true]{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}
& .btn-sm{height:calc(var(--control-h) * .8);padding:0 calc(var(--pad-x) * .75);font-size:calc(var(--fs-ctl) - 1px)}
& .btn-lg{height:calc(var(--control-h) * 1.2);padding:0 calc(var(--pad-x) * 1.3);font-size:calc(var(--fs-ctl) + 1px)}
& .btn-icon{width:var(--control-h);padding:0}
& .btn .ic{width:1.15em;height:1.15em;flex:none}
`;

export default {
  id: "buttons", label: "Boutons", group: "Composants", icon: "f_buttons", size: "sm",
  desc: "Le composant le plus vu de ton app. Il fixe le ton : plein, contour, pilule, brut, verre…",
  base,
  snippet: `<button class="btn btn-primary">Save changes</button>
<button class="btn btn-secondary">Cancel</button>
<button class="btn btn-ghost">Details</button>
<button class="btn btn-danger">Delete project</button>
<button class="btn btn-primary btn-sm">Small</button>  <!-- also .btn-lg -->
<button class="btn btn-secondary btn-icon" aria-label="Add"><svg class="ic">…</svg></button>`,
  rules: [
    "One primary button per view region. Secondary actions use btn-secondary or btn-ghost.",
    "Labels are verb + object in sentence case ('Save changes', 'Invite member'). No trailing arrows or exclamation marks.",
    "States to implement: default, hover, focus-visible, pressed, disabled, loading (aria-busy, label stays, spinner replaces the icon).",
    "Use <button> for actions and <a class=\"btn\"> for navigation. Touch target is at least 44×44px on coarse pointers.",
  ],
  demo: () => `<div class="stack"><div class="row"><button class="btn btn-primary">Enregistrer</button><button class="btn btn-secondary">Annuler</button><button class="btn btn-ghost">Détails</button></div><div class="row"><button class="btn btn-danger">Supprimer</button><button class="btn btn-primary" disabled>Désactivé</button><button class="btn btn-secondary btn-icon" aria-label="Ajouter">${ic("plus")}</button></div></div>`,
  variants: [
    {
      id: "solid", name: "Plein", desc: "Aplat de couleur net, le standard des produits modernes.", tags: ["Net", "Polyvalent"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Primary is a flat accent fill with accent-contrast text; hover darkens to accent-hover, press moves 1px down.", "Secondary is a surface fill with a strong border; ghost is transparent and gains a subtle fill on hover.", "Radius follows the global control radius."],
      css: `
& .btn-primary{background:var(--accent);color:var(--accent-contrast)}
& .btn-primary:hover:not(:disabled){background:var(--accent-hover)}
& .btn-primary:active:not(:disabled){transform:translateY(1px)}
& .btn-secondary{background:var(--surface);color:var(--text);border-color:var(--border-strong)}
& .btn-secondary:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-ghost{background:transparent;color:var(--text)}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-danger{background:var(--danger);color:var(--danger-contrast)}
& .btn-danger:hover:not(:disabled){filter:brightness(.92)}`,
    },
    {
      id: "soft", name: "Teinté", desc: "Fond légèrement coloré, texte accentué. Calme et lisible.", tags: ["Doux", "Discret"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Primary uses accent-soft as fill and accent-text as label; hover deepens the tint.", "Secondary is transparent with a hairline border; danger is a red tint rather than a solid red.", "No shadows anywhere; hierarchy comes from tint strength."],
      css: `
& .btn-primary{background:var(--accent-soft);color:var(--accent-text)}
& .btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--accent) 22%,var(--surface))}
& .btn-secondary{background:transparent;color:var(--text);border-color:var(--border)}
& .btn-secondary:hover:not(:disabled){background:var(--bg-subtle);border-color:var(--border-strong)}
& .btn-ghost{background:transparent;color:var(--text-muted)}
& .btn-ghost:hover:not(:disabled){color:var(--text);background:var(--bg-subtle)}
& .btn-danger{background:color-mix(in srgb,var(--danger) 12%,var(--surface));color:var(--danger)}
& .btn-danger:hover:not(:disabled){background:color-mix(in srgb,var(--danger) 22%,var(--surface))}`,
    },
    {
      id: "outline", name: "Contour", desc: "Trait coloré sans remplissage, léger et précis.", tags: ["Léger", "Précis"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Primary is transparent with an accent border and accent-text label; hover fills with accent-soft.", "Secondary uses a strong neutral border; on hover the border switches to full text color.", "Border width follows the global border setting."],
      css: `
& .btn-primary{background:transparent;color:var(--accent-text);border-color:var(--accent)}
& .btn-primary:hover:not(:disabled){background:var(--accent-soft)}
& .btn-secondary{background:transparent;color:var(--text);border-color:var(--border-strong)}
& .btn-secondary:hover:not(:disabled){border-color:var(--text)}
& .btn-ghost{background:transparent;color:var(--text)}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-danger{background:transparent;color:var(--danger);border-color:var(--danger)}
& .btn-danger:hover:not(:disabled){background:color-mix(in srgb,var(--danger) 10%,transparent)}`,
    },
    {
      id: "pill", name: "Pilule", desc: "Totalement arrondi, avec une petite élévation au survol.", tags: ["Amical", "Tactile"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["Every button is fully rounded (radius-full) with extra horizontal padding.", "Primary carries a small shadow and lifts 1px on hover with a larger shadow.", "Secondary is a surface pill with a hairline border."],
      css: `
& .btn{border-radius:var(--r-full);padding:0 calc(var(--pad-x) * 1.3)}
& .btn-icon{padding:0}
& .btn-primary{background:var(--accent);color:var(--accent-contrast);box-shadow:var(--shadow-sm)}
& .btn-primary:hover:not(:disabled){background:var(--accent-hover);box-shadow:var(--shadow-md);transform:translateY(-1px)}
& .btn-primary:active:not(:disabled){transform:translateY(0)}
& .btn-secondary{background:var(--surface);color:var(--text);border-color:var(--border)}
& .btn-secondary:hover:not(:disabled){border-color:var(--border-strong);box-shadow:var(--shadow-sm)}
& .btn-ghost{background:transparent;color:var(--text)}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-danger{background:var(--danger);color:var(--danger-contrast)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Gros contour, ombre dure décalée, effet d'enfoncement.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["2px text-colored border and a hard offset shadow (3px 3px, no blur) on every button.", "Hover shifts the button up-left and grows the shadow; press collapses the shadow (translate 3px).", "Ghost buttons drop the box and use an underline."],
      css: `
& .btn{border:2px solid var(--text);box-shadow:3px 3px 0 var(--text);font-weight:700}
& .btn:hover:not(:disabled){transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--text)}
& .btn:active:not(:disabled){transform:translate(3px,3px);box-shadow:0 0 0 var(--text)}
& .btn-primary{background:var(--accent);color:var(--accent-contrast)}
& .btn-secondary{background:var(--surface);color:var(--text)}
& .btn-ghost{background:transparent;box-shadow:none;border-color:transparent;color:var(--text);text-decoration:underline;text-underline-offset:3px}
& .btn-ghost:hover:not(:disabled){box-shadow:none;transform:none;background:var(--bg-subtle)}
& .btn-danger{background:var(--danger);color:var(--danger-contrast)}`,
    },
    {
      id: "gradient", name: "Relief", desc: "Dégradé subtil, reflet interne, finition premium.", tags: ["Premium", "Soigné"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Primary uses a vertical gradient (accent 90% white to accent) with a 1px inner top highlight and a slightly darker border.", "Secondary is a light vertical gradient between surface-raised and bg-subtle.", "Hover brightens by 6%; press darkens by 4% and moves 1px down."],
      css: `
& .btn-primary{color:var(--accent-contrast);background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 90%,white),var(--accent));border-color:color-mix(in srgb,var(--accent) 78%,black);box-shadow:inset 0 1px 0 rgba(255,255,255,.28),var(--shadow-sm)}
& .btn-primary:hover:not(:disabled){filter:brightness(1.06);box-shadow:inset 0 1px 0 rgba(255,255,255,.32),var(--shadow-md)}
& .btn-primary:active:not(:disabled){filter:brightness(.96);transform:translateY(1px)}
& .btn-secondary{background:linear-gradient(180deg,var(--surface-raised),var(--bg-subtle));color:var(--text);border-color:var(--border-strong);box-shadow:inset 0 1px 0 rgba(255,255,255,.45),var(--shadow-sm)}
& .btn-secondary:hover:not(:disabled){background:var(--surface-raised)}
& .btn-ghost{background:transparent;color:var(--text)}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-danger{background:linear-gradient(180deg,color-mix(in srgb,var(--danger) 90%,white),var(--danger));color:var(--danger-contrast);border-color:color-mix(in srgb,var(--danger) 78%,black);box-shadow:inset 0 1px 0 rgba(255,255,255,.25)}`,
    },
    {
      id: "glass", name: "Verre", desc: "Translucide avec flou d'arrière-plan. Demande un fond riche.", tags: ["Moderne", "Translucide"], stage: "mesh",
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["Buttons are translucent with backdrop-filter blur(14px) saturate(1.4) and a 16% text-colored border.", "Primary is accent at 85% opacity with an inner top highlight; secondary is surface at 55%.", "Only use over a colorful or image background; on flat backgrounds fall back to the solid style."],
      css: `
& .btn{-webkit-backdrop-filter:blur(14px) saturate(1.4);backdrop-filter:blur(14px) saturate(1.4);border-color:color-mix(in srgb,var(--text) 16%,transparent)}
& .btn-primary{background:color-mix(in srgb,var(--accent) 85%,transparent);color:var(--accent-contrast);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),var(--shadow-sm)}
& .btn-secondary{background:color-mix(in srgb,var(--surface) 55%,transparent);color:var(--text)}
& .btn-ghost{background:transparent;border-color:transparent;color:var(--text)}
& .btn-ghost:hover:not(:disabled){background:color-mix(in srgb,var(--surface) 45%,transparent)}
& .btn-danger{background:color-mix(in srgb,var(--danger) 85%,transparent);color:var(--danger-contrast)}
& .btn:hover:not(:disabled){filter:brightness(1.08)}`,
    },
    {
      id: "underline", name: "Souligné", desc: "Sans boîte : du texte souligné qui se remplit au survol.", tags: ["Éditorial", "Minimal"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["No box, no radius: text with a 2px underline drawn as an inset box-shadow.", "Hover adds a 10% currentColor wash behind the label.", "Ghost has no underline until hovered."],
      css: `
& .btn{border:0;border-radius:0;height:auto;padding:.55em .2em;background:transparent;box-shadow:inset 0 -2px 0 currentColor}
& .btn:hover:not(:disabled){box-shadow:inset 0 -2px 0 currentColor,inset 0 -100px 0 color-mix(in srgb,currentColor 10%,transparent)}
& .btn-sm{height:auto;padding:.4em .15em}
& .btn-lg{height:auto;padding:.7em .25em}
& .btn-icon{width:auto;padding:.55em}
& .btn-primary{color:var(--accent-text)}
& .btn-secondary{color:var(--text)}
& .btn-ghost{color:var(--text-muted);box-shadow:none}
& .btn-ghost:hover:not(:disabled){color:var(--text);box-shadow:inset 0 -2px 0 currentColor}
& .btn-danger{color:var(--danger)}`,
    },
    {
      id: "keycap", name: "Touche", desc: "Effet 3D de touche de clavier, s'enfonce à l'appui.", tags: ["Ludique", "Tactile"],
      attrs: { shape: "inherit", depth: "lift", energy: "playful" },
      spec: ["A thick darker bottom border makes each button look like a physical key.", "Press removes the extra bottom border and moves the button down 3px, with a fast 80ms transition.", "Primary border is accent mixed 62% with black."],
      css: `
& .btn{border:var(--border-w) solid color-mix(in srgb,var(--text) 22%,transparent);border-bottom-width:calc(var(--border-w) + 3px);transition:transform 80ms,border-bottom-width 80ms,background var(--dur) var(--ease)}
& .btn:active:not(:disabled){transform:translateY(3px);border-bottom-width:var(--border-w)}
& .btn-primary{background:var(--accent);color:var(--accent-contrast);border-color:color-mix(in srgb,var(--accent) 62%,black)}
& .btn-primary:hover:not(:disabled){background:var(--accent-hover)}
& .btn-secondary{background:var(--surface);color:var(--text);border-color:var(--border-strong)}
& .btn-secondary:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-ghost{background:transparent;color:var(--text);border-color:transparent}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-danger{background:var(--danger);color:var(--danger-contrast);border-color:color-mix(in srgb,var(--danger) 62%,black)}`,
    },
    {
      id: "console", name: "Console", desc: "Police mono, angles droits, inversion au survol.", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Monospace label, 2px radius, no shadow.", "Primary is inverted (text color as fill) with a leading '>' and switches to accent on hover.", "Danger is outlined and fills on hover."],
      css: `
& .btn{font-family:var(--font-mono);font-weight:500;font-size:calc(var(--fs-ctl) - 1px);border-radius:2px}
& .btn-primary{background:var(--text);color:var(--bg);border-color:var(--text)}
& .btn-primary::before{content:'>';margin-right:.4ch;opacity:.6}
& .btn-primary:hover:not(:disabled){background:var(--accent);border-color:var(--accent);color:var(--accent-contrast)}
& .btn-secondary{background:transparent;color:var(--text);border-color:var(--border-strong)}
& .btn-secondary:hover:not(:disabled){border-color:var(--text)}
& .btn-ghost{background:transparent;color:var(--text-muted)}
& .btn-ghost:hover:not(:disabled){color:var(--text);background:var(--bg-subtle)}
& .btn-danger{background:transparent;color:var(--danger);border-color:var(--danger)}
& .btn-danger:hover:not(:disabled){background:var(--danger);color:var(--danger-contrast)}`,
    },
    {
      id: "mesh", name: "Aurore", desc: "Dégradé maillé multicolore, comme une lumière diffuse.", tags: ["Vivant", "Premium"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Primary stacks three radial gradients (accent lightened, info-tinted accent, warning-tinted accent) over a flat accent base, with an inner top highlight and a darker accent border.", "Secondary and danger reuse the same mesh at low opacity on a surface fill so the family stays coherent.", "Hover saturates and brightens the mesh; press moves 1px down. Label gets a faint text-shadow to stay legible on the light spots."],
      css: `
& .btn-primary{color:var(--accent-contrast);border-color:color-mix(in srgb,var(--accent) 70%,black);background:radial-gradient(at 12% 15%,color-mix(in srgb,var(--accent) 62%,white) 0,transparent 55%),radial-gradient(at 88% 20%,color-mix(in srgb,var(--info) 70%,var(--accent)) 0,transparent 58%),radial-gradient(at 62% 105%,color-mix(in srgb,var(--warning) 45%,var(--accent)) 0,transparent 62%),var(--accent);box-shadow:inset 0 1px 0 rgba(255,255,255,.3),var(--shadow-sm);text-shadow:0 1px 1px color-mix(in srgb,black 25%,transparent)}
& .btn-primary:hover:not(:disabled){filter:saturate(1.25) brightness(1.06);box-shadow:inset 0 1px 0 rgba(255,255,255,.36),var(--shadow-md)}
& .btn-primary:active:not(:disabled){transform:translateY(1px);filter:saturate(1.15) brightness(.97)}
& .btn-secondary{color:var(--text);border-color:var(--border-strong);background:radial-gradient(at 0% 0%,color-mix(in srgb,var(--accent) 16%,transparent) 0,transparent 60%),radial-gradient(at 100% 100%,color-mix(in srgb,var(--info) 16%,transparent) 0,transparent 60%),var(--surface)}
& .btn-secondary:hover:not(:disabled){border-color:var(--accent);filter:saturate(1.3)}
& .btn-ghost{background:transparent;color:var(--text)}
& .btn-ghost:hover:not(:disabled){background:radial-gradient(at 0% 0%,color-mix(in srgb,var(--accent) 16%,transparent) 0,transparent 70%),radial-gradient(at 100% 100%,color-mix(in srgb,var(--info) 14%,transparent) 0,transparent 70%),var(--bg-subtle)}
& .btn-danger{color:var(--danger-contrast);border-color:color-mix(in srgb,var(--danger) 70%,black);background:radial-gradient(at 15% 15%,color-mix(in srgb,var(--danger) 60%,white) 0,transparent 55%),radial-gradient(at 90% 100%,color-mix(in srgb,var(--warning) 50%,var(--danger)) 0,transparent 60%),var(--danger);box-shadow:inset 0 1px 0 rgba(255,255,255,.25);text-shadow:0 1px 1px color-mix(in srgb,black 25%,transparent)}
& .btn-danger:hover:not(:disabled){filter:saturate(1.2) brightness(1.05)}`,
    },
    {
      id: "soft-ui", name: "Néomorphe", desc: "Relief doux sculpté dans la page, lumière en haut à gauche.", tags: ["Doux", "Tactile"],
      attrs: { shape: "round", depth: "soft", energy: "calm" },
      spec: ["Buttons have no border and share the page tone; depth comes from a dark shadow bottom-right and a light shadow top-left, both 12px blur.", "Primary keeps the accent fill with the same dual shadow; press swaps both shadows for inset ones so the key looks pushed in.", "Radius is control radius + 4px; ghost shows no relief until hovered."],
      css: `
& .btn{--sh-d:color-mix(in srgb,black 20%,transparent);--sh-l:color-mix(in srgb,var(--surface-raised) 70%,white);border:0;border-radius:calc(var(--r-control) + 4px);background:var(--bg-subtle);color:var(--text);box-shadow:5px 5px 12px var(--sh-d),-5px -5px 12px var(--sh-l)}
& .btn:hover:not(:disabled){box-shadow:7px 7px 16px var(--sh-d),-7px -7px 16px var(--sh-l)}
& .btn:active:not(:disabled){transform:none;box-shadow:inset 4px 4px 9px var(--sh-d),inset -4px -4px 9px var(--sh-l)}
& .btn-primary{background:var(--accent);color:var(--accent-contrast)}
& .btn-secondary{background:var(--bg-subtle);color:var(--text)}
& .btn-ghost{background:transparent;box-shadow:none;color:var(--text-muted)}
& .btn-ghost:hover:not(:disabled){color:var(--text);box-shadow:4px 4px 10px var(--sh-d),-4px -4px 10px var(--sh-l)}
& .btn-danger{background:var(--bg-subtle);color:var(--danger)}
& .btn-danger:hover:not(:disabled){color:var(--danger)}`,
    },
    {
      id: "double", name: "Double contour", desc: "Filet double façon cadre de diplôme, sobre et élégant.", tags: ["Élégant", "Classique"],
      attrs: { shape: "sharp", depth: "outline", energy: "premium" },
      spec: ["Every button uses a 'double' border style (border width = global border + 3px) so two hairlines frame the label with a transparent gap.", "Primary lines are accent with an accent-text label; secondary lines are the text color. Hover tints the interior with accent-soft.", "Radius is capped at 4px to keep the double lines clean; ghost lines appear only on hover."],
      css: `
& .btn{border-style:double;border-width:calc(var(--border-w) + 3px);border-radius:min(var(--r-control),4px);background:transparent;letter-spacing:.02em}
& .btn-primary{color:var(--accent-text);border-color:var(--accent)}
& .btn-primary:hover:not(:disabled){background:var(--accent-soft)}
& .btn-secondary{color:var(--text);border-color:var(--text)}
& .btn-secondary:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-ghost{color:var(--text-muted);border-color:transparent}
& .btn-ghost:hover:not(:disabled){color:var(--text);border-color:var(--border-strong)}
& .btn-danger{color:var(--danger);border-color:var(--danger)}
& .btn-danger:hover:not(:disabled){background:color-mix(in srgb,var(--danger) 10%,transparent)}
& .btn-sm{padding:0 calc(var(--pad-x) * .6)}`,
    },
    {
      id: "tag", name: "Étiquette", desc: "Petites capitales, une flèche se déplie au survol.", tags: ["Éditorial", "Dynamique"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Uppercase 0.06em-tracked label at a slightly smaller size, radius 2px, flat fills.", "An arrow glyph is collapsed to zero width at rest; on hover it unfolds to 1em and pushes the label left, and it stays visible on focus-visible.", "Icon-only buttons never show the arrow. Press moves the arrow 2px further."],
      css: `
& .btn{gap:0;border-radius:2px;text-transform:uppercase;letter-spacing:.06em;font-size:calc(var(--fs-ctl) - 1px);font-weight:700}
& .btn:not(.btn-icon)::after{content:'→';display:inline-block;width:0;margin-left:0;opacity:0;overflow:hidden;transform:translateX(-6px);transition:width var(--dur) var(--ease),margin var(--dur) var(--ease),opacity var(--dur) var(--ease),transform var(--dur) var(--ease)}
& .btn:not(.btn-icon):hover:not(:disabled)::after,& .btn:not(.btn-icon):focus-visible::after{width:1em;margin-left:.6em;opacity:1;transform:translateX(0)}
& .btn:not(.btn-icon):active:not(:disabled)::after{transform:translateX(2px)}
& .btn-primary{background:var(--accent);color:var(--accent-contrast)}
& .btn-secondary{background:transparent;color:var(--text);border-color:var(--text)}
& .btn-secondary:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-ghost{background:transparent;color:var(--text-muted)}
& .btn-ghost:hover:not(:disabled){color:var(--text)}
& .btn-danger{background:transparent;color:var(--danger);border-color:var(--danger)}
& .btn-danger:hover:not(:disabled){background:color-mix(in srgb,var(--danger) 10%,transparent)}`,
    },
    {
      id: "wipe", name: "Balayage", desc: "Contour au repos, le fond balaie de gauche à droite au survol.", tags: ["Dynamique", "Net"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Buttons are outlined and carry a 0%-wide background layer; on hover it wipes from left to right to 100% in the button's own color while the label color inverts.", "Primary wipes accent, secondary wipes the text color, danger wipes danger, ghost wipes bg-subtle without a border.", "Uses background-size (not transforms) so radius and focus ring are untouched; the wipe takes 1.5x the base duration."],
      css: `
& .btn{background-repeat:no-repeat;background-position:left center;background-size:0% 100%;transition:background-size calc(var(--dur) * 1.5) var(--ease),color var(--dur) var(--ease),border-color var(--dur) var(--ease)}
& .btn:hover:not(:disabled){background-size:100% 100%}
& .btn-primary{color:var(--accent-text);border-color:var(--accent);background-color:transparent;background-image:linear-gradient(var(--accent),var(--accent))}
& .btn-primary:hover:not(:disabled){color:var(--accent-contrast)}
& .btn-secondary{color:var(--text);border-color:var(--text);background-color:transparent;background-image:linear-gradient(var(--text),var(--text))}
& .btn-secondary:hover:not(:disabled){color:var(--bg)}
& .btn-ghost{color:var(--text-muted);border-color:transparent;background-color:transparent;background-image:linear-gradient(var(--bg-subtle),var(--bg-subtle))}
& .btn-ghost:hover:not(:disabled){color:var(--text)}
& .btn-danger{color:var(--danger);border-color:var(--danger);background-color:transparent;background-image:linear-gradient(var(--danger),var(--danger))}
& .btn-danger:hover:not(:disabled){color:var(--danger-contrast)}`,
    },
    {
      id: "bloc", name: "Bombé", desc: "Gros bouton-jeu à extrusion pleine, il s'écrase à l'appui.", tags: ["Ludique", "Tactile"],
      attrs: { shape: "round", depth: "lift", energy: "playful" },
      spec: ["Rounded (radius + 4px) with a solid 5px extrusion in a darker shade of its own color, a glossy 2px inner highlight and a soft ground shadow.", "Hover lifts 1px and lengthens the extrusion to 6px; press sinks 4px until the extrusion is 1px.", "Labels are 800 weight. A 5px bottom margin reserves room for the extrusion so layout never shifts."],
      css: `
& .btn{--edge:color-mix(in srgb,var(--text) 22%,var(--surface));border:0;border-radius:calc(var(--r-control) + 4px);margin-bottom:5px;font-weight:800;box-shadow:0 5px 0 var(--edge),0 9px 14px color-mix(in srgb,black 16%,transparent),inset 0 2px 0 rgba(255,255,255,.35);transition:transform 90ms var(--ease),box-shadow 90ms var(--ease),background var(--dur) var(--ease)}
& .btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 0 var(--edge),0 11px 16px color-mix(in srgb,black 16%,transparent),inset 0 2px 0 rgba(255,255,255,.4)}
& .btn:active:not(:disabled){transform:translateY(4px);box-shadow:0 1px 0 var(--edge),0 2px 4px color-mix(in srgb,black 16%,transparent),inset 0 2px 0 rgba(255,255,255,.25)}
& .btn-primary{--edge:color-mix(in srgb,var(--accent) 55%,black);background:var(--accent);color:var(--accent-contrast)}
& .btn-secondary{background:var(--surface);color:var(--text)}
& .btn-ghost{--edge:transparent;background:transparent;color:var(--text);box-shadow:none}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle);box-shadow:none;transform:none}
& .btn-danger{--edge:color-mix(in srgb,var(--danger) 55%,black);background:var(--danger);color:var(--danger-contrast)}`,
    },
    {
      id: "split", name: "Segment", desc: "Action principale et chevron dans un seul bouton scindé.", tags: ["Compact", "Fonctionnel"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["A full-height end segment (2.4em wide) is tinted 12% currentColor and separated by a hairline divider, with a chevron drawn as a CSS mask in currentColor.", "Primary and danger are solid, secondary is a surface with a strong border, ghost is bordered but transparent. Icon-only buttons drop the segment.", "For a real split button render the segment as a second <button aria-haspopup=\"menu\"> in a flex group; this style only shows the visual."],
      css: `
& .btn{position:relative;overflow:hidden;padding-right:calc(var(--pad-x) * .6 + 2.4em)}
& .btn-sm{padding-right:calc(var(--pad-x) * .45 + 2.4em)}
& .btn-lg{padding-right:calc(var(--pad-x) * .8 + 2.4em)}
& .btn::before{content:'';position:absolute;top:0;right:0;bottom:0;width:2.4em;background:color-mix(in srgb,currentColor 12%,transparent);border-left:var(--border-w) solid color-mix(in srgb,currentColor 30%,transparent);transition:background var(--dur) var(--ease)}
& .btn::after{content:'';position:absolute;top:0;right:0;bottom:0;width:2.4em;background:currentColor;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E") center/1.1em no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E") center/1.1em no-repeat}
& .btn:hover:not(:disabled)::before{background:color-mix(in srgb,currentColor 22%,transparent)}
& .btn-icon{overflow:visible;padding:0}
& .btn-icon::before,& .btn-icon::after{display:none}
& .btn-primary{background:var(--accent);color:var(--accent-contrast)}
& .btn-primary:hover:not(:disabled){background:var(--accent-hover)}
& .btn-secondary{background:var(--surface);color:var(--text);border-color:var(--border-strong)}
& .btn-ghost{background:transparent;color:var(--text);border-color:var(--border)}
& .btn-ghost:hover:not(:disabled){background:var(--bg-subtle)}
& .btn-danger{background:var(--danger);color:var(--danger-contrast)}
& .btn-danger:hover:not(:disabled){filter:brightness(.92)}`,
    },
    {
      id: "neon", name: "Néon", desc: "Plaque sombre, texte et bord lumineux qui rayonnent.", tags: ["Nocturne", "Énergique"],
      attrs: { shape: "inherit", depth: "glass", energy: "technical" },
      spec: ["Each button is a near-black plate (bg mixed with black) with a bright tube-like label and border (accent lightened toward white), an outer glow 14px and an inner glow 10px in its own hue.", "Secondary glows in neutral text tone, danger in danger; ghost has no plate and lights up only on hover.", "Hover doubles the glow radius and adds a faint hue fill. The same dark plate is used in light and dark modes."],
      css: `
& .btn{--glow:var(--accent);background:color-mix(in srgb,var(--bg) 8%,black);color:color-mix(in srgb,var(--glow) 62%,white);border-color:color-mix(in srgb,var(--glow) 75%,white);box-shadow:0 0 14px color-mix(in srgb,var(--glow) 50%,transparent),inset 0 0 10px color-mix(in srgb,var(--glow) 24%,transparent);text-shadow:0 0 8px color-mix(in srgb,var(--glow) 80%,transparent)}
& .btn:hover:not(:disabled){box-shadow:0 0 26px color-mix(in srgb,var(--glow) 70%,transparent),inset 0 0 16px color-mix(in srgb,var(--glow) 34%,transparent);background:color-mix(in srgb,var(--glow) 14%,black)}
& .btn:active:not(:disabled){transform:scale(.98)}
& .btn-secondary{--glow:color-mix(in srgb,var(--text-muted) 70%,white)}
& .btn-ghost{background:transparent;box-shadow:none;text-shadow:none;--glow:var(--text-muted);color:var(--text-muted);border-color:transparent}
& .btn-ghost:hover:not(:disabled){background:transparent;color:color-mix(in srgb,var(--accent) 62%,white);border-color:color-mix(in srgb,var(--accent) 75%,white);box-shadow:0 0 16px color-mix(in srgb,var(--accent) 45%,transparent)}
& .btn-danger{--glow:var(--danger)}`,
    },
  ],
};
