/* ============================================================================
   KOZMA VIVIEN · A HONLAP ÖSSZES ADATA EGY HELYEN
   ----------------------------------------------------------------------------
   Ezt a fájlt kell szerkeszteni, ha változik egy ár, a nyitvatartás, a cím,
   egy elérhetőség, egy vélemény vagy a házirend. A HTML-hez nem kell nyúlni.

   Szabályok szerkesztéskor:
   - A szövegek idézőjelek ("...") között vannak; idézőjelen belül ne legyen
     másik egyenes idézőjel (használj „ ” jeleket).
   - Minden sor végén vessző van, kivéve a lista vagy a csoport utolsó elemét.
   - Új ársor: másold le egy meglévő { nev: ..., ar: ... } sort, és írd át.
   - Mentés után frissítsd a böngészőt (Ctrl+F5).
   ========================================================================== */

window.ADATOK = {

  /* ---- Az első képernyő szövege ----------------------------------------- */
  fooldalCim: "Műszempilla és smink Gyömrőn",            // legfeljebb kb. 40 karakter
  fooldalAlcim: "Pillaépítés, alkalmi és menyasszonyi smink, sminkoktatás. Hétköznap 8:00-tól.",

  /* ---- Név és elérhetőség ------------------------------------------------ */
  nev: "Kozma Vivien",
  szalon: "Pure Kozmetika",
  utca: "Frangepán utca",           // házszámmal is írható, pl. "Frangepán utca 2."
  telepules: "Gyömrő",

  // Egy rövid hír az oldal tetején (költözés, szabadság, új szolgáltatás).
  // Ha nincs hír, legyen üres: hirdetmeny: ""
  hirdetmeny: "November 10-től új helyen: Pure Kozmetika, Gyömrő",

  // Az „Időpontot kérek” gomb ide visz (Facebook Messenger).
  idopontLink: "https://m.me/kozmavivienmakeupartist",
  email: "kozmavivienmakeupartist@gmail.com",
  facebook: "https://www.facebook.com/kozmavivienmakeupartist",
  tiktok: "https://www.tiktok.com/@viviennn0622",

  /* ---- Nyitvatartás ------------------------------------------------------
     nap: mon, tue, wed, thu, fri, sat, sun (a mai nap kiemeléséhez kell)
     ido: "8:00–18:00" alakban, vagy szöveg (pl. "Zárva")                  */
  nyitvatartas: [
    { nap: "mon", cimke: "Hétfő",     ido: "8:00–18:00" },
    { nap: "tue", cimke: "Kedd",      ido: "8:00–15:00" },
    { nap: "wed", cimke: "Szerda",    ido: "8:00–18:00" },
    { nap: "thu", cimke: "Csütörtök", ido: "8:00–15:00" },
    { nap: "fri", cimke: "Péntek",    ido: "8:00–15:00" },
    { nap: "sat", cimke: "Szombat",   ido: "Smink egyeztetéssel" },
    { nap: "sun", cimke: "Vasárnap",  ido: "Zárva" }
  ],

  /* ---- Árak --------------------------------------------------------------
     Három csoport, egymás mellett. Szépen akkor mutat, ha mindegyikben
     ugyanannyi sor van.                                                     */
  arcsoportok: [
    {
      cim: "Műszempilla, új szett",
      sorok: [
        { nev: "1–2D",            ar: "22 000 Ft" },
        { nev: "3–4D",            ar: "23 000 Ft" },
        { nev: "4–5D",            ar: "24 000 Ft" },
        { nev: "5–6D",            ar: "25 000 Ft" },
        { nev: "Fox eye stílus",  ar: "+1 000 Ft" }
      ]
    },
    {
      cim: "Műszempilla, töltés",
      sorok: [
        { nev: "1–2D",                   ar: "16 000 Ft" },
        { nev: "3–4D",                   ar: "17 000 Ft" },
        { nev: "4–5D",                   ar: "18 000 Ft" },
        { nev: "5–6D",                   ar: "19 000 Ft" },
        { nev: "Más pillás munkája",     ar: "Egyeztetéssel" }
      ]
    },
    {
      cim: "Smink és szemöldök",
      sorok: [
        { nev: "Alkalmi smink",          ar: "Egyeztetéssel" },
        { nev: "Menyasszonyi smink",     ar: "Egyeztetéssel" },
        { nev: "Sminkoktatás",           ar: "Egyeztetéssel" },
        { nev: "Szemöldök-laminálás",    ar: "Egyeztetéssel" },
        { nev: "Festés, gyantázás",      ar: "Egyeztetéssel" }
      ]
    }
  ],
  // Egy sor az árlista fölött, jobbra.
  arMegjegyzes: "Töltés 25 napon belül, ha a szett 40%-a még fent van.",

  /* ---- Vélemények --------------------------------------------------------
     kiemelt: a nagy betűs, görgetésre kirajzolódó idézet (12–40 szó).
     kiemeltSzo: a kiemelt idézet egy szava, ami színesen jelenik meg.
     velemenyek: a kiemelt idézet alatt egy sorban három idézet fér el;
     cseréhez másold be a tartalék sort a lista egyik elemének helyére.     */
  kiemelt: {
    nev: "Váradi Eszter",
    szoveg: "A legtartósabb és legszebb szempillákat készíti nekem. Hálás vagyok, hogy rátaláltam. A szemöldököm is pont olyan, ahogy szeretem.",
    kiemeltSzo: "legtartósabb"
  },
  velemenyek: [
    { nev: "Mogyorósi Anna Réka", szoveg: "Vivi nagyon ügyes, precíz szakember. Emberileg is nagyon kedves és megértő. A pilláim mindig nagyon tartósak és gyönyörűek." },
    { nev: "Gergi Bettina",       szoveg: "Csodaszép menyasszonyi sminket varázsolt számomra a legszebb napomra. Gyorsan, korrekt áron és gyönyörűen dolgozik." },
    { nev: "Gyuga Alexandra",     szoveg: "Mindig csodálatosan jövök el tőle. Imádom, hogy ennyire precíz. Mindenkinek ajánlom, aki tartós sminket vagy tökéletes pillát szeretne." }
    // tartalék: { nev: "Bus Judit", szoveg: "Csodaszép, minőségi munkákat készít. Az átalakulások igazán látványosak." }
  ],

  /* ---- Pillás házirend (a hazirend.html oldalon jelenik meg) ------------- */
  hazirendBevezeto: "Szeretném, hogy minden alkalommal kellemes élménnyel és gyönyörű, tartós szempillákkal távozz tőlem. Kérlek, az alábbi néhány szabályt tartsd szem előtt.",
  hazirend: [
    { cim: "Időpontok", pontok: [
      "Kérlek, érkezz pontosan az egyeztetett időpontra.",
      "Ha késel, jelezd felém minél hamarabb.",
      "Ha nem tudsz eljönni, az időpontodat legalább 24 órával korábban mondd le vagy módosítsd.",
      "24 órán belüli lemondás vagy meg nem jelenés esetén a következő időpont csak a teljes szolgáltatási díj előre történő kiegyenlítésével foglalható."
    ]},
    { cim: "Érkezés előtt", pontok: [
      "Kérlek, tiszta, smink- és olajmentes szemkörnyékkel érkezz.",
      "Ha a szemed irritált, gyulladt vagy erősen könnyezik, jelezd előre, és egyeztessünk új időpontot.",
      "Bármilyen allergiát vagy érzékenységet kérlek, előre jelezz."
    ]},
    { cim: "A szempillák tartóssága", pontok: [
      "A szép és tartós szett közös munka.",
      "A pilláidat rendszeresen és kíméletesen tisztítsd.",
      "Ne tépd, ne húzd és ne piszkáld őket.",
      "Az olajos termékek a szemkörnyéken ronthatják a tapadást.",
      "A megfelelő utóápolás és a természetes szempillák állapota nagyban befolyásolja a tartósságot."
    ]},
    { cim: "72 órás garancia", pontok: [
      "A munkámra 72 órás garanciát vállalok.",
      "Ha ezen belül rendellenes, nagyobb mértékű hullást tapasztalsz, jelezd minél hamarabb, lehetőleg fotóval, hogy megnézhessem és egyeztethessünk.",
      "A garancia megfelelő utóápolás mellett érvényes."
    ]},
    { cim: "Töltés", pontok: [
      "Töltés előtt kérlek, tiszta pillákkal érkezz.",
      "Ha túl kevés műszempilla maradt, előfordulhat, hogy új szett készítése szükséges.",
      "Más pillás munkájának töltését előzetes egyeztetés alapján vállalom."
    ]}
  ],
  hazirendZaras: "Köszönöm, hogy elolvasod és betartod a házirendet. Nagyon örülök, hogy engem választottál."
};
