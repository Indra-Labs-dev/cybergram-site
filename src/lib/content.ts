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
  { q: "Faut-il déjà s'y connaître en cybersécurité ?", a: "Non. Les parcours commencent au niveau Débutant et le vocabulaire est expliqué ; un glossaire est disponible sur ce site." },
  { q: "Que deviennent les données que je fournis ?", a: "Avant l'ouverture, seule l'adresse e-mail laissée sur la liste d'attente est conservée, pour annoncer le lancement. Un lien de désinscription figure dans chaque message. Le détail est sur la page Confidentialité." },
  { q: "Puis-je utiliser HackPen sur n'importe quelle cible ?", a: "Non. HackPen est réservé aux périmètres que vous êtes autorisé à évaluer, par écrit. Tester un système sans autorisation est illégal dans la plupart des pays." },
] as const;

export type RoadmapStatus = "fait" | "en-cours" | "lancement" | "apres";

export const ROADMAP_STATUS: Record<RoadmapStatus, string> = {
  fait: "Fait",
  "en-cours": "En cours",
  lancement: "Prévu au lancement",
  apres: "Après le lancement",
};

export const ROADMAP: { status: RoadmapStatus; items: { t: string; d: string }[] }[] = [
  { status: "fait", items: [
    { t: "Interfaces conçues", d: "Accueil, Apprendre, Communauté, Événements, Intelligence et HackPen." },
    { t: "Site public", d: "cybergram.dev et la liste d'attente." },
  ] },
  { status: "en-cours", items: [
    { t: "Contenus d'apprentissage", d: "Rédaction des premiers cours et parcours Débutant." },
    { t: "Intégration HackPen", d: "Compte et identité partagés avec la plateforme." },
  ] },
  { status: "lancement", items: [
    { t: "Ouverture de app.cybergram.dev", d: "Création de compte et accès aux modules ouverts." },
    { t: "Annonce par e-mail", d: "Un message unique aux inscrits de la liste d'attente." },
  ] },
  { status: "apres", items: [
    { t: "Catalogue d'outils HackPen", d: "Précisé à l'ouverture, plugin par plugin." },
    { t: "Offres et quotas", d: "Communiqués une fois les usages observés." },
  ] },
];

// Démonstration fictive : le périmètre « demo.example » est réservé (RFC 2606).
export const HACKPEN_DEMO = [
  { n: "01", t: "Projet", cmd: "projet créer « Audit vitrine »", out: "Périmètre : demo.example · autorisation jointe (PDF signé)" },
  { n: "02", t: "Cibles", cmd: "cible ajouter demo.example www.demo.example", out: "2 cibles rattachées au projet" },
  { n: "03", t: "Workflow", cmd: "workflow lancer recon-basique", out: "Résolution DNS → ports courants → en-têtes HTTP" },
  { n: "04", t: "Findings", cmd: "findings lister --tri sévérité", out: "Moyen · en-tête Content-Security-Policy absent" },
  { n: "05", t: "Rapport", cmd: "rapport générer --format pdf", out: "Rapport prêt : contexte, méthode, constats, recommandations" },
] as const;

export const DASHBOARD_HOTSPOTS = [
  { n: "01", x: 12, y: 30, t: "Navigation", d: "Accès aux modules Apprendre, Communauté, Intelligence et HackPen." },
  { n: "02", x: 32, y: 47, t: "Progression", d: "Reprendre un cours là où on l'a laissé et suivre ses parcours." },
  { n: "03", x: 88, y: 26, t: "Agenda et notifications", d: "Événements à venir et activité de la communauté." },
] as const;

export const GLOSSARY = [
  { term: "CVE", def: "Common Vulnerabilities and Exposures : identifiant public unique attribué à une vulnérabilité connue, par exemple CVE-2021-44228." },
  { term: "CVSS", def: "Système de notation de 0 à 10 qui estime la gravité technique d'une vulnérabilité." },
  { term: "IOC", def: "Indicator of Compromise : trace observable d'une compromission (adresse IP, nom de domaine, empreinte de fichier)." },
  { term: "Acteur de la menace", def: "Individu ou groupe à l'origine d'attaques, décrit par ses motivations et ses techniques." },
  { term: "Reconnaissance", def: "Première phase d'un test : recenser ce qui est exposé (domaines, hôtes, services) sur un périmètre autorisé." },
  { term: "Surface d'attaque", def: "Ensemble des points par lesquels un système peut être atteint ou attaqué." },
  { term: "Périmètre", def: "Liste précise des systèmes qu'un test a le droit de viser, fixée par écrit avec leur propriétaire." },
  { term: "Finding", def: "Constat issu d'un test, qualifié par sa sévérité (Critique, Élevé, Moyen, Faible, Info)." },
  { term: "Pentest", def: "Test d'intrusion : évaluation autorisée de la sécurité d'un système en simulant une attaque." },
  { term: "CTF", def: "Capture The Flag : compétition où l'on résout des défis de sécurité pour récupérer des « drapeaux »." },
  { term: "Divulgation responsable", def: "Signaler une vulnérabilité à son propriétaire et lui laisser le temps de la corriger avant toute publication." },
  { term: "MITRE ATT&CK", def: "Référentiel public qui classe les tactiques et techniques observées chez les attaquants." },
] as const;
