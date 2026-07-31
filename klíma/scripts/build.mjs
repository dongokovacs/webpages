// Egyszerű statikus build: src/pages/*.html (front matter + tartalom)
// + src/partials/header.html + footer.html -> dist/*.html
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

function layout({ meta, content, header, footer }) {
  const canonical = `https://www.kovacskornelklima.hu/${meta.slug === "index" ? "" : meta.slug + ".html"}`;
  const ogImage = meta.ogImage || "https://www.kovacskornelklima.hu/assets/og-cover.jpg";
  return `<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${meta.title}</title>
<meta name="description" content="${meta.description}" />
<link rel="canonical" href="${canonical}" />
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

async function build() {
  await mkdir(distDir, { recursive: true });
  await copyIfExists(assetsDir, join(distDir, "assets"));
  await cp(join(srcDir, "style.css"), join(distDir, "style.css"));
  await cp(join(srcDir, "main.js"), join(distDir, "main.js"));
  await cp(join(srcDir, "robots.txt"), join(distDir, "robots.txt"));
  await cp(join(srcDir, "sitemap.xml"), join(distDir, "sitemap.xml"));

  const header = await readFile(join(partialsDir, "header.html"), "utf8");
  const footer = await readFile(join(partialsDir, "footer.html"), "utf8");

  const pageFiles = (await readdir(pagesDir)).filter((f) => f.endsWith(".html"));
  for (const file of pageFiles) {
    const raw = await readFile(join(pagesDir, file), "utf8");
    const { meta, content } = parsePage(raw);
    const html = layout({ meta, content, header, footer });
    const outName = meta.slug === "index" ? "index.html" : `${meta.slug}.html`;
    await writeFile(join(distDir, outName), html, "utf8");
  }

  console.log(`Build kész: ${pageFiles.length} oldal -> ${distDir}`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
