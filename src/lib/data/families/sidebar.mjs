import { ic } from "../icons.mjs";

const base = `
& .side{display:flex;flex-direction:column;gap:2px;width:224px;height:100%;padding:14px 12px;background:var(--surface);color:var(--text);font-family:var(--font-body);border-right:var(--border-w) solid var(--border)}
& .side .logo{display:inline-flex;align-items:center;gap:9px;padding:6px 10px 14px;font:var(--heading-weight) var(--fs-lg)/1 var(--font-display);letter-spacing:var(--heading-tracking);color:inherit;text-decoration:none}
& .side .logo-mark{position:relative;display:inline-block;width:22px;height:22px;border-radius:var(--r-sm);background:var(--accent)}
& .side .logo-mark::after{content:'';position:absolute;inset:6px;border-radius:50%;background:var(--accent-contrast)}
& .side-group{display:grid;gap:2px}
& .side-label{padding:12px 10px 4px;font:600 11.5px/1 var(--font-body);color:var(--text-muted)}
& .side-link{position:relative;display:flex;align-items:center;gap:10px;height:36px;padding:0 10px;font:500 var(--fs-sm)/1 var(--font-body);color:var(--text-muted);text-decoration:none;border-radius:var(--r-control);transition:color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .side-link .ic{width:18px;height:18px;flex:none}
& .side-link:hover{color:var(--text);background:var(--bg-subtle)}
& .side-link:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
& .side-link[aria-current=page]{color:var(--text);background:var(--bg-subtle)}
& .side-link .count{margin-left:auto;font-size:11px;font-variant-numeric:tabular-nums;color:var(--text-muted)}
& .side-user{display:flex;align-items:center;gap:10px;margin-top:auto;padding:12px 10px 4px;border-top:1px solid var(--border);font-size:var(--fs-sm)}
& .avatar{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:50%;background:var(--accent-soft);color:var(--accent-text);font:700 11px/1 var(--font-body)}
& .side-user small{display:block;color:var(--text-muted);font-size:11.5px}
`;

const link = (icon, text, extra = "", cur = false) => `<a class="side-link" href="#" data-tip="${text}"${cur ? ' aria-current="page"' : ""}>${ic(icon)}<span class="side-text">${text}</span>${extra}</a>`;

const demo = () => `<div class="side-demo"><aside class="side"><a class="logo" href="#"><i class="logo-mark"></i><span class="side-text">Nomade</span></a>
<div class="side-group"><span class="side-label">Principal</span>${link("home", "Tableau de bord", "", true)}${link("folder", "Projets", '<span class="count">12</span>')}${link("chart", "Rapports")}</div>
<div class="side-group"><span class="side-label">Équipe</span>${link("user", "Membres", '<span class="count">5</span>')}${link("mail", "Messages", '<span class="count">3</span>')}${link("settings", "Réglages")}</div>
<div class="side-user"><span class="avatar">CM</span><span class="side-text">Camille M.<small>Plan Pro</small></span></div></aside><div class="side-main"><div class="faux"><i style="width:40%"></i><i style="width:76%"></i><i style="width:62%"></i><i style="width:70%"></i></div></div></div>`;

export default {
  id: "sidebar", label: "Barre latérale", group: "Structure", icon: "f_sidebar", size: "md", fit: 480, fitMax: 1.1,
  desc: "La navigation d'une application : classique, groupée, rail d'icônes, flottante, inversée.",
  base,
  snippet: `<aside class="side">
  <a class="logo" href="/"><i class="logo-mark"></i><span class="side-text">Brand</span></a>
  <div class="side-group"><span class="side-label">Main</span>
    <a class="side-link" href="/" aria-current="page" data-tip="Dashboard"><svg class="ic">…</svg><span class="side-text">Dashboard</span></a>
    <a class="side-link" href="/projects" data-tip="Projects"><svg class="ic">…</svg><span class="side-text">Projects</span><span class="count">12</span></a>
  </div>
  <div class="side-user"><span class="avatar">CM</span><span class="side-text">Camille M.<small>Pro plan</small></span></div>
</aside>`,
  rules: [
    "Group items by task the user performs; at most two levels deep. Icons are 18px from one set with one stroke width.",
    "Wrap in <nav aria-label=\"App\">, mark the current item with aria-current=\"page\". Counts only when actionable.",
    "The collapsed rail keeps accessible names and shows a tooltip on hover and focus.",
    "Below ~1024px the sidebar becomes an overlay drawer opened from a topbar button.",
  ],
  demo,
  variants: [
    {
      id: "classic", name: "Classique", desc: "Liste simple, l'élément actif est surligné.", tags: ["Sobre", "Standard"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["224px column on the surface color with a hairline right border.", "Group labels are hidden; items separated by spacing only.", "Current item uses a bg-subtle fill and text color."],
      css: `
& .side-label{display:none}
& .side-group + .side-group{margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}`,
    },
    {
      id: "grouped", name: "Groupée", desc: "Sections titrées, actif teinté avec liseré d'accent.", tags: ["Structuré", "Riche"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Visible group labels in text-muted; the current item is an accent-soft fill with accent-text and a 2px accent bar on the inner-left edge.", "Counts sit right-aligned in tabular numerals."],
      css: `
& .side-link[aria-current=page]{background:var(--accent-soft);color:var(--accent-text)}
& .side-link[aria-current=page]::before{content:'';position:absolute;left:-12px;top:8px;bottom:8px;width:2px;border-radius:2px;background:var(--accent)}`,
    },
    {
      id: "rail", name: "Rail d'icônes", desc: "Colonne étroite d'icônes avec info-bulles.", tags: ["Compact", "Dense"],
      attrs: { shape: "inherit", depth: "outline", energy: "technical" },
      spec: ["68px column with centered 44px icon buttons and tooltips on hover and focus; text, labels and counts are hidden.", "Current item is an accent-soft square with accent-text icon."],
      css: `
& .side{width:68px;align-items:center;padding:14px 10px}
& .side-text,& .side-label,& .side-link .count{display:none}
& .side .logo{padding:6px 0 14px}
& .side-link{width:44px;height:44px;justify-content:center;padding:0}
& .side-link .ic{width:20px;height:20px}
& .side-link[aria-current=page]{background:var(--accent-soft);color:var(--accent-text)}
& .side-link::after{content:attr(data-tip);position:absolute;left:calc(100% + 12px);top:50%;transform:translateY(-50%);padding:5px 9px;border-radius:var(--r-sm);background:var(--text);color:var(--bg);font-size:12px;white-space:nowrap;opacity:0;pointer-events:none;z-index:5;transition:opacity var(--dur) var(--ease)}
& .side-link:hover::after,& .side-link:focus-visible::after{opacity:1}
& .side-user{justify-content:center;padding:12px 0 4px}
& .side-group{justify-items:center}`,
    },
    {
      id: "floating", name: "Flottante", desc: "Panneau détaché avec marge, coins arrondis et ombre.", tags: ["Moderne", "Aéré"],
      attrs: { shape: "round", depth: "soft", energy: "friendly" },
      spec: ["The sidebar is a card inset 12px from the edges with radius-surface, shadow-md and no right border.", "Page background is bg-subtle so the panel reads as raised.", "Current item uses an accent-soft pill."],
      css: `
& .side-demo{background:var(--bg-subtle)}
& .side{margin:12px 0 12px 12px;height:auto;border:1px solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-md)}
& .side-label{display:none}
& .side-link{border-radius:var(--r-control)}
& .side-link[aria-current=page]{background:var(--accent-soft);color:var(--accent-text)}`,
    },
    {
      id: "inverse", name: "Inversée", desc: "Colonne sombre (ou claire en mode sombre), accent vif.", tags: ["Contrasté", "Premium"],
      attrs: { shape: "inherit", depth: "flat", energy: "premium" },
      spec: ["Column filled with the inverse surface (text color) and inverse text; separators use 14% mixes.", "Current item uses the accent color as fill with accent-contrast label.", "Group labels stay visible in a dimmed inverse tone."],
      css: `
& .side{background:var(--text);color:var(--bg);border-right:0}
& .side-label{color:color-mix(in srgb,var(--bg) 55%,var(--text))}
& .side-link{color:color-mix(in srgb,var(--bg) 72%,var(--text))}
& .side-link:hover{color:var(--bg);background:color-mix(in srgb,var(--bg) 12%,transparent)}
& .side-link[aria-current=page]{background:var(--accent);color:var(--accent-contrast)}
& .side-link .count{color:inherit;opacity:.7}
& .side-user{border-top-color:color-mix(in srgb,var(--bg) 16%,transparent)}
& .side-user small{color:color-mix(in srgb,var(--bg) 55%,var(--text))}
& .avatar{background:var(--accent);color:var(--accent-contrast)}`,
    },
    {
      id: "fold", name: "Sections repliables", desc: "Groupes avec chevron qui se replient au clic.", tags: ["Dense", "Structuré"],
      attrs: { shape: "inherit", depth: "outline", energy: "technical" },
      spec: ["Each group is a <details> whose summary is an uppercase 11.5px muted label with a 14px chevron on the right; the chevron points right when closed and down when open.", "Summary hover shows a bg-subtle fill and text color; open state is remembered per group by the app.", "Items inside keep the standard 36px rows; the current item uses a bg-subtle fill."],
      snippet: `<aside class="side">
  <a class="logo" href="/">…</a>
  <details class="side-fold" open>
    <summary>Main <svg class="ic">…</svg></summary>
    <div class="side-group"><a class="side-link" aria-current="page" href="/">…</a>…</div>
  </details>
  <details class="side-fold"><summary>Settings <svg class="ic">…</svg></summary>…</details>
</aside>`,
      demo: () => `<div class="side-demo"><aside class="side"><a class="logo" href="#"><i class="logo-mark"></i><span class="side-text">Nomade</span></a>
<details class="side-fold" open><summary>Principal ${ic("chevron", 14)}</summary><div class="side-group">${link("home", "Tableau de bord", "", true)}${link("folder", "Projets", '<span class="count">12</span>')}${link("chart", "Rapports")}</div></details>
<details class="side-fold" open><summary>Équipe ${ic("chevron", 14)}</summary><div class="side-group">${link("user", "Membres", '<span class="count">5</span>')}${link("mail", "Messages", '<span class="count">3</span>')}</div></details>
<details class="side-fold"><summary>Configuration ${ic("chevron", 14)}</summary><div class="side-group">${link("settings", "Réglages")}${link("lock", "Sécurité")}</div></details>
<div class="side-user"><span class="avatar">CM</span><span class="side-text">Camille M.<small>Plan Pro</small></span></div></aside><div class="side-main"><div class="faux"><i style="width:40%"></i><i style="width:76%"></i><i style="width:62%"></i><i style="width:70%"></i></div></div></div>`,
      css: `
& .side-fold{display:grid;gap:2px}
& .side-fold > summary{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:var(--r-control);color:var(--text-muted);font:600 11.5px/1 var(--font-body);letter-spacing:.05em;text-transform:uppercase;list-style:none;cursor:pointer;transition:color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .side-fold > summary::-webkit-details-marker{display:none}
& .side-fold > summary:hover{color:var(--text);background:var(--bg-subtle)}
& .side-fold > summary:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
& .side-fold > summary .ic{width:14px;height:14px;transition:transform var(--dur) var(--ease)}
& .side-fold[open] > summary .ic{transform:rotate(90deg)}
& .side-fold .side-group{padding-bottom:2px}`,
    },
    {
      id: "workspace", name: "Espace de travail", desc: "Sélecteur d'espace en tête, favoris épinglés dessous.", tags: ["Multi-espace", "Outil"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["The column opens with a full-width workspace switcher: 28px accent badge with the initial, workspace name over the plan in muted small text, and a chevron; bg-subtle fill, 1px border, strengthens on hover.", "Below: the main links, then a 'Favoris' label with pinned items marked by a star.", "Current item uses an accent-soft fill with accent-text."],
      snippet: `<aside class="side">
  <button class="side-ws" aria-haspopup="menu"><span class="ws-badge">N</span><span class="side-text">Brand Studio<small>Pro plan</small></span><svg class="ic">…</svg></button>
  <div class="side-group"><a class="side-link" aria-current="page">…</a>…</div>
  <div class="side-group"><span class="side-label">Favorites</span><a class="side-link">…</a></div>
  <div class="side-user">…</div>
</aside>`,
      demo: () => `<div class="side-demo"><aside class="side"><button class="side-ws" type="button" aria-haspopup="menu"><span class="ws-badge">N</span><span class="side-text">Nomade<small>Studio · Plan Pro</small></span>${ic("chevron", 16)}</button>
<div class="side-group">${link("home", "Tableau de bord", "", true)}${link("folder", "Projets", '<span class="count">12</span>')}${link("chart", "Rapports")}</div>
<div class="side-group"><span class="side-label">Favoris</span>${link("star", "Atelier Lune")}${link("star", "Studio Verdier")}</div>
<div class="side-user"><span class="avatar">CM</span><span class="side-text">Camille M.<small>Admin</small></span></div></aside><div class="side-main"><div class="faux"><i style="width:40%"></i><i style="width:76%"></i><i style="width:62%"></i><i style="width:70%"></i></div></div></div>`,
      css: `
& .side-ws{display:flex;align-items:center;gap:10px;width:100%;margin-bottom:10px;padding:8px 10px;border:1px solid var(--border);border-radius:var(--r-control);background:var(--bg-subtle);color:var(--text);font:600 var(--fs-sm)/1.2 var(--font-body);text-align:left;cursor:pointer;transition:border-color var(--dur) var(--ease)}
& .side-ws:hover{border-color:var(--border-strong)}
& .side-ws:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .side-ws .side-text{flex:1;min-width:0}
& .side-ws small{display:block;font-weight:400;font-size:11.5px;color:var(--text-muted)}
& .side-ws > .ic{flex:none;color:var(--text-muted)}
& .ws-badge{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:var(--r-sm);background:var(--accent);color:var(--accent-contrast);font:700 13px/1 var(--font-display)}
& .side-group + .side-group{margin-top:6px}
& .side-link[aria-current=page]{background:var(--accent-soft);color:var(--accent-text)}`,
    },
    {
      id: "cards", name: "Cartes séparées", desc: "Logo, navigation et profil dans des cartes distinctes.", tags: ["Modulaire", "Moderne"],
      attrs: { shape: "round", depth: "soft", energy: "friendly" },
      spec: ["The column itself is transparent on a bg-subtle page; the logo, each link group and the profile are separate surface cards (radius-surface, 1px border, shadow-sm) with 8px gaps.", "Group labels are hidden; the current item uses an accent-soft fill.", "The profile card sticks to the bottom."],
      css: `
& .side-demo{background:var(--bg-subtle)}
& .side{gap:8px;padding:12px;background:transparent;border-right:0}
& .side .logo,& .side-group,& .side-user{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-sm)}
& .side .logo{padding:11px 14px}
& .side-group{padding:5px}
& .side-label{display:none}
& .side-user{margin-top:auto;padding:10px 12px}
& .side-link{height:34px}
& .side-link[aria-current=page]{background:var(--accent-soft);color:var(--accent-text)}`,
    },
    {
      id: "terminal", name: "Terminal", desc: "Monospace, préfixes de ligne et compteurs entre crochets.", tags: ["Développeur", "Technique"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Whole column set in the mono face at 12px on a bg-subtle fill with a strong right border; icons are hidden.", "Group labels read like comments ('# principal' style, prefixed by '#'); links are prefixed by a muted '›' and counts appear as [12].", "The current item shows '>' in accent-text with a surface fill and a 2px accent bar on the left; groups are separated by dashed rules."],
      css: `
& .side{background:var(--bg-subtle);border-right:1px solid var(--border-strong);font-family:var(--font-mono)}
& .side .logo{padding:6px 10px 12px;font:700 var(--fs-sm)/1 var(--font-mono);letter-spacing:0}
& .side .logo-mark{border-radius:0}
& .side-group + .side-group{margin-top:6px;padding-top:6px;border-top:1px dashed var(--border-strong)}
& .side-label{padding:8px 10px 6px;font:400 11px/1 var(--font-mono);text-transform:lowercase}
& .side-label::before{content:'# '}
& .side-link{height:30px;gap:8px;border-radius:0;font:400 var(--fs-xs)/1 var(--font-mono)}
& .side-link .ic{display:none}
& .side-link::before{content:'›';color:var(--text-muted)}
& .side-link[aria-current=page]{background:var(--surface);color:var(--text);font-weight:700;box-shadow:inset 2px 0 0 var(--accent)}
& .side-link[aria-current=page]::before{content:'>';color:var(--accent-text)}
& .side-link .count::before{content:'['}
& .side-link .count::after{content:']'}
& .side-user{border-top:1px dashed var(--border-strong);font-size:var(--fs-xs)}
& .avatar{border-radius:0;font-family:var(--font-mono)}`,
    },
    {
      id: "iconlabel", name: "Icône et libellé", desc: "Rail large : icône au-dessus d'un libellé court.", tags: ["Compact", "Lisible"],
      attrs: { shape: "round", depth: "outline", energy: "calm" },
      spec: ["88px rail; each item stacks a 22px icon over an 11px label (one short word) in a 54px-high tile, centered.", "Current tile uses an accent-soft fill with accent-text; counts become a 16px round badge on the icon's top-right corner.", "No tooltips needed because labels stay visible."],
      snippet: `<aside class="side">
  <a class="logo" href="/" aria-label="Brand"><i class="logo-mark"></i></a>
  <a class="side-link" href="/" aria-current="page"><svg class="ic">…</svg><span class="side-text">Home</span></a>
  <a class="side-link" href="/messages"><svg class="ic">…</svg><span class="side-text">Inbox</span><span class="count">3</span></a>
  <div class="side-user"><span class="avatar">CM</span></div>
</aside>`,
      demo: () => `<div class="side-demo"><aside class="side"><a class="logo" href="#" aria-label="Nomade"><i class="logo-mark"></i></a>
${link("home", "Accueil", "", true)}${link("folder", "Projets")}${link("chart", "Rapports")}${link("mail", "Messages", '<span class="count">3</span>')}${link("settings", "Réglages")}
<div class="side-user"><span class="avatar" title="Camille M.">CM</span></div></aside><div class="side-main"><div class="faux"><i style="width:40%"></i><i style="width:76%"></i><i style="width:62%"></i><i style="width:70%"></i></div></div></div>`,
      css: `
& .side{width:88px;align-items:stretch;padding:14px 10px}
& .side .logo{justify-content:center;padding:6px 0 14px}
& .side-link{flex-direction:column;justify-content:center;gap:5px;height:54px;padding:0;font-size:11px;border-radius:var(--r-surface)}
& .side-link .ic{width:22px;height:22px}
& .side-link[aria-current=page]{background:var(--accent-soft);color:var(--accent-text)}
& .side-link .count{position:absolute;top:5px;right:14px;display:grid;place-items:center;min-width:16px;height:16px;padding:0 4px;border-radius:var(--r-full);background:var(--accent);color:var(--accent-contrast);font-weight:700}
& .side-user{justify-content:center;padding:12px 0 4px}`,
    },
  ],
};
