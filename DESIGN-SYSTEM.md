# CyberGram — Design System (site public)

Dérivé des références : logo, Accueil, Intelligence, HackPen Dashboard.

## Conservé des références
- Fond quasi noir, accent menthe/turquoise du logo (`--teal #2FE6B8`), orange propre à HackPen (`--amber #FF9F2E`).
- Signature « Apprendre. Échanger. Explorer. » en capitales espacées.
- Captures d'interface réelles, toujours marquées « données de démonstration ».

## Écarté pour le site public
- Illustrations de personnages à capuche, globes lumineux, halos néon (contraires au brief).
- Compteurs et statistiques (12K+ membres, etc.) : données de maquette, non vérifiées.
- Badge « plateforme de référence en Afrique » : affirmation non documentée.

## Tokens
Voir `src/app/globals.css` (`:root`).
- Couleurs : bg, bg-raise, line, ink-1…5, teal, amber. Texte courant ≥ 4.5:1 sur fond.
- Typo : Sora (titres, 500/600), Manrope (texte), JetBrains Mono (labels, métadonnées).
- Échelle : h1 clamp(44→96), h2 clamp(32→52), h3 28, lead 17→19, body 16–17, note 14, label 12.
- Espacement : sections clamp(88→140px), gouttière 24px, conteneur 1240px.
- Formes : rayons 8 / 12 / 16 px, bordures 1px, pas d'ombres.
- Boutons : `.btn--primary` (teal plein), `.btn--ghost` (contour). Hauteur 52px (40px compact). Zones tactiles ≥ 44px.
- États : hover éclairci, `:focus-visible` contour teal 2px.
- Mouvement : transitions 160ms ; désactivées sous `prefers-reduced-motion`.
- Iconographie : aucune icône décorative ; numérotation mono (01, 02…) et tirets.

## Composants
`Header`, `Footer`, `Eyebrow`, `Shot`, `PageHead`, `LaunchBlock`, `Pillars`, `Modules`, `HackPenBand`, `Audiences`, `Faq`.
