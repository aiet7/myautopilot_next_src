import { create } from "zustand";
import useQueueStore from "../interaction/queue/queueStore";
import useConversationStore from "../interaction/conversations/conversationsStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;

const useUiStore = create((set, get) => ({
  hoverTab: null,

  height: null,
  activeTab: null,
  options: ["Tickets", "Dispatch", "Assistant", "Settings"],
  currentNavOption: null,
  showQueueSubMenu: false,
  openHistory: initialWidth > 1023 ? true : false,
  openAssistant: initialWidth > 1023 ? true : false,
  openDocs: initialWidth > 1023 ? true : false,
  openAdmin: initialWidth > 1023 ? true : false,
  openTickets: initialWidth > 1023 ? true : false,
  openQueue: initialWidth > 1023 ? true : false,
  openNav: initialWidth > 1023 ? true : false,
  openSettings: false,
  activeMenu: true,
  tabOpen: false,
  tabView: null,
  externalOnly: false,

  setHoverTab: (tab) => {
    set({ hoverTab: tab });
  },

  setExternalOnly: (value) => set({ externalOnly: value }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setHeight: (heightValue) => set({ height: heightValue }),

  setCurrentNavOption: (option) => set({ currentNavOption: option }),

  handleToggleAssistant: () =>
    set((state) => ({ openAssistant: !state.openAssistant })),
  handleToggleAdmin: () => set((state) => ({ openAdmin: !state.openAdmin })),
  handleToggleNav: () => set((state) => ({ openAdmin: !state.openNav })),
  handleToggleSettings: (toggle) => set({ openSettings: toggle }),

  handleOptionSelected: async (option, mspCustomDomain) => {
    const { openNav, openAssistant, handleAssistantMenu, handleNavMenu } =
      get();

    const { activeQueueBotMode, handleShowAllQueueTickets } =
      useQueueStore.getState();

    const { setCurrentConversationIndex } = useConversationStore.getState();

    if (!openAssistant) {
      handleAssistantMenu();
    }

    if (!openNav) {
      handleNavMenu();
    }

    set({
      currentNavOption: option,
    });

    window.history.pushState({ option }, "", `#${option.toLowerCase()}`);

    if (option === "Dispatch" && activeQueueBotMode === "All Queue Tickets") {
      await handleShowAllQueueTickets(mspCustomDomain);
    }

    if (option === "Assistant") {
      setCurrentConversationIndex(null);
    }
  },

  handleActiveMenu: () => {
    set((state) => ({
      activeMenu: !state.activeMenu,
    }));
  },

  handleTabOpen: () => {
    set((state) => ({
      tabOpen: !state.tabOpen,
    }));
  },

  handleNavMenu: () => {
    const { openAdmin, openNav } = get();

    if (openAdmin) {
      set({ openAdmin: false });
    } else set({ openAdmin: true });

    if (openNav) {
      set({ openNav: false });
    } else set({ openNav: true });
  },

  handleAssistantMenu: () => {
    const { openAssistant } = get();

    if (openAssistant) {
      set({ openAssistant: false });
    } else {
      set({ openAssistant: true });
    }
  },

  handleTabView: (tab) => {
    set({ tabView: tab });
  },

  handleTabChange: (tab) => {
    set({ activeTab: tab });
  },

  clearUI: () => {
    set({
      height: null,
      activeTab: null,
      options: ["Tickets", "Dispatch", "Assistant", "Settings"],
      currentNavOption: "Tickets",
      showQueueSubMenu: false,
      openHistory: initialWidth > 1023 ? true : false,
      openAssistant: initialWidth > 1023 ? true : false,
      openDocs: initialWidth > 1023 ? true : false,
      openAdmin: initialWidth > 1023 ? true : false,
      openTickets: initialWidth > 1023 ? true : false,
      openQueue: initialWidth > 1023 ? true : false,
      openNav: initialWidth > 1023 ? true : false,
      openSettings: false,
    });
  },
}));

export default useUiStore;
