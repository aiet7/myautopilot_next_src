import { create } from "zustand";
import useUserStore from "../user/userStore";
const useAdminStore = create((set, get) => ({
  options: ["Internal", "Roles", "Integrations", "Branding", "Companies"],
  currentOption: "Internal",

  handleOptionSelected: (option, navigator) => {
    const userStore = useUserStore.getState();

    const { currentOption } = get();
    if (option === currentOption) {
      return;
    }

    switch (option) {
      case "Internal":
        navigator(`/dashboard/${userStore.user.id}/admin/internal`);
        break;
      case "Roles":
        navigator(`/dashboard/${userStore.user.id}/admin/roles`);
        break;
      case "Integrations":
        navigator(`/dashboard/${userStore.user.id}/admin/integrations`);
        break;
      case "Branding":
        navigator(`/dashboard/${userStore.user.id}/admin/branding`);
        break;
      case "Companies":
        navigator(`/dashboard/${userStore.user.id}/admin/companies`);
        break;
    }

    set({ currentOption: option });
  },
}));

export default useAdminStore;
