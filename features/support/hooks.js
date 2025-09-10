const { chromium } = require('playwright');
const { Before, After, AfterStep, Status, setWorldConstructor , setDefaultTimeout } = require('@cucumber/cucumber');
const { POManager } = require('../../page_object/POManager');

class CustomWorld {
  async launchBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.POManager = new POManager(this.page);
  }
}

setDefaultTimeout(60 * 1000);

setWorldConstructor(CustomWorld);

Before(async function () {
  
  await this.launchBrowser(); // now every scenario gets page
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'Failedscreenshot.png' });
  }
});

After(async function () {
 // await this.browser.close();
});
