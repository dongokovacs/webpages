/**
 * Szalonadatok. Telefonszám, cím, közösségi profilok és nyitvatartás
 * módosításához ezt a fájlt szerkeszd.
 */
export const SITE_CONFIG = {
  name: 'Beauty Room by Petra',
  phone: {
    display: '+36 30 713 5867',
    href: 'tel:+36307135867',
  },
  address: {
    postalCode: '2234',
    city: 'Maglód',
    street: 'Móricz Zsigmond u. 12.',
    parking: 'Ingyenes utcai parkolás',
  },
  social: {
    instagram: 'https://www.instagram.com/beautyroombypetra/',
    facebook: '',
  },
  openingHours: [
    { day: 'Hétfő', open: '09:00', close: '20:00' },
    { day: 'Kedd', open: '09:00', close: '20:00' },
    { day: 'Szerda', open: '09:00', close: '20:00' },
    { day: 'Csütörtök', open: '09:00', close: '20:00' },
    { day: 'Péntek', open: null },
    { day: 'Szombat', open: null },
    { day: 'Vasárnap', open: null },
  ],
};
