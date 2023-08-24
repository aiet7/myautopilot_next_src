import useAgentsStore from "@/utils/store/agents/agentsStore";
import { create } from "zustand";
import { ITSkills } from "../../../../../utils/prompts/ITPromptLibrary.js";
import { generalSkills } from "../../../../../utils/prompts/generalPromptLibrary.js";

const useSkillsStore = create((set, get) => ({
  handleGetSkills: () => {
    const { agents, selectedAgent } = useAgentsStore.getState();

    const agentName = agents.find(
      (agent) => agent.id === selectedAgent
    )?.agentName;
    if (agentName === "IT Agent") {
      return ITSkills;
    } else {
      return generalSkills;
    }
  },
}));

export default useSkillsStore;
