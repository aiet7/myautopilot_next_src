import { create } from "zustand";
import useUserStore from "@/utils/store/user/userStore";
import { handleGetDBTeams } from "@/utils/api/serverProps";

const useTeamsStore = create((set) => ({
  teams: null,
  searchValue: "",
  currentTeam: null,

  initializeTeams: async () => {
    const userStore = useUserStore.getState();

    set({ teams: null, currentTeam: null });

    if (userStore.user) {
      const newTeams = await handleGetDBTeams(userStore.user.mspCustomDomain);
      set({ teams: newTeams });
    }
  },

  setCurrentTeam: (team) => set({ currentTeam: team }),
  setSearchValue: (value) => set({ searchValue: value }),

  clearTeams: () =>
    set({
      teams: null,
      searchValue: "",
      currentTeam: null,
    }),
}));

export default useTeamsStore;
