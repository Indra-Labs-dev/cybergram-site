export const SITE = {
  name: "CyberGram",
  url: "https://cybergram.dev",
  appUrl: "https://app.cybergram.dev",
  tagline: "Apprendre. Échanger. Explorer.",
  description:
    "CyberGram réunit l'apprentissage, la communauté, la veille sur les menaces et HackPen, un environnement de reconnaissance et d'investigation, dans un même écosystème de cybersécurité.",
  // Aucun canal de contact vérifié n'a été fourni. Renseigner avant publication.
  contactEmail: null as string | null,
  appOpen: false,
} as const;

export const NAV = [
  { href: "/ecosysteme", label: "Écosystème" },
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/hackpen", label: "HackPen" },
  { href: "/a-propos", label: "À propos" },
] as const;

export const LEGAL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
] as const;
