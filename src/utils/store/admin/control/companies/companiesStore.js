import { handleGetManageDBClients } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useCompaniesStore = create((set, get) => ({
  companies: null,
  companyDetails: null,

  viewDetails: false,

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

  setViewDetails: (view) => {
    set({ viewDetails: view, companyDetails: null });
  },

  handleViewDetails: async (mspCustomDomain, companyId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsersOfEachClient?clientId=${companyId}`
      );

      if (response.status === 200) {
        const details = await response.json();
        console.log("Viewing Details!");
        set({
          companyDetails: details,
          viewDetails: true,
        });
      } else {
        console.log("Viewing Details Failed!");
        set({
          viewDetails: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearCompanies: () => {
    set({
      companies: null,
      companyDetails: null,
      viewDetails: false,
    });
  },
}));

export default useCompaniesStore;
