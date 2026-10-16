"use client";
import { useEffect, useRef, useState } from "react";
import { MODULES } from "@/lib/content";
import { CopyAnchor } from "./CopyAnchor";

// Grand écran : la capture reste collée pendant que le texte défile et change en fondu.
// Petit écran : chaque module garde sa propre capture (voir .smod__inline-shot).
export function StickyModules() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="smod">
      <div className="smod__text">
        {MODULES.map((m, i) => (
          <article key={m.id} id={m.id} data-i={i} ref={(el) => { refs.current[i] = el; }} className={`smod__item${i === active ? " is-active" : ""}`} aria-labelledby={`m-${m.id}`}>
            <ul className="chips"><li className="chip chip--status">Interface conçue · ouverture au lancement</li></ul>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
              <h2 id={`m-${m.id}`} className="h3" style={{ margin: 0 }}>{m.label} — {m.title}</h2>
              <CopyAnchor anchorId={m.id} label={`Copier le lien direct vers le module ${m.label}`} />
            </div>
            <p>{m.text}</p>
            <ul className="ticks">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="smod__inline-shot" src={m.img} alt={m.alt} width={1536} height={1024} loading="lazy" decoding="async" />
          </article>
        ))}
      </div>
      <div className="smod__stage" aria-hidden="true">
        <figure className="shot">
          <div className="shot__bar"><span>app.cybergram.dev / {MODULES[active]?.id}</span><span>Données de démonstration</span></div>
          <div className="smod__frames">
            {MODULES.map((m, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.id} src={m.img} alt="" width={1536} height={1024} loading="lazy" decoding="async" className={i === active ? "is-active" : ""} />
            ))}
          </div>
        </figure>
      </div>
    </div>
  );
}
