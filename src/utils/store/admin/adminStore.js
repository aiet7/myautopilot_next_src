import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  options: ["internal", "roles", "integrations", "branding", "companies"],
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
