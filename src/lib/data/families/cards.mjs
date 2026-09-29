const base = `
& .card{display:flex;flex-direction:column;width:min(100%,290px);text-align:left;color:var(--text);font-family:var(--font-body);overflow:hidden;background:var(--surface);border-radius:var(--r-surface);transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease)}
& .card-media{height:104px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 62%,var(--surface)),color-mix(in srgb,var(--accent) 14%,var(--surface)));position:relative}
& .card-media::after{content:'';position:absolute;left:16px;right:16px;bottom:0;height:48%;background:linear-gradient(90deg,rgba(255,255,255,.55) 0 14%,transparent 14% 20%,rgba(255,255,255,.4) 20% 34%,transparent 34% 40%,rgba(255,255,255,.7) 40% 54%,transparent 54% 60%,rgba(255,255,255,.45) 60% 74%,transparent 74% 80%,rgba(255,255,255,.6) 80% 94%,transparent 94%);border-radius:6px 6px 0 0;-webkit-mask:linear-gradient(#000,#000);opacity:.85}
& .card-body{display:grid;gap:8px;padding:var(--pad)}
& .card-title{margin:0;font:var(--heading-weight) var(--fs-lg)/1.25 var(--font-display);letter-spacing:var(--heading-tracking)}
& .card-text{margin:0;font-size:var(--fs-sm);line-height:1.5;color:var(--text-muted)}
& .card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:4px}
& .card-meta{font-size:var(--fs-xs);color:var(--text-muted)}
& .card-link{font-size:var(--fs-sm);font-weight:600;color:var(--accent-text);text-decoration:none}
& .card-link:hover{text-decoration:underline;text-underline-offset:3px}
& .card-link:focus-visible{outline:2px solid var(--focus);outline-offset:2px;border-radius:3px}
`;

const demo = () => `<article class="card"><div class="card-media"></div><div class="card-body"><h4 class="card-title">Ventes du trimestre</h4><p class="card-text">Comparez les régions et repérez les tendances avant la clôture.</p><div class="card-foot"><span class="card-meta">Mis à jour hier</span><a class="card-link" href="#">Ouvrir</a></div></div></article>`;

export default {
  id: "cards", label: "Cartes", group: "Composants", icon: "f_cards", size: "md",
  desc: "Le conteneur de base : bordé, ombré, soulevé, brut, en verre… il dit beaucoup de ton style.",
  base,
  snippet: `<article class="card">
  <div class="card-media"></div>
  <div class="card-body">
    <h4 class="card-title">Quarterly sales</h4>
    <p class="card-text">Compare regions and spot trends before the close.</p>
    <div class="card-foot"><span class="card-meta">Updated yesterday</span><a class="card-link" href="#">Open</a></div>
  </div>
</article>`,
  rules: [
    "Use a card only when content is a distinct object (an item, a record, a summary). Do not wrap every section in a card.",
    "One card style per app: same radius, border and shadow everywhere. Vary hierarchy with content, not with new card styles.",
    "If the whole card is clickable, expose a single link with a clear name and make the rest non-interactive.",
    "Padding uses --pad. Never nest a bordered card inside another bordered card.",
  ],
  demo,
  variants: [
    {
      id: "bordered", name: "Bordée", desc: "Fond de surface et filet fin, à plat.", tags: ["Net", "Sobre"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Surface fill with a hairline border, no shadow, radius-surface.", "Hover only darkens the border; nothing moves."],
      css: `
& .card{border:var(--border-w) solid var(--border)}
& .card:hover{border-color:var(--border-strong)}`,
    },
    {
      id: "shadow", name: "Ombrée", desc: "Sans bordure, élevée par une ombre diffuse.", tags: ["Doux", "Aérien"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["No border; separation comes from shadow-md over the page background.", "Hover deepens to shadow-lg."],
      css: `
& .card{border:0;box-shadow:var(--shadow-md)}
& .card:hover{box-shadow:var(--shadow-lg)}`,
    },
    {
      id: "lift", name: "Soulevée", desc: "Bordure fine, monte et s'ombre au survol.", tags: ["Interactif", "Moderne"],
      attrs: { shape: "inherit", depth: "lift", energy: "crisp" },
      spec: ["Hairline border and a small resting shadow.", "Hover raises the card 3px and applies shadow-md with a faster transition; use for clickable cards only."],
      css: `
& .card{border:var(--border-w) solid var(--border);box-shadow:var(--shadow-sm)}
& .card:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);border-color:var(--border-strong)}`,
    },
    {
      id: "accent", name: "Liseré", desc: "Filet d'accent en haut, contour fin.", tags: ["Structuré", "Accent"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Hairline border plus a 3px accent bar on the top edge, above the media.", "Use the accent bar to mark featured or selected cards, not on every card."],
      css: `
& .card{border:var(--border-w) solid var(--border);border-top:3px solid var(--accent)}
& .card:hover{border-color:var(--border-strong);border-top-color:var(--accent)}`,
    },
    {
      id: "brut", name: "Brute", desc: "Contour épais et ombre dure décalée.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["2px text-colored border and a 5px hard offset shadow.", "Media is separated from the body by a 2px line.", "Hover shifts the card and grows the shadow."],
      css: `
& .card{border:2px solid var(--text);box-shadow:5px 5px 0 var(--text)}
& .card:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--text)}
& .card-media{border-bottom:2px solid var(--text)}
& .card-title{font-weight:800}`,
    },
    {
      id: "glass", name: "Verre", desc: "Panneau translucide flouté sur un fond coloré.", tags: ["Moderne", "Translucide"], stage: "mesh",
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["Surface at 55% opacity with backdrop blur(18px), a 1px light border and an inner top highlight.", "Only use over rich backgrounds; ensure text contrast on the worst case backdrop."],
      css: `
& .card{background:color-mix(in srgb,var(--surface) 55%,transparent);-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);border:1px solid color-mix(in srgb,var(--text) 14%,transparent);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),var(--shadow-md)}
& .card-media{background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 55%,transparent),color-mix(in srgb,var(--accent) 10%,transparent))}`,
    },
    {
      id: "filled", name: "Teintée", desc: "Aplat de fond subtil, aucune bordure ni ombre.", tags: ["Minimal", "Calme"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["bg-subtle fill, no border, no shadow; the media area is optional.", "Hover slightly deepens the fill."],
      css: `
& .card{background:var(--bg-subtle);border:0}
& .card:hover{background:color-mix(in srgb,var(--text) 6%,var(--bg-subtle))}`,
    },
    {
      id: "split", name: "Latérale", desc: "Image à gauche, texte à droite, format liste.", tags: ["Compact", "Liste"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Horizontal layout: a 96px media column on the left and the body on the right.", "Hairline border, no shadow; ideal for lists of items."],
      css: `
& .card{flex-direction:row;width:min(100%,360px);border:var(--border-w) solid var(--border)}
& .card-media{width:96px;height:auto;flex:none}
& .card-media::after{display:none}
& .card-text{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
& .card:hover{border-color:var(--border-strong)}`,
    },
    {
      id: "polaroid", name: "Polaroïd", desc: "Cadre photo blanc épais, légère rotation, légende dessous.", tags: ["Chaleureux", "Album"],
      attrs: { shape: "sharp", depth: "soft", energy: "friendly" },
      spec: ["Radius-sm frame with 10px padding on top and sides, hairline border and shadow-md; the media sits inside the frame with square corners.", "Card is rotated -1.5deg at rest and straightens on hover; the body is centered like a handwritten caption."],
      css: `
& .card{padding:10px 10px 0;border:1px solid var(--border);border-radius:var(--r-sm);box-shadow:var(--shadow-md);transform:rotate(-1.5deg)}
& .card:hover{transform:rotate(0) translateY(-2px);box-shadow:var(--shadow-lg)}
& .card-media{height:120px;border-radius:0}
& .card-body{padding:14px 6px 16px;text-align:center;justify-items:center}
& .card-foot{width:100%;justify-content:center;gap:16px}`,
    },
    {
      id: "ticket", name: "Ticket", desc: "Deux volets séparés par une perforation et deux encoches.", tags: ["Événement", "Distinct"],
      attrs: { shape: "inherit", depth: "outline", energy: "playful" },
      spec: ["Media and body are split by a 2px dashed strong-border line; two 20px half-circle notches, filled with the page background, bite into the left and right edges at the perforation.", "Hairline outer border, no shadow. Suits tickets, coupons, bookings and passes."],
      css: `
& .card{border:var(--border-w) solid var(--border)}
& .card-body{position:relative;border-top:2px dashed var(--border-strong)}
& .card-body::before,& .card-body::after{content:'';position:absolute;top:-11px;width:20px;height:20px;border-radius:50%;background:var(--bg);border:var(--border-w) solid var(--border-strong)}
& .card-body::before{left:-11px}
& .card-body::after{right:-11px}
& .card:hover{border-color:var(--border-strong)}`,
    },
    {
      id: "corner", name: "Coin plié", desc: "Angle supérieur droit coupé et replié, comme une feuille.", tags: ["Document", "Papier"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Top-right corner is cut with a 30px clip-path diagonal and covered by a folded triangle in a darker surface tone.", "Hairline border on the remaining edges, no radius; hover grows the fold to 38px."],
      css: `
& .card{position:relative;border:var(--border-w) solid var(--border);border-radius:0;clip-path:polygon(0 0,calc(100% - 30px) 0,100% 30px,100% 100%,0 100%);transition:clip-path var(--dur) var(--ease)}
& .card::after{content:'';position:absolute;top:0;right:0;width:30px;height:30px;z-index:1;background:linear-gradient(225deg,transparent 50%,color-mix(in srgb,var(--text) 14%,var(--surface)) 50%);box-shadow:-2px 2px 4px -2px color-mix(in srgb,var(--text) 25%,transparent);transition:width var(--dur) var(--ease),height var(--dur) var(--ease)}
& .card:hover{clip-path:polygon(0 0,calc(100% - 38px) 0,100% 38px,100% 100%,0 100%)}
& .card:hover::after{width:38px;height:38px}`,
    },
    {
      id: "gradient", name: "Bordure dégradée", desc: "Contour en dégradé d'accent autour d'un cœur uni.", tags: ["Vivant", "Moderne"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["2px transparent border painted with a 135deg accent-to-info-to-success gradient (border-box), over a surface fill (padding-box).", "A tinted accent glow appears on hover; keep for featured cards."],
      css: `
& .card{border:2px solid transparent;background:linear-gradient(var(--surface),var(--surface)) padding-box,linear-gradient(135deg,var(--accent),var(--info),var(--success)) border-box}
& .card:hover{box-shadow:0 8px 24px -8px color-mix(in srgb,var(--accent) 55%,transparent)}`,
    },
    {
      id: "neo", name: "Néomorphe", desc: "Relief moulé dans le fond de page, ombres jumelles.", tags: ["Tactile", "Doux"],
      attrs: { shape: "round", depth: "soft", energy: "calm" },
      spec: ["Fill equals the page background; depth comes from a dark shadow offset bottom-right (10px blur) and a light shadow offset top-left.", "The media is inset into the surface with an inner shadow; no borders. Hover flattens the relief to a smaller offset."],
      css: `
& .card{background:var(--bg);border:0;padding:10px;box-shadow:8px 8px 18px color-mix(in srgb,var(--text) 16%,transparent),-8px -8px 18px color-mix(in srgb,var(--surface-raised) 85%,white)}
& .card:hover{box-shadow:4px 4px 10px color-mix(in srgb,var(--text) 14%,transparent),-4px -4px 10px color-mix(in srgb,var(--surface-raised) 85%,white)}
& .card-media{border-radius:var(--r-control);box-shadow:inset 3px 3px 8px color-mix(in srgb,var(--text) 22%,transparent)}`,
    },
    {
      id: "header", name: "En-tête coloré", desc: "Bandeau d'accent uni en haut, corps bordé dessous.", tags: ["Structuré", "Marqué"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["The media becomes a 48px solid accent band with a subtle dotted pattern in the contrast color at 22%.", "Body sits under a hairline border on the other three sides; the header and body are visually one object."],
      css: `
& .card{border:var(--border-w) solid var(--border)}
& .card-media{height:48px;background:var(--accent)}
& .card-media::after{left:0;right:0;top:0;bottom:0;height:auto;border-radius:0;opacity:1;background:radial-gradient(color-mix(in srgb,var(--accent-contrast) 22%,transparent) 1.5px,transparent 2px) 0 0/12px 12px}
& .card:hover{border-color:var(--border-strong)}`,
    },
    {
      id: "rule", name: "Filet éditorial", desc: "Sans fond ni cadre : un filet noir, du texte, rien d'autre.", tags: ["Éditorial", "Minimal"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Transparent background, no border or shadow: a 2px text-colored rule on top, and the media is dropped in favor of typography.", "Title grows to fs-xl in the display font; the footer is set off by a hairline. Hover underlines the link and turns the rule to accent."],
      css: `
& .card{background:transparent;border-top:2px solid var(--text);border-radius:0;overflow:visible}
& .card-media{display:none}
& .card-body{padding:14px 0 0}
& .card-title{font-size:var(--fs-xl);line-height:1.15}
& .card-foot{padding-top:10px;margin-top:6px;border-top:1px solid var(--border)}
& .card:hover{border-top-color:var(--accent)}`,
    },
    {
      id: "bento", name: "Bento", desc: "Plusieurs tuiles arrondies séparées : image, texte, infos, action.", tags: ["Moderne", "Modulaire"],
      attrs: { shape: "round", depth: "flat", energy: "friendly" },
      spec: ["The card has no shell: a grid with 6px gaps whose tiles each have their own fill and radius. The media tile stands alone; the body tile is bg-subtle and nests two smaller tiles.", "Meta sits on a surface tile and the link on an accent-soft tile that deepens on hover."],
      css: `
& .card{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:transparent;overflow:visible;border-radius:0}
& .card-media,& .card-body{grid-column:1 / -1}
& .card-media{border-radius:var(--r-surface);overflow:hidden;height:96px}
& .card-body{background:var(--bg-subtle);border-radius:var(--r-surface);padding:6px}
& .card-title{padding:10px 10px 0}
& .card-text{padding:0 10px}
& .card-foot{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px}
& .card-meta,& .card-link{display:flex;align-items:center;padding:12px;border-radius:var(--r-control)}
& .card-meta{background:var(--surface)}
& .card-link{justify-content:center;background:var(--accent-soft);transition:background var(--dur) var(--ease)}
& .card-link:hover{text-decoration:none;background:color-mix(in srgb,var(--accent) 22%,var(--surface))}`,
    },
  ],
};
