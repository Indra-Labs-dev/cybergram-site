import Link from "next/link";
import { Eyebrow, Shot, LaunchBlock } from "@/components/ui";
import { Pillars, HackPenBand, Audiences, Faq } from "@/components/Sections";
import { Modules } from "@/components/Modules";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Terminal } from "@/components/Terminal";
import { Hotspots } from "@/components/Hotspots";
import { SITE } from "@/lib/site";
import { FAQ } from "@/lib/content";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "CyberGram — Apprendre. Échanger. Explorer.",
  description: "CyberGram réunit formation en cybersécurité, communauté, veille sur les menaces et pratique encadrée avec HackPen.",
  path: "/",
  absoluteTitle: true,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "fr",
  publisher: { "@id": `${SITE.url}/#organization` },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/images/logo-icon.png`,
  description: SITE.description,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="container hero" style={{ paddingTop: "clamp(64px,9vw,88px)" }} aria-labelledby="hero-title">
        <div className="eyebrow eyebrow--muted"><span className="dot" />Plateforme en préparation · cybergram.dev</div>
        <h1 id="hero-title" className="h1" style={{ marginTop: 28 }}>La cybersécurité, <span className="accent">rendue accessible.</span></h1>
        <Terminal />
        <div className="split" style={{ marginTop: 40 }}>
          <p className="lead">{SITE.description}</p>
          <div className="btn-row">
            <Link href="/ecosysteme" className="btn btn--primary">Découvrir l&apos;écosystème →</Link>
            <Link href="/lancement" className="btn btn--ghost">Où en est le lancement</Link>
          </div>
        </div>
      </section>
      <section className="container" style={{ paddingTop: 64 }} aria-label="Aperçu de l'interface CyberGram">
        <AnimateOnScroll variant="scale-in" duration={800}>
          <Shot src="/images/dashboard.png" alt="Capture de l'interface CyberGram : tableau de bord personnel" bar="app.cybergram.dev / accueil" priority>
            <Hotspots />
          </Shot>
        </AnimateOnScroll>
      </section>

      <section className="container section" aria-labelledby="eco-title">
        <AnimateOnScroll variant="fade-up">
          <div className="split">
            <div><Eyebrow>01 — Écosystème</Eyebrow><h2 id="eco-title" className="h2">Trois verbes, un seul espace.</h2></div>
            <p className="body">La signature de CyberGram résume son organisation. On apprend avec des cours et des parcours, on échange au sein de la communauté, et on explore les menaces puis les surfaces d&apos;attaque avec Intelligence et HackPen.</p>
          </div>
        </AnimateOnScroll>
        <Pillars />
      </section>

      <section className="container section" aria-labelledby="feat-title">
        <AnimateOnScroll variant="fade-up">
          <Eyebrow>02 — Plateforme</Eyebrow>
          <h2 id="feat-title" className="h2" style={{ maxWidth: "18ch" }}>Ce que l&apos;interface CyberGram couvre.</h2>
          <p className="note" style={{ marginTop: 20 }}>Modules présentés à partir des interfaces conçues. Leur ouverture publique dépend du lancement de l&apos;application.</p>
        </AnimateOnScroll>
        <Modules />
      </section>

      <HackPenBand />

      <section className="container section" aria-labelledby="pub-title">
        <AnimateOnScroll variant="fade-up">
          <Eyebrow>04 — Pour qui</Eyebrow>
          <h2 id="pub-title" className="h2" style={{ maxWidth: "20ch" }}>Du premier cours au premier rapport.</h2>
        </AnimateOnScroll>
        <Audiences />
      </section>

      <AnimateOnScroll variant="fade-up">
        <LaunchBlock />
      </AnimateOnScroll>
      <AnimateOnScroll variant="fade-up">
        <Faq />
      </AnimateOnScroll>
    </>
  );
}
