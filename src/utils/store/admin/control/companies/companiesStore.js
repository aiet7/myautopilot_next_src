import { handleGetManageDBClients } from "@/utils/api/serverProps";
import useTechStore from "@/utils/store/user/techStore";
import { create } from "zustand";

const useCompaniesStore = create((set, get) => ({
  companies: null,

  initializeCompanies: async () => {
    const techStore = useTechStore.getState();
    set({ companies: null });

    if (techStore.tech) {
      const newCompanies = await handleGetManageDBClients(
        techStore.tech.mspCustomDomain
      );
      set({ companies: newCompanies });
    }
  },
}));

export default useCompaniesStore;
