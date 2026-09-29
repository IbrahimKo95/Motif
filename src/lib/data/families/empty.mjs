import { ic } from "../icons.mjs";

const base = `
& .em{display:grid;justify-items:center;gap:8px;padding:40px 24px;text-align:center;color:var(--text);font-family:var(--font-body)}
& .em-art{position:relative;width:132px;height:100px;margin-bottom:14px}
& .em-art i{position:absolute;display:block}
& .em-art .a{left:6px;top:14px;width:76px;height:64px;background:var(--surface);border:var(--border-w) solid var(--border-strong);border-radius:var(--r-surface);box-shadow:var(--shadow-sm);transform:rotate(-8deg)}
& .em-art .b{right:8px;top:4px;width:64px;height:64px;border-radius:var(--r-full);background:var(--accent-soft)}
& .em-art .c{left:52px;bottom:6px;width:38px;height:38px;border-radius:var(--r-sm);background:var(--accent);transform:rotate(12deg)}
& .em-art .d{right:22px;bottom:14px;width:12px;height:12px;border-radius:var(--r-full);background:var(--text)}
& .em-title{margin:0;font:var(--heading-weight) var(--fs-xl)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .em-text{margin:0;max-width:38ch;font-size:var(--fs-sm);line-height:1.55;color:var(--text-muted);text-wrap:pretty}
& .em-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:14px}
& .em-link{color:var(--accent-text);font-size:var(--fs-sm);font-weight:600;text-underline-offset:3px;border-radius:var(--r-sm)}
& .em-link:hover{text-decoration-thickness:2px}
& .em-link:focus-visible{outline:2px solid var(--focus);outline-offset:3px}
@media (max-width:360px){& .em{padding:28px 16px}}
`;

const art = `<div class="em-art" aria-hidden="true"><i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i></div>`;
const btn = (c, html) => c.scope("buttons", html);

const snippet = `<div class="em">
  <div class="em-art" aria-hidden="true"><i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i></div>
  <h3 class="em-title">No invoices yet</h3>
  <p class="em-text">Create your first invoice in two minutes and send it to a client.</p>
  <div class="em-actions"><button class="btn btn-primary">New invoice</button></div>
</div>
<!-- Variants: text only (.em-link instead of a button), dashed drop zone (.em-drop),
     starter list (.em-list), no-results with filter chips (.em-chips). -->`;

const STARTERS = [
  ["mail", "Envoyer un premier devis", "Modèle prêt à remplir, signé en ligne par votre client."],
  ["download", "Importer vos clients", "Depuis un fichier CSV ou votre ancien logiciel."],
  ["settings", "Renseigner votre SIRET", "Nécessaire pour les mentions légales de vos factures."],
];

export default {
  id: "empty", label: "États vides", group: "Composants", icon: "f_empty", size: "md",
  desc: "Ce qu'on affiche quand il n'y a rien : illustration, texte seul, dépôt de fichier, suggestions, recherche, brut.",
  deps: ["buttons"],
  base, snippet,
  rules: [
    "Say what is missing and why in one line, then give one primary action that fixes it. Never leave an empty region blank, and never blame the user.",
    "Keep the illustration decorative (aria-hidden) and purely geometric so it inherits the theme tokens; the title and text carry the meaning.",
    "Distinguish first-use emptiness (invite to create), cleared emptiness (celebrate briefly) and no-results (offer to relax filters). Each needs its own copy.",
    "Use a heading level that fits the surrounding page, keep the text under 20 words, and place the action within the same centered block.",
  ],
  demo: (c) => `<div class="em">${art}<h3 class="em-title">Aucune facture pour l'instant</h3><p class="em-text">Créez votre première facture en deux minutes, Nomade s'occupe de la numérotation et des mentions légales.</p><div class="em-actions">${btn(c, `<button class="btn btn-primary">${ic("plus", 16)}Nouvelle facture</button>`)}</div></div>`,
  variants: [
    {
      id: "illus", name: "Illustration", desc: "Composition géométrique en CSS, titre et action.", tags: ["Accueillant", "Standard"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Centered block with a 132x100px CSS-only composition (tilted bordered card, accent-soft disc, accent square and a small dot), a 20px display title, a muted 14px line capped at 38ch and one primary button.", "The illustration is built from empty i elements colored only with tokens, so it re-tints with every theme; it is aria-hidden."],
      css: `& .em{padding:48px 24px}`,
      demo: (c) => `<div class="em">${art}<h3 class="em-title">Aucune facture pour l'instant</h3><p class="em-text">Créez votre première facture en deux minutes, Nomade s'occupe de la numérotation et des mentions légales.</p><div class="em-actions">${btn(c, `<button class="btn btn-primary">${ic("plus", 16)}Nouvelle facture</button>`)}</div></div>`,
    },
    {
      id: "text", name: "Texte seul", desc: "Une phrase et un lien, sans décor.", tags: ["Minimal", "Sobre"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["No illustration: a 16px semibold title, one muted 14px sentence and a text link with an underline offset of 3px, all left aligned inside a block with a 1px top hairline.", "Suited to dense tables and sidebars where a large graphic would push content down; padding stays at 20px."],
      css: `
& .em{justify-items:start;text-align:left;padding:20px 0;border-top:1px solid var(--border);gap:6px}
& .em-title{font:600 var(--fs-base)/1.3 var(--font-body);letter-spacing:0}
& .em-text{max-width:52ch}
& .em-actions{justify-content:flex-start;margin-top:4px}
& .em-link{text-decoration:underline}`,
      demo: () => `<div class="em"><h3 class="em-title">Aucun paiement reçu ce mois-ci</h3><p class="em-text">Les règlements de vos clients apparaîtront ici dès qu'ils seront rapprochés avec votre compte bancaire.</p><div class="em-actions"><a class="em-link" href="#">Relancer les factures en retard</a></div></div>`,
    },
    {
      id: "drop", name: "Zone de dépôt", desc: "Encadré pointillé pour glisser-déposer des fichiers.", tags: ["Interactif", "Import"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["Dashed 2px border-strong frame with the surface radius, 32px padding and a 44px accent-soft icon disc above a title, a hint line and a secondary button.", "On hover or when a control inside has focus, the border turns accent and the background tints with 6% accent; the format hint sits in 12px muted text."],
      css: `
& .em-drop{width:100%;max-width:420px;box-sizing:border-box;display:grid;justify-items:center;gap:8px;padding:32px 24px;border:2px dashed var(--border-strong);border-radius:var(--r-surface);transition:border-color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .em-drop:hover,& .em-drop:focus-within{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 6%,transparent)}
& .em-ico{display:grid;place-items:center;width:44px;height:44px;border-radius:var(--r-full);background:var(--accent-soft);color:var(--accent-text);margin-bottom:4px}
& .em-hint{margin:0;font-size:var(--fs-xs);color:var(--text-muted)}`,
      demo: (c) => `<div class="em"><div class="em-drop"><span class="em-ico" aria-hidden="true">${ic("download", 20)}</span><h3 class="em-title">Déposez vos justificatifs ici</h3><p class="em-text">Glissez des fichiers pour les rattacher à vos dépenses, Nomade lit le montant et la date.</p><div class="em-actions">${btn(c, `<button class="btn btn-secondary">Parcourir mes fichiers</button>`)}</div><p class="em-hint">PDF, JPG ou PNG · 10 Mo maximum</p></div></div>`,
    },
    {
      id: "starters", name: "Pour démarrer", desc: "Liste de premières étapes cliquables.", tags: ["Onboarding", "Guidé"],
      attrs: { shape: "inherit", depth: "outline", energy: "premium" },
      spec: ["Left-aligned title and sentence above a stack of three bordered rows (surface radius, 14px padding, 36px icon tile, title, muted description and a trailing arrow); rows are links with hover border-strong.", "Only three suggestions, ordered by effort; the first row carries an accent-soft icon tile to mark the recommended step."],
      css: `
& .em{justify-items:stretch;text-align:left;gap:6px;padding:28px 24px}
& .em-text{max-width:none}
& .em-list{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px}
& .em-row{display:grid;grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:14px;padding:14px;color:inherit;text-decoration:none;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);transition:border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .em-row:hover{border-color:var(--border-strong);box-shadow:var(--shadow-sm)}
& .em-row:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .em-tile{display:grid;place-items:center;width:36px;height:36px;border-radius:var(--r-control);background:var(--bg-subtle);color:var(--text-muted)}
& .em-list li:first-child .em-tile{background:var(--accent-soft);color:var(--accent-text)}
& .em-row b{display:block;font-size:var(--fs-sm);font-weight:600}
& .em-row small{display:block;margin-top:2px;font-size:var(--fs-xs);line-height:1.4;color:var(--text-muted)}
& .em-go{color:var(--text-muted)}`,
      demo: () => `<div class="em"><h3 class="em-title">Bienvenue sur Nomade, Camille</h3><p class="em-text">Votre espace est prêt. Trois étapes suffisent pour envoyer votre première facture.</p><ul class="em-list">${STARTERS.map(([i, t, d]) => `<li><a class="em-row" href="#"><span class="em-tile" aria-hidden="true">${ic(i, 18)}</span><span><b>${t}</b><small>${d}</small></span><span class="em-go" aria-hidden="true">${ic("arrow", 16)}</span></a></li>`).join("")}</ul></div>`,
    },
    {
      id: "search", name: "Recherche vide", desc: "Aucun résultat, avec filtres actifs à retirer.", tags: ["Recherche", "Filtres"],
      attrs: { shape: "pill", depth: "flat", energy: "crisp" },
      spec: ["A 48px bg-subtle disc with a search icon, a title quoting the query, a muted suggestion and a row of removable filter chips (pill radius, 1px border, 13px text with a close glyph).", "A ghost 'Réinitialiser' button closes the block; chips get border-strong and text color on hover so each filter reads as removable."],
      css: `
& .em-ico{display:grid;place-items:center;width:48px;height:48px;border-radius:var(--r-full);background:var(--bg-subtle);color:var(--text-muted);margin-bottom:6px}
& .em-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:10px}
& .em-chip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 10px 0 12px;font:500 var(--fs-xs)/1 var(--font-body);color:var(--text);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-full);cursor:pointer;transition:border-color var(--dur) var(--ease),background var(--dur) var(--ease)}
& .em-chip:hover{border-color:var(--border-strong);background:var(--bg-subtle)}
& .em-chip:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .em-chip .ic{width:12px;height:12px;color:var(--text-muted)}`,
      demo: (c) => `<div class="em"><span class="em-ico" aria-hidden="true">${ic("search", 22)}</span><h3 class="em-title">Aucun résultat pour « Dupont »</h3><p class="em-text">Aucune facture ne correspond à cette recherche avec les filtres actuels. Retirez-en un pour élargir.</p><div class="em-chips" role="group" aria-label="Filtres actifs"><button class="em-chip" type="button">Statut : impayée${ic("x", 12)}</button><button class="em-chip" type="button">2026${ic("x", 12)}</button><button class="em-chip" type="button">Plus de 500 €${ic("x", 12)}</button></div><div class="em-actions">${btn(c, `<button class="btn btn-ghost">Réinitialiser la recherche</button>`)}</div></div>`,
    },
    {
      id: "raw", name: "Brut", desc: "Bloc à bordure épaisse et ombre dure.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["Card with a 2px text border and a 4px hard offset shadow; the CSS composition is enlarged with 2px text outlines on each shape and the title is set at 800 weight.", "The accent square and the disc gain the same 2px outline, so the illustration reads as a sticker; padding is 36px and the action stays a single button."],
      css: `
& .em{margin:6px;padding:36px 28px;background:var(--surface);border:2px solid var(--text);border-radius:var(--r-surface);box-shadow:4px 4px 0 var(--text)}
& .em-art .a,& .em-art .b,& .em-art .c{border:2px solid var(--text);box-shadow:none}
& .em-art .d{box-shadow:none}
& .em-title{font-weight:800}
& .em-text{color:var(--text)}`,
      demo: (c) => `<div class="em">${art}<h3 class="em-title">Rien à relancer, bravo !</h3><p class="em-text">Toutes vos factures sont réglées. Profitez-en pour préparer le devis du prochain client.</p><div class="em-actions">${btn(c, `<button class="btn btn-primary">${ic("plus", 16)}Nouveau devis</button>`)}</div></div>`,
    },
  ],
};
