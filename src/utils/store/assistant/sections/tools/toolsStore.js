import { create } from "zustand";

const useToolsStore = create((set, get) => ({
  agentLink:
    "https://etech7-wf-etech7-document-service.azuremicroservices.io/download/agentInstaller",
  screenConnectLink:
    "https://etech7-wf-etech7-document-service.azuremicroservices.io/download/screenConnectInstaller",
}));

export default useToolsStore;
