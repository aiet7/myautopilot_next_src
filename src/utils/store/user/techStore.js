import { handleGetTech } from "@/utils/api/serverProps";
import { create } from "zustand";
import useMspStore from "../auth/msp/mspStore";
import useLocalStorageStore from "../localstorage/localStorageStore";
import useCookiesStore from "../cookies/cookiesStore";
import useTicketConversationsStore from "../interaction/conversations/ticketConversationsStore";
import useEngineerStore from "../assistant/sections/iternal/engineer/engineerStore";

const useTechStore = create((set, get) => ({
  tech: null,

  initializeTech: async (msp, id) => {
    const { getUser, saveUser } = useLocalStorageStore.getState();

    const storedTech = getUser();

    if (storedTech && storedTech.id === id) {
      set({ tech: storedTech });
    } else if (msp && id) {
      const initialTech = await handleGetTech(msp, id);
      set({
        tech: initialTech,
      });
      saveUser(initialTech);
    }
  },

  handleLogout: async () => {
    const { clearMSPCredentials } = useMspStore.getState();
    const { clearStorage } = useLocalStorageStore.getState();
    const { clearCookies } = useCookiesStore.getState();
    const { clearInteraction } = useTicketConversationsStore.getState();
    const { clearEngineer } = useEngineerStore.getState();
    set({ tech: null });

    clearMSPCredentials();
    clearStorage();
    clearCookies();
    clearInteraction();
    clearEngineer();
  },
}));

export default useTechStore;
