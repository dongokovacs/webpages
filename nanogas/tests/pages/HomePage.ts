import type { Locator, Page } from "@playwright/test";
import type { ContactFormData } from "../fixtures/contact-data";

// Page Object a főoldalhoz — lokátorok + primitív akciók, nincs benne expect().
export class HomePage {
  readonly page: Page;

  readonly desktopDropdownTrigger: Locator;
  readonly mobileMenuButton: Locator;
  readonly heroBookingCta: Locator;
  readonly firstFaqItem: Locator;
  readonly themeToggle: Locator;

  readonly contactForm: Locator;
  readonly vezeteknev: Locator;
  readonly keresztnev: Locator;
  readonly email: Locator;
  readonly telefon: Locator;
  readonly gdprCheckbox: Locator;
  readonly submitButton: Locator;
  readonly statusMessage: Locator;

  readonly hibakodSearchInput: Locator;
  readonly hibakodVisibleRows: Locator;

  constructor(page: Page) {
    this.page = page;

    this.desktopDropdownTrigger = page.locator(".nav-dropdown-trigger");
    this.mobileMenuButton = page.getByRole("button", { name: "Menü megnyitása" });
    this.heroBookingCta = page.locator(".hero-actions").getByRole("link", { name: "Foglaljon időpontot" });
    this.firstFaqItem = page.locator("details.faq-item").first();
    this.themeToggle = page.locator("[data-theme-toggle]").first();

    this.contactForm = page.locator("#booking-form");
    this.vezeteknev = page.locator("#vezeteknev");
    this.keresztnev = page.locator("#keresztnev");
    this.email = page.locator("#email");
    this.telefon = page.locator("#telefon");
    this.gdprCheckbox = page.locator("#adatvedelmi-hozzajarulas");
    this.submitButton = page.getByRole("button", { name: "Üzenet küldése" });
    this.statusMessage = page.locator("#booking-form-status");

    this.hibakodSearchInput = page.locator("[data-hibakod-search]");
    this.hibakodVisibleRows = page.locator("[data-hibakod-row]:not([hidden])");
  }

  async goto(path = "/index.html") {
    await this.page.goto(path);
  }

  async openDesktopDropdown() {
    // Hoverre nyílik (nem kattintásra) — ld. src/main.js nav-dropdown logika.
    await this.desktopDropdownTrigger.hover();
  }

  async openMobileMenu() {
    await this.mobileMenuButton.click();
  }

  async openFirstFaq() {
    await this.firstFaqItem.locator("summary").click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async getThemeAttribute(): Promise<string | null> {
    return this.page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  }

  async fillContactForm(data: Pick<ContactFormData, "vezeteknev" | "keresztnev" | "email" | "telefon">) {
    await this.vezeteknev.fill(data.vezeteknev);
    await this.keresztnev.fill(data.keresztnev);
    await this.email.fill(data.email);
    await this.telefon.fill(data.telefon);
  }

  async acceptGdprAndSubmit() {
    await this.gdprCheckbox.check();
    await this.submitButton.click();
  }

  async submitWithoutFilling() {
    await this.submitButton.click();
  }

  async isFormValid(): Promise<boolean> {
    return this.contactForm.evaluate((form: HTMLFormElement) => form.checkValidity());
  }

  async searchHibakod(query: string) {
    await this.hibakodSearchInput.fill(query);
  }
}
