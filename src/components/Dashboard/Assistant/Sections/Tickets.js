"use client";

import useTicketsStore from "@/utils/store/assistant/sections/tickets/ticketsStore";

import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Tickets = () => {
  const {
    tickets,
    activeTicketButton,
    showTicketIndex,
    setActiveTicketButton,
    setShowTicketIndex,
  } = useTicketsStore();

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Tickets</h3>
      <div className="dark:border-white/20 flex  items-center border rounded">
        <button
          onClick={() => setActiveTicketButton("In Progress")}
          className={`${
            activeTicketButton === "In Progress" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTicketButton("Complete")}
          className={`${
            activeTicketButton === "Complete" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Completed
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {tickets
            .filter(
              (ticket) =>
                (activeTicketButton === "In Progress" && !ticket.closed) ||
                (activeTicketButton === "Complete" && ticket.closed)
            )
            .map((ticket, index) => {
              const { id, description, category, ticketId, timeStamp } = ticket;
              return (
                <div
                  key={index}
                  className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
                >
                  <div className="flex justify-between">
                    <p className="break-words whitespace-pre-wrap">
                      #{ticketId}
                    </p>
                  </div>
                  <p className="break-words whitespace-pre-wrap">{category}</p>
                  <p>{new Date(timeStamp).toLocaleString()}</p>
                  {showTicketIndex === index && (
                    <div className="dark:bg-white/10 bg-black/5 p-2 rounded-md cursor-pointer">
                      <pre className="whitespace-pre-wrap">{description}</pre>
                    </div>
                  )}
                  {showTicketIndex === index ? (
                    <MdOutlineArrowDropUp
                      size={30}
                      className="self-center cursor-pointer"
                      onClick={() => setShowTicketIndex(null)}
                    />
                  ) : (
                    <MdOutlineArrowDropDown
                      size={30}
                      className="self-center cursor-pointer"
                      onClick={() => setShowTicketIndex(index)}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
