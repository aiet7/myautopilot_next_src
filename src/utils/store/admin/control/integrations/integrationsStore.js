import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useIntegrationsStore = create((set, get) => ({
  selectedCategory: null,
  activeIntegrationsCard: "cards",
  cards: [
    {
      type: "image",
      value: "/logo-Automate.png",
      category: "RMM",
      view: "automate",
    },
    {
      type: "image",
      value: "/logo-Connectwise.png",
      category: "PSA",
      view: "connectwise",
    },
    {
      type: "image",
      value: "/logo-Office365.png",
      category: "SUITE",
      view: "office365",
    },
    {
      type: "image",
      value: "/logo-GoogleWS.png",
      category: "SUITE",
      view: "googlews",
    },
    {
      type: "image",
      value: "/logo-Nablermm.png",
      category: "RMM",
      view: "nablermm",
    },
    {
      type: "image",
      value: "/logo-NCentral.png",
      category: "RMM",
      view: "ncentral",
    },
    {
      type: "image",
      value: "/logo-Continuum.png",
      category: "RMM",
      view: "continuum",
    },
    {
      type: "image",
      value: "/logo-AEM.png",
      category: "RMM",
      view: "aem",
    },
    {
      type: "image",
      value: "/logo-Autotask.png",
      category: "PSA",
      view: "autotask",
    },
    {
      type: "image",
      value: "/logo-ScreenConnect.png",
      category: "RMM",
      view: "screenconnect",
    },

    {
      type: "image",
      value: "/logo-OpenAI.png",
      category: "AI",
      view: "openai",
    },
  ],
  filteredCards: [],
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setFilteredCards: (filtered) =>
    set((state) => ({ ...state, filteredCards: filtered })),

  handleIntegrationsCard: (view) => {
    set({ activeIntegrationsCard: view });
  },
}));

export default useIntegrationsStore;
