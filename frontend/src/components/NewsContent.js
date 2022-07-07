import React from "react";
import Headline from "./Headline";
import { Tab } from "@headlessui/react";

const NewsContent = ({ cnn, fox }) => {
  return (
    <div className=' md:w-2/3 md:h-screen md:overflow-hidden rounded-lg'>
      <Tab.Group defaultIndex={0}>
        <Tab.List className='font-bold md:text-lg mb-6 space-x-3'>
          <Tab
            className={({ selected }) =>
              selected ? `text-white bg-[#6CBCC7] p-2 rounded-full w-16 transition` : ` p-2 rounded-full w-16 transition`
            }
          >
            CNN
          </Tab>
          <Tab
            className={({ selected }) => (selected ? `text-white bg-[#6CBCC7] p-2 rounded-full w-16 transition` : ` p-2 rounded-full w-16 transition`)}
          >
            Fox
          </Tab>
        </Tab.List>
        <Tab.Panels className={'md:h-full md:overflow-auto rounded-lg'}>
          <Tab.Panel>
            <Headline headlines={cnn} source="CNN" />
          </Tab.Panel>
          <Tab.Panel>
            <Headline headlines={fox} source="FOX" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NewsContent;
