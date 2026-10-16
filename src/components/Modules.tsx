import { MODULES } from "@/lib/content";
import { Shot } from "./ui";

export function Modules() {
  return (
    <div>
      {MODULES.map((m) => (
        <article className="module" id={m.id} key={m.id} aria-labelledby={`m-${m.id}`}>
          <div>
            <ul className="chips"><li className="chip chip--status">Interface conçue · ouverture au lancement</li></ul>
            <h3 id={`m-${m.id}`} className="h3" style={{ marginTop: 20 }}>{m.label} — {m.title}</h3>
            <p>{m.text}</p>
            <ul className="ticks">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <Shot src={m.img} alt={m.alt} />
        </article>
      ))}
    </div>
  );
}
