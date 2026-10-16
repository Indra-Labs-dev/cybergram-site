import type { Metadata } from "next";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" }, robots: { index: false, follow: true } };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Informations légales" title="Mentions légales" lead="Document en cours de rédaction. Les éléments signalés doivent être fournis avant publication." />
      <section className="container section prose" style={{ paddingTop: 56 }}>
        <h2>Éditeur du site</h2>
        <p><span className="todo">À fournir</span> Raison sociale ou nom de l&apos;éditeur, forme juridique, adresse, numéro d&apos;immatriculation.</p>
        <h2>Directeur de la publication</h2>
        <p><span className="todo">À fournir</span> Nom du responsable de la publication.</p>
        <h2>Contact</h2>
        <p><span className="todo">À fournir</span> Adresse e-mail ou canal de contact vérifié.</p>
        <h2>Hébergement</h2>
        <p><span className="todo">À fournir</span> Cloudflare, Inc. — confirmer l&apos;entité et l&apos;adresse à mentionner selon le contrat.</p>
      </section>
    </>
  );
}
