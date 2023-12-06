import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import { handleGetAgents } from "@/utils/api/serverProps";

const useInitializeAppStore = create((set, get) => ({
  selectedAgent: null,
  setSelectedAgent: (id) => set({ selectedAgent: id }),

  initializeApp: async () => {
    const { activeTab } = useUiStore.getState();
    const { setSelectedAgent } = get();

    set({ selectedAgent: null });

    if (activeTab === "iTAgent") {
      const initialAgents = await handleGetAgents();
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
