// playwright.config.local.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,   // no retries locally
  workers: 1,   // run sequentially for easier debugging
  use: {
    browserName: 'chromium',
    headless: false,    // browser UI visible
    screenshot: 'on',
    trace: 'on'
  },
  reporter: [['html']], // generate HTML report
});
