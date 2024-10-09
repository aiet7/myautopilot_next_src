import { handleGetDBBoard } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useBoardStore = create((set, get) => ({
  boards: null,
  searchValue: "",
  selectedBoard: null,

  intializeBoard: async () => {
    const userStore = useUserStore.getState();

    set({ boards: null });

    if (userStore.user) {
      const boards = await handleGetDBBoard(userStore.user.mspCustomDomain);

      set({ boards: boards, selectedBoard: null });
    }
  },

  setSelectedBoard: (board) => set({ selectedBoard: board }),
  setSearchValue: (value) => set({ searchValue: value }),

  clearBoard: () => {
    set({
      boards: null,
      searchValue: "",
      selectedBoard: null,
    });
  },
}));

export default useBoardStore;
