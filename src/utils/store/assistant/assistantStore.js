import { create } from "zustand";
import useInteractionStore from "../interaction/interactionsStore";
import useUiStore from "../ui/uiStore";
import useIntegrationsStore from "../admin/control/integrations/integrationsStore";

const useAssistantStore = create((set, get) => ({
  isResizing: false,
  assistantMenuOpen: false,
  promptAssistantInput: "",
  activeAssistantTab: null,
  activeAssistantTabOpen: false,
  showProgress: true,
  isIntroScreen: false,
  assistantWidth: 600,
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

  setIsResizing: (value) => set({ isResizing: value }),

  setAssistantMenuOpen: (open) => set({ assistantMenuOpen: open }),

  setAssistantWidth: (width) => {
    set({ assistantWidth: width });
  },

  setCloseExternalApps: () =>
    set({ activeAssistantTab: null, activeAssistantTabOpen: false }),

  handleToggleResizeMenus: (toggle) => {
    set({
      assistantWidthOpen: toggle,
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

    set({ activeAssistantTab: tab, activeAssistantTabOpen: true });
  },

  clearAssistant: () => {
    set({
      assistantMenuOpen: false,
      promptAssistantInput: "",
      activeAssistantTab: null,
      activeAssistantTabOpen: false,
      showProgress: true,
      isIntroScreen: false,
      assistantWidth: 400,
      assistantWidthOpen: false,
    });
  },
}));

export default useAssistantStore;
