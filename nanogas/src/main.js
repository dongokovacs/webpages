// Nanogas Hőtechnika Kft. — megosztott kliensoldali viselkedés
(function () {
  const THEME_STORAGE_KEY = "nanogas-theme";
  const themeToggles = document.querySelectorAll("[data-theme-toggle]");
  if (themeToggles.length) {
    const syncThemeToggleLabel = (theme) => {
      themeToggles.forEach((toggle) => {
        toggle.setAttribute(
          "aria-label",
          theme === "ejszakai" ? "Nappali nézet bekapcsolása" : "Sötét nézet bekapcsolása"
        );
      });
    };
    syncThemeToggleLabel(document.documentElement.dataset.theme);
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "ejszakai" ? "nappali" : "ejszakai";
        document.documentElement.dataset.theme = next;
        syncThemeToggleLabel(next);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch (error) {
          /* privát böngészés / letiltott tárolás esetén a váltás akkor is működik, csak nem perzisztál */
        }
      });
    });
  }

  const menuButton = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const navDropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));
  if (navDropdowns.length) {
    const closeNavDropdown = (dropdown) => {
      const trigger = dropdown.querySelector(".nav-dropdown-trigger");
      const menu = dropdown.querySelector(".nav-dropdown-menu");
      menu.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };
    navDropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".nav-dropdown-trigger");
      const menu = dropdown.querySelector(".nav-dropdown-menu");
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.contains("open");
        navDropdowns.forEach(closeNavDropdown);
        if (!isOpen) {
          menu.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
    document.addEventListener("click", (event) => {
      navDropdowns.forEach((dropdown) => {
        if (!dropdown.contains(event.target)) closeNavDropdown(dropdown);
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") navDropdowns.forEach(closeNavDropdown);
    });
  }

  const bookingForm = document.getElementById("booking-form");
  const bookingStatus = document.getElementById("booking-form-status");

  const inquiryType = document.getElementById("erdeklodes-tipusa");
  if (inquiryType) {
    const conditionalFields = document.querySelectorAll("[data-show-for]");
    const requireFields = document.querySelectorAll("[data-require-for]");
    const syncConditionalFields = () => {
      conditionalFields.forEach((field) => {
        const matches = field.dataset.showFor === inquiryType.value;
        field.hidden = !matches;
        field.querySelectorAll("input, textarea, select").forEach((input) => {
          input.required = matches;
        });
      });
      requireFields.forEach((field) => {
        const matches = field.dataset.requireFor === inquiryType.value;
        const input = field.querySelector("input, textarea, select");
        if (input) input.required = matches;
      });
    };
    inquiryType.addEventListener("change", syncConditionalFields);
    syncConditionalFields();
  }

  if (bookingForm && bookingStatus) {
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = bookingForm.querySelector('button[type="submit"]');
      const originalLabel = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Küldés...";
      bookingStatus.hidden = true;

      try {
        const response = await fetch(bookingForm.action, {
          method: "POST",
          body: new FormData(bookingForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          bookingStatus.textContent = "Köszönjük! Az üzenetet elküldtük, hamarosan jelentkezünk.";
          bookingStatus.dataset.state = "success";
          bookingForm.reset();
        } else {
          bookingStatus.textContent = "Az üzenet küldése nem sikerült. Kérjük, hívjon minket telefonon.";
          bookingStatus.dataset.state = "error";
        }
      } catch (error) {
        bookingStatus.textContent = "Az üzenet küldése nem sikerült, ellenőrizze az internetkapcsolatot, vagy hívjon minket telefonon.";
        bookingStatus.dataset.state = "error";
      } finally {
        bookingStatus.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    });
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // One-time count-up for the hero stat number ("10+ év"), triggered the first time
  // it scrolls into view. Draws attention to the trust signal once, not a perpetual
  // loop. Reuses the .reveal IntersectionObserver entry below rather than a second one.
  function runCountUp(el) {
    const target = parseFloat(el.dataset.countTo);
    if (!Number.isFinite(target)) return;
    if (reducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 800;
    const start = performance.now();
    const step = (now) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      el.textContent = Math.round(target * eased);
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            const countEl = entry.target.querySelector("[data-count-to]");
            if (countEl) runCountUp(countEl);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => {
      el.classList.add("visible");
      const countEl = el.querySelector("[data-count-to]");
      if (countEl) runCountUp(countEl);
    });
  }

  // Header gains a touch more shadow once the page is scrolled past the very top.
  const siteHeader = document.querySelector(".site-header");
  const topSentinel = document.getElementById("top-sentinel");
  if (siteHeader && topSentinel && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        siteHeader.classList.toggle("scrolled", !entry.isIntersecting);
      });
    });
    headerObserver.observe(topSentinel);
  }

  initParallax();

  // Tasteful parallax: only the photographic images (hero, trust, area, subpage heroes)
  // drift a few pixels on scroll. CTAs, forms, nav and cards stay fully static.
  // Driven by a single rAF loop (never a raw scroll listener) that only runs while at
  // least one parallax image is near the viewport, and is skipped entirely under
  // prefers-reduced-motion.
  function initParallax() {
    const items = Array.from(document.querySelectorAll("[data-parallax]"));
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const active = new Set();
    let rafId = null;

    const tick = () => {
      const viewportCenter = window.innerHeight / 2;
      active.forEach((img) => {
        const speed = parseFloat(img.dataset.parallax) || 0.2;
        const rect = img.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const progress = (viewportCenter - elementCenter) / window.innerHeight;
        // Clamp scales with the element's own rendered height (matches the
        // 20%-oversize / -10% inset in CSS, with a small safety margin) so the
        // effect can be pushed hard without ever revealing an empty edge,
        // regardless of the image's aspect ratio or the viewport width.
        const maxOffset = rect.height * 0.09;
        const offset = Math.max(-maxOffset, Math.min(maxOffset, progress * speed * 260));
        img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      rafId = active.size ? requestAnimationFrame(tick) : null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target;
          if (entry.isIntersecting) {
            active.add(img);
            img.classList.add("parallax-active");
            if (rafId === null) rafId = requestAnimationFrame(tick);
          } else {
            active.delete(img);
            img.classList.remove("parallax-active");
            img.style.transform = "";
          }
        });
      },
      { rootMargin: "25% 0px 25% 0px" }
    );

    items.forEach((img) => observer.observe(img));
  }
})();
