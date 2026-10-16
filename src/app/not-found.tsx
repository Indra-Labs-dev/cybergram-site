import Link from "next/link";
import { NotFoundTerminal } from "@/components/NotFoundTerminal";

export default function NotFound() {
  return (
    <section className="container hero" style={{ paddingBlock: "clamp(72px,10vw,140px)" }}>
      <div className="eyebrow">Erreur 404</div>
      <h1 className="h1" style={{ marginTop: 24, fontSize: "clamp(40px,6vw,72px)" }}>Cible hors périmètre.</h1>
      <p className="lead" style={{ marginTop: 24 }}>L&apos;adresse demandée n&apos;existe pas ou a été déplacée. Choisissez une destination ci-dessous.</p>
      <div style={{ marginTop: 40, maxWidth: 760 }}><NotFoundTerminal /></div>
      <div className="btn-row" style={{ marginTop: 32 }}><Link className="btn btn--primary" href="/">Retour à l&apos;accueil</Link></div>
    </section>
  );
}
