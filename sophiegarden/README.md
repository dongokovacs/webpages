# Sophie's Garden – static build

This site is **generated**. Don't hand-edit anything in `dist/` — the next
build silently overwrites it. Edit the files under `src/` instead.

## Layout

```
src/
  pages/       page-unique content (one file per page: index.html, kinalet.html, ...)
  partials/    shared pieces: layout.html (the <head>/<body> shell), nav.html,
               mobile-menu.html, footer.html, sd-banner.html, feat-popover.html,
               icons/ (small reused SVG icons)
  data/
    business.json   name, address, email, phone, social links — the one place
                     to update if any of that changes
    pages.json       per-page config: which nav link is active, whether to show
                      the feat-popover slot (index only), footer variant
    page-meta.json    per-page <title>/description/keywords/OG text
  build.js       the build script (zero npm dependencies)
dist/            generated output — six .html files + copied static assets.
                  This is what actually gets deployed.
style.css, main.js, logo.png, steellogo.png, robots.txt, sitemap.xml,
fb-posts.json    hand-edited directly (unchanged by templating), copied
                 into dist/ as-is by build.js
```

## Building

```
npm run build
```

No `npm install` needed — there are no dependencies. Output goes to `dist/`.
Open `dist/index.html` directly in a browser to preview (all asset paths are
relative and resolve fine from `dist/`), or run `npx serve dist` for a local
server if you want clean navigation between pages.

CI runs the same `npm run build` in `.github/workflows/pages.yml` and copies
`sophiegarden/dist/` into the deployed site — same pattern as the
`bube-viragbolt` and `steeldecor-story` projects elsewhere in this repo.

## Template syntax

Three constructs, handled by a ~100-line hand-rolled engine in `build.js`
(no Handlebars/EJS — the site doesn't need more than this):

- `{{a.b.c}}` — value lookup, e.g. `{{biz.email}}` or `{{page.title}}`.
  Throws a build error if the path doesn't exist, so a typo fails loudly
  instead of shipping a literal `{{...}}` to production.
- `{{> partials/name}}` — includes `partials/name.html`, rendered with the
  same variables. Partials can include other partials (e.g. `nav.html`
  includes `icons/icon-theme-toggle.html`).
- `{{#if flag}}...{{/if}}` — keeps the block only if `flag` is truthy in the
  current variables. That's the only control flow available — no loops, no
  `{{else}}`. The two places that need it: `showFeatSlot` (the ✦ feature
  popover only shows on the homepage) and the footer's third column
  (`isDefaultFooterThird` / `isPartnersFooterThird` — the együttműködések
  page shows "Együttműködők" instead of "Gyors linkek").

## Adding a new page

1. Add an entry to `src/data/pages.json` (`activeNav`, `showFeatSlot: false`,
   `showSdBanner: true`, `footerThirdColumn: "default"`, `file: "new.html"`).
2. Add matching SEO fields to `src/data/page-meta.json`.
3. Create `src/pages/new.html` using four markers, in any order:
   `<!--SCHEMA-->` (the page's `<script type="application/ld+json">` block),
   `<!--STYLE-->` (the page's own `<style>` block, if it needs one),
   `<!--MAIN-->` (the `<main id="main">...</main>` content),
   `<!--SCRIPT-->` (an optional extra `<script>` block, e.g. a page-specific
   stagger animation).
4. Run `npm run build` and check `dist/new.html`.

## Editing business info (address, email, phone, social links)

Change it once in `src/data/business.json` — every partial and every page's
schema block pulls from there. Before this refactor these were hardcoded in
15-20+ places across the six pages; a wrong or stale value (like the old
`sophiesgarden.maglod@gmail.com` vs. the real `sophiesgardenmaglod@gmail.com`)
could silently drift between pages. Now there's exactly one source of truth.
