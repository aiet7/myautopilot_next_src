"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import { BsFilterLeft, BsThreeDotsVertical, BsCheck } from "react-icons/bs";

const ChatMenus = () => {
  const {
    activeChatBotMode,
    filterChatMode,
    activeChatBotModeOpen,
    filterChatModeOpen,
    activeChatOptions,
    filterChatOptions,
    setActiveChatBotMode,
    setActiveFilterMode,
    setActiveChatBotModeOpen,
    setActiveChatFilterModeOpen,
  } = useConversationStore();

  const { setAssistantWidthOpen } = useAssistantStore();

  return (
    <div>
      <div className="relative flex items-center ">
        <BsThreeDotsVertical
          onClick={() => {
            setActiveChatBotModeOpen(!activeChatBotModeOpen);
            setActiveChatFilterModeOpen(false);
            setAssistantWidthOpen(false);
          }}
          size={20}
          className="cursor-pointer "
        />
        {activeChatBotModeOpen && (
          <div className="absolute flex flex-col  font-semibold top-6 right-8  bg-white border rounded-lg shadow-lg w-[100px] p-1 z-[100] ">
            {activeChatOptions.map((option) => (
              <div
                key={option}
                className=" hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
              >
                <button
                  onClick={() => {
                    setActiveChatBotMode(option);
                    setActiveChatBotModeOpen(false);
                  }}
                  className=" w-full text-left "
                >
                  {option}
                </button>
                {activeChatBotMode === option && <BsCheck size={20} />}
              </div>
            ))}
          </div>
        )}
        <BsFilterLeft
          onClick={() => {
            setActiveChatFilterModeOpen(!filterChatModeOpen);
            setActiveChatBotModeOpen(false);
          }}
          size={27}
          className="cursor-pointer"
        />
        {filterChatModeOpen && (
          <div className="absolute flex flex-col  font-semibold top-6 right-2 bg-white border rounded-lg shadow-lg w-[150px] p-1 z-[100] ">
            {filterChatOptions.map((option) => (
              <div
                key={option}
                className="hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
              >
                <button
                  onClick={() => {
                    setActiveFilterMode(option);
                    setActiveChatFilterModeOpen(false);
                  }}
                  className="w-full text-left "
                >
                  {option}
                </button>
                {filterChatMode === option && <BsCheck size={20} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMenus;
