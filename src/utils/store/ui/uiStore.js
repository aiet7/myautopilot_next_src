import { create } from "zustand";
import useAgentsStore from "../agents/agentsStore";

const useUiStore = create((set, get) => ({
  height: null,
  activeTab: null,
  hoverTab: null,
  openHistory: false,
  openAssistant: false,
  openRooms: false,
  openDocs: false,
  openSettings: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setHoverTab: (tab) => set({ hoverTab: tab }),

  setHeight: (heightValue) => set({ height: heightValue }),

  handleToggleHistory: () =>
    set((state) => ({ openHistory: !state.openHistory })),
  handleToggleAssistant: () =>
    set((state) => ({ openAssistant: !state.openAssistant })),
  handleToggleRooms: () => set((state) => ({ openRooms: !state.openRooms })),
  handleToggleDocs: () => set((state) => ({ openDocs: !state.openDocs })),
  handleToggleSettings: (toggle) => set({ openSettings: toggle }),

  handleUpdateGeneralPreview: () => {
    const { agents, setHoverAgent } = useAgentsStore.getState();
    const { activeTab, hoverTab } = get();
    if (activeTab === "general") {
      set({ hoverTab: null });
    }

    if (hoverTab === "general") {
      const generalAgent = agents.find(
        (agent) => agent.agentName === "General Agent"
      );

      if (generalAgent) {
        setHoverAgent(generalAgent.id);
      } else {
        setHoverAgent(null);
      }
    }
  },

  handleUpdateAgentsPreview: () => {
    const { setHoverAgent } = useAgentsStore.getState();
    const { activeTab } = get();
    if (activeTab === "agents") {
      set({ hoverTab: null });
    }
    setHoverAgent(null);
  },

  handleUpdateRoomsPreview: () => {
    const { setHoverAgent } = useAgentsStore.getState();
    const { activeTab } = get();
    if (activeTab === "teams") {
      set({ hoverTab: null });
    }
    setHoverAgent(null);
  },

  handleUpdateDocsPreview: () => {
    const { setHoverAgent } = useAgentsStore.getState();
    const { activeTab } = get();

    if (activeTab === "docs") {
      set({ hoverTab: null });
    }
    setHoverAgent(null);
  },

  handleUpdateHoverMouseLeave: () => {
    const { setHoverAgent } = useAgentsStore.getState();

    set({ hoverTab: null });
    setHoverAgent(null);
  },

  handleHistoryMenu: () => {
    const { openHistory, openRooms, openDocs } = get();

    if (openHistory) {
      set({ openHistory: false });
    } else set({ openHistory: true });
    if (openRooms) {
      set({ openRooms: false });
    } else set({ openRooms: true });
    if (openDocs) {
      set({ openDocs: false });
    } else set({ openDocs: true });
  },

  handleAssistantMenu: () => {
    const { openAssistant } = get();
    if (openAssistant) {
      set({ openAssistant: false });
    } else {
      set({ openAssistant: true });
    }
  },

  handleTabChange: (tab) => {
    const { setSelectedAgent } = useAgentsStore.getState();
    const { activeTab } = get();
    if (tab === "agents") {
      set({ activeTab: "agents" });
    }
    if (tab === "general" && activeTab === "general") {
      return;
    }

    if (tab === "iTAgent" && activeTab === "iTAgent") {
      return;
    }
    set({ activeTab: tab, hoverTab: null });

    setSelectedAgent(null);
  },
}));

export default useUiStore;
