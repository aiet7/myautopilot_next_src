import { create } from "zustand";
import useConversationStore from "../interaction/conversations/conversationsStore";
import useUiStore from "../ui/uiStore";

const useAgentsStore = create((set, get) => ({
  agents: [],
  selectedAgent: null,
  hoverAgent: null,
  displayedAgent: null,

  setSelectedAgent: (id) => set({ selectedAgent: id }),
  setHoverAgent: (id) => set({ hoverAgent: id }),
  setDisplayedAgent: (id) => set({ displayedAgent: id }),

  initializeAgents: (initialAgents) => {
    set({ agents: initialAgents });
  },

  handleAgentSelected: (id) => {
    const { conversationHistories } = useConversationStore.getState();
    const { setActiveTab, handleCloseAllMenus } = useUiStore.getState();
    set({ selectedAgent: id, displayedAgent: null, hoverAgent: null });

    if (!conversationHistories[id]) {
      useConversationStore.setState((prevState) => ({
        ...prevState,
        conversationHistories: {
          ...prevState.conversationHistories,
          [id]: [],
        },
      }));
    }
    setActiveTab("agents");
    handleCloseAllMenus();
  },
}));

export default useAgentsStore;
