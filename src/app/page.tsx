import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Shot, LaunchBlock } from "@/components/ui";
import { Pillars, HackPenBand, Audiences, Faq } from "@/components/Sections";
import { Modules } from "@/components/Modules";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, description: SITE.description, inLanguage: "fr" };

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container" style={{ paddingTop: "clamp(64px,9vw,88px)" }} aria-labelledby="hero-title">
        <div className="eyebrow eyebrow--muted"><span className="dot" />Plateforme en préparation · cybergram.dev</div>
        <h1 id="hero-title" className="h1" style={{ marginTop: 28 }}>La cybersécurité, <span className="accent">rendue accessible.</span></h1>
        <div className="split" style={{ marginTop: 40 }}>
          <p className="lead">{SITE.description}</p>
          <div className="btn-row">
            <Link href="/ecosysteme" className="btn btn--primary">Découvrir l&apos;écosystème →</Link>
            <Link href="/lancement" className="btn btn--ghost">Où en est le lancement</Link>
          </div>
        </div>
      </section>
      <section className="container" style={{ paddingTop: 64 }} aria-label="Aperçu de l'interface CyberGram">
        <Shot src="/images/dashboard.png" alt="Capture de l'interface CyberGram : tableau de bord personnel" bar="app.cybergram.dev / accueil" priority />
      </section>

      <section className="container section" aria-labelledby="eco-title">
        <div className="split">
          <div><Eyebrow>01 — Écosystème</Eyebrow><h2 id="eco-title" className="h2">Trois verbes, un seul espace.</h2></div>
          <p className="body">La signature de CyberGram résume son organisation. On apprend avec des cours et des parcours, on échange au sein de la communauté, et on explore les menaces puis les surfaces d&apos;attaque avec Intelligence et HackPen.</p>
        </div>
        <Pillars />
      </section>

      <section className="container section" aria-labelledby="feat-title">
        <Eyebrow>02 — Plateforme</Eyebrow>
        <h2 id="feat-title" className="h2" style={{ maxWidth: "18ch" }}>Ce que l&apos;interface CyberGram couvre.</h2>
        <p className="note" style={{ marginTop: 20 }}>Modules présentés à partir des interfaces conçues. Leur ouverture publique dépend du lancement de l&apos;application.</p>
        <Modules />
      </section>

      <HackPenBand />

      <section className="container section" aria-labelledby="pub-title">
        <Eyebrow>04 — Pour qui</Eyebrow>
        <h2 id="pub-title" className="h2" style={{ maxWidth: "20ch" }}>Du premier cours au premier rapport.</h2>
        <Audiences />
      </section>

      <LaunchBlock />
      <Faq />
    </>
  );
}
