import puppeteer from 'puppeteer';

async function readTweets() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/home');

  await page.waitForSelector('[data-testid="tweet"]');

  const tweets = await page.evaluate(() => {
    const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
    return Array.from(tweetElements).map((tweet) => tweet.textContent);
  });

  console.log('Tweets:', tweets);

  await page.close();
}

async function waitForBrowser() {
  while (true) {
    try {
      await puppeteer.connect({ browserURL: 'http://localhost:9222' });
      break;
    } catch (error) {
      console.log('Waiting for browser to be ready...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

waitForBrowser()
  .then(() => readTweets())
  .catch((error) => console.error('Error:', error));