"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setStatus("loading");

    try {
      const website = new FormData(e.currentTarget).get("website");
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Inscription impossible.");

      setStatus("success");
      setMessage(result.priority
        ? "Merci ! Votre mini-CTF terminé vous place en tête de l'envoi le jour du lancement."
        : "Merci ! Votre inscription est enregistrée. Vous serez prévenu(e) en priorité le jour du lancement.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer ultérieurement.");
    }
  };

  if (status === "success") {
    return (
      <div className="waitlist-success" role="status">
        <span className="dot dot--ready" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="waitlist-form__trap" />
      <div className="waitlist-form__row">
        <input
          type="email"
          className="waitlist-form__input"
          placeholder="votre.email@domaine.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-label="Adresse e-mail pour être notifié du lancement"
          required
        />
        <button
          type="submit"
          className="btn btn--primary waitlist-form__submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Inscription..." : "M'avertir du lancement →"}
        </button>
      </div>
      {status === "error" && (
        <p className="waitlist-form__msg waitlist-form__msg--error" role="alert">
          {message}
        </p>
      )}
      <p className="waitlist-form__note">
        🔒 Aucun spam. Un seul e-mail vous sera envoyé le jour de l&apos;ouverture officielle.
      </p>
    </form>
  );
}
