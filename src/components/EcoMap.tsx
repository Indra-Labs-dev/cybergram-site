// Carte de l'écosystème : des paquets circulent le long des liens (CSS offset-path).
// Exemple de flux : une faille publiée → une fiche Intelligence → un cours → un exercice HackPen.
const NODES = [
  { id: "cg", x: 400, y: 80, label: "CyberGram", sub: "compte · profil · recherche" },
  { id: "res", x: 140, y: 260, label: "Ressources", sub: "cours · blog · événements" },
  { id: "com", x: 400, y: 300, label: "Communauté", sub: "discussions · projets" },
  { id: "intel", x: 660, y: 260, label: "Intelligence", sub: "CVE · menaces · IOC" },
  { id: "hp", x: 660, y: 440, label: "HackPen", sub: "projets · cibles · rapports", amber: true },
];
const LINKS: [string, string, string][] = [
  ["cg", "res", "M400 80 C 300 120, 180 170, 140 260"],
  ["cg", "com", "M400 80 L 400 300"],
  ["cg", "intel", "M400 80 C 500 120, 620 170, 660 260"],
  ["intel", "hp", "M660 260 L 660 440"],
  ["intel", "res", "M660 260 C 520 200, 280 200, 140 260"],
  ["res", "com", "M140 260 C 220 300, 320 310, 400 300"],
  ["com", "hp", "M400 300 C 470 380, 580 430, 660 440"],
];

export function EcoMap() {
  return (
    <figure className="ecomap">
      <svg viewBox="0 0 800 520" role="img" aria-labelledby="ecomap-t ecomap-d">
        <title id="ecomap-t">Carte de l&apos;écosystème CyberGram</title>
        <desc id="ecomap-d">CyberGram relie Ressources, Communauté et Intelligence. Intelligence alimente HackPen et les Ressources ; la Communauté échange avec Ressources et HackPen.</desc>
        {LINKS.map(([a, b, d], i) => (
          <g key={`${a}-${b}`}>
            <path d={d} className={`ecomap__link${b === "hp" ? " ecomap__link--amber" : ""}`} pathLength={1} style={{ animationDelay: `${i * 120}ms` }} />
            <circle r="3.5" className={`ecomap__packet${b === "hp" ? " ecomap__packet--amber" : ""}`} style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.7}s` }} />
          </g>
        ))}
        {NODES.map((n, i) => (
          <g key={n.id} className={`ecomap__node${n.amber ? " ecomap__node--amber" : ""}`} transform={`translate(${n.x} ${n.y})`} style={{ animationDelay: `${300 + i * 120}ms` }}>
            <rect x="-86" y="-30" width="172" height="60" rx="10" />
            <text y="-3" className="ecomap__label">{n.label}</text>
            <text y="16" className="ecomap__sub">{n.sub}</text>
          </g>
        ))}
      </svg>
      <figcaption className="shot__cap"><span>Exemple de flux : une CVE publiée → fiche Intelligence → cours associé → exercice HackPen</span></figcaption>
    </figure>
  );
}
