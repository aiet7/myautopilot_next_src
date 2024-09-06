"use client";

import Pagination from "./Sections/Internal/Pagination";
import TicketMode from "./Sections/Internal/TicketBot/TicketMode";
import ChatMode from "./Sections/Internal/ChatBot/ChatMode";
import QueueMenus from "./Sections/Internal/QueueBot/QueueMode";
import useUiStore from "@/utils/store/ui/uiStore";

const AssistantMenus = () => {
  const { currentNavOption } = useUiStore();

  const renderModeComponent = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketMode />;
      case "Engineer":
        return <ChatMode />;
      case "Queue":
        return <QueueMenus />;
      default:
        return null;
    }
  };
  return (
    <div className="dark:bg-gray-900 flex flex-wrap items-center justify-between  w-full shadow-xl px-4 py-1 bg-white gap-4 ">
      {renderModeComponent()}
      <Pagination />
    </div>
  );
};

export default AssistantMenus;
