---
description: Ajoute une variante à une famille du catalogue Motif
argument-hint: <famille> <idée de la variante>
---
Ajoute une variante à la famille indiquée ($ARGUMENTS).
1. Lis `docs/CATALOG.md` et le fichier `src/lib/data/families/<famille>.mjs`.
2. Écris la variante (jetons CSS uniquement, `&` + espace, attrs honnêtes, spec >= 2 phrases EN). Elle doit être visuellement distincte des existantes.
3. Lance `npx vite --port 5199 &`, capture avec `python3 scripts/shot.py 5199 <famille> light /tmp/l.png` et `dark`, regarde les images, corrige.
4. `npm test && npx tsc --noEmit`. Résume en une ligne. Jamais de pkill.
