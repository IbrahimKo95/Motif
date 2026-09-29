# Motif — contexte pour Claude Code

Motif est un outil web où l'on choisit, parmi des variantes de composants avec aperçu réel (boutons, inputs, navbar, cartes, hero…), la direction artistique globale d'un projet. Il exporte UN fichier `DESIGN.md` (en anglais) que Claude Code suit ensuite. On ne compose pas de pages : on définit le style.

- Interface : **français**. `DESIGN.md` exporté : **anglais**. Commentaires du code : français ou anglais, peu importe.
- Utilisateur : Ibrahim, dev (Next/TS, Laravel, Symfony, Vue/Nuxt, Node). Aller droit au but, réponses courtes.

## Stack
Vite + React 18 + TypeScript (`strict:false`, `allowJs`). 100 % statique (SPA), aucun backend. État global dans `src/store.ts` (`useSyncExternalStore`), persisté dans `localStorage` clé `motif:v2`. Le moteur et le catalogue sont en JS pur (`.mjs`) pour être testables avec Node seul.

## Commandes
```bash
npm run dev      # http://localhost:5173
npm test         # catalogue + moteur (node, sans navigateur)
npx tsc --noEmit # typage
npm run build    # tsc + vite build -> dist/
```
Vérification visuelle : `npx vite --port 5199 &` puis `python3 scripts/shot.py 5199 <familleId> light|dark /tmp/x.png` (Playwright, Chromium déjà installé), puis regarder l'image. Ne teste pas à l'aveugle : un composant se juge à l'œil, en clair, en sombre et à 400 px.

**Ne jamais utiliser `pkill -f` / `killall`** (peut tuer ton propre shell). Pour arrêter un serveur : `kill <pid>` précis.

## Structure
```
src/
  main.tsx, App.tsx, store.ts, index.css
  components/  Views (kits, couleurs, typo, forme, familles, favoris), Chrome (top/side), Overlays (dialogues, tiroir, palette ⌘K), bits (Live/fit, stages)
  lib/
    preview.ts        rendu HTML des démos (scoping, fit, kits)
    data/catalog.mjs  liste des 29 familles, groupes, CSS de preview/export
    data/families/*.mjs  UNE famille par fichier (variantes, CSS, HTML de démo)
    data/kits.mjs     16 kits (thème + typo + forme + 1 variante par famille)
    data/themes.mjs, typography.mjs, shape.mjs, icons.mjs
    engine/  color (contraste AA), tokens (variables CSS), coherence (score), export (DESIGN.md)
docs/CATALOG.md   CONTRAT d'écriture des familles/variantes — À LIRE avant toute modif du catalogue
docs/DEPLOY.md    déploiement Coolify
scripts/shot.py   capture d'une famille
test/             tests catalogue + moteur
deploy/           Dockerfile + nginx.conf (optionnels)
```

## Règles qui comptent
1. **Tout style de variante passe par les jetons CSS** (`var(--accent)`, `--r-control`, `--border-w`…), jamais de couleur en dur. Les 18 thèmes ont un contraste AA vérifié clair + sombre.
2. Le CSS d'une variante utilise `&` (racine scopée) suivi d'un espace : `& .btn{…}`. En preview, `&` devient `.mv-<famille>-<variante>` ; à l'export il est retiré. Les `@media (max-width` deviennent `@container` en preview.
3. Pas de `position:fixed` dans un composant (il sortirait de l'aperçu). Pas d'image externe.
4. Une démo qui utilise des boutons/inputs passe par `ctx.scope("buttons", html)` et déclare `deps: ["buttons"]` pour refléter le choix de l'utilisateur.
5. Chaque variante : `id, name, desc (FR), tags, attrs {shape, depth, energy}, spec (>=2 phrases EN), css`. Les `attrs` alimentent le score de cohérence : sois honnête.
6. Toute nouvelle famille doit recevoir un choix dans **chaque kit** (`kits.mjs`) : le test échoue sinon. Score de cohérence de chaque kit >= 80.
7. Icônes de famille : `f_<id>` dans `icons.mjs`.

## Ajouter une famille (résumé, détails dans docs/CATALOG.md)
1. `src/lib/data/families/<id>.mjs` (copier `faq.mjs` pour une section large, `stats.mjs` pour un petit composant).
2. L'importer et l'ajouter à `FAMILIES` dans `catalog.mjs` (choisir le groupe : Composants / Structure / Sections).
3. Ajouter l'icône `f_<id>`.
4. Ajouter un pick par kit.
5. `npm test && npx tsc --noEmit`, puis captures clair/sombre.

## Ajouter une variante
Ajouter un objet dans `variants` de la famille, respecter le contrat, vérifier par capture. Ne pas changer les `id` existants (les styles enregistrés des utilisateurs les référencent).

## Export DESIGN.md
`engine/export.mjs` : setup selon la stack, Style DNA, jetons, principes, composants choisis (règles + snippet), a11y, definition of done, Annexe A `tokens.css`, Annexe B `components.css`. Si tu changes le format, mets à jour `test/engine.test.mjs`.

## Idées non faites
- Import d'inspiration depuis un HTML Stitch (extraction de jetons).
- Connexion MCP Stitch (non connecté à ce jour).
