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
        console.log(doc.data());
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
        className={
          cnn.length > 0
            ? `md:h-screen overflow-hidden w-screen bg-slate-100 pt-10 md:pt-20 pl-6 md:flex md:items-center text-textDark`
            : `h-screen overflow-hidden w-screen bg-slate-100 pt-10 md:pt-20 pl-6 md:flex md:items-center text-textDark`
        }
      >
        <div className=' text-left space-y-4 md:w-1/3'>
          <h1 className='text-4xl md:text-5xl font-black title mr-4'>News Archive</h1>
          <hr className='border-2 border-accent md:w-[95%]'></hr>
          <div className='space-y-3'>
            <p className=' text-base leading-relaxed text-calPrimary font-medium pr-8'>
              Choose a date to see the news feeds of CNN and Fox from that day. Click on an article
              to read it.
            </p>
            <a
              href='https://github.com/knahsirV/NewsArchiver'
              className='hover:underline transition text-sm leading-relaxed text-calPrimary font-medium pr-8 flex'
              rel='noreferrer'
              target='_blank'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 30 30'
                className='h-5 w-5 text-textDark mr-1'
              >
                {" "}
                <path d='M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z'></path>
              </svg>
              View Github Repo
            </a>
            <p className=' text-xs leading-relaxed text-calPrimary font-medium pr-8'>
              Headlines without images were given a random image associated with America
            </p>
            <p className=' text-xs font-bold leading-relaxed text-calPrimary pr-8'>
              NOTE: The archiver was initially hosted on Heroku, but was moved to Github Actions on
              June 3, 2023, after Heroku's free tier was no longer available starting November 30,
              2022. Please choose a date from June 7, 2022 to November 30, 2022, or from June 3,
              2023 onwards.
            </p>
          </div>
          <NewsCalendar getNews={getNews} />
        </div>
        {cnn.length > 0 ? (
          <NewsContent cnn={cnn} fox={fox} />
        ) : (
          <div className='md:h-screen mt-20 md:w-2/3 md:grid place-content-center pr-6'>
            <div className='space-y-4'>
              <div className='flex justify-center w-full'>
                <ReactLoading type={"spin"} color={"#6CBCC7"} height={100} width={100} />
              </div>
              <p className='text-center font-bold'>Loading Data...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
