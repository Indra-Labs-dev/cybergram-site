import { neon } from "@neondatabase/serverless";
import { generateDaily, generateSet, hmacHex, normalizeFlag, POINTS, HINT_COST, type Generated } from "@/lib/ctf-engine";

// API du mini-CTF. La progression tient dans un cookie signé (HMAC) : pas de compte,
// pas de base de données sauf pour le classement, auquel on participe volontairement.

export interface CtfEnv {
  CTF_SECRET?: string;
  DATABASE_URL: string;
}

type State = { s: string; t: number; h: Record<string, number>; v: Record<string, number> };

const COOKIE = "cg_ctf";
const MAX_AGE = 60 * 60 * 24 * 60;

const json = (body: object, status = 200, cookie?: string) => {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(JSON.stringify(body), { status, headers });
};

const b64u = (s: string) => btoa(s).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const unb64u = (s: string) => atob(s.replace(/-/g, "+").replace(/_/g, "/"));

async function sign(secret: string, st: State) {
  const body = b64u(JSON.stringify(st));
  return `${body}.${(await hmacHex(secret, `cookie:${body}`)).slice(0, 32)}`;
}

/** Lit l'état du joueur depuis le cookie ; null si absent ou falsifié. */
export async function readState(request: Request, secret: string): Promise<State | null> {
  const raw = request.headers.get("Cookie")?.match(/(?:^|;\s*)cg_ctf=([^;]+)/)?.[1];
  if (!raw) return null;
  const [body, sig] = raw.split(".");
  if (!body || !sig || (await hmacHex(secret, `cookie:${body}`)).slice(0, 32) !== sig) return null;
  try {
    const st = JSON.parse(unb64u(body)) as State;
    return /^[0-9a-f]{32}$/.test(st.s) ? st : null;
  } catch {
    return null;
  }
}

const fresh = (): State => ({ s: [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join(""), t: Date.now(), h: {}, v: {} });
const setCookie = async (secret: string, st: State) => `${COOKIE}=${await sign(secret, st)}; Path=/api; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;

const earned = (c: Generated, hints: number) => Math.round(POINTS[c.level] * (1 - HINT_COST * hints));

export async function summary(st: State, secret: string) {
  const set = await generateSet(st.s, secret);
  const score = set.reduce((n, c) => n + (st.v[c.id] ? earned(c, st.h[c.id] ?? 0) : 0), 0);
  const max = set.reduce((n, c) => n + POINTS[c.level], 0);
  const finished = set.every((c) => st.v[c.id]);
  const end = finished ? Math.max(...set.map((c) => st.v[c.id] ?? 0)) : null;
  return { set, score, max, finished, duration: end ? Math.round((end - st.t) / 1000) : null };
}

async function view(st: State, secret: string) {
  const { set, score, max, finished, duration } = await summary(st, secret);
  return {
    challenges: set.map((c, i) => {
      const used = st.h[c.id] ?? 0;
      const solved = Boolean(st.v[c.id]);
      return {
        id: c.id, n: String(i + 1).padStart(2, "0"), title: c.title, level: c.level, brief: c.brief, data: c.data,
        points: POINTS[c.level], earned: solved ? earned(c, used) : null,
        hints: c.hints.slice(0, used), hintsLeft: c.hints.length - used,
        solved, explain: solved ? c.explain : null,
      };
    }),
    score, max, finished, duration, startedAt: st.t,
  };
}

const today = () => new Date().toISOString().slice(0, 10);

async function body(request: Request): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get("content-length") || 0) > 2048) return null;
  try { return await request.json(); } catch { return null; }
}

export async function handleCtf(request: Request, env: CtfEnv, url: URL): Promise<Response> {
  const secret = env.CTF_SECRET;
  if (!secret) return json({ error: "Le CTF n'est pas configuré." }, 503);
  const path = url.pathname.slice("/api/ctf".length);
  if (request.method === "POST" && request.headers.get("Origin") !== url.origin) return json({ error: "Requête refusée." }, 403);

  // Défi du jour : identique pour tous, sans état côté serveur.
  if (path === "/daily") {
    const date = today();
    const c = await generateDaily(date, secret);
    if (request.method === "GET") {
      return json({ date, title: c.title, level: c.level, brief: c.brief, data: c.data, hints: c.hints });
    }
    if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
    const p = await body(request);
    const ok = typeof p?.flag === "string" && normalizeFlag(p.flag) === normalizeFlag(c.answer);
    return json(ok ? { ok, date, explain: c.explain } : { ok, date });
  }

  if (path === "/leaderboard" && request.method === "GET") {
    try {
      const rows = await neon(env.DATABASE_URL)`SELECT pseudo, score, duration_s FROM ctf_leaderboard ORDER BY score DESC, duration_s ASC, created_at ASC LIMIT 20`;
      return json({ rows });
    } catch {
      return json({ error: "Classement indisponible." }, 503);
    }
  }

  let st = await readState(request, secret);
  if (path === "/session" && request.method === "GET") {
    const created = !st;
    st ??= fresh();
    return json(await view(st, secret), 200, created ? await setCookie(secret, st) : undefined);
  }
  if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);

  if (path === "/reset") {
    st = fresh();
    return json(await view(st, secret), 200, await setCookie(secret, st));
  }
  if (!st) return json({ error: "Session expirée. Rechargez la page." }, 401);

  const p = await body(request);
  if (!p) return json({ error: "Requête invalide." }, 400);
  const set = await generateSet(st.s, secret);
  const c = set.find((x) => x.id === p.id);

  if (path === "/hint") {
    if (!c) return json({ error: "Défi inconnu." }, 404);
    if (!st.v[c.id]) st.h[c.id] = Math.min((st.h[c.id] ?? 0) + 1, c.hints.length);
    return json(await view(st, secret), 200, await setCookie(secret, st));
  }

  if (path === "/submit") {
    if (!c) return json({ error: "Défi inconnu." }, 404);
    if (st.v[c.id]) return json({ ok: true, ...(await view(st, secret)) });
    const ok = typeof p.flag === "string" && p.flag.length < 200 && normalizeFlag(p.flag) === normalizeFlag(c.answer);
    if (!ok) return json({ ok: false });
    st.v[c.id] = Date.now();
    return json({ ok: true, ...(await view(st, secret)) }, 200, await setCookie(secret, st));
  }

  if (path === "/leaderboard") {
    const pseudo = typeof p.pseudo === "string" ? p.pseudo.trim() : "";
    if (!/^[\p{L}\p{N}_ .-]{2,20}$/u.test(pseudo)) return json({ error: "Pseudo de 2 à 20 caractères : lettres, chiffres, espace, point, tiret." }, 400);
    const s = await summary(st, secret);
    if (!s.finished) return json({ error: "Terminez d'abord tous les défis." }, 409);
    try {
      const rows = await neon(env.DATABASE_URL)`INSERT INTO ctf_leaderboard (seed, pseudo, score, duration_s) VALUES (${st.s}, ${pseudo}, ${s.score}, ${s.duration}) ON CONFLICT (seed) DO NOTHING RETURNING seed`;
      return rows.length ? json({ ok: true }) : json({ error: "Cette partie figure déjà au classement." }, 409);
    } catch {
      return json({ error: "Classement indisponible." }, 503);
    }
  }

  return json({ error: "Introuvable." }, 404);
}

/** Vrai si la requête porte une partie terminée (utilisé par la liste d'attente). */
export async function hasFinished(request: Request, env: CtfEnv) {
  if (!env.CTF_SECRET) return false;
  const st = await readState(request, env.CTF_SECRET);
  return st ? (await summary(st, env.CTF_SECRET)).finished : false;
}
