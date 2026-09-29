// Kits : points de départ complets. Chaque kit fixe couleurs, typo, forme et UNE variante pour CHAQUE famille du catalogue.
// Règle : un kit doit rester cohérent (score >= 80, vérifié par test/catalog.test.mjs).
const S = (radius, density, border, depth, motion) => ({ radius, density, border, depth, motion });

export const KITS = [
  {
    id: "atelier", name: "Atelier SaaS", tagline: "Net, fiable, productif. Le standard des produits B2B modernes.",
    theme: "cobalt", type: "schibsted", mode: "light", shape: S("soft", "normal", "hairline", "soft", "smooth"),
    picks: { backgrounds: "dots", buttons: "solid", inputs: "outlined", controls: "classic", tabs: "underline", badges: "soft", cards: "bordered", alerts: "soft", modals: "centered", tables: "lines", menus: "grouped", avatars: "squircle", breadcrumbs: "chevron", pagination: "pages", tooltips: "dark", progress: "steps", empty: "search", stats: "key", navbar: "classic", sidebar: "grouped", hero: "split", pricing: "cards", features: "grid", logos: "cards", testimonials: "cards", faq: "rules", cta: "band", footer: "columns", auth: "card" },
  },
  {
    id: "presse", name: "Presse", tagline: "Éditorial, typographique, filets fins. Le texte est l'image.",
    theme: "sable", type: "editorial", mode: "light", shape: S("sharp", "normal", "hairline", "flat", "snappy"),
    picks: { backgrounds: "grain", buttons: "underline", inputs: "underline", controls: "bare", tabs: "marker", badges: "ribbon", cards: "rule", alerts: "callout", modals: "centered", tables: "lines", menus: "list", avatars: "person", breadcrumbs: "slash", pagination: "minimal", tooltips: "dark", progress: "thin", empty: "text", stats: "editorial", navbar: "centered", sidebar: "classic", hero: "editorial", pricing: "minimal", features: "table", logos: "proof", testimonials: "editorial", faq: "open", cta: "inverted", footer: "wordmark", auth: "minimal" },
  },
  {
    id: "brut", name: "Brutaliste", tagline: "Gros contours, ombres dures, couleurs franches. Ludique et assumé.",
    theme: "citron", type: "bold", mode: "light", shape: S("soft", "normal", "strong", "hard", "snappy"),
    picks: { backgrounds: "brut", buttons: "brut", inputs: "brut", controls: "brut", tabs: "thick", badges: "sticker", cards: "brut", alerts: "brut", modals: "brut", tables: "grid", menus: "brut", avatars: "brut", breadcrumbs: "chevron", pagination: "brut", tooltips: "brut", progress: "chunky", empty: "raw", stats: "tile", navbar: "brut", sidebar: "classic", hero: "floating", pricing: "brut", features: "hover", logos: "cards", testimonials: "cards", faq: "raw", cta: "raw", footer: "columns", auth: "raw" },
  },
  {
    id: "verre", name: "Verre nocturne", tagline: "Sombre, translucide, lueurs douces. Premium et technologique.",
    theme: "aurore", type: "geo", mode: "dark", shape: S("round", "normal", "hairline", "soft", "smooth"),
    picks: { backgrounds: "mesh", buttons: "glass", inputs: "inset", controls: "tint", tabs: "segmented", badges: "glow", cards: "glass", alerts: "toast", modals: "glass", tables: "rows", menus: "glass", avatars: "gradient", breadcrumbs: "chevron", pagination: "pages", tooltips: "glass", progress: "ring", empty: "starters", stats: "spark", navbar: "glass", sidebar: "floating", hero: "halo", pricing: "toggle", features: "bento", logos: "marquee", testimonials: "single", faq: "cards", cta: "halo", footer: "band", auth: "split" },
  },
  {
    id: "doux", name: "Doux & rond", tagline: "Arrondi, chaleureux, tactile. Pour le grand public et le bien-être.",
    theme: "rose", type: "playful", mode: "light", shape: S("round", "airy", "hairline", "soft", "smooth"),
    picks: { backgrounds: "gradient", buttons: "pill", inputs: "halo", controls: "ios", tabs: "capsule", badges: "icon", cards: "shadow", alerts: "chip", modals: "sheet", tables: "rows", menus: "icons", avatars: "tint", breadcrumbs: "pills", pagination: "pills", tooltips: "rich", progress: "ring", empty: "illus", stats: "tile", navbar: "floating", sidebar: "floating", hero: "centered", pricing: "toggle", features: "steps", logos: "pills", testimonials: "strip", faq: "cards", cta: "form", footer: "centered", auth: "steps" },
  },
  {
    id: "terminal", name: "Terminal", tagline: "Monospace, angles vifs, dense. Outils de développeurs.",
    theme: "encre", type: "tech", mode: "dark", shape: S("sharp", "compact", "hairline", "flat", "snappy"),
    picks: { backgrounds: "grid", buttons: "console", inputs: "console", controls: "console", tabs: "brackets", badges: "mono", cards: "bordered", alerts: "console", modals: "drawer", tables: "terminal", menus: "command", avatars: "status", breadcrumbs: "terminal", pagination: "joined", tooltips: "dark", progress: "segments", empty: "text", stats: "strip", navbar: "cmdk", sidebar: "terminal", hero: "dots", pricing: "table", features: "table", logos: "band", testimonials: "metric", faq: "numbered", cta: "line", footer: "minimal", auth: "minimal" },
  },
  {
    id: "luxe", name: "Luxe calme", tagline: "Serif élégant, beaucoup d'air, tons profonds. Discret et cher.",
    theme: "prune", type: "elegant", mode: "light", shape: S("soft", "airy", "hairline", "flat", "smooth"),
    picks: { backgrounds: "plain", buttons: "outline", inputs: "filled", controls: "tint", tabs: "underline", badges: "dot", cards: "filled", alerts: "outline", modals: "centered", tables: "zebra", menus: "list", avatars: "person", breadcrumbs: "home", pagination: "minimal", tooltips: "light", progress: "thin", empty: "text", stats: "gauge", navbar: "minimal", sidebar: "iconlabel", hero: "centered", pricing: "single", features: "checks", logos: "band", testimonials: "wall", faq: "open", cta: "line", footer: "minimal", auth: "minimal" },
  },
  {
    id: "fintech", name: "Fintech net", tagline: "Précis, rassurant, chiffres en avant. Finance et données.",
    theme: "ocean", type: "product", mode: "light", shape: S("soft", "normal", "hairline", "soft", "snappy"),
    picks: { backgrounds: "halo", buttons: "gradient", inputs: "inset", controls: "classic", tabs: "segmented", badges: "solid", cards: "lift", alerts: "outline", modals: "centered", tables: "zebra", menus: "list", avatars: "squircle", breadcrumbs: "chevron", pagination: "pages", tooltips: "dark", progress: "steps", empty: "search", stats: "spark", navbar: "mega", sidebar: "inverse", hero: "stats", pricing: "cards", features: "grid", logos: "band", testimonials: "metric", faq: "rules", cta: "band", footer: "columns", auth: "split" },
  },
  {
    id: "sobre", name: "Sobre", tagline: "Presque invisible. Gris chauds, zéro décor, tout est lisibilité.",
    theme: "ardoise", type: "swiss", mode: "light", shape: S("soft", "normal", "hairline", "flat", "smooth"),
    picks: { backgrounds: "plain", buttons: "soft", inputs: "filled", controls: "tint", tabs: "underline", badges: "soft", cards: "filled", alerts: "inline", modals: "centered", tables: "minimal", menus: "list", avatars: "stack", breadcrumbs: "home", pagination: "minimal", tooltips: "light", progress: "loading", empty: "text", stats: "gauge", navbar: "minimal", sidebar: "iconlabel", hero: "centered", pricing: "single", features: "checks", logos: "band", testimonials: "wall", faq: "rules", cta: "line", footer: "minimal", auth: "minimal" },
  },
  {
    id: "sunset", name: "Sunset", tagline: "Corail, généreux, vivant. Applis de communauté et de lifestyle.",
    theme: "corail", type: "bricolage", mode: "light", shape: S("round", "normal", "hairline", "soft", "smooth"),
    picks: { backgrounds: "gradient", buttons: "pill", inputs: "search", controls: "tile", tabs: "pills", badges: "dashed", cards: "polaroid", alerts: "chip", modals: "banded", tables: "progress", menus: "icons", avatars: "tint", breadcrumbs: "pills", pagination: "more", tooltips: "rich", progress: "ring", empty: "drop", stats: "tile", navbar: "announce", sidebar: "workspace", hero: "email", pricing: "volume", features: "alternate", logos: "marquee", testimonials: "strip", faq: "cards", cta: "form", footer: "centered", auth: "social" },
  },
  {
    id: "nature", name: "Nature", tagline: "Verts profonds, textes chauds, rythme lent. Éco, food et bien-être.",
    theme: "foret", type: "warm", mode: "light", shape: S("soft", "airy", "hairline", "soft", "smooth"),
    picks: { backgrounds: "grain", buttons: "soft", inputs: "filled", controls: "halo", tabs: "folder", badges: "soft", cards: "neo", alerts: "soft", modals: "fullscreen", tables: "sticky", menus: "list", avatars: "person", breadcrumbs: "home", pagination: "minimal", tooltips: "light", progress: "thin", empty: "illus", stats: "gauge", navbar: "minimal", sidebar: "iconlabel", hero: "centered", pricing: "single", features: "checks", logos: "band", testimonials: "wall", faq: "open", cta: "line", footer: "minimal", auth: "minimal" },
  },
  {
    id: "neon", name: "Néon", tagline: "Fond quasi noir, lueurs vives. Gaming, crypto, événementiel.",
    theme: "minuit", type: "geo", mode: "dark", shape: S("soft", "normal", "hairline", "soft", "snappy"),
    picks: { backgrounds: "halo", buttons: "neon", inputs: "inline", controls: "console", tabs: "capsule", badges: "glow", cards: "gradient", alerts: "toast", modals: "glass", tables: "dense", menus: "command", avatars: "gradient", breadcrumbs: "chevron", pagination: "joined", tooltips: "glass", progress: "segments", empty: "starters", stats: "spark", navbar: "dock", sidebar: "rail", hero: "halo", pricing: "toggle", features: "bento", logos: "marquee", testimonials: "single", faq: "cards", cta: "halo", footer: "dark", auth: "split" },
  },
  {
    id: "swiss", name: "Suisse", tagline: "Grille rigoureuse, contrastes forts, un seul accent. Intemporel.",
    theme: "rubis", type: "swiss", mode: "light", shape: S("sharp", "normal", "hairline", "flat", "snappy"),
    picks: { backgrounds: "grid", buttons: "solid", inputs: "outlined", controls: "classic", tabs: "rail", badges: "solid", cards: "split", alerts: "bar", modals: "drawer", tables: "grid", menus: "grouped", avatars: "squircle", breadcrumbs: "chevron", pagination: "pages", tooltips: "dark", progress: "steps", empty: "search", stats: "key", navbar: "classic", sidebar: "classic", hero: "stats", pricing: "rows", features: "grid", logos: "cards", testimonials: "cards", faq: "rules", cta: "band", footer: "columns", auth: "card" },
  },
  {
    id: "candy", name: "Candy", tagline: "Lavande, bulles et rebonds. Tactile, joueur, pour les jeunes produits.",
    theme: "lavande", type: "playful", mode: "light", shape: S("capsule", "airy", "hairline", "soft", "smooth"),
    picks: { backgrounds: "hatch", buttons: "soft-ui", inputs: "halo", controls: "pop", tabs: "capsule", badges: "icon", cards: "neo", alerts: "chip", modals: "sheet", tables: "rows", menus: "icons", avatars: "gradient", breadcrumbs: "pills", pagination: "pills", tooltips: "rich", progress: "ring", empty: "illus", stats: "tile", navbar: "floating", sidebar: "cards", hero: "flip", pricing: "toggle", features: "steps", logos: "pills", testimonials: "cards", faq: "cards", cta: "form", footer: "centered", auth: "steps" },
  },
  {
    id: "sante", name: "Santé & confiance", tagline: "Menthe apaisante, formes douces, textes très lisibles.",
    theme: "menthe", type: "product", mode: "light", shape: S("soft", "airy", "hairline", "soft", "smooth"),
    picks: { backgrounds: "gradient", buttons: "solid", inputs: "outlined", controls: "halo", tabs: "pills", badges: "dot", cards: "shadow", alerts: "soft", modals: "centered", tables: "zebra", menus: "list", avatars: "person", breadcrumbs: "chevron", pagination: "pages", tooltips: "light", progress: "steps", empty: "illus", stats: "gauge", navbar: "classic", sidebar: "iconlabel", hero: "split", pricing: "cards", features: "alternate", logos: "band", testimonials: "cards", faq: "cards", cta: "form", footer: "columns", auth: "card" },
  },
  {
    id: "magazine", name: "Magazine sombre", tagline: "Ambre sur encre, serif imposant. Culture, média, portfolio.",
    theme: "ambre", type: "elegant", mode: "dark", shape: S("sharp", "airy", "hairline", "flat", "smooth"),
    picks: { backgrounds: "grain", buttons: "underline", inputs: "underline", controls: "bare", tabs: "marker", badges: "ribbon", cards: "corner", alerts: "callout", modals: "centered", tables: "lines", menus: "list", avatars: "person", breadcrumbs: "slash", pagination: "minimal", tooltips: "light", progress: "thin", empty: "text", stats: "editorial", navbar: "centered", sidebar: "classic", hero: "manifesto", pricing: "minimal", features: "table", logos: "proof", testimonials: "editorial", faq: "open", cta: "inverted", footer: "wordmark", auth: "minimal" },
  },
];
export const kitById = Object.fromEntries(KITS.map((k) => [k.id, k]));
