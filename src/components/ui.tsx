import Link from "next/link";
import { Countdown } from "./Countdown";
import { WaitlistForm } from "./WaitlistForm";
import { SITE, launchDateLabel } from "@/lib/site";

export function Eyebrow({ children, tone }: { children: React.ReactNode; tone?: "amber" }) {
  return <div className={`eyebrow${tone ? " eyebrow--" + tone : ""}`}>{children}</div>;
}

export function Shot({ src, alt, bar, caption = "Capture d'interface · données de démonstration", priority }: { src: string; alt: string; bar?: string; caption?: string | null; priority?: boolean }) {
  return (
    <figure className="shot">
      {bar && <div className="shot__bar"><span>{bar}</span><span>Données de démonstration</span></div>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={1536} height={1024} loading={priority ? "eager" : "lazy"} decoding="async" />
      {!bar && caption && <figcaption className="shot__cap">{caption}</figcaption>}
    </figure>
  );
}

export function PageHead({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <section className="container" style={{ paddingTop: "clamp(64px,9vw,112px)" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="h1" style={{ marginTop: 24, fontSize: "clamp(40px,6vw,80px)", maxWidth: "16ch" }}>{title}</h1>
      {lead && <p className="lead" style={{ marginTop: 28 }}>{lead}</p>}
    </section>
  );
}

export function LaunchBlock() {
  return (
    <section className="container section" aria-labelledby="launch-title">
      <div className="launch">
        <Eyebrow>{SITE.appOpen ? "Plateforme disponible" : "Compte à rebours & inscription"}</Eyebrow>
        <h2 id="launch-title" className="h2" style={{ maxWidth: "20ch" }}>{SITE.appOpen ? "CyberGram est ouvert." : `Ouverture prévue le ${launchDateLabel}.`}</h2>
        <p className="body">{SITE.appOpen ? "La plateforme est accessible dès maintenant." : "Inscrivez-vous pour recevoir un e-mail dès l'ouverture de la plateforme."}</p>

        {SITE.appOpen ? (
          <div className="btn-row" style={{ marginTop: 32 }}><a href={SITE.appUrl} className="btn btn--primary">Accéder à CyberGram →</a></div>
        ) : <>
          <div style={{ marginTop: 32 }}><Countdown /></div>
          <div style={{ marginTop: 36, maxWidth: 640 }}><WaitlistForm /></div>
        </>}

        <div className="btn-row" style={{ marginTop: 32 }}>
          <Link href="/lancement" className="btn btn--ghost">En savoir plus sur le lancement</Link>
          <Link href="/#faq" className="btn btn--ghost">Lire la FAQ</Link>
        </div>
      </div>
    </section>
  );
}
