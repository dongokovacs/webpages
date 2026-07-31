// Egyszerű statikus build: src/pages/*.html (front matter + tartalom)
// + src/partials/header.html + footer.html -> dist/*.html
//
// Konfiguráció: minden éles adat (telefon, email, cím, közösségi linkek, képek)
// a project gyökerében lévő site.config.json-ból jön, és {{TOKEN}} formában
// helyettesítődik be minden legenerált fájlba. Ha valós adat érkezik, csak
// a site.config.json-t kell módosítani, nem kell a HTML-ekben keresgélni.
//
// Környezet-érzékenység: a Vercel automatikusan beállítja a VERCEL_ENV
// változót ("production" | "preview" | "development"). Amíg ez nem
// "production", az oldal noindex meta taget kap és a robots.txt mindent tilt,
// hogy a preview domain (pl. klima-kappa.vercel.app) ne kerülhessen indexelésre.
import { mkdir, readFile, writeFile, cp, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const srcDir = join(rootDir, "src");
const distDir = join(rootDir, "dist");
const pagesDir = join(srcDir, "pages");
const partialsDir = join(srcDir, "partials");
const assetsDir = join(srcDir, "assets");

const VERCEL_ENV = process.env.VERCEL_ENV || "development";
const isProduction = VERCEL_ENV === "production";
const previewUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

async function copyIfExists(src, dest) {
  if (existsSync(src)) await cp(src, dest, { recursive: true });
}

function parsePage(raw) {
  const match = raw.match(/^<!--PAGE\s*([\s\S]*?)-->\s*([\s\S]*)$/);
  if (!match) throw new Error("Hiányzó <!--PAGE ... --> front matter blokk.");
  const meta = JSON.parse(match[1]);
  const content = match[2].trim();
  return { meta, content };
}

function buildTokens(config, siteUrl) {
  const mapsQuery = encodeURIComponent(config.maps.query);
  return {
    SITE_URL: siteUrl,
    SITE_NAME: config.siteName,
    PHONE_TEL: config.phone.tel,
    PHONE_DISPLAY: config.phone.display,
    EMAIL: config.email,
    ADDRESS_STREET: config.address.street,
    ADDRESS_CITY: config.address.city,
    ADDRESS_POSTAL: config.address.postalCode,
    ADDRESS_REGION: config.address.region,
    ADDRESS_COUNTRY: config.address.country,
    ADDRESS_FULL: `${config.address.city}, ${config.address.street}, ${config.address.postalCode}`,
    HOURS_WEEKDAY: config.hours.weekday,
    HOURS_SATURDAY: config.hours.saturday,
    FACEBOOK_URL: config.social.facebook,
    INSTAGRAM_URL: config.social.instagram,
    MAPS_EMBED_URL: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
    FORMSPREE_ACTION: `https://formspree.io/f/${config.formspreeFormId}`,
    IMG_OG_COVER: config.images.ogCover,
    IMG_HERO: config.images.hero,
    IMG_TRUST: config.images.trust,
    IMG_AREA: config.images.area,
    IMG_TELEPITES: config.images.telepites,
    IMG_TISZTITAS: config.images.tisztitas,
    IMG_KARBANTARTAS: config.images.karbantartas,
    ROBOTS_META: isProduction ? "" : '<meta name="robots" content="noindex, nofollow" />',
  };
}

function applyTokens(html, tokens) {
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (!(key in tokens)) throw new Error(`Ismeretlen token a sablonban: {{${key}}}`);
    return tokens[key];
  });
}

function layout({ meta, content, header, footer, siteUrl }) {
  const canonical = `${siteUrl}/${meta.slug === "index" ? "" : meta.slug + ".html"}`;
  const ogImage = meta.ogImage || "{{IMG_OG_COVER}}";
  return `<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${meta.title}</title>
<meta name="description" content="${meta.description}" />
<link rel="canonical" href="${canonical}" />
{{ROBOTS_META}}
<meta name="theme-color" content="#0e8f7c" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${meta.title}" />
<meta property="og:description" content="${meta.description}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:locale" content="hu_HU" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./style.css" />
</head>
<body>
${header}
<main>
${content}
</main>
${footer}
<script src="./main.js"></script>
</body>
</html>
`;
}

function buildRobotsTxt(siteUrl) {
  if (!isProduction) {
    return "User-agent: *\nDisallow: /\n";
  }
  return `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

async function build() {
  const config = JSON.parse(await readFile(join(rootDir, "site.config.json"), "utf8"));
  const siteUrl = isProduction ? config.productionUrl : previewUrl;
  const tokens = buildTokens(config, siteUrl);

  console.log(`Build környezet: ${VERCEL_ENV} (production: ${isProduction}) -> ${siteUrl}`);

  await mkdir(distDir, { recursive: true });
  await copyIfExists(assetsDir, join(distDir, "assets"));
  await cp(join(srcDir, "style.css"), join(distDir, "style.css"));
  await cp(join(srcDir, "main.js"), join(distDir, "main.js"));

  await writeFile(join(distDir, "robots.txt"), buildRobotsTxt(siteUrl), "utf8");
  const sitemapRaw = await readFile(join(srcDir, "sitemap.xml"), "utf8");
  await writeFile(join(distDir, "sitemap.xml"), applyTokens(sitemapRaw, tokens), "utf8");

  const header = await readFile(join(partialsDir, "header.html"), "utf8");
  const footer = await readFile(join(partialsDir, "footer.html"), "utf8");

  const pageFiles = (await readdir(pagesDir)).filter((f) => f.endsWith(".html"));
  for (const file of pageFiles) {
    const raw = await readFile(join(pagesDir, file), "utf8");
    const { meta, content } = parsePage(raw);
    const html = layout({ meta, content, header, footer, siteUrl });
    const finalHtml = applyTokens(html, tokens);
    const outName = meta.slug === "index" ? "index.html" : `${meta.slug}.html`;
    await writeFile(join(distDir, outName), finalHtml, "utf8");
  }

  console.log(`Build kész: ${pageFiles.length} oldal -> ${distDir}`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
