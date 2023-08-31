import { create } from "zustand";
import useInteractionStore from "../interaction/interactionsStore";
import useUiStore from "../ui/uiStore";

const useAssistantStore = create((set, get) => ({
  promptAssistantInput: "",
  activeAssistantButton: "Engineer",

  handlePromptAssistantInput: (prompt) => {
    const { handleToggleAssistant } = useUiStore.getState();
    set({
      promptAssistantInput: "",
    });
    setTimeout(() => {
      set({
        promptAssistantInput: prompt,
      });
      useInteractionStore.setState({ userInput: prompt });
      handleToggleAssistant(false);
    }, 0);
  },

  handleAssistantTabChange: (tab) => {
    const { openAssistant, handleToggleAssistant } = useUiStore.getState();
    if (!openAssistant) {
      handleToggleAssistant(true);
    }
    set({ activeAssistantButton: tab });
  },
}));

export default useAssistantStore;
