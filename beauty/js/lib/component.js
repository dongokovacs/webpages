const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** HTML-escape a sablonokba illesztett értékekhez. */
export const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

/**
 * Minimális ősosztály: egy gyökérelem, állapot, és újrarajzolás állapotváltáskor.
 * Az eseménykezelők delegáltak, így újrarajzolás után is élnek.
 */
export class Component {
  constructor(root, state = {}) {
    this.root = root;
    this.state = state;
  }

  setState(patch) {
    const next = typeof patch === 'function' ? patch(this.state) : patch;
    this.state = { ...this.state, ...next };
    this.render();
  }

  /** Delegált esemény: a `selector`-ra illő legközelebbi elemmel hívja a handlert. */
  on(type, selector, handler) {
    this.root.addEventListener(type, (event) => {
      const el = event.target.closest(selector);
      if (el && this.root.contains(el)) handler(el, event);
    });
  }

  render() {}
}
