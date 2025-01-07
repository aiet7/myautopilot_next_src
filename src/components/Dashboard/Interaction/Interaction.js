"use client";

import { useEffect } from "react";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import useInteractionStore from "@/utils/store/interaction/interactionsStore.js";
import Input from "./Input.js";
import TicketCreation from "./Interfaces/TicketCreation.js";
import EngineerChat from "./Interfaces/EngineerChat/EngineerChat.js";
import Troubleshoot from "./Forms/Ticket/Troubleshoot.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

const Interaction = ({}) => {
  const {
    openNav,
    currentNavOption,
    openAssistant,
    handleAssistantMenu,
    handleNavMenu,
  } = useUiStore();

  const { isServerError } = useFormsStore();
  const {
    isWaiting,
    isAtBottom,
    isOverflowed,
    isFeedbackSubmitted,
    handleScrollToBottom,
  } = useInteractionStore();

  const { assistantWidth, isResizing } = useAssistantStore();
  const isMobile = window.innerWidth < 1023;

  useEffect(() => {
    if (currentNavOption === "Assistant" || currentNavOption === "Document") {
      handleScrollToBottom(false);
    }
  }, [currentNavOption]);
  
  useEffect(() => {
    handleScrollToBottom(false);
  }, [window.innerWidth]);

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openNav && handleNavMenu(false);
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm transition-[margin-left] duration-300 ease-in-out  ${
        isResizing ? "" : "transition-[margin] duration-300 ease-in-out"
      } ${openNav ? "lg:ml-[250px]" : "ml-0"} dark:bg-black bg-white`}
      style={{
        marginRight: openAssistant && !isMobile ? `${assistantWidth}px` : "0px",
      }}
    >
      {!isAtBottom &&
        isOverflowed &&
        (currentNavOption === "Assistant" ||
          currentNavOption === "Tickets") && (
          <button
            onClick={handleScrollToBottom}
            className="dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600"
          >
            <HiOutlineArrowSmallDown className="m-1" size={18} />
          </button>
        )}

      {currentNavOption === "Tickets" && <TicketCreation />}
      {currentNavOption === "Assistant" && <EngineerChat />}
      {currentNavOption === "Dispatch" && <Troubleshoot />}
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
            } animate-spin text-xl`}
          />
        )}
      </div>
      <Input />
    </div>
  );
};

export default Interaction;
