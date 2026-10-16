import { DASHBOARD_HOTSPOTS } from "@/lib/content";

// Points numérotés posés sur une capture. Survol ou focus (toucher sur mobile) révèle la légende.
export function Hotspots() {
  return (
    <>
      <ul className="hotspots" aria-label="Repères sur la capture">
        {DASHBOARD_HOTSPOTS.map((h) => (
          <li key={h.n} className="hotspot" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
            <button type="button" className="hotspot__pin" aria-describedby={`hs-${h.n}`}>{h.n}</button>
            <span role="tooltip" id={`hs-${h.n}`} className="hotspot__tip"><strong>{h.t}</strong>{h.d}</span>
          </li>
        ))}
      </ul>
      <ol className="hotspots-legend">
        {DASHBOARD_HOTSPOTS.map((h) => <li key={h.n}><span>{h.n}</span><strong>{h.t}</strong> — {h.d}</li>)}
      </ol>
    </>
  );
}
