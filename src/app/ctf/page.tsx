import { PageHead } from "@/components/ui";
import { Ctf } from "@/components/Ctf";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Mini-CTF",
  description: "Trois défis de cybersécurité à résoudre dans le navigateur : décodage, analyse de journal et audit d'en-têtes HTTP.",
  path: "/ctf",
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Mini-CTF", href: "/ctf" }]} />
      <PageHead eyebrow="Mini-CTF · avant l'ouverture" title="Trois drapeaux à capturer." lead="Un avant-goût de CyberGram : trois petits défis à résoudre dans votre navigateur. Format des drapeaux : CG{...}. Aucune donnée n'est envoyée, votre progression reste sur cet appareil." />
      <section className="container section" style={{ paddingTop: 64 }}>
        <Ctf />
      </section>
    </>
  );
}
