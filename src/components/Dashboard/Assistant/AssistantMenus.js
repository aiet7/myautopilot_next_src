"use client";

import Pagination from "./Sections/Internal/Pagination";
import TicketMode from "./Sections/Internal/TicketBot/TicketMode";
import ChatMode from "./Sections/Internal/ChatBot/ChatMode";
import QueueMenus from "./Sections/Internal/QueueBot/QueueMode";
import useUiStore from "@/utils/store/ui/uiStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useUserStore from "@/utils/store/user/userStore";

const AssistantMenus = () => {
  const { user } = useUserStore();

  const { currentNavOption } = useUiStore();

  const { activeTicketBotMode } = useTicketsStore();
  const {
    eligibleView,
    activeQueueBotMode,
    setEligibleView,
    handleShowAllEligibleTickets,
  } = useQueueStore();

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
    <div className="dark:bg-gray-900 shadow-xl bg-white w-full py-2 px-4">
      <div className="grid gap-4 grid-cols-1 grid-cols-[auto,1fr] items-center">
        <div className="flex items-center gap-2  flex-wrap">
          {renderModeComponent()}
          {currentNavOption === "Assistant" && (
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setAssistantMode("Edit")}
                className={`${
                  assistantMode === "Edit" ? "bg-blue-500" : "bg-[#465E89]"
                } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] font-semibold text-white rounded-md px-2 py-1`}
              >
                Edit
              </button>
              <button
                onClick={() => setAssistantMode("Create")}
                className={`${
                  assistantMode === "Create" ? "bg-blue-500" : "bg-[#465E89]"
                } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] font-semibold text-white rounded-md px-2 py-1`}
              >
                Create Assistant
              </button>
              <button
                onClick={() => handleDeleteAgent(selectedAgent?.id)}
                className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-red-500 font-semibold text-white rounded-md px-2 py-1"
              >
                Delete
              </button>
            </div>
          )}
          {currentNavOption === "Queue" &&
            activeQueueBotMode === "All Queue Tickets" && (
              <button
                onClick={() =>
                  eligibleView
                    ? setEligibleView(false)
                    : handleShowAllEligibleTickets(
                        user?.mspCustomDomain,
                        user?.id,
                        user?.connectWiseTechnicanId
                      )
                }
                className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-[#465E89] font-semibold text-white rounded-md px-2 py-1"
              >
                {eligibleView ? "See All Tickets" : "See Eligible Tickets"}
              </button>
            )}
        </div>

        <div className="flex justify-end  w-full ">
          {showPagination && <Pagination />}
        </div>
      </div>
    </div>
  );
};

export default AssistantMenus;
