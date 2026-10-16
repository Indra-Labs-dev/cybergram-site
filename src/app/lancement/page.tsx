import type { Metadata } from "next";
import { PageHead, Eyebrow } from "@/components/ui";
import { Countdown } from "@/components/Countdown";
import { WaitlistForm } from "@/components/WaitlistForm";
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
      <PageHead eyebrow="Lancement" title="L'ouverture approche." lead="CyberGram sera opérationnel dans 7 jours sur app.cybergram.dev. Suivez le compte à rebours ci-dessous :" />
      
      <section className="container" style={{ paddingTop: 40 }}>
        <div className="launch" style={{ maxWidth: 820 }}>
          <Eyebrow>Temps restant avant l&apos;ouverture</Eyebrow>
          <div style={{ marginTop: 24 }}>
            <Countdown />
          </div>

          <div style={{ marginTop: 36, maxWidth: 640 }}>
            <Eyebrow>Liste d&apos;attente</Eyebrow>
            <p className="body" style={{ marginTop: 8 }}>Inscrivez-vous pour être alerté(e) en priorité le jour du lancement :</p>
            <div style={{ marginTop: 16 }}>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <section className="container section prose" style={{ paddingTop: 56 }}>
        <Eyebrow>Statut</Eyebrow>
        <ul className="ticks">
          <li>Site public : en ligne sur cybergram.dev.</li>
          <li>Application : ouverture officielle dans 7 jours sur app.cybergram.dev.</li>
          <li>Accès anticipé : liste d&apos;attente ouverte ci-dessus pour recevoir votre lien d&apos;activation.</li>
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
