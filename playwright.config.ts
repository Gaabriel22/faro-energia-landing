import { defineConfig, devices } from "@playwright/test"

const baseURL = "http://127.0.0.1:3100"
const dedicatedSpecs = [
  /no-javascript\.spec\.ts/,
  /performance-budget\.spec\.ts/,
]

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chromium",
      testIgnore: dedicatedSpecs,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      testIgnore: dedicatedSpecs,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "no-javascript",
      testMatch: /no-javascript\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        javaScriptEnabled: false,
      },
    },
    {
      name: "performance-mobile",
      testMatch: /performance-budget\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command:
      "npm run build && npm run start -- --hostname 127.0.0.1 --port 3100",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
