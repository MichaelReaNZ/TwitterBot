import puppeteer from 'puppeteer';

export async function readTweets() {
  try {
    const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
    const page = await browser.newPage();
    await page.goto('https://twitter.com/home');

    try {
      await page.waitForSelector('[data-testid="tweet"]', { timeout: 10000 });
    } catch (error) {
      throw new Error('Failed to find tweet elements on the page');
    }

    const tweets = [];

    for (let i = 0; i < 5; i++) {
      try {
        await scrollDown(page);
        await waitRandomTime(500, 1600);

        const newTweets = await page.evaluate(() => {
          const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
          return Array.from(tweetElements).map((tweet) => tweet.textContent);
        });

        tweets.push(...newTweets);
      } catch (error) {
        console.error(`Error occurred while scrolling and retrieving tweets (iteration ${i + 1}):`, error);
      }
    }

    console.log('Tweets:', tweets);
    await page.close();

    return tweets;
  } catch (error) {
    console.error('Error occurred in readTweets function:', error);
    throw error;
  }
}

// @ts-ignore
async function scrollDown(page: puppeteer.Page) {
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
}

async function waitRandomTime(min: number, max: number) {
  const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise((resolve) => setTimeout(resolve, randomTime));
}