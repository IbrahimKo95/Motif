import { ic } from "../icons.mjs";

const base = `
& .cta{position:relative;isolation:isolate;padding:64px 48px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .cta-copy{display:grid;gap:14px;align-content:center;min-width:0}
& .cta-title{margin:0;font:var(--heading-weight) clamp(1.75rem,3.6cqi,2.75rem)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .cta-text{margin:0;max-width:48ch;font-size:var(--fs-lg);line-height:1.55;color:var(--text-muted)}
& .cta-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
& .cta-fine{margin:0;font-size:var(--fs-xs);color:var(--text-muted)}
@media (max-width:820px){& .cta{padding:44px 20px}}
`;

const TITLE = "Prêt à être payé plus vite ?";
const TEXT = "Créez votre compte en deux minutes et envoyez votre première facture aujourd'hui.";
const btns = (c, { p = "Essayer gratuitement", s = "Parler à l'équipe", lg = true } = {}) =>
  c.scope("buttons", `<button class="btn btn-primary${lg ? " btn-lg" : ""}">${p}</button>${s ? `<button class="btn btn-secondary${lg ? " btn-lg" : ""}">${s}</button>` : ""}`);

const snippet = `<section class="cta">
  <div class="cta-copy">
    <h2 class="cta-title">Ready to get paid faster?</h2>
    <p class="cta-text">Create your account in two minutes and send your first invoice today.</p>
  </div>
  <div class="cta-actions">
    <a class="btn btn-primary btn-lg">Start free trial</a>
    <a class="btn btn-secondary btn-lg">Talk to the team</a>
  </div>
  <p class="cta-fine">14 days free, no credit card.</p>
</section>`;

export default {
  id: "cta", label: "Appel à l'action", group: "Sections", icon: "f_cta", size: "lg", fit: 900, deps: ["buttons", "inputs"],
  desc: "La dernière invitation à agir : bandeau, carte, formulaire, sombre, brut, une ligne.",
  base, snippet,
  rules: [
    "One goal per section: a single primary action, with at most one quieter secondary. Reuse the exact primary label from the hero and the navbar.",
    "Headline is a benefit or a direct question in under 8 words; one supporting sentence removes the main objection (price, time, commitment).",
    "Put a reassurance line ('14 days free, no credit card') within reach of the button, in muted small text.",
    "Contrast: text on a filled accent uses --accent-contrast, buttons on it are inverted. Place the section right before the footer, never twice in a row.",
  ],
  demo: (c) => `<section class="cta"><div class="cta-copy"><h3 class="cta-title">${TITLE}</h3><p class="cta-text">${TEXT}</p></div><div class="cta-actions" style="margin-top:24px">${btns(c)}</div></section>`,
  variants: [
    {
      id: "band", name: "Bandeau accent", desc: "Bandeau plein d'accent : texte à gauche, boutons inversés à droite.", tags: ["Franc", "Conversion"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["Full-bleed accent-filled band, copy left and actions right on one row; all text uses accent-contrast, with the sentence at 80% strength.", "Primary button is inverted (accent-contrast fill, accent text) and the secondary is an outlined ghost; both keep visible hover and focus states."],
      demo: (c) => `<section class="cta"><div class="cta-copy"><h3 class="cta-title">${TITLE}</h3><p class="cta-text">${TEXT}</p></div><div class="cta-side"><div class="cta-actions">${btns(c)}</div><p class="cta-fine">14 jours offerts, sans carte bancaire.</p></div></section>`,
      css: `
& .cta{display:flex;align-items:center;justify-content:space-between;gap:40px;padding:56px 48px;background:var(--accent);color:var(--accent-contrast)}
& .cta-text,& .cta-fine{color:color-mix(in srgb,var(--accent-contrast) 80%,transparent)}
& .cta-side{display:grid;gap:12px;flex:none}
& .cta .btn-primary{background:var(--accent-contrast);background-image:none;color:var(--accent);border-color:var(--accent-contrast);box-shadow:none}
& .cta .btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--accent-contrast) 88%,var(--accent))}
& .cta .btn-secondary{background:transparent;background-image:none;color:var(--accent-contrast);border-color:color-mix(in srgb,var(--accent-contrast) 55%,transparent);box-shadow:none}
& .cta .btn-secondary:hover:not(:disabled){background:color-mix(in srgb,var(--accent-contrast) 14%,transparent)}
& .cta .btn:focus-visible{outline-color:var(--accent-contrast)}
@media (max-width:820px){& .cta{flex-direction:column;align-items:flex-start;gap:24px}}`,
    },
    {
      id: "halo", name: "Carte à halo", desc: "Carte centrée posée sur un halo d'accent diffus.", tags: ["Doux", "Premium"],
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["A centered 720px surface card with a 1px border and shadow-lg, over a blurred radial accent glow (38% mix, 24px blur) that extends 40px beyond the card.", "Everything inside is centered: headline, sentence, both buttons and the reassurance line."],
      demo: (c) => `<section class="cta"><div class="cta-card"><h3 class="cta-title">${TITLE}</h3><p class="cta-text">${TEXT}</p><div class="cta-actions">${btns(c)}</div><p class="cta-fine">14 jours offerts, sans carte bancaire.</p></div></section>`,
      css: `
& .cta{display:grid;place-items:center;overflow:hidden;padding:72px 48px}
& .cta-card{position:relative;display:grid;justify-items:center;gap:16px;width:min(100%,720px);padding:56px 40px;text-align:center;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-lg)}
& .cta-card::before{content:'';position:absolute;z-index:-1;inset:-40px;border-radius:var(--r-surface);background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 38%,transparent),transparent);filter:blur(24px)}
& .cta-text{margin-inline:auto}
& .cta-actions{justify-content:center;margin-top:8px}`,
    },
    {
      id: "form", name: "Texte et e-mail", desc: "Argument à gauche, champ e-mail et bouton à droite.", tags: ["Capture", "Conversion"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Two columns (1fr / 380px): copy with a two-item check list on the left, and on the right a bg-subtle form panel holding a labelled e-mail field, a full-width primary button and a consent line.", "The form panel has surface-radius corners and no shadow; the check marks use accent-text."],
      demo: (c) => `<section class="cta"><div class="cta-wrap"><div class="cta-copy"><h3 class="cta-title">${TITLE}</h3><p class="cta-text">${TEXT}</p><ul class="cta-checks"><li>${ic("check", 16)}14 jours offerts, sans carte bancaire</li><li>${ic("check", 16)}Import de vos clients depuis un fichier CSV</li></ul></div><form class="cta-form" onsubmit="return false">${c.scope("inputs", `<div class="field"><label class="lbl" for="${c.uid}e">Adresse e-mail professionnelle</label><input class="input" id="${c.uid}e" type="email" placeholder="vous@exemple.fr" autocomplete="email"></div>`)}${c.scope("buttons", `<button class="btn btn-primary btn-lg" type="submit">Créer mon compte</button>`)}<p class="cta-fine">En continuant, vous acceptez les conditions d'utilisation de Nomade.</p></form></div></section>`,
      css: `
& .cta-wrap{display:grid;grid-template-columns:1fr 380px;gap:56px;align-items:center}
& .cta-checks{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:8px;font-size:var(--fs-sm)}
& .cta-checks li{display:flex;align-items:center;gap:10px}
& .cta-checks .ic{flex:none;color:var(--accent-text)}
& .cta-form{display:grid;gap:14px;padding:28px;background:var(--bg-subtle);border-radius:var(--r-surface)}
& .cta-form .btn{width:100%}
@media (max-width:820px){& .cta-wrap{grid-template-columns:1fr;gap:32px}}`,
    },
    {
      id: "inverted", name: "Sombre inversé", desc: "Fond inversé, grand titre à gauche, quadrillage discret.", tags: ["Contraste", "Impact"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Section painted with the text color as background and the page color as type (a true inversion in both themes), headline at clamp 2rem to 3.5rem, left aligned, over a 40px hairline grid at 10% strength.", "Buttons are inverted too: the primary is filled with the page color, the secondary is a 1px page-color outline."],
      demo: (c) => `<section class="cta"><div class="cta-copy"><h3 class="cta-title">${TITLE}</h3><p class="cta-text">${TEXT}</p><div class="cta-actions" style="margin-top:14px">${btns(c)}</div></div></section>`,
      css: `
& .cta{padding:88px 48px;background:var(--text);color:var(--bg);background-image:linear-gradient(color-mix(in srgb,var(--bg) 10%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--bg) 10%,transparent) 1px,transparent 1px);background-size:40px 40px}
& .cta-title{font-size:clamp(2rem,5cqi,3.5rem);max-width:14ch;line-height:1}
& .cta-text{color:color-mix(in srgb,var(--bg) 75%,transparent)}
& .cta .btn-primary{background:var(--bg);background-image:none;color:var(--text);border-color:var(--bg);box-shadow:none}
& .cta .btn-primary:hover:not(:disabled){background:color-mix(in srgb,var(--bg) 88%,var(--text))}
& .cta .btn-secondary{background:transparent;background-image:none;color:var(--bg);border-color:color-mix(in srgb,var(--bg) 60%,transparent);box-shadow:none}
& .cta .btn-secondary:hover:not(:disabled){background:color-mix(in srgb,var(--bg) 14%,transparent)}
& .cta .btn:focus-visible{outline-color:var(--bg)}`,
    },
    {
      id: "raw", name: "Brut bordé", desc: "Gros contour, ombre dure et autocollant incliné.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["A block with a 3px text border, an 8px hard offset shadow and an accent-soft fill, headline in 800 weight; a bordered accent sticker rotated -6 degrees overlaps the top-right corner.", "Copy left, actions right, all aligned on the bottom baseline; buttons keep their own family style."],
      demo: (c) => `<section class="cta"><div class="cta-box"><span class="cta-sticker">14 jours offerts</span><div class="cta-copy"><h3 class="cta-title">${TITLE}</h3><p class="cta-text">${TEXT}</p></div><div class="cta-actions">${btns(c, { s: "" })}</div></div></section>`,
      css: `
& .cta{padding:64px 48px 72px}
& .cta-box{position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:32px;padding:44px 40px;background:var(--accent-soft);border:3px solid var(--text);border-radius:var(--r-surface);box-shadow:8px 8px 0 var(--text)}
& .cta-title{font-weight:800}
& .cta-text{color:var(--text)}
& .cta-sticker{position:absolute;top:-18px;right:28px;padding:8px 14px;background:var(--accent);color:var(--accent-contrast);border:2px solid var(--text);border-radius:var(--r-sm);font:800 var(--fs-sm)/1 var(--font-body);transform:rotate(-6deg)}
@media (max-width:820px){& .cta-box{flex-direction:column;align-items:flex-start;padding:36px 22px}}`,
    },
    {
      id: "line", name: "Minimal une ligne", desc: "Une phrase, un bouton, deux filets. Rien d'autre.", tags: ["Minimal", "Discret"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["Single row between a 1px top and bottom hairline, 28px vertical padding: an 18px sentence on the left, a text link and one small primary button on the right.", "No background, no icon, no secondary block; suits pages that already have a strong hero."],
      demo: (c) => `<section class="cta"><div class="cta-row"><p class="cta-line">${TITLE} <span>Créez votre compte en deux minutes.</span></p><div class="cta-actions"><a class="cta-link" href="#">Voir les tarifs</a>${c.scope("buttons", `<button class="btn btn-primary">Essayer gratuitement</button>`)}</div></div></section>`,
      css: `
& .cta{padding:32px 48px}
& .cta-row{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-block:28px;border-block:1px solid var(--border-strong)}
& .cta-line{margin:0;font:600 var(--fs-lg)/1.35 var(--font-display);letter-spacing:var(--heading-tracking)}
& .cta-line span{font-family:var(--font-body);font-weight:400;color:var(--text-muted)}
& .cta-link{font:600 var(--fs-sm)/1 var(--font-body);color:var(--text);text-underline-offset:4px}
& .cta-link:hover{color:var(--accent-text)}
& .cta-link:focus-visible{outline:2px solid var(--focus);outline-offset:3px;border-radius:var(--r-sm)}
& .cta-actions{flex:none;gap:20px}
@media (max-width:820px){& .cta{padding:24px 20px}& .cta-row{flex-direction:column;align-items:flex-start}}`,
    },
  ],
};
