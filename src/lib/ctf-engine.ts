// Moteur du mini-CTF, exécuté uniquement par le Worker : chaque joueur reçoit une graine,
// la graine fixe le tirage des défis et leurs données, et le drapeau attendu en dépend.
// Rien ici n'est livré au navigateur, les réponses ne quittent donc jamais le serveur.
// Données fictives : plages RFC 5737 et domaine réservé demo.example.

export type Level = "Débutant" | "Intermédiaire" | "Avancé";

export type Generated = {
  id: string;
  title: string;
  level: Level;
  brief: string;
  data: string;
  hints: [string, string];
  answer: string;
  explain: string;
};

type Rng = { int(n: number): number; pick<T>(a: readonly T[]): T; shuffle<T>(a: T[]): T[] };
type Ctx = { rng: Rng; tag: string };
type Template = { id: string; level: Level; make(c: Ctx): Promise<Generated> | Generated };

export const POINTS: Record<Level, number> = { "Débutant": 100, "Intermédiaire": 200, "Avancé": 300 };
export const HINT_COST = 0.25;

const enc = new TextEncoder();
const hex = (buf: ArrayBuffer | Uint8Array) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");

export async function hmacHex(secret: string, msg: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
}

// mulberry32 : générateur déterministe à partir des 32 premiers bits de la graine.
function rngFrom(seedHex: string): Rng {
  let a = parseInt(seedHex.slice(0, 8), 16) >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (n: number) => Math.floor(next() * n);
  return {
    int,
    pick: (arr) => arr[int(arr.length)]!,
    shuffle: (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = int(i + 1); [arr[i], arr[j]] = [arr[j]!, arr[i]!]; } return arr; },
  };
}

const NETS = ["192.0.2", "198.51.100", "203.0.113"];
const USERS = ["marie", "paul", "lea", "karim", "ines", "hugo", "nora", "theo", "sarah", "yanis"];
const WORDS = ["pare-feu", "sentinelle", "bastion", "vigie", "rempart", "phare", "boussole", "lanterne"];
const pad = (n: number) => String(n).padStart(2, "0");

function ips(r: Rng, n: number) {
  const set = new Set<string>();
  while (set.size < n) set.add(`${r.pick(NETS)}.${2 + r.int(250)}`);
  return [...set];
}
function clock(r: Rng) {
  let s = 9 * 3600 + r.int(8) * 3600 + r.int(3600);
  return () => { s += 1 + r.int(4); return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`; };
}
const b64 = (s: string) => btoa(String.fromCharCode(...enc.encode(s)));
const b64url = (s: string) => b64(s).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

const TEMPLATES: Template[] = [
  {
    id: "encodage", level: "Débutant",
    make: ({ rng, tag }) => {
      const flag = `CG{base64_n_est_pas_un_chiffrement_${tag}}`;
      const header = rng.pick(["X-Debug-Token", "X-Internal-Trace", "X-Session-Hint", "X-Build-Info"]);
      return {
        id: "encodage", level: "Débutant", title: "Un en-tête qui en dit trop",
        brief: "Une application ajoute cet en-tête à ses réponses. Son contenu a l'air illisible. L'est-il vraiment ?",
        data: `${header}: ${b64(flag)}`,
        hints: ["Le « = » final est typique d'un encodage très courant sur le web.", "Décodez-le avec atob(\"…\") dans la console du navigateur."],
        answer: flag,
        explain: "Base64 est un encodage, pas un chiffrement : n'importe qui peut le décoder. Ne jamais y cacher un secret.",
      };
    },
  },
  {
    id: "journal", level: "Débutant",
    make: ({ rng }) => {
      const [bad, noisy, ...good] = ips(rng, 5);
      const t = clock(rng);
      const lines: string[] = [];
      for (let i = 0; i < 5 + rng.int(3); i++) lines.push(`auth failed  user=${rng.pick(["admin", "root", "test", "admin"])}  src=${bad}`);
      lines.push(`auth failed  user=admin  src=${noisy}`, `auth failed  user=admin  src=${noisy}`);
      for (const g of good) lines.push(`auth ok      user=${rng.pick(USERS)}  src=${g}`);
      rng.shuffle(lines);
      lines.splice(lines.length - 1 - rng.int(3), 0, `auth ok      user=admin  src=${bad}`);
      return {
        id: "journal", level: "Débutant", title: "Qui a forcé la porte ?",
        brief: "Extrait du journal d'authentification d'un serveur. Une adresse a multiplié les échecs avant de réussir. Le drapeau est CG{adresse_ip}.",
        data: lines.map((l) => `${t()} ${l}`).join("\n"),
        hints: ["Comptez les échecs par adresse source.", "Une seule adresse a beaucoup échoué puis obtenu un « auth ok »."],
        answer: `CG{${bad}}`,
        explain: "Une rafale d'échecs suivie d'un succès depuis la même source signe une attaque par force brute réussie. Cette adresse devient un IOC.",
      };
    },
  },
  {
    id: "cesar", level: "Débutant",
    make: ({ rng, tag }) => {
      const k = 3 + rng.int(20);
      const word = rng.pick(WORDS).replace("-", "_");
      const plain = `bravo, le drapeau est CG{${word}_${tag}}`;
      const shift = (s: string) => s.replace(/[a-z]/gi, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26) + base);
      });
      return {
        id: "cesar", level: "Débutant", title: "Un message d'un autre âge",
        brief: "Ce message a été intercepté sur un forum. Chaque lettre a été décalée du même nombre de rangs dans l'alphabet. Les chiffres, eux, n'ont pas bougé.",
        data: shift(plain),
        hints: ["Le drapeau commence toujours par « CG{ ». Quel décalage transforme le début du texte chiffré en « CG » ?", `Le décalage vaut ${k}. Reculez chaque lettre d'autant.`],
        answer: `CG{${word}_${tag}}`,
        explain: "Le chiffre de César n'a que 25 clés possibles : on le casse à la main. Un vrai chiffrement repose sur une clé impossible à deviner.",
      };
    },
  },
  {
    id: "robots", level: "Débutant",
    make: ({ rng, tag }) => {
      const secret = `${rng.pick(["backup", "sauvegarde", "old", "dump"])}-${tag}`;
      const paths = rng.shuffle(["/admin/", "/panier/", "/recherche", "/compte/", `/${secret}/`]);
      return {
        id: "robots", level: "Débutant", title: "Le panneau « défense d'entrer »",
        brief: "Voici le robots.txt de demo.example. L'administrateur a voulu cacher un répertoire de sauvegarde aux moteurs de recherche. Le drapeau est CG{nom-du-repertoire}, sans les barres obliques.",
        data: ["User-agent: *", ...paths.map((p) => `Disallow: ${p}`), "", "Sitemap: https://demo.example/sitemap.xml"].join("\n"),
        hints: ["robots.txt est public : tout le monde peut le lire, attaquants compris.", "Cherchez le chemin qui n'a rien à faire sur un site marchand."],
        answer: `CG{${secret}}`,
        explain: "robots.txt n'est pas une protection : il signale justement les chemins sensibles. Une sauvegarde doit être hors du dossier web, pas cachée.",
      };
    },
  },
  {
    id: "entetes", level: "Intermédiaire",
    make: ({ rng }) => {
      const all = [
        ["content-security-policy", "default-src 'self'", "limite les sources de scripts autorisées"],
        ["strict-transport-security", "max-age=31536000", "oblige le navigateur à n'utiliser que HTTPS"],
        ["x-frame-options", "DENY", "empêche d'afficher la page dans un cadre (clickjacking)"],
        ["x-content-type-options", "nosniff", "interdit au navigateur de deviner le type des fichiers"],
      ] as const;
      const miss = rng.pick(all);
      const present = rng.shuffle(all.filter((h) => h !== miss).map(([n, v]) => `${n}: ${v}`));
      return {
        id: "entetes", level: "Intermédiaire", title: "L'en-tête manquant",
        brief: `Réponse HTTP de demo.example. Un en-tête de sécurité qui ${miss[2]} est absent. Le drapeau est CG{nom-de-l-en-tete}, en minuscules.`,
        data: ["HTTP/2 200", "content-type: text/html; charset=utf-8", ...present, "referrer-policy: strict-origin-when-cross-origin"].join("\n"),
        hints: ["Listez les en-têtes de sécurité classiques et cochez ceux qui sont présents.", "Le nom à donner est exactement celui de l'en-tête, avec ses tirets."],
        answer: `CG{${miss[0]}}`,
        explain: "Chaque en-tête de sécurité ferme une famille d'attaques. Un audit HackPen les vérifie tous dès la reconnaissance.",
      };
    },
  },
  {
    id: "cookies", level: "Intermédiaire",
    make: ({ rng }) => {
      const names = rng.shuffle(["session_id", "sid", "auth", "jeton", "cg_sess", "uid"]).slice(0, 3);
      const weak = names[rng.int(3)];
      return {
        id: "cookies", level: "Intermédiaire", title: "Le biscuit trop bavard",
        brief: "Une application pose ces cookies. L'un d'eux porte la session de l'utilisateur et reste lisible par JavaScript : un XSS suffirait à le voler. Le drapeau est CG{nom_du_cookie}.",
        data: [
          ...names.map((n) => n === weak
            ? `Set-Cookie: ${n}=${rng.int(1e9).toString(36)}${rng.int(1e9).toString(36)}; Path=/; Secure; SameSite=Lax`
            : `Set-Cookie: ${n}=${rng.int(1e9).toString(36)}${rng.int(1e9).toString(36)}; Path=/; Secure; HttpOnly; SameSite=Strict`),
          "Set-Cookie: theme=sombre; Path=/; Max-Age=31536000",
        ].join("\n"),
        hints: ["Le cookie « theme » ne contient rien de sensible, ignorez-le.", "Cherchez l'attribut qui interdit l'accès via document.cookie."],
        answer: `CG{${weak}}`,
        explain: "Sans HttpOnly, un script injecté lit document.cookie et envoie la session à l'attaquant. Tout cookie d'authentification doit le porter.",
      };
    },
  },
  {
    id: "jwt", level: "Intermédiaire",
    make: ({ rng }) => {
      const users = rng.shuffle([...USERS]).slice(0, 3);
      const forger = users[rng.int(3)];
      const tok = (u: string) => {
        const none = u === forger;
        const head = b64url(JSON.stringify({ alg: none ? "none" : "HS256", typ: "JWT" }));
        const body = b64url(JSON.stringify({ sub: u, role: none ? "admin" : "lecteur", iat: 1790000000 + rng.int(1e6) }));
        const sig = none ? "" : b64url(String(rng.int(1e9)) + String(rng.int(1e9))).slice(0, 22);
        return `${head}.${body}.${sig}`;
      };
      return {
        id: "jwt", level: "Intermédiaire", title: "Le jeton sans signature",
        brief: "Trois jetons JWT relevés dans les journaux d'une API. L'un a été forgé : il s'attribue des droits d'administrateur sans aucune signature. Le drapeau est CG{utilisateur}.",
        data: users.map((u, i) => `#${i + 1} ${tok(u)}`).join("\n"),
        hints: ["Un JWT, c'est trois blocs Base64url séparés par des points : en-tête, contenu, signature.", "Décodez l'en-tête de chaque jeton et regardez le champ « alg »."],
        answer: `CG{${forger}}`,
        explain: "Accepter alg « none », c'est accepter n'importe quel jeton. Le serveur doit imposer l'algorithme attendu et toujours vérifier la signature.",
      };
    },
  },
  {
    id: "sqli", level: "Intermédiaire",
    make: ({ rng }) => {
      const [bad, ...others] = ips(rng, 5);
      const t = clock(rng);
      const lines = others.flatMap((ip) => [
        `${ip} "GET /produit?id=${1 + rng.int(300)} HTTP/1.1" 200`,
        `${ip} "GET /recherche?q=${rng.pick(["casque", "clavier", "souris", "ecran"])} HTTP/1.1" 200`,
      ]);
      lines.push(`${bad} "GET /produit?id=${1 + rng.int(300)} HTTP/1.1" 200`);
      rng.shuffle(lines);
      lines.splice(2 + rng.int(lines.length - 3), 0, `${bad} "GET /produit?id=4%27%20OR%20%271%27%3D%271 HTTP/1.1" 500`);
      return {
        id: "sqli", level: "Intermédiaire", title: "Une requête de trop",
        brief: "Journal d'accès d'une boutique. Quelqu'un a tenté une injection SQL, mais la requête est encodée pour passer inaperçue. Le drapeau est CG{adresse_ip}.",
        data: lines.map((l) => `${t()} ${l}`).join("\n"),
        hints: ["%27 est l'encodage URL d'un caractère qui ferme une chaîne en SQL.", "Décodez avec decodeURIComponent(\"…\") la seule ligne qui a provoqué une erreur 500."],
        answer: `CG{${bad}}`,
        explain: "' OR '1'='1 rend une condition toujours vraie. Les requêtes paramétrées empêchent l'entrée utilisateur d'être lue comme du SQL.",
      };
    },
  },
  {
    id: "scan", level: "Intermédiaire",
    make: ({ rng }) => {
      const [scanner, ...others] = ips(rng, 4);
      const t = clock(rng);
      const lines: string[] = [];
      for (const ip of others) for (let i = 0; i < 3; i++) lines.push(`ACCEPT src=${ip} dpt=${rng.pick([443, 443, 80])}`);
      for (const p of rng.shuffle([21, 22, 23, 25, 110, 139, 445, 3306, 3389, 8080])) lines.push(`DROP   src=${scanner} dpt=${p}`);
      return {
        id: "scan", level: "Intermédiaire", title: "Toc toc, qui est là ?",
        brief: "Journal du pare-feu d'un serveur web. Une source a frappé à beaucoup de portes différentes en quelques secondes. Le drapeau est CG{adresse_ip}.",
        data: rng.shuffle(lines).map((l) => `${t()} ${l}`).join("\n"),
        hints: ["Un visiteur normal parle au port 443 (HTTPS), parfois 80.", "Comptez le nombre de ports de destination différents par source."],
        answer: `CG{${scanner}}`,
        explain: "Un balayage de ports précède souvent une attaque : il cartographie les services exposés. On le détecte au nombre de ports distincts par source.",
      };
    },
  },
  {
    id: "empreinte", level: "Avancé",
    make: async ({ rng }) => {
      const dict = rng.shuffle(["soleil2024", "azerty123", "motdepasse", "chaton!", "marseille13", "dragon", "loulou", "bonjour1", "123456789", "printemps"]);
      const pass = rng.pick(dict);
      const digest = hex(await crypto.subtle.digest("SHA-1", enc.encode(pass)));
      return {
        id: "empreinte", level: "Avancé", title: "Une empreinte sans sel",
        brief: "Fuite d'une base d'utilisateurs : les mots de passe sont stockés en SHA-1, sans sel. Retrouvez celui de l'administrateur parmi ce petit dictionnaire. Le drapeau est CG{mot_de_passe}.",
        data: [`admin:${digest}`, "", "dictionnaire :", ...dict.map((d) => `  ${d}`)].join("\n"),
        hints: ["Il suffit de calculer l'empreinte SHA-1 de chaque mot et de comparer.", "Dans la console : crypto.subtle.digest(\"SHA-1\", new TextEncoder().encode(\"mot\")), puis convertir en hexadécimal."],
        answer: `CG{${pass}}`,
        explain: "Une empreinte rapide et sans sel tombe en quelques secondes face à un dictionnaire. On stocke les mots de passe avec Argon2 ou bcrypt, salés.",
      };
    },
  },
  {
    id: "xor", level: "Avancé",
    make: ({ rng, tag }) => {
      const key = 1 + rng.int(254);
      const flag = `CG{xor_a_une_cle_${tag}}`;
      const bytes = Array.from(enc.encode(flag), (b) => (b ^ key).toString(16).padStart(2, "0"));
      return {
        id: "xor", level: "Avancé", title: "Un octet pour tout cacher",
        brief: "Ce message a été chiffré par un XOR avec une clé d'un seul octet, répétée sur toute la longueur. Vous connaissez le début du clair : « CG{ ».",
        data: bytes.join(" "),
        hints: ["XOR est réversible : clair XOR clé = chiffré, donc chiffré XOR clair = clé.", `Le premier octet vaut 0x${bytes[0]} et le clair commence par « C » (0x43). Calculez la clé, puis appliquez-la à tous les octets.`],
        answer: flag,
        explain: "Une clé XOR courte se retrouve dès qu'on connaît un morceau du clair. C'est l'attaque à clair connu.",
      };
    },
  },
  {
    id: "exfil", level: "Avancé",
    make: ({ rng, tag }) => {
      const flag = `CG{dns_exfiltration_${tag}}`;
      const h = hex(enc.encode(flag));
      const chunks = h.match(/.{1,16}/g) ?? [];
      const t = clock(rng);
      const ip = ips(rng, 1)[0];
      const lines = chunks.map((c, i) => `query A ${i}-${c}.cdn-stats.demo.example from ${ip}`);
      for (let i = 0; i < 6; i++) lines.push(`query A ${rng.pick(["www", "api", "mail", "static"])}.demo.example from ${ips(rng, 1)[0]}`);
      return {
        id: "exfil", level: "Avancé", title: "Des fuites dans les DNS",
        brief: "Journal DNS d'un poste compromis. Un logiciel malveillant fait sortir des données en les cachant dans des noms de domaine. Reconstituez-les.",
        data: rng.shuffle(lines).map((l) => `${t()} ${l}`).join("\n"),
        hints: ["Isolez les requêtes vers le même domaine suspect et classez-les par leur numéro.", "Mis bout à bout, les morceaux sont de l'hexadécimal : deux caractères par octet."],
        answer: flag,
        explain: "Le DNS sort presque toujours d'un réseau, ce qui en fait un canal discret. Des sous-domaines longs et aléatoires vers un même domaine doivent alerter.",
      };
    },
  },
];

const BY_LEVEL = (l: Level) => TEMPLATES.filter((t) => t.level === l);

/** Tirage personnel : 2 débutants, 2 intermédiaires, 1 avancé. */
export async function generateSet(seed: string, secret: string) {
  const rng = rngFrom(seed);
  const tag = (await hmacHex(secret, `tag:${seed}`)).slice(0, 8);
  const picks = [
    ...rng.shuffle(BY_LEVEL("Débutant")).slice(0, 2),
    ...rng.shuffle(BY_LEVEL("Intermédiaire")).slice(0, 2),
    ...rng.shuffle(BY_LEVEL("Avancé")).slice(0, 1),
  ];
  const out: Generated[] = [];
  for (const t of picks) out.push(await t.make({ rng: rngFrom(await hmacHex(secret, `${seed}:${t.id}`)), tag }));
  return out;
}

/** Défi du jour : même tirage pour tout le monde à une date donnée (UTC). */
export async function generateDaily(date: string, secret: string) {
  const seed = await hmacHex(secret, `daily:${date}`);
  const rng = rngFrom(seed);
  const t = rng.pick(TEMPLATES);
  return t.make({ rng: rngFrom(seed.slice(8)), tag: seed.slice(16, 24) });
}

export const normalizeFlag = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");
