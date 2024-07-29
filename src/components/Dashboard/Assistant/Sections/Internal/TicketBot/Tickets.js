"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { FiRefreshCcw } from "react-icons/fi";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const Tickets = ({}) => {
  const { userType } = useMspStore();
  const {
    filterTicketMode,
    searchValue,
    tickets,
    ticketStatus,
    ticketStatusLoading,
    handleGetTicketStatus,
    handleTicketMode,
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-1 my-3">
        <div
          onClick={() => {
            if (userType === "tech") {
              initializeMSPTickets();
            } else if (userType === "client") {
              initializeClientTickets();
            }
          }}
          className=" flex justify-end "
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="italic">Refresh your tickets</p>
            <FiRefreshCcw size={15} />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {filteredAndSortedTickets?.map((ticket, index) => {
          const { id, category, subcategory, ticketId, timeStamp } = ticket;
          return (
            <div
              onClick={() => handleTicketMode("Support", ticketId)}
              key={ticketId}
              className="dark:bg-white/30 dark:text-white dark:border-white/20 cursor-pointer  flex flex-col justify-between gap-1 border rounded-md text-black bg-white px-2 py-3 mb-2"
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
                <span className="font-bold">Category:</span> {category}
              </p>
              <p className="break-words whitespace-pre-wrap">
                <span className="font-bold">Subcategroy:</span> {subcategory}
              </p>
              <p className="break-words whitespace-pre-wrap">
                <span className="font-bold">Date Created:</span>{" "}
                {new Date(timeStamp).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tickets;
