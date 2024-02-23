import { handleGetManageDBClients } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useCompaniesStore = create((set, get) => ({
  companies: null,

  initializeCompanies: async () => {
    const userStore = useUserStore.getState();
    set({ companies: null });

    if (userStore.user) {
      const newCompanies = await handleGetManageDBClients(
        userStore.user.mspCustomDomain
      );
      set({ companies: newCompanies });
    }
  },

  clearCompanies: () => {
    set({ companies: null });
  },
}));

export default useCompaniesStore;
