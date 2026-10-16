"use client";
import { useEffect, useState } from "react";

const WORDS = ["apprendre", "échanger", "explorer"];

// Ligne mono qui s'écrit sous le titre. Le texte complet est rendu côté serveur
// (lisible sans JS et par les lecteurs d'écran) ; l'effet ne fait que le rejouer.
export function Terminal() {
  const full = WORDS.join(" → ");
  const [n, setN] = useState(full.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Premier tick à 0 : la ligne est encore masquée par le fondu d'entrée du hero.
    let i = -1;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= full.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [full]);

  return (
    <p className="term" aria-label={`cybergram : ${full}`}>
      <span className="term__prompt" aria-hidden="true">~/cybergram $</span>{" "}
      <span aria-hidden="true">{full.slice(0, n)}</span>
      <span className="term__caret" aria-hidden="true" />
    </p>
  );
}
