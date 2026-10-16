import { HACKPEN_DEMO } from "@/lib/content";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function HackPenDemo() {
  return (
    <figure className="demo">
      <div className="shot__bar"><span>hackpen · projet « Audit vitrine »</span><span>Démonstration fictive</span></div>
      <AnimateOnScroll as="ol" variant="fade-in" stagger={450} className="demo__lines">
        {HACKPEN_DEMO.map((s) => (
          <li key={s.n}>
            <span className="demo__n">{s.n} · {s.t}</span>
            <code className="demo__cmd"><span aria-hidden="true">$ </span>{s.cmd}</code>
            <span className="demo__out">{s.out}</span>
          </li>
        ))}
      </AnimateOnScroll>
      <figcaption className="shot__cap">Périmètre fictif demo.example (domaine réservé à la documentation). Commandes illustratives, non contractuelles.</figcaption>
    </figure>
  );
}
