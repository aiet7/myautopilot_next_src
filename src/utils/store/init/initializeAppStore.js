import { create } from "zustand";
import useAgentsStore from "../agents/agentsStore";
import useUiStore from "../ui/uiStore";

const useInitializeAppStore = create((set, get) => ({
  initializeApp: () => {
    const { activeTab } = useUiStore.getState();
    const { agents, setSelectedAgent } = useAgentsStore.getState();

    if (activeTab === "general") {
      const generalAgent = agents.find(
        (agent) => agent.agentName === "General Agent"
      );
      if (generalAgent) {
        setSelectedAgent(generalAgent.id);
      } else {
        console.log("Not found");
      }
    }
  },

  
}));

export default useInitializeAppStore;
