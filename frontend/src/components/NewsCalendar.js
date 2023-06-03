import { React, useState } from "react";
import Calendar from "react-calendar";
import { CalendarIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";
import "./calendar.css";

const NewsCalendar = ({ getNews }) => {
  const [date, setDate] = useState(new Date(2022, 10, 29, 0, 0, 0));
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className=' rounded-3xl leading'>
      <div className='md:hidden'>
        <button
          onClick={() => setIsOpen(true)}
          className=' font-bold mb-4 flex items-center justify-center space-x-2 bg-slate-200 text-slate-600 px-4 py-3 rounded-lg'
        >
          <CalendarIcon className='h-5 w-5' />
          <span>{date.toDateString()}</span>
        </button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50 rounded-xl'>
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className='fixed inset-0 bg-black/30 rounded-xl' aria-hidden='true' />
          {/* Full-screen scrollable container */}
          <div className='fixed inset-0 flex items-center justify-center p-4 rounded-xl'>
            {/* Container to center the panel */}
            <div className='flex min-h-full items-center justify-center rounded-xl'>
              {/* The actual dialog panel  */}
              <Dialog.Panel className='mx-auto max-w-sm rounded-xl bg-white animate-fade-in-up'>
                <Calendar
                  className={"rounded-xl"}
                  maxDate={new Date("2022-11-29")}
                  minDate={new Date("2022-07-07")}
                  onChange={(newDate) => {
                    setIsOpen(false);
                    setDate(newDate);
                    getNews(newDate);
                  }}
                  value={date}
                  // tileDisabled={({ date, view }) =>
                  //   view === "month" &&
                  //   date > new Date("2022-11-29") &&
                  //   date < new Date("2023-06-04")
                  // }
                />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
      <div className='hidden md:block mr-6 space-y-4'>
        <h2 className='text-2xl md:ml-1 font-bold text-textDark'>{date.toDateString()}</h2>
        <Calendar
          className={"rounded-xl drop-shadow-md"}
          maxDate={new Date("2022-11-30")}
          minDate={new Date("2022-07-07")}
          onChange={(newDate) => {
            setIsOpen(false);
            setDate(newDate);
            getNews(newDate);
          }}
          value={date}
          // tileDisabled={({ date, view }) =>
          //   view === "month" && date > new Date("2022-11-29") && date < new Date("2023-06-04")
          // }
        />
      </div>
    </div>
  );
};

export default NewsCalendar;
