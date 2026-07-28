// Lighthouse CI loads this configuration through CommonJS.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { chromium } = require("@playwright/test")

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      numberOfRuns: 1,
      startServerCommand: "npm run start -- --hostname 127.0.0.1 --port 3100",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 120_000,
      settings: {
        throttlingMethod: "devtools",
      },
      url: ["http://127.0.0.1:3100"],
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2_500 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
      },
    },
    upload: {
      outputDir: "./artifacts/lighthouse",
      target: "filesystem",
    },
  },
}
