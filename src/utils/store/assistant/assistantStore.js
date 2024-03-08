import { create } from "zustand";
import useInteractionStore from "../interaction/interactionsStore";
import useUiStore from "../ui/uiStore";
import useIntegrationsStore from "../admin/control/integrations/integrationsStore";

const useAssistantStore = create((set, get) => ({
  promptAssistantInput: "",
  activeUIAssistantTab: "Tickets",
  activeAssistantTab: "Tickets",
  showProgress: true,

  initializeAssistant: async (msp) => {
    const { initializeIntegrations } = useIntegrationsStore.getState();
    const integrations = await initializeIntegrations(msp);
    if (integrations.connectWiseManageIntegrator) {
      set({
        activeUIAssistantTab: "Tickets",
        activeAssistantTab: "Tickets",
      });
    } else {
      set({
        activeUIAssistantTab: "Engineer",
        activeAssistantTab: "Engineer",
      });
    }
  },

  handleShowProgress: () => {
    const { showProgress } = get();
    set({ showProgress: !showProgress });
  },

  handlePromptAssistantInput: (prompt) => {
    set({
      promptAssistantInput: "",
    });
    setTimeout(() => {
      set({
        promptAssistantInput: prompt,
      });
      useInteractionStore.setState({ userInput: prompt });
    }, 0);
  },

  handleUIAssistantTabChange: (tab) => {
    const { openAssistant, handleAssistantMenu } = useUiStore.getState();
    if (!openAssistant) {
      handleAssistantMenu();
    }
    set({ activeUIAssistantTab: tab });
  },

  handleAssistantTabChange: (tab) => {
    const { openAssistant, handleAssistantMenu } = useUiStore.getState();
    if (!openAssistant) {
      handleAssistantMenu();
    }

    set({ activeAssistantTab: tab });
  },

  clearAssistant: () => {
    set({
      promptAssistantInput: "",
      activeUIAssistantTab: "Tickets",
      activeAssistantTab: "Tickets",
      showProgress: true,
    });
  },
}));

export default useAssistantStore;
