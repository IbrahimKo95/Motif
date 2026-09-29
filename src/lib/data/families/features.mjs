import { ic } from "../icons.mjs";

const base = `
& .ft{padding:72px 48px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .ft-head{display:grid;gap:12px;max-width:600px;margin:0 0 44px}
& .ft-eyebrow{margin:0;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--accent-text)}
& .ft-title{margin:0;font:var(--heading-weight) clamp(1.75rem,3.4cqi,2.5rem)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .ft-lead{margin:0;font-size:var(--fs-base);line-height:1.55;color:var(--text-muted)}
& .ft-ico{display:grid;place-items:center;flex:none;width:44px;height:44px;border-radius:var(--r-control);background:var(--accent-soft);color:var(--accent-text)}
& .ft-t{margin:0;font:var(--heading-weight) var(--fs-lg)/1.3 var(--font-display);letter-spacing:var(--heading-tracking)}
& .ft-p{margin:0;font-size:var(--fs-sm);line-height:1.6;color:var(--text-muted);text-wrap:pretty}
& .ft-list{list-style:none;margin:0;padding:0}
@media (max-width:820px){& .ft{padding:48px 20px}}
`;

const F = [
  { i: "folder", t: "Devis en deux minutes", p: "Partez d'un modèle, ajoutez vos prestations et envoyez un lien que le client signe depuis son téléphone." },
  { i: "circleCheck", t: "Factures conformes", p: "Numérotation séquentielle, mentions légales et TVA gérées pour vous, à jour à chaque évolution de la loi." },
  { i: "bell", t: "Relances automatiques", p: "Un rappel poli à J+3, J+10 et J+21. Vous gardez la main : suspendez un client d'un clic." },
  { i: "download", t: "Export comptable", p: "FEC, CSV ou accès lecture seule pour votre comptable. Fini le tri des justificatifs en fin de mois." },
  { i: "layers", t: "Multi-devises", p: "Facturez en euros, dollars ou livres. Le taux du jour est figé sur le document et converti au règlement." },
  { i: "lock", t: "Paiement en ligne", p: "Carte ou virement depuis le lien de la facture. Le paiement est rapproché sans aucune saisie." },
];

const head = (title = "Tout ce qu'il faut pour être payé, sans y passer vos soirées.", lead = "De l'offre envoyée à l'encaissement, Nomade prend en charge la paperasse d'un indépendant.") =>
  `<header class="ft-head"><p class="ft-eyebrow">Fonctionnalités</p><h3 class="ft-title">${title}</h3><p class="ft-lead">${lead}</p></header>`;
const ico = (n, s = 20) => `<span class="ft-ico" aria-hidden="true">${ic(n, s)}</span>`;
const two = (n) => String(n + 1).padStart(2, "0");

const snippet = `<section class="ft">
  <header class="ft-head"><p class="ft-eyebrow">Features</p><h2 class="ft-title">Everything you need to get paid</h2></header>
  <ul class="ft-list ft-grid">
    <li class="ft-item">
      <span class="ft-ico" aria-hidden="true"><!-- svg icon --></span>
      <h3 class="ft-t">Quotes in two minutes</h3>
      <p class="ft-p">Start from a template and send a link the client signs on their phone.</p>
    </li>
    <!-- more <li class="ft-item"> -->
  </ul>
</section>`;

const grid = (items) => `<ul class="ft-list ft-grid">${items.map((f) => `<li class="ft-item">${ico(f.i)}<h4 class="ft-t">${f.t}</h4><p class="ft-p">${f.p}</p></li>`).join("")}</ul>`;

const invoiceMock = `<div class="ft-mock" aria-hidden="true"><div class="ft-mock-top"><b>Facture F-2026-042</b><span class="ft-mock-tag">Payée</span></div><i class="ft-line w80"></i><i class="ft-line w60"></i><i class="ft-line w70"></i><div class="ft-mock-tot"><span>Total TTC</span><b>2 340,00 €</b></div></div>`;
const bars = `<div class="ft-mock ft-bars" aria-hidden="true"><i style="height:38%"></i><i style="height:55%"></i><i style="height:44%"></i><i style="height:72%"></i><i style="height:64%"></i><i style="height:92%"></i></div>`;
const remind = `<div class="ft-mock" aria-hidden="true"><div class="ft-rem"><span class="ft-dot"></span><i class="ft-line w70"></i><em>J+3</em></div><div class="ft-rem"><span class="ft-dot"></span><i class="ft-line w60"></i><em>J+10</em></div><div class="ft-rem off"><span class="ft-dot"></span><i class="ft-line w80"></i><em>J+21</em></div></div>`;

export default {
  id: "features", label: "Fonctionnalités", group: "Structure", icon: "f_features", size: "lg", fit: 900,
  desc: "Présenter les bénéfices : grille, bento, rangées alternées, coches, étapes, cartes, tableau éditorial.",
  base, snippet,
  rules: [
    "Lead with the benefit, then the mechanism: a title of 2 to 5 words and one or two sentences of at most 25 words. Keep to 3 to 8 features and order them by importance to the buyer.",
    "Use a consistent icon style (same stroke, same box size) across every item; icons are decorative and carry aria-hidden, the text carries the meaning.",
    "Use real list markup (ul/li, ol for sequences) and heading levels below the section title; never rely on hover to reveal essential content.",
    "Prefer one layout idea per section. If a feature needs proof, link to it instead of growing the card.",
  ],
  demo: () => `<section class="ft">${head()}${grid(F)}</section>`,
  variants: [
    {
      id: "grid", name: "Grille 3 colonnes", desc: "Icône, titre et texte en trois colonnes régulières.", tags: ["Classique", "Sobre"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Three equal columns with a 40px column gap and 40px row gap; each item stacks a 44px accent-soft icon tile, an 18px title and a 14px muted paragraph with 14px between them.", "No borders or shadows, so the rhythm comes from whitespace alone; collapses to one column below 820px."],
      css: `
& .ft-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
& .ft-item{display:grid;gap:14px;align-content:start;justify-items:start}
@media (max-width:820px){& .ft-grid{grid-template-columns:1fr;gap:28px}}`,
    },
    {
      id: "bento", name: "Bento", desc: "Mosaïque asymétrique avec une grande tuile vedette.", tags: ["Moderne", "Dense"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Four-column grid with 16px gaps: one 2x2 hero tile holding a CSS invoice mock-up, three 2x1 tiles and two 1x1 tiles, all bordered surface cards with the radius of the surface token.", "The hero tile uses an accent-soft background; other tiles are surface color with a 1px border, so the size contrast alone sets the hierarchy."],
      demo: () => `<section class="ft">${head("Un outil pour tout le cycle, pas dix onglets.")}<ul class="ft-list ft-bento">
<li class="ft-tile ft-hero"><div class="ft-copy">${ico(F[1].i)}<h4 class="ft-t">${F[1].t}</h4><p class="ft-p">${F[1].p}</p></div>${invoiceMock}</li>
${[2, 3, 4, 0, 5].map((k, n) => `<li class="ft-tile${n === 0 || n > 2 ? " ft-wide" : ""}">${ico(F[k].i)}<h4 class="ft-t">${F[k].t}</h4><p class="ft-p">${F[k].p}</p></li>`).join("")}</ul></section>`,
      css: `
& .ft-bento{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
& .ft-tile{display:grid;gap:12px;align-content:start;padding:22px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-sm);overflow:hidden}
& .ft-hero{grid-column:span 2;grid-row:span 2;background:var(--accent-soft);border-color:color-mix(in srgb,var(--accent) 25%,var(--border));align-content:space-between;gap:24px}
& .ft-wide{grid-column:span 2}
& .ft-copy{display:grid;gap:12px;align-content:start}
& .ft-hero .ft-ico{background:var(--surface);}
& .ft-hero .ft-p{color:var(--text)}
& .ft-mock{display:grid;gap:10px;padding:16px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-control);box-shadow:var(--shadow-md)}
& .ft-mock-top{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:var(--fs-sm)}
& .ft-mock-tag{padding:3px 9px;border-radius:var(--r-full);background:color-mix(in srgb,var(--success) 18%,transparent);color:var(--success);font-size:var(--fs-xs);font-weight:600}
& .ft-line{display:block;height:8px;border-radius:var(--r-full);background:var(--bg-subtle);border:0}
& .w80{width:80%}& .w70{width:70%}& .w60{width:60%}
& .ft-mock-tot{display:flex;justify-content:space-between;gap:12px;padding-top:10px;border-top:1px solid var(--border);font-size:var(--fs-sm);color:var(--text-muted)}
& .ft-mock-tot b{color:var(--text);font-variant-numeric:tabular-nums}
@media (max-width:820px){& .ft-bento{grid-template-columns:repeat(2,minmax(0,1fr))}& .ft-hero{grid-column:span 2;grid-row:auto}}
@media (max-width:520px){& .ft-bento{grid-template-columns:1fr}& .ft-hero,& .ft-wide{grid-column:auto}}`,
    },
    {
      id: "alternate", name: "Rangées alternées", desc: "Texte d'un côté, visuel de l'autre, en alternance.", tags: ["Narratif", "Aéré"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["Three full-width rows, each a 2-column split with a 64px gap; text and a 200px-tall CSS visual swap sides on every other row.", "Visuals sit in a bordered bg-subtle panel with the surface radius; rows are separated by 56px of space. Collapses to text above visual on narrow widths."],
      demo: () => {
        const v = [invoiceMock, remind, bars];
        const idx = [1, 2, 3];
        return `<section class="ft">${head("Trois gestes qui vous font gagner la semaine.")}<ul class="ft-list ft-rows">${idx.map((k, n) => `<li class="ft-row"><div class="ft-copy">${ico(F[k].i)}<h4 class="ft-t">${F[k].t}</h4><p class="ft-p">${F[k].p}</p></div><div class="ft-vis">${v[n]}</div></li>`).join("")}</ul></section>`;
      },
      css: `
& .ft-rows{display:grid;gap:56px}
& .ft-row{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
& .ft-row:nth-child(even) .ft-vis{order:-1}
& .ft-copy{display:grid;gap:14px;align-content:start;justify-items:start;max-width:38ch}
& .ft-vis{display:grid;place-items:center;min-height:200px;padding:28px;background:var(--bg-subtle);border:var(--border-w) solid var(--border);border-radius:var(--r-surface)}
& .ft-mock{display:grid;gap:10px;width:min(100%,280px);padding:16px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-control)}
& .ft-mock-top{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:var(--fs-sm)}
& .ft-mock-tag{padding:3px 9px;border-radius:var(--r-full);background:color-mix(in srgb,var(--success) 18%,transparent);color:var(--success);font-size:var(--fs-xs);font-weight:600}
& .ft-line{display:block;height:8px;border-radius:var(--r-full);background:var(--bg-subtle)}
& .w80{width:80%}& .w70{width:70%}& .w60{width:60%}
& .ft-mock-tot{display:flex;justify-content:space-between;gap:12px;padding-top:10px;border-top:1px solid var(--border);font-size:var(--fs-sm);color:var(--text-muted)}
& .ft-mock-tot b{color:var(--text);font-variant-numeric:tabular-nums}
& .ft-rem{display:flex;align-items:center;gap:10px}
& .ft-rem .ft-line{flex:1}
& .ft-rem em{font:normal 600 var(--fs-xs)/1 var(--font-mono);color:var(--accent-text)}
& .ft-dot{width:10px;height:10px;border-radius:var(--r-full);background:var(--accent)}
& .ft-rem.off .ft-dot{background:transparent;border:2px solid var(--border-strong)}
& .ft-rem.off em{color:var(--text-muted)}
& .ft-bars{grid-auto-flow:column;grid-auto-columns:1fr;align-items:end;gap:8px;height:150px}
& .ft-bars i{display:block;background:var(--accent);opacity:.85;border-radius:var(--r-sm) var(--r-sm) 0 0}
& .ft-bars i:last-child{opacity:1}
@media (max-width:820px){& .ft-row{grid-template-columns:1fr;gap:24px}& .ft-row:nth-child(even) .ft-vis{order:0}}`,
    },
    {
      id: "checks", name: "Liste à coches", desc: "Deux colonnes de bénéfices cochés, très lisibles.", tags: ["Lisible", "Rassurant"],
      attrs: { shape: "round", depth: "flat", energy: "calm" },
      spec: ["Split layout: header on the left (300px), a two-column checklist on the right with 20px column gap and 22px row gap.", "Each entry is a 22px round accent check badge followed by a bold 16px title and a 14px muted line; no card chrome. Best for 8 to 12 short benefits."],
      demo: () => {
        const more = [
          { t: "Signature électronique", p: "Vos devis signés valent accord, avec horodatage." },
          { t: "Modèles personnalisables", p: "Logo, couleurs et mentions à votre image." },
          { t: "Suivi du temps", p: "Transformez les heures passées en lignes de facture." },
          { t: "Accès pour le comptable", p: "Invitation gratuite en lecture seule." },
        ];
        const all = [
          { t: "Devis signés en ligne", p: "Le client signe depuis son téléphone." },
          { t: "Factures conformes", p: "Mentions légales et TVA à jour." },
          { t: "Relances automatiques", p: "Rappels à J+3, J+10 et J+21." },
          { t: "Export comptable", p: "FEC, CSV et accès comptable." },
          { t: "Multi-devises", p: "Taux du jour figé sur chaque document." },
          { t: "Paiement en ligne", p: "Carte ou virement, rapprochés seuls." },
          ...more,
        ];
        return `<section class="ft"><div class="ft-wrap">${head("Ce que vous obtenez dès le premier jour.", "Toutes les formules incluent l'essentiel. Pas d'option cachée derrière un palier.")}<ul class="ft-list ft-checks">${all.map((f) => `<li class="ft-chk"><span class="ft-tick" aria-hidden="true">${ic("check", 14)}</span><div><h4 class="ft-t">${f.t}</h4><p class="ft-p">${f.p}</p></div></li>`).join("")}</ul></div></section>`;
      },
      css: `
& .ft-wrap{display:grid;grid-template-columns:300px minmax(0,1fr);gap:48px;align-items:start}
& .ft-head{margin:0}
& .ft-checks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 20px}
& .ft-chk{display:flex;gap:12px;align-items:flex-start}
& .ft-tick{display:grid;place-items:center;flex:none;width:22px;height:22px;margin-top:1px;border-radius:var(--r-full);background:var(--accent);color:var(--accent-contrast)}
& .ft-chk .ft-t{font:600 var(--fs-base)/1.35 var(--font-body);letter-spacing:0;margin-bottom:2px}
@media (max-width:820px){& .ft-wrap{grid-template-columns:1fr;gap:28px}& .ft-checks{grid-template-columns:1fr}}`,
    },
    {
      id: "steps", name: "Étapes numérotées", desc: "Trois étapes reliées par un connecteur.", tags: ["Séquentiel", "Guidé"],
      attrs: { shape: "round", depth: "outline", energy: "friendly" },
      spec: ["Ordered list of three columns; each starts with a 40px numbered circle, joined to the next by a 2px horizontal connector line that runs behind the circles.", "Circles have a 2px accent border and accent-text numerals on the bg color; title and text sit centered below. Use only for true sequences of 3 to 5 steps."],
      demo: () => {
        const s = [
          { t: "Créez votre devis", p: "Choisissez un modèle, ajoutez vos prestations et envoyez le lien au client." },
          { t: "Facturez en un clic", p: "Le devis signé devient facture, avec la bonne numérotation et la TVA." },
          { t: "Encaissez sans relancer", p: "Le client paie en ligne ; en cas de retard, Nomade relance à votre place." },
        ];
        return `<section class="ft">${head("Du premier devis au virement en trois étapes.")}<ol class="ft-list ft-steps">${s.map((x, n) => `<li class="ft-step"><span class="ft-num" aria-hidden="true">${n + 1}</span><h4 class="ft-t">${x.t}</h4><p class="ft-p">${x.p}</p></li>`).join("")}</ol></section>`;
      },
      css: `
& .ft-head{margin-inline:auto;text-align:center;justify-items:center}
& .ft-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;counter-reset:s}
& .ft-step{position:relative;display:grid;gap:10px;justify-items:center;text-align:center;align-content:start}
& .ft-step:not(:last-child)::after{content:'';position:absolute;top:20px;left:calc(50% + 28px);width:calc(100% - 24px);height:2px;background:repeating-linear-gradient(90deg,var(--border-strong) 0 6px,transparent 6px 12px)}
& .ft-num{position:relative;z-index:1;display:grid;place-items:center;width:40px;height:40px;margin-bottom:6px;border-radius:var(--r-full);background:var(--bg);border:2px solid var(--accent);color:var(--accent-text);font:700 var(--fs-base)/1 var(--font-display);font-variant-numeric:tabular-nums}
& .ft-p{max-width:30ch}
@media (max-width:820px){& .ft-head{margin-inline:0;text-align:left;justify-items:start}& .ft-steps{grid-template-columns:1fr;gap:28px}& .ft-step{justify-items:start;text-align:left;padding-left:60px}& .ft-num{position:absolute;left:0;top:0}& .ft-step:not(:last-child)::after{top:44px;bottom:-28px;left:19px;right:auto;width:2px;height:auto;background:repeating-linear-gradient(180deg,var(--border-strong) 0 6px,transparent 6px 12px)}}`,
    },
    {
      id: "hover", name: "Cartes au survol", desc: "Cartes qui s'illuminent et éclipsent leurs voisines.", tags: ["Interactif", "Moderne"],
      attrs: { shape: "inherit", depth: "lift", energy: "playful" },
      spec: ["Three-column grid of bordered surface cards; on hover or keyboard focus the card lifts 4px, gains a shadow and an accent border, and its icon tile fills with the accent color.", "While the grid is hovered, sibling cards dim to 55% opacity so the active one stands out; motion uses the standard duration and easing tokens and is disabled for reduced motion."],
      css: `
& .ft-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
& .ft-item{display:grid;gap:12px;align-content:start;justify-items:start;padding:24px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);cursor:default;transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease),opacity var(--dur) var(--ease)}
& .ft-item .ft-ico{transition:background var(--dur) var(--ease),color var(--dur) var(--ease)}
& .ft-grid:hover .ft-item:not(:hover){opacity:.55}
& .ft-item:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:var(--shadow-lg)}
& .ft-item:hover .ft-ico{background:var(--accent);color:var(--accent-contrast)}
@media (max-width:820px){& .ft-grid{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){& .ft-item{transition:none}& .ft-item:hover{transform:none}}`,
    },
    {
      id: "table", name: "Tableau éditorial", desc: "Rangées à filets : numéro, titre, description, mot-clé.", tags: ["Éditorial", "Sobre"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Full-width list where every row is a 4-column grid (48px index, 260px display-face title, fluid description, right-aligned keyword) between 1px hairlines, with a 1px text rule on top.", "Index in muted monospace, keyword in small caps-style uppercase; hovering a row tints it bg-subtle and turns the title accent-text. No icons."],
      demo: () => {
        const kw = ["Ventes", "Légal", "Recouvrement", "Compta", "International", "Encaissement"];
        return `<section class="ft">${head("Le détail, ligne par ligne.", "Six modules, une seule facture de bout en bout.")}<ul class="ft-list ft-table">${F.map((f, n) => `<li class="ft-r"><span class="ft-idx" aria-hidden="true">${two(n)}</span><h4 class="ft-t">${f.t}</h4><p class="ft-p">${f.p}</p><span class="ft-kw">${kw[n]}</span></li>`).join("")}</ul></section>`;
      },
      css: `
& .ft-table{border-top:1px solid var(--text)}
& .ft-r{display:grid;grid-template-columns:48px 260px minmax(0,1fr) auto;gap:24px;align-items:baseline;padding:22px 12px;border-bottom:1px solid var(--border-strong);transition:background var(--dur) var(--ease)}
& .ft-r:hover{background:var(--bg-subtle)}
& .ft-r:hover .ft-t{color:var(--accent-text)}
& .ft-t{transition:color var(--dur) var(--ease)}
& .ft-idx{font:500 var(--fs-sm)/1 var(--font-mono);font-variant-numeric:tabular-nums;color:var(--text-muted)}
& .ft-kw{font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);text-align:right}
@media (max-width:820px){& .ft-r{grid-template-columns:36px minmax(0,1fr);gap:6px 12px}& .ft-r .ft-p{grid-column:2}& .ft-kw{grid-column:2;text-align:left}}`,
    },
  ],
};
