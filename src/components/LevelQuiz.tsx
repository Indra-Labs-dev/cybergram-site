"use client";
import { useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  { q: "Que fait la commande ping ?", a: [["Elle vérifie qu'un hôte répond sur le réseau", 1], ["Elle chiffre une connexion", 0], ["Je ne sais pas", 0]] },
  { q: "HTTPS protège principalement…", a: [["La confidentialité des échanges entre navigateur et serveur", 1], ["Le serveur contre toutes les attaques", 0], ["Je ne sais pas", 0]] },
  { q: "Qu'est-ce qu'une CVE ?", a: [["Un identifiant public de vulnérabilité", 1], ["Un antivirus", 0], ["Je ne sais pas", 0]] },
  { q: "Une injection SQL exploite…", a: [["Une entrée utilisateur insérée telle quelle dans une requête", 2], ["Un mot de passe trop court", 0], ["Je ne sais pas", 0]] },
  { q: "Avez-vous déjà utilisé nmap, Burp Suite ou un outil similaire ?", a: [["Oui, régulièrement", 2], ["Une ou deux fois", 1], ["Jamais", 0]] },
  { q: "Avez-vous déjà rédigé un rapport de test ou d'incident ?", a: [["Oui", 2], ["Non", 0]] },
] as const;

const RESULTS = [
  { min: 0, level: "Débutant", text: "Commencez par les fondamentaux : réseau, web et vocabulaire. Le parcours Débutant d'Apprendre est fait pour vous.", href: "/fonctionnalites#apprendre", cta: "Voir le module Apprendre" },
  { min: 4, level: "Intermédiaire", text: "Les bases sont là. Consolidez avec les parcours Intermédiaires et commencez à suivre les menaces dans Intelligence.", href: "/fonctionnalites#intelligence", cta: "Voir le module Intelligence" },
  { min: 7, level: "Avancé", text: "Vous êtes prêt pour la pratique encadrée : HackPen structure vos missions, du périmètre au rapport.", href: "/hackpen", cta: "Découvrir HackPen" },
];

export function LevelQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const i = answers.length;
  const done = i === QUESTIONS.length;
  const score = answers.reduce((s, x) => s + x, 0);
  const result = [...RESULTS].reverse().find((r) => score >= r.min)!;
  const current = QUESTIONS[i];

  return (
    <div className="quiz">
      <div className="quiz__progress" aria-hidden="true"><span style={{ width: `${(i / QUESTIONS.length) * 100}%` }} /></div>
      {!done && current ? (
        <fieldset className="quiz__q" key={i}>
          <legend><span className="row__n">Question {i + 1} / {QUESTIONS.length}</span><span className="quiz__title">{current.q}</span></legend>
          <div className="quiz__opts">
            {current.a.map(([label, pts]) => (
              <button key={label} type="button" className="quiz__opt" onClick={() => setAnswers((a) => [...a, pts])}>{label}</button>
            ))}
          </div>
        </fieldset>
      ) : (
        <div className="quiz__result" role="status">
          <span className="row__n">Parcours conseillé</span>
          <div className="quiz__level">{result.level}</div>
          <p>{result.text}</p>
          <div className="btn-row" style={{ marginTop: 24 }}>
            <Link href={result.href} className="btn btn--primary">{result.cta} →</Link>
            <button type="button" className="btn btn--ghost" onClick={() => setAnswers([])}>Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}
