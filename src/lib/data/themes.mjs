import { makeTheme, hexToHsl, contrast } from "../engine/color.mjs";

// Graines : h/s = teinte et saturation de l'accent, nh/ns = teinte et saturation des neutres.
// on: couleur du texte posé sur l'accent. mono: accent = couleur du texte (style monochrome).
const SEEDS = [
  { id: "cobalt", name: "Cobalt", mood: "Précis, produit", h: 228, s: 88, nh: 222, ns: 14, on: "light" },
  { id: "ocean", name: "Océan", mood: "Frais, fiable", h: 192, s: 82, nh: 196, ns: 14, on: "light" },
  { id: "glacier", name: "Glacier", mood: "Clair, aéré", h: 202, s: 78, nh: 208, ns: 10, on: "dark", aL: 62 },
  { id: "menthe", name: "Menthe", mood: "Vif, sain", h: 164, s: 62, nh: 165, ns: 10, on: "light" },
  { id: "foret", name: "Forêt", mood: "Posé, sérieux", h: 152, s: 56, nh: 150, ns: 10, on: "light" },
  { id: "mousse", name: "Mousse", mood: "Naturel, calme", h: 82, s: 46, nh: 82, ns: 10, on: "light" },
  { id: "citron", name: "Citron", mood: "Énergique, franc", h: 50, s: 96, nh: 46, ns: 8, on: "dark", aL: 56 },
  { id: "ambre", name: "Ambre", mood: "Chaleureux", h: 34, s: 94, nh: 30, ns: 10, on: "dark", aL: 54 },
  { id: "corail", name: "Corail", mood: "Amical, vivant", h: 12, s: 86, nh: 14, ns: 10, on: "light" },
  { id: "rubis", name: "Rubis", mood: "Intense, luxe", h: 350, s: 76, nh: 350, ns: 8, on: "light" },
  { id: "rose", name: "Rose", mood: "Tendre, moderne", h: 332, s: 74, nh: 330, ns: 10, on: "light" },
  { id: "prune", name: "Prune", mood: "Créatif, profond", h: 306, s: 52, nh: 300, ns: 12, on: "light" },
  { id: "lavande", name: "Lavande", mood: "Doux, onirique", h: 258, s: 68, nh: 255, ns: 12, on: "light" },
  { id: "sable", name: "Sable", mood: "Terreux, artisanal", h: 28, s: 46, nh: 34, ns: 16, on: "light" },
  { id: "ardoise", name: "Ardoise", mood: "Neutre, sobre", h: 214, s: 16, nh: 215, ns: 10, on: "light" },
  { id: "encre", name: "Encre", mood: "Monochrome, éditorial", h: 220, s: 10, nh: 220, ns: 8, on: "light", mono: true },
  { id: "minuit", name: "Minuit", mood: "Nocturne, signal", h: 38, s: 92, nh: 225, ns: 26, on: "dark", aL: 60, darkFirst: true },
  { id: "aurore", name: "Aurore", mood: "Dégradé, premium", h: 268, s: 80, nh: 262, ns: 22, on: "light", darkFirst: true },
];

export const THEMES = SEEDS.map(makeTheme);
export const themeById = Object.fromEntries(THEMES.map((t) => [t.id, t]));

/* ───────── palette perso : une graine construite depuis l'accent choisi, générée comme les autres (AA garanti) ───────── */
export const NEUTRALS = [
  { id: "neutral", name: "Gris purs", nh: null, ns: 3 },
  { id: "accent", name: "Teintés", nh: null, ns: 14 },
  { id: "warm", name: "Chauds", nh: 34, ns: 12 },
  { id: "cool", name: "Froids", nh: 218, ns: 12 },
];
export const DEFAULT_CUSTOM = { name: "Ma palette", accent: "#6D4AFF", neutral: "accent", mono: false };
export const isHex = (v) => /^#[0-9a-f]{6}$/i.test(v || "");
const cache = new Map();
export function customTheme(c) {
  c = { ...DEFAULT_CUSTOM, ...(c || {}) };
  const hex = (isHex(c.accent) ? c.accent : DEFAULT_CUSTOM.accent).toUpperCase();
  const key = [hex, c.neutral, !!c.mono, c.name].join("|");
  if (cache.has(key)) return cache.get(key);
  const { h, s, l } = hexToHsl(hex);
  const n = NEUTRALS.find((x) => x.id === c.neutral) || NEUTRALS[1];
  // texte blanc si l'accent le supporte (ou si un texte sombre ne le supporterait pas non plus) : l'accent garde sa clarté d'origine
  const onLight = contrast(hex, "#FFFFFF") >= 4.5 || contrast(hex, "#121212") < 4.8;
  const t = makeTheme({ id: "custom", name: (c.name || "").trim() || DEFAULT_CUSTOM.name, mood: `Perso · ${hex}`, h, s, nh: n.nh ?? h, ns: n.ns, on: onLight ? "light" : "dark", aL: l, mono: !!c.mono });
  t.custom = true; t.source = hex;
  cache.set(key, t);
  if (cache.size > 60) cache.delete(cache.keys().next().value);
  return t;
}
/** Thème effectif d'une configuration (catalogue ou palette perso). */
export const themeFor = (cfg = {}) => (cfg.theme === "custom" ? customTheme(cfg.custom) : themeById[cfg.theme] || THEMES[0]);
