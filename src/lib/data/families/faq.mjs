import { ic } from "../icons.mjs";

const base = `
& .fq{padding:72px 48px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .fq-head{display:grid;gap:12px;max-width:560px;margin:0 0 40px}
& .fq-eyebrow{margin:0;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--accent-text)}
& .fq-title{margin:0;font:var(--heading-weight) clamp(1.75rem,3.4cqi,2.5rem)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .fq-lead{margin:0;font-size:var(--fs-base);line-height:1.55;color:var(--text-muted)}
& .fq-lead a{color:var(--accent-text);text-underline-offset:3px}
& .fq-list{display:grid;gap:0}
& .fq-item{border-bottom:1px solid var(--border)}
& .fq-sum{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:20px 0;list-style:none;cursor:pointer;transition:color var(--dur) var(--ease)}
& .fq-sum::-webkit-details-marker{display:none}
& .fq-sum:hover .fq-q{color:var(--accent-text)}
& .fq-sum:focus-visible{outline:2px solid var(--focus);outline-offset:2px;border-radius:var(--r-sm)}
& .fq-q{margin:0;font:600 var(--fs-lg)/1.35 var(--font-body);text-wrap:balance}
& .fq-a{padding:0 48px 22px 0;max-width:64ch}
& .fq-a p{margin:0;font-size:var(--fs-base);line-height:1.6;color:var(--text-muted)}
& .fq-ind{position:relative;flex:none;width:16px;height:16px}
& .fq-ind::before,& .fq-ind::after{content:'';position:absolute;left:0;right:0;top:50%;height:2px;margin-top:-1px;border-radius:1px;background:currentColor;transition:transform var(--dur) var(--ease)}
& .fq-ind::after{transform:rotate(90deg)}
& .fq-item[open] > .fq-sum .fq-ind::after{transform:rotate(0)}
@media (max-width:820px){& .fq{padding:48px 20px}& .fq-a{padding-right:0}}
`;

const QA = [
  { q: "Puis-je essayer Nomade sans carte bancaire ?", a: "Oui. L'essai dure 14 jours, sans carte bancaire ni engagement. À la fin, votre compte passe en formule gratuite (3 clients) si vous ne choisissez pas de plan." },
  { q: "Mes factures sont-elles conformes à la loi française ?", a: "Numérotation séquentielle, mentions obligatoires, TVA ou franchise en base : tout est géré pour vous, et les règles sont mises à jour à chaque évolution légale." },
  { q: "Comment fonctionnent les relances automatiques ?", a: "Nomade envoie un rappel à J+3, J+10 et J+21 après l'échéance. Vous choisissez le ton des messages et vous pouvez suspendre un client à tout moment." },
  { q: "Puis-je transmettre mes données à mon comptable ?", a: "Oui. Exportez le FEC ou un CSV en un clic, ou invitez votre comptable gratuitement en lecture seule." },
  { q: "Que se passe-t-il si je résilie mon abonnement ?", a: "Vous gardez l'accès en lecture et l'export de tous vos documents pendant 10 ans, conformément à l'obligation de conservation comptable." },
  { q: "Comment mes clients me règlent-ils ?", a: "Par carte ou virement depuis le lien de la facture. Le paiement est rapproché automatiquement, sans saisie de votre part." },
];

const head = (title = "Les questions qu'on nous pose le plus.", lead = `Il manque la vôtre ? Écrivez à <a href="#">aide@nomade.example</a>, nous répondons sous un jour ouvré.`) =>
  `<header class="fq-head"><p class="fq-eyebrow">FAQ</p><h3 class="fq-title">${title}</h3><p class="fq-lead">${lead}</p></header>`;

const acc = (items, { mark = () => "", ind = `<span class="fq-ind" aria-hidden="true"></span>`, open = 0 } = {}) =>
  items.map((x, n) => `<details class="fq-item"${n === open ? " open" : ""}><summary class="fq-sum">${mark(n)}<span class="fq-q">${x.q}</span>${ind}</summary><div class="fq-a"><p>${x.a}</p></div></details>`).join("");

const snippet = `<section class="fq">
  <header class="fq-head"><p class="fq-eyebrow">FAQ</p><h2 class="fq-title">Frequently asked questions</h2></header>
  <div class="fq-list">
    <details class="fq-item" open>
      <summary class="fq-sum"><span class="fq-q">Can I try it without a credit card?</span><span class="fq-ind" aria-hidden="true"></span></summary>
      <div class="fq-a"><p>Yes. The trial lasts 14 days with no card and no commitment.</p></div>
    </details>
    <!-- more <details class="fq-item"> -->
  </div>
</section>`;

export default {
  id: "faq", label: "FAQ", group: "Sections", icon: "f_faq", size: "lg", fit: 900,
  desc: "Lever les objections : accordéon à filets, cartes, colonnes ouvertes, numéroté, brut.",
  base, snippet,
  rules: [
    "Write questions the way customers ask them, in the first person or plain speech, and answer in the first sentence. Keep to 5 to 8 entries, ordered by how often they come up.",
    "Use native <details>/<summary> so it works without JavaScript and is keyboard accessible. Open the most common question by default; never hide critical pricing or legal facts inside it.",
    "The whole summary row is the click target (at least 44px tall) and shows a clear open/closed indicator; the indicator is decorative (aria-hidden).",
    "End with a way to reach a human. Answers stay under 60 words and link to documentation for detail.",
  ],
  demo: () => `<section class="fq" style="display:grid;grid-template-columns:1fr;justify-items:center"><div style="width:min(100%,720px)">${head()}<div class="fq-list">${acc(QA.slice(0, 5))}</div></div></section>`,
  variants: [
    {
      id: "rules", name: "Filets +/−", desc: "Accordéon sobre, séparé par des filets, signe plus/moins.", tags: ["Classique", "Sobre"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["Single 720px column, centered header, rows divided by 1px hairlines with a 1px text rule on top; a 16px plus icon that collapses to a minus when open.", "Question in 18px semibold; hover shifts it to accent-text; answer indented to a 64ch measure."],
      css: `
& .fq-head{margin-inline:auto;text-align:center;justify-items:center}
& .fq-list{width:min(100%,720px);margin-inline:auto;border-top:1px solid var(--text)}`,
      demo: () => `<section class="fq">${head()}<div class="fq-list">${acc(QA.slice(0, 5))}</div></section>`,
    },
    {
      id: "cards", name: "Cartes", desc: "Chaque question dans sa carte, chevron dans une pastille.", tags: ["Doux", "Moderne"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Two columns (320px header, fluid list): the header is left-aligned and the questions are separate bordered surface cards spaced 12px apart.", "Open card gets a raised shadow and accent-soft chevron pill that rotates 180 degrees."],
      demo: () => `<section class="fq"><div class="fq-wrap">${head("Une question ? Voici les réponses.", `Vous ne trouvez pas la vôtre ? Écrivez à <a href="#">aide@nomade.example</a>.`)}<div class="fq-list">${acc(QA.slice(0, 5), { ind: `<span class="fq-ind" aria-hidden="true">${ic("chevronDown", 16)}</span>` })}</div></div></section>`,
      css: `
& .fq-wrap{display:grid;grid-template-columns:320px minmax(0,1fr);gap:56px;align-items:start}
& .fq-head{margin:0}
& .fq-list{gap:12px}
& .fq-item{background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);transition:box-shadow var(--dur) var(--ease)}
& .fq-item[open]{box-shadow:var(--shadow-md)}
& .fq-sum{padding:18px 20px}
& .fq-q{font-size:var(--fs-base)}
& .fq-a{padding:0 20px 20px}
& .fq-ind{display:grid;place-items:center;width:28px;height:28px;border-radius:var(--r-full);background:var(--bg-subtle);color:var(--text);transition:transform var(--dur) var(--ease),background var(--dur) var(--ease)}
& .fq-ind::before,& .fq-ind::after{display:none}
& .fq-item[open] > .fq-sum .fq-ind{transform:rotate(180deg);background:var(--accent-soft);color:var(--accent-text)}
@media (max-width:820px){& .fq-wrap{grid-template-columns:1fr;gap:28px}}`,
    },
    {
      id: "open", name: "Deux colonnes ouvertes", desc: "Toutes les réponses visibles, sur deux colonnes.", tags: ["Lisible", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["No accordion: six question and answer pairs laid out in two columns with a 48px gutter, each pair topped by a 1px hairline (the first row by a 1px text rule).", "Questions in 18px semibold display-face; answers at 15px muted with a 40ch measure. Reads in one glance, best for 4 to 8 short answers."],
      demo: () => `<section class="fq">${head("Tout ce qu'on vous demande avant de vous lancer.")}<div class="fq-list">${QA.map((x) => `<div class="fq-item"><h4 class="fq-q">${x.q}</h4><div class="fq-a"><p>${x.a}</p></div></div>`).join("")}</div></section>`,
      css: `
& .fq-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 48px}
& .fq-item{display:grid;align-content:start;gap:10px;padding:22px 0 26px;border-bottom:0;border-top:1px solid var(--border-strong)}
& .fq-item:nth-child(-n+2){border-top-color:var(--text)}
& .fq-q{font:var(--heading-weight) var(--fs-lg)/1.3 var(--font-display);letter-spacing:var(--heading-tracking)}
& .fq-a{padding:0;max-width:40ch}
& .fq-a p{font-size:var(--fs-sm)}
@media (max-width:820px){& .fq-list{grid-template-columns:1fr}& .fq-item:nth-child(2){border-top-color:var(--border-strong)}}`,
    },
    {
      id: "numbered", name: "Numéroté", desc: "Accordéon avec grands numéros et trait d'accent.", tags: ["Structuré", "Technique"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Each row starts with a two-digit monospace index in a 56px column; answers align under the question, not under the index.", "The open row gains a 2px accent bar on its left edge and its index turns accent-text; a small chevron replaces the plus."],
      demo: () => `<section class="fq"><div class="fq-wrap">${head("Vos questions, dans l'ordre où elles arrivent.")}<div class="fq-list">${acc(QA.slice(0, 5), { mark: (n) => `<span class="fq-n" aria-hidden="true">0${n + 1}</span>`, ind: `<span class="fq-ind" aria-hidden="true">${ic("chevronDown", 16)}</span>` })}</div></div></section>`,
      css: `
& .fq-wrap{display:grid;grid-template-columns:.8fr 1.6fr;gap:48px;align-items:start}
& .fq-head{margin:0}
& .fq-item{position:relative;border-bottom:1px solid var(--border-strong)}
& .fq-item::before{content:'';position:absolute;left:0;top:-1px;bottom:-1px;width:2px;background:var(--accent);transform:scaleY(0);transition:transform var(--dur) var(--ease)}
& .fq-item[open]::before{transform:scaleY(1)}
& .fq-sum{justify-content:flex-start;gap:0;padding:22px 16px 22px 0}
& .fq-n{flex:none;width:56px;padding-left:16px;font:500 var(--fs-sm)/1 var(--font-mono);font-variant-numeric:tabular-nums;color:var(--text-muted);transition:color var(--dur) var(--ease)}
& .fq-item[open] .fq-n{color:var(--accent-text)}
& .fq-q{flex:1;padding-right:16px}
& .fq-a{padding:0 16px 22px 56px}
& .fq-ind{display:block;width:16px;height:16px;transition:transform var(--dur) var(--ease)}
& .fq-ind::before,& .fq-ind::after{display:none}
& .fq-item[open] > .fq-sum .fq-ind{transform:rotate(180deg)}
@media (max-width:820px){& .fq-wrap{grid-template-columns:1fr;gap:28px}}`,
    },
    {
      id: "raw", name: "Liste brute", desc: "Blocs bordés épais, questions et réponses toujours ouvertes.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["Single column of static blocks with a 2px text border and a 4px hard shadow; each block has a bold question on an accent-soft header strip and the answer below, separated by a 2px rule.", "No interaction: questions are prefixed with 'Q.' in the accent color, answers stay visible at all times."],
      demo: () => `<section class="fq"><div class="fq-wrap">${head("Les questions qui reviennent.", `Autre chose ? <a href="#">aide@nomade.example</a>.`)}<div class="fq-list">${QA.slice(0, 4).map((x) => `<article class="fq-item"><h4 class="fq-q">${x.q}</h4><div class="fq-a"><p>${x.a}</p></div></article>`).join("")}</div></div></section>`,
      css: `
& .fq-wrap{width:min(100%,760px);margin-inline:auto}
& .fq-list{gap:18px}
& .fq-item{background:var(--surface);border:2px solid var(--text);border-radius:var(--r-surface);box-shadow:4px 4px 0 var(--text);overflow:hidden}
& .fq-q{padding:14px 20px;background:var(--accent-soft);border-bottom:2px solid var(--text);font-weight:800}
& .fq-q::before{content:'Q. ';color:var(--accent-text)}
& .fq-a{max-width:none;padding:16px 20px 18px}
& .fq-a p{color:var(--text)}`,
    },
  ],
};
