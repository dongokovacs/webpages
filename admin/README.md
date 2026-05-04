# Weboldal szerkesztő – Admin panel

Ezzel az eszközzel a fejlesztett weboldalak szövegeit lehet szerkeszteni kód nélkül.

## Indítás

**1. Nyiss egy PowerShell ablakot, és lépj be az admin mappába:**
```
cd c:\Users\megye\Documents\dani\git\webpages\admin
```

**2. Indítsd el a szervert:**
```
npx tsx src/server.ts
```

**3. Nyisd meg böngészőben:**
```
http://localhost:3333
```

> A szerver fut, amíg a PowerShell ablak nyitva van. Bezáráskor leáll.

---

## Használat

1. Válassz oldalt a jobb felső legördülő menüből
2. Írd át a kívánt szövegmezőket
3. Kattints a **Mentés** gombra
4. A **🌐 Honlap megtekintése** gombbal ellenőrizheted az eredményt

---

## Szerkeszthető oldalak

| Oldal | Mezők száma |
|-------|-------------|
| Galiba Társulat | 43 |
| Bübe virágbolt | – (még nincs jelölve) |

---

## Első indításkor (ha még nem fut)

Ha először telepíted, előbb telepíteni kell a csomagokat:
```
cd c:\Users\megye\Documents\dani\git\webpages\admin
npm install
npx tsx src/server.ts
```
