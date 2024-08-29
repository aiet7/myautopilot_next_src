"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { FiRefreshCcw } from "react-icons/fi";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import ViewTicket from "./ViewTicket/ViewTicket";

const Tickets = ({}) => {
  const { userType } = useMspStore();
  const {
    viewTicket,
    maxPagesToShow,
    currentPage,
    ticketsPerPage,
    filterTicketMode,
    searchValue,
    tickets,
    ticketStatus,
    ticketStatusLoading,
    setCurrentPage,
    handleGetTicketStatus,
    handleNextPage,
    handlePreviousPage,
    handleViewTicket,
    initializeMSPTickets,
    initializeClientTickets,
  } = useTicketsStore();
  
  const filteredAndSortedTickets = tickets
    ?.filter((ticket) => {
      if (!searchValue) return true;
      if (
        ticket.category?.includes(searchValue) ||
        ticket.category?.toLowerCase().includes(searchValue) ||
        ticket.subcategory?.includes(searchValue) ||
        ticket.subcategory?.toLowerCase().includes(searchValue) ||
        ticket.ticketId?.includes(searchValue) ||
        ticket.title?.includes(searchValue) ||
        ticket.title?.toLowerCase().includes(searchValue) ||
        ticket.description?.includes(searchValue) ||
        ticket.description?.toLowerCase().includes(searchValue)
      )
        return true;
    })
    ?.filter((ticket) => {
      switch (filterTicketMode) {
        case "Open":
          return !ticket?.closed;
        case "Closed":
          return ticket?.closed;
        default:
          return true;
      }
    })
    ?.sort((a, b) => {
      switch (filterTicketMode) {
        case "Most Recent":
          return new Date(b.timeStamp) - new Date(a.timeStamp);
        case "Oldest":
          return new Date(a.timeStamp) - new Date(b.timeStamp);
        case "A-Z":
          return a.title.localeCompare(b.title);
        case "Z-A":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const paginatedTickets = filteredAndSortedTickets?.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const totalPages = Math.ceil(
    filteredAndSortedTickets?.length / ticketsPerPage
  );

  const startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1
    ),
    1
  );
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="flex flex-col h-full">
      {viewTicket ? (
        <ViewTicket />
      ) : (
        <>
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex items-center justify-between w-full">
              <div className="w-full flex items-center gap-1">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="disabled:opacity-50"
                >
                  Previous
                </button>
                {pagesToShow.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-6 text-center  ${
                      currentPage === page ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-50"
                >
                  Next
                </button>
              </div>
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
            </div>
          </div>

          <div className="flex-grow overflow-y-auto scrollbar-thin">
            {paginatedTickets?.map((ticket, index) => {
              const {
                id,
                type,
                subType,
                category,
                subcategory,
                ticketId,
                timeStamp,
                title,
              } = ticket;
              return (
                <div
                  onClick={() => handleViewTicket(ticket, ticketId)}
                  key={ticketId}
                  className="dark:bg-black dark:text-white dark:hover:bg-white/40 hover:bg-black/20 bg-white cursor-pointer text-black flex flex-col justify-between gap-1 border rounded-md text-black  px-2 py-3 mb-2"
                >
                  <div className="flex justify-between items-center">
                    <p className="break-words whitespace-pre-wrap">
                      <span className="font-bold">STATUS: </span>
                      {ticketStatus && ticketStatus?.[ticketId]?.status.name}
                    </p>
                    <FiRefreshCcw
                      size={15}
                      className={`${
                        ticketStatusLoading?.[ticketId] && "animate-spin"
                      } cursor-pointer`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetTicketStatus(ticketId);
                      }}
                    />
                  </div>

                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Ticket ID:</span> #{ticketId}
                  </p>
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Title:</span> {title}
                  </p>
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Category:</span>{" "}
                    {category || type}
                  </p>
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Subcategroy:</span>{" "}
                    {subcategory || subType}
                  </p>
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Date Created:</span>{" "}
                    {new Date(timeStamp).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Tickets;
