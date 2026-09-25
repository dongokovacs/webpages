import re

import allure
import pytest
from playwright.sync_api import Page, expect

from fixtures.contact_data import build_contact_form_data
from fixtures.subpages import SUBPAGES

FORMSPREE_URL = "https://formspree.io/f/meajyzoa"


def test_foooldal_betolt_helyes_cim_nincs_console_error(page: Page, home_page):
    errors: list[str] = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

    home_page.goto()
    expect(page).to_have_title(re.compile(r"Nanogas Hőtechnika"))
    assert errors == []


def test_desktop_nav_dropdown_nyit(page: Page, home_page):
    page.set_viewport_size({"width": 1280, "height": 800})
    home_page.goto()
    home_page.open_desktop_dropdown()
    expect(home_page.desktop_dropdown_trigger).to_have_attribute("aria-expanded", "true")


# Regresszió: a trigger és a menü közti résen áthaladva a menü bezárult,
# így az almenü linkjei egérrel elérhetetlenek voltak.
def test_desktop_nav_dropdown_almenu_link_egerrel_elerheto_es_kattinthato(page: Page, home_page):
    page.set_viewport_size({"width": 1280, "height": 800})
    home_page.goto()
    home_page.click_desktop_dropdown_link("./gazkazan-beuzemeles-siofok.html")
    expect(page).to_have_url(re.compile(r"gazkazan-beuzemeles-siofok\.html$"))


def test_mobil_menu_nyit(page: Page, home_page):
    page.set_viewport_size({"width": 375, "height": 812})
    home_page.goto()
    home_page.open_mobile_menu()
    expect(home_page.mobile_menu_button).to_have_attribute("aria-expanded", "true")


def test_hero_cta_a_kapcsolat_szekciora_visz(page: Page, home_page):
    home_page.goto()
    home_page.hero_booking_cta.click()
    expect(page).to_have_url(re.compile(r"#kapcsolat$"))


def test_faq_elem_kinyilik_kattintasra(home_page):
    home_page.goto()
    home_page.open_first_faq()
    expect(home_page.first_faq_item).to_have_attribute("open", "")


def test_kontaktform_happy_path_sikeres_beadas(page: Page, home_page):
    with allure.step("Formspree mockolása sikeres (200) válaszra"):
        page.route(
            FORMSPREE_URL,
            lambda route: route.fulfill(status=200, content_type="application/json", body='{"ok": true}'),
        )

    with allure.step("Kapcsolat szekció megnyitása"):
        home_page.goto("/index.html#kapcsolat")

    with allure.step("Form kitöltése generált (fake) adattal"):
        data = build_contact_form_data()
        home_page.fill_contact_form(data)

    with allure.step("GDPR elfogadása és beküldés"):
        home_page.accept_gdpr_and_submit()

    with allure.step("Sikeres visszajelzés megjelenik"):
        expect(home_page.status_message).to_have_text("Köszönjük! Az üzenetet elküldtük, hamarosan jelentkezünk.")


# A form a site egyetlen konverziós útja — ha a Formspree hibát ad vissza
# (rate limit, hibás form ID, 422 validációs hiba), a látogató beküldése
# szerver oldalon elveszik, mielőtt bármit is látna belőle. Ezt a UI-nak
# egyértelműen jeleznie kell, különben a lead csendben eltűnik.
def test_kontaktform_szerver_hiba_eseten_felhasznalobarat_uzenet(page: Page, home_page):
    with allure.step("Formspree mockolása 422 hibaválaszra"):
        page.route(
            FORMSPREE_URL,
            lambda route: route.fulfill(
                status=422, content_type="application/json", body='{"error": "Invalid email address"}'
            ),
        )

    with allure.step("Kapcsolat szekció megnyitása"):
        home_page.goto("/index.html#kapcsolat")

    with allure.step("Form kitöltése generált (fake) adattal"):
        data = build_contact_form_data()
        home_page.fill_contact_form(data)

    with allure.step("GDPR elfogadása és beküldés"):
        home_page.accept_gdpr_and_submit()

    with allure.step("Felhasználóbarát hibaüzenet megjelenik"):
        expect(home_page.status_message).to_have_text(
            "Az üzenet küldése nem sikerült. Kérjük, hívjon minket telefonon."
        )
        expect(home_page.status_message).to_have_attribute("data-state", "error")


def test_kontaktform_ures_submit_nativ_validacioval_blokkolva(page: Page, home_page):
    request_fired = False

    def handler(route):
        nonlocal request_fired
        request_fired = True
        route.abort()

    with allure.step("Formspree hívás figyelése (nem szabadna elsülnie)"):
        page.route(FORMSPREE_URL, handler)

    with allure.step("Üres form beküldése kitöltés nélkül"):
        home_page.goto("/index.html#kapcsolat")
        home_page.submit_without_filling()

    with allure.step("Natív validáció blokkolja, nincs hálózati hívás"):
        assert home_page.is_form_valid() is False
        assert request_fired is False


def test_tema_valto_valt_nappali_ejszakai_kozott(page: Page, home_page):
    page.set_viewport_size({"width": 1280, "height": 800})
    home_page.goto()
    before = home_page.get_theme_attribute()
    home_page.toggle_theme()
    after = home_page.get_theme_attribute()
    assert after != before


def test_hibakod_kereso_szur_keresesre(home_page):
    home_page.goto("/gazkazan-hibakodok-siofok.html")
    home_page.search_hibakod("F.32")
    expect(home_page.hibakod_visible_rows).to_have_count(1)


@pytest.mark.parametrize("path", SUBPAGES)
def test_mind_a_11_aloldal_betolt_200_nincs_torott_link(page: Page, path: str):
    response = page.goto(f"/{path}")
    assert response is not None and response.status < 400, path
    expect(page.locator("h1").first).to_be_visible()
