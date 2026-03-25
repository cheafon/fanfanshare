const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const filePath = path.resolve(__dirname, 'origin-gallery/styles/origin-editorial-blog.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });

  const outDir = path.resolve(__dirname, 'origin-gallery/15-editorial-blog');

  // Full page screenshot
  await page.screenshot({
    path: path.join(outDir, 'fullpage.png'),
    fullPage: true,
  });

  // Viewport screenshot (above the fold)
  await page.screenshot({
    path: path.join(outDir, 'viewport-top.png'),
  });

  // Scroll to middle
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.evaluate((h) => window.scrollTo(0, h / 2 - 450), totalHeight);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'viewport-middle.png'),
  });

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'viewport-bottom.png'),
  });

  await browser.close();
  console.log('Screenshots saved to origin-gallery/15-editorial-blog/');
})();
