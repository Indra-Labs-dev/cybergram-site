import { neon } from "@neondatabase/serverless";
import { SITE } from "@/lib/site";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DATABASE_URL: string;
  BREVO_API_KEY?: string;
  EMAIL_FROM?: string;
  EMAIL_FROM_NAME?: string;
  WAITLIST_ADMIN_TOKEN?: string;
}

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/unsubscribe" && (request.method === "GET" || request.method === "POST")) {
      const token = url.searchParams.get("token") || "";
      if (!/^[0-9a-f-]{36}$/i.test(token)) return new Response("Lien de désinscription invalide.", { status: 400 });
      if (request.method === "GET") {
        return new Response(`<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Désinscription CyberGram</title><main><h1>Se désinscrire</h1><p>Confirmez le retrait de votre adresse de la liste de lancement CyberGram.</p><form method="post" action="/api/unsubscribe?token=${token}"><button type="submit">Confirmer ma désinscription</button></form></main></html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
      }
      try {
        const sql = neon(env.DATABASE_URL);
        const rows = await sql`UPDATE launch_waitlist SET unsubscribed_at = COALESCE(unsubscribed_at, NOW()) WHERE unsubscribe_token = ${token} RETURNING id`;
        return new Response(rows.length ? "Votre adresse a été désinscrite." : "Ce lien a déjà été utilisé ou n'est plus valide.", { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
      } catch {
        return new Response("Désinscription temporairement indisponible. Réessayez plus tard.", { status: 503 });
      }
    }

    if (url.pathname === "/api/notify-launch") {
      if (request.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
      if (!env.WAITLIST_ADMIN_TOKEN || request.headers.get("Authorization") !== `Bearer ${env.WAITLIST_ADMIN_TOKEN}`) {
        return json({ error: "Requête refusée." }, 401);
      }
      if (!SITE.appOpen) return json({ error: "Activez SITE.appOpen après l'ouverture de la plateforme." }, 409);
      if (!env.BREVO_API_KEY || !env.EMAIL_FROM) return json({ error: "Le service d'e-mail n'est pas configuré." }, 503);
      try {
        const sql = neon(env.DATABASE_URL);
        const subscribers = await sql`SELECT id, email, unsubscribe_token FROM launch_waitlist WHERE unsubscribed_at IS NULL AND notified_at IS NULL ORDER BY id LIMIT 50`;
        let sent = 0;
        let failed = 0;
        for (const subscriber of subscribers) {
          const claimed = await sql`UPDATE launch_waitlist SET notification_claimed_at = NOW() WHERE id = ${subscriber.id} AND notified_at IS NULL AND (notification_claimed_at IS NULL OR notification_claimed_at < NOW() - INTERVAL '15 minutes') RETURNING id`;
          if (!claimed.length) continue;
          const unsubscribeUrl = `${SITE.url}/api/unsubscribe?token=${encodeURIComponent(String(subscriber.unsubscribe_token))}`;
          const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({
              sender: { email: env.EMAIL_FROM, name: env.EMAIL_FROM_NAME || SITE.name },
              to: [{ email: subscriber.email }],
              subject: "CyberGram est ouvert !",
              htmlContent: `<p>CyberGram est maintenant ouvert.</p><p><a href="${SITE.appUrl}">Accéder à CyberGram</a></p><p><a href="${unsubscribeUrl}">Se désinscrire</a> de cette liste.</p>`,
              textContent: `CyberGram est maintenant ouvert. Accéder à CyberGram : ${SITE.appUrl}\n\nSe désinscrire de cette liste : ${unsubscribeUrl}`,
            }),
          });
          if (response.ok) {
            await sql`UPDATE launch_waitlist SET notified_at = NOW(), notification_claimed_at = NULL WHERE id = ${subscriber.id} AND notified_at IS NULL`;
            sent += 1;
          } else {
            await sql`UPDATE launch_waitlist SET notification_claimed_at = NULL WHERE id = ${subscriber.id} AND notified_at IS NULL`;
            failed += 1;
          }
        }
        return json({ selected: subscribers.length, sent, failed, remaining: subscribers.length === 50 });
      } catch {
        console.error("Launch notification batch failed");
        return json({ error: "Envoi temporairement indisponible." }, 503);
      }
    }

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
