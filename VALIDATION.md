# Rapport de validation

## Exécuté
| Contrôle | Résultat |
|---|---|
| Inventaire des références (54 fichiers) | Fait |
| Relecture du contenu : aucune statistique, tarif, certification ou inscription fictive | Fait |
| Liens : aucune ancre `#` vide dans le code source | Fait (revue manuelle) |
| Recherche de secrets dans le code source | Aucun |

## Non exécuté dans l'environnement de conception
Les commandes suivantes n'ont pas pu être lancées ici (pas d'exécution Node). Elles doivent être lancées localement :
`npm install`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, `npm run preview`.
`npm run check` les enchaîne et échoue au premier problème.

## Points d'attention
- Les versions sont déclarées en `^16` / `^19` : verrouiller via `package-lock.json` après le premier `npm install`.
- Favicon non fourni : ajouter `src/app/icon.png` (Next le détecte automatiquement).
- Pages légales en `noindex` tant qu'elles ne sont pas complétées.
