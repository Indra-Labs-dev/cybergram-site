# cybergram-site — site public cybergram.dev

Site vitrine statique, indépendant de l'application (`app.cybergram.dev`) et de l'API (`api.cybergram.dev`).
Aucune dépendance au backend Django, PostgreSQL ou Redis. Aucun cookie, traceur ou secret.

## Choix techniques
- Next.js 16 (App Router), React 19, TypeScript strict, CSS global à tokens (pas de Tailwind : moins de dépendances, styles centralisés).
- `output: "export"` → site 100 % statique dans `out/`.
- Cible Cloudflare : **Workers Static Assets** (Worker sans code, `wrangler.jsonc`). Un export statique ne nécessite pas d'adaptateur OpenNext/vinext.
- FAQ en `<details>` natif ; seul le menu mobile est un composant client.

## Commandes
```bash
npm install          # Node >= 20.9
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build        # génère out/
npm test             # vérifie out/ : routes, liens, ancres, métadonnées, secrets
npm run preview      # wrangler dev sur out/
npm run check        # lint + typecheck + build + test
```

## Déploiement Cloudflare
1. `npx wrangler login`
2. `npm run deploy` (build puis `wrangler deploy`) — ou, dans le dashboard Workers : connecter le dépôt, build command `npm run build`, deploy command `npx wrangler deploy`.
3. Vérifier l'URL `*.workers.dev` fournie.

### Domaine (à faire manuellement)
Workers & Pages → cybergram-site → Settings → Domains & Routes → Add Custom Domain → `cybergram.dev` (et `www.cybergram.dev` avec redirection vers l'apex via une règle de redirection). Ne pas lier `app.` ni `api.` à ce Worker.

### Variables d'environnement
Aucune.

## Fichiers Cloudflare
- `wrangler.jsonc` : Worker assets-only, 404 servie depuis `out/404.html`.
- `public/_headers` : en-têtes de sécurité et cache.
- `public/_redirects` : alias /ecosystem, /features, /about, /app.

## Checklist post-déploiement
- [ ] `/`, `/ecosysteme`, `/fonctionnalites`, `/hackpen`, `/a-propos`, `/lancement` → 200
- [ ] `/inexistant` → 404 avec la page CyberGram
- [ ] `/sitemap.xml` et `/robots.txt` accessibles, URLs en https://cybergram.dev
- [ ] En-têtes : `curl -sI https://cybergram.dev` (CSP, HSTS, nosniff)
- [ ] Partage social : aperçu Open Graph correct
- [ ] Console navigateur sans erreur, desktop et mobile
- [ ] Lighthouse : performance, accessibilité, SEO
- [ ] `app.cybergram.dev` non affecté

## Informations à fournir avant publication
- Éditeur, directeur de publication, adresse (mentions légales).
- Responsable du traitement et durée des journaux (confidentialité).
- Canal de contact vérifié → `SITE.contactEmail` dans `src/lib/site.ts`.
- Statut réel de chaque module et de HackPen (plugins, SATORI) au lancement.
- Logo vectoriel (SVG) et favicon ; une image Open Graph 1200×630 dédiée. Le PNG actuel du logo est utilisé en attendant ; favicon à placer dans `src/app/icon.png`.
- Confirmation des captures autorisées à la publication.
