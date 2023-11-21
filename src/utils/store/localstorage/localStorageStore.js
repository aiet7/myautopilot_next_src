import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import useAssistantStore from "../assistant/assistantStore";
import useConversationStore from "../interaction/conversations/conversationsStore";
import useDocConversationsStore from "../interaction/conversations/docConversationsStore";
import { handleGetDocument } from "@/utils/idb/db";
import useDocGuideStore from "../assistant/sections/document/documentStore";

const useLocalStorageStore = create((set, get) => ({
  getStorage: async () => {
    const { documentConversationHistories } =
      useDocConversationsStore.getState();
    const { handleGetPdfDetails } = useDocGuideStore.getState();

    const lastTab = localStorage.getItem("lastTab");
    const lastAssistantTab = localStorage.getItem("lastAssistantTab");
    const lastUIAssistantTab = localStorage.getItem("lastUIAssistantTab");
    const lastConversationIndex = localStorage.getItem("lastConversationIndex");
    const lastDocumentIndex = localStorage.getItem("lastDocumentIndex");

    const parsedLastConversationIndex = lastConversationIndex
      ? parseInt(lastConversationIndex, 10)
      : null;

    const parsedLastDocumentIndex = lastDocumentIndex
      ? parseInt(lastDocumentIndex, 10)
      : null;

    useUiStore.setState({ activeTab: lastTab || "iTAgent" });
    useAssistantStore.setState({
      activeAssistantTab: lastAssistantTab || "Tickets",
      activeUIAssistantTab: lastUIAssistantTab || "Tickets",
    });
    useConversationStore.setState({
      currentConversationIndex: parsedLastConversationIndex,
    });
    useDocConversationsStore.setState({
      currentDocumentConversationIndex: parsedLastDocumentIndex,
    });

    if (parsedLastDocumentIndex !== null) {
      if (documentConversationHistories[parsedLastDocumentIndex]?.id) {
        const file = await handleGetDocument(
          documentConversationHistories[parsedLastDocumentIndex]?.id
        );
        if (file) {
          await handleGetPdfDetails(file);
        }
      }
    }
  },

  saveStorage: () => {
    const { activeTab } = useUiStore.getState();
    const { activeAssistantTab, activeUIAssistantTab } =
      useAssistantStore.getState();
    const { currentConversationIndex } = useConversationStore.getState();
    const { currentDocumentConversationIndex } =
      useDocConversationsStore.getState();

    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem("lastAssistantTab", activeAssistantTab);
    localStorage.setItem("lastUIAssistantTab", activeUIAssistantTab);

    localStorage.setItem(
      "lastConversationIndex",
      JSON.stringify(currentConversationIndex)
    );
    localStorage.setItem(
      "lastDocumentIndex",
      JSON.stringify(currentDocumentConversationIndex)
    );
  },

  clearStorage: () => {
    localStorage.removeItem("lastTab");
    localStorage.removeItem("lastAssistantTab");
    localStorage.removeItem("lastUIAssistantTab");
    localStorage.removeItem("lastConversationIndex");
    localStorage.removeItem("lastDocumentIndex");
  },
}));

export default useLocalStorageStore;
