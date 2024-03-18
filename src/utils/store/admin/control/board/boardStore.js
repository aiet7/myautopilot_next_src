import { handleGetDBBoard } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useBoardStore = create((set, get) => ({
  board: null,

  durationOptions: {
    "15 Minutes": 15,
    "30 Minutes": 30,
    "45 Minutes": 45,
    "1 Hour": 60,
    "1 Hour 30 Minutes": 90,
    "2 Hours 30 Minutes": 150,
    "3 Hours 30 Minutes": 210,
    "4 Hours": 240,
  },

  intializeBoard: async () => {
    const userStore = useUserStore.getState();

    set({ board: null });

    if (userStore.user) {
      const board = await handleGetDBBoard(userStore.user.mspCustomDomain);

      set({ board: board });
    }
  },

  clearBoard: () => {
    set({
      board: null,
      durationOptions: {
        "15 Minutes": 15,
        "30 Minutes": 30,
        "45 Minutes": 45,
        "1 Hour": 60,
        "1 Hour 30 Minutes": 90,
        "2 Hours 30 Minutes": 150,
        "3 Hours 30 Minutes": 210,
        "4 Hours": 240,
      },
    });
  },
}));

export default useBoardStore;
