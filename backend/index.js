const cron = require("node-cron");
const fs = require("firebase-admin");
const puppeteer = require("puppeteer");
const express = require("express");

const serviceAccount = require("./news-archiver-d0853-firebase-adminsdk-ncrnl-7b1b2933ce.json");

const app = express();
const PORT = process.env.PORT || 4000;

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

const newsDb = db.collection("news");

cnnHeadlines = [];
foxHeadlines = [];

app.get('/', function routeHandler(req, res) {
  res.send('<div style="height:90vh; display: grid; place-items:center;"><code style="font-size: 50px">Scraping CNN and FOX<code><div>');
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT} \n`));
