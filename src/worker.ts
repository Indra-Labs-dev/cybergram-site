import { neon } from "@neondatabase/serverless";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DATABASE_URL: string;
}

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/waitlist") return env.ASSETS.fetch(request);
    if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
    if (request.headers.get("Origin") !== url.origin) return json({ error: "Requête refusée." }, 403);
    const length = Number(request.headers.get("content-length") || 0);
    if (length > 4096) return json({ error: "Requête trop volumineuse." }, 413);
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return json({ error: "Format de requête invalide." }, 415);
    }

    let payload: { email?: unknown; website?: unknown };
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Requête invalide." }, 400);
    }

    // Honeypot field for simple bot submissions.
    if (typeof payload.website === "string" && payload.website.trim()) return json({ ok: true });
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Veuillez saisir une adresse e-mail valide." }, 400);
    }

    try {
      const sql = neon(env.DATABASE_URL);
      await sql`INSERT INTO launch_waitlist (email) VALUES (${email}) ON CONFLICT (email) DO NOTHING`;
      return json({ ok: true });
    } catch {
      console.error("Waitlist insert failed");
      return json({ error: "Inscription temporairement indisponible. Veuillez réessayer." }, 503);
    }
  },
};
