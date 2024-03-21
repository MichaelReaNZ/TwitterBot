import puppeteer from 'puppeteer';

async function launchBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  console.log('Browser launched. Keep this process running.');
  return browser;
}

launchBrowser();