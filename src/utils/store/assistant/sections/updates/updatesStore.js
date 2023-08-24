import { handleWnsData } from "@/utils/api/wns";
import { create } from "zustand";
import useUserStore from "@/utils/store/user/userStore";
import { generalUpdates } from "../../../../../utils/prompts/generalPromptLibrary";

const useUpdatesStore = create((set, get) => ({
  userNewsInput: "",
  userWeatherInput: "",

  generalUpdates: generalUpdates,
  wns: {
    initialStocks: null,
    initialNews: null,
    initialWeather: null,
  },
  activeWnsButton: "Stocks",
  symbols: ["GOOGL", "AAPL", "MSFT", "META", "NVDA"],
  locationNews: "New York",
  locationWeather: "",

  setUserNewsInput: (input) => set({ userNewsInput: input }),
  setUserWeatherInput: (input) => set({ userWeatherInput: input }),

  initializeWns: async () => {
    const userStore = useUserStore.getState();

    const { symbols, locationNews, locationWeather } = get();
    try {
      const response = await handleWnsData(
        symbols,
        locationNews,
        locationWeather || userStore.user.address.zipcode
      );
      set({ wns: response });
    } catch (e) {
      console.log(e);
    }
  },

  handleActiveWnsButton: (button) => {
    set({ activeWnsButton: button });
  },

  handleNewsUpdate: (newNews) => {
    set({ locationNews: newNews });
  },

  handleWeatherUpdate: (newWeather) => {
    set({ locationWeather: newWeather });
  },
}));

export default useUpdatesStore;
