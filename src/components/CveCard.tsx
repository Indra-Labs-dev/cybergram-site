import Link from "next/link";
import { AnimateOnScroll } from "./AnimateOnScroll";

// Chronologie publique de Log4Shell (sources : Apache Logging Services, NVD).
const TIMELINE = [
  { d: "24 nov. 2021", t: "Signalement privé à Apache par l'équipe sécurité d'Alibaba Cloud" },
  { d: "9 déc. 2021", t: "Divulgation publique, exploitation massive dans les heures qui suivent" },
  { d: "10 déc. 2021", t: "Log4j 2.15.0, premier correctif ; CVE publiée" },
  { d: "28 déc. 2021", t: "Log4j 2.17.1 corrige les derniers contournements" },
];

export function CveCard() {
  return (
    <AnimateOnScroll as="article" className="cve" aria-labelledby="cve-id">
      <header className="cve__head"><span id="cve-id" className="cve__id">CVE-2021-44228</span><span className="cve__sev">Critique · CVSS 10.0</span></header>
      <div className="cve__score" aria-hidden="true">
        <span className="cve__gauge"><span /></span>
        <span className="cve__scale"><span>0</span><span>Faible</span><span>Moyen</span><span>Élevé</span><span>Critique</span><span>10</span></span>
      </div>
      <dl className="cve__grid">
        <div><dt>Nom courant</dt><dd>Log4Shell</dd></div>
        <div><dt>Composant</dt><dd>Apache Log4j 2, bibliothèque de journalisation Java</dd></div>
        <div><dt>En une phrase</dt><dd>Un texte écrit dans un journal pouvait pousser le serveur à télécharger et exécuter du code distant.</dd></div>
        <div><dt>Pourquoi c&apos;est grave</dt><dd>Log4j est présent dans un très grand nombre d&apos;applications, et l&apos;exploitation ne demandait aucune authentification.</dd></div>
        <div><dt>Correctif</dt><dd>Mettre à jour Log4j (versions 2.17.1 et suivantes pour Java 8).</dd></div>
        <div><dt>Pour aller plus loin</dt><dd><Link href="/glossaire#cve">CVE</Link>, <Link href="/glossaire#cvss">CVSS</Link>, <Link href="/glossaire#ioc">IOC</Link> dans le glossaire</dd></div>
      </dl>
      <div className="cve__tl-wrap">
        <div className="cve__tl-title">Chronologie</div>
        <AnimateOnScroll as="ol" variant="fade-left" stagger={180} className="cve__tl">
          {TIMELINE.map((e) => <li key={e.d}><time>{e.d}</time><span>{e.t}</span></li>)}
        </AnimateOnScroll>
      </div>
    </AnimateOnScroll>
  );
}
