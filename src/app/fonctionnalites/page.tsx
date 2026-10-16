import type { Metadata } from "next";
import { PageHead, LaunchBlock } from "@/components/ui";
import { Modules } from "@/components/Modules";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description: "Les modules de CyberGram : Apprendre, Communauté, Événements, Intelligence et HackPen, avec leur statut avant l'ouverture.",
  alternates: { canonical: "/fonctionnalites" },
  openGraph: { title: "Fonctionnalités · CyberGram", description: "Les modules de CyberGram : Apprendre, Communauté, Événements, Intelligence et HackPen, avec leur statut avant l'ouverture.", url: "/fonctionnalites" },
};

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
