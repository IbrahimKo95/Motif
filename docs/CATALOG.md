# Écrire une famille / une variante du catalogue

Le catalogue (`src/lib/data/families/*.mjs`) est le cœur du produit. Chaque **famille** (boutons, navbar…) contient des **variantes** (plein, contour, brut…). L'utilisateur en choisit une par famille ; le DESIGN.md exporté contient sa spec, son HTML et son CSS.

## Contrat d'une famille (`export default {...}`)

| Champ | Rôle |
|---|---|
| `id` | identifiant unique, = nom du fichier |
| `label`, `desc` | en français, affichés dans l'interface |
| `group` | `"Composants"`, `"Structure"` ou `"Sections"` |
| `icon` | clé dans `src/lib/data/icons.mjs` (`f_...`) |
| `size` | `"sm"` (carte ~330px), `"md"` (~380px), `"lg"` (~560px) : largeur de grille |
| `fit` (opt.) | largeur de conception en px pour les maquettes larges (navbar 800, hero 900…). L'aperçu est alors mis à l'échelle. `fitMax` (opt.) limite le zoom (défaut 1.15) |
| `deps` (opt.) | familles dont le HTML de démo dépend (ex. `["buttons"]`) |
| `base` | CSS commun à toutes les variantes, écrit avec `&` |
| `snippet` | HTML de référence **en anglais**, copié dans le DESIGN.md |
| `rules` | 3-4 règles d'usage (anglais) |
| `demo(ctx)` | retourne l'HTML de démo **en français**, réaliste (jamais de lorem ipsum) |
| `variants` | tableau de variantes |

## Contrat d'une variante

```js
{
  id: "brut", name: "Brut", desc: "Une phrase en français.", tags: ["Audacieux", "Ludique"],
  attrs: { shape: "inherit", depth: "hard", energy: "playful" },
  spec: ["Phrase de spec en anglais, précise et mesurable.", "Deuxième phrase (2 minimum)."],
  css: `& .btn-primary{...}`,      // surcharges propres à la variante
  stage: "mesh",                    // optionnel : fond coloré derrière (verre)
  demo: (c) => `...`,               // optionnel : remplace la démo de la famille
  snippet: `...`,                   // optionnel : remplace le snippet de la famille
}
```

Valeurs autorisées : `shape` = `inherit | sharp | soft | round | pill` (`inherit` = suit le rayon global) ; `depth` = `flat | outline | soft | hard | glass | lift` ; `energy` = `crisp | calm | friendly | premium | editorial | technical | playful`. Ces attributs alimentent le score de cohérence : sois honnête.

## Règles CSS (importantes)

1. **`&` désigne la racine de portée.** En aperçu : `.f-<famille>` pour `base`, `.mv-<famille>-<variante>` pour `css`. À l'export : retiré, il reste `.btn-primary{...}`. Écris toujours `& .classe` (avec espace) ou `&.classe`. Jamais de sélecteur sans `&` en tête.
2. **Uniquement des jetons**, jamais de couleur hex ni de px de rayon en dur. Jetons : `--bg --bg-subtle --surface --surface-raised --border --border-strong --text --text-muted --accent --accent-hover --accent-contrast --accent-text --accent-soft --success --warning --danger --info` (+ `--success-contrast` etc.) `--focus --overlay` ; formes `--r-sm --r-control --r-surface --r-full` ; `--control-h --pad-x --pad --gap --fs-ctl --border-w` ; ombres `--shadow-sm --shadow-md --shadow-lg` ; mouvement `--dur --ease` ; typo `--font-display --font-body --font-mono --heading-weight --heading-tracking --heading-leading --fs-xs|sm|base|lg|xl|2xl|3xl|4xl`. Mélanges : `color-mix(in srgb, var(--accent) 20%, transparent)`.
3. Une variante doit **changer vraiment l'apparence** (géométrie, fond, trait, ombre, typo), pas seulement une couleur. Pas de doublon d'une variante existante.
4. Chaque interactif a `:hover`, `:focus-visible` (anneau `var(--focus)`), `:disabled` si pertinent. Transitions via `var(--dur) var(--ease)`.
5. `@media (max-width:...)` est converti en `@container` dans l'aperçu (la mise en page réagit à la largeur de la carte). Utilise-le pour le responsive, jamais `vw`/`vh` (utilise `cqi`, il retombe sur le viewport à l'export).
6. **Pas de `position: fixed`** (modales, toasts…) : utilise `position:absolute` dans un conteneur de démo, ou une démo en flux normal. L'aperçu force `.modal{position:absolute}` uniquement pour la famille modales.
7. Les classes `.stack`, `.row`, `.faux`, `.side-demo` existent seulement dans l'aperçu (voir `src/index.css`). N'en dépends pas pour le composant lui-même ; elles ne sont utiles que pour l'échafaudage d'une démo.
8. Le CSS **de base doit être complet et cohérent** : la variante n'ajoute que des différences. Le CSS exporté = `base` + `css` de la variante choisie ; il doit fonctionner seul.
9. Accessibilité : vrais éléments sémantiques (`button`, `a`, `nav`, `dl`, `table`), `aria-*` corrects, contraste via les jetons (`--accent-text` pour du texte accent sur fond, `--accent-contrast` sur fond accent).

## Démo et contexte

`demo(ctx)` reçoit `{ uid, scope }`.
- `ctx.uid` : préfixe unique pour les `id`/`name` (radios, `aria-labelledby`).
- `ctx.scope("buttons", html)` : enveloppe `html` dans la portée de la variante de boutons **choisie par l'utilisateur** (sinon la première). À utiliser pour tout bouton/champ dans la démo d'une autre famille ; ajoute alors `deps: ["buttons"]`.
- Contenu réaliste et cohérent avec la marque fictive « Nomade » (facturation pour indépendants) : prénoms, montants en €, dates FR.
- Les onglets `[role=tab]` et bascules `.plans-toggle [role=radio]` sont câblés globalement (`src/App.tsx`). Pour tout autre comportement, préfère du CSS pur (`:checked`, `:hover`, `details`).

## Vérifier

```bash
npm test                       # intégrité (≥ 4 variantes, ids uniques, css sans & à l'export, 2 lignes de spec…)
npx tsc --noEmit
npx vite --port 5199           # puis Playwright : localStorage 'motif:v2' = {"view":"fam:<id>"} avant chargement
```
Toujours regarder les captures (clair ET sombre : `{"view":"fam:<id>","mode":"dark"}`), y compris à 400px de large.

## Ajouter une famille

1. Créer `src/lib/data/families/<id>.mjs`.
2. L'importer et l'ajouter à `FAMILIES` dans `src/lib/data/catalog.mjs` (ordre = ordre de la barre latérale).
3. Ajouter l'icône `f_<id>` dans `icons.mjs` si absente.
4. Ajouter un choix pour cette famille dans chaque kit de `src/lib/data/kits.mjs` (le test le vérifie).
