import { ic } from "../icons.mjs";

const base = `
& .plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;align-items:stretch;padding:36px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .plan{position:relative;display:flex;flex-direction:column;gap:16px;padding:var(--pad);background:var(--surface);border-radius:var(--r-surface)}
& .plan-name{margin:0;font:600 var(--fs-base)/1.2 var(--font-body)}
& .plan-price{display:flex;align-items:baseline;gap:6px;margin:0;font:var(--heading-weight) 40px/1 var(--font-display);letter-spacing:var(--heading-tracking);font-variant-numeric:tabular-nums}
& .plan-price small{font:400 var(--fs-sm)/1 var(--font-body);letter-spacing:0;color:var(--text-muted)}
& .plan-desc{margin:0;font-size:var(--fs-sm);line-height:1.5;color:var(--text-muted)}
& .plan-list{list-style:none;margin:0;padding:0;display:grid;gap:10px;font-size:var(--fs-sm)}
& .plan-list li{display:flex;gap:10px;align-items:flex-start;line-height:1.35}
& .plan-list li::before{content:'';flex:none;width:5px;height:9px;margin:2px 6px 0 3px;border:solid var(--accent-text);border-width:0 2px 2px 0;transform:rotate(45deg)}
& .plan .btn{width:100%}
& .plan-flag{position:absolute;top:0;left:var(--pad);transform:translateY(-50%);padding:4px 10px;border-radius:var(--r-full);background:var(--accent);color:var(--accent-contrast);font:600 11.5px/1 var(--font-body)}
& .plan-list{padding-top:4px}
@media (max-width:820px){& .plans{grid-template-columns:1fr}}
`;

const plan = (c, { name, price, per, desc, items, cta, btn, featured }) =>
  `<article class="plan${featured ? " is-featured" : ""}">${featured ? '<span class="plan-flag">Le plus choisi</span>' : ""}<h4 class="plan-name">${name}</h4><p class="plan-price">${price}${per ? `<small>${per}</small>` : ""}</p><p class="plan-desc">${desc}</p>${c.scope("buttons", `<button class="btn ${btn}">${cta}</button>`)}<ul class="plan-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul></article>`;

const data = (c) => [
  plan(c, { name: "Gratuit", price: "0 €", per: "", desc: "Pour tester avec quelques clients.", items: ["3 clients", "10 factures par mois", "Modèles de base"], cta: "Commencer", btn: "btn-secondary" }),
  plan(c, { name: "Pro", price: "19 €", per: "/ mois", desc: "Pour les indépendants à plein temps.", items: ["Clients illimités", "Relances automatiques", "Export comptable", "Support par e-mail"], cta: "Essayer 14 jours", btn: "btn-primary", featured: true }),
  plan(c, { name: "Équipe", price: "49 €", per: "/ mois", desc: "Pour les petites structures.", items: ["5 utilisateurs", "Droits et rôles", "Facturation multi-devises", "Support prioritaire"], cta: "Contacter l'équipe", btn: "btn-secondary" }),
].join("");

export default {
  id: "pricing", label: "Tarifs", group: "Structure", icon: "f_pricing", size: "lg", fit: 900, deps: ["buttons"],
  desc: "Grille de plans : cartes, colonnes minimales, bascule mensuel/annuel, brut.",
  base,
  snippet: `<section class="plans">
  <article class="plan"><h3 class="plan-name">Free</h3><p class="plan-price">€0</p><p class="plan-desc">…</p><a class="btn btn-secondary">Get started</a><ul class="plan-list"><li>3 clients</li></ul></article>
  <article class="plan is-featured"><span class="plan-flag">Most popular</span><h3 class="plan-name">Pro</h3><p class="plan-price">€19 <small>/ month</small></p> … <a class="btn btn-primary">Start 14-day trial</a></article>
</section>`,
  rules: [
    "Prices are real, with currency, billing period and tax note. The recommended plan is marked by ONE device only (tint, border or flag), not three.",
    "Each plan: name, price, one-line audience, CTA, then 4 to 8 inclusions. Group or link to a comparison table beyond that.",
    "CTA labels differ by intent ('Get started', 'Start 14-day trial', 'Contact sales').",
    "On mobile stack with the recommended plan first; price and CTA stay visible.",
  ],
  demo: (c) => `<div class="plans">${data(c)}</div>`,
  variants: [
    {
      id: "cards", name: "Cartes", desc: "Trois cartes, la centrale mise en avant par un contour d'accent.", tags: ["Standard", "Clair"],
      attrs: { shape: "inherit", depth: "soft", energy: "crisp" },
      spec: ["Bordered surface cards; the featured plan has an accent border, a shadow-md and a small floating flag.", "Buttons are secondary on ordinary plans and primary on the featured plan."],
      css: `
& .plan{border:var(--border-w) solid var(--border)}
& .plan.is-featured{border-color:var(--accent);box-shadow:var(--shadow-md)}`,
    },
    {
      id: "minimal", name: "Colonnes", desc: "Sans cartes : colonnes séparées par des filets.", tags: ["Minimal", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["No card boxes: three columns separated by hairlines, the featured column sits on a bg-subtle band.", "Plan names and prices are typographic; lists are compact."],
      css: `
& .plans{gap:0;padding:36px 24px}
& .plan{background:transparent;border-radius:0;padding:8px 28px;border-left:1px solid var(--border)}
& .plan:first-child{border-left:0}
& .plan.is-featured{background:var(--bg-subtle)}
& .plan-flag{background:transparent;color:var(--accent-text);padding:0;top:20px;left:auto;right:28px;transform:none;font-weight:700}`,
    },
    {
      id: "toggle", name: "Avec bascule", desc: "Interrupteur mensuel/annuel et cartes teintées.", tags: ["Conversion", "Moderne"],
      attrs: { shape: "inherit", depth: "flat", energy: "friendly" },
      spec: ["A segmented control above the plans switches between monthly and annual billing and states the saving ('-20 %').", "Cards are borderless bg-subtle fills; the featured card uses accent-soft."],
      snippet: `<div class="plans-head"><div class="plans-toggle" role="radiogroup" aria-label="Billing period"><button role="radio" aria-checked="true">Monthly</button><button role="radio" aria-checked="false">Annual <span>-20%</span></button></div></div>
<section class="plans"> … </section>`,
      demo: (c) => `<div class="plans-wrap"><div class="plans-head"><div class="plans-toggle" role="radiogroup" aria-label="Période de facturation"><button role="radio" aria-checked="true">Mensuel</button><button role="radio" aria-checked="false">Annuel <span>-20 %</span></button></div></div><div class="plans">${data(c)}</div></div>`,
      css: `
& .plans-wrap{background:var(--bg)}
& .plans-head{display:flex;justify-content:center;padding:28px 0 0}
& .plans-toggle{display:inline-flex;padding:3px;gap:2px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:var(--r-full)}
& .plans-toggle button{display:inline-flex;align-items:center;gap:8px;height:34px;padding:0 16px;border:0;border-radius:var(--r-full);background:none;color:var(--text-muted);font:600 var(--fs-sm)/1 var(--font-body);cursor:pointer;transition:all var(--dur) var(--ease)}
& .plans-toggle button[aria-checked=true]{background:var(--surface-raised);color:var(--text);box-shadow:var(--shadow-sm),0 0 0 1px var(--border)}
& .plans-toggle span{font-size:11px;color:var(--success)}
& .plan{background:var(--bg-subtle);border:0}
& .plan.is-featured{background:var(--accent-soft)}
& .plan.is-featured .plan-name{color:var(--accent-text)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Gros contours, ombres dures, plan vedette en couleur pleine.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["Every plan has a 2px text border and a 5px hard shadow; the featured plan fills with the accent color and inverts its text.", "The flag is a bordered rectangle."],
      css: `
& .plan{border:2px solid var(--text);box-shadow:5px 5px 0 var(--text)}
& .plan.is-featured{background:var(--accent);color:var(--accent-contrast)}
& .plan.is-featured .plan-desc,& .plan.is-featured .plan-price small{color:color-mix(in srgb,var(--accent-contrast) 80%,var(--accent))}
& .plan.is-featured .plan-list li::before{border-color:var(--accent-contrast)}
& .plan-flag{background:var(--surface);color:var(--text);border:2px solid var(--text);border-radius:var(--r-sm)}
& .plan-price{font-weight:800}`,
    },
    {
      id: "table", name: "Tableau comparatif", desc: "Plans en colonnes, fonctionnalités en lignes, coches.", tags: ["Détaillé", "Comparaison"],
      attrs: { shape: "inherit", depth: "flat", energy: "technical" },
      spec: ["A real <table>: plan name, price and CTA in the header cells, one feature per row with hairline separators; values are short text, an accent check or a muted dash.", "The recommended column is tinted with a 7% accent mix, rounded at both ends and topped by a 3px accent bar.", "Feature names are row headers, sticky on the left when the table scrolls horizontally below 600px."],
      snippet: `<div class="ptable-wrap"><table class="ptable">
  <thead><tr><td></td><th scope="col"><span class="plan-name">Free</span><span class="plan-price">€0</span><a class="btn btn-secondary">Get started</a></th><th scope="col" class="is-featured">…Pro…</th></tr></thead>
  <tbody>
    <tr><th scope="row">Clients</th><td>3</td><td class="is-featured">Unlimited</td></tr>
    <tr><th scope="row">Automatic reminders</th><td><span class="no">—</span></td><td class="is-featured"><span class="yes"><svg class="ic">…</svg><span class="sr-only">Included</span></span></td></tr>
  </tbody>
</table></div>`,
      demo: (c) => {
        const yes = `<span class="yes">${ic("check", 18)}<span class="sr-only">Inclus</span></span>`;
        const no = `<span class="no"><span aria-hidden="true">—</span><span class="sr-only">Non inclus</span></span>`;
        const rows = [["Clients", "3", "Illimités", "Illimités"], ["Factures par mois", "10", "Illimitées", "Illimitées"], ["Relances automatiques", no, yes, yes], ["Export comptable", no, yes, yes], ["Utilisateurs", "1", "1", "5"], ["Droits et rôles", no, no, yes], ["Facturation multi-devises", no, no, yes], ["Support", "Communauté", "E-mail", "Prioritaire"]];
        const head = (name, price, per, btn, cta, feat) => `<th scope="col"${feat ? ' class="is-featured"' : ""}><span class="plan-name">${name}</span><span class="plan-price">${price}${per ? `<small>${per}</small>` : ""}</span>${c.scope("buttons", `<button class="btn ${btn}">${cta}</button>`)}</th>`;
        return `<div class="ptable-wrap"><table class="ptable"><caption class="sr-only">Comparatif des plans Nomade</caption><thead><tr><td></td>${head("Gratuit", "0 €", "", "btn-secondary", "Commencer")}${head("Pro", "19 €", "/ mois", "btn-primary", "Essayer 14 jours", true)}${head("Équipe", "49 €", "/ mois", "btn-secondary", "Contacter")}</tr></thead><tbody>${rows.map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td class="is-featured">${r[2]}</td><td>${r[3]}</td></tr>`).join("")}</tbody></table></div>`;
      },
      css: `
& .ptable-wrap{padding:36px;overflow-x:auto;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .ptable{width:100%;min-width:600px;border-collapse:separate;border-spacing:0;text-align:center}
& .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
& .ptable thead th,& .ptable thead td{padding:20px 16px;vertical-align:bottom;font-weight:400}
& .ptable thead th{display:table-cell}
& .ptable .plan-name{display:block;margin-bottom:8px}
& .ptable .plan-price{justify-content:center;margin-bottom:14px;font-size:32px}
& .ptable .btn{width:100%}
& .ptable tbody th,& .ptable tbody td{padding:14px 16px;border-top:1px solid var(--border);font-size:var(--fs-sm)}
& .ptable tbody th{position:sticky;left:0;background:var(--bg);text-align:left;font-weight:500}
& .ptable tbody td{color:var(--text-muted)}
& .yes{display:inline-flex;color:var(--accent-text)}
& .no{color:var(--text-muted)}
& .ptable .is-featured{background:color-mix(in srgb,var(--accent) 7%,transparent)}
& .ptable tbody td.is-featured{color:var(--text)}
& .ptable thead th.is-featured{border-top:3px solid var(--accent);border-radius:var(--r-surface) var(--r-surface) 0 0}
& .ptable tbody tr:last-child td.is-featured{border-radius:0 0 var(--r-surface) var(--r-surface)}
@media (max-width:820px){& .ptable-wrap{padding:24px 16px}}`,
    },
    {
      id: "single", name: "Plan unique", desc: "Une seule offre large : prix à gauche, tout ce qui est inclus à droite.", tags: ["Simple", "Confiance"],
      attrs: { shape: "inherit", depth: "soft", energy: "calm" },
      spec: ["One centered card (max-width 780px, shadow-md, 1px border) split in two: name, a 56px price, one sentence and a full-width primary button on the left; a two-column checklist of eight inclusions on the right behind a hairline divider.", "A floating flag reads 'Tout compris'.", "Stacks to one column below 820px with a single-column checklist."],
      snippet: `<section class="plans">
  <article class="plan is-featured">
    <span class="plan-flag">All included</span>
    <h3 class="plan-name">Brand Pro</h3>
    <p class="plan-price">€19 <small>/ month, no commitment</small></p>
    <p class="plan-desc">Everything you need to invoice and get paid.</p>
    <a class="btn btn-primary">Start 14-day trial</a>
    <ul class="plan-list"><li>Unlimited clients</li><li>Automatic reminders</li>…</ul>
  </article>
</section>`,
      demo: (c) => `<div class="plans"><article class="plan is-featured"><span class="plan-flag">Tout compris</span><h4 class="plan-name">Nomade Pro</h4><p class="plan-price">19 €<small>/ mois, sans engagement</small></p><p class="plan-desc">Tout ce qu'il faut pour facturer et être payé, sans option cachée.</p>${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer 14 jours</button>`)}<ul class="plan-list"><li>Clients illimités</li><li>Factures illimitées</li><li>Relances automatiques</li><li>Paiement par carte</li><li>Export comptable</li><li>Facturation multi-devises</li><li>Modèles personnalisés</li><li>Support par e-mail sous 24 h</li></ul></article></div>`,
      css: `
& .plans{grid-template-columns:1fr;padding:48px 36px}
& .plan{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr);column-gap:44px;row-gap:14px;align-content:center;width:100%;max-width:780px;margin:0 auto;padding:36px 40px;border:var(--border-w) solid var(--border);box-shadow:var(--shadow-md)}
& .plan > *{grid-column:1}
& .plan .plan-price{font-size:56px}
& .plan .plan-list{grid-column:2;grid-row:1 / span 4;grid-template-columns:1fr 1fr;align-content:center;gap:16px 20px;padding:0 0 0 40px;border-left:1px solid var(--border)}
@media (max-width:820px){& .plans{padding:36px 20px}& .plan{grid-template-columns:1fr;padding:28px 22px}& .plan .plan-list{grid-column:1;grid-row:auto;grid-template-columns:1fr;padding:16px 0 0;border-left:0;border-top:1px solid var(--border)}}`,
    },
    {
      id: "volume", name: "Volume par paliers", desc: "Un curseur à quatre paliers qui change le prix affiché.", tags: ["Interactif", "Usage"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["One card with two halves: on the left a question and a four-stop rail (50, 150, 500, 1 000 invoices per month) built from visually hidden radios; on the right the price, a one-line audience, the CTA and three inclusions.", "The selected stop is a filled accent dot with a 5px accent-20% ring and a text-colored label; keyboard focus draws the focus ring on the dot. Price and audience swap through CSS :has(), no script.", "Stacks below 820px."],
      snippet: `<section class="plans"><article class="plan vs">
  <div class="vs-pick">
    <p class="vs-q" id="vol-q">How many invoices per month?</p>
    <div class="vs-steps" role="radiogroup" aria-labelledby="vol-q">
      <label class="vs-step"><input class="vs-r vs-r1" type="radio" name="vol" checked><i class="vs-dot"></i><span>50</span></label>
      <label class="vs-step"><input class="vs-r vs-r2" type="radio" name="vol"><i class="vs-dot"></i><span>150</span></label> …
    </div>
  </div>
  <div class="vs-out">
    <p class="plan-price"><span class="vs-p vs-p1">€9</span><span class="vs-p vs-p2">€19</span>… <small>/ month</small></p>
    <p class="plan-desc"><span class="vs-t vs-t1">…</span>…</p>
    <a class="btn btn-primary">Start 14-day trial</a>
    <ul class="plan-list">…</ul>
  </div>
</article></section>`,
      demo: (c) => {
        const tiers = [["50", "9 €", "Pour démarrer avec quelques clients."], ["150", "19 €", "Pour un indépendant à plein temps."], ["500", "39 €", "Pour une petite structure qui facture chaque semaine."], ["1 000", "69 €", "Pour une équipe qui facture en continu."]];
        return `<div class="plans"><article class="plan vs"><div class="vs-pick"><p class="vs-q" id="${c.uid}-vq">Combien de factures par mois ?</p><div class="vs-steps" role="radiogroup" aria-labelledby="${c.uid}-vq">${tiers.map((t, i) => `<label class="vs-step"><input class="vs-r vs-r${i + 1}" type="radio" name="${c.uid}-vol"${i === 1 ? " checked" : ""}><i class="vs-dot"></i><span>${t[0]}</span></label>`).join("")}</div><p class="plan-desc">${tiers.map((t, i) => `<span class="vs-t vs-t${i + 1}">${t[2]}</span>`).join("")}</p></div><div class="vs-out"><p class="plan-price">${tiers.map((t, i) => `<span class="vs-p vs-p${i + 1}">${t[1]}</span>`).join("")}<small>/ mois</small></p>${c.scope("buttons", `<button class="btn btn-primary">Essayer 14 jours</button>`)}<ul class="plan-list"><li>Clients illimités</li><li>Relances automatiques</li><li>Export comptable</li></ul></div></article></div>`;
      },
      css: `
& .plans{grid-template-columns:1fr;padding:48px 36px}
& .vs{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:48px;width:100%;max-width:780px;margin:0 auto;padding:36px 40px;border:var(--border-w) solid var(--border);box-shadow:var(--shadow-md)}
& .vs-pick{display:grid;gap:18px;align-content:center}
& .vs-q{margin:0;font:var(--heading-weight) var(--fs-xl)/1.2 var(--font-display);letter-spacing:var(--heading-tracking)}
& .vs-steps{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));padding-top:4px}
& .vs-steps::before{content:'';position:absolute;left:12.5%;right:12.5%;top:17px;height:4px;border-radius:2px;background:var(--border)}
& .vs-step{position:relative;display:grid;justify-items:center;gap:10px;cursor:pointer}
& .vs-r{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
& .vs-dot{position:relative;width:22px;height:22px;border:3px solid var(--border-strong);border-radius:50%;background:var(--surface);transition:background var(--dur) var(--ease),border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .vs-step span{font:600 var(--fs-sm)/1 var(--font-body);font-variant-numeric:tabular-nums;color:var(--text-muted);transition:color var(--dur) var(--ease)}
& .vs-step:hover .vs-dot{border-color:var(--accent)}
& .vs-step:has(.vs-r:checked) .vs-dot{border-color:var(--accent);background:var(--accent);box-shadow:0 0 0 5px color-mix(in srgb,var(--accent) 20%,transparent)}
& .vs-step:has(.vs-r:checked) span{color:var(--text)}
& .vs-step:has(.vs-r:focus-visible) .vs-dot{outline:2px solid var(--focus);outline-offset:4px}
& .vs-p,& .vs-t{display:none}
& .vs:has(.vs-r1:checked) .vs-p1,& .vs:has(.vs-r2:checked) .vs-p2,& .vs:has(.vs-r3:checked) .vs-p3,& .vs:has(.vs-r4:checked) .vs-p4{display:inline}
& .vs:has(.vs-r1:checked) .vs-t1,& .vs:has(.vs-r2:checked) .vs-t2,& .vs:has(.vs-r3:checked) .vs-t3,& .vs:has(.vs-r4:checked) .vs-t4{display:inline}
& .vs-out{display:grid;gap:16px;align-content:center;padding-left:40px;border-left:1px solid var(--border)}
& .vs-out .plan-price{font-size:56px}
@media (max-width:820px){& .plans{padding:36px 20px}& .vs{grid-template-columns:1fr;gap:28px;padding:28px 22px}& .vs-out{padding:24px 0 0;border-left:0;border-top:1px solid var(--border)}}`,
    },
    {
      id: "rows", name: "Lignes empilées", desc: "Un plan par ligne : nom, inclusions, prix et bouton alignés.", tags: ["Lisible", "Compact"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Plans stack as full-width horizontal rows (1px border, 20px 24px padding) in a four-part grid: name over audience, checklist, price, then a 150px button.", "The featured row gets an accent border plus a 4px accent bar inside its left edge; the flag moves to the right end.", "Below 820px each row folds into name/price on top, checklist, then a full-width button."],
      css: `
& .plans{grid-template-columns:1fr;gap:16px;padding:40px 36px}
& .plan{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.3fr) auto auto;grid-template-areas:"name list price btn" "desc list price btn";align-items:center;column-gap:28px;row-gap:4px;padding:20px 24px;border:var(--border-w) solid var(--border)}
& .plan-name{grid-area:name;align-self:end;font-size:var(--fs-lg)}
& .plan-desc{grid-area:desc;align-self:start}
& .plan-list{grid-area:list;gap:6px;padding:0}
& .plan-price{grid-area:price;font-size:32px}
& .plan .btn{grid-area:btn;width:auto;min-width:150px}
& .plan.is-featured{border-color:var(--accent);box-shadow:inset 4px 0 0 var(--accent)}
& .plan-flag{left:auto;right:24px}
@media (max-width:820px){& .plans{padding:32px 16px}& .plan{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"name price" "desc price" "list list" "btn btn";row-gap:12px;padding:20px}& .plan .btn{width:100%}}`,
    },
  ],
};
