import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";

// Load .env.local if present
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && existsSync(".env.local")) {
  const content = readFileSync(".env.local", "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/);
    if (match && match[1]) {
      databaseUrl = match[1];
      break;
    }
  }
}

if (!databaseUrl) {
  console.error("❌ ERROR: DATABASE_URL is not set in environment or .env.local");
  process.exit(1);
}

console.log("Connecting to Neon Postgres via serverless driver...");

async function testConnection() {
  try {
    const sql = neon(databaseUrl);
    
    // 1. Basic query
    const res = await sql`SELECT NOW() as current_time, current_database() as db_name, version() as pg_version`;
    console.log("✅ Neon query success:", {
      current_time: res[0]?.current_time,
      db_name: res[0]?.db_name,
      pg_version: String(res[0]?.pg_version).slice(0, 45) + "...",
    });

    // 2. Test DDL / Table creation (schema test)
    await sql`
      CREATE TABLE IF NOT EXISTS _neon_health_check (
        id SERIAL PRIMARY KEY,
        checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        service VARCHAR(50) NOT NULL
      )
    `;

    // 3. Test Insert & Select
    await sql`INSERT INTO _neon_health_check (service) VALUES ('neon-postgres-test')`;
    const rows = await sql`SELECT * FROM _neon_health_check ORDER BY id DESC LIMIT 1`;
    console.log("✅ Neon write/read verification passed:", rows[0]);

    console.log("\n🎉 All Neon Postgres tests PASSED successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Neon connection test failed:", error);
    process.exit(1);
  }
}

testConnection();
