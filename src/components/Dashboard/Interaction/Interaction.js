"use client";

import { useEffect } from "react";

import { HiOutlineArrowSmallDown } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import useInteractionStore from "@/utils/store/interaction/interactionsStore.js";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore.js";
import Input from "./Input.js";
import TicketCreation from "./Interfaces/TicketCreation.js";
import EngineerChat from "./Interfaces/EngineerChat.js";
import TicketSupport from "./Interfaces/TicketSupport.js";
import Troubleshoot from "./Forms/Ticket/Troubleshoot.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

const Interaction = ({}) => {
  const { activeTicketMode } = useTicketsStore();
  const {
    openNav,
    currentNavOption,
    currentQueueNavOption,
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

  const { assistantWidth } = useAssistantStore();

  useEffect(() => {
    if (currentNavOption === "Engineer" || currentNavOption === "Document") {
      handleScrollToBottom(false);
    }
  }, [currentNavOption]);

  useEffect(() => {
    handleScrollToBottom(false);
  }, [window.innerWidth]);

  const renderWidth = () => {
    switch (assistantWidth) {
      case 400:
        return "xl:mr-[400px]";
      case 700:
        return "xl:mr-[700px]";
      case 900:
        return "xl:mr-[900px]";
      default:
        return "xl:mr-[400px]";
    }
  };

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openNav && handleNavMenu(false);
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm ${
        openNav && openAssistant && `${renderWidth()}`
      }  ${
        (openNav &&
          (currentNavOption === "Engineer" ||
            currentNavOption === "Tickets" ||
            currentNavOption === "Queue") &&
          "lg:opacity-100 opacity-5 xl:ml-[250px]") ||
        (openAssistant && `lg:opacity-100 opacity-5 ${renderWidth()}`)
      } dark:bg-black transition-all duration-300 ease bg-white `}
    >
      {!isAtBottom &&
        isOverflowed &&
        (currentNavOption === "Engineer" || currentNavOption === "Tickets") && (
          <button
            onClick={handleScrollToBottom}
            className={`dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600`}
          >
            <HiOutlineArrowSmallDown className="m-1" size={18} />
          </button>
        )}

      {currentNavOption === "Tickets" && (
        <>
          {activeTicketMode === "Support" ? (
            <TicketSupport />
          ) : (
            <TicketCreation />
          )}
        </>
      )}
      {currentNavOption === "Engineer" && <EngineerChat />}
      {currentNavOption === "Queue" &&
        currentQueueNavOption === "Workspace" && <Troubleshoot />}
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
