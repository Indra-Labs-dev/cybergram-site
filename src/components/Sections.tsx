import { PILLARS, HACKPEN_STEPS, AUDIENCES, FAQ } from "@/lib/content";
import { Eyebrow, Shot } from "./ui";

export function Pillars() {
  return (
    <div className="rows">
      {PILLARS.map((p) => (
        <div className="row" key={p.n}>
          <div className="row__head"><span className="row__n">{p.n}</span><h3 className={`row__verb${p.accent === "amber" ? " row__verb--amber" : ""}`}>{p.verb}</h3></div>
          <p style={{ color: "var(--ink-3)" }}>{p.text}</p>
          <ul className="chips">{p.modules.map((m) => <li className="chip" key={m}>{m}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export function HackPenBand({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section className="band-amber" id="hackpen" aria-labelledby="hp-title">
      <div className="container">
        <Eyebrow tone="amber">HackPen · Penetration testing platform</Eyebrow>
        <div className="split" style={{ marginTop: 20 }}>
          <H id="hp-title" className="h2" style={{ marginTop: 0 }}>Passer de la veille à la pratique.</H>
          <p className="body">HackPen organise un travail de reconnaissance et d&apos;investigation autorisé : projets, cibles, workflows d&apos;outils et findings, jusqu&apos;au rapport.</p>
        </div>
        <div style={{ marginTop: 56 }}><Shot src="/images/workflow.png" alt="Capture du Workflow Builder de HackPen" caption={null} /></div>
        <ol className="steps">
          {HACKPEN_STEPS.map((s) => <li key={s.n}><div className="n">{s.n}</div><div className="t">{s.t}</div><div className="d">{s.d}</div></li>)}
        </ol>
        <p className="note" style={{ marginTop: 32, color: "#9C8E7E" }}>HackPen est destiné aux tests réalisés sur des périmètres que vous êtes autorisé à évaluer. Le catalogue d&apos;outils et de plugins disponible au lancement sera précisé lors de l&apos;ouverture.</p>
      </div>
    </section>
  );
}

export function Audiences() {
  return (
    <div className="grid-cells">
      {AUDIENCES.map((a) => <div className="cell" key={a.t}><h3>{a.t}</h3><p>{a.d}</p></div>)}
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="container section faq" aria-labelledby="faq-title" style={{ scrollMarginTop: 80 }}>
      <Eyebrow>Questions</Eyebrow>
      <h2 id="faq-title" className="h2">FAQ</h2>
      <div className="faq__list">
        {FAQ.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}
      </div>
    </section>
  );
}
