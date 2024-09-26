"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";

const ChatMode = () => {
  const {
    agents,
    activeChatBotMode,
    handleAgentSelected,
    setActiveChatBotMode,
    setActiveChatFilterModeOpen,
  } = useConversationStore();

  return (
    <div className="relative flex items-center ">
      <select
        value={activeChatBotMode}
        className="px-4 py-1 border w-[150px]"
        onChange={(e) => {
          const selectedAgentId = agents.find(
            (agent) => agent.agentName === e.target.value
          )?.id;
          if (selectedAgentId) {
            setActiveChatFilterModeOpen(false);
            setActiveChatBotMode(e.target.value);
            handleAgentSelected(selectedAgentId);
          }
        }}
      >
        {agents.map((agent) => {
          const { id, agentName, defaultPrompt } = agent;
          return (
            <option key={id} value={agentName}>
              {agentName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ChatMode;
