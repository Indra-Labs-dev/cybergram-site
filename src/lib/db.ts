import { neon } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }
  return url;
}

/**
 * Neon serverless SQL query helper.
 * Uses HTTP transport via @neondatabase/serverless, ideal for Edge, Serverless, and Node.js.
 */
export const sql = neon(getDatabaseUrl());

/**
 * Health check / verification helper for Neon Postgres
 */
export async function checkDatabaseHealth(): Promise<{ ok: boolean; now: string; version: string; error?: string }> {
  try {
    const result = await sql`SELECT NOW() as now, version() as version`;
    const row = result[0];
    return {
      ok: true,
      now: row?.now ? String(row.now) : "",
      version: row?.version ? String(row.version) : "",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      now: "",
      version: "",
      error: message,
    };
  }
}
