import { FAMILIES, familyById, variantOf, exportCss, defaultVariant } from "../data/catalog.mjs";
import { resolveCfg, tokensCss, fontHref, describeCfg } from "./tokens.mjs";
import { coherence, energyLabel } from "./coherence.mjs";
import { contrast } from "./color.mjs";

const STACKS = {
  html: { name: "HTML + CSS", tokens: "Save Appendix A as `styles/tokens.css` and Appendix B as `styles/components.css`; link both in the document head, tokens first.", note: "Use the class names below verbatim." },
  tailwind: { name: "Tailwind CSS", tokens: "Save Appendix A as `tokens.css` and import it globally. Map the variables in the Tailwind theme (`colors.accent = 'var(--accent)'`, `borderRadius.control = 'var(--r-control)'`, …). Appendix B stays as a plain `components.css` layer (`@layer components`) so class names remain stable.", note: "Prefer the component classes below over long utility strings for these components; use utilities for layout only." },
  react: { name: "React + CSS", tokens: "Save Appendix A as `src/styles/tokens.css` and Appendix B as `src/styles/components.css`, import both once at the app root, then build thin React components (`<Button variant=\"primary\">`) that only emit the classes below.", note: "One component per family; variants map to the modifier classes." },
  next: { name: "Next.js", tokens: "Save Appendix A as `app/tokens.css` and Appendix B as `app/components.css`, import both in `app/layout.tsx`. Load the fonts with `next/font` using the families listed in Typography, and keep the CSS variable names.", note: "Build thin server-compatible components that only emit the classes below." },
};
export const STACK_LIST = Object.entries(STACKS).map(([id, s]) => ({ id, name: s.name }));

const DNA_SHAPE = { sharp: "sharp, precise corners", soft: "softly rounded corners", round: "generously rounded corners", pill: "pill-shaped controls" };
const DNA_DEPTH = { flat: "flat surfaces separated by borders (no shadows)", soft: "soft, diffuse elevation", hard: "hard, offset shadows with no blur" };
const DNA_DENSITY = { compact: "compact and dense (32px controls)", normal: "balanced (40px controls)", airy: "airy and comfortable (48px controls)" };
const DNA_ENERGY = {
  crisp: "precise and product-like: confident, no decoration that does not carry meaning",
  calm: "quiet and restrained: low contrast between surfaces, tint over fill, plenty of air",
  friendly: "warm and approachable: rounded, tactile, a little playful",
  premium: "polished and premium: subtle depth, refined details, controlled highlights",
  editorial: "editorial: type-led, hairline rules, asymmetric composition, generous whitespace",
  technical: "technical and dense: monospaced accents, sharp geometry, information first",
  playful: "bold and playful: strong outlines, saturated color, personality over neutrality",
};

const hex = (t, m, k) => t[m][k];
const ratio = (a, b) => contrast(a, b).toFixed(1);

function colorTable(theme) {
  const rows = [
    ["bg", "Page background"], ["bgSubtle", "Wells, hovers, table stripes"], ["surface", "Cards, inputs, popovers"], ["surfaceRaised", "Raised layers (menus, active segments)"],
    ["border", "Default hairlines"], ["borderStrong", "Input borders, emphasis"], ["text", "Primary text (also inverse surfaces)"], ["textMuted", "Secondary text"],
    ["accent", "Brand fill: primary buttons, active indicators"], ["accentHover", "Accent hover/pressed"], ["accentContrast", "Text on accent fill"], ["accentText", "Accent-colored text on page background"], ["accentSoft", "Tinted accent backgrounds"],
    ["success", "Positive state"], ["warning", "Caution state"], ["danger", "Destructive/error"], ["info", "Informational"], ["focus", "Focus ring"],
  ];
  const k = (x) => "--" + x.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  const head = "| Role | Token | Light | Dark | Use |\n|---|---|---|---|---|";
  return head + "\n" + rows.map(([key, use]) => `| ${key} | \`${k(key)}\` | \`${hex(theme, "light", key)}\` | \`${hex(theme, "dark", key)}\` | ${use} |`).join("\n");
}

function pairsTable(theme) {
  const pairs = [["text", "bg"], ["textMuted", "bg"], ["accentContrast", "accent"], ["accentText", "bg"], ["text", "surface"]];
  return pairs.map(([f, b]) => `- \`${f}\` on \`${b}\`: light ${ratio(theme.light[f], theme.light[b])}:1, dark ${ratio(theme.dark[f], theme.dark[b])}:1`).join("\n");
}

const DESIGN_PRINCIPLES = `### Design principles (apply to every screen)

**Commit to the direction above.** The Style DNA is a deliberate aesthetic. Execute it with precision rather than drifting toward a generic default. If a decision is not covered by this file, ask "what would this exact style do?" and derive it from the tokens.

**Typography carries the identity.** Use only the font families declared in Typography. Headings use the display face, body copy the body face, code and numbers the mono face where specified. Keep a strict scale (\`--fs-xs\` to \`--fs-4xl\`), body copy at 16px with a 60 to 70 character measure, \`text-wrap: balance\` on headings and tabular numerals wherever digits align. Never fall back to Inter, Roboto, Arial or system fonts as a design choice.

**Color is used with discipline.** One dominant neutral system, one accent. The accent marks the single most important action or state per region, not decoration. Use semantic colors only for meaning. Never introduce a literal hex value in a component: every color comes from a token, so dark mode and theming keep working. Avoid purple-to-blue gradients, glowing orbs and other stock AI aesthetics unless this file explicitly asks for them.

**Composition and space.** Design on a 4px grid. Use a small set of spacing steps (4, 8, 12, 16, 24, 32, 48, 64, 96) and repeat them: consistent rhythm is what reads as professional. Give every page one clear focal point and a strict hierarchy of three levels (title, supporting text, action). Prefer alignment to a shared left edge over centering everything. Let sections breathe; density belongs to data views, not marketing pages.

**Depth and detail.** Surfaces are separated exactly the way the Style DNA describes (borders, soft shadows or hard shadows). Do not mix systems. Details come from the tokens: focus rings use \`--focus\`, borders use \`--border-w\`, radii use \`--r-*\`.

**Motion is purposeful.** Use the declared duration and easing (\`--dur\`, \`--ease\`) for hover, focus, open and close. One well-orchestrated entrance (staggered fade and rise of 8 to 12px) beats scattered micro-animations. Always respect \`prefers-reduced-motion: reduce\` by removing transforms and keeping opacity changes only.

**Content is real.** Write specific, plausible copy in the product's voice: sentence case, verb + object on buttons, no lorem ipsum, no exclamation marks, no emoji as icons. Use a single icon set with one stroke width (1.5px at 24px is a good default).

**States are part of the component.** Every interactive element ships with default, hover, focus-visible, active, disabled and, where relevant, loading, error and empty states. Empty states explain what to do next.`;

const A11Y = `- Contrast: body text >= 4.5:1, large text and UI boundaries >= 3:1. The tokens below already satisfy this; do not override them with custom greys.
- Every interactive element is reachable by keyboard, has a visible \`:focus-visible\` ring (\`--focus\`, 2px, 2px offset) and a 44px minimum touch target on coarse pointers.
- Semantics first: \`<button>\` for actions, \`<a>\` for navigation, \`<label>\` bound to every field, \`aria-current="page"\` on the current nav item, one \`<h1>\` per page and no skipped heading levels.
- Never convey state by color alone: pair it with an icon, text or shape.
- Layouts work from 360px to 1440px+ with no horizontal scroll. Test at 360, 768, 1024 and 1440. Tables scroll inside their own container; navigation collapses below 760px.
- Respect \`prefers-reduced-motion\` and \`prefers-color-scheme\` (tokens already provide both palettes).`;

const DONE = `Before finishing any UI work, verify:
1. Only tokens are used for color, radius, border width, shadow, spacing and font. Search the diff for hex values and pixel radii.
2. Every component uses the variant chosen in Section 4 (same classes and structure). No second button or input style exists in the product.
3. Light and dark modes both render correctly; contrast holds.
4. Keyboard path works end to end; focus is always visible.
5. The page has one clear focal point, consistent spacing and real copy.
6. Layout holds at 360px and at 1440px.`;

export function buildDesignMd(state) {
  const r = resolveCfg(state);
  const theme = r.theme;
  const cfgNames = describeCfg(state);
  const chosen = FAMILIES.filter((f) => state.picks[f.id]);
  const unchosen = FAMILIES.filter((f) => !state.picks[f.id]);
  const coh = coherence(state);
  const stack = STACKS[state.stack] || STACKS.html;
  const name = (state.name || "").trim() || "Untitled project";
  const kind = (state.kind || "").trim();

  // Familles à inclure dans le CSS : choisies + dépendances (variante par défaut si non choisie)
  const cssFams = new Map();
  for (const f of chosen) cssFams.set(f.id, state.picks[f.id]);
  const depNotes = [];
  for (const f of chosen) for (const d of f.deps || []) if (!cssFams.has(d)) { cssFams.set(d, defaultVariant(d)); depNotes.push(d); }
  const orderedCss = FAMILIES.filter((f) => cssFams.has(f.id));

  const dominant = coh.dominant || "crisp";
  const dna = `${DNA_ENERGY[dominant]}. ${DNA_SHAPE[r.radius.shape] ? DNA_SHAPE[r.radius.shape][0].toUpperCase() + DNA_SHAPE[r.radius.shape].slice(1) : ""}, ${DNA_DEPTH[r.depth.id]}, ${r.border.id === "strong" ? "heavy 2px outlines" : "1px hairline borders"}, density ${DNA_DENSITY[r.density.id]}, ${r.motion.id === "still" ? "no animation" : r.motion.id === "snappy" ? "snappy 120ms transitions" : "smooth 220ms transitions"}.`;

  const L = [];
  L.push(`# DESIGN.md — ${name}`);
  L.push("");
  L.push(`> Design source of truth${kind ? ` for a ${kind}` : ""}. Generated with Motif. **Read this whole file before writing or changing any UI, and follow it for every screen and component.** When this file and your defaults disagree, this file wins.`);
  L.push("");
  L.push("## 0. Set up (once, then never again)");
  L.push("");
  L.push(`Stack: **${stack.name}**.`);
  L.push("");
  L.push(`1. ${stack.tokens}`);
  L.push(`2. Add the font link from Section 2 (Typography) to the document head, or load the same families with the framework's font loader.`);
  L.push(`3. Add \`data-theme="light"\` or \`"dark"\` on \`<html>\` only if the user wants to force a mode; otherwise the palette follows the system. Default look: **${state.mode === "dark" ? "dark" : "light"}**.`);
  L.push(`4. From now on build every screen with the components in Section 4. ${stack.note} If a needed component is not listed, derive it from the tokens and the Style DNA, and write its CSS into the same components file.`);
  L.push("");
  L.push("## 1. Style DNA");
  L.push("");
  L.push(`**${name}** is ${dna}`);
  L.push("");
  L.push(`| Dimension | Decision |\n|---|---|\n| Palette | ${cfgNames.theme} (${theme.mood}) |\n| Typography | ${cfgNames.type} |\n| Corners | ${cfgNames.radius} |\n| Density | ${cfgNames.density} |\n| Borders | ${cfgNames.border} |\n| Depth | ${cfgNames.depth} |\n| Motion | ${cfgNames.motion} |\n| Overall energy | ${energyLabel(dominant)} |`);
  L.push("");
  L.push("Rules that follow from this style:");
  L.push(`- Corner language is always \`${r.radius.name.toLowerCase()}\`: use \`--r-sm\` (chips, tags), \`--r-control\` (buttons, inputs), \`--r-surface\` (cards, modals). Never invent a radius.`);
  L.push(`- Elevation is ${DNA_DEPTH[r.depth.id]}. Use \`--shadow-sm|md|lg\` only.`);
  L.push(`- Everything interactive is ${r.density.vars["--control-h"]} tall by default (\`--control-h\`).`);
  L.push("");
  L.push(DESIGN_PRINCIPLES);
  L.push("");
  L.push("## 2. Design tokens");
  L.push("");
  L.push("### Color");
  L.push("");
  L.push(colorTable(theme));
  L.push("");
  L.push("Verified contrast ratios:");
  L.push(pairsTable(theme));
  L.push("");
  L.push("### Typography");
  L.push("");
  L.push(`- Display: **${r.type.display}** (weight ${r.type.hw}, tracking ${r.type.ht}, leading ${r.type.hl})`);
  L.push(`- Body: **${r.type.body}**`);
  L.push(`- Mono: **${r.type.mono}** (code, IDs, tabular data)`);
  L.push(`- Scale: 12 / 14 / 16 / 18 / 22 / 28 / 40 / 56 px as \`--fs-xs\` … \`--fs-4xl\``);
  L.push("");
  L.push("Font link:");
  L.push("```html");
  L.push(`<link rel="preconnect" href="https://fonts.googleapis.com">`);
  L.push(`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`);
  L.push(`<link rel="stylesheet" href="${fontHref(state)}">`);
  L.push("```");
  L.push("");
  L.push("### Shape, density, depth, motion");
  L.push("");
  L.push("| Token | Value |\n|---|---|");
  for (const grp of [r.radius, r.density, r.border, r.depth, r.motion]) for (const [k, v] of Object.entries(grp.vars)) L.push(`| \`${k}\` | \`${v}\` |`);
  L.push("");
  L.push("Full CSS is in Appendix A. **Never hard-code these values; always reference the variable.**");
  L.push("");
  L.push("## 3. Layout and page patterns");
  L.push("");
  L.push("- Page container: max-width 1200px (1040px for reading-heavy pages), 24px side padding on mobile, 48px from 1024px up.");
  L.push("- Vertical rhythm between sections: 96px on marketing pages, 48px inside apps. Inside a section, stack with `gap` (never margins) using the spacing steps above.");
  L.push("- Marketing page order: navbar, hero, proof (logos or figures), three feature blocks, pricing, FAQ, final call to action, footer. One primary action, repeated with the same label.");
  L.push("- App shell order: sidebar (or top navigation), page header (title + one primary action), content, then secondary panels. Data views use the table and card components; forms use a single column at 480px max width.");
  L.push("- Forms: label above field, helper text below, error text replaces helper text and is announced (`aria-describedby`). Primary action right-aligned or full width on mobile.");
  L.push("");
  L.push("## 4. Components");
  L.push("");
  if (!chosen.length) L.push("_No component variant was chosen. Derive components from the tokens and the Style DNA._\n");
  else L.push("Each entry is the **selected variant** and must be implemented exactly as described, with the classes in the snippet and the CSS from Appendix B.\n");
  for (const f of chosen) {
    const v = variantOf(f.id, state.picks[f.id]);
    L.push(`### ${f.label} — ${v.name}`);
    L.push("");
    L.push(`${v.desc}`);
    L.push("");
    L.push(v.spec.map((s) => `- ${s}`).join("\n"));
    if (v.stage === "mesh") L.push("- Needs a colorful or gradient backdrop behind it to read as glass. Never place it on flat white.");
    L.push("");
    L.push("Usage rules:");
    L.push(f.rules.map((s) => `- ${s}`).join("\n"));
    L.push("");
    L.push("Markup:");
    L.push("```html");
    L.push((v.snippet || f.snippet).trim());
    L.push("```");
    L.push("");
  }
  if (unchosen.length) {
    L.push("### Other components");
    L.push("");
    L.push(`Not specified: ${unchosen.map((f) => f.label.toLowerCase()).join(", ")}. When needed, build them from the tokens so they feel like siblings of the components above: same radii, borders, depth, density and motion, and the same ${energyLabel(dominant)} energy.`);
    L.push("");
  }
  L.push("## 5. Accessibility and responsive");
  L.push("");
  L.push(A11Y);
  L.push("");
  L.push("## 6. Definition of done");
  L.push("");
  L.push(DONE);
  L.push("");
  if (coh.score != null) {
    L.push("## 7. Coherence notes");
    L.push("");
    L.push(`Style coherence at generation: **${coh.score}/100 (${coh.label})**.`);
    if (coh.issues.length) { L.push(""); L.push("Known tension points to handle with care:"); L.push(coh.issues.map((i) => `- ${i.text}`).join("\n")); }
    L.push("");
  }
  L.push("---");
  L.push("");
  L.push("## Appendix A — tokens.css");
  L.push("");
  L.push("```css");
  L.push(tokensCss(state, "both").trim());
  L.push("```");
  L.push("");
  L.push("## Appendix B — components.css (reference implementation)");
  L.push("");
  L.push("Base styles use the tokens only. Reproduce them, adapt selectors to the framework if needed, but keep the visual result identical.");
  if (depNotes.length) L.push(`\n_${depNotes.map((d) => familyById[d].label).join(", ")} included because other components depend on it (default variant)._`);
  L.push("");
  L.push("```css");
  L.push(":root{color-scheme:light dark}");
  L.push("*,*::before,*::after{box-sizing:border-box}");
  L.push("body{margin:0;background:var(--bg);color:var(--text);font:400 var(--fs-base)/1.55 var(--font-body);-webkit-font-smoothing:antialiased}");
  L.push("h1,h2,h3,h4{font-family:var(--font-display);font-weight:var(--heading-weight);letter-spacing:var(--heading-tracking);line-height:var(--heading-leading);text-wrap:balance}");
  L.push("@media (prefers-reduced-motion:reduce){*{transition-duration:0ms !important;animation-duration:0ms !important}}");
  for (const f of orderedCss) {
    L.push("");
    L.push(`/* ${f.label}: ${variantOf(f.id, cssFams.get(f.id)).name} */`);
    L.push(exportCss(f.id, cssFams.get(f.id)).replace(/\n{2,}/g, "\n"));
  }
  L.push("```");
  L.push("");
  return L.join("\n");
}
