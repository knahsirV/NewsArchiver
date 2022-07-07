import { React, useState, useEffect, useCallback } from "react";
import ReactLoading from "react-loading";
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
import NewsCalendar from "./components/NewsCalendar";
import NewsContent from "./components/NewsContent";

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
    <>
      <meta name='theme-color' content='rgb(241 245 249)' />
      <div
        className={`h-screen overflow-hidden w-screen bg-slate-100 pt-10 md:pt-20 pl-6 md:flex md:items-center text-textDark`}
      >
        <div className=' text-left space-y-4 md:w-1/3'>
          <h1 className='text-4xl md:text-5xl font-black title mr-4'>News Archive</h1>
          <hr className='border-2 border-accent md:w-[95%]'></hr>
          <div className='space-y-3'>
            <p className=' text-base leading-relaxed text-calPrimary font-medium pr-8'>
              Choose a date to see the news feeds of CNN and Fox from that day. Click on an article
              to read it.
            </p>
            <p className=' text-sm leading-relaxed text-calPrimary font-medium pr-8'>
              DISCLAIMER: Headlines without images were given a random image associated with America
            </p>
          </div>
          <NewsCalendar getNews={getNews} />
        </div>
        {cnn.length > 0 ? (
          <NewsContent cnn={cnn} fox={fox} />
        ) : (
          <div className='md:h-screen mt-20 md:w-2/3 md:grid place-content-center pr-6'>
            <div className="space-y-4">
              <div class="flex justify-center w-full">
                <ReactLoading type={"spin"} color={"#6CBCC7"} height={100} width={100} />
              </div>
              <p className="text-center font-bold">Loading Data...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
