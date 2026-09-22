from dataclasses import dataclass

from faker import Faker

fake = Faker("hu_HU")


# Kizárólag generált (fake) adat — sosem valós ügyfél- vagy céges adat.
@dataclass
class ContactFormData:
    vezeteknev: str
    keresztnev: str
    email: str
    telefon: str


def _fake_hungarian_phone() -> str:
    prefix = fake.random_int(min=20, max=70)
    number = fake.random_int(min=1000000, max=9999999)
    return f"+36{prefix}{number}"


def build_contact_form_data(**overrides: str) -> ContactFormData:
    data = ContactFormData(
        vezeteknev=fake.last_name(),
        keresztnev=fake.first_name(),
        email=fake.email().lower(),
        telefon=_fake_hungarian_phone(),
    )
    for key, value in overrides.items():
        setattr(data, key, value)
    return data
