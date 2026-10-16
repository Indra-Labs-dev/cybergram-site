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
- Le site statique n'en utilise pas côté navigateur. Le Worker nécessite `DATABASE_URL` (URL Neon poolée), `BREVO_API_KEY`, `EMAIL_FROM` (adresse d'expéditeur vérifiée chez Brevo) et `WAITLIST_ADMIN_TOKEN` (secret long aléatoire). `EMAIL_FROM_NAME` est facultatif. Configurer chaque valeur avec `npx wrangler secret put NOM`.
- En local, définir ces valeurs dans `.dev.vars` pour `wrangler dev` (fichier ignoré par Git, ne jamais le committer).
- Les migrations `migrations/001_launch_waitlist.sql` et `migrations/002_waitlist_notifications.sql` créent la liste, les jetons de désinscription et les états d'envoi. `migrations/003_ctf.sql` ajoute le classement du mini-CTF et la priorité d'envoi (à appliquer avant le déploiement). Le CTF exige le secret `CTF_SECRET` (`npx wrangler secret put CTF_SECRET`). L'inscription passe par `POST /api/waitlist`.
- Au lancement, appeler `POST /api/notify-launch` avec `Authorization: Bearer <WAITLIST_ADMIN_TOKEN>`. L'endpoint envoie jusqu'à 50 e-mails par appel via l'API transactionnelle Brevo, exclut les désinscrits et marque les messages acceptés par Brevo pour éviter les renvois. Répéter jusqu'à ce que `remaining` soit `false`.
- Le courriel de lancement utilise un template HTML responsive et une version texte (`src/lib/email-templates.ts`). L'authentification actuelle se fait par `BREVO_API_KEY` ; les paramètres `BREVO_SMTP_*` restent inutilisés tant que l'envoi n'est pas basculé en SMTP.
- Avant cet envoi, passer `appOpen` à `true` dans `src/lib/site.ts` et redéployer ; l'API refuse d'envoyer tant que la plateforme n'est pas marquée ouverte.
- Chaque notification contient un lien de désinscription (`GET /api/unsubscribe?token=...`).

## Fichiers Cloudflare
- `wrangler.jsonc` et `src/worker.ts` : API de liste d'attente et assets statiques, 404 servie depuis `out/404.html`.
- `public/_headers` : en-têtes de sécurité et cache.
- `public/_redirects` : alias /ecosystem, /features, /about, /app.

## Checklist post-déploiement
- [ ] `/`, `/ecosysteme`, `/fonctionnalites`, `/hackpen`, `/a-propos`, `/lancement`, `/glossaire`, `/ctf` → 200
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
