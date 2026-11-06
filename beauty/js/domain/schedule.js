import { toMinutes } from '../lib/format.js';

const DAY_MS = 864e5;

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** JS getDay() (vasárnap = 0) → hétfő-alapú index (hétfő = 0). */
const mondayIndex = (d) => (d.getDay() + 6) % 7;

/** Heti nyitvatartás (hétfőtől vasárnapig). Tiszta logika, DOM nélkül. */
export class OpeningHours {
  constructor(week) {
    this.week = week;
  }

  forDate(date) {
    return this.week[mondayIndex(date)];
  }

  todayIndex(now = new Date()) {
    return mondayIndex(now);
  }
}

/** Kérhető időpontok számítása a nyitvatartás és a foglalási szabályok alapján. */
export class BookingSchedule {
  constructor(hours, { slotStep, daysAhead, minLeadMinutes }, clock = () => new Date()) {
    this.hours = hours;
    this.slotStep = slotStep;
    this.daysAhead = daysAhead;
    this.minLeadMinutes = minLeadMinutes;
    this.clock = clock;
  }

  /** Utolsó lapozható hét indexe (0 = aktuális hét). */
  get maxWeek() {
    return Math.ceil((this.daysAhead + 7) / 7) - 1;
  }

  /** A `weekOffset`-edik hét napjai, hétfőtől vasárnapig. */
  weekDates(weekOffset) {
    const today = startOfDay(this.clock());
    const monday = addDays(today, -mondayIndex(today) + weekOffset * 7);
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  }

  /** Az adott nap szabad kezdési időpontjai percben (pl. 570 = 09:30). */
  slotsFor(date) {
    const { open, close } = this.hours.forDate(date);
    if (!open) return [];

    const now = this.clock();
    const diff = Math.round((startOfDay(date) - startOfDay(now)) / DAY_MS);
    if (diff < 0 || diff > this.daysAhead) return [];

    const earliest = diff === 0 ? now.getHours() * 60 + now.getMinutes() + this.minLeadMinutes : 0;
    const slots = [];
    for (let m = toMinutes(open); m <= toMinutes(close) - this.slotStep; m += this.slotStep) {
      if (m >= earliest) slots.push(m);
    }
    return slots;
  }
}
