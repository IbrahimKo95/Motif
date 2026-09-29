import { ic } from "../icons.mjs";

const base = `
& .ft{padding:64px 48px 28px;background:var(--bg);color:var(--text);font-family:var(--font-body);border-top:1px solid var(--border)}
& .ft a{color:inherit;text-decoration:none;border-radius:var(--r-sm)}
& .ft a:focus-visible{outline:2px solid var(--focus);outline-offset:3px}
& .ft-logo{display:inline-flex;align-items:center;gap:10px;font:var(--heading-weight) var(--fs-lg)/1 var(--font-display);letter-spacing:var(--heading-tracking)}
& .ft-mark{width:22px;height:22px;border-radius:var(--r-sm);background:var(--accent)}
& .ft-blurb{margin:14px 0 0;max-width:32ch;font-size:var(--fs-sm);line-height:1.55;color:var(--text-muted)}
& .ft-cols{display:grid;grid-template-columns:1.6fr repeat(4,minmax(0,1fr));gap:40px}
& .ft-h{margin:0 0 14px;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted)}
& .ft-links{list-style:none;margin:0;padding:0;display:grid;gap:10px}
& .ft-links a{font-size:var(--fs-sm);color:var(--text-muted);transition:color var(--dur) var(--ease)}
& .ft-links a:hover{color:var(--text);text-decoration:underline;text-underline-offset:3px}
& .ft-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;margin-top:56px;padding-top:24px;border-top:1px solid var(--border);font-size:var(--fs-xs);color:var(--text-muted)}
& .ft-bottom p{margin:0}
& .ft-legal{display:flex;flex-wrap:wrap;gap:8px 20px;list-style:none;margin:0;padding:0}
& .ft-legal a:hover{color:var(--text);text-decoration:underline;text-underline-offset:3px}
@media (max-width:820px){& .ft{padding:44px 20px 24px}& .ft-cols{grid-template-columns:repeat(2,minmax(0,1fr));gap:32px 24px}& .ft-cols > :first-child{grid-column:1 / -1}& .ft-bottom{margin-top:40px}}
`;

const COLS = [
  ["Produit", ["Fonctionnalités", "Tarifs", "Nouveautés", "Intégrations", "Application mobile"]],
  ["Ressources", ["Centre d'aide", "Guide de la facturation", "Blog", "Modèles de devis", "Statut du service"]],
  ["Entreprise", ["À propos", "Carrières", "Presse", "Contact", "Programme partenaires"]],
  ["Légal", ["Mentions légales", "Conditions générales", "Confidentialité", "Cookies", "Sécurité"]],
];
const LEGAL = ["Mentions légales", "Conditions générales de vente", "Politique de confidentialité", "Gérer les cookies"];
const SOCIAL = ["Instagram", "LinkedIn", "YouTube", "GitHub"];

const logo = `<a class="ft-logo" href="#"><span class="ft-mark" aria-hidden="true"></span>Nomade</a>`;
const list = (items) => `<ul class="ft-links">${items.map((l) => `<li><a href="#">${l}</a></li>`).join("")}</ul>`;
const cols = (from = 0, to = 4) => COLS.slice(from, to).map(([h, l]) => `<nav aria-label="${h}"><h3 class="ft-h">${h}</h3>${list(l)}</nav>`).join("");
const legal = (items = LEGAL) => `<ul class="ft-legal">${items.map((l) => `<li><a href="#">${l}</a></li>`).join("")}</ul>`;
const copy = `<p>© 2026 Nomade SAS · 42 rue du Faubourg Saint-Antoine, 75012 Paris</p>`;
const bottom = `<div class="ft-bottom">${copy}<nav aria-label="Informations légales">${legal()}</nav></div>`;

const snippet = `<footer class="ft">
  <div class="ft-cols">
    <div><a class="ft-logo" href="#"><span class="ft-mark" aria-hidden="true"></span>Nomade</a>
      <p class="ft-blurb">Invoicing for freelancers, made simple.</p></div>
    <nav aria-label="Product"><h3 class="ft-h">Product</h3>
      <ul class="ft-links"><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li></ul></nav>
    <!-- more <nav> columns -->
  </div>
  <div class="ft-bottom"><p>© 2026 Nomade SAS</p>
    <nav aria-label="Legal"><ul class="ft-legal"><li><a href="#">Legal notice</a></li><li><a href="#">Privacy</a></li></ul></nav></div>
</footer>`;

const mainDemo = () => `<footer class="ft"><div class="ft-cols"><div>${logo}<p class="ft-blurb">La facturation des indépendants, sans prise de tête. Devis, factures et relances au même endroit.</p></div>${cols()}</div>${bottom}</footer>`;

export default {
  id: "footer", label: "Pieds de page", group: "Structure", icon: "f_footer", size: "lg", fit: 900,
  desc: "Bas de page : colonnes de liens, minimal, wordmark géant, inversé, centré, deux niveaux.",
  deps: ["buttons"],
  base, snippet,
  rules: [
    "Group links under 3 to 5 headed columns, each with at most 6 links, and keep the legal notices, company identity and copyright on a separate bottom row.",
    "Each link group is its own <nav> with an aria-label; the footer itself is a <footer> landmark. Link text is the destination name, never 'click here'.",
    "French sites must show the legal notice, terms of sale, privacy policy and cookie management link on every page; company name, address and registration belong in the bottom row.",
    "Keep the footer quieter than the page: muted link color, hover to full text color with an underline, and never more than one accent element.",
  ],
  demo: mainDemo,
  variants: [
    {
      id: "columns", name: "Colonnes", desc: "Marque, quatre colonnes de liens et mentions en bas.", tags: ["Classique", "Complet"],
      attrs: { shape: "inherit", depth: "flat", energy: "crisp" },
      spec: ["Five-column grid (1.6fr brand then four 1fr link columns, 40px gutter) with uppercase 12px muted headings, 14px muted links and a hairline-topped bottom row for company address and legal links.", "Below 820px the brand spans full width and the link columns wrap into two per row; links darken and underline on hover."],
      css: ``,
      demo: mainDemo,
    },
    {
      id: "minimal", name: "Une ligne", desc: "Logo, quelques liens et copyright sur une seule ligne.", tags: ["Minimal", "Discret"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["A single 72px-high row: logo left, four inline links centered and the copyright right in 12px muted text, on a 1px top hairline with 24px vertical padding.", "No headings or columns; the row wraps to stacked centered lines under 820px. Suited to apps and dashboards where the footer is secondary."],
      css: `
& .ft{padding:24px 48px}
& .ft-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 32px}
& .ft-row .ft-links{display:flex;flex-wrap:wrap;gap:8px 24px}
& .ft-copy{margin:0;font-size:var(--fs-xs);color:var(--text-muted)}
@media (max-width:820px){& .ft{padding:24px 20px}& .ft-row{flex-direction:column;text-align:center}}`,
      demo: () => `<footer class="ft"><div class="ft-row">${logo}<nav aria-label="Liens">${list(["Mentions légales", "Confidentialité", "Aide", "Contact"])}</nav><p class="ft-copy">© 2026 Nomade SAS</p></div></footer>`,
    },
    {
      id: "wordmark", name: "Wordmark géant", desc: "Liens en haut, nom de marque immense en bas.", tags: ["Audacieux", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Three link groups in a compact row over a hairline, then the brand name set in the display face at up to 12rem (19cqi) with -0.05em tracking and a 0.8 line-height, cropped flush to the bottom edge.", "The giant wordmark is decorative (aria-hidden) and non-selectable; legal links and copyright sit above it in 12px muted text."],
      css: `
& .ft{padding-bottom:0;overflow:hidden}
& .ft-top{display:grid;grid-template-columns:1.4fr repeat(3,minmax(0,1fr));gap:40px;padding-bottom:40px;border-bottom:1px solid var(--text)}
& .ft-mid{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;padding:20px 0 0;font-size:var(--fs-xs);color:var(--text-muted)}
& .ft-mid p{margin:0}
& .ft-word{margin:24px 0 -.14em;font:var(--heading-weight) clamp(3rem,19cqi,12rem)/.8 var(--font-display);letter-spacing:-.05em;color:var(--text);user-select:none;white-space:nowrap}
@media (max-width:820px){& .ft-top{grid-template-columns:repeat(2,minmax(0,1fr))}& .ft-top > :first-child{grid-column:1 / -1}}`,
      demo: () => `<footer class="ft"><div class="ft-top"><p class="ft-blurb" style="margin:0">Devis, factures et relances pour les indépendants. Fait à Nantes.</p>${cols(0, 3)}</div><div class="ft-mid">${copy}<nav aria-label="Informations légales">${legal(LEGAL.slice(0, 3))}</nav></div><p class="ft-word" aria-hidden="true">Nomade</p></footer>`,
    },
    {
      id: "dark", name: "Inversé", desc: "Fond inversé avec inscription à la newsletter.", tags: ["Contrasté", "Newsletter"],
      attrs: { shape: "inherit", depth: "flat", energy: "premium" },
      spec: ["Footer painted with the text color as background and bg color for text (inverted from the page), split into a newsletter block (title, one line of copy, inline email field and submit) and two link columns.", "The field is a 1px translucent-bordered input with a 44px height and pill-free radius; the submit is a bg-colored button with text-colored label, so contrast holds in both themes."],
      css: `
& .ft{background:var(--text);color:var(--bg);border-top:0}
& .ft-blurb,& .ft-h,& .ft-links a,& .ft-bottom,& .ft-legal a{color:color-mix(in srgb,var(--bg) 66%,transparent)}
& .ft-links a:hover,& .ft-legal a:hover{color:var(--bg)}
& .ft-bottom{border-top-color:color-mix(in srgb,var(--bg) 20%,transparent)}
& .ft-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:56px}
& .ft-news h3{margin:0;font:var(--heading-weight) var(--fs-2xl)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .ft-news p{margin:10px 0 20px;max-width:40ch;font-size:var(--fs-sm);line-height:1.55;color:color-mix(in srgb,var(--bg) 66%,transparent)}
& .ft-sub{display:flex;gap:8px;max-width:420px}
& .ft-sub input{flex:1;min-width:0;height:44px;padding:0 14px;font:var(--fs-sm) var(--font-body);color:var(--bg);background:color-mix(in srgb,var(--bg) 10%,transparent);border:1px solid color-mix(in srgb,var(--bg) 30%,transparent);border-radius:var(--r-control)}
& .ft-sub input::placeholder{color:color-mix(in srgb,var(--bg) 55%,transparent)}
& .ft-sub input:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .ft-sub button{height:44px;padding:0 18px;font:600 var(--fs-sm) var(--font-body);color:var(--text);background:var(--bg);border:0;border-radius:var(--r-control);cursor:pointer;transition:opacity var(--dur) var(--ease)}
& .ft-sub button:hover{opacity:.88}
& .ft-sub button:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
@media (max-width:820px){& .ft-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:32px 24px}& .ft-news{grid-column:1 / -1}& .ft-sub{flex-direction:column}}`,
      demo: (c) => `<footer class="ft"><div class="ft-grid"><div class="ft-news"><h3>Un conseil de facturation par mois.</h3><p>Trésorerie, TVA, relances : une lettre courte, sans publicité. Désinscription en un clic.</p><form class="ft-sub" onsubmit="return false"><label class="sr" for="${c.uid}nl" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Adresse e-mail</label><input id="${c.uid}nl" type="email" placeholder="vous@exemple.fr" autocomplete="email"><button type="submit">S'abonner</button></form></div>${cols(0, 2)}</div>${bottom}</footer>`,
    },
    {
      id: "centered", name: "Centré", desc: "Tout centré : logo, navigation, réseaux en texte.", tags: ["Simple", "Équilibré"],
      attrs: { shape: "round", depth: "flat", energy: "friendly" },
      spec: ["Stack centered on one axis: logo, a wrapping row of five primary links at 14px, a row of social links written as plain text separated by 4px dots, then legal links and copyright at 12px muted.", "Vertical rhythm of 24px between groups; no columns, so it holds up at any width down to 320px without reflow."],
      css: `
& .ft{display:grid;justify-items:center;gap:24px;text-align:center;padding-block:56px 32px}
& .ft-nav{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 28px;list-style:none;margin:0;padding:0}
& .ft-nav a{font-size:var(--fs-sm);font-weight:500;transition:color var(--dur) var(--ease)}
& .ft-nav a:hover{color:var(--accent-text);text-decoration:underline;text-underline-offset:3px}
& .ft-soc a{color:var(--text-muted);font-size:var(--fs-sm)}
& .ft-soc li + li::before{content:'';display:inline-block;width:4px;height:4px;margin-right:14px;vertical-align:middle;border-radius:var(--r-full);background:var(--border-strong)}
& .ft-soc{gap:10px 14px}
& .ft-fine{display:grid;justify-items:center;gap:10px;padding-top:24px;width:min(100%,560px);border-top:1px solid var(--border);font-size:var(--fs-xs);color:var(--text-muted)}
& .ft-fine p{margin:0}
& .ft-fine .ft-legal{justify-content:center}
@media (max-width:820px){& .ft{padding-inline:20px}}`,
      demo: () => `<footer class="ft">${logo}<nav aria-label="Navigation principale"><ul class="ft-nav">${["Fonctionnalités", "Tarifs", "Guides", "À propos", "Contact"].map((l) => `<li><a href="#">${l}</a></li>`).join("")}</ul></nav><nav aria-label="Réseaux sociaux"><ul class="ft-nav ft-soc">${SOCIAL.map((l) => `<li><a href="#">${l}</a></li>`).join("")}</ul></nav><div class="ft-fine"><nav aria-label="Informations légales">${legal(LEGAL.slice(0, 3))}</nav>${copy}</div></footer>`,
    },
    {
      id: "band", name: "Deux niveaux", desc: "Bandeau d'appel à l'action au-dessus des colonnes.", tags: ["Conversion", "Structuré"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Upper tier: an accent-soft band with the surface radius, 32px padding, a 24px display headline on the left and a primary button on the right, overlapping the footer top by 40px.", "Lower tier: a bg-subtle footer with three link columns and a hairline legal row; the band collapses to a stacked layout under 820px."],
      css: `
& .ft{padding:0 48px 28px;background:var(--bg-subtle);border-top:0}
& .ft-band{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px;margin:0 0 48px;padding:32px;transform:translateY(-40px);margin-bottom:8px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-md)}
& .ft-band h3{margin:0;max-width:22ch;font:var(--heading-weight) var(--fs-2xl)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .ft-band p{margin:8px 0 0;font-size:var(--fs-sm);color:var(--text-muted)}
& .ft-cols{grid-template-columns:1.6fr repeat(3,minmax(0,1fr))}
@media (max-width:820px){& .ft{padding:0 20px 24px}& .ft-band{padding:24px 20px;flex-direction:column;align-items:flex-start}& .ft-cols{grid-template-columns:repeat(2,minmax(0,1fr))}}`,
      demo: (c) => `<div style="background:var(--bg);padding-top:40px"><footer class="ft"><div class="ft-band"><div><h3>Prêt à facturer sans y penser ?</h3><p>14 jours d'essai, sans carte bancaire.</p></div>${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement ${ic("arrow", 16)}</button>`)}</div><div class="ft-cols"><div>${logo}<p class="ft-blurb">La facturation des indépendants, sans prise de tête.</p></div>${cols(0, 3)}</div>${bottom}</footer></div>`,
    },
  ],
};
