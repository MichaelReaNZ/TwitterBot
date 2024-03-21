import puppeteer from 'puppeteer';

  async function readTweetsFromFeed() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://twitter.com/home');

    // Wait for the tweets to load
    await page.waitForSelector('article[data-testid="tweet"]');

    // Get the tweets from the feed
    const tweets = await page.evaluate(() => {
      const tweetElements = document.querySelectorAll('article[data-testid="tweet"]');
      return Array.from(tweetElements).map((tweet) => tweet.textContent);
    });

    console.log('Tweets from the feed:');
    tweets.forEach((tweet, index) => {
      console.log(`Tweet ${index + 1}:`, tweet);
    });

    await browser.close();
  }

  readTweetsFromFeed();