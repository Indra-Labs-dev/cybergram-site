"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState("");
  const path = usePathname();

  if (path !== prevPath) {
    setPrevPath(path);
    if (open) {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="header">
      <div className="container header__bar">
        <Link href="/" className="logo-link" aria-label="CyberGram, accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="CyberGram" width={168} height={37} className="logo-svg" />
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <Link href="/lancement" className="btn btn--primary btn--sm header__cta">Suivre le lancement</Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((o) => !o)}>
          {open ? "FERMER" : "MENU"}
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" className="mobile-nav" aria-label="Menu mobile">
          <Link href="/">Accueil</Link>
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/lancement" className="btn btn--primary">Suivre le lancement</Link>
        </nav>
      )}
    </header>
  );
}
