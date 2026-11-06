import { esc } from '../lib/component.js';

const timeRange = ({ open, close }) => (open ? `${open}-${close}` : 'Zárva');

/** Nyitvatartási táblázat (mai nap kiemelve) és a hero „ma nyitva” jelvénye. */
export class OpeningHoursView {
  constructor({ list, today }, hours) {
    const todayIdx = hours.todayIndex();
    const todayHours = hours.week[todayIdx];

    today.textContent = todayHours.open ? timeRange(todayHours) : 'Ma zárva';

    list.innerHTML = hours.week.map((h, i) => {
      const modifier = i === todayIdx ? 'hours__row--today' : h.open ? '' : 'hours__row--closed';
      const day = i === todayIdx ? `${h.day} · ma` : h.day;
      return `<div class="hours__row ${modifier}"><span>${esc(day)}</span><span class="tabular">${esc(timeRange(h))}</span></div>`;
    }).join('');
  }
}
