"use client";
import { AiOutlineClose } from "react-icons/ai";
import useUiStore from "@/utils/store/ui/uiStore.js";
import TicketSearch from "./Sections/Internal/TicketBot/TicketSearch";
import ChatSearch from "./Sections/Internal/ChatBot/ChatSearch";

import QueueSearch from "./Sections/Internal/QueueBot/QueueSearch";

const AssistantControl = () => {
  const {
    currentNavOption,
    handleAssistantMenu,
    setToggleFullScreen,
    toggleFullScreen,
  } = useUiStore();

  const renderSearchComponent = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketSearch />;
      case "Assistant":
        return <ChatSearch />;
      case "Dispatch":
        return <QueueSearch />;
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-black dark:border-white/10 relative border-b border-black/10 gap-4 py-2 px-4 flex items-center bg-gray-100 w-full">
      <p className="dark:text-white text-lg text-black w-1/6">
        {currentNavOption}
      </p>
      <div className="flex items-center justify-between w-full gap-4">
        {renderSearchComponent()}
      </div>

      <div className="dark:text-white flex items-center text-black gap-2">
        {window.innerWidth > 1023 && (
          <AiOutlineClose
            onClick={() => {
              handleAssistantMenu();
              toggleFullScreen ? setToggleFullScreen() : "";
            }}
            size={20}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default AssistantControl;
