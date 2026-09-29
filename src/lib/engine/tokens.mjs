import { themeById, THEMES } from "../data/themes.mjs";
import { typeById, TYPES, fontsHrefFor } from "../data/typography.mjs";
import { RADIUS, DENSITY, BORDER, DEPTH, MOTION, byId } from "../data/shape.mjs";

export const kebab = (s) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

export const DEFAULT_CFG = {
  theme: "cobalt",
  type: "schibsted",
  shape: { radius: "soft", density: "normal", border: "hairline", depth: "soft", motion: "smooth" },
};

const COLOR_KEYS = [
  "bg", "bgSubtle", "surface", "surfaceRaised", "border", "borderStrong", "text", "textMuted",
  "accent", "accentHover", "accentContrast", "accentText", "accentSoft",
  "success", "warning", "danger", "info", "successContrast", "warningContrast", "dangerContrast", "infoContrast",
  "focus", "overlay",
];

const SIZES = { "--fs-xs": "12px", "--fs-sm": "14px", "--fs-base": "16px", "--fs-lg": "18px", "--fs-xl": "22px", "--fs-2xl": "28px", "--fs-3xl": "40px", "--fs-4xl": "56px" };

export function resolveCfg(cfg = {}) {
  const theme = themeById[cfg.theme] || THEMES[0];
  const type = typeById[cfg.type] || TYPES[0];
  const sh = { ...DEFAULT_CFG.shape, ...(cfg.shape || {}) };
  return {
    theme, type,
    radius: byId(RADIUS, sh.radius), density: byId(DENSITY, sh.density), border: byId(BORDER, sh.border),
    depth: byId(DEPTH, sh.depth), motion: byId(MOTION, sh.motion),
  };
}

export function colorVars(theme, mode) {
  const c = theme[mode];
  const v = {};
  for (const k of COLOR_KEYS) v["--" + kebab(k)] = c[k];
  return v;
}

export function typeVars(type) {
  return {
    "--font-display": `"${type.display}", ${type.serif ? "Georgia, serif" : "system-ui, sans-serif"}`,
    "--font-body": `"${type.body}", system-ui, sans-serif`,
    "--font-mono": `"${type.mono}", ui-monospace, monospace`,
    "--heading-weight": String(type.hw),
    "--heading-tracking": type.ht,
    "--heading-leading": String(type.hl),
  };
}

export function allVars(cfg, mode) {
  const r = resolveCfg(cfg);
  return {
    ...colorVars(r.theme, mode),
    ...typeVars(r.type),
    ...SIZES,
    "--r-full": "9999px",
    ...r.radius.vars, ...r.density.vars, ...r.border.vars, ...r.depth.vars, ...r.motion.vars,
  };
}

export const styleAttr = (cfg, mode) =>
  Object.entries(allVars(cfg, mode)).map(([k, v]) => `${k}:${v}`).join(";");

const block = (vars, indent = "  ") => Object.entries(vars).map(([k, v]) => `${indent}${k}: ${v};`).join("\n");

// CSS complet des tokens : clair par défaut, sombre via préférence système et data-theme.
export function tokensCss(cfg, modes = "both") {
  const r = resolveCfg(cfg);
  const light = colorVars(r.theme, "light");
  const dark = colorVars(r.theme, "dark");
  const shared = { ...typeVars(r.type), ...SIZES, "--r-full": "9999px", ...r.radius.vars, ...r.density.vars, ...r.border.vars, ...r.depth.vars, ...r.motion.vars };
  let colors;
  if (modes === "dark") colors = `:root {\n  color-scheme: dark;\n${block(dark)}\n}`;
  else if (modes === "light") colors = `:root {\n  color-scheme: light;\n${block(light)}\n}`;
  else colors = `:root {\n  color-scheme: light dark;\n${block(light)}\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n    color-scheme: dark;\n${block(dark, "    ")}\n  }\n}\n\n:root[data-theme="dark"] {\n  color-scheme: dark;\n${block(dark)}\n}`;
  return `${colors}\n\n:root {\n${block(shared)}\n}\n`;
}

export const fontHref = (cfg) => fontsHrefFor(resolveCfg(cfg).type);

// Familles pour une note lisible
export const describeCfg = (cfg) => {
  const r = resolveCfg(cfg);
  return { theme: r.theme.name, type: r.type.name, radius: r.radius.name, density: r.density.name, border: r.border.name, depth: r.depth.name, motion: r.motion.name };
};
