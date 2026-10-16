import type { Metadata } from "next";
import { PageHead, Eyebrow } from "@/components/ui";
import { Countdown } from "@/components/Countdown";
import { SITE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Lancement",
  description: "État de préparation de l'application CyberGram et modalités d'annonce de son ouverture.",
  alternates: { canonical: "/lancement" },
  openGraph: { title: "Lancement · CyberGram", description: "État de préparation de l'application CyberGram et modalités d'annonce de son ouverture.", url: "/lancement" },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Lancement", href: "/lancement" }]} />
      <PageHead eyebrow="Lancement" title="L'ouverture approche." lead="CyberGram sera opérationnel dans 5 jours sur app.cybergram.dev. Suivez le compte à rebours ci-dessous :" />
      
      <section className="container" style={{ paddingTop: 40 }}>
        <div className="launch" style={{ maxWidth: 820 }}>
          <Eyebrow>Temps restant avant l&apos;ouverture</Eyebrow>
          <div style={{ marginTop: 24 }}>
            <Countdown />
          </div>
        </div>
      </section>

      <section className="container section prose" style={{ paddingTop: 56 }}>
        <Eyebrow>Statut</Eyebrow>
        <ul className="ticks">
          <li>Site public : en ligne sur cybergram.dev.</li>
          <li>Application : en préparation, non ouverte.</li>
          <li>Inscriptions et accès anticipé : non ouverts. Aucune donnée n&apos;est collectée.</li>
        </ul>
        {SITE.contactEmail ? (
          <p style={{ marginTop: 32 }}>Pour toute question : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></p>
        ) : (
          <p style={{ marginTop: 32 }}>Un canal de contact sera publié ici avant l&apos;ouverture.</p>
        )}
      </section>
    </>
  );
}
