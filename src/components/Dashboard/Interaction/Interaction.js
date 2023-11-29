"use client";

import { useEffect } from "react";

import { BsFillSendFill } from "react-icons/bs";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

import Switch from "../../Dashboard/Interaction/Forms/Switch.js";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import useInteractionStore from "@/utils/store/interaction/interactionsStore.js";
import useRefStore from "@/utils/store/interaction/ref/refStore.js";

import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useUserStore from "@/utils/store/user/userStore.js";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore.js";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore.js";
import EngineerGuide from "./Guides/EngineerGuide.js";
import DocumentGuide from "./Guides/DocumentGuide.js";
import TicketGuide from "./Guides/TicketGuide.js";

const Interaction = ({}) => {
  const { user } = useUserStore();

  const {
    openTickets,
    openDocs,
    openHistory,
    openAssistant,
    handleHistoryMenu,
    handleAssistantMenu,
  } = useUiStore();

  const { messages } = useTicketConversationsStore();

  const { conversationHistories, currentConversationIndex } =
    useConversationStore();

  const { documentConversationHistories, currentDocumentConversationIndex } =
    useDocConversationsStore();
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
    handleSendDocumentMessage,
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
  }, [conversationHistories, documentConversationHistories]);

  useEffect(() => {
    handleScrollToBottom(false);
  }, [currentConversationIndex, currentDocumentConversationIndex]);

  useEffect(() => {
    if (
      activeUIAssistantTab === "Engineer" ||
      activeUIAssistantTab === "Document"
    ) {
      handleScrollToBottom(false);
    }
  }, [activeUIAssistantTab]);

  useEffect(() => {
    handleScrollToBottom(false);
  }, [window.innerWidth]);

  const messagesToRender = (() => {
    switch (activeUIAssistantTab) {
      case "Engineer":
        return conversationHistories[currentConversationIndex]?.messages;
      case "Document":
        return documentConversationHistories[currentDocumentConversationIndex]
          ?.messages;
      case "Tickets":
        return messages;
    }
  })();

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          (openDocs || openHistory || openTickets) && handleHistoryMenu(false);
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        (openDocs || openHistory || openTickets) &&
        openAssistant &&
        "xl:mr-[350px]"
      }  ${
        ((openDocs || openHistory || openTickets) &&
          (activeUIAssistantTab === "Engineer" ||
            activeUIAssistantTab === "Document" ||
            activeUIAssistantTab === "Tickets") &&
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
        {messagesToRender === undefined &&
          activeUIAssistantTab === "Engineer" && <EngineerGuide />}
        {messagesToRender === undefined &&
          activeUIAssistantTab === "Document" && <DocumentGuide />}
        {messagesToRender?.length === 0 &&
          activeUIAssistantTab === "Tickets" && <TicketGuide />}
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
              <div
                className={`
                 ${
                   !openHistory &&
                   activeUIAssistantTab !== "Tickets" &&
                   "max-w-[700px]"
                 } 
                 ${
                   !openAssistant &&
                   activeUIAssistantTab !== "Tickets" &&
                   "max-w-[700px]"
                 }
                 ${
                   !openDocs &&
                   activeUIAssistantTab !== "Tickets" &&
                   "max-w-[700px]"
                 }
                
                 ${
                   activeUIAssistantTab === "Tickets"
                     ? "max-w-[1250px]"
                     : "max-w-[450px] 2xl:max-w-[700px]"
                 } flex items-start gap-4 mx-auto`}
              >
                <span>
                  {item.role === "user" ? (
                    <div className="w-7 h-7 text-sm bg-blue-800  flex justify-center items-center text-white">
                      {user?.firstName[0]}
                    </div>
                  ) : (
                    <>
                      {activeUIAssistantTab === "Engineer" ? (
                        <div className="w-7 h-7 text-sm bg-[#ab68ff]  flex justify-center items-center text-white">
                          <SiOpenai />
                        </div>
                      ) : (
                        <div className="w-7 h-7 text-sm bg-[#00AEEE]  flex justify-center items-center text-white">
                          E7
                        </div>
                      )}
                    </>
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
      <div className="max-w-[700px] mx-auto w-full ">
        {activeUIAssistantTab === "Engineer" && (
          <div className="relative flex items-center px-4 py-2 ">
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
              className="dark:border-white/30 dark:shadow-white/30 dark:bg-black border-black/10 shadow-xl shadow-black/30  outline-none bg-white border w-full p-4 pr-32 resize-none no-scrollbar"
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
        )}

        {activeUIAssistantTab === "Tickets" && (
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
              className="dark:border-white/30 dark:shadow-white/30 dark:bg-black border-black/10 shadow-xl shadow-black/30  outline-none bg-white border w-full p-4 pr-32 resize-none no-scrollbar"
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

        {activeUIAssistantTab === "Document" && (
          <div className="relative flex items-center px-4 py-2">
            <textarea
              ref={inputRef}
              onChange={handleTextAreaChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendDocumentMessage(userInput);
                }
              }}
              value={userInput}
              placeholder={
                documentConversationHistories[currentDocumentConversationIndex]
                  ?.data
                  ? "Ask About Your Document..."
                  : "Add New Document To Upload..."
              }
              className="dark:border-white/30 dark:shadow-white/30 dark:bg-black border-black/10 shadow-xl shadow-black/30  outline-none bg-white border w-full p-4 pr-32 resize-none no-scrollbar"
              style={{
                height: textAreaHeight,
                maxHeight: "200px",
              }}
              disabled={
                !documentConversationHistories[currentDocumentConversationIndex]
                  ?.data
              }
            />

            <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
              <BsFillSendFill
                onClick={() => handleSendDocumentMessage(userInput)}
                size={25}
                className={`outline-none ${
                  userInput !== ""
                    ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                    : "dark:text-gray-500 text-gray-300 select-none"
                } `}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interaction;
