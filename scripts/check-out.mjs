// Vérifie le build statique : routes attendues, liens internes, ancres vides, secrets, métadonnées.
import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const OUT = "out";
const ROUTES = ["index.html", "ecosysteme.html", "fonctionnalites.html", "hackpen.html", "a-propos.html", "lancement.html", "mentions-legales.html", "confidentialite.html", "404.html", "sitemap.xml", "robots.txt"];
const errors = [];
const exists = async (p) => stat(p).then(() => true, () => false);

async function walk(d) {
  const out = [];
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) out.push(...(await walk(p))); else out.push(p);
  }
  return out;
}

for (const r of ROUTES) if (!(await exists(join(OUT, r)))) errors.push("Route manquante : " + r);

const files = await walk(OUT);
const html = files.filter((f) => extname(f) === ".html");
const secretRe = /(sk_live_|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY|api[_-]?key\s*[:=]\s*["'][^"']{12,})/i;

for (const f of files.filter((f) => /\.(html|js|txt|xml)$/.test(f))) {
  if (secretRe.test(await readFile(f, "utf8"))) errors.push("Motif de secret détecté : " + f);
}

for (const f of html) {
  const src = await readFile(f, "utf8");
  if (!f.endsWith("404.html")) {
    if (!/<title>[^<]+<\/title>/.test(src)) errors.push("Titre manquant : " + f);
    if (!/<meta name="description"/.test(src) && !/noindex/.test(src)) errors.push("Description manquante : " + f);
  }
  if (/href="#"/.test(src)) errors.push("Lien # vide : " + f);
  for (const [, href] of src.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith("/_next") ) continue;
    const clean = href.replace(/\/$/, "") || "/index";
    const candidates = [join(OUT, clean + ".html"), join(OUT, clean), join(OUT, clean, "index.html")];
    let ok = false;
    for (const c of candidates) if (await exists(c)) { ok = true; break; }
    if (!ok) errors.push(`Lien cassé ${href} dans ${f}`);
  }
}

if (errors.length) { console.error(errors.join("\n")); console.error(`\n${errors.length} erreur(s).`); process.exit(1); }
console.log(`OK — ${ROUTES.length} routes, ${html.length} pages HTML vérifiées.`);
