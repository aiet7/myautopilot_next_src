"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";

const ChatMode = () => {
  const {
    activeChatBotMode,
    activeChatOptions,
    setActiveChatBotMode,
    setActiveChatFilterModeOpen,
  } = useConversationStore();

  const { setAssistantWidthOpen } = useAssistantStore();

  return (
    <div className="relative flex items-center ">
      <select
        value={activeChatBotMode}
        className="px-4 py-1 border w-[150px]"
        onChange={(e) => {
          setActiveChatFilterModeOpen(false);
          setAssistantWidthOpen(false);
          setActiveChatBotMode(e.target.value);
        }}
      >
        {activeChatOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChatMode;
