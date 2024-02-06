import { create } from "zustand";
import useTechStore from "@/utils/store/user/techStore";
import { handleGetManageDBTechnicians } from "@/utils/api/serverProps";

const useEmployeesStore = create((set, get) => ({
  employees: null,

  initializeEmployees: async () => {
    const techStore = useTechStore.getState();
    set({ employees: null });

    if (techStore.tech) {
      const newEmployees = await handleGetManageDBTechnicians(
        techStore.tech.mspCustomDomain
      );
      set({ employees: newEmployees });
    }
  },
}));

export default useEmployeesStore;
