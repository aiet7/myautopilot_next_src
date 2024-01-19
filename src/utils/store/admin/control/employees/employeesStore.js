import { create } from "zustand";
import useTechStore from "@/utils/store/user/techStore";
import { handleGetManageDBContacts } from "@/utils/api/serverProps";

const useEmployeesStore = create((set, get) => ({
  employees: null,

  initializeEmployees: async () => {
    const techStore = useTechStore.getState();
    set({ employees: null });

    if (techStore.tech) {
      const newEmployees = await handleGetManageDBContacts(
        techStore.tech.mspCustomDomain
      );
      set({ employees: newEmployees });
    }
  },
}));

export default useEmployeesStore;
