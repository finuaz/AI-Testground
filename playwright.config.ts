import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  timeout: 30 * 1000,
  // retries: 2,
  workers: 1,

  expect: {
    timeout: 5000,
  },

  use: {
    geolocation: {
      latitude: -7.3,
      longitude: 109.9,
    },

    permissions: ["geolocation"],
    screenshot: { mode: "only-on-failure", fullPage: true },
    video: "retain-on-failure",
    trace: "retain-on-failure",
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    baseURL: "https://www.decathlon.co.id",
    locale: "id-ID",
    timezoneId: "Asia/Jakarta",
    colorScheme: "dark",
  },

  reporter: [["html"], ["list"]],
  // projects: [{ name: "chromium" }, { name: "firefox" }, { name: "webkit" }],
});
