# Beauty Room weboldal

## Kódolási irányelvek

Minden kódírás, módosítás, review vagy refaktor előtt töltsd be és kövesd a `karpathy-guidelines` skillt:
- Gondold végig kódolás előtt, mondd ki a feltételezéseket, kérdezz, ha nem egyértelmű.
- A legegyszerűbb megoldás, ami a kérést teljesíti — semmi kéretlen extra.
- Sebészi pontosságú változtatások: csak azt érintsd, amit a kérés igényel, a meglévő stílushoz igazodva.
- Határozz meg ellenőrizhető sikerfeltételt, és ellenőrizd a változtatást (pl. böngészőben).

## Szerkezet

Statikus oldal, build lépés és függőség nélkül (vanilla JS, ES modulok). Helyi futtatás: `python -m http.server`, majd `http://localhost:8000` (a modulok `file://`-ról nem töltődnek be).

- `index.html` – szemantikus váz, statikus szövegek.
- `css/styles.css` – a tetején a design tokenek (`:root`), alatta szekciónként a komponensosztályok. Inline stílus nincs.
- `js/data.js` – **minden tartalom** (szolgáltatások/árak, vélemények, galéria, nyitvatartás, foglalási szabályok). Tartalombővítéshez csak ezt kell szerkeszteni.
- `js/domain/` – tiszta üzleti logika DOM nélkül (`OpeningHours`, `BookingSchedule`).
- `js/components/` – egy osztály egy UI-felelősséggel; az állapotot kezelők a `lib/component.js` `Component` ősosztályából származnak.
- `js/main.js` – összeköti a komponenseket (pl. árlista → foglalási űrlap).
- `legacy/` – a régi Claude Design export, csak referenciának.

Az időpontkérés jelenleg nem küld adatot sehová: a valódi beküldést a `BookingForm.send()` metódusba kell bekötni.
