"use client";

import Pagination from "./Sections/Internal/Pagination";
import TicketMode from "./Sections/Internal/TicketBot/TicketMode";
import ChatMode from "./Sections/Internal/ChatBot/ChatMode";
import QueueMenus from "./Sections/Internal/QueueBot/QueueMode";
import useUiStore from "@/utils/store/ui/uiStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const AssistantMenus = () => {
  const { currentNavOption } = useUiStore();

  const { activeTicketBotMode } = useTicketsStore();
  const { activeQueueBotMode } = useQueueStore();

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
    (currentNavOption === "Tickets" && activeTicketBotMode === "History") ||
    currentNavOption === "Assistant" ||
    (currentNavOption === "Queue" &&
      activeQueueBotMode === "All Queue Tickets");

  return (
    <div className="dark:bg-gray-900 flex flex-wrap items-center justify-between min-h-12 w-full shadow-xl px-4  bg-white gap-4 ">
      {renderModeComponent()}
      {showPagination && <Pagination />}
    </div>
  );
};

export default AssistantMenus;
