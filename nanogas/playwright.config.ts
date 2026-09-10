import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // open: "never" mindkét ágon — a HTML reporter alapból ("on-failure") egy
  // lokális szervert nyit a riport megnyitásához, ami nyitva marad a
  // folyamat után, és a következő futásnál EADDRINUSE-t okoz a 9323-as
  // porton. Riport megnézése: `npx playwright show-report`.
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : [["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    locale: "hu-HU",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  // Ha nincs explicit PLAYWRIGHT_BASE_URL megadva (pl. lokálisan vagy a CI
  // smoke jobban), a Playwright saját maga buildeli és szolgálja ki a
  // dist/-et — nem kell külön terminálban szervert indítani a teszteléshez.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run build && npx http-server dist -p 4173 -s",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
