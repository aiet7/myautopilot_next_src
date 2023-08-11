"use client";

import { useState, useEffect } from "react";
import { generalUpdates } from "../../../../../utils/prompts/generalPromptLibrary";
import { handleWnsData } from "../../../../../utils/api/wns";

import Stocks from "./WNS/Stocks";
import News from "./WNS/News";
import Weather from "./WNS/Weather";

const Updates = ({ initialUser, handlePromptAssistantInput }) => {
  const [wns, setWns] = useState({
    initialStocks: null,
    initialNews: null,
    initialWeather: null,
  });

  const [activeWnsButton, setActiveWnsButton] = useState("Stocks");

  const [symbols, setSymbols] = useState([
    "GOOGL",
    "AAPL",
    "MSFT",
    "META",
    "NVDA",
  ]);
  const [locationNews, setLocationNews] = useState("New York");
  const [locationWeather, setLocationWeather] = useState(
    initialUser.address.zipcode
  );
  const handleActiveWnsButton = (button) => {
    setActiveWnsButton(button);
  };

  const handleNewsUpdate = (newNews) => {
    setLocationNews(newNews);
  };

  const handleWeatherUpdate = (newWeather) => {
    setLocationWeather(newWeather);
  };

  useEffect(() => {
    const handleGetWns = async () => {
      try {
        const response = await handleWnsData(
          symbols,
          locationNews,
          locationWeather
        );
        setWns(response);
      } catch (e) {
        console.log(e);
      }
    };
    handleGetWns();
  }, [symbols, locationNews, locationWeather]);

  return (
    <>
      <h3 className="text-left text-lg">Updates</h3>

      {generalUpdates.map((generalUpdates, index) => {
        const { name, description, prompt } = generalUpdates;
        return (
          <div key={index} className="flex flex-col gap-1">
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

      <div className="dark:border-white/20 flex items-center border rounded">
        <button
          onClick={() => handleActiveWnsButton("Stocks")}
          className={`${
            activeWnsButton === "Stocks" && "bg-blue-800 text-white"
          } w-full rounded`}
        >
          Stocks
        </button>
        <button
          onClick={() => handleActiveWnsButton("News")}
          className={`${
            activeWnsButton === "News" && "bg-blue-800 text-white"
          } w-full rounded`}
        >
          News
        </button>
        <button
          onClick={() => handleActiveWnsButton("Weather")}
          className={`${
            activeWnsButton === "Weather" && "bg-blue-800 text-white"
          } w-full rounded`}
        >
          Weather
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4 ">
          {activeWnsButton === "Stocks" && (
            <Stocks wns={wns} symbols={symbols} />
          )}

          {activeWnsButton === "News" && (
            <News wns={wns} handleNewsUpdate={handleNewsUpdate} />
          )}
          {activeWnsButton === "Weather" && (
            <Weather wns={wns} handleWeatherUpdate={handleWeatherUpdate} />
          )}
        </div>
      </div>
    </>
  );
};

export default Updates;
