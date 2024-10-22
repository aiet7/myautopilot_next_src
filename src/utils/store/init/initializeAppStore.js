import { create } from "zustand";
import useUiStore from "../ui/uiStore";
import { handleGetAgents, handleGetMSPs } from "@/utils/api/serverProps";

const useInitializeAppStore = create((set, get) => ({
  mspSubDomain: null,
  selectedAgent: null,

  setSelectedAgent: (id) => set({ selectedAgent: id }),

  // initializeApp: async () => {
  //   const { activeTab } = useUiStore.getState();

  //   set({ selectedAgent: null });

  //   if (activeTab === "iTAgent") {
  //     const initialAgents = await handleGetAgents();
  //     const iTAgent = initialAgents.find(
  //       (agent) => agent.agentName === "Cybersecurity Gap Analysis Assistant"
  //     );
  //     if (iTAgent) {
  //       set({
  //         selectedAgent: iTAgent.id,
  //       });
  //     } else {
  //       console.log("Not found");
  //     }
  //   }
  // },

  initializeSubDomain: async (msp) => {
    set({ mspSubDomain: null });

    if (msp) {
      const intitialMSPSubdomain = await handleGetMSPs(msp);
      set({ mspSubDomain: intitialMSPSubdomain });
    }
  },

  clearInit: () => {
    set({
      mspSubDomain: null,
      selectedAgent: null,
    });
  },
}));

export default useInitializeAppStore;
