import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: "clamp(96px,14vw,180px)" }}>
      <div className="eyebrow">Erreur 404</div>
      <h1 className="h1" style={{ marginTop: 24, fontSize: "clamp(40px,6vw,72px)" }}>Page introuvable.</h1>
      <p className="lead" style={{ marginTop: 24 }}>L&apos;adresse demandée n&apos;existe pas ou a été déplacée.</p>
      <div className="btn-row" style={{ marginTop: 32 }}><Link className="btn btn--primary" href="/">Retour à l&apos;accueil</Link></div>
    </section>
  );
}
