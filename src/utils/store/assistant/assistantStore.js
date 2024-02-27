import { create } from "zustand";
import useInteractionStore from "../interaction/interactionsStore";
import useUiStore from "../ui/uiStore";

const useAssistantStore = create((set, get) => ({
  promptAssistantInput: "",
  activeUIAssistantTab: "Tickets",
  activeAssistantTab: "Tickets",
  showProgress: true,

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
