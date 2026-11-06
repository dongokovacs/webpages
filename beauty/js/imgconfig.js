/**
 * Képek cseréjéhez csak a fájlnevet írd át. Új fotót a megfelelő kategória
 * images tömbjéhez adj; a galériaszűrők automatikusan követik a kategóriákat.
 */
export const IMG_CONFIG = {
  hero: {
    src: 'assets/instagram-hair-01.jpg',
    alt: 'Hosszú, hullámos szőke frizura hátulról',
  },
  services: {
    fodraszat: {
      src: 'assets/instagram-hair-10.jpg',
      alt: 'Rózsaszín árnyalatú, hosszú frizura több nézetből',
      label: 'Hajszín és forma',
    },
  },
  gallery: [
    {
      id: 'frizurak',
      label: 'Frizurák',
      images: [
        { src: 'assets/instagram-hair-02.jpg', alt: 'Hosszú, egyenes szőke haj', label: 'Hosszú szőke frizura', rows: 2 },
        { src: 'assets/instagram-hair-06.jpg', alt: 'Vállig érő melírozott frizura több nézetből', label: 'Melírozott frizura', rows: 2 },
        { src: 'assets/instagram-hair-07.jpg', alt: 'Réteges barna hajvágás előtte és utána', label: 'Réteges hajvágás', rows: 1 },
      ],
    },
    {
      id: 'festes',
      label: 'Festés',
      images: [
        { src: 'assets/instagram-hair-05.jpg', alt: 'Hosszú, világos szőke haj oldalnézetből', label: 'Világos szőke haj', rows: 1 },
        { src: 'assets/instagram-hair-09.jpg', alt: 'Hosszú, hamvas szőke haj hátulról', label: 'Hamvas szőke haj', rows: 1 },
      ],
    },
    {
      id: 'melir-balayage',
      label: 'Melír és balayage',
      images: [
        { src: 'assets/instagram-hair-03.jpg', alt: 'Vállig érő balayage frizura előtte és utána', label: 'Balayage', rows: 1 },
        { src: 'assets/instagram-hair-04.jpg', alt: 'Szőke melír eredménye két nézetből', label: 'Szőke melír', rows: 2 },
        { src: 'assets/instagram-hair-08.jpg', alt: 'Balayage frizura előtte és utána', label: 'Balayage előtte és utána', rows: 1 },
      ],
    },
  ],
};
