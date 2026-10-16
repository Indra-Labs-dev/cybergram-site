"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CHAPTERS = [
  { verb: "Apprendre.", tone: "teal", img: "/images/learn.png", bar: "app.cybergram.dev / apprendre", title: "Des cours structurés, du premier pas à l'avancé.", text: "Parcours par niveau, leçons courtes, articles et tutoriels du blog.", href: "/fonctionnalites#apprendre" },
  { verb: "Échanger.", tone: "teal", img: "/images/community.png", bar: "app.cybergram.dev / communauté", title: "Une communauté pour poser ses questions et partager.", text: "Discussions, projets communautaires et agenda des événements : CTF, meetups, conférences.", href: "/fonctionnalites#communaute" },
  { verb: "Explorer.", tone: "amber", img: "/images/hackpen.png", bar: "hackpen / tableau de bord", title: "Suivre les menaces, puis pratiquer dans un cadre autorisé.", text: "Intelligence pour la veille, HackPen pour la reconnaissance et l'investigation.", href: "/hackpen" },
] as const;

// Section collante : les trois verbes se relaient et l'interface montrée suit.
export function ScrollStory() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const root = useRef<HTMLElement>(null);
  const markers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    markers.current.forEach((m) => m && io.observe(m));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = root.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setProgress(Math.min(1, Math.max(0, -r.top / (total || 1))));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const c = CHAPTERS[active] ?? CHAPTERS[0];

  return (
    <section ref={root} className="story" aria-labelledby="eco-title" style={{ height: `${CHAPTERS.length * 100 + 20}vh` }}>
      <div className="story__markers" aria-hidden="true">
        {CHAPTERS.map((_, i) => <div key={i} data-i={i} ref={(el) => { markers.current[i] = el; }} />)}
      </div>
      <div className="story__stage">
        <div className="container story__grid">
          <div className="story__text">
            <div className="eyebrow">01 — Écosystème</div>
            <h2 id="eco-title" className="sr-only">Trois verbes, un seul espace : apprendre, échanger, explorer.</h2>
            <div className="story__verbs" aria-hidden="true">
              {CHAPTERS.map((ch, i) => <span key={ch.verb} className={`story__verb story__verb--${ch.tone}${i === active ? " is-active" : i < active ? " is-past" : ""}`}>{ch.verb}</span>)}
            </div>
            <div className="story__copy" key={active}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <Link href={c.href} className="story__link">En savoir plus →</Link>
            </div>
            <div className="story__dots" aria-hidden="true">
              {CHAPTERS.map((ch, i) => <span key={ch.verb} className={i === active ? "is-active" : ""} />)}
              <span className="story__track"><span style={{ transform: `scaleX(${progress})` }} /></span>
            </div>
          </div>
          <figure className={`shot story__shot${c.tone === "amber" ? " story__shot--amber" : ""}`}>
            <div className="shot__bar"><span>{c.bar}</span><span>Données de démonstration</span></div>
            <div className="story__frames">
              {CHAPTERS.map((ch, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={ch.img} src={ch.img} alt={i === active ? `Capture : ${ch.bar}` : ""} aria-hidden={i !== active} width={1536} height={1024} loading="lazy" decoding="async" className={i === active ? "is-active" : ""} />
              ))}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
