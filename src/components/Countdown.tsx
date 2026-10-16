"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReady: boolean;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isReady: false };
}

export function Countdown({ targetDate = SITE.launchDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const tick = () => setTimeLeft(calculateTimeLeft(targetDate));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Jours", value: String(timeLeft.days).padStart(2, "0") },
    { label: "Heures", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "Secondes", value: String(timeLeft.seconds).padStart(2, "0") },
  ];

  if (SITE.appOpen) {
    return (
      <div className="countdown-ready" role="status">
        <span className="dot dot--ready" />
        <span>CyberGram est ouvert sur <a href={SITE.appUrl}><strong>{SITE.appUrl}</strong></a>.</span>
      </div>
    );
  }

  if (timeLeft.isReady) {
    return (
      <div className="countdown-ready" role="status">
        <span className="dot dot--ready" />
        <span>{SITE.appOpen ? <>CyberGram est ouvert sur <strong>{SITE.appUrl}</strong>.</> : "La date d'ouverture prévue est passée. Consultez cette page pour connaître la nouvelle date."}</span>
      </div>
    );
  }

  return (
    <div
      className="countdown"
      role="timer"
      aria-label={`Compte à rebours avant le lancement : ${timeLeft.days} jours, ${timeLeft.hours} heures, ${timeLeft.minutes} minutes et ${timeLeft.seconds} secondes`}
    >
      {units.map((unit) => (
        <div key={unit.label} className="countdown__item">
          <span className="countdown__val" key={unit.value}>
            {unit.value}
          </span>
          <span className="countdown__lbl">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
