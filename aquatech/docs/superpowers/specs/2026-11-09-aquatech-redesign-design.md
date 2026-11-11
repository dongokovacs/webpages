# Aqua Tech Hungary weboldal

## Irány

Megújított, statikus, magyar nyelvű weboldal két egyenrangú közönségnek: víztelenítést kereső fővállalkozóknak és gépi földmunkát kereső megrendelőknek. A vizuális rendszer geotechnikai rajzlapot idéz: törtfehér felület, tusfekete szöveg, egy talajvízkék jelzőszín, valódi földrétegszínek, Archivo és Martian Mono. Nincs általános landingoldal-rács vagy dekoratív ikonrendszer.

## Oldaltérkép

- `index.html`: szolgáltatások, kapacitás, évszűrős 2014-2019 referenciák, ajánlatkérő űrlap és kapcsolat.
- `viztelenites.html`: a vákuumkutas technológia négy lépése, görgetéshez kötött talajmetszet, műszaki ismertető és ajánlatkérés.
- `foldmunka.html`: géppark, korábbi gépfotók, területi hatókör, minimum 24 munkaóra és ajánlatkérés.
- A korábbi HTML-címek kis meta refresh és canonical átirányító oldalak maradnak.

## Megvalósítás

Nincs buildlépés vagy alkalmazáskeretrendszer. A három oldal közös `css/site.css` és `js/site.js` fájlt használ. A `js/strata.js` egyetlen Three.js 0.160.0 modullal rajzolja a kivágott talajrétegeket, kutakat és a süllyedő talajvízfelületet. Képernyőn kívül nem renderel, csökkentett mozgásnál statikus végállapotot ad, WebGL-hiba esetén CSS-metszet marad. Az Archivo és Martian Mono latin-ext készletét böngészőben, a magyar ő és ű karakterekkel ellenőriztem.

Az ajánlatkérő `mailto:` levelet nyit meg, a fájlokat a felhasználó csatolja. A régi óradíjakat és a már nem időszerű gépátlagéletkort nem közöljük aktuális adatként. A gépállapot, friss referenciák, árak, logóvektor, adószám és végleges térképpont pótlásra vár.

## Eredeti tartalom és képek

Az ismertető és projektnevek a korábbi Aqua Tech Hungary weboldalról származnak. A gépek és telephely fotói optimalizált WebP-ként helyben szerepelnek. Új, 2020 utáni referencia- és munkaterület-fotók szükségesek.
