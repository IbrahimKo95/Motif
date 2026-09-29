// Moteur couleur : conversions, contraste WCAG, et génération d'un thème complet (clair + sombre)
// à partir d'une « graine ». Chaque paire critique est résolue par calcul, pas à l'œil.

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return "#" + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

export function hexToHsl(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Déplace la clarté par pas jusqu'à atteindre le ratio demandé contre `against`.
function solve(h, s, startL, against, min, step) {
  let l = startL;
  for (let i = 0; i < 140; i++) {
    const hex = hslToHex(h, s, l);
    if (contrast(hex, against) >= min) return hex;
    l += step;
    if (l < 0 || l > 100) break;
  }
  return hslToHex(h, s, clamp(l, 0, 100));
}

const rgba = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// Seed: { id, name, mood, h, s, nh, ns, on: 'light'|'dark', aL?, mono?, darkFirst? }
export function makeTheme(seed) {
  const { h, s, nh, ns } = seed;
  const nsat = Math.min(ns, 40);

  /* ───────── clair ───────── */
  const L = {};
  L.bg = hslToHex(nh, ns * 0.55, 98);
  L.bgSubtle = hslToHex(nh, ns * 0.6, 95);
  L.surface = "#FFFFFF";
  L.surfaceRaised = "#FFFFFF";
  L.border = hslToHex(nh, ns * 0.5, 89.5);
  L.text = hslToHex(nh, Math.min(ns * 1.2, 40), 10);
  L.textMuted = solve(nh, ns * 0.5, 40, L.bgSubtle, 4.8, -1);
  L.borderStrong = solve(nh, ns * 0.35, 66, L.bg, 3.1, -1);
  if (seed.mono) {
    L.accent = L.text;
    L.accentContrast = L.bg;
    L.accentHover = hslToHex(nh, nsat, 24);
  } else if (seed.on === "dark") {
    L.accent = hslToHex(h, s, seed.aL ?? 58);
    L.accentContrast = hslToHex(nh, nsat, 8);
    let al = seed.aL ?? 58;
    while (contrast(L.accent, L.accentContrast) < 4.8 && al < 96) L.accent = hslToHex(h, s, (al += 1));
    L.accentHover = hslToHex(h, s, clamp(hexToHsl(L.accent).l - 6, 0, 100));
    // accent clair sans marge : le survol s'éclaircit au lieu de s'assombrir
    if (contrast(L.accentHover, L.accentContrast) < 4.5) L.accentHover = solve(h, s, hexToHsl(L.accent).l + 6, L.accentContrast, 4.6, 1);
  } else {
    L.accent = solve(h, s, seed.aL ?? 52, "#FFFFFF", 4.8, -1);
    L.accentContrast = "#FFFFFF";
    L.accentHover = hslToHex(h, s, clamp(hexToHsl(L.accent).l - 7, 0, 100));
  }
  L.accentSoft = seed.mono ? hslToHex(nh, ns * 0.5, 93) : hslToHex(h, Math.min(s, 80) * 0.9, 94.5);
  L.accentText = seed.mono ? L.text : solve(h, s, hexToHsl(L.accent).l, L.accentSoft, 5.2, -1);
  L.success = solve(152, 58, 34, L.bg, 5.2, -1);
  L.warning = solve(36, 92, 36, L.bg, 5.2, -1);
  L.danger = solve(4, 70, 46, L.bg, 5.2, -1);
  L.info = solve(212, 72, 44, L.bg, 5.2, -1);
  L.focus = L.accentText;
  L.inverseBg = L.text;
  L.inverseText = L.bg;
  L.overlay = rgba(L.text, 0.5);

  /* ───────── sombre ───────── */
  const D = {};
  D.bg = hslToHex(nh, ns * 0.8, 8.5);
  D.bgSubtle = hslToHex(nh, ns * 0.75, 11);
  D.surface = hslToHex(nh, ns * 0.7, 13);
  D.surfaceRaised = hslToHex(nh, ns * 0.7, 16.5);
  D.border = hslToHex(nh, ns * 0.6, 21);
  D.text = hslToHex(nh, ns * 0.5, 94);
  D.textMuted = solve(nh, ns * 0.4, 62, D.surfaceRaised, 4.8, 1);
  D.borderStrong = solve(nh, ns * 0.3, 38, D.surfaceRaised, 3.1, 1);
  const ink = hslToHex(nh, Math.max(nsat, 10), 7);
  if (seed.mono) {
    D.accent = D.text;
    D.accentContrast = D.bg;
    D.accentHover = hslToHex(nh, ns * 0.4, 85);
  } else {
    let al = seed.on === "dark" ? Math.max(seed.aL ?? 62, 62) : 66;
    D.accent = hslToHex(h, s, al);
    D.accentContrast = ink;
    while (contrast(D.accent, D.accentContrast) < 4.8 && al < 96) D.accent = hslToHex(h, s, (al += 1));
    D.accentHover = hslToHex(h, s, clamp(hexToHsl(D.accent).l + 6, 0, 100));
  }
  D.accentSoft = seed.mono ? hslToHex(nh, ns * 0.5, 20) : hslToHex(h, s * 0.55, 19);
  D.accentText = seed.mono ? D.text : solve(h, s, hexToHsl(D.accent).l, D.accentSoft, 5.2, 1);
  D.success = solve(152, 55, 58, D.surfaceRaised, 5.2, 1);
  D.warning = solve(38, 90, 60, D.surfaceRaised, 5.2, 1);
  D.danger = solve(4, 85, 64, D.surfaceRaised, 5.2, 1);
  D.info = solve(212, 85, 66, D.surfaceRaised, 5.2, 1);
  D.focus = D.accentText;
  D.inverseBg = D.text;
  D.inverseText = D.bg;
  D.overlay = rgba(D.bg, 0.66);

  // Texte lisible sur les couleurs sémantiques pleines (badges/boutons "solid")
  for (const P of [L, D]) {
    const dark = P === D ? ink : L.text;
    for (const k of ["success", "warning", "danger", "info"]) {
      P[k + "Contrast"] = contrast("#FFFFFF", P[k]) >= 4.5 ? "#FFFFFF" : dark;
    }
  }

  return { id: seed.id, name: seed.name, mood: seed.mood, defaultMode: seed.darkFirst ? "dark" : "light", light: L, dark: D };
}

export const REQUIRED_PAIRS = [
  ["text", "bg", 4.5, "Body text on page"],
  ["text", "surface", 4.5, "Body text on cards"],
  ["textMuted", "bg", 4.5, "Secondary text on page"],
  ["textMuted", "bgSubtle", 4.5, "Secondary text on subtle areas"],
  ["textMuted", "surfaceRaised", 4.5, "Secondary text on raised surfaces"],
  ["accentContrast", "accent", 4.5, "Label on primary button"],
  ["accentContrast", "accentHover", 4.5, "Label on primary button (hover)"],
  ["accentText", "bg", 4.5, "Accent used as text on page"],
  ["accentText", "surface", 4.5, "Accent used as text on cards"],
  ["accentText", "accentSoft", 4.5, "Accent text on soft accent fill"],
  ["borderStrong", "bg", 3, "Input borders and UI boundaries"],
  ["focus", "bg", 3, "Focus ring"],
  ["success", "bg", 4.5, "Success text"],
  ["warning", "bg", 4.5, "Warning text"],
  ["danger", "bg", 4.5, "Error text"],
  ["info", "bg", 4.5, "Info text"],
  ["successContrast", "success", 4.5, "Label on solid success"],
  ["warningContrast", "warning", 4.5, "Label on solid warning"],
  ["dangerContrast", "danger", 4.5, "Label on solid danger"],
  ["infoContrast", "info", 4.5, "Label on solid info"],
  ["inverseText", "inverseBg", 4.5, "Text on inverse surface"],
];

export function auditTheme(theme, modes = ["light", "dark"]) {
  const rows = [];
  for (const mode of modes) {
    const c = theme[mode];
    for (const [a, b, min, label] of REQUIRED_PAIRS) {
      const ratio = contrast(c[a], c[b]);
      rows.push({ mode, label, fg: a, bg: b, fgHex: c[a], bgHex: c[b], ratio: +ratio.toFixed(2), min, pass: ratio >= min });
    }
  }
  return rows;
}
