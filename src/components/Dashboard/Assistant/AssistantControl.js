"use client";
import { AiOutlineClose } from "react-icons/ai";
import useUiStore from "@/utils/store/ui/uiStore.js";
import TicketSearch from "./Sections/Internal/TicketBot/TicketSearch";
import ChatSearch from "./Sections/Internal/ChatBot/ChatSearch";
import { TbResize } from "react-icons/tb";
import { BsCheck } from "react-icons/bs";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import QueueSearch from "./Sections/Internal/QueueBot/QueueSearch";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const AssistantControl = () => {
  const { currentNavOption, handleAssistantMenu } = useUiStore();

  const {
    assistantWidth,
    assistantWidthOptions,
    assistantWidthOpen,
    setAssistantWidth,
    setAssistantWidthOpen,
  } = useAssistantStore();

  const { setActiveTicketFilterModeOpen } = useTicketsStore();
  const { setActiveChatBotModeOpen, setActiveChatFilterModeOpen } =
    useConversationStore();

  const { setActiveQueueFilterModeOpen, setActiveQueueBotModeOpen } =
    useQueueStore();

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

  return (
    <div className="dark:bg-black dark:border-white/10 relative border-b border-black/10 gap-4 py-2 px-4 flex items-center bg-gray-100 w-full">
      <p className="dark:text-white text-lg text-black w-1/6">
        {currentNavOption}
      </p>
      <div className="flex items-center justify-between w-full gap-4">
        {renderSearchComponent()}
        <div className="relative">
          <TbResize
            onClick={() => {
              setAssistantWidthOpen(!assistantWidthOpen);
              setActiveTicketFilterModeOpen(false);
              setActiveChatFilterModeOpen(false);
              setActiveQueueFilterModeOpen(false);
            }}
            size={25}
            className="cursor-pointer "
          />
        </div>
      </div>
      {assistantWidthOpen && (
        <div className="absolute top-8 right-6 w-[75px] z-[100]  bg-white border rounded shadow-lg ">
          {assistantWidthOptions.map((option) => (
            <div
              key={option}
              className={`${
                assistantWidth === option ? "bg-black/20" : ""
              } hover:bg-black/20 p-1 flex justify-between items-center cursor-pointer  text-black`}
            >
              <button
                onClick={() => {
                  setAssistantWidth(option);
                  setAssistantWidthOpen(false);
                }}
              >
                {option} px
              </button>
            </div>
          ))}
        </div>
      )}
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
