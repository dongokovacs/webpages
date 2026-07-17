'use strict';

/* ── Dark / Light mode ── */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  const stored = localStorage.getItem('sg-theme');
  root.dataset.theme = stored || (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  const updateLabel = () => themeBtn.setAttribute('aria-label',
    root.dataset.theme === 'dark' ? 'Váltás világos módra' : 'Váltás sötét módra');
  updateLabel();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('sg-theme', root.dataset.theme);
    updateLabel();
  });
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
  });
  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}
function closeMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
}

/* ── Features popover ── */
const featBtn = document.getElementById('feat-btn');
const featPopover = document.getElementById('feat-popover');
if (featBtn && featPopover) {
  featBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = featPopover.classList.toggle('open');
    featBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', e => {
    if (!featPopover.contains(e.target) && e.target !== featBtn) {
      featPopover.classList.remove('open');
      featBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      featPopover.classList.remove('open');
      featBtn.setAttribute('aria-expanded', 'false');
      featBtn.focus();
    }
  });
}

/* ── Hero slider ── */
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  let current = 0;
  let timer = null;

  function showSlide(i) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    dots[current]?.setAttribute('aria-selected', 'false');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    dots[current]?.setAttribute('aria-selected', 'true');
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 6000);
  }

  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { showSlide(i); startAutoplay(); });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) startAutoplay();
}

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-scale, .reveal-left')
  .forEach(el => revealObs.observe(el));

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  });
});

/* ── requestAnimationFrame counter ── */
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
function animateCounter(el, target, duration = 1800) {
  const suffix = el.dataset.suffix || '';
  let start = null;
  (function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(easeOutQuart(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const t = parseInt(e.target.dataset.counter, 10);
    if (!isNaN(t)) animateCounter(e.target, t);
    counterObs.unobserve(e.target);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

/* ── Contact form ── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name?.value?.trim() || '';
    const email = form.email?.value?.trim() || '';
    const alkalom = form.alkalom?.value || '';
    const msg = form.message?.value?.trim() || '';
    if (!name || !email || !msg) return;
    const btn = form.querySelector('.form-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Küldés…'; }
    const subject = encodeURIComponent(`Érdeklődés – ${alkalom || 'általános'} – ${name}`);
    const body = encodeURIComponent(`Szia!\n\nNevem: ${name}\nEmail: ${email}\nAlkalom: ${alkalom || '–'}\n\n${msg}`);
    const mailto = `mailto:sophiesgardenmaglod@gmail.com?subject=${subject}&body=${body}`;
    const gmail = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent('sophiesgardenmaglod@gmail.com')}&su=${encodeURIComponent(`Érdeklődés – ${alkalom || 'általános'} – ${name}`)}&body=${body}`;
    let opened = false;
    window.addEventListener('blur', () => { opened = true; }, { once: true });
    window.location.href = mailto;
    setTimeout(() => { if (!opened) window.open(gmail, '_blank'); }, 700);
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
    }, 900);
  });
}
