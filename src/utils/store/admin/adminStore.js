import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  options: ["Internal", "Roles", "Integrations", "Branding", "Companies"],
  currentOption: "Internal",

  handleOptionSelected: (option) => {
    set({ currentOption: option });
  },
}));

export default useAdminStore;
