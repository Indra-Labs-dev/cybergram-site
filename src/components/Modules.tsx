import { MODULES } from "@/lib/content";
import { Shot } from "./ui";
import { CopyAnchor } from "./CopyAnchor";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function Modules() {
  return (
    <div>
      {MODULES.map((m) => (
        <AnimateOnScroll as="article" className="module" id={m.id} key={m.id} aria-labelledby={`m-${m.id}`}>
          <div>
            <ul className="chips"><li className="chip chip--status">Interface conçue · ouverture au lancement</li></ul>
            <div className="module__title-row" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
              <h3 id={`m-${m.id}`} className="h3" style={{ margin: 0 }}>{m.label} — {m.title}</h3>
              <CopyAnchor anchorId={m.id} label={`Copier le lien direct vers le module ${m.label}`} />
            </div>
            <p>{m.text}</p>
            <ul className="ticks">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <Shot src={m.img} alt={m.alt} />
        </AnimateOnScroll>
      ))}
    </div>
  );
}
