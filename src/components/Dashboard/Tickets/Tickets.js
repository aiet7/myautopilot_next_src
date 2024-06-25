"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { FiRefreshCcw } from "react-icons/fi";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const Tickets = ({}) => {
  const { openTickets } = useUiStore();
  const { userType } = useMspStore();
  const {
    searchValue,
    tickets,
    ticketStatus,
    ticketStatusLoading,
    activeTicketButton,
    setActiveTicketButton,
    setSearchValue,
    handleGetTicketStatus,
    handleTicketMode,
    initializeMSPTickets,
    initializeClientTickets,
  } = useTicketsStore();

  const filteredAndSortedTickets = tickets
    ?.filter(
      (ticket) =>
        (activeTicketButton === "Opened" && !ticket.closed) ||
        (activeTicketButton === "Closed" && ticket.closed)
    )
    ?.filter((ticket) => {
      if (!searchValue) return true;
      if (
        ticket.category.includes(searchValue) ||
        ticket.category.toLowerCase().includes(searchValue) ||
        ticket.subcategory.includes(searchValue) ||
        ticket.subcategory.toLowerCase().includes(searchValue) ||
        ticket.ticketId.includes(searchValue) ||
        ticket.title.includes(searchValue) ||
        ticket.title.toLowerCase().includes(searchValue) ||
        ticket.description.includes(searchValue) ||
        ticket.description.toLowerCase().includes(searchValue)
      )
        return true;
    })
    ?.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 text-xs
      ${
        openTickets
          ? "translate-x-0 w-full md:w-[250px]"
          : "-translate-x-full w-full md:w-[250px]"
      } dark:bg-[#111111] dark:border-white/10 bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      <div className="dark:bg-black dark:text-white dark:shadow-white/40 flex items-center w-full rounded-lg bg-white p-1 shadow-lg">
        <button
          onClick={() => setActiveTicketButton("Opened")}
          className={`${
            activeTicketButton === "Opened" && "bg-blue-800 text-white"
          } w-full rounded-lg py-2 `}
        >
          Open
        </button>
        <button
          onClick={() => setActiveTicketButton("Closed")}
          className={`${
            activeTicketButton === "Closed" && "bg-blue-800 text-white"
          } w-full rounded-lg py-2 `}
        >
          Closed
        </button>
      </div>
      <div className="flex flex-col gap-1 my-3">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className=" p-2 rounded-md border"
          placeholder="Search Tickets"
        />
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
      <div className="overflow-y-auto h-full scrollbar-thin ">
        {activeTicketButton === "Opened" &&
          tickets?.filter((ticket) => !ticket.closed).length === 0 && (
            <p className="dark:text-white/40 text-black/40 italic">
              You currently have no open tickets. If you would like to create
              one, please use our chat interface to open a ticket.
            </p>
          )}
        {activeTicketButton === "Closed" &&
          tickets?.filter((ticket) => ticket.closed).length === 0 && (
            <p className="dark:text-white/40 text-black/40 italic">
              You currently have no closed tickets.
            </p>
          )}

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
