// Kovács Kornél klímaszerelő — megosztott kliensoldali viselkedés
(function () {
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

  const featureBtn = document.getElementById("feature-menu-btn");
  const featureDropdown = document.getElementById("feature-dropdown");

  if (featureBtn && featureDropdown) {
    const closeFeatureDropdown = () => {
      featureDropdown.classList.remove("open");
      featureBtn.setAttribute("aria-expanded", "false");
    };
    featureBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = featureDropdown.classList.toggle("open");
      featureBtn.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (event) => {
      if (!featureDropdown.contains(event.target) && event.target !== featureBtn) {
        closeFeatureDropdown();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeFeatureDropdown();
    });
  }

  const bookingForm = document.getElementById("booking-form");
  const bookingStatus = document.getElementById("booking-form-status");

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
          bookingStatus.textContent = "Az üzenet küldése nem sikerült. Kérlek, hívj minket telefonon.";
          bookingStatus.dataset.state = "error";
        }
      } catch (error) {
        bookingStatus.textContent = "Az üzenet küldése nem sikerült, ellenőrizd az internetkapcsolatot, vagy hívj minket telefonon.";
        bookingStatus.dataset.state = "error";
      } finally {
        bookingStatus.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    });
  }

  const revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }
})();
