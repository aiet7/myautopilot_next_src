import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useIntegrationsStore = create((set, get) => ({
  selectedCategory: null,
  activeIntegrationsCard: "cards",
  cards: [
    {
      type: "image",
      value: "/images/logo-Automate.png",
      category: "RMM",
      view: "automate",
    },
    {
      type: "image",
      value: "/images/logo-Connectwise.png",
      category: "PSA",
      view: "connectwise",
    },
    {
      type: "image",
      value: "/images/logo-Office365.png",
      category: "SUITE",
      view: "office365",
    },
    {
      type: "image",
      value: "/images/logo-GoogleWS.png",
      category: "SUITE",
      view: "googlews",
    },
    {
      type: "image",
      value: "/images/logo-Nablermm.png",
      category: "RMM",
      view: "nablermm",
    },
    {
      type: "image",
      value: "/images/logo-NCentral.png",
      category: "RMM",
      view: "ncentral",
    },
    {
      type: "image",
      value: "/images/logo-Continuum.png",
      category: "RMM",
      view: "continuum",
    },
    {
      type: "image",
      value: "/images/logo-AEM.png",
      category: "RMM",
      view: "aem",
    },
    {
      type: "image",
      value: "/images/logo-Autotask.png",
      category: "PSA",
      view: "autotask",
    },
    {
      type: "image",
      value: "/images/logo-ScreenConnect.png",
      category: "RMM",
      view: "screenconnect",
    },

    {
      type: "image",
      value: "/images/logo-OpenAI.png",
      category: "AI",
      view: "openai",
    },
  ],
  filteredCards: [],
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setFilteredCards: (filtered) =>
    set((state) => ({ ...state, filteredCards: filtered })),

  handleIntegrationsCard: (view, navigator) => {
    const userStore = useUserStore.getState();
    switch (view) {
      case "automate":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/automate`
        );
        break;
      case "connectwise":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/connectwise`
        );
        break;
      case "office365":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/office365`
        );
        break;
      case "googlews":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/googlews`
        );
        break;
      case "nablermm":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/nablermm`
        );
        break;
      case "ncentral":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/ncentral`
        );
        break;
      case "continuum":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/continuum`
        );
        break;
      case "aem":
        navigator(`/dashboard/${userStore.user.id}/admin/integrations/aem`);
        break;
      case "autotask":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/autotask`
        );
        break;
      case "screenconnect":
        navigator(
          `/dashboard/${userStore.user.id}/admin/integrations/screenconnect`
        );
        break;
      case "openai":
        navigator(`/dashboard/${userStore.user.id}/admin/integrations/openai`);
        break;
      default:
        navigator(`/dashboard/${userStore.user.id}/admin/integrations`);
        break;
    }

    set({ activeIntegrationsCard: view });
  },
}));

export default useIntegrationsStore;
