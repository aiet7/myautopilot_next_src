import { create } from "zustand";
import useInteractionStore from "../interaction/interactionsStore";
import useUiStore from "../ui/uiStore";
import useIntegrationsStore from "../admin/control/integrations/integrationsStore";

const useAssistantStore = create((set, get) => ({
  promptAssistantInput: "",
  activeAssistantTab: null,
  showProgress: true,
  isIntroScreen: false,
  assistantWidth: 400,
  assistantWidthOptions: [400, 700, 900],
  assistantWidthOpen: false,

  initializeAssistant: async (msp) => {
    const { activeUIAssistantTab, activeAssistantTab, isIntroScreen } = get();
    const { initializeMSPIntegrations } = useIntegrationsStore.getState();
    const integrations = await initializeMSPIntegrations(msp);

    if (isIntroScreen) {
      set({
        activeUIAssistantTab: "",
        activeAssistantTab: "",
      });
    } else if (!activeUIAssistantTab && !activeAssistantTab) {
      if (integrations?.connectWiseManageIntegrator) {
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
    }
  },

  setAssistantWidth: (width) => {
    const { handleCloseNavWhenResizing } = useUiStore.getState();
    set({ assistantWidth: width });
    handleCloseNavWhenResizing();
  },

  setAssistantWidthOpen: (open) => set({ assistantWidthOpen: open }),

  setCloseExternalApps: () => set({ activeAssistantTab: null }),

  handleAdjustAssistantWidth: () => {
    set({
      assistantWidth: 50,
    });
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
      activeAssistantTab: null,
      showProgress: true,
      isIntroScreen: false,
      assistantWidth: 400,
      assistantWidthOptions: [400, 700, 900],
      assistantWidthOpen: false,
    });
  },
}));

export default useAssistantStore;
