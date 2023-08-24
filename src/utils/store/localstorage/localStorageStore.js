import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import useConversationStore from "../interaction/conversations/conversationsStore";
import useTeamsStore from "../teams/teamsStore";
import useAssistantStore from "../assistant/assistantStore";

const useLocalStorageStore = create((set, get) => ({
  getStorage: () => {
    const lastTab = localStorage.getItem("lastTab");
    const lastAssistantTab = localStorage.getItem("lastAssistantTab");
    const lastConversationIndicesString = localStorage.getItem(
      "lastConversationIndices"
    );

    const lastRoomIndex = localStorage.getItem("lastRoomIndex");
    const lastWsPendingString = localStorage.getItem("wsIsPending");

    const lastConversationIndices = lastConversationIndicesString
      ? JSON.parse(lastConversationIndicesString)
      : null;
    const lastWsPending = lastWsPendingString
      ? JSON.parse(lastWsPendingString)
      : null;
    const parsedLastRoomIndex = lastRoomIndex
      ? parseInt(lastRoomIndex, 10)
      : null;

    useUiStore.setState({ activeTab: lastTab || "general" });
    useAssistantStore.setState({
      activeAssistantButton: lastAssistantTab || "Engineer",
    });
    useConversationStore.setState({
      currentConversationIndices: lastConversationIndices || {},
    });
    useTeamsStore.setState({
      wsIsPending: lastWsPending,
      currentTeamsIndex: parsedLastRoomIndex || 0,
    });
  },

  saveStorage: () => {
    const { activeTab } = useUiStore.getState();
    const { activeAssistantButton } = useAssistantStore.getState();
    const { currentConversationIndices } = useConversationStore.getState();
    const { currentTeamsIndex } = useTeamsStore.getState();
    const wsIsPending = {
      "/topic/mainResponses": { role: "CEO", status: "complete" },
      "/topic/reasonResponses": { role: "Advisor", status: "complete" },
      "/topic/criticResponses": { role: "Critic", status: "complete" },
      "/topic/decisionResponses": { role: "Analytic", status: "complete" },
    };
    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem("lastAssistantTab", activeAssistantButton);
    localStorage.setItem(
      "lastConversationIndices",
      JSON.stringify(currentConversationIndices)
    );
    localStorage.setItem("wsIsPending", JSON.stringify(wsIsPending));
    localStorage.setItem("lastRoomIndex", JSON.stringify(currentTeamsIndex));
  },

  clearStorage: () => {
    localStorage.removeItem("lastTab");
    localStorage.removeItem("lastAssistantTab");
    localStorage.removeItem("lastConversationIndices");
    localStorage.removeItem("wsIsPending");
    localStorage.removeItem("lastRoomIndex");
  },
}));

export default useLocalStorageStore;
