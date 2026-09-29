import { familyById, scopeClass, famClass, defaultVariant } from "./data/catalog.mjs";
import { styleAttr } from "./engine/tokens.mjs";

export const esc = (s: string) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let uidN = 0;

export const scopeWrap = (famId: string, varId: string, html: string) =>
  `<div class="${famClass(famId)} ${scopeClass(famId, varId)}" style="display:contents">${html}</div>`;
export const makeCtx = (picks: Record<string, string>) => ({
  uid: "u" + ++uidN + "-",
  scope: (id: string, html: string) => scopeWrap(id, picks[id] || defaultVariant(id), html),
});
export const demoOf = (fam: any, v: any, picks: Record<string, string>) =>
  `<div class="${famClass(fam.id)} ${scopeClass(fam.id, v.id)}">${(v.demo || fam.demo)(makeCtx(picks))}</div>`;

/** Scène d'aperçu : jetons du style + démo vivante, mise à l'échelle si la famille est large. */
export function stageHtml(fam: any, v: any, cfg: any, picks: Record<string, string>, mode: string, fitW?: number) {
  const tk = esc(styleAttr(cfg, mode));
  const mesh = v.stage === "mesh" ? " mesh" : "";
  const inner = demoOf(fam, v, picks);
  const w = fitW || fam.fit;
  if (w) return `<div class="stage${mesh}" style="${tk}"><div class="fit" data-w="${w}" data-max="${fam.fitMax || 1.15}"><div class="fit-in pv" style="width:${w}px">${inner}</div></div></div>`;
  return `<div class="stage pad ${fam.size || "sm"}${mesh}" style="${tk}"><div class="pv">${inner}</div></div>`;
}

export function kitPreviewHtml(kit: any) {
  const cfg = { theme: kit.theme, type: kit.type, shape: kit.shape };
  const P = kit.picks;
  const ctx = makeCtx(P);
  const d = (id: string) => `<div class="${famClass(id)} ${scopeClass(id, P[id])}">${familyById[id].demo(ctx)}</div>`;
  const html = `<div style="display:grid;grid-template-columns:1.05fr 1fr;gap:22px;padding:30px;align-items:start">
    <div style="display:grid;gap:22px"><div style="display:grid;gap:8px"><div style="font:var(--heading-weight) 30px/var(--heading-leading) var(--font-display);letter-spacing:var(--heading-tracking)">Bonjour, Camille</div><div style="color:var(--text-muted);font-size:15px">Voici l'essentiel de la semaine.</div></div>${d("buttons")}${d("tabs")}${d("badges")}</div>
    <div style="display:grid;gap:22px">${d("cards")}${d("controls")}</div></div>`;
  const mesh = P.buttons && familyById.buttons.variants.find((v: any) => v.id === P.buttons)?.stage === "mesh";
  return `<div class="stage${mesh ? " mesh" : ""}" style="${esc(styleAttr(cfg, kit.mode))}"><div class="fit" data-w="760" data-max="1.15"><div class="fit-in pv" style="width:760px">${html}</div></div></div>`;
}

export function shapeSampleHtml(key: string, cfg: any, mode: string) {
  let inner: string;
  if (key === "radius") inner = `<div class="sh-btn">Action</div><div class="sh-in">Rechercher</div><div class="sh-card">Carte<span>Détail</span></div>`;
  else if (key === "density") inner = `<div class="sh-btn">Enregistrer</div><div class="sh-btn sec">Annuler</div><div class="sh-in">Nom du projet</div>`;
  else if (key === "border") inner = `<div class="sh-in">Champ</div><div class="sh-btn sec">Contour</div><div class="sh-card">Carte<span>Bordure</span></div>`;
  else if (key === "depth") inner = `<div class="sh-card sm">Survol<span>Ombre légère</span></div><div class="sh-card">Carte<span>Ombre moyenne</span></div><div class="sh-card lg">Modale<span>Ombre haute</span></div>`;
  else inner = `<div class="sh-move">Survole-moi</div>`;
  return `<div class="shp" style="${esc(styleAttr(cfg, mode))}"><div class="shp-in"${key === "depth" ? ' style="gap:14px"' : ""}>${inner}</div></div>`;
}

/** Recalcule l'échelle de toutes les maquettes .fit d'un conteneur. */
export function fitAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".fit").forEach((fit) => {
    const inn = fit.firstElementChild as HTMLElement | null;
    const w = +(fit.dataset.w || 0), avail = fit.clientWidth;
    if (!avail || !inn) return;
    const max = +(fit.dataset.max || 1);
    const s = avail >= w ? Math.min(avail / w, max) : avail / w;
    inn.style.width = (avail >= w ? avail / s : w) + "px";
    inn.style.transform = s === 1 ? "none" : `scale(${s})`;
    fit.style.height = Math.ceil(inn.offsetHeight * s) + "px";
  });
}
