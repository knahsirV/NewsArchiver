const fs = require("firebase-admin");
const puppeteer = require("puppeteer");

const serviceAccount = require("./news-archiver-d0853-firebase-adminsdk-ncrnl-7b1b2933ce.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

const newsDb = db.collection("news");

cnnHeadlines = [];
foxHeadlines = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://cnn.com/us");

  headings = await page.evaluate(() => {
    headings_elements = document.querySelectorAll("h3 .cd__headline-text");
    headings_array = Array.from(headings_elements);
    return headings_array.map((heading) => heading.textContent);
  });
  cnnHeadlines = headings;

  await page.goto("https://foxnews.com/us");
  headings = await page.evaluate(() => {
    headings_elements = document.querySelectorAll("h2.title");
    headings_array = Array.from(headings_elements).map((heading) => heading.textContent);
    headings_elements2 = document.querySelectorAll("h4.title");
    return headings_array.concat(
      Array.from(headings_elements2).map((heading) => heading.textContent)
    );
  });
  foxHeadlines = headings;

  await browser.close();
  await newsDb.doc(Date.now().toString()).set({
    cnn: cnnHeadlines,
    fox: foxHeadlines,
    date: fs.firestore.FieldValue.serverTimestamp(),
  });
})();
