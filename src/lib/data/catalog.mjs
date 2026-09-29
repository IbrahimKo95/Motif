import buttons from "./families/buttons.mjs";
import inputs from "./families/inputs.mjs";
import controls from "./families/controls.mjs";
import tabs from "./families/tabs.mjs";
import badges from "./families/badges.mjs";
import cards from "./families/cards.mjs";
import alerts from "./families/alerts.mjs";
import modals from "./families/modals.mjs";
import tables from "./families/tables.mjs";
import navbar from "./families/navbar.mjs";
import sidebar from "./families/sidebar.mjs";
import hero from "./families/hero.mjs";
import pricing from "./families/pricing.mjs";
import menus from "./families/menus.mjs";
import avatars from "./families/avatars.mjs";
import breadcrumbs from "./families/breadcrumbs.mjs";
import pagination from "./families/pagination.mjs";
import tooltips from "./families/tooltips.mjs";
import progress from "./families/progress.mjs";
import empty from "./families/empty.mjs";
import stats from "./families/stats.mjs";
import features from "./families/features.mjs";
import testimonials from "./families/testimonials.mjs";
import faq from "./families/faq.mjs";
import cta from "./families/cta.mjs";
import footer from "./families/footer.mjs";
import logos from "./families/logos.mjs";
import auth from "./families/auth.mjs";
import backgrounds from "./families/backgrounds.mjs";

export const FAMILIES = [buttons, inputs, controls, tabs, badges, cards, alerts, modals, tables, menus, avatars, breadcrumbs, pagination, tooltips, progress, empty, stats, navbar, sidebar, backgrounds, hero, pricing, features, logos, testimonials, faq, cta, footer, auth];
export const familyById = Object.fromEntries(FAMILIES.map((f) => [f.id, f]));
export const GROUPS = ["Composants", "Structure", "Sections"];
export const defaultVariant = (famId) => familyById[famId].variants[0].id;
export const variantOf = (famId, varId) => familyById[famId]?.variants.find((v) => v.id === varId);
export const TOTAL_VARIANTS = FAMILIES.reduce((n, f) => n + f.variants.length, 0);

export const scopeClass = (famId, varId) => `mv-${famId}-${varId}`;

// Applique la portée à une feuille de style écrite avec « & » (= racine de la variante).
export const scopedCss = (css, scope) => css.replaceAll("&", "." + scope);

export const famClass = (famId) => `f-${famId}`;
// Aperçus : la base est écrite une fois par famille (.f-<famille>), chaque variante ajoute sa portée .mv-<famille>-<variante>.
// Les @media deviennent des @container pour que la mise en page réagisse à la largeur de l'aperçu, pas à celle de la fenêtre.
const toContainer = (css) => css.replaceAll("@media (max-width", "@container (max-width");
export function previewCss() {
  const out = [];
  for (const f of FAMILIES) {
    out.push(toContainer(scopedCss(f.base || "", famClass(f.id))));
    for (const v of f.variants) out.push(toContainer(scopedCss(v.css || "", scopeClass(f.id, v.id))));
  }
  return out.join("\n");
}

// CSS de référence pour l'export : sans portée, pour une variante choisie.
export const exportCss = (famId, varId) => {
  const f = familyById[famId];
  const v = variantOf(famId, varId);
  return ((f.base || "") + (v.css || "")).replaceAll("& ", "").replaceAll("&", "").trim();
};
