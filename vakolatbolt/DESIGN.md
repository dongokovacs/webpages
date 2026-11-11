# Vakolatbolt — DESIGN.md

Irány: **Swiss Industrial Print** (industrial brutalism, világos). Építőanyag-katalógus / műszaki adatlap hangulat.
Sötét (terminál) mód NINCS. A két archetípust nem keverjük.

## Színek
| Token | Érték | Használat |
|---|---|---|
| `--paper` | `#EAE8E3` | háttér (fehérítetlen papír) |
| `--paper-2` | `#F4F4F0` | cellák, kártyák |
| `--ink` | `#0D0D0D` | szöveg, vonalak |
| `--ink-2` | `#55524C` | másodlagos szöveg |
| `--red` | `#E61919` | AZ EGYETLEN kiemelőszín: CTA, kritikus adat, vastag elválasztó |

Tilos: gradiens, árnyék, áttetszőség, `border-radius`, második akcentszín.
Kivétel: a színkeverés-szekció vakolatszín-mintái (termékadat, nem UI-szín).

## Tipográfia
- **Makro:** Archivo Black, csupa nagybetű, `clamp()`, `letter-spacing: -0.04em`, `line-height: 0.88`.
- **Mikro:** JetBrains Mono, 11–13px, nagybetű, `letter-spacing: 0.08em`. Minden metaadat, navigáció, címke, kód.
- **Folyószöveg:** JetBrains Mono 14–15px, kisbetű engedett, max. 60ch.

## Rács és szerkezet
- CSS Grid, `gap: 1px` tintaszínű szülőn = hajszálvonalak.
- Teljes szélességű 2px-es vonalak választják el az egységeket.
- Szekciófej: `[ 03 / TERMÉKEK ]` + jobbra igazított kód (`REV`, `UNIT`).
- `+` keresztek a rácsmetszéspontokon, vonalkód- és figyelmeztető csík díszítőelemek.

## Szimbólumok
`[ ]` keretezés, `>>>` / `///` irányjelzők, `®` mint geometriai elem a logóban.

## Textúra
Globális, alacsony átlátszóságú SVG zaj a `body::after`-en. Halftone pontminta a hero blokkban.

## Komponensek
- **Gomb:** szögletes, 2px tintakeret; elsődleges = piros kitöltés, hoverre tinta.
- **Státusz:** élő NYITVA / ZÁRVA jelzés Europe/Budapest idő szerint.
- **Űrlap:** alul 2px vonal, mono címkék, fókuszra piros vonal.
