"use client";

import { useState } from "react";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { FiRefreshCcw } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import TicketFilterMenu from "./TicketBot/TicketFilterMenu";
import ChatFilterMenu from "./ChatBot/ChatFilterMenu";
import QueueFilterMenu from "./QueueBot/AllQueueTickets/QueueFilterMenu";

const Pagination = () => {
  const { userType } = useMspStore();
  const { currentNavOption } = useUiStore();
  const { assistantMenuOpen, setAssistantMenuOpen } = useAssistantStore();
  const {
    filteredTicketCount,
    currentTicketPage,
    ticketsPerPage,
    totalTicketPages,
    handleNextTicketPage,
    handlePreviousTicketPage,
    initializeMSPTickets,
    initializeClientTickets,
  } = useTicketsStore();

  const {
    filteredChatCount,
    chatsPerPage,
    totalChatPages,
    currentChatPage,
    handleNextChatPage,
    handlePreviousChatPage,
  } = useConversationStore();

  const {
    filteredQueueTicketCount,
    queueTicketsPerPage,
    totalQueueTicketPages,
    currentQueueTicketsPage,
    handleNextQueueTicketPage,
    handlePreviousQueueTicketPage,
  } = useQueueStore();

  const isTickets = currentNavOption === "Tickets";
  const isChats = currentNavOption === "Assistant";
  const isQueueTickets = currentNavOption === "Dispatch";

  const currentPage = isTickets
    ? currentTicketPage
    : isChats
    ? currentChatPage
    : isQueueTickets
    ? currentQueueTicketsPage
    : 1;

  const filteredCount = isTickets
    ? filteredTicketCount
    : isChats
    ? filteredChatCount
    : isQueueTickets
    ? filteredQueueTicketCount
    : 0;

  const itemsPerPage = isTickets
    ? ticketsPerPage
    : isChats
    ? chatsPerPage
    : isQueueTickets
    ? queueTicketsPerPage
    : 1;

  const totalPages = isTickets
    ? totalTicketPages
    : isChats
    ? totalChatPages
    : isQueueTickets
    ? totalQueueTicketPages
    : 1;

  const handleNextPage = isTickets
    ? handleNextTicketPage
    : isChats
    ? handleNextChatPage
    : isQueueTickets
    ? handleNextQueueTicketPage
    : () => {};

  const handlePreviousPage = isTickets
    ? handlePreviousTicketPage
    : isChats
    ? handlePreviousChatPage
    : isQueueTickets
    ? handlePreviousQueueTicketPage
    : () => {};

  const renderFilterMenu = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketFilterMenu />;
      case "Assistant":
        return <ChatFilterMenu />;
      case "Dispatch":
        return <QueueFilterMenu />;

      default:
        return null;
    }
  };



  return (
    <div className="flex items-center  ">
      <div
        className="flex items-center gap-2 relative cursor-pointer"
        onMouseEnter={() => setAssistantMenuOpen(true)}
        onMouseLeave={() => setAssistantMenuOpen(false)}
      >
        <span className="text-sm text-gray-700 w-[100px] text-center">
          {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
            currentPage * itemsPerPage,
            filteredCount
          )} of ${filteredCount}`}
        </span>

        {assistantMenuOpen && renderFilterMenu()}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <HiChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || filteredCount === 0}
          className="rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      <div className="relative flex items-center w-8 justify-center">
        {isTickets && (
          <div
            onClick={() => {
              if (userType === "tech") {
                initializeMSPTickets();
              } else if (userType === "client") {
                initializeClientTickets();
              }
            }}
            className="flex items-center gap-1 justify-end cursor-pointer"
          >
            <FiRefreshCcw size={15} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
