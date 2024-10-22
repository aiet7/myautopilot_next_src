"use client";

import Pagination from "./Sections/Internal/Pagination";
import TicketMode from "./Sections/Internal/TicketBot/TicketMode";
import ChatMode from "./Sections/Internal/ChatBot/ChatMode";
import QueueMenus from "./Sections/Internal/QueueBot/QueueMode";
import useUiStore from "@/utils/store/ui/uiStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";

const AssistantMenus = () => {
  const { currentNavOption } = useUiStore();

  const { activeTicketBotMode } = useTicketsStore();
  const { activeQueueBotMode } = useQueueStore();

  const { selectedAgent, assistantMode, setAssistantMode, handleDeleteAgent } =
    useConversationStore();

  const renderModeComponent = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketMode />;
      case "Assistant":
        return <ChatMode />;
      case "Queue":
        return <QueueMenus />;
      default:
        return null;
    }
  };

  const showPagination =
    assistantMode !== "Create" &&
    assistantMode !== "Edit" &&
    ((currentNavOption === "Tickets" && activeTicketBotMode === "History") ||
      currentNavOption === "Assistant" ||
      (currentNavOption === "Queue" &&
        activeQueueBotMode === "All Queue Tickets"));

  return (
    <div className="dark:bg-gray-900 flex flex-wrap items-center justify-between min-h-12 w-full shadow-xl px-4  bg-white gap-4 ">
      <div className="flex items-center gap-2 flex-wrap pt-2">
        {renderModeComponent()}
        {currentNavOption === "Assistant" && (
          <div className="flex items-center gap-1 ">
            <button
              onClick={() => setAssistantMode("Edit")}
              className={`${
                assistantMode === "Edit" ? "bg-blue-500" : "bg-[#465E89]"
              } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]  font-semibold text-white rounded-md px-2 py-1`}
            >
              Edit
            </button>
            <button
              onClick={() => setAssistantMode("Create")}
              className={`${
                assistantMode === "Create" ? "bg-blue-500" : "bg-[#465E89]"
              } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] font-semibold text-white rounded-md px-2 py-1`}
            >
              Create Assistant
            </button>
            <button
              onClick={() => handleDeleteAgent(selectedAgent?.id)}
              className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-red-500  font-semibold text-white rounded-md px-2 py-1"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {showPagination && <Pagination />}
    </div>
  );
};

export default AssistantMenus;
