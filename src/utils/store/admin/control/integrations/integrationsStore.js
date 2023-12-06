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
    {
      type: "image",
      value: "/images/logo-EmailConnecter.png",
      category: "EMAIL",
      view: "emailconnecter",
      description:
        "Efficient email integration tool for streamlined communication and workflow automation.",
      isHovered: false,
    },
  ],
  filteredCards: [],
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setFilteredCards: (filtered) =>
    set((state) => ({ ...state, filteredCards: filtered })),

  handleDescriptionOverlay: (index, hover) => {
    set((state) => {
      const newCards = state.cards.map((card) =>
        card.view === index ? { ...card, isHovered: hover } : card
      );
      return { ...state, cards: newCards };
    });
  },

  handleIntegrationsCard: (view) => {
    // const baseUrl = `/dashboard/${userStore.user.id}/admin/integrations/`;

    // switch (view) {
    //   case "automate":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "connectwise":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "office365":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "googlews":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "nablermm":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "ncentral":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "continuum":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "aem":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "autotask":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "screenconnect":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "openai":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   case "emailconnecter":
    //     navigator(`${baseUrl}${view}`, undefined, { shallow: true });
    //     break;
    //   default:
    //     navigator(baseUrl, undefined, { shallow: true });
    //     break;
    // }

    set((state) => ({
      ...state,
      activeIntegrationsCard: view,
      cards: state.cards.map((card) => ({ ...card, isHovered: false })),
    }));
  },
}));

export default useIntegrationsStore;