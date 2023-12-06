"use client";
import { useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useRefStore from "@/utils/store/interaction/ref/refStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const Input = () => {
  const { documentConversationHistories, currentDocumentConversationIndex } =
    useDocConversationsStore();

  const {
    textAreaHeight,
    userInput,
    handleTextAreaChange,
    handleCreateTicketMessage,
    handleSendDocumentMessage,
    handleSendMessage,
  } = useInteractionStore();
  const { activeUIAssistantTab } = useAssistantStore();
  const { activeTicketMode } = useTicketsStore();

  const { inputRef } = useRefStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [userInput, activeUIAssistantTab]);

  return (
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
                if (activeTicketMode === "Support") {
                  console.log("Test onKeyDown");
                } else {
                  handleCreateTicketMessage(userInput);
                }
              }
            }}
            value={userInput}
            placeholder={
              activeTicketMode === "Support"
                ? "Leave Note For A Tech"
                : "Describe Your Issue..."
            }
            className="dark:border-white/30 dark:shadow-white/30 dark:bg-black border-black/10 shadow-xl shadow-black/30  outline-none bg-white border w-full p-4 pr-32 resize-none no-scrollbar"
            style={{
              height: textAreaHeight,
              maxHeight: "200px",
            }}
          />

          <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
            <button
              size={25}
              onClick={() => {
                if (activeTicketMode === "Support") {
                  console.log("Test OnClick");
                } else {
                  handleCreateTicketMessage(userInput);
                }
              }}
              className={`p-2 ${
                userInput !== ""
                  ? "dark:text-white dark:hover:text-white hover:bg-blue-500   border bg-blue-800 text-white cursor-pointer"
                  : "dark:text-gray-400 dark:border-white/30  text-gray-400 select-none border cursor-default"
              } `}
            >
              {activeTicketMode === "Support" ? "Leave Note" : "Open Ticket"}
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
  );
};

export default Input;
