// Fonds de page : une couche décorative derrière le contenu (pseudo-éléments, jamais d'image externe).
// La classe .page-bg se pose sur <body> ou sur l'enveloppe du hero ; le contenu passe au-dessus grâce à isolation.

const base = `
& .page-bg{position:relative;isolation:isolate;background-color:var(--bg);color:var(--text);font-family:var(--font-body)}
& .page-bg::before,& .page-bg::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none}
`;

// Fondu vers le bas : le motif reste derrière le titre et s'efface avant le contenu dense (le masque n'utilise que l'alpha).
const FADE = `mask-image:radial-gradient(ellipse 85% 70% at 50% 0%,#000 30%,transparent 78%);-webkit-mask-image:radial-gradient(ellipse 85% 70% at 50% 0%,#000 30%,transparent 78%)`;
const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 3 0 0 0 -1.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const stat = (v, l) => `<div style="display:grid;gap:4px;padding:16px 18px;background:var(--surface);text-align:left"><b style="font:var(--heading-weight) var(--fs-xl)/1 var(--font-display);letter-spacing:var(--heading-tracking)">${v}</b><span style="font-size:var(--fs-xs);color:var(--text-muted)">${l}</span></div>`;

const demo = (c) => `<div class="page-bg"><div style="display:grid;gap:18px;justify-items:center;text-align:center;padding:76px 32px 64px">
<span style="display:inline-flex;align-items:center;gap:8px;height:28px;padding:0 12px;border:var(--border-w) solid var(--border);border-radius:var(--r-full);background:var(--surface);font-size:var(--fs-xs);color:var(--text-muted)"><b style="color:var(--accent-text)">Nouveau</b>Relances automatiques</span>
<h3 class="hero-title" style="margin:0;max-width:17ch;font:var(--heading-weight) clamp(2rem,5.4cqi,3.4rem)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance">Vos factures, payées plus vite.</h3>
<p class="hero-text" style="margin:0;max-width:46ch;font-size:var(--fs-lg);line-height:1.55;color:var(--text-muted)">Créez un devis, envoyez la facture et relancez automatiquement. Tout tient sur un seul écran.</p>
<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button><button class="btn btn-secondary btn-lg">Voir la démo</button>`)}</div>
<div style="margin-top:26px;width:min(100%,580px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--border-w);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);background:var(--border);overflow:hidden;box-shadow:var(--shadow-md)">${stat("12 400", "indépendants")}${stat("18 j", "délai moyen de paiement")}${stat("4,8/5", "note des clients")}</div>
</div></div>`;

export default {
  id: "backgrounds", label: "Fonds", group: "Structure", icon: "f_backgrounds", size: "lg", fit: 900, deps: ["buttons"],
  desc: "Le fond de ta page : uni, points, grille, dégradé, mesh, halo, grain, hachures.",
  base,
  snippet: `<!-- On the page (or on the hero wrapper only) -->
<body class="page-bg">
  <header class="nav">…</header>
  <section class="hero">…</section>
</body>`,
  rules: [
    "Apply the background once: on <body class=\"page-bg\"> or on the wrapper around navbar + hero. Never stack two patterns, and never put a pattern behind dense UI (tables, forms, dashboards).",
    "The pattern is a pseudo-element layer (pointer-events:none, z-index:-1 inside an isolated parent), built only from tokens. No background images or videos.",
    "Keep text on the pattern short (headline, lead, actions). Long reading and data sit on var(--surface) cards so contrast stays AA.",
    "Sections below the hero use var(--bg) or var(--bg-subtle) solid fills; the decorative layer fades out before them.",
  ],
  demo,
  variants: [
    {
      id: "plain", name: "Uni", desc: "Un fond plein, sans motif. Le contenu porte tout.", tags: ["Sobre", "Standard"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Solid var(--bg) everywhere, no decorative layer.", "Rhythm between sections comes from alternating var(--bg) and var(--bg-subtle) bands, never from texture."],
      css: `
& .page-bg{background:var(--bg)}`,
    },
    {
      id: "dots", name: "Points", desc: "Trame de points fins qui s'efface vers le bas.", tags: ["Technique", "Moderne"],
      attrs: { shape: "inherit", depth: "flat", energy: "technical" },
      spec: ["A 22px grid of 1.2px dots in text color at 22% opacity, drawn with a radial-gradient on ::before.", "Masked by an ellipse anchored at the top center so the dots vanish at about 75% of the height, behind the headline only."],
      css: `
& .page-bg::before{background-image:radial-gradient(color-mix(in srgb,var(--text) 22%,transparent) 1.2px,transparent 1.7px);background-size:22px 22px;background-position:center top;${FADE}}`,
    },
    {
      id: "grid", name: "Grille", desc: "Quadrillage fin de 40 px, estompé autour du titre.", tags: ["Technique", "Net"],
      attrs: { shape: "inherit", depth: "outline", energy: "technical" },
      spec: ["A 40px square grid of 1px lines in text color at 8% opacity, centered on the page axis.", "Same top-anchored elliptical fade as the content; lines never cross cards because cards sit on var(--surface)."],
      css: `
& .page-bg::before{background-image:linear-gradient(color-mix(in srgb,var(--text) 8%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--text) 8%,transparent) 1px,transparent 1px);background-size:40px 40px;background-position:center top;${FADE}}`,
    },
    {
      id: "gradient", name: "Dégradé doux", desc: "L'accent pâle en haut, qui fond vers le fond de page.", tags: ["Doux", "Chaleureux"],
      attrs: { shape: "inherit", depth: "flat", energy: "friendly" },
      spec: ["Vertical linear gradient from var(--accent-soft) at the top to var(--bg) at 65% of the height.", "No texture; works in both modes because accent-soft is already tuned per mode."],
      css: `
& .page-bg{background:linear-gradient(180deg,var(--accent-soft) 0%,var(--bg) 65%)}`,
    },
    {
      id: "mesh", name: "Mesh", desc: "Taches de couleur floues (accent, info, avertissement).", tags: ["Premium", "Coloré"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Three large radial gradients on ::before: accent at 36% top-left, info at 30% top-right, warning at 20% bottom-center, each fading to transparent at 70%.", "Pairs well with glass surfaces; body copy stays on surface cards, never directly on the brightest blob."],
      css: `
& .page-bg::before{background:radial-gradient(42% 55% at 12% 8%,color-mix(in srgb,var(--accent) 36%,transparent),transparent 70%),radial-gradient(40% 50% at 88% 14%,color-mix(in srgb,var(--info) 30%,transparent),transparent 70%),radial-gradient(50% 45% at 55% 100%,color-mix(in srgb,var(--warning) 20%,transparent),transparent 70%)}`,
    },
    {
      id: "halo", name: "Halo", desc: "Une lueur d'accent au-dessus du titre, filet lumineux en haut.", tags: ["Premium", "Nocturne"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["One radial glow of var(--accent) at 42% opacity, 60% wide, centered just above the top edge; fades out by 70%.", "A 1px top line in accent that fades to transparent on both sides, like a light source."],
      css: `
& .page-bg::before{background:radial-gradient(60% 50% at 50% -8%,color-mix(in srgb,var(--accent) 42%,transparent),transparent 70%)}
& .page-bg::after{bottom:auto;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--accent) 70%,transparent),transparent)}`,
    },
    {
      id: "grain", name: "Grain", desc: "Papier légèrement texturé, comme une page imprimée.", tags: ["Éditorial", "Matière"],
      attrs: { shape: "inherit", depth: "flat", energy: "editorial" },
      spec: ["Base fill var(--bg-subtle); ::before is a var(--text) layer at 10% opacity masked by an inline SVG fractal-noise tile (180px), so the grain takes the text color.", "Adapts to any palette and both modes; no image request, the noise SVG is a data URI used only as a mask."],
      css: `
& .page-bg{background-color:var(--bg-subtle)}
& .page-bg::before{background:var(--text);opacity:.1;mask-image:${NOISE};mask-size:180px 180px;-webkit-mask-image:${NOISE};-webkit-mask-size:180px 180px}`,
    },
    {
      id: "hatch", name: "Hachures", desc: "Fines diagonales régulières, un fond graphique et léger.", tags: ["Graphique", "Ludique"],
      attrs: { shape: "inherit", depth: "flat", energy: "playful" },
      spec: ["Repeating 45-degree hairlines (1px every 12px) in text color at 7% opacity on ::before.", "Top-anchored fade identical to the dot pattern so the hatching frames the headline only."],
      css: `
& .page-bg::before{background:repeating-linear-gradient(-45deg,color-mix(in srgb,var(--text) 7%,transparent) 0 1px,transparent 1px 12px);${FADE}}`,
    },
    {
      id: "brut", name: "Quadrillage brut", desc: "Grands carreaux au trait épais, bord à bord, sans fondu. Assumé.", tags: ["Audacieux", "Brut"],
      attrs: { shape: "inherit", depth: "outline", energy: "playful" },
      spec: ["A 56px grid drawn with lines as thick as var(--border-w) (min 2px) in text color at 14%, on a var(--bg-subtle) fill, with no fade.", "Unlike the fine grid it never fades: the squares run edge to edge and are meant to be seen, so content cards keep a solid var(--surface) fill and the global border width."],
      css: `
& .page-bg{background-color:var(--bg-subtle)}
& .page-bg::before{background-image:linear-gradient(color-mix(in srgb,var(--text) 14%,transparent) max(2px,var(--border-w)),transparent 0),linear-gradient(90deg,color-mix(in srgb,var(--text) 14%,transparent) max(2px,var(--border-w)),transparent 0);background-size:56px 56px;background-position:center top}`,
    },
  ],
};
