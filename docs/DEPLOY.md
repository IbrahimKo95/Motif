# Déploiement sur Coolify

Motif est un site 100 % statique (aucun serveur applicatif, aucune variable d'environnement). Deux façons de le déployer sur Coolify ; la première est la plus simple et n'utilise pas Docker à la main.

## Option A — Nixpacks « Static » (recommandé)
1. Coolify → **New Resource** → **Public/Private Repository** (GitHub) → choisir le repo.
2. **Build Pack** : `Nixpacks`.
3. Cocher **Is it a static site?** puis renseigner :
   - **Install Command** : `npm ci`
   - **Build Command** : `npm run build`
   - **Publish Directory** : `/dist`
4. Cocher **Is it a SPA?** (fallback vers `index.html`).
5. **Ports Exposes** : `80`. Renseigner le domaine (HTTPS automatique via Let's Encrypt), puis **Deploy**.

Node 20+ requis (Nixpacks prend la version de `engines` / la LTS par défaut).

## Option B — Dockerfile
Build Pack : `Dockerfile`, **Dockerfile Location** : `/deploy/Dockerfile`, port `80`. L'image est un nginx Alpine qui sert `dist/` avec fallback SPA et cache long sur les assets hachés.

## Accès depuis partout
Ajoute ton domaine dans Coolify (enregistrement A vers l'IP de l'Optiplex, ou Cloudflare Tunnel / Tailscale si le serveur n'est pas exposé).

## Données
Le style de chaque utilisateur est stocké dans le `localStorage` du navigateur (clé `motif:v2`) : rien côté serveur, donc rien à sauvegarder. Le style d'un appareil n'apparaît pas sur un autre : passer par l'export `DESIGN.md`.
