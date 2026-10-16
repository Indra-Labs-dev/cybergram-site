import Link from "next/link";
import { Countdown } from "./Countdown";

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
        <Eyebrow>Compte à rebours</Eyebrow>
        <h2 id="launch-title" className="h2" style={{ maxWidth: "20ch" }}>Lancement officiel dans quelques jours.</h2>
        <p className="body">L&apos;accès à la plateforme ouvrira sur app.cybergram.dev. Suivez le compte à rebours avant l&apos;ouverture officielle :</p>
        
        <div style={{ marginTop: 32 }}>
          <Countdown />
        </div>

        <div className="btn-row" style={{ marginTop: 32 }}>
          <Link href="/lancement" className="btn btn--primary">Détails du lancement</Link>
          <Link href="/#faq" className="btn btn--ghost">Lire la FAQ</Link>
        </div>
      </div>
    </section>
  );
}
