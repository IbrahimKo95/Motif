import { FAMILIES, variantOf, familyById } from "../data/catalog.mjs";
import { RADIUS, DEPTH, byId } from "../data/shape.mjs";

// Profondeur : les variantes « douces » suivent les jetons d'ombre globaux ; seules les ombres dures sont explicites.
const NEAR_RAW = {
  crisp: ["calm", "technical", "premium", "editorial", "friendly", "playful"], calm: ["crisp", "premium", "editorial", "friendly"],
  friendly: ["calm", "playful", "crisp", "premium"], premium: ["crisp", "calm", "editorial", "friendly"],
  editorial: ["premium", "calm", "crisp", "technical"], technical: ["crisp", "editorial", "playful"], playful: ["friendly", "crisp", "technical"],
};
const NEAR = {};
for (const [k, list] of Object.entries(NEAR_RAW)) for (const x of list) { (NEAR[k] ||= new Set()).add(x); (NEAR[x] ||= new Set()).add(k); }
const ENERGY_LABEL = { crisp: "net", calm: "calme", friendly: "amical", premium: "premium", editorial: "éditorial", technical: "technique", playful: "ludique" };

export const energyLabel = (e) => ENERGY_LABEL[e] || e;

// Retourne { score, label, tone, dominant, issues[] }
export function coherence(state) {
  const globalShape = byId(RADIUS, state.shape.radius).shape;
  const globalDepth = state.shape.depth;
  const picks = FAMILIES.map((f) => ({ f, v: variantOf(f.id, state.picks[f.id]) })).filter((p) => p.v);
  if (picks.length < 2) return { score: null, label: "À construire", tone: "idle", dominant: null, issues: [], count: picks.length };

  const counts = {};
  for (const { v } of picks) counts[v.attrs.energy] = (counts[v.attrs.energy] || 0) + 1;
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

  let penalty = 0;
  const issues = [];
  for (const { f, v } of picks) {
    const a = v.attrs;
    const label = `${f.label} « ${v.name} »`;
    if (a.shape !== "inherit" && a.shape !== globalShape) {
      const clash = (a.shape === "sharp" && ["round", "pill"].includes(globalShape)) || (globalShape === "sharp" && ["round", "pill"].includes(a.shape));
      if (clash) { penalty += 4; issues.push({ level: "warn", fam: f.id, text: `${label} impose des coins ${a.shape === "sharp" ? "vifs" : a.shape === "pill" ? "en pilule" : "arrondis"}, à contre-courant du rayon global (${byId(RADIUS, state.shape.radius).name}).` }); }
      else penalty += 0.8;
    }
    const hardClash = (a.depth === "hard") !== (globalDepth === "hard") && (a.depth === "hard" || globalDepth === "hard") && (a.depth === "hard");
    if (hardClash) { penalty += 4; issues.push({ level: "warn", fam: f.id, text: `${label} utilise des ombres dures, mais la profondeur globale est « ${byId(DEPTH, globalDepth).name.toLowerCase()} ».` }); }
    else if (globalDepth === "hard" && a.depth !== "hard" && a.depth !== "outline") { penalty += 1.5; }
    if (a.energy !== dominant && !(NEAR[dominant] && NEAR[dominant].has(a.energy))) {
      penalty += 5;
      issues.push({ level: "warn", fam: f.id, text: `${label} est ${energyLabel(a.energy)} alors que ton style est plutôt ${energyLabel(dominant)}.` });
    } else if (a.energy !== dominant) penalty += 0.8;
  }
  // Rappels globaux
  const nGlass = picks.filter((p) => p.v.stage === "mesh").length;
  if (nGlass && state.mode === "light") issues.push({ level: "info", fam: null, text: "Les variantes en verre rendent mieux sur un fond coloré ou en mode sombre. Prévois un arrière-plan dégradé derrière." });

  const score = Math.max(0, Math.round(100 - (penalty / picks.length) * 9));
  const label = score >= 88 ? "Très cohérent" : score >= 72 ? "Cohérent" : score >= 52 ? "Mélangé" : "Disparate";
  const tone = score >= 88 ? "great" : score >= 72 ? "good" : score >= 52 ? "mid" : "bad";
  return { score, label, tone, dominant, issues: issues.slice(0, 6), count: picks.length };
}

export const completion = (state) => FAMILIES.filter((f) => state.picks[f.id]).length;

// Compatibilité d'une variante avec le reste du style (sans compter sa propre famille) : "good" | "clash" | null
export function variantFit(state, famId, v) {
  const others = FAMILIES.filter((f) => f.id !== famId && state.picks[f.id]).map((f) => variantOf(f.id, state.picks[f.id])).filter(Boolean);
  if (others.length < 2) return null;
  const counts = {};
  for (const o of others) counts[o.attrs.energy] = (counts[o.attrs.energy] || 0) + 1;
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const globalShape = byId(RADIUS, state.shape.radius).shape;
  const a = v.attrs;
  const shapeClash = a.shape !== "inherit" && ((a.shape === "sharp" && ["round", "pill"].includes(globalShape)) || (globalShape === "sharp" && ["round", "pill"].includes(a.shape)));
  const hardClash = a.depth === "hard" && state.shape.depth !== "hard";
  const near = a.energy === dominant ? 2 : NEAR[dominant] && NEAR[dominant].has(a.energy) ? 1 : 0;
  if (shapeClash || hardClash || near === 0) return "clash";
  return near === 2 ? "good" : null;
}
