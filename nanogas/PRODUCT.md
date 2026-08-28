# Product

## Register

brand

## Users

Háztartások, társasházi közös képviselők és ipari ügyfelek Siófok és a Balaton déli partjának térségében (Fonyód – Polgárdi – Balatonfűzfő – Dég – Tamási – Tab által határolt zóna), akik gázkazán, hőszivattyú vagy klíma beüzemelését, karbantartását vagy javítását keresik. Jellemzően mobilon, gyors döntési helyzetben (pl. leállt kazán, közelgő fűtési szezon) érkeznek, és azonnal telefonszámot vagy foglalási lehetőséget keresnek.

## Product Purpose

A Nanogas Hőtechnika Kft. bemutatkozó és lead-generáló weboldala. Célja, hogy helyi ügyfeleket szerezzen gázkazán/hőszivattyú/klíma szolgáltatásokra (beüzemelés, karbantartás, javítás), bizalmat építsen (garancia, helyismeret, tapasztalat), és minél kevesebb lépésben eljuttassa a látogatót a telefonhíváshoz vagy a kapcsolatfelvételi űrlaphoz.

## Brand Personality

Nyugodt, letisztult, professzionális. A közelmúltban bevezetett sötét, neon-zöld, hatszög-mintás vizuális irány a modernséget és technikai hitelességet hangsúlyozza, de visszafogottan — nem agresszív "gamer/tech" hangulat, hanem egy megbízható helyi szakvállalkozás magabiztossága. A tartalom és a hangnem gyakorlatias, közvetlen, nem AI-marketing-klisékkel teli.

## Anti-references

Nincs konkrétan megnevezett anti-referencia oldal. Kerülendő: tipikus, sablonos "szerelő weboldal" hangulat (stock-fotók, generikus ikonok, agresszív "1000+ elégedett ügyfél" jellegű túlzó számok) — ezt a projekt már eddig is tudatosan kerülte (pl. a márka-logók egyedi jelvényekkel vannak megkülönböztetve azonos ikon helyett).

## Design Principles

- Egy konzisztens, tokenalapú design-rendszer (`src/style.css`) vezérel minden oldalt — a változtatások mindig a tokenek szintjén történjenek, nem oldalankénti eltérésekkel.
- A funkcionalitás (Formspree űrlap, JS-interakciók, SEO/schema.org jelölés) sosem sérülhet vizuális változtatás miatt.
- Kontraszt-fegyelem: minden szövegszín-változtatás után ellenőrizni kell a WCAG AA (≥4.5:1 törzsszöveg, ≥3:1 nagy szöveg) megfelelést — ez a session során többször felmerült és javított probléma volt.
- A mobil/telefonos, gyors-döntési kontextus prioritást élvez: telefonszám és foglalás gomb mindig egy kattintásra legyen (sticky fejléc).
- Radius-lock és egységes token-készlet: gombok = pill (999px), kártyák = 20px, inputok = 12px — ne törjön meg oldalanként.

## Accessibility & Inclusion

Kifejezett elvárás nem hangzott el, ezért WCAG AA-t követjük alapértelmezettként (ez már eddig is érvényesült: több körben javítottunk kontraszt-problémákat a session során). `prefers-reduced-motion` minden animációnál (reveal, parallax, FAQ) kezelve van és ez így is marad.
