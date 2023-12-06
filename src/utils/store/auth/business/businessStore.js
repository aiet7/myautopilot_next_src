import { create } from "zustand";

const useBusinessStore = create((set, get) => ({
  activeBusinessFormTab: "Technician",

  handleBusinessFormChange: (tab) => {
    set({ activeBusinessFormTab: tab });
  },
}));

export default useBusinessStore;
