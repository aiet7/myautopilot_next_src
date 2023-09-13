import { create } from "zustand";
import useAgentsStore from "../agents/agentsStore";
import useUiStore from "../ui/uiStore";

const useInitializeAppStore = create((set, get) => ({
  initializeApp: () => {
    const { activeTab } = useUiStore.getState();
    const { agents, setSelectedAgent } = useAgentsStore.getState();

    if (activeTab === "iTAgent") {
      const iTAgent = agents.find(
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
