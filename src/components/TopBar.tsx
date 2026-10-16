"use client";

import Link from "next/link";
import { useState } from "react";

export function TopBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside className="top-banner" aria-label="Bannière d'annonce de lancement">
      <div className="container top-banner__inner">
        <div className="top-banner__content">
          <span className="dot dot--ready" />
          <span className="top-banner__text">
            <strong>Lancement officiel dans 7 jours</strong> — Plateforme en ligne le 23 octobre
          </span>
        </div>
        <div className="top-banner__actions">
          <Link href="/lancement" className="top-banner__cta">
            Être notifié →
          </Link>
          <button
            type="button"
            className="top-banner__close"
            onClick={() => setClosed(true)}
            aria-label="Fermer l'annonce"
          >
            ×
          </button>
        </div>
      </div>
    </aside>
  );
}
