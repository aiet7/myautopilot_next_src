import { create } from "zustand";
import useUserStore from "../user/userStore";
const useAdminStore = create((set, get) => ({
  options: [
    "Internal",
    "Roles",
    "Integrations",
    "Branding",
    "Companies",
    "Workflows",
  ],
  currentOption: "Internal",

  handleOptionSelected: (option, navigator) => {
    const userStore = useUserStore.getState();

    const { currentOption } = get();
    if (option === currentOption) {
      return;
    }

    const baseUrl = `/dashboard/${userStore.user.id}/admin/`;

    switch (option) {
      case "Internal":
        navigator(`${baseUrl}internal`, undefined, { shallow: true });
        break;
      case "Roles":
        navigator(`${baseUrl}roles`, undefined, { shallow: true });
        break;
      case "Integrations":
        navigator(`${baseUrl}integrations`, undefined, { shallow: true });
        break;
      case "Branding":
        navigator(`${baseUrl}branding`, undefined, { shallow: true });
        break;
      case "Companies":
        navigator(`${baseUrl}companies`, undefined, { shallow: true });
        break;
      case "Workflows":
        navigator(`${baseUrl}workflows`, undefined, { shallow: true });
        break;
    }

    set({ currentOption: option });
  },
}));

export default useAdminStore;
