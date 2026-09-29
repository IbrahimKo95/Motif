import { useSyncExternalStore } from "react";
import { FAMILIES, familyById, variantOf } from "./lib/data/catalog.mjs";
import { themeById } from "./lib/data/themes.mjs";
import { typeById } from "./lib/data/typography.mjs";
import { kitById } from "./lib/data/kits.mjs";
import { DEFAULT_CFG } from "./lib/engine/tokens.mjs";
import { THEMES } from "./lib/data/themes.mjs";
import { TYPES } from "./lib/data/typography.mjs";
import { coherence } from "./lib/engine/coherence.mjs";
import { buildDesignMd } from "./lib/engine/export.mjs";

export type Mode = "light" | "dark";
export interface AppState {
  name: string; kind: string; stack: string;
  theme: string; type: string; shape: Record<string, string>;
  mode: Mode; picks: Record<string, string>; favs: string[]; view: string; filters: Record<string, string>;
}
export interface Ui {
  drawer: boolean; dialog: null | { fam: string; var: string; tab: "html" | "css" };
  palette: boolean; file: boolean; side: boolean;
  toast: null | { msg: string; err?: boolean; action?: { label: string; run: () => void } };
}

const KEY = "motif:v2";
const fresh = (): AppState => ({
  name: "", kind: "", stack: "html", theme: DEFAULT_CFG.theme, type: DEFAULT_CFG.type,
  shape: { ...DEFAULT_CFG.shape }, mode: "light", picks: {}, favs: [], view: "kits", filters: {},
});

function load(): AppState {
  const s = fresh();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return s;
    const p = JSON.parse(raw);
    Object.assign(s, p, { shape: { ...DEFAULT_CFG.shape, ...(p.shape || {}) } });
    if (!themeById[s.theme]) s.theme = DEFAULT_CFG.theme;
    if (!typeById[s.type]) s.type = DEFAULT_CFG.type;
    for (const [f, v] of Object.entries(s.picks)) if (!variantOf(f, v as string)) delete s.picks[f];
    s.favs = (s.favs || []).filter((k) => { const [f, v] = k.split(":"); return variantOf(f, v); });
  } catch { /* stockage indisponible */ }
  return s;
}

let state: AppState = load();
let ui: Ui = { drawer: false, dialog: null, palette: false, file: false, side: false, toast: null };
const subs = new Set<() => void>();
let saveT: any, toastT: any;
const emit = () => { subs.forEach((f) => f()); };
const subscribe = (f: () => void) => { subs.add(f); return () => subs.delete(f); };

export const useApp = () => useSyncExternalStore(subscribe, () => state);
export const useUi = () => useSyncExternalStore(subscribe, () => ui);
export const getState = () => state;

export function set(patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) {
  state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
  clearTimeout(saveT);
  saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }, 120);
  emit();
}
export function setUi(patch: Partial<Ui>) { ui = { ...ui, ...patch }; document.body.style.overflow = ""; emit(); }
export function closeAll() { setUi({ dialog: null, drawer: false, palette: false, file: false }); }

export function toast(msg: string, opts: { err?: boolean; action?: { label: string; run: () => void }; ms?: number } = {}) {
  clearTimeout(toastT);
  setUi({ toast: { msg, err: opts.err, action: opts.action } });
  toastT = setTimeout(() => setUi({ toast: null }), opts.ms || 2600);
}

export const go = (view: string) => { setUi({ side: false }); set({ view }); document.getElementById("main")?.scrollTo(0, 0); };
export const openDrawer = () => setUi({ dialog: null, palette: false, drawer: true });

export function pick(fam: string, vid: string) {
  const had = state.picks[fam] === vid;
  set((s) => { const picks = { ...s.picks }; if (had) delete picks[fam]; else picks[fam] = vid; return { picks }; });
  if (!had) toast(`${familyById[fam].label} : ${variantOf(fam, vid).name} ajouté à ton style`, { action: { label: "Voir", run: openDrawer } });
}
export const unpick = (fam: string) => set((s) => { const picks = { ...s.picks }; delete picks[fam]; return { picks }; });
export const toggleFav = (fam: string, vid: string) => set((s) => { const k = fam + ":" + vid; return { favs: s.favs.includes(k) ? s.favs.filter((x) => x !== k) : [...s.favs, k] }; });
export function applyKit(id: string) {
  const k = kitById[id];
  set({ theme: k.theme, type: k.type, shape: { ...k.shape }, picks: { ...k.picks }, mode: k.mode as Mode });
  toast(`Kit « ${k.name} » appliqué`, { action: { label: "Voir mon style", run: openDrawer } });
}
/* « Surprends-moi » : tire au hasard palette, typo, forme et une variante par famille,
   garde le meilleur de 60 essais selon le score de cohérence. */
export function surprise() {
  const rnd = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
  const SH = { radius: ["sharp", "soft", "round", "capsule"], density: ["compact", "normal", "airy"], border: ["hairline", "strong"], depth: ["flat", "soft", "hard"], motion: ["snappy", "smooth"] };
  let best: any = null, bestScore = -1;
  for (let i = 0; i < 60; i++) {
    const shape: any = { radius: rnd(SH.radius), density: rnd(SH.density), border: rnd(SH.border), depth: rnd(SH.depth), motion: rnd(SH.motion) };
    if (shape.depth === "hard") shape.border = "strong";
    const anchor: any = rnd((FAMILIES as any[]).find((f) => f.id === "buttons").variants);
    const picks: Record<string, string> = {};
    for (const f of FAMILIES as any[]) {
      const pool = f.variants.filter((v: any) => v.attrs.energy === anchor.attrs.energy || Math.random() < 0.25);
      picks[f.id] = (rnd(pool.length ? pool : f.variants) as any).id;
    }
    const cand = { theme: rnd(THEMES as any[]).id, type: rnd(TYPES as any[]).id, mode: Math.random() < 0.35 ? "dark" : "light", shape, picks };
    const sc = coherence(cand as any).score ?? 0;
    if (sc > bestScore) { bestScore = sc; best = cand; }
  }
  set({ ...best, favs: state.favs });
  toast(`Style surprise appliqué (cohérence ${bestScore}/100)`, { action: { label: "Voir mon style", run: openDrawer } });
}
export const completionCount = () => FAMILIES.filter((f) => state.picks[f.id]).length;

export async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove(); return ok;
  } catch { return false; }
}
export async function copyOrShow(text: string, okMsg: string) {
  if (await copyText(text)) toast(okMsg);
  else { setUi({ file: true }); toast("Copie bloquée : sélectionne le texte (Ctrl/⌘ + C).", { err: true, ms: 4200 }); }
}
export const copyDesignMd = () => copyOrShow(buildDesignMd(state), "DESIGN.md copié : colle-le à la racine de ton projet");
export function downloadDesignMd() {
  const blob = new Blob([buildDesignMd(state)], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "DESIGN.md";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast("DESIGN.md téléchargé");
}

/* thème de l'interface */
export function uiTheme(): "dark" | "light" {
  const a = document.documentElement.getAttribute("data-theme");
  if (a === "light" || a === "dark") return a;
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
export function setUiTheme(t: "dark" | "light") {
  document.documentElement.setAttribute("data-theme", t);
  try { localStorage.setItem("motif:ui", t); } catch {}
  emit();
}
export function initUiTheme() { try { const t = localStorage.getItem("motif:ui"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch {} }
