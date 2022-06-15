import { React, useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  limitToLast,
  orderBy,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import Calendar from "./components/Calendar";
import Headline from "./components/Headline";

const firebaseConfig = {
  apiKey: "AIzaSyBu2daUzvXvgj5PC3k4dC0ShF2YOTzETww",
  authDomain: "news-archiver-d0853.firebaseapp.com",
  projectId: "news-archiver-d0853",
  storageBucket: "news-archiver-d0853.appspot.com",
  messagingSenderId: "75093197230",
  appId: "1:75093197230:web:6cd154a51fa72778e7c83f",
  measurementId: "G-HY037N19DW",
};

const app = initializeApp(firebaseConfig);
const App = () => {
  const db = getFirestore(app);

  const [cnn, setCnn] = useState([]);
  const [fox, setFox] = useState([]);

  const getNews = useCallback(
    async (date) => {
      date.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setDate(date.getDate() + 1);
      const newsRef = collection(db, "news");
      const newsQuery = query(
        newsRef,
        where("date", ">=", date),
        where("date", "<", endDate),
        orderBy("date"),
        limitToLast(1)
      );
      const newsSnapshot = await getDocs(newsQuery);
      let newsChange = false;
      newsSnapshot.forEach((doc) => {
        newsChange = true;
        setCnn(doc.data().cnn);
        setFox(doc.data().fox);
      });
      if (!newsChange) {
        setCnn([]);
        setFox([]);
      }
    },
    [db]
  );

  useEffect(() => {
    getNews(new Date());
  }, [getNews]);

  return (
    <div className='App'>
      <Box></Box>
      <Calendar getNews={getNews} />
      <Headline newsSource='CNN' headlines={cnn} />
      <Headline newsSource='Fox News' headlines={fox} />
    </div>
  );
};

export default App;
