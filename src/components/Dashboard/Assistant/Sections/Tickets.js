"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketsStore from "@/utils/store/assistant/sections/tickets/ticketsStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Tickets = () => {
  const { user } = useUserStore();
  const {
    tickets,
    ticketStatus,
    ticketStatusLoading,
    activeTicketButton,
    showTicketIndex,
    setActiveTicketButton,
    setShowTicketIndex,
    handleGetTicketStatus,
    initializeTickets,
  } = useTicketsStore();
 
  useEffect(() => {
    initializeTickets();
  }, [user]);

  return (
    <div className="flex-grow flex flex-col gap-8 overflow-hidden">
      <h3 className="dark:border-white/40 text-lg border-b">Tickets</h3>
      <div className="dark:border-white/20 flex items-center border rounded">
        <button
          onClick={() => setActiveTicketButton("Opened")}
          className={`${
            activeTicketButton === "Opened" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Open
        </button>
        <button
          onClick={() => setActiveTicketButton("Closed")}
          className={`${
            activeTicketButton === "Closed" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Closed
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {tickets
            .filter(
              (ticket) =>
                (activeTicketButton === "Opened" && !ticket.closed) ||
                (activeTicketButton === "Closed" && ticket.closed)
            )
            .map((ticket, index) => {
              const {
                id,
                description,
                summary,
                category,
                subcategory,
                ticketId,
                timeStamp,
              } = ticket;
              return (
                <div
                  key={index}
                  className="dark:bg-white/30 dark:text-white dark:border-white/20 text-sm flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
                >
                  <div
                    onClick={() => handleGetTicketStatus(ticketId)}
                    className="hover:bg-blue-500 cursor-pointer flex justify-center items-center gap-2 bg-blue-800 text-white py-2"
                  >
                    <span>
                      {ticketStatus[ticketId]
                        ? "Refresh Status"
                        : "See Ticket Status"}
                    </span>
                    {ticketStatusLoading[ticketId] && (
                      <FaSpinner
                        size={20}
                        className="animate-spin text-white"
                      />
                    )}
                  </div>
                  {ticketStatus[ticketId] && (
                    <p className="break-words whitespace-pre-wrap">
                      <span className="font-bold">STATUS:</span>{" "}
                      {ticketStatus[ticketId]}
                    </p>
                  )}
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Ticket ID:</span> #{ticketId}
                  </p>

                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Category:</span> {category}
                  </p>
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Subcategory:</span>{" "}
                    {subcategory}
                  </p>

                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">Ticket Creator:</span>{" "}
                    {user?.firstName + " " + user?.lastName}
                  </p>
                  <p>
                    <span className="font-bold">Date Created:</span>{" "}
                    {new Date(timeStamp).toLocaleString()}
                  </p>
                  {showTicketIndex === index && (
                    <>
                      <p className="break-words whitespace-pre-wrap">
                        <span className="font-bold">Description:</span>{" "}
                        {description}
                      </p>
                      <p className="break-words whitespace-pre-wrap">
                        <span className="font-bold">Summary:</span> {summary}
                      </p>
                    </>
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
