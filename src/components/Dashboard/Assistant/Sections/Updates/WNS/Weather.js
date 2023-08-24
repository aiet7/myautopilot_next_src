"use client";

import { convertKelvinToFahrenheit } from "../../../../../../utils/conversions";
import useUpdatesStore from "@/utils/store/assistant/sections/updates/updatesStore";

const Weather = ({}) => {
  const { wns, userWeatherInput, setUserWeatherInput, handleWeatherUpdate } =
    useUpdatesStore();
  const {
    initialWeather: { main, weather, name, code },
  } = wns;

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col">
        <input
          value={userWeatherInput}
          className="p-1"
          placeholder="Zipcode"
          onChange={(e) => setUserWeatherInput(e.target.value)}
        />
        <button
          onClick={() => handleWeatherUpdate(userWeatherInput)}
          className="p-1 bg-blue-800 text-white"
        >
          Search
        </button>
      </div>
      {code !== 500 ? (
        <div className="dark:shadow-white/40 dark:shadow-md border shadow-black/20 shadow-md p-1">
          <p>{name}</p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="font-bold text-xl">{weather[0]?.main}</p>
            </div>
            <p className="text-2xl">{convertKelvinToFahrenheit(main.temp)}</p>
          </div>
          <p>High: {convertKelvinToFahrenheit(main.temp_max)}</p>
          <p>Low: {convertKelvinToFahrenheit(main.temp_min)}</p>
        </div>
      ) : (
        <p className="text-red-600 text-sm">Zipcode not found.</p>
      )}
    </div>
  );
};

export default Weather;
