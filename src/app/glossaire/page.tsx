import { PageHead, LaunchBlock } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { createPageMetadata } from "@/lib/page-metadata";
import { GLOSSARY } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Glossaire",
  description: "Les termes essentiels de la cybersécurité expliqués simplement : CVE, CVSS, IOC, reconnaissance, pentest, divulgation responsable…",
  path: "/glossaire",
});

const slug = (t: string) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossaire CyberGram",
  url: `${SITE.url}/glossaire`,
  inLanguage: "fr",
  hasDefinedTerm: GLOSSARY.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.def, url: `${SITE.url}/glossaire#${slug(g.term)}` })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[{ name: "Glossaire", href: "/glossaire" }]} />
      <PageHead eyebrow="Glossaire" title="Le vocabulaire, sans jargon." lead="Les termes que vous croiserez sur CyberGram, expliqués en une ou deux phrases." />
      <section className="container section" style={{ paddingTop: 64 }}>
        <AnimateOnScroll as="dl" stagger={50} className="glossary">
          {GLOSSARY.map((g) => (
            <div key={g.term} id={slug(g.term)} className="glossary__item">
              <dt>{g.term}</dt>
              <dd>{g.def}</dd>
            </div>
          ))}
        </AnimateOnScroll>
      </section>
      <LaunchBlock />
    </>
  );
}
