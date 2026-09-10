import { faker } from "@faker-js/faker";

// Kizárólag generált (fake) adat — sosem valós ügyfél- vagy céges adat.
export interface ContactFormData {
  vezeteknev: string;
  keresztnev: string;
  email: string;
  telefon: string;
}

function fakeHungarianPhone(): string {
  return `+36${faker.number.int({ min: 20, max: 70 })}${faker.number.int({ min: 1000000, max: 9999999 })}`;
}

export function buildContactFormData(overrides: Partial<ContactFormData> = {}): ContactFormData {
  return {
    vezeteknev: faker.person.lastName(),
    keresztnev: faker.person.firstName(),
    email: faker.internet.email().toLowerCase(),
    telefon: fakeHungarianPhone(),
    ...overrides,
  };
}
