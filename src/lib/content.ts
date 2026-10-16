export type Status = "interface" | "preparation";

export const PILLARS = [
  { n: "01", verb: "Apprendre.", accent: "teal", text: "Des cours, tutoriels et articles pour progresser à son rythme.", modules: ["Apprendre", "Blog"] },
  { n: "02", verb: "Échanger.", accent: "teal", text: "Une communauté pour discuter, collaborer et se retrouver lors d'événements.", modules: ["Communauté", "Événements"] },
  { n: "03", verb: "Explorer.", accent: "amber", text: "Suivre les menaces, puis les étudier en pratique dans un cadre autorisé.", modules: ["Intelligence", "HackPen"] },
] as const;

export const MODULES = [
  { id: "apprendre", label: "Apprendre", title: "Cours et parcours", img: "/images/learn.png", alt: "Capture du module Apprendre de CyberGram",
    text: "Un catalogue de cours, tutoriels et parcours organisés par niveau, du débutant à l'avancé.",
    points: ["Cours structurés en leçons", "Niveaux Débutant, Intermédiaire, Avancé", "Contenus gratuits et contenus Pro", "Articles et tutoriels du blog"] },
  { id: "communaute", label: "Communauté", title: "Discussions et projets", img: "/images/community.png", alt: "Capture du module Communauté de CyberGram",
    text: "Un espace pour poser des questions, partager des retours de lab et collaborer sur des projets communautaires.",
    points: ["Discussions thématiques", "Projets communautaires", "Profils membres"] },
  { id: "evenements", label: "Événements", title: "Agenda de la communauté", img: "/images/events.png", alt: "Capture du module Événements de CyberGram",
    text: "Conférences, meetups, CTF et formations rassemblés dans un agenda.",
    points: ["Conférences et meetups", "CTF", "Formations"] },
  { id: "intelligence", label: "Intelligence", title: "Veille sur les menaces", img: "/images/intelligence.png", alt: "Capture du module Intelligence de CyberGram",
    text: "Une vue d'ensemble des vulnérabilités, acteurs et tendances, pour apprendre à lire l'actualité des menaces.",
    points: ["CVE et vulnérabilités", "Menaces et acteurs", "IOC et observables", "Rapports et analyses"] },
] as const;

export const HACKPEN_STEPS = [
  { n: "01", t: "Projets", d: "Regrouper un périmètre de test et ses cibles." },
  { n: "02", t: "Cibles", d: "Déclarer les domaines, hôtes ou plages autorisés." },
  { n: "03", t: "Workflows", d: "Enchaîner reconnaissance et scans." },
  { n: "04", t: "Findings", d: "Qualifier les résultats par sévérité." },
  { n: "05", t: "Rapports", d: "Restituer le travail réalisé." },
] as const;

export const AUDIENCES = [
  { t: "Apprenants", d: "Étudiants et personnes en reconversion qui veulent des bases solides et un parcours structuré." },
  { t: "Professionnels", d: "Analystes et pentesteurs qui suivent les menaces et organisent leurs missions de test." },
  { t: "Communauté", d: "Passionnés qui partagent leurs connaissances, projets et retours d'expérience." },
] as const;

export const FAQ = [
  { q: "Qu'est-ce que CyberGram ?", a: "Une plateforme de cybersécurité qui réunit apprentissage, communauté, veille sur les menaces et un environnement de pratique, HackPen." },
  { q: "Quand l'application sera-t-elle disponible ?", a: "La date d'ouverture prévue est affichée sur la page Lancement. Elle sera mise à jour si le calendrier change." },
  { q: "Puis-je m'inscrire dès maintenant ?", a: "Oui. Inscrivez-vous sur la page Lancement pour recevoir un e-mail lorsque l'application ouvrira." },
  { q: "Quelle est la différence entre CyberGram et HackPen ?", a: "CyberGram est la plateforme principale : apprentissage, communauté, intelligence. HackPen est l'environnement de pratique intégré, dédié à la reconnaissance et à l'investigation." },
  { q: "Quels seront les tarifs ?", a: "Les modalités d'accès et les éventuelles offres seront communiquées au lancement." },
] as const;
