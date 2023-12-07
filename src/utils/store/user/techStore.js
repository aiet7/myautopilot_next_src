import { handleGetTech } from "@/utils/api/serverProps";
import { create } from "zustand";

const useTechStore = create((set, get) => ({
  tech: null,

  initializeTech: async (msp, id) => {
    const initialTech = await handleGetTech(msp, id);
    set({
      tech: initialTech,
    });
  },

  handleLogout: async () => {
    set({ tech: null });
  },
}));

export default useTechStore;
