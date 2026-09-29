import { ic } from "../icons.mjs";

const base = `
& .auth{display:grid;place-items:center;min-height:560px;padding:56px 24px;background:var(--bg);color:var(--text);font-family:var(--font-body)}
& .auth-card{display:grid;gap:22px;width:min(100%,400px);min-width:0}
& .auth-brand{display:inline-flex;align-items:center;gap:10px;font:700 var(--fs-lg)/1 var(--font-display);letter-spacing:var(--heading-tracking);color:var(--text)}
& .auth-mark{display:grid;place-items:center;width:28px;height:28px;border-radius:var(--r-sm);background:var(--accent);color:var(--accent-contrast);font:800 var(--fs-sm)/1 var(--font-display)}
& .auth-head{display:grid;gap:8px}
& .auth-title{margin:0;font:var(--heading-weight) var(--fs-2xl)/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .auth-sub{margin:0;font-size:var(--fs-base);line-height:1.5;color:var(--text-muted)}
& .auth-form{display:grid;gap:16px;margin:0}
& .auth-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
& .auth-check{display:inline-flex;align-items:center;gap:8px;font-size:var(--fs-sm);color:var(--text);cursor:pointer}
& .auth-check input{width:16px;height:16px;margin:0;accent-color:var(--accent);cursor:pointer}
& .auth-check input:focus-visible{outline:2px solid var(--focus);outline-offset:2px}
& .auth-link{font:600 var(--fs-sm)/1.2 var(--font-body);color:var(--accent-text);text-underline-offset:3px;text-decoration:none;border-radius:var(--r-sm);transition:color var(--dur) var(--ease)}
& .auth-link:hover{text-decoration:underline}
& .auth-link:focus-visible{outline:2px solid var(--focus);outline-offset:3px}
& .auth .btn{width:100%}
& .auth-foot{margin:0;font-size:var(--fs-sm);color:var(--text-muted);text-align:center}
& .auth-foot .auth-link{margin-left:4px}
& .auth-oauth{display:grid;gap:10px}
& .auth-oauth .btn{gap:10px}
& .auth-ico{display:inline-grid;place-items:center;flex:none;width:18px;height:18px;border-radius:var(--r-full);background:var(--text);color:var(--bg);font:800 11px/1 var(--font-body)}
& .auth-ico.gh{background:radial-gradient(circle at 50% 42%,var(--bg) 0 28%,transparent 30%),var(--text)}
& .auth-sep{display:flex;align-items:center;gap:14px;font-size:var(--fs-xs);letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
& .auth-sep::before,& .auth-sep::after{content:'';flex:1;height:1px;background:var(--border)}
@media (max-width:640px){& .auth{padding:36px 16px}}
`;

const T = "Bon retour parmi nous";
const S = "Connectez-vous pour retrouver vos factures et vos clients.";

const brand = `<span class="auth-brand"><span class="auth-mark" aria-hidden="true">N</span>Nomade</span>`;

const fields = (c, { err = true, mail = "camille@studio-lune.fr" } = {}) => c.scope("inputs", `
<div class="field"><label class="lbl" for="${c.uid}e">Adresse e-mail</label><input class="input" id="${c.uid}e" type="email" value="${mail}" autocomplete="email"></div>
<div class="field${err ? " is-invalid" : ""}"><label class="lbl" for="${c.uid}p">Mot de passe</label><input class="input" id="${c.uid}p" type="password" value="motdepasse"${err ? ` aria-invalid="true" aria-describedby="${c.uid}h"` : ""} autocomplete="current-password">${err ? `<span class="hint" id="${c.uid}h">Mot de passe incorrect. Il vous reste 2 essais.</span>` : ""}</div>`);

const row = (c) => `<div class="auth-row"><label class="auth-check"><input type="checkbox" checked>Rester connecté</label><a class="auth-link" href="#">Mot de passe oublié ?</a></div>`;
const submit = (c, label = "Se connecter") => c.scope("buttons", `<button class="btn btn-primary btn-lg" type="submit">${label}</button>`);
const foot = `<p class="auth-foot">Pas encore de compte ?<a class="auth-link" href="#">Créer un compte</a></p>`;

const form = (c, o) => `<form class="auth-form" onsubmit="return false">${fields(c, o)}${row(c)}${submit(c)}</form>`;

const snippet = `<section class="auth">
  <div class="auth-card">
    <span class="auth-brand">Nomade</span>
    <div class="auth-head">
      <h2 class="auth-title">Welcome back</h2>
      <p class="auth-sub">Sign in to find your invoices and clients.</p>
    </div>
    <form class="auth-form">
      <div class="field"><label class="lbl" for="email">Email address</label><input class="input" id="email" type="email"></div>
      <div class="field is-invalid"><label class="lbl" for="pw">Password</label><input class="input" id="pw" type="password" aria-invalid="true" aria-describedby="pw-h"><span class="hint" id="pw-h">Incorrect password. 2 attempts left.</span></div>
      <div class="auth-row">
        <label class="auth-check"><input type="checkbox">Keep me signed in</label>
        <a class="auth-link" href="#">Forgot password?</a>
      </div>
      <button class="btn btn-primary btn-lg" type="submit">Sign in</button>
    </form>
    <p class="auth-foot">No account yet?<a class="auth-link" href="#">Create one</a></p>
  </div>
</section>`;

export default {
  id: "auth", label: "Connexion", group: "Sections", icon: "f_auth", size: "lg", fit: 900, deps: ["buttons", "inputs"],
  desc: "Écrans de connexion et d'inscription : carte, écran scindé, minimal, social, étapes, brut.",
  base, snippet,
  rules: [
    "One primary action per screen, full width, labelled with the verb ('Se connecter', 'Créer mon compte'). Sign-in and sign-up are cross-linked in a line under the form.",
    "Every field has a visible label; errors replace the hint under the field, name the problem specifically and set aria-invalid plus aria-describedby. Never clear the e-mail on failure.",
    "Put 'Forgot password?' and 'Keep me signed in' on one row directly under the password field, never as a separate page section. Allow password managers (autocomplete attributes, no paste blocking).",
    "If social sign-in is offered, it is shown with the same weight as the form and separated by an 'or' divider; never make it the only path without a fallback.",
  ],
  demo: (c) => `<section class="auth"><div class="auth-card">${brand}<div class="auth-head"><h3 class="auth-title">${T}</h3><p class="auth-sub">${S}</p></div>${form(c)}${foot}</div></section>`,
  variants: [
    {
      id: "card", name: "Carte centrée", desc: "Carte surélevée centrée sur un fond légèrement teinté.", tags: ["Classique", "Sûr"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["A 420px surface card with a 1px border, surface radius, 36px padding and shadow-md, centered on a bg-subtle page with 64px vertical padding.", "Brand mark, title and sub-line are centered above the form; the footer link sits below a hairline inside the card."],
      demo: (c) => `<section class="auth"><div class="auth-card"><div class="auth-top">${brand}</div><div class="auth-head"><h3 class="auth-title">${T}</h3><p class="auth-sub">${S}</p></div>${form(c)}${foot}</div></section>`,
      css: `
& .auth{background:var(--bg-subtle);padding:64px 24px}
& .auth-card{width:min(100%,420px);gap:22px;padding:36px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);box-shadow:var(--shadow-md)}
& .auth-top,& .auth-head{justify-items:center;text-align:center}
& .auth-top{display:grid}
& .auth-foot{padding-top:20px;border-top:1px solid var(--border)}`,
    },
    {
      id: "split", name: "Écran scindé", desc: "Formulaire à gauche, panneau de marque avec citation à droite.", tags: ["Éditorial", "Marque"],
      attrs: { shape: "inherit", depth: "flat", energy: "premium" },
      spec: ["Two equal columns with no gap and a 560px minimum height: the form column is centered on the page color, the brand panel is filled with the accent and holds a quote at the bottom.", "The quote is set at 1.5rem in the display font with a small avatar, name and role beneath; all panel text uses accent-contrast and the panel collapses under the form on narrow widths."],
      demo: (c) => `<section class="auth"><div class="auth-split"><div class="auth-pane"><div class="auth-card">${brand}<div class="auth-head"><h3 class="auth-title">${T}</h3><p class="auth-sub">${S}</p></div>${form(c)}${foot}</div></div><aside class="auth-brandpane"><span class="auth-eyebrow">Facturation pour indépendants</span><figure class="auth-quote"><blockquote>« Je facture en deux minutes et mes clients paient en moyenne neuf jours plus tôt. »</blockquote><figcaption><span class="auth-avatar" aria-hidden="true">LM</span><span><strong>Léa Martin</strong><br>Illustratrice freelance, Lyon</span></figcaption></figure></aside></div></section>`,
      css: `
& .auth{display:block;padding:0}
& .auth-split{display:grid;grid-template-columns:1fr 1fr;min-height:600px}
& .auth-pane{display:grid;place-items:center;padding:48px 40px;min-width:0}
& .auth-brandpane{display:flex;flex-direction:column;justify-content:space-between;gap:32px;padding:48px 44px;background:var(--accent);color:var(--accent-contrast)}
& .auth-eyebrow{font:600 var(--fs-xs)/1 var(--font-body);letter-spacing:.1em;text-transform:uppercase;opacity:.8}
& .auth-quote{margin:0;display:grid;gap:24px}
& .auth-quote blockquote{margin:0;font:var(--heading-weight) 1.5rem/1.3 var(--font-display);letter-spacing:var(--heading-tracking);text-wrap:balance}
& .auth-quote figcaption{display:flex;align-items:center;gap:12px;font-size:var(--fs-sm);line-height:1.4;color:color-mix(in srgb,var(--accent-contrast) 82%,transparent)}
& .auth-quote strong{color:var(--accent-contrast)}
& .auth-avatar{display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:var(--r-full);border:1.5px solid color-mix(in srgb,var(--accent-contrast) 60%,transparent);font:700 var(--fs-sm)/1 var(--font-body)}
@media (max-width:760px){& .auth-split{grid-template-columns:1fr}& .auth-pane{padding:36px 20px}& .auth-brandpane{padding:32px 24px}}`,
    },
    {
      id: "minimal", name: "Minimal", desc: "Sans carte : un titre, des champs, un bouton.", tags: ["Minimal", "Discret"],
      attrs: { shape: "sharp", depth: "flat", energy: "calm" },
      spec: ["No card, no background change and no brand mark: a 340px left-aligned column centered on the page, with a 2rem title and a single muted sentence above the fields.", "Fields and the submit button run at full column width, a 1px hairline separates the form from the sign-up line, and nothing else is decorated."],
      demo: (c) => `<section class="auth"><div class="auth-card"><div class="auth-head"><h3 class="auth-title">Connexion</h3><p class="auth-sub">Nomade, la facturation sans friction.</p></div>${form(c)}${foot}</div></section>`,
      css: `
& .auth{padding:72px 24px}
& .auth-card{width:min(100%,340px);gap:28px}
& .auth-title{font-size:var(--fs-3xl);line-height:1.05}
& .auth-foot{text-align:left;padding-top:20px;border-top:1px solid var(--border-strong)}
& .auth-foot .auth-link{margin-left:0;display:inline-block;margin-left:6px}`,
    },
    {
      id: "social", name: "Social d'abord", desc: "Google et GitHub en tête, séparateur « ou », puis le formulaire.", tags: ["Rapide", "Conversion"],
      attrs: { shape: "inherit", depth: "outline", energy: "friendly" },
      spec: ["Two full-width secondary buttons with a 18px round glyph and a text label sit first, followed by an uppercase 'ou' divider made of two hairlines, then the e-mail form.", "The card is a 1px-bordered surface with no shadow, 32px padding and left-aligned copy; the glyphs are pure CSS discs in the text color, never external logos."],
      demo: (c) => `<section class="auth"><div class="auth-card"><div class="auth-head">${brand}<h3 class="auth-title" style="margin-top:10px">${T}</h3><p class="auth-sub">Choisissez comment vous connecter.</p></div><div class="auth-oauth">${c.scope("buttons", `<button class="btn btn-secondary btn-lg" type="button"><span class="auth-ico" aria-hidden="true">G</span>Continuer avec Google</button><button class="btn btn-secondary btn-lg" type="button"><span class="auth-ico gh" aria-hidden="true"></span>Continuer avec GitHub</button>`)}</div><div class="auth-sep" role="separator">ou</div>${form(c, { err: false })}${foot}</div></section>`,
      css: `
& .auth{background:var(--bg-subtle);padding:48px 24px}
& .auth-card{width:min(100%,420px);gap:20px;padding:32px;background:var(--surface);border:var(--border-w) solid var(--border-strong);border-radius:var(--r-surface)}
& .auth-oauth .btn{justify-content:center}
& .auth-form{gap:14px}`,
    },
    {
      id: "steps", name: "Inscription en 2 étapes", desc: "Création de compte découpée avec indicateur de progression.", tags: ["Guidé", "Inscription"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["A two-node progress indicator sits above the title: a completed step 1 shown as an accent disc with a check, a 2px connecting bar filled to 100%, and the current step 2 as an accent-outlined disc with a soft ring, each with a caption below.", "Step 2 shows the password and terms fields with a primary 'Créer mon compte' button and a ghost 'Retour'; the card is a soft-shadow surface with a 3px accent top border."],
      snippet: `<section class="auth">
  <div class="auth-card">
    <ol class="auth-steps" aria-label="Progress">
      <li class="is-done"><span class="auth-dot">✓</span>Account</li>
      <li class="is-current" aria-current="step"><span class="auth-dot">2</span>Security</li>
    </ol>
    <h2 class="auth-title">Secure your account</h2>
    <form class="auth-form">
      <div class="field"><label class="lbl" for="pw">Password</label><input class="input" id="pw" type="password"></div>
      <label class="auth-check"><input type="checkbox">I accept the terms of use</label>
      <button class="btn btn-primary btn-lg">Create my account</button>
      <button class="btn btn-ghost" type="button">Back</button>
    </form>
  </div>
</section>`,
      demo: (c) => `<section class="auth"><div class="auth-card"><ol class="auth-steps" aria-label="Progression"><li class="is-done"><span class="auth-dot">${ic("check", 14)}</span>Votre profil</li><li class="is-current" aria-current="step"><span class="auth-dot">2</span>Sécurité</li></ol><div class="auth-head"><h3 class="auth-title">Sécurisez votre compte</h3><p class="auth-sub">Étape 2 sur 2 · Bienvenue, Camille. Il ne reste qu'un mot de passe.</p></div><form class="auth-form" onsubmit="return false">${c.scope("inputs", `<div class="field is-invalid"><label class="lbl" for="${c.uid}p">Mot de passe</label><input class="input" id="${c.uid}p" type="password" value="nomade" aria-invalid="true" aria-describedby="${c.uid}h" autocomplete="new-password"><span class="hint" id="${c.uid}h">10 caractères minimum, dont un chiffre.</span></div><div class="field"><label class="lbl" for="${c.uid}c">Confirmer le mot de passe</label><input class="input" id="${c.uid}c" type="password" autocomplete="new-password"></div>`)}<label class="auth-check"><input type="checkbox" checked>J'accepte les conditions d'utilisation</label>${submit(c, "Créer mon compte")}${c.scope("buttons", `<button class="btn btn-ghost" type="button">Retour</button>`)}</form><p class="auth-foot">Déjà inscrit ?<a class="auth-link" href="#">Se connecter</a></p></div></section>`,
      css: `
& .auth{background:var(--bg-subtle)}
& .auth-card{width:min(100%,440px);padding:32px 36px 28px;background:var(--surface);border:var(--border-w) solid var(--border);border-top:3px solid var(--accent);border-radius:var(--r-surface);box-shadow:var(--shadow-md)}
& .auth-steps{list-style:none;margin:0;padding:0;display:flex;align-items:flex-start;justify-content:center;gap:0;counter-reset:s}
& .auth-steps li{position:relative;display:grid;justify-items:center;gap:8px;width:120px;font:600 var(--fs-xs)/1.2 var(--font-body);color:var(--text-muted)}
& .auth-steps li + li::before{content:'';position:absolute;top:13px;right:50%;width:100%;height:2px;background:var(--accent);z-index:0}
& .auth-dot{position:relative;z-index:1;display:grid;place-items:center;width:28px;height:28px;border-radius:var(--r-full);background:var(--surface);border:2px solid var(--border-strong);font:700 var(--fs-xs)/1 var(--font-body);color:var(--text-muted)}
& .auth-steps .is-done{color:var(--text)}
& .auth-steps .is-done .auth-dot{background:var(--accent);border-color:var(--accent);color:var(--accent-contrast)}
& .auth-steps .is-current{color:var(--accent-text)}
& .auth-steps .is-current .auth-dot{border-color:var(--accent);color:var(--accent-text);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 20%,transparent)}
& .auth-head{text-align:center}`,
    },
    {
      id: "raw", name: "Brut bordé", desc: "Gros contour, ombre dure et fond teinté.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["The card has a 3px text-color border, an 8px hard offset shadow with no blur and an accent-soft fill, over a plain page background; the title is 800 weight with a rotated accent sticker reading 'Espace client' on the top edge.", "Links are underlined at 2px in the text color and invert to an accent block on hover, and the checkbox gets a 2px text-colored outline; the fields and buttons keep the styles of the chosen input and button families."],
      demo: (c) => `<section class="auth"><div class="auth-card"><span class="auth-sticker">Espace client</span>${brand}<div class="auth-head"><h3 class="auth-title">${T}</h3><p class="auth-sub">${S}</p></div>${form(c)}${foot}</div></section>`,
      css: `
& .auth{padding:64px 24px 72px}
& .auth-card{position:relative;width:min(100%,430px);padding:36px 34px;background:var(--accent-soft);border:3px solid var(--text);border-radius:var(--r-surface);box-shadow:8px 8px 0 var(--text)}
& .auth-title{font-weight:800}
& .auth-sub,& .auth-foot{color:var(--text)}
& .auth-sticker{position:absolute;top:-18px;right:24px;padding:8px 14px;background:var(--accent);color:var(--accent-contrast);border:2px solid var(--text);border-radius:var(--r-sm);font:800 var(--fs-sm)/1 var(--font-body);transform:rotate(-5deg)}
& .auth-link{color:var(--text);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}
& .auth-link:hover{background:var(--accent);color:var(--accent-contrast)}
& .auth-check input{outline:2px solid var(--text);outline-offset:0}
& .auth-check input:focus-visible{outline:3px solid var(--focus);outline-offset:2px}`,
    },
  ],
};
