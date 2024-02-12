import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import { handleGetAgents, handleGetMSPs } from "@/utils/api/serverProps";
import useTechStore from "../user/techStore";

const useInitializeAppStore = create((set, get) => ({
  mspSubDomain: null,
  selectedAgent: null,
  setSelectedAgent: (id) => set({ selectedAgent: id }),

  initializeApp: async () => {
    const techStore = useTechStore.getState();
    const { activeTab } = useUiStore.getState();
    const { setSelectedAgent } = get();

    set({ selectedAgent: null });

    if (activeTab === "iTAgent") {
      if (techStore.tech) {
        const initialAgents = await handleGetAgents(
          techStore.tech.mspCustomDomain
        );
        const iTAgent = initialAgents.find(
          (agent) => agent.agentName === "IT Agent"
        );
        if (iTAgent) {
          setSelectedAgent(iTAgent.id);
        } else {
          console.log("Not found");
        }
      }
    }
  },

  initializeSubDomain: async (msp) => {
    set({ mspSubDomain: null });

    if (msp) {
      const intitialMSPSubdomain = await handleGetMSPs(msp);
      set({ mspSubDomain: intitialMSPSubdomain });
    }
  },
}));

export default useInitializeAppStore;
