import React from "react";
import "./headline.css";

const Headline = ({ headlines, source }) => {
  const random_images = [
    "https://images.unsplash.com/photo-1476421069425-cc6d5d3cfd5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551357241-ae9213ccdb0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80",
    "https://images.unsplash.com/photo-1501466044931-62695aada8e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YW1lcmljYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1597466700482-b2396c31a64b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2968&q=80",
    "https://images.unsplash.com/photo-1495385579954-cac26c318b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1526638684360-95cdcee762ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2081&q=80",
    "https://images.unsplash.com/photo-1506886009355-7f3af05dd5d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFtZXJpY2F8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1515861209048-dae6a1e1ed56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1592966556928-5c4d163e8bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvbGl0aWNhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1577602702507-19122348a7fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  ];

  const validImgSrc = (image) =>
    image && ((source === "CNN" && image.includes("cdn")) || source === "FOX");

  return (
    <div className='md:columns-3 overflow-y-auto relative space-y-4 pr-6 rounded-lg animate-fade-in-up'>
      {headlines.map((headline, index) => {
        return (
          <a
            href={headline.link}
            rel='noreferrer'
            target='_blank'
            key={index}
            className='block hover:-translate-y-2 hover:scale-95 transition bg-white overflow-hidden border-b-4 border-[#6CBCC7] rounded-md drop-shadow-xl font-medium w-full relative'
          >
            {!validImgSrc(headline.img) ? (
              <div className='absolute bg-white/50 top-0 right-0 rounded-tr-md rounded-bl-md p-2 text-xs text-black/50'>
                <span>Image not present</span>
              </div>
            ) : (
              <></>
            )}
            <img
              src={
                validImgSrc(headline.img)
                  ? headline.img
                  : random_images[Math.floor(Math.random() * 8)]
              }
              alt='People'
              className='w-full object-cover h-32 sm:h-48 md:h-64'
            />
            <div className='p-4 md:p-6'>
              <p
                className={
                  source === "CNN"
                    ? "text-red-500 font-semibold text-xs mb-1 leading-none"
                    : "text-blue-900 font-semibold text-xs mb-1 leading-none"
                }
              >
                {source}
              </p>
              <h3 className='font-semibold mb-2 text-lg leading-tight sm:leading-normal'>
                {headline.heading}
              </h3>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Headline;
