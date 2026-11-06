import { Component, esc } from '../lib/component.js';

/** Galéria címke-szűrővel. */
export class Gallery extends Component {
  constructor(root, { items, tags }) {
    super(root, { tag: tags[0].id });
    this.items = items;
    this.tags = tags;
    this.filters = root.querySelector('[data-filters]');
    this.grid = root.querySelector('[data-grid]');

    this.on('click', '[data-tag]', (el) => this.setState({ tag: el.dataset.tag }));
    this.render();
  }

  render() {
    const { tag } = this.state;
    this.filters.innerHTML = this.tags.map((t) => `
      <button type="button" class="chip" data-tag="${esc(t.id)}" aria-pressed="${t.id === tag}">${esc(t.label)}</button>`).join('');

    this.grid.innerHTML = this.items
      .filter((item) => tag === 'all' || item.tag === tag)
      .map((item) => `
        <figure class="gallery__tile" style="grid-row:span ${Number(item.rows) || 1}">
          <img class="gallery__image" src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy" decoding="async">
          <figcaption class="gallery__caption">${esc(item.label)}</figcaption>
        </figure>`).join('');
  }
}
