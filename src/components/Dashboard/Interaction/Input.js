"use client";
import { useEffect } from "react";
import { BsFillSendFill, BsThreeDotsVertical } from "react-icons/bs";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useRefStore from "@/utils/store/interaction/ref/refStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";

const Input = () => {
  const { user } = useUserStore();
  const {
    isDiagnosticTicketStep,
    textAreaHeight,
    userInput,
    interactionMenuOpen,
    setInteractionMenuOpen,
    handleTextAreaChange,
    handleCreateTicketMessage,
    handleSendTroubleshootMessage,
    handleSendMessage,
  } = useInteractionStore();
  const { currentNavOption } = useUiStore();
  const { myQueueTicket, troubleshootMessages } = useQueueStore();

  const { inputRef } = useRefStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [userInput, currentNavOption, myQueueTicket, troubleshootMessages]);

  return (
    <div className="relative max-w-[700px] mx-auto w-full ">
      {currentNavOption === "Assistant" && (
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
            <BsThreeDotsVertical
              className="cursor-pointer"
              onClick={() => setInteractionMenuOpen(!interactionMenuOpen)}
              size={20}
            />
          </div>
        </div>
      )}

      {currentNavOption === "Tickets" && (
        <div className="relative flex items-center px-4 py-2 gap-2">
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
            className="dark:border-white/30 dark:shadow-white/30 dark:bg-black border-black/10 shadow-xl shadow-black/30  outline-none bg-white border w-full p-4 pr-32 resize-none no-scrollbar focus:outline focus:outline-2 focus:outline-black"
            style={{
              height: textAreaHeight,
              maxHeight: "200px",
            }}
          />

          <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
            <button
              size={25}
              onClick={() => {
                handleCreateTicketMessage(userInput);
              }}
              className={`p-2 ${
                userInput !== ""
                  ? "text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1"
                  : "dark:text-gray-400 dark:border-white/30  text-gray-400 select-none border cursor-default font-bold px-5 rounded py-1"
              } `}
            >
              {user?.mspCustomDomain === "public" && isDiagnosticTicketStep
                ? "Try Me!"
                : user?.mspCustomDomain === "public"
                ? "Update Ticket"
                : isDiagnosticTicketStep
                ? "Open Ticket"
                : "Update Ticket"}
            </button>
            <BsThreeDotsVertical
              className="cursor-pointer"
              onClick={() => setInteractionMenuOpen(!interactionMenuOpen)}
              size={20}
            />
          </div>
        </div>
      )}

      {currentNavOption === "Dispatch" &&
        myQueueTicket &&
        troubleshootMessages.length > 0 && (
          <div className="relative flex items-center px-4 py-2 gap-2">
            <textarea
              ref={inputRef}
              onChange={handleTextAreaChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  handleSendTroubleshootMessage(userInput);
                }
              }}
              value={userInput}
              className="dark:border-white/30 dark:shadow-white/30 dark:bg-black border-black/10 shadow-xl shadow-black/30  outline-none bg-white border w-full p-4 pr-32 resize-none no-scrollbar"
              style={{
                height: textAreaHeight,
                maxHeight: "200px",
              }}
              placeholder="Continue Troubleshooting..."
            />
            <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
              <BsFillSendFill
                size={25}
                className={`outline-none ${
                  userInput !== ""
                    ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                    : "dark:text-gray-500 text-gray-300 select-none"
                } `}
                onClick={() => {
                  handleSendTroubleshootMessage(userInput);
                }}
              />
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => setInteractionMenuOpen(!interactionMenuOpen)}
                size={20}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Input;
