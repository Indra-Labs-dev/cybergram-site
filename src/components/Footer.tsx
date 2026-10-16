import Link from "next/link";
import { NAV, LEGAL, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link href="/" className="logo-link" aria-label="CyberGram, accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-cropped.png" alt="CyberGram" width={180} height={36} className="logo-img" />
          </Link>
          <p className="footer__tag">APPRENDRE. ÉCHANGER. EXPLORER.</p>
        </div>
        <nav aria-label="Navigation secondaire">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/lancement">Lancement</Link>
          <Link href="/glossaire">Glossaire</Link>
        </nav>
        <nav aria-label="Informations légales">
          {LEGAL.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          {SITE.contactEmail && <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>}
        </nav>
      </div>
      <div className="container footer__base">© {new Date().getFullYear()} CyberGram · cybergram.dev</div>
    </footer>
  );
}
