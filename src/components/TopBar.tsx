"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE, launchDateLabel } from "@/lib/site";

export function TopBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside className="top-banner" aria-label="Bannière d'annonce de lancement">
      <div className="container top-banner__inner">
        <div className="top-banner__content">
          <span className={`dot${SITE.appOpen ? " dot--ready" : ""}`} />
          <span className="top-banner__text">
            <strong>{SITE.appOpen ? "CyberGram est ouvert" : `Ouverture prévue le ${launchDateLabel}`}</strong>
          </span>
        </div>
        <div className="top-banner__actions">
          {SITE.appOpen ? (
            <a href={SITE.appUrl} className="top-banner__cta">Accéder à CyberGram →</a>
          ) : (
            <Link href="/lancement" className="top-banner__cta">Être notifié →</Link>
          )}
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
