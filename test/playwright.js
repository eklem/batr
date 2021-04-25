const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to file:///Users/eklem/github_modules/batr/test/stopword/demo/index.html
  await page.goto('file:///Users/eklem/github_modules/batr/test/stopword/demo/index.html');

  await page.screenshot({ path: 'screenshot-01.png' })

  // Click [placeholder="Add some text"]
  await page.click('[placeholder="Add some text"]');

  // Fill [placeholder="Add some text"]
  await page.fill('[placeholder="Add some text"]', 'a string of text with some nice and interesting words ');

  // Click text=string text nice interesting words
  await page.click('text=string text nice interesting words');
  await page.screenshot({ path: 'screenshot-02.png' })

  // ---------------------
  await context.close();
  await browser.close();
})();


