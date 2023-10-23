import { create } from "zustand";
import useUiStore from "../ui/uiStore";

const useInitializeAppStore = create((set, get) => ({
  selectedAgent: null,
  setSelectedAgent: (id) => set({ selectedAgent: id }),

  initializeApp: (initialAgents) => {
    const { activeTab } = useUiStore.getState();
    const { setSelectedAgent } = get();

    if (activeTab === "iTAgent") {
      const iTAgent = initialAgents.find(
        (agent) => agent.agentName === "IT Jarvis Agent"
      );
      if (iTAgent) {
        setSelectedAgent(iTAgent.id);
      } else {
        console.log("Not found");
      }
    }
  },
}));

export default useInitializeAppStore;
