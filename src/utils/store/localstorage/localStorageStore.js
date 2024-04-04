import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import useAssistantStore from "../assistant/assistantStore";
import useConversationStore from "../interaction/conversations/conversationsStore";
import useDocConversationsStore from "../interaction/conversations/docConversationsStore";
import useAdminStore from "../admin/adminStore";
import useUserStore from "../user/userStore";

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
        parsedLastUI.currentOption || (isOnAdminRoute ? option : "employees"),
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

  clearStorage: () => {
    const defaultStates = {
      user: {},
      ui: {
        currentOption: "employees",
        activeTab: "iTAgent",
        activeAssistantTab: "Tickets",
        activeUIAssistantTab: "Tickets",
      },
      conversation: {
        currentConversationIndex: 0,
        currentDocumentConversationIndex: 0,
      },
    };

    useUserStore.setState({ user: defaultStates.user });
    useAdminStore.setState({
      currentOption: defaultStates.ui.currentOption,
    });
    useUiStore.setState({
      activeTab: defaultStates.ui.activeTab,
      activeAssistantTab: defaultStates.ui.activeAssistantTab,
      activeUIAssistantTab: defaultStates.ui.activeUIAssistantTab,
    });
    useConversationStore.setState({
      currentConversationIndex:
        defaultStates.conversation.currentConversationIndex,
    });
    useDocConversationsStore.setState({
      currentDocumentConversationIndex:
        defaultStates.conversation.currentDocumentConversationIndex,
    });

    localStorage.removeItem("lastActiveDirectory");
    localStorage.removeItem("lastUI");
    localStorage.removeItem("lastConvoIndex");
  },
}));

export default useLocalStorageStore;
