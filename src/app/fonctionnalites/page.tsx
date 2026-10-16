import { PageHead, LaunchBlock } from "@/components/ui";
import { StickyModules } from "@/components/StickyModules";
import { LevelQuiz } from "@/components/LevelQuiz";
import { Eyebrow } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Fonctionnalités",
  description: "Les modules de CyberGram : Apprendre, Communauté, Événements, Intelligence et HackPen, avec leur statut avant l'ouverture.",
  path: "/fonctionnalites",
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Fonctionnalités", href: "/fonctionnalites" }]} />
      <PageHead eyebrow="Fonctionnalités" title="Les modules de CyberGram." lead="Chaque module est présenté à partir de son interface conçue. Aucun n'est encore ouvert au public : leur disponibilité sera confirmée au lancement." />
      <section className="container section" style={{ paddingTop: 72 }} aria-labelledby="quiz">
        <div className="split split--top">
          <div><Eyebrow>Par où commencer</Eyebrow><h2 id="quiz" className="h2">Quel parcours pour vous ?</h2><p className="body" style={{ marginTop: 20 }}>Six questions, trente secondes. Rien n&apos;est enregistré.</p></div>
          <LevelQuiz />
        </div>
      </section>
      <section className="container"><StickyModules /></section>
      <LaunchBlock />
    </>
  );
}
