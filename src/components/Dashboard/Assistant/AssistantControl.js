"use client";
import { AiOutlineClose } from "react-icons/ai";
import useUiStore from "@/utils/store/ui/uiStore.js";
import TicketSearch from "./Sections/Internal/TicketBot/TicketSearch";
import TicketMenus from "./Sections/Internal/TicketBot/TicketMenus";
import ChatSearch from "./Sections/Internal/ChatBot/ChatSearch";
import ChatMenus from "./Sections/Internal/ChatBot/ChatMenus";
import { FaExpand } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import QueueSearch from "./Sections/Internal/QueueBot/QueueSearch";
import QueueMenus from "./Sections/Internal/QueueBot/QueueMenus";

const AssistantControl = () => {
  const {
    currentNavOption,
    currentQueueNavOption,
    handleAssistantMenu,
  } = useUiStore();

  const {
    assistantWidth,
    assistantWidthOptions,
    assistantWidthOpen,
    setAssistantWidth,
    setAssistantWidthOpen,
  } = useAssistantStore();

  const { setActiveTicketFilterModeOpen, setActiveTicketBotModeOpen } =
    useTicketsStore();
  const { setActiveChatBotModeOpen, setActiveChatFilterModeOpen } =
    useConversationStore();

  const renderSearchComponent = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketSearch />;
      case "Engineer":
        return <ChatSearch />;
      case "Queue":
        return <QueueSearch />;
      default:
        return null;
    }
  };

  const renderMenuComponent = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketMenus />;
      case "Engineer":
        return <ChatMenus />;
      case "Queue":
        return currentQueueNavOption === "Queue Tickets" ? <QueueMenus /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-black dark:border-white/10 relative border-b border-black/10 gap-4 py-2 px-4 flex items-center bg-gray-100  ">
      <p className="dark:text-white text-lg text-black">{currentNavOption}</p>

      {renderSearchComponent()}
      <FaExpand
        onClick={() => {
          setAssistantWidthOpen(!assistantWidthOpen);
          setActiveTicketBotModeOpen(false);
          setActiveTicketFilterModeOpen(false);
          setActiveChatBotModeOpen(false);
          setActiveChatFilterModeOpen(false);
        }}
        size={35}
        className="cursor-pointer"
      />
      {assistantWidthOpen && (
        <div className="absolute flex flex-col  font-semibold top-9 right-28  bg-white border rounded-lg shadow-lg w-[100px] p-1 z-[100] ">
          {assistantWidthOptions.map((option) => (
            <div
              key={option}
              className=" hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
            >
              <button
                onClick={() => {
                  setAssistantWidth(option);
                  setAssistantWidthOpen(false);
                }}
                className=" w-full text-left "
              >
                {option} px
              </button>
              {assistantWidth === option && <BsCheck size={20} />}
            </div>
          ))}
        </div>
      )}
      {renderMenuComponent()}

      <div className="dark:text-white flex items-center text-black gap-2">
        {window.innerWidth > 1023 && (
          <AiOutlineClose
            onClick={handleAssistantMenu}
            size={20}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default AssistantControl;
