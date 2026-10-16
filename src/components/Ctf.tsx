"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CHALLENGES, sha256, normalizeFlag } from "@/lib/ctf";

const STORE = "cg-ctf-solved";

function load(): string[] {
  try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch { return []; }
}

export function Ctf() {
  const [solved, setSolved] = useState<string[]>([]);

  useEffect(() => {
    const saved = load();
    if (saved.length) queueMicrotask(() => setSolved(saved));
  }, []);

  const markSolved = (id: string) => {
    setSolved((s) => {
      const next = s.includes(id) ? s : [...s, id];
      try { localStorage.setItem(STORE, JSON.stringify(next)); } catch { /* stockage indisponible */ }
      return next;
    });
  };

  const all = solved.length === CHALLENGES.length;

  return (
    <>
      <div className="ctf__progress" role="status">
        <span>{solved.length} / {CHALLENGES.length} drapeaux</span>
        <span className="ctf__bar"><span style={{ width: `${(solved.length / CHALLENGES.length) * 100}%` }} /></span>
      </div>
      <div className="ctf">
        {CHALLENGES.map((c) => <Challenge key={c.id} c={c} done={solved.includes(c.id)} onSolve={() => markSolved(c.id)} />)}
      </div>
      {all && (
        <div className="ctf__win" role="status">
          <div className="eyebrow">Mission accomplie</div>
          <h2 className="h2">Trois drapeaux sur trois.</h2>
          <p className="body" style={{ marginTop: 16 }}>Vous venez de décoder, d&apos;analyser un journal et d&apos;auditer des en-têtes : le cœur de ce que CyberGram enseigne. Soyez prévenu de l&apos;ouverture.</p>
          <div className="btn-row" style={{ marginTop: 28 }}><Link href="/lancement" className="btn btn--primary">Rejoindre la liste d&apos;attente →</Link></div>
        </div>
      )}
    </>
  );
}

function Challenge({ c, done, onSolve }: { c: (typeof CHALLENGES)[number]; done: boolean; onSolve: () => void }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "wrong">("idle");
  const [hint, setHint] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((await sha256(normalizeFlag(value))) === c.hash) onSolve();
    else setState("wrong");
  };

  return (
    <article className={`ctf__card${done ? " is-done" : ""}`} aria-labelledby={`ctf-${c.id}`}>
      <header className="ctf__head">
        <span className="row__n">{c.n} · {c.level}</span>
        {done && <span className="ctf__ok">Drapeau validé</span>}
      </header>
      <h3 id={`ctf-${c.id}`}>{c.title}</h3>
      <p className="ctf__brief">{c.brief}</p>
      <pre className="ctf__data" tabIndex={0}><code>{c.data}</code></pre>
      {done ? (
        <p className="ctf__explain">{c.explain}</p>
      ) : (
        <>
          <form className="ctf__form" onSubmit={submit}>
            <label className="sr-only" htmlFor={`flag-${c.id}`}>Drapeau du défi {c.n}</label>
            <input id={`flag-${c.id}`} className={`waitlist-form__input${state === "wrong" ? " is-wrong" : ""}`} placeholder="CG{...}" value={value} spellCheck={false} autoComplete="off"
              onChange={(e) => { setValue(e.target.value); setState("idle"); }} />
            <button className="btn btn--ghost" type="submit">Valider</button>
          </form>
          {state === "wrong" && <p className="waitlist-form__msg waitlist-form__msg--error" role="alert">Pas encore. Relisez les données.</p>}
          <button type="button" className="ctf__hint-btn" aria-expanded={hint} onClick={() => setHint((h) => !h)}>{hint ? "Masquer l'indice" : "Afficher un indice"}</button>
          {hint && <p className="ctf__hint">{c.hint}</p>}
        </>
      )}
    </article>
  );
}
