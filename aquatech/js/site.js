function initializeMenu() {
  const button = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  if (!button || !navigation) return;

  const closeMenu = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Menü');
    button.querySelector('.menu-toggle-label').textContent = 'Menü';
    navigation.classList.remove('is-open');
  };

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.setAttribute('aria-label', expanded ? 'Menü' : 'Bezárás');
    button.querySelector('.menu-toggle-label').textContent = expanded ? 'Menü' : 'Bezárás';
    navigation.classList.toggle('is-open', !expanded);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      button.focus();
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}

function initializeReferenceFilter() {
  const filterButtons = document.querySelectorAll('[data-year-filter]');
  const references = document.querySelectorAll('[data-reference-year]');
  if (!filterButtons.length || !references.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedYear = button.getAttribute('data-year-filter');
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      references.forEach((reference) => {
        reference.hidden = selectedYear !== 'all' && reference.getAttribute('data-reference-year') !== selectedYear;
      });
    });
  });
}

function initializeOfferForm() {
  const form = document.querySelector('[data-offer-form]');
  if (!(form instanceof HTMLFormElement)) return;

  const waterFields = form.querySelector('[data-water-fields]');
  const serviceChoices = form.querySelectorAll('input[name="service"]');
  const status = form.querySelector('[data-form-status]');
  const queryType = new URLSearchParams(window.location.search).get('t');
  const selectedType = queryType === 'fold' ? 'fold' : queryType === 'viz' ? 'viz' : null;

  if (selectedType) {
    const selectedOption = form.querySelector(`input[name="service"][value="${selectedType}"]`);
    if (selectedOption instanceof HTMLInputElement) selectedOption.checked = true;
  }

  const updateWaterFields = () => {
    const waterSelected = form.querySelector('input[name="service"]:checked')?.value === 'viz';
    if (waterFields instanceof HTMLElement) waterFields.hidden = !waterSelected;
  };

  serviceChoices.forEach((choice) => choice.addEventListener('change', updateWaterFields));
  updateWaterFields();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const service = values.get('service') === 'fold' ? 'Gépi földmunka' : 'Talajvízszint-süllyesztés';
    const lines = [
      `Szolgáltatás: ${service}`,
      `Név: ${values.get('name')}`,
      `Cég: ${values.get('company') || 'Nincs megadva'}`,
      `Telefon: ${values.get('phone')}`,
      `E-mail: ${values.get('email')}`,
      `Helyszín: ${values.get('location')}`,
      `Várható munkakezdés: ${values.get('start') || 'Nincs megadva'}`
    ];

    if (values.get('service') === 'viz') {
      lines.push(
        `Munkaterület mérete: ${values.get('area') || 'Nincs megadva'}`,
        `Várható gödörszint: ${values.get('pit-depth') || 'Nincs megadva'}`,
        `Helyszíni adottságok: ${values.getAll('utilities').join(', ') || 'Nincs megadva'}`
      );
    }
    lines.push('', 'Üzenet:', String(values.get('message') || 'Nincs megadva'));

    const subject = encodeURIComponent(`Ajánlatkérés - ${service}`);
    const body = encodeURIComponent(lines.join('\r\n'));
    window.location.href = `mailto:info@aquatechhungary.hu?subject=${subject}&body=${body}`;
    if (status) status.textContent = 'A levelezőprogram megnyitása folyamatban. Ha nem indul el, írjon az info@aquatechhungary.hu címre.';
  });
}

function initializeScrollStory() {
  const story = document.querySelector('[data-strata-scroll-story]');
  if (!(story instanceof HTMLElement)) return null;

  const sentinels = document.createDocumentFragment();
  const count = 101;
  for (let index = 0; index < count; index += 1) {
    const sentinel = document.createElement('span');
    sentinel.className = 'progress-sentinel';
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.dataset.progress = String(index / (count - 1));
    sentinel.style.setProperty('--progress', String(index / (count - 1)));
    sentinels.append(sentinel);
  }
  story.append(sentinels);

  let visible = false;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibilityObserver.observe(story);

  const markers = story.querySelectorAll('.progress-sentinel');
  const markerObserver = new IntersectionObserver((entries) => {
    const activeMarkers = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight / 2) - Math.abs(b.boundingClientRect.top - window.innerHeight / 2));
    if (!visible || !activeMarkers.length) return;
    story.dispatchEvent(new CustomEvent('strata-progress', {
      detail: Number(activeMarkers[0].target.dataset.progress)
    }));
  }, { rootMargin: '-49% 0px -49% 0px', threshold: 0 });
  markers.forEach((marker) => markerObserver.observe(marker));

  return () => {
    visibilityObserver.disconnect();
    markerObserver.disconnect();
  };
}

async function initializeStrata() {
  const strataElements = [...document.querySelectorAll('[data-strata]')];
  if (!strataElements.length) return;

  try {
    const { createStrata } = await import('./strata.js');
    const story = document.querySelector('[data-strata-scroll-story]');
    const disposeStory = story ? initializeScrollStory() : null;

    strataElements.forEach((element) => {
      const canvas = element.querySelector('[data-strata-canvas]');
      if (!(canvas instanceof HTMLCanvasElement)) return;
      const mode = element.getAttribute('data-mode') === 'scroll' ? 'scroll' : 'loop';
      const scene = createStrata(canvas, { mode });
      if (mode === 'scroll' && story) {
        story.addEventListener('strata-progress', (event) => {
          scene.setProgress(event.detail);
        });
      }
      element.addEventListener('strata-dispose', () => scene.dispose(), { once: true });
    });

    window.addEventListener('pagehide', (event) => {
      if (event.persisted) return;
      strataElements.forEach((element) => element.dispatchEvent(new Event('strata-dispose')));
      disposeStory?.();
    }, { once: true });
  } catch (error) {
    console.error('A talajmetszet 3D nézete nem tölthető be. A statikus metszet marad látható.', error);
  }
}

initializeMenu();
initializeReferenceFilter();
initializeOfferForm();
initializeStrata();
