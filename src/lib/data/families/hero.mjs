import { ic } from "../icons.mjs";

const base = `
& .hero{position:relative;display:grid;gap:26px;padding:64px 48px;overflow:hidden;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .hero-title{margin:0;font:var(--heading-weight) clamp(2rem,4.6cqi,3.5rem)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .hero-text{margin:0;max-width:46ch;font-size:var(--fs-lg);line-height:1.55;color:var(--text-muted)}
& .hero-copy{display:grid;gap:20px;align-content:center}
& .hero-actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
& .hero-note{margin:0;font-size:var(--fs-xs);color:var(--text-muted)}
& .shot{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-lg);overflow:hidden}
& .shot-bar{display:flex;gap:6px;padding:11px 14px;border-bottom:1px solid var(--border)}
& .shot-bar i{width:9px;height:9px;border-radius:50%;background:var(--border-strong)}
& .shot-body{display:grid;gap:12px;padding:16px}
& .shot-row{display:flex;gap:12px}
& .shot-tile{flex:1;height:58px;border-radius:var(--r-control);background:var(--bg-subtle)}
& .shot-tile.acc{background:var(--accent-soft)}
& .shot-line{height:10px;border-radius:5px;background:var(--bg-subtle)}
& .shot-line.s{width:60%}
@media (max-width:820px){& .hero{padding:44px 20px}& .hero-split{grid-template-columns:1fr !important}}
`;

const shot = `<div class="shot"><div class="shot-bar"><i></i><i></i><i></i></div><div class="shot-body"><div class="shot-row"><div class="shot-tile acc"></div><div class="shot-tile"></div><div class="shot-tile"></div></div><div class="shot-line"></div><div class="shot-line s"></div><div class="shot-line"></div></div></div>`;

const copy = (c, { title = "Vos factures, payées plus vite.", text = "Créez un devis, envoyez la facture et relancez automatiquement. Tout tient sur un seul écran.", note = "Sans carte bancaire, 14 jours offerts." } = {}) =>
  `<div class="hero-copy"><h3 class="hero-title">${title}</h3><p class="hero-text">${text}</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button><button class="btn btn-secondary btn-lg">Voir la démo</button>`)}</div><p class="hero-note">${note}</p></div>`;

const snippetBase = `<section class="hero">
  <div class="hero-copy">
    <h1 class="hero-title">Get paid faster.</h1>
    <p class="hero-text">Create a quote, send the invoice and follow up automatically.</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg">Start free trial</a><a class="btn btn-secondary btn-lg">See the demo</a></div>
    <p class="hero-note">No credit card, 14 days free.</p>
  </div>
  <div class="shot">…product UI crop…</div>
</section>`;

export default {
  id: "hero", label: "Hero", group: "Structure", icon: "f_hero", size: "lg", fit: 900, deps: ["buttons"],
  desc: "La première section de ta page : produit à côté, centré, typographique, éditorial…",
  base, snippet: snippetBase,
  rules: [
    "One <h1>, the largest type on the page. Headline states the outcome for the user in about 9 words, in plain language.",
    "One primary call to action (verb + object) and at most one secondary. Reuse the exact same label in the navbar and final CTA.",
    "Show the real product (screenshot crop or live component) rather than stock imagery. Never lorem ipsum.",
    "Do not highlight a single word of the headline in a different color or italic. Size the hero to its content, not to 100vh.",
  ],
  demo: (c) => `<div class="hero hero-split" style="grid-template-columns:1.05fr 1fr;align-items:center">${copy(c)}${shot}</div>`,
  variants: [
    {
      id: "split", name: "Côte à côte", desc: "Texte à gauche, capture du produit à droite.", tags: ["Standard", "Produit"],
      attrs: { shape: "inherit", depth: "soft", energy: "crisp" },
      spec: ["Two columns (1.05fr / 1fr), copy left-aligned and vertically centered, product screenshot on the right with shadow-lg.", "Stacks to one column below 820px with copy first."],
      css: `
& .hero-split{grid-template-columns:1.05fr 1fr;align-items:center}`,
    },
    {
      id: "centered", name: "Centré", desc: "Titre centré, boutons centrés, capture dessous.", tags: ["Classique", "Marketing"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Everything centered on a 720px measure: headline, text, buttons, note, then the product screenshot below at 640px wide.", "Generous vertical rhythm, no columns."],
      demo: (c) => `<div class="hero hero-centered">${copy(c)}<div class="hero-shotwrap">${shot}</div></div>`,
      css: `
& .hero-centered{justify-items:center;text-align:center;padding-bottom:48px}
& .hero-centered .hero-copy{justify-items:center;max-width:720px}
& .hero-centered .hero-text{margin-inline:auto}
& .hero-centered .hero-actions{justify-content:center}
& .hero-shotwrap{width:min(100%,640px)}`,
    },
    {
      id: "type", name: "Typographique", desc: "Un titre géant sur toute la largeur, sans image.", tags: ["Audacieux", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Headline in a very large display size (clamp 3rem to 6.5rem, leading 0.95) across the full width, left aligned.", "Below a hairline rule: description on the left, actions on the right.", "No imagery; the type is the visual."],
      demo: (c) => `<div class="hero hero-type"><h3 class="hero-title">Vos factures, payées plus vite.</h3><div class="hero-row"><p class="hero-text">Créez un devis, envoyez la facture et relancez automatiquement. Tout tient sur un seul écran.</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button><button class="btn btn-secondary btn-lg">Voir la démo</button>`)}</div></div></div>`,
      css: `
& .hero-type{gap:36px;padding:72px 48px 48px}
& .hero-type .hero-title{font-size:clamp(3rem,9.2cqi,6.5rem);line-height:.95;max-width:12ch}
& .hero-type .hero-row{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;padding-top:26px;border-top:1px solid var(--text)}
@media (max-width:820px){& .hero-type .hero-row{flex-direction:column;align-items:flex-start}}`,
    },
    {
      id: "editorial", name: "Éditorial", desc: "Composition asymétrique : grand visuel et texte décalé.", tags: ["Créatif", "Marque"],
      attrs: { shape: "inherit", depth: "flat", energy: "editorial" },
      spec: ["Asymmetric 5/7 grid: a tall abstract artwork block spanning 7 columns and copy in 5 columns aligned to the bottom.", "Headline uses the display face at 3.25rem; a single caption line sits under the artwork."],
      demo: (c) => `<div class="hero hero-editorial"><div class="hero-copy">${`<h3 class="hero-title">Vos factures, payées plus vite.</h3><p class="hero-text">Créez un devis, envoyez la facture et relancez automatiquement.</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button>`)}</div>`}</div><figure class="hero-art" style="margin:0"><div class="art"><i></i><b></b></div><figcaption class="hero-note">Tableau de bord de facturation, version 4.</figcaption></figure></div>`,
      css: `
& .hero-editorial{grid-template-columns:5fr 7fr;align-items:end;gap:40px;padding:48px}
& .hero-editorial .hero-title{font-size:clamp(2.2rem,4cqi,3.25rem)}
& .hero-editorial .hero-copy{align-content:end;padding-bottom:8px}
& .art{position:relative;height:300px;border-radius:var(--r-surface);background:linear-gradient(160deg,color-mix(in srgb,var(--accent) 70%,var(--bg)),color-mix(in srgb,var(--accent) 16%,var(--bg)));overflow:hidden}
& .art i{position:absolute;right:12%;top:14%;width:34%;aspect-ratio:1;border-radius:50%;background:var(--bg);opacity:.9}
& .art b{position:absolute;left:10%;bottom:-8%;width:46%;height:60%;border-radius:var(--r-surface) var(--r-surface) 0 0;background:var(--accent-contrast);opacity:.35}
& .hero-editorial .hero-note{margin-top:10px}
@media (max-width:820px){& .hero-editorial{grid-template-columns:1fr}}`,
    },
    {
      id: "product", name: "Produit en bas", desc: "Capture large qui déborde en bas de la section.", tags: ["Produit", "Impact"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Centered copy on a subtle accent-tinted top gradient; the product screenshot is 760px wide and is cut off by the bottom edge of the section (top corners rounded only).", "Communicates that the product is the hero."],
      demo: (c) => `<div class="hero hero-product">${copy(c, { note: "Sans carte bancaire, 14 jours offerts." })}<div class="hero-shotwrap">${shot}</div></div>`,
      css: `
& .hero-product{justify-items:center;text-align:center;padding-bottom:0;background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 9%,var(--bg)),var(--bg) 70%)}
& .hero-product .hero-copy{justify-items:center;max-width:680px}
& .hero-product .hero-text{margin-inline:auto}
& .hero-product .hero-actions{justify-content:center}
& .hero-shotwrap{width:min(100%,760px);margin-bottom:-90px}
& .hero-product .shot{border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom:0}
& .hero-product .shot-body{padding-bottom:110px}`,
    },
    {
      id: "stats", name: "Chiffres clés", desc: "Texte à gauche, colonne de chiffres vérifiables à droite.", tags: ["Confiance", "Data"],
      attrs: { shape: "sharp", depth: "flat", energy: "crisp" },
      spec: ["Copy on the left; on the right a stack of three key figures separated by hairlines, each with a display-face number in tabular numerals and a plain-language label.", "Use only real, verifiable numbers with units."],
      demo: (c) => `<div class="hero hero-stats" style="grid-template-columns:1.1fr .9fr;align-items:center">${copy(c)}<dl class="hero-figures"><div><dt>Factures envoyées</dt><dd>1,2 M</dd></div><div><dt>Délai moyen de paiement</dt><dd>9 jours</dd></div><div><dt>Disponibilité sur 12 mois</dt><dd>99,98 %</dd></div></dl></div>`,
      css: `
& .hero-stats{grid-template-columns:1.1fr .9fr;align-items:center;gap:56px}
& .hero-figures{display:grid;margin:0;border-top:1px solid var(--text)}
& .hero-figures > div{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:18px 0;border-bottom:1px solid var(--border-strong)}
& .hero-figures dt{font-size:var(--fs-sm);color:var(--text-muted)}
& .hero-figures dd{margin:0;font:var(--heading-weight) var(--fs-3xl)/1 var(--font-display);letter-spacing:var(--heading-tracking);font-variant-numeric:tabular-nums}
@media (max-width:820px){& .hero-stats{grid-template-columns:1fr}}`,
    },
    {
      id: "email", name: "Formulaire e-mail", desc: "Titre centré et champ e-mail avec bouton dans le même bloc.", tags: ["Conversion", "Lancement"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Centered copy on a 640px measure, then a single 480px capture field: surface pill-ish container (control radius + 6px), 1px border-strong, shadow-md, with the input and the large primary button inside it.", "Focus inside the field turns the border accent and adds a 3px focus halo; below it a row of three overlapping 28px initials avatars and one line of social proof.", "Below 820px the field stacks vertically."],
      snippet: `<section class="hero hero-email">
  <div class="hero-copy">
    <h1 class="hero-title">Get paid faster.</h1>
    <p class="hero-text">Create a quote, send the invoice and follow up automatically.</p>
    <form class="hero-form"><input type="email" placeholder="you@company.com" aria-label="Email address" required><button class="btn btn-primary btn-lg">Start free trial</button></form>
    <p class="hero-note">No credit card, 14 days free.</p>
    <div class="hero-proof"><span class="hero-faces"><i>AB</i><i>MR</i><i>LK</i></span>Trusted by 4,200 freelancers</div>
  </div>
</section>`,
      demo: (c) => `<div class="hero hero-email"><div class="hero-copy"><h3 class="hero-title">Vos factures, payées plus vite.</h3><p class="hero-text">Créez un devis, envoyez la facture et relancez automatiquement. Tout tient sur un seul écran.</p><div class="hero-form" role="group" aria-label="Inscription">${`<input type="email" placeholder="vous@entreprise.fr" aria-label="Adresse e-mail">`}${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button>`)}</div><p class="hero-note">Sans carte bancaire, 14 jours offerts.</p><div class="hero-proof"><span class="hero-faces"><i>AB</i><i>MR</i><i>LK</i></span>Déjà 4 200 indépendants nous font confiance</div></div></div>`,
      css: `
& .hero-email{justify-items:center;text-align:center;padding:76px 48px 64px}
& .hero-email .hero-copy{justify-items:center;max-width:640px}
& .hero-email .hero-text{margin-inline:auto}
& .hero-form{display:flex;gap:8px;width:min(100%,480px);padding:6px;background:var(--surface);border:1px solid var(--border-strong);border-radius:calc(var(--r-control) + 6px);box-shadow:var(--shadow-md);transition:border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .hero-form:focus-within{border-color:var(--accent);box-shadow:var(--shadow-md),0 0 0 3px color-mix(in srgb,var(--focus) 35%,transparent)}
& .hero-form input{flex:1;min-width:0;padding:0 14px;border:0;background:none;outline:none;color:var(--text);font:400 var(--fs-base) var(--font-body)}
& .hero-form input::placeholder{color:var(--text-muted)}
& .hero-proof{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:var(--fs-sm);color:var(--text-muted)}
& .hero-faces{display:flex}
& .hero-faces i{display:grid;place-items:center;width:28px;height:28px;margin-left:-8px;border:2px solid var(--bg);border-radius:50%;background:var(--accent-soft);color:var(--accent-text);font:700 10px/1 var(--font-body);font-style:normal}
& .hero-faces i:first-child{margin-left:0}
& .hero-faces i:nth-child(2){background:var(--bg-subtle);color:var(--text)}
& .hero-faces i:nth-child(3){background:var(--accent);color:var(--accent-contrast)}
@media (max-width:820px){& .hero-email{padding:48px 20px}& .hero-form{flex-direction:column}& .hero-form input{height:var(--control-h)}& .hero-proof{flex-direction:column;gap:6px}}`,
    },
    {
      id: "dots", name: "Grille de points", desc: "Centré sur un fond pointillé qui s'estompe au centre.", tags: ["Technique", "Léger"],
      attrs: { shape: "inherit", depth: "flat", energy: "technical" },
      spec: ["Centered copy on a 22px dot grid (1.2px dots at 22% text color) drawn on a pseudo-element and masked so it fades out behind the text and stays visible at the edges.", "An eyebrow pill above the headline: bordered, surface fill, small accent dot and one line of news.", "No imagery; generous 92px vertical padding."],
      snippet: `<section class="hero hero-dots">
  <div class="hero-copy">
    <span class="hero-eyebrow"><i></i>New · Automatic reminders</span>
    <h1 class="hero-title">Get paid faster.</h1>
    <p class="hero-text">Create a quote, send the invoice and follow up automatically.</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg">Start free trial</a><a class="btn btn-secondary btn-lg">See the demo</a></div>
  </div>
</section>`,
      demo: (c) => `<div class="hero hero-dots"><div class="hero-copy"><span class="hero-eyebrow"><i></i>Nouveau · Relances automatiques</span><h3 class="hero-title">Vos factures, payées plus vite.</h3><p class="hero-text">Créez un devis, envoyez la facture et relancez automatiquement. Tout tient sur un seul écran.</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button><button class="btn btn-secondary btn-lg">Voir la démo</button>`)}</div><p class="hero-note">Sans carte bancaire, 14 jours offerts.</p></div></div>`,
      css: `
& .hero-dots{justify-items:center;text-align:center;padding:92px 48px}
& .hero-dots::before{content:'';position:absolute;inset:0;background-image:radial-gradient(color-mix(in srgb,var(--text) 22%,transparent) 1.2px,transparent 1.5px);background-size:22px 22px;-webkit-mask-image:radial-gradient(ellipse 55% 60% at 50% 50%,transparent,var(--text));mask-image:radial-gradient(ellipse 55% 60% at 50% 50%,transparent,var(--text));pointer-events:none}
& .hero-dots .hero-copy{position:relative;justify-items:center;max-width:680px}
& .hero-dots .hero-text{margin-inline:auto}
& .hero-dots .hero-actions{justify-content:center}
& .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px 6px 10px;border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface);color:var(--text-muted);font:500 var(--fs-xs)/1 var(--font-body)}
& .hero-eyebrow i{width:7px;height:7px;border-radius:50%;background:var(--accent)}
@media (max-width:820px){& .hero-dots{padding:56px 20px}}`,
    },
    {
      id: "halo", name: "Halo sombre", desc: "Section inversée avec une lueur d'accent et une bande de chiffres.", tags: ["Premium", "Contrasté"],
      attrs: { shape: "inherit", depth: "glass", energy: "premium" },
      spec: ["Section filled with the inverse color (text) and inverse type; a large blurred radial glow of the accent color (65% mix) sits behind the top-center of the copy.", "Centered copy; secondary text uses a 70% inverse mix. A three-column figures band closes the section under a 18% inverse hairline.", "The glow is decorative and never carries content."],
      snippet: `<section class="hero hero-halo">
  <div class="hero-copy">
    <h1 class="hero-title">Get paid faster.</h1>
    <p class="hero-text">Create a quote, send the invoice and follow up automatically.</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg">Start free trial</a><a class="btn btn-secondary btn-lg">See the demo</a></div>
  </div>
  <dl class="hero-facts"><div><dt>Invoices sent</dt><dd>1.2M</dd></div>…</dl>
</section>`,
      demo: (c) => `<div class="hero hero-halo"><div class="hero-copy">${`<h3 class="hero-title">Vos factures, payées plus vite.</h3><p class="hero-text">Créez un devis, envoyez la facture et relancez automatiquement. Tout tient sur un seul écran.</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button><button class="btn btn-secondary btn-lg">Voir la démo</button>`)}</div>`}</div><dl class="hero-facts"><div><dt>Factures envoyées</dt><dd>1,2 M</dd></div><div><dt>Délai moyen de paiement</dt><dd>9 jours</dd></div><div><dt>Disponibilité sur 12 mois</dt><dd>99,98 %</dd></div></dl></div>`,
      css: `
& .hero-halo{justify-items:center;text-align:center;gap:52px;padding:84px 48px 0;background:var(--text);color:var(--bg)}
& .hero-halo::before{content:'';position:absolute;left:50%;top:-30%;width:70%;aspect-ratio:1.7;transform:translateX(-50%);background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 65%,transparent),transparent);filter:blur(24px);pointer-events:none}
& .hero-halo .hero-copy{position:relative;justify-items:center;max-width:680px}
& .hero-halo .hero-text,& .hero-halo .hero-note{margin-inline:auto;color:color-mix(in srgb,var(--bg) 70%,var(--text))}
& .hero-halo .hero-actions{justify-content:center}
& .hero-facts{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));width:100%;margin:0;border-top:1px solid color-mix(in srgb,var(--bg) 18%,transparent)}
& .hero-facts > div{display:grid;gap:6px;padding:22px 16px 26px}
& .hero-facts > div + div{border-left:1px solid color-mix(in srgb,var(--bg) 18%,transparent)}
& .hero-facts dt{order:2;font-size:var(--fs-sm);color:color-mix(in srgb,var(--bg) 62%,var(--text))}
& .hero-facts dd{margin:0;font:var(--heading-weight) var(--fs-2xl)/1 var(--font-display);letter-spacing:var(--heading-tracking);font-variant-numeric:tabular-nums}
@media (max-width:820px){& .hero-halo{padding:52px 20px 0;gap:36px}& .hero-facts{grid-template-columns:1fr}& .hero-facts > div + div{border-left:0;border-top:1px solid color-mix(in srgb,var(--bg) 18%,transparent)}}`,
    },
    {
      id: "flip", name: "Split inversé", desc: "Panneau coloré avec la capture à gauche, texte à droite.", tags: ["Marque", "Produit"],
      attrs: { shape: "inherit", depth: "lift", energy: "friendly" },
      spec: ["Two equal columns with no outer padding: a left panel filled with an accent gradient (accent to a 55% accent/text mix) holding the product screenshot, and the copy on the right.", "The screenshot overhangs the panel edge by 40px and overlaps the copy column (shadow-lg, above the text layer).", "Stacks below 820px with the panel first."],
      snippet: `<section class="hero hero-flip">
  <div class="hero-stage"><div class="shot">…product UI crop…</div></div>
  <div class="hero-copy">
    <h1 class="hero-title">Get paid faster.</h1>
    <p class="hero-text">Create a quote, send the invoice and follow up automatically.</p>
    <div class="hero-actions"><a class="btn btn-primary btn-lg">Start free trial</a><a class="btn btn-secondary btn-lg">See the demo</a></div>
  </div>
</section>`,
      demo: (c) => `<div class="hero hero-flip"><div class="hero-stage">${shot}</div>${copy(c)}</div>`,
      css: `
& .hero-flip{grid-template-columns:1fr 1fr;gap:0;padding:0;align-items:stretch}
& .hero-stage{position:relative;z-index:1;display:grid;align-items:center;padding:52px 0 52px 40px;background:linear-gradient(150deg,var(--accent),color-mix(in srgb,var(--accent) 55%,var(--text)))}
& .hero-stage .shot{margin-right:-40px}
& .hero-flip .hero-copy{padding:56px 48px 56px 76px}
@media (max-width:820px){& .hero-flip{grid-template-columns:1fr}& .hero-stage{padding:32px 20px}& .hero-stage .shot{margin-right:0}& .hero-flip .hero-copy{padding:36px 20px 44px}}`,
    },
    {
      id: "floating", name: "Cartes flottantes", desc: "Copy centrée entourée de petites notifications produit.", tags: ["Vivant", "Produit"],
      attrs: { shape: "inherit", depth: "lift", energy: "playful" },
      spec: ["Centered copy on a 480px measure; four small surface cards (radius-surface, 1px border, shadow-md, 176px wide) float in the corners, each tilted 2deg or less: paid invoice, reminder sent, signed quote and a mini bar chart of the month.", "Cards are absolutely positioned around the copy and never overlap it; below 820px they become a wrapped row under the buttons.", "Content is real product events with amounts and names, not decoration."],
      snippet: `<section class="hero hero-float">
  <div class="hero-copy">…centered headline, text, actions…</div>
  <div class="hero-cards">
    <div class="fl fl-a"><span class="fl-ic">✓</span><div><b>Invoice paid</b><small>Atelier Lune · +€1,240</small></div></div>
    <div class="fl fl-b">…</div><div class="fl fl-c">…</div><div class="fl fl-d">…</div>
  </div>
</section>`,
      demo: (c) => `<div class="hero hero-float"><div class="hero-copy">${`<h3 class="hero-title">Vos factures, payées plus vite.</h3><p class="hero-text">Créez un devis, envoyez la facture et relancez automatiquement.</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button><button class="btn btn-secondary btn-lg">Voir la démo</button>`)}</div>`}</div><div class="hero-cards"><div class="fl fl-a"><span class="fl-ic ok">${ic("check", 16)}</span><div><b>Facture payée</b><small>Atelier Lune · +1 240 €</small></div></div><div class="fl fl-b"><span class="fl-ic">${ic("bell", 16)}</span><div><b>Relance envoyée</b><small>Studio Verdier · il y a 2 h</small></div></div><div class="fl fl-c"><span class="fl-ic">${ic("mail", 16)}</span><div><b>Devis signé</b><small>N° 0142 · Marie Roche</small></div></div><div class="fl fl-d"><div><small>Encaissé en septembre</small><b>8 460 €</b></div><span class="fl-bars"><i style="height:35%"></i><i style="height:55%"></i><i style="height:42%"></i><i style="height:78%"></i><i style="height:100%"></i></span></div></div></div>`,
      css: `
& .hero-float{justify-items:center;text-align:center;padding:100px 48px}
& .hero-float .hero-copy{position:relative;z-index:1;justify-items:center;max-width:480px}
& .hero-float .hero-text{margin-inline:auto}
& .hero-float .hero-actions{justify-content:center}
& .hero-cards{position:absolute;inset:0;pointer-events:none}
& .fl{position:absolute;display:flex;align-items:center;gap:10px;width:176px;padding:10px 12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-md);text-align:left}
& .fl b{display:block;font:600 var(--fs-sm)/1.25 var(--font-body)}
& .fl small{display:block;margin-top:2px;font-size:11.5px;line-height:1.3;color:var(--text-muted)}
& .fl-ic{display:grid;place-items:center;flex:none;width:30px;height:30px;border-radius:var(--r-control);background:var(--accent-soft);color:var(--accent-text)}
& .fl-ic.ok{background:color-mix(in srgb,var(--success) 18%,transparent);color:var(--success)}
& .fl-a{left:3%;top:20%;transform:rotate(-2deg)}
& .fl-b{right:3%;top:14%;transform:rotate(2deg)}
& .fl-c{left:4%;bottom:14%;transform:rotate(1.5deg)}
& .fl-d{right:4%;bottom:12%;justify-content:space-between;transform:rotate(-1.5deg)}
& .fl-bars{display:flex;align-items:flex-end;gap:3px;flex:none;height:32px}
& .fl-bars i{width:6px;border-radius:2px;background:var(--accent)}
@media (max-width:820px){& .hero-float{padding:48px 20px}& .hero-cards{position:static;display:flex;flex-wrap:wrap;justify-content:center;gap:12px}& .fl{position:static;transform:none}}`,
    },
    {
      id: "manifesto", name: "Manifeste", desc: "Une prise de position en grand, texte long sur deux colonnes.", tags: ["Éditorial", "Marque"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Left-aligned statement headline (clamp 2rem to 3.25rem, max 22ch) under a small eyebrow with a 24px leading rule.", "A 760px long-form text set in two CSS columns (16px, 1.65 leading, muted) with a display-face drop cap on the first paragraph, then a signature line.", "A single primary action sits below a text-colored hairline; no imagery."],
      snippet: `<section class="hero hero-manifesto">
  <span class="hero-eyebrow">Our stance</span>
  <h1 class="hero-title">A freelancer should not spend evenings chasing invoices.</h1>
  <div class="hero-cols"><p>…</p><p>…</p></div>
  <p class="hero-sign">— Léa and Karim, founders</p>
  <div class="hero-actions"><a class="btn btn-primary btn-lg">Start free trial</a></div>
</section>`,
      demo: (c) => `<div class="hero hero-manifesto"><span class="hero-eyebrow">Notre parti pris</span><h3 class="hero-title">Un indépendant ne devrait pas passer ses soirées à relancer des factures.</h3><div class="hero-cols"><p>Nous avons construit Nomade après trois ans à courir derrière des paiements en retard. Chaque relance gênante, chaque tableur oublié nous a coûté du temps que nous aurions préféré passer avec nos clients.</p><p>Alors nous avons tout simplifié : un devis se transforme en facture d'un clic, les rappels partent seuls avec le bon ton, et vous voyez d'un coup d'œil ce qui rentre. Pas de module en option, pas de jargon comptable.</p></div><p class="hero-sign">Léa et Karim, fondateurs de Nomade</p><div class="hero-actions">${c.scope("buttons", `<button class="btn btn-primary btn-lg">Essayer gratuitement</button>`)}</div></div>`,
      css: `
& .hero-manifesto{gap:28px;padding:72px 48px 56px}
& .hero-eyebrow{display:inline-flex;align-items:center;gap:12px;font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted)}
& .hero-eyebrow::before{content:'';width:24px;height:1px;background:var(--text)}
& .hero-manifesto .hero-title{max-width:22ch;font-size:clamp(2rem,4.4cqi,3.25rem)}
& .hero-cols{columns:2;column-gap:40px;max-width:760px;font-size:var(--fs-base);line-height:1.65;color:var(--text-muted)}
& .hero-cols p{margin:0 0 1em}
& .hero-cols p:first-child::first-letter{float:left;padding:6px 10px 0 0;font:var(--heading-weight) 3.6em/.8 var(--font-display);color:var(--text)}
& .hero-sign{margin:0;font-size:var(--fs-sm);font-style:italic;color:var(--text)}
& .hero-manifesto .hero-actions{padding-top:24px;border-top:1px solid var(--text)}
@media (max-width:820px){& .hero-manifesto{padding:44px 20px}& .hero-cols{columns:1}}`,
    },
  ],
};
