---
format: 1920x1080
duration: 30s
message: "CyberGram ouvre le 31 octobre 2026 : apprendre, échanger, explorer la cybersécurité au même endroit."
arc: Feature-Benefit Cascade — hook → product intro → apprendre → échanger → explorer → HackPen → date → brand outro
audience: Apprenants, professionnels et passionnés de cybersécurité francophones
mode: autonomous
music: "minimal electronic, dark tech ambient, steady pulse, confident build, no vocals"
captions: skipped (no narration — on-screen type carries the message)
---

## Video direction

- **Palette** — from `frame.md`: ground `ink-black` #06090B, surfaces `ink-black-alt`, text `cream` / `cream-muted`, hairlines `border-dark`. Accent = `fire-orange` key (= CyberGram teal #2FE6B8) on every frame EXCEPT Frame 6 (HackPen), which swaps accent for `hackpen-amber` #FF9F2E. No orange anywhere else.
- **Type** — display = Sora (sentence case, tight negative tracking); body = Manrope; every label / terminal line = JetBrains Mono uppercase-tracked or terminal lowercase with a `~/cybergram $` prompt. A blinking block caret (accent) is the recurring motif tying frames together.
- **Screenshots** — always inside a thin-bordered window (1px `border-dark`, radius ~12px) with a mono title bar: left `app.cybergram.dev / <module>`, right `DONNÉES DE DÉMONSTRATION`. Never full-bleed raw, never tilted more than a gentle 3D lean.
- **Motion grammar** — long-tail eases (power3 out default; expo out for the logo lockup), smooth over bouncy. On-screen copy is the "voiceover": each word/line reveals on its own cue, never the whole canvas at t=0. Mask-up word reveals (words rise from behind a baseline mask) are the house text move, echoing the site's hero. Screens enter with a scan-line wipe left→right (thin accent line sweeping, as on the site) or a slow camera push.
- **Rhythm** — fast cascade through Frames 3–5 (one verb per frame, same layout so the swap reads as one sentence: "Apprendre. Échanger. Explorer."); Frame 7 (date) is the deliberate HELD breather before the outro; Frame 8 resolves still.
- **Negative list** — no hooded figures, no neon glow halos, no glitch / matrix rain / CRT, no stats or user counts, no purple-blue AI gradients, no bokeh. Neither failure mode: no slideshow (front-load then freeze), no screensaver (everything drifting independently).

## Frame 1 — Hook

- scene: Un terminal tape la question que se pose tout apprenant, puis la corrige.
- duration: 4.5s
- transition_in: cut
- type: hook
- beat: curiosity
- blueprint: typewriter-reveal (Adapt)
- focal: terminal line
- sfx: keyboard-typing-soft
- status: animated
- src: compositions/frames/01-hook.html

On-screen cues: "Cours, forums, veille, outils…" → "éparpillés partout." → retypes to "Et si tout était au même endroit ?"

Adapt: keep the live caret typing-and-editing signature; no brand payoff yet (Frame 2 owns it).
Scene 1 (0.0–1.6s): bare ink-black ground with a faint hairline grid; a mono prompt `~/cybergram $` sits left-of-center, upper third; the caret types "cours, forums, veille, outils…" — centered-left, single line, display-mono at large size.
Scene 2 (1.6–2.6s): a second line types beneath in `cream-muted`: "éparpillés partout." — then both lines backspace together.
Scene 3 (2.6–4.5s): the caret retypes, now in Sora display, larger: "Et si tout était au même endroit ?" — the word "même endroit" in accent; holds still with the caret blinking.

## Frame 2 — Product intro

- scene: Le monogramme CG s'assemble et se verrouille avec le nom et la promesse.
- duration: 4s
- transition_in: crossfade
- type: product_intro
- beat: reveal
- blueprint: logo-assemble-lockup (Reproduce)
- asset_candidates: assets/logo-icon.png — monogramme CG; assets/logo-cropped.png — logo horizontal
- focal: assets/logo-icon.png
- roles: logo-icon = cutout (hero mark) · logo-cropped = supporting (wordmark reference only if the worker cannot set "CyberGram" in Sora)
- sfx: whoosh-soft, impact-soft
- status: animated
- src: compositions/frames/02-intro.html

On-screen cues: [CG mark] → "CyberGram" → "La cybersécurité, rendue accessible."

Scene 1 (0.0–1.4s): on a cleared ink-black stage, the CG mark comes to exist dead-center — its chevron parts slide in from opposite sides and lock (or an accent outline draws on then fills) — Centered, mark ~30% of frame width.
Scene 2 (1.4–2.6s): the mark eases up and left as "CyberGram" rises in Sora display beside it (mask-up), forming the horizontal lockup — Centered lockup.
Scene 3 (2.6–4.0s): the tagline "La cybersécurité, rendue accessible." mask-reveals word by word beneath in Manrope lead, "rendue accessible." in accent; held read.

## Frame 3 — Apprendre

- scene: « Apprendre. » en grand, la capture du module Apprendre balayée par la ligne de scan.
- duration: 3.5s
- transition_in: cut
- type: feature_showcase
- beat: learn
- blueprint: device-surface-showcase (Adapt)
- asset_candidates: assets/learn.png — module Apprendre
- focal: assets/learn.png
- roles: learn = cutout (floating window)
- sfx: whoosh-soft
- status: animated
- src: compositions/frames/03-apprendre.html

On-screen cues: "Apprendre." → "Cours et parcours, du débutant à l'avancé."

Adapt: keep the floating-window hero with a slow push; single screen, no cycling — the verb swap across Frames 3–5 is the cycle.
Scene 1 (0.0–0.8s): asymmetric 40/60 — left column: mono label "01" then "Apprendre." mask-rises in Sora display, accent dot after the word. Right: empty window frame with title bar `app.cybergram.dev / apprendre`.
Scene 2 (0.8–2.0s): the accent scan line sweeps left→right across the window and reveals learn.png behind it; a slow push-in starts on the window (3 depth layers: grid ground, window, label).
Scene 3 (2.0–3.5s): the benefit line "Cours et parcours, du débutant à l'avancé." fades up under the verb in Manrope lead; push continues gently to the cut.

## Frame 4 — Échanger

- scene: Même composition : « Échanger. », capture Communauté puis Événements qui glisse devant.
- duration: 3.5s
- transition_in: cut
- type: feature_showcase
- beat: share
- blueprint: device-surface-showcase (Adapt)
- asset_candidates: assets/community.png — module Communauté; assets/events.png — module Événements
- focal: assets/community.png
- roles: community = cutout (main window) · events = supporting (second window overlapping lower-right)
- sfx: whoosh-soft
- status: animated
- src: compositions/frames/04-echanger.html

On-screen cues: "Échanger." → "Discussions, projets, événements et CTF."

Adapt: identical layout grid to Frame 3 so the hard cut reads as a word swap; adds a second overlapping window.
Scene 1 (0.0–0.8s): left column "02" + "Échanger." mask-rises (same position/size as "Apprendre." in Frame 3); right window `app.cybergram.dev / communauté` scan-wipes in with community.png.
Scene 2 (0.8–2.0s): a smaller second window (events.png, `… / événements`) slides up and overlaps the lower-right corner of the first — layered depth.
Scene 3 (2.0–3.5s): benefit line "Discussions, projets, événements et CTF." fades up; held read with gentle push.

## Frame 5 — Explorer

- scene: « Explorer. » et la capture Intelligence ; un repère pointe la veille sur les menaces.
- duration: 3.5s
- transition_in: cut
- type: feature_showcase
- beat: explore
- blueprint: device-surface-showcase (Adapt)
- asset_candidates: assets/intelligence.png — module Intelligence
- focal: assets/intelligence.png
- roles: intelligence = cutout (floating window)
- sfx: whoosh-soft
- status: animated
- src: compositions/frames/05-explorer.html

On-screen cues: "Explorer." → "Veille : CVE, menaces, IOC."

Scene 1 (0.0–0.8s): "03" + "Explorer." mask-rises in the same slot; window `app.cybergram.dev / intelligence` scan-wipes in with intelligence.png.
Scene 2 (0.8–2.2s): camera pushes toward the upper-left region of the screenshot (the CVE list) while a small accent-outlined callout chip "CVE · menaces · IOC" pops beside it.
Scene 3 (2.2–3.5s): benefit line "Veille : CVE, menaces, IOC." fades up under the verb; the last ~0.4s the accent begins warming toward amber at the window border to hand off to HackPen.

## Frame 6 — HackPen

- scene: Passage à l'ambre : HackPen, du workflow aux findings, dans un cadre autorisé.
- duration: 5s
- transition_in: wipe
- type: key_feature
- beat: practice
- blueprint: camera-journey (Adapt)
- asset_candidates: assets/workflow.png — HackPen workflow builder; assets/findings.png — HackPen findings; assets/hackpen.png — HackPen tableau de bord
- focal: assets/workflow.png
- roles: workflow = cutout (first window) · findings = cutout (second window) · hackpen = background (dimmed ~35%, blurred, behind)
- sfx: riser-short, click-soft
- status: animated
- src: compositions/frames/06-hackpen.html

On-screen cues: "HackPen" → "De la veille à la pratique." → workflow → findings → "Uniquement sur des périmètres autorisés."

Adapt: keep the multi-leg camera journey across one continuous world (workflow → findings); accent is hackpen-amber throughout; ground tints to the warm near-black.
Scene 1 (0.0–1.0s): amber hairline wipe crosses the frame; mono label "HACKPEN · PRATIQUE ENCADRÉE" in amber, then "De la veille à la pratique." mask-rises in Sora h1, upper-left third. hackpen.png sits dimmed far behind.
Scene 2 (1.0–2.6s): window `hackpen / workflow` with workflow.png glides in from the right; the camera travels along it left→right as a thin amber path traces across the node graph area.
Scene 3 (2.6–4.0s): camera continues right to the second window `hackpen / findings` (findings.png); a severity chip row (Critique · Élevé · Moyen · Faible · Info, small mono pills) staggers in under it.
Scene 4 (4.0–5.0s): the mono footnote "Uniquement sur des périmètres autorisés." types in at the bottom of the safe area; hold.

## Frame 7 — Date

- scene: La date d'ouverture, posée seule, avec un compte de jours sobre.
- duration: 3.5s
- transition_in: crossfade
- type: cta
- beat: announcement
- blueprint: titlecard-reveal (Reproduce)
- focal: date line
- sfx: impact-soft
- status: animated
- src: compositions/frames/07-date.html

On-screen cues: "Ouverture" → "31 octobre 2026" → "app.cybergram.dev"

Deliberate breather — ONE restrained move then stillness.
Scene 1 (0.0–1.0s): back to teal accent, cleared ink-black stage; mono label "OUVERTURE" with the pulsing accent dot (as on the site's banner), centered upper third.
Scene 2 (1.0–2.2s): "31 octobre 2026" slides up with a crossfade in Sora display, dead-center, the largest type of the video; a thin accent rule draws under it.
Scene 3 (2.2–3.5s): "app.cybergram.dev" fades in in mono below; full stillness.

## Frame 8 — Brand outro

- scene: Le logo se reforme, la signature et l'appel à l'action cybergram.dev.
- duration: 2.5s
- transition_in: cut
- type: branding
- beat: sign-off
- blueprint: cta-morph-press (Adapt)
- asset_candidates: assets/logo-icon.png — monogramme CG
- focal: assets/logo-icon.png
- roles: logo-icon = cutout
- sfx: click-soft
- status: animated
- src: compositions/frames/08-outro.html

On-screen cues: [CG mark] "CyberGram" → "Apprendre. Échanger. Explorer." → "Être notifié → cybergram.dev"

Adapt: keep the mark-condenses-into-CTA signature; no cursor click (the button simply settles with a press-scale).
Scene 1 (0.0–0.9s): CG mark + "CyberGram" lockup centered; the signature "APPRENDRE. ÉCHANGER. EXPLORER." in tracked mono fades in beneath.
Scene 2 (0.9–1.8s): the lockup condenses upward and a teal pill button "Être notifié → cybergram.dev" grows from the mark's center below it, with a gentle press-scale.
Scene 3 (1.8–2.5s): everything holds; the caret blinks once after "cybergram.dev". Final frame — real exit is a hold.
