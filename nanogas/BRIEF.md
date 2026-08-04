# Projekt brief: Kovács Kornél Klímaszerelő weboldal + SEO


---

## Szerepkör

Te egy elit full-stack fejlesztő és SEO szövegíró csapat vagy egyben: **UX/UI tervező** (2026-os modern, letisztult trendekkel dolgozol), **frontend fejlesztő** (vanilla HTML/CSS/JS, framework nélkül), és **prémium klímaszerelő szolgáltatásokra szakosodott SEO stratéga és konverziós szövegíró**.

## Ügyfél és üzleti kontextus

- **Ügyfél:** Kovács Kornél, egyéni vállalkozó klímaszerelő
- **Székhely / szolgáltatási terület:** Siófok és környéke — Balatonszárszó, Zamárdi, Balatonföldvár, Balatonlelle, Szántód, Kőröshegy, Ságvár, Balatonőszöd
- **Szolgáltatások:** klíma telepítés, klíma tisztítás, klíma karbantartás
- **Cél:** helyi lead-generálás (hívás / időpontfoglalás), Google keresésekben (helyi SEO) jó pozíció, bizalomépítés, egyszerű online időpontfoglalás
- **Cross-promóció:** a testvér-vállalkozás, a **steeldecor.hu** (lézervágott fém dekorációk, egyedi sport éremtartók, fém falidekor, házszámtáblák gyártója, magyar családi vállalkozás) számára egy önálló, jól látható ajánló szekciót kell elhelyezni a főoldalon, közvetlenül a lábléc előtt. A steeldecor.hu NEM a weboldal fejlesztője — ez egy kereskedelmi cross-promóció két kapcsolódó vállalkozás között. A szekció ötlete: "Frissen felszerelt klíma mellé egyedi, lézervágott házszámtábla vagy fém falidekor a steeldecor.hu-tól" — CTA gombbal a steeldecor.hu-ra.

## Tech stack (kötelező)

- Vanilla HTML/CSS/JS, framework nélkül (nincs React/Vue/Next)
- Templated static build minta: `src/pages/*.html` forrás → build script → `dist/` kimenet (ugyanaz a minta, mint egy másik sajátos projektünkben: `main.js` + `style.css` közös, oldalanként HTML template)
- Mobile-first, statikus hosting-kompatibilis (működjön Netlify, GitHub Pages, vagy egyszerű FTP/webtárhely alatt is)
- Gyors betöltés: optimalizált/lazy-load képek, minimális JS payload
- Sticky header telefonszámmal és "Időpontfoglalás" CTA gombbal, mindig egy kattintásra

## Oldaltérkép

### Főoldal (`index.html`)
1. **Hero** — nagy, magabiztos headline, alcím, elsődleges CTA ("Foglalj időpontot"), másodlagos CTA (telefonhívás)
2. **Szolgáltatások** — 3 kártya bento-grid elrendezésben: Klíma telepítés / Klíma tisztítás / Klíma karbantartás, mindegyik linkkel a saját aloldalára
3. **Miért engem válassz** — garancia, gyors kiszállás, helyismeret (Siófok és környéke), tapasztalat
4. **Szolgáltatási terület** — települések listája, esetleg egyszerű térkép-illusztráció
5. **Referenciák / vélemények** — placeholder testimonial kártyák (a valós tartalmat az ügyfél pótolja később)
6. **Időpontfoglaló szekció** — beágyazott foglaló widget (ld. lent), saját brand-keretben
7. **GYIK** — 5-6 gyakori kérdés (ár, mennyi idő alatt, milyen márkák, garancia, mikor érdemes tisztíttatni)
8. **steeldecor.hu partner-banner** — lásd fent, vizuálisan elkülönítve (pl. eltérő háttérszín/keret), egyértelműen külső ajánlóként jelölve
9. **Kapcsolat + footer** — telefonszám, email, NAP adatok (Name/Address/Phone — placeholder), nyitvatartás, közösségi linkek, schema markup

### Aloldalak (SEO célból, saját meta title/description-nel)
- `/klima-telepites-siofok.html`
- `/klima-tisztitas-siofok.html`
- `/klima-karbantartas-siofok.html`

Mindegyik: egyedi hero, 500-800 szavas konverzió-orientált szöveg (probléma → megoldás → bizalomépítés → CTA), helyi kulcsszavak, saját CTA az időpontfoglalóhoz.

## UX/UI irányelvek (2026-os modern, letisztult trend)

- **Tipográfia:** nagy, magabiztos, editorial jellegű headline-ok; jó kontraszt; ne 6+ soros bekezdésekbe tördelt szöveg
- **Színvilág:** 1 accent szín (javaslat: hűvös, friss kék vagy menta-türkiz, ami a klíma/frissesség hangulatát idézi) + semleges alap (fehér/light grey, opcionális sötét mód)
- **Layout:** bőséges whitespace, bento-grid a szolgáltatás-kártyáknál, aszimmetrikus, nem sablonos szekció-elrendezés
- **Mikroanimációk:** finom scroll-reveal, hover state-ek, semmi túlzsúfolt vagy figyelemelterelő
- **Vizuál:** natív, visszafogott glassmorphism a kártyákon (nem túlzsúfolt), nagy, éles fotók/illusztrációk klímaberendezésekről és szerelési munkáról
- **Ne** legyen generikus AI-sablon érzés: kerüld a klasszikus "3 oszlopos ikon + bekezdés" sablont változatlan formában, keress egyedi kompozíciót

## Időpontfoglaló specifikáció

- Külső, ingyenes beágyazható foglaló szolgáltatás (javaslat: **Cal.com** embed) — nincs saját backend/adatbázis
- A widget köré saját brand-stílusú keret/szekció kerüljön, hogy illeszkedjen a design nyelvhez
- Fallback, ha a widget API kulcs még nincs kitöltve: telefonszám + egyszerű kapcsolatfelvételi űrlap (mailto vagy egyszerű form-submit szolgáltatás, pl. Formspree)
- Jelöld egyértelműen kódkommenttel, hogy hova kell behelyettesíteni a valós Cal.com embed linket/API kulcsot

## SEO utasítások

**Cél kulcsszavak:** "klímaszerelő siófok", "klíma telepítés siófok", "klíma tisztítás siófok", "klíma karbantartás siófok" + variánsok a környékbeli településnevekkel (pl. "klímaszerelő zamárdi", "klíma szerelés balatonföldvár")

**Minden oldalhoz:**
- Egyedi `<title>` és meta description (150-160 karakter, CTA-val)
- Tiszta H1-H2-H3 hierarchia, kulcsszavakkal a fejlécekben
- Konverzió-orientált szövegstruktúra: probléma → megoldás → bizalomépítés (garancia, tapasztalat) → CTA

**Structured data (Schema.org JSON-LD):**
- `LocalBusiness` (vagy pontosabb altípus, ha elérhető: HVAC-jellegű) a fő oldalon — név, cím, telefonszám, szolgáltatási terület, nyitvatartás
- `Service` schema minden szolgáltatás-aloldalhoz
- `FAQPage` schema a GYIK szekcióhoz

**Technikai SEO:**
- `sitemap.xml`, `robots.txt`
- Sebesség-optimalizált képek (WebP, lazy loading)
- Mobilbarát, Core Web Vitals szempontból tiszta kód

**Hangnem:** megbízható, közvetlen, helyi szakember hangja — barátságos, de szakmailag hiteles, nem "corporate" száraz szöveg.

## Placeholder-ök, amiket az ügyfélnek később pótolnia kell

Jelöld egyértelműen a kódban/kommentekben, hogy az alábbiakat valós adatokra kell cserélni:
- Valós telefonszám, email, pontos cím
- Nyitvatartási idők
- Valós referenciafotók és vélemények
- Cal.com fiók / embed link / API kulcs
- steeldecor.hu pontos termékfotók és linkek
- Logó (jelenleg nincs kész logó — javasolj egy egyszerű, letisztult szöveges/monogram logó-koncepciót, amíg nincs saját)

---

*Ez a brief egy tervezési munkamenet eredménye. Kérdezz vissza, ha bármelyik pont pontosításra szorul, mielőtt nekiállsz a generálásnak.*
