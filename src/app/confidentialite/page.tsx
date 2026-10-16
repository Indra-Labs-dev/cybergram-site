import type { Metadata } from "next";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" }, robots: { index: false, follow: true } };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Informations légales" title="Politique de confidentialité" lead="Document en cours de rédaction. Les éléments signalés doivent être fournis avant publication." />
      <section className="container section prose" style={{ paddingTop: 56 }}>
        <h2>Données collectées</h2>
        <p><span className="todo">À fournir</span> Le site public ne comporte ni formulaire, ni cookie, ni outil de mesure d'audience. Confirmer ce point avant publication et le mettre à jour en cas d'ajout.</p>
        <h2>Journaux techniques</h2>
        <p><span className="todo">À fournir</span> Préciser les journaux conservés par l'hébergeur (adresses IP, requêtes) et leur durée.</p>
        <h2>Responsable du traitement</h2>
        <p><span className="todo">À fournir</span> Identité et coordonnées du responsable du traitement.</p>
        <h2>Droits des personnes</h2>
        <p><span className="todo">À fournir</span> Modalités d'exercice des droits et autorité de contrôle compétente.</p>
      </section>
    </>
  );
}
