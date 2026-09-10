# Nanogas Hőtechnika — projekt útmutató

Statikus marketing weboldal (Siófok, fűtés/klíma szerviz). Vanilla HTML/CSS/JS,
framework nélkül, saját mini build rendszerrel. Lásd [BRIEF.md](BRIEF.md),
[PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md) a tartalmi/vizuális
követelményekhez.

## Build modell — ezt fontos megérteni, mielőtt bármit módosítasz

- A forrás `src/pages/*.html` — mindegyik egy `<!--PAGE {json front matter}-->`
  blokkal kezdődik, utána jön a `<main>`-be kerülő tartalom.
- `src/partials/header.html` és `footer.html` minden oldalba bekerül.
- `scripts/build.mjs` fűzi össze ezeket és írja ki `dist/`-be. **A `dist/` generált
  — soha ne szerkeszd kézzel, a `.gitignore` is kizárja.**
- Az éles adatok (telefon, email, cím, képek, közösségi linkek) egyetlen helyen,
  a `site.config.json`-ban vannak. A HTML-ekben `{{TOKEN}}` formában hivatkoznak
  rájuk — a build helyettesíti be. Ha valós adat változik, `site.config.json`-t
  szerkeszd, ne a HTML-t.
- `VERCEL_ENV` vezérli, hogy production build-e (indexelhető) vagy preview
  (noindex + robots tiltás) — ezt Vercel állítja be automatikusan.

## Parancsok

- `npm run build` — legenerálja `dist/`-et
- `npm run dev` — build + statikus szerver a `dist/`-en (`localhost:4173`)
- `npm test` — Playwright smoke tesztek (a `playwright.config.ts` maga buildel
  és szolgál ki, nem kell külön szerver)
- `npm run typecheck` — `tsc --noEmit` a `tests/` és `playwright.config.ts` fölött
  (a `src/` és `scripts/` plain JS, ezeket lint fedi le, nem tsc)
- `npm run lint` / `lint:fix` — ESLint
- `npm run format` / `format:check` — Prettier
- `npm run check` — typecheck + lint + format:check egyben (ezt fuss le, mielőtt
  kész munkát jelentesz)

CI (`../.github/workflows/nanogas-playwright.yml`) `tsc --noEmit` + Playwright
tesztet futtat minden `nanogas/**`-t érintő PR-en/push-on.

## Konvenciók

- Magyar nyelvű tartalom és kommentek a meglévő fájlokban — ezt kövesd.
- Új aloldalhoz: hozz létre egy `src/pages/*.html`-t a front matter mintával,
  vedd fel `site.config.json`/`src/sitemap.xml`-be ha kell, majd `npm run build`.
- Ne adj hozzá build eszközt (bundler, keretrendszer) — a projekt szándékosan
  vanilla és framework nélküli marad.
- Teszt minta: `tests/pages/HomePage.ts` egy page-object, `tests/fixtures/`
  alatt vannak az adatgenerátorok — kövesd ezt a szerkezetet új teszteknél.
