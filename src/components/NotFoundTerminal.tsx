"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAV } from "@/lib/site";

// 404 en terminal : la route demandée est traitée comme une cible hors périmètre.
export function NotFoundTerminal() {
  const path = usePathname() || "/";
  const lines = [
    `$ cible ajouter cybergram.dev${path}`,
    `✗ 404 : ${path} est hors du périmètre connu.`,
    "$ ls /",
  ];
  const [shown, setShown] = useState(lines.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = -1;
    const id = setInterval(() => { i += 1; setShown(i); if (i >= 3) clearInterval(id); }, 450);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="nf">
      <div className="shot__bar"><span>cybergram · terminal</span><span>erreur 404</span></div>
      <div className="nf__screen">
        {lines.slice(0, shown).map((l, i) => <div key={i} className={l.startsWith("✗") ? "nf__err" : "nf__in"}>{l}</div>)}
        {shown >= 3 && (
          <ul className="nf__ls">
            <li><Link href="/">accueil/</Link></li>
            {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.href.slice(1)}/</Link></li>)}
            <li><Link href="/lancement">lancement/</Link></li>
            <li><Link href="/glossaire">glossaire/</Link></li>
          </ul>
        )}
        <span className="term__caret" aria-hidden="true" />
      </div>
    </div>
  );
}
