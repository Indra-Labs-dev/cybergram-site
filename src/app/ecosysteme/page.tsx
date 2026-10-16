import Link from "next/link";
import { PageHead, Eyebrow, Shot, LaunchBlock } from "@/components/ui";
import { Pillars } from "@/components/Sections";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/page-metadata";
import { Term } from "@/components/Term";
import { CveCard } from "@/components/CveCard";
import { EcoMap } from "@/components/EcoMap";

export const metadata = createPageMetadata({
  title: "Écosystème",
  description: "Comment s'articulent la plateforme CyberGram, ses ressources d'apprentissage, sa communauté, son module Intelligence et HackPen.",
  path: "/ecosysteme",
});

const PARTS = [
  { t: "CyberGram", role: "Plateforme principale", d: "L'espace commun : compte, profil, notifications et recherche globale. Il donne accès à l'apprentissage, à la communauté et à l'intelligence." },
  { t: "Ressources", role: "Apprendre · Blog · Événements", d: "Cours, tutoriels, articles et agenda d'événements pour progresser et rester à jour." },
  { t: "Intelligence", role: "Veille", d: <><Term t="CVE" />, menaces, <Term t="Acteur de la menace">acteurs</Term>, <Term t="IOC" /> et rapports, présentés pour être compris et exploités.</> },
  { t: "HackPen", role: "Pratique", d: "Environnement de reconnaissance et d'investigation : projets, cibles, workflows, findings et rapports." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Écosystème", href: "/ecosysteme" }]} />
      <PageHead eyebrow="Écosystème" title="Un parcours continu, de la lecture à la pratique." lead="CyberGram est organisé autour de trois verbes. Chaque composant a un rôle précis et renvoie vers les autres." />
      <section className="container section" style={{ paddingTop: 72 }}><Pillars /></section>
      <section className="container section" aria-labelledby="carte">
        <Eyebrow>Carte</Eyebrow>
        <h2 id="carte" className="h2">Comment tout se relie.</h2>
        <div style={{ marginTop: 48 }}><EcoMap /></div>
      </section>
      <section className="container section" aria-labelledby="parts">
        <Eyebrow>Composants</Eyebrow>
        <h2 id="parts" className="h2">Qui fait quoi.</h2>
        <div className="grid-cells">
          {PARTS.map((p) => <div className="cell" key={p.t}><div className="eyebrow" style={{ color: "var(--ink-4)" }}>{p.role}</div><h3 style={{ marginTop: 12 }}>{p.t}</h3><p>{p.d}</p></div>)}
        </div>
      </section>
      <section className="container section">
        <div className="split split--top">
          <div><Eyebrow>Relations</Eyebrow><h2 className="h2">Intelligence alimente la pratique.</h2>
            <p className="body" style={{ marginTop: 20 }}>Le module Intelligence met en avant HackPen pour passer « de la veille à l&apos;action ». Les deux espaces partagent le même compte et la même identité visuelle, avec un accent orange propre à HackPen.</p>
            <div className="btn-row" style={{ marginTop: 28 }}><Link className="btn btn--ghost" href="/hackpen">Découvrir HackPen</Link></div>
          </div>
          <Shot src="/images/intelligence.png" alt="Capture du module Intelligence de CyberGram" />
        </div>
      </section>
      <section className="container section" aria-labelledby="exemple">
        <Eyebrow>Exemple</Eyebrow>
        <h2 id="exemple" className="h2">Une fiche Intelligence, en clair.</h2>
        <p className="body" style={{ marginTop: 20 }}>Comment une vulnérabilité publique réelle serait présentée : l&apos;essentiel d&apos;abord, le vocabulaire expliqué.</p>
        <CveCard />
      </section>
      <LaunchBlock />
    </>
  );
}
