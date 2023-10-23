import { create } from "zustand";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;

const useUiStore = create((set, get) => ({
  height: null,
  activeTab: null,
  hoverTab: null,
  openHistory: initialWidth > 1023 ? true : false,
  openAssistant: initialWidth > 1023 ? true : false,
  openDocs: initialWidth > 1023 ? true : false,
  openAdmin: initialWidth > 1023 ? true : false,
  openSettings: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setHoverTab: (tab) => set({ hoverTab: tab }),

  setHeight: (heightValue) => set({ height: heightValue }),

  handleToggleHistory: () =>
    set((state) => ({ openHistory: !state.openHistory })),
  handleToggleAssistant: () =>
    set((state) => ({ openAssistant: !state.openAssistant })),
  handleToggleDocs: () => set((state) => ({ openDocs: !state.openDocs })),
  handleToggleAdmin: () => set((state) => ({ openAdmin: !state.openAdmin })),
  handleToggleSettings: (toggle) => set({ openSettings: toggle }),

  handleHistoryMenu: () => {
    const { openHistory, openDocs, openAdmin } = get();

    if (openHistory) {
      set({ openHistory: false });
    } else set({ openHistory: true });

    if (openDocs) {
      set({ openDocs: false });
    } else set({ openDocs: true });
    if (openAdmin) {
      set({ openAdmin: false });
    } else set({ openAdmin: true });
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

    if (tab === "iTAgent" && activeTab === "iTAgent") {
      return;
    }
    set({ activeTab: tab, hoverTab: null });
  },
}));

export default useUiStore;
