/** Mobilmenü nyitása/zárása. Az asztali/mobil elrendezést a CSS kezeli. */
export class SiteHeader {
  constructor(root) {
    this.root = root;
    this.toggle = root.querySelector('[data-menu-toggle]');

    this.toggle.addEventListener('click', () => this.setOpen(!this.isOpen));
    root.querySelectorAll('.site-nav a').forEach((a) => a.addEventListener('click', () => this.setOpen(false)));
  }

  get isOpen() {
    return this.root.classList.contains('is-open');
  }

  setOpen(open) {
    this.root.classList.toggle('is-open', open);
    this.toggle.setAttribute('aria-expanded', String(open));
  }
}
