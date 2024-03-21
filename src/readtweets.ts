import puppeteer from 'puppeteer';

async function readTweets() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/home');

  await page.waitForSelector('[data-testid="tweet"]');

  const tweets = [];

  for (let i = 0; i < 5; i++) {
    await scrollDown(page);
    await waitRandomTime(500, 1600);

    const newTweets = await page.evaluate(() => {
      const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
      return Array.from(tweetElements).map((tweet) => tweet.textContent);
    });

    tweets.push(...newTweets);
  }

  console.log('Tweets:', tweets);

  await page.close();
}

async function scrollDown(page: puppeteer.Page) {
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
}

async function waitRandomTime(min: number, max: number) {
  const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise((resolve) => setTimeout(resolve, randomTime));
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