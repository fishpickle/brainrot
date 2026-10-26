import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  use: { baseURL: "http://127.0.0.1:3107", trace: "retain-on-failure" },
  projects: [
    { name: "unit", testMatch: "unit/**/*.spec.ts" },
    {
      name: "desktop-chromium",
      testMatch: "browser/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      testMatch: "browser/**/*.spec.ts",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-webkit",
      testMatch: "browser/**/*.spec.ts",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3107",
    url: "http://127.0.0.1:3107",
    reuseExistingServer: false,
    // Invalid requests are tested against the real route; successful browser
    // responses are mocked, so this suite never calls a paid provider.
    env: { OPENAI_API_KEY: "test-key-not-a-real-credential" },
  },
});
