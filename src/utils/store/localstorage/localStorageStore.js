import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import useAssistantStore from "../assistant/assistantStore";

const useLocalStorageStore = create((set, get) => ({
  getStorage: () => {
    const lastTab = localStorage.getItem("lastTab");
    const lastAssistantTab = localStorage.getItem("lastAssistantTab");

    useUiStore.setState({ activeTab: lastTab || "iTAgent" });
    useAssistantStore.setState({
      activeAssistantButton: lastAssistantTab || "Tickets",
    });
  },

  saveStorage: () => {
    const { activeTab } = useUiStore.getState();
    const { activeAssistantButton } = useAssistantStore.getState();
    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem("lastAssistantTab", activeAssistantButton);
  },

  clearStorage: () => {
    localStorage.removeItem("lastTab");
    localStorage.removeItem("lastAssistantTab");
  },
}));

export default useLocalStorageStore;
