// Défis du mini-CTF. Seule l'empreinte SHA-256 du drapeau (en minuscules) est livrée :
// le drapeau n'apparaît jamais en clair dans le code. Données fictives : plages
// d'adresses réservées à la documentation (RFC 5737) et domaine demo.example.

export type Challenge = {
  id: string;
  n: string;
  title: string;
  level: string;
  brief: string;
  data: string;
  hint: string;
  hash: string;
  explain: string;
};

export const CHALLENGES: Challenge[] = [
  {
    id: "encodage",
    n: "01",
    title: "Un en-tête qui en dit trop",
    level: "Débutant",
    brief: "Une application ajoute cet en-tête à ses réponses. Son contenu a l'air illisible. L'est-il vraiment ?",
    data: "X-Debug-Token: Q0d7YmFzZTY0X25lc3RfcGFzX3VuX2NoaWZmcmVtZW50fQ==",
    hint: "Les deux « = » finaux sont typiques d'un encodage très courant. Essayez de le décoder (atob() dans la console du navigateur).",
    hash: "3445fad755da806ddff060f460f922d4a564e7f96129ec6873c49fb857d6a0f4",
    explain: "Base64 est un encodage, pas un chiffrement : n'importe qui peut le décoder. Ne jamais y cacher un secret.",
  },
  {
    id: "journal",
    n: "02",
    title: "Qui a forcé la porte ?",
    level: "Débutant",
    brief: "Extrait du journal d'authentification d'un serveur. Une adresse a multiplié les échecs avant de réussir. Le drapeau est CG{adresse_ip}.",
    data: [
      "09:12:01 auth failed  user=admin  src=198.51.100.7",
      "09:12:03 auth ok      user=marie  src=192.0.2.15",
      "09:12:04 auth failed  user=admin  src=203.0.113.42",
      "09:12:04 auth failed  user=root   src=203.0.113.42",
      "09:12:05 auth failed  user=admin  src=203.0.113.42",
      "09:12:05 auth failed  user=test   src=203.0.113.42",
      "09:12:06 auth failed  user=admin  src=203.0.113.42",
      "09:12:09 auth ok      user=paul   src=192.0.2.31",
      "09:12:11 auth ok      user=admin  src=203.0.113.42",
      "09:12:14 auth failed  user=admin  src=198.51.100.7",
    ].join("\n"),
    hint: "Comptez les échecs par adresse source, puis cherchez laquelle finit par un « auth ok ».",
    hash: "b5115f57791f884d1d53c37fb42293e04da3a97a742ab81a4ad170380f92a4e6",
    explain: "Une rafale d'échecs suivie d'un succès depuis la même source signe une attaque par force brute réussie. Cette adresse devient un IOC.",
  },
  {
    id: "entetes",
    n: "03",
    title: "L'en-tête manquant",
    level: "Intermédiaire",
    brief: "Réponse HTTP de demo.example. Un en-tête de sécurité important, qui limite les sources de scripts autorisées, est absent. Le drapeau est CG{nom-de-l-en-tete}.",
    data: [
      "HTTP/2 200",
      "content-type: text/html; charset=utf-8",
      "strict-transport-security: max-age=31536000",
      "x-content-type-options: nosniff",
      "x-frame-options: DENY",
      "referrer-policy: strict-origin-when-cross-origin",
    ].join("\n"),
    hint: "Cet en-tête est la principale défense en profondeur contre le XSS. Son sigle fait trois lettres.",
    hash: "d602ce3e8999625c61b718fc873c3975f941e8e3e9437466ad2899ffb52c7773",
    explain: "Sans Content-Security-Policy, un script injecté s'exécute librement. C'est le finding « Moyen » de la démo HackPen.",
  },
];

export async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const normalizeFlag = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");
