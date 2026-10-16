import { ROADMAP, ROADMAP_STATUS } from "@/lib/content";
import { AnimateOnScroll } from "./AnimateOnScroll";

export function Roadmap() {
  return (
    <AnimateOnScroll as="ol" stagger={120} className="roadmap">
      {ROADMAP.map((col) => (
        <li key={col.status} className={`roadmap__col roadmap__col--${col.status}`}>
          <div className="roadmap__status"><span className="roadmap__mark" aria-hidden="true" />{ROADMAP_STATUS[col.status]}</div>
          <ul>{col.items.map((it) => <li key={it.t}><strong>{it.t}</strong><p>{it.d}</p></li>)}</ul>
        </li>
      ))}
    </AnimateOnScroll>
  );
}
