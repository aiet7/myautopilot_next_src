import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import useAssistantStore from "../assistant/assistantStore";
import useConversationStore from "../interaction/conversations/conversationsStore";

const useLocalStorageStore = create((set, get) => ({
  getStorage: () => {
    const lastTab = localStorage.getItem("lastTab");
    const lastAssistantTab = localStorage.getItem("lastAssistantTab");
    const lastConversationIndicesString = localStorage.getItem(
      "lastConversationIndices"
    );

    const lastConversationIndices = lastConversationIndicesString
      ? JSON.parse(lastConversationIndicesString)
      : null;

    useUiStore.setState({ activeTab: lastTab || "iTAgent" });
    useAssistantStore.setState({
      activeAssistantButton: lastAssistantTab || "Tickets",
    });
    useConversationStore.setState({
      currentConversationIndices: lastConversationIndices || {},
    });
  },

  saveStorage: () => {
    const { activeTab } = useUiStore.getState();
    const { activeAssistantButton } = useAssistantStore.getState();
    const { currentConversationIndices } = useConversationStore.getState();

    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem("lastAssistantTab", activeAssistantButton);
    localStorage.setItem(
      "lastConversationIndices",
      JSON.stringify(currentConversationIndices)
    );
  },

  clearStorage: () => {
    localStorage.removeItem("lastTab");
    localStorage.removeItem("lastAssistantTab");
    localStorage.removeItem("lastConversationIndices");
  },
}));

export default useLocalStorageStore;
