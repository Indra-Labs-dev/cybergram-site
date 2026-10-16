import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" }, robots: { index: false, follow: true } };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Informations légales" title="Mentions légales" lead="Informations relatives à l'éditeur et à l'hébergement du site cybergram.dev." />
      <section className="container section prose" style={{ paddingTop: 56 }}>
        <h2>Éditeur du site</h2>
        <p>Le site cybergram.dev est édité par le projet <strong>CyberGram</strong> (Indra Labs).</p>
        <h2>Directeur de la publication</h2>
        <p>L&apos;équipe de direction CyberGram.</p>
        <h2>Contact</h2>
        <p>Pour toute question ou demande d&apos;information, vous pouvez nous écrire à l&apos;adresse suivante : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.</p>
        <h2>Hébergement</h2>
        <p>Le site statique est hébergé sur le réseau mondial distribué de <strong>Cloudflare, Inc.</strong> (101 Townsend St, San Francisco, CA 94107, États-Unis).</p>
      </section>
    </>
  );
}
