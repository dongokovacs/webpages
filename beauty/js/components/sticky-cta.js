const SHOW_AFTER_PX = 640;

/** Mobilon lent megjelenő „Időpontot kérek” gomb (asztalin a CSS elrejti). */
export class StickyCta {
  constructor(el) {
    this.el = el;
    this.suppressed = false;
    window.addEventListener('scroll', () => this.update(), { passive: true });
    this.update();
  }

  /** Elküldött időpontkérés után ne jelenjen meg. */
  setSuppressed(value) {
    this.suppressed = value;
    this.update();
  }

  update() {
    this.el.classList.toggle('is-visible', !this.suppressed && window.scrollY > SHOW_AFTER_PX);
  }
}
