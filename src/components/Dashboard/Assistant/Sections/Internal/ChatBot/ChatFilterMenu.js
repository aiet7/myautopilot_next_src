"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const ChatFilterMenu = () => {
  const { setAssistantMenuOpen } = useAssistantStore();

  const { filterChatMode, setActiveFilterMode, setActiveChatFilterModeOpen } =
    useConversationStore();
  return (
    <div
      onMouseLeave={() => setActiveChatFilterModeOpen("")}
      className="absolute top-4 z-[100] w-[150px] bg-white border rounded shadow-lg "
    >
      <div
        className={`${
          filterChatMode === "Newest" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Newest");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveChatFilterModeOpen("")}
      >
        Newest
      </div>
      <div
        className={`${
          filterChatMode === "Oldest" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Oldest");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveChatFilterModeOpen("")}
      >
        Oldest
      </div>
    </div>
  );
};

export default ChatFilterMenu;
