import { Component, esc } from '../lib/component.js';
import { formatPrice } from '../lib/format.js';

/** Árlista hajhossz-választóval. `onBook(serviceName)` a „Időpontot kérek” linkre fut. */
export class PriceList extends Component {
  constructor(root, { category, services, lengths, defaultLength, onBook }) {
    super(root, { length: defaultLength });
    this.category = category;
    this.services = services.filter((s) => s.cat === category.id);
    this.lengths = lengths;

    this.on('click', '[data-length]', (el) => this.setState({ length: Number(el.dataset.length) }));
    this.on('click', '[data-book]', (el) => onBook(el.dataset.book));
    this.render();
  }

  static formatService(service, length) {
    let price;
    if (service.prices) {
      const value = service.prices[length];
      price = value == null ? 'Nem elérhető' : formatPrice(value);
    } else {
      price = formatPrice(service.price) + (service.unit ?? '');
    }
    const desc = service.addon
      ? `${service.addon[0]} +${formatPrice(service.addon[1][length])}`
      : service.desc ?? '';
    return { name: service.name, price, desc };
  }

  render() {
    const { length } = this.state;
    const lengthPicker = this.category.byLength
      ? `<div class="segmented">
          <span class="field-label">HAJHOSSZ</span>
          <div class="segmented__track" role="group" aria-label="Hajhossz">
            ${this.lengths.map((label, i) => `
              <button type="button" class="segmented__btn" data-length="${i}" aria-pressed="${i === length}">${esc(label)}</button>`).join('')}
          </div>
        </div>`
      : '';

    const rows = this.services.map((service) => {
      const s = PriceList.formatService(service, length);
      return `
        <div class="service">
          <span class="service__name">${esc(s.name)}</span>
          <span class="service__price">${esc(s.price)}</span>
          <span class="service__desc">${esc(s.desc)}</span>
          <a href="#idopont" class="service__book" data-book="${esc(s.name)}">IDŐPONTOT KÉREK →</a>
        </div>`;
    }).join('');

    this.root.innerHTML = `
      <figure class="price-list__visual">
        <div class="price-list__photo">
          <img class="image-fill" src="${esc(this.category.photo)}" alt="${esc(this.category.photoAlt)}" loading="lazy" decoding="async">
        </div>
        <figcaption class="price-list__caption">${esc(this.category.photoLabel)}</figcaption>
      </figure>
      <div>
        <p class="services__intro">${esc(this.category.intro)}</p>
        ${lengthPicker}
        ${rows}
        <p class="note">Az árak tájékoztató jellegűek, a végleges ár a hajhossztól és a kezelés részleteitől függ.</p>
      </div>`;
  }
}
