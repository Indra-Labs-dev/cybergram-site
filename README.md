# cybergram-site — site public cybergram.dev

Site vitrine statique, indépendant de l'application (`app.cybergram.dev`) et de l'API (`api.cybergram.dev`).
Aucune dépendance au backend Django ou Redis. Neon sert uniquement à enregistrer les inscriptions à l'alerte de lancement ; aucun secret n'est livré au navigateur. Aucun cookie ni traceur.

## Choix techniques
- Next.js 16 (App Router), React 19, TypeScript strict, CSS global à tokens (pas de Tailwind : moins de dépendances, styles centralisés).
- `output: "export"` → site 100 % statique dans `out/`.
- Cible Cloudflare : export Next.js statique servi par Workers Static Assets, avec un Worker léger pour l'API de la liste d'attente (`wrangler.jsonc`). Aucun adaptateur OpenNext/vinext.
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
2. Configurer le secret Neon avec `npx wrangler secret put DATABASE_URL`, puis lancer `npm run deploy` (build puis `wrangler deploy`) — ou, dans le dashboard Workers : connecter le dépôt, build command `npm run build`, deploy command `npx wrangler deploy`.
3. Vérifier l'URL `*.workers.dev` fournie.

### Domaine (à faire manuellement)
Workers & Pages → cybergram-site → Settings → Domains & Routes → Add Custom Domain → `cybergram.dev` (et `www.cybergram.dev` avec redirection vers l'apex via une règle de redirection). Ne pas lier `app.` ni `api.` à ce Worker.

### Variables d'environnement
- Le site statique n'en utilise pas côté navigateur. Le Worker nécessite le secret `DATABASE_URL` (URL Neon poolée) : `npx wrangler secret put DATABASE_URL`.
- En local, définir `DATABASE_URL` dans `.dev.vars` pour `wrangler dev` (ne jamais committer ce fichier).
- Le schéma est défini dans `migrations/001_launch_waitlist.sql` ; la table `launch_waitlist` stocke les adresses et leur date d'inscription. L'inscription passe par `POST /api/waitlist`.

## Fichiers Cloudflare
- `wrangler.jsonc` et `src/worker.ts` : API de liste d'attente et assets statiques, 404 servie depuis `out/404.html`.
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
- Le logo vectoriel SVG reste à fournir si une version vectorielle est souhaitée ; le favicon et l'image Open Graph PNG sont déjà configurés.
- Confirmation des captures autorisées à la publication.
