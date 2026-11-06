const NBSP = ' ';

export const WEEKDAYS_SHORT = ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'];
export const WEEKDAYS_LONG = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
export const MONTHS = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];

/** 12500 → "12 500 Ft" (nem törhető szóközökkel). */
export const formatPrice = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP) + NBSP + 'Ft';

/** "09:30" → 570 */
export const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

/** 570 → "09:30" */
export const toHHMM = (minutes) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

/** Dátum → "2026-11-06", stabil kulcs napok összehasonlításához. */
export const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Dátum → "11. 06., Péntek" */
export const formatDayLabel = (d) => `${pad(d.getMonth() + 1)}. ${pad(d.getDate())}., ${WEEKDAYS_LONG[d.getDay()]}`;

const pad = (n) => String(n).padStart(2, '0');
