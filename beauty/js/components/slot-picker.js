import { Component, esc } from '../lib/component.js';
import { MONTHS, WEEKDAYS_SHORT, dayKey, formatDayLabel, toHHMM } from '../lib/format.js';

const INITIAL = { week: 0, day: null, slot: null, closedGroups: {}, error: null };

/** Heti naptár + napszakokra bontott időpontválasztó. */
export class SlotPicker extends Component {
  constructor(root, { schedule, groups }) {
    super(root, { ...INITIAL });
    this.schedule = schedule;
    this.groups = groups;

    this.on('click', '[data-week]', (el) => this.changeWeek(Number(el.dataset.week)));
    this.on('click', '[data-day]', (el) => this.setState({ day: el.dataset.day, slot: null }));
    this.on('click', '[data-group]', (el) => this.toggleGroup(el.dataset.group));
    this.on('click', '[data-slot]', (el) => this.selectSlot(Number(el.dataset.slot)));
    this.render();
  }

  /** A kiválasztott időpont szövegesen, vagy null. */
  get selection() {
    const { date, slot } = this.view;
    return date && slot != null ? `${formatDayLabel(date)}, ${toHHMM(slot)}` : null;
  }

  setError(error) {
    this.setState({ error });
  }

  reset() {
    this.setState({ ...INITIAL });
  }

  changeWeek(delta) {
    const week = Math.min(this.schedule.maxWeek, Math.max(0, this.state.week + delta));
    this.setState({ week, slot: null });
  }

  toggleGroup(label) {
    this.setState((s) => ({ closedGroups: { ...s.closedGroups, [label]: !s.closedGroups[label] } }));
  }

  selectSlot(minutes) {
    this.setState({ day: this.view.dayKey, slot: minutes, error: null });
  }

  /** Az állapotból levezetett nézet: a hét napjai, a kiválasztott nap és időpont. */
  computeView() {
    const dates = this.schedule.weekDates(this.state.week);
    const days = dates.map((date) => ({ date, key: dayKey(date), slots: this.schedule.slotsFor(date) }));
    const firstAvailable = days.find((d) => d.slots.length);
    const selected = days.find((d) => d.key === this.state.day) ?? firstAvailable ?? null;
    const slot = selected && this.state.day === selected.key ? this.state.slot : null;
    return { dates, days, selected, dayKey: selected?.key ?? null, date: selected?.date ?? null, slot };
  }

  render() {
    this.view = this.computeView();
    const { dates, days, selected, date, slot } = this.view;
    const { week, closedGroups, error } = this.state;
    const mid = dates[3];

    const dayCells = days.map((d) => {
      const num = d.date.getDate();
      const wd = WEEKDAYS_SHORT[d.date.getDay()];
      const cell = !d.slots.length
        ? `<span class="day day--off" aria-disabled="true">${num}</span>`
        : `<button type="button" class="day" data-day="${d.key}" aria-pressed="${d === selected}">${num}</button>`;
      return `<div class="calendar__col"><span class="calendar__wd">${wd}</span>${cell}</div>`;
    }).join('');

    const slotGroups = this.groups.map(({ label, from, to }) => {
      const slots = (selected?.slots ?? []).filter((m) => m >= from * 60 && m < to * 60);
      if (!slots.length) return '';
      const open = !closedGroups[label];
      const buttons = slots.map((m) => `
        <button type="button" class="slot" data-slot="${m}" aria-pressed="${m === slot}">${toHHMM(m)}</button>`).join('');
      return `
        <div class="slot-group">
          <button type="button" class="slot-group__toggle" data-group="${esc(label)}" aria-expanded="${open}">
            ${esc(label)} <span class="slot-group__chev">${open ? '▲' : '▼'}</span>
          </button>
          ${open ? `<div class="slot-group__grid">${buttons}</div>` : ''}
        </div>`;
    }).join('');

    this.root.innerHTML = `
      <div class="calendar__head">
        <span class="field-label">IDŐPONT</span>
        <div class="calendar__nav">
          <span class="calendar__month">${MONTHS[mid.getMonth()]} ${mid.getFullYear()}</span>
          <button type="button" class="icon-btn icon-btn--sm" data-week="-1" aria-label="Előző hét" ${week === 0 ? 'disabled' : ''}>‹</button>
          <button type="button" class="icon-btn icon-btn--sm" data-week="1" aria-label="Következő hét" ${week >= this.schedule.maxWeek ? 'disabled' : ''}>›</button>
        </div>
      </div>
      <div class="calendar__week">${dayCells}</div>
      ${selected ? slotGroups : '<span class="note">Ezen a héten nincs szabad nap. Lapozz tovább.</span>'}
      <div class="pick">
        <div class="pick__text">
          <span class="pick__date">${date ? formatDayLabel(date) : 'Válassz napot'}</span>
          <span class="pick__time">${slot != null ? `${toHHMM(slot)}-tól` : 'Válassz időpontot'}</span>
        </div>
        ${error ? `<span class="error">${esc(error)}</span>` : ''}
      </div>`;
  }
}
