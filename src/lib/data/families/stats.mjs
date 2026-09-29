import { ic } from "../icons.mjs";

const base = `
& .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
& .st{display:grid;gap:14px;font-family:var(--font-body);color:var(--text)}
& .st-item{display:grid;gap:6px;min-width:0;align-content:start}
& .st-label{margin:0;font-size:var(--fs-sm);line-height:1.3;color:var(--text-muted)}
& .st-value{margin:0;font:var(--heading-weight) var(--fs-3xl)/1 var(--font-display);letter-spacing:var(--heading-tracking);font-variant-numeric:tabular-nums;white-space:nowrap}
& .st-value small{font-size:.55em;font-weight:500;color:var(--text-muted);letter-spacing:0;margin-left:.15em}
& .st-delta{display:inline-flex;align-items:center;gap:5px;font-size:var(--fs-xs);font-weight:600;line-height:1;color:var(--success);font-variant-numeric:tabular-nums}
& .st-delta::before{content:'';width:0;height:0;border:4px solid transparent;border-bottom:6px solid currentColor;border-top:0}
& .st-delta.down::before{border-bottom:0;border-top:6px solid currentColor}
& .st-delta.bad{color:var(--danger)}
& .st-note{margin:0;font-size:var(--fs-xs);line-height:1.4;color:var(--text-muted)}
& .spark{display:block;width:100%;height:auto;color:var(--accent);overflow:visible}
`;

// Sparkline SVG : 12 semaines de chiffre d'affaires, tracée avec currentColor / var(--accent).
const spark = (vals, W = 160, H = 44) => {
  const min = Math.min(...vals), max = Math.max(...vals);
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * (W - 6) + 3, H - 5 - ((v - min) / (max - min || 1)) * (H - 12)]);
  const line = pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
  const last = pts[pts.length - 1];
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tendance sur 12 semaines" preserveAspectRatio="xMidYMid meet"><polygon points="3,${H} ${line} ${W - 3},${H}" fill="currentColor" opacity=".13"/><polyline points="${line}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="var(--surface)" stroke="currentColor" stroke-width="1.75"/></svg>`;
};
const CA = [22, 26, 20, 30, 28, 35, 31, 40, 38, 46, 44, 52];
const IMP = [30, 28, 34, 26, 30, 24, 27, 22, 25, 20, 26, 29];

const delta = (dir, good, txt, sr) => `<span class="st-delta ${dir === "up" ? "up" : "down"}${good ? "" : " bad"}"><span class="sr">${sr}</span>${txt}</span>`;
const item = (l, v, d, extra = "") => `<div class="st-item"><p class="st-label">${l}</p><p class="st-value">${v}</p>${d}${extra}</div>`;

const D_CA = delta("up", true, "8,2 %", "En hausse de ");
const D_EN = delta("down", true, "2", "En baisse de ");
const D_DE = delta("down", true, "3 j", "En baisse de ");
const D_IM = delta("up", false, "1 200 €", "En hausse de ");

export default {
  id: "stats", label: "Indicateurs", group: "Composants", icon: "f_stat", size: "md",
  desc: "Chiffres clés : delta, sparkline, typo éditoriale, tuile accent, ligne de KPI, jauge.",
  base,
  snippet: `<div class="st">
  <div class="st-item">
    <p class="st-label">Monthly revenue</p>
    <p class="st-value">12 480<small>€</small></p>
    <span class="st-delta up"><span class="sr">Up </span>8.2%</span>
    <p class="st-note">vs February</p>
  </div>
</div>
<!-- Sparkline: <svg class="spark" role="img" aria-label="12-week trend">…polyline stroke="currentColor"…</svg>
     Delta: .down flips the arrow, .bad turns it danger (up is not always good). -->`,
  rules: [
    "One number, one label, one comparison. The value is the hero: tabular numerals, no more than 8 characters, unit in a smaller weight.",
    "A delta needs a reference period ('vs février') and a direction shown by shape and text, never by color alone. Color states whether the change is good, not whether it rose.",
    "Sparklines are context, not data entry: no axes, currentColor stroke, one highlighted end point, and an accessible label describing the trend.",
    "Do not mix more than one stat style on a screen; align values on the same baseline across a row.",
  ],
  demo: () => `<div class="st">${item("Chiffre d'affaires", "12 480<small>€</small>", D_CA, `<p class="st-note">ce mois-ci, vs février</p>`)}</div>`,
  variants: [
    {
      id: "key", name: "Chiffre clé", desc: "Cartes bordées : libellé, valeur, delta en pastille.", tags: ["Standard", "Net"],
      attrs: { shape: "inherit", depth: "outline", energy: "crisp" },
      spec: ["Two bordered surface cards side by side (16px padding, surface radius); label in text-muted, value at 3xl weight, then a tinted pill delta.", "The delta pill mixes its semantic color 13% into the surface and carries a small arrow shape."],
      demo: () => `<div class="st st-2">${item("Chiffre d'affaires", "12 480<small>€</small>", D_CA + `<p class="st-note">vs février</p>`)}${item("En attente", "7<small>factures</small>", D_EN + `<p class="st-note">vs février</p>`)}</div>`,
      css: `
& .st-2{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
& .st-item{padding:16px;background:var(--surface);border:var(--border-w) solid var(--border);border-radius:var(--r-surface);gap:8px}
& .st-delta{justify-self:start;padding:4px 8px;border-radius:var(--r-full);background:color-mix(in srgb,var(--success) 13%,var(--surface))}
& .st-delta.bad{background:color-mix(in srgb,var(--danger) 13%,var(--surface))}`,
    },
    {
      id: "spark", name: "Sparkline", desc: "Carte avec courbe de tendance sur 12 semaines.", tags: ["Analytique", "Aérien"],
      attrs: { shape: "inherit", depth: "soft", energy: "premium" },
      spec: ["Shadowed card without border: label and delta on one line, value below, then a full-width 160x44 SVG sparkline with a 13% area fill, a 1.75px currentColor line and a ringed end point.", "The line color is the accent (danger for a bad trend); the end point stays the surface color inside."],
      demo: () => `<div class="st">${item("Chiffre d'affaires", "12 480<small>€</small>", D_CA, spark(CA))}${item("Impayés", "1 850<small>€</small>", D_IM, `<span style="color:var(--danger)">${spark(IMP)}</span>`)}</div>`,
      css: `
& .st-item{padding:18px;background:var(--surface);border-radius:var(--r-surface);box-shadow:var(--shadow-md);gap:8px;grid-template-columns:1fr auto;align-items:center}
& .st-label{grid-column:1}
& .st-delta{grid-column:2;grid-row:1;justify-self:end}
& .st-value{grid-column:1 / -1}
& .spark{grid-column:1 / -1;margin-top:4px}
& .st-item > span[style]{grid-column:1 / -1;display:block}`,
    },
    {
      id: "editorial", name: "Éditorial", desc: "Immense chiffre, légende en petites capitales.", tags: ["Éditorial", "Affirmé"],
      attrs: { shape: "sharp", depth: "flat", energy: "editorial" },
      spec: ["Numbers in the display font at up to 5.5rem with tight tracking, sitting between a strong top rule and a caption in uppercase 11px tracking .08em.", "No box: items are separated by hairlines and the delta is inline text ending the caption sentence."],
      demo: () => `<div class="st">${item("Facturé ce mois-ci", "12 480<small>€</small>", "", `<p class="st-note">Soit ${D_CA} de plus qu'en février, porté par trois nouveaux clients.</p>`)}${item("Délai moyen de paiement", "18<small>jours</small>", "", `<p class="st-note">${D_DE} par rapport au trimestre dernier.</p>`)}</div>`,
      css: `
& .st{gap:0}
& .st-item{padding:16px 0 18px;border-top:2px solid var(--text);gap:10px}
& .st-item + .st-item{border-top:var(--border-w) solid var(--border-strong)}
& .st-label{order:-1;font-size:var(--fs-xs);font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text)}
& .st-value{font-size:clamp(3rem,20cqi,5.5rem);line-height:.95;letter-spacing:-.03em}
& .st-value small{font-size:.28em;letter-spacing:.02em}
& .st-note{max-width:36ch;font-size:var(--fs-sm)}
& .st-note .st-delta{font-size:inherit;vertical-align:baseline}`,
    },
    {
      id: "tile", name: "Tuile accent", desc: "Bloc plein d'accent, avec une tuile neutre à côté.", tags: ["Audacieux", "Coloré"],
      attrs: { shape: "inherit", depth: "lift", energy: "friendly" },
      spec: ["Square-ish tiles (min-height 128px, 18px padding) where the first is solid accent with contrast text and a translucent icon disc, the second a bg-subtle tile.", "Value at 3xl, label above it with the icon in a 32px disc; the delta uses contrast color on the accent tile."],
      demo: () => `<div class="st st-2"><div class="st-item is-hero"><span class="st-ico">${ic("chart", 16)}</span><p class="st-label">Chiffre d'affaires</p><p class="st-value">12 480<small>€</small></p>${D_CA}</div><div class="st-item"><span class="st-ico">${ic("bell", 16)}</span><p class="st-label">Relances envoyées</p><p class="st-value">23</p>${delta("up", true, "5", "En hausse de ")}</div></div>`,
      css: `
& .st-2{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
& .st-item{position:relative;min-height:128px;padding:18px;background:var(--bg-subtle);border-radius:var(--r-surface);gap:6px;align-content:end;transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease)}
& .st-item:hover{transform:translateY(-3px);box-shadow:var(--shadow-md)}
& .st-ico{position:absolute;top:14px;left:18px;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--surface);color:var(--text-muted)}
& .st-item.is-hero{background:var(--accent);color:var(--accent-contrast)}
& .is-hero .st-label,& .is-hero .st-value small{color:color-mix(in srgb,var(--accent-contrast) 78%,transparent)}
& .is-hero .st-ico{background:color-mix(in srgb,var(--accent-contrast) 20%,transparent);color:inherit}
& .is-hero .st-delta{color:var(--accent-contrast)}`,
    },
    {
      id: "strip", name: "Ligne de KPI", desc: "Trois indicateurs séparés par des filets verticaux.", tags: ["Dense", "Barre d'état"],
      attrs: { shape: "sharp", depth: "outline", energy: "technical" },
      spec: ["One bordered strip split into three equal cells by 1px vertical rules; values in the monospace face at xl size, labels in 11px uppercase text-muted above.", "Below 360px the cells stack with horizontal rules. Use as a header summary above a table."],
      demo: () => `<div class="st st-row">${item("CA du mois", "12 480 €", D_CA)}${item("En attente", "7", D_EN)}${item("Délai moyen", "18 j", D_DE)}</div>`,
      css: `
& .st-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:var(--border-w) solid var(--border-strong);border-radius:var(--r-sm);background:var(--surface)}
& .st-item{padding:12px 14px;gap:8px}
& .st-item + .st-item{border-left:var(--border-w) solid var(--border)}
& .st-label{order:-1;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}
& .st-value{font-family:var(--font-mono);font-size:var(--fs-xl);font-weight:600;letter-spacing:-.02em}
@media (max-width:360px){
& .st-row{grid-template-columns:1fr}
& .st-item + .st-item{border-left:0;border-top:var(--border-w) solid var(--border)}
}`,
    },
    {
      id: "gauge", name: "Jauge", desc: "Demi-cercle de progression vers un objectif.", tags: ["Objectif", "Visuel"],
      attrs: { shape: "round", depth: "flat", energy: "calm" },
      spec: ["A 180-degree SVG arc, 10px stroke with round caps: track in bg-subtle, value arc in accent (success once the goal is reached), with the percentage in the center bottom at 3xl.", "Caption below gives the absolute figures ('9 800 € sur 15 000 €') and the remaining amount; the arc is decorative, the text carries the data."],
      demo: () => `<div class="st"><div class="st-item st-gauge"><p class="st-label">Objectif annuel</p><div class="st-arc" role="img" aria-label="64 % de l'objectif annuel atteint"><svg viewBox="0 0 120 68" aria-hidden="true"><path d="M10 62 A50 50 0 0 1 110 62" pathLength="100" class="g-bg"/><path d="M10 62 A50 50 0 0 1 110 62" pathLength="100" class="g-fg" stroke-dasharray="64 100"/></svg><p class="st-value">64<small>%</small></p></div><p class="st-note"><b>9 800 €</b> sur 15 000 € · encore 5 200 € d'ici décembre</p></div></div>`,
      css: `
& .st-gauge{justify-items:center;text-align:center;gap:8px}
& .st-arc{position:relative;width:min(100%,240px)}
& .st-arc svg{display:block;width:100%;height:auto}
& .st-arc path{fill:none;stroke-width:10;stroke-linecap:round}
& .g-bg{stroke:var(--bg-subtle)}
& .g-fg{stroke:var(--accent);transition:stroke-dasharray var(--dur) var(--ease)}
& .st-arc .st-value{position:absolute;left:0;right:0;bottom:0;text-align:center}
& .st-note b{color:var(--text);font-weight:600}`,
    },
  ],
};
