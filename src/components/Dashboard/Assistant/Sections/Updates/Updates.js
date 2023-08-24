"use client";

import { useEffect } from "react";

import Stocks from "./WNS/Stocks";
import News from "./WNS/News";
import Weather from "./WNS/Weather";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUpdatesStore from "@/utils/store/assistant/sections/updates/updatesStore";

const Updates = ({}) => {
  const { handlePromptAssistantInput } = useAssistantStore();
  const {
    locationNews,
    locationWeather,
    generalUpdates,
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
      {generalUpdates.map((generalUpdates, index) => {
        const { name, description, prompt } = generalUpdates;
        return (
          <div key={index} className="flex flex-col ">
            <div className="w-full flex items-center justify-between text-white font-bold bg-blue-800 py-1 px-2">
              <span
                className="w-full cursor-pointer"
                onClick={() => handlePromptAssistantInput(prompt)}
              >
                {name}
              </span>
            </div>

            <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
              {description}
            </pre>
          </div>
        );
      })}

      <div className="dark:border-white/20 flex  items-center border rounded">
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
