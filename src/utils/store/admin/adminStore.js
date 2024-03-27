import { create } from "zustand";

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
    const { currentOption } = get();
    if (option === currentOption) {
      return;
    }

    set({ currentOption: option });
  },
}));

export default useAdminStore;
