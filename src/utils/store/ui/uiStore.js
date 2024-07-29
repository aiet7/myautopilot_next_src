import { create } from "zustand";
import useQueueStore from "../interaction/queue/queueStore";
import useAssistantStore from "../assistant/assistantStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;

const useUiStore = create((set, get) => ({
  height: null,
  activeTab: null,
  options: ["Tickets", "Queue", "Engineer", "Settings"],
  queueSubOptions: ["Queue Tickets", "Activities", "Workspace"],
  currentQueueNavOption: null,
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

  setActiveTab: (tab) => set({ activeTab: tab }),

  setHeight: (heightValue) => set({ height: heightValue }),

  setShowQueueSubMenu: (show) => set({ showQueueSubMenu: show }),

  handleToggleAssistant: () =>
    set((state) => ({ openAssistant: !state.openAssistant })),
  handleToggleAdmin: () => set((state) => ({ openAdmin: !state.openAdmin })),
  handleToggleNav: () => set((state) => ({ openAdmin: !state.openNav })),
  handleToggleSettings: (toggle) => set({ openSettings: toggle }),
  handleToggleQueueSubMenu: (toggle) => set({ showQueueSubMenu: toggle }),

  handleOptionSelected: (option) => {
    const {
      openNav,
      openAssistant,
      showQueueSubMenu,
      handleAssistantMenu,
      handleNavMenu,
    } = get();

    if (!openAssistant) {
      handleAssistantMenu();
    }

    if (!openNav) {
      handleNavMenu();
    }

    if (option === "Queue") {
      set({
        showQueueSubMenu: !showQueueSubMenu,
      });
    } else {
      set({
        currentNavOption: option,
        currentQueueNavOption: null,
        showQueueSubMenu: false,
      });
    }
  },

  handleQueueSubOptionSelected: async (
    subOption,
    mspCustomDomain,
    tier,
    techId
  ) => {
    const {
      myQueueTicket,
      handleShowMyActivities,
      handleShowAllQueueTickets,
      handleNextQueueTicket,
    } = useQueueStore.getState();

    set({
      currentNavOption: "Queue",
      currentQueueNavOption: subOption,
      showQueueSubMenu: false,
    });

    if (subOption === "Activities") {
      await handleShowMyActivities(mspCustomDomain, techId);
    }

    if (subOption === "Queue Tickets") {
      await handleShowAllQueueTickets(mspCustomDomain);
    }

    if (subOption === "Workspace") {
      if (!myQueueTicket) {
        await handleNextQueueTicket(mspCustomDomain, tier, techId);
      }
    }
  },

  handleNavMenu: () => {
    const { assistantWidth, handleAdjustAssistantWidth } =
      useAssistantStore.getState();
    const { openAdmin, openNav } = get();

    if (assistantWidth === 75) {
      handleAdjustAssistantWidth();
    }

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

  handleTabChange: (tab) => {
    const { activeTab } = get();

    if (tab === activeTab) {
      return;
    }

    set({ activeTab: tab });
  },

  handleCloseNavWhenResizing: () => {
    set({
      openNav: false,
    });
  },

  clearUI: () => {
    set({
      height: null,
      activeTab: null,
      hoverTab: null,
      options: ["Tickets", "Queue", "Engineer", "Settings"],
      queueSubOptions: ["Queue Tickets", "Activities", "Workspace"],
      currentQueueNavOption: null,
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
