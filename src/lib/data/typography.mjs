// Associations typographiques. `gf` = paramètres Google Fonts (une seule feuille pour tout charger).
export const TYPES = [
  { id: "schibsted", name: "Schibsted Grotesk", mood: "Net et moderne", display: "Schibsted Grotesk", body: "Schibsted Grotesk", mono: "JetBrains Mono", hw: 700, ht: "-0.025em", hl: 1.08, serif: false, gf: ["Schibsted+Grotesk:wght@400;500;600;700", "JetBrains+Mono:wght@400;500"] },
  { id: "bricolage", name: "Bricolage + Instrument", mood: "Du caractère", display: "Bricolage Grotesque", body: "Instrument Sans", mono: "JetBrains Mono", hw: 700, ht: "-0.03em", hl: 1.04, serif: false, gf: ["Bricolage+Grotesque:wght@500;600;700", "Instrument+Sans:wght@400;500;600;700"] },
  { id: "editorial", name: "Newsreader + Hanken", mood: "Éditorial", display: "Newsreader", body: "Hanken Grotesk", mono: "IBM Plex Mono", hw: 500, ht: "-0.015em", hl: 1.1, serif: true, gf: ["Newsreader:wght@400;500;600", "Hanken+Grotesk:wght@400;500;600;700", "IBM+Plex+Mono:wght@400;500"] },
  { id: "warm", name: "Fraunces + Figtree", mood: "Chaleureux", display: "Fraunces", body: "Figtree", mono: "DM Mono", hw: 600, ht: "-0.02em", hl: 1.08, serif: true, gf: ["Fraunces:wght@500;600;700", "Figtree:wght@400;500;600;700", "DM+Mono:wght@400;500"] },
  { id: "playful", name: "Onest", mood: "Ludique", display: "Onest", body: "Onest", mono: "JetBrains Mono", hw: 800, ht: "-0.02em", hl: 1.05, serif: false, gf: ["Onest:wght@400;500;600;700;800"] },
  { id: "swiss", name: "Familjen Grotesk", mood: "Suisse, rigoureux", display: "Familjen Grotesk", body: "Familjen Grotesk", mono: "IBM Plex Mono", hw: 600, ht: "-0.02em", hl: 1.06, serif: false, gf: ["Familjen+Grotesk:wght@400;500;600;700"] },
  { id: "product", name: "Manrope", mood: "Produit, lisible", display: "Manrope", body: "Manrope", mono: "JetBrains Mono", hw: 700, ht: "-0.02em", hl: 1.1, serif: false, gf: ["Manrope:wght@400;500;600;700;800"] },
  { id: "elegant", name: "DM Serif + DM Sans", mood: "Élégant", display: "DM Serif Display", body: "DM Sans", mono: "DM Mono", hw: 400, ht: "-0.005em", hl: 1.08, serif: true, gf: ["DM+Serif+Display:wght@400", "DM+Sans:wght@400;500;600;700", "DM+Mono:wght@400;500"] },
  { id: "tech", name: "Plex Mono + Plex Sans", mood: "Technique", display: "IBM Plex Mono", body: "IBM Plex Sans", mono: "IBM Plex Mono", hw: 600, ht: "-0.02em", hl: 1.12, serif: false, gf: ["IBM+Plex+Mono:wght@400;500;600", "IBM+Plex+Sans:wght@400;500;600"] },
  { id: "classic", name: "Playfair + Source Sans", mood: "Classique", display: "Playfair Display", body: "Source Sans 3", mono: "IBM Plex Mono", hw: 700, ht: "-0.01em", hl: 1.1, serif: true, gf: ["Playfair+Display:wght@500;600;700", "Source+Sans+3:wght@400;500;600;700", "IBM+Plex+Mono:wght@400;500"] },
  { id: "bold", name: "Unbounded + Manrope", mood: "Audacieux", display: "Unbounded", body: "Manrope", mono: "JetBrains Mono", hw: 600, ht: "-0.02em", hl: 1.1, serif: false, gf: ["Unbounded:wght@500;600;700", "Manrope:wght@400;500;600;700"] },
  { id: "geo", name: "Outfit", mood: "Géométrique", display: "Outfit", body: "Outfit", mono: "JetBrains Mono", hw: 600, ht: "-0.02em", hl: 1.08, serif: false, gf: ["Outfit:wght@400;500;600;700"] },
];
export const typeById = Object.fromEntries(TYPES.map((t) => [t.id, t]));

export const fontsHref = () => {
  const fam = [...new Set(TYPES.flatMap((t) => t.gf))];
  return `https://fonts.googleapis.com/css2?${fam.map((f) => "family=" + f).join("&")}&display=swap`;
};
export const fontsHrefFor = (t) => `https://fonts.googleapis.com/css2?${t.gf.map((f) => "family=" + f).join("&")}&display=swap`;
