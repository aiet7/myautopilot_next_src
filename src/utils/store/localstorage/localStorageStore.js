import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import useUserStore from "../user/userStore";
import useAssistantStore from "../assistant/assistantStore";
import useConversationStore from "../interaction/conversations/conversationsStore";
import useDocConversationsStore from "../interaction/conversations/docConversationsStore";
import useAdminStore from "../admin/adminStore";

const useLocalStorageStore = create((set, get) => ({
  getStorage: (navigator, option) => {
    const lastActiveDirectory =
      localStorage.getItem("lastActiveDirectory") || "{}";
    const lastUI = localStorage.getItem("lastUI") || "{}";
    const lastConvoIndex = localStorage.getItem("lastConvoIndex") || "{}";

    const parsedLastActiveDirectory = JSON.parse(lastActiveDirectory);
    const parsedLastConvoIndex = JSON.parse(lastConvoIndex);
    const parsedLastUI = JSON.parse(lastUI);

    const isOnAdminRoute = navigator.includes("/admin");

    useUserStore.setState({ user: parsedLastActiveDirectory });

    useAdminStore.setState({
      currentOption:
        parsedLastUI.currentOption || (isOnAdminRoute ? option : "internal"),
    });

    useUiStore.setState({
      activeTab:
        parsedLastUI.activeTab || (isOnAdminRoute ? "admin" : "iTAgent"),
    });

    useAssistantStore.setState({
      activeAssistantTab: parsedLastUI.activeAssistantTab || "Tickets",
      activeUIAssistantTab: parsedLastUI.activeUIAssistantTab || "Tickets",
    });

    useConversationStore.setState({
      currentConversationIndex: parsedLastConvoIndex.currentConversationIndex,
    });
    useDocConversationsStore.setState({
      currentDocumentConversationIndex:
        parsedLastConvoIndex.currentDocumentConversationIndex,
    });
  },

  setStorage: () => {
    const { user } = useUserStore.getState();
    const { currentOption } = useAdminStore.getState();
    const { activeTab } = useUiStore.getState();
    const { activeAssistantTab, activeUIAssistantTab } =
      useAssistantStore.getState();
    const { currentConversationIndex } = useConversationStore.getState();
    const { currentDocumentConversationIndex } =
      useDocConversationsStore.getState();

    localStorage.setItem("lastActiveDirectory", JSON.stringify(user));
    localStorage.setItem(
      "lastUI",
      JSON.stringify({
        currentOption,
        activeTab,
        activeAssistantTab,
        activeUIAssistantTab,
      })
    );
    localStorage.setItem(
      "lastConvoIndex",
      JSON.stringify({
        currentConversationIndex,
        currentDocumentConversationIndex,
      })
    );
  },

  clearStorage: () => {
    localStorage.removeItem("lastActiveDirectory");
    localStorage.removeItem("lastUI");
    localStorage.removeItem("lastConvoIndex");
  },

  saveUser: (user) => {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(
      "lastActiveDirectory",
      JSON.stringify(userWithoutPassword)
    );
    useUserStore.setState({ user: userWithoutPassword });
  },

  getUser: () => {
    const userString = localStorage.getItem("lastActiveDirectory");
    return userString ? JSON.parse(userString) : null;
  },
}));

export default useLocalStorageStore;
