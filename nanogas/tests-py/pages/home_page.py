from __future__ import annotations

from playwright.sync_api import Locator, Page

from fixtures.contact_data import ContactFormData


class HomePage:
    """Page Object a főoldalhoz — lokátorok + primitív akciók, nincs benne assert().

    1:1 megfeleltetve a ../../tests/pages/HomePage.ts-nek, hogy a TS és a
    Python suite közvetlenül összehasonlítható legyen.
    """

    def __init__(self, page: Page) -> None:
        self.page = page

        self.desktop_dropdown_trigger: Locator = page.locator(".nav-dropdown-trigger")
        self.mobile_menu_button: Locator = page.get_by_role("button", name="Menü megnyitása")
        self.hero_booking_cta: Locator = page.locator(".hero-actions").get_by_role(
            "link", name="Foglaljon időpontot"
        )
        self.first_faq_item: Locator = page.locator("details.faq-item").first
        self.theme_toggle: Locator = page.locator("[data-theme-toggle]").first

        self.contact_form: Locator = page.locator("#booking-form")
        self.vezeteknev: Locator = page.locator("#vezeteknev")
        self.keresztnev: Locator = page.locator("#keresztnev")
        self.email: Locator = page.locator("#email")
        self.telefon: Locator = page.locator("#telefon")
        self.gdpr_checkbox: Locator = page.locator("#adatvedelmi-hozzajarulas")
        self.submit_button: Locator = page.get_by_role("button", name="Üzenet küldése")
        self.status_message: Locator = page.locator("#booking-form-status")

        self.hibakod_search_input: Locator = page.locator("[data-hibakod-search]")
        self.hibakod_visible_rows: Locator = page.locator("[data-hibakod-row]:not([hidden])")

    def goto(self, path: str = "/index.html") -> None:
        self.page.goto(path)

    def open_desktop_dropdown(self) -> None:
        self.desktop_dropdown_trigger.click()

    def open_mobile_menu(self) -> None:
        self.mobile_menu_button.click()

    def open_first_faq(self) -> None:
        self.first_faq_item.locator("summary").click()

    def toggle_theme(self) -> None:
        self.theme_toggle.click()

    def get_theme_attribute(self) -> str | None:
        return self.page.evaluate("() => document.documentElement.getAttribute('data-theme')")

    def fill_contact_form(self, data: ContactFormData) -> None:
        self.vezeteknev.fill(data.vezeteknev)
        self.keresztnev.fill(data.keresztnev)
        self.email.fill(data.email)
        self.telefon.fill(data.telefon)

    def accept_gdpr_and_submit(self) -> None:
        self.gdpr_checkbox.check()
        self.submit_button.click()

    def submit_without_filling(self) -> None:
        self.submit_button.click()

    def is_form_valid(self) -> bool:
        return self.contact_form.evaluate("(form) => form.checkValidity()")

    def search_hibakod(self, query: str) -> None:
        self.hibakod_search_input.fill(query)
