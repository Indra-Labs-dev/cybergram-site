"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BONUS, CHALLENGES, TIERS, sha256, normalizeFlag, tierOf } from "@/lib/ctf";

// Mini-CTF : défis personnels servis par le Worker (/api/ctf), avec repli hors ligne
// sur trois défis communs si l'API ne répond pas (développement statique, panne).

type Item = {
  id: string; n: string; title: string; level: string; brief: string; data: string;
  points: number; earned: number | null; hints: string[]; hintsLeft: number; solved: boolean; explain: string | null;
};
type View = { challenges: Item[]; score: number; max: number; finished: boolean; duration: number | null };

const api = async (path: string, body?: object) => {
  const r = await fetch(`/api/ctf/${path}`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "Service indisponible.");
  return data;
};

const store = {
  get<T>(k: string, d: T): T { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible */ } },
};

const fmt = (s: number) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`;

export function Ctf() {
  const [mode, setMode] = useState<"loading" | "online" | "offline">("loading");
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    console.info("%cCyberGram · mini-CTF", "color:#2FE6B8;font-weight:bold", "\nUn drapeau se lit parfois à l'envers : }siamaj_tnem_en_elosnoc_al{GC");
    api("session").then((v) => { setView(v); setMode("online"); }).catch(() => setMode("offline"));
  }, []);

  return (
    <>
      {mode === "loading" && <p className="ctf__progress" role="status">Génération de vos défis…</p>}
      {mode === "online" && view && <Personal view={view} setView={setView} />}
      {mode === "offline" && <Offline />}
      {mode === "online" && <Daily />}
      <Bonus />
      {mode === "online" && <Leaderboard canJoin={!!view?.finished} />}
    </>
  );
}

function Progress({ done, total, label }: { done: number; total: number; label: string }) {
  return (
    <div className="ctf__progress" role="status">
      <span>{label}</span>
      <span className="ctf__bar"><span style={{ width: `${(done / total) * 100}%` }} /></span>
    </div>
  );
}

function Personal({ view, setView }: { view: View; setView: (v: View) => void }) {
  const solved = view.challenges.filter((c) => c.solved).length;
  const reset = async () => {
    if (!confirm("Recommencer avec de nouveaux défis ? Votre progression actuelle sera perdue.")) return;
    setView(await api("reset", {}));
  };
  return (
    <>
      <div className="ctf__top">
        <Progress done={solved} total={view.challenges.length} label={`${solved} / ${view.challenges.length} drapeaux · ${view.score} / ${view.max} pts`} />
        <button type="button" className="ctf__hint-btn" onClick={reset}>Nouvelle partie</button>
      </div>
      <div className="ctf">
        {view.challenges.map((c) => <Challenge key={c.id} c={c} setView={setView} />)}
      </div>
      {view.finished && <Win view={view} />}
    </>
  );
}

function FlagForm({ id, onCheck }: { id: string; onCheck: (flag: string) => Promise<boolean> }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "wrong" | "error">("idle");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    setState("busy");
    try { setState((await onCheck(value)) ? "idle" : "wrong"); } catch { setState("error"); }
  };
  return (
    <>
      <form className="ctf__form" onSubmit={submit}>
        <label className="sr-only" htmlFor={`flag-${id}`}>Drapeau</label>
        <input id={`flag-${id}`} className={`waitlist-form__input${state === "wrong" ? " is-wrong" : ""}`} placeholder="CG{...}" value={value} spellCheck={false} autoComplete="off"
          onChange={(e) => { setValue(e.target.value); setState("idle"); }} />
        <button className="btn btn--ghost" type="submit" disabled={state === "busy"}>Valider</button>
      </form>
      {state === "wrong" && <p className="waitlist-form__msg waitlist-form__msg--error" role="alert">Pas encore. Relisez les données.</p>}
      {state === "error" && <p className="waitlist-form__msg waitlist-form__msg--error" role="alert">Vérification impossible pour le moment. Réessayez.</p>}
    </>
  );
}

function Challenge({ c, setView }: { c: Item; setView: (v: View) => void }) {
  const hint = async () => setView(await api("hint", { id: c.id }));
  const check = async (flag: string) => {
    const r = await api("submit", { id: c.id, flag });
    if (r.ok) setView(r);
    return r.ok;
  };
  const cost = Math.round(c.points * 0.25);
  return (
    <article className={`ctf__card${c.solved ? " is-done" : ""}`} aria-labelledby={`ctf-${c.id}`}>
      <header className="ctf__head">
        <span className="row__n">{c.n} · {c.level} · {c.points} pts</span>
        {c.solved && <span className="ctf__ok">+{c.earned} pts</span>}
      </header>
      <h3 id={`ctf-${c.id}`}>{c.title}</h3>
      <p className="ctf__brief">{c.brief}</p>
      <pre className="ctf__data" tabIndex={0}><code>{c.data}</code></pre>
      {c.solved ? <p className="ctf__explain">{c.explain}</p> : <FlagForm id={c.id} onCheck={check} />}
      {c.hints.map((h, i) => <p key={i} className="ctf__hint">Indice {i + 1} · {h}</p>)}
      {!c.solved && c.hintsLeft > 0 && (
        <button type="button" className="ctf__hint-btn" onClick={hint}>Indice {c.hints.length + 1} (−{cost} pts)</button>
      )}
    </article>
  );
}

function Win({ view }: { view: View }) {
  const tier = tierOf(view.score, view.max);
  const [copied, setCopied] = useState(false);
  const url = `${location.origin}/ctf/badge/${tier}`;
  const text = `Badge ${TIERS[tier].label} au mini-CTF CyberGram : ${view.score}/${view.max} pts${view.duration ? ` en ${fmt(view.duration)}` : ""}. À vous :`;
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ text, url }); return; } catch { /* partage annulé */ } }
    try { await navigator.clipboard.writeText(`${text} ${url}`); setCopied(true); } catch { /* presse-papiers refusé */ }
  };
  return (
    <div className="ctf__win" role="status">
      <div className="eyebrow">Mission accomplie · badge {TIERS[tier].label}</div>
      <h2 className="h2">{view.score} / {view.max} points{view.duration ? ` en ${fmt(view.duration)}` : ""}.</h2>
      <p className="body" style={{ marginTop: 16 }}>
        Décoder, lire des journaux, auditer : c&apos;est le cœur de ce que CyberGram enseigne. Inscrivez-vous depuis ce navigateur :
        votre partie terminée vous place en tête de l&apos;envoi le jour de l&apos;ouverture.
      </p>
      <div className="btn-row" style={{ marginTop: 28 }}>
        <Link href="/lancement" className="btn btn--primary">Rejoindre la liste d&apos;attente →</Link>
        <button type="button" className="btn btn--ghost" onClick={share}>{copied ? "Lien copié" : "Partager mon badge"}</button>
      </div>
    </div>
  );
}

function Offline() {
  const [solved, setSolved] = useState<string[]>([]);
  useEffect(() => {
    const saved = store.get<string[]>("cg-ctf-solved", []);
    if (saved.length) queueMicrotask(() => setSolved(saved));
  }, []);
  const mark = (id: string) => setSolved((s) => { const next = s.includes(id) ? s : [...s, id]; store.set("cg-ctf-solved", next); return next; });
  return (
    <>
      <p className="ctf__note">Mode hors ligne : les défis personnels sont indisponibles, voici les trois défis communs.</p>
      <Progress done={solved.length} total={CHALLENGES.length} label={`${solved.length} / ${CHALLENGES.length} drapeaux`} />
      <div className="ctf">
        {CHALLENGES.map((c) => {
          const done = solved.includes(c.id);
          return (
            <article key={c.id} className={`ctf__card${done ? " is-done" : ""}`} aria-labelledby={`ctf-${c.id}`}>
              <header className="ctf__head"><span className="row__n">{c.n} · {c.level}</span>{done && <span className="ctf__ok">Drapeau validé</span>}</header>
              <h3 id={`ctf-${c.id}`}>{c.title}</h3>
              <p className="ctf__brief">{c.brief}</p>
              <pre className="ctf__data" tabIndex={0}><code>{c.data}</code></pre>
              {done ? <p className="ctf__explain">{c.explain}</p> : (
                <>
                  <FlagForm id={c.id} onCheck={async (f) => { const ok = (await sha256(normalizeFlag(f))) === c.hash; if (ok) mark(c.id); return ok; }} />
                  <details className="ctf__details"><summary className="ctf__hint-btn">Afficher un indice</summary><p className="ctf__hint">{c.hint}</p></details>
                </>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}

type DailyData = { date: string; title: string; level: string; brief: string; data: string; hints: string[] };
type DailyRec = { solved: boolean; tries: number; hints: number };

function streakOf(log: Record<string, DailyRec>, date: string) {
  let n = 0;
  const d = new Date(`${date}T00:00:00Z`);
  if (!log[date]?.solved) d.setUTCDate(d.getUTCDate() - 1);
  while (log[d.toISOString().slice(0, 10)]?.solved) { n += 1; d.setUTCDate(d.getUTCDate() - 1); }
  return n;
}

function Daily() {
  const [d, setD] = useState<DailyData | null>(null);
  const [log, setLog] = useState<Record<string, DailyRec>>({});
  const [explain, setExplain] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = store.get<Record<string, DailyRec>>("cg-daily", {});
    queueMicrotask(() => setLog(saved));
    api("daily").then(setD).catch(() => setD(null));
  }, []);
  if (!d) return null;

  const rec = log[d.date] ?? { solved: false, tries: 0, hints: 0 };
  const save = (r: DailyRec) => { const next = { ...log, [d.date]: r }; setLog(next); store.set("cg-daily", next); };
  const check = async (flag: string) => {
    const r = await api("daily", { flag });
    save({ ...rec, tries: rec.tries + 1, solved: r.ok });
    if (r.ok) setExplain(r.explain);
    return r.ok;
  };
  const streak = streakOf(log, d.date);
  const day = d.date.split("-").reverse().slice(0, 2).join("/");
  const share = async () => {
    const text = `CyberGram · défi du ${day} ✅ ${rec.tries} essai${rec.tries > 1 ? "s" : ""} · ${rec.hints} indice${rec.hints > 1 ? "s" : ""}${streak > 1 ? ` · série de ${streak} jours` : ""}\n${location.origin}/ctf`;
    try { await navigator.clipboard.writeText(text); setCopied(true); } catch { /* presse-papiers refusé */ }
  };

  return (
    <section className="ctf__section" aria-labelledby="daily-title">
      <div className="eyebrow">Défi du jour · {day}</div>
      <h2 id="daily-title" className="h2">Le même pour tout le monde, un nouveau chaque jour.</h2>
      <article className={`ctf__card ctf__card--wide${rec.solved ? " is-done" : ""}`} style={{ marginTop: 28 }}>
        <header className="ctf__head">
          <span className="row__n">{d.level}{streak > 0 ? ` · série : ${streak} jour${streak > 1 ? "s" : ""}` : ""}</span>
          {rec.solved && <span className="ctf__ok">Résolu</span>}
        </header>
        <h3>{d.title}</h3>
        <p className="ctf__brief">{d.brief}</p>
        <pre className="ctf__data" tabIndex={0}><code>{d.data}</code></pre>
        {rec.solved ? (
          <>
            {explain && <p className="ctf__explain">{explain}</p>}
            <div className="btn-row"><button type="button" className="btn btn--ghost" onClick={share}>{copied ? "Résultat copié" : "Partager mon résultat (sans la réponse)"}</button></div>
          </>
        ) : <FlagForm id="daily" onCheck={check} />}
        {d.hints.slice(0, rec.hints).map((h, i) => <p key={i} className="ctf__hint">Indice {i + 1} · {h}</p>)}
        {!rec.solved && rec.hints < d.hints.length && (
          <button type="button" className="ctf__hint-btn" onClick={() => save({ ...rec, hints: rec.hints + 1 })}>Afficher l&apos;indice {rec.hints + 1}</button>
        )}
      </article>
    </section>
  );
}

function Bonus() {
  const [found, setFound] = useState<string[]>([]);
  useEffect(() => {
    const saved = store.get<string[]>("cg-ctf-bonus", []);
    if (saved.length) queueMicrotask(() => setFound(saved));
  }, []);
  const check = async (flag: string) => {
    const h = await sha256(normalizeFlag(flag));
    const b = BONUS.find((x) => x.hash === h);
    if (!b) return false;
    setFound((f) => { const next = f.includes(b.id) ? f : [...f, b.id]; store.set("cg-ctf-bonus", next); return next; });
    return true;
  };
  return (
    <section className="ctf__section" aria-labelledby="bonus-title">
      <div className="eyebrow">Drapeaux cachés</div>
      <h2 id="bonus-title" className="h2">Quatre drapeaux dorment ailleurs sur le site.</h2>
      <Progress done={found.length} total={BONUS.length} label={`${found.length} / ${BONUS.length} trouvés`} />
      <ul className="ctf__clues">
        {BONUS.map((b) => <li key={b.id} className={found.includes(b.id) ? "is-done" : ""}>{found.includes(b.id) ? "✓ " : "· "}{b.clue}</li>)}
      </ul>
      <div style={{ maxWidth: 520 }}><FlagForm id="bonus" onCheck={check} /></div>
    </section>
  );
}

type Row = { pseudo: string; score: number; duration_s: number };

function Leaderboard({ canJoin }: { canJoin: boolean }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [pseudo, setPseudo] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const load = () => api("leaderboard").then((r) => setRows(r.rows)).catch(() => setRows(null));
  useEffect(() => { load(); }, []);

  const join = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try { await api("leaderboard", { pseudo }); setMsg({ ok: true, text: "Vous figurez au classement." }); load(); }
    catch (err) { setMsg({ ok: false, text: err instanceof Error ? err.message : "Erreur." }); }
  };

  if (!rows && !canJoin) return null;
  return (
    <section className="ctf__section" aria-labelledby="lb-title">
      <div className="eyebrow">Classement · facultatif</div>
      <h2 id="lb-title" className="h2">Les plus rapides, sans indice.</h2>
      {rows && rows.length > 0 ? (
        <ol className="ctf__lb">
          {rows.map((r, i) => <li key={i}><span>{String(i + 1).padStart(2, "0")}</span><span>{r.pseudo}</span><span>{r.score} pts</span><span>{fmt(r.duration_s)}</span></li>)}
        </ol>
      ) : <p className="ctf__brief" style={{ marginTop: 20 }}>Personne pour l&apos;instant. La première place est libre.</p>}
      {canJoin && !msg?.ok && (
        <form className="ctf__form" style={{ marginTop: 24, maxWidth: 520 }} onSubmit={join}>
          <label className="sr-only" htmlFor="lb-pseudo">Pseudo</label>
          <input id="lb-pseudo" className="waitlist-form__input" placeholder="Votre pseudo (public)" value={pseudo} maxLength={20} onChange={(e) => setPseudo(e.target.value)} />
          <button className="btn btn--ghost" type="submit">M&apos;inscrire au classement</button>
        </form>
      )}
      {msg && <p className={`waitlist-form__msg${msg.ok ? "" : " waitlist-form__msg--error"}`} role="status">{msg.text}</p>}
      {canJoin && <p className="ctf__note">Seuls le pseudo, le score et la durée sont enregistrés. Aucune adresse e-mail.</p>}
    </section>
  );
}
