import { PageHead, Eyebrow, LaunchBlock } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "À propos",
  description: "La vision de CyberGram : rendre la cybersécurité accessible en réunissant apprentissage, communauté et pratique.",
  path: "/a-propos",
});

const PRINCIPLES = [
  { t: "Accessible", d: "Des contenus pensés pour tous les niveaux, avec un vocabulaire expliqué." },
  { t: "Collectif", d: "Apprendre en échangeant, en partageant ses projets et ses retours d'expérience." },
  { t: "Pratique", d: "Relier la compréhension des menaces à un travail concret et autorisé." },
  { t: "Responsable", d: "Aucune promesse de sécurité absolue, un cadre d'usage clair pour les outils." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "À propos", href: "/a-propos" }]} />
      <PageHead eyebrow="À propos" title="La cybersécurité, rendue accessible." lead="CyberGram part d'un constat simple : apprendre la cybersécurité oblige souvent à jongler entre cours, forums, flux de veille et outils séparés. La plateforme les réunit dans un même espace." />
      <section className="container section" aria-labelledby="principes">
        <Eyebrow>Approche</Eyebrow>
        <h2 id="principes" className="h2">Quatre principes.</h2>
        <div className="grid-cells">{PRINCIPLES.map((p) => <div className="cell" key={p.t}><h3>{p.t}</h3><p>{p.d}</p></div>)}</div>
      </section>
      <LaunchBlock />
    </>
  );
}
