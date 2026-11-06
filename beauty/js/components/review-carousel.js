import { esc } from '../lib/component.js';

const GAP = 20;

/** Vízszintesen görgethető vélemény-sáv körbeforgó lapozással és haladásjelzővel. */
export class ReviewCarousel {
  constructor(root, reviews) {
    this.track = root.querySelector('[data-track]');
    this.progress = root.querySelector('[data-progress]');

    this.track.innerHTML = reviews.map(ReviewCarousel.card).join('');
    root.querySelector('[data-prev]').addEventListener('click', () => this.step(-1));
    root.querySelector('[data-next]').addEventListener('click', () => this.step(1));
    this.track.addEventListener('scroll', () => this.updateProgress(), { passive: true });
    this.updateProgress();
  }

  static card(r) {
    return `
      <figure class="review">
        <figcaption class="review__head">
          <span class="review__avatar" aria-hidden="true">${esc(r.name.trim()[0])}</span>
          <span class="review__who">
            <span class="review__name">${esc(r.name)}</span>
            <span class="review__date">${esc(r.date)}</span>
          </span>
          ${r.verified ? '<span class="review__badge">✓ ELLENŐRZÖTT</span>' : ''}
        </figcaption>
        <span class="stars" aria-label="5 csillag">★★★★★</span>
        <blockquote class="review__text">„${esc(r.text)}”</blockquote>
      </figure>`;
  }

  get maxScroll() {
    return this.track.scrollWidth - this.track.clientWidth;
  }

  /** Egy kártyányit lapoz; a végén az elejére, az elején a végére ugrik. */
  step(dir) {
    const t = this.track;
    const card = t.firstElementChild;
    const width = card ? card.getBoundingClientRect().width + GAP : t.clientWidth;
    const max = this.maxScroll;
    let x = t.scrollLeft + dir * width;
    if (dir > 0 && t.scrollLeft >= max - 4) x = 0;
    if (dir < 0 && t.scrollLeft <= 4) x = max;
    t.scrollTo({ left: x });
  }

  updateProgress() {
    const max = this.maxScroll;
    const ratio = max > 0 ? this.track.scrollLeft / max : 1;
    this.progress.style.transform = `scaleX(${0.18 + ratio * 0.82})`;
  }
}
