import { ic } from "../icons.mjs";

const base = `
& .tm{padding:72px 48px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .tm-head{display:grid;gap:12px;max-width:600px;margin:0 0 44px}
& .tm-eyebrow{margin:0;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--accent-text)}
& .tm-title{margin:0;font:var(--heading-weight) clamp(1.75rem,3.4cqi,2.5rem)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .tm-fig{margin:0;display:grid;gap:18px;align-content:start;min-width:0}
& .tm-q{margin:0;font-size:var(--fs-base);line-height:1.6;text-wrap:pretty}
& .tm-q p{margin:0}
& .tm-by{display:flex;align-items:center;gap:12px;min-width:0}
& .tm-av{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:var(--r-full);background:var(--accent-soft);color:var(--accent-text);font:700 var(--fs-sm)/1 var(--font-body);letter-spacing:.02em}
& .tm-name{display:block;font-weight:600;font-size:var(--fs-sm);line-height:1.3;font-style:normal}
& .tm-role{display:block;font-size:var(--fs-xs);line-height:1.4;color:var(--text-muted)}
& .tm-list{list-style:none;margin:0;padding:0}
& .tm-stars{display:flex;gap:2px;color:var(--warning)}
@media (max-width:820px){& .tm{padding:48px 20px}}
`;

const T = [
  { n: "Camille Roussel", i: "CR", r: "Photographe, Studio Roussel", c: "Lyon", q: "Je passais mes dimanches soir à relancer des factures. Aujourd'hui, Nomade s'en charge et mes délais de paiement sont passés de 38 à 12 jours.", s: "En 12 jours au lieu de 38.", k: "-68 %", kl: "de retard de paiement" },
  { n: "Malik Benali", i: "MB", r: "Développeur freelance", c: "Bordeaux", q: "Mon comptable m'a demandé quel outil j'avais changé. Le FEC arrive propre, sans que j'aie à trier quoi que ce soit.", s: "Le FEC arrive propre.", k: "4 h", kl: "gagnées chaque mois" },
  { n: "Inès Charpentier", i: "IC", r: "Cheffe de projet, Atelier Marée", c: "Nantes", q: "Nos clients américains règlent en dollars, nos fournisseurs en euros. Tout est converti au bon taux sans tableur.", s: "Plus aucun tableur de conversion.", k: "3 devises", kl: "gérées sans tableur" },
  { n: "Thomas Lefèvre", i: "TL", r: "Architecte d'intérieur", c: "Paris", q: "Le devis signé depuis le téléphone du client, c'est ce qui a fait la différence. Je démarre les chantiers plus vite.", s: "Les chantiers démarrent plus vite.", k: "2 min", kl: "pour un devis complet" },
  { n: "Sofia Marchand", i: "SM", r: "Traductrice indépendante", c: "Strasbourg", q: "Simple, sans jargon comptable. J'ai créé ma première facture en cinq minutes, sans regarder la doc.", s: "Ma première facture en 5 minutes.", k: "5 min", kl: "avant la 1re facture" },
  { n: "Hugo Perrin", i: "HP", r: "Fondateur, Perrin Menuiserie", c: "Toulouse", q: "Le paiement en ligne a changé nos acomptes : les clients règlent le jour même, plus besoin d'attendre un chèque.", s: "Les acomptes arrivent le jour même.", k: "x2", kl: "acomptes encaissés plus vite" },
];

const stars = `<span class="tm-stars" role="img" aria-label="5 sur 5">${[0, 1, 2, 3, 4].map(() => ic("star", 14).replace("<svg", '<svg fill="currentColor"')).join("")}</span>`;
const by = (t, sub = t.r) => `<div class="tm-by"><span class="tm-av" aria-hidden="true">${t.i}</span><div><cite class="tm-name">${t.n}</cite><span class="tm-role">${sub}</span></div></div>`;
const fig = (t, extra = "") => `<figure class="tm-fig">${extra}<blockquote class="tm-q"><p>${t.q}</p></blockquote><figcaption>${by(t)}</figcaption></figure>`;
const head = (title = "Ils ont repris leurs soirées en main.") => `<header class="tm-head"><p class="tm-eyebrow">Témoignages</p><h3 class="tm-title">${title}</h3></header>`;

const snippet = `<section class="tm">
  <ul class="tm-list tm-grid">
    <li>
      <figure class="tm-fig">
        <blockquote class="tm-q"><p>Payment delays dropped from 38 to 12 days.</p></blockquote>
        <figcaption class="tm-by">
          <span class="tm-av" aria-hidden="true">CR</span>
          <div><cite class="tm-name">Camille Roussel</cite><span class="tm-role">Photographer, Studio Roussel</span></div>
        </figcaption>
      </figure>
    </li>
    <!-- more <li> -->
  </ul>
</section>`;

export default {
  id: "testimonials", label: "Témoignages", group: "Structure", icon: "f_testimonials", size: "lg", fit: 900,
  desc: "Preuve sociale : cartes, citation unique, mur, chiffre clé, bande, éditorial.",
  base, snippet,
  rules: [
    "Quote real customers with full name, role and company, and keep each quote to one concrete result or moment, under 40 words. Vague praise reads as filler.",
    "Use figure/blockquote/figcaption with cite for the author; avatars are decorative (aria-hidden) and initials must stay readable at 40px.",
    "Mix roles and company sizes so a visitor finds someone like themselves; three to six quotes are enough.",
    "Never auto-rotate quotes; if you truncate, keep the full text reachable. Do not reuse the same person as both testimonial and logo proof.",
  ],
  demo: () => `<section class="tm">${head()}<ul class="tm-list tm-grid">${T.slice(0, 3).map((t) => `<li>${fig(t)}</li>`).join("")}</ul></section>`,
  variants: [
    {
      id: "cards", name: "Trois cartes", desc: "Trois cartes avec avatar en initiales et étoiles.", tags: ["Classique", "Rassurant"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Three equal bordered surface cards in a row with 20px gaps and 24px padding; each holds five warning-colored stars, the quote, and a 40px initials avatar with name and role pinned to the bottom.", "Cards share equal height and a small shadow; avatars are accent-soft circles with accent-text initials."],
      demo: () => `<section class="tm">${head()}<ul class="tm-list tm-grid">${T.slice(0, 3).map((t) => `<li>${fig(t, stars)}</li>`).join("")}</ul></section>`,
      css: `
& .tm-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
& .tm-grid > li{display:flex}
& .tm-fig{flex:1;grid-template-rows:auto 1fr auto;padding:24px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-sm)}
& .tm-q{font-size:var(--fs-sm)}
& .tm-fig figcaption{padding-top:16px;border-top:1px solid var(--border)}
@media (max-width:820px){& .tm-grid{grid-template-columns:1fr}}`,
    },
    {
      id: "single", name: "Citation unique", desc: "Une seule grande citation, centrée.", tags: ["Premium", "Focalisé"],
      attrs: { shape: "round", depth: "flat", energy: "premium" },
      spec: ["One centered quote in a 760px column set in the display face at 32px with balanced wrapping, above a centered 48px initials avatar, name and role.", "No card or border; a short 2px accent rule sits above the quote. Use it when a single endorsement carries the page."],
      demo: () => { const t = T[0]; return `<section class="tm"><figure class="tm-fig"><blockquote class="tm-q"><p>« ${t.q} »</p></blockquote><figcaption>${by(t)}</figcaption></figure></section>`; },
      css: `
& .tm{display:grid;justify-items:center;padding-block:88px}
& .tm-fig{width:min(100%,760px);justify-items:center;text-align:center;gap:32px}
& .tm-fig::before{content:'';width:48px;height:2px;background:var(--accent)}
& .tm-q{font:var(--heading-weight) clamp(1.35rem,3.2cqi,2rem)/1.3 var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .tm-by{justify-content:center;text-align:left}
& .tm-av{width:48px;height:48px;font-size:var(--fs-base)}`,
    },
    {
      id: "wall", name: "Mur de citations", desc: "Maçonnerie de citations courtes sur trois colonnes.", tags: ["Dense", "Vivant"],
      attrs: { shape: "inherit", depth: "outline", energy: "calm" },
      spec: ["Three CSS columns (column-gap 16px) of unequal-height bordered cards with the quote first and a small 28px initials avatar, name and role below; cards never split across columns.", "Quotes are short (one to three lines) so the varied heights create a masonry rhythm; the wall shows six or more voices at once."],
      demo: () => `<section class="tm">${head("Ce qu'ils en disent, en deux lignes.")}<ul class="tm-list tm-wall">${[T[0], T[1].q ? { ...T[1], q: T[1].q.split(".")[0] + "." } : T[1], { ...T[2], q: T[2].s }, T[3], { ...T[4], q: T[4].s }, { ...T[5], q: "Les clients règlent l'acompte le jour même." }].map((t) => `<li>${fig(t)}</li>`).join("")}</ul></section>`,
      css: `
& .tm-wall{columns:3;column-gap:16px}
& .tm-wall > li{break-inside:avoid;margin-bottom:16px}
& .tm-fig{gap:16px;padding:20px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface)}
& .tm-q{font-size:var(--fs-sm)}
& .tm-av{width:28px;height:28px;font-size:var(--fs-xs)}
@media (max-width:820px){& .tm-wall{columns:1}}`,
    },
    {
      id: "metric", name: "Chiffre clé", desc: "Un grand résultat chiffré adossé à la citation.", tags: ["Preuve", "Audacieux"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Two-column split separated by a 1px vertical rule: on the left a 72px display-face figure in accent-text with a 14px muted label, on the right the quote and author.", "Two such rows stack with hairlines between them; the figure uses tabular numerals and never wraps."],
      demo: () => `<section class="tm">${head("Des résultats mesurés, pas des impressions.")}<ul class="tm-list tm-metrics">${[T[0], T[1], T[3]].map((t) => `<li class="tm-m"><div class="tm-k"><b>${t.k}</b><span>${t.kl}</span></div>${fig(t)}</li>`).join("")}</ul></section>`,
      css: `
& .tm-metrics{border-top:1px solid var(--text)}
& .tm-m{display:grid;grid-template-columns:260px minmax(0,1fr);gap:48px;align-items:center;padding:32px 0;border-bottom:1px solid var(--border-strong)}
& .tm-k{display:grid;gap:8px;padding-right:32px;border-right:1px solid var(--border-strong)}
& .tm-k b{font:var(--heading-weight) 3.5rem/1 var(--font-display);letter-spacing:var(--heading-tracking);font-variant-numeric:tabular-nums;color:var(--accent-text);white-space:nowrap}
& .tm-k span{font-size:var(--fs-sm);color:var(--text-muted)}
& .tm-q{font-size:var(--fs-lg);max-width:52ch}
@media (max-width:820px){& .tm-m{grid-template-columns:1fr;gap:20px}& .tm-k{border-right:0;padding-right:0}& .tm-k b{font-size:2.5rem}}`,
    },
    {
      id: "strip", name: "Bande de mini-cartes", desc: "Rangée continue de mini-cartes, coupée aux bords.", tags: ["Compact", "Moderne"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["A single non-wrapping row of 280px mini-cards with 16px gaps, wider than its container and faded out at both edges with a 64px mask gradient; static, no animation.", "Each card carries a one-sentence quote (max 12 words) plus a 32px initials avatar, name and role. The strip suggests volume without taking vertical space."],
      demo: () => `<section class="tm">${head("Déjà adopté par 12&nbsp;000 indépendants.")}<div class="tm-strip"><ul class="tm-list tm-track">${T.map((t) => `<li>${fig({ ...t, q: t.s })}</li>`).join("")}</ul></div></section>`,
      css: `
& .tm{overflow:hidden}
& .tm-strip{margin-inline:-48px;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent);mask-image:linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent);padding-block:8px 16px}
& .tm-track{display:flex;gap:16px;width:max-content;padding-inline:24px;transform:translateX(-72px)}
& .tm-track > li{display:flex;flex:none;width:280px}
& .tm-fig{flex:1;gap:16px;padding:20px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-md);grid-template-rows:1fr auto}
& .tm-q{font:600 var(--fs-base)/1.4 var(--font-display);letter-spacing:var(--heading-tracking)}
& .tm-av{width:32px;height:32px;font-size:var(--fs-xs)}
@media (max-width:820px){& .tm-strip{margin-inline:-20px}}`,
    },
    {
      id: "editorial", name: "Éditorial", desc: "Immense guillemet typographique et citation en display.", tags: ["Éditorial", "Élégant"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["A 160px display-face opening quotation mark in accent-soft-to-accent color hangs in a 120px left column beside the quote set at 28px in the display face with 1.3 leading.", "The attribution sits under a 1px rule: name in semibold, role and city in muted small text; no avatar. Suits one long, well-written endorsement."],
      demo: () => { const t = T[2]; return `<section class="tm"><figure class="tm-fig"><span class="tm-mark" aria-hidden="true">“</span><blockquote class="tm-q"><p>${t.q}</p></blockquote><figcaption class="tm-cap"><cite class="tm-name">${t.n}</cite><span class="tm-role">${t.r}, ${t.c}</span></figcaption></figure></section>`; },
      css: `
& .tm-fig{grid-template-columns:120px minmax(0,1fr);column-gap:24px;row-gap:28px;align-items:start}
& .tm-mark{grid-row:span 2;font:var(--heading-weight) 10rem/.8 var(--font-display);color:var(--accent);height:.55em;margin-top:.12em;overflow:visible}
& .tm-q{font:var(--heading-weight) clamp(1.35rem,2.8cqi,1.9rem)/1.3 var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance;max-width:26em}
& .tm-cap{display:grid;gap:2px;padding-top:16px;border-top:1px solid var(--text);max-width:26em}
@media (max-width:820px){& .tm-fig{grid-template-columns:1fr}& .tm-mark{grid-row:auto;font-size:6rem}}`,
    },
  ],
};
