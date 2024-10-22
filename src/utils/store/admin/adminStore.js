import { create } from "zustand";
import useUserStore from "../user/userStore";
import useUiStore from "../ui/uiStore";

const useAdminStore = create((set, get) => ({
  options: [
    "employees",
    "roles",
    "msp-integrations",
    "client-integrations",
    "branding",
    "companies",
    "contacts",
    "board",
    "teams",
  ],
  currentOption: null,

  setCurrentOption: (option) => set({ currentOption: option }),

  handleOptionSelected: (option) => {
    const userStore = useUserStore.getState();
    const { setActiveTab } = useUiStore.getState();
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
      companies: "technicianUserManagement",
      contacts: "technicianUserManagement",
      teams: "technicianUserManagement",
    };

    if (
      option === "contacts"
        ? !userStore.user.permissions[permissionMap[option]]
        : userStore.user.permissions[permissionMap[option]]
    ) {
      set({ currentOption: option });
      setActiveTab("admin");
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
        "contacts",
        "board",
        "teams",
      ],
      currentOption: null,
    });
  },
}));

export default useAdminStore;
