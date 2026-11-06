/**
 * Az oldal teljes tartalma. Új szolgáltatás, vélemény, galériaelem vagy
 * nyitvatartás-módosítás esetén csak ezt a fájlt kell szerkeszteni.
 */

/** Hajhossz-kategóriák; a `prices` tömbök indexei ezekhez igazodnak. */
export const LENGTHS = ['Rövid', 'Félhosszú', 'Hosszú', 'Extra hosszú'];
export const DEFAULT_LENGTH = 1;

export const CATEGORIES = [
  {
    id: 'fodraszat',
    label: 'Fodrászat',
    photo: 'assets/instagram-hair-10.jpg',
    photoAlt: 'Rózsaszín árnyalatú, hosszú frizura több nézetből',
    photoLabel: 'Hajszín és forma',
    intro: 'Válaszd ki a hajhosszad, és megmutatjuk az aktuális árakat.',
    byLength: true,
  },
];

/**
 * price:  fix ár (Ft)            prices: ár hajhosszanként (null = nem elérhető)
 * unit:   ár utáni egység        desc:   rövid megjegyzés
 * addon:  [címke, árak hajhosszanként] – pl. „Vágással +3 500 Ft”
 */
export const SERVICES = [
  { cat: 'fodraszat', name: 'Mosás – szárítás', prices: [4000, 4500, 5000, 5500] },
  { cat: 'fodraszat', name: 'Mosás – vágás – szárítás', prices: [7500, 8000, 8500, 9500] },
  { cat: 'fodraszat', name: 'Frufru vágás', price: 1500 },
  { cat: 'fodraszat', name: 'Férfi vágás', price: 4000, desc: 'Mosással +1 000 Ft' },
  { cat: 'fodraszat', name: 'Gyerek hajvágás', prices: [4500, 4500, 4500, 6000], desc: 'Mosás-szárítással +1 500 Ft' },
  { cat: 'fodraszat', name: 'Fonás', price: 1000, unit: ' / tincs' },
  { cat: 'fodraszat', name: 'Vasalás', prices: [1800, 2300, 3000, 3500] },
  { cat: 'fodraszat', name: 'Göndörítés', prices: [1800, 2300, 3000, 3500] },
  { cat: 'fodraszat', name: 'Tőfestés – mosás – szárítás', prices: [10500, 11000, 12000, 14000] },
  { cat: 'fodraszat', name: 'Teljes festés – mosás – szárítás', prices: [13000, 15000, 17000, 20000], addon: ['Vágással', [3500, 4000, 4500, 5000]] },
  { cat: 'fodraszat', name: 'Melírozás – mosás – szárítás', prices: [12000, 14000, 16000, 19000], addon: ['Árnyalással', [3000, 4000, 5000, 6000]] },
  { cat: 'fodraszat', name: 'Tőszőkítés', prices: [9000, 9500, 10000, 10500] },
  { cat: 'fodraszat', name: 'Teljes szőkítés', prices: [9500, 10000, 10500, 11500] },
  { cat: 'fodraszat', name: 'Ombre / Balayage', prices: [18000, 21000, 23500, 26000], desc: 'Tőfestéssel +5 000 Ft' },
  { cat: 'fodraszat', name: 'Cocochoco keratinos hajkezelés', prices: [21000, 24000, 26000, 28000] },
  { cat: 'fodraszat', name: 'Alkalmi frizura / konty', prices: [null, 9000, 10000, 12000], desc: 'Esküvői frizura esetén kérlek, külön érdeklődj!' },
];

export const REVIEWS = [
  { name: 'Réka Hargitai', date: '2026. szept. 14.', verified: true, text: 'Gyönyörű szép szőke szín frissítést kaptam Petrától🥰' },
  { name: 'Molnár Nikolett', date: '2026. júl. 26.', verified: true, text: 'Nagyon kellemes a hely hangulata. Petra szuper hajat varázsolt nekem, gyorsan és szépen dolgozik. Csak ajánlani tudom. 😊' },
  { name: 'Réka Hargitai', date: '2026. júl. 19.', verified: false, text: 'Petrához már lassan 10 éve járok, sosem csalódtam, mindig gyönyörű balayaget készít 🤗' },
  { name: 'Lillus', date: '2026. máj. 2.', verified: true, text: 'Petra nagyon jó szakember, szívből ajánlom! Vágás, festés, egyedi alapanyag beszerzés rövid időn belül.' },
  { name: 'Veronika', date: '2026. ápr. 8.', verified: true, text: 'Petra nagyon ügyes, én biztosan visszatérek :)' },
  { name: 'Maria Haluska', date: '2026. febr. 27.', verified: true, text: 'Petra nagyon kedves. Gyönyörű lett a hajam.' },
  { name: 'Gréta Bencze', date: '2025. dec. 24.', verified: true, text: 'Minden úgy történt, ahogy megbeszéltük!😄' },
];

export const GALLERY_TAGS = [
  { id: 'all', label: 'Összes' },
  { id: 'haj', label: 'Frizurák' },
];

/** rows: hány sor magas a csempe a rácsban (1 vagy 2). */
export const GALLERY = [
  { tag: 'haj', image: 'assets/instagram-hair-02.jpg', alt: 'Hosszú, egyenes szőke haj', label: 'Hosszú szőke frizura', rows: 2 },
  { tag: 'haj', image: 'assets/instagram-hair-03.jpg', alt: 'Vállig érő balayage frizura előtte és utána', label: 'Balayage', rows: 1 },
  { tag: 'haj', image: 'assets/instagram-hair-04.jpg', alt: 'Szőke melír eredménye két nézetből', label: 'Szőke melír', rows: 2 },
  { tag: 'haj', image: 'assets/instagram-hair-05.jpg', alt: 'Hosszú, világos szőke haj oldalnézetből', label: 'Világos szőke haj', rows: 1 },
  { tag: 'haj', image: 'assets/instagram-hair-06.jpg', alt: 'Vállig érő melírozott frizura több nézetből', label: 'Melírozott frizura', rows: 2 },
  { tag: 'haj', image: 'assets/instagram-hair-07.jpg', alt: 'Réteges barna hajvágás előtte és utána', label: 'Réteges hajvágás', rows: 1 },
  { tag: 'haj', image: 'assets/instagram-hair-08.jpg', alt: 'Balayage frizura előtte és utána', label: 'Balayage előtte és utána', rows: 1 },
  { tag: 'haj', image: 'assets/instagram-hair-09.jpg', alt: 'Hosszú, hamvas szőke haj hátulról', label: 'Hamvas szőke haj', rows: 1 },
];

/** Hétfőtől vasárnapig. open: null = zárva. */
export const HOURS = [
  { day: 'Hétfő', open: '09:00', close: '20:00' },
  { day: 'Kedd', open: '09:00', close: '20:00' },
  { day: 'Szerda', open: '09:00', close: '20:00' },
  { day: 'Csütörtök', open: '09:00', close: '20:00' },
  { day: 'Péntek', open: null },
  { day: 'Szombat', open: null },
  { day: 'Vasárnap', open: null },
];

export const BOOKING = {
  slotStep: 15,        // percben
  daysAhead: 42,       // ennyi napra előre lehet kérni
  minLeadMinutes: 120, // mai napon legalább ennyivel előre
  groups: [
    { label: 'Délelőtt', from: 0, to: 12 },
    { label: 'Délután', from: 12, to: 24 },
  ],
};
