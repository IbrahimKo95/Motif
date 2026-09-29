import { ic, LOGO } from "../icons.mjs";

const base = `
& .nav{display:flex;align-items:center;gap:24px;width:100%;height:64px;padding:0 24px;font-family:var(--font-body);color:var(--text);background:var(--bg)}
& .logo{display:inline-flex;align-items:center;gap:9px;font:var(--heading-weight) var(--fs-lg)/1 var(--font-display);letter-spacing:var(--heading-tracking);color:inherit;text-decoration:none}
& .logo-mark{position:relative;display:inline-block;width:22px;height:22px;border-radius:var(--r-sm);background:var(--accent)}
& .logo-mark::after{content:'';position:absolute;inset:6px;border-radius:50%;background:var(--accent-contrast)}
& .nav-links{display:flex;gap:2px;list-style:none;margin:0;padding:0}
& .nav-link{display:inline-flex;align-items:center;height:36px;padding:0 12px;font:500 var(--fs-sm)/1 var(--font-body);color:var(--text-muted);text-decoration:none;border-radius:var(--r-control);transition:color var(--dur) var(--ease),background var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .nav-link:hover{color:var(--text)}
& .nav-link:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .nav-link[aria-current=page]{color:var(--text)}
& .nav-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
@media (max-width:760px){& .nav-links{display:none}}
`;

const linkItems = (cur = 0) => ["Produit", "Tarifs", "Ressources", "Entreprise"].map((t, i) => `<li><a class="nav-link" href="#"${i === cur ? ' aria-current="page"' : ""}>${t}</a></li>`).join("");
const faux = `<div class="faux"><i style="width:46%"></i><i style="width:72%"></i><i style="width:58%"></i></div>`;

const std = (c, { wrapClass = "", primary = "btn-primary" } = {}) => `<div class="navdemo"><div class="nav-wrap ${wrapClass}"><header class="nav"><a class="logo" href="#"><i class="logo-mark"></i>Nomade</a><ul class="nav-links">${linkItems()}</ul><div class="nav-actions"><a class="nav-link" href="#">Connexion</a>${c.scope("buttons", `<button class="btn ${primary}">Essai gratuit</button>`)}</div></header></div>${faux}</div>`;

export default {
  id: "navbar", label: "Navbar", group: "Structure", icon: "f_navbar", size: "lg", fit: 800, deps: ["buttons"],
  desc: "La barre du haut de ton site : classique, flottante, centrée, verre, bloc coloré, e-commerce.",
  base,
  snippet: `<div class="nav-wrap">
  <header class="nav">
    <a class="logo" href="/"><i class="logo-mark"></i>Brand</a>
    <ul class="nav-links">
      <li><a class="nav-link" href="/product" aria-current="page">Product</a></li>
      <li><a class="nav-link" href="/pricing">Pricing</a></li>
    </ul>
    <div class="nav-actions"><a class="nav-link" href="/login">Sign in</a><a class="btn btn-primary" href="/signup">Start free trial</a></div>
  </header>
</div>`,
  rules: [
    "Logo left, 4 to 6 links, one primary action. The secondary action is a text link ('Sign in').",
    "Wrap in <nav aria-label=\"Main\"> in production; mark the current page with aria-current=\"page\".",
    "Below ~760px links collapse into a menu button that opens a full-height sheet with a focus trap; the primary action stays reachable.",
    "Sticky headers gain their border or shadow only after scroll. Provide a skip-to-content link before the nav.",
  ],
  demo: (c) => std(c),
  variants: [
    {
      id: "classic", name: "Classique", desc: "Logo à gauche, liens, action à droite, filet en dessous.", tags: ["Standard", "Net"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["64px bar on the page background with a hairline bottom border.", "Links are text-muted, the current one turns text color; hover only changes color.", "Actions on the far right: text link then primary button."],
      css: `
& .nav{border-bottom:var(--border-w) solid var(--border)}`,
    },
    {
      id: "floating", name: "Flottante", desc: "Îlot en pilule détaché du bord, avec ombre.", tags: ["Moderne", "Aéré"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["A detached, fully rounded island (max-width 720px, centered, 16px from the top) with surface fill, hairline border and shadow-md.", "Links are pills; the current link and hover use a bg-subtle fill.", "Content scrolls beneath it."],
      css: `
& .nav-wrap{padding:16px 24px}
& .nav{max-width:720px;margin:0 auto;height:56px;padding:0 10px 0 20px;gap:16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-full);box-shadow:var(--shadow-md)}
& .nav-link{border-radius:var(--r-full)}
& .nav-link:hover,& .nav-link[aria-current=page]{background:var(--bg-subtle)}`,
    },
    {
      id: "centered", name: "Logo centré", desc: "Liens à gauche, logo au centre, actions à droite.", tags: ["Éditorial", "Élégant"],
      attrs: { shape: "sharp", depth: "outline", energy: "editorial" },
      spec: ["Three-column grid: links left, logo centered in the display face at a larger size, actions right.", "Hairline bottom border; link hover draws an underline.", "Suits brands, magazines and stores with a strong wordmark."],
      css: `
& .nav{display:grid;grid-template-columns:1fr auto 1fr;height:72px;border-bottom:var(--border-w) solid var(--border)}
& .logo{grid-column:2;grid-row:1;justify-self:center;font-size:var(--fs-xl)}
& .nav-links{grid-column:1;grid-row:1}
& .nav-actions{grid-column:3;grid-row:1;justify-self:end}
& .nav-link{border-radius:0}
& .nav-link:hover{box-shadow:inset 0 -2px 0 currentColor}`,
    },
    {
      id: "minimal", name: "Épurée", desc: "Sans bordure ni fond, l'indicateur actif est un point.", tags: ["Minimal", "Aéré"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Transparent bar with no border; links pushed to the right of the logo group.", "The current link shows a 5px accent dot below the label instead of a background.", "Generous 76px height."],
      css: `
& .nav{height:76px;background:transparent}
& .nav-links{margin-left:auto}
& .nav-actions{margin-left:8px}
& .nav-link{position:relative;border-radius:0}
& .nav-link[aria-current=page]::after{content:'';position:absolute;left:50%;bottom:2px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:var(--accent)}`,
    },
    {
      id: "glass", name: "Verre", desc: "Barre translucide floutée au-dessus du contenu.", tags: ["Moderne", "Translucide"], stage: "mesh",
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["Sticky bar with surface at 55% opacity, backdrop blur(16px) saturate(1.5) and a 12% text-colored bottom border.", "Content scrolls visibly behind it; text keeps full text color for contrast."],
      css: `
& .nav{background:color-mix(in srgb,var(--surface) 55%,transparent);-webkit-backdrop-filter:blur(16px) saturate(1.5);backdrop-filter:blur(16px) saturate(1.5);border-bottom:1px solid color-mix(in srgb,var(--text) 12%,transparent)}
& .nav-link{color:var(--text)}
& .nav-link:hover{background:color-mix(in srgb,var(--surface) 55%,transparent)}`,
    },
    {
      id: "bold", name: "Bloc coloré", desc: "Barre pleine couleur d'accent, boutons en surface.", tags: ["Audacieux", "Marque"],
      attrs: { shape: "inherit", depth: "flat", energy: "playful" },
      spec: ["Full-width accent bar with accent-contrast text and logo (the mark inverts).", "Links use a softened contrast color; the current link gets a translucent contrast pill.", "The action button switches to the secondary (surface) style so it stays visible."],
      demo: (c) => std(c, { primary: "btn-secondary" }),
      css: `
& .nav{background:var(--accent);color:var(--accent-contrast)}
& .logo-mark{background:var(--accent-contrast)}
& .logo-mark::after{background:var(--accent)}
& .nav-link{color:color-mix(in srgb,var(--accent-contrast) 80%,var(--accent))}
& .nav-link:hover{color:var(--accent-contrast);background:color-mix(in srgb,var(--accent-contrast) 12%,transparent)}
& .nav-link[aria-current=page]{color:var(--accent-contrast);background:color-mix(in srgb,var(--accent-contrast) 16%,transparent)}`,
    },
    {
      id: "twotier", name: "Deux niveaux", desc: "Bandeau d'annonce, barre principale avec recherche, catégories.", tags: ["E-commerce", "Riche"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Top strip in inverse colors for one promo or utility message, main bar with logo, a wide search field and icon actions, then a category row under a hairline.", "Suits catalogues with many sections."],
      snippet: `<header>
  <div class="nav-top">Free delivery from €60</div>
  <div class="nav"><a class="logo">…</a><label class="nav-search"><input placeholder="Search products"></label><div class="nav-actions">…</div></div>
  <nav class="nav-cats"><a class="nav-link" aria-current="page">All</a><a class="nav-link">New</a>…</nav>
</header>`,
      demo: (c) => `<div class="navdemo"><div class="nav-top">Livraison offerte dès 60 € d'achat</div><header class="nav"><a class="logo" href="#"><i class="logo-mark"></i>Nomade</a><label class="nav-search">${ic("search", 16)}<input placeholder="Rechercher un produit" aria-label="Rechercher"></label><div class="nav-actions"><a class="nav-link" href="#" aria-label="Compte">${ic("user", 18)}</a><a class="nav-link" href="#" aria-label="Panier">${ic("cart", 18)}</a></div></header><nav class="nav-cats"><a class="nav-link" href="#" aria-current="page">Tout</a><a class="nav-link" href="#">Nouveautés</a><a class="nav-link" href="#">Sacs</a><a class="nav-link" href="#">Accessoires</a><a class="nav-link" href="#">Soldes</a></nav>${faux}</div>`,
      css: `
& .nav-top{display:grid;place-items:center;height:32px;background:var(--text);color:var(--bg);font:500 12px/1 var(--font-body)}
& .nav{height:68px;background:var(--bg)}
& .nav-search{display:flex;align-items:center;gap:8px;flex:1;max-width:380px;height:var(--control-h);padding:0 14px;margin-left:16px;background:var(--bg-subtle);border-radius:var(--r-control);color:var(--text-muted)}
& .nav-search input{flex:1;min-width:0;border:0;background:none;outline:none;font:400 var(--fs-sm) var(--font-body);color:var(--text)}
& .nav-cats{display:flex;gap:4px;padding:0 24px 10px;border-bottom:var(--border-w) solid var(--border);background:var(--bg)}
& .nav-cats .nav-link[aria-current=page]{box-shadow:inset 0 -2px 0 var(--accent);border-radius:0}`,
    },
    {
      id: "mega", name: "Méga-menu", desc: "Barre avec un panneau de navigation ouvert en dessous.", tags: ["Riche", "Catalogue"],
      attrs: { shape: "inherit", depth: "soft", energy: "crisp" },
      spec: ["Standard 64px bar with a hairline; the open entry shows a bg-subtle fill and a chevron pointing up (aria-expanded=true).", "Below the bar a full-width panel on the surface color with shadow-lg: three link columns (uppercase 11.5px muted heading, bold title + one-line description per item) and an accent-soft feature tile on the right.", "The panel is hidden below 760px where links collapse into the menu."],
      snippet: `<header class="nav">
  <a class="logo">…</a>
  <ul class="nav-links"><li><button class="nav-link" aria-expanded="true" aria-controls="mega">Product <svg class="ic">…</svg></button></li>…</ul>
  <div class="nav-actions">…</div>
</header>
<div class="mega" id="mega">
  <div class="mega-col"><h4>Invoicing</h4><a class="mega-item" href="#"><b>Quotes</b><span>Create and get them signed online</span></a>…</div>
  <aside class="mega-feat"><b>New</b><span>…</span></aside>
</div>`,
      demo: (c) => {
        const item = (t, d) => `<a class="mega-item" href="#"><b>${t}</b><span>${d}</span></a>`;
        return `<div class="navdemo"><header class="nav"><a class="logo" href="#"><i class="logo-mark"></i>Nomade</a><ul class="nav-links"><li><button class="nav-link" type="button" aria-expanded="true" aria-controls="${c.uid}-mega">Produit ${ic("chevron", 14)}</button></li><li><a class="nav-link" href="#">Tarifs</a></li><li><a class="nav-link" href="#">Ressources</a></li><li><a class="nav-link" href="#">Entreprise</a></li></ul><div class="nav-actions"><a class="nav-link" href="#">Connexion</a>${c.scope("buttons", `<button class="btn btn-primary">Essai gratuit</button>`)}</div></header><div class="mega" id="${c.uid}-mega"><div class="mega-col"><h4>Facturer</h4>${item("Devis", "Créez-les et faites-les signer en ligne")}${item("Factures", "Envoi et suivi en un clic")}</div><div class="mega-col"><h4>Encaisser</h4>${item("Relances", "Des rappels qui partent sans vous")}${item("Paiement par carte", "Vos clients paient depuis l'e-mail")}</div><div class="mega-col"><h4>Piloter</h4>${item("Trésorerie", "Ce qui rentre, ce qui reste à venir")}${item("Export comptable", "Un fichier prêt pour votre comptable")}</div><aside class="mega-feat"><b>Nouveau</b><span>Facture électronique, conforme dès 2026.</span></aside></div>${faux}</div>`;
      },
      css: `
& .nav{position:relative;z-index:1;border-bottom:var(--border-w) solid var(--border)}
& button.nav-link{border:0;background:none;cursor:pointer;gap:4px;font-family:var(--font-body)}
& .nav-link .ic{transition:transform var(--dur) var(--ease)}
& .nav-link[aria-expanded=true]{color:var(--text);background:var(--bg-subtle)}
& .nav-link[aria-expanded=false] .ic{transform:rotate(90deg)}
& .nav-link[aria-expanded=true] .ic{transform:rotate(-90deg)}
& .mega{display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) minmax(0,1.05fr);gap:8px 28px;padding:22px 24px 26px;background:var(--surface);border-bottom:var(--border-w) solid var(--border);box-shadow:var(--shadow-lg);color:var(--text);font-family:var(--font-body)}
& .mega-col{display:grid;gap:2px;align-content:start}
& .mega h4{margin:0 0 8px;font:600 11.5px/1 var(--font-body);text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)}
& .mega-item{display:grid;gap:3px;padding:9px 10px;margin:0 -10px;border-radius:var(--r-control);color:var(--text);text-decoration:none;transition:background var(--dur) var(--ease)}
& .mega-item b{font:600 var(--fs-sm)/1.3 var(--font-body)}
& .mega-item span{font-size:var(--fs-xs);line-height:1.4;color:var(--text-muted)}
& .mega-item:hover{background:var(--bg-subtle)}
& .mega-item:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
& .mega-feat{display:grid;gap:6px;align-content:end;padding:16px;border-radius:var(--r-surface);background:var(--accent-soft);color:var(--accent-text);font-size:var(--fs-sm);line-height:1.4}
& .mega-feat b{font:var(--heading-weight) var(--fs-lg)/1.1 var(--font-display);letter-spacing:var(--heading-tracking)}
@media (max-width:760px){& .mega{display:none}}`,
    },
    {
      id: "cmdk", name: "Recherche ⌘K", desc: "Champ de recherche central façon palette de commandes.", tags: ["Technique", "Outil"],
      attrs: { shape: "inherit", depth: "outline", energy: "technical" },
      spec: ["Bar with logo, three links, a centered command-palette trigger (max 340px, bg-subtle fill, 1px border, control radius) and a single primary action.", "The trigger shows a search icon, the placeholder 'Rechercher…' and a ⌘K key cap in mono type; hover strengthens the border.", "Below 760px the trigger shrinks to a square icon button."],
      snippet: `<header class="nav">
  <a class="logo">…</a>
  <ul class="nav-links">…</ul>
  <button class="nav-cmd" type="button" aria-label="Search (⌘K)"><svg class="ic">…</svg><span>Search…</span><kbd>⌘K</kbd></button>
  <div class="nav-actions"><a class="btn btn-primary">Start free</a></div>
</header>`,
      demo: (c) => `<div class="navdemo"><header class="nav"><a class="logo" href="#"><i class="logo-mark"></i>Nomade</a><ul class="nav-links"><li><a class="nav-link" href="#" aria-current="page">Produit</a></li><li><a class="nav-link" href="#">Tarifs</a></li><li><a class="nav-link" href="#">Docs</a></li></ul><button class="nav-cmd" type="button" aria-label="Rechercher (⌘K)">${ic("search", 16)}<span>Rechercher…</span><kbd>⌘K</kbd></button><div class="nav-actions">${c.scope("buttons", `<button class="btn btn-primary">Essai gratuit</button>`)}</div></header>${faux}</div>`,
      css: `
& .nav{gap:20px;border-bottom:var(--border-w) solid var(--border)}
& .nav-cmd{display:flex;align-items:center;gap:10px;flex:1;max-width:340px;height:var(--control-h);margin:0 auto;padding:0 8px 0 12px;border:1px solid var(--border);border-radius:var(--r-control);background:var(--bg-subtle);color:var(--text-muted);font:400 var(--fs-sm) var(--font-body);text-align:left;cursor:pointer;transition:border-color var(--dur) var(--ease),color var(--dur) var(--ease)}
& .nav-cmd span{flex:1}
& .nav-cmd:hover{border-color:var(--border-strong);color:var(--text)}
& .nav-cmd:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .nav-cmd kbd{padding:4px 6px;border:1px solid var(--border);border-radius:var(--r-sm);background:var(--surface);color:var(--text-muted);font:600 11px/1 var(--font-mono);box-shadow:0 1px 0 var(--border)}
& .nav-actions{margin-left:0}
@media (max-width:760px){& .nav-cmd{flex:none;width:var(--control-h);justify-content:center;margin:0 0 0 auto;padding:0}& .nav-cmd span,& .nav-cmd kbd{display:none}& .nav-actions{margin-left:0}}`,
    },
    {
      id: "tabs", name: "Onglets épais", desc: "Liens en capitales avec un gros soulignement d'accent.", tags: ["Net", "Typographique"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["72px bar; links stretch the full height, set in 12px uppercase bold with 0.08em tracking.", "A 4px bar sits on the bottom hairline: accent for the current link, border-strong on hover.", "No fills or radii anywhere; the underline is the only indicator."],
      css: `
& .nav{height:72px;gap:32px;border-bottom:var(--border-w) solid var(--border)}
& .nav-links{align-self:stretch;gap:4px}
& .nav-links li{display:flex}
& .nav-links .nav-link{position:relative;height:auto;padding:0 14px;border-radius:0;font-size:var(--fs-xs);font-weight:700;letter-spacing:.08em;text-transform:uppercase}
& .nav-links .nav-link::after{content:'';position:absolute;left:0;right:0;bottom:calc(var(--border-w) * -1);height:4px;background:transparent;transition:background var(--dur) var(--ease)}
& .nav-links .nav-link:hover::after{background:var(--border-strong)}
& .nav-links .nav-link[aria-current=page]::after{background:var(--accent)}
& .nav-links .nav-link:focus-visible{outline-offset:-4px}`,
    },
    {
      id: "dock", name: "Dock sombre", desc: "Pilule inversée centrée, action d'accent à l'intérieur.", tags: ["Premium", "Contrasté"],
      attrs: { shape: "pill", depth: "lift", energy: "premium" },
      spec: ["A centered pill (max-width 680px, 56px tall) filled with the inverse color (text) and inverse text, with shadow-lg, floating 16px from the top.", "Links are dimmed inverse pills; hover adds a 14% inverse fill; the current link is a solid accent pill with accent-contrast label.", "Links sit right after the logo; only the primary action stays on the right (the secondary text link is dropped to keep the pill compact)."],
      css: `
& .nav-wrap{padding:16px 24px}
& .nav{max-width:680px;height:56px;margin:0 auto;padding:0 8px 0 20px;gap:12px;background:var(--text);color:var(--bg);border-radius:var(--r-full);box-shadow:var(--shadow-lg)}
& .nav-links{margin-left:auto}
& .nav-actions{margin-left:0}
& .nav-actions .nav-link{display:none}
& .nav-link{border-radius:var(--r-full);color:color-mix(in srgb,var(--bg) 68%,var(--text))}
& .nav-link:hover{color:var(--bg);background:color-mix(in srgb,var(--bg) 14%,transparent)}
& .nav-link[aria-current=page]{color:var(--accent-contrast);background:var(--accent)}`,
    },
    {
      id: "brut", name: "Brute", desc: "Cadre à gros contour, ombre dure, lien actif plein.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["The bar is a framed box: 2px text-colored border, control radius and a 4px hard offset shadow, inset 14px from the page edges.", "Links are bold with a transparent 2px border that turns solid on hover; the current link is filled with the accent color and inverted text.", "Logo set at weight 800."],
      css: `
& .nav-wrap{padding:14px 24px 10px}
& .nav{height:60px;padding:0 12px 0 18px;background:var(--surface);border:2px solid var(--text);border-radius:var(--r-control);box-shadow:4px 4px 0 var(--text)}
& .logo{font-weight:800}
& .nav-link{border:2px solid transparent;color:var(--text);font-weight:700}
& .nav-link:hover{border-color:var(--text);background:var(--bg-subtle)}
& .nav-link[aria-current=page]{border-color:var(--text);background:var(--accent);color:var(--accent-contrast)}`,
    },
    {
      id: "announce", name: "Annonce + double action", desc: "Bandeau d'annonce teinté, deux boutons dans la barre.", tags: ["Conversion", "Marketing"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["A 40px accent-soft banner above the bar: a small solid 'Nouveau' tag, one announcement sentence and an arrow link, all centered in accent-text.", "The bar carries logo, three links and two actions: a secondary 'Réserver une démo' next to the primary trial button.", "Hairline under the bar; the banner is dropped below 760px."],
      snippet: `<header>
  <div class="nav-banner"><span class="nav-tag">New</span><span>E-invoicing 2026: Brand is ready.</span><a href="/news">Read more →</a></div>
  <div class="nav"><a class="logo">…</a><ul class="nav-links">…</ul><div class="nav-actions"><a class="btn btn-secondary">Book a demo</a><a class="btn btn-primary">Start free trial</a></div></div>
</header>`,
      demo: (c) => `<div class="navdemo"><div class="nav-banner"><span class="nav-tag">Nouveau</span><span>Facture électronique 2026 : Nomade est prêt.</span><a href="#">Lire l'annonce ${ic("arrow", 14)}</a></div><header class="nav"><a class="logo" href="#"><i class="logo-mark"></i>Nomade</a><ul class="nav-links"><li><a class="nav-link" href="#" aria-current="page">Produit</a></li><li><a class="nav-link" href="#">Tarifs</a></li><li><a class="nav-link" href="#">Ressources</a></li></ul><div class="nav-actions">${c.scope("buttons", `<button class="btn btn-secondary">Réserver une démo</button><button class="btn btn-primary">Essai gratuit</button>`)}</div></header>${faux}</div>`,
      css: `
& .nav-banner{display:flex;align-items:center;justify-content:center;gap:10px;min-height:40px;padding:0 16px;background:var(--accent-soft);color:var(--accent-text);font:500 var(--fs-xs)/1.3 var(--font-body)}
& .nav-tag{padding:3px 8px;border-radius:var(--r-full);background:var(--accent);color:var(--accent-contrast);font:700 11px/1 var(--font-body)}
& .nav-banner a{display:inline-flex;align-items:center;gap:4px;color:inherit;font-weight:700;text-decoration:underline;text-underline-offset:3px}
& .nav-banner a:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .nav{border-bottom:var(--border-w) solid var(--border)}
@media (max-width:760px){& .nav-banner{display:none}}`,
    },
  ],
};
