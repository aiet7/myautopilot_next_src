import { create } from "zustand";
import useUserStore from "../user/userStore";

const useAdminStore = create((set, get) => ({
  options: [
    "employees",
    "roles",
    "msp-integrations",
    "client-integrations",
    "branding",
    "companies",
    "board",
  ],
  currentOption: null,

  handleOptionSelected: (option) => {
    const userStore = useUserStore.getState();
    const { currentOption } = get();
    if (option === currentOption) {
      return;
    }
    const permissionMap = {
      employees: "technicianUserManagement",
      roles: "roleManagement",
      "msp-integrations": "mspIntegrations",
      "client-integrations": "clientIntegrations",
      branding: "mspBranding",
      board: "boardView",
      companies: "clientUserManagement",  
    };

    if (userStore.user.permissions[permissionMap[option]]) {
      set({ currentOption: option });
    }
  },

  clearAdmin: () => {
    set({
      options: [
        "employees",
        "roles",
        "msp-integrations",
        "client-integrations",
        "branding",
        "companies",
        "board",
      ],
      currentOption: null,
    });
  },
}));

export default useAdminStore;
