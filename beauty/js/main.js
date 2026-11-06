import { BOOKING, CATEGORIES, DEFAULT_LENGTH, GALLERY, GALLERY_TAGS, LENGTHS, REVIEWS, SERVICES } from './data.js';
import { IMG_CONFIG } from './imgconfig.js';
import { SITE_CONFIG } from './site-config.js';
import { BookingSchedule, OpeningHours } from './domain/schedule.js';
import { SiteHeader } from './components/site-header.js';
import { PriceList } from './components/price-list.js';
import { ReviewCarousel } from './components/review-carousel.js';
import { Gallery } from './components/gallery.js';
import { OpeningHoursView } from './components/opening-hours-view.js';
import { SlotPicker } from './components/slot-picker.js';
import { BookingForm } from './components/booking-form.js';
import { StickyCta } from './components/sticky-cta.js';

const $ = (selector) => document.querySelector(selector);

const { address, name, openingHours, phone, social } = SITE_CONFIG;
const mapSearch = `${name}, ${address.street}, ${address.postalCode} ${address.city}`;

document.querySelectorAll('[data-business-location]').forEach((el) => {
  el.textContent = `${address.city}, ${address.street} · ${address.parking}`;
});
document.querySelectorAll('[data-business-phone]').forEach((el) => {
  el.href = phone.href;
  el.textContent = phone.display;
});

const addressLine = $('[data-business-address]');
addressLine.textContent = `${address.postalCode} ${address.city},`;
$('[data-business-street]').textContent = address.street;
$('[data-business-parking]').textContent = address.parking;

document.querySelectorAll('[data-social-link]').forEach((link) => {
  const url = social[link.dataset.socialLink];
  if (url) {
    link.href = url;
  } else {
    link.hidden = true;
  }
});

const mapFrame = $('[data-map-embed]');
mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(mapSearch)}&output=embed`;

const directionsLink = $('[data-map-directions]');
const directionsUrl = new URL('https://www.google.com/maps/dir/');
directionsUrl.searchParams.set('api', '1');
directionsUrl.searchParams.set('destination', mapSearch);
directionsLink.href = directionsUrl;

const hours = new OpeningHours(openingHours);

const heroImage = $('[data-image="hero"]');
heroImage.src = IMG_CONFIG.hero.src;
heroImage.alt = IMG_CONFIG.hero.alt;

document.querySelectorAll('[data-review-count]').forEach((el) => { el.textContent = REVIEWS.length; });

new SiteHeader($('[data-site-header]'));
new OpeningHoursView({ list: $('[data-hours]'), today: $('[data-today-hours]') }, hours);
new ReviewCarousel($('[data-reviews]'), REVIEWS);
new Gallery($('[data-gallery]'), { items: GALLERY, tags: GALLERY_TAGS });

const stickyCta = new StickyCta($('[data-sticky-cta]'));
const slotPicker = new SlotPicker($('[data-slot-picker]'), {
  schedule: new BookingSchedule(hours, BOOKING),
  groups: BOOKING.groups,
});
const bookingForm = new BookingForm($('[data-booking]'), {
  services: SERVICES,
  slotPicker,
  onSentChange: (sent) => stickyCta.setSuppressed(sent),
});

new PriceList($('[data-price-list]'), {
  category: CATEGORIES[0],
  services: SERVICES,
  lengths: LENGTHS,
  defaultLength: DEFAULT_LENGTH,
  onBook: (name) => bookingForm.selectService(name),
});
