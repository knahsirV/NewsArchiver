# News Archiver
*This project was inspired by Fireship's video: <a href="https://www.youtube.com/watch?v=JTOJsU3FSD8" target="_blank">7 Full Stack App Ideas for Developers</a>.*
<br /><br />
CNN and Fox are known for reporting with opposing viewpoints over US politics. This application allows users to view and visit the headlines of both news sources for any given date, allowing them to compare at any moment the reporting from both sides. Access the
<a href="https://news-archiver-d0853.web.app/" target="_blank">live site here</a>.

## Components

- **Frontend**: React app styled with TailwindCSS and deployed to Firebase
- **Backend**: ExpressJS server hosted on Heroku that pulls headlines from CNN and FOX every hour and saves data to a Firestore DB. Webscraper built with Puppeteer.

## Dev Proccess & Challenges:

My first task was creating a NodeJS webscraper with Puppeteer that would visit the politics pages of both CNN and FOX, pull each headline as well as their corresponding URLs and image, and then save the scraped data to a firestore DB. Inspecting the webpages to scrape the needed content was initially cumbersome, but further research into how the document query selector interacts with the DOM simplified the proccess.
<br/> <br/>
After building the scraper, I needed a way of autmatically running the scraper. Though I initially wanted to use the built-in Firebase cloud functions and pub-sub, I quickly abandonded this path after learning that I would have to pay for this. I then turned to Heroku for hosting. I made a boilerplate ExpressJS server to host as well as quickly monitor the status of the program. I initially set up a cron job to automate the webscraper locally, but after finding out that cron jobs will not run when Heroku turns your server off, I learned how to set up and test scheduled tasks on Heroku. This was my first time deploying an automated task, so I had to research quite a bit on the most appropriate method for this situation.
<br/> <br/>
After setting up the backend, it was a matter of building a frontend that queried the database for the latest scrape from a given date. The design took some inspiration from <a href="https://dribbble.com/shots/8110794-News-Feed-App-Concept" target="_blank"> this dribble mockup</a>, though I had to considerably change it to fit larger screen widths.