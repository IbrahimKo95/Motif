import { ic } from "../icons.mjs";

const base = `
@keyframes pr-stripes{to{background-position:28px 0}}
@keyframes pr-spin{to{transform:rotate(360deg)}}
@keyframes pr-shimmer{to{background-position:-200% 0}}
& .pr-list{display:grid;gap:18px;font-family:var(--font-body);color:var(--text)}
& .pr-item{display:grid;gap:8px}
& .pr-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;font-size:var(--fs-sm);line-height:1.2}
& .pr-name{font-weight:500}
& .pr-val{font-size:var(--fs-xs);font-weight:600;font-variant-numeric:tabular-nums;color:var(--text-muted)}
& .pr-item.is-done .pr-val{color:var(--success);display:inline-flex;align-items:center;gap:4px}
& .pr-track{position:relative;display:block;height:6px;border-radius:var(--r-full);background:var(--bg-subtle);overflow:hidden}
& .pr-fill{display:block;height:100%;min-width:0;border-radius:inherit;background:var(--accent);transition:width var(--dur) var(--ease)}
& .is-done .pr-fill{background:var(--success)}
@media (prefers-reduced-motion:reduce){& .pr-fill,& .pr-spin,& .pr-sk{animation:none!important}}
`;

const ITEMS = [["Envoi des relances", 0], ["Import des factures", 64], ["Export comptable", 100]];
const label = (p) => (p === 100 ? `${ic("check", 13)}Terminé` : `${p} %`);
const bars = (uid, track, extra = "") => `<div class="pr-list">${ITEMS.map(([n, p], i) => `<div class="pr-item${p === 100 ? " is-done" : ""}"><div class="pr-head"><span class="pr-name" id="${uid}l${i}">${n}</span><span class="pr-val">${label(p)}</span></div>${track(p, `${uid}l${i}`)}</div>`).join("")}</div>`;
const bar = (p, id) => `<span class="pr-track" role="progressbar" aria-labelledby="${id}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><i class="pr-fill" style="width:${p}%"></i></span>`;
const seg = (p, id) => `<span class="pr-track pr-segs" role="progressbar" aria-labelledby="${id}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}">${Array.from({ length: 10 }, (_, k) => `<i class="pr-seg${k < Math.round(p / 10) ? " on" : ""}"></i>`).join("")}</span>`;
const ring = (uid) => `<div class="pr-rings">${ITEMS.map(([n, p], i) => `<div class="pr-item${p === 100 ? " is-done" : ""}"><span class="pr-ring" role="progressbar" aria-label="${n}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><svg viewBox="0 0 36 36" aria-hidden="true"><circle class="pr-ring-bg" cx="18" cy="18" r="15.9155" pathLength="100"/><circle class="pr-ring-fg" cx="18" cy="18" r="15.9155" pathLength="100" stroke-dasharray="${p} 100"/></svg><b>${p === 100 ? ic("check", 20) : p + "%"}</b></span><span class="pr-name">${n}</span></div>`).join("")}</div>`;
const steps = () => {
  const S = ["Devis", "Facture", "Envoi", "Paiement"];
  return `<ol class="pr-steps" aria-label="Étapes de facturation">${S.map((s, i) => `<li class="pr-step ${i < 2 ? "done" : i === 2 ? "cur" : ""}"${i === 2 ? ' aria-current="step"' : ""}><span class="pr-dot">${i < 2 ? ic("check", 14) : i + 1}</span><span class="pr-name">${s}</span></li>`).join("")}</ol>`;
};
const load = () => `<div class="pr-loading"><div class="pr-lrow"><span class="pr-spin" role="status" aria-label="Chargement en cours"></span><span class="pr-name">Calcul de votre TVA…</span></div><div class="pr-sk-card" aria-hidden="true"><span class="pr-sk pr-sk-av"></span><span class="pr-sk-lines"><span class="pr-sk" style="width:62%"></span><span class="pr-sk" style="width:90%"></span><span class="pr-sk" style="width:40%"></span></span></div></div>`;

export default {
  id: "progress", label: "Progression", group: "Composants", icon: "f_progress", size: "md",
  desc: "Avancement et attente : barres fine, épaisse ou segmentée, anneau, étapes, spinner et squelette.",
  base,
  snippet: `<div class="pr-item">
  <div class="pr-head"><span class="pr-name" id="l1">Importing invoices</span><span class="pr-val">64%</span></div>
  <span class="pr-track" role="progressbar" aria-labelledby="l1" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64">
    <i class="pr-fill" style="width:64%"></i>
  </span>
</div>
<!-- Done state: add .is-done on .pr-item (fill turns success). Indeterminate: omit aria-valuenow. -->`,
  rules: [
    "Use role=progressbar with aria-valuenow/min/max and an accessible name; omit aria-valuenow when the duration is unknown.",
    "Always pair the graphic with a text value or status (64 %, Terminé). Color alone never states completion: success also adds a check.",
    "Use determinate indicators whenever progress is measurable; use spinners or skeletons for waits under 10 seconds with no measure.",
    "Animate only transform, width and background-position, and disable animation under prefers-reduced-motion.",
  ],
  demo: (c) => bars(c.uid, bar),
  variants: [
    {
      id: "thin", name: "Barre fine", desc: "Filet de 4 px, valeur à droite du libellé.", tags: ["Discret", "Standard"],
      attrs: { shape: "round", depth: "flat", energy: "calm" },
      spec: ["4px track on bg-subtle, fully rounded, with an accent fill that animates its width.", "Label sits on the left and the percentage in tabular numerals on the right; finished items turn success green with a check."],
      demo: (c) => bars(c.uid, bar),
      css: `& .pr-track{height:4px}`,
    },
    {
      id: "chunky", name: "Barre rayée", desc: "Barre épaisse arrondie avec rayures animées.", tags: ["Ludique", "Vivant"],
      attrs: { shape: "pill", depth: "outline", energy: "playful" },
      spec: ["16px pill track with a hairline inner border; the fill carries 45-degree stripes (white at 22%) that scroll every 1s while unfinished.", "Finished bars stop animating and switch to a flat success fill."],
      demo: (c) => bars(c.uid, bar),
      css: `
& .pr-track{height:16px;background:var(--bg-subtle);box-shadow:inset 0 0 0 var(--border-w) var(--border-strong);padding:2px}
& .pr-fill{background-color:var(--accent);background-image:linear-gradient(45deg,rgba(255,255,255,.22) 25%,transparent 25% 50%,rgba(255,255,255,.22) 50% 75%,transparent 75%);background-size:28px 28px;animation:pr-stripes 1s linear infinite;box-shadow:0 0 0 1px color-mix(in srgb,var(--accent) 60%,transparent)}
& .is-done .pr-fill{animation:none;background-image:none;box-shadow:none}
& .pr-fill[style*="width:0%"]{visibility:hidden}`,
    },
    {
      id: "segments", name: "Segmentée", desc: "Dix blocs qui s'allument un à un.", tags: ["Technique", "Lisible"],
      attrs: { shape: "sharp", depth: "flat", energy: "technical" },
      spec: ["Ten equal blocks 10px tall separated by 3px gaps, square with a 2px radius; lit blocks use the accent, unlit ones the strong border at 45%.", "The value is rendered in the monospace face. Suits step counts and quotas more than long durations."],
      demo: (c) => bars(c.uid, seg),
      css: `
& .pr-val{font-family:var(--font-mono)}
& .pr-segs{display:flex;gap:3px;height:10px;background:none;overflow:visible;border-radius:0}
& .pr-seg{flex:1;border-radius:2px;background:color-mix(in srgb,var(--border-strong) 45%,transparent);transition:background var(--dur) var(--ease)}
& .pr-seg.on{background:var(--accent)}
& .is-done .pr-seg.on{background:var(--success)}`,
    },
    {
      id: "ring", name: "Anneau", desc: "Trois cercles avec la valeur au centre.", tags: ["Compact", "Dashboard"],
      attrs: { shape: "round", depth: "flat", energy: "friendly" },
      spec: ["64px SVG ring: 4px stroke, round caps, track in bg-subtle, progress arc in accent starting at 12 o'clock.", "Percentage in 600 weight sits in the center; a finished ring turns success and shows a check. Label below, centered."],
      demo: (c) => ring(c.uid),
      css: `
& .pr-rings{display:flex;gap:18px;justify-content:space-between}
& .pr-rings .pr-item{justify-items:center;text-align:center;font-size:var(--fs-xs);flex:1;min-width:0}
& .pr-ring{position:relative;display:grid;place-items:center;width:64px;height:64px}
& .pr-ring svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
& .pr-ring circle{fill:none;stroke-width:4}
& .pr-ring-bg{stroke:var(--bg-subtle)}
& .pr-ring-fg{stroke:var(--accent);stroke-linecap:round;transition:stroke-dasharray var(--dur) var(--ease)}
& .is-done .pr-ring-fg{stroke:var(--success)}
& .pr-ring b{position:relative;font:600 var(--fs-sm)/1 var(--font-body);font-variant-numeric:tabular-nums}
& .is-done .pr-ring b{color:var(--success)}
& .pr-ring-fg[stroke-dasharray^="0 "]{stroke-linecap:butt}`,
    },
    {
      id: "steps", name: "Étapes", desc: "Stepper horizontal numéroté avec trait de liaison.", tags: ["Processus", "Guidé"],
      attrs: { shape: "round", depth: "outline", energy: "crisp" },
      spec: ["Four 28px numbered circles joined by a 2px connector; completed steps are solid accent with a check, the current step has an accent ring and accent-text number, upcoming steps are outlined and muted.", "Labels sit under each circle; the current one is 600 weight and carries aria-current=step."],
      demo: () => steps(),
      css: `
& .pr-steps{display:flex;margin:0;padding:0;list-style:none;font-family:var(--font-body)}
& .pr-step{position:relative;flex:1;display:grid;justify-items:center;gap:8px;font-size:var(--fs-xs);color:var(--text-muted);text-align:center}
& .pr-step + .pr-step::before{content:'';position:absolute;top:13px;right:50%;width:100%;height:2px;background:var(--border)}
& .pr-step.done + .pr-step::before,& .pr-step.cur::before{background:var(--accent)}
& .pr-dot{position:relative;z-index:1;display:grid;place-items:center;width:28px;height:28px;border-radius:var(--r-full);font:600 var(--fs-xs)/1 var(--font-body);background:var(--surface);color:var(--text-muted);box-shadow:inset 0 0 0 2px var(--border)}
& .pr-step.done .pr-dot{background:var(--accent);color:var(--accent-contrast);box-shadow:none}
& .pr-step.cur .pr-dot{color:var(--accent-text);box-shadow:inset 0 0 0 2px var(--accent),0 0 0 4px var(--accent-soft)}
& .pr-step.done,& .pr-step.cur{color:var(--text)}
& .pr-step.cur .pr-name{font-weight:600}`,
    },
    {
      id: "loading", name: "Spinner & squelette", desc: "Attente sans mesure : anneau rotatif et blocs qui brillent.", tags: ["Attente", "Fluide"],
      attrs: { shape: "inherit", depth: "flat", energy: "calm" },
      spec: ["Spinner: 20px ring with a 2px bg-subtle track and an accent arc rotating once per 0.8s, announced with role=status.", "Skeleton: bg-subtle blocks with radius-sm carrying a moving highlight gradient (1.4s); content-shaped, one avatar circle and three text lines of different widths."],
      demo: () => load(),
      css: `
& .pr-loading{display:grid;gap:18px;font-family:var(--font-body);color:var(--text)}
& .pr-lrow{display:flex;align-items:center;gap:10px;font-size:var(--fs-sm)}
& .pr-spin{width:20px;height:20px;border-radius:50%;border:2px solid var(--bg-subtle);border-top-color:var(--accent);animation:pr-spin .8s linear infinite}
& .pr-sk-card{display:flex;gap:14px;align-items:center;padding:16px;border:var(--border-w) solid var(--border);border-radius:var(--r-surface);background:var(--surface)}
& .pr-sk-lines{flex:1;display:grid;gap:10px}
& .pr-sk{display:block;height:10px;border-radius:var(--r-sm);background:linear-gradient(90deg,var(--bg-subtle) 30%,color-mix(in srgb,var(--text) 9%,var(--bg-subtle)) 50%,var(--bg-subtle) 70%);background-size:200% 100%;animation:pr-shimmer 1.4s linear infinite}
& .pr-sk-av{width:44px;height:44px;flex:none;border-radius:50%}`,
    },
  ],
};
