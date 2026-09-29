# Motif

Outil pour définir la DA d'un projet (couleurs, typo, forme, 240 variantes, 28 familles, 16 kits de composants) et exporter un `DESIGN.md` pour Claude Code.

React 18 + TypeScript + Vite. 100 % statique : aucun serveur applicatif nécessaire.

## Développement
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # tests du moteur et du catalogue
npm run build      # produit dist/
```

## Déploiement
Site statique, prévu pour **Coolify** (Nixpacks static, publish dir `dist`, SPA activé). Détails : [docs/DEPLOY.md](docs/DEPLOY.md). Un `deploy/Dockerfile` (nginx) est fourni si tu préfères Docker.

## Travailler avec Claude Code
Ouvre le dossier avec `claude` : `CLAUDE.md` donne tout le contexte, `docs/CATALOG.md` le contrat des composants, et `.claude/commands/` fournit `/add-variant`, `/add-family` et `/check`.

## Structure
- `src/lib/data` : familles de composants (variantes, CSS, HTML), thèmes, typos, kits
- `src/lib/engine` : couleurs (contraste AA), jetons, cohérence, export DESIGN.md
- `src/components` : interface React
- `src/store.ts` : état global (persisté en localStorage)
