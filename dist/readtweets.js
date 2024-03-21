"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
function readTweetsFromFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto('https://twitter.com/home');
        // Wait for the tweets to load
        yield page.waitForSelector('article[data-testid="tweet"]');
        // Get the tweets from the feed
        const tweets = yield page.evaluate(() => {
            const tweetElements = document.querySelectorAll('article[data-testid="tweet"]');
            return Array.from(tweetElements).map((tweet) => tweet.textContent);
        });
        console.log('Tweets from the feed:');
        tweets.forEach((tweet, index) => {
            console.log(`Tweet ${index + 1}:`, tweet);
        });
        yield browser.close();
    });
}
readTweetsFromFeed();
