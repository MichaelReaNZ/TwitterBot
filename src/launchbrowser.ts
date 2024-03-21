import puppeteer from 'puppeteer';

async function launchBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--remote-debugging-port=9222'],
  });
  console.log('Browser launched. Keep this process running.');
  return browser;
}

launchBrowser();