"use client";

import { useEffect } from "react";

import Stocks from "./WNS/Stocks";
import News from "./WNS/News";
import Weather from "./WNS/Weather";
import useUpdatesStore from "@/utils/store/assistant/sections/updates/updatesStore";

const Updates = ({}) => {
  const {
    locationNews,
    locationWeather,
    activeWnsButton,
    handleActiveWnsButton,
    initializeWns,
  } = useUpdatesStore();

  useEffect(() => {
    initializeWns();
  }, [locationNews, locationWeather]);

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Updates</h3>
      <div className="dark:border-white/20 flex items-center border rounded">
        <button
          onClick={() => handleActiveWnsButton("Stocks")}
          className={`${
            activeWnsButton === "Stocks" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Stocks
        </button>
        <button
          onClick={() => handleActiveWnsButton("News")}
          className={`${
            activeWnsButton === "News" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          News
        </button>
        <button
          onClick={() => handleActiveWnsButton("Weather")}
          className={`${
            activeWnsButton === "Weather" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Weather
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin ">
        <div className="flex flex-grow flex-col gap-4 ">
          {activeWnsButton === "Stocks" && <Stocks />}
          {activeWnsButton === "News" && <News />}
          {activeWnsButton === "Weather" && <Weather h />}
        </div>
      </div>
    </div>
  );
};

export default Updates;
