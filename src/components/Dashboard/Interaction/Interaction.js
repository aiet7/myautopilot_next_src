"use client";

import { useEffect } from "react";

import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";

import Switch from "../../Dashboard/Interaction/Forms/Switch.js";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import useInteractionStore from "@/utils/store/interaction/interactionsStore.js";
import useRefStore from "@/utils/store/interaction/ref/refStore.js";

import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useAgentsStore from "@/utils/store/agents/agentsStore.js";

const Interaction = ({}) => {
  const { selectedAgent } = useAgentsStore();
  const { openHistory, openAssistant, handleHistoryMenu, handleAssistantMenu } =
    useUiStore();
  const { messages, conversationHistories, currentConversationIndices } =
    useConversationStore();

  const { isServerError } = useFormsStore();
  const {
    textAreaHeight,
    userInput,
    isWaiting,
    isAtBottom,
    isOverflowed,
    isFeedbackSubmitted,
    handleTextAreaChange,
    handleCreateTicketMessage,
    handleSendMessage,
    handleScrollToBottom,
    handleCheckScroll,
  } = useInteractionStore();

  const { latestMessageRef, chatContainerRef, inputRef } = useRefStore();
  const { activeUIAssistantTab } = useAssistantStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [userInput, activeUIAssistantTab]);

  useEffect(() => {
    handleScrollToBottom(true);
  }, [conversationHistories, currentConversationIndices, selectedAgent]);

  useEffect(() => {
    if (activeUIAssistantTab === "Engineer") {
      handleScrollToBottom(false);
    }
  }, [activeUIAssistantTab]);

  const messagesToRender =
    activeUIAssistantTab === "Engineer"
      ? conversationHistories?.[selectedAgent]?.[
          currentConversationIndices[selectedAgent]
        ]?.messages
      : messages;

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1024) {
          openHistory && handleHistoryMenu(false);
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openHistory && openAssistant && "xl:mr-[350px]"
      }  ${
        (openHistory &&
          activeUIAssistantTab === "Engineer" &&
          "lg:opacity-100 opacity-5 xl:ml-[350px]") ||
        (openAssistant && "lg:opacity-100 opacity-5 xl:mr-[350px]")
      } dark:bg-black transition-all duration-300 ease bg-white`}
    >
      {!isAtBottom && isOverflowed && (
        <button
          onClick={handleScrollToBottom}
          className={`dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600`}
        >
          <HiOutlineArrowSmallDown className="m-1" size={18} />
        </button>
      )}

      <div
        className="flex-grow overflow-auto scrollbar-thin"
        ref={chatContainerRef}
        onScroll={handleCheckScroll}
      >
        {messagesToRender?.map((item, index, arr) => {
          return (
            <div
              key={item.id}
              className={`px-4 py-4 text-md w-full ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
              ref={index === arr.length - 1 ? latestMessageRef : null}
            >
              <div className="flex items-start max-w-[600px] mx-auto gap-4">
                <span>
                  {item.role === "user" ? (
                    <AiOutlineUser size={20} />
                  ) : (
                    <AiOutlineRobot size={20} />
                  )}
                </span>

                <div className="flex-grow min-w-[0]">
                  <Switch item={item} itemId={item.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2">
        {isServerError ? (
          <p className="text-red-600 text-xs">Server Error, try again please</p>
        ) : isFeedbackSubmitted ? (
          <p className="text-yellow-500 text-xs">
            Your feedback has been submitted
          </p>
        ) : (
          <FaSpinner
            className={`${
              isWaiting ? "opacity-100" : "opacity-0"
            } animate-spin`}
          />
        )}
      </div>
      {activeUIAssistantTab === "Engineer" ? (
        <div className="relative flex items-center px-4 py-2">
          <textarea
            ref={inputRef}
            onChange={handleTextAreaChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage(userInput);
              }
            }}
            value={userInput}
            placeholder="Interact With Our IT Engineer..."
            className="dark:bg-black bg-white border outline-blue-500 w-full p-4 pr-32 resize-none no-scrollbar"
            style={{
              height: textAreaHeight,
              maxHeight: "200px",
            }}
          />

          <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
            <BsFillSendFill
              onClick={() => handleSendMessage(userInput)}
              size={25}
              className={`outline-none ${
                userInput !== ""
                  ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                  : "dark:text-gray-500 text-gray-300 select-none"
              } `}
            />
          </div>
        </div>
      ) : (
        <div className="relative flex items-center px-4 py-2">
          <textarea
            ref={inputRef}
            onChange={handleTextAreaChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCreateTicketMessage(userInput);
              }
            }}
            value={userInput}
            placeholder="Describe Your Issue..."
            className="dark:bg-black bg-white border outline-blue-500 w-full p-4 pr-32 resize-none no-scrollbar"
            style={{
              height: textAreaHeight,
              maxHeight: "200px",
            }}
          />

          <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
            <button
              size={25}
              onClick={() => handleCreateTicketMessage(userInput)}
              className={`p-2 ${
                userInput !== ""
                  ? "dark:text-white dark:hover:text-white hover:bg-blue-500   border bg-blue-800 text-white cursor-pointer"
                  : "dark:text-gray-400 dark:border-white/30  text-gray-400 select-none border cursor-default"
              } `}
            >
              Open Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interaction;
