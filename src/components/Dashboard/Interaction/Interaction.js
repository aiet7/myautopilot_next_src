"use client";

import { useEffect } from "react";

import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import {
  BsFillMicFill,
  BsFillStopFill,
  BsFillSendFill,
  BsImageFill,
} from "react-icons/bs";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";

import Switch from "../../Dashboard/Interaction/Forms/Switch.js";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useAgentsStore from "@/utils/store/agents/agentsStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import useInteractionStore from "@/utils/store/interaction/interactionsStore.js";
import useRefStore from "@/utils/store/interaction/ref/refStore.js";
import useSpeechStore from "@/utils/store/interaction/speech/speechStore.js";

import { Tooltip as ReactTooltip } from "react-tooltip";

const Interaction = ({}) => {
  const {
    activeTab,
    openHistory,
    openAssistant,
    handleHistoryMenu,
    handleAssistantMenu
  } = useUiStore();
  const { selectedAgent } = useAgentsStore();
  const {
    conversationHistories,
    currentConversationIndices,
    handleGetConversationId,
  } = useConversationStore();

  const { isServerError, isFormOpen } = useFormsStore();
  const {
    textAreaHeight,
    userInput,
    isWaiting,
    isAtBottom,
    isOverflowed,
    isFeedbackSubmitted,
    handleTextAreaChange,
    handleSendUserMessage,
    handleImageGenerator,
    handleAbortRequest,
    handleScrollToBottom,
    handleCheckScroll,
  } = useInteractionStore();

  const { latestMessageRef, chatContainerRef, inputRef } = useRefStore();

  const { isListening, handleTriggerSpeech } = useSpeechStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [userInput, activeTab, selectedAgent]);

  useEffect(() => {
    handleScrollToBottom(true);
  }, [conversationHistories]);

  useEffect(() => {
    handleScrollToBottom();
  }, [currentConversationIndices[selectedAgent]]);

  useEffect(() => {
    if (activeTab === "chat") {
      handleScrollToBottom();
    }
  }, [activeTab]);

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1024) {
          openHistory && handleHistoryMenu(false);
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`flex flex-col h-full w-full ${
        openHistory && openAssistant && "xl:mr-[350px]"
      }  ${
        (openHistory && "lg:opacity-100 opacity-5 xl:ml-[350px]") ||
        (openAssistant && "lg:opacity-100 opacity-5 xl:mr-[350px]")
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      {!isAtBottom && isOverflowed && (
        <button
          onClick={handleScrollToBottom}
          className="dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600 lg:right-14"
        >
          <HiOutlineArrowSmallDown className="m-1" size={18} />
        </button>
      )}
      <div
        className="flex-grow overflow-auto no-scrollbar"
        ref={chatContainerRef}
        onScroll={handleCheckScroll}
      >
        {conversationHistories[selectedAgent]?.[
          currentConversationIndices[selectedAgent]
        ]?.messages?.map((item, index, arr) => {
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
              <div className="flex  items-start max-w-[600px] mx-auto gap-4">
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

      <div className="relative flex items-center px-4 py-2">
        <textarea
          ref={inputRef}
          onChange={handleTextAreaChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendUserMessage(userInput);
            }
          }}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="dark:bg-black bg-white border outline-blue-500 w-full p-4 pr-24 resize-none no-scrollbar"
          style={{
            height: textAreaHeight,
            maxHeight: "200px",
          }}
          disabled={isFormOpen[handleGetConversationId()?.conversationId]}
        />

        <div className="flex items-center gap-3 absolute right-24 pr-2 flex items-center bottom-0 top-0">
          {activeTab === "general" && (
            <>
              <BsImageFill
                data-tooltip-id="Generate Image"
                onClick={() => handleImageGenerator(userInput)}
                size={23}
                className={`outline-none ${
                  userInput !== ""
                    ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                    : "dark:text-gray-500 text-gray-300 select-none"
                } `}
              />
              <ReactTooltip
                place="top"
                content="Generate Image"
                id="Generate Image"
                className="z-[99]"
              />
            </>
          )}
          <BsFillSendFill
            data-tooltip-id="Send Message"
            size={25}
            onClick={() => handleSendUserMessage(userInput)}
            className={`outline-none ${
              userInput !== ""
                ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
          <ReactTooltip
            place="top"
            content="Send Message"
            id="Send Message"
            className="z-[99]"
          />
        </div>
        <div className="flex items-center gap-1 pl-2">
          <BsFillStopFill
            data-tooltip-id="Stop Generating"
            onClick={handleAbortRequest}
            size={35}
            className={`outline-none ${
              isWaiting
                ? "hover:text-blue-500 cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
          <ReactTooltip
            place="top"
            content="Stop Generating"
            id="Stop Generating"
            className="z-[99]"
          />
          <BsFillMicFill
            data-tooltip-id="Voice"
            onClick={handleTriggerSpeech}
            className={`hover:text-blue-500 outline-none ${
              isListening ? "text-blue-500" : null
            } cursor-pointer`}
            size={25}
          />
          <ReactTooltip
            place="top"
            content={isListening ? "Stop Speech" : "Start Speech"}
            id="Voice"
            className="z-[99]"
          />
        </div>
      </div>
    </div>
  );
};

export default Interaction;
