"use client";
import { useEffect, useRef, useState } from "react";

// Terminal scénarisé : aucune commande n'est exécutée, les réponses sont écrites à l'avance.
// Le périmètre autorisé se limite à demo.example (domaine réservé, RFC 2606).

type Line = { kind: "in" | "out" | "ok" | "err" | "dim"; text: string };
type State = { project: string | null; targets: string[]; scanned: boolean; findings: boolean; report: boolean };

const SCOPE = /^([a-z0-9-]+\.)*demo\.example$/;
const STEPS = ["Projet", "Cibles", "Workflow", "Findings", "Rapport"];
const INITIAL: State = { project: null, targets: [], scanned: false, findings: false, report: false };

const HELP: Line[] = [
  { kind: "dim", text: "Commandes disponibles :" },
  { kind: "out", text: "  projet créer <nom>          ouvrir un projet" },
  { kind: "out", text: "  cible ajouter <domaine>     déclarer une cible (périmètre : *.demo.example)" },
  { kind: "out", text: "  workflow lancer             reconnaissance de base" },
  { kind: "out", text: "  findings lister             résultats par sévérité" },
  { kind: "out", text: "  rapport générer             restitution finale" },
  { kind: "out", text: "  effacer · aide" },
];

const SUGGEST = ["projet créer audit", "cible ajouter demo.example", "workflow lancer", "findings lister", "rapport générer"];

export function HackPenTerminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "dim", text: "HackPen · bac à sable de démonstration. Tapez « aide » ou suivez les suggestions." }]);
  const [st, setSt] = useState<State>(INITIAL);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const screen = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { screen.current?.scrollTo({ top: screen.current.scrollHeight }); }, [lines]);

  const step = st.report ? 5 : st.findings ? 4 : st.scanned ? 3 : st.targets.length ? 2 : st.project ? 1 : 0;
  const push = (...l: Line[]) => setLines((x) => [...x, ...l]);

  const stream = (out: Line[], done: () => void) => {
    setBusy(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    out.forEach((l, i) => timers.current.push(window.setTimeout(() => push(l), reduce ? 0 : 380 * (i + 1))));
    timers.current.push(window.setTimeout(() => { setBusy(false); done(); }, reduce ? 0 : 380 * (out.length + 1)));
  };

  const run = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, " ");
    if (!cmd) return;
    push({ kind: "in", text: cmd });
    setHistory((h) => [cmd, ...h].slice(0, 20));
    setHIdx(-1);
    const [a, b, ...rest] = cmd.toLowerCase().split(" ");
    const arg = rest.join(" ");

    if (a === "aide" || a === "help") return push(...HELP);
    if (a === "effacer" || a === "clear") { setLines([]); return; }
    if (a === "reset") { setSt(INITIAL); return push({ kind: "dim", text: "Bac à sable réinitialisé." }); }

    if (a === "projet" && b === "créer") {
      const name = arg || "audit";
      setSt({ ...INITIAL, project: name });
      return push({ kind: "ok", text: `✓ Projet « ${name} » créé.` }, { kind: "dim", text: "  Rappel : une autorisation écrite du propriétaire est jointe au projet." });
    }
    if (a === "cible" && b === "ajouter") {
      if (!st.project) return push({ kind: "err", text: "✗ Créez d'abord un projet : projet créer <nom>" });
      if (!arg) return push({ kind: "err", text: "✗ Précisez un domaine : cible ajouter demo.example" });
      if (!SCOPE.test(arg)) return push({ kind: "err", text: `✗ Refusé : ${arg} est hors du périmètre autorisé (*.demo.example).` }, { kind: "dim", text: "  Tester un système sans autorisation est illégal. HackPen bloque toute cible non déclarée." });
      setSt((s) => ({ ...s, targets: s.targets.includes(arg) ? s.targets : [...s.targets, arg] }));
      return push({ kind: "ok", text: `✓ Cible ${arg} ajoutée au projet.` });
    }
    if (a === "workflow" && b === "lancer") {
      if (!st.targets.length) return push({ kind: "err", text: "✗ Aucune cible : cible ajouter demo.example" });
      const t = st.targets[0];
      return stream([
        { kind: "dim", text: `→ résolution DNS ${t}` },
        { kind: "out", text: `  ${t}  A  192.0.2.80` },
        { kind: "dim", text: "→ ports courants" },
        { kind: "out", text: "  443/tcp ouvert  https" },
        { kind: "out", text: "  80/tcp  ouvert  http → redirige vers https" },
        { kind: "dim", text: "→ en-têtes HTTP" },
        { kind: "out", text: "  strict-transport-security ✓   x-frame-options ✓   content-security-policy ✗" },
        { kind: "ok", text: "✓ Workflow terminé : 1 constat à qualifier." },
      ], () => setSt((s) => ({ ...s, scanned: true })));
    }
    if (a === "findings" && b === "lister") {
      if (!st.scanned) return push({ kind: "err", text: "✗ Rien à lister : workflow lancer" });
      setSt((s) => ({ ...s, findings: true }));
      return push(
        { kind: "out", text: "  SÉVÉRITÉ  CONSTAT" },
        { kind: "err", text: "  Moyen     En-tête Content-Security-Policy absent" },
        { kind: "out", text: "  Info      Redirection HTTP → HTTPS en place" },
      );
    }
    if (a === "rapport" && b === "générer") {
      if (!st.findings) return push({ kind: "err", text: "✗ Qualifiez d'abord les résultats : findings lister" });
      return stream([
        { kind: "dim", text: "→ contexte et périmètre" },
        { kind: "dim", text: "→ méthode" },
        { kind: "dim", text: "→ constats et recommandations" },
        { kind: "ok", text: `✓ Rapport « ${st.project} » prêt. Mission complète.` },
      ], () => setSt((s) => ({ ...s, report: true })));
    }
    push({ kind: "err", text: `Commande inconnue : ${cmd}. Tapez « aide ».` });
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) { e.preventDefault(); const i = Math.min(hIdx + 1, history.length - 1); setHIdx(i); setValue(history[i] ?? ""); }
    if (e.key === "ArrowDown") { e.preventDefault(); const i = hIdx - 1; setHIdx(i); setValue(i >= 0 ? history[i] ?? "" : ""); }
    if (e.key === "Tab" && value === "" && step < 5) { e.preventDefault(); setValue(SUGGEST[step] ?? ""); }
  };

  const next = step < 5 ? SUGGEST[step] : null;

  return (
    <div className="hpt">
      <div className="shot__bar"><span>hackpen · bac à sable</span><span>Démonstration fictive</span></div>
      <ol className="hpt__steps" aria-label="Progression de la mission">
        {STEPS.map((s, i) => <li key={s} className={i < step ? "is-done" : i === step ? "is-current" : ""}>{String(i + 1).padStart(2, "0")} {s}</li>)}
      </ol>
      <div className="hpt__screen" ref={screen} role="log" aria-live="polite" onClick={() => document.getElementById("hpt-input")?.focus()}>
        {lines.map((l, i) => <div key={i} className={`hpt__l hpt__l--${l.kind}`}>{l.kind === "in" && <span className="hpt__ps">$ </span>}{l.text}</div>)}
      </div>
      <form className="hpt__form" onSubmit={(e) => { e.preventDefault(); if (!busy) { run(value); setValue(""); } }}>
        <label htmlFor="hpt-input" className="hpt__ps">$</label>
        <input id="hpt-input" className="hpt__input" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey}
          autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder={next ? `${next}   (Tab pour compléter)` : "aide · reset"} aria-label="Commande HackPen" disabled={busy} />
      </form>
      {next && <div className="hpt__suggest"><button type="button" className="chip" onClick={() => !busy && run(next)} disabled={busy}>Suggestion : {next}</button></div>}
    </div>
  );
}
