import { PageHead, Eyebrow, Shot, LaunchBlock } from "@/components/ui";
import { HackPenBand } from "@/components/Sections";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/page-metadata";
import { HackPenDemo } from "@/components/HackPenDemo";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

export const metadata = createPageMetadata({
  title: "HackPen",
  description: "HackPen, l'environnement de reconnaissance et d'investigation de l'écosystème CyberGram : projets, cibles, workflows, findings et rapports.",
  path: "/hackpen",
});

const VIEWS = [
  { img: "/images/hackpen.png", alt: "Capture du tableau de bord HackPen", t: "Tableau de bord", d: "Activité d'exécution, répartition des findings et actions rapides." },
  { img: "/images/targets.png", alt: "Capture de la liste des cibles HackPen", t: "Cibles", d: "Les domaines, hôtes et plages rattachés à un projet." },
  { img: "/images/findings.png", alt: "Capture de la vue Findings de HackPen", t: "Findings", d: "Résultats classés par sévérité, de Critique à Info." },
];

const CHARTER = [
  { t: "Autorisation écrite", d: "Chaque projet repose sur l'accord écrit du propriétaire des systèmes visés, avec un périmètre et une période définis." },
  { t: "Périmètre strict", d: "Seules les cibles déclarées dans le projet sont testées. Tout ce qui en sort est exclu." },
  { t: "Impact minimal", d: "Pas de déni de service, pas d'altération ni d'exfiltration de données réelles." },
  { t: "Divulgation responsable", d: "Les constats sont remis au propriétaire, qui dispose du temps nécessaire pour corriger avant toute publication." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "HackPen", href: "/hackpen" }]} />
      <PageHead eyebrow="HackPen · composant de l'écosystème" title="Un environnement pour la pratique encadrée." lead="HackPen est l'espace de reconnaissance et d'investigation intégré à CyberGram. Il structure une mission autour de projets, de cibles et de workflows." />
      <HackPenBand />
      <section className="container section" aria-labelledby="demo">
        <Eyebrow tone="amber">Démonstration</Eyebrow>
        <h2 id="demo" className="h2">Une mission, de bout en bout.</h2>
        <p className="body" style={{ marginTop: 20 }}>Un exemple fictif sur un domaine réservé à la documentation, pour voir comment s&apos;enchaînent les cinq étapes.</p>
        <div style={{ marginTop: 48 }}><HackPenDemo /></div>
      </section>
      <section className="container section" aria-labelledby="views">
        <Eyebrow>Interfaces</Eyebrow>
        <h2 id="views" className="h2">Les vues principales.</h2>
        {VIEWS.map((v) => (
          <AnimateOnScroll className="module" key={v.t}>
            <div><h3 className="h3">{v.t}</h3><p>{v.d}</p></div>
            <Shot src={v.img} alt={v.alt} />
          </AnimateOnScroll>
        ))}
      </section>
      <section className="container section" aria-labelledby="charte">
        <Eyebrow tone="amber">Usage responsable</Eyebrow>
        <h2 id="charte" className="h2">La charte HackPen.</h2>
        <div className="grid-cells">
          {CHARTER.map((c, i) => <div className="cell" key={c.t}><div className="row__n">{String(i + 1).padStart(2, "0")}</div><h3 style={{ marginTop: 12 }}>{c.t}</h3><p>{c.d}</p></div>)}
        </div>
      </section>
      <section className="container section" aria-labelledby="limits">
        <Eyebrow tone="amber">Limites actuelles</Eyebrow>
        <h2 id="limits" className="h2">Ce qui reste à confirmer.</h2>
        <ul className="ticks" style={{ maxWidth: 760 }}>
          <li>HackPen n&apos;est pas encore ouvert au public.</li>
          <li>Les plugins visibles dans les interfaces (marketplace) ne sont pas tous garantis au lancement.</li>
          <li>SATORI apparaît comme nouveauté dans l&apos;interface ; son périmètre sera présenté à l&apos;ouverture.</li>
          <li>Les offres et quotas éventuels seront communiqués au lancement.</li>
          <li>Les tests ne doivent porter que sur des périmètres que vous êtes autorisé à évaluer.</li>
        </ul>
      </section>
      <LaunchBlock />
    </>
  );
}
