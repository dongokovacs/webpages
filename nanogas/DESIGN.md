---
name: Nanogas Hőtechnika Kft.
description: Sötét, neon-zöld high-tech dizájnrendszer egy siófoki gázkazán/hőszivattyú/klíma szakszerviz weboldalához.
colors:
  bg: "#0a0f0c"
  bg-alt: "#0f1712"
  surface: "#131a15"
  surface-glass: "#0a0f0cbf"
  ink: "#eef7ee"
  ink-soft: "#aebcb2"
  ink-faint: "#8a9c90"
  accent: "#7ed857"
  accent-strong: "#8ef264"
  accent-soft: "#16261a"
  on-accent: "#04120a"
  border: "#7ed84747"
typography:
  display:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.1vw, 2.7rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, Segoe UI, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Outfit, Segoe UI, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  input: "12px"
  card: "20px"
  pill: "999px"
spacing:
  sm: "0.6rem"
  md: "1.1rem"
  lg: "1.75rem"
  xl: "2rem"
  section: "clamp(3.5rem, 7vw, 6.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.35rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.75rem"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "0.8rem 1rem"
---

# Design System: Nanogas Hőtechnika Kft.

## 1. Overview

**Creative North Star: "A helyi szerviz vezérlőpultja éjszaka"**

A rendszer egy megbízható, precíz helyi kazán-/hőszivattyú-/klímaszerviz digitális megjelenése — mélyfekete-zöld alapon, izzó márka-zöld (#7ed857) kiemelésekkel és finom hatszög-textúrával, ami a "technikai szakértelem" érzetét adja anélkül, hogy agresszív "gamer/tech" hangulatba csapna át. A személyiség nyugodt, letisztult, professzionális — a sötét téma a modernséget és a precizitást hangsúlyozza, nem a látványosságot.

A rendszer kifejezetten elutasítja a tipikus "szerelő weboldal" sablont: generikus stock-fotókat, azonos ikonokat minden márkakártyán, túlzó "1000+ elégedett ügyfél" jellegű számokat. Minden márkakártya saját jelvényt/logót kap, a kártyák tartalma szerinti — nem dekoratív — megkülönböztetést kap.

**Key Characteristics:**
- Egyetlen rögzített sötét alap, nincs light/dark váltó
- Egy accent szín (márka-zöld), izzó árnyékokkal és zöld-tintázott szegélyekkel kifejezve
- Radius-lock: gombok mindig pill, kártyák mindig 20px, inputok mindig 12px
- Finom hatszög-textúra a hero és a váltakozó szekciók háttereként, sosem domináns

## 2. Colors

A paletta visszafogott: egyetlen márka-zöld accent két árnyalatban (nyugodt kitöltő zöld + izzó, világosabb szöveg-zöld), sötét semleges alapokra építve.

### Primary
- **Márka-zöld** (`#7ed857`): gomb-kitöltés, checkbox accent, ikon-kiemelések, hatszög-textúra vonalszíne. Mindig sötét szöveggel (`on-accent`) párosítva, sosem önmagában szövegszínként.
- **Izzó zöld** (`#8ef264`): link-szín, hover-állapotok, eyebrow-szöveg, kártya-cím-kiemelés — ez a "szöveg a sötét alapon" szerepkör, külön tokentől a fenti kitöltő zöldtől, mert a kettő kontraszt-igénye ellentétes (a kitöltő zöld sötét szöveget kíván, az izzó zöld önmaga a világos szöveg).

### Neutral
- **Mélyfekete-zöld** (`#0a0f0c`): oldal-háttér.
- **Váltakozó háttér** (`#0f1712`): `.section-alt` szekciók, alig érzékelhetően világosabb a fő háttérnél.
- **Felület** (`#131a15`): kártyák, dropdown-ok, form-mezők kerete.
- **Üveg-felület** (`#0a0f0cbf`, 75% alfa): sticky fejléc `backdrop-filter: blur` mögött.
- **Elsődleges szöveg** (`#eef7ee`): fejlécek, elsődleges törzsszöveg.
- **Másodlagos szöveg** (`#aebcb2`): leírások, alcímek.
- **Halvány szöveg** (`#8a9c90`): lábléc-metaadat, harmadlagos infó — tudatosan világosított a sötét alap 4.5:1 kontrasztjához.
- **Szegély** (`#7ed84747`, 28% alfa zöld): minden kártya/input keret — nem szürke, hanem a márka-zöld áttetsző változata.
- **Kitöltő-szöveg** (`#04120a`): kizárólag a kitöltő zöld (`accent`) felületén használt sötét szöveg.

### Named Rules
**A Két Zöld Szabály.** A kitöltő zöld (`accent`, #7ed857) sosem szövegszín; az izzó zöld (`accent-strong`, #8ef264) sosem nagy felület háttere. A kettő felcserélése kontraszt-hibát okoz — ez már egyszer megtörtént (a márka-jelvényeken fehér szöveg majdnem eltűnt az izzó zöld háttéren), ezért a jelvények saját, fix sötétzöld (#3f7a1f) hátteret kaptak a token helyett.

## 3. Typography

**Display Font:** Outfit (fallback: Segoe UI, system-ui, sans-serif)
**Body Font:** Manrope (fallback: Segoe UI, system-ui, sans-serif)

**Character:** Geometriai, magabiztos display-betűtípus (Outfit) párosítva egy humanista, olvasható törzsszöveg-betűtípussal (Manrope) — a kontraszt-elven párosított két család, nem két hasonló geometrikus sans.

### Hierarchy
- **Display** (700, `clamp(2.1rem, 4.4vw, 3.4rem)`, sor-magasság 1.12): főoldal hero címsor.
- **Headline** (700, `clamp(1.9rem, 3.1vw, 2.7rem)`, sor-magasság 1.12): szekció-címek (`.section-head h2`).
- **Body** (400, 1.05rem, sor-magasság 1.6): törzsszöveg, max 72ch (`.prose`).
- **Label** (600, 0.78rem, tracking 0.14em, uppercase): eyebrow-jelvények — csak pill-alakú badge formában használt, sosem csupasz szekció-kicker.

### Named Rules
**A Nincs-Csupasz-Eyebrow Szabály.** A kis, nagybetűs, tracked "eyebrow" szöveg csak pill-alakú, háttérszínezett badge-ként jelenhet meg (`.hero-copy .eyebrow`, `.subpage-hero .eyebrow`), sosem csupasz szövegként szekció felett — az utóbbi a legelterjedtebb AI-sablon tell.

## 4. Elevation

Hibrid rendszer: sötét mélység-árnyék **és** zöld izzás-árnyék egyszerre, minden emelt felületen (kártya hover, dropdown, hero-kép keret). Az izzás nem dekoráció — a márka-zöld accent kiterjesztése a fény/árnyék nyelvbe.

### Shadow Vocabulary
- **shadow** (`0 24px 60px -20px rgba(0,0,0,0.65), 0 0 32px -4px rgba(126,216,87,0.28)`): nagy, kiemelt felületek (hero-kép keret, dropdown menü, mobil nav).
- **shadow-soft** (`0 10px 30px -14px rgba(0,0,0,0.55), 0 0 18px -4px rgba(126,216,87,0.22)`): kártya hover, gomb alap-árnyék, kisebb panelek.

### Named Rules
**A Sosem-Csak-Fekete Szabály.** Egyetlen árnyék sem lehet tisztán fekete/semleges — mindegyik tartalmaz egy zöld izzás-réteget is, hogy az emelt felületek a márka színéhez tartozzanak, ne egy generikus sötét UI-hoz.

## 5. Components

### Buttons
- **Shape:** pill (`border-radius: 999px`)
- **Primary:** háttér `accent` (#7ed857), szöveg `on-accent` (#04120a), `shadow-soft` alap-árnyékkal
- **Hover / Focus:** háttér `accent-strong`-ra sötétedik... valójában világosodik (#8ef264 felé), 2px felfelé mozgás (`translateY(-2px)`), 0.18s cubic-bezier(0.16,1,0.3,1) átmenet
- **Secondary / Ghost:** átlátszó háttér, `ink` szöveg, `border` szegély; hover: szegély `accent` színre vált, szöveg `accent-strong`-ra

### Cards / Containers
- **Corner Style:** 20px (`--radius-card`)
- **Background:** `surface` (#131a15) alapértelmezett; a `service-card` komponens 4 variánsa (`--accent`, `--surface`, `--ink`, `--soft`) más-más háttér-token kombinációt használ ugyanazon a geometrián belül
- **Shadow Strategy:** nyugalmi állapotban nincs árnyék (csak border), hover: `shadow-soft`
- **Border:** `border` token (28% alfa zöld), 1px
- **Internal Padding:** 1.75–2rem
- **Hover:** `translateY(-4px)` + `shadow-soft`, 0.25s cubic-bezier(0.16,1,0.3,1)

### Inputs / Fields
- **Style:** háttér `bg` (nem `surface` — egy fokkal sötétebb, mint a kártyák), 1px `border` szegély, `radius-input` (12px)
- **Focus:** 2px `accent` outline, 1px offset
- **Error:** szöveg `#f87171` (világos piros, sötét alapon olvasható — a `#b91c1c` sötét piros itt olvashatatlan lenne)

### Navigation
- Sticky fejléc, `surface-glass` (75% alfa) háttér + `backdrop-filter: blur(16px) saturate(140%)`, `border` alsó szegély. Nav-linkek `ink-soft`, hover `accent-strong`. Aktív dropdown trigger szintén `accent-strong`.

### Hero-stat-card (signature component)
A hero-kép melletti/alatti infókártyák (pl. "Karbantartás, beüzemelés", "Kiknek") — a régi egyetlen, képre pozicionált "10+ év" jelvény mintájára épülnek, de több, egy sorban elhelyezett, egyenrangú kártyaként: `surface-glass` háttér, blur, `border` szegély, `shadow-soft`. Cím `accent-strong` színnel, leírás `ink-soft`-tal. Ha linkként funkcionál, hover: szegély `accent`-re vált + 2px emelkedés.

## 6. Do's and Don'ts

### Do:
- **Do** használj két külön zöld tokent szöveghez (`accent-strong`, #8ef264) és kitöltéshez (`accent`, #7ed857) — sosem ugyanazt a kettőre.
- **Do** adj minden emelt/hover árnyékhoz zöld izzás-réteget a sima fekete mellé.
- **Do** tartsd a radius-lockot: gomb=pill, kártya=20px, input=12px, kivétel nélkül.
- **Do** ellenőrizz minden új szövegszínt ≥4.5:1 kontrasztra a sötét alapon (`bg` #0a0f0c vagy `surface` #131a15 ellen).

### Don't:
- **Don't** használj generikus stock-fotókat vagy azonos ikont több márka-/szolgáltatás-kártyán — minden kártya saját, tartalom szerinti jelvényt/ikont kap.
- **Don't** tegyél csupasz, nagybetűs, tracked "eyebrow" szöveget szekció fölé badge-háttér nélkül.
- **Don't** használj túlzó, kerek számokat vagy "X+ elégedett ügyfél" jellegű marketing-klisét.
- **Don't** válts vissza világos témára részlegesen (pl. egyetlen világos szekció a sötét oldalon) — az alap rögzített sötét, kivétel nélkül.
- **Don't** használj sötét piros szöveget (`#b91c1c`) hibaüzenetekhez a sötét alapon — világos pirosat (`#f87171`) használj.
