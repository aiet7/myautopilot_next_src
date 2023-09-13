"use client";

import useTicketsStore from "@/utils/store/assistant/sections/tickets/ticketsStore";
import useUserStore from "@/utils/store/user/userStore";

import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Tickets = () => {
  const { user } = useUserStore();
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
                    {user.firstName + " " + user.lastName}
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
