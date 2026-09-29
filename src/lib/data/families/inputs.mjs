import { ic } from "../icons.mjs";

const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a93a3' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

const base = `
& .field{display:grid;gap:6px;width:100%}
& .lbl{font:600 var(--fs-xs)/1.2 var(--font-body);color:var(--text)}
& .hint{font:400 var(--fs-xs)/1.35 var(--font-body);color:var(--text-muted)}
& .input{width:100%;height:var(--control-h);padding:0 calc(var(--pad-x) - 2px);font:400 var(--fs-ctl)/1.2 var(--font-body);color:var(--text);background:var(--surface);border:var(--border-w) solid var(--border-strong);border-radius:var(--r-control);outline:none;transition:border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease),background var(--dur) var(--ease)}
& .input::placeholder{color:var(--text-muted);opacity:.9}
& select.input{appearance:none;-webkit-appearance:none;padding-right:36px;background-image:${chevron};background-repeat:no-repeat;background-position:right 12px center}
& textarea.input{height:auto;min-height:84px;padding:10px calc(var(--pad-x) - 2px);resize:vertical;line-height:1.45}
& .input:disabled{opacity:.55;cursor:not-allowed}
& .field.is-invalid .input{border-color:var(--danger)}
& .field.is-invalid .hint{color:var(--danger)}
`;

const std = (uid) => `<div class="stack" style="width:min(100%,300px)">
<div class="field"><label class="lbl" for="${uid}a">Adresse e-mail</label><input class="input" id="${uid}a" type="email" placeholder="vous@exemple.fr"></div>
<div class="field"><label class="lbl" for="${uid}b">Mot de passe</label><input class="input" id="${uid}b" type="password" value="motdepasse"><span class="hint">8 caractères minimum</span></div>
<div class="field is-invalid"><label class="lbl" for="${uid}c">Code postal</label><input class="input" id="${uid}c" value="7500"><span class="hint">Le code postal doit avoir 5 chiffres.</span></div>
<div class="field"><label class="lbl" for="${uid}d">Pays</label><select class="input" id="${uid}d"><option>France</option><option>Belgique</option></select></div>
</div>`;

const stdSnippet = `<div class="field">
  <label class="lbl" for="email">Email address</label>
  <input class="input" id="email" type="email" placeholder="you@example.com">
  <span class="hint">We only use it to sign you in.</span>
</div>
<div class="field is-invalid"> … <span class="hint">Postal code must have 5 digits.</span></div>
<select class="input">…</select>  <textarea class="input"></textarea>`;

export default {
  id: "inputs", label: "Champs", group: "Composants", icon: "f_inputs", size: "md",
  desc: "Champs de texte, listes et messages d'erreur. Contour, rempli, souligné, flottant…",
  base, snippet: stdSnippet,
  rules: [
    "Every input has a visible label linked with for/id. A placeholder is an example, never the label.",
    "Helper text sits under the field; errors replace it, use danger color plus a specific message, and set aria-invalid and aria-describedby.",
    "States to implement: default, hover, focus, filled, invalid, disabled, read-only. Focus is always clearly visible.",
    "Input font size is at least 16px on mobile to avoid iOS zoom.",
  ],
  demo: (c) => std(c.uid),
  variants: [
    {
      id: "outlined", name: "Contour", desc: "Boîte bordée classique, focus par bordure d'accent.", tags: ["Classique", "Net"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Surface fill with a strong border; hover darkens the border to text-muted.", "Focus turns the border to accent and adds a 1px accent ring.", "Radius follows the control radius."],
      css: `
& .input:hover:not(:disabled){border-color:var(--text-muted)}
& .input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}`,
    },
    {
      id: "filled", name: "Rempli", desc: "Fond teinté sans bordure, s'éclaircit au focus.", tags: ["Doux", "Moderne"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["bg-subtle fill, transparent border; hover deepens the fill.", "Focus switches to the surface fill with an accent border and a soft accent ring.", "Invalid keeps the fill and adds a danger border."],
      css: `
& .input{background:var(--bg-subtle);border-color:transparent}
& .input:hover:not(:disabled){background:color-mix(in srgb,var(--text) 7%,var(--bg-subtle))}
& .input:focus{background:var(--surface);border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 18%,transparent)}`,
    },
    {
      id: "underline", name: "Ligne", desc: "Simple trait en dessous, ultra léger.", tags: ["Minimal", "Éditorial"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["No box: a single bottom border, zero radius and zero horizontal padding.", "Focus thickens the line to accent.", "Labels stay above in the small bold style."],
      css: `
& .input{background:transparent;border:0;border-bottom:var(--border-w) solid var(--border-strong);border-radius:0;padding-left:0;padding-right:0}
& .input:hover:not(:disabled){border-bottom-color:var(--text-muted)}
& .input:focus{border-bottom-color:var(--accent);box-shadow:0 1px 0 0 var(--accent)}
& select.input{background-position:right 0 center}`,
    },
    {
      id: "floating", name: "Label flottant", desc: "Le libellé se glisse dans le bord au focus.", tags: ["Compact", "Mobile"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["The label sits inside the field as a placeholder and floats onto the top border when focused or filled.", "Markup order is input first, label second, with placeholder=' ' to detect emptiness in CSS.", "Floated label is accent-text on focus."],
      snippet: `<div class="field float">
  <input class="input" id="email" type="email" placeholder=" ">
  <label class="lbl" for="email">Email address</label>
  <span class="hint">Optional helper text</span>
</div>`,
      demo: (c) => `<div class="stack" style="width:min(100%,300px)">
<div class="field float"><input class="input" id="${c.uid}a" type="email" placeholder=" "><label class="lbl" for="${c.uid}a">Adresse e-mail</label></div>
<div class="field float"><input class="input" id="${c.uid}b" type="password" value="motdepasse" placeholder=" "><label class="lbl" for="${c.uid}b">Mot de passe</label><span class="hint">8 caractères minimum</span></div>
<div class="field float is-invalid"><input class="input" id="${c.uid}c" value="7500" placeholder=" "><label class="lbl" for="${c.uid}c">Code postal</label><span class="hint">Le code postal doit avoir 5 chiffres.</span></div>
</div>`,
      css: `
& .field.float{position:relative}
& .float .lbl{position:absolute;left:calc(var(--pad-x) - 6px);top:calc(var(--control-h) / 2);transform:translateY(-50%);padding:0 4px;background:var(--surface);color:var(--text-muted);font-weight:400;font-size:var(--fs-ctl);pointer-events:none;transition:all var(--dur) var(--ease)}
& .float .input:focus + .lbl,& .float .input:not(:placeholder-shown) + .lbl{top:0;font-size:var(--fs-xs);font-weight:600;color:var(--text)}
& .float .input:focus + .lbl{color:var(--accent-text)}
& .float.is-invalid .input + .lbl{color:var(--danger)}
& .input:hover:not(:disabled){border-color:var(--text-muted)}
& .input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}`,
    },
    {
      id: "inset", name: "Creusé", desc: "Ombre interne : le champ semble enfoncé dans la page.", tags: ["Tactile", "Relief"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["bg-subtle fill with an inner top shadow and a faint inner ring, no visible border.", "Focus lifts the field to the surface color with an accent ring.", "Pairs well with soft global shadows."],
      css: `
& .input{background:var(--bg-subtle);border-color:transparent;box-shadow:inset 0 1px 2px color-mix(in srgb,var(--text) 16%,transparent),inset 0 0 0 1px color-mix(in srgb,var(--text) 7%,transparent)}
& .input:focus{background:var(--surface);box-shadow:inset 0 1px 2px color-mix(in srgb,var(--text) 10%,transparent),0 0 0 2px var(--accent)}`,
    },
    {
      id: "halo", name: "Halo", desc: "Bordure discrète, large halo coloré au focus.", tags: ["Doux", "Visible"],
      attrs: { shape: "inherit", depth: "soft", energy: "friendly" },
      spec: ["Hairline neutral border at rest.", "Focus shows a 4px translucent accent halo and an accent border.", "Invalid focus uses a danger halo."],
      css: `
& .input{border-color:var(--border-strong)}
& .input:hover:not(:disabled){border-color:var(--text-muted)}
& .input:focus{border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 26%,transparent)}
& .field.is-invalid .input:focus{box-shadow:0 0 0 4px color-mix(in srgb,var(--danger) 24%,transparent)}`,
    },
    {
      id: "brut", name: "Brut", desc: "Contour épais et ombre dure qui change de couleur au focus.", tags: ["Audacieux", "Ludique"],
      attrs: { shape: "inherit", depth: "hard", energy: "playful" },
      spec: ["2px text-colored border with a 3px hard shadow at rest.", "Focus moves the field up-left and the shadow becomes accent, 4px.", "Labels are bold and slightly larger."],
      css: `
& .lbl{font-size:var(--fs-sm);font-weight:700}
& .input{border:2px solid var(--text);box-shadow:3px 3px 0 var(--text)}
& .input:focus{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--accent)}
& .field.is-invalid .input{border-color:var(--danger);box-shadow:3px 3px 0 var(--danger)}`,
    },
    {
      id: "console", name: "Console", desc: "Police mono, angles droits, libellé façon invite de commande.", tags: ["Technique", "Dev"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Monospace input text, 2px radius, transparent fill.", "Labels are monospace with a leading '$' in accent-text.", "Caret and focus border use the accent color."],
      css: `
& .lbl{font-family:var(--font-mono);font-weight:500}
& .lbl::before{content:'$ ';color:var(--accent-text)}
& .input{font-family:var(--font-mono);border-radius:2px;background:transparent;caret-color:var(--accent)}
& .input:hover:not(:disabled){border-color:var(--text-muted)}
& .input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}`,
    },
    {
      id: "search", name: "Recherche", desc: "Champ pilule avec icône intégrée à gauche.", tags: ["Amical", "Recherche"],
      attrs: { shape: "pill", depth: "soft", energy: "friendly" },
      spec: ["Fully rounded field (radius-full) with a 16px icon absolutely placed 16px from the left, inside a .input-wrap; the input gets 44px left padding.", "Icon is text-muted and turns accent-text on focus-within; focus shows a 3px translucent accent ring with an accent border.", "A .affix span can hold a unit (€, %) on the right; it sits inside the pill and never overlaps the text."],
      snippet: `<div class="field">
  <label class="lbl" for="q">Search invoices</label>
  <div class="input-wrap">
    <svg class="ic">…</svg>
    <input class="input" id="q" type="search" placeholder="Client, number, amount">
  </div>
</div>
<div class="input-wrap"><svg class="ic">…</svg><input class="input" …><span class="affix">€</span></div>`,
      demo: (c) => `<div class="stack" style="width:min(100%,300px)">
<div class="field"><label class="lbl" for="${c.uid}a">Rechercher une facture</label><div class="input-wrap">${ic("search")}<input class="input" id="${c.uid}a" type="search" placeholder="Client, numéro, montant"></div></div>
<div class="field"><label class="lbl" for="${c.uid}b">E-mail du client</label><div class="input-wrap">${ic("mail")}<input class="input" id="${c.uid}b" type="email" value="camille@atelier-lune.fr"></div><span class="hint">Reçoit la facture en PDF.</span></div>
<div class="field is-invalid"><label class="lbl" for="${c.uid}c">Montant TTC</label><div class="input-wrap"><input class="input" id="${c.uid}c" value="12 4O" inputmode="decimal"><span class="affix">€</span></div><span class="hint">Saisissez un montant valide.</span></div>
<div class="field"><label class="lbl" for="${c.uid}d">Référence</label><div class="input-wrap">${ic("folder")}<input class="input" id="${c.uid}d" value="FAC-2026-0142" disabled></div></div>
</div>`,
      css: `
& .input-wrap{position:relative;display:flex;align-items:center;width:100%}
& .input-wrap .ic{position:absolute;left:16px;width:16px;height:16px;color:var(--text-muted);pointer-events:none;transition:color var(--dur) var(--ease)}
& .input-wrap:focus-within .ic{color:var(--accent-text)}
& .input-wrap .affix{position:absolute;right:16px;font:600 var(--fs-ctl)/1 var(--font-body);color:var(--text-muted);pointer-events:none}
& .input{border-radius:var(--r-full);border-color:var(--border);background:var(--bg-subtle);padding-left:var(--pad-x);padding-right:var(--pad-x)}
& .input-wrap .ic ~ .input{padding-left:44px}
& .input-wrap .affix ~ .input,& .input-wrap .input:has(+ .affix){padding-right:40px}
& .input:hover:not(:disabled){border-color:var(--border-strong)}
& .input:focus{background:var(--surface);border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 22%,transparent)}
& .field.is-invalid .input:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--danger) 22%,transparent)}`,
    },
    {
      id: "action", name: "Champ + bouton", desc: "Champ et bouton soudés dans un même bloc.", tags: ["Fonctionnel", "Compact"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["A .input-group joins the field and its .go button flush: the shared outer border is one continuous rounded rectangle, the button has an accent fill and no left radius.", "The group gets the focus treatment (accent border plus 1px ring) when its input is focused, so the button never looks detached.", "Use for single-action inputs: promo code, invite by e-mail, subscribe."],
      snippet: `<div class="field">
  <label class="lbl" for="promo">Promo code</label>
  <div class="input-group">
    <input class="input" id="promo" placeholder="NOMADE20">
    <button class="go" type="button">Apply</button>
  </div>
</div>`,
      demo: (c) => `<div class="stack" style="width:min(100%,300px)">
<div class="field"><label class="lbl" for="${c.uid}a">Code promo</label><div class="input-group"><input class="input" id="${c.uid}a" placeholder="NOMADE20"><button class="go" type="button">Appliquer</button></div></div>
<div class="field"><label class="lbl" for="${c.uid}b">Inviter un collaborateur</label><div class="input-group"><input class="input" id="${c.uid}b" type="email" value="samir@studio-nord.fr"><button class="go" type="button" aria-label="Envoyer l'invitation">${ic("arrow")}</button></div><span class="hint">Il recevra un lien valable 7 jours.</span></div>
<div class="field is-invalid"><label class="lbl" for="${c.uid}c">Lien de paiement</label><div class="input-group"><input class="input" id="${c.uid}c" value="nomade.fr/pay/"><button class="go" type="button">Copier</button></div><span class="hint">Le lien doit se terminer par un identifiant.</span></div>
<div class="field"><label class="lbl" for="${c.uid}d">Pays</label><select class="input" id="${c.uid}d"><option>France</option><option>Belgique</option></select></div>
</div>`,
      css: `
& .input-group{display:flex;width:100%;border:var(--border-w) solid var(--border-strong);border-radius:var(--r-control);background:var(--surface);overflow:hidden;transition:border-color var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .input-group:hover{border-color:var(--text-muted)}
& .input-group:focus-within{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}
& .input-group .input{border:0;border-radius:0;background:transparent;box-shadow:none;height:calc(var(--control-h) - var(--border-w) * 2);min-width:0;flex:1}
& .input-group .go{flex:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 var(--pad-x);border:0;background:var(--accent);color:var(--accent-contrast);font:600 var(--fs-ctl)/1 var(--font-body);cursor:pointer;transition:background var(--dur) var(--ease)}
& .input-group .go:hover{background:var(--accent-hover)}
& .input-group .go:focus-visible{outline:2px solid var(--focus);outline-offset:-4px}
& .input-group .go .ic{width:1.15em;height:1.15em}
& .field.is-invalid .input-group{border-color:var(--danger)}
& .field.is-invalid .input-group .go{background:var(--danger);color:var(--danger-contrast)}
& select.input{border:var(--border-w) solid var(--border-strong);border-radius:var(--r-control)}
& select.input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}`,
    },
    {
      id: "duo", name: "Bicolore", desc: "Cadre épais moitié encre, moitié accent.", tags: ["Graphique", "Audacieux"],
      attrs: { shape: "inherit", depth: "outline", energy: "playful" },
      spec: ["3px border split in two colors: top and left in the text color, bottom and right in accent, giving a two-tone frame with no shadow.", "Focus swaps the colors (accent top-left, text bottom-right) and thickens nothing, so the box never shifts.", "Invalid turns the accent half into danger; labels are 700 weight."],
      css: `
& .lbl{font-weight:700}
& .input{border-width:3px;border-style:solid;border-color:var(--text) var(--accent) var(--accent) var(--text);padding-left:calc(var(--pad-x) - 4px)}
& .input:hover:not(:disabled){border-color:var(--text) var(--accent-hover) var(--accent-hover) var(--text);background:var(--bg-subtle)}
& .input:focus{border-color:var(--accent) var(--text) var(--text) var(--accent)}
& .field.is-invalid .input{border-color:var(--text) var(--danger) var(--danger) var(--text)}
& .field.is-invalid .input:focus{border-color:var(--danger) var(--text) var(--text) var(--danger)}`,
    },
    {
      id: "inverse", name: "Inversé", desc: "Champ plein couleur du texte : sombre en clair, clair en sombre.", tags: ["Contrasté", "Moderne"],
      attrs: { shape: "inherit", depth: "flat", energy: "premium" },
      spec: ["Field is filled with the text color and typed text uses the page background color, so it inverts against the surface in both modes.", "Placeholder is bg mixed 55% with text; no border at rest, focus adds a 2px accent ring offset by a 2px page-colored gap.", "Invalid keeps the fill and shows a danger underline inset shadow."],
      css: `
& .input{background:var(--text);color:var(--bg);border-color:transparent;caret-color:var(--accent)}
& .input::placeholder{color:color-mix(in srgb,var(--bg) 55%,var(--text));opacity:1}
& .input:hover:not(:disabled){background:color-mix(in srgb,var(--text) 90%,var(--accent))}
& .input:focus{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--accent)}
& select.input{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a8b0bd' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")}
& select.input option{background:var(--surface);color:var(--text)}
& .field.is-invalid .input{box-shadow:inset 0 -3px 0 var(--danger)}
& .field.is-invalid .input:focus{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--danger)}`,
    },
    {
      id: "inline", name: "Libellé intégré", desc: "Le libellé forme une cellule collée à gauche du champ.", tags: ["Dense", "Formulaire"],
      attrs: { shape: "inherit", depth: "outline", energy: "technical" },
      spec: ["Label and input share one row as two joined cells: a bg-subtle label cell (min 8.5em, right hairline) then the input with no left border.", "Radius is applied only to the outer corners; hints span the full width under the pair.", "Label cell border and input border turn accent together on focus-within, danger when invalid."],
      css: `
& .field{grid-template-columns:auto 1fr;gap:0 0;align-items:stretch}
& .field .hint{grid-column:1 / -1;margin-top:6px}
& .lbl{display:flex;align-items:center;min-width:8.5em;padding:0 calc(var(--pad-x) - 4px);background:var(--bg-subtle);color:var(--text-muted);border:var(--border-w) solid var(--border-strong);border-right:0;border-radius:var(--r-control) 0 0 var(--r-control);white-space:nowrap;transition:border-color var(--dur) var(--ease),color var(--dur) var(--ease)}
& .field:focus-within .lbl{border-color:var(--accent);color:var(--accent-text)}
& .field.is-invalid .lbl{border-color:var(--danger);color:var(--danger)}
& .input{border-radius:0 var(--r-control) var(--r-control) 0;min-width:0}
& .input:hover:not(:disabled){border-color:var(--text-muted)}
& .input:focus{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}`,
    },
    {
      id: "card", name: "Carte", desc: "Champ surélevé avec ombre portée, comme une fiche.", tags: ["Premium", "Aéré"],
      attrs: { shape: "inherit", depth: "lift", energy: "premium" },
      spec: ["Field is a raised surface with a hairline border, a taller height (control height + 6px) and a medium drop shadow; radius is the surface radius.", "Hover deepens the shadow; focus lifts by 1px with a large shadow and an accent 2px bottom edge.", "Labels are muted and small-caps-like (uppercase, 0.05em tracking) above the card."],
      css: `
& .lbl{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
& .input{height:calc(var(--control-h) + 6px);background:var(--surface-raised);border-color:var(--border);border-radius:var(--r-surface);padding:0 var(--pad-x);box-shadow:var(--shadow-md)}
& .input:hover:not(:disabled){box-shadow:var(--shadow-lg)}
& .input:focus{transform:translateY(-1px);border-color:var(--border);box-shadow:var(--shadow-lg),inset 0 -2px 0 var(--accent)}
& .field.is-invalid .input{border-color:var(--danger)}
& .field.is-invalid .input:focus{box-shadow:var(--shadow-lg),inset 0 -2px 0 var(--danger)}`,
    },
  ],
};
