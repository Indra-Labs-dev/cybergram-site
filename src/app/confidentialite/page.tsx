import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" }, robots: { index: false, follow: true } };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Informations légales" title="Politique de confidentialité" lead="Principes de protection de vos données personnelles et respect de votre vie privée." />
      <section className="container section prose" style={{ paddingTop: 56 }}>
        <h2>Données collectées</h2>
        <p>Le site vitrine cybergram.dev ne dépose aucun cookie publicitaire ou traceur tiers. Dans le cadre de la liste d&apos;attente pré-lancement, votre adresse e-mail et la date d&apos;inscription sont enregistrées lorsque vous soumettez volontairement le formulaire d&apos;alerte, exclusivement pour vous notifier de l&apos;ouverture de la plateforme. L&apos;adresse sera transmise à Brevo pour envoyer cette notification. Chaque message contient un lien pour retirer votre adresse de la liste.</p>
        <h2>Journaux techniques</h2>
        <p>Des journaux de requêtes standard (adresses IP anonymisées, date et heure, page consultée) peuvent être temporairement traités par notre hébergeur Cloudflare à des fins strictes de sécurité et de prévention des attaques DDoS.</p>
        <h2>Responsable du traitement</h2>
        <p>L&apos;équipe CyberGram, joignable directement par e-mail à : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.</p>
        <h2>Droits des personnes</h2>
        <p>Conformément aux réglementations applicables (RGPD), vous disposez à tout moment d&apos;un droit d&apos;accès, de rectification et de suppression de votre adresse e-mail. Pour toute demande, écrivez simplement à <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.</p>
      </section>
    </>
  );
}
