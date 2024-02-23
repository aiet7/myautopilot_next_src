import { create } from "zustand";
import useUserStore from "@/utils/store/user/userStore";
import { handleGetManageDBTechnicians } from "@/utils/api/serverProps";

const useEmployeesStore = create((set, get) => ({
  employees: null,

  initializeEmployees: async () => {
    const userStore = useUserStore.getState();
    set({ employees: null });

    if (userStore.user) {
      const newEmployees = await handleGetManageDBTechnicians(
        userStore.user.mspCustomDomain
      );
      set({ employees: newEmployees });
    }
  },

  clearEmployees: () => {
    set({
      employees: null,
    });
  },
}));

export default useEmployeesStore;
