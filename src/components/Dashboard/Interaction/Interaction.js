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

  const { assistantWidth } = useAssistantStore();

  useEffect(() => {
    if (currentNavOption === "Assistant" || currentNavOption === "Document") {
      handleScrollToBottom(false);
    }
  }, [currentNavOption]);

  useEffect(() => {
    handleScrollToBottom(false);
  }, [window.innerWidth]);

  const renderWidth = () => {
    if (!openAssistant) return "";

    // Define width thresholds and corresponding margins
    const thresholds = [
      { width: 800, margin: "md:mr-[px] lg:mr-[900px]" },
      { width: 700, margin: "md:mr-[px] lg:mr-[750px]" },
      { width: 600, margin: "md:mr-[px] lg:mr-[600px]" },
      { width: 500, margin: "md:mr-[px] lg:mr-[500px]" },
      { width: 400, margin: "md:mr-[px] lg:mr-[400px]" },
    ];

    // Find the largest margin that corresponds to the current assistant width
    for (const { width, margin } of thresholds) {
      if (assistantWidth >= width) {
        return margin;
      }
    }

    return ""; // Default return if none match
  };

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openNav && handleNavMenu(false);
          openAssistant && handleAssistantMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm transition-all duration-300 ease-in-out ${
        openNav && openAssistant && `${renderWidth()}`
      }  ${
        (openNav &&
          (currentNavOption === "Assistant" ||
            currentNavOption === "Tickets" ||
            currentNavOption === "Queue") &&
          "lg:opacity-100 opacity-5 xl:ml-[250px]") ||
        (openAssistant && `lg:opacity-100 opacity-5 ${renderWidth()}`)
      } dark:bg-black bg-white`}
    >
      {!isAtBottom &&
        isOverflowed &&
        (currentNavOption === "Assistant" ||
          currentNavOption === "Tickets") && (
          <button
            onClick={handleScrollToBottom}
            className={`dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600`}
          >
            <HiOutlineArrowSmallDown className="m-1" size={18} />
          </button>
        )}

      {currentNavOption === "Tickets" && <TicketCreation />}
      {currentNavOption === "Assistant" && <EngineerChat />}
      {currentNavOption === "Queue" && <Troubleshoot />}
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
