import { esc } from '../lib/component.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tiszta validáció: mezőnév → hibaüzenet (üres objektum = érvényes). */
export function validateBooking(data) {
  const errors = {};
  if (data.name.trim().length < 2) errors.name = 'Kérjük, add meg a neved.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Érvényes e-mail-címet adj meg.';
  if (data.phone.replace(/\D/g, '').length < 9) errors.phone = 'Érvényes telefonszámot adj meg.';
  if (!data.gdpr) errors.gdpr = 'A beküldéshez el kell fogadnod a tájékoztatót.';
  return errors;
}

/**
 * Időpontkérő űrlap: validálás, hibák megjelenítése, köszönő nézet.
 * A beküldés jelenleg csak a felületen történik – valódi küldéshez a `send()` metódust kell bővíteni.
 */
export class BookingForm {
  constructor(root, { services, slotPicker, onSentChange }) {
    this.root = root;
    this.form = root.querySelector('form');
    this.success = root.querySelector('[data-success]');
    this.slotPicker = slotPicker;
    this.onSentChange = onSentChange;

    this.form.elements.service.insertAdjacentHTML('beforeend',
      services.map((s) => `<option value="${esc(s.name)}">${esc(s.name)}</option>`).join(''));

    this.form.addEventListener('submit', (e) => this.submit(e));
    this.form.addEventListener('input', (e) => this.showError(e.target.name, null));
    this.root.querySelector('[data-reset]').addEventListener('click', () => this.reset());
  }

  /** Kívülről (pl. árlistáról) előválasztja a szolgáltatást. */
  selectService(name) {
    this.form.elements.service.value = name;
    this.setSent(false);
  }

  readForm() {
    const f = this.form.elements;
    return {
      service: f.service.value,
      name: f.name.value,
      phone: f.phone.value,
      email: f.email.value,
      note: f.note.value,
      gdpr: f.gdpr.checked,
      website: f.website.value, // honeypot
    };
  }

  submit(event) {
    event.preventDefault();
    const data = this.readForm();
    const errors = validateBooking(data);
    const slot = this.slotPicker.selection;

    ['name', 'phone', 'email', 'gdpr'].forEach((field) => this.showError(field, errors[field]));
    this.slotPicker.setError(slot ? null : 'Válassz időpontot.');
    if (Object.keys(errors).length || !slot) return;

    this.send({ ...data, slot });
  }

  send(request) {
    if (request.website) return; // bot
    const summary = [request.service, request.slot].filter(Boolean).join(', ');
    this.root.querySelector('[data-first-name]').textContent = request.name.trim().split(/\s+/).at(-1);
    this.root.querySelector('[data-summary]').textContent = summary ? ` (${summary})` : '';
    this.root.querySelector('[data-email]').textContent = request.email;
    this.setSent(true);
  }

  showError(field, message) {
    const el = this.root.querySelector(`[data-error="${field}"]`);
    if (!el) return;
    el.textContent = message ?? '';
    el.hidden = !message;
  }

  setSent(sent) {
    this.form.hidden = sent;
    this.success.hidden = !sent;
    this.onSentChange?.(sent);
  }

  reset() {
    this.form.reset();
    this.slotPicker.reset();
    this.setSent(false);
  }
}
