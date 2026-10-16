import { PageHead } from "@/components/ui";
import { Ctf } from "@/components/Ctf";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Mini-CTF",
  description: "Cinq défis de cybersécurité tirés pour vous, un défi du jour, des drapeaux cachés et un classement facultatif.",
  path: "/ctf",
});

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Mini-CTF", href: "/ctf" }]} />
      <PageHead eyebrow="Mini-CTF · avant l'ouverture" title="Cinq drapeaux, rien que pour vous." lead="Un avant-goût de CyberGram : cinq défis tirés au hasard pour vous, avec des données et des drapeaux propres à votre partie. Format : CG{...}. Chaque indice coûte un quart des points du défi. Pas de compte : votre partie tient dans un cookie de ce navigateur." />
      <section className="container section" style={{ paddingTop: 64 }}>
        <Ctf />
      </section>
    </>
  );
}
