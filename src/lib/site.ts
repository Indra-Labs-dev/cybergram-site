export const SITE = {
  name: "CyberGram",
  url: "https://cybergram.dev",
  appUrl: "https://app.cybergram.dev",
  tagline: "Apprendre. Échanger. Explorer.",
  description:
    "CyberGram réunit l'apprentissage, la communauté, la veille sur les menaces et HackPen, un environnement de reconnaissance et d'investigation, dans un même écosystème de cybersécurité.",
  contactEmail: "contact@cybergram.dev",
  appOpen: false,
  launchDate: "2026-10-31T23:59:00Z",
} as const;

export const launchDateLabel = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Abidjan",
}).format(new Date(SITE.launchDate));

export const NAV = [
  { href: "/ecosysteme", label: "Écosystème" },
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/hackpen", label: "HackPen" },
  { href: "/ctf", label: "Mini-CTF" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
] as const;
