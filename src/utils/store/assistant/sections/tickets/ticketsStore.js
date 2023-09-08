import { create } from "zustand";
import { handleGetTickets } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";

const useTicketsStore = create((set, get) => ({
  tickets: [],
  activeTicketButton: "In Progress",

  initializeTickets: async () => {
    const userStore = useUserStore.getState();
    if (userStore.user) {
      const tickets = await handleGetTickets(userStore.user.id);
      set({ tickets });
    }
  },

  setActiveTicketButton: (button) => set({ activeTicketButton: button }),
}));

export default useTicketsStore;
