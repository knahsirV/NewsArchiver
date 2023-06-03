const puppeteer = require("puppeteer");
const serviceAccount = require("./news-archiver-d0853-firebase-adminsdk-ncrnl-7b1b2933ce.json");
const fs = require("firebase-admin");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

const newsDb = db.collection("news");

cnnHeadlines = [];
foxHeadlines = [];

const scrapeNews = async () => {
  // console.log(`Starting Scrape #${Date.now().toString()}`);
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  // console.log(`Scrape #${Date.now().toString()}: Launched browser`);
  const page = await browser.newPage();
  // console.log(`Scrape #${Date.now().toString()}: Opened new page`);
  await page.goto("https://edition.cnn.com/politics");
  // console.log(`Scrape #${Date.now().toString()}: Navigated to http://edition.cnn.com/politics`);
  headings = await page.evaluate(() => {
    headings_elements = document.querySelectorAll("h3 > a");
    headings_array = Array.from(headings_elements);
    media_elements = document.querySelectorAll(".media > a > img");
    media_array = Array.from(media_elements).map((image) => image.getAttribute("src"));
    // console.log(`Scrape #${Date.now().toString()}: Scraped all necessary data from CNN`);
    return headings_array.map((heading, index) => {
      return {
        heading: heading.text,
        link: heading.href,
        img: media_array[index],
      };
    });
  });
  cnnHeadlines = headings;
  // console.log(`Scrape #${Date.now().toString()}: CNN data pulled in correct format`);

  await page.goto("https://www.foxnews.com/politics");
  // console.log(`Scrape #${Date.now().toString()}: Navigated to http://www.foxnews.com/politics`);
  headings = await page.evaluate(() => {
    headings_elements = document.querySelectorAll(".title > a");
    media_elements = document.querySelectorAll("article > .m > a > picture > img");
    media_array = Array.from(media_elements).map((image) => image.getAttribute("src"));
    // console.log(`Scrape #${Date.now().toString()}: Scraped all necessary data from Fox`);
    return Array.from(headings_elements).map((heading, index) => {
      return {
        heading: heading.text,
        link: heading.href,
        img: media_array[index],
      };
    });
  });
  foxHeadlines = headings;
  // console.log(`Scrape #${Date.now().toString()}: CNN data pulled in correct format`);

  await browser.close();
  // console.log(`Scrape #${Date.now().toString()}: Closed browser`);

  // console.log(`Scrape #${Date.now().toString()}:`);
  // console.log("CNN:");
  // console.log(cnnHeadlines);
  // console.log("FOX:");
  // console.log(foxHeadlines);

  await newsDb.doc(Date.now().toString()).set({
    cnn: cnnHeadlines,
    fox: foxHeadlines,
    date: fs.firestore.FieldValue.serverTimestamp(),
  });
  // console.log(`Scrape #${Date.now().toString()}: Saved data to db\n`);
};
scrapeNews();
