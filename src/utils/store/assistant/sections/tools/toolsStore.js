import { create } from "zustand";

const useToolsStore = create((set, get) => ({
  tools: [
    {
      title: "Agent Installer",
      description:
        "A dedicated software installer to set up the Agent tool on your device, enabling seamless connectivity and enhanced control.",

      link: "https://etech7-wf-etech7-document-service.azuremicroservices.io/download/agentInstaller",
      linkTitle: "Agent_Install.exe",
    },
    {
      title: "ScreenConnect Installer",
      description:
        "The go-to installer for ScreenConnect, empowering you with robust screen sharing and remote access capabilities.",

      link: "https://etech7-wf-etech7-document-service.azuremicroservices.io/download/screenConnectInstaller",
      linkTitle: "ScreenConnect_Install.exe",
    },
  ],
}));

export default useToolsStore;
