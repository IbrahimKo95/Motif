import { familyById, scopeClass, famClass, defaultVariant, variantOf } from "./data/catalog.mjs";
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

/* ---------- contenu réel : remplace « Nomade », l'accroche du hero et les logos ---------- */
export interface Content { name: string; headline: string; pitch: string; logo: string }
export const contentKey = (c: Content) => [c.name, c.headline, c.pitch, c.logo.length, c.logo.slice(-24)].join("|");
const MARKS = ".logo-mark,.ft-mark,.auth-mark,.ws-badge";
export function personalize(html: string, c?: Content) {
  if (!c) return html;
  const name = (c.name || "").trim(), hl = (c.headline || "").trim(), pt = (c.pitch || "").trim();
  if (!name && !hl && !pt && !c.logo) return html;
  if (name) html = html.replaceAll("Nomade", () => esc(name));
  const t = document.createElement("template");
  t.innerHTML = html;
  t.content.querySelectorAll<HTMLElement>(MARKS).forEach((el) => {
    if (c.logo) { el.textContent = ""; el.classList.add("has-logo"); el.style.backgroundImage = `url("${c.logo}")`; }
    else if (name && el.textContent!.trim().length === 1) el.textContent = name[0].toUpperCase();
  });
  if (hl) t.content.querySelectorAll(".hero-title").forEach((el) => (el.textContent = hl));
  if (pt) t.content.querySelectorAll(".hero-text").forEach((el) => (el.textContent = pt));
  return t.innerHTML;
}

/* ---------- tailles d'écran ---------- */
export const VP_W = { mobile: 390, tablet: 768, desktop: 1280 } as const;
/** Largeur simulée pour une famille : mobile pour toutes, tablette pour les larges, desktop pour les sections. */
export function vpWidth(fam: any, vp?: string) {
  if (vp === "mobile") return VP_W.mobile;
  if (vp === "tablet" && fam.fit) return VP_W.tablet;
  if (vp === "desktop" && fam.fit && fam.size === "lg") return VP_W.desktop;
  return 0;
}
/** Cadre d'écran : la scène garde sa largeur réelle et n'est que réduite (jamais agrandie). */
export const framed = (w: number, tk: string, cls: string, inner: string) =>
  `<div class="vpf${w < 500 ? " vpf-m" : ""}"><div class="fit" data-w="${w}" data-frame="1"><div class="fit-in"><div class="stage${cls}" style="${tk}"><div class="pv">${inner}</div></div></div></div></div>`;

/** Scène d'aperçu : jetons du style + démo vivante, mise à l'échelle si la famille est large. */
export function stageHtml(fam: any, v: any, cfg: any, picks: Record<string, string>, mode: string, o: { fitW?: number; vp?: string; content?: Content } = {}) {
  const tk = esc(styleAttr(cfg, mode));
  const mesh = v.stage === "mesh" ? " mesh" : "";
  const inner = personalize(demoOf(fam, v, picks), o.content);
  const vw = vpWidth(fam, o.vp);
  if (vw) return framed(vw, tk, fam.fit ? mesh : ` pad ${fam.size || "sm"}${mesh}`, inner);
  const w = o.fitW || fam.fit;
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

/* ---------- pages assemblées ---------- */
function section(id: string, picks: Record<string, string>) {
  const f = familyById[id], v = variantOf(id, picks[id] || defaultVariant(id));
  return `<div class="${famClass(id)} ${scopeClass(id, v.id)}">${(v.demo || f.demo)(makeCtx(picks))}</div>`;
}
export const PAGES = [
  { id: "landing", name: "Landing", fams: ["backgrounds", "navbar", "hero", "logos", "features", "testimonials", "pricing", "faq", "cta", "footer", "buttons"] },
  { id: "dashboard", name: "Tableau de bord", fams: ["sidebar", "alerts", "stats", "tabs", "tables", "pagination", "cards", "progress", "avatars", "buttons"] },
  { id: "auth", name: "Connexion", fams: ["backgrounds", "auth", "inputs", "controls", "buttons"] },
] as const;
export function pageHtml(kind: string, picks: Record<string, string>) {
  const S = (id: string) => section(id, picks);
  /* fond de page choisi, posé derrière le haut de page (jamais derrière le tableau de bord) */
  const bg = (inner: string) => `<div class="${famClass("backgrounds")} ${scopeClass("backgrounds", picks.backgrounds || defaultVariant("backgrounds"))}"><div class="page-bg">${inner}</div></div>`;
  if (kind === "auth") return `<div class="pgx pgx-auth">${bg(S("auth"))}</div>`;
  if (kind === "dashboard") {
    const body = `<div class="pgx-body">
      <div class="pgx-head"><div><h1 class="pgx-title">Tableau de bord</h1><p class="pgx-sub">Bonjour Camille, voici l'essentiel de la semaine.</p></div>
        <div class="pgx-acts">${makeCtx(picks).scope("buttons", `<button class="btn btn-secondary">Exporter</button><button class="btn btn-primary">Nouvelle facture</button>`)}</div></div>
      ${S("alerts")}${S("stats")}${S("tabs")}<div class="pgx-block">${S("tables")}${S("pagination")}</div>
      <div class="pgx-grid">${S("cards")}<div class="pgx-stack">${S("progress")}${S("avatars")}</div></div></div>`;
    const t = document.createElement("template");
    t.innerHTML = S("sidebar");
    const main = t.content.querySelector(".side-main");
    if (main) main.innerHTML = body; else t.content.firstElementChild?.insertAdjacentHTML("beforeend", body);
    return `<div class="pgx pgx-dash">${t.innerHTML}</div>`;
  }
  return `<div class="pgx pgx-landing">${bg(S("navbar") + S("hero")) + ["logos", "features", "testimonials", "pricing", "faq", "cta", "footer"].map(S).join("")}</div>`;
}

/** Recalcule l'échelle de toutes les maquettes .fit d'un conteneur. */
export function fitAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(".fit").forEach((fit) => {
    const inn = fit.firstElementChild as HTMLElement | null;
    const w = +(fit.dataset.w || 0), avail = fit.clientWidth;
    if (!avail || !inn) return;
    if (fit.dataset.frame) {
      const s = Math.min(1, avail / w);
      inn.style.width = w + "px";
      inn.style.transform = s === 1 ? "none" : `scale(${s})`;
      inn.style.marginLeft = s === 1 ? (avail - w) / 2 + "px" : "0";
      fit.style.height = Math.ceil(inn.offsetHeight * s) + "px";
      return;
    }
    const max = +(fit.dataset.max || 1);
    const s = avail >= w ? Math.min(avail / w, max) : avail / w;
    inn.style.width = (avail >= w ? avail / s : w) + "px";
    inn.style.transform = s === 1 ? "none" : `scale(${s})`;
    fit.style.height = Math.ceil(inn.offsetHeight * s) + "px";
  });
}
