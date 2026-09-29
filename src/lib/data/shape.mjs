// Réglages globaux de forme. Chaque option = variables CSS + une étiquette de cohérence.
export const RADIUS = [
  { id: "sharp", name: "Angles vifs", desc: "Coins presque droits, précis et technique.", shape: "sharp", vars: { "--r-sm": "2px", "--r-control": "3px", "--r-surface": "4px" } },
  { id: "soft", name: "Doux", desc: "Léger arrondi, le choix polyvalent.", shape: "soft", vars: { "--r-sm": "6px", "--r-control": "8px", "--r-surface": "14px" } },
  { id: "round", name: "Arrondi", desc: "Généreux, amical, très tactile.", shape: "round", vars: { "--r-sm": "8px", "--r-control": "14px", "--r-surface": "24px" } },
  { id: "capsule", name: "Capsule", desc: "Contrôles en pilule, surfaces très rondes.", shape: "pill", vars: { "--r-sm": "10px", "--r-control": "999px", "--r-surface": "28px" } },
];

export const DENSITY = [
  { id: "compact", name: "Compact", desc: "Contrôles de 32 px, pour les outils denses.", vars: { "--control-h": "32px", "--pad-x": "12px", "--pad": "16px", "--gap": "8px", "--fs-ctl": "13px" } },
  { id: "normal", name: "Équilibré", desc: "Contrôles de 40 px, le standard.", vars: { "--control-h": "40px", "--pad-x": "16px", "--pad": "22px", "--gap": "12px", "--fs-ctl": "14px" } },
  { id: "airy", name: "Aéré", desc: "Contrôles de 48 px, confortable au doigt.", vars: { "--control-h": "48px", "--pad-x": "20px", "--pad": "30px", "--gap": "16px", "--fs-ctl": "15px" } },
];

export const BORDER = [
  { id: "hairline", name: "Filet fin", desc: "Contours de 1 px, discrets.", vars: { "--border-w": "1px" } },
  { id: "strong", name: "Trait marqué", desc: "Contours de 2 px, affirmés.", vars: { "--border-w": "2px" } },
];

export const DEPTH = [
  { id: "flat", name: "Plat", desc: "Aucune ombre, la séparation vient des contours.", vars: { "--shadow-sm": "none", "--shadow-md": "none", "--shadow-lg": "0 0 0 1px var(--border-strong)" } },
  {
    id: "soft", name: "Ombres douces", desc: "Élévation diffuse, teintée par le texte.",
    vars: {
      "--shadow-sm": "0 1px 2px color-mix(in srgb, var(--text) 10%, transparent)",
      "--shadow-md": "0 8px 24px -8px color-mix(in srgb, var(--text) 24%, transparent)",
      "--shadow-lg": "0 28px 64px -16px color-mix(in srgb, var(--text) 38%, transparent)",
    },
  },
  { id: "hard", name: "Ombres dures", desc: "Décalage net sans flou, esprit brut.", vars: { "--shadow-sm": "2px 2px 0 var(--text)", "--shadow-md": "4px 4px 0 var(--text)", "--shadow-lg": "8px 8px 0 var(--text)" } },
];

export const MOTION = [
  { id: "snappy", name: "Vif", desc: "120 ms, réponse immédiate.", vars: { "--dur": "120ms", "--ease": "cubic-bezier(0.2, 0.8, 0.2, 1)" } },
  { id: "smooth", name: "Fluide", desc: "220 ms, transitions douces.", vars: { "--dur": "220ms", "--ease": "cubic-bezier(0.3, 0.7, 0.2, 1)" } },
  { id: "still", name: "Statique", desc: "Aucune transition.", vars: { "--dur": "0ms", "--ease": "linear" } },
];

export const SHAPE_GROUPS = [
  { key: "radius", label: "Rayons", list: RADIUS },
  { key: "density", label: "Densité", list: DENSITY },
  { key: "border", label: "Contours", list: BORDER },
  { key: "depth", label: "Profondeur", list: DEPTH },
  { key: "motion", label: "Mouvement", list: MOTION },
];
export const byId = (list, id) => list.find((x) => x.id === id) || list[0];
