import { handleGetIntegrations } from "@/utils/api/serverProps";
import { create } from "zustand";

const useIntegrationsStore = create((set, get) => ({
  integrations: null,
  selectedCategory: null,
  activeIntegrationsCard: "cards",
  mspCards: [
    {
      type: "image",
      value: "/images/logo-Automate.png",
      category: "RMM",
      view: "automate",
      description:
        "Perform endpoint management, remote monitoring and IT automation.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-Connectwise.png",
      category: "PSA",
      view: "connectwise",
      description: "Manage contacts, tasks, tickets and more within CW Manage.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-Office365.png",
      category: "SUITE",
      view: "office365",
      description:
        "Access data and perform actions in numerous Microsoft 365 products using the Graph API.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-GoogleWS.png",
      category: "SUITE",
      view: "googlews",
      description:
        "Integrate with Google Workspace for streamlined access to Google services like Gmail, Drive, and Calendar.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-Nablermm.png",
      category: "RMM",
      view: "nablermm",
      description:
        "Centralized management for IT infrastructure, offering robust monitoring and automated maintenance.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-NCentral.png",
      category: "RMM",
      view: "ncentral",
      description:
        "Enhanced remote management and monitoring solution designed to optimize IT network performance.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-Continuum.png",
      category: "RMM",
      view: "continuum",
      description:
        "Deliver proactive IT services with advanced RMM tools and integrated backup and disaster recovery solutions.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-AEM.png",
      category: "RMM",
      view: "aem",
      description:
        "Comprehensive endpoint management with a focus on automation and security.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-Autotask.png",
      category: "PSA",
      view: "autotask",
      description:
        "Streamline service delivery with unified ticketing, billing, and project management.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-ScreenConnect.png",
      category: "RMM",
      view: "screenconnect",
      description:
        "Facilitate remote support and access with secure, reliable screen sharing capabilities.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-OpenAI.png",
      category: "AI",
      view: "openai",
      description:
        "Leverage advanced AI models for natural language processing, machine learning, and data analysis.",
      isHovered: false,
    },
  ],

  clientCards: [
    {
      type: "image",
      value: "/images/logo-Office365.png",
      category: "SUITE",
      view: "office365",
      description:
        "Access data and perform actions in numerous Microsoft 365 products using the Graph API.",
      isHovered: false,
    },
    {
      type: "image",
      value: "/images/logo-GoogleWS.png",
      category: "SUITE",
      view: "googlews",
      description:
        "Integrate with Google Workspace for streamlined access to Google services like Gmail, Drive, and Calendar.",
      isHovered: false,
    },
  ],

  initializeIntegrations: async (msp) => {
    set({ integrations: null });
    const newIntegrations = await handleGetIntegrations(msp);
    set({ integrations: newIntegrations });
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  handleDescriptionOverlay: (view, hover, isMSP) => {
    set((state) => {
      const cardsKey = isMSP ? "mspCards" : "clientCards";
      const updatedCards = state[cardsKey].map((card) =>
        card.view === view ? { ...card, isHovered: hover } : card
      );
      return { ...state, [cardsKey]: updatedCards };
    });
  },

  handleIntegrationsCard: (view, isMSP) => {
    set((state) => {
      const cardsKey = isMSP ? "mspCards" : "clientCards";
      const updatedCards = state[cardsKey].map((card) => ({
        ...card,
        isHovered: false,
      }));
      return {
        ...state,
        activeIntegrationsCard: view,
        [cardsKey]: updatedCards,
      };
    });
  },

  handleUpdateIntegrations: (updatedIntegrations) => {
    set({ integrations: updatedIntegrations });
  },

  clearIntegration: () => {
    set({
      integrations: null,
      selectedCategory: null,
      activeIntegrationsCard: "cards",
    });
  },
}));

export default useIntegrationsStore;
