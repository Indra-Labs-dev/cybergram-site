import type { Metadata } from "next";
import { PageHead, Eyebrow } from "@/components/ui";
import { Countdown } from "@/components/Countdown";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SITE, launchDateLabel } from "@/lib/site";
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
      <PageHead eyebrow="Lancement" title={SITE.appOpen ? "CyberGram est ouvert." : "L'ouverture approche."} lead={SITE.appOpen ? `La plateforme est accessible sur ${SITE.appUrl}.` : `Ouverture prévue le ${launchDateLabel} sur app.cybergram.dev. Suivez le compte à rebours ci-dessous :`} />
      
      <section className="container" style={{ paddingTop: 40 }}>
        <div className="launch" style={{ maxWidth: 820 }}>
          {!SITE.appOpen && <>
            <Eyebrow>Temps restant avant l&apos;ouverture</Eyebrow>
            <div style={{ marginTop: 24 }}><Countdown /></div>
            <div style={{ marginTop: 36, maxWidth: 640 }}>
              <Eyebrow>Liste d&apos;attente</Eyebrow>
              <p className="body" style={{ marginTop: 8 }}>Inscrivez-vous pour recevoir un e-mail à l&apos;ouverture :</p>
              <div style={{ marginTop: 16 }}><WaitlistForm /></div>
            </div>
          </>}
          {SITE.appOpen && <a href={SITE.appUrl} className="btn btn--primary" style={{ marginTop: 32 }}>Accéder à CyberGram →</a>}
        </div>
      </section>

      <section className="container section prose" style={{ paddingTop: 56 }}>
        <Eyebrow>Statut</Eyebrow>
        <ul className="ticks">
          <li>Site public : en ligne sur cybergram.dev.</li>
          <li>Application : {SITE.appOpen ? "ouverte" : `ouverture prévue le ${launchDateLabel}`} sur app.cybergram.dev.</li>
          {!SITE.appOpen && <li>Inscription : liste d&apos;attente ouverte ci-dessus pour recevoir un e-mail à l&apos;ouverture.</li>}
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
