import { PageHead, LaunchBlock } from "@/components/ui";
import { Modules } from "@/components/Modules";
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
      <section className="container"><Modules /></section>
      <LaunchBlock />
    </>
  );
}
