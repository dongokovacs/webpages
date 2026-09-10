import { test, expect } from "./base";
import { buildContactFormData } from "./fixtures/contact-data";
import { subpages } from "./fixtures/subpages";

const FORMSPREE_URL = "https://formspree.io/f/meajyzoa";

test("főoldal betölt, helyes cím, nincs console error", async ({ page, homePage }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await homePage.goto();
  await expect(page).toHaveTitle(/Nanogas Hőtechnika/);
  expect(errors).toEqual([]);
});

test("desktop nav dropdown nyit", async ({ page, homePage }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await homePage.goto();
  await homePage.openDesktopDropdown();
  await expect(homePage.desktopDropdownTrigger).toHaveAttribute("aria-expanded", "true");
});

test("mobil menü nyit", async ({ page, homePage }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await homePage.goto();
  await homePage.openMobileMenu();
  await expect(homePage.mobileMenuButton).toHaveAttribute("aria-expanded", "true");
});

test("hero CTA a kapcsolat szekcióra visz", async ({ page, homePage }) => {
  await homePage.goto();
  await homePage.heroBookingCta.click();
  await expect(page).toHaveURL(/#kapcsolat$/);
});

test("FAQ elem kinyílik kattintásra", async ({ homePage }) => {
  await homePage.goto();
  await homePage.openFirstFaq();
  await expect(homePage.firstFaqItem).toHaveAttribute("open", "");
});

test("kapcsolatfelvételi form: happy path sikeres beküldés (mockolt Formspree)", async ({ page, homePage }) => {
  await page.route(FORMSPREE_URL, (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  );
  await homePage.goto("/index.html#kapcsolat");

  const data = buildContactFormData();
  await homePage.fillContactForm(data);
  await homePage.acceptGdprAndSubmit();

  await expect(homePage.statusMessage).toHaveText("Köszönjük! Az üzenetet elküldtük, hamarosan jelentkezünk.");
});

// A form a site egyetlen konverziós útja — ha a Formspree hibát ad vissza
// (rate limit, hibás form ID, 422 validációs hiba), a látogató beküldése
// szerver oldalon elveszik, mielőtt bármit is látna belőle. Ezt a UI-nak
// egyértelműen jeleznie kell, különben a lead csendben eltűnik.
test("kapcsolatfelvételi form: szerver hibaválasz esetén felhasználóbarát hibaüzenet jelenik meg", async ({
  page,
  homePage,
}) => {
  await page.route(FORMSPREE_URL, (route) =>
    route.fulfill({ status: 422, contentType: "application/json", body: JSON.stringify({ error: "Invalid email address" }) })
  );
  await homePage.goto("/index.html#kapcsolat");

  const data = buildContactFormData();
  await homePage.fillContactForm(data);
  await homePage.acceptGdprAndSubmit();

  await expect(homePage.statusMessage).toHaveText("Az üzenet küldése nem sikerült. Kérjük, hívjon minket telefonon.");
  await expect(homePage.statusMessage).toHaveAttribute("data-state", "error");
});

test("kapcsolatfelvételi form: üres submit natív validációval blokkolva", async ({ page, homePage }) => {
  let requestFired = false;
  await page.route(FORMSPREE_URL, (route) => {
    requestFired = true;
    return route.abort();
  });
  await homePage.goto("/index.html#kapcsolat");
  await homePage.submitWithoutFilling();

  expect(await homePage.isFormValid()).toBe(false);
  expect(requestFired).toBe(false);
});

test("téma váltó vált nappali/éjszakai között", async ({ page, homePage }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await homePage.goto();
  const before = await homePage.getThemeAttribute();
  await homePage.toggleTheme();
  const after = await homePage.getThemeAttribute();
  expect(after).not.toBe(before);
});

test("hibakód-kereső szűr keresésre", async ({ homePage }) => {
  await homePage.goto("/gazkazan-hibakodok-siofok.html");
  await homePage.searchHibakod("F.32");
  await expect(homePage.hibakodVisibleRows).toHaveCount(1);
});

test("mind a 11 aloldal betölt (200, nincs törött link)", async ({ page }) => {
  for (const path of subpages) {
    const response = await page.goto(`/${path}`);
    expect(response?.status(), path).toBeLessThan(400);
    await expect(page.locator("h1").first(), path).toBeVisible();
  }
});
