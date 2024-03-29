"use client";

import { useEffect } from "react";

import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";

import Default from "./Mode/Default.js";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import useInteractionStore from "@/utils/store/interaction/interactionsStore.js";

import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore.js";
import Support from "./Mode/Support.js";
import Input from "./Input.js";

const Interaction = ({}) => {
  const {
    openTickets,
    openDocs,
    openHistory,
    openAssistant,
    handleHistoryMenu,
    handleAssistantMenu,
  } = useUiStore();

  const { isServerError } = useFormsStore();

  const {
    isWaiting,
    isAtBottom,
    isOverflowed,
    isFeedbackSubmitted,
    handleScrollToBottom,
  } = useInteractionStore();

  const { activeUIAssistantTab } = useAssistantStore();
  const { activeTicketMode } = useTicketsStore();

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
      {!isAtBottom && isOverflowed && activeTicketMode === "Default" && (
        <button
          onClick={handleScrollToBottom}
          className={`dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600`}
        >
          <HiOutlineArrowSmallDown className="m-1" size={18} />
        </button>
      )}
      {activeTicketMode === "Support" && activeUIAssistantTab === "Tickets" ? (
        <Support />
      ) : (
        <Default />
      )}
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
      <Input />
    </div>
  );
};

export default Interaction;
