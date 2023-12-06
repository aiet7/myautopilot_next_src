"use client";
import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { FiRefreshCcw } from "react-icons/fi";

const Tickets = ({}) => {
  const { openTickets } = useUiStore();
  const { user } = useUserStore();
  const {
    tickets,
    ticketStatus,
    ticketStatusLoading,
    activeTicketButton,
    setActiveTicketButton,
    handleTicketMode,
    handleGetTicketStatus,
    initializeTickets,
  } = useTicketsStore();

  useEffect(() => {
    initializeTickets();
  }, [user]);

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0  
      ${
        openTickets ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px] "
      } dark:lg:border-white/10 dark:bg-[#111111] bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease lg:border-r`}
    >
      <div className="dark:bg-black dark:text-white dark:shadow-white/40 flex items-center w-full rounded-lg bg-white p-1 shadow-lg">
        <button
          onClick={() => setActiveTicketButton("Opened")}
          className={`${
            activeTicketButton === "Opened" && "bg-blue-800 text-white"
          } w-full rounded-lg py-4 `}
        >
          Open
        </button>
        <button
          onClick={() => setActiveTicketButton("Closed")}
          className={`${
            activeTicketButton === "Closed" && "bg-blue-800 text-white"
          } w-full rounded-lg py-4 `}
        >
          Closed
        </button>
      </div>
      <div className="overflow-y-auto h-full scrollbar-thin mt-4">
        {activeTicketButton === "Opened" &&
          tickets.filter((ticket) => !ticket.closed).length === 0 && (
            <p className="dark:text-white/40 text-black/40 italic">
              You currently have no open tickets. If you would like to create
              one, please use our chat interface to open a ticket.
            </p>
          )}
        {activeTicketButton === "Closed" &&
          tickets.filter((ticket) => ticket.closed).length === 0 && (
            <p className="dark:text-white/40 text-black/40 italic">
              You currently have no closed tickets.
            </p>
          )}

        {tickets
          .filter(
            (ticket) =>
              (activeTicketButton === "Opened" && !ticket.closed) ||
              (activeTicketButton === "Closed" && ticket.closed)
          )
          .map((ticket, index) => {
            const { id, category, ticketId } = ticket;
            return (
              <div
                onClick={() => handleTicketMode("Support", ticketId)}
                key={index}
                className="dark:bg-white/30 dark:text-white dark:border-white/20 cursor-pointer text-sm flex flex-col justify-between gap-1 border rounded-md text-black bg-white px-2 py-3 mb-2"
              >
                <div className="flex justify-between items-center">
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">STATUS:</span>{" "}
                    {ticketStatus[ticketId]}
                  </p>
                  <FiRefreshCcw
                    size={15}
                    className={`${
                      ticketStatusLoading[ticketId] && "animate-spin"
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Tickets;
